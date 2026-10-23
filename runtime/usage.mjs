import { createHmac, randomBytes } from 'node:crypto'

const fields = ['input', 'output', 'reasoning', 'cacheRead', 'cacheWrite', 'costUsd']
const number = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null
const key = (id) => `usage/${id}`
const limit = 2000
const designAgents = new Set(['design-product', 'technical-design', 'review-design', 'design-research', 'design-author', 'design-artifact'])

export function requestUsage(message) {
  if (!['assistant', 'compaction'].includes(message.type)) return null
  if (message.type === 'compaction' && !['completed', 'failed'].includes(message.status)) return null
  if (message.type === 'assistant' && !message.time?.completed && !message.error) return null
  return {
    requestID: message.id,
    kind: message.type === 'assistant' ? 'primary' : 'compaction',
    agent: message.agent ?? null,
    providerID: message.model?.providerID ?? null,
    model: message.model?.id ?? null,
    variant: message.model?.variant ?? null,
    accounting: 'disjoint',
    source: 'opencode-v2-normalized',
    status: message.error || message.status === 'failed' ? 'failed' : 'completed',
    tokens: {
      input: number(message.tokens?.input), output: number(message.tokens?.output),
      reasoning: number(message.tokens?.reasoning), cacheRead: number(message.tokens?.cache?.read),
      cacheWrite: number(message.tokens?.cache?.write),
    },
    costUsd: number(message.cost),
    latencyMs: typeof message.time?.completed === 'number' && typeof message.time?.created === 'number'
      ? number(message.time.completed - message.time.created) : null,
  }
}

export function summarizeUsage(document) {
  if (document?.schemaVersion !== 1 || document.kind !== 'execution-usage' || !Array.isArray(document.sessions) || document.sessions.length === 0 || document.sessions.length > 100) throw new Error('Invalid execution-usage document')
  const sessions = new Map()
  const seen = new Set()
  const observed = Object.fromEntries(fields.map((field) => [field, 0]))
  const missing = Object.fromEntries(fields.map((field) => [field, 0]))
  let requests = 0
  for (const session of document.sessions) {
    if (typeof session.sessionID !== 'string' || !session.sessionID || sessions.has(session.sessionID)) throw new Error('Invalid or duplicate usage session')
    if (!Array.isArray(session.requests) || session.requests.length > limit) throw new Error('Invalid usage requests')
    sessions.set(session.sessionID, session)
    for (const request of session.requests) {
      const id = JSON.stringify([session.sessionID, request.requestID])
      if (typeof request.requestID !== 'string' || !request.requestID || seen.has(id)) throw new Error('Duplicate or missing usage request ID')
      if (request.accounting !== 'disjoint' || !['primary', 'compaction', 'title', 'generate'].includes(request.kind)) throw new Error('Usage must contain disjoint per-request buckets, not inclusive or run aggregates')
      seen.add(id)
      requests++
      for (const field of fields) {
        const value = field === 'costUsd' ? request.costUsd : request.tokens?.[field]
        if (value === null) missing[field]++
        else if (number(value) === null) throw new Error(`Invalid usage ${field}; use null for unknown`)
        else observed[field] += value
      }
    }
  }
  const root = sessions.get(document.rootSessionID)
  if (!root || root.parentSessionID !== null) throw new Error('Usage root must exist with null parent')
  for (const session of sessions.values()) {
    const chain = new Set()
    let current = session
    while (current.sessionID !== document.rootSessionID) {
      if (chain.has(current.sessionID)) throw new Error('Cyclic usage parentage')
      chain.add(current.sessionID)
      current = sessions.get(current.parentSessionID)
      if (!current) throw new Error('Usage parent is missing')
    }
  }
  return {
    sessions: sessions.size, requests, observed, missing,
    totals: Object.fromEntries(fields.map((field) => [field, requests && !missing[field] ? observed[field] : null])),
    incomplete: document.incomplete !== false || !requests || fields.some((field) => missing[field] > 0),
    limitation: 'Observed per-request buckets only; never add SDK/run aggregates or reasoning already included in output. Missing calls/usage remain unknown; summed request latency is not wall-clock duration.',
  }
}

export function createUsageCollector(ctx, enabled = false) {
  const locks = new Map()
  async function update(sessionID, change) {
    const pending = (locks.get(sessionID) ?? Promise.resolve()).catch(() => {}).then(async () => {
      const data = await ctx.storage.get(key(sessionID)) ?? { requests: [], contextSamples: [], loads: [], retries: 0, requestKinds: {}, sourceKey: randomBytes(32).toString('hex'), truncated: false }
      data.requestKinds ??= {}
      data.sourceKey ??= randomBytes(32).toString('hex')
      await change(data)
      await ctx.storage.set(key(sessionID), data)
    })
    locks.set(sessionID, pending)
    try { await pending } finally { if (locks.get(sessionID) === pending) locks.delete(sessionID) }
  }
  async function capture(sessionID) {
    const messages = await ctx.session.context({ sessionID })
    const requests = messages.map(requestUsage).filter(Boolean)
    if (enabled) await update(sessionID, (data) => {
      const merged = new Map(data.requests.map((request) => [request.requestID, request]))
      for (const request of requests) merged.set(request.requestID, request)
      data.truncated ||= merged.size > limit
      data.requests = [...merged.values()].slice(-limit)
    })
    return requests
  }
  async function exportUsage(sessionID) {
    const root = await ctx.session.get({ sessionID })
    const sessions = []
    const queue = [root]
    const seen = new Set()
    const errors = []
    let incomplete = !enabled
    while (queue.length && sessions.length < 20) {
      const session = queue.shift()
      if (seen.has(session.id)) throw new Error('Duplicate session in usage tree')
      seen.add(session.id)
      const current = await capture(session.id)
      const saved = enabled ? await ctx.storage.get(key(session.id)) : null
      sessions.push({ sessionID: session.id, parentSessionID: session.id === root.id ? null : session.parentID, requests: saved?.requests ?? current.slice(-limit), contextSamples: saved?.contextSamples ?? [], loads: saved?.loads ?? [], retries: saved?.retries ?? null, requestKinds: saved?.requestKinds ?? null })
      incomplete ||= (saved?.truncated ?? false) || current.length > limit
      try {
        const registry = await ctx.storage.get(`delegation/${session.id}`) // Historical wrapper sessions, if present.
        const observed = await ctx.storage.get(key(session.id))
        incomplete ||= (registry?.truncated ?? false) || (observed?.childrenTruncated ?? false)
        for (const entry of [...(registry?.entries ?? []), ...(observed?.children ?? []).map((sessionID) => ({ sessionID }))]) {
          if (!entry.sessionID || seen.has(entry.sessionID) || queue.some((child) => child.id === entry.sessionID)) continue
          try { queue.push(await ctx.session.get({ sessionID: entry.sessionID })) }
          catch { incomplete = true; errors.push({ sessionID: entry.sessionID, error: 'Managed child unavailable' }) }
        }
      } catch (error) {
        incomplete = true
        errors.push({ sessionID: session.id, error: 'Child inventory unavailable' })
      }
    }
    incomplete ||= queue.length > 0
    const document = { schemaVersion: 1, kind: 'execution-usage', capturedAt: new Date().toISOString(), rootSessionID: root.id, incomplete: true, sessions, errors, coverage: { telemetryEnabled: enabled, inventoryTruncated: incomplete, childInventory: 'Observed design child context hooks and historical plugin registry only. Native children not observed by this plugin may be missing; this SDK cannot enumerate children.', auxiliaryUsage: 'Title/generate and separately billed failed attempts may be absent; provider-normalized buckets are not raw billing payloads.' } }
    document.summary = summarizeUsage(document)
    return document
  }
  async function setup() {
    if (!enabled) return
    await ctx.session.hook('model.request', async (event) => {
      if (!designAgents.has(event.agent)) return
      await update(event.sessionID, (data) => { data.requestKinds[event.kind] = (data.requestKinds[event.kind] ?? 0) + 1 })
    })
    await ctx.session.hook('context', async (event) => {
      if (!designAgents.has(event.agent)) return
      const session = await ctx.session.get({ sessionID: event.sessionID })
      if (session.parentID) await update(session.parentID, (data) => {
        data.children ??= []
        if (data.children.includes(session.id)) return
        if (data.children.length >= 100) { data.childrenTruncated = true; return }
        data.children.push(session.id)
      })
      await capture(event.sessionID)
      await update(event.sessionID, (data) => {
        if (data.contextSamples.length >= limit) { data.truncated = true; return }
        data.contextSamples.push({ sequence: data.contextSamples.length + 1, agent: event.agent, model: event.model, systemChars: JSON.stringify(event.system).length, messageChars: JSON.stringify(event.messages).length, toolSchemaChars: JSON.stringify(event.tools).length })
      })
    })
    await ctx.session.hook('compaction', async (event) => { if (designAgents.has(event.agent)) await capture(event.sessionID) })
    await ctx.session.hook('retry', async (event) => { if (designAgents.has(event.agent)) await update(event.sessionID, (data) => { data.retries++ }) })
    await ctx.tool.hook('execute.after', async (event) => {
      if (!designAgents.has(event.agent) || !['read', 'skill'].includes(event.tool) || event.status !== 'completed') return
      const source = event.input?.path ?? event.input?.id
      if (typeof source !== 'string') return
      await update(event.sessionID, (data) => {
        if (data.loads.length >= limit) { data.truncated = true; return }
        data.loads.push({ tool: event.tool, sourceHash: createHmac('sha256', data.sourceKey).update(source).digest('hex'), category: event.tool === 'skill' || /SKILL\.md$/.test(source) ? 'skill' : /[\\/]references[\\/]/.test(source) ? 'reference' : 'other', offset: number(event.input?.offset), limit: number(event.input?.limit) })
      })
    })
  }
  return { setup, capture, exportUsage }
}
