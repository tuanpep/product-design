import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { compareSnapshots, main, recordTrial, snapshot, summarizeTrials } from './record-evaluation.mjs'

function fixture(t) {
  const base = mkdtempSync(join(tmpdir(), 'design-evaluation-'))
  t.after(() => rmSync(base, { recursive: true, force: true }))
  const workspace = join(base, 'workspace')
  mkdirSync(workspace)
  writeFileSync(join(workspace, 'keep.md'), 'unchanged')
  writeFileSync(join(workspace, 'change.md'), 'before')
  writeFileSync(join(workspace, 'delete.md'), 'remove me')
  const before = snapshot(workspace)
  writeFileSync(join(workspace, 'change.md'), 'after')
  writeFileSync(join(workspace, '.hidden'), 'added')
  rmSync(join(workspace, 'delete.md'))
  const after = snapshot(workspace)
  for (const [name, content] of Object.entries({ 'before.json': JSON.stringify(before), 'after.json': JSON.stringify(after), 'prompt.txt': 'synthetic recorder test, not a host run', 'trace.txt': 'fixture trace', 'input.md': 'fixture input' })) writeFileSync(join(base, name), content)
  const metadata = {
    caseId: 'recorder-unit-test', condition: 'synthetic', repetition: 1,
    run: { host: 'fixture', hostVersion: 'test', model: 'none', pluginVersion: 'test', pluginRevision: 'test', session: 'fixture-1', performedAt: '2026-10-22T00:00:00Z', isolated: true },
    reviewer: { name: 'unit test', kind: 'self' },
    promptFile: 'prompt.txt', transcriptFile: 'trace.txt', inputs: ['input.md'], outputFiles: ['workspace/change.md'], before: 'before.json', after: 'after.json', allowedPaths: ['change.md'],
    checks: [{ name: 'synthetic diff', kind: 'structural', status: 'pass', evidence: 'unit-test fixture only' }], findings: [],
    metrics: { latencyMs: null, inputTokens: null, outputTokens: null, costUsd: null },
  }
  return { base, workspace, before, after, metadata }
}

test('snapshots compare added, modified, deleted and unauthorized hidden files without modifying inputs', (t) => {
  const { workspace, before, after } = fixture(t)
  const changes = compareSnapshots(before, after, ['change.md'])
  assert.deepEqual(changes.map(({ path, change, authorized }) => ({ path, change, authorized })), [
    { path: '.hidden', change: 'added', authorized: false },
    { path: 'change.md', change: 'modified', authorized: true },
    { path: 'delete.md', change: 'deleted', authorized: false },
  ])
  assert.deepEqual(snapshot(workspace).files, after.files)
  assert.equal(readFileSync(join(workspace, 'change.md'), 'utf8'), 'after')
  assert.ok(!JSON.stringify(after).includes('unchanged'))
})

test('snapshot excludes only documented directories, includes other hidden files and enforces file bounds', (t) => {
  const { workspace } = fixture(t)
  for (const name of ['.git', 'node_modules']) {
    mkdirSync(join(workspace, name))
    writeFileSync(join(workspace, name, 'ignored'), 'ignored')
  }
  assert.deepEqual(snapshot(workspace).files.map((file) => file.path), ['.hidden', 'change.md', 'keep.md'])
  writeFileSync(join(workspace, 'large'), Buffer.alloc(16 * 1024 * 1024 + 1))
  assert.throws(() => snapshot(workspace), /file limit exceeded/)
})

test('snapshot refuses symlink traversal', (t) => {
  const { base, workspace } = fixture(t)
  const target = join(base, 'external')
  mkdirSync(target)
  symlinkSync(target, join(workspace, 'linked'), 'junction')
  assert.throws(() => snapshot(workspace), /refuses symlink/)
})

test('diff rejects malformed hashes, duplicate paths, traversal and wildcard authorization', (t) => {
  const { before, after } = fixture(t)
  const invalidHash = structuredClone(before)
  invalidHash.files[0].sha256 = 'not-a-hash'
  assert.throws(() => compareSnapshots(invalidHash, after, []), /hash/)
  const duplicate = structuredClone(before)
  duplicate.files.push(duplicate.files[0])
  assert.throws(() => compareSnapshots(duplicate, after, []), /duplicate/)
  for (const path of ['../outside', '/absolute', 'C:/absolute', 'dir\\file', 'docs/*']) assert.throws(() => compareSnapshots(before, after, [path]))
})

test('record retains provenance, findings, unknown metrics and unauthorized edits without claiming host execution', (t) => {
  const { base, metadata } = fixture(t)
  metadata.findings.push({ severity: 'blocker', location: 'delete.md', evidence: 'file removed', consequence: 'outside allowed edit scope' })
  const record = recordTrial(metadata, base)
  assert.deepEqual(record.unauthorizedEdits, ['.hidden', 'delete.md'])
  assert.equal(record.metadata.metrics.costUsd, null)
  assert.equal(record.metadata.findings[0].severity, 'blocker')
  assert.match(record.attestation, /not independently verified/)
  assert.equal(record.artifacts.prompt.sha256.length, 64)
  assert.match(record.limitations, /No host execution/)
  assert.equal(record.metadata.run.host, 'fixture')
})

test('record requires explicit versions, checks, metrics and retained artifacts', (t) => {
  const { base, metadata } = fixture(t)
  const mutations = [
    (value) => { delete value.run.pluginRevision },
    (value) => { delete value.run.isolated },
    (value) => { value.run.performedAt = 'yesterday' },
    (value) => { value.checks = [] },
    (value) => { value.metrics.costUsd = -1 },
    (value) => { delete value.metrics.inputTokens },
    (value) => { value.transcriptFile = 'missing.txt' },
    (value) => { value.findings = null },
    (value) => { value.repetition = 0 },
  ]
  for (const mutate of mutations) {
    const value = structuredClone(metadata)
    mutate(value)
    assert.throws(() => recordTrial(value, base))
  }
})

test('repeated trial summary keeps individual failures, versions, metrics and isolation visible', (t) => {
  const { base, metadata } = fixture(t)
  const first = recordTrial(metadata, base)
  const secondMeta = structuredClone(metadata)
  secondMeta.repetition = 2
  secondMeta.run.session = 'fixture-2'
  secondMeta.run.isolated = false
  secondMeta.metrics.latencyMs = 1200
  secondMeta.checks[0].status = 'fail'
  const second = recordTrial(secondMeta, base)
  const summary = summarizeTrials([first, second])
  assert.equal(summary.groups.length, 1)
  assert.equal(summary.groups[0].trials.length, 2)
  assert.equal(summary.groups[0].trials[0].metrics.latencyMs, null)
  assert.equal(summary.groups[0].trials[1].isolated, false)
  assert.deepEqual(summary.groups[0].trials[1].failedChecks, ['synthetic diff'])
  assert.throws(() => summarizeTrials([first, first]), /Duplicate/)
  const different = structuredClone(second)
  different.metadata.run.pluginRevision = 'different'
  assert.equal(summarizeTrials([first, different]).groups.length, 2)
})

test('CLI resolves metadata artifacts relative to input and never overwrites output or snapshots itself', (t) => {
  const { base, workspace, metadata } = fixture(t)
  const beforeFile = join(base, 'cli-snapshot.json')
  main(['snapshot', workspace, beforeFile])
  assert.equal(JSON.parse(readFileSync(beforeFile, 'utf8')).kind, 'file-snapshot')
  assert.throws(() => main(['snapshot', workspace, beforeFile]), /EEXIST/)
  assert.throws(() => main(['snapshot', workspace, join(workspace, 'snapshot.json')]), /outside/)
  const input = join(base, 'trial.json')
  const output = join(base, 'record.json')
  writeFileSync(input, JSON.stringify(metadata))
  main(['record', input, output])
  assert.equal(JSON.parse(readFileSync(output, 'utf8')).kind, 'external-host-trial')
  assert.throws(() => main(['record', input, output]), /EEXIST/)
  assert.throws(() => main([]), /Usage/)
})

test('actual recorder CLI emits valid summary JSON and fails invalid invocations without host execution', (t) => {
  const { base, metadata } = fixture(t)
  const script = fileURLToPath(new URL('./record-evaluation.mjs', import.meta.url))
  writeFileSync(join(base, 'trial.json'), JSON.stringify(metadata))
  const recorded = spawnSync(process.execPath, [script, 'record', 'trial.json', 'record.json'], { cwd: base, encoding: 'utf8' })
  assert.equal(recorded.status, 0, recorded.stderr)
  const summary = spawnSync(process.execPath, [script, 'summarize', 'record.json'], { cwd: base, encoding: 'utf8' })
  assert.equal(summary.status, 0, summary.stderr)
  assert.equal(JSON.parse(summary.stdout).groups[0].trials.length, 1)
  const invalid = spawnSync(process.execPath, [script], { cwd: base, encoding: 'utf8' })
  assert.equal(invalid.status, 1)
  assert.match(invalid.stderr, /Usage/)
  const duplicate = spawnSync(process.execPath, [script, 'record', 'trial.json', 'record.json'], { cwd: base, encoding: 'utf8' })
  assert.equal(duplicate.status, 1)
  assert.match(duplicate.stderr, /EEXIST/)
})

test('recorder retains attributed per-request usage and refuses double-counted aggregates', (t) => {
  const { base, metadata } = fixture(t)
  const request = { requestID: 'call-1', kind: 'primary', accounting: 'disjoint', tokens: { input: 10, output: 2, reasoning: 1, cacheRead: 3, cacheWrite: null }, costUsd: null }
  const usage = { schemaVersion: 1, kind: 'execution-usage', rootSessionID: 'fixture-1', incomplete: true, sessions: [{ sessionID: 'fixture-1', parentSessionID: null, requests: [request] }] }
  writeFileSync(join(base, 'usage.json'), JSON.stringify(usage))
  metadata.usageFile = 'usage.json'
  const record = recordTrial(metadata, base)
  assert.equal(record.artifacts.usage.sha256.length, 64)
  assert.equal(record.usageSummary.totals.cacheWrite, null)
  assert.equal(record.usageSummary.observed.input, 10)
  assert.equal(summarizeTrials([record]).groups[0].trials[0].usageSummary.incomplete, true)
  usage.sessions[0].requests.push(request)
  writeFileSync(join(base, 'usage.json'), JSON.stringify(usage))
  assert.throws(() => recordTrial(metadata, base), /Duplicate/)
})
