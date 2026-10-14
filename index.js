import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Plugin } from '@opencode/plugin'

const directory = dirname(fileURLToPath(import.meta.url))
const skills = readdirSync(join(directory, 'skills'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()

function unquote(value) {
  const trimmed = value?.trim()
  if (trimmed?.length > 1 && trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1)
  return trimmed
}

function frontmatterOf(path) {
  const markdown = readFileSync(path, 'utf8')
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(markdown)
  if (!frontmatter) throw new Error(`Missing frontmatter: ${path}`)
  return { fields: frontmatter[1], body: frontmatter[2].trim() }
}

function field(fields, name) {
  return unquote(fields.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1])
}

function permissionRules(fields) {
  const rules = []
  let current
  for (const line of fields.split(/\r?\n/)) {
    const action = line.match(/^ {2}- action:\s*(.+)$/)
    if (action) {
      current = { action: unquote(action[1]) }
      rules.push(current)
      continue
    }
    if (!current) continue
    const resource = line.match(/^ {4}resource:\s*(.+)$/)
    if (resource) current.resource = unquote(resource[1])
    const effect = line.match(/^ {4}effect:\s*(.+)$/)
    if (effect) current.effect = unquote(effect[1])
  }
  for (const rule of rules) {
    if (!rule.action || !rule.resource || !rule.effect) {
      throw new Error('Incomplete agent permission rule')
    }
  }
  return rules
}

function definition(id) {
  const path = join(directory, 'skills', id, 'SKILL.md')
  const { fields, body } = frontmatterOf(path)
  const description = field(fields, 'description')
  if (!description) throw new Error(`Missing skill description: ${path}`)
  return {
    id,
    name: field(fields, 'name') ?? id,
    description,
    path,
    content: body,
    autoinvoke: field(fields, 'disable-model-invocation') !== 'true',
  }
}

function agentDefinition() {
  const path = join(directory, '.opencode', 'agents', 'design-product.md')
  const { fields, body } = frontmatterOf(path)
  const description = field(fields, 'description')
  const mode = field(fields, 'mode')
  if (!description || !mode || !body) throw new Error(`Incomplete agent definition: ${path}`)
  return {
    id: 'design-product',
    description,
    mode,
    color: field(fields, 'color'),
    system: body,
    permissions: permissionRules(fields),
  }
}

export default Plugin.define({
  id: 'product-design',
  async setup(ctx) {
    const definitions = skills.map(definition)
    await ctx.skill.transform((editor) => {
      for (const skill of definitions) editor.add(skill)
    })
    const agent = agentDefinition()
    await ctx.agent.transform((editor) => {
      editor.update(agent.id, (current) => {
        current.description = agent.description
        current.mode = agent.mode
        current.color = agent.color
        current.system = agent.system
        current.hidden = false
        current.permissions.push(...agent.permissions)
      })
    })
    await ctx.command.transform((editor) => {
      editor.add({
        name: 'design-product',
        description: 'Develop or revise an evidence-labeled product design from an idea',
        execute: async ({ sessionID, prompt, delivery }) => {
          await ctx.session.switchAgent({ sessionID, agent: 'design-product' })
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Develop or revise a product design for this request:\n\n${prompt.text}`,
            skills: [...(prompt.skills ?? []), { id: 'design-product' }],
            delivery,
          })
        },
      })
    })
  },
})
