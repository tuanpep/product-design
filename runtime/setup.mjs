import { Error as ToolError } from '@opencode/plugin/promise/tool'
import { parseModel } from './delegation.mjs'

export const setupAgentIDs = Object.freeze([
  'design-product', 'technical-design', 'review-design',
  'design-research', 'design-author', 'design-artifact',
])

const roles = {
  'design-product': 'Product design coordinator. Owns product decisions and phase approvals.',
  'technical-design': 'Technical design coordinator. Owns implementation-facing design decisions.',
  'review-design': 'Read-only design reviewer. Checks evidence, risks and readiness.',
  'design-research': 'Read-only researcher. Collects sources and reports findings.',
  'design-author': 'Markdown author. Writes bounded documents from settled owner instructions.',
  'design-artifact': 'Artifact worker. Produces specified Draw.io diagrams and mockups.',
}
const assert = (ok, message) => { if (!ok) throw new Error(message) }
const copy = (value) => structuredClone(value)
const eligible = (model) => model.enabled === true && model.capabilities?.tools === true
const modelID = (model) => `${model.providerID}/${model.id}`

export async function createSetup(ctx, { agentIDs = setupAgentIDs, onModels = () => {}, overrides = {} } = {}) {
  assert(agentIDs.length === setupAgentIDs.length && setupAgentIDs.every((id) => agentIDs.includes(id)), 'Setup requires the six product-design agents')
  let models = copy(await ctx.storage.get('setup/models') ?? {})
  onModels(copy(models))
  let applying = false

  function settings() {
    return {
      models: copy(models),
      inherited: setupAgentIDs.filter((id) => !models[id]),
      warnings: [
        'Explicit workerModels plugin options take precedence over setup settings. Inherit removes the setup override and preserves existing agent/session defaults.',
        ...setupAgentIDs.filter((id) => overrides[id]).map((id) => `${id}: explicit workerModels option takes precedence.`),
      ],
    }
  }

  async function root(sessionID) {
    const session = await ctx.session.get({ sessionID })
    assert(session && !session.parentID, 'Product-design setup is available only in a root session')
    return session
  }

  const command = {
    name: 'setup-product-design',
    description: 'Choose models for the six product-design agents, or inspect status/cancel setup',
    async execute({ sessionID, prompt, delivery }) {
      const argument = (prompt?.text ?? '').trim()
      assert(['', 'status', 'cancel'].includes(argument), 'Use /setup-product-design, /setup-product-design status or /setup-product-design cancel')
      const session = await root(sessionID)
      if (argument) {
        if (argument === 'cancel') await ctx.storage.set(`setup/${sessionID}`, false)
        await ctx.session.synthetic({ sessionID, text: JSON.stringify({ ...(argument === 'cancel' ? { cancelled: true } : {}), ...settings() }), delivery, resume: false })
        return
      }
      const { data } = await ctx.model.list({ location: session.location })
      const available = data.filter(eligible).flatMap((model) => [modelID(model), ...model.variants.map((variant) => `${modelID(model)}#${variant.id}`)])
      await ctx.session.switchAgent({ sessionID, agent: 'design-product' })
      await ctx.storage.set(`setup/${sessionID}`, true)
      try {
        await ctx.session.prompt({
          sessionID,
          delivery,
          text: [
            'Product-design agent/model setup only. Do not start a design project, invoke a custom workflow, load skills, delegate work, edit files or change global configuration/default agents.',
            'Use the question tool to ask the user which exact model or inherit to use for each of these six agents. Describe each role. Do not infer model speed, quality, price, capability beyond the supplied tools support, or fallback choices. Never choose a model without the user selecting it.',
            ...setupAgentIDs.map((id) => `${id}: ${roles[id]}`),
            `Available enabled models with tools support, including exact variant IDs: ${JSON.stringify(available)}`,
            `Current setup settings: ${JSON.stringify(settings())}`,
            'Offer inherit for every agent. It removes only this plugin setup override; existing explicit configuration and defaults remain. If no models are listed, offer inherit only and explain that no enabled tool-capable models were found.',
            'After the user selects all six choices, call product_design_setup with {"models":{...}} containing every exact agent ID above, each mapped to its selected exact provider/model#variant string or "inherit". Do not omit targets or invent providers/models/variants. Report the actual saved settings and precedence warnings. Then stop. The user can run /setup-product-design cancel to cancel.',
          ].join('\n'),
        })
      } catch (error) {
        await ctx.storage.set(`setup/${sessionID}`, false)
        throw error
      }
    },
  }

  const tool = {
    name: 'product_design_setup',
    description: 'Save the six explicitly selected agent models in plugin storage during an armed root-session setup. Does not change global configuration.',
    options: { codemode: false },
    input: {
      type: 'object', additionalProperties: false, required: ['models'],
      properties: {
        models: {
          type: 'object', additionalProperties: false, required: [...setupAgentIDs],
          properties: Object.fromEntries(setupAgentIDs.map((id) => [id, { type: 'string', description: 'Exact available provider/model#variant, or inherit' }])),
        },
      },
    },
    async execute(input, context) {
      assert(!applying, 'A product-design setup apply is already in progress; wait before retrying')
      applying = true
      try {
        const session = await root(context.sessionID)
        assert(await ctx.storage.get(`setup/${context.sessionID}`), 'Run /setup-product-design in this root session before applying settings')
        assert(input && Object.keys(input).length === 1 && input.models && typeof input.models === 'object' && !Array.isArray(input.models), 'Provide only a models object')
        const choices = input.models
        assert(Object.keys(choices).length === setupAgentIDs.length && setupAgentIDs.every((id) => Object.hasOwn(choices, id)), 'Provide exactly all six product-design agent targets')
        const { data } = await ctx.model.list({ location: session.location })
        const next = {}
        for (const id of setupAgentIDs) {
          if (choices[id] === 'inherit') continue
          const ref = parseModel(choices[id])
          const model = data.find((candidate) => candidate.providerID === ref.providerID && candidate.id === ref.id)
          assert(model && eligible(model), `Model unavailable, disabled or missing tools support for ${id}: ${choices[id]}`)
          assert(!ref.variant || model.variants.some((variant) => variant.id === ref.variant), `Unavailable variant for ${id}: ${choices[id]}`)
          next[id] = ref
        }
        const previous = copy(await ctx.storage.get('setup/models') ?? {})
        await ctx.storage.set('setup/models', next)
        try {
          models = copy(next)
          onModels(copy(models))
          await ctx.agent.reload()
        } catch (error) {
          models = copy(previous)
          const failures = []
          try { await ctx.storage.set('setup/models', previous) } catch (rollback) { failures.push(`storage rollback failed: ${rollback.message}`) }
          try { onModels(copy(previous)) } catch (rollback) { failures.push(`model callback rollback failed: ${rollback.message}`) }
          throw new Error(`Setup apply failed: ${error.message}. ${failures.length ? failures.join('; ') : 'Previous settings restored; setup remains armed for retry.'}`)
        }
        try {
          await ctx.storage.set(`setup/${context.sessionID}`, false)
        } catch (error) {
          return { content: JSON.stringify({ ...settings(), status: 'saved-cleanup-required', warnings: [...settings().warnings, `Models were saved and agents refreshed, but setup could not be closed: ${error.message}. Run /setup-product-design cancel; do not reapply the model choices.`] }) }
        }
        return { content: JSON.stringify({ ...settings(), status: 'saved' }) }
      } catch (error) {
        throw new ToolError({ message: error.message })
      } finally {
        applying = false
      }
    },
  }

  return { command, tool, get models() { return copy(models) } }
}
