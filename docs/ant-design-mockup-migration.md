# Ant Design mockup migration — 2026-10-23

## Scope

The requested design system is [Ant Design](https://ant.design/). This repository's mockup components are editable static Draw.io references, not a running app. Migrated the three bundled boards and their component/layout/scenario guidance and regression tests. Expanded the specimen board from seven to sixteen panels at the user's request: added Checkbox/Switch, Select, Tabs, Steps, Modal, Drawer, Pagination, Alert/Message and Skeleton/Spin/Empty examples. These are component specimens, not extra features inserted into the product flows. Existing task states, fictional records, flow IDs and full-size frame layout remain the owning contract. No React runtime or `antd` dependency is needed to open the drawings.

The workspace already contained local Pajamas changes and an unrelated untracked `docs/product-design/` package. Migration proceeds from that working baseline; unrelated material and the previous research record are retained.

## Entry points

Later extension: [input-type catalogue and 14-panel board](ant-design-input-types.md) adds value/storage/validation definitions without changing the original 16-panel component board.

- [Editable 16-panel board](../skills/mockup-drawio/references/component-recipes.drawio)
- [All 16 recipes and interaction boundaries](../skills/mockup-drawio/references/extended-components.md)
- [Theme tokens and component mappings](../skills/mockup-drawio/references/web-components.md)
- [Cover-request example](../skills/mockup-drawio/references/example.drawio) and [owning screen states](../skills/mockup-drawio/references/example-screens.md)
- [Collection/detail/edit example](../skills/mockup-drawio/references/collection-flow.drawio) and [owning task contract](../skills/mockup-drawio/references/collection-screens.md)

## Sources and decisions

Live documentation and the published package resolved to **`antd@6.6.7`** on 2026-10-23. Public docs move; the [tagged source](https://github.com/ant-design/ant-design/tree/6.6.7/components) and [package metadata](https://unpkg.com/antd@6.6.7/package.json) identify the snapshot.

| Source | Applied decision |
| --- | --- |
| [Customize theme](https://ant.design/docs/react/customize-theme), [pinned seed tokens](https://unpkg.com/antd@6.6.7/es/theme/themes/seed.js), [neutral-color algorithm](https://unpkg.com/antd@6.6.7/es/theme/themes/default/colors.js) | Light defaultAlgorithm; system fonts, 14 body, radius6 controls/radius8 cards, 32 default/40 large control height. Draw.io uses Arial and retained48-high controls as named adaptations. Alpha text resolves on white (`rgba(0,0,0,.88)` → `#1f1f1f`, `.65` → `#595959`), not an arbitrary dark neutral. |
| [Button](https://ant.design/components/button), [Input](https://ant.design/components/input), [Form](https://ant.design/components/form), [Radio](https://ant.design/components/radio) | Primary/default/text action hierarchy; vertical labelled Form.Item, white outlined fields, blue selected radio; explicit validation timing/retention. |
| [Collapse](https://ant.design/components/collapse), [Dropdown](https://ant.design/components/dropdown) | Current items API, expandIconPlacement start, locally divided ghost Collapse; Dropdown menu with explicit click rather than hover-only behavior. |
| [AutoComplete](https://ant.design/components/auto-complete) | Free text, no Select arrow, empty options suppress popup; active suggestion is not selection; no inherited Escape-clears/Tab-accepts assumption. |
| [DatePicker](https://ant.design/components/date-picker), [TimePicker](https://ant.design/components/time-picker) | Real custom pickers are available; invalid-date specimen intentionally remains Input text with strict application parsing, not a native date-input claim. |
| [Upload](https://ant.design/components/upload) | Real Upload/Button mapping; beforeUpload can stop transfer, LIST_IGNORE can omit file; rejected metadata needs local error UI if omitted. No invented rejected upload status. |
| [Descriptions](https://ant.design/components/descriptions), [Tag](https://ant.design/components/tag), [pinned Tag source](https://github.com/ant-design/ant-design/blob/6.6.7/components/tag/style/index.ts), [Alert](https://ant.design/components/alert) | Read-only facts and separate Change links; bordered rectangular status Tags, pending not success. Ant6 neutral Tag derives its background from colorFillTertiary (`#f5f5f5` on white) and text from colorText (`#1f1f1f`); error Alert is tinted/bordered with an icon. |
| [Checkbox](https://ant.design/components/checkbox), [Switch](https://ant.design/components/switch), [Select](https://ant.design/components/select), [Tabs](https://ant.design/components/tabs), [Steps](https://ant.design/components/steps) | Consent versus immediate preference; closed values versus free text; peer views versus sequential progress. Steps show explicit current/completed/waiting anatomy without implying successful submission. |
| [Modal](https://ant.design/components/modal), [Drawer](https://ant.design/components/drawer), [Pagination](https://ant.design/components/pagination), [Message](https://ant.design/components/message), [Skeleton](https://ant.design/components/skeleton), [Spin](https://ant.design/components/spin), [Empty](https://ant.design/components/empty) | Named destructive confirmation, contextual read-only panel, consistent five-page counts, persistent versus transient feedback and distinct loading/zero-result snapshots. No runtime interaction is claimed. |

## Deliberate contrast adaptations

Default primary blue `#1677ff` with white normal text, default error text `#ff4d4f` and default field border `#d9d9d9` do not pass the selected WCAG thresholds. This kit darkens Button primary and links to `#0958d9`, error copy to `#c41d24` and normal input/radio boundary to `#8c8c8c`. The [component guide](../skills/mockup-drawio/references/web-components.md#foundations) separates those overrides from unmodified tokens and supplies an illustrative ConfigProvider theme. The blue default radio/navigation accent remains `#1677ff`. Error outlines meet the measured 3:1 boundary threshold on white; selected-navigation normal text still requires review. No conformance claim is made.

Calculated opaque pairs: white/default primary **4.10:1**, white/adapted primary **6.16:1**, adapted error copy/white **5.92:1**, error outline/white **3.27:1**, adapted normal boundary/white **3.36:1**. Default selected-navigation blue on its blue-tinted background is **3.66:1**, below the 4.5:1 normal-text target. These measurements are selected-role evidence, not all-state accessibility certification.

## Verification boundary

- `npm test`: **127 passed, 0 failed**, including plugin manifest/local-link validation.
- Renderer inspection: **18 captures, 0 detected text overflows**.
- Diff whitespace check passes with Windows CRLF treated as line endings.

Automated checks cover editable XML, IDs/parents, frame coverage/containment, flow routing, repeated shell geometry, component state/copy contracts, migrated token roles and calculated contrast pairs from actual cells. These do not execute React, keyboard interaction, upload/date validation or screen readers.

Rendering uses the diagrams.net Graph/mxCodec renderer in a local Chromium viewer with actual XML at reading scale. The 18 captures cover all seven cover-request states, all three collection/detail/edit frames and all eight component-board rows. Renderer text-bounds inspection reports no overflowing labels in those views. Visual inspection includes field/focus/error, navigation/table, new component panels and task outcomes; it does not establish exact runtime fidelity. Refinements after inspection added real Steps anatomy, all five pagination pages, readable Select label, feedback icons, Drawer facts and Modal heading hierarchy. Temporary inspection files are under `C:\Users\tuan.bt\AppData\Local\Temp\opencode\ant-*.png` with `ant-render-check.json` and `ant-design-capture.cjs`. Prior-system render evidence is not reused as a result for this migration.

Verification still excludes actual React behavior, responsive runtime, keyboard/screen-reader testing, upload/date validation, user research and accessibility conformance.
