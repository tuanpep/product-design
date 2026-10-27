---
name: design-experience
description: "Describe a proposed product or service end to end in documents: journey, exceptions, content, and handoffs. Use for /design-experience after an approach is chosen."
disable-model-invocation: true
---

# Design Experience

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it. For consequential inclusion barriers use [accessibility planning](../design-product/references/accessibility-planning.md).

Relevant principles: [predictable behavior](../principle-behave-predictably/SKILL.md) and [the hardest realistic case](../principle-include-the-hardest-case/SKILL.md).

1. Design the selected approach around the complete task: entry, eligibility, main task, confirmation, exceptions/recovery, support/offline handoffs, exit.
2. Make people/system responsibilities explicit where they matter. Load [principle-take-on-the-hard-work](../principle-take-on-the-hard-work/SKILL.md) only when a hard case would otherwise fall on the user or you cite that trade-off.
3. Write consequential rules as **proposed** until approved. Illustrate boundaries with examples.
4. Note quality needs (accessibility, privacy, reliability, performance) and how they would be checked. Automated checks cannot establish accessibility.
5. Keep the journey in Product experience prose. Do not create Draw.io or screen files.
6. Apply [content contract](../design-product/references/content-quality.md). Run `write-content` for needed notifications/assistance/support; keep the M catalogue inline under Product experience. Use question-led inline examples, not a full interface copy deck.

Do not claim observed users unless sessions happened. Build slice work belongs to `specify-build`.

**Reply:** the journey, exceptions, principle that changed an interaction, and what remains untested.
