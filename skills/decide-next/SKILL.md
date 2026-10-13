---
name: decide-next
description: "Recommend stop, learn more, test solutions, specify a slice, or hand a named slice to builders. Use for /decide-next at the end of discovery, after comparing options, or when someone asks whether to build."
disable-model-invocation: true
---

# Decide Next

Read the gates in [the workflow reference](../design-product/references/workflow.md). Recommend exactly one next step.

- **Stop.** Nothing viable would improve on what exists, a hard constraint blocks a better outcome, or an existing path already solves the problem.
- **Repeat discovery.** The problem, people, or context is still too unclear to test a solution.
- **Test solutions.** The problem is worth the cost of learning. Name the ideas to try and the riskiest assumption. This permits disposable prototypes, not the service itself.
- **Specify a slice.** A direction has been chosen, and the design is not yet verifiable enough to build.
- **Ready for a named build slice.** The need, approach, stories, acceptance outcomes, and checks are specified well enough for a person to decide to invest.

Give the reason, its evidence class, the unknown that could reverse it, and the person who must decide. If that person is not known, say so. Do not raise the recommendation to cover a missing fact. Ready for a named build slice is not permission to launch and is not evidence of user success.

**Reply:** the one next step, why, the evidence class of that reason, and who decides.
