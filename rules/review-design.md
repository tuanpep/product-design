---
trigger: model_decision
description: "Apply when a person wants a review of a product design package, or /review-design. Load the review-design skill and follow it. Do not start a new design."
---

When the task is a review of an existing product design, load the review-design skill, the execution kernel and only triggered review guidance. Keep this review read-only; return requested repairs to the authorized authoring owner.

Review the package under `docs/product-design/<slug>/`. If missing, say so. Do not start a new design, raise the level, invent research, or require screens/mockups/technical files that this essentials plugin does not produce.

As primary, coordinate bounded read-only review/research leaves under references/orchestration.md. Report design coherence, evidence confidence, and delivery readiness separately. Leave the decision to build with the person.
