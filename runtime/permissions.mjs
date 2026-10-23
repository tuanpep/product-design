import { resolve } from 'node:path'
import { safePath } from './delegation.mjs'

const owners = new Set(['design-product', 'technical-design'])
const workers = new Set(['design-research', 'design-artifact', 'design-author', 'review-design'])
const base = new Set(['read', 'glob', 'grep', 'skill', 'external_directory', 'product_design_usage'])
const coordination = new Set([...base, 'question', 'product_design_delegate', 'product_design_setup'])
const edits = new Set(['edit', 'write', 'patch', 'apply_patch'])

export function workerAllows(worker, action, resources = [], scope, directory) {
  if (base.has(action)) return true
  if (worker === 'design-research' && ['webfetch', 'websearch'].includes(action)) return true
  if (!['design-artifact', 'design-author'].includes(worker) || !edits.has(action) || !scope || !directory || !resources.length) return false
  const extension = worker === 'design-author' ? '.md' : '.drawio'
  if (scope.worker !== worker || !scope.writePaths?.length) return false
  try {
    for (const path of scope.writePaths) {
      safePath(directory, path)
      if (!/^docs\/product-design\/[a-z0-9]+(?:-[a-z0-9]+)*\//.test(path) || !path.endsWith(extension)) return false
    }
  } catch { return false }
  const allowed = new Set(scope.writePaths.map((path) => resolve(directory, path)))
  return resources.every((path) => typeof path === 'string' && allowed.has(resolve(directory, path)))
}

export async function enforceDesignPermissions(ctx) {
  async function classify(event) {
    const scope = await ctx.storage.get(`worker/${event.sessionID}`)
    const session = !scope && (!event.agent || event.agent === 'review-design') ? await ctx.session.get({ sessionID: event.sessionID }) : undefined
    const actor = scope?.worker ?? event.agent ?? session.agent
    return { scope, actor, coordinator: owners.has(actor) || (actor === 'review-design' && !scope && session && !session.parentID) }
  }
  await ctx.permission.hook('evaluate', async (event) => {
    const { scope, actor, coordinator } = await classify(event)
    if (coordinator && !coordination.has(event.action)) {
      event.effect = 'deny'
      event.message = 'Orchestration-only owner: use bounded product_design_delegate for execution.'
    }
    if (coordinator || !workers.has(actor)) return
    const directory = scope?.directory
    if (!workerAllows(actor, event.action, event.resources, scope, directory)) {
      event.effect = 'deny'
      event.message = 'Design worker capability boundary: read-only research/review, exact assigned Markdown/Draw.io writes, no shell/MCP/spawning.'
    }
    // Never turn a parent/user ask or deny into an allow.
  })
  await ctx.tool.hook('execute.before', async (event) => {
    const { scope, actor, coordinator } = await classify(event)
    if (coordinator && !coordination.has(event.tool)) throw new Error('Orchestration-only owner: use bounded product_design_delegate')
    if (coordinator || !workers.has(actor)) return
    if (base.has(event.tool) || (actor === 'design-research' && ['webfetch', 'websearch'].includes(event.tool))) return
    if (['design-artifact', 'design-author'].includes(actor) && scope && edits.has(event.tool)) return // Exact paths are checked by the edit permission action.
    throw new Error('Tool is not available to this read-only/scoped design worker')
  })
}
