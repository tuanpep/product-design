import assert from 'node:assert/strict'
import test from 'node:test'
import plugin from '../index.js'

test('OpenCode V2 registers bundled skills and a command that attaches the entry skill', async () => {
  const skills = []
  const commands = []
  const prompts = []
  await plugin.setup({
    skill: { transform: async (callback) => callback({ add: (skill) => skills.push(skill) }) },
    command: { transform: async (callback) => callback({ add: (command) => commands.push(command) }) },
    session: { prompt: async (prompt) => { prompts.push(prompt) } },
  })
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
