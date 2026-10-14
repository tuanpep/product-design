### New idea

**You own the proposal, not the decision to build.**

**Understand**

1. `frame-problem`. Keep the proposed feature distinct from the need. Read [principle-start-from-the-outcome](../../principle-start-from-the-outcome/SKILL.md).
2. `map-stakeholders`. Name the actors, the hardest realistic user, and the decision owners.
3. `discover-needs`. Inspect supplied material and the target project's relevant context, including any existing product, design system, and data. Research externally only for facts that could change the recommendation. Record source links and dates.
4. `define-requirements`. Leave needs stable and broader than features.
5. `decide-next`. If the recommendation is stop or repeat discovery, write `product-design.md` and stop. Do not invent a product.

**Shape**

6. `explore-solutions`. Include the current approach or no-build baseline and at least one credible alternative when there is a real choice. Read [principle-see-the-whole-service](../../principle-see-the-whole-service/SKILL.md).
7. `model-process` when more than one actor or system takes part. Write `process.drawio`. When the approach depends on other systems, `context-drawio` to write `context.drawio`.
8. `design-experience` for the recommended approach. Read [principle-behave-predictably](../../principle-behave-predictably/SKILL.md). Write `journey.drawio` when a few sentences cannot make the journey's decisions, exceptions, or handoffs clear.
9. If the approach has an interface, `sketch-drawio` to write `sketch.drawio`. If it has none, say so under Product experience and skip to step 12.
10. **Shape checkpoint.** Write `product-design.md` so far, then stop and show the sketch. Ask one question: which layout option to take, if any is open, and whether the screens and their order are right. Continue on the person's answer and record it in the decision history. Skip the stop only when the person asked for the whole package in one pass; then pick the option the deciding principle favours, label it **proposed**, and say so in the reply.
11. `design-screens` and `write-content` to write `screens.md` from the agreed sketch, then `prototype-drawio` to write `prototype.drawio`.
12. `plan-evaluation` for the assumption that would reverse the recommendation. Use the sketch or prototype as test material where it fits. Record the plan as a plan.

**Specify**

13. If the direction is chosen and a slice is worth specifying: `map-stories`, `model-domain`, `define-rules`, then `specify-build` to write `build-spec.md`. Draw what the package table calls for: `erd-drawio`, `state-drawio`, `sequence-drawio`, and `dataflow-drawio`, each linked from its build-spec section. Read [principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md): give reversible questions a proposed default and keep irreversible or harmful ones blocking. Use `Status: ready` only when no blocker remains. Otherwise `Status: draft` with the blockers and their owners. If the slice is not yet worth specifying, explain why under First useful release.

**Check**

14. Write `product-design.md` using [the proposal format](../references/proposal-format.md), linking every package file. Then `review-design` across the whole package and `decide-next`. Fix contradictions in the owning file before reporting.

A small idea can satisfy a skill in a few sentences. A skipped step stays visible with the reason. Do not block a useful proposal on facts the agent cannot obtain. If two goals conflict and a reversible default cannot be defended, ask one focused question. Otherwise recommend a labeled provisional choice and continue.

**Reply:** the recommendation, the files written, the principle that decided the trade-off and the choice it changed, the strongest evidence, the weakest assumption, the proposed defaults to review, and the next human decision.
