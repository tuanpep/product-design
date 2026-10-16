# Product page layouts and workflow coverage

## Match the product, not just a palette

Resolve the UI baseline before drawing. Inspect supplied screens, repository components, styles/tokens, and relevant routes when available. Record concrete source paths or screenshot names in `screens.md`; do not treat a guessed brand colour as evidence of fidelity. Prefer the target product's installed components and version over defaults. If references conflict, name the chosen source and uncertainty. Do not block a proposed draft solely for missing visual references, but do not describe it as matching an unseen product.

| Inspect | Preserve across screens |
| --- | --- |
| Shell | Header height, navigation width, active item, account/context controls, content origin |
| Theme and layers | Background, surfaces, field layers, borders, status roles, primary and focus tokens; light/dark mode follows the actual product, not an invented variation |
| Typography | Family/fallback, heading hierarchy, body size/line height, weights and link treatment |
| Density and geometry | Spacing scale, control heights, radii, table density, column widths, icon size and alignment |
| Component organization | Page title/actions, toolbar, table/list, detail sections, form groups, action bar and feedback placement |
| Behavior | Navigation versus action, responsive transformation, focus/return, retained search context, save/cancel semantics |

Without target references, use the **proposed Carbon-informed White** baseline from [web-components.md](web-components.md), explicitly not a pixel-perfect Carbon implementation. Keep one coherent baseline per product mode. Do not add gradients, decorative metrics, large empty cards, or unrelated rounded surfaces to make a working screen look like a marketing page.

## Place each region by principle

Use [Behave predictably](../../principle-behave-predictably/SKILL.md). The principle chooses the region; the archetype fills it.

| Principle | Placement |
| --- | --- |
| Suitable for the task | Pick the archetype from the requirement. A repeated-record task is a collection. A commit is a review. Do not add a control the step does not need. |
| Conformant with expectations | Keep the shell, the primary action, and the back path in the same place on every frame. In the header, product navigation sits on the left and account or global controls on the right. |
| Self-descriptive | The page title states the action. A heading, not only the button, tells the person what to do. |
| Controllable | Back, Cancel, and Change are visible. Change on a review returns to that review. |
| Grouping | Related items use a smaller step on the spacing scale; sections use a larger step. Do not wrap every group in a card or a border. |

Record the visual order in `screens.md` Layout so it matches the order a keyboard or screen reader would follow: shell, title, content in task order, then the action that commits that content. Headings and lists carry the scan. Do not arrange the page into an F-shape or a Z-shape.

## Page archetypes

Desktop fallback: 1440×900 frame; 48-high app header; optional 256-wide sidebar; main x=288 to 1408, y=80 onward (no browser chrome). These are local assumptions, not Carbon shell specifications. Keep shell geometry fixed throughout a flow. Use 32 side margins without a sidebar. Browser chrome, when needed, shifts all vertical regions consistently.

### Start

Use when the requirement is to begin or resume the service. State what the task is and what it requires, then one action such as Start now or Sign in. A second action is a link. This is not a form and not a dashboard.

### Collection: list, table, queue

1. Page header: title that names the task, concise context/count, and one task-level primary action when creation is allowed.
2. Optional peer tabs or summary only when they change the task. Do not replace the collection with KPI cards.
3. Toolbar immediately above results: labelled search; relevant filters with active values; result count. State whether updates occur on submit or typing.
4. One aligned column grid: identity link, decision-relevant attributes, textual status and explicit row action. Use realistic varied records and widths based on content. Default 48 or 64 row/header heights; do not shrink text to fit invented columns. Avoid a card per table cell and multiple competing primary buttons per row.
5. Footer/pagination only for enough data to justify it; visible totals and page size must agree with records. Three records do not need fake pagination.
6. Preserve the shell and relevant controls for loading/no-data/no-matches. No matches offers Clear filters; no data offers the permitted first action. Describe routine technical states in owning text; draw them only when the business-view contract requires them.

On narrow screens, specify which attributes remain visible, a labelled list/card arrangement or a justified scrollable table, and where filters/actions move. Never scale a desktop table into unreadable text. Selection/bulk actions need an actual task, selection count, eligibility and clear selection scope—not decorative checkboxes.

### Detail

Show a contextual back link, record identity and status, task-level action, then grouped facts or task-relevant history. Use label/value sections for read-only data rather than disabled form fields. Keep secondary actions subordinate; hide unauthorized data rather than merely disabling its action. A side panel is suitable only if the product uses it and enough reading space remains.

### One question

Use when the requirement is a single decision. One heading states the question, the fields belong to that question only, and Continue follows them. Keep the column narrow, within the same 560–640 width as a form.

### Create or edit

Use when several related fields are edited together. Use a 560–640-wide reading/form column within the existing shell; related fields share a section heading and a smaller spacing step, and sections use a larger step. Keep labels/hints/errors with their fields. Put Save/Send and Cancel after the final group; a sticky action bar must not cover content or focus. Distinguish create from edit and preserve input after failure. Confirm destructive/irreversible actions only where justified. A short routine edit need not become a modal. A single decision uses One question, not this archetype.

### Review and outcome

A review presents the actual answers and a labelled Change action on each answer before commitment. The page title states what the person is about to send. Change opens that answer and returns to this review; it does not restart the transaction. An outcome states what changed, what is still pending and the next useful destination. A confirmation is not a substitute for showing the updated record or collection. Do not add a standalone success screen when inline feedback plus the updated view better fits the task.

## Workflow coverage gate

Write a small task-loop table in Navigation map: actor/task, entry, collection/find, inspect, act, outcome, return/handoff, covered SC/view IDs. Use “not applicable + reason” only when a stage genuinely does not exist. Follow the task rather than generating every CRUD operation for every entity. Do not leave another role's acceptance implied by a sender's success.

For repeated-record tasks, require a populated collection view, even when the initial request emphasizes a form. Show where an existing record is reopened, how status changes appear, and how back/cancel/save behave. Preserve filter/query/sort/page context; specify scroll and focus return and what happens if a saved record no longer matches the current filter. Dashboard links may enter the loop but cannot replace it.

See [collection-screens.md](collection-screens.md) and [collection-flow.drawio](collection-flow.drawio): a bounded edit task, not a complete application or evidence of user validation. The legacy [cover-request example](example.drawio) remains useful for component and recovery states.

## Handoff audit

- Enforce the frame boundary: only end-user UI and product copy inside. Put SC/view captions, arrows/flow labels, design explanations, implementation instructions, viewport/theme assumptions and accessibility notes outside. Genuine in-product alerts/errors/help remain inside when the task requires them; a designer's explanatory notice does not.
- Trace entry → find → inspect → act → outcome → return with concrete records, actions and SC/view IDs. Verify cancel does not save and success does not imply an unperformed downstream action.
- Compare every frame against the recorded baseline: shell alignment, active navigation, layers, typography, component density, action hierarchy and repeated content. Record deviations with reasons.
- Confirm each declared collection has a populated mockup; search, filter, row links, save and cancel have specified results. Check declared frames against `screens.md` with the output checker.
- Inspect the rendered board at reading scale in the intended viewer for wrapping, alignment, clipping, overlays, off-canvas content and connector collisions. XML checks do not establish visual quality. If no viewer was used, explicitly say rendering is unverified.
- Review narrow-width layout intent, labels, status text, focus and recovery; test actual keyboard/semantics/reflow on an implementation. A static board is not accessibility or usability evidence.
