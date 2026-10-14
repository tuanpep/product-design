# Workflow and gates

The method follows [ISO 9241-210:2019](https://www.iso.org/standard/77520.html), the [Design Council Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), and the [GOV.UK service phases](https://www.gov.uk/service-manual/agile-delivery). It is not a claim of compliance. Design repeats. New evidence can send the work back to an earlier skill. When two options conflict, [the principles](principles.md) decide which outcome wins. The sequence below does not.

## What each skill owns

The work moves through four stages. Each stage can send the work back to an earlier one. On a new idea in guided mode, ask which level to run before the first stage, unless the person already named one: Understand, Design documents, Mockup, or Full. Do not start a stage past that level. The levels are defined in [new-idea.md](../playbooks/new-idea.md). [Advise mode](advise-mode.md) does not ask. It runs the named level, or Full when none is named, recommends each open choice, and does not stop for a person to decide before the next file. The person still reviews the proposal afterward.

**Understand** (discovery)

1. `frame-problem` separates the proposed feature from the people, problem, and outcome, and sets the discovery goal.
2. `map-stakeholders` names the actors, the hardest realistic user, decision owners, and conflicting goals.
3. `discover-needs` describes the context of use: users, tasks, environment, constraints, and the current journey. It does not build the service.
4. `define-requirements` turns that context into stable user needs and derived requirements.
5. `decide-next` chooses stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice.

**Shape** (evaluation)

6. `explore-solutions` compares the current path, reuse, non-software options, and product options, including the assumption that would reverse the choice.
7. `model-process` maps the as-is and to-be process across actors when more than one acts. `context-drawio` draws the product, its users, and the systems it depends on when it touches other systems.
8. `design-experience` describes the chosen approach across the whole journey.
9. `design-screens` and `write-content` turn the journey into screens, states, and words.
10. `mockup-drawio` draws every screen and state with Draw.io's Mockup shapes, so people can see the shape. In guided mode, when a layout option is open, a person reviews the mockup before Full. In advise mode, recommend a layout and continue.
11. `plan-evaluation` plans the smallest real test of the reversing assumption. A plan is not a result.

**Specify** (build slice)

12. `map-stories` arranges the work as a story map and draws the first-release line.
13. `model-domain` writes the glossary, entities, lifecycle states, and integrations. Then, when the package table calls for them, `erd-drawio` draws the entities and a proposed schema, `state-drawio` the lifecycles, `sequence-drawio` the integrations that can fail, and `dataflow-drawio` the personal data and trust boundaries. Each draws the text; a difference is fixed in the text first.
14. `define-rules` writes the business rule catalogue with decision tables and examples.
15. `specify-build` assembles `build-spec.md` with acceptance criteria, quality requirements, rollout, open questions, and traceability.

**Check**

16. `review-design` checks coherence, evidence, and delivery readiness separately, across every file in the package.

A small idea can satisfy a skill in a few sentences. Write into the package files named in [the output standard](output-standard.md). Do not open a new document per skill.

## Two gates

**Continue learning.** Discovery showed a problem worth more investigation. The next work is a mockup of the riskiest assumptions: screens, a Draw.io mockup, and a process model that people can react to. That mockup is disposable. This is not permission to build the service.

When the direction is chosen, do not stop at "specify a slice". Draft `build-spec.md` with `Status: draft`, give reversible questions a proposed default ([principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md)), and list the remaining blockers with owners. The gate rises to ready only when no blocker remains.

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
