---
trigger: model_decision
description: "Apply when a person wants the technical design for an existing product package, or /technical-design. Continue that package into its data model, ERD, and API contract. Do not restart discovery."
---

When the task is the technical design of an existing product package, follow the technical-design agent procedure when this message asks to go next, approves the Specify phase, or asks to brainstorm the technical design. Otherwise stop and say the build spec is waiting for that. Next, continue, and approve count. Read references/workflow.md from the design-product skill, the technical-design steps only, and references/technical-design-format.md.

Work under `docs/product-design/<slug>/`. If the package has no decision and needs, stop and ask for /design-product. Do not interview or redraw screens. A declared level other than full does not receive technical-design.md or contract files.

Run select-views, then only the included view skills, in workflow order. Omit a view that no concern needs. Do not write production code, SQL, or server stubs.
