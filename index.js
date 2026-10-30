import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Plugin } from '@opencode/plugin'
import { orchestrationOptions, parseModel } from './runtime/delegation.mjs'
import { createUsageCollector } from './runtime/usage.mjs'
import { createSetup } from './runtime/setup.mjs'

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

function agentDefinition(id) {
  const path = join(directory, '.opencode', 'agents', `${id}.md`)
  const { fields, body } = frontmatterOf(path)
  const description = field(fields, 'description')
  const mode = field(fields, 'mode')
  const model = field(fields, 'model')
  const steps = field(fields, 'steps')
  if (!description || !mode || !body) throw new Error(`Incomplete agent definition: ${path}`)
  if (steps && (!/^\d+$/.test(steps) || Number(steps) < 1)) throw new Error(`Invalid steps: ${path}`)
  return {
    id,
    description,
    mode,
    color: field(fields, 'color'),
    system: body,
    permissions: permissionRules(fields),
    ...(model ? { model: parseModel(model) } : {}),
    ...(steps ? { steps: Number(steps) } : {}),
  }
}

function agentDefinitions() {
  return readdirSync(join(directory, '.opencode', 'agents'))
    .filter((name) => name.endsWith('.md'))
    .map((name) => agentDefinition(name.slice(0, -3)))
    .sort((a, b) => a.id.localeCompare(b.id))
}

export default Plugin.define({
  id: 'product-design',
  async setup(ctx) {
    const options = orchestrationOptions(ctx.options)
    let setupModels = {}
    const setup = await createSetup(ctx, { overrides: options.workerModels, onModels: (models) => { setupModels = models } })
    const definitions = skills.map(definition)
    await ctx.skill.transform((editor) => {
      for (const skill of definitions) editor.add(skill)
    })
    const agents = agentDefinitions()
    await ctx.agent.transform((editor) => {
      for (const agent of agents) {
        editor.update(agent.id, (current) => {
          current.description = agent.description
          current.mode = agent.mode
          current.color = agent.color
          current.system = agent.system
          current.hidden = false
          current.permissions.push(...agent.permissions)
          const model = options.workerModels[agent.id] ?? setupModels[agent.id] ?? agent.model
          if (model) current.model = model
          const steps = options.agentSteps[agent.id] ?? agent.steps
          if (steps) current.steps = steps
        })
      }
    })
    const usage = createUsageCollector(ctx, options.telemetry)
    await ctx.session.hook('context', async (event) => {
      if (!await ctx.storage.get(`setup/${event.sessionID}`)) return
      event.system.push({ type: 'text', text: 'Setup-only turn for this product-design plugin. Do not load skills, design a product, create artifacts, delegate, or change providers/default agents. Ask the human to choose available models for the four plugin roles, then call product_design_setup. Report errors without claiming setup succeeded.' })
      for (const name of Object.keys(event.tools)) if (!['question', 'product_design_setup'].includes(name)) delete event.tools[name]
    })
    await usage.setup()
    await ctx.tool.transform((editor) => {
      editor.add(setup.tool)
      editor.add({
        name: 'product_design_usage',
        options: { codemode: false },
        description: 'Read this session and child usage with cache/reasoning buckets and coverage limits. Does not run a model or estimate missing tokens. Optional telemetry provides loading/context counts, never document contents.',
        input: { type: 'object', properties: { detail: { type: 'boolean', description: 'Explicitly return the full bounded ledger for external evaluation recording; otherwise a compact summary only.' } }, additionalProperties: false },
        execute: async (input, context) => {
          const document = await usage.exportUsage(context.sessionID)
          return { content: JSON.stringify(input.detail ? document : { rootSessionID: document.rootSessionID, summary: document.summary, coverage: document.coverage, sessions: document.sessions.map((session) => ({ sessionID: session.sessionID, requests: session.requests.length, retries: session.retries, requestKinds: session.requestKinds, readCalls: session.loads.length, repeatedSources: session.loads.length - new Set(session.loads.map((load) => load.sourceHash)).size })) }) }
        },
      })
    })
    await ctx.command.transform((editor) => {
      editor.add(setup.command)
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
