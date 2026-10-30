# Build spec: Software Requirements Specification

`docs/product-design/<slug>/build-spec.md` is the SRS for one named slice, adapted from [Documentero's SRS](https://documentero.com/templates/it-engineering/document/software-requirements-specification/). Follow [the output standard](output-standard.md), [template selection and ownership](documentero-templates.md), and [the starter](../templates/software-requirements-specification.md). New files use `build-spec/2.0`; old `build-spec/1.0` remains readable and valid for legacy packages.

## Specify proportionately

Open only at Full Specify. Bound the slice by actor, trigger, useful outcome, in/out scope and consequential denied/recovery paths. Reuse Shape decisions; do not repeat discovery, reopen settled alternatives or expand to a whole-product backlog. Story mapping, domain modeling and rules are responsibilities inside the SRS, not separate workshops/documents.

Clarify rules and examples before Given/When/Then. An unresolved expected outcome is a question/blocker, not an invented Then. Acceptance criteria express observable business behavior, not UI clicks. Cover consequential interactions and boundaries; do not mechanically enumerate all combinations or delete safety/recovery cases to shorten the file. A button or technical layer alone is not a useful slice.

## Header and sections

```text
Standard: build-spec/2.0
Status: draft | ready
Slice: the named slice
Updated: YYYY-MM-DD
Source: product-design.md
Test plan: test-plan.md
```

Choose one status. Draft retains each blocker with owner or unknown under Assumptions and dependencies. Ready means no blocking question remains for this slice, the brief names the same slice as ready, and requirements/checks/copy agree. Planned tests can remain planned when their execution is not a prerequisite to the investment decision. Ready never means tests passed, human review happened, or build/launch is approved.

Retain these seven level-two headings in order; explain genuinely inapplicable material briefly.

```markdown
## Introduction
## Overall description
## Functional requirements
## Non-functional requirements
## External interface requirements
## Assumptions and dependencies
## Appendices
```

- **Introduction:** slice outcome, actor, scope and link to the brief; two paragraphs at most.
- **Overall description:** product perspective/functions, user characteristics, Roles and permissions, Constraints and Business rules, Glossary, Domain model, States and lifecycle as needed. BR IDs own statement, source/evidence, owner/approval and pass/denied/boundary examples. Distinguish binding constraints from preferences and assumptions; retain authority/source, impact and any attributed approved exception. Unknown authority remains unknown. Domain facts include meaningful attributes, relationships read both ways, sensitivity and system of record. No architecture, physical schema, screens or diagrams.
- **Functional requirements:** R IDs, source/need, capability, priority, evidence and approval status, owner. Stories and acceptance criteria is a subsection: story map with release line, Must S IDs, serves/rules/dependencies and concrete A IDs. Link each outcome to C IDs in the plan. Do not redefine requirements in the brief.
- **Non-functional requirements:** quality R IDs with measurable targets or unknown, source/evidence, owner and C checks. Include applicable accessibility, privacy, security, performance, reliability and outcome measurement. Unknown consequential targets retain their readiness impact.
- **External interface requirements:** integration direction, data/purpose/sensitivity/visibility/retention, trigger, failure and recovery, owner and feasibility evidence. No API contracts or internal interfaces invented to match another template.
- **Assumptions and dependencies:** one compact table or keyed records using the [uncertainty lifecycle](learning-loop.md#track-consequential-uncertainty). Retain ID/reference, type, statement, source/evidence, proposed reversible default if any, blocking or not with reason, owner, impact, affected IDs and review trigger. Assumptions need a validation question/check link and assessment with evidence/version; dependencies need a resolution condition, status and resolution evidence. Move slice-specific records from the brief without duplicate owners. Derive constraints transparently; do not fabricate user needs or approvals. Keep consequential risk responses and contingencies beside their owning requirement or uncertainty, not in another report.
- **Appendices:** Rollout and verification, Requirements matrix and actual review gaps. Rollout covers transition, data migration if relevant, rollback, support, definition of done and post-release learning owner/baseline/source/guardrails/review trigger/decision actions. Procedures and actual results live in the test plan, not duplicated here.

## Requirements matrix

Adapt [Documentero's matrix](https://documentero.com/templates/it-engineering/spreadsheet/project-requirements-matrix/) as a Markdown table under `### Requirements matrix` in Appendices, not another mandatory file:

```markdown
| Need | Requirement | Priority | Source | Owner | Rule | Story | Outcome | Check | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N1 | R1 | Must | E1 in product-design.md | product owner — proposed | BR1 | S1 | A1 | C1 | planned |
```

One row per acceptance/check relationship. Every in-scope functional/quality R ID, Must S ID and A outcome appears. Every C reference is defined in the plan; each verification case links back to the requirements and outcomes it checks. No empty cells. Unknown owners are explicit. Inapplicable rule/story/outcome cells explain why; need/source/check cannot be waived. Status is planned, in-progress, passed, failed or blocked and reflects the referenced case, never desired progress. Check semantic justification in both directions; ID existence does not establish adequate coverage.

## Single ownership and review

The SRS owns requirements/rules/domain/glossary/acceptance and matrix; the plan owns procedures/results; the brief owns needs/evidence/alternatives/messages/investment history. Move earlier provisional definitions with unchanged IDs and replace them with links. Apply [content quality](content-quality.md), reconcile affected M copy, and report stale dependents instead of claiming ready. Attribute actual product/domain, engineering and testing reviews or mark gaps unknown. An agent draft cannot claim their participation.

## Research basis and adaptation boundaries

Documentero supplies the presentation structure, not evidence of effectiveness or standards compliance. Earlier method sources remain relevant: [Agile Alliance user stories](https://agilealliance.org/glossary/user-stories/), [Cucumber example mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/), [behavioral Gherkin](https://cucumber.io/docs/bdd/better-gherkin/), [collaborative review](https://cucumber.io/docs/bdd/who-does-what/), [NASA requirements management](https://www.nasa.gov/reference/6-2-requirements-management/), and [NIST combinatorial testing](https://csrc.nist.gov/projects/automated-combinatorial-testing-for-software/faqs). These support value slices, explicit questions, attributed review and meaningful bidirectional traceability; they do not establish this plugin's efficiency or test adequacy without evaluation.
