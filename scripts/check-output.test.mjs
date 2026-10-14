import assert from 'node:assert/strict'
import test from 'node:test'
import { checkOutput } from './check-output.mjs'

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
