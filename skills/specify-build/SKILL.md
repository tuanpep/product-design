---
name: specify-build
description: "Specify one useful slice using a Documentero-based SRS in build-spec.md, Test Cases in test-plan.md, and an embedded Requirements Matrix. Use for /specify-build, acceptance outcomes, requirements handoff, and verification planning."
disable-model-invocation: true
---

# Specify Build

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it. Assemble existing authoritative material; do not repeat unchanged modeling passes. Use [quality scenarios](../design-product/references/quality-scenarios.md) for consequential quality targets, inline in SRS Non-functional requirements.

Check the proposal's optional Level header first. Only `Level: full` permits `build-spec.md`; absence retains legacy behavior. At understand or design-documents, defer this file. Treat legacy `mockup` as design-documents. Do not silently raise the level. Level permits deliverables; it does not establish evidence confidence or readiness.

Use the story shape and requirement checks in [the workflow reference](../design-product/references/workflow.md) and selective triggers/precedence in [the principles index](../design-product/references/principles.md). Testability and reversible defaults are relevant candidates, not compulsory extra loads. Read a leaf before claiming the slice meets its principle.

1. Name the slice and its first useful outcome. State what is in, what waits, and what is not being done.
2. Use the story map from `map-stories`, the domain model from `model-domain`, and the rule catalogue from `define-rules`. If one of those three is missing and the slice needs it, run that skill first. Do not create screens, mockups, diagrams or technical contracts.
3. For each Must story, write acceptance criteria as Given, When, Then with concrete values from the user's side. Cover the main outcome, each denial a rule can cause, and the recovery. Link each to its need, requirement and rule. Keep implementation choices out.
4. Split a story that cannot be built and checked inside one iteration.
5. For every important behaviour, name the check: method, expected observable result, and responsible role. Separate planned checks from completed results.
6. Write quality requirements the slice depends on: accessibility target and checks, privacy, security, performance, reliability, and the analytics events that measure the outcome. Use unknown instead of an invented number.
7. Write rollout and verification: transition from the current service, data migration, rollout and rollback, support readiness, and the definition of done. Under that same heading, hand off post-release learning with an owner, baseline or unknown, outcome data source, guardrails, review cadence or trigger, and decision actions (continue, change, rollback, stop). Mark measurement as planned until results exist; do not invent data. This adds neither a production stage nor a mandatory document. See [GOV.UK measuring success](https://www.gov.uk/service-manual/measuring-success).
8. List every assumption and open question in one table. Give a reversible one a **proposed** default and an owner. Keep one that is irreversible or touches safety, money, law, or privacy as blocking. In advise mode, write a recommended default for that blocking question too, label it **proposed — owner must confirm**, and do not pause the run. It still prevents `Status: ready`.
9. Fill the Requirements matrix under SRS Appendices: need, requirement, priority, source, owner, rule, story, outcome, check, status. No in-scope requirement or Must story without justified coverage, no acceptance outcome without a C check, no rule without an explicit owner or unknown. Check both directions for meaning, not just ID existence.
10. Apply [the content handoff checks](../design-product/references/content-quality.md#reconcile-at-handoffs). Reconcile affected M IDs and notification wording in Product experience after rules, permissions, and lifecycles settle. List stale dependents when out of scope. Do not claim readiness while copy promises an outcome the spec does not permit.

Write `docs/product-design/<slug>/build-spec.md` using [the SRS format and starter](../design-product/references/build-spec-format.md), and extend `test-plan.md` using [the plan/case format](../design-product/references/test-plan-format.md). Put rules/domain/permissions/glossary in Overall description, stories/outcomes in Functional requirements, qualities in Non-functional requirements, integrations in External interface requirements, questions in Assumptions and dependencies, rollout/matrix in Appendices. Create C verification cases with preconditions, procedure, expected behavior, related R/A IDs, owner, status and actual result/evidence (not run until supplied). Preserve evaluation cases. Use `Status: ready` only when no blocking question remains; otherwise draft. Summarize/link the slice under First useful release and set Phase: specify in a new-format brief. Do not silently migrate legacy files for an unrelated revision.

The slice must be able to meet the principles it claims. If a higher principle cannot be met in this slice, say so and whose problem remains. A specified slice is **proposed** until a person decides to invest. Do not write production code. Do not treat the specification as proof that users succeed or as permission to launch.

**Reply:** the slice outcome, what waits, the stories and key acceptance criteria, the blocking questions and their owners, the proposed defaults, and any principle this slice cannot yet meet.
