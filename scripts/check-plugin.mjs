import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export function checkPlugin(folder = root) {
  const errors = []
  const manifestFile = join(folder, '.cursor-plugin', 'plugin.json')
  let manifest
  try {
    manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
  } catch (error) {
    return [`Cannot read Cursor plugin manifest: ${error.message}`]
  }
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(manifest.name ?? '')) errors.push('Manifest needs a lowercase kebab-case name.')
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? '')) errors.push('Manifest needs a semantic version.')
  if (typeof manifest.description !== 'string' || !manifest.description.trim()) errors.push('Manifest needs a description.')
  if (manifest.author?.name !== 'tuanpep') errors.push('Manifest needs author name tuanpep.')
  if (manifest.license !== 'MIT') errors.push('Manifest license must be MIT.')
  if (manifest.skills !== './skills/') errors.push('Manifest must point skills to ./skills/.')
  if (manifest.agents !== './agents/') errors.push('Manifest must point agents to ./agents/.')
  if (manifest.commands !== './commands/') errors.push('Manifest must point commands to ./commands/.')
  if (manifest.logo !== 'assets/avatar.png' || !existsSync(join(folder, 'assets', 'avatar.png'))) errors.push('Manifest logo must be assets/avatar.png.')
  if (!existsSync(join(folder, 'LICENSE'))) errors.push('Missing LICENSE.')

  const standardFile = join(folder, 'plugin.json')
  try {
    const standard = JSON.parse(readFileSync(standardFile, 'utf8'))
    if (standard.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') errors.push('Root plugin.json needs the Agent Plugins schema.')
    if (standard.name !== manifest.name) errors.push('Root plugin.json name must match the Cursor manifest.')
    if (!/^[a-zA-Z0-9-_]+$/.test(standard.name ?? '')) errors.push('Root plugin.json name must match the Antigravity plugin name pattern.')
    if (typeof standard.description !== 'string' || !standard.description.trim()) errors.push('Root plugin.json needs a description.')
    if (standard.version !== manifest.version) errors.push('Root plugin.json version must match the Cursor manifest.')
    if (standard.license !== 'MIT') errors.push('Root plugin.json license must be MIT.')
  } catch (error) {
    errors.push(`Cannot read root plugin.json: ${error.message}`)
  }

  try {
    const marketplace = JSON.parse(readFileSync(join(folder, '.cursor-plugin', 'marketplace.json'), 'utf8'))
    const entry = marketplace.plugins?.find((plugin) => plugin.name === manifest.name)
    if (marketplace.owner?.name !== 'tuanpep') errors.push('Marketplace needs owner name tuanpep.')
    if (!entry || entry.source !== '.') errors.push('Marketplace must list this plugin with source ".".')
  } catch (error) {
    errors.push(`Cannot read marketplace.json: ${error.message}`)
  }

  for (const name of ['design-product', 'technical-design', 'review-design', 'design-research', 'design-artifact', 'design-author']) {
    const agentBody = component(folder, join(folder, 'agents', `${name}.md`), name, errors)
    const opencodeAgent = join(folder, '.opencode', 'agents', `${name}.md`)
    if (!existsSync(opencodeAgent)) errors.push(`Missing OpenCode agent ${name}.`)
    else {
      const parsed = frontmatter(readFileSync(opencodeAgent, 'utf8'))
      if (agentBody && parsed?.body !== agentBody) errors.push(`Cursor and OpenCode ${name} agents must share one prompt.`)
      const header = parsed?.header ?? ''
      const mode = /^mode:\s*(.+)$/m.exec(header)?.[1]?.trim()
      const allows = [...header.matchAll(/ {2}- action:\s*([^\r\n]+)\r?\n {4}resource:\s*([^\r\n]+)\r?\n {4}effect:\s*allow/g)]
        .map((match) => ({ action: match[1].replaceAll('"', '').trim(), resource: match[2].replaceAll('"', '').trim() }))
      if (['design-product', 'technical-design', 'review-design'].includes(name)) {
        if (mode !== (name === 'review-design' ? 'all' : 'primary')) errors.push(`OpenCode ${name} needs its coordinator mode.`)
        if (allows.some(({ action }) => ['edit', 'write', 'patch', 'apply_patch', 'shell', 'execute', 'webfetch', 'websearch', 'subagent'].includes(action))) errors.push(`OpenCode ${name} must not allow direct execution.`)
        if (!allows.some((rule) => rule.action === 'product_design_delegate')) errors.push(`OpenCode ${name} must allow scoped delegation.`)
      }
      if (name === 'design-author') {
        if (mode !== 'subagent') errors.push('OpenCode design-author must be a subagent.')
        if (!allows.some(({ action, resource }) => action === 'edit' && resource === 'docs/product-design/**/*.md')) errors.push('OpenCode design-author needs Markdown-only package writes.')
        if (allows.some(({ action }) => ['shell', 'execute', 'subagent', 'product_design_delegate', 'webfetch', 'websearch'].includes(action))) errors.push('OpenCode design-author must remain a scoped leaf.')
      }
    }
  }
  component(folder, join(folder, 'commands', 'design-product.md'), 'design-product', errors)
  checkAntigravityRule(folder, errors)
  checkClaude(folder, manifest, errors)

  const skillsDir = join(folder, 'skills')
  if (!existsSync(skillsDir) || !statSync(skillsDir).isDirectory()) return [...errors, 'Missing skills directory.']
  const entries = readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
  if (!entries.some((entry) => entry.name === 'design-product')) errors.push('Missing design-product entry skill.')
  for (const entry of entries) {
    const file = join(skillsDir, entry.name, 'SKILL.md')
    if (!existsSync(file)) { errors.push(`Missing ${entry.name}/SKILL.md`); continue }
    const text = readFileSync(file, 'utf8')
    const header = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text)?.[1]
    if (!header) { errors.push(`${entry.name}/SKILL.md needs YAML frontmatter.`); continue }
    const name = /^name:\s*(.+)$/m.exec(header)?.[1]?.trim()
    if (name !== entry.name) errors.push(`${entry.name}/SKILL.md name must match its directory.`)
    if (!/^description:\s*\S/m.test(header)) errors.push(`${entry.name}/SKILL.md needs a description.`)
  }

  checkLinks(skillsDir, folder, errors)
  return errors
}

function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(text)
  if (!match) return undefined
  return { header: match[1], body: match[2].trim() }
}

function component(folder, file, expectedName, errors) {
  const label = file.slice(folder.length + 1)
  if (!existsSync(file)) {
    errors.push(`Missing ${label}`)
    return undefined
  }
  const parsed = frontmatter(readFileSync(file, 'utf8'))
  if (!parsed) {
    errors.push(`${label} needs YAML frontmatter.`)
    return undefined
  }
  const name = /^name:\s*(.+)$/m.exec(parsed.header)?.[1]?.trim()
  if (name !== expectedName) errors.push(`${label} name must be ${expectedName}.`)
  if (!/^description:\s*\S/m.test(parsed.header)) errors.push(`${label} needs a description.`)
  return parsed.body
}

function checkAntigravityRule(folder, errors) {
  const label = 'rules/design-product.md'
  const file = join(folder, 'rules', 'design-product.md')
  if (!existsSync(file)) {
    errors.push(`Missing ${label}`)
    return
  }
  const parsed = frontmatter(readFileSync(file, 'utf8'))
  if (!parsed) {
    errors.push(`${label} needs YAML frontmatter.`)
    return
  }
  const trigger = /^trigger:\s*(.+)$/m.exec(parsed.header)?.[1]?.trim()
  if (trigger !== 'model_decision') errors.push(`${label} trigger must be model_decision.`)
  if (!/^description:\s*\S/m.test(parsed.header)) errors.push(`${label} needs a description.`)
  if (!parsed.body) errors.push(`${label} needs a body.`)
}

function checkClaude(folder, manifest, errors) {
  const pluginFile = join(folder, '.claude-plugin', 'plugin.json')
  let claude
  try {
    claude = JSON.parse(readFileSync(pluginFile, 'utf8'))
  } catch (error) {
    errors.push(`Cannot read Claude plugin manifest: ${error.message}`)
    return
  }
  if (claude.$schema !== 'https://json.schemastore.org/claude-code-plugin-manifest.json') errors.push('Claude plugin manifest needs the Claude Code plugin schema.')
  if (claude.name !== manifest.name) errors.push('Claude plugin manifest name must match the Cursor manifest.')
  if (claude.displayName !== manifest.displayName) errors.push('Claude plugin manifest displayName must match the Cursor manifest.')
  if (claude.version !== manifest.version) errors.push('Claude plugin manifest version must match the Cursor manifest.')
  if (claude.description !== manifest.description) errors.push('Claude plugin manifest description must match the Cursor manifest.')
  if (claude.author?.name !== 'tuanpep' || claude.author?.email !== manifest.author?.email) errors.push('Claude plugin manifest author must match the Cursor manifest.')
  if (claude.license !== 'MIT') errors.push('Claude plugin manifest license must be MIT.')
  if (claude.homepage !== manifest.homepage || claude.repository !== manifest.repository) errors.push('Claude plugin manifest links must match the Cursor manifest.')
  if (claude.icon !== './assets/avatar.png' || !existsSync(join(folder, 'assets', 'avatar.png'))) errors.push('Claude plugin manifest icon must be ./assets/avatar.png.')
  if (claude.documentationUrl !== manifest.homepage) errors.push('Claude plugin manifest documentationUrl must match the homepage.')
  if (claude.supportUrl !== 'https://github.com/tuanpep/product-design/issues') errors.push('Claude plugin manifest supportUrl must be the GitHub issues URL.')
  if (!Array.isArray(claude.commands) || claude.commands.length !== 0) errors.push('Claude plugin manifest must set commands to an empty array so the design-product skill is the only slash command.')
  if (claude.skills !== undefined || claude.agents !== undefined) errors.push('Claude plugin manifest must leave skills and agents on the default directories.')

  try {
    const marketplace = JSON.parse(readFileSync(join(folder, '.claude-plugin', 'marketplace.json'), 'utf8'))
    const entry = marketplace.plugins?.find((plugin) => plugin.name === manifest.name)
    if (marketplace.$schema !== 'https://json.schemastore.org/claude-code-marketplace.json') errors.push('Claude marketplace needs the Claude Code marketplace schema.')
    if (marketplace.name !== manifest.name) errors.push('Claude marketplace name must match the plugin name.')
    if (marketplace.owner?.name !== 'tuanpep') errors.push('Claude marketplace needs owner name tuanpep.')
    if (typeof marketplace.description !== 'string' || !marketplace.description.trim()) errors.push('Claude marketplace needs a description.')
    if (!entry || entry.source !== '.') errors.push('Claude marketplace must list this plugin with source ".".')
    if (entry?.version !== undefined) errors.push('Claude marketplace entry must leave version to plugin.json.')
  } catch (error) {
    errors.push(`Cannot read Claude marketplace.json: ${error.message}`)
  }
}

function checkLinks(directory, folder, errors) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) {
      checkLinks(file, folder, errors)
      continue
    }
    if (!entry.isFile() || !file.endsWith('.md')) continue
    const text = readFileSync(file, 'utf8')
    for (const match of text.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)) {
      const target = match[1]
      if (/^[a-z]+:\/\//i.test(target)) continue
      if (!existsSync(resolve(dirname(file), target))) errors.push(`Broken link in ${file.slice(folder.length + 1)}: ${target}`)
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkPlugin()
  if (errors.length) {
    for (const error of errors) console.error(error)
    process.exitCode = 1
  } else console.log('Plugin manifest, skills, and local links are valid.')
}
