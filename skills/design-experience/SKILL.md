---
name: design-experience
description: "Design a proposed product or service end to end, including journeys, interactions, rules, content, exceptions, data, accessibility, and operational handoffs. Use for /design-experience after an approach is chosen."
disable-model-invocation: true
---

# Design Experience

Read **principle-behave-predictably** and **principle-include-the-hardest-case** before shaping the interaction. Do not add engagement, decoration, or a new pattern that weakens task fit, inclusion, or recovery.

1. Design the selected approach around the user's complete task, not only the app screens. Describe discovery and entry, eligibility or permissions, the main task, confirmation, exceptions and recovery, support or offline handoffs, and exit.
2. Make the responsibilities of people and systems explicit. Identify object states and ownership of data only where they matter to the journey. Read **principle-take-on-the-hard-work** when a hard case would otherwise fall on the user.
3. Specify visible content and controls only when justified by needs or requirements. Write consequential business rules as **proposed** until approved. Illustrate boundaries and denied paths with examples.
4. Note quality needs such as accessibility, privacy, reliability, and performance, including how they would be checked. For web designs, consider [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and test with affected users. A sketch or an automated check cannot establish accessibility.
5. Choose fidelity to answer a question. When the journey has a decision, an exception, or a handoff, or when a screen sequence is materially uncertain, use `drawio` for the flow chart or the screen prototype. State what any artifact does not test.

Do not claim to have observed users unless sessions actually took place. The first build slice, its stories, and its acceptance outcomes belong to `specify-build`.

**Reply:** the journey, the exceptions, the principle that changed an interaction, and what any sketch does not test.
