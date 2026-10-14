---
name: design-screens
description: "Turn a journey and its agreed sketch into a navigation map and a screen inventory, with each screen's content, inputs, actions, the states that change it, and accessibility notes. Use for /design-screens, after sketch-drawio, or when people cannot picture the product."
disable-model-invocation: true
---

# Design Screens

Read [principle-design-every-state](../principle-design-every-state/SKILL.md), [principle-use-real-content](../principle-use-real-content/SKILL.md), and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). Screens serve steps of a user task. They are not a template to fill.

1. Start from the sketch files (`sketch.drawio`, or `sketch-<flow>.drawio`) and the layout option the person chose. Keep their screen IDs and order. If there is no sketch and the approach has an interface, run `sketch-drawio` first. Each screen serves one step of the journey. Merge steps when that reduces effort without hiding a decision. Split a screen that asks two unrelated questions, and give the new screen the next free ID.
2. Write the navigation map: entry points (link, notification, search, menu), how screens connect, back and cancel destinations, and where the journey ends. Use `drawio` to write `navigation.drawio` for a map that a list cannot make clear. A second close flow is `navigation-<flow>.drawio`.
3. Inventory each screen with a stable ID (SC1), name, role, purpose, entered from, exits to, and what it serves: story IDs once a story map exists, otherwise the requirement IDs. `map-stories` later adds the story IDs.
4. For each screen, specify:
   - content shown, with the entity attribute it comes from;
   - inputs with type, required or optional, validation rule ID, and an example value. A rule that a screen needs before `define-rules` has run gets its BR ID once, under Needs and requirements in `product-design.md`, as **proposed**; `define-rules` keeps that ID;
   - actions with their real label and result;
   - states: default, plus a state a person can reach that changes this screen. Empty, error, and denied when the screen can be empty, fail, or refuse, with the recovery, rule, and message ID. Loading, partial, success, and offline only when they change this screen. Leave out a state that cannot happen or does not change the screen, and do not list it.
5. Inspect the target project for an existing design system, components, or platform conventions, and reuse them before inventing a pattern. Note layout differences for small screens when the context of use requires them.
6. For each screen, note heading order, focus order, labels, error identification, target size, and meaning not carried by colour alone, with the [WCAG 2.2](https://www.w3.org/TR/WCAG22/) criteria to check. A specification does not establish conformance.
7. Get labels and messages from `write-content`. Use realistic content, including the longest value, the empty list, and the long list.

Write `docs/product-design/<slug>/screens.md` using [the screens format](../design-product/references/screens-format.md). Then `prototype-drawio`. Screens are **proposed**; they are not a built interface or evidence of usability.

**Reply:** the screens, any change from the sketch and why, the navigation, the states that were hardest to design, and the existing patterns reused.
