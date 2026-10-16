### New idea

**You own the proposal, not the decision to build.**

**Context first.** Apply [the discovery interview and context gate](../references/discovery-interview.md). Reuse supplied context, interview for missing core facts, and stay in Understand until it passes. When an interview was needed, summarize and obtain human confirmation before Shape. If questions are explicitly forbidden, return only discovery summary, gaps, and research plan, then stop.

**One phase per run.** After the context gate, run only the current phase, then stop. The next phase starts only when this message approves the previous phase or asks to brainstorm that next phase.

| Phase | Opens when | Writes | Stops before |
| --- | --- | --- | --- |
| Understand | A new idea, or no approved discovery | `product-design.md` through needs and `decide-next` | Shape |
| Shape | The person approved Understand, or asked to brainstorm solutions or screens | Alternatives, journey, process, and, unless the level stops earlier, `screens.md` and `mockup.drawio` | Specify |
| Specify | The person approved Shape, or asked to brainstorm the slice or build spec | `build-spec.md` | Technical design |
| Technical | `/technical-design`, and the person approved Specify or asked to brainstorm the technical design | `technical-design.md` and the included views | Production code |

A request to design the product, run Full, or advise is not approval and is not a brainstorm. Confirming an interview summary is not approval to enter Shape. If neither approval nor a brainstorm for the next phase is in this message, write the current phase and ask for one of those two. Do not ask that question and then continue in the same run.

**Advise mode.** Subject to the phase gate and the context gate, when [advise mode](../references/advise-mode.md) is on, recommend each open choice inside the current phase, label it **proposed**, and stop at the end of that phase.

**Level.** A named level caps artifacts inside the open phase. It does not open the next phase. When this message opens Shape and names no cap, run Shape through the mockup, then stop. Do not ask a level question and continue in the same run.

1. **Understand.** Problem, needs, and whether to continue. Only `product-design.md`.
2. **Design documents.** Inside Shape: alternatives, evaluation plan, journey, and process. No screens.
3. **Mockup.** Inside Shape: screens and a Draw.io mockup, then stop.
4. **Full.** Inside Specify, after that phase is open: stories, domain, rules, and `build-spec.md`. It does not write `technical-design.md`.

"Brainstorm the solution" or "brainstorm screens" opens Shape only. "Brainstorm the slice" opens Specify only. "Brainstorm the problem" stays in Understand. If the brainstorm target is unclear, ask which phase and stop. These levels are output caps, not evidence maturity and not phase approval. For new packages, record the selected cap in the machine-readable `Level` header using one value: `understand`, `design-documents`, `mockup`, or `full`. The field remains optional for legacy compatibility; a build-slice profile requires full when Level is present. Do not retrofit absent headers or change legacy contracts silently. After the last step allowed by the open phase and its cap, do Check on what was written. An earlier stop still wins: if `decide-next` says stop or repeat discovery, write `product-design.md` and stop.

**Understand**

1. `frame-problem`. Start with the decision, owner, and uncertainty; separate user outcomes from business/service outcomes and explain their connection. Keep the proposed feature distinct from the need. Read [principle-start-from-the-outcome](../../principle-start-from-the-outcome/SKILL.md).
2. `map-stakeholders`. Name the actors, the hardest realistic user, and the decision owners.
3. `discover-needs`. Inspect supplied material and the users' current journey. Research externally only for facts that could change the recommendation. Follow [the learning loop](../references/learning-loop.md): source → observation → pattern including contradictions → finding → opportunity. Record provenance, limitations, and confidence. Choose a bounded solution-neutral opportunity before solutions; a human-confirmed hypothetical premise remains a hypothesis, not a finding. When the design target is an existing product, codebase, or service, `survey-existing` before `explore-solutions`. What that project already implements is not re-listed here.
4. `define-requirements`. Leave needs stable and broader than features.
5. `decide-next`. If the recommendation is stop or repeat discovery, write `product-design.md` and stop. Do not invent a product. If the level is Understand, stop here: retain the discovery profile and stop/repeat-discovery header, and describe any recommended future solution investigation as a next action, not a completed evaluation package.

**Shape** — only when this message approves Understand or asks to brainstorm this phase, and the context gate has passed, including confirmation when an interview was triggered. Otherwise stop after Understand.

6. `explore-solutions`. Include the current approach or no-build baseline and at least one credible alternative when there is a real choice. Read [principle-see-the-whole-service](../../principle-see-the-whole-service/SKILL.md).
   Then `plan-evaluation` **before detailed experience or screens**. Examine desirability, usability, feasibility, viability, and ethics; prioritize high-consequence, weakly supported assumptions. Use question → method → artifact with least necessary fidelity. Keep partial learning materials inline in the proposal or link externally supplied material, not in the complete screen handoff. Record a plan, not claimed execution; ingest supplied results through the learning loop and revise the decision when warranted.
7. `model-process` when more than one actor or system takes part. Write `process.drawio`, or `1-<step>/process.drawio` in parent/child index order when the process is large. When the approach depends on other systems, `context-drawio` to write `context.drawio`.
8. `design-experience` for the recommended approach. Read [principle-behave-predictably](../../principle-behave-predictably/SKILL.md). Write `journey.drawio` when a few sentences cannot make the journey's decisions, exceptions, or handoffs clear. A second outcome is `2-<step>/journey.drawio`. A split of the first step is nested at `1-<step>/1.1-<substep>/journey.drawio`. If the level is Design documents, stop here.
9. If the approach has an interface, `design-screens` and `write-content` to write `screens.md`, then `mockup-drawio` to write `mockup.drawio`, or `1-<actor>-<task>/mockup.drawio` in parent/child index order when the board would be large. If it has none, say so under Product experience and skip to step 10. Skip this step when the level is Understand or Design documents.
10. Update the earlier evaluation plan for risks exposed by shaping. Use the complete mockup as test material only where the question calls for it; it is not required for every evaluation. Add post-release learning owners, measures/guardrails, review triggers, and decision responsibilities; implementation and execution are external.
11. **End of Shape.** Write `product-design.md` so far and stop. Do not start Specify in this run. In advise mode, pick the layout the deciding principle favours, label it **proposed**, and still stop. When a layout option is open in guided mode, name it as the decision the person can approve or replace next time.

**Specify** — only when this message approves Shape or asks to brainstorm this phase. Otherwise stop after Shape.

12. If the direction is chosen and a slice is worth specifying: `map-stories`, `model-domain`, `define-rules`, and `specify-build` to write `build-spec.md`. Read [principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md): give reversible questions a proposed default and keep irreversible or harmful ones blocking. Do not run `select-views`, `record-decisions`, or any view skill, and do not create `technical-design.md`, `openapi.yaml`, `asyncapi.yaml`, `erd.drawio`, `states.drawio`, `sequence.drawio`, or `dataflow.drawio`. Stop after `build-spec.md`. Name `/technical-design` as the next phase when the slice will be implemented in software, and say it waits for approval of this spec or an explicit technical brainstorm. Full may produce an honest provisional draft without executing research or pretending proof. Judge readiness proportionately to the named slice's harm, irreversibility, and uncertainty, not document polish or a demand to test every assumption. Use `Status: ready` only when no blocker remains. Otherwise `Status: draft` with the blockers and their owners. If the slice is not yet worth specifying, explain why under First useful release.

**Check**

13. Write `product-design.md` using [the proposal format](../references/proposal-format.md), linking every package file. Then `review-design` across the whole package and `decide-next`. Fix contradictions in the owning file before reporting.

A small idea can satisfy a skill in a few sentences. A skipped step stays visible with the reason. Once core context is sufficient, do not block a useful proposal on nonblocking facts the agent cannot obtain. In guided mode, if two goals conflict and a reversible default cannot be defended, ask one focused question. Otherwise, subject to the context gate, recommend a labeled provisional choice and continue. In advise mode, record the conflict and who can reverse the choice.

**Reply:** the phase just finished, the recommendation, the files written, the principle that decided the trade-off and the choice it changed, the strongest evidence, the weakest assumption, the proposed defaults to review, and that the next phase waits for approval or a brainstorm. In advise mode, state the recommendation inside this phase and still stop at the phase boundary.
