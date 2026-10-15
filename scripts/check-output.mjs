import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SaxesParser } from 'saxes'

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
const levels = ['understand', 'design-documents', 'mockup', 'full']
const stateNames = ['default', 'empty', 'loading', 'partial', 'error', 'denied', 'success', 'offline']
const drawioKinds = ['journey', 'process', 'navigation', 'mockup', 'context', 'erd', 'states', 'sequence', 'dataflow']
const drawioFile = new RegExp(`^(${drawioKinds.join('|')})\\.drawio$`)
const stepFolderName = /^([1-9]\d*(?:\.[1-9]\d*)?)-[a-z0-9]+(?:-[a-z0-9]+)*$/
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
  return (name, optional = false) => {
    const matches = [...header.matchAll(new RegExp(optional ? `^${name}:(.*)$` : `^${name}: (.+)$`, 'gm'))]
    if (matches.length !== 1 && !(optional && matches.length === 0)) errors.push(`${label}Expected one ${name} field before the sections.`)
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
  const level = field('Level', true)
  if (level !== undefined) {
    if (!levels.includes(level)) errors.push('Invalid level.')
    if (level === 'understand' && profile !== 'discovery') errors.push('Level understand requires the discovery profile.')
    if (profile === 'build-slice' && level !== 'full') errors.push('A build-slice proposal requires Level: full when Level is present.')
    if (gate === 'specify a slice' && level !== 'full') errors.push('Next gate specify a slice requires Level: full when Level is present; use test solutions for a capped evaluation.')
  }
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
  const outcomes = [...stories.matchAll(definitionPattern)].map((match) => match[1]).filter((id) => /^A\d+$/.test(id))
  for (const id of new Set(outcomes)) {
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
  for (const line of text.matchAll(/^\s*(?:[-*]\s+)?(?:\*\*)?States:(?:\*\*)?(.*)$/gm)) {
    if (line[1].split(/[;,](?![^(]*\))/).some((item) => /^\s*slow\b/i.test(item))) errors.push(`${label}Describe slow responses under loading, not as a separate slow state.`)
  }
  for (const line of text.matchAll(/^\s*(?:[-*]\s+)?(?:\*\*)?Views:(?:\*\*)?(.*)$/gm)) {
    const names = line[1].split(/[;,](?![^(]*\))/).map((item) => /^\s*([a-z][a-z0-9]*(?:-[a-z0-9]+)*)/.exec(item)?.[1]).filter(Boolean)
    if (names[0] !== 'default') errors.push(`${label}Views must start with default.`)
    if (new Set(names).size !== names.length || names.some((name) => /-(caption|note)$/.test(name) || names.some((other) => other !== name && other.startsWith(`${name}-`)))) {
      errors.push(`${label}View names must be unique, not prefix other view names, and not end in -caption or -note.`)
    }
    for (const item of line[1].split(/[;,](?![^(]*\))/)) {
      if (!/^\s*[a-z][a-z0-9]*(?:-[a-z0-9]+)*\s*(?:\([^)]*\)|\[[^\]]*\])?\s*\.?\s*$/.test(item)) {
        errors.push(`${label}Views need lowercase kebab-case names with optional bracketed details, separated by semicolons.`)
      }
    }
  }
  return errors
}

export function screenIds(markdown) {
  return [...normalize(markdown).matchAll(/^### (SC\d+)\b/gm)].map((match) => match[1])
}

export function screenStates(markdown) {
  const frames = []
  for (const section of normalize(markdown).split(/^(?=### )/m)) {
    const id = /^### (SC\d+)\b/.exec(section)?.[1]
    if (!id) continue
    for (const line of section.matchAll(/^\s*(?:[-*]\s+)?(?:\*\*)?(States|Views):(?:\*\*)?(.*)$/gm)) {
      for (const item of line[2].split(/[;,](?![^(]*\))/)) {
        const state = /^\s*([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\s*(?:\(|\[|:|with\b|\.?\s*$)/i.exec(item)?.[1].toLowerCase()
        if (state && (line[1] === 'Views' || stateNames.includes(state)) && !frames.includes(`${id}-${state}`)) frames.push(`${id}-${state}`)
      }
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

function checkStepOrder(indexes) {
  const errors = []
  if (new Set(indexes).size !== indexes.length) errors.push('Step folders repeat an index. Number each business step once.')
  const unique = [...new Set(indexes)]
  const parents = unique.filter((index) => !index.includes('.')).map(Number).sort((a, b) => a - b)
  if (parents.some((index, place) => index !== place + 1)) {
    errors.push('Step folders are not numbered in parent/child order. Parents are 1, 2, 3.')
  }
  const children = new Map()
  for (const index of unique) {
    if (!index.includes('.')) continue
    const [parent, child] = index.split('.')
    if (!unique.includes(parent)) errors.push(`Step ${index} has no parent folder ${parent}-.`)
    children.set(parent, [...(children.get(parent) ?? []), Number(child)])
  }
  for (const [parent, list] of children) {
    const sorted = [...list].sort((a, b) => a - b)
    if (sorted.some((index, place) => index !== place + 1)) {
      errors.push(`Children of step ${parent} are not numbered ${parent}.1, ${parent}.2.`)
    }
  }
  return errors
}

function packageDiagrams(folder) {
  const diagrams = []
  const steps = []
  const errors = []
  function visit(directory, relative = '', parentIndex = '') {
    for (const name of readdirSync(directory)) {
      const path = join(directory, name)
      const rel = relative ? `${relative}/${name}` : name
      if (statSync(path).isDirectory()) {
        const index = stepFolderName.exec(name)
        if (!index) {
          errors.push(`${rel}: Group a business step as <index>-<step>, such as 1-nurse-ask-cover or 1.1-nurse-choose-colleague.`)
        } else {
          steps.push(index[1])
          const expectedParent = index[1].includes('.') ? index[1].split('.')[0] : ''
          if (expectedParent !== parentIndex || (relative && !parentIndex)) {
            errors.push(`${rel}: Step ${index[1]} must be ${expectedParent ? `nested directly inside its parent folder ${expectedParent}-` : 'in the package root'}.`)
          }
        }
        visit(path, rel, index?.[1] ?? '')
        continue
      }
      if (relative && ['product-design.md', 'screens.md', 'build-spec.md'].includes(name)) {
        errors.push(`${rel}: Canonical Markdown files belong in the package root, not a subfolder.`)
      }
      if (!name.endsWith('.drawio')) continue
      const kind = drawioFile.exec(name)?.[1]
      if (relative && !kind) errors.push(`${rel}: Inside a step folder, use the short name, such as mockup.drawio.`)
      diagrams.push({ kind, rel, path, dir: relative })
    }
  }
  visit(folder)
  if (steps.length) errors.push(...checkStepOrder(steps))
  for (const diagram of diagrams) {
    if (diagram.rel.split('/').at(-1) === 'prototype.drawio') {
      errors.push(`${diagram.rel}: Obsolete prototype.drawio; rename to mockup.drawio and update links.`)
    }
  }
  for (const kind of drawioKinds) {
    const ofKind = diagrams.filter((diagram) => diagram.kind === kind)
    if (ofKind.some((diagram) => diagram.dir === '') && ofKind.some((diagram) => diagram.dir !== '')) {
      errors.push(`${kind}.drawio is in the package folder and in a step folder. One flow stays in the package folder. Several flows use only step folders.`)
    }
  }
  return { diagrams, errors }
}

function checkFrames(xml, name, frames, ids) {
  const errors = checkDrawio(xml, name)
  errors.push(...checkStatePlacement(xml, name, ids, frames))
  const cellIds = new Set(cellsOf(xml).map((cell) => cell.id))
  for (const frame of frames) {
    if (!cellIds.has(frame)) errors.push(`${name}: Missing frame ${frame} for screens.md.`)
  }
  return errors
}

function checkFrameSet(parts, label, frames, clip, ids) {
  const errors = []
  const found = new Set()
  for (const part of parts) {
    errors.push(...checkDrawio(part.xml, part.name))
    errors.push(...checkStatePlacement(part.xml, part.name, ids, frames))
    if (clip) errors.push(...checkClipping(part.xml, part.name))
    for (const cell of cellsOf(part.xml)) found.add(cell.id)
  }
  for (const frame of frames) {
    if (!found.has(frame)) errors.push(`${label}: Missing frame ${frame} for screens.md.`)
  }
  return errors
}

function framesOf(cells) {
  const candidates = cells.filter((cell) => /^SC\d+-[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(cell.id ?? '') && !/-(caption|note)$/.test(cell.id))
  return candidates.filter((cell) => !candidates.some((other) => cell.id.startsWith(`${other.id}-`)))
}

function checkStatePlacement(xml, name, ids, declared) {
  const errors = []
  for (const page of xml.matchAll(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/g)) {
    const frames = framesOf(cellsOf(page[1]))
    for (const frame of frames) {
      if (frame.width <= 0 || frame.height <= 0) errors.push(`${name}: Frame ${frame.id} needs positive dimensions.`)
      if (!stateNames.includes(frame.id.replace(/^SC\d+-/, '')) && !declared.includes(frame.id)) errors.push(`${name}: Undeclared business view ${frame.id}; list it in screens.md Views.`)
    }
    for (let i = 0; i < frames.length; i++) {
      for (const other of frames.slice(i + 1)) {
        const frame = frames[i]
        if (frame.x < other.x + other.width && other.x < frame.x + frame.width && frame.y < other.y + other.height && other.y < frame.y + frame.height) {
          errors.push(`${name}: Frames ${frame.id} and ${other.id} overlap.`)
        }
      }
    }
    const reading = [...frames].sort((a, b) => a.y - b.y || a.x - b.x).map((frame) => frame.id)
    const screenOrder = [...new Set(reading.map((id) => id.split('-')[0]))].filter((id) => ids.includes(id))
    if (screenOrder.join('|') !== ids.filter((id) => screenOrder.includes(id)).join('|')) errors.push(`${name}: Screens must follow screens.md task order.`)
    for (const id of screenOrder) {
      const expected = declared.filter((frame) => frame.startsWith(`${id}-`) && reading.includes(frame))
      const actual = reading.filter((frame) => expected.includes(frame))
      if (actual.join('|') !== expected.join('|')) errors.push(`${name}: Views of ${id} must follow screens.md journey order.`)
    }
  }
  return errors
}

function checkClipping(xml, name) {
  const errors = []
  for (const page of xml.matchAll(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/g)) {
    const pageCells = cellsOf(page[1])
    for (const annotation of pageCells.filter((cell) => /-(caption|note)$/.test(cell.id))) {
      for (const frame of framesOf(pageCells)) {
        if (annotation.x < frame.x + frame.width && annotation.x + annotation.width > frame.x
          && annotation.y < frame.y + frame.height && annotation.y + annotation.height > frame.y) {
          errors.push(`${name}: Annotation ${annotation.id} overlaps screen ${frame.id}; keep design notes and captions outside screens.`)
        }
      }
    }
  }
  const cells = cellsOf(xml)
  for (const frame of framesOf(cells)) {
    for (const cell of cells) {
      if (!cell.id?.startsWith(`${frame.id}-`) || /-(caption|note)$/.test(cell.id)) continue
      const inside = cell.x >= frame.x && cell.y >= frame.y
        && cell.x + cell.width <= frame.x + frame.width && cell.y + cell.height <= frame.y + frame.height
      if (!inside) errors.push(`${name}: Cell ${cell.id} sticks out of frame ${frame.id}.`)
    }
  }
  return errors
}

export function checkMockupDrawio(xml, ids = [], states = []) {
  const frames = [...new Set([...ids.map((id) => `${id}-default`), ...states])]
  return [...checkFrames(xml, 'mockup.drawio', frames, ids), ...checkClipping(xml, 'mockup.drawio')]
}

export function checkIds(markdownFiles, diagrams = []) {
  const errors = []
  const defined = new Set()
  const uses = new Map()
  for (const text of Object.values(markdownFiles)) {
    for (const match of normalize(text).matchAll(definitionPattern)) defined.add(match[1])
  }
  const sources = Object.entries(markdownFiles)
  for (const [index, diagram] of diagrams.entries()) {
    const { name, xml } = typeof diagram === 'string' ? { name: `diagram ${index + 1}`, xml: diagram } : diagram
    sources.push([name, cellsOf(xml).map((cell) => cell.value).join('\n')])
  }
  for (const [, text] of sources) {
    for (const [id] of text.matchAll(idPattern)) uses.set(id, (uses.get(id) ?? 0) + 1)
  }
  for (const [name, text] of sources) {
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
  const elements = []
  const pages = []
  let root
  const parser = new SaxesParser()
  parser.on('opentag', (tag) => {
    if (!elements.length) root = tag.name
    elements.push(tag.name)
    if (elements.join('/') === 'mxfile/diagram') pages.push({ graph: false })
    if (elements.join('/') === 'mxfile/diagram/mxGraphModel/root') pages.at(-1).graph = true
  })
  parser.on('closetag', () => elements.pop())
  try {
    parser.write(xml).close()
  } catch {
    return [`${label}Expected well-formed XML.`]
  }
  if (root !== 'mxfile') return [`${label}Expected an uncompressed <mxfile>.`]
  if (!pages.length) errors.push(`${label}Expected at least one diagram with an mxGraphModel and root.`)
  for (const page of pages) {
    if (!page.graph) {
      errors.push(`${label}Each diagram needs an mxGraphModel and root.`)
    }
  }
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
  const field = headerOf(normalize(proposal), [], '')
  const profile = field('Profile')
  const gate = field('Next gate')
  const level = field('Level', true)
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
  const mockups = ofKind('mockup')
  if (['understand', 'design-documents'].includes(level) && (has('screens.md') || mockups.length)) {
    errors.push(`Level ${level} must not include screens.md or mockup.drawio.`)
  }
  if (level !== undefined && level !== 'full' && has('build-spec.md')) errors.push(`Level ${level} must not include build-spec.md.`)
  const readDiagram = (diagram) => ({ name: diagram.rel, xml: readFileSync(diagram.path, 'utf8') })
  if (mockups.length) {
    if (!has('screens.md')) errors.push('mockup.drawio needs screens.md.')
    const frames = [...new Set([...ids.map((id) => `${id}-default`), ...states])]
    errors.push(...checkFrameSet(mockups.map(readDiagram), 'mockup.drawio', frames, true, ids))
  } else if (v11 && has('screens.md') && profile !== 'discovery') errors.push('screens.md needs mockup.drawio.')

  if (has('build-spec.md')) {
    const spec = read('build-spec.md')
    errors.push(...checkBuildSpec(spec))
    const status = /^Status: (.+)$/m.exec(normalize(spec))?.[1].trim()
    if (profile === 'discovery') errors.push('A discovery proposal must not have a build spec.')
    if (status === 'ready' && profile !== 'build-slice') errors.push('build-spec.md is ready but the proposal is not a build-slice.')
    if (status !== 'ready' && profile === 'build-slice') errors.push('A build-slice proposal needs build-spec.md with Status: ready.')
  } else if (v11 && profile === 'build-slice') errors.push('A build-slice proposal needs build-spec.md.')
  else if (v11 && gate === 'specify a slice' && (level === undefined || level === 'full')) errors.push('Next gate specify a slice needs a draft build-spec.md.')

  if (profile === 'discovery' && v11 && (has('screens.md') || mockups.length)) errors.push('A discovery proposal must not design screens.')

  const covered = new Set(mockups.map((diagram) => diagram.rel))
  for (const diagram of diagrams) {
    if (!covered.has(diagram.rel)) errors.push(...checkDrawio(readFileSync(diagram.path, 'utf8'), diagram.rel))
  }
  const markdown = Object.fromEntries(['product-design.md', 'screens.md', 'build-spec.md'].filter(has).map((name) => [name, read(name)]))
  errors.push(...checkIds(markdown, diagrams.map(readDiagram)))
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
    } else console.log(`${folder ? 'Package structure, IDs, and mockup states are valid' : 'Output structure is valid'}. Evidence, readiness, and how the diagrams look still need human review.`)
  }
}
