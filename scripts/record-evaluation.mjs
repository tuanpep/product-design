import { createHash } from 'node:crypto'
import { lstatSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { summarizeUsage } from '../runtime/usage.mjs'

const excludedDirectories = ['.git', 'node_modules']
const limits = { entries: 10000, fileBytes: 16 * 1024 * 1024, totalBytes: 64 * 1024 * 1024 }
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const plainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

function requireValue(ok, message) {
  if (!ok) throw new Error(message)
}

function text(value, name) {
  requireValue(typeof value === 'string' && value.trim().length > 0, `${name} must be nonempty text`)
}

function filePath(value) {
  return typeof value === 'string' && value.length > 0 && !value.includes('\\') &&
    !value.includes(':') && !value.startsWith('/') &&
    value.split('/').every((part) => part && part !== '.' && part !== '..')
}

function inside(parent, child) {
  const path = relative(parent, child)
  return path === '' || (!isAbsolute(path) && path !== '..' && !path.startsWith(`..${sep}`))
}

export function snapshot(workspace) {
  const root = resolve(workspace)
  requireValue(!lstatSync(root).isSymbolicLink() && lstatSync(root).isDirectory(), 'Workspace must be a real directory, not a symlink')
  const files = []
  let entries = 0
  let bytes = 0
  function visit(directory) {
    for (const name of readdirSync(directory).sort()) {
      requireValue(++entries <= limits.entries, 'Snapshot entry limit exceeded')
      const absolute = resolve(directory, name)
      const stat = lstatSync(absolute)
      requireValue(!stat.isSymbolicLink(), `Snapshot refuses symlink: ${absolute}`)
      if (stat.isDirectory()) {
        if (!excludedDirectories.includes(name)) visit(absolute)
      } else {
        requireValue(stat.isFile(), `Snapshot refuses nonregular file: ${absolute}`)
        const path = relative(root, absolute).split(sep).join('/')
        requireValue(filePath(path), `Unsupported file path: ${path}`)
        requireValue(stat.size <= limits.fileBytes, `Snapshot file limit exceeded: ${path}`)
        bytes += stat.size
        requireValue(bytes <= limits.totalBytes, 'Snapshot total byte limit exceeded')
        const content = readFileSync(absolute)
        requireValue(content.length === stat.size, `File changed during snapshot: ${path}`)
        files.push({ path, bytes: content.length, sha256: hash(content) })
      }
    }
  }
  visit(root)
  files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0)
  return { schemaVersion: 1, kind: 'file-snapshot', capturedAt: new Date().toISOString(), excludedDirectories, limits, files }
}

function validateSnapshot(value) {
  requireValue(plainObject(value) && value.schemaVersion === 1 && value.kind === 'file-snapshot', 'Expected version 1 file-snapshot')
  requireValue(JSON.stringify(value.excludedDirectories) === JSON.stringify(excludedDirectories), 'Snapshot exclusions must match the recorder')
  requireValue(Array.isArray(value.files) && value.files.length <= limits.entries, 'Invalid snapshot files')
  const paths = new Set()
  let bytes = 0
  for (const file of value.files) {
    requireValue(plainObject(file) && filePath(file.path) && !paths.has(file.path), 'Invalid or duplicate snapshot path')
    requireValue(Number.isSafeInteger(file.bytes) && file.bytes >= 0 && file.bytes <= limits.fileBytes, 'Invalid snapshot byte count')
    requireValue(typeof file.sha256 === 'string' && /^[a-f0-9]{64}$/.test(file.sha256), 'Invalid snapshot hash')
    paths.add(file.path)
    bytes += file.bytes
  }
  requireValue(bytes <= limits.totalBytes, 'Snapshot total byte limit exceeded')
}

export function compareSnapshots(before, after, allowedPaths) {
  validateSnapshot(before)
  validateSnapshot(after)
  requireValue(Array.isArray(allowedPaths) && allowedPaths.every(filePath), 'allowedPaths must be exact relative file paths (no globs)')
  requireValue(allowedPaths.every((path) => !/[?*]/.test(path)), 'allowedPaths does not support globs')
  const allowed = new Set(allowedPaths)
  const oldFiles = new Map(before.files.map((file) => [file.path, file]))
  const newFiles = new Map(after.files.map((file) => [file.path, file]))
  return [...new Set([...oldFiles.keys(), ...newFiles.keys()])].sort().flatMap((path) => {
    const oldFile = oldFiles.get(path)
    const newFile = newFiles.get(path)
    if (oldFile?.sha256 === newFile?.sha256 && oldFile?.bytes === newFile?.bytes) return []
    return [{ path, change: !oldFile ? 'added' : !newFile ? 'deleted' : 'modified', authorized: allowed.has(path), before: oldFile ?? null, after: newFile ?? null }]
  })
}

function readJson(file) {
  requireValue(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink(), `Expected regular JSON file: ${file}`)
  requireValue(lstatSync(file).size <= limits.fileBytes, `JSON file too large: ${file}`)
  return JSON.parse(readFileSync(file, 'utf8'))
}

function artifact(file, base) {
  text(file, 'Artifact path')
  const absolute = resolve(base, file)
  requireValue(lstatSync(absolute).isFile() && !lstatSync(absolute).isSymbolicLink(), `Expected regular artifact: ${file}`)
  requireValue(lstatSync(absolute).size <= limits.fileBytes, `Artifact too large: ${file}`)
  const bytes = readFileSync(absolute)
  return { path: file, sha256: hash(bytes), bytes: bytes.length }
}

export function recordTrial(metadata, base = process.cwd()) {
  requireValue(plainObject(metadata), 'Trial metadata must be an object')
  for (const name of ['caseId', 'condition']) text(metadata[name], name)
  requireValue(Number.isSafeInteger(metadata.repetition) && metadata.repetition > 0, 'repetition must be a positive integer')
  const run = metadata.run
  requireValue(plainObject(run), 'run metadata is required')
  for (const name of ['host', 'hostVersion', 'model', 'pluginVersion', 'pluginRevision', 'session', 'performedAt']) text(run[name], `run.${name}`)
  requireValue(/^\d{4}-\d{2}-\d{2}T/.test(run.performedAt) && Number.isFinite(Date.parse(run.performedAt)), 'run.performedAt must be an ISO timestamp')
  requireValue(typeof run.isolated === 'boolean', 'run.isolated must be explicit')
  requireValue(run.cacheState === undefined || ['cold', 'warm', 'mixed', 'unknown'].includes(run.cacheState), 'run.cacheState must be cold, warm, mixed or unknown')
  requireValue(run.settings === undefined || plainObject(run.settings), 'run.settings must be an object when supplied')
  requireValue(plainObject(metadata.reviewer) && ['human', 'model', 'self'].includes(metadata.reviewer.kind), 'reviewer.kind must be human, model or self')
  text(metadata.reviewer.name, 'reviewer.name')
  requireValue(Array.isArray(metadata.inputs), 'inputs must list retained fixture files (or be empty)')
  requireValue(Array.isArray(metadata.outputFiles), 'outputFiles must list retained result files (or be empty)')
  requireValue(Array.isArray(metadata.checks) && metadata.checks.length > 0, 'At least one explicit check is required')
  for (const check of metadata.checks) {
    requireValue(plainObject(check) && ['pass', 'fail', 'not-run'].includes(check.status), 'Invalid check status')
    requireValue(['structural', 'semantic', 'human', 'model'].includes(check.kind), 'Invalid check kind')
    text(check.name, 'check.name')
    text(check.evidence, 'check.evidence')
  }
  requireValue(Array.isArray(metadata.findings), 'findings must be an explicit array')
  for (const finding of metadata.findings) {
    requireValue(plainObject(finding) && ['blocker', 'material', 'suggestion'].includes(finding.severity), 'Invalid finding severity')
    for (const name of ['location', 'evidence', 'consequence']) text(finding[name], `finding.${name}`)
  }
  requireValue(plainObject(metadata.metrics), 'metrics must be explicit; use null for unknown')
  for (const name of ['latencyMs', 'inputTokens', 'outputTokens', 'costUsd']) {
    const value = metadata.metrics[name]
    requireValue(value === null || (typeof value === 'number' && Number.isFinite(value) && value >= 0), `metrics.${name} must be nonnegative or null`)
  }
  const beforeArtifact = artifact(metadata.before, base)
  const afterArtifact = artifact(metadata.after, base)
  const changes = compareSnapshots(readJson(resolve(base, metadata.before)), readJson(resolve(base, metadata.after)), metadata.allowedPaths)
  const artifacts = {
    prompt: artifact(metadata.promptFile, base),
    transcript: artifact(metadata.transcriptFile, base),
    inputs: metadata.inputs.map((file) => artifact(file, base)),
    outputs: metadata.outputFiles.map((file) => artifact(file, base)),
    before: beforeArtifact,
    after: afterArtifact,
  }
  let usage
  if (metadata.usageFile !== undefined) {
    artifacts.usage = artifact(metadata.usageFile, base)
    usage = readJson(resolve(base, metadata.usageFile))
    summarizeUsage(usage)
  }
  return {
    schemaVersion: 1,
    kind: 'external-host-trial',
    recordedAt: new Date().toISOString(),
    attestation: 'Run and judgment metadata are supplied by the operator, not independently verified by this recorder.',
    metadata,
    artifacts,
    ...(usage ? { usage, usageSummary: summarizeUsage(usage) } : {}),
    changes,
    unauthorizedEdits: changes.filter((change) => !change.authorized).map((change) => change.path),
    limitations: 'File-content hashes only; excludes .git and node_modules directories, empty directories, permissions, transient edits and all external effects. Review retained files and traces separately. No host execution or semantic grading is performed.',
  }
}

export function summarizeTrials(records) {
  const groups = new Map()
  for (const record of records) {
    requireValue(record?.schemaVersion === 1 && record.kind === 'external-host-trial', 'Expected external-host-trial record')
    const { caseId, condition, repetition, run, metrics, checks, findings } = record.metadata
    const key = JSON.stringify([caseId, condition, run.host, run.hostVersion, run.model, run.pluginVersion, run.pluginRevision, run.cacheState ?? 'unknown', run.settings ?? null])
    if (!groups.has(key)) groups.set(key, { caseId, condition, host: run.host, hostVersion: run.hostVersion, model: run.model, pluginVersion: run.pluginVersion, pluginRevision: run.pluginRevision, cacheState: run.cacheState ?? 'unknown', settings: run.settings ?? null, trials: [] })
    const group = groups.get(key)
    requireValue(!group.trials.some((trial) => trial.repetition === repetition || trial.session === run.session), 'Duplicate repetition/session within a comparison group')
    group.trials.push({ repetition, session: run.session, isolated: run.isolated, metrics, ...(record.usage ? { usageSummary: summarizeUsage(record.usage) } : {}), failedChecks: checks.filter((check) => check.status === 'fail').map((check) => check.name), notRun: checks.filter((check) => check.status === 'not-run').map((check) => check.name), findings: findings.length, blockers: findings.filter((finding) => finding.severity === 'blocker').length, unauthorizedEdits: record.unauthorizedEdits })
  }
  return { kind: 'trial-summary', limitations: 'No aggregate quality score or causal efficiency claim. Compare equivalent tasks/versions, inspect failures, unknown metrics and traces, and use repeated isolated runs.', groups: [...groups.values()] }
}

function save(file, value) {
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' })
}

export function main(args) {
  const [command, ...paths] = args
  if (command === 'snapshot' && paths.length === 2) {
    const root = realpathSync(paths[0])
    const output = resolve(paths[1])
    const outputParent = realpathSync(dirname(output))
    requireValue(!inside(root, output) && !inside(root, outputParent), 'Store snapshots outside the workspace being measured')
    save(output, snapshot(paths[0]))
  } else if (command === 'record' && paths.length === 2) {
    const metadata = readJson(paths[0])
    save(paths[1], recordTrial(metadata, dirname(resolve(paths[0]))))
  } else if (command === 'summarize' && paths.length > 0) {
    console.log(JSON.stringify(summarizeTrials(paths.map(readJson)), null, 2))
  } else {
    throw new Error('Usage: record-evaluation.mjs snapshot <workspace> <new-output.json> | record <trial.json> <new-output.json> | summarize <record.json> [...]')
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)) } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
