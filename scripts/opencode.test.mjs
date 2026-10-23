import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { basename } from 'node:path'
import plugin from '../index.js'
import { agentPrompts } from '../paseo/shared/agent-prompts.mjs'
import { canonicalAgent, syncAgents } from './sync-agent-prompts.mjs'

test('OpenCode V2 registers bundled skills, the design agent, and a command that attaches the entry skill', async () => {
  const skills = []
  const commands = []
  const prompts = []
  const switches = []
  const agents = new Map()
  const defaults = []
  const tools = []
  await plugin.setup({
    storage: { get: async () => undefined },
    tool: { transform: async (callback) => callback({ add: (tool) => tools.push(tool) }), hook: async () => {} },
    permission: { hook: async () => {} },
    skill: { transform: async (callback) => callback({ add: (skill) => skills.push(skill) }) },
    agent: {
      transform: async (callback) => callback({
        default: (id) => defaults.push(id),
        update: (id, update) => {
          const current = agents.get(id) ?? {
            id,
            name: id,
            mode: 'primary',
            hidden: false,
            permissions: [{ action: '*', resource: '*', effect: 'allow' }],
          }
          agents.set(id, current)
          update(current)
          current.id = id
        },
      }),
    },
    command: { transform: async (callback) => callback({ add: (command) => commands.push(command) }) },
    session: {
      hook: async () => {},
      switchAgent: async (input) => { switches.push(input) },
      prompt: async (prompt) => {
        assert.deepEqual(switches, [{ sessionID: 'session-1', agent: 'design-product' }])
        prompts.push(prompt)
      },
    },
  })
  const agent = agents.get('design-product')
  assert.equal(defaults.length, 0)
  assert.equal(agents.size, 6)
  assert.equal(agent.mode, 'primary')
  assert.equal(agent.hidden, false)
  assert.equal(agent.color, '#1f6b4a')
  assert.equal(agent.description, canonicalAgent('design-product').description)
  assert.match(agent.system, /Load the design-product skill/)
  assert.match(agent.system, /references\/learning-loop\.md/)
  assert.deepEqual(agent.permissions[1], { action: '*', resource: '*', effect: 'deny' })
  assert.ok(!agent.permissions.some((rule) => ['edit', 'write', 'shell', 'webfetch', 'websearch'].includes(rule.action) && rule.effect === 'allow'))
  assert.ok(!agent.permissions.some((rule) => rule.action === 'execute' && rule.effect === 'allow'))
   assert.ok(!agent.permissions.some((rule) => rule.action === 'product_design_delegate' && rule.effect === 'allow'))
   assert.deepEqual(agent.permissions.filter((rule) => rule.action === 'subagent' && rule.effect === 'allow').map((rule) => rule.resource).sort(), ['design-artifact', 'design-author', 'design-research', 'review-design'])
  const technical = agents.get('technical-design')
  assert.equal(technical.mode, 'primary')
  assert.equal(technical.color, '#1a4f8b')
  assert.match(technical.system, /phases\/technical\.md/)
  assert.deepEqual(technical.permissions.slice(1), agent.permissions.slice(1))
  const review = agents.get('review-design')
  assert.equal(review.mode, 'all')
  assert.equal(review.color, '#8a4b1f')
  assert.match(review.system, /Load the review-design skill/)
  assert.ok(!review.permissions.some((rule) => rule.action === 'edit' && rule.effect === 'allow'))
   assert.deepEqual(review.permissions.filter((rule) => rule.action === 'subagent' && rule.effect === 'allow').map((rule) => rule.resource).sort(), ['design-research', 'review-design'])
  assert.ok(!review.permissions.some((rule) => rule.action === 'execute' && rule.effect === 'allow'))
  assert.equal(review.steps, 24)
  for (const name of ['design-research', 'design-artifact', 'design-author']) {
    assert.equal(agents.get(name).mode, 'subagent')
    assert.ok(!agents.get(name).permissions.some((rule) => rule.action === 'subagent' && rule.effect === 'allow'))
  }
  const author = agents.get('design-author')
  assert.ok(author.permissions.some((rule) => rule.action === 'edit' && rule.resource === 'docs/product-design/**/*.md' && rule.effect === 'allow'))
  assert.ok(!author.permissions.some((rule) => ['shell', 'product_design_delegate', 'execute', 'webfetch', 'websearch'].includes(rule.action) && rule.effect === 'allow'))
   assert.deepEqual(tools.map((tool) => tool.name), ['product_design_setup', 'product_design_usage'])
  assert.ok(tools.every((tool) => tool.options.codemode === false))
  const bundled = readdirSync(new URL('../skills/', import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  assert.deepEqual(skills.map(({ id }) => id), bundled)
  assert.equal(bundled.length, 53)
  assert.ok(!bundled.includes('prototype-drawio'))
  for (const id of ['design-product', 'mockup-drawio', 'sketch-drawio', 'erd-drawio', 'state-drawio', 'sequence-drawio', 'context-drawio', 'dataflow-drawio', 'principle-use-real-content', 'survey-existing']) assert.ok(bundled.includes(id))
  assert.ok(skills.every(({ autoinvoke, description }) => autoinvoke === false && description && !description.startsWith('"')))
  assert.equal(skills.find(({ id }) => id === 'principle-start-from-the-outcome').description, 'Apply when a request names a feature, screen, or technology. Design for the goal and the people who have it. Effectiveness outranks speed and delight.')
  assert.ok(skills.every(({ path, content, description }) => basename(path) === 'SKILL.md' && content.startsWith('# ') && description))
  assert.equal(skills.find(({ id }) => id === 'design-product').autoinvoke, false)
  assert.equal(commands.length, 2)
  assert.equal(commands[0].name, 'setup-product-design')
  assert.equal(commands[1].name, 'design-product')
  await commands[1].execute({
    sessionID: 'session-1',
    prompt: { text: 'Help nurses arrange shift swaps', files: [{ uri: 'file:///brief.md' }], skills: [{ id: 'existing' }] },
    delivery: 'queue',
  })
  assert.deepEqual(prompts, [{
    sessionID: 'session-1',
    text: 'Develop or revise a product design for this request:\n\nHelp nurses arrange shift swaps',
    files: [{ uri: 'file:///brief.md' }],
    skills: [{ id: 'existing' }, { id: 'design-product' }],
    delivery: 'queue',
  }])
})

test('host agent prompts share the same workflow instructions', () => {
  const body = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
    .replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '').trim()
  for (const name of ['design-product', 'technical-design', 'review-design', 'design-research', 'design-artifact', 'design-author']) {
    assert.equal(body(`../agents/${name}.md`), body(`../.opencode/agents/${name}.md`))
    assert.equal(body(`../agents/${name}.md`), agentPrompts[name])
  }
  assert.deepEqual(syncAgents(), [])
})

test('fresh-install setup restores only plugin role models and isolates the setup conversation', async () => {
  const agents = new Map()
  let contextHook
  const saved = { 'design-product': { providerID: 'fixture', id: 'planner' }, 'design-author': { providerID: 'fixture', id: 'writer' } }
  await plugin.setup({
    options: {},
    storage: { get: async (key) => key === 'setup/models' ? saved : key === 'setup/setup-session' ? true : undefined },
    permission: { hook: async () => {} },
    skill: { transform: async () => {} },
    agent: { transform: async (callback) => callback({ update(id, change) { const agent = { id, permissions: [] }; change(agent); agents.set(id, agent) } }) },
    tool: { transform: async () => {}, hook: async () => {} },
    command: { transform: async () => {} },
    session: { hook: async (name, callback) => { if (name === 'context') contextHook = callback } },
  })
  assert.deepEqual(agents.get('design-product').model, saved['design-product'])
  assert.deepEqual(agents.get('design-author').model, saved['design-author'])
  assert.equal(agents.get('technical-design').model, undefined)
  const event = { sessionID: 'setup-session', system: [], tools: { question: {}, product_design_setup: {}, skill: {}, product_design_delegate: {}, shell: {}, execute: {}, mcp_write: {} } }
  await contextHook(event)
  assert.deepEqual(Object.keys(event.tools), ['question', 'product_design_setup'])
  assert.match(event.system[0].text, /Setup-only turn/)
  const normal = { sessionID: 'normal', system: [], tools: { skill: {} } }
  await contextHook(normal)
  assert.deepEqual(normal, { sessionID: 'normal', system: [], tools: { skill: {} } })
})
