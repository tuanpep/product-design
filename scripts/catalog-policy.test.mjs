import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const skill = (name) => readFileSync(new URL(`../skills/${name}/SKILL.md`, import.meta.url), 'utf8')
const reference = (name) => readFileSync(new URL(`../skills/design-product/references/${name}.md`, import.meta.url), 'utf8')

test('34 workflow entries share execution boundaries, one standalone sketch and all 18 public principles remain', () => {
  const names = readdirSync(new URL('../skills/', import.meta.url), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  const taskNames = names.filter((name) => !name.startsWith('principle-') && name !== 'sketch-drawio')
  assert.equal(taskNames.length, 34)
  assert.equal(names.filter((name) => name.startsWith('principle-')).length, 18)
  assert.equal(names.length, 53)
  assert.ok(names.includes('sketch-drawio'))
  for (const name of taskNames) {
    assert.match(skill(name), name === 'design-product' ? /references\/execution-kernel\.md/ : /references\/specialist-execution\.md/, name)
    assert.doesNotMatch(skill(name), /^Read \[principle-/m, name)
  }
  for (const name of ['design-composition', 'design-dependency', 'write-content', 'write-plain-copy']) assert.ok(names.includes(name))
  const contract = reference('specialist-execution')
  for (const boundary of [/read-only/, /output cap/, /Preserve IDs/, /withdraw dependent ready claims/, /not automatically/, /read it before citing/]) assert.match(contract, boundary)
})

test('exploration and framing do not reintroduce independent advance or confirmation gates', () => {
  assert.match(skill('explore-solutions'), /explicit advance request opens Shape without another interview or summary-confirmation/)
  assert.doesNotMatch(skill('explore-solutions'), /human confirmation of the summary is required/)
  assert.match(skill('frame-problem'), /explicit advance leaves Understand with unknowns recorded/)
  assert.doesNotMatch(skill('frame-problem'), /Stay in Understand until the gate passes/)
  assert.match(skill('map-stakeholders'), /do not invent solution actions or require a permission matrix/)
  assert.match(skill('map-stakeholders'), /In Specify, complete the applicable/)
})

test('rule coverage, schema disagreement, lifecycle and ADR triggers preserve proportional correctness', () => {
  assert.match(skill('define-rules'), /meaningful feasible outcomes/)
  assert.match(skill('define-rules'), /consequential interaction coverage/)
  assert.doesNotMatch(skill('define-rules'), /covers every combination/)
  assert.match(skill('principle-make-it-testable'), /where applicable, not as a quota/)
  assert.match(reference('workflow'), /do not impose a denial\/boundary quota/)
  assert.match(skill('principle-keep-the-schemas-apart'), /Never change business meaning merely to match/)
  assert.match(skill('state-drawio'), /Do not invent a failure state/)
  assert.match(skill('sequence-drawio'), /stateless interactions need no invented lifecycle/)
  assert.match(skill('principle-record-the-decision'), /Reversible does not mean insignificant/)
  assert.match(skill('design-product'), /technical choice is architecturally significant/)
})

test('composition and dependency share reasoning without losing owners or inventing a cyclic order', () => {
  for (const name of ['design-composition', 'design-dependency']) assert.match(skill(name), /structure-and-dependencies\.md/)
  const procedure = reference('structure-and-dependencies')
  assert.match(procedure, /\*\*Composition\*\*/)
  assert.match(procedure, /\*\*Dependencies\*\*/)
  assert.match(procedure, /Detect cycles/)
  assert.match(procedure, /runtime cycle can coexist with an acyclic implementation plan/)
  assert.match(skill('design-dependency'), /instead of silently including a view/)
})

test('principles and copy procedures load selectively while retaining citation and business-truth safeguards', () => {
  assert.match(reference('principles'), /Load only leaves/)
  assert.match(reference('principles'), /read this session/)
  for (const name of ['design-data', 'design-contract', 'erd-drawio']) {
    assert.doesNotMatch(skill(name), /Read \[principle-/)
    assert.match(skill(name), /selectively/)
  }
  assert.match(skill('write-content'), /substantial rewriting or translationese rather than invoking a second skill unconditionally/)
  assert.match(skill('write-plain-copy'), /references\/plain-copy\.md/)
  const copy = readFileSync(new URL('../skills/write-plain-copy/references/plain-copy.md', import.meta.url), 'utf8')
  assert.match(copy, /pending\/completed\/unknown/)
  assert.match(copy, /Preserve M IDs/)
})

test('triggered assessments route to existing owners and research results reuse the learning loop', () => {
  for (const name of ['accessibility-planning', 'privacy-risk', 'quality-scenarios']) {
    const text = reference(name)
    assert.match(text, /Trigger:/)
    assert.match(text, /define-requirements/)
    assert.match(skill('define-requirements'), new RegExp(`${name}\\.md`))
    assert.match(skill('select-views'), new RegExp(`${name}\\.md`))
  }
  assert.match(reference('accessibility-planning'), /cannot establish full accessibility/)
  assert.match(reference('privacy-risk'), /authorized processing/)
  assert.match(reference('quality-scenarios'), /source\/owner/)
  assert.match(skill('discover-needs'), /learning-loop ingestion/)
  assert.match(skill('design-product'), /analyze these research results/)
  assert.match(skill('decide-next'), /rather than repeating a whole-package review/)
})

test('phase loading keeps compact routing separate from detailed compatibility procedures', () => {
  assert.match(skill('design-product'), /references\/phase-routing\.md/)
  assert.doesNotMatch(skill('design-product'), /First read.*new-idea|Read every.*principle/i)
  const routing = reference('phase-routing')
  for (const phase of ['understand', 'shape', 'specify', 'technical', 'revise']) assert.match(routing, new RegExp(`phases/${phase}\\.md`))
  assert.match(reference('execution-kernel'), /switching agents in the same session does not reset history/)
  assert.match(reference('phases/specify'), /separately requested Technical/)
  assert.match(reference('phases/technical'), /competing\/stale writes from duplicate retries/)
  assert.match(reference('phases/technical'), /withdraw dependent readiness/)
  assert.match(reference('discovery-interview'), /Advance changes activity, not evidence or approval/)
})

test('command and rule adapters retain selective loading and read-only reviewer semantics', () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
  for (const path of ['commands/design-product.md', 'rules/design-product.md', 'rules/technical-design.md']) {
    assert.match(read(path), /execution-kernel\.md/)
    assert.doesNotMatch(read(path), /every principle leaf it names/)
  }
  assert.match(read('rules/review-design.md'), /Keep this review read-only/)
})

test('physical database policy has one owner and preserves exact legacy names', () => {
  const path = 'design-data/references/database-standard.md'
  const standard = readFileSync(new URL(`../skills/${path}`, import.meta.url), 'utf8')
  for (const name of ['design-data', 'erd-drawio']) {
    assert.match(skill(name), /references\/database-standard\.md/)
    assert.match(skill(name), /Use English/)
    assert.match(skill(name), /preserve existing identifiers and externally governed codes exactly/)
  }
  assert.match(reference('technical-design-format'), /design-data\/references\/database-standard\.md/)
  for (const requirement of [/not universal SQL requirements/, /English-only metadata does not mean English-only stored data/, /engine unresolved/, /ON DELETE/, /ON UPDATE/, /ordered child columns/, /does not automatically create a child-side FK index/, /Physical ERD acceptance/, /External research/]) {
    assert.match(standard, requirement)
  }
  assert.match(skill('design-data'), /reason for omitting it/)
  assert.match(skill('erd-drawio'), /not as independent column constraints/)
})
