import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const headings = [
  'Recommendation', 'Problem and outcome', 'Evidence and unknowns',
  'Needs and requirements', 'Options', 'Product experience', 'Evaluation plan',
  'First useful release', 'Review and next steps', 'Decision history',
]
const gates = {
  discovery: ['stop', 'repeat discovery'],
  evaluation: ['test solutions', 'specify a slice'],
  'build-slice': ['ready for a named build slice'],
}

export function checkOutput(markdown) {
  const errors = []
  const text = markdown.replace(/\r\n/g, '\n')
  const header = text.split(/^## /m)[0]
  if (!/^# \S.+$/m.test(header)) errors.push('Missing document title.')
  const field = (name) => {
    const matches = [...header.matchAll(new RegExp(`^${name}: (.+)$`, 'gm'))]
    if (matches.length !== 1) errors.push(`Expected one ${name} field before the sections.`)
    return matches[0]?.[1].trim()
  }
  if (field('Standard') !== 'product-design/1.0') errors.push('Unsupported output standard.')
  const profile = field('Profile')
  const gate = field('Next gate')
  if (!Object.hasOwn(gates, profile ?? '')) errors.push('Invalid profile.')
  else if (!gates[profile].includes(gate)) errors.push('Profile and next gate disagree.')
  const updated = field('Updated')
  const date = /^\d{4}-\d{2}-\d{2}$/.test(updated ?? '') ? new Date(`${updated}T00:00:00Z`) : null
  if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== updated) errors.push('Updated must be a real YYYY-MM-DD date.')
  field('Decision owner')
  field('Approval')
  const sections = [...text.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)]
  if (sections.map((match) => match[1]).join('|') !== headings.join('|')) errors.push('Expected the ten standard sections in order, once each.')
  for (const section of sections) {
    if (!section[2].trim()) errors.push(`Empty section: ${section[1]}. Explain deferrals instead.`)
  }
  const review = sections.find((match) => match[1] === 'Review and next steps')?.[2] ?? ''
  for (const verdict of ['Design coherence', 'Evidence confidence', 'Delivery readiness']) {
    if (!review.includes(`${verdict}:`)) errors.push(`Missing review verdict: ${verdict}.`)
  }
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const path = process.argv[2]
  if (!path) {
    console.error('Usage: node scripts/check-output.mjs <product-design.md>')
    process.exitCode = 1
  } else {
    const errors = checkOutput(readFileSync(path, 'utf8'))
    if (errors.length) {
      errors.forEach((error) => console.error(error))
      process.exitCode = 1
    } else console.log('Output structure is valid. Evidence, traceability, readiness, and diagrams still need semantic review.')
  }
}
