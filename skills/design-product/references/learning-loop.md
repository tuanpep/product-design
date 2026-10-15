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

## Question → method → artifact

After comparing alternatives and before detailed experience or screens, use `plan-evaluation`. Identify assumptions across **desirability, usability, feasibility, viability, and ethics**. Prioritize those with serious consequences and weak evidence; do not demand every assumption be tested. Link each priority to a research question, a method capable of answering it, and only then the least necessary artifact/fidelity:

- Unknown needs or current behaviour: story-based interviews, contextual observation, or analysis of supplied records; a discussion guide or current-state notes may suffice.
- Desirability: investigate real choices/behaviour and competing approaches; a concept or service scenario may suffice. Preference alone is not demonstrated demand.
- Usability: moderated tasks with actual or likely users; prototype only the uncertain interaction. Neutral tasks must not disclose the answer. Include relevant access needs and recovery cases.
- Feasibility: an engineering/dependency investigation owned by the relevant specialist; a dependency question or externally produced spike may suffice, not screens as proof.
- Viability: service operations, cost/resource, or policy review with accountable owners and available data; show unknowns instead of invented estimates.
- Ethics: investigate foreseeable harm, exclusion, privacy, and misuse with affected people and qualified owners; a risk scenario or review may be needed before exposing anyone to a test.

Record the assumption/alternative, question, method, audience/recruitment, neutral tasks or procedure, observations/measures, support/weaken/reverse criteria agreed before results, owner, consent/privacy safeguards, limitations, and the resulting decision. Criteria can be qualitative and proposed; do not manufacture numeric precision. Separate proposed tests, actual execution, supplied reports, and inspection-only checks. An artifact by itself is not a test. Participant use of a prototype can supply usability evidence within that study's limits; agent inspection cannot substitute for it. Human approval of a hypothetical premise permits exploration, not evidence of demand or success.

### Learning material is not the complete screen handoff

A **learning prototype** isolates a question and may deliberately omit most of the journey. Default to an inline concept, task, or scenario in the proposal, or a link to externally supplied material. Respect the level's no-screen cap. Do not put a partial learning stimulus in `screens.md` or call it the complete `mockup.drawio` handoff. When those complete artifacts are produced, keep their existing screen/state coverage and split-board contracts intact. Do not generate production code or diagram scripts as a side effect of planning research.

## Ingest supplied results and revise the decision

Never claim to have recruited participants, run sessions, or executed a test merely because it was planned. When results are supplied:

1. Record provenance, who conducted/reported it, date, method, audience/sample, tasks, artifact/version, and raw material or report link. Mark missing details unknown. Distinguish a supplied summary from direct session observations.
2. Extract attributed observations without inventing quotes, counts, task times, or missing sessions. Note selection bias, moderator help, fidelity, contradictory outcomes, and what was not examined.
3. Rebuild the synthesis chain above. Compare results against the original question and decision criteria; do not retrofit criteria silently. A supplied interpretation is not automatically a confirmed finding.
4. Record whether the evidence supports, weakens, reverses, or leaves the assumption inconclusive, with scope and rationale. Consider the body of evidence rather than treating one pass/fail as whole-product validation.
5. Use `revise-design`: retain the old decision and reason for supersession, revise the opportunity/options or design at the earliest affected premise, withdraw stale readiness, and propagate only affected changes. Name the next owner and learning step.

## Four independent gates, not four maturity levels

- **Context sufficiency:** enough grounded or explicitly human-confirmed hypothetical context to explore; missing core facts block Shape in every mode.
- **Evidence confidence:** what actual support exists for consequential claims, including contradictions and unresolved risk.
- **Specification completeness:** whether the artifacts needed for the requested level/profile and named slice agree and are sufficiently explicit.
- **Human approval:** who accepted which decision, with scope/date; neither context confirmation nor specification grants investment, feasibility, policy, or launch approval.

Understand / Design documents / Mockup / Full are **output caps**, not evidence maturity. Design documents includes the evaluation plan before stopping, without screens. Full may finish an honest provisional draft after the context gate passes, without fabricated proof or forced execution of research. Readiness is proportionate to the named slice's harm, irreversibility, uncertainty, and accepted risk: unresolved blocking safety, policy, feasibility, or ownership risks prevent ready; low-risk nonblocking assumptions need not all be tested. Completeness and polish never erase uncertainty.

## Post-release learning handoff

Implementation and live research execution are external to this design task. In the evaluation/handoff section name owners (or Unknown) for instrumentation and consent/privacy, user research and support feedback, reviewing user and business/service measures, and deciding changes. Specify baseline/source, proposed success and harm guardrails, review cadence or trigger, and what evidence would prompt iteration, rollback, stopping, or renewed discovery. Do not claim instrumentation, release, or monitoring actually happened. Supplied live results return through the same ingestion and revision loop.

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
