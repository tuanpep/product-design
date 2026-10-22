import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { SaxesParser } from 'saxes'
import { renderSketch, validateSketch, writeSketch } from '../skills/sketch-drawio/scripts/render.mjs'

const renderer = fileURLToPath(new URL('../skills/sketch-drawio/scripts/render.mjs', import.meta.url))
const example = JSON.parse(readFileSync(new URL('../skills/sketch-drawio/examples/invoices.json', import.meta.url), 'utf8'))
const copy = () => structuredClone(example)

function parse(xml) {
  const cells = new Map()
  let current
  const parser = new SaxesParser()
  parser.on('error', (error) => { throw error })
  parser.on('opentag', ({ name, attributes }) => {
    if (name === 'mxCell') {
      assert.ok(!cells.has(attributes.id), `Duplicate ${attributes.id}`)
      current = { ...attributes }
      cells.set(current.id, current)
    }
    if (name === 'mxGeometry') current.geometry = Object.fromEntries(Object.entries(attributes).map(([k, v]) => [k, /^(x|y|width|height)$/.test(k) ? Number(v) : v]))
  })
  parser.write(xml).close()
  return cells
}

function folder(t) {
  const path = mkdtempSync(join(tmpdir(), 'sketch-drawio-'))
  t.after(() => rmSync(path, { recursive: true, force: true }))
  return path
}

test('example generates deterministic well-formed XML, grouped controls and attached labeled edges', () => {
  const xml = renderSketch(example)
  assert.equal(readFileSync(new URL('../skills/sketch-drawio/examples/sketch-invoices.drawio', import.meta.url), 'utf8').replace(/\r\n/g, '\n'), xml)
  assert.equal(xml, renderSketch(example))
  assert.doesNotMatch(xml, /<!--|https?:|data:image/)
  const cells = parse(xml)
  assert.ok(cells.get('s-list').style.includes('container=1;'))
  assert.equal(cells.get('s-detail--reason').parent, 's-detail')
  assert.match(cells.get('s-detail--reason--value').style, /shape=mxgraph.mockup.forms.rrect/)
  assert.equal(cells.get('s-detail--actions--reject').parent, 's-detail--actions')
  assert.equal(cells.get('e-reject').source, 's-detail--actions--reject')
  assert.equal(cells.get('e-reject').target, 's-outcome')
  assert.equal(cells.get('e-reject').value, 'Reject; requester reviews reason')
  assert.match(cells.get('e-reject').style, /dashed=1/)
  for (const cell of cells.values()) {
    if (cell.id !== '0') assert.ok(cells.has(cell.parent), cell.id)
    if (cell.edge) {
      assert.ok(cells.has(cell.source) && cells.has(cell.target))
      assert.equal(cell.geometry.relative, '1')
    }
  }
})

test('mobile and desktop content fits its frame; tables and buttons stay within their groups', () => {
  for (const device of ['mobile', 'desktop']) {
    const spec = copy()
    spec.device = device
    spec.columns = 2
    spec.screens[1].title = 'A long title '.repeat(7)
    spec.screens[1].role = 'A longer role '.repeat(5)
    spec.screens[1].items[0].text = 'A detailed representative description. '.repeat(12)
    const cells = parse(renderSketch(spec))
    for (const cell of cells.values()) {
      if (!cell.vertex || cell.parent === '1') continue
      const g = cell.geometry
      const p = cells.get(cell.parent).geometry
      assert.ok(g.x >= 0 && g.y >= 0 && g.width > 0 && g.height > 0, cell.id)
      assert.ok(g.x + g.width <= p.width + 0.001 && g.y + g.height <= p.height + 0.001, cell.id)
    }
    const frames = spec.screens.map((s) => cells.get(`s-${s.id}`).geometry)
    for (let i = 0; i < frames.length; i++) for (let j = i + 1; j < frames.length; j++) {
      const a = frames[i], b = frames[j]
      assert.ok(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y)
    }
  }
})

test('all item recipes render, user text is literal XML-safe text, and edges use the common container', () => {
  const spec = copy()
  const literal = 'A&B <test> "quoted" \'single\'\nSecond line 😀'
  spec.screens[1].items.push({ id: 'note', type: 'text', text: literal })
  spec.links.push({ id: 'same-screen', from: 'detail/reason', to: 'detail/note', label: 'Explain' })
  spec.links.push({ id: 'same-group', from: 'detail/actions/reject', to: 'detail/actions/back', label: 'Alternative' })
  const cells = parse(renderSketch(spec))
  assert.equal(cells.get('s-detail--note').value, literal)
  assert.equal(cells.get('e-same-screen').parent, 's-detail')
  assert.equal(cells.get('e-same-group').parent, 's-detail--actions')
  assert.equal(cells.get('s-list--invoices--r1c1').value, 'Cedar Studio')
})

test('malformed, oversized, duplicate and dangling source data fails rather than truncates', () => {
  const cases = [
    [(s) => { s.screens[1].id = s.screens[0].id }, /Duplicate screen/],
    [(s) => { s.screens[0].items.push(s.screens[0].items[0]) }, /Duplicate item/],
    [(s) => { s.screens[1].items[2].buttons[1].id = 'reject' }, /Duplicate button/],
    [(s) => { s.links[0].to = 'missing' }, /Unknown link/],
    [(s) => { s.links.push(s.links[0]) }, /Duplicate link/],
    [(s) => { s.screens[0].items[1].rows[0].pop() }, /entries/],
    [(s) => { s.screens[0].items[0].text = 'bad\u0000' }, /valid XML/],
    [(s) => { s.screens[0].items[0].text = 'bad\ud800' }, /valid XML/],
    [(s) => { s.screens[0].items[0].type = 'unknown' }, /unknown property|unsupported type/],
    [(s) => { s.screens[0].items[0] = { id: 'unknown', type: 'constructor' } }, /unsupported type/],
    [(s) => { s.screens[0].width = NaN }, /width/],
    [(s) => { s.screens[0].x = 40 }, /both x and y/],
    [(s) => { s.screens[0].id = 'a--b' }, /kebab-case/],
    [(s) => { s.screens = Array(9).fill(s.screens[0]) }, /screens needs/],
    [(s) => { s.columns = 0 }, /columns/],
    [(s) => { s.links[0].kind = 'mystery' }, /link.kind/],
    [(s) => { s.typo = true }, /unknown property/],
    [(s) => { s.screens[0].items[0].text = 'x'.repeat(601) }, /600/],
    [(s) => { s.screens[0].items[2].buttons[0].primary = 'yes' }, /boolean/],
  ]
  for (const [mutate, pattern] of cases) {
    const spec = copy()
    mutate(spec)
    assert.throws(() => renderSketch(spec), pattern)
  }
  assert.throws(() => validateSketch(null), /object/)
  const overlap = copy()
  for (const screen of overlap.screens) { screen.x = 40; screen.y = 120 }
  assert.throws(() => renderSketch(overlap), /Screens overlap/)
})

test('a scoped copy edit preserves stable IDs and every unaffected cell', () => {
  const spec = copy()
  spec.screens[1].items[1].value = 'Already paid'
  const before = parse(renderSketch(example))
  const after = parse(renderSketch(spec))
  assert.deepEqual([...before.keys()], [...after.keys()])
  for (const [id, cell] of before) if (id !== 's-detail--reason--value') assert.deepEqual(after.get(id), cell, id)
  assert.equal(after.get('s-detail--reason--value').value, 'Already paid')
})

test('file updates are idempotent and refuse manual/foreign files or canonical handoff names', (t) => {
  const dir = folder(t)
  const output = join(dir, 'sketch-invoices.drawio')
  assert.equal(writeSketch(example, output).changed, true)
  assert.equal(writeSketch(example, output).changed, false)
  writeFileSync(output, readFileSync(output, 'utf8').replace(/\n/g, '\r\n'))
  assert.equal(writeSketch(example, output).changed, false)
  const spec = copy()
  spec.screens[1].items[1].value = 'Already paid'
  assert.equal(writeSketch(spec, output).changed, true)
  const updated = readFileSync(output, 'utf8')
  const foreign = copy()
  foreign.id = 'another-sketch'
  assert.throws(() => writeSketch(foreign, output), /belongs to another/)
  assert.equal(readFileSync(output, 'utf8'), updated)
  const manual = updated.replace('Already paid', 'Edited in Draw.io')
  writeFileSync(output, manual)
  assert.throws(() => writeSketch(spec, output), /modified/)
  assert.equal(readFileSync(output, 'utf8'), manual)
  writeFileSync(output, '<mxGraphModel/>')
  assert.throws(() => writeSketch(spec, output), /manual/)
  assert.equal(readFileSync(output, 'utf8'), '<mxGraphModel/>')
  assert.throws(() => writeSketch(example, join(dir, 'mockup.drawio')), /canonical/)
  const invalid = copy()
  invalid.links[0].to = 'unknown'
  assert.throws(() => writeSketch(invalid, output), /Unknown link/)
  assert.equal(readFileSync(output, 'utf8'), '<mxGraphModel/>')
})

test('user IDs do not collide with renderer-owned title or component suffix IDs', () => {
  const spec = copy()
  spec.screens[0].items.push({ id: 'title', type: 'heading', text: 'A section title' })
  spec.screens[0].items.push({ id: 'reason-value', type: 'text', text: 'Independent content' })
  const cells = parse(renderSketch(spec))
  assert.equal(cells.get('s-list---title').value, 'Invoices awaiting review — Approver')
  assert.equal(cells.get('s-list--title').value, 'A section title')
})

test('CLI works with spaced paths and has a clear non-destructive failure', (t) => {
  const dir = folder(t)
  const input = join(dir, 'source with spaces.json')
  const output = join(dir, 'sketch-invoices.drawio')
  writeFileSync(input, JSON.stringify(example))
  const result = spawnSync(process.execPath, [renderer, input, output], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Wrote/)
  assert.equal(readFileSync(output, 'utf8'), renderSketch(example))
  const before = readFileSync(output, 'utf8')
  writeFileSync(input, '{invalid json')
  const failed = spawnSync(process.execPath, [renderer, input, output], { encoding: 'utf8' })
  assert.equal(failed.status, 1)
  assert.equal(readFileSync(output, 'utf8'), before)
  const usage = spawnSync(process.execPath, [renderer], { encoding: 'utf8' })
  assert.equal(usage.status, 1)
  assert.match(usage.stderr, /Usage:/)
})

test('standalone instructions preserve workflow boundaries, manual edits and honest verification', () => {
  const skill = readFileSync(new URL('../skills/sketch-drawio/SKILL.md', import.meta.url), 'utf8')
  for (const pattern of [/disable-model-invocation: true/, /outside `docs\/product-design\//, /Do not create or replace canonical/, /read-only/, /rendering not verified/, /do not launch an automatic critique loop/, /Do not delete the file or change its hash/]) assert.match(skill, pattern)
  assert.ok(skill.split('\n').length < 65)
})
