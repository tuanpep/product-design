---
name: sketch-drawio
description: "Sketch the quick shape of a product in Draw.io before the prototype: hand-drawn, grayscale frames for each screen in the main journey, showing layout regions, content blocks, and key actions, with alternative layouts where the choice is open. Use for /sketch-drawio, after design-experience, or to agree the shape before investing in screens and a prototype."
disable-model-invocation: true
---

# Sketch Draw.io

Read [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md) and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). A sketch is cheap so that it can be wrong. It settles which screens exist, what each one is for, and roughly where things go, before anyone details states or polish.

1. Name the question the sketch answers, for example: one page or a side panel for asking cover? Read the journey from `design-experience`, and the journey files (`journey.drawio`, or `journey-<flow>.drawio`) if they exist.
2. List the screens the journey needs, one per step the person sees, and number them SC1, SC2, and so on in journey order. `design-screens` keeps these IDs.
3. Choose the device from the context of use. Inspect the target project for an existing layout, such as a top bar with a side menu, and sketch inside it rather than inventing a new frame.
4. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the sketch components](references/sketch-components.md). One actor and one task keep `sketch.drawio`. A second task, or a second actor doing a different task, is `sketch-<actor>-<task>.drawio`, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow). Caption the file `Actor · Task`. Lay that actor's happy path in one row, left to right. A happy path longer than 6 screens splits at the next handoff.
5. In each frame, draw only the shape: layout regions, content blocks labelled with what they hold, fields labelled with their hint, and the primary and secondary actions. Use real words for screen titles, block labels, and action labels. Body text can be grey lines. Do not add colour, icons, or detail.
6. Draw the default state of each screen. Add another state only when it changes the layout, such as an empty list that replaces a table, or a denial that blocks the page.
7. When the layout of a screen is a real choice, sketch up to three options in rows below it, labelled A, B, and C, each with a note giving its trade-off. Name the principle that favours one. Do not sketch options that differ only in decoration.
8. Number the decisions worth discussing with callouts, and explain each in the frame's note. Connect frames with flow arrows labelled with the action.
9. Check the file: unique cell ids, every arrow with a source and a target. Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Product experience in `product-design.md` with its question. A sketch is **proposed**. It does not test content, states, accessibility, or whether people succeed.

**Reply:** the file path, the question, the screens and their order, the open layout choices with each trade-off, and the decision you need before the prototype.
