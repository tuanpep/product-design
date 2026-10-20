import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { checkBuildSpec, checkDrawio, checkIds, checkMockupDrawio, checkOutput, checkPackage, checkScreens, checkTechnicalDesign, screenStates } from './check-output.mjs'

const example = readFileSync(new URL('../skills/mockup-drawio/references/example.drawio', import.meta.url), 'utf8')

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

const technical = (status) => `# Shift swap technical design
Standard: technical-design/1.0
Status: ${status}
Slice: request cover
Updated: 2026-10-14
Source: product-design.md

${['Design subject', 'Design concerns', 'Design views', 'Composition', 'Dependencies', 'Information model', 'Service contract', 'Deployment and resources', 'Threats', 'Decisions', 'Correspondences'].map((heading) => `## ${heading}\nIncluded or omitted with a reason.\n`).join('')}
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
    for (const [name, content] of Object.entries(files)) {
      const path = join(folder, name)
      mkdirSync(dirname(path), { recursive: true })
      writeFileSync(path, content)
    }
    return run(folder)
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
}

const proposal = (profile, gate) => document
  .replace('product-design/1.0', 'product-design/1.1')
  .replace('Profile: discovery', `Profile: ${profile}`)
  .replace('Next gate: repeat discovery', `Next gate: ${gate}`)

const atLevel = (text, level) => text.replace('Profile:', `Level: ${level}\nProfile:`)

test('checks optional Level headers without changing legacy proposals', () => {
  for (const level of ['understand', 'design-documents', 'mockup', 'full']) {
    assert.deepEqual(checkOutput(atLevel(document, level)), [])
  }
  assert.deepEqual(checkOutput(document), [])
  for (const level of ['', 'production', 'prototype', 'full | mockup']) {
    assert.ok(checkOutput(atLevel(document, level)).includes('Invalid level.'))
  }
  assert.ok(checkOutput(atLevel(atLevel(document, 'full'), 'full')).some((error) => error.includes('one Level')))
  assert.ok(checkOutput(atLevel(proposal('evaluation', 'test solutions'), 'understand')).includes('Level understand requires the discovery profile.'))
  for (const level of ['understand', 'design-documents', 'mockup']) {
    assert.ok(checkOutput(atLevel(proposal('build-slice', 'ready for a named build slice'), level)).some((error) => error.includes('build-slice proposal requires Level: full')))
    assert.ok(checkOutput(atLevel(proposal('evaluation', 'specify a slice'), level)).some((error) => error.includes('Next gate specify a slice requires Level: full')))
  }
  assert.deepEqual(checkOutput(atLevel(proposal('build-slice', 'ready for a named build slice'), 'full')), [])
})

test('rejects retired Draw.io filenames with or without an explicit level or canonical mockup', () => {
  for (const level of [undefined, 'mockup', 'full']) {
    for (const retired of ['prototype.drawio', '1-nurse-ask-cover/prototype.drawio', '1.1-choose-colleague/prototype.drawio']) {
      for (const canonical of [false, true]) {
        const text = proposal('evaluation', 'test solutions')
        const files = {
          'product-design.md': level ? atLevel(text, level) : text,
          [retired]: example,
        }
        if (canonical) files[retired.replace('prototype.drawio', 'mockup.drawio')] = example
        withPackage(files, (folder) => {
          assert.ok(checkPackage(folder).includes(`${retired}: Obsolete prototype.drawio; rename to mockup.drawio and update links.`))
        })
      }
    }
  }
})

test('accepts lower-level packages with deliberate artifact deferrals', () => {
  for (const [level, profile, gate] of [
    ['understand', 'discovery', 'repeat discovery'],
    ['design-documents', 'evaluation', 'test solutions'],
  ]) {
    const text = atLevel(proposal(profile, gate), level).replace('Deferred: no solution chosen.', 'Proposed interface; screens and mockup deliberately deferred by the requested level. Planned learning materials remain inline here.')
    withPackage({ 'product-design.md': text }, (folder) => assert.deepEqual(checkPackage(folder), []))
  }
})

test('rejects canonical artifacts above an explicit output cap, including step mockups', () => {
  for (const level of ['understand', 'design-documents', 'mockup']) {
    const text = atLevel(proposal(level === 'understand' ? 'discovery' : 'evaluation', level === 'understand' ? 'repeat discovery' : 'test solutions'), level)
    withPackage({ 'product-design.md': text, 'build-spec.md': spec('draft') }, (folder) => {
      assert.ok(checkPackage(folder).includes(`Level ${level} must not include build-spec.md.`))
    })
    if (level === 'mockup') continue
    for (const files of [{ 'screens.md': screens }, { 'mockup.drawio': example }, { '1-ask/mockup.drawio': example }]) {
      withPackage({ 'product-design.md': text, ...files }, (folder) => {
        assert.ok(checkPackage(folder).includes(`Level ${level} must not include screens.md or mockup.drawio.`))
      })
    }
  }
})

test('applies level caps consistently for accepted header whitespace', () => {
  for (const header of ['Level:mockup', 'Level:\tmockup', 'Level: mockup']) {
    const text = atLevel(proposal('evaluation', 'test solutions'), 'mockup').replace('Level: mockup', header)
    assert.deepEqual(checkOutput(text), [])
    withPackage({ 'product-design.md': text, 'build-spec.md': spec('draft') }, (folder) => {
      assert.ok(checkPackage(folder).includes('Level mockup must not include build-spec.md.'))
    })
  }
})

test('rejects misplaced canonical Markdown files in package subfolders', () => {
  for (const name of ['screens.md', 'build-spec.md', 'product-design.md']) {
    for (const dir of ['1-ask', 'research']) {
      withPackage({ 'product-design.md': atLevel(proposal('evaluation', 'test solutions'), 'mockup'), [`${dir}/${name}`]: 'Misplaced canonical file.' }, (folder) => {
        assert.ok(checkPackage(folder).includes(`${dir}/${name}: Canonical Markdown files belong in the package root, not a subfolder.`))
      })
    }
  }
})

test('keeps screen and state coverage at mockup and full levels', () => {
  for (const level of ['mockup', 'full']) {
    const files = { 'product-design.md': atLevel(proposal('evaluation', 'test solutions'), level), 'screens.md': screens }
    withPackage(files, (folder) => assert.ok(checkPackage(folder).includes('screens.md needs mockup.drawio.')))
    withPackage({ ...files, 'mockup.drawio': example }, (folder) => assert.deepEqual(checkPackage(folder), []))
    withPackage({ ...files, 'screens.md': screens.replace('States: default, empty.', 'States: default, empty, error.'), 'mockup.drawio': example }, (folder) => {
      assert.ok(checkPackage(folder).includes('mockup.drawio: Missing frame SC1-error for screens.md.'))
    })
  }
  withPackage({ 'product-design.md': atLevel(proposal('evaluation', 'specify a slice'), 'full') }, (folder) => {
    assert.ok(checkPackage(folder).includes('Next gate specify a slice needs a draft build-spec.md.'))
  })
  withPackage({ 'product-design.md': atLevel(proposal('evaluation', 'specify a slice'), 'mockup') }, (folder) => {
    const errors = checkPackage(folder)
    assert.ok(errors.some((error) => error.includes('Next gate specify a slice requires Level: full')))
    assert.ok(!errors.includes('Next gate specify a slice needs a draft build-spec.md.'))
  })
})

test('accepts a complete evaluation package and a ready build-slice package', () => {
  withPackage({
    'product-design.md': proposal('evaluation', 'specify a slice'),
    'screens.md': screens,
    'mockup.drawio': example,
    'build-spec.md': spec('draft'),
    'journey.drawio': journey,
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
  withPackage({
    'product-design.md': proposal('build-slice', 'ready for a named build slice'),
    'screens.md': screens,
    'mockup.drawio': example,
    'build-spec.md': spec('ready'),
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
  withPackage({
    'product-design.md': proposal('build-slice', 'ready for a named build slice'),
    'screens.md': screens,
    'mockup.drawio': example,
    'build-spec.md': spec('ready'),
    'technical-design.md': technical('ready'),
    'openapi.yaml': 'openapi: 3.1.0\n',
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
})

test('checks a technical design when the package includes one', () => {
  assert.deepEqual(checkTechnicalDesign(technical('draft')), [])
  assert.ok(checkTechnicalDesign(technical('draft').replace('## Correspondences\nIncluded or omitted with a reason.\n', '')).some((error) => error.includes('technical-design.md: Expected the')))
  const text = atLevel(proposal('evaluation', 'test solutions'), 'mockup')
  withPackage({ 'product-design.md': text, 'technical-design.md': technical('draft') }, (folder) => {
    assert.ok(checkPackage(folder).includes('Level mockup must not include technical-design.md.'))
  })
  withPackage({ 'product-design.md': text, '1-ask/openapi.yaml': 'openapi: 3.1.0\n' }, (folder) => {
    assert.ok(checkPackage(folder).includes('1-ask/openapi.yaml: Contract files belong in the package root, not a subfolder.'))
  })
  withPackage({
    'product-design.md': proposal('build-slice', 'ready for a named build slice'),
    'build-spec.md': spec('ready'),
    'technical-design.md': technical('draft'),
  }, (folder) => {
    assert.ok(checkPackage(folder).includes('technical-design.md status must match build-spec.md.'))
  })
})

test('rejects packages whose files disagree with the profile', () => {
  withPackage({ 'product-design.md': proposal('build-slice', 'ready for a named build slice') }, (folder) => {
    assert.ok(checkPackage(folder).includes('A build-slice proposal needs build-spec.md.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'test solutions'), 'build-spec.md': spec('ready') }, (folder) => {
    assert.ok(checkPackage(folder).includes('build-spec.md is ready but the proposal is not a build-slice.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'test solutions'), 'screens.md': screens }, (folder) => {
    assert.ok(checkPackage(folder).includes('screens.md needs mockup.drawio.'))
  })
  withPackage({ 'product-design.md': proposal('evaluation', 'specify a slice') }, (folder) => {
    assert.ok(checkPackage(folder).includes('Next gate specify a slice needs a draft build-spec.md.'))
  })
  withPackage({ 'product-design.md': proposal('discovery', 'stop'), 'mockup.drawio': example }, (folder) => {
    assert.ok(checkPackage(folder).includes('A discovery proposal must not design screens.'))
  })
  withPackage({ 'product-design.md': proposal('discovery', 'stop'), 'screens.md': screens, 'mockup.drawio': example }, (folder) => {
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

test('checks the Draw.io mockup covers every screen in screens.md', () => {
  assert.deepEqual(checkMockupDrawio(example, ['SC1', 'SC2']), [])
  assert.ok(checkMockupDrawio(example, ['SC3']).includes('mockup.drawio: Missing frame SC3-default for screens.md.'))
  assert.ok(checkMockupDrawio(example.replace('target="SC2-denied"', 'target="SC9-denied"')).includes('mockup.drawio: Edge flow-3 points to unknown target SC9-denied.'))
})

test('checks the Draw.io mockup covers every state listed in screens.md', () => {
  assert.deepEqual(screenStates(screens), ['SC1-default', 'SC1-empty', 'SC2-default', 'SC2-denied'])
  assert.deepEqual(screenStates('### SC1 Rooms\n- **States:** default (list); empty: all busy; loading and error use the browser; denied does not apply.\n'), ['SC1-default', 'SC1-empty'])
  assert.deepEqual(checkMockupDrawio(example, ['SC1', 'SC2'], screenStates(screens)), [])
  const missingDenied = example.replace(/<mxCell\b[^>]*\bid="SC2-denied"[^>]*>[\s\S]*?<\/mxCell>/, '')
  assert.notEqual(missingDenied, example)
  assert.ok(checkMockupDrawio(missingDenied, ['SC1', 'SC2'], screenStates(screens)).includes('mockup.drawio: Missing frame SC2-denied for screens.md.'))
  assert.ok(checkMockupDrawio(example, ['SC1'], ['SC1-error']).includes('mockup.drawio: Missing frame SC1-error for screens.md.'))
})

test('flags mockup cells that stick out of their frame', () => {
  const moved = example.replace(/(id="SC1-default-title"[\s\S]*?<mxGeometry x=")\d+/, '$15000')
  assert.ok(checkMockupDrawio(moved).includes('mockup.drawio: Cell SC1-default-title sticks out of frame SC1-default.'))
})

function stateDiagram(frames) {
  return `<mxfile><diagram id="p"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/>${frames.map(([id, x, y]) => `<mxCell id="${id}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="100" height="80" as="geometry"/></mxCell>`).join('')}</root></mxGraphModel></diagram></mxfile>`
}

test('places screens in task order without imposing technical-state columns', () => {
  const frames = [['SC9-default', 40, 80], ['SC9-denied', 180, 80], ['SC2-default', 40, 240], ['SC2-empty', 180, 240], ['SC2-error', 320, 240]]
  assert.deepEqual(checkMockupDrawio(stateDiagram(frames), ['SC9', 'SC2']), [])
  assert.ok(checkMockupDrawio(stateDiagram(frames), ['SC2', 'SC9']).some((error) => error.includes('task order')))
  const shifted = (id, x, y) => frames.map((frame) => frame[0] === id ? [id, x, y] : frame)
  assert.deepEqual(checkMockupDrawio(stateDiagram(shifted('SC9-denied', 180, 90))), [])
  assert.deepEqual(checkMockupDrawio(stateDiagram(shifted('SC9-denied', 320, 80))), [])
  const reversed = frames.map(([id, x, y]) => [id === 'SC2-empty' ? 'SC2-error' : id === 'SC2-error' ? 'SC2-empty' : id, x, y])
  assert.deepEqual(checkMockupDrawio(stateDiagram(reversed)), [])
  assert.ok(checkMockupDrawio(stateDiagram(shifted('SC9-denied', 90, 80))).some((error) => error.includes('overlap')))
})

test('supports business journey views without requiring routine technical states', () => {
  const markdown = screens.replace('States: default, empty.', 'Views: default (draft); awaiting-approval (owner); approved (obligations).')
  assert.deepEqual(checkScreens(markdown), [])
  assert.deepEqual(screenStates(markdown), ['SC1-default', 'SC1-awaiting-approval', 'SC1-approved', 'SC2-default', 'SC2-denied'])
  const views = ['SC1-default', 'SC1-awaiting-approval', 'SC1-approved']
  const xml = stateDiagram(views.map((id, i) => [id, 40 + i * 140, 80]))
  assert.deepEqual(checkMockupDrawio(xml, ['SC1'], views), [])
  assert.ok(checkMockupDrawio(xml, ['SC1'], [...views, 'SC1-withdrawal-request']).some((error) => error.includes('Missing frame SC1-withdrawal-request')))
  assert.ok(checkMockupDrawio(xml, ['SC1'], [...views].reverse()).some((error) => error.includes('journey order')))
  const clipped = xml.replace('</root>', '<mxCell id="SC1-awaiting-approval-title" vertex="1" parent="1"><mxGeometry x="900" y="80" width="100" height="20" as="geometry"/></mxCell></root>')
  assert.ok(checkMockupDrawio(clipped).some((error) => error.includes('sticks out of frame SC1-awaiting-approval')))
  assert.ok(checkScreens(markdown.replace('awaiting-approval (owner)', 'Awaiting Approval')).some((error) => error.includes('kebab-case')))
  assert.ok(checkScreens(markdown.replace('approved (obligations)', 'awaiting-approval-confirm')).some((error) => error.includes('prefix')))
  assert.ok(checkScreens(markdown.replace('approved (obligations)', 'approved-note')).some((error) => error.includes('-note')))
  assert.ok(checkMockupDrawio(xml, ['SC1']).some((error) => error.includes('Undeclared business view')))
})

test('reads designed states with recovery details and treats slow responses as loading', () => {
  assert.deepEqual(screenStates('### SC8 Rooms\nStates: default; partial [cached rooms]; error with recovery; denied: M1; offline (retry); error with recovery.\n'), ['SC8-default', 'SC8-partial', 'SC8-error', 'SC8-denied', 'SC8-offline'])
  assert.ok(checkScreens(screens.replace('States: default, empty.', 'States: default; slow (retry).')).some((error) => error.includes('under loading')))
  const allStates = ['default', 'empty', 'loading', 'partial', 'error', 'denied', 'success', 'offline']
  const markdown = `### SC8 Rooms\nStates: ${allStates.join('; ')}.\n`
  assert.deepEqual(screenStates(markdown), allStates.map((state) => `SC8-${state}`))
  const xml = stateDiagram(allStates.map((state, index) => [`SC8-${state}`, 40 + index * 140, 80]))
  assert.deepEqual(checkMockupDrawio(xml, ['SC8'], screenStates(markdown)), [])
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

test('checks traceability for every supported acceptance definition format', () => {
  for (const definition of ['A1', '- A1', '* A1', '**A1**', '- **A1**', '### A1', '| A1 |']) {
    const text = spec('ready').replace('A1 Given', `${definition} Given`)
    assert.deepEqual(checkBuildSpec(text), [])
    assert.ok(checkBuildSpec(text.replace('| S1 | A1 |', '| S1 | A2 |'))
      .includes('build-spec.md: A1 is missing from Traceability.'))
  }
})

test('reports undefined IDs in diagram labels with their filename', () => {
  const diagram = journey.replace('value="Start"', 'value="Apply BR99"')
  assert.deepEqual(checkIds({}, [diagram]), ['diagram 1: BR99 is referenced but never defined.'])
  assert.deepEqual(checkIds({}, [{ name: '1-ask/process.drawio', xml: diagram }]), [
    '1-ask/process.drawio: BR99 is referenced but never defined.',
  ])
  assert.deepEqual(checkIds({ 'build-spec.md': '- BR99: require approval.' }, [diagram]), [])
  withPackage({ 'product-design.md': document, 'journey.drawio': diagram }, (folder) => {
    assert.ok(checkPackage(folder).includes('journey.drawio: BR99 is referenced but never defined.'))
  })
})

test('rejects malformed XML and diagrams without a graph', () => {
  for (const xml of [
    '<mxfile>', '<mxfile></mxfile>', '<mxfile/>',
    journey.slice(0, -9), journey.replace('</root>', '</wrong>'),
    journey.replace('value="Start"', 'value="A & B"'),
    '<mxfile><diagram id="p"/></mxfile>',
    '<mxfile><diagram id="p"></diagram></mxfile>',
    '<mxfile><diagram id="p"><mxGraphModel/></diagram></mxfile>',
    `<other>${journey}</other>`,
  ]) {
    assert.ok(checkDrawio(xml).length > 0, xml)
    withPackage({ 'product-design.md': document, 'journey.drawio': xml }, (folder) => {
      assert.ok(checkPackage(folder).some((error) => error.startsWith('journey.drawio:')), xml)
    })
  }
  assert.deepEqual(checkDrawio(journey.replace('value="Start"', 'value="A &amp; B"')), [])
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

test('reads several flows from step folders in parent/child order', () => {
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-nurse-ask-cover/mockup.drawio': example,
    '1-nurse-ask-cover/1.1-nurse-choose-colleague/journey.drawio': journey,
    '2-colleague-accept-cover/journey.drawio': journey,
  }, (folder) => assert.deepEqual(checkPackage(folder), []))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-ask/mockup.drawio': example,
    '3-accept/journey.drawio': journey,
  }, (folder) => assert.ok(checkPackage(folder).includes('Step folders are not numbered in parent/child order. Parents are 1, 2, 3.')))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-ask/mockup.drawio': example,
    '1-ask/1.2-later/journey.drawio': journey,
  }, (folder) => assert.ok(checkPackage(folder).includes('Children of step 1 are not numbered 1.1, 1.2.')))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1.1-choose/mockup.drawio': example,
  }, (folder) => assert.ok(checkPackage(folder).includes('Step 1.1 has no parent folder 1-.')))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-ask/mockup.drawio': example,
    '1-other/journey.drawio': journey,
  }, (folder) => assert.ok(checkPackage(folder).includes('Step folders repeat an index. Number each business step once.')))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-ask/mockup.drawio': example,
    '01-old/journey.drawio': journey,
  }, (folder) => assert.ok(checkPackage(folder).some((error) => error.includes('Group a business step as <index>-<step>'))))
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    'mockup.drawio': example,
    '1-ask/mockup.drawio': example,
  }, (folder) => assert.ok(checkPackage(folder).some((error) => error.includes('mockup.drawio is in the package folder and in a step folder.'))))
  withPackage({
    'product-design.md': proposal('discovery', 'stop'),
    '1-ask/mockup.drawio': example,
  }, (folder) => assert.ok(checkPackage(folder).includes('A discovery proposal must not design screens.')))
})

test('rejects flat children and children nested under the wrong parent', () => {
  for (const child of ['1.1-choose', '2-accept/1.1-choose']) {
    withPackage({
      'product-design.md': proposal('evaluation', 'test solutions'),
      'screens.md': screens,
      '1-ask/mockup.drawio': example,
      '2-accept/journey.drawio': journey,
      [`${child}/journey.drawio`]: journey,
    }, (folder) => assert.ok(checkPackage(folder).some((error) => error.includes('Step 1.1 must be nested directly inside its parent folder 1-'))))
  }
})

test('validates diagrams and canonical documents inside nested child folders', () => {
  withPackage({
    'product-design.md': proposal('evaluation', 'test solutions'),
    'screens.md': screens,
    '1-ask/mockup.drawio': example,
    '1-ask/1.1-choose/journey.drawio': journey.replace('target="b"', 'target="missing"'),
    '1-ask/1.1-choose/screens.md': screens,
  }, (folder) => {
    const errors = checkPackage(folder)
    assert.ok(errors.some((error) => error.includes('1-ask/1.1-choose/journey.drawio: Edge e points to unknown target missing.')))
    assert.ok(errors.includes('1-ask/1.1-choose/screens.md: Canonical Markdown files belong in the package root, not a subfolder.'))
  })
})

test('every Draw.io skill example is a valid diagram', () => {
  for (const skill of ['mockup-drawio', 'state-drawio', 'sequence-drawio', 'context-drawio', 'dataflow-drawio']) {
    const xml = readFileSync(new URL(`../skills/${skill}/references/example.drawio`, import.meta.url), 'utf8')
    assert.deepEqual(checkDrawio(xml, `${skill}/example.drawio`), [])
  }
  for (const name of ['example-logical.drawio', 'example-physical.drawio']) {
    const xml = readFileSync(new URL(`../skills/erd-drawio/references/${name}`, import.meta.url), 'utf8')
    assert.deepEqual(checkDrawio(xml, `erd-drawio/${name}`), [])
  }
})
