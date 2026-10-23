import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const luminance = (hex) => {
  const rgb = hex.slice(1).match(/../g).map((c) => parseInt(c, 16) / 255)
    .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

const boards = Object.fromEntries(['example', 'component-recipes', 'collection-flow', 'input-types'].map((name) => [name,
  readFileSync(new URL(`../skills/mockup-drawio/references/${name}.drawio`, import.meta.url), 'utf8'),
]))
const style = (board, id) => {
  const attrs = boards[board].match(new RegExp(`<mxCell id="${id}"[^>]*style="([^"]*)"`))
  assert.ok(attrs, `${board}: missing role cell ${id}`)
  return Object.fromEntries(attrs[1].split(';').filter((p) => p.includes('=')).map((p) => p.split('=')))
}

test('opaque text roles resolve Ant Design alpha tokens on white consistently with the guide', () => {
  const resolveBlack = (alpha) => `#${Math.round(255 * (1 - alpha)).toString(16).padStart(2, '0').repeat(3)}`
  const guide = readFileSync(new URL('../skills/mockup-drawio/references/web-components.md', import.meta.url), 'utf8')
  assert.equal(style('example', 'SC1-default-date').fontColor, resolveBlack(0.88))
  assert.equal(style('example', 'SC1-default-intro').fontColor, resolveBlack(0.65))
  assert.equal(style('example', 'SC1-default-status').fontColor, resolveBlack(0.88))
  assert.equal(style('example', 'SC1-default-status').fillColor, resolveBlack(0.04))
  assert.ok(guide.includes(resolveBlack(0.88)) && guide.includes(resolveBlack(0.65)))
})

test('contrast checks use actual board role cells, not an independent palette', () => {
  const pairs = [
    ['body', 'example', 'SC1-default-date', 'fontColor', 'SC1-default', 4.5],
    ['secondary', 'example', 'SC1-default-intro', 'fontColor', 'SC1-default', 4.5],
    ['primary', 'example', 'SC1-default-request', 'fontColor', 'SC1-default-request', 4.5],
    ['link', 'collection-flow', 'SC1-default-row1-link', 'fontColor', 'SC1-default', 4.5],
    ['error text', 'component-recipes', 'field-error-recovery', 'fontColor', 'field-panel', 4.5],
    ['alert', 'example', 'SC2-error-summary', 'fontColor', 'SC2-error-summary', 4.5],
    ['info tag', 'example', 'SC2-success-status', 'fontColor', 'SC2-success-status', 4.5],
    ['neutral tag', 'example', 'SC1-default-status', 'fontColor', 'SC1-default-status', 4.5],
    ['input boundary', 'component-recipes', 'field-focus-control', 'strokeColor', 'field-focus-control', 3],
    ['radio boundary', 'example', 'SC2-default-lan-radio', 'strokeColor', 'SC2-default', 3],
    ['schematic focus', 'example', 'SC1-default-focus', 'strokeColor', 'SC1-default', 3],
  ]
  for (const [role, board, id, property, backgroundId, minimum] of pairs) {
    const foreground = style(board, id)[property]
    const background = style(board, backgroundId).fillColor
    assert.ok(contrast(foreground, background) >= minimum, `${role}: ${contrast(foreground, background).toFixed(2)} < ${minimum}`)
  }
})

test('input catalogue uses the same adapted body, boundary and error roles', () => {
  const xml = boards['input-types']
  const controls = [...xml.matchAll(/<mxCell id="([^"]+-control)"[^>]*style="([^"]*)"/g)]
  assert.ok(controls.length >= 14)
  for (const [, id, raw] of controls) {
    const tokens = Object.fromEntries(raw.split(';').filter((part) => part.includes('=')).map((part) => part.split('=')))
    if (tokens.fillColor === '#ffffff' && ['#1f1f1f', '#c41d24'].includes(tokens.fontColor)) {
      assert.ok(contrast(tokens.fontColor, tokens.fillColor) >= 4.5, `${id}: text contrast`)
    }
    if (['#8c8c8c', '#ff4d4f'].includes(tokens.strokeColor)) {
      assert.ok(contrast(tokens.strokeColor, '#ffffff') >= 3, `${id}: control boundary contrast`)
    }
  }
})

test('default selected blue text has a contrast limitation; error boundary is measured separately', () => {
  assert.equal(style('example', 'SC1-default-nav').fontColor, '#1677ff')
  assert.ok(contrast(style('example', 'SC1-default-nav').fontColor, style('example', 'SC1-default-nav').fillColor) < 4.5)
  const error = style('component-recipes', 'field-error-control')
  assert.equal(error.strokeColor, '#ff4d4f')
  // #ff4d4f on white is about 3.27:1, unlike normal-size error text (requires 4.5).
  assert.ok(contrast(error.strokeColor, error.fillColor) >= 3)
  assert.ok(contrast(error.strokeColor, error.fillColor) < 4.5)
})

test('Ant Design reference styles declare each property once and reject legacy palette and rules', () => {
  for (const [name, xml] of Object.entries(boards)) {
    assert.doesNotMatch(xml, /Pajamas|GitLab|138\.7\.1|#(?:141414|3a383d|18171d|646163|8a8888|dcdbd9|c1bfbe|27599f|1f73ca|c52042|de1d4b|feeef0|f7f7f5|4d4b4e|c8e0f9|c74816|757274|ecebea)\b/i, name)
    for (const [, id, style] of xml.matchAll(/<mxCell id="([^"]+)"[^>]*style="([^"]*)"/g)) {
      const keys = style.split(';').filter((p) => p.includes('=')).map((p) => p.split('=')[0])
      assert.equal(new Set(keys).size, keys.length, `${name}: ${id} has duplicate style keys`)
    }
    assert.doesNotMatch(xml, /id="[^"]*(?:note-input-rule|search-rule|summary-rule|summary-accent|panel-accent)"/)
  }
})
