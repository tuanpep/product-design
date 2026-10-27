import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const skill = (name) => readFileSync(new URL(`../skills/${name}/SKILL.md`, import.meta.url), 'utf8')
const reference = (name) => readFileSync(new URL(`../skills/design-product/references/${name}.md`, import.meta.url), 'utf8')

test('essentials catalog: task skills, twelve principles, no mockup/technical leaves', () => {
  const names = readdirSync(new URL('../skills/', import.meta.url), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  const taskNames = names.filter((name) => !name.startsWith('principle-'))
  const principles = names.filter((name) => name.startsWith('principle-'))
  assert.equal(taskNames.length, 17)
  assert.equal(principles.length, 12)
  assert.equal(names.length, 29)
  for (const gone of ['mockup-drawio', 'sketch-drawio', 'design-screens', 'drawio', 'select-views', 'design-data', 'erd-drawio', 'technical-design']) {
    assert.equal(names.includes(gone), false, gone)
  }
  for (const name of taskNames) {
    assert.match(skill(name), name === 'design-product' ? /references\/execution-kernel\.md/ : /references\/specialist-execution\.md/, name)
    assert.doesNotMatch(skill(name), /Read \[principle-/i, name)
    if (name !== 'design-product' && name !== 'review-design') {
      assert.match(skill(name), /only for a direct call without an owner|scope\/policy conflict/i, name)
    }
  }
  const contract = reference('specialist-execution')
  for (const boundary of [/read-only/, /output cap|cap/, /Preserve IDs|IDs/, /readiness/, /citation/]) assert.match(contract, boundary)
  assert.doesNotMatch(contract, /technical-design-format|screens-format/)
})

test('exploration and framing keep advance semantics without mockup handoff', () => {
  assert.match(skill('explore-solutions'), /explicit advance request opens Shape without another interview or summary-confirmation/)
  assert.match(skill('frame-problem'), /explicit advance leaves Understand with unknowns recorded/)
  assert.match(skill('map-stakeholders'), /do not invent solution actions or require a permission matrix/)
  assert.doesNotMatch(skill('design-experience'), /mockup-drawio|screens\.md|journey\.drawio/)
  assert.doesNotMatch(skill('design-product'), /mockup\.drawio|technical-design/)
})

test('phase loading is essentials-only with three caps', () => {
  assert.match(skill('design-product'), /references\/phase-routing\.md/)
  const routing = reference('phase-routing')
  for (const phase of ['understand', 'shape', 'specify', 'revise']) assert.match(routing, new RegExp(`phases/${phase}\\.md`))
  assert.doesNotMatch(routing, /phases\/technical/)
  assert.match(reference('execution-kernel'), /design-documents/)
  assert.match(reference('output-standard'), /Level: understand \| design-documents \| full/)
  assert.doesNotMatch(reference('output-standard'), /mockup\.drawio|technical-design\.md/)
  const newIdea = readFileSync(new URL('../skills/design-product/playbooks/new-idea.md', import.meta.url), 'utf8')
  assert.match(newIdea, /design-documents/)
  assert.doesNotMatch(newIdea, /Read \[principle-/i)
})

test('command and rule adapters retain selective loading and read-only reviewer semantics', () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
  for (const path of ['commands/design-product.md', 'rules/design-product.md']) {
    assert.match(read(path), /execution-kernel\.md/)
    assert.doesNotMatch(read(path), /every principle leaf it names|mockup\.drawio|technical-design/)
  }
  assert.match(read('rules/review-design.md'), /Keep this review read-only/)
  assert.equal(readdirSync(new URL('../rules/', import.meta.url)).includes('technical-design.md'), false)
})

test('triggered assessments still route to existing owners', () => {
  for (const name of ['accessibility-planning', 'privacy-risk', 'quality-scenarios']) {
    const text = reference(name)
    assert.match(text, /Trigger:/)
  }
  assert.match(skill('discover-needs'), /learning-loop ingestion/)
  assert.match(skill('decide-next'), /rather than repeating a whole-package review/)
})
