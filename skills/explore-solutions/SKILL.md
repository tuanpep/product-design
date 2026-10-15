---
name: explore-solutions
description: "Compare no-build, reuse, process, and product approaches to a defined problem. Use for /explore-solutions before recommending a solution."
disable-model-invocation: true
---

# Explore Solutions

Before comparing alternatives, apply [the discovery interview and context gate](../design-product/references/discovery-interview.md). If core context is missing, return to Understand and interview; do not generate solution options, diagrams, screens, or specifications. When an interview was triggered, human confirmation of the summary is required before this step, including in advise mode.

Read the precedence in [the principles index](../design-product/references/principles.md). Read the leaf for any principle you apply. [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md) applies when the choice is whether to build.

1. Read the synthesis in [the learning loop](../design-product/references/learning-loop.md). Confirm the selected solution-neutral opportunity, its source/finding links and uncertainty, and its connection to distinct user and business/service outcomes before choosing an approach. If it is missing, return to `discover-needs` rather than inventing a justification for the requested feature.
2. Brainstorm with the human before evaluating when they ask to brainstorm or the direction is still open. Use [the research-backed brainstorming sequence](../design-product/references/discovery-interview.md#brainstorm-after-understanding). Include the current or no-build baseline and plausible alternatives, including non-software approaches when credible.
3. Compare likely value, user effort, feasibility dependencies, cost uncertainty, risks, operational load, and reversibility. Use unknown rather than guessed numbers.
4. When the target is an existing project and `survey-existing` has not run, run it first. Start from its must-reuse and should-reuse findings. Recommend the option that survives the higher principle. Name the principle that decided it and the principle it cost. Recommend stopping, reusing, or extending when that meets the outcome. A new part needs the findings that cannot.
5. Identify assumptions across desirability, usability, feasibility, viability, and ethics, prioritizing weak evidence and serious consequences. Run `plan-evaluation` now, after alternatives and before detailed `design-experience` or screens. Choose the question and method before the least necessary artifact; the recommendation remains provisional until the relevant evidence and owners support it.

Label recommendations **proposed** and name the person who can accept consequential trade-offs. Do not present a comparison table as evidence that the winning option was tested.

**Reply:** the recommended option, the rejected options, the principle that decided the trade-off, and the reversing assumption.
