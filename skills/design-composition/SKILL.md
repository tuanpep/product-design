---
name: design-composition
description: "Describe the parts of a slice and what each is responsible for, including what is built, bought, or reused. Use for /design-composition, or when the composition view is included."
disable-model-invocation: true
---

# Design Composition

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Use [the shared structure/dependency procedure](../design-product/references/structure-and-dependencies.md) once for both included views, retaining their separate owners. Principle links below are selective candidates, not mandatory preloads.

Relevant principles: [choose the view](../principle-choose-the-view/SKILL.md), [see the whole service](../principle-see-the-whole-service/SKILL.md), [one source of truth](../principle-one-source-of-truth/SKILL.md), and [decide the reversible](../principle-decide-the-reversible/SKILL.md). This is the composition view from IEEE 1016-2009: parts and responsibilities, not a framework choice.

1. Read Design views in `technical-design.md`. If composition is omitted, stop. If the file is missing, run `select-views` first.
2. List the parts this slice adds or changes. For each part give its name, kind (application, data store, or external system), purpose, whether it is built, bought, or reused, and whether it is existing, changed, or new. Cite the `survey-existing` evidence ID when one exists. An external system must already be an integration (I1). A new part that duplicates a must-reuse or should-reuse finding goes back to `explore-solutions`.
3. Name a technology only when the survey, or the project when no survey ran, already uses it, or as a **proposed** reversible default with an owner and a reason. A choice that locks in a platform, a vendor, or a data store stays a blocking question until an owner decides. Record that decision with `record-decisions` when the view is done.
4. When more than one part is software this product owns, add the containers page to `context.drawio` from [the C4 context components](../context-drawio/references/context-components.md). `context-drawio` does not draw this page. Draw the parts from this section, and do not redraw the context page. Mark each existing, changed, or new in its description. One software part needs no containers page; say that in Composition.
5. Check the page against the section. A part that is not in the text goes into the text first. Check the file for unique ids and edges that do not share a segment ([Edges do not overlap](../drawio/references/drawio-file.md#relationship-lines)). Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Write the section under Composition in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Link the containers page when it exists. The text stays the source. The diagram is **proposed**. It does not prove the parts can be built, bought, or operated.

**Reply:** the parts and their responsibilities, what is existing or new, any containers page, the proposed technology defaults and their owners, and what this view does not decide.
