---
name: review-design
description: "Skeptically review a product design proposal for contradictions, unsupported claims, missing journeys, and readiness of its next release. Use for /review-design at handoff or after revising a design."
disable-model-invocation: true
---

# Review Design

Read the full proposal, any linked artifacts, and [the principles index](../design-product/references/principles.md). Read the leaf for any principle you say the proposal violates or satisfies.

1. Check that the recommendation addresses the cause rather than merely delivering the original feature request.
2. Check that an alternative and the current baseline were considered, that claims have the stated evidence, and that the first release reaches a useful outcome.
3. A consistent proposal can still violate a higher principle. Name that principle and the choice it should have changed.
4. Compare rules, role permissions, journeys, copy, exceptions, measures, and acceptance examples for contradictions. Check that operations, transition, and accessibility needs have owners where relevant.
5. Check [the output standard](../design-product/references/output-standard.md): header/profile/gate agreement, retained needs and requirements, evidence links, traceability through acceptance outcomes and checks, artifact agreement, and decision history. A discovery proposal need not invent release stories. Unresolved blockers to a named slice prevent a ready verdict.
6. Correct inconsistencies in the owning section before reporting. State which checks actually ran; structural validation is not a semantic review or user test.

Report three independent verdicts:

- **Design coherence:** coherent, or partial with specific contradictions.
- **Evidence confidence:** supported, mixed, or untested, naming the decisive assumptions and actual observations.
- **Delivery readiness:** ready for a named next slice, conditional on named decisions, or not ready with the blocking reason.

Never equate a coherent proposal with successful user testing, approved policy, engineering feasibility, or permission to build. State the next step with the gates in [the workflow reference](../design-product/references/workflow.md): stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice. A coherent, fully specified slice can still be untested.

**Reply:** the three verdicts, the principle a contradiction violated, and the smallest next test or human decision that changes the verdict.
