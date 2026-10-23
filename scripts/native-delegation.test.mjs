import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { enforceDesignPermissions, writerPath, workerAllows } from '../runtime/permissions.mjs'
import { createUsageCollector } from '../runtime/usage.mjs'

async function fixture(t) {
  const root = mkdtempSync(join(process.platform === 'win32' ? join(process.env.LOCALAPPDATA, 'Temp', 'opencode') : tmpdir(), 'native-design-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'docs/product-design/slice/nested'), { recursive: true })
  const hooks = {}
  const sessions = new Map()
  await enforceDesignPermissions({
    permission: { hook: async (name, callback) => { hooks.permission = callback } },
    tool: { hook: async (name, callback) => { hooks.before = callback } },
    session: { get: async ({ sessionID }) => sessions.get(sessionID), hook: async (name, callback) => { hooks.context = callback } },
  })
  function session(agent, child = false) {
    const id = `${agent}-${child}`
    sessions.set(id, { id, agent, ...(child ? { parentID: 'root' } : {}), location: { directory: root } })
    return id
  }
  async function effect(agent, child, action, resources = [], effect = 'allow') {
    const event = { sessionID: session(agent, child), agent, action, resources, effect }
    await hooks.permission(event)
    return event.effect
  }
  return { root, hooks, session, effect }
}

test('native root delegation targets and all child ancestry are constrained without upgrading policy', async (t) => {
  const f = await fixture(t)
  for (const role of ['design-product', 'technical-design', 'review-design']) {
    for (const target of ['design-research', 'review-design']) {
      assert.equal(await f.effect(role, false, 'subagent', [target]), 'allow')
      for (const effect of ['ask', 'deny']) assert.equal(await f.effect(role, false, 'subagent', [target], effect), effect)
    }
    for (const target of ['design-product', 'technical-design', 'code', '*']) assert.equal(await f.effect(role, false, 'subagent', [target]), 'deny')
    assert.equal(await f.effect(role, false, 'subagent'), 'deny')
    assert.equal(await f.effect(role, true, 'subagent', ['design-research']), 'deny')
    for (const action of ['edit', 'shell', 'execute', 'mcp_write', 'product_design_delegate']) assert.equal(await f.effect(role, false, action, ['docs/product-design/slice/a.md']), 'deny')
  }
  assert.equal(await f.effect('design-product', false, 'subagent', ['design-author', 'design-artifact']), 'allow')
  assert.equal(await f.effect('review-design', false, 'subagent', ['design-author']), 'deny')
  assert.equal(await f.effect('code', true, 'subagent', ['code']), 'allow')
  assert.equal(await f.effect('code', false, 'shell'), 'allow')
  assert.equal(await f.effect('design-research', true, 'websearch'), 'allow')
  assert.equal(await f.effect('design-author', true, 'websearch'), 'deny')
})

test('writer paths enforce role extensions, nested package paths and worktree containment', async (t) => {
  const { root } = await fixture(t)
  for (const path of ['docs/product-design/slice/a.md', 'docs/product-design/slice/nested/a.md', join(root, 'docs/product-design/slice/a.md')]) assert.equal(writerPath(root, path, '.md'), true, path)
  if (process.platform === 'win32') assert.equal(writerPath(root, 'docs\\product-design\\slice\\nested\\a.md', '.md'), true)
  for (const path of ['docs/product-design/a.md', '../escape.md', 'docs/product-design/slice/../a.md', 'docs/product-design/slice/a.drawio', 'docs/product-design/slice/a.md:stream', 'C:docs/product-design/slice/a.md', 'D:/docs/product-design/slice/a.md', 'docs/product-design/slice/a.md.', 'docs/product-design/slice/*.md', 'docs/product-design/slice/a.md\0']) assert.equal(writerPath(root, path, '.md'), false, path)
  assert.equal(workerAllows('design-author', 'edit', ['docs/product-design/slice/a.md', 'src/a.md'], root), false)
  assert.equal(workerAllows('design-artifact', 'edit', ['docs/product-design/slice/nested/a.drawio'], root), true)
  assert.equal(workerAllows('design-research', 'edit', ['docs/product-design/slice/a.md'], root), false)
  const outside = join(root, 'outside')
  mkdirSync(outside)
  try { symlinkSync(outside, join(root, 'docs/product-design/slice/link'), process.platform === 'win32' ? 'junction' : 'dir') }
  catch (error) { if (error.code === 'EPERM') { t.diagnostic('Symlink creation unavailable'); return } throw error }
  assert.equal(writerPath(root, 'docs/product-design/slice/link/a.md', '.md'), false)
})

test('catalog filtering removes execute/delegate and leaves direct role tools; mixed patches cannot bypass paths', async (t) => {
  const f = await fixture(t)
  const all = ['read', 'glob', 'grep', 'skill', 'subagent', 'execute', 'product_design_delegate', 'shell', 'mcp_write', 'edit', 'apply_patch', 'webfetch', 'question']
  for (const child of [false, true]) {
    const event = { agent: 'code', sessionID: f.session('code', child), tools: Object.fromEntries(all.map((name) => [name, {}])) }
    await f.hooks.context(event)
    assert.deepEqual(Object.keys(event.tools), all)
    await f.hooks.before({ ...event, tool: 'execute' })
  }
  for (const [role, child, expected] of [
    ['design-product', false, ['read', 'glob', 'grep', 'skill', 'subagent', 'question']],
    ['review-design', true, ['read', 'glob', 'grep', 'skill']],
    ['design-research', true, ['read', 'glob', 'grep', 'skill', 'webfetch']],
    ['design-author', true, ['read', 'glob', 'grep', 'skill', 'edit', 'apply_patch']],
  ]) {
    const event = { agent: role, sessionID: f.session(role, child), tools: Object.fromEntries(all.map((name) => [name, {}])) }
    await f.hooks.context(event)
    assert.deepEqual(Object.keys(event.tools), expected)
  }
  const event = { agent: 'design-author', sessionID: f.session('design-author', true), tool: 'apply_patch', input: { patchText: '*** Begin Patch\n*** Update File: docs/product-design/slice/a.md\n@@\n-x\n+y\n*** End Patch' } }
  await f.hooks.before(event)
  await assert.rejects(f.hooks.before({ ...event, input: { patchText: '*** Begin Patch\n*** Update File: docs/product-design/slice/a.md\n*** Move to: src/a.md\n*** End Patch' } }))
  await assert.rejects(f.hooks.before({ ...event, tool: 'execute' }))
  assert.equal(await f.effect('design-author', true, 'edit', ['docs/product-design/slice/a.md'], 'ask'), 'ask')
})

test('native child usage records observed sessions only and discloses incomplete inventory', async () => {
  const store = new Map()
  const hooks = {}
  const sessions = {
    root: { id: 'root', agent: 'design-product' },
    child: { id: 'child', parentID: 'root', agent: 'design-author' },
  }
  const collector = createUsageCollector({
    storage: { get: async (key) => structuredClone(store.get(key)), set: async (key, data) => { store.set(key, structuredClone(data)) } },
    session: {
      get: async ({ sessionID }) => sessions[sessionID],
      context: async () => [],
      hook: async (name, callback) => { hooks[name] = callback },
    },
    tool: { hook: async () => {} },
  }, true)
  await collector.setup()
  const event = { sessionID: 'child', agent: 'design-author', model: {}, system: [], messages: [], tools: {} }
  await hooks.context(event)
  await hooks.context(event)
  const report = await collector.exportUsage('root')
  assert.deepEqual(report.sessions.map((session) => session.sessionID), ['root', 'child'])
  assert.equal(report.incomplete, true)
  assert.match(report.coverage.childInventory, /may be missing/)
  assert.equal(report.summary.requests, 0)
  assert.equal(report.summary.totals.input, null)
})
