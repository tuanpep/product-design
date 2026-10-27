import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createSetup, setupAgentIDs } from '../runtime/setup.mjs'

const choices = (value = 'inherit') => ({ models: Object.fromEntries(setupAgentIDs.map((id) => [id, value])) })

function fixture(saved) {
  const storage = new Map(saved ? [['setup/models', saved]] : [])
  const calls = []
  const state = { parentID: undefined, failReload: false, available: [{ providerID: 'test', id: 'model', enabled: true, capabilities: { tools: true }, variants: [{ id: 'deep' }] }] }
  const ctx = {
    storage: {
      get: async (key) => structuredClone(storage.get(key)),
      set: async (key, value) => { calls.push(['set', key]); storage.set(key, structuredClone(value)) },
    },
    model: { list: async () => { calls.push(['list']); return { data: state.available } } },
    agent: { reload: async () => { calls.push(['reload']); if (state.failReload) throw new Error('reload failed') } },
    session: {
      get: async ({ sessionID }) => ({ id: sessionID, parentID: state.parentID, location: { directory: 'workspace' } }),
      switchAgent: async (input) => { calls.push(['switchAgent', input]) },
      prompt: async (input) => { calls.push(['prompt', input]) },
      synthetic: async (input) => { calls.push(['synthetic', input]) },
    },
  }
  return { ctx, storage, calls, state, arm: () => storage.set('setup/root', true) }
}

test('fresh initialization only reads storage, remains inherited and is idempotent', async () => {
  const seen = []
  const ctx = { storage: { get: async (key) => { assert.equal(key, 'setup/models'); return undefined } } }
  for (let i = 0; i < 2; i++) {
    const setup = await createSetup(ctx, { onModels: (models) => seen.push(models) })
    assert.deepEqual(setup.models, {})
    assert.equal(setup.tool.options.codemode, false)
    assert.deepEqual(setup.tool.input.properties.models.required, setupAgentIDs)
    assert.equal(setup.tool.input.properties.models.additionalProperties, false)
  }
  assert.deepEqual(seen, [{}, {}])
})

test('loads persisted refs and applies exact choices, including explicit inherit', async () => {
  const f = fixture({ 'design-author': { providerID: 'old', id: 'model' } })
  const seen = []
  const setup = await createSetup(f.ctx, { onModels: (models) => seen.push(models), overrides: { 'design-product': { providerID: 'explicit', id: 'model' } } })
  assert.equal(seen[0]['design-author'].providerID, 'old')
  f.arm()
  const input = choices()
  input.models['design-product'] = 'test/model#deep'
  const result = JSON.parse((await setup.tool.execute(input, { sessionID: 'root' })).content)
  assert.deepEqual(result.models, { 'design-product': { providerID: 'test', id: 'model', variant: 'deep' } })
  assert.equal(result.inherited.length, 3)
  assert.match(result.warnings.join(' '), /explicit workerModels option takes precedence/)
  assert.deepEqual(f.storage.get('setup/models'), result.models)
  assert.deepEqual(setup.models, result.models)
  assert.equal(f.storage.get('setup/root'), false)
  assert.equal(f.calls.filter(([name]) => name === 'reload').length, 1)
  assert.ok(f.calls.every(([name]) => ['set', 'list', 'reload'].includes(name)))
  f.arm()
  await setup.tool.execute(choices(), { sessionID: 'root' })
  assert.deepEqual(f.storage.get('setup/models'), {})
})

test('rejects missing/unknown targets and invalid or unavailable models without saving', async () => {
  const f = fixture()
  const setup = await createSetup(f.ctx)
  f.arm()
  const missing = choices(); delete missing.models['design-author']
  const unknown = choices(); delete unknown.models['design-author']; unknown.models.other = 'inherit'
  const invalidType = choices(); invalidType.models['design-product'] = null
  for (const input of [missing, unknown, invalidType, choices('unknown/model'), choices('test/model#absent'), choices('bad')]) {
    await assert.rejects(setup.tool.execute(input, { sessionID: 'root' }))
  }
  for (const change of [{ enabled: false }, { capabilities: { tools: false } }]) {
    f.state.available = [{ ...f.state.available[0], ...change }]
    await assert.rejects(setup.tool.execute(choices('test/model'), { sessionID: 'root' }))
  }
  assert.equal(f.storage.has('setup/models'), false)
  assert.equal(f.storage.get('setup/root'), true)
  assert.equal(f.calls.some(([name]) => name === 'reload'), false)
})

test('child and unarmed sessions cannot apply or start setup', async () => {
  const f = fixture()
  const setup = await createSetup(f.ctx)
  await assert.rejects(setup.tool.execute(choices(), { sessionID: 'root' }), /Run \/setup-product-design/)
  f.arm(); f.state.parentID = 'parent'
  await assert.rejects(setup.tool.execute(choices(), { sessionID: 'root' }), /root session/)
  await assert.rejects(setup.command.execute({ sessionID: 'root', prompt: { text: '' } }), /root session/)
  assert.deepEqual(f.calls, [])
})

test('reload failure restores persisted and effective refs, leaves setup armed, and permits retry', async () => {
  const previous = { 'design-author': { providerID: 'test', id: 'model' } }
  const f = fixture(previous)
  let effective
  const setup = await createSetup(f.ctx, { onModels: (models) => { effective = models } })
  f.arm(); f.state.failReload = true
  await assert.rejects(setup.tool.execute(choices(), { sessionID: 'root' }), /Previous settings restored/)
  assert.deepEqual(f.storage.get('setup/models'), previous)
  assert.deepEqual(effective, previous)
  assert.deepEqual(setup.models, previous)
  assert.equal(f.storage.get('setup/root'), true)
  f.state.failReload = false
  await setup.tool.execute(choices(), { sessionID: 'root' })
  assert.deepEqual(effective, {})
  assert.equal(f.storage.get('setup/root'), false)
})

test('wizard lists enabled tools models, preserves delivery and attaches no skills or model switch', async () => {
  const f = fixture()
  f.state.available.push({ providerID: 'off', id: 'model', enabled: false, capabilities: { tools: true }, variants: [] })
  const setup = await createSetup(f.ctx)
  const delivery = { mode: 'test' }
  await setup.command.execute({ sessionID: 'root', prompt: { text: '', skills: [{ id: 'unwanted' }] }, delivery })
  const prompt = f.calls.find(([name]) => name === 'prompt')[1]
  assert.equal(prompt.skills, undefined)
  assert.equal(prompt.model, undefined)
  assert.equal(prompt.delivery, delivery)
  for (const id of setupAgentIDs) assert.ok(prompt.text.includes(id))
  assert.ok(prompt.text.includes('test/model#deep'))
  assert.ok(!prompt.text.includes('off/model'))
  assert.match(prompt.text, /question tool/)
  assert.match(prompt.text, /Never choose a model without the user selecting it/)
  assert.deepEqual(f.calls.find(([name]) => name === 'switchAgent')[1], { sessionID: 'root', agent: 'design-product' })
  assert.equal(f.storage.get('setup/root'), true)
  assert.ok(f.calls.every(([name]) => ['list', 'switchAgent', 'set', 'prompt'].includes(name)))
})

test('status and cancel do not invoke models, switch agents or run inference; invalid arguments fail', async () => {
  const f = fixture()
  const setup = await createSetup(f.ctx)
  await setup.command.execute({ sessionID: 'root', prompt: { text: 'status' }, delivery: 'delivery' })
  assert.equal(f.storage.has('setup/root'), false)
  assert.equal(f.calls[0][0], 'synthetic')
  assert.equal(f.calls[0][1].resume, false)
  assert.equal(f.calls[0][1].delivery, 'delivery')
  assert.deepEqual(JSON.parse(f.calls[0][1].text).models, {})
  f.arm()
  await setup.command.execute({ sessionID: 'root', prompt: { text: 'cancel' } })
  assert.equal(f.storage.get('setup/root'), false)
  await assert.rejects(setup.command.execute({ sessionID: 'root', prompt: { text: '{"models":{}}' } }), /Use \/setup-product-design/)
  assert.ok(f.calls.every(([name]) => ['synthetic', 'set'].includes(name)))
})

test('concurrent apply is rejected while reload is pending', async () => {
  const f = fixture()
  let release
  let entered
  const pending = new Promise((resolve) => { entered = resolve })
  f.ctx.agent.reload = async () => { entered(); await new Promise((resolve) => { release = resolve }) }
  const setup = await createSetup(f.ctx)
  f.arm()
  const first = setup.tool.execute(choices(), { sessionID: 'root' })
  await pending
  await assert.rejects(setup.tool.execute(choices(), { sessionID: 'root' }), /already in progress/)
  release()
  await first
})

test('storage write failure does not update effective models or reload agents', async () => {
  const f = fixture()
  let effective
  const setup = await createSetup(f.ctx, { onModels: (models) => { effective = models } })
  f.arm()
  f.ctx.storage.set = async () => { throw new Error('storage unavailable') }
  await assert.rejects(setup.tool.execute(choices('test/model'), { sessionID: 'root' }), /storage unavailable/)
  assert.deepEqual(effective, {})
  assert.deepEqual(setup.models, {})
  assert.equal(f.storage.has('setup/models'), false)
  assert.equal(f.calls.some(([name]) => name === 'reload'), false)
  assert.equal(f.storage.get('setup/root'), true)
})

test('all agents may inherit when no enabled tool-capable models are available', async () => {
  const f = fixture()
  f.state.available = []
  const setup = await createSetup(f.ctx)
  f.arm()
  const result = JSON.parse((await setup.tool.execute(choices(), { sessionID: 'root' })).content)
  assert.deepEqual(result.inherited, setupAgentIDs)
  assert.deepEqual(result.models, {})
})

test('post-commit disarm failure reports saved models and explicit cleanup instead of a false apply failure', async () => {
  const f = fixture()
  const setup = await createSetup(f.ctx)
  f.arm()
  const set = f.ctx.storage.set
  f.ctx.storage.set = async (key, value) => {
    if (key === 'setup/root' && value === false) throw new Error('disarm write failed')
    await set(key, value)
  }
  const result = JSON.parse((await setup.tool.execute(choices('test/model'), { sessionID: 'root' })).content)
  assert.equal(result.status, 'saved-cleanup-required')
  assert.deepEqual(result.models, f.storage.get('setup/models'))
  assert.deepEqual(setup.models, result.models)
  assert.equal(f.calls.filter(([name]) => name === 'reload').length, 1)
  assert.equal(f.storage.get('setup/root'), true)
  assert.match(result.warnings.join(' '), /Models were saved.*cancel; do not reapply/)
  f.ctx.storage.set = set
  await setup.command.execute({ sessionID: 'root', prompt: { text: 'cancel' } })
  assert.equal(f.storage.get('setup/root'), false)
})

test('prompt submission failure disarms the setup session', async () => {
  const f = fixture()
  f.ctx.session.prompt = async () => { throw new Error('prompt unavailable') }
  const setup = await createSetup(f.ctx)
  await assert.rejects(setup.command.execute({ sessionID: 'root', prompt: { text: '' } }), /prompt unavailable/)
  assert.equal(f.storage.get('setup/root'), false)
  assert.equal(f.storage.has('setup/models'), false)
})
