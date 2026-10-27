---
name: review-design
description: "Skeptically review a product design proposal for contradictions, unsupported claims, and readiness of its next decision. Use for /review-design at handoff or after revising a design."
disable-model-invocation: true
---

# Review Design

Read [the execution kernel](../design-product/references/execution-kernel.md) once; use [the shared execution contract](../design-product/references/specialist-execution.md) only for a scope/policy conflict. In the read-only review profile, repairs are never executed: return findings to the authoring owner.

Read the proposal and package files that exist. This essentials plugin expects `product-design.md` and, when Full Specify ran, `build-spec.md`. Do not demand screens, mockups, diagrams or technical design. Read a principle leaf before citing a violation or satisfaction.

Establish level, profile, next gate and handoff from [the output standard](../design-product/references/output-standard.md). Legacy `mockup` counts as design-documents.

Standalone review is read-only. Repair requires explicit authorization. Preserve findings and recheck dependents. Unresolved blockers stay findings.

## Checks

1. Recommendation addresses the supported problem, not only the original feature request.
2. Decision/outcomes and evidence chain via [learning loop](../design-product/references/learning-loop.md) sections that apply. Discovery-only work needs a research plan, not invented solutions.
3. Name any higher principle the proposal violates.
4. Compare rules, permissions, journey prose, copy and acceptance examples for contradictions.
5. Header/profile/gate agreement, evidence labels, and readiness proportionate to the named handoff.
6. One owner per term/rule/message ID. No requirement for absent optional artifacts.
7. If `build-spec.md` is present, act as a cold reader and list guesses; blockers keep draft.
8. Report performed vs planned checks. In authorized revision, withdraw invalid readiness before claiming closure.
9. Supplied results keep provenance; plans are not results.
10. Content clarity, business accuracy and consistency via [content contract](../design-product/references/content-quality.md).

## Verdicts

- **Design coherence**
- **Evidence confidence**
- **Delivery readiness** for the named next action — never permission to build

**Reply:** scope/checks, findings (or none), three verdicts, and the smallest next human decision.
