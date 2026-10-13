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
  if (manifest.skills !== './skills/') errors.push('Manifest must point skills to ./skills/.')

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

  function checkLinks(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name)
      if (entry.isDirectory()) { checkLinks(file); continue }
      if (!entry.isFile() || !file.endsWith('.md')) continue
      const text = readFileSync(file, 'utf8')
      for (const match of text.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)) {
        const target = match[1]
        if (/^[a-z]+:\/\//i.test(target)) continue
        if (!existsSync(resolve(dirname(file), target))) errors.push(`Broken link in ${file.slice(folder.length + 1)}: ${target}`)
      }
    }
  }
  checkLinks(skillsDir)
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkPlugin()
  if (errors.length) {
    for (const error of errors) console.error(error)
    process.exitCode = 1
  } else console.log('Plugin manifest, skills, and local links are valid.')
}
