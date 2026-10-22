---
name: design-experience
description: "Design a proposed product or service end to end, including journeys, interactions, rules, content, exceptions, data, accessibility, and operational handoffs. Use for /design-experience after an approach is chosen."
disable-model-invocation: true
---

# Design Experience

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it. For consequential inclusion barriers use [accessibility planning](../design-product/references/accessibility-planning.md), keeping service-path intent here and evaluation with `plan-evaluation`.

Relevant principles: [predictable behavior](../principle-behave-predictably/SKILL.md) and [the hardest realistic case](../principle-include-the-hardest-case/SKILL.md). Do not add engagement, decoration or a new pattern that weakens task fit, inclusion or recovery.

1. Design the selected approach around the user's complete task, not only the app screens. Describe discovery and entry, eligibility or permissions, the main task, confirmation, exceptions and recovery, support or offline handoffs, and exit.
2. Make the responsibilities of people and systems explicit. Identify object states and ownership of data only where they matter to the journey. Read [principle-take-on-the-hard-work](../principle-take-on-the-hard-work/SKILL.md) when a hard case would otherwise fall on the user.
3. Specify visible content and controls only when justified by needs or requirements. Write consequential business rules as **proposed** until approved. Illustrate boundaries and denied paths with examples.
4. Note quality needs such as accessibility, privacy, reliability, and performance, including how they would be checked. For web designs, consider [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and test with affected users. A prototype or an automated check cannot establish accessibility.
5. When a few sentences cannot make the journey's decisions, exceptions, or handoffs clear, use `drawio` to write `journey.drawio`. A second outcome is a step folder, `2-<step>/journey.drawio`. A split of the first step is nested inside it: `1-<step>/1.1-<substep>/journey.drawio`. When more than one actor acts, the cross-actor view is `model-process`.
6. Apply [the shared content contract](../design-product/references/content-quality.md). Run `write-content` for needed notifications, assisted-service instructions, and support handoffs even with no screen UI; keep that catalogue in Product experience when `screens.md` does not exist. When the level allows an interface handoff, continue with `design-screens`, `write-content`, and `mockup-drawio`. At Design documents, defer detailed interface copy and use only question-led inline examples. State what any artifact does not test.

Do not claim to have observed users unless sessions actually took place. The first build slice, its stories, and its acceptance outcomes belong to `specify-build`.

**Reply:** the journey, the exceptions, the principle that changed an interaction, the artifacts written, and what they do not test.
