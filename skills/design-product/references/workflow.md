# Workflow and gates

The method follows [ISO 9241-210:2019](https://www.iso.org/standard/77520.html), the [Design Council Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), and the [GOV.UK service phases](https://www.gov.uk/service-manual/agile-delivery). It is not a claim of compliance. Design repeats. New evidence can send the work back to an earlier skill. When two options conflict, [the principles](principles.md) decide which outcome wins. The sequence below does not.

## What each skill owns

[The learning loop](learning-loop.md) owns research synthesis, opportunity selection, question-led evaluation, supplied-result ingestion and decision revision, and post-release learning handoff. It distinguishes context sufficiency, evidence confidence, specification completeness, and human approval. The four requested levels cap outputs, not evidence maturity; Full can remain a provisional draft. "Brainstorm" can mean problem or solution exploration: ask if unclear and keep the context gate intact.

First apply [the discovery interview and context gate](discovery-interview.md), the single policy for sufficient context. It overrides level selection, advise continuation, proposed defaults, and the gates below. Resolve core gaps in Understand before asking a missing guided level or entering Shape. If an interview was triggered, confirm the summarized understanding before Shape. Explicitly refusing questions with insufficient context permits only discovery summary, gaps, and research plan, then a stop.

The work moves through four stages. Each stage can send the work back to an earlier one. On a new idea in guided mode, resolve missing core context, then ask which level to run before Shape, unless the person already named one: Understand, Design documents, Mockup, or Full. Do not start a stage past that level. The levels are defined in [new-idea.md](../playbooks/new-idea.md). After the context gate passes, [advise mode](advise-mode.md) runs the named level, or Full when none is named, recommends each open choice, and does not pause for level or layout decisions. The person still reviews the proposal afterward.

**Understand** (discovery)

1. `frame-problem` names the decision, owner, uncertainty, and discovery goal; separates the proposed feature from the people/problem, and user outcomes from business/service outcomes.
2. `map-stakeholders` names the actors, the hardest realistic user, decision owners, and conflicting goals.
3. `discover-needs` describes the context of use: users, tasks, environment, constraints, and the current journey. Synthesize source → observation → pattern including contradictions → finding → opportunity, preserving provenance and uncertainty. Select a bounded solution-neutral opportunity before solution generation. Hypothetical premises remain hypotheses, not findings. It does not build the service.
4. `define-requirements` turns that context into stable user needs and derived requirements.
5. `decide-next` chooses stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice.

**Shape** (evaluation)

6. `explore-solutions` compares the current path, reuse, non-software options, and product options, including the assumption that would reverse the choice.
   Then `plan-evaluation` **before detailed experience/screens**: consider desirability, usability, feasibility, viability, and ethics; select priority questions and capable methods before least necessary artifacts/fidelity. Design documents includes this plan before its stop. Default partial learning material to inline proposal content or externally supplied links, not `screens.md`.
7. `model-process` maps the as-is and to-be process across actors when more than one acts. `context-drawio` draws the product, its users, and the systems it depends on when it touches other systems.
8. `design-experience` describes the chosen approach across the whole journey.
9. `design-screens` and `write-content` turn the journey into screens, states, and words.
   Before mockups, audit entry → collection/find → detail → action → outcome → return/handoff for every in-scope actor task. Repeated-record tasks need a populated list/table/queue screen with explicit row navigation and updated-status return, not just forms and success panels. Explain a genuinely unnecessary collection in Navigation map instead of adding irrelevant CRUD. Record the UI baseline and page archetypes in `screens.md` using [screens-format.md](screens-format.md).
10. At Mockup or Full, `mockup-drawio` draws every screen and state from `screens.md` with product-styled basic shapes, matching the project's UI or the default component palette. At Mockup in guided mode, when a layout option is open, a person reviews the mockup. At Full or in advise mode, recommend a proposed layout and continue; neither bypasses the context gate.
11. Update the earlier evaluation plan for new risks. A plan is not a result. Ingest supplied results through the learning loop, compare with prior criteria and revise the earliest affected decision; never fabricate actual execution. Add post-release learning ownership, user and business/service measures, harm guardrails, review cadence/triggers, and decision responsibilities. Implementation and live research execution are external.

**Specify** (build slice)

12. `map-stories` arranges the work as a story map and draws the first-release line.
13. `model-domain` writes the glossary, entities, lifecycle states, and integrations. Then, when the package table calls for them, `erd-drawio` draws the entities and a proposed schema, `state-drawio` the lifecycles, `sequence-drawio` the integrations that can fail, and `dataflow-drawio` the personal data and trust boundaries. Each draws the text; a difference is fixed in the text first.
14. `define-rules` writes the business rule catalogue with decision tables and examples.
15. `specify-build` assembles `build-spec.md` with acceptance criteria, quality requirements, rollout, open questions, and traceability.

**Check**

16. `review-design` checks coherence, evidence, and delivery readiness separately, across every file in the package.
    Check workflow coverage and UI fidelity separately: trace each task from actual entry through completion and revisit; compare the persistent shell, page hierarchy, component grouping, density, and tokens with the recorded UI baseline. Require every declared populated collection view in the mockup. A valid XML file, attractive palette, or component specimen board alone cannot pass this review. Use the [layout audit](../../mockup-drawio/references/product-layouts.md#handoff-audit); report missing references and uninspected rendering as limitations rather than claiming product fidelity.

A small idea can satisfy a skill in a few sentences. Write into the package files named in [the output standard](output-standard.md). Do not open a new document per skill.

## Two gates

**Continue learning.** The sufficient-context gate passed and discovery showed an opportunity worth more investigation. Choose the riskiest question, then the method and smallest material capable of answering it. This may be an interview guide, inline concept/scenario, supplied-data analysis, or externally owned specialist investigation, not necessarily screens or a full mockup. A partial learning prototype is disposable and does not replace complete `screens.md` / `mockup.drawio` coverage when those artifacts are produced. This is not permission to build the service.

When the direction is chosen and the cap is Full, do not stop at "specify a slice" if the slice is worth specifying. Draft `build-spec.md` with `Status: draft`, give reversible questions a proposed default ([principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md)), and list the remaining blockers with owners. Lower caps do not require a build spec or release stories. The gate rises to ready only when no blocker remains; readiness is proportionate to the slice's harm, irreversibility, uncertainty, and accepted risk, not a requirement to test every assumption.

**Ready for a named build slice.** The need, chosen approach, stories, acceptance outcomes, and checks are specified well enough for a person to decide to invest. Retain their traceability in the document. Unresolved safety, policy, feasibility, or ownership issues that block this slice prevent a ready verdict. Untested non-blocking assumptions remain visible; a planned test is not a completed result. This is the handoff in ISO 9241-210 for communicating a design to implementers. It is not permission to build or launch, and it is not evidence that users succeed. Match document depth and header to [the output standard](output-standard.md).

Stopping is a valid outcome when nothing viable would improve on what exists, a hard constraint blocks a better outcome, or an existing path already solves the problem.

## Requirement checks

Use these when writing a requirement, at the level of detail the evidence supports. They paraphrase [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html) clauses 5.2.5 and 5.2.6. Do not copy the standard, and do not invent precision to satisfy a check.

Each requirement is:

- **Necessary** — removing it leaves a real gap that no other requirement covers.
- **Appropriate** — detailed enough for this level, without freezing an implementation.
- **Unambiguous** — open to one interpretation.
- **Complete** — understandable without unspoken information.
- **Singular** — one capability, quality, or constraint.
- **Feasible** — believable within known constraints; say unknown when feasibility is not established.
- **Verifiable** — worded so a person can tell whether it was met.
- **Correct** — a fair statement of the need it came from.
- **Conforming** — written in the same shape as the other requirements in the proposal.

The set is complete for the stated scope, consistent, feasible as far as known, comprehensible, and able to be validated against the original need. A missing fact stays **unknown**.

## Story shape

Follow [GOV.UK's user-story guidance](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories). A story names who, what they need to do, and why. The goal is the part that says when the need is met. Acceptance outcomes say "it's done when…" from the user's side, written as Given, When, Then with concrete values ([principle-make-it-testable](../../principle-make-it-testable/SKILL.md)). Include a denied or boundary outcome for every rule the story touches. Keep implementation choices out of those outcomes. Split a story that would take more than one iteration. Link each story to the need it serves, the rules it applies, and the screens it uses.
