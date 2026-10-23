import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { checkMockupDrawio, checkScreens, screenIds, screenStates } from './check-output.mjs'

const read = (name) => readFileSync(new URL(`../skills/mockup-drawio/references/${name}`, import.meta.url), 'utf8')
const xml = read('collection-flow.drawio')
const screens = read('collection-screens.md')
const check = (drawing) => checkMockupDrawio(drawing, screenIds(screens), screenStates(screens))

test('populated collection, detail and edit match the owning screen contract', () => {
  assert.deepEqual(checkScreens(screens), [])
  assert.deepEqual(check(xml), [])
  assert.deepEqual(screenStates(screens), ['SC1-default', 'SC2-default', 'SC3-default'])
  for (const suffix of ['link', 'summary', 'status', 'owner', 'updated']) {
    for (let row = 1; row <= 3; row++) assert.ok(xml.includes(`id="SC1-default-row${row}-${suffix}"`))
  }
  for (const action of ['SC2-default-back', 'SC2-default-edit', 'SC3-default-save', 'SC3-default-cancel']) {
    assert.ok(xml.includes(`id="${action}"`))
  }
  for (const [, id, value] of xml.matchAll(/<mxCell id="([^"]+)" value="([^"]*)"/g)) {
    if (!/-(caption|note)$/.test(id)) assert.doesNotMatch(value, /SC\d|Carbon-informed|Pajamas|Ant Design|Rendering unverified|collection-screens\.md/, id)
  }
})

test('each frame repeats identical shell geometry relative to its origin', () => {
  const geometry = (id) => {
    const body = xml.match(new RegExp(`<mxCell id="${id}"[^>]*>(.*?)</mxCell>`))[1]
    return Object.fromEntries([...body.matchAll(/(x|y|width|height)="(\d+)"/g)].map(([, key, n]) => [key, Number(n)]))
  }
  for (const part of ['header', 'sidebar', 'nav', 'nav-marker', 'account']) {
    const relative = [1, 2, 3].map((n) => {
      const frame = geometry(`SC${n}-default`)
      const g = geometry(`SC${n}-default-${part}`)
      return { ...g, x: g.x - frame.x, y: g.y - frame.y }
    })
    assert.deepEqual(relative[0], relative[1], part)
    assert.deepEqual(relative[0], relative[2], part)
  }
})

test('collection maps selected navigation, table heading, primary action and input roles', () => {
  const style = (id) => Object.fromEntries(xml.match(new RegExp(`<mxCell id="${id}"[^>]*style="([^"]*)"`))[1]
    .split(';').filter((p) => p.includes('=')).map((p) => p.split('=')))
  for (let n = 1; n <= 3; n++) {
    assert.equal(style(`SC${n}-default-nav`).fillColor, '#e6f4ff')
    assert.equal(style(`SC${n}-default-nav`).fontColor, '#1677ff')
    assert.equal(style(`SC${n}-default-nav-marker`).fillColor, '#1677ff')
  }
  assert.equal(style('SC1-default-columns').fillColor, '#fafafa')
  assert.equal(style('SC1-default-col-request').fillColor, 'none', 'Heading is not a primary button')
  for (const id of ['SC2-default-edit', 'SC3-default-save']) {
    assert.equal(style(id).fillColor, '#0958d9')
    assert.equal(style(id).fontColor, '#ffffff')
    assert.equal(style(id).arcSize, '12')
  }
  assert.equal(style('SC3-default-summary-input').strokeColor, '#8c8c8c')
  assert.equal(style('SC3-default-cancel').strokeColor, '#d9d9d9')
})

test('design notes and captions cannot overlap any screen, even a different screen', () => {
  const moved = xml.replace('x="40" y="1040" width="1440" height="100"', 'x="1720" y="200" width="1440" height="100"')
  assert.ok(check(moved).some((error) => error.includes('Annotation SC1-default-note overlaps screen SC2-default')))
  const caption = xml.replace('x="40" y="72" width="1440" height="32"', 'x="40" y="120" width="1440" height="32"')
  assert.ok(check(caption).some((error) => error.includes('Annotation SC1-default-caption overlaps screen')))
  // Real product help is not a design annotation and stays in the UI.
  assert.ok(xml.includes('id="SC3-default-summary-hint" value="Use 120 characters or fewer."'))
})
