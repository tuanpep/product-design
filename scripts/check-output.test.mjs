import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { checkBuildSpec, checkDrawio, checkIds, checkOutput, checkPackage, checkPrototypeDrawio, checkSketchDrawio, screenStates } from './check-output.mjs'

const example = readFileSync(new URL('../skills/prototype-drawio/references/example.drawio', import.meta.url), 'utf8')
const sketch = readFileSync(new URL('../skills/sketch-drawio/references/example.drawio', import.meta.url), 'utf8')

const document = `# Shift swaps
Standard: product-design/1.0
Profile: discovery
Updated: 2026-10-14
Next gate: repeat discovery
Decision owner: unknown
Approval: proposed

## Recommendation
Investigate the source of roster errors.
## Problem and outcome
Given: the brief reports incorrect rosters.
## Evidence and unknowns
Unknown: where the roster first diverges.
## Needs and requirements
Inferred: staff need an authoritative roster.
## Options
Retain the current process pending discovery.
## Product experience
Deferred: no solution chosen.
## Evaluation plan
Planned: inspect a real swap with staff consent.
## First useful release
Deferred: discovery does not specify production.
## Review and next steps
Design coherence: partial; cause is unknown.
Evidence confidence: untested.
Delivery readiness: not ready; repeat discovery.
## Decision history
2026-10-14: initial proposed discovery recommendation.
`

test('accepts each profile header and native line endings (structural only)', () => {
  for (const [profile, gate] of [
    ['discovery', 'repeat discovery'],
    ['evaluation', 'test solutions'],
    ['build-slice', 'ready for a named build slice'],
  ]) {
    const text = document.replace('Profile: discovery', `Profile: ${profile}`).replace('Next gate: repeat discovery', `Next gate: ${gate}`)
    assert.deepEqual(checkOutput(text), [])
    assert.deepEqual(checkOutput(text.replaceAll('\n', '\r\n')), [])
  }
})

test('rejects missing, duplicate, empty, and inconsistent structure', () => {
  assert.ok(checkOutput(document.replace('## Needs and requirements\n', '## Something else\n')).some((error) => error.includes('ten standard sections')))
  assert.ok(checkOutput(document.replace('Profile: discovery', 'Profile: build-slice')).includes('Profile and next gate disagree.'))
  assert.ok(checkOutput(document.replace('Updated: 2026-10-14', 'Updated: 2026-02-30')).includes('Updated must be a real YYYY-MM-DD date.'))
  assert.ok(checkOutput(document.replace('Approval: proposed', 'Approval: proposed\nApproval: approved')).some((error) => error.includes('one Approval')))
  assert.ok(checkOutput(document.replace('Evidence confidence:', 'Confidence:')).includes('Missing review verdict: Evidence confidence.'))
  assert.ok(checkOutput(document.replace('Investigate the source of roster errors.', '')).includes('Empty section: Recommendation. Explain deferrals instead.'))
})

const screens = `# Shift swap screens
Standard: screens/1.0
Updated: 2026-10-14
Source: product-design.md

## Navigation map
SC1 to SC2.
## Screen inventory
| ID | Screen |
## Screens
### SC1 My shifts
States: default, empty.
### SC2 Ask for cover
States: default, denied (M1).
## Content and copy
M1: Lan would work more than 48 hours this week.
## Accessibility
Target: WCAG 2.2 AA, planned checks.
`

const spec = (status) => `# Shift swap build spec
Standard: build-spec/1.0
Status: ${status}
Slice: request cover
Updated: 2026-10-14
Source: product-design.md

${['Overview', 'Glossary', 'Roles and permissions', 'Domain model', 'States and lifecycle', 'Business rules', 'Screens and navigation'].map((h) => `## ${h}\nSee proposal.\n`).join('')}## Stories and acceptance criteria
S1 As a nurse, I need cover for my shift.
A1 Given Lan has 36 hours When I ask Lan to cover Then Lan receives the request.
${['Integrations and data', 'Quality requirements', 'Rollout and verification', 'Assumptions and open questions'].map((h) => `## ${h}\nSee proposal.\n`).join('')}## Traceability
| Story | Outcome | Check |
| --- | --- | --- |
| S1 | A1 | C1 scripted walkthrough |
`

const journey = `<mxfile><diagram id="p" name="Journey"><mxGraphModel><root>
<mxCell id="0" /><mxCell id="1" parent="0" />
<mxCell id="a" value="Start" vertex="1" parent="1" />
<mxCell id="b" value="End" vertex="1" parent="1" />
<mxCell id="e" edge="1" parent="1" source="a" target="b" />
</root></mxGraphModel></diagram></mxfile>`

function withPackage(files, run) {
  const folder = mkdtempSync(join(tmpdir(), 'product-design-'))
  try {
    for (const [name, content] of Object.entries(files)) writeFileSync(join(folder, name), content)
    return run(folder)
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
}

const proposal = (profile, gate) => document
  .replace('product-design/1.0', 'product-design/1.1')
  .replace('Profile: discovery', `Profile: ${profile}`)
  .replace('Next gate: repeat discovery', `Next gate: ${gate}`)

test('accepts a complete evaluation package and a ready build-slice package', () => {
  withPackage({
    'product-design.md': proposal('evaluation', 'specify a slice'),
    'screens.md': screens,
    'sketch.drawio': sketch,
    'prototype.drawio': example,
    'build-spec.md': spec('draft'),
    'journey.drawio': journey,
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
  withPackage({
    'product-design.md': proposal('build-slice', 'ready for a named build slice'),
    'screens.md': screens,
    'sketch.drawio': sketch,
    'prototype.drawio': example,
    'build-spec.md': spec('ready'),
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
})

test('rejects packages whose files disagree with the profile', () => {
  withPackage({ 'product-design.md': proposal('build-slice', 'ready for a named build slice') }, (folder) => {
    assert.ok(checkPackage(folder).includes('A build-slice proposal needs build-spec.md.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'test solutions'), 'build-spec.md': spec('ready') }, (folder) => {
    assert.ok(checkPackage(folder).includes('build-spec.md is ready but the proposal is not a build-slice.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'test solutions'), 'screens.md': screens }, (folder) => {
    assert.ok(checkPackage(folder).includes('screens.md needs prototype.drawio.'))
    assert.ok(checkPackage(folder).includes('screens.md needs sketch.drawio.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'specify a slice') }, (folder) => {
    assert.ok(checkPackage(folder).includes('Next gate specify a slice needs a draft build-spec.md.'))
  })
  withPackage({ 'product-design.md': proposal('discovery', 'stop'), 'sketch.drawio': sketch }, (folder) => {
    assert.ok(checkPackage(folder).includes('A discovery proposal must not design screens.'))
  })
  withPackage({ 'product-design.md': proposal('discovery', 'stop'), 'screens.md': screens, 'prototype.drawio': example }, (folder) => {
    assert.ok(checkPackage(folder).includes('A discovery proposal must not design screens.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'specify a slice'), 'build-spec.md': spec('draft').replace(/Given.*\n/, 'A1 Lan gets it.\n') }, (folder) => {
    assert.ok(checkPackage(folder).includes('build-spec.md: Acceptance criteria need Given, When, Then.'))
  })
})

test('keeps 1.0 proposals valid without package files', () => {
  withPackage({ 'product-design.md': document.replace('Profile: discovery', 'Profile: build-slice').replace('Next gate: repeat discovery', 'Next gate: ready for a named build slice') }, (folder) => {
    assert.deepEqual(checkPackage(folder), [])
  })
})

test('checks the Draw.io prototype covers every screen in screens.md', () => {
  assert.deepEqual(checkPrototypeDrawio(example, ['SC1', 'SC2']), [])
  assert.ok(checkPrototypeDrawio(example, ['SC3']).includes('prototype.drawio: Missing frame SC3-default for screens.md.'))
  assert.ok(checkPrototypeDrawio(example.replace('target="SC2-denied"', 'target="SC9-denied"')).includes('prototype.drawio: Edge flow-3 points to unknown target SC9-denied.'))
})

test('checks the Draw.io prototype covers every state listed in screens.md', () => {
  assert.deepEqual(screenStates(screens), ['SC1-default', 'SC1-empty', 'SC2-default', 'SC2-denied'])
  assert.deepEqual(screenStates('### SC1 Rooms\n- **States:** default (list); empty: all busy; loading and error use the browser; denied does not apply.\n'), ['SC1-default', 'SC1-empty'])
  assert.deepEqual(checkPrototypeDrawio(example, ['SC1', 'SC2'], screenStates(screens)), [])
  assert.ok(checkPrototypeDrawio(example, ['SC1'], ['SC1-error']).includes('prototype.drawio: Missing frame SC1-error for screens.md.'))
})

test('flags prototype cells that stick out of their frame', () => {
  const moved = example.replace(/(id="SC1-default-title"[\s\S]*?<mxGeometry x=")\d+/, '$15000')
  assert.ok(checkPrototypeDrawio(moved).includes('prototype.drawio: Cell SC1-default-title sticks out of frame SC1-default.'))
})

test('flags IDs that are used but never defined, and requirements nobody uses', () => {
  const proposal = '- N1: see a free room.\n- R1: show room status (N1).\n- R2: book a room (N1).\n'
  assert.deepEqual(checkIds({ 'product-design.md': proposal, 'screens.md': '### SC1 Rooms\nServes R1, R2.\n' }), [])
  assert.ok(checkIds({ 'product-design.md': proposal, 'screens.md': 'Serves R1, R2. Shows M7.' }).includes('screens.md: M7 is referenced but never defined.'))
  assert.ok(checkIds({ 'product-design.md': proposal }).includes('R1 is defined but never used.'))
  assert.deepEqual(checkIds({ 'product-design.md': proposal }, ['<mxCell id="n" value="Serves R1 and R2" vertex="1" parent="1" />']), [])
})

test('checks every acceptance outcome is traced and no trace cell is empty', () => {
  assert.deepEqual(checkBuildSpec(spec('ready')), [])
  assert.ok(checkBuildSpec(spec('ready').replace('| S1 | A1 |', '| S1 | A2 |')).includes('build-spec.md: A1 is missing from Traceability.'))
  assert.ok(checkBuildSpec(spec('ready').replace('C1 scripted walkthrough', ' ')).includes('build-spec.md: Traceability has an empty cell.'))
})

test('checks the Draw.io sketch covers every screen in screens.md', () => {
  assert.deepEqual(checkSketchDrawio(sketch, ['SC1', 'SC2', 'SC3']), [])
  assert.ok(checkSketchDrawio(sketch, ['SC4']).includes('sketch.drawio: Missing frame SC4-sketch for screens.md.'))
})

test('checks Draw.io ids, parents, and edge references', () => {
  assert.deepEqual(checkDrawio(journey), [])
  assert.ok(checkDrawio(journey.replace('target="b"', 'target="z"')).includes('diagram.drawio: Edge e points to unknown target z.'))
  assert.ok(checkDrawio(journey.replace('id="b"', 'id="a"')).includes('diagram.drawio: Cell ids must be unique within a page.'))
  assert.ok(checkDrawio(journey.replace(' source="a"', '')).includes('diagram.drawio: Edge e has no source.'))
  assert.ok(checkDrawio('<mxfile><diagram id="p">7ZbBcpsw</diagram></mxfile>').includes('diagram.drawio: Diagram is compressed; write uncompressed XML.'))
})

test('reads ids from object-wrapped Draw.io cells such as C4 elements', () => {
  const wrapped = journey.replace('<mxCell id="b" value="End" vertex="1" parent="1" />', '<object id="b" label="End" placeholders="1" c4Type="Person"><mxCell vertex="1" parent="1" /></object>')
  assert.deepEqual(checkDrawio(wrapped), [])
  assert.ok(checkDrawio(wrapped.replace('<object id="b"', '<object id="a"')).includes('diagram.drawio: Cell ids must be unique within a page.'))
})

test('every Draw.io skill example is a valid diagram', () => {
  for (const skill of ['erd-drawio', 'state-drawio', 'sequence-drawio', 'context-drawio', 'dataflow-drawio']) {
    const xml = readFileSync(new URL(`../skills/${skill}/references/example.drawio`, import.meta.url), 'utf8')
    assert.deepEqual(checkDrawio(xml, `${skill}/example.drawio`), [])
  }
})
