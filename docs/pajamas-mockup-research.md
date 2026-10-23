# Pajamas mockup migration — 2026-10-23

> Historical research record. The active kit has since migrated to [Ant Design](ant-design-mockup-migration.md); the linked boards now use that baseline. Verification below describes the previous Pajamas snapshot, not the current drawings.

## Scope and sources

The requested design system is [GitLab Pajamas](https://design.gitlab.com/). No external product mockup was supplied or found in the active workspace. Updated the three existing bundled Draw.io references, their component/layout/scenario documentation and regression tests. The unrelated, pre-existing untracked `docs/product-design/setup-models/` package is not part of this change.

Research used live official documentation on 2026-10-23, plus the published **`@gitlab/ui@138.7.1`** package as a pinned token/source snapshot. It is **not** added as a runtime dependency. Public documentation is a moving target; implementations must check their own installed version.

| Source | Evidence and application |
| --- | --- |
| [Develop](https://design.gitlab.com/get-started/develop) | Components use `Gl*` names from `@gitlab/ui`; actual prototypes also use fonts/SVG packages. Prefer props, then semantic utilities, then custom CSS. |
| [Published package metadata](https://unpkg.com/@gitlab/ui@138.7.1/package.json), [resolved token CSS](https://unpkg.com/@gitlab/ui@138.7.1/src/tokens/build/css/tokens.css) | The unversioned package URL resolved to 138.7.1 when researched. Followed CSS custom-property references recursively to obtain light values, rather than copying legacy GitLab screenshots. |
| [Tokens](https://design.gitlab.com/product-foundations/design-tokens), [typography](https://design.gitlab.com/product-foundations/type-fundamentals), [headings](https://design.gitlab.com/product-foundations/type-headings) | Semantic/contextual roles; GitLab Sans; body/input labels 14, weights400/600, desktop h1 up to30. Arial/bold in Draw.io is a declared approximation. |
| [Spacing](https://design.gitlab.com/product-foundations/spacing), [border](https://design.gitlab.com/product-foundations/border) | 8-based spacing; 12 horizontal control padding; component radius8, card12. Avoid unnecessary nested boxes. |
| [Button](https://design.gitlab.com/components/button), [button SCSS](https://unpkg.com/@gitlab/ui@138.7.1/src/components/base/button/button.scss) | Category and variant are separate; confirm primary is dark neutral in the current tokens. Default buttons are white/bordered; tertiary is borderless. Explain disabled reasons. |
| [Input](https://design.gitlab.com/components/text-input), [group](https://design.gitlab.com/components/form-group), [textarea](https://design.gitlab.com/components/textarea), [input SCSS](https://unpkg.com/@gitlab/ui@138.7.1/src/components/base/form/form_input/form_input.scss) | White full-outline control, shared group/input validation state, real label association. Runtime input boundary is an inset shadow with a forced-colors border; drawing uses an editable full outline, not exact CSS. |
| [Radio](https://design.gitlab.com/components/radio-button), [shared control SCSS](https://unpkg.com/@gitlab/ui@138.7.1/src/components/base/form/form_checkbox/form_checkbox.scss) | Bold legend, regular labels; dark selected background, white state indicator; control border for unselected state. No selected-card/focus equivalence. |
| [Alert](https://design.gitlab.com/components/alert), [badge](https://design.gitlab.com/components/badge), [table](https://design.gitlab.com/components/table) | Error needs next steps, tinted danger surface and error icon. Pending acceptance is info, not completed success. Keep explicit table headers/actions and contextual metadata. |
| [Accordion](https://design.gitlab.com/components/accordion), [disclosure](https://design.gitlab.com/components/dropdown-disclosure) | Leading right/down caret, independent expansion; disclosure holds links/actions and does not automatically imply ARIA menu semantics. |
| [Form combobox](https://design.gitlab.com/components/form-combobox) | Synchronous autocomplete permits text; active suggestion is not committed selection. Suggestions close on no match; no built-in loading state. Documented Escape behavior differs between open/closed states. |
| [Date picker](https://design.gitlab.com/components/date-picker), [attribute list](https://design.gitlab.com/components/attribute-list) | Prefer native GlFormDate for a submitted date, GlDatepicker for immediate actions; native rendering varies. Read-only entity attributes use term/value semantics, not disabled fields. |

## Applied decisions

- **Three boards migrated:** [cover request](../skills/mockup-drawio/references/example.drawio), [component specimens](../skills/mockup-drawio/references/component-recipes.drawio), [collection/detail/edit](../skills/mockup-drawio/references/collection-flow.drawio).
- **Single baseline:** light / Default, with resolved tokens documented in [web-components.md](../skills/mockup-drawio/references/web-components.md). Confirm `#3a383d`, text `#3a383d`, heading `#18171d`, link `#27599f`, focus `#1f73ca`, white full-outline fields, 8-radius controls, 12-radius cards, orange current-nav indicator `#c74816`.
- **Not only recoloring:** removed Carbon field bottom rules, filled Cancel buttons, 3-wide notification stripes and radio-card boundaries. Added leading error icon, current-navigation markers, info pending badge, leading right/down accordion caret; clarified combobox active versus committed value and corrected its no-match/async claims.
- **Preserved contracts:** existing SC IDs, fictional records, state coverage, full1440×900 frames, action-source edges, cancel/recovery and pending-acceptance meaning. Documentation still owns behavior; XML does not implement it.
- **Declared adaptations:** Arial instead of GitLab Sans; retained48-high teaching controls/targets and fictional shell geometry instead of claiming standard Pajamas medium size or exact GitLab chrome. Icons remain editable schematic shapes, not official SVG instances. Upload and review/Change are local compositions, not invented `GlFileUploader` or review APIs.
- **Date specimen:** invalid31/02/2026 intentionally remains a formatted text input, because a native date input cannot retain that arbitrary invalid string.
- **Completion:** precise dedicated outcome heading/card and pending-info badge, not redundant success notification or a claim that a colleague accepted.
- **Future output:** updated default-baseline wording in the mockup entry and screen/layout reference. No bundled workflow was invoked to perform this migration.

## Verification

Automated checks cover XML validity, IDs/parents/references, existing screen/state coverage, frame containment, shell consistency, arrow lanes, specimen geometry, component-specific tokens/states, absence of old field/alert rules and duplicate style keys. Additional offline tests calculate opaque contrast pairs for body/subtle, confirm, links/errors, danger feedback, info/neutral badges, control boundary and focus using WCAG luminance, not palette-name assertions.

Visual review uses the diagrams.net **Graph/mxCodec renderer**, loaded locally for inspection with the actual XML. This is renderer inspection, not a running `@gitlab/ui` application. Per-view inspection is bounded; typography, dark mode, all responsive widths, keyboard, screen readers, live announcements and real browser component behavior are not validated by these drawings.

No user testing or accessibility-conformance claim is made. Source token fidelity, structural tests, visual inspection and implementation accessibility remain separate evidence.
