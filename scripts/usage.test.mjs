import assert from 'node:assert/strict'
import test from 'node:test'
import { createUsageCollector, requestUsage, summarizeUsage } from '../runtime/usage.mjs'

function message(id = 'request-1', extra = {}) {
  return { type: 'assistant', id, agent: 'design-product', model: { providerID: 'fixture', id: 'none', variant: 'low' }, content: [{ type: 'text', text: 'PRIVATE CONTENT MUST NOT BE STORED' }], tokens: { input: 10, output: 3, reasoning: 2, cache: { read: 20, write: 5 } }, cost: 0.01, time: { created: 100, completed: 120 }, ...extra }
}

export function usageDocument() {
  return { schemaVersion: 1, kind: 'execution-usage', rootSessionID: 'root', incomplete: false, sessions: [
    { sessionID: 'root', parentSessionID: null, requests: [requestUsage(message())] },
    { sessionID: 'child', parentSessionID: 'root', requests: [requestUsage(message('request-2', { agent: 'review-design' }))] },
  ] }
}

test('OpenCode normalized usage keeps disjoint cache/reasoning buckets and no content', () => {
  const usage = requestUsage(message())
  assert.deepEqual(usage.tokens, { input: 10, output: 3, reasoning: 2, cacheRead: 20, cacheWrite: 5 })
  assert.equal(usage.latencyMs, 20)
  assert.equal(usage.accounting, 'disjoint')
  assert.equal(usage.model, 'none')
  assert.ok(!JSON.stringify(usage).includes('PRIVATE CONTENT'))
  assert.equal(requestUsage(message('in-progress', { time: { created: 100 } })), null)
  assert.equal(requestUsage({ type: 'compaction', status: 'running' }), null)
})

test('parent and child per-request accounting sums once and preserves missing fields', () => {
  const document = usageDocument()
  const summary = summarizeUsage(document)
  assert.equal(summary.requests, 2)
  assert.equal(summary.sessions, 2)
  assert.deepEqual(summary.totals, { input: 20, output: 6, reasoning: 4, cacheRead: 40, cacheWrite: 10, costUsd: 0.02 })
  assert.equal(summary.incomplete, false)
  document.sessions[1].requests[0].tokens.reasoning = null
  document.sessions[1].requests[0].costUsd = null
  const partial = summarizeUsage(document)
  assert.equal(partial.totals.reasoning, null)
  assert.equal(partial.observed.reasoning, 2)
  assert.equal(partial.missing.reasoning, 1)
  assert.equal(partial.totals.costUsd, null)
  assert.equal(partial.incomplete, true)
})

test('usage rejects inclusive/aggregate records, duplicate calls, or broken/cyclic parentage', () => {
  const mutations = [
    (value) => { value.sessions[0].requests[0].accounting = 'inclusive-output' },
    (value) => { value.sessions[0].requests[0].kind = 'run-total' },
    (value) => { value.sessions[0].requests.push(value.sessions[0].requests[0]) },
    (value) => { value.sessions.push(value.sessions[0]) },
    (value) => { value.sessions[1].parentSessionID = 'absent' },
    (value) => { value.sessions[1].parentSessionID = 'child' },
    (value) => { value.sessions[0].parentSessionID = 'child' },
    (value) => { value.sessions[0].requests[0].tokens.input = -1 },
    (value) => { delete value.sessions[0].requests[0].tokens.cacheRead },
  ]
  for (const mutate of mutations) {
    const document = usageDocument()
    mutate(document)
    assert.throws(() => summarizeUsage(document))
  }
})

test('failed and compaction usage is retained without claiming unknown billing is zero', () => {
  const usage = requestUsage(message('failed', { error: { message: 'fixture failure' }, tokens: undefined, cost: undefined }))
  assert.equal(usage.status, 'failed')
  assert.equal(usage.tokens.input, null)
  assert.equal(usage.costUsd, null)
  const compact = requestUsage({ type: 'compaction', id: 'compact', status: 'completed', tokens: { input: 20, output: 5, reasoning: 0, cache: { read: 0, write: 0 } }, cost: 0.02 })
  assert.equal(compact.kind, 'compaction')
  assert.equal(compact.tokens.input, 20)
  assert.equal(compact.model, null)
})

function collectorFixture() {
  const store = new Map()
  const hooks = new Map()
  const toolHooks = new Map()
  const sessions = new Map([['root', { id: 'root', agent: 'design-product' }], ['child', { id: 'child', parentID: 'root', agent: 'review-design' }]])
  const messages = new Map([['root', [message()]], ['child', [message('request-2', { agent: 'review-design' })]]])
  store.set('delegation/root', { entries: [{ sessionID: 'child', status: 'completed' }] })
  const ctx = {
    storage: { get: async (key) => structuredClone(store.get(key)), set: async (key, value) => { store.set(key, structuredClone(value)) } },
    session: {
      hook: async (name, hook) => { hooks.set(name, hook) },
      context: async ({ sessionID }) => messages.get(sessionID) ?? [],
      get: async ({ sessionID }) => sessions.get(sessionID),
    },
    tool: { hook: async (name, hook) => { toolHooks.set(name, hook) } },
  }
  return { ctx, store, hooks, toolHooks, sessions, messages }
}

test('opt-in telemetry captures deduplicated usage and hashed loads, never prompts or contents', async () => {
  const f = collectorFixture()
  const collector = createUsageCollector(f.ctx, true)
  await collector.setup()
  const event = { sessionID: 'root', agent: 'design-product', model: { providerID: 'fixture', id: 'none' }, system: [{ text: 'PRIVATE SYSTEM' }], messages: [{ text: 'PRIVATE PROMPT' }], tools: { read: { description: 'private description' } } }
  await Promise.all([f.hooks.get('context')(event), f.hooks.get('context')(event)])
  const load = { sessionID: 'root', agent: 'design-product', tool: 'read', status: 'completed', input: { path: 'C:/private/references/policy.md', offset: 4, limit: 12 } }
  await f.toolHooks.get('execute.after')(load)
  await f.toolHooks.get('execute.after')(load)
  await f.hooks.get('retry')({ sessionID: 'root', agent: 'design-product' })
  await f.hooks.get('model.request')({ sessionID: 'root', agent: 'design-product', kind: 'title' })
  const document = await collector.exportUsage('root')
  const root = document.sessions[0]
  assert.equal(root.requests.length, 1)
  assert.equal(root.contextSamples.length, 2)
  assert.equal(root.loads.length, 2)
  assert.equal(root.loads[0].sourceHash, root.loads[1].sourceHash)
  assert.equal(root.loads[0].category, 'reference')
  assert.equal(root.loads[0].sourceHash.length, 64)
  assert.equal(root.retries, 1)
  assert.equal(root.requestKinds.title, 1)
  assert.equal(document.sessions.length, 2)
  assert.equal(document.summary.observed.input, 20)
  assert.equal(document.incomplete, true)
  const serialized = JSON.stringify([...f.store.values()])
  for (const secret of ['PRIVATE', 'C:/private', 'private description']) assert.ok(!serialized.includes(secret))
})

test('disabled telemetry adds no hooks or stored data; on-demand snapshots disclose partial coverage', async () => {
  const f = collectorFixture()
  const collector = createUsageCollector(f.ctx)
  await collector.setup()
  assert.equal(f.hooks.size, 0)
  assert.equal(f.toolHooks.size, 0)
  const document = await collector.exportUsage('root')
  assert.equal(f.store.size, 1)
  assert.equal(document.coverage.telemetryEnabled, false)
  assert.equal(document.summary.requests, 2)
  assert.equal(document.summary.incomplete, true)
})

test('telemetry does not capture unrelated agents and reports unavailable child inventory', async () => {
  const f = collectorFixture()
  const collector = createUsageCollector(f.ctx, true)
  await collector.setup()
  await f.hooks.get('retry')({ agent: 'build', sessionID: 'other' })
  await f.toolHooks.get('execute.after')({ agent: 'build', sessionID: 'other', tool: 'read', status: 'completed', input: { path: 'secret' } })
  assert.equal(f.store.size, 1)
  f.ctx.session.get = async ({ sessionID }) => { if (sessionID === 'child') throw new Error('unavailable'); return f.sessions.get(sessionID) }
  const document = await collector.exportUsage('root')
  assert.equal(document.sessions.length, 1)
  assert.equal(document.errors.length, 1)
  assert.equal(document.incomplete, true)
})

test('disabled export bounds long sessions and source identifiers are not correlated across sessions', async () => {
  const f = collectorFixture()
  f.messages.set('root', Array.from({ length: 2001 }, (_, index) => message(`request-${index}`)))
  const snapshot = await createUsageCollector(f.ctx).exportUsage('root')
  assert.equal(snapshot.sessions[0].requests.length, 2000)
  assert.equal(snapshot.coverage.inventoryTruncated, true)
  const collector = createUsageCollector(f.ctx, true)
  await collector.setup()
  const event = { agent: 'design-product', tool: 'read', status: 'completed', input: { path: 'skills/design-product/SKILL.md' } }
  await f.toolHooks.get('execute.after')({ ...event, sessionID: 'root' })
  await f.toolHooks.get('execute.after')({ ...event, sessionID: 'child' })
  const document = await collector.exportUsage('root')
  assert.notEqual(document.sessions[0].loads[0].sourceHash, document.sessions[1].loads[0].sourceHash)
  assert.ok(!JSON.stringify(document).includes('sourceKey'))
})
