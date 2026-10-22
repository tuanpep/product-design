import { resolve } from 'node:path'
import { safePath } from './delegation.mjs'

const owners = new Set(['design-product', 'technical-design'])
const base = new Set(['read', 'glob', 'grep', 'skill', 'external_directory', 'product_design_usage'])
const edits = new Set(['edit', 'write', 'apply_patch'])

export function workerAllows(worker, action, resources = [], scope, directory) {
  if (base.has(action)) return true
  if (worker === 'design-research' && ['webfetch', 'websearch'].includes(action)) return true
  if (worker !== 'design-artifact' || !edits.has(action) || !scope || !directory || !resources.length) return false
  try { for (const path of scope.writePaths) safePath(directory, path) } catch { return false }
  const allowed = new Set(scope.writePaths.map((path) => resolve(directory, path)))
  return resources.every((path) => typeof path === 'string' && allowed.has(resolve(directory, path)))
}

export async function enforceDesignPermissions(ctx) {
  await ctx.permission.hook('evaluate', async (event) => {
    const scope = await ctx.storage.get(`worker/${event.sessionID}`)
    const actor = scope?.worker ?? event.agent ?? (await ctx.session.get({ sessionID: event.sessionID })).agent
    if (owners.has(actor) && event.action === 'subagent') {
      event.effect = 'deny'
      event.message = 'Use bounded product_design_delegate; native spawning bypasses its quotas.'
    }
    if (!['design-research', 'design-artifact', 'review-design'].includes(actor)) return
    const directory = scope?.directory
    if (!workerAllows(actor, event.action, event.resources, scope, directory)) {
      event.effect = 'deny'
      event.message = 'Design worker capability boundary: read-only research/review, exact assigned artifact writes, no shell/MCP/spawning.'
    }
    // Never turn a parent/user ask or deny into an allow.
  })
  await ctx.tool.hook('execute.before', async (event) => {
    if (owners.has(event.agent) && event.tool === 'subagent') throw new Error('Use bounded product_design_delegate')
    const scope = await ctx.storage.get(`worker/${event.sessionID}`)
    const actor = scope?.worker ?? event.agent
    if (!['design-research', 'design-artifact', 'review-design'].includes(actor)) return
    if (base.has(event.tool) || (actor === 'design-research' && ['webfetch', 'websearch'].includes(event.tool))) return
    if (actor === 'design-artifact' && scope && edits.has(event.tool)) return // Exact paths are checked by the edit permission action.
    throw new Error('Tool is not available to this read-only/scoped design worker')
  })
}
