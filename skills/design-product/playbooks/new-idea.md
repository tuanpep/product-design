### New idea

**You own the proposal, not the decision to build.**

**Level.** Before any step, if the person did not name how far to go, stop and ask. Do not frame the problem, inspect the project, or write a file until they answer. Ask this, and nothing else:

Which level should this run stop at?

1. **Understand.** Problem, needs, and whether to continue. Only `product-design.md`.
2. **Design documents.** The proposal, the journey, and the process. No screens.
3. **Sketch.** Rough screens in `sketch.drawio`, then a stop to choose the layout.
4. **Prototype.** Screens and a Draw.io prototype. The layout is marked **proposed**.
5. **Full.** The whole package in one pass, including the build spec.

"Brainstorm" means Understand. "The whole package" means Full. If they already named a level, use it and do not ask. Run only the steps of that level. After the last of those steps, do Check on what was written. An earlier stop still wins: if `decide-next` says stop or repeat discovery, write `product-design.md` and stop even when the level is later.

**Understand**

1. `frame-problem`. Keep the proposed feature distinct from the need. Read [principle-start-from-the-outcome](../../principle-start-from-the-outcome/SKILL.md).
2. `map-stakeholders`. Name the actors, the hardest realistic user, and the decision owners.
3. `discover-needs`. Inspect supplied material and the target project's relevant context, including any existing product, design system, and data. Research externally only for facts that could change the recommendation. Record source links and dates.
4. `define-requirements`. Leave needs stable and broader than features.
5. `decide-next`. If the recommendation is stop or repeat discovery, write `product-design.md` and stop. Do not invent a product. If the level is Understand, stop here even when the gate is later.

**Shape**

6. `explore-solutions`. Include the current approach or no-build baseline and at least one credible alternative when there is a real choice. Read [principle-see-the-whole-service](../../principle-see-the-whole-service/SKILL.md).
7. `model-process` when more than one actor or system takes part. Write `process.drawio`, or `NN-<step>/process.drawio` in business order when the process is large. When the approach depends on other systems, `context-drawio` to write `context.drawio`.
8. `design-experience` for the recommended approach. Read [principle-behave-predictably](../../principle-behave-predictably/SKILL.md). Write `journey.drawio` when a few sentences cannot make the journey's decisions, exceptions, or handoffs clear. A second outcome is `NN-<step>/journey.drawio` in business order. If the level is Design documents, stop here.
9. If the approach has an interface, `sketch-drawio` to write `sketch.drawio`, or `NN-<actor>-<task>/sketch.drawio` in business order when the board would be large. If it has none, say so under Product experience and skip to step 12. Skip this step when the level is Understand or Design documents.
10. **Shape checkpoint.** Write `product-design.md` so far, then stop and show the sketch. Ask one question: which layout option to take, if any is open, and whether the screens and their order are right. Continue on the person's answer and record it in the decision history. This stop is the end when the level is Sketch. Skip it when the level is Prototype or Full: pick the option the deciding principle favours, label it **proposed**, and say so in the reply.
11. Run this when the level is Prototype or Full, or after the person answers the layout question. `design-screens` and `write-content` to write `screens.md` from the agreed sketch, then `prototype-drawio` to write `prototype.drawio`, or `NN-<actor>-<task>/prototype.drawio` in the same step folder when the board would be large. If the level is Prototype, stop after step 12.
12. `plan-evaluation` for the assumption that would reverse the recommendation. Use the sketch or prototype as test material where it fits. Record the plan as a plan.

**Specify**

13. Only when the level is Full. If the direction is chosen and a slice is worth specifying: `map-stories`, `model-domain`, `define-rules`, then `specify-build` to write `build-spec.md`. Draw what the package table calls for: `erd-drawio`, `state-drawio`, `sequence-drawio`, and `dataflow-drawio`, each linked from its build-spec section. Read [principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md): give reversible questions a proposed default and keep irreversible or harmful ones blocking. Use `Status: ready` only when no blocker remains. Otherwise `Status: draft` with the blockers and their owners. If the slice is not yet worth specifying, explain why under First useful release.

**Check**

14. Write `product-design.md` using [the proposal format](../references/proposal-format.md), linking every package file. Then `review-design` across the whole package and `decide-next`. Fix contradictions in the owning file before reporting.

A small idea can satisfy a skill in a few sentences. A skipped step stays visible with the reason. Do not block a useful proposal on facts the agent cannot obtain. If two goals conflict and a reversible default cannot be defended, ask one focused question. Otherwise recommend a labeled provisional choice and continue.

**Reply:** the recommendation, the files written, the principle that decided the trade-off and the choice it changed, the strongest evidence, the weakest assumption, the proposed defaults to review, and the next human decision.
