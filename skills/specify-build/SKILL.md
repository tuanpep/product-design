---
name: specify-build
description: "Specify a chosen product design as build-spec.md, so someone else can build and check a first useful slice: stories, Given/When/Then acceptance criteria, rules, data, quality requirements, rollout, open questions, and traceability. Use for /specify-build, or when writing stories, acceptance outcomes, and verification."
disable-model-invocation: true
---

# Specify Build

Read the story shape and requirement checks in [the workflow reference](../design-product/references/workflow.md), and the precedence in [the principles index](../design-product/references/principles.md). Read [principle-make-it-testable](../principle-make-it-testable/SKILL.md) and [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md), and the leaf for any principle the slice claims to meet.

1. Name the slice and its first useful outcome. State what is in, what waits, and what is not being done.
2. Use the story map from `map-stories`, the domain model from `model-domain`, and the rule catalogue from `define-rules`. If one is missing and the slice needs it, run that skill first. Link `screens.md`, the mockup files, and the build diagrams (ERD, state, sequence, context, and data flow, one file per close flow when a diagram is large) rather than restating them.
3. For each Must story, write acceptance criteria as Given, When, Then with concrete values from the user's side. Cover the main outcome, each denial a rule can cause, and the recovery. Link each to its need, requirement, rule, and screen. Keep implementation choices out.
4. Split a story that cannot be built and checked inside one iteration.
5. For every important behaviour, name the check: method, expected observable result, and responsible role. Separate planned checks from completed results.
6. Write quality requirements the slice depends on: accessibility target and checks, privacy, security, performance, reliability, and the analytics events that measure the outcome. Use unknown instead of an invented number.
7. Write rollout and verification: transition from the current service, data migration, rollout and rollback, support readiness, and the definition of done.
8. List every assumption and open question in one table. Give a reversible one a **proposed** default and an owner. Keep one that is irreversible or touches safety, money, law, or privacy as blocking. In advise mode, write a recommended default for that blocking question too, label it **proposed — owner must confirm**, and do not pause the run. It still prevents `Status: ready`.
9. Fill the traceability table and check it: no Must story without a need, no acceptance outcome without a check, no rule without an owner.

Write `docs/product-design/<slug>/build-spec.md` using [the build spec format](../design-product/references/build-spec-format.md). Use `Status: ready` only when no blocking question remains. Otherwise use `Status: draft`. Summarize the slice under First useful release in `product-design.md` and link the spec.

The slice must be able to meet the principles it claims. If a higher principle cannot be met in this slice, say so and whose problem remains. A specified slice is **proposed** until a person decides to invest. Do not write production code. Do not treat the specification as proof that users succeed or as permission to launch.

**Reply:** the slice outcome, what waits, the stories and key acceptance criteria, the blocking questions and their owners, the proposed defaults, and any principle this slice cannot yet meet.
