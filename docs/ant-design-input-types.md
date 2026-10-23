# Additional input types — Ant Design 6.6.7

Added a separate [input-type catalogue](../skills/mockup-drawio/references/input-types.md) and [14-panel editable input board](../skills/mockup-drawio/references/input-types.drawio), supplementing rather than replacing the [16 general component recipes](../skills/mockup-drawio/references/extended-components.md). Existing product examples and flow contracts are unchanged.

## Definition coverage

1. Text and identifiers, preserving leading zeros.
2. Email and phone, separating format from ownership verification.
3. URL and search, with allowed schemes and explicit clear/submit behavior.
4. Password and one-time code, distinguishing masking/completion from verification.
5. Integer and decimal measurements, including null, precision and units.
6. Currency and percentage, including exact decimals, currency and percent/fraction representation.
7. Multiline text with explicit counting/overflow policy.
8. Date and time, separating date-only and local-time values.
9. Date intervals and scheduled date-times, with boundaries and IANA timezone intent.
10. Multiple existing values versus created labels.
11. Cascading paths versus tree entities.
12. Scalar/range sliders with numeric alternatives.
13. Color values with visible text and separate contrast checks.
14. Read-only versus unavailable fields and reachable reasons.

Each definition includes component mapping, canonical storage, constraints, validation/recovery and accessibility/runtime boundaries. The screen specification guidance now asks for these semantics rather than only a type name.

The catalogue includes an example field contract that connects units, null versus zero, quarter-hour validation, form commitment, retained edit text and server checks. Component properties are not presented as a substitute for those business rules.

## Evidence

Researched official **tagged `antd@6.6.7`** APIs on **2026-10-23**: [Input](https://github.com/ant-design/ant-design/blob/6.6.7/components/input/index.en-US.md), [InputNumber](https://github.com/ant-design/ant-design/blob/6.6.7/components/input-number/index.en-US.md), [Select](https://github.com/ant-design/ant-design/blob/6.6.7/components/select/index.en-US.md), [TimePicker](https://github.com/ant-design/ant-design/blob/6.6.7/components/time-picker/index.en-US.md), [Cascader](https://github.com/ant-design/ant-design/blob/6.6.7/components/cascader/index.en-US.md), [TreeSelect](https://github.com/ant-design/ant-design/blob/6.6.7/components/tree-select/index.en-US.md), [Slider](https://github.com/ant-design/ant-design/blob/6.6.7/components/slider/index.en-US.md) and [ColorPicker](https://github.com/ant-design/ant-design/blob/6.6.7/components/color-picker/index.en-US.md). DatePicker mapping retains the already researched [versioned API](https://github.com/ant-design/ant-design/blob/6.6.7/components/date-picker/index.en-US.md).

Notable boundaries: Input.Search also fires on clear; Input.OTP filling is not authentication; InputNumber `step` is not a complete validation rule; controlled numeric values can exceed min/max; `stringMode` needs exact downstream arithmetic; date-time pickers do not choose/resolve timezone automatically; tags mode permits new text while multiple mode selects known values; Cascader `loadData` does not combine with `showSearch`; TreeSelect does not invoke lazy loading during search.

## Verification scope

- Focused mockup/input/token suite: **36 passed, 0 failed**.
- Full `npm test`: **143 passed, 0 failed**; plugin manifest and local links valid.
- Static rendering: **7 captures, 0 detected text overflows**.

Drawings remain static, flat editable XML with no runtime dependency, real credentials or backend. Automated checks cover XML, panel geometry/containment, labels and semantic examples; they do not execute validation, money arithmetic, authentication, date parsing, keyboard/screen-reader interaction or server authorization. Runtime accessibility and security remain unverified.

A bounded read-only review of the catalogue and linked theme/screen guidance found no concrete API/semantic conflicts. This is documentation inspection, not a runtime test.

The actual board was loaded through the diagrams.net Graph/mxCodec renderer in Chromium. All seven rows were captured at reading scale and visually inspected; text-bounds checks reported **zero overflows**. Temporary evidence: `C:\Users\tuan.bt\AppData\Local\Temp\opencode\ant-input-row-*.png`, `ant-input-render.json`, and `ant-input-capture.cjs`. This verifies the static rendering only, not the component interactions described in the catalogue.
