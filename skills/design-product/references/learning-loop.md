# Research-led learning loop

This is the canonical policy for synthesis, opportunity selection, evaluation, supplied results, and continuing learning. [discovery-interview.md](discovery-interview.md) still owns the sufficient-context gate; [evidence-and-decisions.md](evidence-and-decisions.md) owns claim labels and authority. Write the loop into existing `product-design.md` sections, not new mandatory artifacts.

## Start with the decision and outcomes

Name the decision this work will inform, its human owner, and the uncertainty that could change it. Separate the **user outcome** (what people can accomplish in their situation) from the **business/service outcome** (why the organisation should invest or operate it). Explain their proposed connection and any conflict. Feature adoption is not automatically either outcome. Record existing baselines and sources; leave absent measurements unknown rather than inventing targets.

## Synthesize before choosing a solution

Keep a traceable chain, using existing IDs or short inline references:

1. **Source:** supplied notes, recording, research report, analytics, support record, or attributed stakeholder account; record location, date, method, audience/context, and limitations where available.
2. **Observation:** what was actually seen or heard, separate from interpretation. A stakeholder account is Given; an imagined scenario supplies no observed behaviour.
3. **Pattern:** group related observations, retaining source links, contradictions, outliers, and differences between user groups. One account is not a recurring pattern; say when recurrence is unknown. Do not discard a rare safety or exclusion concern because it is rare.
4. **Finding:** explain what the pattern may mean, its scope, confidence, competing explanations, and gaps. An interpretation remains Inferred, even when based on observations.
5. **Opportunity:** a solution-neutral unmet need, pain, or desire linked to the finding and outcomes. There should be more than one possible way to address it.

Choose a bounded target opportunity **before** generating solutions. Compare importance to users, consequence/frequency/reach where known, connection to business/service outcomes, inclusion/harm, and evidence uncertainty. Explain why this opportunity and not the others; do not invent opportunity scores or assume the requested feature is the opportunity. With only a human-confirmed hypothetical scenario, record a provisional opportunity hypothesis, not a research finding. The context gate still applies.

## Shape proportionately

Reuse the existing synthesis and bounded opportunity when their premises and source applicability remain adequate. Check relevant changes in workflow, audience, source age, and evidence quality; an unchanged document alone is not enough. Do not repeat discovery, rebuild the evidence chain, or manufacture opportunities just to show a comparison. Revisit only affected claims. A single supported opportunity needs a short rationale, not an opportunity tree or scoring exercise.

Compare approaches at decision-making depth before detailing the proposed one. Reuse the known current approach as the baseline; include reuse and non-software changes where credible. Alternatives must differ in how they achieve the outcome, not merely in layout. Do not pad a fixed option count, invent implausible competitors, or fully design rejected options. Develop alternatives only as far as needed for a defensible comparison: a rough sketch, walkthrough, data review, or planned specialist investigation may be needed. Do not reject an uncertain alternative just because the preferred option is more developed. If only one direction remains, explain the evidence or binding constraints excluding plausible alternatives; distinguish verified constraints from preferences and assumptions. Record trade-offs and the assumption that could reverse the recommendation in the proposal, not a separate comparison document.

Generate and evaluate separately, but not necessarily in separate conversation turns. Use ideas already supplied. After an advance request or in advise mode, propose options and a recommendation in that run rather than waiting for the human's ideas or repeating discovery. Unknown core facts stay unknown; hypothetical alternatives are not evidence.

## Question → method → artifact

After comparing alternatives and before detailed experience or screens, use `plan-evaluation`. Identify assumptions across **desirability, usability, feasibility, viability, and ethics**. Prioritize those with serious consequences and weak evidence; do not demand every assumption be tested. Link each priority to a research question, a method capable of answering it, and only then the least necessary artifact/fidelity:

- Unknown needs or current behaviour: story-based interviews, contextual observation, or analysis of supplied records; a discussion guide or current-state notes may suffice.
- Desirability: investigate real choices/behaviour and competing approaches; a concept or service scenario may suffice. Preference alone is not demonstrated demand.
- Usability: moderated tasks with actual or likely users; prototype only the uncertain interaction. Neutral tasks must not disclose the answer. Include relevant access needs and recovery cases.
- Feasibility: an engineering/dependency investigation owned by the relevant specialist; a dependency question or externally produced spike may suffice, not screens as proof.
- Viability: service operations, cost/resource, or policy review with accountable owners and available data; show unknowns instead of invented estimates.
- Ethics: investigate foreseeable harm, exclusion, privacy, and misuse with affected people and qualified owners; a risk scenario or review may be needed before exposing anyone to a test.

Record the assumption/alternative, question, method, audience/recruitment, neutral tasks or procedure, observations/measures, support/weaken/reverse criteria agreed before results, owner, consent/privacy safeguards, limitations, and the resulting decision. Criteria can be qualitative and proposed; do not manufacture numeric precision. Separate proposed tests, actual execution, supplied reports, and inspection-only checks. An artifact by itself is not a test. Participant use of a prototype can supply usability evidence within that study's limits; agent inspection cannot substitute for it. Human approval of a hypothetical premise permits exploration, not evidence of demand or success.

Consider all five risk categories, but elaborate only decision-changing questions; do not create one test per category or every minor assumption. Combine questions only when the same method can genuinely answer them. Keep one evaluation plan in the proposal and update affected entries after shaping instead of writing another plan. Use not applicable with a reason for irrelevant method fields, and Unknown for missing applicable details. A pending test has a proposed decision rule, not a claimed result. Feasibility or authorization that could invalidate the approach warrants an early specialist investigation plan, not more screens as a substitute.

Prioritizing tests does not establish that untested assumptions are safe. In particular, absent customer contact or contrary evidence is not support for a low-risk classification. For participant-based work, retain a recruitment rationale, relevant access/support needs, neutral believable tasks that do not reveal the answer, a pilot check of tasks/material, and method limitations. Combine questions only when each remains answerable without undermining the session. Record a plan rather than implying recruitment, pilot checks, or research were executed.

### Learning material is not the complete screen handoff

A **learning prototype** isolates a question and may deliberately omit most of the journey. Default to an inline concept, task, or scenario in the proposal, or a link to externally supplied material. Respect the level's no-screen cap. Do not put a partial learning stimulus in `screens.md` or call it the complete `mockup.drawio` handoff. Complete artifacts cover the declared screens, business views, consequential branches, and task handoffs; completeness does not require routine technical-state boards. Legacy explicitly declared states remain covered until the owning specification changes. Do not generate production code or diagram scripts as a side effect of planning research.

Do not create both a learning prototype and a complete mockup automatically. If the requested mockup can answer the question, reference it in the plan; otherwise add only the material the question needs. This does not waive required screen/view coverage at Mockup or Full, change the output cap, or claim research happened. Detail the proposed approach, not every rejected alternative. Link shared descriptions rather than copying the same narrative across journey, process, and screens; each required view must still expose its own decisions, handoffs, and material exceptions.

Before reusing a complete mockup for evaluation, check its interaction, visual, and content fidelity against the question. A complete static Draw.io board can support an appropriately facilitated walkthrough or content task, not establish realistic keyboard behavior, screen-reader compatibility, or response timing. Record what cannot be tested and plan suitable externally owned material/method where needed; do not silently generate code or waive handoff coverage.

## Ingest supplied results and revise the decision

Never claim to have recruited participants, run sessions, or executed a test merely because it was planned. When results are supplied:

1. Record provenance, who conducted/reported it, date, method, audience/sample, tasks, artifact/version, and raw material or report link. Mark missing details unknown. Distinguish a supplied summary from direct session observations.
2. Extract attributed observations without inventing quotes, counts, task times, or missing sessions. Note selection bias, moderator help, fidelity, contradictory outcomes, and what was not examined.
3. Rebuild the synthesis chain above. Compare results against the original question and decision criteria; do not retrofit criteria silently. A supplied interpretation is not automatically a confirmed finding.
4. Record whether the evidence supports, weakens, reverses, or leaves the assumption inconclusive, with scope and rationale. Consider the body of evidence rather than treating one pass/fail as whole-product validation.
5. Use `revise-design`: retain the old decision and reason for supersession, revise the opportunity/options or design at the earliest affected premise, withdraw stale readiness, and propagate only affected changes. Name the next owner and learning step.

## Four independent gates, not four maturity levels

- **Context sufficiency:** enough grounded or explicitly human-confirmed hypothetical context to explore. Missing core facts trigger the interview unless an explicit advance request opens Shape under the discovery policy; gaps stay unknown and unsafe behavior stays excluded.
- **Evidence confidence:** what actual support exists for consequential claims, including contradictions and unresolved risk.
- **Specification completeness:** whether the artifacts needed for the requested level/profile and named slice agree and are sufficiently explicit.
- **Human approval:** who accepted which decision, with scope/date; neither context confirmation nor specification grants investment, feasibility, policy, or launch approval.

Understand / Design documents / Mockup / Full are **output caps**, not evidence maturity. Design documents includes the evaluation plan before stopping, without screens. Full may finish an honest provisional draft after the context gate passes, without fabricated proof or forced execution of research. Readiness is proportionate to the named slice's harm, irreversibility, uncertainty, and accepted risk: unresolved blocking safety, policy, feasibility, or ownership risks prevent ready; low-risk nonblocking assumptions need not all be tested. Completeness and polish never erase uncertainty.

## Post-release learning handoff

Implementation and live research execution are external to this design task. In the evaluation/handoff section name owners (or Unknown) for instrumentation and consent/privacy, user research and support feedback, reviewing user and business/service measures, and deciding changes. Specify baseline/source, proposed success and harm guardrails, review cadence or trigger, and what evidence would prompt iteration, rollback, stopping, or renewed discovery. Do not claim instrumentation, release, or monitoring actually happened. Supplied live results return through the same ingestion and revision loop.

## Additional research and reassessment

External pages read 2026-10-22:

- [Product Talk: assumption testing](https://www.producttalk.org/assumption-testing/): compare alternatives through underlying assumptions, prioritize importance and weak evidence, and set criteria before results. Its guidance that many assumptions need not be tested is conditioned on regular customer engagement; absence of customer evidence is not assurance.
- [NN/g: prototype fidelity](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/): interaction, visual, and content fidelity vary independently; choose material according to test goals and pilot it. Static material requires appropriate facilitation and has limitations.
- [GOV.UK: making prototypes](https://www.gov.uk/service-manual/design/making-prototypes): use suitable prototypes to explore alternatives; realistic interactions may require code prototypes, which remain distinct from production. This plugin plans or links externally owned material rather than generating code.
- [GOV.UK: planning research](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) and [moderated usability testing](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing): question-appropriate methods, relevant inclusive participants, neutral tasks, and trying out instructions/material before sessions.
- [NN/g: journey-mapping approaches](https://www.nngroup.com/articles/journey-mapping-approaches/): assess existing evidence and distinguish current/future state from assumption/research basis.

The no-fixed-option-count, single evolving plan, complete handoff coverage, and no automatic extra prototype are plugin adaptations, not universal prescriptions from these sources. Their efficiency remains unverified without comparative installed-host runs.

## Sources and adaptation

Primary sources read 2026-10-15:

- [GOV.UK: Analyse a research session](https://www.gov.uk/service-manual/user-research/analyse-a-research-session): extract observations, group patterns, interpret findings, decide actions. Explicit contradiction retention and the opportunity chain are this plugin's adaptation.
- [GOV.UK: How alpha works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works): compare ideas, test riskiest assumptions, prototype only what is needed, not the entire journey.
- [GOV.UK: Moderated usability testing](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing): research questions before tasks/materials, actual or likely users, neutral believable tasks, consent and secure handling.
- [Product Talk: Assumption testing](https://www.producttalk.org/assumption-testing/): five assumption types, evidence/risk prioritization, criteria before results, learning across tests.
- [Product Talk: Opportunity solution trees](https://www.producttalk.org/opportunity-solution-trees/): outcomes, evidence-grounded opportunities, choose an opportunity before alternatives and assumption tests. Its full practice calls for customer interviews; a hypothetical chain here is only provisional exploration, not a completed evidence-backed opportunity tree.
- [Design Council: Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/): understand and define before developing alternatives; small-scale testing and iteration.
- [GOV.UK: Measuring service success](https://www.gov.uk/service-manual/measuring-success/measuring-the-success-of-your-service) and [live phase](https://www.gov.uk/service-manual/agile-delivery/how-the-live-phase-works): combine metrics, research and operational feedback; continue improving with sustainable ownership.

The level caps, complete-screen handoff distinction, approval gates, and file placement are plugin policies, not verbatim requirements or certification under these sources.
