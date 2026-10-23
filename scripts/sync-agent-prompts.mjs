import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = fileURLToPath(new URL('..', import.meta.url))
export const profiles = {
  'design-product': { mode: 'primary', color: '#1f6b4a', writes: [], coordinator: true },
  'technical-design': { mode: 'primary', color: '#1a4f8b', writes: [], coordinator: true },
  'review-design': { mode: 'all', color: '#8a4b1f', writes: [], steps: 24, coordinator: true },
  'design-research': { mode: 'subagent', color: '#7952a3', writes: [], steps: 20, web: true },
  'design-author': { mode: 'subagent', color: '#2563eb', writes: ['docs/product-design/**/*.md'], steps: 40 },
  'design-artifact': { mode: 'subagent', color: '#9a6700', writes: ['docs/product-design/**/*.drawio'], steps: 40 },
}

export function canonicalAgent(name, directory = root) {
  const text = readFileSync(resolve(directory, 'agents', `${name}.md`), 'utf8').replace(/\r\n/g, '\n')
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text)
  if (!match) throw new Error(`Invalid canonical agent: ${name}`)
  const description = /^description:\s*(.+)$/m.exec(match[1])?.[1]
  if (!description) throw new Error(`Missing description: ${name}`)
  return { description, body: match[2].trim() }
}

export function generatedFiles(directory = root) {
  const files = new Map()
  const prompts = {}
  for (const [name, profile] of Object.entries(profiles)) {
    const { description, body } = canonicalAgent(name, directory)
    prompts[name] = body
    const rules = [{ action: '*', resource: '*', effect: 'deny' }]
    for (const action of ['read', 'glob', 'grep', 'skill', 'external_directory']) rules.push({ action, resource: '*', effect: 'allow' })
    for (const resource of profile.writes) rules.push({ action: 'edit', resource, effect: 'allow' })
    if (profile.web) {
      for (const action of ['webfetch', 'websearch']) rules.push({ action, resource: '*', effect: 'allow' })
    }
    if (profile.coordinator) {
      rules.push({ action: 'question', resource: '*', effect: 'allow' })
      const targets = name === 'review-design'
        ? ['design-research', 'review-design']
        : ['design-research', 'design-author', 'design-artifact', 'review-design']
      for (const resource of targets) rules.push({ action: 'subagent', resource, effect: 'allow' })
      rules.push({ action: 'product_design_setup', resource: '*', effect: 'allow' })
    }
    rules.push({ action: 'product_design_usage', resource: '*', effect: 'allow' })
    const header = ['---', `description: ${description}`, `mode: ${profile.mode}`, `color: "${profile.color}"`, ...(profile.steps ? [`steps: ${profile.steps}`] : []), 'permissions:', ...rules.flatMap(({ action, resource, effect }) => [`  - action: ${action}`, `    resource: "${resource}"`, `    effect: ${effect}`]), '---', '', body, ''].join('\n')
    files.set(`.opencode/agents/${name}.md`, header)
  }
  files.set('paseo/shared/agent-prompts.mjs', `// Generated from agents/*.md by scripts/sync-agent-prompts.mjs.\nexport const agentPrompts = ${JSON.stringify(prompts, null, 2)};\n`)
  return files
}

export function syncAgents(write = false, directory = root) {
  const stale = []
  for (const [path, expected] of generatedFiles(directory)) {
    let actual
    try { actual = readFileSync(resolve(directory, path), 'utf8').replace(/\r\n/g, '\n') } catch { actual = undefined }
    if (actual === expected) continue
    stale.push(path)
    if (write) writeFileSync(resolve(directory, path), expected)
  }
  return stale
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes('--write')
  const stale = syncAgents(write)
  if (stale.length && !write) {
    console.error(`Stale agent adapters; run npm run sync:agents:\n${stale.join('\n')}`)
    process.exitCode = 1
  } else console.log(write ? `Updated ${stale.length} agent adapters.` : 'Agent adapters match canonical prompts.')
}
