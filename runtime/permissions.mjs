import { lstatSync, realpathSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'

const owners = new Set(['design-product', 'technical-design'])
const workers = new Set(['design-research', 'design-artifact', 'design-author', 'review-design'])
const base = new Set(['read', 'glob', 'grep', 'skill', 'external_directory', 'product_design_usage'])
const coordination = new Set([...base, 'question', 'subagent', 'product_design_setup'])
const edits = new Set(['edit', 'write', 'patch', 'apply_patch'])
const targets = ['design-research', 'design-author', 'design-artifact', 'review-design']

export function delegationTargets(actor) {
  return owners.has(actor) ? targets : actor === 'review-design' ? ['design-research', 'review-design'] : []
}

// Role/worktree boundaries, not native per-task exact-path grants.
export function writerPath(directory, path, extension) {
  if (!directory || typeof path !== 'string' || !path || /[\x00-\x1f?*<>"|]/.test(path)) return false
  const portable = path.replaceAll('\\', '/')
  if (portable.split('/').some((part) => part === '.' || part === '..' || /[. ]$/.test(part))) return false
  if (portable.split('/').some((part) => /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) return false
  if (/:/.test(portable.replace(/^[A-Za-z]:\//, ''))) return false
  if (/^[A-Za-z]:/.test(portable) && !isAbsolute(path)) return false
  try {
    const root = realpathSync(directory)
    const absolute = resolve(root, path)
    const local = relative(root, absolute)
    if (!local || isAbsolute(local) || local === '..' || local.startsWith(`..${sep}`)) return false
    const normalized = local.split(sep).join('/')
    if (!/^docs\/product-design\/[a-z0-9]+(?:-[a-z0-9]+)*\/(?:[^/]+\/)*[^/]+$/.test(normalized) || !normalized.endsWith(extension)) return false
    for (let current = absolute; current !== root; current = dirname(current)) {
      try { if (lstatSync(current).isSymbolicLink()) return false }
      catch (error) { if (error.code !== 'ENOENT') return false }
    }
    return true
  } catch { return false }
}

export function workerAllows(worker, action, resources = [], directory) {
  if (base.has(action)) return true
  if (worker === 'design-research' && ['webfetch', 'websearch'].includes(action)) return true
  if (!['design-artifact', 'design-author'].includes(worker) || !edits.has(action) || !resources.length) return false
  return resources.every((path) => writerPath(directory, path, worker === 'design-author' ? '.md' : '.drawio'))
}

function editPaths(input) {
  if (!input || typeof input !== 'object') return []
  const patch = input.patchText ?? input.patch_text ?? input.patch
  if (typeof patch === 'string') return [...patch.matchAll(/^\*\*\* (?:Add File|Update File|Delete File|Move to): ([^\r\n]+)\r?$/gm)].map((match) => match[1])
  return [input.path ?? input.filePath ?? input.file_path].filter((path) => typeof path === 'string')
}

export async function enforceDesignPermissions(ctx) {
  async function classify(event) {
    // Do not change unrelated agents (including pstack children), or query their
    // ancestry on every tool call. This boundary follows the six design roles.
    if (event.agent && !owners.has(event.agent) && !workers.has(event.agent)) return { managed: false, coordinator: false }
    // Inspect actual ancestry even when the event identifies a primary role.
    const session = await ctx.session.get({ sessionID: event.sessionID })
    if (!session) throw new Error('Cannot establish design session ancestry')
    const actor = event.agent ?? session.agent
    return { session, actor, managed: owners.has(actor) || workers.has(actor), coordinator: !session.parentID && (owners.has(actor) || actor === 'review-design') }
  }
  function allows(state, action, resources) {
    if (!state.managed) return true
    if (state.coordinator) {
      if (action === 'subagent') return resources?.length > 0 && resources.every((target) => delegationTargets(state.actor).includes(target))
      return coordination.has(action)
    }
    if (state.session.parentID && action === 'subagent') return false
    return workerAllows(state.actor, action, resources, state.session.location?.directory)
  }
  await ctx.permission.hook('evaluate', async (event) => {
    const state = await classify(event)
    if (!allows(state, event.action, event.resources)) {
      event.effect = 'deny'
      event.message = 'Design capability boundary: native root-only delegation, leaf role/worktree writes, no shell/MCP.'
    }
    // Never upgrade a configured deny or ask.
  })
  await ctx.tool.hook('execute.before', async (event) => {
    const state = await classify(event)
    if (event.tool === 'subagent' && state.coordinator) return // Native permission evaluation checks target resources.
    if (!allows(state, event.tool, edits.has(event.tool) ? editPaths(event.input) : [])) throw new Error('Tool is outside this design role capability boundary')
  })
  await ctx.session.hook('context', async (event) => {
    const state = await classify(event)
    if (!state.managed) return
    for (const name of Object.keys(event.tools)) {
      const available = state.coordinator ? coordination.has(name)
        : base.has(name) || (state.actor === 'design-research' && ['webfetch', 'websearch'].includes(name)) || (['design-author', 'design-artifact'].includes(state.actor) && edits.has(name))
      if (!available) delete event.tools[name]
    }
  })
}
