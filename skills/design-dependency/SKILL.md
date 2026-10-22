---
name: design-dependency
description: "Record which parts require each other, what a change inside the product breaks, and a proposed build order. External failure behavior stays on the integration. Use for /design-dependency, or when the dependency view is included."
disable-model-invocation: true
---

# Design Dependency

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [choose the view](../principle-choose-the-view/SKILL.md), [one source of truth](../principle-one-source-of-truth/SKILL.md), and [protect before enabling](../principle-protect-before-you-enable/SKILL.md). This view records which parts require each other, not another context diagram or copy of integration failure behavior.

1. Read Design views in `technical-design.md`. If dependency is omitted, stop. Reuse Composition's part inventory. If it is missing, use `design-composition` only when that view is included; otherwise report the missing authoritative input instead of silently including a view.
2. For a requirement between two parts this product owns, record the direction, what is shared or called, and what a change breaks. For an external system, cite its integration ID. Failure behaviour stays in Integrations and data. Do not restate it.
3. Apply the [shared structure/dependency procedure](../design-product/references/structure-and-dependencies.md). For acyclic dependencies, order parts after their prerequisites. For cycles, identify the mutually dependent group and its implications, then propose a justified integration sequence or investigation. Do not invent a topological order or redesign an existing system just to sort a table. A build order is proposed, not a schedule.
4. A part-to-part dependency the slice cannot meet, and whose impact is unknown, stays a blocking question in Assumptions and open questions in `build-spec.md`. Unknown external failure stays the integration's question; cite it. Cite security threat IDs from `assess-threats` when included; authorized-processing privacy risks stay with the owning data/integration under [privacy-risk guidance](../design-product/references/privacy-risk.md). Do not duplicate questions or treat all privacy risks as security threats.
5. Check the rows against Composition and Integrations and data. A part or system that is not already named is added to the owning section first.

Write the table under Dependencies in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Do not draw a second context diagram for the same relationships.

**Reply:** the part-to-part dependencies, the proposed build order, the integration and threat IDs cited, and any blocking part-to-part questions.
