---
trigger: model_decision
description: "Apply when a person wants a product design, a revision of one, or /design-product. Load the design-product skill and follow it. Do not run a leaf skill as the whole job."
---

When the task is a product idea, a product design, or a revision of one, load the design-product skill and follow it for the whole task, including the playbook it selects and every principle leaf it names.

`/design-product` is that skill. Antigravity turns the skill name into the slash command. If the request says advise, or asks for a suggested solution and design without waiting, follow advise mode in that skill. Otherwise, on a new idea, if no level is named, stop and ask whether to run Understand, Design documents, Mockup, or Full before any design work.

Leaf skills under `skills/` are steps that skill calls. Do not apply a leaf skill as the whole job.

Write the package in the project being designed, under `docs/product-design/<slug>/`. Leave the decision to build with the person. Do not write production code in this task.
