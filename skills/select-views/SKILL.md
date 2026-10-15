---
name: select-views
description: "Choose the technical design views for one slice from the concerns builders, testers, and operators actually have. Use for /select-views, at the start of technical design on a Full slice, or when a diagram is about to be added with no concern behind it."
disable-model-invocation: true
---

# Select Views

Read [principle-choose-the-view](../principle-choose-the-view/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md). The output is the list of views this slice needs. It is not a request to draw all of them.

1. Read the needs, requirements, stories, domain model, and quality risks already in the package. If stories or the domain model are missing and the slice needs them, run `map-stories` and `model-domain` first.
2. Name the design subject: the slice, the people who will build and check it, and the requirement IDs it serves.
3. Write each design concern that could change a structural choice. Give it an ID (DC1), the holder, the source need or requirement, and a quality characteristic only when this slice raises one. Use the characteristic names in [the technical design format](../design-product/references/technical-design-format.md).
4. Walk the twelve viewpoints in that format. Mark a viewpoint **included** only when a concern needs it, and name the section or file that will address it. Mark the others **omitted** with the reason.
5. Create `docs/product-design/<slug>/technical-design.md` with every heading in the format. Fill Design subject, Design concerns, and Design views. In each later heading, write the omission reason or "Included. Owned by the view skill." The view skills replace the included sections.

Included views are then written by their owners: `design-data` and `erd-drawio` (information), `state-drawio` (state dynamics), `design-composition` (composition), `design-dependency` (dependency), `design-contract` (interface), `sequence-drawio` (interaction), `design-deployment` (resource), `dataflow-drawio` and `assess-threats` (security and trust boundaries), `define-rules` (algorithm). Context, when needed, is already `context-drawio`. Do not add a view that this list omits.

**Reply:** the concerns, the included views, the omitted views and why, and which skill runs next.
