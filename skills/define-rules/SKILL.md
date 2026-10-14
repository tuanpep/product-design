---
name: define-rules
description: "Turn policy, eligibility, limits, and calculations into a catalogue of business rules with decision tables and concrete examples. Use for /define-rules, or when a journey depends on who may do what, when, or how much."
disable-model-invocation: true
---

# Define Rules

Read [principle-make-it-testable](../principle-make-it-testable/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md). A rule is written once and referenced by ID.

1. Catalogue each business rule with a stable ID (BR1), a statement, its evidence class and source, its owner, and the requirement it serves. Keep any BR ID already proposed in `product-design.md` or used in `screens.md`, and replace the earlier statement with a link to the catalogue.
2. Write each rule as conditions and a result. When two or more conditions combine, use a decision table that covers every combination. Mark impossible combinations as impossible rather than leaving them out.
3. Give each rule concrete examples: one that passes, one that is denied, and one at the boundary. Check exactly at the limit, just over, empty, duplicate, and concurrent requests where they apply.
4. For each denial, say what the person sees (message ID), what they can do next, and who can override. A denial without a recovery fails [principle-behave-predictably](../principle-behave-predictably/SKILL.md).
5. A threshold, time, or amount without an approved source is a **proposed** default with an owner. A rule touching safety, money, law, or privacy stays a blocking unknown until its owner approves it. Read [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md).
6. Check the rules against each other for overlaps, gaps, contradictions, and evaluation order.

Write the catalogue under Business rules in `build-spec.md` using [the build spec format](../design-product/references/build-spec-format.md). Screens, states, and acceptance criteria reference rule IDs instead of restating them.

**Reply:** the rules, the ones that need an owner's approval, the contradictions found, and the proposed defaults.
