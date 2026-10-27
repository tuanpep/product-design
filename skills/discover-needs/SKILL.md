---
name: discover-needs
description: "Investigate users, the current end-to-end journey, supporting evidence, and constraints for a product idea. Use for /discover-needs, or when the problem, user need, baseline, or context is uncertain."
disable-model-invocation: true
---

# Discover Needs

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. For supplied research results, follow [learning-loop ingestion](../design-product/references/learning-loop.md), then authorized revision; do not restart research or invent execution.

Apply [the discovery interview and context gate](../design-product/references/discovery-interview.md). When supplied context is too general and the person has not asked to continue, interview in small turns, probe concrete examples, and separate stakeholder accounts from observed research. One summary is enough. An advance request records core gaps as unknown and leaves Understand, including when advise or Full was named. Do not ask again.

Read [the evidence contract](../design-product/references/evidence-and-decisions.md). Start with the user's goal, not the requested screen or feature.

1. Inspect supplied documents, the users' current journey, and analytics or support data if accessible. Use trustworthy external sources for material facts. Record source links and dates. What an existing project already implements is `survey-existing`. Do not inventory the codebase here.
2. Map who acts, what they are trying to accomplish, how they do it today, where it fails, and who or what supports the work outside the interface.
   Capture the users' terms with their source, and known service languages/locales, following [the content baseline](../design-product/references/content-quality.md#establish-language-and-vocabulary-early). Record unknown language needs rather than assuming the document language represents every user. This is a working vocabulary, not solution copy.
3. Include underserved users and access needs where relevant. Do not claim to represent them without research. Distinguish hard constraints from changeable current practice. Quantify the baseline only when data exists.
4. Synthesize explicitly using [the learning loop](../design-product/references/learning-loop.md): source → observation → pattern (including contradictions, outliers, and group differences) → finding → solution-neutral opportunity. Keep interpretation separate from observation, link each step, and do not turn one account into a population pattern. With only hypothetical context, label the chain provisional rather than inventing findings.
5. Compare opportunities against user and business/service outcomes, importance/consequences, inclusion, and uncertainty. Choose a bounded target opportunity with rationale before `explore-solutions`; keep alternatives visible. Do not rank opportunities by the effort of a solution not yet chosen.
6. Leave a short list of risky unknowns with a method to investigate each. Report the method and limitations of every investigation actually performed. For supplied session reports or analytics, use the learning loop's result-ingestion procedure; do not claim to have conducted that research.

Web research can establish public facts. It cannot interview users or validate their behaviour. Leave needs as observations and inferences. Deriving requirements is `define-requirements`. Do not specify the build here.

**Reply:** the context of use, the evidence class of each consequential claim, and the unknowns that could change the recommendation.
