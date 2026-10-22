import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { findSkillCatalog, listDesignPackages, materializeSkills, resolveSkillCatalog } from '../paseo/server/workspace.mjs'
import { assertWorkflowLaunch, workflowPrompt, workflows } from '../paseo/shared/prompt.mjs'
import { canonicalAgent } from './sync-agent-prompts.mjs'

const repo = resolve(fileURLToPath(new URL('..', import.meta.url)))

function temporary(t) {
  const folder = mkdtempSync(join(tmpdir(), 'product-design-paseo-'))
  t.after(() => rmSync(folder, { recursive: true, force: true }))
  return folder
}

function writeSkill(catalog, body = '# Design product\n') {
  const skill = join(catalog, 'design-product')
  mkdirSync(skill, { recursive: true })
  writeFileSync(join(skill, 'SKILL.md'), body)
}

test('paseo commands cover the three product design workflows', () => {
  assert.deepEqual(workflows.map((workflow) => workflow.id), ['design-product', 'review-design', 'technical-design'])
  const prompt = workflowPrompt('design-product', 'C:/skills', 'Staff swap shifts in chat.')
  assert.match(prompt, /C:\/skills\/design-product\/SKILL\.md/)
  assert.match(prompt, /Staff swap shifts in chat\./)
  assert.match(prompt, /Run one phase, then stop/)
  assert.match(prompt, /asks to go next/)
  assert.match(prompt, /without another discovery, confirmation or level question/)
  assert.match(workflowPrompt('technical-design', '/skills', ''), /without additional text/)
  assert.match(workflowPrompt('review-design', '/skills', 'roster'), /review-design\/SKILL\.md/)
  for (const workflow of workflows) assert.equal(workflow.procedure, canonicalAgent(workflow.id).body)
  assert.doesNotMatch(prompt, /Read every other skill and reference/)
  assert.doesNotMatch(workflowPrompt('technical-design', '/skills', 'next'), /Read \/skills\/design-product\/SKILL\.md/)
  assert.throws(() => assertWorkflowLaunch('review-design'), /cannot enforce read-only/)
  assert.doesNotThrow(() => assertWorkflowLaunch('design-product'))
  assert.doesNotThrow(() => assertWorkflowLaunch('technical-design'))
})

test('finds the repository skill catalog from the paseo directory', () => {
  assert.equal(findSkillCatalog(join(repo, 'paseo')), resolve(repo, 'skills'))
})

test('resolves the catalog from the installed plugin path', async (t) => {
  const root = temporary(t)
  const plugin = join(root, 'paseo')
  mkdirSync(plugin)
  writeFileSync(join(plugin, 'paseo-plugin.json'), JSON.stringify({ id: 'product-design' }))
  writeSkill(join(root, 'skills'))
  mkdirSync(join(root, 'other'))
  writeFileSync(join(root, 'other', 'paseo-plugin.json'), JSON.stringify({ id: 'other' }))
  const catalog = await resolveSkillCatalog({
    config: {
      async get() {
        return {
          config: {
            plugins: {
              other: { path: join(root, 'other') },
              local: { source: 'directory', path: plugin },
            },
          },
        }
      },
    },
  })
  assert.equal(catalog, resolve(root, 'skills'))
})

test('reports a missing skill catalog', async (t) => {
  const folder = temporary(t)
  writeFileSync(join(folder, 'paseo-plugin.json'), JSON.stringify({ id: 'product-design' }))
  await assert.rejects(
    resolveSkillCatalog({
      config: { async get() { return { config: { plugins: { local: { path: folder } } } } } },
    }),
    /could not find skills/,
  )
})

test('copies skills into a workspace and replaces the copy when the catalog changes', (t) => {
  const root = temporary(t)
  const catalog = join(root, 'skills')
  const workspace = join(root, 'workspace')
  writeSkill(catalog, '# Design product\n')
  mkdirSync(workspace)
  const copied = materializeSkills(catalog, workspace)
  const marker = join(copied, 'design-product', 'marker.txt')
  writeFileSync(marker, 'keep')
  assert.equal(materializeSkills(catalog, workspace), copied)
  assert.equal(existsSync(marker), true)
  writeSkill(catalog, '# Design product\n\nChanged.\n')
  assert.equal(existsSync(join(materializeSkills(catalog, workspace), 'design-product', 'marker.txt')), false)
  assert.match(readFileSync(join(copied, 'design-product', 'SKILL.md'), 'utf8'), /Changed/)
})

test('uses the workspace skills when that workspace owns the catalog', (t) => {
  const root = temporary(t)
  writeSkill(join(root, 'skills'))
  assert.equal(materializeSkills(join(root, 'skills'), root), resolve(root, 'skills'))
  assert.equal(existsSync(join(root, '.paseo')), false)
})

test('lists design packages from the workspace', (t) => {
  const workspace = temporary(t)
  assert.deepEqual(listDesignPackages(workspace), [])
  const folder = join(workspace, 'docs', 'product-design', 'shift-swap')
  mkdirSync(folder, { recursive: true })
  writeFileSync(join(folder, 'product-design.md'), '# Shift swap\n\nA proposal.\n')
  assert.deepEqual(listDesignPackages(workspace), [{
    slug: 'shift-swap',
    title: 'Shift swap',
    path: join('docs', 'product-design', 'shift-swap'),
  }])
})
