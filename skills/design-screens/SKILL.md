---
name: design-screens
description: "Organize screens around the business journey, decisions, role handoffs, and outcomes, with content, inputs, actions, and accessibility notes. Use for /design-screens, before mockup-drawio, or when people cannot picture the product."
disable-model-invocation: true
---

# Design Screens

Read [principle-design-every-state](../principle-design-every-state/SKILL.md), [principle-use-real-content](../principle-use-real-content/SKILL.md), and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). Screens serve steps of a user task. They are not a template to fill.

1. Start from the journey. Number the screens SC1, SC2, and so on in journey order, and keep those IDs when a mockup already exists. Each screen serves one step of the journey. Merge steps when that reduces effort without hiding a decision. Split a screen that asks two unrelated questions, and give the new screen the next free ID.
2. Write the navigation map: entry points (link, notification, search, menu), how screens connect, back and cancel destinations, and where the journey ends. Use `drawio` to write `navigation.drawio` for a map that a list cannot make clear. A second close flow is `1-<step>/navigation.drawio`, in the same folder as the mockup for that step.
   Start with a business-journey overview: stage, actor, task, prerequisite, decision, outcome, and receiving actor. Make parallel work explicit instead of forcing it into a wizard. Separate setup/configuration from daily work and post-completion support. A walkthrough order is not a dependency or permission grant.
3. Inventory each screen with a stable ID (SC1), name, role, purpose, entered from, exits to, and what it serves: story IDs once a story map exists, otherwise the requirement IDs. `map-stories` later adds the story IDs.
4. For each screen, specify:
   - content shown, with the entity attribute it comes from;
   - inputs with type, required or optional, validation rule ID, and an example value. A rule that a screen needs before `define-rules` has run gets its BR ID once, under Needs and requirements in `product-design.md`, as **proposed**; `define-rules` keeps that ID;
   - actions with their real label and result;
   - business views in usage order: entry, creation, review/approval, execution, confirmation, tracking, and completion where relevant. Use **Views:** with descriptive kebab-case names, starting with `default`. Draw material business branches such as rejection, withdrawal, unresolved prerequisites, or reconciliation when they change the user's next action. Do not replace these interactions with annotations or generic success screens;
   - technical behavior only where needed: summarize shared loading, validation, network, empty-result, and permission patterns in prose. Do not enumerate or draw a fixed UI-state matrix per screen. Draw a technical exception only when it materially changes the business decision, risk, recovery, or handoff, or the user explicitly requests detailed UI states. Give it a recovery and rule/message reference where relevant.
5. Cite the design system, components, and conventions `survey-existing` already recorded, and reuse a should-reuse or must-reuse finding before inventing a pattern. When that survey did not run, inspect only the screens this journey would add. Note layout differences for small screens when the context of use requires them.
6. For each screen, note heading order, focus order, labels, error identification, target size, and meaning not carried by colour alone, with the [WCAG 2.2](https://www.w3.org/TR/WCAG22/) criteria to check. A specification does not establish conformance.
7. Get labels and messages from `write-content`. Use realistic content, including the longest value, the empty list, and the long list.

Write `docs/product-design/<slug>/screens.md` using [the screens format](../design-product/references/screens-format.md). Then `mockup-drawio`. Screens are **proposed**; they are not a built interface or evidence of usability.

**Reply:** the business journey, screen order, parallel work and handoffs, important branches, and the existing patterns reused.
