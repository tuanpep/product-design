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
const panels = ['field', 'disclosure', 'menu', 'date', 'upload', 'combo', 'review', 'choice', 'select', 'tabs', 'steps', 'modal', 'drawer', 'pagination', 'feedback', 'loading']
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

test('sixteen static panels use a two-column eight-row board without overlap', () => {
  assert.equal(cells.filter((cell) => cell.id.endsWith('-panel')).length, 16)
  assert.match(xml, /pageHeight="4300"/)
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
  assert.match(value('board-note'), /Ant Design light antd 6\.6\.7.*Arial fallback.*local 48-high controls.*contrast overrides.*not an accessible implementation/)
})

test('editable basic shapes map Ant Design fields, leading Collapse caret and schematic focus', () => {
  assert.doesNotMatch(xml, /<(?:object|UserObject|script|iframe|img|image|foreignObject)\b|\b(?:link|href|onclick|onload)\s*=|data:|https?:|shape=|image=|html=1/i)
  const controls = cells.filter((cell) => cell.id.endsWith('-control'))
  assert.ok(controls.length >= 32)
  for (const id of ['field-focus', 'field-error', 'menu-trigger', 'upload-choose', 'combo-query', 'review-change-name', 'select-value', 'modal-cancel', 'modal-delete', 'drawer-close', 'pagination-current']) {
    assert.ok(byId.has(`${id}-control`), id)
  }
  for (const cell of controls) {
    assert.equal(cell.geometry.height, '48', cell.id)
    assert.match(cell.style, /fontSize=14;/, cell.id)
    assert.match(cell.style, /spacingLeft=(?:12|16|40);/, cell.id)
  }
  const focus = cells.filter((cell) => cell.id.endsWith('-focus-outline'))
  for (const id of ['field-focus-outline', 'menu-focus-outline', 'combo-focus-outline']) assert.ok(byId.has(id))
  assert.ok(focus.length >= 3)
  for (const panel of panels) assert.ok(focus.filter((cell) => cell.id.startsWith(`${panel}-`)).length <= 1, `${panel}: at most one focused target per snapshot`)
  for (const cell of focus) assert.match(cell.style, /fillColor=none;strokeColor=#0958d9;strokeWidth=2;/, cell.id)
  for (const id of ['field-focus', 'date-time', 'combo-query']) {
    assert.ok(!byId.has(`${id}-bottom`))
    const control = byId.get(`${id}-control`)
    assert.match(control.style, /fillColor=#ffffff;strokeColor=#8c8c8c;/)
    assert.match(control.style, /absoluteArcSize=1;arcSize=12;/)
  }
  for (const id of ['field-error', 'date-error']) {
    assert.ok(!byId.has(`${id}-bottom`))
    assert.match(byId.get(`${id}-outline`).style, /strokeColor=#ff4d4f;strokeWidth=1;/)
    assert.match(byId.get(`${id}-control`).style, /fillColor=#ffffff;strokeColor=#ff4d4f;/)
  }
  assert.doesNotMatch(xml, /[▾✓−]|value="[+]/)
  for (const prefix of ['disclosure-expanded', 'disclosure-collapsed', 'menu-trigger']) {
    const control = byId.get(`${prefix}-control`)
    const accordion = prefix.startsWith('disclosure-')
    assert.match(control.style, accordion ? /spacingLeft=40;/ : /spacingRight=40;/)
    for (const side of ['left', 'right']) {
      const piece = byId.get(`${prefix}-chevron-${side}`)
      assert.equal(piece.value, '')
      assert.equal(piece.geometry.height, '2')
      assert.match(piece.style, /rotation=-?45;/)
      if (accordion) assert.ok(Number(piece.geometry.x) < Number(control.geometry.x) + 40)
      else assert.ok(Number(piece.geometry.x) >= Number(control.geometry.x) + Number(control.geometry.width) - 40)
    }
  }
  for (const part of ['short', 'long']) {
    assert.ok(!byId.has(`combo-selected-check-${part}`), 'Active suggestion is not a committed selection')
  }
  for (const cell of cells.filter((cell) => cell.value)) {
    assert.match(cell.style, /fontFamily=Arial;/, cell.id)
    assert.doesNotMatch(cell.style, /fillColor=#c41d24;/, cell.id)
  }
  for (const token of ['#1f1f1f', '#595959', '#d9d9d9', '#f0f0f0']) assert.ok(xml.includes(token))
  for (const state of ['expanded', 'collapsed']) {
    assert.match(byId.get(`disclosure-${state}-control`).style, /fillColor=#ffffff;/)
    const divider = byId.get(`disclosure-${state}-top`)
    assert.equal(divider.geometry.height, '1')
    assert.match(divider.style, /fillColor=#f0f0f0;/)
  }
  for (const id of ['upload-choose-control', 'upload-retry-control']) {
    assert.match(byId.get(id).style, /fillColor=#ffffff;strokeColor=#d9d9d9;/)
    assert.match(byId.get(id).style, /fontColor=#1f1f1f;/)
  }
  assert.match(value('combo-selected-control'), /active suggestion/)
  assert.match(value('combo-empty-note'), /no matches.*suggestions close.*text is allowed/i)
  assert.equal(byId.get('disclosure-expanded-chevron-left').style.match(/rotation=([^;]+)/)[1], '45')
  assert.equal(byId.get('disclosure-collapsed-chevron-left').geometry.x, byId.get('disclosure-collapsed-chevron-right').geometry.x)
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
  assert.match(value('combo-empty-note'), /no matches.*suggestions close.*no built-in loading state/i)
  for (const [id, label] of [['name', 'full name'], ['email', 'email address'], ['date', 'appointment']]) {
    assert.equal(value(`review-change-${id}-control`), `Change ${label}`)
    assert.ok(value(`review-${id}-value`))
  }
})

test('all reference boards and component guides use a single versioned Ant Design baseline', () => {
  const references = ['example.drawio', 'component-recipes.drawio', 'collection-flow.drawio', 'web-components.md', 'extended-components.md', 'example-screens.md', 'collection-screens.md', 'product-layouts.md']
  for (const name of references) {
    const content = readFileSync(new URL(`../skills/mockup-drawio/references/${name}`, import.meta.url), 'utf8')
    assert.doesNotMatch(content, /#(?:1f6b4a|166534|dcfce7|286344|245b40|244c3b|608d70|e4efe8|edf2ef|f6f8f7|cdd7d1|dce3de|a6b5ab|667a6d|43564b|526358|1e3026|87968c|e4ebe6|e0e5e1|c3ccc6|5a685f)\b/i, name)
    assert.doesNotMatch(content, /Carbon-informed White|#0f62fe\b/i, name)
    assert.match(content, /Ant Design light/i, name)
    assert.doesNotMatch(content, /Pajamas|GitLab|@gitlab\/ui|\bGl(?:Button|Form|Table|Badge|Alert|Accordion|Disclosure|Attribute)/, name)
    if (name !== 'product-layouts.md') assert.match(content, /6\.6\.7/, name)
  }
})

test('every specimen recipe has documented intent and implementation boundaries', () => {
  const guide = readFileSync(new URL('../skills/mockup-drawio/references/extended-components.md', import.meta.url), 'utf8')
  const headings = [...guide.matchAll(/^## (\d+)\. (.+)$/gm)]
  assert.deepEqual(headings.map(([, index]) => Number(index)), panels.map((_, index) => index + 1))
  for (const name of ['Checkbox', 'Switch', 'Select', 'Tabs', 'Steps', 'Modal', 'Drawer', 'Pagination', 'Alert', 'Message', 'Skeleton', 'Spin', 'Empty']) {
    assert.ok(guide.includes(`https://ant.design/components/${name.toLowerCase()}`), `${name}: official source link`)
  }
  assert.match(guide, /not a working prototype/)
  assert.match(guide, /keyboard\/selection announcements/)
})

test('component mappings do not imply Select arrows or inherited combobox behavior', () => {
  for (const side of ['left', 'right']) assert.ok(!byId.has(`combo-query-chevron-${side}`))
  assert.match(value('disclosure-note'), /Collapse ghost; expandIconPlacement=start; custom dividers/)
  assert.match(value('menu-title'), /Dropdown with menu/)
  assert.match(value('upload-title'), /Upload validation/)
  assert.match(value('upload-note'), /Upload \+ Button/)
  assert.match(value('combo-title'), /AutoComplete/)
  assert.match(value('review-title'), /Descriptions \+ Typography.Link/)
  assert.match(byId.get('combo-selected-control').style, /fillColor=#f5f5f5;/)
  assert.doesNotMatch(xml, /GlFormCombobox|Escape.*clear|Tab.*commit|native file input/i)
})

test('nine additional recipes distinguish component mapping and state semantics', () => {
  assert.match(value('choice-title'), /Checkbox \+ Switch/)
  assert.match(value('choice-consent-control'), /unchecked/)
  assert.match(value('choice-setting-control'), /on/)
  assert.match(value('choice-note'), /consent.*form submission.*immediate setting.*not consent/)
  assert.match(byId.get('choice-checkbox').style, /strokeColor=#8c8c8c;/)
  assert.match(byId.get('choice-switch-track').style, /fillColor=#1677ff;/)
  assert.match(value('select-note'), /Select.*only Standard or Express.*does not accept free text.*committed/)
  assert.match(byId.get('select-option-standard-control').style, /fillColor=#e6f4ff;/)
  assert.match(value('tabs-note'), /peer views.*not workflow steps.*Overview is active/)
  assert.match(value('steps-note'), /current=1.*step 2 of 3.*not clickable navigation/)
  assert.match(value('steps-current'), /2.*Review.*current/)
  assert.match(value('modal-note'), /Modal.*Cancel.*danger Button.*No actual deletion.*schematic.*not implemented/)
  assert.equal(value('modal-cancel-control'), 'Cancel')
  assert.match(byId.get('modal-delete-control').style, /fontColor=#c41d24;/)
  assert.match(value('drawer-note'), /Drawer placement=right.*Close returns.*schematic.*not implemented/)
  assert.equal(value('drawer-close-control'), 'Close details')
  assert.match(value('pagination-total'), /Page 2 of 5.*11–20 of 50/)
  assert.match(value('pagination-note'), /current=2, total=50, pageSize=10.*no table or records are fabricated/)
  assert.match(value('feedback-note'), /Alert type=info.*persistent.*Message.success.*transient.*not simultaneous/)
  assert.match(byId.get('feedback-alert').style, /fillColor=#e6f4ff;strokeColor=#91caff;/)
  assert.match(value('loading-title'), /Skeleton \+ Spin \+ Empty/)
  assert.match(value('loading-note'), /separate snapshots.*never a simultaneous.*unknown duration.*not measured progress.*completed zero-result/)
  for (const prefix of ['modal', 'drawer']) {
    const surface = byId.get(`${prefix}-surface`).geometry
    for (const cell of cells.filter((cell) => cell.id.startsWith(`${prefix}-`) && cell.id.endsWith('-control'))) {
      const g = cell.geometry
      assert.ok(Number(g.x) >= Number(surface.x) && Number(g.y) >= Number(surface.y), cell.id)
      assert.ok(Number(g.x) + Number(g.width) <= Number(surface.x) + Number(surface.width), cell.id)
      assert.ok(Number(g.y) + Number(g.height) <= Number(surface.y) + Number(surface.height), cell.id)
    }
  }
})

test('expanded recipes retain editable component anatomy and contained content', () => {
  const contained = (innerId, outerId, inset = 0) => {
    const inner = byId.get(innerId)?.geometry
    const outer = byId.get(outerId)?.geometry
    assert.ok(inner && outer, `${innerId} inside ${outerId}`)
    assert.ok(Number(inner.x) >= Number(outer.x) + inset, innerId)
    assert.ok(Number(inner.y) >= Number(outer.y) + inset, innerId)
    assert.ok(Number(inner.x) + Number(inner.width) <= Number(outer.x) + Number(outer.width) - inset, innerId)
    assert.ok(Number(inner.y) + Number(inner.height) <= Number(outer.y) + Number(outer.height) - inset, innerId)
  }
  const below = (lowerId, upperId) => {
    const lower = byId.get(lowerId).geometry
    const upper = byId.get(upperId).geometry
    assert.ok(Number(lower.y) >= Number(upper.y) + Number(upper.height), `${lowerId} below ${upperId}`)
  }

  assert.equal(value('select-label'), 'Delivery')
  assert.equal(value('select-value-control'), 'Standard')
  for (const [lower, upper] of [
    ['select-value-control', 'select-label'],
    ['select-option-standard-control', 'select-value-control'],
    ['select-option-express-control', 'select-option-standard-control'],
    ['select-note', 'select-option-express-control'],
  ]) below(lower, upper)

  assert.equal(value('tabs-overview-control'), 'Overview')
  assert.equal(byId.get('tabs-baseline').geometry.width, '656')
  assert.equal(byId.get('tabs-baseline').geometry.y, byId.get('tabs-ink').geometry.y)
  const tab = byId.get('tabs-overview-control').geometry
  const ink = byId.get('tabs-ink').geometry
  assert.equal(Number(ink.x), Number(tab.x) + 12)
  assert.equal(Number(ink.width), Number(tab.width) - 24)
  assert.equal(ink.height, '2')

  for (const state of ['complete', 'current', 'waiting']) {
    const indicator = byId.get(`steps-${state}-indicator`)
    assert.match(indicator.style, /ellipse;/)
    assert.equal(indicator.geometry.width, '32')
    assert.equal(indicator.geometry.height, '32')
    assert.ok(Number(byId.get(`steps-${state}`).geometry.x) >= Number(indicator.geometry.x) + 48)
  }
  assert.equal(value('steps-current-indicator'), '2')
  assert.equal(value('steps-waiting-indicator'), '3')
  assert.match(value('steps-complete'), /Details.*complete/)
  assert.match(value('steps-current'), /2.*Review.*current/)
  assert.match(value('steps-waiting'), /Confirm.*waiting/)
  for (const state of ['complete', 'current']) {
    const connector = byId.get(`steps-${state}-connector`).geometry
    const indicator = byId.get(`steps-${state}-indicator`).geometry
    const next = byId.get(`steps-${state === 'complete' ? 'current' : 'waiting'}-indicator`).geometry
    assert.equal(Number(connector.y), Number(indicator.y) + Number(indicator.height))
    assert.equal(Number(connector.y) + Number(connector.height), Number(next.y))
  }
  for (const part of ['short', 'long']) {
    for (const [prefix, surface] of [['steps-complete', 'steps-complete-indicator'], ['feedback-success', 'feedback-success-icon']]) {
      const id = `${prefix}-check-${part}`
      assert.equal(value(id), '')
      assert.match(byId.get(id).style, /rotation=-?45;/)
      contained(id, surface)
    }
  }

  assert.equal(value('modal-question'), 'Delete document?')
  assert.match(byId.get('modal-question').style, /fontStyle=1;/)
  assert.equal(value('modal-description'), 'This cannot be undone.')
  assert.doesNotMatch(byId.get('modal-description').style, /fontStyle=1;/)
  below('modal-description', 'modal-question')
  below('modal-cancel-control', 'modal-description')
  for (const id of ['modal-question', 'modal-description']) contained(id, 'modal-surface', 16)
  for (const [name, expected] of [['document', 'Delivery guide'], ['format', 'PDF']]) {
    assert.equal(value(`drawer-${name}-value`), expected)
    assert.equal(value(`drawer-${name}-label`), name === 'document' ? 'Document:' : 'Format:')
    for (const part of ['label', 'value']) contained(`drawer-${name}-${part}`, 'drawer-surface', 16)
  }
  below('drawer-document-label', 'drawer-heading')
  below('drawer-format-label', 'drawer-document-label')
  below('drawer-close-control', 'drawer-format-label')

  const pageIds = ['pagination-previous-control', 'pagination-page-1-control', 'pagination-current-control', 'pagination-page-3-control', 'pagination-page-4-control', 'pagination-page-5-control', 'pagination-next-control']
  assert.deepEqual(pageIds.map(value), ['Previous', '1', '2', '3', '4', '5', 'Next'])
  for (const [index, id] of pageIds.entries()) {
    const cell = byId.get(id)
    assert.match(cell.style, /spacingLeft=12;spacingRight=12;/)
    assert.equal(cell.geometry.y, '3240')
    if (index > 0) {
      const previous = byId.get(pageIds[index - 1]).geometry
      assert.ok(Number(cell.geometry.x) >= Number(previous.x) + Number(previous.width) + 12)
    }
    if (index > 0 && index < 6) assert.equal(cell.geometry.width, '48')
  }
  assert.match(byId.get('pagination-current-control').style, /strokeColor=#1677ff;/)
  assert.equal(value('feedback-info-icon'), 'i')
  assert.match(byId.get('feedback-success-icon').style, /ellipse;fillColor=#52c41a;/)
  for (const [icon, surface] of [['feedback-info-icon', 'feedback-alert'], ['feedback-success-icon', 'feedback-message']]) {
    contained(icon, surface, 12)
    assert.match(byId.get(surface).style, /fontColor=#1f1f1f;.*spacingLeft=48;/)
    const g = byId.get(icon).geometry
    assert.ok(Number(g.x) + Number(g.width) < Number(byId.get(surface).geometry.x) + 48)
  }
})
