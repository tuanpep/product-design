# Proposal format

Follow [the output standard](output-standard.md). Start with a title and its decision header. Use the exact level-two headings below. Write concise prose or tables; put evidence status next to consequential claims. Retain every heading, but explain sections deferred by the profile in one sentence rather than filling space. Discovery can be short; do not invent a product to fill the template.

1. **Recommendation.** Proposed direction, the principle that decides the main trade-off and the principle it costs, reversal condition, and decision owner. Use [the principles](principles.md).
2. **Problem and outcome.** People, context, current experience, problem evidence, intended outcome, baseline if known, and measurement plan.
3. **Evidence and unknowns.** Source-linked observations, given context, inferences, assumptions, and the tests or owners for consequential gaps.
4. **Needs and requirements.** Stable needs, derived requirements and constraints, evidence/source references, and proposed rule approvals.
5. **Options.** Existing/no-build baseline, credible alternatives, comparison criteria, recommendation and rejected options.
6. **Product experience.** Entry and exit, main and exception journeys, the to-be process, user roles, accessibility, service/support handoffs, data and system boundaries. Summarize and link `screens.md`, `prototype.drawio`, `context.drawio`, and the other diagrams with the question each answers; do not copy their content here.
7. **Evaluation plan.** Reversing assumption, research question, method, participants/reviewers, observations, decision criteria, owner, and limitations. State plan versus actual result.
8. **First useful release.** The named slice, in/out scope, the first-release line of the story map, the key acceptance outcomes and their checks, transition or rollout implications, and measurable signals. Link `build-spec.md` for the full stories, rules, domain model, and traceability.
9. **Review and next steps.** Separate design coherence, evidence confidence, and delivery readiness. Name the next gate: stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice. Identify unresolved contradictions, risks, next tests, and human decisions. Use the explicit labels `Design coherence:`, `Evidence confidence:`, and `Delivery readiness:`.
10. **Decision history.** Date, change in premise, prior decision, new decision and its status. On the first pass, record the initial recommendation.

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

**Needs and requirements:** retain stable needs and derived capabilities, qualities, and constraints with evidence status, source/need references, and approval status for proposed rules. Use the requirement checks in [workflow.md](workflow.md). Keep needs distinct from build stories.

**Evaluation plan:** name the reversing assumption, method, participants or reviewers, task/procedure, observations, support/weaken/reverse criteria, owner, and limitations. Label it planned until performed.

**First useful release:** for build-slice, summarize the slice and link `build-spec.md`, which retains `need → requirement/rule → story → acceptance outcome → check` references and dependencies. For evaluation, distinguish disposable learning work from deferred production scope, and link a draft `build-spec.md` if one exists. For discovery, explain why a release is not specified.

Link each `.drawio` file under the section it supports, with the question it tests. An artifact is not a replacement for explaining its assumptions, branches, and evidence.
