import { randomUUID } from 'node:crypto'
import { lstatSync, realpathSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { Error as ToolError } from '@opencode/plugin/promise/tool'

const owners = new Set(['design-product', 'technical-design', 'review-design'])
const workers = new Set(['design-research', 'design-artifact', 'design-author', 'review-design'])
const pending = (entry) => ['reserved', 'submitting', 'running', 'uncertain'].includes(entry.status)
const assert = (ok, message) => { if (!ok) throw new Error(message) }
const text = (value) => typeof value === 'string' && value.trim().length > 0 && value.length <= 16000

export function parseModel(value) {
  assert(typeof value === 'string', 'Model must be provider/model#variant')
  const match = /^([^/\s]+)\/([^#\s]+)(?:#([^\s#]+))?$/.exec(value)
  assert(match, 'Model must be provider/model#variant')
  return { providerID: match[1], id: match[2], ...(match[3] ? { variant: match[3] } : {}) }
}

export function orchestrationOptions(options = {}) {
  const input = options.delegation ?? {}
  function integer(value, fallback, maximum) {
    if (value === undefined) return fallback
    assert(Number.isInteger(value) && value > 0 && value <= maximum, `Budget must be a positive integer no greater than ${maximum}`)
    return value
  }
  const workerModels = {}
  for (const [name, model] of Object.entries(options.workerModels ?? {})) {
    assert(workers.has(name), `Not a worker model target: ${name}`)
    workerModels[name] = parseModel(model)
  }
  const agentSteps = {}
  for (const [name, steps] of Object.entries(options.agentSteps ?? {})) {
    assert(owners.has(name) || workers.has(name), `Unknown steps target: ${name}`)
    agentSteps[name] = integer(steps, undefined, 200)
  }
  assert(input.enabled === undefined || typeof input.enabled === 'boolean', 'delegation.enabled must be boolean')
  assert(options.telemetry === undefined || typeof options.telemetry === 'boolean', 'telemetry must be boolean')
  return { enabled: input.enabled !== false, concurrent: integer(input.maxConcurrent, 2, 2), launches: integer(input.maxLaunches, 12, 20), timeoutMs: integer(input.timeoutMs, 120000, 600000), workerModels, agentSteps, telemetry: options.telemetry === true }
}

export function safePath(root, path) {
  assert(typeof path === 'string' && !path.includes('\\') && !path.includes(':') && !isAbsolute(path) && path.split('/').every((part) => part && part !== '.' && part !== '..' && !/[?*]/.test(part)), 'Use exact worktree-relative paths without traversal or globs')
  const absolute = resolve(root, path)
  let current = absolute
  while (current !== root) {
    try { assert(!lstatSync(current).isSymbolicLink(), `Symlink/junction refused: ${path}`) } catch (error) { if (error.code !== 'ENOENT') throw error }
    const parent = dirname(current)
    assert(parent !== current, 'Path escaped workspace')
    current = parent
  }
  const resolved = relative(root, absolute)
  assert(resolved && resolved !== '..' && !resolved.startsWith(`..${sep}`) && !isAbsolute(resolved), 'Path escaped workspace')
}

export function validateHandoff(input, root) {
  assert(workers.has(input.worker), 'Unknown design worker')
  for (const name of ['objective', 'sources', 'handoff', 'checks', 'stopWhen']) assert(text(input[name]), `Missing or oversized ${name}`)
  assert(['understand', 'shape', 'specify', 'technical'].includes(input.phase), 'Invalid phase')
  assert(['understand', 'design-documents', 'mockup', 'full'].includes(input.level), 'Invalid output cap')
  assert(/^docs\/product-design\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.packagePath), 'Use docs/product-design/<slug>')
  safePath(root, input.packagePath)
  assert(Array.isArray(input.writePaths) && input.writePaths.length <= 20, 'Explicit writePaths required (up to 20)')
  if (!['design-artifact', 'design-author'].includes(input.worker)) assert(input.writePaths.length === 0, 'Research and review are read-only')
  else {
    if (input.worker === 'design-artifact') assert((input.phase === 'shape' && ['mockup', 'full'].includes(input.level)) || (input.phase === 'technical' && input.level === 'full'), 'Artifact requires open Shape at Mockup/Full or Technical at Full')
    assert(input.writePaths.length > 0, 'Writer requires exact output paths')
    const extension = input.worker === 'design-author' ? '.md' : '.drawio'
    for (const path of input.writePaths) {
      safePath(root, path)
      assert(path.startsWith(`${input.packagePath}/`) && path.endsWith(extension), `Writer output must be a ${extension} inside this package`)
    }
  }
}

function executionDeadline(signal, timeoutMs) {
  const controller = new AbortController()
  const onAbort = () => controller.abort(new Error('Worker cancelled; outcome partial'))
  signal.addEventListener('abort', onAbort, { once: true })
  if (signal.aborted) onAbort()
  const timer = setTimeout(() => controller.abort(new Error('Worker timed out; outcome partial, inspect child session')), timeoutMs)
  const aborted = new Promise((_, reject) => {
    if (controller.signal.aborted) reject(controller.signal.reason)
    else controller.signal.addEventListener('abort', () => reject(controller.signal.reason), { once: true })
  })
  void aborted.catch(() => {})
  return {
    check() { if (controller.signal.aborted) throw controller.signal.reason },
    call(operation) {
      if (controller.signal.aborted) return Promise.reject(controller.signal.reason)
      return Promise.race([Promise.resolve().then(() => { if (controller.signal.aborted) throw controller.signal.reason; return operation() }), aborted])
    },
    dispose() { clearTimeout(timer); signal.removeEventListener('abort', onAbort) },
  }
}

export function createDelegator(ctx, options, usage) {
  const epoch = randomUUID()
  const locks = new Map()
  const blocked = new Set()
  async function locked(parentID, change) {
    const previous = locks.get(parentID) ?? Promise.resolve()
    const next = previous.catch(() => {}).then(async () => {
      const state = await ctx.storage.get(`delegation/${parentID}`) ?? { entries: [], truncated: false }
      const value = await change(state)
      await ctx.storage.set(`delegation/${parentID}`, state)
      return value
    })
    locks.set(parentID, next)
    try { return await next } finally { if (locks.get(parentID) === next) locks.delete(parentID) }
  }
  async function execute(input, context) {
    const deadline = executionDeadline(context.signal, options.timeoutMs)
    let reservation
    let mutation
    let submitted = false
    let verifiedIdle = false
    function submit(operation) {
      deadline.check()
      assert(!blocked.has(context.sessionID), 'A prior child may still be running; inspect/stop it before delegation')
      const current = { settled: false }
      mutation = current
      submitted = true
      current.promise = Promise.resolve().then(operation).finally(() => { current.settled = true })
      return current.promise
    }
    try {
      assert(options.enabled, 'Design delegation is disabled; execution is blocked for orchestration-only owners')
      assert(owners.has(context.agent), 'Only the active design coordinator can delegate')
      const parent = await deadline.call(() => ctx.session.get({ sessionID: context.sessionID }))
      assert(!parent.parentID, 'Nested delegation is disabled')
      const root = realpathSync(parent.location.directory)
      validateHandoff(input, root)
      assert(context.agent !== 'review-design' || (['design-research', 'review-design'].includes(input.worker) && input.writePaths.length === 0), 'Review owner can delegate only read-only research/review')
      assert(context.agent !== 'design-product' || input.phase !== 'technical', 'Product owner cannot open Technical through delegation')
      const messages = await deadline.call(() => ctx.session.context({ sessionID: parent.id }))
      const turn = messages.filter((message) => message.type === 'user').at(-1)?.id
      assert(turn, 'No attributed user request for delegation')
      await deadline.call(() => locked(parent.id, async (state) => {
        deadline.check()
        assert(!blocked.has(parent.id), 'A prior child may still be running; inspect/stop it before delegation')
        for (const entry of state.entries.filter((entry) => pending(entry) && entry.epoch !== epoch)) {
          assert(entry.status === 'running', 'Previous child admission/termination is uncertain; operator inspection is required before delegation')
          const child = await deadline.call(() => ctx.session.get({ sessionID: entry.sessionID }))
          const history = await deadline.call(() => ctx.session.context({ sessionID: entry.sessionID }))
          assert(child?.parentID === parent.id && history.at(-1)?.type === 'idle', 'A previous runtime left an unfinished worker; inspect/stop it before delegation')
          entry.status = 'partial'
        }
        deadline.check()
        assert(!blocked.has(parent.id), 'A prior child may still be running; inspect/stop it before delegation')
        const running = state.entries.filter(pending)
        assert(!running.some((entry) => entry.status === 'uncertain'), 'Child termination is unconfirmed; stop it before delegation')
        assert(running.length < options.concurrent, 'Concurrent design-worker budget exhausted; wait for a worker')
        assert(state.entries.filter((entry) => entry.turn === turn).length < options.launches, 'Design-worker launch budget exhausted for this request')
        assert(!state.entries.some((entry) => entry.turn === turn && entry.callID === context.id), 'This delegation call was already reserved; inspect its child instead of replaying it')
        assert(!running.some((entry) => entry.writePaths.length), 'Do not overlap work with a design writer')
        if (input.writePaths.length) assert(running.length === 0, 'Design writer requires an otherwise idle delegation lane')
        const entry = { sessionID: `ses_pd${randomUUID().replaceAll('-', '')}`, turn, callID: context.id, worker: input.worker, writePaths: input.writePaths, status: 'reserved', epoch }
        reservation = entry
        state.entries.push(entry)
        if (state.entries.length > 100) {
          state.entries = state.entries.filter((entry) => pending(entry) || entry.turn === turn).concat(state.entries.filter((entry) => !pending(entry) && entry.turn !== turn).slice(-60))
          state.truncated = true
        }
        return entry
      }))
      const scope = { parentID: parent.id, directory: root, worker: input.worker, writePaths: input.writePaths }
      await deadline.call(() => ctx.storage.set(`worker/${reservation.sessionID}`, scope))
      deadline.check()
      assert(!blocked.has(parent.id), 'A prior child may still be running; inspect/stop it before delegation')
      const { data: worker } = await deadline.call(() => ctx.agent.get({ agentID: input.worker, location: parent.location }))
      const model = options.workerModels[input.worker] ?? worker.model ?? parent.model
      // The child loads its own agent/global policy. Inherit only explicit session constraints,
      // not the coordinator role's execution denies; the permission hook only narrows policy.
      const permissions = [...(parent.permissions ?? [])]
      await deadline.call(() => locked(parent.id, (state) => { state.entries.find((entry) => entry.sessionID === reservation.sessionID).status = 'submitting' }))
      await deadline.call(() => submit(() => ctx.session.create({ id: reservation.sessionID, parentID: parent.id, agent: input.worker, title: `Design: ${input.worker}`, ...(model ? { model } : {}), permissions })))
      const prompt = `Bounded design delegation. Parent owns decisions; no child spawning or human approval.\n${JSON.stringify(input, null, 2)}\nReturn evidence locations, changed paths, actual checks and blocked/deferred work. Save authorized artifacts once; do not echo XML, schemas or full logs. Missing prerequisites/safety facts stop affected work, not permission to invent them. Budget: ${options.timeoutMs}ms including setup; step limits may stop you earlier.`
      await deadline.call(() => submit(() => ctx.session.prompt({ sessionID: reservation.sessionID, text: prompt })))
      await deadline.call(() => locked(parent.id, (state) => { state.entries.find((entry) => entry.sessionID === reservation.sessionID).status = 'running' }))
      await deadline.call(() => ctx.session.wait({ sessionID: reservation.sessionID }))
      const result = await deadline.call(() => ctx.session.context({ sessionID: reservation.sessionID }))
      const idle = result.at(-1)
      verifiedIdle = idle?.type === 'idle'
      const response = result.filter((message) => message.type === 'assistant').at(-1)
      const report = response?.content?.filter((part) => part.type === 'text').map((part) => part.text).join('\n') ?? ''
      const partial = !verifiedIdle || idle.outcome !== 'succeeded' || !report || report.length > 12000 || response?.finish === 'length' || Boolean(response?.error)
      if (!verifiedIdle) throw new Error('Worker termination unconfirmed; inspect child session')
      await deadline.call(() => locked(parent.id, (state) => { state.entries.find((entry) => entry.sessionID === reservation.sessionID).status = partial ? 'partial' : 'completed' }))
      let usageError
      if (options.telemetry) {
        try { await deadline.call(() => usage.capture(reservation.sessionID)) } catch { usageError = 'Usage capture unavailable; do not infer zero tokens or retry completed work for telemetry.' }
      }
      return { content: JSON.stringify({ sessionID: reservation.sessionID, status: partial ? 'partial' : 'completed', report: report.slice(0, 12000), truncated: report.length > 12000, ...(usageError ? { usageError } : {}), limitation: 'Worker self-report; owner must inspect consequential sources/artifacts. Never auto-retry incomplete work or claim readiness from this report.' }) }
    } catch (error) {
      if (reservation) {
        blocked.add(context.sessionID)
        const cleanup = executionDeadline(new AbortController().signal, 5000)
        try {
          if (submitted && !verifiedIdle) {
            // The installed SDK does not cancel pending API operations. Confirm admission settled before interrupting.
            if (mutation && !mutation.settled) await cleanup.call(() => mutation.promise.catch(() => {}))
            await cleanup.call(() => ctx.session.interrupt({ sessionID: reservation.sessionID, continue: false }))
            const history = await cleanup.call(() => ctx.session.context({ sessionID: reservation.sessionID }))
            verifiedIdle = history.at(-1)?.type === 'idle'
          }
          const released = !submitted || verifiedIdle
          await cleanup.call(() => locked(context.sessionID, (state) => {
            const entry = state.entries.find((entry) => entry.sessionID === reservation.sessionID)
            if (entry) entry.status = released ? 'partial' : 'uncertain'
          }))
          if (released) blocked.delete(context.sessionID)
        } catch { /* Durable reserved/running entries remain fail-closed after reload. */ }
        finally { cleanup.dispose() }
      }
      throw new ToolError({ message: error.message, ...(reservation ? { metadata: { sessionID: reservation.sessionID, status: 'partial' } } : {}) })
    } finally { deadline.dispose() }
  }
  return { execute }
}

export const delegationSchema = {
  type: 'object', additionalProperties: false,
  properties: {
    worker: { type: 'string', enum: ['design-research', 'design-artifact', 'design-author', 'review-design'] },
    objective: { type: 'string' }, sources: { type: 'string', description: 'Authoritative source paths/version and known facts/unknowns' },
    packagePath: { type: 'string' }, phase: { type: 'string', enum: ['understand', 'shape', 'specify', 'technical'] },
    level: { type: 'string', enum: ['understand', 'design-documents', 'mockup', 'full'] },
    handoff: { type: 'string', description: 'Named handoff/profile and authorization; not permission to advance' },
    checks: { type: 'string' }, stopWhen: { type: 'string' }, writePaths: { type: 'array', items: { type: 'string' } },
  },
  required: ['worker', 'objective', 'sources', 'packagePath', 'phase', 'level', 'handoff', 'checks', 'stopWhen', 'writePaths'],
}
