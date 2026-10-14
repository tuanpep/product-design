---
name: review-design
description: "Skeptically review a product design proposal for contradictions, unsupported claims, missing journeys, and readiness of its next release. Use for /review-design at handoff or after revising a design."
disable-model-invocation: true
---

# Review Design

Read the full proposal, every file in its package folder, and [the principles index](../design-product/references/principles.md). Read the leaf for any principle you say the proposal violates or satisfies.

1. Check that the recommendation addresses the cause rather than merely delivering the original feature request.
2. Check that an alternative and the current baseline were considered, that claims have the stated evidence, and that the first release reaches a useful outcome.
3. A consistent proposal can still violate a higher principle. Name that principle and the choice it should have changed.
4. Compare rules, role permissions, journeys, copy, exceptions, measures, and acceptance examples for contradictions. Check that operations, transition, and accessibility needs have owners where relevant.
5. Check [the output standard](../design-product/references/output-standard.md): header/profile/gate agreement, retained needs and requirements, evidence links, traceability through acceptance outcomes and checks, artifact agreement, and decision history. A discovery proposal need not invent release stories. Unresolved blockers to a named slice prevent a ready verdict.
6. Check the package across files ([principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md)): the files the profile requires exist; every screen and state in `screens.md` has a frame across the prototype files and serves a story; every diagram agrees with the text it draws: the ERD files with Domain model, the state files with States and lifecycle, the sequence and context files with Integrations and data, and the data-flow files with personal data, controls, and open questions; a Draw.io file holds one close flow, stays within the size rule in [drawio-file.md](../drawio/references/drawio-file.md#one-file-per-close-flow), and its edges follow [Edges do not overlap](../drawio/references/drawio-file.md#edges-do-not-overlap); every Must story has Given, When, Then criteria with concrete values and a check ([principle-make-it-testable](../principle-make-it-testable/SKILL.md)); every screen and lifecycle names its error, empty, and denied states ([principle-design-every-state](../principle-design-every-state/SKILL.md)); each term, rule, and message is defined once and referenced by ID; reversible open questions have a proposed default and owner, and blocking ones are not hidden behind a default ([principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md)); content is realistic, not placeholder ([principle-use-real-content](../principle-use-real-content/SKILL.md)).
7. Act as a builder reading `build-spec.md` cold. List each place you would have to guess. A guess on a reversible choice needs a default. A guess on a blocking choice keeps the spec at draft.
8. Correct inconsistencies in the owning file before reporting. State which checks actually ran; structural validation is not a semantic review or user test.

Report three independent verdicts:

- **Design coherence:** coherent, or partial with specific contradictions.
- **Evidence confidence:** supported, mixed, or untested, naming the decisive assumptions and actual observations.
- **Delivery readiness:** ready for a named next slice, conditional on named decisions, or not ready with the blocking reason.

Never equate a coherent proposal with successful user testing, approved policy, engineering feasibility, or permission to build. State the next step with the gates in [the workflow reference](../design-product/references/workflow.md): stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice. A coherent, fully specified slice can still be untested.

**Reply:** the three verdicts, the principle a contradiction violated, and the smallest next test or human decision that changes the verdict.
