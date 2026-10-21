---
trigger: model_decision
description: "Apply when a person wants a product design, a revision of one, or /design-product. Load the design-product skill and follow it. Do not run a leaf skill as the whole job."
---

When the task is a product idea, a product design, or a revision of one, load the design-product skill and follow it for the whole task, including the playbook it selects and every principle leaf it names.

`/design-product` is that skill. Antigravity turns the skill name into the slash command. First apply its references/discovery-interview.md context gate. A new brief that does not ask to continue is interviewed in Understand, even for advise or Full. When this message asks to go next — next, next gate, continue, proceed, approve, yes, or the next phase by name — open that phase now. Do not ask another question, and do not keep Level understand or Next gate repeat discovery. Record missing facts as unknown. A bare "no questions" with no request to continue returns only a discovery summary, gaps, and research plan, then stops. Otherwise run one phase and stop. Advise mode recommends inside the open phase. A named level caps artifacts; it does not by itself open the next phase.

Leaf skills under `skills/` are steps that skill calls. Do not apply a leaf skill as the whole job.

Write the package in the project being designed, under `docs/product-design/<slug>/`. Leave the decision to build with the person. Do not write production code in this task. Do not start technical design from this skill. `/technical-design` runs only after the person approves Specify or asks to brainstorm the technical design.

Follow references/learning-loop.md for synthesis, opportunity selection, test planning before detailed artifacts, and interpretation of supplied results. Output levels cap artifacts, not evidence maturity. Keep the complete screen/state mockup separate from limited learning material, and hand off post-release outcome review ownership rather than claiming to operate the service.
