---
name: define-rules
description: "Turn policy, eligibility, limits, and calculations into a catalogue of business rules with decision tables and concrete examples. Use for /define-rules, or when a journey depends on who may do what, when, or how much."
disable-model-invocation: true
---

# Define Rules

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [testability](../principle-make-it-testable/SKILL.md), [single ownership](../principle-one-source-of-truth/SKILL.md), and [reversible choices](../principle-decide-the-reversible/SKILL.md). Write a rule once and reference its ID.

1. Catalogue each business rule with a stable ID (BR1), a statement, its evidence class and source, its owner, and the requirement it serves. Keep any BR ID already proposed in `product-design.md` or used in `screens.md`, and replace the earlier statement with a link to the catalogue.
2. Write each rule as conditions and a result. For interacting conditions, use a decision table covering meaningful feasible outcomes. Compress equivalent rows using explicitly defined don't-care conditions only when the result is independent of those conditions. Identify impossible combinations and justify consequential interaction coverage; do not mechanically enumerate an exponential Cartesian product or use compression to hide gaps.
3. Give rules concrete examples that distinguish outcomes and material boundaries. Include passing, denied, exact-limit/just-over, empty, duplicate and concurrent cases where applicable; do not invent a denial or numerical boundary for a rule that has none. Reference shared examples rather than multiplying equivalent cases. Unknown expected outcomes remain questions, not fabricated Then clauses.
4. For each denial, reference what the person sees (M ID from the single content catalogue), what they can do next, and who, if anyone, may override. Follow [the content truth check](../design-product/references/content-quality.md#check-business-truth-before-polishing). Do not invent an exception or support route just to supply recovery. When none is permitted, state that constraint and its owner. Flag affected existing messages when a rule changes, so the phase handoff reconciles their wording and mockup instances.
5. A threshold, time, or amount without an approved source is a **proposed** default with an owner. A rule touching safety, money, law, or privacy stays a blocking unknown until its owner approves it. Load [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md) only when that protection trade-off is open or cited.
6. Check the rules against each other for overlaps, gaps, contradictions, and evaluation order.

Write the catalogue under Business rules in `build-spec.md` using [the build spec format](../design-product/references/build-spec-format.md). Screens, states, and acceptance criteria reference rule IDs instead of restating them.

**Reply:** the rules, the ones that need an owner's approval, the contradictions found, and the proposed defaults.
