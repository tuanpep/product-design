# Extended editable components: Ant Design light

Researched **2026-10-23**, pinned to **`antd@6.6.7`**, light `theme.defaultAlgorithm`, with the [documented contrast/density overrides](web-components.md#foundations). [component-recipes.drawio](component-recipes.drawio) is a static specimen board, not a working prototype or extra product screens. Existing project components/version take precedence.

For additional input types, use the [input catalogue](input-types.md) and [14-panel editable input board](input-types.drawio): text/IDs, contact, URL/search, password/OTP, numeric values, money/percentage, multiline text, temporal values, multiple/hierarchical choices, slider ranges, colors and read-only/unavailable states. These supplement rather than renumber the 16 general recipes below.

## Defaults and editing contract

- Arial is a portable system-stack fallback, not exact platform font metrics. Body/helper/control 14 with at least 22-unit line allowance; locally bold labels/legends; metadata 12, section heading 20, page heading 30. Grow boxes for wrapping.
- Fields use white full outlines; adapted normal boundary `#8c8c8c`, error boundary `#ff4d4f`, error text override `#c41d24`. Radius 6 for components, 8 for cards, 4 for tags. Adapted primary Button `#0958d9`/white; default Button white, `#d9d9d9` border, dark text. `type="text"` is borderless.
- **48-high controls/labelled targets** are local, not Ant's default32/large40/small24; reproduce using explicit theme/layout customization, not a fictitious size. Padding 12, related gap 8, group gap 24.
- Use complete [Draw.io styles](web-components.md#drawio-style-primitives), absolute coordinates, `parent="1"`, editable basic shapes. No scripts, external images/fonts, links or layer actions.
- Separate 2-wide `#0958d9` schematic focus with white clearance; one focused location per snapshot. Selection/hover are not focus. Error copy stays visible; exact CSS shadows are not reproduced.

## 1. Field group

Sources: [Form](https://ant.design/components/form), [Input](https://ant.design/components/input). Mapping: `Form layout="vertical"`, `Form.Item` and `Input` / `Input.TextArea`.

Recipe width320: label `(0,0,320,22)`, input `(0,30,320,48)`, helper `(0,86,320,24)`; next group begins y134. No bottom-rule rectangle. White full-outline field, radius6, padding12; textarea at least80–96, top-aligned. The board expands widths to its panel grid.

Example: Project name / Cedar staffing / Use the name your team recognizes. Preserve values after failure; invalid `mai@` keeps the entered string and explicit complete-email recovery. Empty, filled, focused, invalid, read-only and unavailable are distinct.

Implementation: named `Form.Item` binds the child; use Form `initialValues` rather than child `defaultValue`. Preserve generated IDs/label association (`htmlFor`), help/error association, rules and explicit validation timing. `validateStatus="error"`/`help` can show externally generated errors; `Input status="error"` alone is not a validation rule. Failed-submit summary/focus is application behavior. Disabled is not read-only.

## 2. Collapse

Source: [Collapse](https://ant.design/components/collapse). Mapping: `Collapse items={…}`, `expandIconPlacement="start"`. The specimen uses a **ghost/locally divided** treatment with white headers and schematic leading right/down caret; default bordered gray-header Collapse is a different supported variant.

Width560, local48-high header, leading24-wide icon area, label starts x40. Body begins beneath at x40, width504, at least104 high, grown to content. `accordion={false}` permits independent expansion; `accordion` deliberately restricts to one open panel. Keep critical instructions/actions outside collapsed content.

Example Delivery details: 3–5 business days, tracking after dispatch, contact support after5 days. Specify heading/button name, expanded/controls relation, Enter/Space and focus on trigger. Do not treat drawn text as working keyboard interaction.

## 3. Action Dropdown

Source: [Dropdown](https://ant.design/components/dropdown), [Menu](https://ant.design/components/menu). Mapping: `Dropdown menu={{ items }} trigger={['click']}` around a real Button. Ant's default trigger is hover: **do not rely on it** for the touch/keyboard route.

Default-button Document actions trigger `(0,0,224,48)` reserves40 at the right for the down icon. White elevated panel at y56, width at least trigger width, radius8; three locally48-high rows: Download PDF, Duplicate document, Delete document…. Neutral active-row fill and one schematic focused outline. Use a dangerous menu item for Delete and a deliberate confirmation step before deletion.

This mapping is an action **Menu**, not a form Select or the previous library's generic disclosure. Specify tested keyboard opening, item navigation, activation, Escape and trigger focus return. Child must accept focus/click events. With one or two ordinary actions prefer showing them directly. Static shapes do not implement menu semantics.

## 4. Date and time entry

Sources: [DatePicker](https://ant.design/components/date-picker), [TimePicker](https://ant.design/components/time-picker), [Input](https://ant.design/components/input).

Ant provides a custom calendar `DatePicker` (`format="DD/MM/YYYY"`), `DatePicker.RangePicker` and `TimePicker format="HH:mm"`; these are not native browser date controls. Locale, Day.js parsing and timezone are explicit implementation decisions. `preserveInvalidOnBlur` can retain invalid typed date text but is false by default.

The **specimen intentionally remains plain `Input` text entry** to preserve `31/02/2026`, without suggesting a calendar popup it does not draw. Form validation must strictly reject impossible dates instead of normalizing them. Error only on date: February has28 days in2026; enter a real DD/MM/YYYY date. Time is a separate HH:mm, 24-hour Input; fixed zone Asia/Ho_Chi_Minh (UTC+07:00) is readable text. Valid example28/02/2026 at09:30.

Specify formats, parsing, min/max/ranges, timezone/DST, validation and focus. Use DatePicker/TimePicker when the task benefits from pickers; then verify popup navigation and spoken dates. Static cells do not parse dates or resolve zones.

## 5. Upload validation

Source: [Upload](https://ant.design/components/upload). Mapping: `Upload` + default `Button`, `Form.Item` feedback and a controlled rejected-file explanation. Optional drag/drop uses `Upload.Dragger` while retaining file-dialog access.

Width400; visible Supporting document label, Add file action, PDF only / maximum10MB instructions. Reject evidence.pdf /14MB **before transfer**. Preserve filename in local error UI: File exceeds10MB. Compress the PDF, then choose a smaller file. Provide Choose smaller file and Remove evidence.pdf. These limits are fictional application rules, not Ant policy.

`beforeUpload` returning false/rejecting stops transfer but retains the file in the list; `Upload.LIST_IGNORE` excludes it. To match this rejected-file specimen, keep rejected metadata separately if using LIST_IGNORE. An intercepted file has no upload status: do not invent `status="rejected"` or imply `done`. Control `fileList`, chooser/retry/remove state and any request endpoint deliberately. `accept` only guides selection; client checks do not replace server validation. A local removal is not server deletion.

Specify chooser focus return, validation/security, announcements, cancellation and focus after removal. No drawn control transfers a file, and no backend is provided here.

## 6. Free-text AutoComplete

Source: [AutoComplete](https://ant.design/components/auto-complete). Mapping: `AutoComplete options={…}` with an Input, not Select and not an action Dropdown. No Select-style arrow is required.

Width320, visible City label, white full-outline query field, suggestions beneath. Query Ho gives Ho Chi Minh City and Hoi An. The first row is **keyboard-active, not a committed selection**. Neutral highlight and one focus outline on input; no selection check while query still says Ho.

Free text is permitted; a closed-choice entity lookup should use `Select` with search or explicit validation instead. Empty `options` suppresses the popup even if `open` is true. Use `onChange` for controlled value and selection state; searching and committing are different events. Ant6 exposes search configuration under `showSearch`; avoid copying deprecated API usage from another version. No built-in async loading state is claimed for this AutoComplete.

Specify arrows/Enter, Escape dismissal, Tab/blur commit policy, clear behavior and IME handling, then test installed component behavior. Do not inherit the old kit's Escape-clears or Tab-accepts contract. Async search requires application-owned cancellation/stale-results/error handling and status announcement. Define accessible label, query/result count and commit semantics in the owner.

## 7. Descriptions / review composition

Sources: [Descriptions](https://ant.design/components/descriptions), [Typography](https://ant.design/components/typography). Mapping: `Descriptions items={…}` for read-only facts and separate `Typography.Link` Change actions.

Width560, label/value rows at least64 high, body14, meaningful persistent labels; grow long values. Example Mai Tran, mai@example.com, appointment28/02/2026 at09:30 in Asia/Ho_Chi_Minh. Change full name / Change email address / Change appointment are named navigation links, not selectable rows or disabled fields.

Preserve programmatic label/value relationships and responsive reading order. Do not promise a particular `dl` DOM just because a drawing looks like a definition list; inspect actual Descriptions markup. A standalone specimen does not submit. Real review flows specify Change destination/return, retained answers, send progress/retry and precise outcome. A summary does not prove delivery.

## 8. Checkbox and Switch

Sources: [Checkbox](https://ant.design/components/checkbox), [Switch](https://ant.design/components/switch). The `choice` panel contrasts submit-driven consent (I agree to the terms) with an immediate preference Switch (Notifications). Selection is not focus; both need persistent names, state text and a large labelled target separate from the small glyph.

Use `Form.Item valuePropName="checked"` when binding a checkbox or switch. Unchecked is not disabled. Switch changes immediately: specify pending, failure rollback and announcement rather than pretending the drawing saves a setting. Do not put consent behind an immediate toggle. Checkbox.Group models independent multiple choices; Radio.Group models one choice.

## 9. Closed-choice Select

Source: [Select](https://ant.design/components/select). The `select` panel shows a labelled closed choice with a popup of allowed values and a reserved trailing arrow. Standard is the committed value and its selected option is blue-tinted; do not mistake that for an uncommitted keyboard-active suggestion. Use `Select options={…}`; `showSearch` enables lookup among choices, while AutoComplete permits arbitrary text. Never use an action Dropdown to capture this value.

Specify label/ID, allowClear policy, required validation, disabled options with reasons, loading/no-match behavior and keyboard/selection announcements. Popup renderings must preserve option semantics. Multiple/tags modes are separate decisions, not mandatory decorations. A highlighted suggestion does not mean the answer was submitted.

## 10. Tabs

Source: [Tabs](https://ant.design/components/tabs). The `tabs` panel shows peer record views with a labelled active tab and underline, not numbered task stages. Use `Tabs items={…}`, controlled `activeKey` when appropriate. Keep tab labels distinct from their panel headings and avoid an unnecessary action in every tab.

Specify keyboard activation/navigation, active panel association, retained state, focus and narrow overflow. Do not confuse a tab with a link to a different resource, or use tabs to conceal required sequential form steps. Static underline placement is not evidence of tab semantics.

## 11. Steps

Source: [Steps](https://ant.design/components/steps). The `steps` panel has three ordered stages: Details complete, Review current, Confirm waiting. Use `Steps current={1} items={…}` (zero-based), `orientation` for horizontal/vertical and current `content` item property rather than deprecated `description` in Ant6. The diagram indicates position, **not a measured percentage**, and does not claim submission is complete.

No click-to-jump is implied. If earlier steps become navigable, specify retained answers, validation and return destination separately. Announce current stage and preserve order when stacked. A completed stage is not keyboard focus; a future Send stage is not a successful transfer.

## 12. Modal confirmation

Source: [Modal](https://ant.design/components/modal). The `modal` panel is a bounded schematic of a confirmation surface, not a full-size product frame. Show a specific title, object/consequence, safe Cancel and named destructive action; `open`, `onCancel` and `onOk` must be wired in an implementation. The destructive action uses Button danger styling; do not invent an executed deletion outcome.

Use a modal only when interruption/confirmation is justified. Specify initial focus (prefer safe action for irreversible changes), focus containment, Escape/close policy, accessible name/description, background isolation, async pending/failure, duplicate-submit prevention and trigger focus return. Do not assume mask dismissal is always safe. Static dimming and a drawn close control implement none of this.

## 13. Drawer

Source: [Drawer](https://ant.design/components/drawer). The `drawer` panel schematically shows a contextual side surface, title, read-only information and explicit Close action. It is not a duplicate detail page or permission boundary. Use `open`, `onClose` and task-appropriate placement/size; design the underlying context and narrow-screen transformation deliberately.

Specify modality/background access, focus entry/containment/return, Escape, scroll and unsaved-change policy. Closing an inspection drawer is not saving a record. The small component specimen is not a full-size responsive product screen or proof that a drawer suits the cover-request task.

## 14. Pagination

Source: [Pagination](https://ant.design/components/pagination). The `pagination` panel is an isolated fixture: `total={50}`, `pageSize={10}`, `current={2}` means page2 of5, records11–20. Use previous/next, a clearly active page, appropriate disabled endpoints and meaningful accessible names. No hidden table or fifty invented records are added to the product examples; their three-record collection still has no pagination.

Specify page-size choices only if supported, server/client paging, pending/error, retained query/sort and where focus/scroll goes after navigation. Counts and visible records must agree in real flows; page2 is selection, not keyboard focus. A static selected page does not fetch results.

## 15. Alert and Message

Sources: [Alert](https://ant.design/components/alert), [Message](https://ant.design/components/message). The `feedback` panel contrasts persistent contextual information (`Alert type="info" showIcon`) with same-view success feedback (Message). Both use readable text and an icon/state label rather than color alone. Do not replace inline form errors with a toast or repeat the same success in several competing locations.

Use `App.useApp().message` or `message.useMessage()` so theme/context reaches runtime feedback. Specify announcement timing and duration, persistent recovery for failures and deduplication. A Message success means only the named action succeeded, not downstream approval. The specimen's visible Message is a snapshot, not a running timed overlay.

## 16. Loading and Empty

Sources: [Skeleton](https://ant.design/components/skeleton), [Spin](https://ant.design/components/spin), [Empty](https://ant.design/components/empty). The `loading` panel separates three **alternative** snapshots, not simultaneous states: Skeleton reserves expected structure, Spin indicates unknown-duration pending work, Empty means loading finished with no records. No component expresses a measured completion percentage.

Keep context, expose busy status without announcing every decorative skeleton, delay/avoid flashing spinners when appropriate and provide slow/failure recovery. No matches differs from no records: offer Clear search for no matches, an allowed next step for genuine empty data. Empty is not an error and should not tell an unauthorized actor to create something. Test live announcements, reduced motion, repeated requests and stale-result handling in implementation.

## Handoff boundaries

Keep frame/state IDs, full-size geometry and routing from [web-components.md](web-components.md). Component variants are not mandatory product screens; non-SC specimen IDs intentionally distinguish reference from task flow.

Record roles, names, keyboard model, focus, validation, announcements and responsive intent in owning text. Verify XML separately from rendering and runtime accessibility. Icons are editable schematic lines; use `@ant-design/icons` in React. Neither library selection nor passing token checks establishes conformance.
