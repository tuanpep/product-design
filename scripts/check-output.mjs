import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const headings = [
  'Recommendation', 'Problem and outcome', 'Evidence and unknowns',
  'Needs and requirements', 'Options', 'Product experience', 'Evaluation plan',
  'First useful release', 'Review and next steps', 'Decision history',
]
const specHeadings = [
  'Overview', 'Glossary', 'Roles and permissions', 'Domain model', 'States and lifecycle',
  'Business rules', 'Screens and navigation', 'Stories and acceptance criteria',
  'Integrations and data', 'Quality requirements', 'Rollout and verification',
  'Assumptions and open questions', 'Traceability',
]
const screenHeadings = ['Navigation map', 'Screen inventory', 'Screens', 'Content and copy', 'Accessibility']
const gates = {
  discovery: ['stop', 'repeat discovery'],
  evaluation: ['test solutions', 'specify a slice'],
  'build-slice': ['ready for a named build slice'],
}
const standards = ['product-design/1.0', 'product-design/1.1']
const stateNames = ['default', 'empty', 'loading', 'partial', 'error', 'denied', 'success', 'offline']
const drawioKinds = ['journey', 'process', 'navigation', 'sketch', 'prototype', 'context', 'erd', 'states', 'sequence', 'dataflow']
const drawioFile = new RegExp(`^(${drawioKinds.join('|')})\\.drawio$`)
const stepFolderName = /^(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*$/
const maxDrawioPages = 2
const maxDrawioShapes = 400
const idPattern = /\b(?:BR|SC|N|R|S|A|M)\d+\b/g
const definitionPattern = /^(?:\s*[-*]\s+|\|\s*|#+\s+)?(?:\*\*)?((?:BR|SC|N|R|S|A|M)\d+)\b/gm

function normalize(markdown) {
  return markdown.replace(/\r\n/g, '\n')
}

function headerOf(text, errors, label) {
  const header = text.split(/^## /m)[0]
  if (!/^# \S.+$/m.test(header)) errors.push(`${label}Missing document title.`)
  return (name) => {
    const matches = [...header.matchAll(new RegExp(`^${name}: (.+)$`, 'gm'))]
    if (matches.length !== 1) errors.push(`${label}Expected one ${name} field before the sections.`)
    return matches[0]?.[1].trim()
  }
}

function checkDate(value, errors, label) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') ? new Date(`${value}T00:00:00Z`) : null
  if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) errors.push(`${label}Updated must be a real YYYY-MM-DD date.`)
}

function sectionsOf(text, expected, errors, label, count = expected.length) {
  const sections = [...text.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)]
  if (sections.map((match) => match[1]).join('|') !== expected.join('|')) {
    errors.push(`${label}Expected the ${count} standard sections in order, once each.`)
  }
  for (const section of sections) {
    if (!section[2].trim()) errors.push(`${label}Empty section: ${section[1]}. Explain deferrals instead.`)
  }
  return sections
}

export function checkOutput(markdown) {
  const errors = []
  const text = normalize(markdown)
  const field = headerOf(text, errors, '')
  if (!standards.includes(field('Standard'))) errors.push('Unsupported output standard.')
  const profile = field('Profile')
  const gate = field('Next gate')
  if (!Object.hasOwn(gates, profile ?? '')) errors.push('Invalid profile.')
  else if (!gates[profile].includes(gate)) errors.push('Profile and next gate disagree.')
  checkDate(field('Updated'), errors, '')
  field('Decision owner')
  field('Approval')
  const sections = sectionsOf(text, headings, errors, '', 'ten')
  const review = sections.find((match) => match[1] === 'Review and next steps')?.[2] ?? ''
  for (const verdict of ['Design coherence', 'Evidence confidence', 'Delivery readiness']) {
    if (!review.includes(`${verdict}:`)) errors.push(`Missing review verdict: ${verdict}.`)
  }
  return errors
}

export function checkBuildSpec(markdown) {
  const errors = []
  const label = 'build-spec.md: '
  const text = normalize(markdown)
  const field = headerOf(text, errors, label)
  if (field('Standard') !== 'build-spec/1.0') errors.push(`${label}Unsupported standard.`)
  if (!['draft', 'ready'].includes(field('Status'))) errors.push(`${label}Status must be draft or ready.`)
  field('Slice')
  checkDate(field('Updated'), errors, label)
  const sections = sectionsOf(text, specHeadings, errors, label)
  const stories = sections.find((match) => match[1] === 'Stories and acceptance criteria')?.[2] ?? ''
  if (!/\bGiven\b[\s\S]*?\bWhen\b[\s\S]*?\bThen\b/.test(stories)) errors.push(`${label}Acceptance criteria need Given, When, Then.`)
  const trace = sections.find((match) => match[1] === 'Traceability')?.[2] ?? ''
  for (const id of new Set(stories.match(/^A\d+\b/gm))) {
    if (!new RegExp(`\\b${id}\\b`).test(trace)) errors.push(`${label}${id} is missing from Traceability.`)
  }
  if (/^\|.*\|[ \t]*\|/m.test(trace)) errors.push(`${label}Traceability has an empty cell.`)
  return errors
}

export function checkScreens(markdown) {
  const errors = []
  const label = 'screens.md: '
  const text = normalize(markdown)
  const field = headerOf(text, errors, label)
  if (field('Standard') !== 'screens/1.0') errors.push(`${label}Unsupported standard.`)
  checkDate(field('Updated'), errors, label)
  sectionsOf(text, screenHeadings, errors, label)
  if (!screenIds(text).length) errors.push(`${label}Expected at least one screen heading such as "### SC1 Name".`)
  return errors
}

export function screenIds(markdown) {
  return [...normalize(markdown).matchAll(/^### (SC\d+)\b/gm)].map((match) => match[1])
}

export function screenStates(markdown) {
  const frames = []
  for (const section of normalize(markdown).split(/^(?=### )/m)) {
    const id = /^### (SC\d+)\b/.exec(section)?.[1]
    const line = /^\s*(?:[-*]\s+)?(?:\*\*)?States:(?:\*\*)?(.*)$/m.exec(section)?.[1]
    if (!id || !line) continue
    for (const item of line.split(/[;,](?![^(]*\))/)) {
      const state = /^\s*(\w+)\s*(?:\(|:|\.?\s*$)/.exec(item)?.[1].toLowerCase()
      if (stateNames.includes(state)) frames.push(`${id}-${state}`)
    }
  }
  return frames
}

function cellsOf(xml) {
  return [...xml.matchAll(/<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g)].map((match) => {
    const attr = (key) => new RegExp(`\\b${key}="([^"]*)"`).exec(match[1])?.[1]
    const geometry = /<mxGeometry\b([^>]*)/.exec(match[2] ?? '')?.[1] ?? ''
    const number = (key) => Number(new RegExp(`\\b${key}="(-?[\\d.]+)"`).exec(geometry)?.[1] ?? 0)
    return { id: attr('id'), value: attr('value') ?? '', x: number('x'), y: number('y'), width: number('width'), height: number('height') }
  })
}

function packageDiagrams(folder) {
  const diagrams = []
  const steps = []
  const errors = []
  for (const name of readdirSync(folder)) {
    const path = join(folder, name)
    if (statSync(path).isDirectory()) {
      const drawios = readdirSync(path).filter((file) => file.endsWith('.drawio'))
      const index = stepFolderName.exec(name)
      if (!index) {
        if (drawios.length) errors.push(`${name}: Group a business step as NN-<step>, such as 01-nurse-ask-cover.`)
        continue
      }
      steps.push(Number(index[1]))
      for (const file of drawios) {
        const kind = drawioFile.exec(file)?.[1]
        if (!kind) errors.push(`${name}/${file}: Inside a step folder, use the short name, such as sketch.drawio.`)
        diagrams.push({ kind, rel: `${name}/${file}`, path: join(path, file), dir: name })
      }
      continue
    }
    if (!name.endsWith('.drawio')) continue
    diagrams.push({ kind: drawioFile.exec(name)?.[1], rel: name, path, dir: '' })
  }
  if (steps.length) {
    const sorted = [...steps].sort((a, b) => a - b)
    if (new Set(sorted).size !== sorted.length) errors.push('Step folders repeat an index. Number each business step once.')
    if (sorted.some((index, place) => index !== place + 1)) errors.push('Step folders are not numbered 01, 02, 03 in business order.')
  }
  for (const kind of drawioKinds) {
    const ofKind = diagrams.filter((diagram) => diagram.kind === kind)
    if (ofKind.some((diagram) => diagram.dir === '') && ofKind.some((diagram) => diagram.dir !== '')) {
      errors.push(`${kind}.drawio is in the package folder and in a step folder. One flow stays in the package folder. Several flows use only step folders.`)
    }
  }
  return { diagrams, errors }
}

function checkFrames(xml, name, frames) {
  const errors = checkDrawio(xml, name)
  const cellIds = new Set(cellsOf(xml).map((cell) => cell.id))
  for (const frame of frames) {
    if (!cellIds.has(frame)) errors.push(`${name}: Missing frame ${frame} for screens.md.`)
  }
  return errors
}

function checkFrameSet(parts, label, frames, clip) {
  const errors = []
  const found = new Set()
  for (const part of parts) {
    errors.push(...checkDrawio(part.xml, part.name))
    if (clip) errors.push(...checkClipping(part.xml, part.name))
    for (const cell of cellsOf(part.xml)) found.add(cell.id)
  }
  for (const frame of frames) {
    if (!found.has(frame)) errors.push(`${label}: Missing frame ${frame} for screens.md.`)
  }
  return errors
}

function checkClipping(xml, name) {
  const errors = []
  const cells = cellsOf(xml)
  for (const frame of cells.filter((cell) => /^SC\d+-[a-z]+$/.test(cell.id ?? ''))) {
    for (const cell of cells) {
      if (!cell.id?.startsWith(`${frame.id}-`) || /-(caption|note)$/.test(cell.id)) continue
      const inside = cell.x >= frame.x && cell.y >= frame.y
        && cell.x + cell.width <= frame.x + frame.width && cell.y + cell.height <= frame.y + frame.height
      if (!inside) errors.push(`${name}: Cell ${cell.id} sticks out of frame ${frame.id}.`)
    }
  }
  return errors
}

export function checkPrototypeDrawio(xml, ids = [], states = []) {
  const frames = [...new Set([...ids.map((id) => `${id}-default`), ...states])]
  return [...checkFrames(xml, 'prototype.drawio', frames), ...checkClipping(xml, 'prototype.drawio')]
}

export function checkSketchDrawio(xml, ids = []) {
  return checkFrames(xml, 'sketch.drawio', ids.map((id) => `${id}-sketch`))
}

export function checkIds(markdownFiles, diagrams = []) {
  const errors = []
  const defined = new Set()
  const uses = new Map()
  for (const text of Object.values(markdownFiles)) {
    for (const match of normalize(text).matchAll(definitionPattern)) defined.add(match[1])
  }
  const values = diagrams.flatMap((xml) => cellsOf(xml).map((cell) => cell.value))
  for (const text of [...Object.values(markdownFiles), ...values]) {
    for (const [id] of text.matchAll(idPattern)) uses.set(id, (uses.get(id) ?? 0) + 1)
  }
  for (const [name, text] of Object.entries(markdownFiles)) {
    for (const id of new Set(text.match(idPattern))) {
      if (!defined.has(id)) errors.push(`${name}: ${id} is referenced but never defined.`)
    }
  }
  for (const id of defined) {
    if (/^(?:N|R|BR)\d/.test(id) && uses.get(id) < 2) errors.push(`${id} is defined but never used.`)
  }
  return errors
}

export function checkDrawio(xml, name = 'diagram.drawio') {
  const errors = []
  const label = `${name}: `
  if (!/<mxfile\b/.test(xml)) errors.push(`${label}Expected an uncompressed <mxfile>.`)
  const diagrams = [...xml.matchAll(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/g)]
  if (diagrams.length > maxDrawioPages) errors.push(`${label}Has ${diagrams.length} pages. Split into one file per close flow.`)
  const shapes = xml.match(/\bvertex="1"/g)?.length ?? 0
  if (shapes > maxDrawioShapes) errors.push(`${label}Has ${shapes} shapes. Split into one file per close flow.`)
  for (const diagram of diagrams) {
    const body = diagram[1]
    if (body.trim() && !body.includes('<mxGraphModel')) { errors.push(`${label}Diagram is compressed; write uncompressed XML.`); continue }
    const cells = [...body.matchAll(/<(?:object|UserObject)\b([^>]*)>\s*<mxCell\b([^>]*?)\/?>|<mxCell\b([^>]*?)\/?>/g)]
      .map((match) => match[3] ?? `${match[1]} ${match[2]}`)
    const attr = (cell, key) => new RegExp(`\\b${key}="([^"]*)"`).exec(cell)?.[1]
    const ids = cells.map((cell) => attr(cell, 'id'))
    const unique = new Set(ids)
    if (unique.size !== ids.length) errors.push(`${label}Cell ids must be unique within a page.`)
    if (!unique.has('0') || !unique.has('1')) errors.push(`${label}Missing reserved cells 0 and 1.`)
    for (const cell of cells) {
      const id = attr(cell, 'id')
      const parent = attr(cell, 'parent')
      if (parent && !unique.has(parent)) errors.push(`${label}Cell ${id} has unknown parent ${parent}.`)
      if (!/\bedge="1"/.test(cell)) continue
      for (const end of ['source', 'target']) {
        const ref = attr(cell, end)
        if (!ref) errors.push(`${label}Edge ${id} has no ${end}.`)
        else if (!unique.has(ref)) errors.push(`${label}Edge ${id} points to unknown ${end} ${ref}.`)
      }
    }
  }
  return errors
}

export function checkPackage(folder) {
  const errors = []
  const read = (name) => readFileSync(join(folder, name), 'utf8')
  const has = (name) => existsSync(join(folder, name))
  if (!has('product-design.md')) return ['Missing product-design.md.']
  const proposal = read('product-design.md')
  errors.push(...checkOutput(proposal))
  const field = (name) => new RegExp(`^${name}: (.+)$`, 'm').exec(normalize(proposal).split(/^## /m)[0])?.[1].trim()
  const profile = field('Profile')
  const gate = field('Next gate')
  const v11 = field('Standard') === 'product-design/1.1'

  let ids = []
  let states = []
  if (has('screens.md')) {
    const screens = read('screens.md')
    errors.push(...checkScreens(screens))
    ids = screenIds(screens)
    states = screenStates(screens)
  }
  const { diagrams, errors: diagramErrors } = packageDiagrams(folder)
  errors.push(...diagramErrors)
  const ofKind = (kind) => diagrams.filter((diagram) => diagram.kind === kind)
  const prototypes = ofKind('prototype')
  const sketches = ofKind('sketch')
  const readDiagram = (diagram) => ({ name: diagram.rel, xml: readFileSync(diagram.path, 'utf8') })
  if (prototypes.length) {
    if (!has('screens.md')) errors.push('prototype.drawio needs screens.md.')
    const frames = [...new Set([...ids.map((id) => `${id}-default`), ...states])]
    errors.push(...checkFrameSet(prototypes.map(readDiagram), 'prototype.drawio', frames, true))
  } else if (v11 && has('screens.md') && profile !== 'discovery') errors.push('screens.md needs prototype.drawio.')
  if (sketches.length) {
    errors.push(...checkFrameSet(sketches.map(readDiagram), 'sketch.drawio', ids.map((id) => `${id}-sketch`), false))
  } else if (v11 && has('screens.md') && profile !== 'discovery') errors.push('screens.md needs sketch.drawio.')

  if (has('build-spec.md')) {
    const spec = read('build-spec.md')
    errors.push(...checkBuildSpec(spec))
    const status = /^Status: (.+)$/m.exec(normalize(spec))?.[1].trim()
    if (profile === 'discovery') errors.push('A discovery proposal must not have a build spec.')
    if (status === 'ready' && profile !== 'build-slice') errors.push('build-spec.md is ready but the proposal is not a build-slice.')
    if (status !== 'ready' && profile === 'build-slice') errors.push('A build-slice proposal needs build-spec.md with Status: ready.')
  } else if (v11 && profile === 'build-slice') errors.push('A build-slice proposal needs build-spec.md.')
  else if (v11 && gate === 'specify a slice') errors.push('Next gate specify a slice needs a draft build-spec.md.')

  if (profile === 'discovery' && v11 && (has('screens.md') || sketches.length || prototypes.length)) errors.push('A discovery proposal must not design screens.')

  const covered = new Set([...prototypes, ...sketches].map((diagram) => diagram.rel))
  for (const diagram of diagrams) {
    if (!covered.has(diagram.rel)) errors.push(...checkDrawio(readFileSync(diagram.path, 'utf8'), diagram.rel))
  }
  const markdown = Object.fromEntries(['product-design.md', 'screens.md', 'build-spec.md'].filter(has).map((name) => [name, read(name)]))
  errors.push(...checkIds(markdown, diagrams.map((diagram) => readFileSync(diagram.path, 'utf8'))))
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const path = process.argv[2]
  if (!path) {
    console.error('Usage: node scripts/check-output.mjs <product-design.md | package folder>')
    process.exitCode = 1
  } else {
    const folder = statSync(path).isDirectory()
    const errors = folder ? checkPackage(path) : checkOutput(readFileSync(path, 'utf8'))
    if (errors.length) {
      errors.forEach((error) => console.error(error))
      process.exitCode = 1
    } else console.log(`${folder ? 'Package structure, IDs, and prototype states are valid' : 'Output structure is valid'}. Evidence, readiness, and how the diagrams look still need human review.`)
  }
}
