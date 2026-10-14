# Build spec format

`docs/product-design/<slug>/build-spec.md` is the implementation handoff for one named slice. Engineers, testers, and designers should be able to build and check the slice from it without guessing. It follows [the output standard](output-standard.md), keeps every ID from `product-design.md`, and is written by `specify-build` with `map-stories`, `model-domain`, and `define-rules`.

Start with a title and this header:

```text
Standard: build-spec/1.0
Status: draft | ready
Slice: the named slice
Updated: YYYY-MM-DD
Source: product-design.md
```

Choose one status. **draft** means blockers remain, and each is listed under Assumptions and open questions. **ready** means no blocking question remains and `product-design.md` names this slice as ready. Ready is still a proposal for a person to invest in, not approval to build or launch.

Use these level-two headings in order. Keep each one. A heading that does not apply to the slice says why in one sentence.

```markdown
## Overview
## Glossary
## Roles and permissions
## Domain model
## States and lifecycle
## Business rules
## Screens and navigation
## Stories and acceptance criteria
## Integrations and data
## Quality requirements
## Rollout and verification
## Assumptions and open questions
## Traceability
```

**Overview.** The slice outcome, who it serves, what is in and out of scope, and a link to the proposal. Two paragraphs at most.

**Glossary.** Each term once: definition, example, and synonyms to avoid.

**Roles and permissions.** Actions as rows, roles as columns, each cell allowed, denied, or conditional with the rule ID.

**Domain model.** Entities, key attributes (meaning, required, example, source, sensitivity), relationships with cardinality, and the system of record. Link `erd.drawio` when it is drawn. A physical schema appears only on its physical page, as a **proposed** design that follows the target project's conventions; no framework choices, SQL, or migrations.

**States and lifecycle.** For each entity with a lifecycle: state, meaning, allowed next states, trigger and actor, guarding rule, side effect. Link `states.drawio` when it is drawn.

**Business rules.** The catalogue with IDs, decision tables, and examples that pass, are denied, and sit on the boundary. Owner and approval status for each.

**Screens and navigation.** A summary and a link to `screens.md` and `prototype.drawio`. Do not restate screen content.

**Stories and acceptance criteria.** The story map with the first-release line, then each Must story:

```text
S1 As a nurse, I need to ask a qualified colleague to cover my shift, so that the roster stays right without chat.
Serves: N1, R2 · Rules: BR1, BR2 · Screens: SC1, SC2 · Depends on: roster read access (I1)
A1 Given Lan is qualified for Ward 4B nights and has 36 hours this week
   When I ask Lan to cover my 12-hour Thursday night
   Then Lan receives the request and my shift shows "Waiting for Lan"
A2 Given Lan has 40 hours this week
   When I ask Lan to cover the same shift
   Then I see M1 and can choose another colleague
Checked by: C1 (tester, scripted walkthrough), C2 (rule unit check by engineer)
```

**Integrations and data.** Each integration: direction, data, trigger, frequency, failure behaviour, owner, feasibility evidence class. Personal data: purpose, visibility, proposed retention. Link `context.drawio` and `sequence.drawio` when they are drawn.

**Quality requirements.** Accessibility target and checks, privacy, security, performance, reliability, and observability or analytics events, each measurable or marked unknown. Link `dataflow.drawio` when it is drawn, and review each trust boundary crossing it lists.

**Rollout and verification.** Transition from the current service, data migration, rollout and rollback, support readiness, how the outcome will be measured, and the definition of done.

**Assumptions and open questions.** One table: ID, question or assumption, proposed default if reversible, blocking or not, owner, and what changes if it is wrong.

**Traceability.** One row per acceptance outcome: need, requirement, rule, story, acceptance outcome, check. Every Must story appears. No row has an empty need or check.
