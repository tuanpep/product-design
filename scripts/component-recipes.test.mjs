import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { checkDrawio } from './check-output.mjs'

const xml = readFileSync(new URL('../skills/mockup-drawio/references/component-recipes.drawio', import.meta.url), 'utf8')
const attributes = (text) => Object.fromEntries([...text.matchAll(/([\w]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]))
const cells = [...xml.matchAll(/<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g)].map(([, attrs, body = '']) => ({
  ...attributes(attrs),
  geometry: attributes(body.match(/<mxGeometry\b([^>]*)/)?.[1] ?? ''),
}))
const byId = new Map(cells.map((cell) => [cell.id, cell]))
const panels = ['field', 'disclosure', 'menu', 'date', 'upload', 'combo', 'review']
const value = (id) => byId.get(id)?.value

test('component board is valid uncompressed XML with unique flat namespaced cells', () => {
  assert.deepEqual(checkDrawio(xml), [])
  assert.equal(byId.size, cells.length)
  assert.match(xml, /<diagram\b[^>]*>\s*<mxGraphModel\b/)
  for (const cell of cells.filter((cell) => !['0', '1'].includes(cell.id))) {
    assert.equal(cell.parent, '1', cell.id)
    assert.equal(cell.vertex, '1', cell.id)
    assert.ok(['board-', ...panels.map((panel) => `${panel}-`)].some((prefix) => cell.id.startsWith(prefix)), cell.id)
  }
  assert.doesNotMatch(xml, /\bSC\d|\bedge="1"|\b(?:source|target)=/)
})

test('seven static panels use a two-column four-row board without overlap', () => {
  assert.equal(cells.filter((cell) => cell.id.endsWith('-panel')).length, 7)
  for (const [index, panel] of panels.entries()) {
    const frame = byId.get(`${panel}-panel`)
    const x = 40 + (index % 2) * 784
    const y = 120 + Math.floor(index / 2) * 504
    assert.deepEqual(frame.geometry, { x: String(x), y: String(y), width: '720', height: '440', as: 'geometry' })
    assert.match(value(`${panel}-title`), /static specimen, not interactive/)
    assert.match(byId.get(`${panel}-title`).style, /fontSize=16;/)
    for (const cell of cells.filter((cell) => cell.id.startsWith(`${panel}-`) && cell !== frame)) {
      const g = cell.geometry
      assert.ok(Number(g.x) >= x + 16 && Number(g.y) >= y + 16, cell.id)
      assert.ok(Number(g.x) + Number(g.width) <= x + 704, cell.id)
      assert.ok(Number(g.y) + Number(g.height) <= y + 424, cell.id)
    }
  }
  assert.equal(value('board-note'), 'Carbon-informed White · Arial fallback · static specimens, not an accessible implementation')
})

test('editable basic shapes preserve White tokens, 48px controls and 2px focus', () => {
  assert.doesNotMatch(xml, /<(?:object|UserObject|script|iframe|img|image|foreignObject)\b|\b(?:link|href|onclick|onload)\s*=|data:|https?:|shape=|image=|rounded=1|html=1/i)
  const controls = cells.filter((cell) => cell.id.endsWith('-control'))
  assert.equal(controls.length, 19)
  for (const cell of controls) {
    assert.equal(cell.geometry.height, '48', cell.id)
    assert.match(cell.style, /fontSize=14;/, cell.id)
    assert.match(cell.style, cell.id === 'combo-selected-control' ? /spacingLeft=48;/ : /spacingLeft=16;/, cell.id)
  }
  const focus = cells.filter((cell) => cell.id.endsWith('-focus-outline'))
  assert.equal(focus.length, 3)
  for (const cell of focus) assert.match(cell.style, /fillColor=none;strokeColor=#0f62fe;strokeWidth=2;/, cell.id)
  for (const id of ['field-focus', 'date-time', 'combo-query']) {
    const bottom = byId.get(`${id}-bottom`)
    assert.equal(bottom.geometry.height, '1')
    assert.match(bottom.style, /fillColor=#8d8d8d;/)
    const control = byId.get(`${id}-control`)
    assert.match(control.style, /fillColor=#f4f4f4;/)
    assert.equal(Number(bottom.geometry.y), Number(control.geometry.y) + 47)
  }
  for (const id of ['field-error', 'date-error']) {
    assert.ok(!byId.has(`${id}-bottom`))
    assert.match(byId.get(`${id}-outline`).style, /strokeColor=#da1e28;strokeWidth=2;/)
    assert.match(byId.get(`${id}-control`).style, /fillColor=#f4f4f4;/)
  }
  assert.doesNotMatch(xml, /[▾✓−]|value="[+]/)
  for (const prefix of ['disclosure-expanded', 'disclosure-collapsed', 'menu-trigger', 'combo-query']) {
    const control = byId.get(`${prefix}-control`)
    assert.match(control.style, /spacingRight=48;/)
    for (const side of ['left', 'right']) {
      const piece = byId.get(`${prefix}-chevron-${side}`)
      assert.equal(piece.value, '')
      assert.equal(piece.geometry.height, '2')
      assert.match(piece.style, /rotation=-?45;/)
      assert.ok(Number(piece.geometry.x) >= Number(control.geometry.x) + Number(control.geometry.width) - 48)
    }
  }
  for (const part of ['short', 'long']) {
    const piece = byId.get(`combo-selected-check-${part}`)
    assert.equal(piece.value, '')
    assert.equal(piece.geometry.height, '2')
    assert.match(piece.style, /rotation=-?45;/)
    assert.ok(Number(piece.geometry.x) + Number(piece.geometry.width) < 856 + 48)
  }
  for (const cell of cells.filter((cell) => cell.value)) {
    assert.match(cell.style, /fontFamily=Arial;/, cell.id)
    assert.doesNotMatch(cell.style, /fillColor=#da1e28;/, cell.id)
  }
  for (const token of ['#161616', '#525252', '#e0e0e0', '#e8e8e8']) assert.ok(xml.includes(token))
  for (const state of ['expanded', 'collapsed']) {
    assert.match(byId.get(`disclosure-${state}-control`).style, /fillColor=#ffffff;/)
    const divider = byId.get(`disclosure-${state}-top`)
    assert.equal(divider.geometry.height, '1')
    assert.match(divider.style, /fillColor=#e0e0e0;/)
  }
  for (const id of ['upload-choose-control', 'upload-retry-control']) {
    assert.match(byId.get(id).style, /fillColor=#ffffff;strokeColor=#0f62fe;/)
    assert.match(byId.get(id).style, /fontColor=#0f62fe;/)
  }
  for (const cell of controls.filter((cell) => cell.style.includes('fillColor=#0f62fe;'))) {
    const hasIcon = byId.has(`${cell.id.replace(/-control$/, '')}-chevron-left`)
    assert.match(cell.style, hasIcon ? /spacingRight=48;/ : /spacingRight=64;/, cell.id)
    assert.ok(Number(cell.geometry.width) >= 16 + (hasIcon ? 48 : 64) + cell.value.length * 8, cell.id)
  }
})

test('specimens retain values, expose states and give specific recovery actions', () => {
  assert.equal(value('field-error-control'), 'mai@')
  assert.match(value('field-error-recovery'), /Enter a complete email address.*mai@example.com/)
  assert.match(value('disclosure-expanded-control'), /expanded/)
  assert.match(value('disclosure-expanded-content'), /3–5 business days/)
  assert.match(value('menu-note'), /Open menu.*Download PDF shows keyboard focus/)
  assert.equal(value('menu-delete-control'), 'Delete document…')
  assert.match(value('menu-note'), /requires explicit confirmation; no deletion occurs directly/)
  assert.equal(value('date-error-control'), '31/02/2026')
  assert.match(value('date-error-label'), /DD\/MM\/YYYY/)
  assert.match(value('date-error-recovery'), /28 days.*DD\/MM\/YYYY/)
  assert.match(value('date-time-label'), /HH:mm, 24-hour/)
  assert.match(value('date-zone-note'), /Asia\/Ho_Chi_Minh \(UTC\+07:00\)/)
  assert.match(value('upload-rejected-file'), /Rejected: evidence.pdf · 14 MB/)
  assert.equal(value('upload-error-recovery'), 'Error: File exceeds 10 MB. Compress the PDF, then choose a smaller file.')
  assert.equal(value('upload-retry-control'), 'Choose smaller file')
  assert.match(value('upload-note'), /opens the file chooser/)
  assert.match(value('upload-remove-control'), /Remove evidence.pdf/)
  assert.equal(value('combo-query-control'), 'Ho')
  assert.match(value('combo-results-note'), /2 suggestions/)
  assert.match(value('combo-empty-note'), /No cities match.*Clear the search or try another city/)
  for (const [id, label] of [['name', 'full name'], ['email', 'email address'], ['date', 'appointment']]) {
    assert.equal(value(`review-change-${id}-control`), `Change ${label}`)
    assert.ok(value(`review-${id}-value`))
  }
})

test('both reference boards and component guides use Carbon White without legacy green branding or opt-in styling', () => {
  const references = ['example.drawio', 'component-recipes.drawio', 'web-components.md', 'extended-components.md']
  for (const name of references) {
    const content = readFileSync(new URL(`../skills/mockup-drawio/references/${name}`, import.meta.url), 'utf8')
    assert.doesNotMatch(content, /#(?:1f6b4a|166534|dcfce7|286344|245b40|244c3b|608d70|e4efe8|edf2ef|f6f8f7|cdd7d1|dce3de|a6b5ab|667a6d|43564b|526358|1e3026|87968c|e4ebe6|e0e5e1|c3ccc6|5a685f)\b/i, name)
    assert.doesNotMatch(content, /\bgreen\s+(?:kit|brand|default|profile|project\s+styling)\b|\boptional\s+(?:Carbon(?:-informed)?|(?:style\s+)?profile)\b|\bCarbon\s+is\s+(?:an?\s+)?optional\b|\bopt[ -]in(?:to)?\s+(?:this\s+)?profile\b/i, name)
    assert.match(content, /#0f62fe\b/i, name)
    if (name.endsWith('.md')) assert.match(content, /Carbon(?:-informed)?\s+White/i, name)
  }
})
