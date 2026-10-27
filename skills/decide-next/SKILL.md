---
name: decide-next
description: "Recommend stop, learn more, test solutions, specify a slice, or hand a named slice to builders. Use for /decide-next at the end of discovery, after comparing options, or when someone asks whether to build."
disable-model-invocation: true
---

# Decide Next

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Reuse current review findings; check only changed or missing decision inputs rather than repeating a whole-package review.

Read the gates in [the workflow reference](../design-product/references/workflow.md). Recommend exactly one next step.

Apply [the learning loop](../design-product/references/learning-loop.md): when results are supplied, separate sourced observations from interpretation, explain what supported or weakened the assumption, and revise the decision rather than retaining an invalidated recommendation. A planned investigation is not a result. The output level caps deliverables, not evidence confidence or human authority.

At an explicit Understand cap that the person has not asked to leave, retain the discovery profile and stop/repeat-discovery header; describe a worthwhile future solution test under next actions rather than claiming the current package is evaluation. At Design documents or Mockup, use test solutions for evaluation and record specification as deferred. Do not output artifacts beyond the selected cap to satisfy a later gate.

First apply [the discovery interview and context gate](../design-product/references/discovery-interview.md). Missing core facts force **Repeat discovery** only when the person has not asked to leave Understand. A bare request for no questions, with no request to continue, also stays there: save only a discovery summary, gaps, research plan, and current-state notes, with `Profile: discovery` and `Next gate: repeat discovery`. An advance request clears that gate and an Understand cap. Recommend **Test solutions** unless stop is clearly right, name the missing facts as the assumptions that could reverse it, and do not ask another question. Do not require every nonblocking project detail or fabricate metrics to pass.

- **Stop.** Nothing viable would improve on what exists, a hard constraint blocks a better outcome, or an existing path already solves the problem.
- **Repeat discovery.** The problem, people, or context is still too unclear to test a solution.
- **Test solutions.** The problem is worth the cost of learning. Name the ideas to try and the riskiest assumption. This permits a disposable prototype, not the service itself.
- **Specify a slice.** A direction has been chosen, and the design is not yet verifiable enough to build. A draft `build-spec.md` should already exist, naming each blocker and its owner. Use this gate only at explicit Full or in a legacy package without Level. At a lower declared level, retain test solutions with the next learning decision and explain that specification is deferred.
- **Ready for a named build slice.** The need, approach, stories, acceptance outcomes, and checks are specified and traceable in a `build-spec.md` with `Status: ready`, well enough for a person to decide to invest. No unresolved safety, policy, feasibility, or ownership issue blocks that named slice. Untested non-blocking assumptions remain explicit as proposed defaults; use [the output standard](../design-product/references/output-standard.md).

Give the reason, its evidence class, the unknown that could reverse it, and the person who must decide. If that person is not known, say so. Do not raise the recommendation to cover a missing fact. Ready for a named build slice is not permission to launch and is not evidence of user success.

**Reply:** the one next step, why, the evidence class of that reason, and who decides.
