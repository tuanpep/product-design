---
name: mockup-drawio
description: "Draw a wireframe of each screen and state in screens.md as a Draw.io file, using the built-in Mockup library (browser window, buttons, fields, lists). Use for /mockup-drawio, after design-screens, or when people need to see the product's shape."
disable-model-invocation: true
---

# Mockup Draw.io

Read [principle-use-real-content](../principle-use-real-content/SKILL.md), [principle-design-every-state](../principle-design-every-state/SKILL.md), and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). A mockup is one wireframe of the screens. Draw.io's Mockup library draws each control as one shape, so the file stays small enough to write by hand and opens the same in Draw.io desktop, diagrams.net, and the VS Code extension.

1. Name the question the mockup answers. Read `screens.md` and draw only the screens and states it lists. If it does not exist, run `design-screens` first.
2. Choose the device from the context of use: desktop browser, or a phone. Use the same device for every frame unless the slice is responsive, then draw the hardest one first.
3. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the mockup components](references/mockup-components.md). One actor and one task keep `mockup.drawio`. A second task, or a second actor doing a different task, is a step folder, `1-nurse-ask-cover/mockup.drawio`, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow). Put the journey for that step in the same folder. Caption the file `Actor · Task`. One row per screen in task order, one frame per state, left to right. A happy path longer than 6 screens splits at the next handoff into `1.1-<step>/`.
4. Build every frame from the component page. Copy each style exactly. Do not invent a `shape=mxgraph.mockup.*` name: an unknown name draws as a plain box, or as nothing. Do not draw a control out of rectangles.
5. Name cells so they trace to the spec: the frame is `SC2-denied`, its children start with `SC2-denied-`. Every screen has at least a `-default` frame. When the layout of a screen is a real choice, add up to three options in rows below it, framed `SC2-b` and `SC2-c`, each with a note giving its trade-off. Name the principle that favours one. Do not draw options that differ only in decoration.
6. Put real content in every control: the words from `write-content`, plausible fictional data, the longest name, the empty list, and the denied message. Name each button by its action.
7. Draw the error, empty, loading, and denied states that `screens.md` lists, with the recovery visible. Show a denied state with the message ID and rule ID in the note.
8. Connect frames with flow arrows from the control the person uses, labelled with the action, following [Lines](../drawio/references/drawio-file.md#lines). A path the product shows is solid, including empty, error, and denied. A dashed arrow is only a layout option.
9. Check the file: unique cell ids, every arrow with a source and a target, nothing overlaps or clips inside a frame, and no two arrows share a segment or cross ([Edges do not overlap](../drawio/references/drawio-file.md#edges-do-not-overlap)). Write the XML into the `.drawio` file. Do not create a Python script, an HTML page, or an image to generate or preview it. Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Product experience in `product-design.md` with its question. A mockup is **proposed**. It does not test real interaction, data, responsive behaviour beyond the frames drawn, accessibility conformance, or whether people succeed.

**Reply:** the file path, the question, the device, the screens and states drawn, the open layout choices with the one you recommend, and what it does not test. When the parent run is [advise mode](../design-product/references/advise-mode.md), name that layout and continue. Do not wait for a person to choose.
