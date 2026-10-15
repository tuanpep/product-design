---
name: design-dependency
description: "Record which parts require each other, what a change inside the product breaks, and a proposed build order. External failure behavior stays on the integration. Use for /design-dependency, or when the dependency view is included."
disable-model-invocation: true
---

# Design Dependency

Read [principle-choose-the-view](../principle-choose-the-view/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md). This is the dependency view: which parts require each other. It does not restate the context diagram or an integration's failure behaviour.

1. Read Design views in `technical-design.md`. If dependency is omitted, stop. If Composition is still the placeholder, run `design-composition` first.
2. For a requirement between two parts this product owns, record the direction, what is shared or called, and what a change breaks. For an external system, cite its integration ID. Failure behaviour stays in Integrations and data. Do not restate it.
3. Order the rows so a part appears after the parts it requires. That order is a proposed build order, not a schedule.
4. A part-to-part dependency the slice cannot meet, and whose impact is unknown, stays a blocking question in Assumptions and open questions in `build-spec.md`. An unknown external failure stays the integration's question; cite it. A personal-data crossing stays with `assess-threats` when that view is included; cite the threat ID instead of opening a second question.
5. Check the rows against Composition and Integrations and data. A part or system that is not already named is added to the owning section first.

Write the table under Dependencies in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Do not draw a second context diagram for the same relationships.

**Reply:** the part-to-part dependencies, the proposed build order, the integration and threat IDs cited, and any blocking part-to-part questions.
