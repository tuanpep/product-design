---
name: plan-evaluation
description: "Plan the smallest real test of the assumption that would reverse a product recommendation. Use for /plan-evaluation, or when a design depends on untested user behaviour."
disable-model-invocation: true
---

# Plan Evaluation

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Use [accessibility planning](../design-product/references/accessibility-planning.md) when inclusion is at risk; this skill owns evaluation responsibilities, methods and limitations, not implementation conformance. Supplied-results analysis uses the learning loop below, not a second research procedure.

Read [the evidence contract](../design-product/references/evidence-and-decisions.md) and [the canonical learning loop](../design-product/references/learning-loop.md). Plan after alternatives, before detailed experience or screens; update as new risks emerge. Discovery research plans may precede alternatives when context is missing, without granting permission to Shape.

1. Link the decision, selected opportunity, and candidate alternatives. Identify assumptions across desirability, usability, feasibility, viability, and ethics; prioritize those whose failure could reverse the recommendation or cause harm, with weak supporting evidence.
2. Use question → method → artifact. Choose the smallest ethical method capable of answering each priority question, then the least necessary fidelity/material. A current-workflow interview, supplied-data analysis, operational review, or externally owned engineering investigation may need no screens.
3. Record audience/recruitment, neutral tasks/procedure, observations/measures, support/weaken/reverse criteria set before results, owner, consent/privacy safeguards, limitations, and the next decision. Mark proposed criteria as proposed; avoid invented numeric targets.
4. Say whether the check is participant-based, specialist research, supplied-result analysis, or inspection-only. A prototype alone is an artifact, not a test; actual participant task use can supply scoped usability evidence. A heuristic pass or automated scan cannot establish user success, full accessibility, or demand.
   When wording is a consequential uncertainty, plan a comprehension task in the relevant language/channel: ask what changed, who acts next, and what recovery is available without feeding people the intended answer. Compare against the owning rule/outcome; do not treat a readability score or agent rewrite as evidence of comprehension. Include privacy and notification-preview risks where relevant, using [the content contract](../design-product/references/content-quality.md).
5. Keep partial learning material inline in `product-design.md` or link externally supplied material. Do not use `screens.md` as a partial test script or weaken the complete `mockup.drawio` coverage contract. Respect the output cap, including no screens at Design documents. State what remains unexamined, including excluded people and risks.
6. Plan the post-release learning handoff: owners, user and business/service measures, sources/baselines or unknowns, harm guardrails, review triggers, and decisions to iterate, rollback, or stop. Implementation/instrumentation and actual research execution remain external.

Record a plan as a plan. Do not invent participants, quotes, task times, outcomes, or actual execution. Human-approved hypothetical scenarios are exploration premises, not research evidence. When real results are supplied, follow the learning loop's ingestion procedure: record provenance/method/version/limitations, extract attributed observations, retain contradictions, synthesize findings, compare with prior criteria, and use `revise-design` to update or supersede the affected decision. A supplied summary is not direct observation by the agent; label claims at their actual evidence level.

**Reply:** the assumption, the test, what result would reverse the recommendation, and what the test does not cover.
