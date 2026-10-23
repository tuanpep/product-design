import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { checkDrawio } from './check-output.mjs'

const xml = readFileSync(new URL('../skills/mockup-drawio/references/input-types.drawio', import.meta.url), 'utf8')
const attrs = (text) => Object.fromEntries([...text.matchAll(/([\w]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]))
const cells = [...xml.matchAll(/<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g)].map(([, attributes, body = '']) => ({
  ...attrs(attributes), geometry: attrs(body.match(/<mxGeometry\b([^>]*)/)?.[1] ?? ''),
}))
const byId = new Map(cells.map((cell) => [cell.id, cell]))
const panels = ['text', 'contact', 'web', 'secret', 'numeric', 'amount', 'multiline', 'temporal', 'period', 'selection', 'hierarchy', 'range', 'color', 'states']
const value = (id) => {
  assert.ok(byId.has(id), id)
  return byId.get(id).value
}

test('input board is valid flat editable XML without executable or linked content', () => {
  assert.deepEqual(checkDrawio(xml), [])
  assert.equal(byId.size, cells.length)
  assert.match(xml, /<diagram\b[^>]*>\s*<mxGraphModel\b/)
  assert.doesNotMatch(xml, /<(?:object|UserObject|script|iframe|img|image|foreignObject)\b|\b(?:link|href|onclick|onload|source|target)=|data:|shape=|image=|html=1|\bedge="1"|\bSC\d/i)
  for (const cell of cells.filter((cell) => !['0', '1'].includes(cell.id))) {
    assert.equal(cell.parent, '1', cell.id)
    assert.equal(cell.vertex, '1', cell.id)
    assert.ok(['board-', ...panels.map((panel) => `${panel}-`)].some((prefix) => cell.id.startsWith(prefix)), cell.id)
    const keys = cell.style.split(';').filter(Boolean).map((entry) => entry.split('=')[0])
    assert.equal(new Set(keys).size, keys.length, `${cell.id}: no duplicate style keys`)
    if (cell.value) assert.match(cell.style, /fontFamily=Arial;/, cell.id)
  }
  const urls = cells.filter((cell) => /https?:/.test(cell.value ?? ''))
  assert.deepEqual(urls.map((cell) => cell.id), ['web-url-control'])
})

test('fourteen panels have fixed geometry and contained readable labels, helpers and notes', () => {
  assert.equal(cells.filter((cell) => cell.id.endsWith('-panel')).length, 14)
  assert.match(xml, /pageWidth="1600" pageHeight="3700"/)
  for (const [index, panel] of panels.entries()) {
    const x = 40 + index % 2 * 784
    const y = 120 + Math.floor(index / 2) * 504
    const frame = byId.get(`${panel}-panel`)
    assert.deepEqual(frame.geometry, { x: String(x), y: String(y), width: '720', height: '440', as: 'geometry' })
    assert.match(value(`${panel}-title`), new RegExp(`^${index + 1}\\..*static specimen, not interactive$`))
    assert.match(byId.get(`${panel}-title`).style, /fontSize=16;/)
    const members = cells.filter((cell) => cell.id.startsWith(`${panel}-`) && cell !== frame)
    for (const cell of members) {
      const g = cell.geometry
      assert.ok(+g.x >= x + 16 && +g.y >= y + 16, cell.id)
      assert.ok(+g.x + +g.width <= x + 704 && +g.y + +g.height <= y + 424, cell.id)
      if (cell.id.endsWith('-label')) assert.equal(g.height, '24', cell.id)
      if (cell.id.endsWith('-helper')) assert.equal(g.height, '22', cell.id)
    }
    const labels = members.filter((cell) => cell.id.endsWith('-label'))
    assert.equal(labels.length, 2, `${panel}: two labeled fields`)
    for (const label of labels) {
      const representative = {
        'secret-otp-label': 'secret-otp-1-control',
        'range-interval-label': 'range-lower-control',
      }[label.id] ?? label.id.replace(/-label$/, '-control')
      const control = byId.get(representative)
      assert.ok(control, label.id)
      assert.equal(+control.geometry.y - (+label.geometry.y + +label.geometry.height), 8, label.id)
    }
    const note = byId.get(`${panel}-note`)
    for (const helper of members.filter((cell) => cell.id.endsWith('-helper'))) {
      assert.ok(+note.geometry.y >= +helper.geometry.y + +helper.geometry.height, helper.id)
    }
    const blocks = members.filter((cell) => /-(?:title|label|control|helper)$/.test(cell.id) || cell === note)
    for (const [i, first] of blocks.entries()) {
      for (const second of blocks.slice(i + 1)) {
        const a = first.geometry
        const b = second.geometry
        assert.ok(+a.x + +a.width <= +b.x || +b.x + +b.width <= +a.x
          || +a.y + +a.height <= +b.y || +b.y + +b.height <= +a.y,
        `${first.id} does not overlap ${second.id}`)
      }
    }
  }
  assert.match(value('board-note'), /Ant Design light antd 6\.6\.7.*Arial fallback.*local 48-high controls.*contrast overrides.*static, not an accessible implementation/)
})

test('controls follow the local contrast, height and radius rules, not a legacy palette', () => {
  const controls = cells.filter((cell) => cell.id.endsWith('-control'))
  assert.equal(controls.length, 35)
  for (const control of controls) {
    assert.equal(control.geometry.height, control.id === 'multiline-reason-control' ? '96' : '48', control.id)
    assert.match(control.style, /fontSize=14;/, control.id)
    assert.match(control.style, /absoluteArcSize=1;arcSize=12;/, control.id)
    assert.match(control.style, /strokeColor=#(?:8c8c8c|0958d9);/, control.id)
  }
  for (const panel of panels) assert.match(byId.get(`${panel}-panel`).style, /arcSize=16;/)
  for (const tag of cells.filter((cell) => cell.id.endsWith('-tag'))) assert.match(tag.style, /arcSize=8;/)
  assert.match(byId.get('web-search-control').style, /fillColor=#0958d9;strokeColor=#0958d9;.*fontColor=#ffffff;/)
  assert.doesNotMatch(xml, /#(?:141414|0f62fe|1f6b4a|166534|dcfce7|286344|245b40|244c3b|608d70|e4efe8|edf2ef|f6f8f7|cdd7d1|dce3de|a6b5ab|667a6d|43564b|526358|1e3026|87968c|e4ebe6|e0e5e1|c3ccc6|5a685f)\b/i)
  assert.doesNotMatch(xml, /Pajamas|GitLab|Carbon-informed|focus-outline|strokeWidth=3/)
})

test('text, contact and web specimens retain meaningful values and string identity', () => {
  for (const [id, expected] of Object.entries({
    'text-name-control': 'Mai Tran', 'text-reference-control': '001042',
    'contact-email-control': 'mai@example.com', 'contact-phone-control': '+84901234567',
    'web-url-control': 'https://example.com/help', 'web-query-control': 'Repair light', 'web-search-control': 'Search',
  })) assert.equal(value(id), expected)
  assert.match(value('text-reference-label'), /Input \(text\)/)
  assert.match(value('text-reference-helper'), /string.*leading zeros.*never InputNumber/)
  assert.match(value('contact-email-label'), /type=email/)
  assert.match(value('contact-phone-label'), /type=tel/)
  assert.match(value('contact-note'), /not proof of validity or ownership/)
  assert.match(value('web-url-label'), /type=url/)
  assert.match(value('web-note'), /Input.Search enterButton=Search/)
})

test('password and OTP are safe frozen illustrations, not authentication evidence', () => {
  assert.equal(value('secret-password-control'), '••••••••')
  assert.match(value('secret-password-label'), /Input.Password/)
  assert.match(value('secret-password-helper'), /Illustrative mask only; no real secret or plaintext is stored/)
  const digits = Array.from({ length: 6 }, (_, index) => value(`secret-otp-${index + 1}-control`)).join('')
  assert.equal(digits, '001042')
  assert.match(value('secret-otp-label'), /Input.OTP length=6 \(text\)/)
  assert.match(value('secret-otp-helper'), /fictional.*leading zeros as a string/)
  assert.match(value('secret-note'), /verification is incomplete.*&#xa;Auth not verified; no code is sent, checked, accepted or persisted/)
})

test('numeric units, exact currency, percentage domain and actual character count are explicit', () => {
  assert.equal(value('numeric-quantity-control'), '3')
  assert.match(value('numeric-quantity-helper'), /min=1.*max=99.*step=1.*precision=0/)
  assert.equal(value('numeric-hours-control'), '1.5')
  assert.match(value('numeric-hours-helper'), /min=0.*max=24.*step=0.25/)
  assert.equal(value('amount-money-control'), '1234.50')
  assert.match(value('amount-money-label'), /USD.*InputNumber stringMode precision=2/)
  assert.match(value('amount-money-helper'), /exact decimal string; server decimal arithmetic, not binary floats/)
  assert.match(value('amount-note'), /stringMode alone is not an accounting or exact-arithmetic implementation/)
  assert.equal(value('amount-percent-control'), '12.5')
  assert.match(value('amount-percent-helper'), /domain 0\.\.100.*not the fraction 0.125/)
  assert.equal(value('multiline-reason-control'), 'Please deliver after 14:00.')
  assert.match(value('multiline-reason-helper'), new RegExp(`^${value('multiline-reason-control').length}/200 characters`))
})

test('dates and times specify format, zone and closed popup boundaries', () => {
  assert.equal(value('temporal-date-control'), '28/02/2026')
  assert.equal(value('temporal-time-control'), '09:30')
  assert.equal(value('period-range-control'), '28/02/2026 – 02/03/2026')
  assert.equal(value('period-instant-control'), '28/02/2026 09:30')
  assert.match(value('temporal-date-label'), /DatePicker \(DD\/MM\/YYYY\)/)
  assert.match(value('temporal-time-label'), /TimePicker \(HH:mm, 24-hour\)/)
  assert.match(value('period-range-label'), /DatePicker.RangePicker/)
  assert.match(value('period-instant-label'), /DatePicker showTime/)
  for (const id of ['temporal-time-helper', 'period-instant-helper']) assert.match(value(id), /Asia\/Ho_Chi_Minh \(UTC\+07:00\)/)
  for (const panel of ['temporal', 'period', 'selection', 'hierarchy', 'color']) assert.match(value(`${panel}-note`), /popups? (?:are )?closed/)
  assert.match(value('temporal-note'), /pickers do not set a zone alone/)
  assert.match(value('period-note'), /App owns ordering, commit policy and zoned persistence/)
})

test('selection, hierarchy, slider, color and availability states distinguish data from focus', () => {
  assert.match(value('selection-existing-label'), /mode=multiple \(existing options\)/)
  assert.equal(value('selection-support-tag'), 'Support')
  assert.equal(value('selection-billing-tag'), 'Billing')
  assert.match(value('selection-existing-helper'), /committed selections, not focused options/)
  assert.match(value('selection-created-label'), /mode=tags/)
  assert.equal(value('selection-created-tag'), 'review-needed')
  assert.match(value('selection-created-helper'), /free text is not an entity ID/)
  assert.equal(value('hierarchy-path-control'), 'Vietnam / Ho Chi Minh City')
  assert.equal(value('hierarchy-entity-control'), 'Cedar ward')
  assert.match(value('hierarchy-note'), /committed path versus selected entity/)
  assert.match(value('hierarchy-entity-helper'), /stable node ID, not the display label/)
  assert.equal(value('range-single-control'), '40')
  assert.equal(value('range-lower-control'), '20')
  assert.equal(value('range-upper-control'), '60')
  assert.match(value('range-note'), /alternatives share slider values; no duplicate focus indicator/)
  assert.match(value('range-interval-helper'), /lower 20 \(left\), upper 60 \(right\)/)
  assert.equal(value('color-picker-control'), '#0958D9')
  assert.equal(value('color-hex-control'), '#0958D9')
  assert.ok(byId.has('color-swatch'))
  assert.match(value('color-picker-helper'), /Swatch plus text/)
  assert.match(value('color-note'), /Separate contrast check required/)
  assert.equal(value('states-readonly-control'), '001042')
  assert.match(value('states-readonly-label'), /Input readOnly/)
  assert.equal(value('states-disabled-control'), 'Unavailable')
  assert.match(value('states-disabled-label'), /Input disabled/)
  assert.match(value('states-disabled-helper'), /Select a project first/)
  assert.match(value('states-note'), /readOnly differs from disabled/)
})

test('input guide documents fourteen numbered specimens in board order', () => {
  const guide = readFileSync(new URL('../skills/mockup-drawio/references/input-types.md', import.meta.url), 'utf8')
  const headings = [...guide.matchAll(/^## (\d+)\. (.+)$/gm)]
  assert.deepEqual(headings.map(([, number]) => +number), panels.map((_, index) => index + 1))
  assert.match(guide, /input-types\.drawio/)
  assert.match(guide, /6\.6\.7/)
})

test('input definitions retain storage, validation and security boundaries', () => {
  const guide = readFileSync(new URL('../skills/mockup-drawio/references/input-types.md', import.meta.url), 'utf8')
  for (const term of ['empty/null semantics', 'Display versus storage', 'Validation', 'Accessibility', 'server-side']) assert.ok(guide.includes(term), term)
  assert.match(guide, /inputMode.*suggests a keyboard, it does not validate/)
  assert.match(guide, /neither means verification succeeded/)
  assert.match(guide, /step.*not a guarantee that every typed value is step-aligned/)
  assert.match(guide, /exact decimal string plus a currency code/)
  assert.match(guide, /date-only.*must not shift a day/i)
  assert.match(guide, /showTime.*not timezone selection/)
  assert.match(guide, /loadData.*cannot combine with.*showSearch/)
  assert.match(guide, /Removing a selected chip is not deletion/)
  for (const source of ['input', 'input-number', 'date-picker', 'time-picker', 'select', 'cascader', 'tree-select', 'slider', 'color-picker']) {
    assert.ok(guide.includes(`https://ant.design/components/${source}`), source)
  }
  const screens = readFileSync(new URL('../skills/design-product/references/screens-format.md', import.meta.url), 'utf8')
  assert.match(screens, /canonical data type and empty\/null meaning/)
  assert.match(screens, /input-types\.md/)
})
