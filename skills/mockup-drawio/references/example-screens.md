# Cedar ward cover-request example

Standard: screens/1.0
Updated: 2026-10-15
Source: illustrative component-kit scenario, not a researched product proposal

All names, records, policies, and outcomes are fictional and proposed. This companion describes [example.drawio](example.drawio); it is not a complete product-design package, clinical guidance, or evidence of user success.

## Navigation map

Nurse Mai Tran opens My shifts (SC1), chooses Ask for cover for Friday 23 October 2026, and completes Ask for cover (SC2). Cancel returns to My shifts without sending. After sending, the request is pending colleague acceptance; Mai remains assigned until acceptance. No colleague-response flow is drawn in this task.

## Screen inventory

| ID | Screen | Actor | Purpose | Entry | Exit |
| --- | --- | --- | --- | --- | --- |
| SC1 | My shifts | Nurse Mai Tran | Find the shift needing cover | Application navigation | SC2 |
| SC2 | Ask for cover | Nurse Mai Tran | Choose a colleague and send a request | Ask for cover on SC1 | SC1; pending confirmation |

## Screens

### SC1 My shifts

States: default, empty, loading.

Show the nurse, date range and shift table with labelled date/time, ward, assignment/status and action columns. The task's shift is Friday 23 October 2026, 07:00–19:00, Cedar ward, assigned to Mai Tran. The 12-hour duration is consistent throughout the task.

- Default: display shifts and a labelled Ask for cover action for the task's shift.
- Empty: no shifts in the displayed range; retain navigation and offer a useful way to view other dates. This is not a network error.
- Loading: keep the shell and date-range context, use skeleton placeholders and a visible loading label. Offer Retry loading for a slow response; it restarts the same range without sending any cover request. Real implementation should announce busy status without reading each decorative skeleton; retry cancels or supersedes the previous fetch to prevent stale results. The drawing does not implement timing or requests.

### SC2 Ask for cover

States: default, error, denied, success.

Keep the selected shift visible. Show a labelled single-choice colleague group and optional message. An unanswered form should not silently choose a colleague; a selected option in a frame represents a deliberate user selection, not a preselected policy. Preserve the optional message after validation and denial.

- Default: allow selection of a colleague and Send request. Explain that sending is not reassignment.
- Error: submitting without a colleague shows a validation summary and matching inline instruction to choose a colleague. Keep other values. The summary links to the colleague group in the eventual implementation.
- Denied: a policy check prevents sending to Lan. Illustrative weekly limit is 48 hours; Lan has 40 scheduled hours, so this 12-hour shift would make 52. Explain that no request was sent and offer another colleague. This is not an input-format error. The state can represent a fresh eligibility check after selection; do not imply an unavailable option should normally be offered as eligible.
- Success: request sent to Alex, pending acceptance. Alex has 24 scheduled hours; the shift would make 36. Mai remains assigned until acceptance. Do not imply a successful send updates the roster immediately.

## Content and copy

Use plain-language verb labels, explicit date/time and ward, and a visible Pending acceptance status. Error-summary and field-error wording must agree. Avoid exposing sensitive personal reasons in the optional message; all example records are fictional. Policy thresholds and eligibility are illustrative and would require an authorised owner and real feasibility checks in a product.

## Accessibility

Target intent: WCAG 2.2 AA for an eventual web implementation, not verified here. Desktop drawing assumption: 1440×900, with no automatic claim about CSS-pixel mapping or responsive behaviour. Visual default: Carbon-informed White, square controls, blue primary actions, neutral surfaces, and distinct status indicators. Arial is an explicit portable substitution for IBM Plex, not an exact Carbon implementation. The selected control density is 48 high; other Carbon sizes remain valid when specified.

- Preserve a heading hierarchy, named navigation, and a clear current location. Tables need semantic column headers; row actions need contextual accessible names.
- Use native buttons, radios, labels, fieldset/legend, and textarea where appropriate. Intended labelled targets are at least 48 high; glyph size is not the hit area. Tab reaches the radio group, arrow keys change the choice, and subsequent Tab reaches the optional message and actions.
- On failed submission, focus the validation summary, with links to the affected answer. On a policy denial, announce the reason and keep recovery reachable. On a new success view, focus its heading; for inline updates choose appropriate status announcement without duplicate speech.
- Show a visible focus outline, readable colours, text status and error instructions, not colour alone. Measure actual final contrast pairs after adapting tokens.
- Use Carbon's blue for primary actions and focus, not as a universal selected colour. Radio boundaries and dots use primary icon colour. Success, warning and error colours indicate outcomes, never replace their text, and are not alternate brand palettes. A sent request remains Pending acceptance even in the success state.
- Inspect at reading scale in Draw.io; test keyboard, screen readers, zoom, reflow and target geometry on the implemented artifact. The board and its automated structural checks cannot establish conformance.
