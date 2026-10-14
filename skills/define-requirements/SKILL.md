---
name: define-requirements
description: "Turn a context of use into stable user needs and derived requirements, and check that each requirement is fit to use at its level. Use for /define-requirements, after discovery, or when needs, features, and build stories are being mixed together."
disable-model-invocation: true
---

# Define Requirements

Read [the evidence contract](../design-product/references/evidence-and-decisions.md) and the requirement checks in [the workflow reference](../design-product/references/workflow.md).

1. Write user needs before requirements. A need names who, what they need to do, and why. Add the trigger or constraint when it is known. Needs stay broader and more stable than a feature.
2. Classify each need as given, observed, inferred, or unknown. Do not upgrade a stakeholder request into an observed need.
3. Derive requirements from those needs. Each requirement states one capability, quality, or constraint, only as detailed as the evidence supports. Do not freeze an implementation. Read [principle-make-it-testable](../principle-make-it-testable/SKILL.md): say how each would be checked, and give quality requirements such as accessibility, privacy, performance, and reliability an observable result or mark the target unknown.
4. Use unknown for missing policy, numbers, or feasibility. Record trade-offs as **proposed** and name the person who can accept them.
5. Check the set for contradictions and for requirements that no need supports.

Do not write user stories or business rule catalogues here. Stories belong to `map-stories` and `specify-build`; detailed rules belong to `define-rules`.

**Reply:** the needs, the requirements that follow from them, and any check a requirement failed.
