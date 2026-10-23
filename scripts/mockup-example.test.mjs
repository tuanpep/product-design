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

test('Ant Design light uses contrast-adapted blue primary, default buttons and semantic status roles', () => {
  const palette = new Set(['#ffffff', '#f5f5f5', '#1f1f1f', '#595959', '#8c8c8c', '#d9d9d9', '#0958d9', '#c41d24', '#fff2f0', '#e6f4ff', '#1677ff', '#fafafa', '#f0f0f0', '#91caff', '#ffccc7'])
  const colors = [...xml.matchAll(/#[\da-f]{6}/gi)].map(([color]) => color)
  for (const color of colors) assert.ok(palette.has(color), color)
  for (const color of palette) assert.ok(colors.includes(color), `Missing token ${color}`)
  assert.doesNotMatch(xml, /Carbon|#(?:0f62fe|161616|da1e28|24a148)\b/i)
  for (const frame of states) {
    assert.equal(style(frame).fillColor, '#ffffff')
    assert.match(value(`${frame}-note`), /Ant Design light antd 6\.6\.7; Arial fallback/)
    assert.equal(style(`${frame}-title`).fontSize, '30')
    assert.equal(style(`${frame}-title`).fontStyle, '1')
    assert.equal(bounds(`${frame}-header`).height, 48)
    const header = bounds(`${frame}-header`)
    const sidebar = bounds(`${frame}-sidebar`)
    const account = bounds(`${frame}-account`)
    assert.equal(sidebar.y, header.y + header.height)
    assert.equal(sidebar.y + sidebar.height, bounds(frame).y + bounds(frame).height)
    assert.ok(account.y >= header.y && account.y + account.height <= header.y + header.height)
  }
  for (const cell of cells.filter((cell) => /-(send|request|return)$/.test(cell.id) && cell.id !== 'SC2-denied-send')) {
    assert.equal(style(cell.id).fillColor, '#0958d9', cell.id)
    assert.equal(style(cell.id).fontColor, '#ffffff', cell.id)
    assert.equal(style(cell.id).rounded, '1', cell.id)
    assert.equal(style(cell.id).absoluteArcSize, '1', cell.id)
    assert.equal(style(cell.id).arcSize, '12', cell.id)
  }
  for (const state of ['default', 'error', 'denied']) {
    assert.equal(style(`SC2-${state}-cancel`).fillColor, '#ffffff')
    assert.equal(style(`SC2-${state}-cancel`).strokeColor, '#d9d9d9')
    assert.equal(style(`SC2-${state}-cancel`).fontColor, '#1f1f1f')
  }
  for (const cell of cells.filter((cell) => /-(previous|next|retry)$/.test(cell.id) && cell.id !== 'SC2-success-next')) {
    assert.equal(style(cell.id).strokeColor, '#d9d9d9')
    assert.equal(style(cell.id).fontColor, '#1f1f1f')
  }
  assert.ok(!byId.has('SC2-success-panel-accent'), 'Dedicated completion view does not need a redundant success alert')
  assert.equal(style('SC2-success-status').fontColor, '#0958d9')
  assert.equal(style('SC2-success-status').fillColor, '#e6f4ff')
  assert.equal(style('SC2-success-status').strokeColor, '#91caff')
  assert.equal(style('SC2-success-status').arcSize, '8')
  assert.equal(style('SC1-default-status').fillColor, '#f5f5f5')
  assert.equal(style('SC1-default-status').arcSize, '8')
  for (const frame of states) {
    assert.equal(style(`${frame}-nav`).fillColor, '#e6f4ff')
    assert.equal(style(`${frame}-nav`).fontColor, '#1677ff')
  }
  assert.equal(bounds('SC2-success-status').height, 24)
})

test('controls retain containment, white focus clearance and full-outline Ant Design fields', () => {
  const focus = bounds('SC1-default-focus')
  const action = bounds('SC1-default-request')
  // Six pixels on each side leave the two-pixel focus stroke clear of the action.
  for (const axis of ['x', 'y']) assert.ok(action[axis] - focus[axis] >= 4)
  assert.ok(focus.x + focus.width - action.x - action.width >= 4)
  assert.ok(focus.y + focus.height - action.y - action.height >= 4)
  for (const state of ['default', 'error', 'denied']) {
    const prefix = `SC2-${state}`
    const input = bounds(`${prefix}-note-input`)
    assert.ok(!byId.has(`${prefix}-note-input-rule`))
    assert.equal(style(`${prefix}-note-input`).fillColor, '#ffffff')
    assert.equal(style(`${prefix}-note-input`).strokeColor, '#8c8c8c')
    assert.equal(style(`${prefix}-note-input`).arcSize, '12')
    assert.equal(style(`${prefix}-note-input`).spacingLeft, '12')
    assert.ok(bounds(`${prefix}-send`).y - input.y - input.height >= 16)
    assert.ok(bounds(`${prefix}-cancel`).x - bounds(`${prefix}-send`).x - bounds(`${prefix}-send`).width >= 16)
    assert.equal(style(`${prefix}-legend`).fontSize, '14')
    assert.equal(style(`${prefix}-legend`).fontStyle, '1')
    for (const colleague of ['alex', 'lan']) {
      const id = `${prefix}-${colleague}`
      const radio = bounds(`${id}-radio`)
      const label = bounds(`${id}-label`)
      const card = bounds(`${id}-card`)
      assert.equal(radio.width, 16)
      assert.equal(radio.height, 16)
      assert.equal(style(`${id}-radio`).strokeColor, byId.has(`${id}-selected`) ? '#1677ff' : '#8c8c8c')
      assert.equal(label.height, 48)
      assert.equal(label.x - radio.x - radio.width, 10)
      assert.equal(style(`${id}-label`).fontSize, '14')
      assert.equal(style(`${id}-label`).fontStyle, '0')
      assert.ok(label.y >= card.y && label.y + label.height <= card.y + card.height)
      if (byId.has(`${id}-selected`)) {
        const dot = bounds(`${id}-selected`)
        assert.equal(dot.width, 6)
        assert.equal(dot.height, 6)
        assert.equal(dot.x + dot.width / 2, radio.x + radio.width / 2)
        assert.equal(dot.y + dot.height / 2, radio.y + radio.height / 2)
        assert.equal(style(`${id}-selected`).fillColor, '#ffffff')
      }
    }
  }
})

test('validation maps Alert errorBg/errorBorder, a leading icon and explicit recovery', () => {
  for (const state of ['error', 'denied']) {
    const id = `SC2-${state}-summary`
    assert.equal(style(id).strokeColor, '#ffccc7')
    assert.equal(style(id).fillColor, '#fff2f0')
    assert.equal(style(id).fontColor, '#1f1f1f')
    assert.equal(style(id).fontSize, '14')
    assert.equal(style(id).fontStyle, '1')
    assert.equal(style(id).spacingTop, '16')
    assert.equal(style(id).spacingBottom, '16')
    assert.ok(bounds(id).height >= 72)
    assert.ok(!byId.has(`${id}-accent`))
    assert.equal(bounds(`${id}-icon`).width, 16)
    assert.equal(style(`${id}-icon`).strokeColor, '#c41d24')
    assert.equal(style(`SC2-${state}-inline`).fontColor, '#c41d24')
  }
  for (const id of ['SC2-error-alex-card', 'SC2-error-lan-card', 'SC2-denied-lan-card']) {
    assert.equal(style(id).strokeColor, 'none', 'Radio group is not a set of invalid outlined cards')
  }
  assert.equal(style('SC2-success-panel').arcSize, '16')
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
    assert.match(byId.get(`${frame.id}-title`).style, /fontSize=30;/)
    assert.match(value(`${frame.id}-account`), /Mai Tran · Nurse/)
    assert.match(value(`${frame.id}-note`), /intent, not tested/)
  }
})

test('editable basic shapes have no runtime controls, links or embedded images', () => {
  assert.doesNotMatch(xml, /<(?:object|UserObject|script|iframe|img)\b|\b(?:link|onclick|onload)\s*=|data:|https?:|shape=mxgraph|image=/i)
  assert.match(value('SC1-default-note'), /Static, not interactive/)
  assert.match(byId.get('SC1-default-focus').style, /strokeColor=#0958d9;strokeWidth=2;/)
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
