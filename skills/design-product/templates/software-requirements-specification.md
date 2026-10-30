# {{title}} — Software Requirements Specification
Standard: build-spec/2.0
Status: draft
Slice: {{slice}}
Updated: {{date}}
Source: product-design.md
Test plan: test-plan.md

## Introduction
Name the actor, trigger, useful outcome and in/out scope. Link the decision brief. Author/version metadata is attributed or unknown; this is not approval to build.

## Overall description
### Product perspective and functions
Describe the selected approach and entry/completion/handoffs. Link, rather than repeat, the brief's evidence and service copy.
### User characteristics and roles and permissions
State role/action allowances, denials and conditional rule references.
### Constraints and business rules
Define each BR ID once with source, evidence status, owner, approval status and concrete boundary examples.
Distinguish binding constraints from preferences or assumptions. Attribute constraint authority, impact and any approved exception; unknown authority stays unknown.
### Glossary, domain model, states and lifecycle
Define only slice-relevant terms, entities, attributes, relationships, system of record and allowed transitions. No physical schema or technical design.

## Functional requirements
Define each R ID with need/source, capability, priority, evidence/approval status and owner. Justify derived constraints. Preserve existing IDs.
### Stories and acceptance criteria
Define S IDs and concrete A IDs as Given/When/Then. Reference rules rather than repeating them; include consequential denied and recovery outcomes. Link C IDs in the test plan.

## Non-functional requirements
Define quality requirements with stimulus/context, observable target or unknown, source/evidence status, owner and C IDs. Cover applicable accessibility, privacy, security, performance, reliability and measurement; explain deferrals.

## External interface requirements
State integration direction, data/purpose/sensitivity, trigger, failure/recovery, owner and feasibility evidence. No API contracts or internal architecture.

## Assumptions and dependencies
Use one compact table or keyed records for consequential uncertainty: ID/reference, type, statement, source/evidence, proposed default if reversible, blocking or not with reason, owner, impact, affected IDs and review trigger. Assumptions link their validation question/check, assessment and evidence/version. Dependencies name a resolution condition, unresolved/resolved status and resolution evidence. Follow the [uncertainty lifecycle](../references/learning-loop.md#track-consequential-uncertainty); link moved records from the brief rather than duplicating them. Blocking safety, permission, policy and feasibility decisions cannot be silently defaulted.
For consequential risks, retain response owner, mitigation, contingency and residual uncertainty beside the affected item. Unknown likelihood stays unknown; no numeric score is required.

## Appendices
### Rollout and verification
Transition, rollback, support readiness, definition of done and learning owner/source/baseline/guardrails/review trigger. Link procedures/results in test-plan.md; plans are not results.
### Requirements matrix
One row per acceptance/check relationship, including quality checks where applicable. All in-scope requirements need coverage; all acceptance outcomes and Must stories appear. Use `not applicable — reason` only for genuinely inapplicable rules/stories/outcomes, never for a missing source, need or check.

| Need | Requirement | Priority | Source | Owner | Rule | Story | Outcome | Check | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### Review gaps
Attribute actual product/domain, engineering and testing reviews or mark them unknown. A generated specification is not shared understanding or user validation.
