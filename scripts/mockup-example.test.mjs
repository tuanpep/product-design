import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { checkDrawio, checkMockupDrawio, checkScreens, screenStates } from './check-output.mjs'

const exampleUrl = new URL('../skills/mockup-drawio/references/example.drawio', import.meta.url)
const xml = readFileSync(exampleUrl, 'utf8')
const attributes = (text) => Object.fromEntries([...text.matchAll(/([\w]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]))
const cells = [...xml.matchAll(/<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g)].map(([, attrs, body = '']) => ({
  ...attributes(attrs),
  geometry: attributes(body.match(/<mxGeometry\b([^>]*)/)?.[1] ?? ''),
  points: [...body.matchAll(/<mxPoint\b([^>]*)/g)].map(([, attrs]) => attributes(attrs)),
}))
const byId = new Map(cells.map((cell) => [cell.id, cell]))
const states = ['SC1-default', 'SC1-empty', 'SC1-loading', 'SC2-default', 'SC2-error', 'SC2-denied', 'SC2-success']
const frameCells = states.map((id) => byId.get(id))
const value = (id) => byId.get(id)?.value
const style = (id) => Object.fromEntries(byId.get(id).style.split(';').filter((part) => part.includes('=')).map((part) => part.split('=')))
const bounds = (id) => Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, Number(byId.get(id).geometry[key])]))

test('Carbon-informed White uses a neutral palette, blue actions and reserved status accents', () => {
  const palette = new Set(['#ffffff', '#f4f4f4', '#161616', '#525252', '#8d8d8d', '#e0e0e0', '#0f62fe', '#393939', '#da1e28', '#24a148', '#c6c6c6'])
  const colors = [...xml.matchAll(/#[\da-f]{6}/gi)].map(([color]) => color)
  for (const color of colors) assert.ok(palette.has(color), color)
  for (const color of palette) assert.ok(colors.includes(color), `Missing token ${color}`)
  assert.doesNotMatch(xml, /rounded=1;|arcSize=|fontSize=(?:16|18|24);|#(?:286344|245b40|244c3b|e4efe8|608d70)/i)
  for (const frame of states) {
    assert.equal(style(frame).fillColor, '#ffffff')
    assert.match(value(`${frame}-note`), /Carbon-informed White; Arial fallback/)
    assert.equal(style(`${frame}-title`).fontSize, '32')
    assert.equal(style(`${frame}-title`).fontStyle, '0')
    assert.equal(bounds(`${frame}-header`).height, 48)
    const header = bounds(`${frame}-header`)
    const sidebar = bounds(`${frame}-sidebar`)
    const account = bounds(`${frame}-account`)
    assert.equal(sidebar.y, header.y + header.height)
    assert.equal(sidebar.y + sidebar.height, bounds(frame).y + bounds(frame).height)
    assert.ok(account.y >= header.y && account.y + account.height <= header.y + header.height)
  }
  for (const cell of cells.filter((cell) => /-(send|request|return)$/.test(cell.id) && cell.id !== 'SC2-denied-send')) {
    assert.equal(style(cell.id).fillColor, '#0f62fe', cell.id)
    assert.equal(style(cell.id).fontColor, '#ffffff', cell.id)
  }
  for (const state of ['default', 'error', 'denied']) {
    assert.equal(style(`SC2-${state}-cancel`).fillColor, '#393939')
    assert.equal(style(`SC2-${state}-cancel`).fontColor, '#ffffff')
  }
  for (const cell of cells.filter((cell) => /-(previous|next|retry)$/.test(cell.id) && cell.id !== 'SC2-success-next')) {
    assert.equal(style(cell.id).strokeColor, '#0f62fe')
    assert.equal(style(cell.id).fontColor, '#0f62fe')
  }
  for (const cell of cells.filter((cell) => cell.style?.includes('#24a148'))) assert.equal(cell.id, 'SC2-success-panel-accent')
  assert.equal(style('SC2-success-status').fontColor, '#161616')
  assert.equal(style('SC2-success-status').fillColor, '#f4f4f4')
})

test('controls retain containment, focus clearance, radio targets and filled textarea rules', () => {
  const focus = bounds('SC1-default-focus')
  const action = bounds('SC1-default-request')
  // Six pixels on each side leave the two-pixel focus stroke clear of the action.
  for (const axis of ['x', 'y']) assert.ok(action[axis] - focus[axis] >= 4)
  assert.ok(focus.x + focus.width - action.x - action.width >= 4)
  assert.ok(focus.y + focus.height - action.y - action.height >= 4)
  for (const state of ['default', 'error', 'denied']) {
    const prefix = `SC2-${state}`
    const input = bounds(`${prefix}-note-input`)
    const rule = bounds(`${prefix}-note-input-rule`)
    assert.equal(style(`${prefix}-note-input`).fillColor, '#f4f4f4')
    assert.equal(style(`${prefix}-note-input`).strokeColor, 'none')
    assert.equal(style(`${prefix}-note-input-rule`).fillColor, '#8d8d8d')
    assert.equal(rule.height, 1)
    assert.equal(rule.y + rule.height, input.y + input.height)
    assert.equal(rule.x, input.x)
    assert.equal(rule.width, input.width)
    assert.ok(bounds(`${prefix}-send`).y - input.y - input.height >= 16)
    assert.ok(bounds(`${prefix}-cancel`).x - bounds(`${prefix}-send`).x - bounds(`${prefix}-send`).width >= 16)
    assert.equal(style(`${prefix}-legend`).fontSize, '12')
    for (const colleague of ['alex', 'lan']) {
      const id = `${prefix}-${colleague}`
      const radio = bounds(`${id}-radio`)
      const label = bounds(`${id}-label`)
      const card = bounds(`${id}-card`)
      assert.equal(radio.width, 20)
      assert.equal(radio.height, 20)
      assert.equal(style(`${id}-radio`).strokeColor, '#161616')
      assert.equal(label.height, 48)
      assert.equal(label.x - radio.x - radio.width, 8)
      assert.equal(style(`${id}-label`).fontSize, '14')
      assert.ok(label.y >= card.y && label.y + label.height <= card.y + card.height)
      if (byId.has(`${id}-selected`)) {
        const dot = bounds(`${id}-selected`)
        assert.equal(dot.width, 8)
        assert.equal(dot.height, 8)
        assert.equal(dot.x + dot.width / 2, radio.x + radio.width / 2)
        assert.equal(dot.y + dot.height / 2, radio.y + radio.height / 2)
        assert.equal(style(`${id}-selected`).fillColor, '#161616')
      }
    }
  }
})

test('validation is visible with two-pixel invalid outlines and three-pixel notification accents', () => {
  for (const state of ['error', 'denied']) {
    const id = `SC2-${state}-summary`
    assert.equal(style(id).strokeColor, '#da1e28')
    assert.equal(style(id).strokeWidth, '2')
    assert.equal(style(id).fontColor, '#161616')
    assert.equal(style(id).fontSize, '14')
    assert.equal(style(id).fontStyle, '1')
    assert.equal(style(id).spacingTop, '12')
    assert.equal(style(id).spacingBottom, '12')
    assert.ok(bounds(id).height >= 48)
    assert.equal(bounds(`${id}-accent`).width, 3)
    assert.equal(style(`${id}-accent`).fillColor, '#da1e28')
    assert.equal(style(`SC2-${state}-inline`).fontColor, '#da1e28')
  }
  for (const id of ['SC2-error-alex-card', 'SC2-error-lan-card', 'SC2-denied-lan-card']) {
    assert.equal(style(id).strokeWidth, '2')
    assert.equal(style(id).strokeColor, '#da1e28')
  }
  assert.equal(bounds('SC2-success-panel-accent').width, 3)
})

test('example remains valid and covers the existing screen/state contract', () => {
  const screens = readFileSync(new URL('../skills/mockup-drawio/references/example-screens.md', import.meta.url), 'utf8')
  assert.deepEqual(checkScreens(screens), [])
  assert.deepEqual(screenStates(screens), states)
  assert.deepEqual(checkDrawio(xml), [])
  assert.deepEqual(checkMockupDrawio(xml, ['SC1', 'SC2'], states), [])
  assert.deepEqual(cells.filter((cell) => /^SC\d+-[a-z]+$/.test(cell.id)).map((cell) => cell.id), states)
  assert.equal(byId.get('flow-3').target, 'SC2-denied')
  assert.ok(byId.has('SC1-default-title'))
})

test('frames are full size, flat, task ordered and consistently spaced', () => {
  for (const cell of cells.filter((cell) => !['0', '1'].includes(cell.id))) {
    assert.equal(cell.parent, '1', cell.id)
    if (cell.vertex === '1') {
      assert.ok(states.some((frame) => cell.id === frame || cell.id.startsWith(`${frame}-`)), cell.id)
      if (cell.value) assert.match(cell.style, /fontFamily=Arial;/, cell.id)
    }
  }
  for (const [index, frame] of frameCells.entries()) {
    const column = index < 3 ? index : index - 3
    assert.deepEqual(frame.geometry, { x: String(40 + column * 1680), y: index < 3 ? '100' : '1280', width: '1440', height: '900', as: 'geometry' })
    assert.equal(Number(byId.get(`${frame.id}-caption`).geometry.y), Number(frame.geometry.y) - 40)
    assert.equal(Number(byId.get(`${frame.id}-note`).geometry.y), Number(frame.geometry.y) + 920)
    assert.match(byId.get(`${frame.id}-title`).style, /fontSize=32;/)
    assert.match(value(`${frame.id}-account`), /Mai Tran · Nurse/)
    assert.match(value(`${frame.id}-note`), /intent, not tested/)
  }
})

test('editable basic shapes have no runtime controls, links or embedded images', () => {
  assert.doesNotMatch(xml, /<(?:object|UserObject|script|iframe|img)\b|\b(?:link|onclick|onload)\s*=|data:|https?:|shape=mxgraph|image=/i)
  assert.match(value('SC1-default-note'), /Static, not interactive/)
  assert.match(byId.get('SC1-default-focus').style, /strokeColor=#0f62fe;strokeWidth=2;/)
  for (const cell of cells.filter((cell) => /-(send|cancel|request|return|retry|previous|next|week)$/.test(cell.id) && cell.id !== 'SC2-success-next')) {
    assert.equal(cell.geometry.height, '48', cell.id)
  }
  for (const state of ['default', 'error', 'denied']) {
    assert.equal(byId.get(`SC2-${state}-note-input`).geometry.width, '600')
    for (const colleague of ['alex', 'lan']) {
      assert.match(byId.get(`SC2-${state}-${colleague}-radio`).style, /^ellipse;/)
      assert.ok(value(`SC2-${state}-${colleague}-label`))
    }
  }
})

test('shift, validation, eligibility and pending acceptance copy remain coherent', () => {
  for (const state of ['default', 'error', 'denied', 'success']) {
    assert.equal(value(`SC2-${state}-shift`), 'Friday 23 Oct 2026 · 07:00–19:00 · Cedar ward')
  }
  for (const state of ['default', 'error', 'denied']) {
    assert.equal(value(`SC2-${state}-note-input`), 'Could you cover my Friday shift? Thank you.')
    assert.equal(value(`SC2-${state}-alex-hours`), '24h scheduled + 12h cover = 36h after cover')
  }
  assert.ok(value('SC2-error-summary').includes(value('SC2-error-inline')))
  assert.equal(cells.filter((cell) => /^SC2-error-.*-selected$/.test(cell.id)).length, 0)
  assert.ok(byId.has('SC2-default-alex-selected'))
  assert.ok(byId.has('SC2-denied-lan-selected'))
  assert.equal(value('SC2-denied-lan-hours'), '40h scheduled + 12h cover = 52h; 48h limit')
  assert.match(value('SC2-denied-inline'), /Choose another colleague.*4h/)
  assert.match(value('SC2-denied-disabled'), /unavailable until an eligible colleague/)
  assert.match(value('SC2-default-policy'), /fictional rule has not been validated/)
  assert.equal(value('SC2-success-status'), 'Pending acceptance')
  assert.match(value('SC2-success-roster'), /Roster unchanged until accepted.*still assigned/)
  assert.match(value('SC1-empty-recovery'), /Try another week.*ward coordinator/)
  assert.match(value('SC1-loading-recovery'), /Retry loading/)
  assert.ok(byId.has('SC1-loading-skeleton-date'))
  assert.ok(!byId.has('SC1-loading-progress'), 'Unknown loading duration must not imply measured progress')
  for (const header of ['date', 'time', 'ward', 'status', 'action']) assert.ok(value(`SC1-default-th-${header}`))
})

test('source-control arrows use explicit orthogonal gap lanes, never unrelated frames', () => {
  for (const edge of cells.filter((cell) => cell.edge === '1')) {
    assert.match(edge.style, /edgeStyle=orthogonalEdgeStyle;/)
    assert.equal(byId.get(edge.source)?.vertex, '1')
    assert.ok(!states.includes(edge.source), 'Arrows originate at depicted controls')
    assert.ok(edge.points.length >= 2)
    const sourceFrame = states.find((id) => edge.source.startsWith(`${id}-`))
    const unrelated = frameCells.filter((frame) => frame.id !== sourceFrame && frame.id !== edge.target)
    for (let index = 1; index < edge.points.length; index++) {
      const a = edge.points[index - 1]
      const b = edge.points[index]
      assert.ok(a.x === b.x || a.y === b.y, edge.id)
      for (const frame of unrelated) {
        const { x, y, width, height } = Object.fromEntries(Object.entries(frame.geometry).map(([key, val]) => [key, Number(val)]))
        const crosses = a.x === b.x
          ? Number(a.x) > x && Number(a.x) < x + width && Math.max(Number(a.y), Number(b.y)) > y && Math.min(Number(a.y), Number(b.y)) < y + height
          : Number(a.y) > y && Number(a.y) < y + height && Math.max(Number(a.x), Number(b.x)) > x && Math.min(Number(a.x), Number(b.x)) < x + width
        assert.equal(crosses, false, `${edge.id} crosses ${frame.id}`)
      }
    }
  }
})
