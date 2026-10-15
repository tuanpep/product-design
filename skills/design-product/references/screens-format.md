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

**Screen inventory.** One row per screen, in journey order, numbered SC1, SC2, and so on. Several flows are step folders, parent before its children (`1`, then `1.1`, then `2`). Serves lists story IDs once a story map exists, and requirement IDs before that:

| ID | Screen | Role | Purpose | Entered from | Exits to | Serves |
| --- | --- | --- | --- | --- | --- | --- |
| SC1 | My shifts | Nurse | See upcoming shifts and start a swap | Menu, notification | SC2 | S1 (R1) |

**Screens.** One level-three heading per screen, written `### SC1 My shifts`. Under each:

- **Purpose** and the journey step it serves.
- **Content:** what is shown, with the entity attribute it comes from.
- **Inputs:** field, type, required or optional, validation rule ID, example value.
- **Actions:** the real label, its result, and the next screen.
- **Views:** business snapshots in usage order, separated by semicolons, starting with `default`. Names are lowercase kebab-case, with optional bracketed details: `**Views:** default (draft); awaiting-approval (decision owner); approved (own obligations); withdrawal-request (reason and confirmation)`. The mockup needs a `<screen>-<view>` frame for each listed view. Use a distinct interaction for an important decision, form, or confirmation; do not hide it in a design annotation. View names must not be prefixes of other view names for that screen, or end in `-caption` or `-note`, which are reserved for annotations.
- **Technical behavior:** concise prose for shared loading, empty-result, validation, permission, and network patterns where relevant. No mandatory technical-state list and no explanation required for every omitted technical state. Add a technical exception to Views only when it changes the business action, risk, recovery, or handoff, or detailed UI states are explicitly requested. Retain safety, privacy, and recovery requirements without multiplying frames.
- Legacy **States:** lists remain supported and their declared frames are still required. Do not create them for new journey-first designs by default. When revising an existing state-heavy package, update the owning specification and drawings together only within the requested scope; do not silently remove listed coverage.
- **Rules:** referenced by ID, not restated.

**Content and copy.** Voice, terms from the glossary, and the message catalogue:

| ID | Trigger | Text | Recovery |
| --- | --- | --- | --- |
| M1 | BR2 denies the request | Lan would work more than 48 hours this week. Choose another colleague, or ask the charge nurse to approve an exception. | Choose another colleague (SC2) |

Notifications record channel, trigger, recipient, content, and opt-out.

**Accessibility.** The target, for example WCAG 2.2 AA for the web, the criteria to check per screen, and who checks them. A screens document cannot establish conformance.
