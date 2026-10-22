# Workflow and gates

Detailed compatibility/method reference. Default to [the kernel](execution-kernel.md) and [active phase pack](phase-routing.md); load only relevant sections here, not the whole workflow at every phase.

The method follows [ISO 9241-210:2019](https://www.iso.org/standard/77520.html), the [Design Council Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), and the [GOV.UK service phases](https://www.gov.uk/service-manual/agile-delivery). It is not a claim of compliance. Design repeats. New evidence can send the work back to an earlier skill. When two options conflict, [the principles](principles.md) decide which outcome wins. The sequence below does not.

## What each skill owns

[The learning loop](learning-loop.md) owns research synthesis, opportunity selection, question-led evaluation, supplied-result ingestion and decision revision, and post-release learning handoff. It distinguishes context sufficiency, evidence confidence, specification completeness, and human approval. The four requested levels cap outputs, not evidence maturity; Full can remain a provisional draft. "Brainstorm" can mean problem or solution exploration: ask which one only when the target is unclear and they have not asked to go next.

First apply [the discovery interview and context gate](discovery-interview.md), the single policy for sufficient context and for leaving Understand. On a new brief that does not ask to continue, it overrides level selection, advise, proposed defaults, and the gates below. An advance request overrides the interview, an Understand cap, and `Next gate: repeat discovery`: open the next phase, record missing facts as unknown, and do not ask another question. Forbidding questions without asking to continue permits only a discovery summary, gaps, and research plan, then a stop.

The work moves through four phases. Each phase is its own run. Finish the current phase, review what it wrote, and stop. Start the next phase when this message asks to go next, approves the previous phase, or asks to brainstorm that next phase. Naming Full, Mockup, or advise does not by itself open a later phase. Each phase can send the work back to an earlier one. Inside an open phase, a named level still caps artifacts, as [new-idea.md](../playbooks/new-idea.md) defines. [Advise mode](advise-mode.md) recommends choices inside the open phase and stops at its end unless this message already asked to go past it.

Apply [the shared content contract](content-quality.md) in every open phase: useful document prose is separate from user-facing copy. Establish language and working vocabulary in Understand; cover screens and off-screen communications in Shape; reconcile affected messages after Specify and technical decisions; propagate only affected changes on revision. This adds no new phase or mandatory artifact.

**Understand** (discovery)

The steps below share one concise proposal, not separate interviews or mandatory artifacts. Follow the discovery interview's proportionality rules: reuse relevant supplied evidence, ask only decision-changing questions, and stop interviewing once the next responsible action is clear. Unknown nonessential measures or owner names do not require another turn. Phase progression remains explicit and does not establish validation or delivery readiness.

1. `frame-problem` names the decision, owner, uncertainty, and discovery goal; separates the proposed feature from the people/problem, and user outcomes from business/service outcomes.
2. `map-stakeholders` names the actors, the hardest realistic user, decision owners, and conflicting goals.
3. `discover-needs` describes the context of use: users, tasks, environment, constraints, and the current journey. Synthesize source → observation → pattern including contradictions → finding → opportunity, preserving provenance and uncertainty. Select a bounded solution-neutral opportunity before solution generation. Hypothetical premises remain hypotheses, not findings. It does not build the service. When the target is an existing product, codebase, or service, `survey-existing` then records what that project already has and whether this design must reuse it, should reuse it, or extend it. A greenfield idea skips that survey and says why.
4. `define-requirements` turns that context into stable user needs and attributed constraints. Keep solution-dependent derived requirements provisional until Shape compares alternatives; do not expand into a production specification here.
5. `decide-next` chooses stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice.

**Shape** (evaluation)

Reuse unchanged Understand findings and opportunity rather than repeating discovery. Follow the learning loop's proportionality rules: decision-depth alternatives, no mandatory brainstorm waiting turn after an advance request, one evolving evaluation plan, and no automatic extra learning prototype. Preserve the requested cap and complete screen/view coverage when those artifacts are required.

6. `explore-solutions` compares the current path, reuse, non-software options, and product options, including the assumption that would reverse the choice. When `survey-existing` ran, the comparison starts from its must-reuse and should-reuse findings.
   Then `plan-evaluation` **before detailed experience/screens**: consider desirability, usability, feasibility, viability, and ethics; select priority questions and capable methods before least necessary artifacts/fidelity. Design documents includes this plan before its stop. Default partial learning material to inline proposal content or externally supplied links, not `screens.md`.
7. `model-process` maps the as-is and to-be process across actors when more than one acts. `context-drawio` draws the product, its users, and the systems it depends on when it touches other systems.
8. `design-experience` describes the chosen approach across the whole journey.
9. `design-screens` and `write-content` turn the journey into screens, states, and words.
   Run `write-content` for needed notifications, assisted-service instructions, and support handoffs even without screen UI. Without `screens.md`, its catalogue belongs under Product experience in the proposal. At Design documents, defer detailed interface copy and use only question-led inline examples; no-screen service communications can remain inline. Do not invent communications for discovery-only work.
   Before mockups, audit entry → collection/find → detail → action → outcome → return/handoff for every in-scope actor task. Repeated-record tasks need a populated list/table/queue screen with explicit row navigation and updated-status return, not just forms and success panels. Explain a genuinely unnecessary collection in Navigation map instead of adding irrelevant CRUD. Record the UI baseline and page archetypes in `screens.md` using [screens-format.md](screens-format.md).
10. At Mockup or Full, `mockup-drawio` draws every screen and state from `screens.md` with product-styled basic shapes, matching the project's UI or the default component palette. At Mockup in guided mode, when a layout option is open, a person reviews the mockup. At Full or in advise mode, recommend a proposed layout and continue; neither bypasses the context gate.
11. Update the earlier evaluation plan for new risks. A plan is not a result. Ingest supplied results through the learning loop, compare with prior criteria and revise the earliest affected decision; never fabricate actual execution. Add post-release learning ownership, user and business/service measures, harm guardrails, review cadence/triggers, and decision responsibilities. Implementation and live research execution are external.

**Specify** (build slice)

Apply [Specify proportionately](build-spec-format.md#specify-proportionately). Bound one outcome while retaining surrounding entry/completion and handoffs; reuse unchanged Shape decisions and keep authoritative definitions in the single build spec. Clarify rules and examples before formal acceptance criteria; unknown outcomes stay questions. Do not create separate modeling artifacts, a whole-product backlog, or exhaustive combinations merely for completeness, but justify coverage of consequential interacting conditions. Check traceability meaning, not only IDs, and distinguish agent drafting from attributed human review. Retain boundary cases and readiness blockers.

12. `map-stories` arranges the work as a story map and draws the first-release line.
13. `model-domain` writes the glossary, entities, lifecycle states, and integrations. This is the conceptual schema: business terms, no column types or URL paths.
14. `define-rules` writes the business rule catalogue with decision tables and examples. That catalogue is the algorithm view.
15. `specify-build` assembles `build-spec.md` with acceptance criteria, quality requirements, rollout, open questions, and traceability. It does not create `technical-design.md` or fill Correspondences. If that file already exists, link it and leave correspondences to `/technical-design`.
    Reconcile affected M IDs, labels, and existing mockup text after rules, permissions, and lifecycles settle. Preserve catalogue ownership and stable IDs. Update in-scope representations or name stale dependent files and their required update; contradictions cannot pass the affected handoff.

`/design-product` ends Specify here. Technical design is the next phase. Run it only when the person asks for `/technical-design` and this message asks to go next, approves the Specify phase, or asks to brainstorm the technical design. Then continue with these steps only:

Apply the [Correctness and change-safety review](technical-design-format.md#correctness-and-change-safety-review): invariant → owner → enforcement → failure behavior → transition → verification, within existing sections. Reuse applicable authoritative models and contracts; identify critical security and feasibility constraints early. The authoring order below permits targeted reconciliation, not mechanical whole-phase repetition. Newly discovered blockers withdraw dependent readiness in the technical file, build spec, and proposal; label performed versus planned checks accurately.

16. `select-views` names the design stakeholders' concerns and marks each IEEE 1016 viewpoint included or omitted. It writes `technical-design.md`. A view without a concern is not drawn. A concern without an adequate representation is a gap; cited existing text or evidence may address it without a new diagram.
17. Run only the included views, in this order, so later views can correspond to earlier ones. `design-data` adds identifiers, normalization, and the physical proposal when the internal schema is included, citing the domain model; `erd-drawio` draws both. `state-drawio` draws lifecycles. `design-composition` names the parts and, when more than one software part is owned, adds the containers page. `design-dependency` records which parts require each other and a proposed build order; external failure behaviour stays on the integration. `design-contract` writes the external schema: `openapi.yaml` for HTTP and `asyncapi.yaml` for events, from the stories and the conceptual model. `sequence-drawio` draws interactions that can fail. `design-deployment` records the environment and resources when that concern is included. `dataflow-drawio` draws where personal data crosses a trust boundary. `assess-threats` records what is protected, what can go wrong, which control applies, and the check. Each view cites the owning text; a difference is fixed there first.
18. `record-decisions` records architecturally significant technical choices, especially hard-to-reverse ones. A cheap local default stays in the open questions. Reuse unchanged business rules; revise the owning catalogue explicitly only when evidence requires it. Then fill Correspondences in `technical-design.md`.
    Map consequential integration outcomes and failures to existing M IDs. Reconcile affected copy without creating new screen flows or redrawing screens; explicitly flag missing copy and stale mockup instances for the next product revision.

**Check**

19. `review-design` checks coherence, evidence, and delivery readiness separately, across every file in the package, scoped to the opened phase and named handoff. Full alone does not require a completed Technical phase. Standalone review reports findings without editing; authorized authoring/revision preserves findings, repairs only supported in-scope facts, and rechecks dependents. A blocking unresolved decision means not ready for the affected handoff, even if investigation can proceed. When Technical is opened, supplied or claimed complete, apply its correctness/change-safety review as well as checking filled views, omission reasons and correspondences. ID existence and matching statuses are not semantic or assurance evidence.
    Report content clarity, business accuracy, journey/channel coverage, and cross-artifact consistency separately using the shared content contract. Pending requests, completed work, and unknown results must not have interchangeable confirmations or unsafe recovery advice.
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

Follow [GOV.UK's user-story guidance](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories). A story names who, what they need to do, and why. Acceptance outcomes say "it's done when…" from the user's side, as Given, When, Then with concrete values ([make it testable](../../principle-make-it-testable/SKILL.md)). Cover meaningful outcomes and material boundaries of touched rules, including denied outcomes where applicable; do not impose a denial/boundary quota on every rule. Reference shared examples, retaining consequential interacting-condition coverage. Keep implementation choices out of outcomes, split stories larger than an iteration, and trace to needs, rules and applicable screens.
