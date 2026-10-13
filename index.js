import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Plugin } from '@opencode/plugin'

const directory = dirname(fileURLToPath(import.meta.url))
const skills = [
  'design-product',
  'frame-problem',
  'discover-needs',
  'define-requirements',
  'explore-solutions',
  'design-experience',
  'drawio',
  'plan-evaluation',
  'specify-build',
  'decide-next',
  'review-design',
  'principle-protect-before-you-enable',
  'principle-start-from-the-outcome',
  'principle-include-the-hardest-case',
  'principle-see-the-whole-service',
  'principle-take-on-the-hard-work',
  'principle-behave-predictably',
  'principle-spend-less-of-the-world',
]

function definition(id) {
  const path = join(directory, 'skills', id, 'SKILL.md')
  const markdown = readFileSync(path, 'utf8')
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(markdown)
  if (!frontmatter) throw new Error(`Missing skill frontmatter: ${path}`)
  const field = (name) => {
    const value = frontmatter[1].match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim()
    if (value?.length > 1 && value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1)
    return value
  }
  const description = field('description')
  if (!description) throw new Error(`Missing skill description: ${path}`)
  return {
    id,
    name: field('name') ?? id,
    description,
    path,
    content: frontmatter[2].trim(),
    autoinvoke: field('disable-model-invocation') !== 'true',
  }
}

export default Plugin.define({
  id: 'product-design',
  async setup(ctx) {
    const definitions = skills.map(definition)
    await ctx.skill.transform((editor) => {
      for (const skill of definitions) editor.add(skill)
    })
    await ctx.command.transform((editor) => {
      editor.add({
        name: 'design-product',
        description: 'Develop or revise an evidence-labeled product design from an idea',
        execute: async ({ sessionID, prompt, delivery }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Develop or revise a product design for this request:\n\n${prompt.text}`,
            skills: [...(prompt.skills ?? []), { id: 'design-product' }],
            delivery,
          })
        },
      })
    })
  },
})
