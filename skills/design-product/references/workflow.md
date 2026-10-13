# Workflow and gates

The method follows [ISO 9241-210:2019](https://www.iso.org/standard/77520.html), the [Design Council Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), and the [GOV.UK service phases](https://www.gov.uk/service-manual/agile-delivery). It is not a claim of compliance. Design repeats. New evidence can send the work back to an earlier skill. When two options conflict, [the principles](principles.md) decide which outcome wins. The sequence below does not.

## What each skill owns

1. `frame-problem` separates the proposed feature from the people, problem, and outcome, and sets the discovery goal.
2. `discover-needs` describes the context of use: users, tasks, environment, constraints, and the current journey. It does not build the service.
3. `define-requirements` turns that context into stable user needs and derived requirements.
4. `decide-next` chooses stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice.
5. `explore-solutions` compares the current path, reuse, non-software options, and product options, including the assumption that would reverse the choice.
6. `design-experience` describes the chosen approach across the whole journey.
7. `plan-evaluation` plans the smallest real test of that reversing assumption. A plan is not a result.
8. `specify-build` communicates the design to implementers as a first useful slice with stories, acceptance outcomes, and checks.
9. `review-design` checks coherence, evidence, and delivery readiness separately.

A small idea can satisfy a skill in a few sentences inside the same proposal. Do not open a second document per skill.

## Two gates

**Continue learning.** Discovery showed a problem worth more investigation. The next work is prototypes of the riskiest assumptions. Those prototypes are disposable. This is not permission to build the service.

**Ready for a named build slice.** The need, chosen approach, stories, acceptance outcomes, and checks are specified well enough for a person to decide to invest. This is the handoff in ISO 9241-210 for communicating a design to implementers. It is not permission to launch, and it is not evidence that users succeed.

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

Follow [GOV.UK's user-story guidance](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories). A story names who, what they need to do, and why. The goal is the part that says when the need is met. Acceptance outcomes say "it's done when…" from the user's side. Keep implementation choices out of those outcomes. Split a story that would take more than one iteration. Link each story to the need it serves.
