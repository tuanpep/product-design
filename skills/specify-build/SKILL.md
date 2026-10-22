---
name: specify-build
description: "Specify a chosen product design as build-spec.md, so someone else can build and check a first useful slice: stories, Given/When/Then acceptance criteria, rules, data, quality requirements, rollout, open questions, and traceability. Use for /specify-build, or when writing stories, acceptance outcomes, and verification."
disable-model-invocation: true
---

# Specify Build

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it. Assemble existing authoritative material; do not repeat unchanged modeling passes. Use [quality scenarios](../design-product/references/quality-scenarios.md) for consequential quality targets, inline in Quality requirements.

Check the proposal's optional Level header first. Only `Level: full` permits `build-spec.md`; absence retains legacy behavior. At understand, design-documents, or mockup, defer this file and keep evaluation's next gate at test solutions, not specify a slice. Do not silently raise the requested output level. Build-slice requires full when Level is present. Level permits deliverables; it does not establish evidence confidence or readiness.

Use the story shape and requirement checks in [the workflow reference](../design-product/references/workflow.md) and selective triggers/precedence in [the principles index](../design-product/references/principles.md). Testability and reversible defaults are relevant candidates, not compulsory extra loads. Read a leaf before claiming the slice meets its principle.

1. Name the slice and its first useful outcome. State what is in, what waits, and what is not being done.
2. Use the story map from `map-stories`, the domain model from `model-domain`, and the rule catalogue from `define-rules`. If one of those three is missing and the slice needs it, run that skill first. Do not run `select-views` or any view skill, and do not create `technical-design.md`. When that file already exists, link it, the mockup files, the build diagrams, and the contract files rather than restating them. Leave Correspondences and the technical design status to `/technical-design`.
3. For each Must story, write acceptance criteria as Given, When, Then with concrete values from the user's side. Cover the main outcome, each denial a rule can cause, and the recovery. Link each to its need, requirement, rule, and screen. Keep implementation choices out.
4. Split a story that cannot be built and checked inside one iteration.
5. For every important behaviour, name the check: method, expected observable result, and responsible role. Separate planned checks from completed results.
6. Write quality requirements the slice depends on: accessibility target and checks, privacy, security, performance, reliability, and the analytics events that measure the outcome. Use unknown instead of an invented number.
7. Write rollout and verification: transition from the current service, data migration, rollout and rollback, support readiness, and the definition of done. Under that same heading, hand off post-release learning with an owner, baseline or unknown, outcome data source, guardrails, review cadence or trigger, and decision actions (continue, change, rollback, stop). Mark measurement as planned until results exist; do not invent data. This adds neither a production stage nor a mandatory document. See [GOV.UK measuring success](https://www.gov.uk/service-manual/measuring-success).
8. List every assumption and open question in one table. Give a reversible one a **proposed** default and an owner. Keep one that is irreversible or touches safety, money, law, or privacy as blocking. In advise mode, write a recommended default for that blocking question too, label it **proposed — owner must confirm**, and do not pause the run. It still prevents `Status: ready`.
9. Fill the traceability table and check it: no Must story without a need, no acceptance outcome without a check, no rule without an owner.
10. Apply [the content handoff checks](../design-product/references/content-quality.md#reconcile-at-handoffs). Reconcile affected M IDs, labels, notification wording, and existing mockup instances after rules, permissions, and lifecycles settle. The catalogue remains in `screens.md`, or Product experience in the proposal without screens. Update in-scope representations, or list stale dependent messages/files, owners, and the required update. Do not claim the affected use is ready while copy promises an outcome or recovery the spec does not permit.

Write `docs/product-design/<slug>/build-spec.md` using [the build spec format](../design-product/references/build-spec-format.md). Use `Status: ready` only when no blocking question remains. Otherwise use `Status: draft`. Summarize the slice under First useful release in `product-design.md` and link the spec.

The slice must be able to meet the principles it claims. If a higher principle cannot be met in this slice, say so and whose problem remains. A specified slice is **proposed** until a person decides to invest. Do not write production code. Do not treat the specification as proof that users succeed or as permission to launch.

**Reply:** the slice outcome, what waits, the stories and key acceptance criteria, the blocking questions and their owners, the proposed defaults, and any principle this slice cannot yet meet.
