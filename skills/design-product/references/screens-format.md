# Screens format

`docs/product-design/<slug>/screens.md` shows the business journey: what people need to accomplish, what they see and do in order, and how work passes between roles. It follows [the output standard](output-standard.md) and is written by `design-screens` and `write-content`. Everything in it is **proposed** unless an owner approved it.

Start with a title and this header:

```text
Standard: screens/1.0
Updated: YYYY-MM-DD
Source: product-design.md
```

Use these level-two headings in order:

```markdown
## Navigation map
## Screen inventory
## Screens
## Content and copy
## Accessibility
```

**Navigation map.** Entry points, the path through the journey, back and cancel destinations, and exits. Link the journey and navigation files if they exist. Several flows are linked in parent/child index order: `1-<step>/journey.drawio`, then `1-<step>/1.1-<substep>/` for a nested split of that step, then `2-<step>/navigation.drawio`.

Begin with a business-stage table: stage, actor, task, prerequisite/decision, resulting view, and handoff/outcome. Distinguish parallel work from mandatory dependencies. Put setup/configuration and post-completion support outside the main task sequence. Keep stable SC IDs even when the presentation order changes.

Before writing individual screens, check the whole task loop: entry → find/select work → inspect → act → outcome → return or handoff. For repeated records, include a real collection screen (list, table, queue, or task-appropriate board), not only a dashboard, detail, form, or confirmation. Show how people reopen existing work and see its updated status. Do not invent CRUD operations that the task does not need. For a one-off task with no collection, explain that exception under Navigation map.

Under Navigation map, record **UI baseline:** source paths or supplied screenshot references, target design-system/version if known, theme, shell, typography, spacing, density, and component conventions. Existing product components and relevant screens take precedence over the fallback kit. Identify what is observed versus proposed, any conflicting references, and deliberate deviations. With no references, explicitly call the Ant Design light baseline proposed; do not claim a match to an unseen product. Record the token snapshot/version, contrast overrides and local density/font substitutions; static Draw.io shapes do not instantiate React components.

**Screen inventory.** One row per screen, in journey order, numbered SC1, SC2, and so on. Several flows are step folders, parent before its children (`1`, then `1.1`, then `2`). Serves lists story IDs once a story map exists, and requirement IDs before that:

| ID | Screen | Role | Purpose | Entered from | Exits to | Serves |
| --- | --- | --- | --- | --- | --- | --- |
| SC1 | My shifts | Nurse | See upcoming shifts and start a swap | Menu, notification | SC2 | S1 (R1) |

**Screens.** One level-three heading per screen, written `### SC1 My shifts`. Under each:

- **Purpose** and the journey step it serves.
- **Layout:** page archetype (start, collection, detail, question, form, review, or outcome), persistent shell/current navigation, ordered content regions in the same order a keyboard or screen reader would follow, primary action placement, viewport/fold, scroll/sticky behavior, and narrow-screen treatment. Reuse the same shell and component geometry across related screens; use the [page recipes](../../mockup-drawio/references/product-layouts.md), not a generic card grid for every task. On a review, record that each Change action returns to that review.
- **Frame boundary:** only actual end-user UI and product copy inside mockup screens. Put design notes, SC/view captions, workflow narration, technical/accessibility explanations and layout assumptions outside frames. Genuine product notices, field help, errors and confirmations remain inside where users would see them; do not turn a design annotation into a fake product banner.
- **Content:** what is shown, with the entity attribute it comes from.
- **Inputs:** field meaning, Ant/native control type, required or optional, canonical data type and empty/null meaning, display/storage format, units/currency/timezone, validation rule ID and timing, example value, retained-value recovery, permissions and commit behavior. Use the [input-type catalogue](../../mockup-drawio/references/input-types.md) to distinguish identifiers from numbers, free text from entity IDs, and dates/local times from instants; do not include types the task does not need.
- **Actions:** the real label, its result, and the next screen.
- **Views:** business snapshots in usage order, separated by semicolons, starting with `default`. Names are lowercase kebab-case, with optional bracketed details: `**Views:** default (draft); awaiting-approval (decision owner); approved (own obligations); withdrawal-request (reason and confirmation)`. The mockup needs a `<screen>-<view>` frame for each listed view. Use a distinct interaction for an important decision, form, or confirmation; do not hide it in a design annotation. View names must not be prefixes of other view names for that screen, or end in `-caption` or `-note`, which are reserved for annotations.
- **Technical behavior:** concise prose for shared loading, empty-result, validation, permission, and network patterns where relevant. No mandatory technical-state list and no explanation required for every omitted technical state. Add a technical exception to Views only when it changes the business action, risk, recovery, or handoff, or detailed UI states are explicitly requested. Retain safety, privacy, and recovery requirements without multiplying frames.
- Legacy **States:** lists remain supported and their declared frames are still required. Do not create them for new journey-first designs by default. When revising an existing state-heavy package, update the owning specification and drawings together only within the requested scope; do not silently remove listed coverage.
- **Rules:** referenced by ID, not restated.

For collection screens, specify meaningful row/card data and at least one realistic populated view: identity link, decision-relevant attributes, explicit status, and contextual action. Define search/filter/sort only when needed, their active values and counts, empty collection versus no matches, and pagination only for a credible dataset. State which query, filters, sort, page, scroll position, and focus survive opening a record and returning. Save/cancel must have explicit destinations and observable effects on the collection. Never replace the populated list with only an empty or loading frame.

**Content and copy.** Voice, terms from the glossary, and the message catalogue:

Apply [the shared content contract](content-quality.md). Reference the proposal's Content baseline for document versus interface language and locale, and the working vocabulary or owning glossary for terms. This section owns the single catalogue, including off-screen communications, whenever `screens.md` exists. Move any earlier catalogue here with the same M IDs and leave links in the proposal. Labels stay with their screen; assign M IDs only to consequential or reused messages, not every string.

| ID | Trigger/source | Text | Recovery |
| --- | --- | --- | --- |
| M1 | BR2 denies the request; illustrative proposed rule | This colleague would exceed the weekly hours limit. Choose another colleague. | Choose another colleague (SC2), if permitted by BR2 |

Add audience, placement (SC/view or channel), variables with examples, action/destination, and approval owner/status only where context requires them. Reference the rule or lifecycle outcome; without a settled rule, cite proposed journey behavior rather than inventing an ID. Definition rows appear once; use "See M1" or a link elsewhere.

Notifications record sender, channel, trigger, recipient, subject/title when needed, minimum safe preview/body, destination access, delay/failure behavior, and preference/opt-out rules. Distinguish optional from essential notices; do not invent a universal opt-out. Check permissions before revealing another person's details, and distinguish pending, completed, and unknown outcomes. Content is proposed, not approval of policy or a guarantee of delivery.

**Accessibility.** The target, for example WCAG 2.2 AA for the web, the criteria to check per screen, and who checks them. A screens document cannot establish conformance.
