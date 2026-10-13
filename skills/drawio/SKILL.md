---
name: drawio
description: "Create Draw.io flow charts and screen prototypes as uncompressed .drawio files. Use for /drawio, a journey map, a process flow, or a clickable-looking prototype of a proposed product."
disable-model-invocation: true
---

# Drawio

Draw journey flow charts and screen prototypes as [Draw.io](https://www.drawio.com/) files. Copy the skeleton in [drawio-file.md](references/drawio-file.md) and fill it. Write uncompressed XML. Do not base64-encode the diagram, and do not invent mockup shape names.

1. Name the question the diagram answers. One file, one question. A journey that is already clear in a few sentences does not need a file.
2. Save it beside the proposal: `docs/product-design/<slug>/journey.drawio` for a flow, or `docs/product-design/<slug>/prototype.drawio` for screens. Reuse the same file when revising that diagram. Do not overwrite a human edit without agreement.
3. For a flow chart, show entry, the main task, each decision, the exception or recovery path, support or offline handoffs, and exit. Label decision arrows Yes or No, or with the actual condition.
4. For a prototype, draw one frame per step the user sees, in order, left to right. Put the real labels on the controls. Include the denied path and the recovery, not only the happy path. A frame is a sketch of the proposed interaction. It is not a built screen.
5. Link the file from `product-design.md` under the section it supports. State what the diagram does not test.

Every shape's parent is `1`. Ids `0` and `1` are reserved. Escape `&`, `<`, and `>` in labels. Open the file in Draw.io or the diagrams.net editor and confirm every arrow has a source and a target.

A diagram is **proposed**. It is not evidence that a user succeeded, and it is not permission to build.

**Reply:** the file path, the question it answers, and what it does not test.
