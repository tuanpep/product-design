---
trigger: model_decision
description: "Apply when a person wants a product design, a revision of one, or /design-product. Load the design-product skill and follow it. Essentials only — no screens, mockups, or technical design."
---

When the task is a product idea, design or revision, load the design-product skill, references/execution-kernel.md and references/phase-routing.md, then only the active pack. Read a principle leaf before citing, not every leaf up front.

`/design-product` is that skill. Apply references/discovery-interview.md for new briefs, interviews, advances or changed core premises. A new brief without advance stays Understand. Next/continue/approve/yes to a summary, or naming the next phase, opens it without another discovery/confirmation/level question. Missing facts stay unknown. Bare "no questions" without continuation returns only discovery summary, gaps and research plan. Otherwise one phase and stop. Advise recommends inside the phase; levels only cap outputs (`understand` | `design-documents` | `full`). Default Shape after advance is design-documents.

Write under `docs/product-design/<slug>/`. Follow references/documentero-templates.md: decision brief `product-design.md`; Test Plan with cases in `test-plan.md` from Shape; SRS with requirements matrix in `build-spec.md` only when Full Specify is open. Do not write screens, mockups, Draw.io, contracts, technical design, or production code. Leave the decision to build with the person.

Leaf skills under `skills/` are steps that skill calls. Do not apply a leaf as the whole job. When delegating, use references/orchestration.md; prefer one author leaf for document edits.
