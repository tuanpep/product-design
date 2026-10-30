# Decision brief format

Follow [the output standard](output-standard.md). New packages use product-design/1.3 with explicit Phase and Level. Older packages retain their headers unless migration is authorized. Keep the exact ten level-two headings below. Be concise; explain deferred material in one sentence. Discovery need not invent a solution to fill the template.

Start from [the decision brief](../templates/decision-brief.md); update Phase/profile/level/gate together when advancing. This brief is a plugin-specific companion, not a Documentero template claim.

Apply [content quality](content-quality.md). Record Content baseline (document language, user-facing languages/locales and evidence status) under Evidence and unknowns. Keep provisional vocabulary/rules/requirements under Needs until the SRS owns them; move definitions with IDs intact and replace them with links. Product experience owns the service-message M catalogue, including non-screen communications. No screens, mockups, diagrams or technical architecture.

```markdown
## Recommendation
## Problem and outcome
## Evidence and unknowns
## Needs and requirements
## Options
## Product experience
## Evaluation plan
## First useful release
## Review and next steps
## Decision history
```

- **Recommendation:** proposed direction, main trade-off/principle and cost, reversal condition and decision owner. Do not infer human approval.
- **Problem and outcome:** people, context, current experience/friction, problem evidence, user/service outcome, baseline or unknown and measurement intent.
- **Evidence and unknowns:** source-linked observations, given context, inferences, assumptions and consequential gaps with tests/owners. Use the [uncertainty lifecycle](learning-loop.md#track-consequential-uncertainty) for decision-changing assumptions/dependencies, including consequence, assessment or resolution condition, owner and review trigger. A supplied summary is not direct observation. At Specify link moved slice-specific records rather than keeping a second register.
- **Needs and requirements:** stable N needs, provisional R requirements/constraints at supported depth, source/evidence and approval status. Distinguish binding constraints from preferences or assumptions; attribute their authority/source and any approved exception, or mark authority unknown. Needs are not build stories. After Specify link SRS definitions rather than repeat them.
- **Options:** current/no-build baseline, credible alternatives, comparison criteria, recommendation and rejected options. Do not invent alternatives to meet a quota.
- **Product experience:** entry/completion, main and exception journeys in prose, roles, accessibility, handoffs, data/system boundaries and necessary service copy M entries. No canonical UI artifacts.
- **Evaluation plan:** in Understand keep the research question/plan inline. From Shape summarize the reversing assumption, decision implications and planned/performed state, linking `test-plan.md` as the owner of method, people/roles, neutral procedure, observations, support/weaken/reverse criteria, actual results and limitations. Do not copy its case catalogue. Use [learning-loop ingestion](learning-loop.md) for supplied results.
- **First useful release:** name the slice, in/out scope, key acceptance outcomes, checks and transition/measurement implications. At Shape explain specification is deferred. At Full Specify link the SRS and Test Plan, whose matrix/cases provide detailed coverage. Discovery does not specify a production release.
- **Review and next steps:** use the explicit labels `Design coherence:`, `Evidence confidence:`, `Delivery readiness:`. Name the next gate consistent with Phase/Level, unresolved contradictions/risks and smallest next human action. A future Specify action does not authorize an SRS in Shape.
- **Decision history:** date, changed premise and source, prior/new decision and status. For consequential changes name affected IDs/documents, which prior results remain applicable and why, which require reassessment, readiness impact, next owner and human decision status. Editing completion does not imply approval. Record the initial recommendation on first pass; preserve superseded decisions and human edits. A copy-only edit needs no impact form when it changes no behavior or premise.

Judge the named phase/handoff, not the presence of future documents. Planned tests are not results, structural validation is not semantic review, and ready documentation is not permission to build.
