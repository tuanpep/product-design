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

  const agentBody = component(folder, join(folder, 'agents', 'design-product.md'), 'design-product', errors)
  const opencodeAgent = join(folder, '.opencode', 'agents', 'design-product.md')
  if (agentBody && existsSync(opencodeAgent)) {
    const opencodeBody = frontmatter(readFileSync(opencodeAgent, 'utf8'))?.body
    if (opencodeBody !== agentBody) errors.push('Cursor and OpenCode design-product agents must share one prompt.')
  }
  component(folder, join(folder, 'commands', 'design-product.md'), 'design-product', errors)

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
