// Shared model/setup options. Execution belongs to native OpenCode subagents.
const roles = new Set(['design-product', 'review-design', 'design-research', 'design-author'])
const workers = new Set(['review-design', 'design-research', 'design-author'])
const assert = (ok, message) => { if (!ok) throw new Error(message) }

export function parseModel(value) {
  assert(typeof value === 'string', 'Model must be provider/model#variant')
  const match = /^([^/\s]+)\/([^#\s]+)(?:#([^\s#]+))?$/.exec(value)
  assert(match, 'Model must be provider/model#variant')
  return { providerID: match[1], id: match[2], ...(match[3] ? { variant: match[3] } : {}) }
}

export function orchestrationOptions(options = {}) {
  assert(options.delegation === undefined, 'delegation options are retired; use native OpenCode subagents and permissions')
  assert(options.telemetry === undefined || typeof options.telemetry === 'boolean', 'telemetry must be boolean')
  const workerModels = {}
  for (const [name, model] of Object.entries(options.workerModels ?? {})) {
    assert(workers.has(name), `Not a worker model target: ${name}`)
    workerModels[name] = parseModel(model)
  }
  const agentSteps = {}
  for (const [name, steps] of Object.entries(options.agentSteps ?? {})) {
    assert(roles.has(name), `Unknown steps target: ${name}`)
    assert(Number.isInteger(steps) && steps > 0 && steps <= 200, 'Steps must be a positive integer no greater than 200')
    agentSteps[name] = steps
  }
  return { workerModels, agentSteps, telemetry: options.telemetry === true }
}
