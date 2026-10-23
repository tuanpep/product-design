---
trigger: model_decision
description: "Apply when a person wants the technical design for an existing product package, or /technical-design. Continue that package into its data model, ERD, and API contract. Do not restart discovery."
---

When the task is the technical design of an existing product package, follow the technical-design agent procedure when this message asks to go next, approves the Specify phase, or asks to brainstorm the technical design. Otherwise stop and say the build spec is waiting for that. Next, continue, and approve count. Read references/execution-kernel.md and references/phases/technical.md from the design-product catalog, then only the needed technical-format sections and included view procedures. Do not preload discovery, learning or every principle leaf.

Work under `docs/product-design/<slug>/`. If the package has no decision and needs, stop and ask for /design-product. Do not interview or redraw screens. A declared level other than full does not receive technical-design.md or contract files.

Run select-views, then only the included view skills, in workflow order. Omit a view that no concern needs. Do not write production code, SQL, or server stubs. Keep this primary as the technical-domain orchestrator: own decisions and view correspondences, delegate production and checks to scoped leaves under references/orchestration.md. Parallelize independent read-only work; serialize canonical writers and dependent reviews. Missing delegation/isolation blocks execution rather than permitting inline authoring.
