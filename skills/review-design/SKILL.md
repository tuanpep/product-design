---
name: review-design
description: "Skeptically review a product design proposal for contradictions, unsupported claims, missing journeys, and readiness of its next release. Use for /review-design at handoff or after revising a design."
disable-model-invocation: true
---

# Review Design

Read the full proposal, every file in its package folder, and [the principles index](../design-product/references/principles.md). Read the leaf for any principle you say the proposal violates or satisfies.

First establish the requested level, profile, next gate, and actual scope from [the output standard](../design-product/references/output-standard.md). Apply its optional Level header and intentional deferral rules; absent Level retains legacy behavior. Do not demand build-spec, release stories, acceptance criteria, or complete screen artifacts when legitimately absent at that level/profile. Review supplied partial learning material against its question, not the complete-screen contract. Existing complete screen handoffs still require full screen/state coverage; do not excuse accidental gaps as learning material.

1. Check that the recommendation addresses the cause rather than merely delivering the original feature request.
2. Check the decision and distinct user/business-service outcomes, the source → observation → pattern (including contradictions) → finding → opportunity chain, and opportunity selection before solutions, using [the learning loop](../design-product/references/learning-loop.md). Hypothetical premises must not masquerade as observed findings. When Shape is in scope, check alternatives/current baseline and evaluation planned before detailed experience/screens: risk categories, question → capable method → least necessary artifact, criteria, safeguards, owner, and limitations. For discovery-only work, review the discovery decision/research plan instead of demanding solutions. Check useful first-release outcomes only when a release is in scope.
3. A consistent proposal can still violate a higher principle. Name that principle and the choice it should have changed.
4. Compare rules, role permissions, journeys, copy, exceptions, measures, and acceptance examples for contradictions. Check that operations, transition, and accessibility needs have owners where relevant.
5. Check [the output standard](../design-product/references/output-standard.md): header/profile/gate agreement, retained needs and requirements, evidence links, traceability through acceptance outcomes and checks, artifact agreement, and decision history. A discovery proposal need not invent release stories. Unresolved blockers to a named slice prevent a ready verdict.
6. Check the package across files ([principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md)), applying only contracts in scope: files required by level/profile exist; when complete screens/mockups are produced, every screen/state in `screens.md` has a frame across mockup files and traces to a need/task (and a story when stories are in scope); every diagram agrees with its owning text. Build diagrams agree with Domain model, States and lifecycle, Integrations and data, personal data/controls and open questions when those sections exist. Draw.io files follow the close-flow, size, and [edge rules](../drawio/references/drawio-file.md#edges-do-not-overlap). When stories are in scope, every Must story has concrete Given, When, Then criteria and a check ([principle-make-it-testable](../principle-make-it-testable/SKILL.md)). Complete screens/lifecycles cover error, empty, and denied states ([principle-design-every-state](../principle-design-every-state/SKILL.md)); terms/rules/messages have one owner and ID; reversible open questions have proposed defaults and owners, blockers are not hidden behind defaults ([principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md)); content is realistic ([principle-use-real-content](../principle-use-real-content/SKILL.md)).
7. Only when a build spec is required or supplied, act as a builder reading `build-spec.md` cold. List each place you would have to guess. A guess on a reversible choice needs a default. A guess on a blocking choice keeps the spec at draft. For lower caps, judge readiness for the named learning/design decision, not fictional build readiness.
8. Correct inconsistencies in the owning file before reporting. State which checks actually ran; structural validation is not a semantic review or user test.
9. Check supplied results for provenance/method/version, attributed observations, contradictions, criteria comparison, limitations, and decision revision. A plan, stakeholder approval, or prototype artifact is not actual test execution. Check post-release learning owners, measures/guardrails, and review triggers when handing off a direction; do not claim implementation or monitoring ran. Keep context sufficiency, evidence confidence, specification completeness, and human approval separate, and assess readiness proportionately to the named slice's risks.

Report three independent verdicts:

- **Design coherence:** coherent, or partial with specific contradictions.
- **Evidence confidence:** supported, mixed, or untested, naming the decisive assumptions and actual observations.
- **Delivery readiness:** ready for a named next slice, conditional on named decisions, or not ready with the blocking reason.

Never equate a coherent proposal with successful user testing, approved policy, engineering feasibility, or permission to build. State the next step with the gates in [the workflow reference](../design-product/references/workflow.md): stop, repeat discovery, test solutions, specify a slice, or ready for a named build slice. A coherent, fully specified slice can still be untested.

**Reply:** the three verdicts, the principle a contradiction violated, and the smallest next test or human decision that changes the verdict.
