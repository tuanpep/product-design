---
name: select-views
description: "Choose the technical design views for one slice from the concerns builders, testers, and operators actually have. Use for /select-views, at the start of technical design on a Full slice, or when a diagram is about to be added with no concern behind it."
disable-model-invocation: true
---

# Select Views

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it. Assess relevant [accessibility](../design-product/references/accessibility-planning.md), [privacy-processing risks](../design-product/references/privacy-risk.md) and [quality scenarios](../design-product/references/quality-scenarios.md) before choosing artifacts. Link existing adequate requirements/controls; these concerns do not automatically require a new viewpoint or file.

Relevant principles: [choose the view](../principle-choose-the-view/SKILL.md), [single ownership](../principle-one-source-of-truth/SKILL.md), and [whole service](../principle-see-the-whole-service/SKILL.md). Output only the views this slice needs, not a request to draw them all.

1. Read the needs, requirements, stories, domain model and quality risks already in the package. Reuse adequate sources. If a required story/domain premise is missing, identify the gap and its owning skill (`map-stories` or `model-domain`); do not silently rerun Specify or fabricate it. Correct a supported local omission only within authorized scope, otherwise bound/defer affected technical work.
2. Name the design subject: the slice, the people who will build and check it, and the requirement IDs it serves. Apply the [Correctness and change-safety review](../design-product/references/technical-design-format.md#correctness-and-change-safety-review): identify consequential invariants, authority, security, compatibility, transition and recovery concerns before drafting mechanisms. Reuse applicable existing architecture and evidence; a concern may be addressed by cited existing text rather than a new diagram. Omission of a diagram does not waive the obligation.
3. Write each design concern that could change a structural choice. Give it an ID (DC1), the holder, the source need or requirement, and a quality characteristic only when this slice raises one. Use the characteristic names in [the technical design format](../design-product/references/technical-design-format.md).
4. Walk the twelve viewpoints in that format. Mark a viewpoint **included** only when a concern needs it, and name the section or file that will address it. Mark the others **omitted** with the reason.
5. Create or update `docs/product-design/<slug>/technical-design.md` with every heading in the format. Preserve applicable existing sections, IDs and human edits; do not replace completed views with placeholders. Fill Design subject, Design concerns, and Design views. In new later sections, write the omission reason or "Included. Owned by the view skill." The view skills replace new included placeholders and revise only affected existing content.

Included views are then written by their owners: `design-data` and `erd-drawio` (information), `state-drawio` (state dynamics), `design-composition` (composition), `design-dependency` (dependency), `design-contract` (interface), `sequence-drawio` (interaction), `design-deployment` (resource), `dataflow-drawio` and `assess-threats` (security and trust boundaries), `define-rules` (algorithm). Context, when needed, is already `context-drawio`. Do not add a view that this list omits.

**Reply:** the concerns, the included views, the omitted views and why, and which skill runs next.
