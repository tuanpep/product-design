import assert from 'node:assert/strict'
import test from 'node:test'
import plugin from '../index.js'

test('OpenCode V2 registers bundled skills, the design agent, and a command that attaches the entry skill', async () => {
  const skills = []
  const commands = []
  const prompts = []
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
    session: { prompt: async (prompt) => { prompts.push(prompt) } },
  })
  const agent = agents.get('design-product')
  assert.equal(defaults.length, 0)
  assert.equal(agents.size, 1)
  assert.equal(agent.mode, 'all')
  assert.equal(agent.hidden, false)
  assert.equal(agent.color, '#1f6b4a')
  assert.equal(agent.description, 'Turns a human idea into an evidence-labeled product design proposal')
  assert.match(agent.system, /Load the design-product skill/)
  assert.deepEqual(agent.permissions.slice(1), [
    { action: 'edit', resource: '*', effect: 'deny' },
    { action: 'edit', resource: 'docs/product-design/**', effect: 'allow' },
    { action: 'shell', resource: '*', effect: 'deny' },
  ])
  assert.deepEqual(skills.map(({ id }) => id), [
    'design-product',
    'frame-problem',
    'discover-needs',
    'define-requirements',
    'explore-solutions',
    'design-experience',
    'drawio',
    'plan-evaluation',
    'specify-build',
    'decide-next',
    'review-design',
    'principle-protect-before-you-enable',
    'principle-start-from-the-outcome',
    'principle-include-the-hardest-case',
    'principle-see-the-whole-service',
    'principle-take-on-the-hard-work',
    'principle-behave-predictably',
    'principle-spend-less-of-the-world',
  ])
  assert.ok(skills.every(({ autoinvoke, description }) => autoinvoke === false && description && !description.startsWith('"')))
  assert.equal(skills.find(({ id }) => id === 'principle-start-from-the-outcome').description, 'Apply when a request names a feature, screen, or technology. Design for the goal and the people who have it. Effectiveness outranks speed and delight.')
  assert.ok(skills.every(({ path, content, description }) => path.endsWith('/SKILL.md') && content.startsWith('# ') && description))
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
