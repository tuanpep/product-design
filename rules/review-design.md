---
trigger: model_decision
description: "Apply when a person wants a review of a product design package, or /review-design. Load the review-design skill and follow it. Do not start a new design."
---

When the task is a review of an existing product design, load the review-design skill, the execution kernel and only triggered review guidance. Read a principle leaf before citing it, not every principle up front. Keep this review read-only; return requested repairs to the explicitly authorized authoring owner rather than editing from the reviewer role.

Review the package under `docs/product-design/<slug>/`. If it is missing, say so. Do not start a new design, raise the output level, or invent research results.

As primary, coordinate bounded read-only review/research leaves under references/orchestration.md; reconcile findings rather than performing all inspection inline. As a child, inspect only the assigned stable concerns and never delegate. Never launch writers. Report design coherence, evidence confidence, and delivery readiness separately. Leave the decision to build with the person.
