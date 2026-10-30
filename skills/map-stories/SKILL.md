---
name: map-stories
description: "Arrange the work as a user story map: activities, tasks, and stories, with a first-release line that delivers a thin but complete journey. Use for /map-stories, when prioritizing scope, or before writing acceptance criteria."
disable-model-invocation: true
---

# Map Stories

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Reuse the existing journey backbone; do not remap unchanged work or expand a bounded slice into a whole-product backlog. Principle links below are selective candidates, not mandatory preloads.

Use the story shape in [the workflow reference](../design-product/references/workflow.md). [Whole service](../principle-see-the-whole-service/SKILL.md) is a relevant principle: a first release is a thin path through the journey, not a pile of features.

1. Write the backbone: the user activities in journey order, taken from the to-be process or journey. Under each activity, list the user tasks.
2. Under each task, list stories in priority order. Each story is: As a role, I need to do something, so that an outcome. Link each story to the need and requirement it serves.
3. Draw the first-release line at the smallest set that lets the hardest realistic user finish the whole journey, including the denied path, recovery, and support handoff. A happy-path-only release does not cross the line.
4. Label each story **Must** for this slice, **Later**, or **Not doing**, with the reason. Not doing is a recorded decision.
5. Split any story that cannot be built and checked in one iteration. Split by workflow step, rule, data variation, role, or channel, not by technical layer.
6. Name dependencies between stories and on other teams or systems.

Write Stories and acceptance criteria as a subsection of Functional requirements in the SRS `build-spec.md`, and summarize/link the release line under First useful release in `product-design.md`. Preserve existing placement for unmigrated legacy files. The SRS matrix references each Must S ID and A outcome; C procedures/results live in `test-plan.md`. Acceptance criteria are `specify-build`.

**Reply:** the backbone, the first-release line and why it is complete, what waits, and the dependencies.
