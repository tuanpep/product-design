---
name: sketch-drawio
description: "Create a lightweight editable Draw.io UI mockup with labeled screen relationships from a supplied brief. Standalone exploration, not the complete product-design handoff. Use for /sketch-drawio or a quick connected-screen sketch."
disable-model-invocation: true
---

# Sketch Draw.io

Create **mid-fidelity screens connected by labeled arrows**, not just a flowchart of screen names. Use supplied context directly. No discovery phase, proposal, screens.md, MCP, worker or design-package setup is required.

## Scope and safety

- One requested screen or short task flow by default; no extra variants, breakpoints or state boards. Ask only about a missing detail that materially changes the task. Label assumptions; use fictional sample data, not private customer data.
- Keep standalone output outside `docs/product-design/`, e.g. `mockups/sketch-invoices.json` and `mockups/sketch-invoices.drawio`. These are exploratory material, not usability evidence or approval.
- Do not create or replace canonical `screens.md` or `mockup.drawio`. In a product-design package, respect its open phase and output cap; use the existing complete-handoff owner instead. The [specialist contract](../design-product/references/specialist-execution.md) applies to package changes and read-only requests; it does not require a standalone sketch to open a phase.
- Reviews stay read-only. Preserve supplied IDs and human edits. Do not change business rules merely to simplify the drawing.

## Procedure

1. Identify the task, target device and requested screens from the brief. Reuse supplied content and existing source files; do not reread unrelated project documents.
2. Read the small [renderer contract](references/renderer.md). Pick only the needed [layout recipe](references/layouts.md) if useful. A [compact example](examples/invoices.json) is available; do not load it unless needed. Use real labels, a restrained neutral palette and representative content.
3. Write a compact JSON source using stable screen/control/link IDs. Group each screen's controls. Draw only consequential transitions, decisions and role handoffs; name the action on each connector. A button can be the source of an arrow. Arrows are explanatory, not working interactions.
4. Locate this skill's installed directory, create the requested output directory if needed, and run its bundled script with absolute paths:

   ```text
   node "<skill-directory>/scripts/render.mjs" "<project>/mockups/sketch-invoices.json" "<project>/mockups/sketch-invoices.drawio"
   ```

   Requires Node.js 20.0+; no npm install, MCP or Draw.io Desktop is needed to generate the file. Never paste the generated XML into the conversation.
5. The renderer validates input, unique IDs, endpoints and screen non-overlap before writing. When Draw.io/rendering tools are available, open or export once and inspect containment, text, labels and connector routing. Fix visible defects; do not launch an automatic critique loop. If unavailable, report **rendering not verified**. Structural checks are not visual verification.
6. Deliver the `.drawio` path and keep the JSON as its editable generation source. Export images only on request. Mention scope, assumptions and checks briefly.

## Revisions

Patch only affected JSON entries, preserving IDs and unaffected content, then rerun. Output is deterministic; unchanged screen cells remain identical when geometry is unchanged. Adding/resizing screens can move later screens under automatic layout; use explicit positions for a settled layout. Do not reread or regenerate unrelated artifacts.

The script refuses to overwrite a manually edited/foreign diagram. If that happens, stop: reconcile the edits into JSON with authorization, edit the diagram directly, or generate a new filename. Do not delete the file or change its hash to bypass the guard. The JSON does not round-trip manual Draw.io edits.
