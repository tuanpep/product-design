import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createDelegator, orchestrationOptions, parseModel, validateHandoff } from '../runtime/delegation.mjs'
import plugin from '../index.js'
import { enforceDesignPermissions, workerAllows } from '../runtime/permissions.mjs'

const defer = () => { let resolve; const promise = new Promise((done) => { resolve = done }); return { promise, resolve } }

function fixture(t, config = {}) {
  const temp = process.platform === 'win32' ? join(process.env.LOCALAPPDATA, 'Temp', 'opencode') : tmpdir()
  const root = mkdtempSync(join(temp, 'design-runtime-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'docs', 'product-design', 'slice'), { recursive: true })
  const store = new Map()
  const requests = []
  const prompts = []
  const parent = { id: 'root', agent: 'design-product', model: { providerID: 'fixture', id: 'none' }, location: { directory: root }, permissions: [] }
  const messages = new Map([['root', [{ type: 'user', id: 'turn-1', text: 'synthetic unit fixture only' }]]])
  const children = []
  const ctx = {
    storage: { get: async (key) => structuredClone(store.get(key)), set: async (key, value) => { store.set(key, structuredClone(value)) } },
    agent: { get: async ({ location }) => {
      assert.deepEqual(location, parent.location)
      return { location: parent.location, data: { permissions: [{ action: '*', resource: '*', effect: 'allow' }, { action: 'edit', resource: 'docs/product-design/**', effect: 'ask' }] } }
    } },
    session: {
      get: async ({ sessionID }) => sessionID === 'root' ? parent : children.find((child) => child.id === sessionID),
      context: async ({ sessionID }) => messages.get(sessionID) ?? [],
      create: async (input) => {
        requests.push(input)
        const child = { id: `child-${children.length + 1}`, ...input }
        children.push(child)
        return child
      },
      prompt: async (input) => { prompts.push(input) },
      wait: async ({ sessionID }) => {
        messages.set(sessionID, [{ type: 'assistant', content: [{ type: 'text', text: 'Synthetic report with evidence; no actual model run.' }] }, { type: 'idle', outcome: 'succeeded' }])
      },
      interrupt: async ({ sessionID }) => { messages.set(sessionID, [{ type: 'idle', outcome: 'interrupted' }]) },
    },
  }
  const options = orchestrationOptions(config)
  const delegate = createDelegator(ctx, options, { capture: async () => {} })
  const controller = new AbortController()
  const context = { sessionID: 'root', agent: 'design-product', messageID: 'message-1', id: 'call-1', signal: controller.signal }
  const input = { worker: 'design-research', packagePath: 'docs/product-design/slice', phase: 'shape', level: 'mockup', objective: 'Inspect the supplied fixture only', sources: 'fixture specification v1, claims unknown', handoff: 'Shape, no approval', checks: 'Cite source paths and limits', stopWhen: 'Question answered or missing source identified', writePaths: [] }
  return { root, store, requests, prompts, parent, messages, children, ctx, delegate, context, input, controller }
}

test('delegation options preserve primary model choice and validate worker budgets/models', () => {
  assert.deepEqual(parseModel('provider/model#high'), { providerID: 'provider', id: 'model', variant: 'high' })
  assert.equal(orchestrationOptions().concurrent, 2)
  assert.equal(orchestrationOptions({ delegation: { enabled: false } }).enabled, false)
  assert.equal(orchestrationOptions().telemetry, false)
  for (const options of [{ delegation: { maxConcurrent: 3 } }, { delegation: { maxLaunches: 0 } }, { delegation: { timeoutMs: -1 } }, { workerModels: { 'design-product': 'p/m' } }, { workerModels: { 'review-design': 'invalid' } }, { agentSteps: { 'unknown': 4 } }, { telemetry: 'true' }]) assert.throws(() => orchestrationOptions(options))
})

test('fresh read-only child gets bounded context, inherited model and narrowing capability scope', async (t) => {
  const f = fixture(t)
  const result = JSON.parse((await f.delegate.execute(f.input, f.context)).content)
  assert.equal(result.status, 'completed')
  assert.equal(result.sessionID, f.children[0].id)
  const request = f.requests[0]
  assert.equal(request.parentID, 'root')
  assert.equal(request.agent, 'design-research')
  assert.deepEqual(request.model, f.parent.model)
  assert.equal(f.store.get(`worker/${request.id}`).worker, 'design-research')
  assert.equal(workerAllows('design-research', 'edit', ['docs/product-design/slice/a.drawio']), false)
  assert.match(f.prompts[0].text, /Parent owns decisions/)
  assert.doesNotMatch(f.prompts[0].text, /synthetic unit fixture only/)
})

test('review stays scoped, worker override is explicit and artifact retains parent approval policy', async (t) => {
  const f = fixture(t, { workerModels: { 'review-design': 'fixture/reviewer#low' } })
  await f.delegate.execute({ ...f.input, worker: 'review-design' }, f.context)
  assert.deepEqual(f.requests[0].model, { providerID: 'fixture', id: 'reviewer', variant: 'low' })
  const output = 'docs/product-design/slice/mockup.drawio'
  await f.delegate.execute({ ...f.input, worker: 'design-artifact', writePaths: [output] }, { ...f.context, id: 'call-2' })
  assert.deepEqual(f.requests[1].permissions.filter((rule) => rule.action === 'edit'), [{ action: 'edit', resource: 'docs/product-design/**', effect: 'ask' }])
  const scope = f.store.get(`worker/${f.requests[1].id}`)
  assert.deepEqual(scope.writePaths, [output])
  assert.equal(workerAllows('design-artifact', 'edit', [output], scope, f.root), true)
  assert.equal(workerAllows('design-artifact', 'edit', ['docs/product-design/slice/screens.md'], scope, f.root), false)
})

test('scope and symlink guards reject unauthorized artifacts and cannot open Technical through product owner', async (t) => {
  const f = fixture(t)
  for (const change of [
    { worker: 'unknown' }, { worker: 'review-design', writePaths: ['docs/product-design/slice/a.drawio'] },
    { worker: 'design-artifact', phase: 'understand', writePaths: ['docs/product-design/slice/a.drawio'] },
    { worker: 'design-artifact', writePaths: ['docs/product-design/other/a.drawio'] },
    { worker: 'design-artifact', writePaths: ['docs/product-design/slice/../a.drawio'] },
    { worker: 'design-artifact', writePaths: ['docs/product-design/slice/screens.md'] },
    { packagePath: '../outside' }, { objective: '' },
  ]) assert.throws(() => validateHandoff({ ...f.input, ...change }, f.root))
  mkdirSync(join(f.root, 'elsewhere'))
  symlinkSync(join(f.root, 'elsewhere'), join(f.root, 'docs', 'product-design', 'slice', 'link'), 'junction')
  assert.throws(() => validateHandoff({ ...f.input, worker: 'design-artifact', writePaths: ['docs/product-design/slice/link/a.drawio'] }, f.root), /Symlink/)
  await assert.rejects(f.delegate.execute({ ...f.input, phase: 'technical', level: 'full' }, f.context), /cannot open Technical/)
  f.parent.parentID = 'another-root'
  await assert.rejects(f.delegate.execute(f.input, f.context), /Nested/)
  assert.equal(f.requests.length, 0)
})

test('concurrent and per-request launch quotas are enforced without recursive workers', async (t) => {
  const f = fixture(t, { delegation: { maxLaunches: 2 } })
  const started = [defer(), defer()]
  const done = [defer(), defer()]
  let waits = 0
  f.ctx.session.wait = async ({ sessionID }) => {
    const index = waits++
    started[index].resolve()
    await done[index].promise
    f.messages.set(sessionID, [{ type: 'assistant', content: [{ type: 'text', text: 'synthetic report' }] }, { type: 'idle', outcome: 'succeeded' }])
  }
  const first = f.delegate.execute(f.input, f.context)
  await started[0].promise
  const second = f.delegate.execute(f.input, { ...f.context, id: 'call-2' })
  await started[1].promise
  await assert.rejects(f.delegate.execute(f.input, { ...f.context, id: 'call-3' }), /budget exhausted/)
  done.forEach((item) => item.resolve())
  await Promise.all([first, second])
  await assert.rejects(f.delegate.execute(f.input, { ...f.context, id: 'call-4' }), /launch budget exhausted/)
  await assert.rejects(f.delegate.execute(f.input, { ...f.context, agent: 'design-research' }), /Only the active/)
})

test('writer lane is exclusive across turns', async (t) => {
  const f = fixture(t)
  const started = defer()
  const done = defer()
  f.ctx.session.wait = async ({ sessionID }) => { started.resolve(); await done.promise; f.messages.set(sessionID, [{ type: 'idle', outcome: 'succeeded' }]) }
  const writer = f.delegate.execute({ ...f.input, worker: 'design-artifact', writePaths: ['docs/product-design/slice/a.drawio'] }, f.context)
  await started.promise
  f.messages.set('root', [{ type: 'user', id: 'turn-2' }])
  await assert.rejects(f.delegate.execute(f.input, { ...f.context, id: 'call-2' }), /artifact writer/)
  done.resolve()
  await writer
  assert.equal(f.requests.length, 1)
})

test('timeout and cancellation interrupt children and report partial rather than retrying', async (t) => {
  const f = fixture(t, { delegation: { timeoutMs: 120 } })
  f.ctx.session.wait = async () => new Promise(() => {})
  await assert.rejects(f.delegate.execute(f.input, f.context), /timed out/)
  assert.equal(f.requests.length, 1)
  const g = fixture(t)
  const started = defer()
  g.ctx.session.wait = async () => { started.resolve(); return new Promise(() => {}) }
  const execution = g.delegate.execute(g.input, g.context)
  await started.promise
  g.controller.abort()
  await assert.rejects(execution, /cancelled/)
  assert.equal(g.requests.length, 1)
  assert.equal(g.messages.get(g.children[0].id).at(-1).type, 'idle')
})

test('registration propagates configured worker models/steps without switching primary models', async () => {
  const agents = new Map()
  const tools = []
  await plugin.setup({
    options: { delegation: { enabled: false }, workerModels: { 'design-research': 'fixture/research#low' }, agentSteps: { 'design-research': 7 } },
    permission: { hook: async () => {} },
    skill: { transform: async (callback) => callback({ add() {} }) },
    agent: { transform: async (callback) => callback({ update(id, change) { const agent = { id, permissions: [], model: { providerID: 'user', id: 'choice' } }; change(agent); agents.set(id, agent) } }) },
    tool: { transform: async (callback) => callback({ add(tool) { tools.push(tool) } }), hook: async () => {} },
    command: { transform: async () => {} },
  })
  assert.deepEqual(agents.get('design-product').model, { providerID: 'user', id: 'choice' })
  assert.deepEqual(agents.get('design-research').model, { providerID: 'fixture', id: 'research', variant: 'low' })
  assert.equal(agents.get('design-research').steps, 7)
  assert.deepEqual(tools.map((tool) => tool.name), ['product_design_usage'])
})

test('permission hook denies reviewer writes despite session allows and never upgrades asks/denies', async (t) => {
  const f = fixture(t)
  let evaluate
  let before
  await enforceDesignPermissions({
    ...f.ctx,
    permission: { hook: async (_, callback) => { evaluate = callback } },
    tool: { hook: async (_, callback) => { before = callback } },
  })
  for (const action of ['edit', 'shell', 'subagent', 'mcp_write', 'product_design_delegate']) {
    const event = { sessionID: 'root', agent: 'review-design', action, resources: ['docs/product-design/slice/a.md'], effect: 'allow' }
    await evaluate(event)
    assert.equal(event.effect, 'deny', action)
  }
  for (const effect of ['ask', 'deny']) {
    const event = { sessionID: 'root', agent: 'design-research', action: 'webfetch', resources: ['https://example.com'], effect }
    await evaluate(event)
    assert.equal(event.effect, effect)
  }
  await assert.rejects(before({ sessionID: 'root', agent: 'review-design', tool: 'write' }), /not available/)
  await assert.rejects(before({ sessionID: 'root', agent: 'design-product', tool: 'subagent' }), /bounded/)
  await f.ctx.storage.set('worker/scoped', { parentID: 'root', directory: f.root, worker: 'design-artifact', writePaths: ['docs/product-design/slice/a.drawio'] })
  const escaped = { sessionID: 'scoped', agent: 'build', action: 'edit', resources: ['docs/product-design/slice/screens.md'], effect: 'allow' }
  await evaluate(escaped)
  assert.equal(escaped.effect, 'deny')
  const exact = { ...escaped, resources: ['docs/product-design/slice/a.drawio'], effect: 'ask' }
  await evaluate(exact)
  assert.equal(exact.effect, 'ask')
})

test('reload/new turn cannot bypass a durable unfinished worker reservation', async (t) => {
  const f = fixture(t)
  f.store.set('delegation/root', { entries: [{ sessionID: 'unknown-child', turn: 'old-turn', worker: 'design-artifact', writePaths: ['docs/product-design/slice/a.drawio'], status: 'running', epoch: 'previous-process' }] })
  await assert.rejects(f.delegate.execute(f.input, f.context))
  assert.equal(f.requests.length, 0)
  const g = fixture(t)
  const entered = defer()
  g.ctx.session.get = async () => { entered.resolve(); await new Promise(() => {}); return g.parent }
  const execution = g.delegate.execute(g.input, g.context)
  await entered.promise
  g.controller.abort()
  await assert.rejects(execution, /cancelled/)
  assert.equal(g.requests.length, 0)
})

test('late prompt admission holds the writer lane until admission settles and interruption follows it', async (t) => {
  const f = fixture(t)
  const entered = defer()
  const admission = defer()
  const interrupted = defer()
  const events = []
  f.ctx.session.prompt = async ({ sessionID }) => {
    entered.resolve()
    await admission.promise
    events.push('admitted')
    f.messages.set(sessionID, [{ type: 'user', id: 'worker-request' }])
  }
  f.ctx.session.interrupt = async ({ sessionID }) => {
    events.push('interrupted')
    f.messages.set(sessionID, [{ type: 'idle', outcome: 'interrupted' }])
    interrupted.resolve()
  }
  const execution = f.delegate.execute({ ...f.input, worker: 'design-artifact', writePaths: ['docs/product-design/slice/a.drawio'] }, f.context)
  const rejected = assert.rejects(execution, /cancelled/)
  await entered.promise
  f.controller.abort()
  f.messages.set('root', [{ type: 'user', id: 'turn-2' }])
  const next = { ...f.context, id: 'call-2', signal: new AbortController().signal }
  await assert.rejects(f.delegate.execute(f.input, next), /still be running|artifact writer/)
  assert.deepEqual(events, [])
  admission.resolve()
  await interrupted.promise
  await rejected
  assert.deepEqual(events, ['admitted', 'interrupted'])
  assert.equal(f.store.get('delegation/root').entries[0].status, 'partial')
})

test('a timed-out pending admission stays fail-closed after tool return and runtime reload', async (t) => {
  const f = fixture(t)
  const entered = defer()
  const admission = defer()
  f.ctx.session.prompt = async ({ sessionID }) => { entered.resolve(); await admission.promise; f.messages.set(sessionID, [{ type: 'user', id: 'late-request' }]) }
  const execution = f.delegate.execute(f.input, f.context)
  const rejected = assert.rejects(execution, /cancelled/)
  await entered.promise
  f.controller.abort()
  await rejected
  assert.ok(['submitting', 'uncertain'].includes(f.store.get('delegation/root').entries[0].status))
  // Even an idle snapshot is insufficient while an old SDK admission may still complete.
  f.messages.set(f.children[0].id, [{ type: 'idle', outcome: 'interrupted' }])
  f.messages.set('root', [{ type: 'user', id: 'turn-2' }])
  const reload = createDelegator(f.ctx, orchestrationOptions(), { capture: async () => {} })
  await assert.rejects(reload.execute(f.input, { ...f.context, id: 'call-2', signal: new AbortController().signal }), /admission\/termination is uncertain/)
  admission.resolve()
  await Promise.resolve()
  assert.equal(f.requests.length, 1)
})

test('pre-launch lookup failures release reservations without allowing replay of the same call', async (t) => {
  const f = fixture(t)
  const get = f.ctx.agent.get
  f.ctx.agent.get = async (input) => {
    const { agentID } = input
    if (agentID === 'design-research') throw new Error('worker unavailable')
    return get(input)
  }
  await assert.rejects(f.delegate.execute(f.input, f.context), /worker unavailable/)
  assert.equal(f.store.get('delegation/root').entries[0].status, 'partial')
  assert.equal(f.requests.length, 0)
  f.ctx.agent.get = get
  await assert.rejects(f.delegate.execute(f.input, f.context), /already reserved/)
  await f.delegate.execute(f.input, { ...f.context, id: 'call-2' })
  assert.equal(f.requests.length, 1)
})

test('late reservation persistence is finalized without launching an abandoned worker', async (t) => {
  const f = fixture(t)
  const entered = defer()
  const persist = defer()
  const set = f.ctx.storage.set
  let first = true
  f.ctx.storage.set = async (key, value) => {
    if (key === 'delegation/root' && first) { first = false; entered.resolve(); await persist.promise }
    await set(key, value)
  }
  const execution = f.delegate.execute(f.input, f.context)
  const rejected = assert.rejects(execution, /cancelled/)
  await entered.promise
  f.controller.abort()
  persist.resolve()
  await rejected
  assert.equal(f.requests.length, 0)
  assert.equal(f.store.get('delegation/root').entries[0].status, 'partial')
  await f.delegate.execute(f.input, { ...f.context, id: 'call-2', signal: new AbortController().signal })
  assert.equal(f.requests.length, 1)
})

test('late session creation is settled before cleanup and never receives a cancelled prompt', async (t) => {
  const f = fixture(t)
  const entered = defer()
  const creation = defer()
  const create = f.ctx.session.create
  f.ctx.session.create = async (input) => { entered.resolve(); await creation.promise; return create(input) }
  const execution = f.delegate.execute(f.input, f.context)
  const rejected = assert.rejects(execution, /cancelled/)
  await entered.promise
  f.controller.abort()
  creation.resolve()
  await rejected
  assert.equal(f.prompts.length, 0)
  assert.equal(f.messages.get(f.children[0].id).at(-1).type, 'idle')
  assert.equal(f.store.get('delegation/root').entries[0].status, 'partial')
})

test('scope-storage failure before submission releases its lane and keeps the original error', async (t) => {
  const f = fixture(t)
  const set = f.ctx.storage.set
  f.ctx.storage.set = async (key, value) => { if (key.startsWith('worker/')) throw new Error('scope storage unavailable'); return set(key, value) }
  await assert.rejects(f.delegate.execute(f.input, f.context), /scope storage unavailable/)
  assert.equal(f.requests.length, 0)
  assert.equal(f.store.get('delegation/root').entries[0].status, 'partial')
  f.ctx.storage.set = set
  await f.delegate.execute(f.input, { ...f.context, id: 'call-2' })
  assert.equal(f.requests.length, 1)
})

test('worker model lookup preserves location envelope and parent ordered asks/denies', async (t) => {
  const f = fixture(t)
  f.parent.permissions = [{ action: 'webfetch', resource: '*', effect: 'ask' }, { action: 'read', resource: 'private/**', effect: 'deny' }]
  const get = f.ctx.agent.get
  f.ctx.agent.get = async (input) => {
    const response = await get(input)
    if (input.agentID === 'design-research') response.data.model = { providerID: 'fixture', id: 'configured-worker' }
    return response
  }
  await f.delegate.execute(f.input, f.context)
  assert.equal(f.requests[0].model.id, 'configured-worker')
  assert.deepEqual(f.requests[0].permissions.slice(-2), f.parent.permissions)
})
