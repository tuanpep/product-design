import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const palette = { ink: '#262626', muted: '#595959', line: '#bfbfbf', surface: '#f5f5f5', paper: '#ffffff', action: '#333333' }
const base = 'html=0;whiteSpace=wrap;fontFamily=Arial;fontSize=14;'
const textStyle = `${base}text;fillColor=none;strokeColor=none;align=left;verticalAlign=middle;fontColor=${palette.ink};`
const boxStyle = `${base}rounded=0;fillColor=${palette.paper};strokeColor=${palette.line};fontColor=${palette.ink};`
const idPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
const xmlText = (value) => String(value).replace(/[&<>"'\r\n\t]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;', '\r': '&#13;', '\n': '&#10;', '\t': '&#9;' })[char])
const hash = (text) => createHash('sha256').update(text).digest('hex')

function object(value, keys, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`)
  for (const key of Object.keys(value)) if (!keys.includes(key)) throw new Error(`${label}: unknown property ${key}`)
}

function string(value, label, max = 240) {
  if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/u.test(value) || !value.isWellFormed()) {
    throw new Error(`${label} must be nonempty text, at most ${max} characters, with valid XML characters`)
  }
  return value
}

function id(value, label) {
  string(value, label, 48)
  if (!idPattern.test(value)) throw new Error(`${label} must be lowercase kebab-case, starting with a letter`)
  return value
}

function array(value, label, min, max) {
  if (!Array.isArray(value) || value.length < min || value.length > max) throw new Error(`${label} needs ${min}–${max} entries`)
  return value
}

function number(value, label, min, max) {
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}`)
  return value
}

function validateItem(item, label) {
  const common = ['id', 'type']
  const keys = {
    heading: ['text'], text: ['text'], card: ['title', 'text'], field: ['label', 'value'],
    actions: ['buttons'], table: ['columns', 'rows'],
  }
  object(item, [...common, ...(Object.hasOwn(keys, item?.type) ? keys[item.type] : [])], label)
  id(item.id, `${label}.id`)
  if (!Object.hasOwn(keys, item.type)) throw new Error(`${label}: unsupported type ${item.type}`)
  if (item.type === 'heading' || item.type === 'text') string(item.text, `${label}.text`, item.type === 'heading' ? 100 : 600)
  if (item.type === 'card') {
    string(item.title, `${label}.title`, 100)
    string(item.text, `${label}.text`, 600)
  }
  if (item.type === 'field') {
    string(item.label, `${label}.label`, 100)
    if (item.value !== undefined) string(item.value, `${label}.value`, 160)
  }
  if (item.type === 'actions') {
    array(item.buttons, `${label}.buttons`, 1, 3).forEach((button, i) => {
      object(button, ['id', 'label', 'primary'], `${label}.buttons[${i}]`)
      id(button.id, `${label}.button.id`)
      string(button.label, `${label}.button.label`, 40)
      if (button.primary !== undefined && typeof button.primary !== 'boolean') throw new Error(`${label}: primary must be boolean`)
    })
  }
  if (item.type === 'table') {
    array(item.columns, `${label}.columns`, 1, 6).forEach((column) => string(column, `${label}.column`, 60))
    array(item.rows, `${label}.rows`, 0, 6).forEach((row) => {
      array(row, `${label}.row`, item.columns.length, item.columns.length).forEach((value) => string(value, `${label}.cell`, 120))
    })
  }
}

export function validateSketch(spec) {
  object(spec, ['id', 'title', 'device', 'columns', 'screens', 'links'], 'sketch')
  id(spec.id, 'sketch.id')
  string(spec.title, 'sketch.title', 120)
  if (spec.device !== undefined && !['desktop', 'mobile'].includes(spec.device)) throw new Error('device must be desktop or mobile')
  if (spec.columns !== undefined && (!Number.isInteger(spec.columns) || spec.columns < 1 || spec.columns > 4)) throw new Error('columns must be an integer from 1 to 4')
  const screenIds = new Set()
  const endpoints = new Set()
  array(spec.screens, 'screens', 1, 8).forEach((screen, i) => {
    const label = `screens[${i}]`
    object(screen, ['id', 'title', 'role', 'width', 'x', 'y', 'items'], label)
    id(screen.id, `${label}.id`)
    if (screenIds.has(screen.id)) throw new Error(`Duplicate screen id: ${screen.id}`)
    screenIds.add(screen.id)
    endpoints.add(screen.id)
    string(screen.title, `${label}.title`, 100)
    if (screen.role !== undefined) string(screen.role, `${label}.role`, 80)
    if (screen.title.includes('\n') || screen.title.includes('\r') || /[\r\n]/.test(screen.role ?? '')) throw new Error(`${label}: title and role must be single-line text`)
    if (screen.width !== undefined) number(screen.width, `${label}.width`, 320, 1440)
    if ((screen.x === undefined) !== (screen.y === undefined)) throw new Error(`${label}: provide both x and y`)
    if (screen.x !== undefined) {
      number(screen.x, `${label}.x`, 0, 20000)
      number(screen.y, `${label}.y`, 100, 20000)
    }
    const itemIds = new Set()
    array(screen.items, `${label}.items`, 1, 24).forEach((item, j) => {
      validateItem(item, `${label}.items[${j}]`)
      if (itemIds.has(item.id)) throw new Error(`Duplicate item id: ${screen.id}/${item.id}`)
      itemIds.add(item.id)
      endpoints.add(`${screen.id}/${item.id}`)
      if (item.type === 'actions') {
        const buttons = new Set()
        for (const button of item.buttons) {
          if (buttons.has(button.id)) throw new Error(`Duplicate button id: ${button.id}`)
          buttons.add(button.id)
          endpoints.add(`${screen.id}/${item.id}/${button.id}`)
        }
      }
    })
  })
  const links = new Set()
  array(spec.links ?? [], 'links', 0, 32).forEach((link) => {
    object(link, ['id', 'from', 'to', 'label', 'kind'], 'link')
    id(link.id, 'link.id')
    if (links.has(link.id)) throw new Error(`Duplicate link id: ${link.id}`)
    links.add(link.id)
    string(link.label, 'link.label', 80)
    for (const key of ['from', 'to']) if (!endpoints.has(link[key])) throw new Error(`Unknown link ${key}: ${link[key]}`)
    if (link.kind !== undefined && !['navigation', 'handoff'].includes(link.kind)) throw new Error('link.kind must be navigation or handoff')
  })
  return spec
}

function lines(text, width, size = 14) {
  const capacity = Math.max(1, Math.floor(width / (size * 0.62)))
  return text.split(/\r?\n/).reduce((sum, line) => sum + Math.max(1, Math.ceil([...line].length / capacity)), 0)
}

function itemHeight(item, width) {
  if (item.type === 'heading') return Math.max(32, lines(item.text, width, 20) * 26)
  if (item.type === 'text') return Math.max(24, lines(item.text, width) * 22)
  if (item.type === 'field') return lines(item.label, width) * 22 + 8 + Math.max(40, lines(item.value ?? ' ', width - 16) * 22 + 16)
  if (item.type === 'card') return 24 + lines(item.title, width - 24, 16) * 24 + 8 + lines(item.text, width - 24) * 22
  if (item.type === 'actions') return Math.max(44, ...item.buttons.map((b) => lines(b.label, (width - 12 * (item.buttons.length - 1)) / item.buttons.length - 16) * 22 + 16))
  const colWidth = width / item.columns.length - 16
  return [item.columns, ...item.rows].reduce((sum, row) => sum + Math.max(40, ...row.map((value) => lines(value, colWidth) * 22 + 16)), 0)
}

export function renderSketch(input) {
  const spec = validateSketch(input)
  const cells = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>']
  const ids = new Set(['0', '1'])
  const parents = new Map([['1', '0']])
  const refs = new Map()
  function vertex(cellId, value, style, parent, x, y, width, height) {
    if (ids.has(cellId)) throw new Error(`Generated cell id collision: ${cellId}`)
    ids.add(cellId)
    parents.set(cellId, parent)
    cells.push(`<mxCell id="${xmlText(cellId)}" value="${xmlText(value)}" style="${xmlText(style)}" vertex="1" parent="${xmlText(parent)}"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`)
  }
  vertex('sketch-title', spec.title, `${textStyle}fontSize=24;fontStyle=1;`, '1', 40, 16, 2400, 36)
  vertex('sketch-note', 'Exploratory static mockup — arrows describe transitions, not working interactions. Dashed = role handoff.', `${textStyle}fontSize=12;fontColor=${palette.muted};`, '1', 40, 56, 900, 36)
  const mobile = spec.device === 'mobile'
  const cols = spec.columns ?? Math.min(3, spec.screens.length)
  const layouts = spec.screens.map((screen) => {
    const width = screen.width ?? (mobile ? 360 : 640)
    const heights = screen.items.map((item) => itemHeight(item, width - 48))
    const title = screen.title + (screen.role ? ` — ${screen.role}` : '')
    const contentTop = Math.max(64, lines(title, width - 48, 18) * 24 + 32)
    const height = Math.max(mobile ? 640 : 480, contentTop + heights.reduce((a, b) => a + b, 0) + heights.length * 16 + 24)
    return { screen, width, height, heights, title, contentTop }
  })
  const colWidths = Array.from({ length: cols }, (_, col) => Math.max(0, ...layouts.filter((_, i) => i % cols === col).map((l) => l.width)))
  const rowHeights = Array.from({ length: Math.ceil(layouts.length / cols) }, (_, row) => Math.max(...layouts.slice(row * cols, (row + 1) * cols).map((l) => l.height)))
  const placed = []
  for (const [i, layout] of layouts.entries()) {
    const { screen, width, height, heights, title, contentTop } = layout
    const x = screen.x ?? 40 + colWidths.slice(0, i % cols).reduce((sum, w) => sum + w + 160, 0)
    const y = screen.y ?? 120 + rowHeights.slice(0, Math.floor(i / cols)).reduce((sum, h) => sum + h + 140, 0)
    for (const other of placed) {
      if (x < other.x + other.width && x + width > other.x && y < other.y + other.height && y + height > other.y) throw new Error(`Screens overlap: ${screen.id} and ${other.id}`)
    }
    placed.push({ id: screen.id, x, y, width, height })
    const frame = `s-${screen.id}`
    refs.set(screen.id, frame)
    vertex(frame, '', `${boxStyle}container=1;collapsible=0;recursiveResize=0;`, '1', x, y, width, height)
    vertex(`${frame}---title`, title, `${textStyle}fontSize=18;fontStyle=1;`, frame, 24, 16, width - 48, contentTop - 32)
    let top = contentTop
    for (const [j, item] of screen.items.entries()) {
      const cellId = `${frame}--${item.id}`
      const h = heights[j]
      const w = width - 48
      refs.set(`${screen.id}/${item.id}`, cellId)
      if (item.type === 'text' || item.type === 'heading') {
        vertex(cellId, item.text, textStyle + (item.type === 'heading' ? 'fontSize=20;fontStyle=1;' : ''), frame, 24, top, w, h)
      } else if (item.type === 'field') {
        const labelHeight = lines(item.label, w) * 22
        vertex(cellId, item.label, textStyle, frame, 24, top, w, labelHeight)
        vertex(`${cellId}--value`, item.value ?? '', `${boxStyle}shape=mxgraph.mockup.forms.rrect;rSize=0;align=left;spacingLeft=8;`, frame, 24, top + labelHeight + 8, w, h - labelHeight - 8)
      } else if (item.type === 'card') {
        vertex(cellId, '', `${boxStyle}fillColor=${palette.surface};`, frame, 24, top, w, h)
        const titleHeight = lines(item.title, w - 24, 16) * 24
        vertex(`${cellId}--title`, item.title, `${textStyle}fontSize=16;fontStyle=1;`, frame, 36, top + 12, w - 24, titleHeight)
        vertex(`${cellId}--body`, item.text, textStyle, frame, 36, top + 20 + titleHeight, w - 24, h - titleHeight - 32)
      } else if (item.type === 'actions') {
        vertex(cellId, '', `${base}group;`, frame, 24, top, w, h)
        const buttonWidth = (w - 12 * (item.buttons.length - 1)) / item.buttons.length
        for (const [k, button] of item.buttons.entries()) {
          const buttonId = `${cellId}--${button.id}`
          refs.set(`${screen.id}/${item.id}/${button.id}`, buttonId)
          vertex(buttonId, button.label, boxStyle + (button.primary ? `fillColor=${palette.action};fontColor=${palette.paper};` : ''), cellId, k * (buttonWidth + 12), 0, buttonWidth, h)
        }
      } else {
        vertex(cellId, '', `${base}group;`, frame, 24, top, w, h)
        const cw = w / item.columns.length
        let rowY = 0
        for (const [r, row] of [item.columns, ...item.rows].entries()) {
          const rh = Math.max(40, ...row.map((value) => lines(value, cw - 16) * 22 + 16))
          for (const [c, value] of row.entries()) vertex(`${cellId}--r${r}c${c}`, value, `${boxStyle}align=left;spacingLeft=8;spacingRight=8;` + (r === 0 ? `fillColor=${palette.surface};fontStyle=1;` : ''), cellId, c * cw, rowY, cw, rh)
          rowY += rh
        }
      }
      top += h + 16
    }
  }
  function edgeParent(source, target) {
    const ancestors = new Set()
    for (let current = parents.get(source); current; current = parents.get(current)) ancestors.add(current)
    for (let current = parents.get(target); current; current = parents.get(current)) if (ancestors.has(current)) return current
    return '1'
  }
  for (const link of spec.links ?? []) {
    const source = refs.get(link.from)
    const target = refs.get(link.to)
    cells.push(`<mxCell id="e-${link.id}" value="${xmlText(link.label)}" style="${base}edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=block;endFill=1;labelBackgroundColor=#ffffff;strokeColor=${palette.muted};${link.kind === 'handoff' ? 'dashed=1;' : ''}" edge="1" source="${source}" target="${target}" parent="${edgeParent(source, target)}"><mxGeometry relative="1" as="geometry"/></mxCell>`)
  }
  const body = `<diagram id="${spec.id}" name="${xmlText(spec.title)}"><mxGraphModel grid="1" gridSize="8" page="0"><root>${cells.join('\n')}</root></mxGraphModel></diagram>`
  return `<mxfile sketchRenderer="1" sketchId="${spec.id}" sketchHash="${hash(body)}">${body}</mxfile>\n`
}

export function writeSketch(spec, output) {
  if (!/^sketch-[a-z0-9]+(?:-[a-z0-9]+)*\.drawio$/.test(basename(output))) throw new Error('Output must be named sketch-<name>.drawio; canonical mockup.drawio is not a sketch')
  const xml = renderSketch(spec)
  if (existsSync(output)) {
    const existing = readFileSync(output, 'utf8').replace(/\r\n/g, '\n')
    const match = /^<mxfile sketchRenderer="1" sketchId="([a-z0-9-]+)" sketchHash="([a-f0-9]{64})">([\s\S]*)<\/mxfile>\n$/.exec(existing)
    if (!match || match[1] !== spec.id || hash(match[3]) !== match[2]) throw new Error('Existing diagram is manual, modified, or belongs to another sketch. Reconcile edits explicitly or choose a new output path; nothing was overwritten.')
    if (existing === xml) return { changed: false, path: resolve(output) }
  }
  writeFileSync(output, xml, { encoding: 'utf8', flag: existsSync(output) ? 'w' : 'wx' })
  return { changed: true, path: resolve(output) }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4) throw new Error('Usage: node render.mjs <sketch.json> <sketch-name.drawio>')
    const result = writeSketch(JSON.parse(readFileSync(process.argv[2], 'utf8')), process.argv[3])
    console.log(`${result.changed ? 'Wrote' : 'Unchanged'} ${result.path}`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
