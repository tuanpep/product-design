---
trigger: model_decision
description: "Apply when a person wants a review of a product design package, or /review-design. Load the review-design skill and follow it. Do not start a new design."
---

When the task is a review of an existing product design, load the review-design skill and follow it for the whole task, including every principle leaf it names.

Review the package under `docs/product-design/<slug>/`. If it is missing, say so. Do not start a new design, raise the output level, or invent research results.

Report design coherence, evidence confidence, and delivery readiness separately. Leave the decision to build with the person.
