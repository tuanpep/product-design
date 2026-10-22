# Proposal format

Follow [the output standard](output-standard.md). Start with a title and its decision header; an optional `Level: understand | design-documents | mockup | full` is recommended for new packages (choose one). Absence preserves legacy behavior. Level caps artifacts, profile names the decision, and evidence confidence reports actual knowledge. Use the exact level-two headings below. Write concise prose or tables; put evidence status next to consequential claims. Retain every heading, but explain sections deferred by the profile or level in one sentence rather than filling space. Discovery can be short; do not invent a product to fill the template.

Apply [the shared content contract](content-quality.md): lead with the decision or useful result, use concrete examples, and link owning facts instead of repeating them. Record **Content baseline:** document language, intended user-facing language(s), locale(s) when relevant, and their evidence status under Evidence and unknowns. Keep a small working vocabulary under Needs and requirements until the build-spec glossary owns it. In Shape, Product experience owns relevant service copy and M entries when no `screens.md` exists; otherwise link its single catalogue. A no-screen service does not skip necessary communications, and a screen deferral does not authorize detailed interface copy.

1. **Recommendation.** Proposed direction, the principle that decides the main trade-off and the principle it costs, reversal condition, and decision owner. Use [the principles](principles.md).
2. **Problem and outcome.** People, context, current experience, problem evidence, intended outcome, baseline if known, and measurement plan.
3. **Evidence and unknowns.** Source-linked observations, given context, inferences, assumptions, and the tests or owners for consequential gaps.
4. **Needs and requirements.** Stable needs, derived requirements and constraints, evidence/source references, and proposed rule approvals.
5. **Options.** Existing/no-build baseline, credible alternatives, comparison criteria, recommendation and rejected options.
6. **Product experience.** Entry and exit, main and exception journeys, the to-be process, user roles, accessibility, service/support handoffs, data and system boundaries. Summarize and link `screens.md`, the mockup files, `context.drawio`, and the other diagrams with the question each answers; do not copy their content here. A large diagram is one file per close flow.
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

**Evaluation plan:** name the reversing assumption, method, participants or reviewers, task/procedure, observations, support/weaken/reverse criteria, owner, and limitations. Write the plan before choosing artifacts. Small inline examples or linked external learning materials can test the risky question without canonical screen files. Label it planned until performed. When results are supplied, retain their source and limitations, distinguish observation from interpretation, compare results with the criteria (support, weakening, or reversal), and state the resulting decision change or justified no-change. Update Decision history when the decision changes. Do not invent evidence or add mandatory sections. See [GOV.UK research analysis](https://www.gov.uk/service-manual/user-research/analyse-a-research-session).

**First useful release:** for build-slice, summarize the slice and link `build-spec.md`, which retains `need → requirement/rule → story → acceptance outcome → check` references and dependencies. For evaluation, distinguish disposable learning work from deferred production scope, and link a draft `build-spec.md` if one exists. For discovery, explain why a release is not specified.

At understand, use discovery only. At design-documents, deliberately defer `screens.md` and mockup files under Product experience, even for an interface option. At mockup/full, interface evaluation retains the canonical screen/state coverage in the output standard. Understand, design-documents, and mockup exclude build specs; use test solutions for capped evaluation rather than specify a slice. Only full (or legacy with no Level) permits a draft spec for specify a slice or the build-slice profile.

Link each `.drawio` file under the section it supports, with the question it tests. An artifact is not a replacement for explaining its assumptions, branches, and evidence.
