# Screen and mockup layout audit — 2026-10-15

Scope: repository output contracts, layout references, existing mockup fixtures and structural verification. No generated customer package or target-product screenshots were supplied. No rendered-viewer inspection or user testing was performed.

| Finding | Evidence | Change |
| --- | --- | --- |
| Collection coverage was optional in practice | `screens-format.md` defined individual screens/views but no repeated-record collection gate; legacy `example.drawio` already had a shift table, so lists were not wholly absent from the kit | Require a populated collection for repeated-record tasks, or explain a genuine exception; add collection/detail/edit fixture |
| Component guidance exceeded page-composition guidance | `web-components.md` had detailed controls and a generic desktop shell, but no page-archetype reference | Add `product-layouts.md` for collection, detail, form, review/outcome and narrow-width intent |
| “Use project tokens first” was not a concrete fidelity record | Theme overrides existed, but there was no required baseline/source record in `screens.md` | Require source references, shell, theme, typography, spacing, density and observed/proposed distinction; defaults remain explicitly proposed |
| Completion/revisit could be implicit | Screen actions and exits existed without a full task-loop check | Add entry/find/inspect/action/outcome/return audit and retained collection-context behavior |
| Notes were described as external but not enforced | `checkClipping` skipped `-note`/`-caption` cells without checking their placement | Reject reserved annotation boxes overlapping any screen on the same page; retain genuine product feedback inside |

## Added reference

`skills/mockup-drawio/references/collection-flow.drawio` shows three full-size desktop frames: populated requests list, record detail and edit form. `collection-screens.md` owns content, actions, save/cancel/return, responsive intent and recovery. It deliberately draws initial snapshots only; saved outcomes are specified rather than falsely presented as drawn. Notes and screen captions are outside the frames; field help is real product copy inside.

## Verification and limits

`npm test`: 49 tests passed, including new fixture coverage, repeated shell geometry and rejected annotation overlap with both owning and other screens. Plugin metadata and local links passed. Existing reference tests remained green.

The checker identifies annotations by reserved `-note`/`-caption` suffixes; it cannot infer whether arbitrary prose is a disguised design note. Content classification, actual rendering/wrapping, real-product resemblance and accessibility still require human/viewer or implementation review. The changes improve future output instructions and references, not any unavailable customer mockup.
