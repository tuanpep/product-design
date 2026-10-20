import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { basename } from 'node:path'
import plugin from '../index.js'

test('OpenCode V2 registers bundled skills, the design agent, and a command that attaches the entry skill', async () => {
  const skills = []
  const commands = []
  const prompts = []
  const switches = []
  const agents = new Map()
  const defaults = []
  await plugin.setup({
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
      switchAgent: async (input) => { switches.push(input) },
      prompt: async (prompt) => {
        assert.deepEqual(switches, [{ sessionID: 'session-1', agent: 'design-product' }])
        prompts.push(prompt)
      },
    },
  })
  const agent = agents.get('design-product')
  assert.equal(defaults.length, 0)
  assert.equal(agents.size, 3)
  assert.equal(agent.mode, 'all')
  assert.equal(agent.hidden, false)
  assert.equal(agent.color, '#1f6b4a')
  assert.equal(agent.description, 'Turns a human idea into an evidence-labeled product design proposal')
  assert.match(agent.system, /Load the design-product skill/)
  assert.match(agent.system, /references\/learning-loop\.md/)
  const packagePermissions = [
    { action: 'edit', resource: '*', effect: 'deny' },
    { action: 'edit', resource: 'docs/product-design/**', effect: 'allow' },
    { action: 'shell', resource: '*', effect: 'deny' },
  ]
  assert.deepEqual(agent.permissions.slice(1), packagePermissions)
  const technical = agents.get('technical-design')
  assert.equal(technical.mode, 'all')
  assert.equal(technical.color, '#1a4f8b')
  assert.match(technical.system, /select-views/)
  assert.deepEqual(technical.permissions.slice(1), packagePermissions)
  const review = agents.get('review-design')
  assert.equal(review.mode, 'all')
  assert.equal(review.color, '#8a4b1f')
  assert.match(review.system, /Load the review-design skill/)
  assert.deepEqual(review.permissions.slice(1), packagePermissions)
  const bundled = readdirSync(new URL('../skills/', import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  assert.deepEqual(skills.map(({ id }) => id), bundled)
  assert.equal(bundled.length, 52)
  assert.ok(!bundled.includes('prototype-drawio'))
  assert.ok(!bundled.includes('sketch-drawio'))
  for (const id of ['design-product', 'mockup-drawio', 'erd-drawio', 'state-drawio', 'sequence-drawio', 'context-drawio', 'dataflow-drawio', 'principle-use-real-content', 'survey-existing']) assert.ok(bundled.includes(id))
  assert.ok(skills.every(({ autoinvoke, description }) => autoinvoke === false && description && !description.startsWith('"')))
  assert.equal(skills.find(({ id }) => id === 'principle-start-from-the-outcome').description, 'Apply when a request names a feature, screen, or technology. Design for the goal and the people who have it. Effectiveness outranks speed and delight.')
  assert.ok(skills.every(({ path, content, description }) => basename(path) === 'SKILL.md' && content.startsWith('# ') && description))
  assert.equal(skills.find(({ id }) => id === 'design-product').autoinvoke, false)
  assert.equal(commands.length, 1)
  assert.equal(commands[0].name, 'design-product')
  await commands[0].execute({
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
  for (const name of ['design-product', 'technical-design', 'review-design']) {
    assert.equal(body(`../agents/${name}.md`), body(`../.opencode/agents/${name}.md`))
  }
})
