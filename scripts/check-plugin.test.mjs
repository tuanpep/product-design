import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { checkPlugin } from './check-plugin.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))

function fixture(t) {
  const folder = mkdtempSync(join(tmpdir(), 'product-design-plugin-'))
  t.after(() => rmSync(folder, { recursive: true, force: true }))
  cpSync(join(root, '.cursor-plugin'), join(folder, '.cursor-plugin'), { recursive: true })
  cpSync(join(root, '.claude-plugin'), join(folder, '.claude-plugin'), { recursive: true })
  cpSync(join(root, 'assets'), join(folder, 'assets'), { recursive: true })
  cpSync(join(root, 'skills'), join(folder, 'skills'), { recursive: true })
  cpSync(join(root, 'agents'), join(folder, 'agents'), { recursive: true })
  cpSync(join(root, 'commands'), join(folder, 'commands'), { recursive: true })
  cpSync(join(root, 'rules'), join(folder, 'rules'), { recursive: true })
  cpSync(join(root, '.opencode'), join(folder, '.opencode'), { recursive: true })
  cpSync(join(root, 'plugin.json'), join(folder, 'plugin.json'))
  cpSync(join(root, 'LICENSE'), join(folder, 'LICENSE'))
  return folder
}

test('bundled plugin has valid metadata and links', () => {
  assert.deepEqual(checkPlugin(root), [])
})

test('package includes runtime and host sources without including Paseo local dependencies', () => {
  const { files } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  for (const path of ['runtime/', 'paseo/client/', 'paseo/server/', 'paseo/shared/', 'paseo/index.client.tsx', 'paseo/index.server.ts', 'paseo/paseo-plugin.json']) assert.ok(files.includes(path), path)
  assert.ok(!files.includes('paseo/'))
  assert.ok(!files.some((path) => path.includes('node_modules')))
})

test('detects a missing skill and a broken local link', (t) => {
  const folder = fixture(t)
  rmSync(join(folder, 'skills', 'design-product', 'SKILL.md'))
  const playbook = join(folder, 'skills', 'design-product', 'playbooks', 'new-idea.md')
  writeFileSync(playbook, readFileSync(playbook, 'utf8') + '\n[missing](../references/absent.md)\n')
  assert.deepEqual(checkPlugin(folder), [
    'Missing design-product/SKILL.md',
    `Broken link in ${join('skills', 'design-product', 'playbooks', 'new-idea.md')}: ../references/absent.md`,
  ])
})

test('rejects unrestricted native delegation and retired wrapper permissions', (t) => {
  const folder = fixture(t)
  const agent = join(folder, '.opencode', 'agents', 'design-product.md')
  const original = readFileSync(agent, 'utf8')
  writeFileSync(agent, original.replace('resource: "design-research"', 'resource: "*"'))
  assert.ok(checkPlugin(folder).includes('OpenCode design-product must allow only its native design subagent targets.'))
  writeFileSync(agent, original.replace('action: subagent', 'action: product_design_delegate'))
  assert.ok(checkPlugin(folder).includes('OpenCode design-product must not allow direct execution or the retired delegation wrapper.'))
})

test('review coordinator cannot acquire native writer targets', (t) => {
  const folder = fixture(t)
  const agent = join(folder, '.opencode', 'agents', 'review-design.md')
  writeFileSync(agent, readFileSync(agent, 'utf8').replace('resource: "design-research"', 'resource: "design-author"'))
  assert.ok(checkPlugin(folder).includes('OpenCode review-design must allow only its native design subagent targets.'))
})

test('production artifact leaf cannot gain delegation access', (t) => {
  const folder = fixture(t)
  const agent = join(folder, '.opencode', 'agents', 'design-artifact.md')
  writeFileSync(agent, readFileSync(agent, 'utf8').replace('action: product_design_usage', 'action: subagent'))
  assert.ok(checkPlugin(folder).includes('OpenCode design-artifact must remain a production leaf.'))
})
