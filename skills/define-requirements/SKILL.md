---
name: define-requirements
description: "Turn a context of use into stable user needs and derived requirements, and check that each requirement is fit to use at its level. Use for /define-requirements, after discovery, or when needs, features, and build stories are being mixed together."
disable-model-invocation: true
---

# Define Requirements

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Keep Understand at needs/constraints depth; elaborate solution-dependent requirements only within an open later phase.

Read [the evidence contract](../design-product/references/evidence-and-decisions.md) and the requirement checks in [the workflow reference](../design-product/references/workflow.md).

1. Write user needs before requirements. A need names who, what they need to do, and why. Add the trigger or constraint when it is known. Needs stay broader and more stable than a feature.
2. Classify each need as given, observed, inferred, or unknown. Do not upgrade a stakeholder request into an observed need.
3. Derive requirements from those needs. Each states one capability, quality or constraint at evidence-supported depth, without freezing an implementation. Say how it would be checked; load [make it testable](../principle-make-it-testable/SKILL.md) when it could change that choice. Use [quality scenarios](../design-product/references/quality-scenarios.md) for consequential targets, [accessibility planning](../design-product/references/accessibility-planning.md) for barriers/responsibility and [privacy-risk guidance](../design-product/references/privacy-risk.md) for processing harms when triggered. Keep outputs inline and targets sourced, proposed or unknown, not invented.
4. Use unknown for missing policy, numbers, or feasibility. Record trade-offs as **proposed** and name the person who can accept them.
5. Check the set for contradictions and for requirements that no need supports.

Do not write user stories or business rule catalogues here. Stories belong to `map-stories` and `specify-build`; detailed rules belong to `define-rules`.

**Reply:** the needs, the requirements that follow from them, and any check a requirement failed.
