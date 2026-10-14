---
name: prototype-drawio
description: "Draw a high-fidelity web or mobile screen prototype in Draw.io, using realistic layout and component shapes (browser frame, navigation, sidebar, tables, forms, badges, alerts, modals) for every screen and state in screens.md. Use for /prototype-drawio, after design-screens, or when people need to see the product's shape."
disable-model-invocation: true
---

# Prototype Draw.io

Read [principle-use-real-content](../principle-use-real-content/SKILL.md), [principle-design-every-state](../principle-design-every-state/SKILL.md), and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). The prototype should look like the product people will use, so they can judge layout, content, and states. It is still a proposal, not a built screen.

1. Name the question the prototype answers. Read `screens.md` and draw only the screens and states it lists. If it does not exist, run `design-screens` first.
2. Inspect the target project for an existing UI, design system, or tokens. Match its layout, navigation, colours, font, and corner radius. Otherwise use the palette in [the component library](references/web-components.md). Say which in the frame notes.
3. Choose the device from the context of use: desktop browser, tablet, or mobile. Use the same device for every frame unless the slice is responsive, then draw the hardest one first.
4. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md). One actor and one task keep `prototype.drawio`. A second task, or a second actor doing a different task, is a step folder, `01-nurse-ask-cover/prototype.drawio`, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow). Use the same folder as the sketch and the journey for that step. Caption the file `Actor · Task`. Draw each screen of that task once, in this actor's file. A second actor who only has less access to this task is a denied or read-only state here. End at the handoff, and start the other actor's file at what they receive. Inside a file, one row per screen in task order, one frame per state, left to right, with a caption above and a note below. A happy path longer than 6 screens splits at the next handoff; the state frames stay with their screen.
5. Build every frame from [the component library](references/web-components.md): the real chrome (browser bar, top navigation, sidebar, or mobile status and tab bars), then page title, breadcrumb, and content using the library's tables, cards, inputs, selects, checkboxes, radios, toggles, tabs, badges, alerts, toasts, modals, skeletons, and empty-state blocks. Copy styles exactly. Do not invent stencil names.
6. Name cells so they trace to the spec: the frame is `SC2-denied`, its children start with `SC2-denied-`. Every screen has at least a `-default` frame.
7. Put real content in every control: the words from `write-content`, plausible fictional data, the longest name, the empty list, and the denied message. Name each button by its action.
8. Draw the error, empty, loading, and denied states that `screens.md` lists, with the recovery visible. Show a denied state with the message ID and rule ID in the note.
9. Connect frames with flow arrows from the control the user acts on to the frame that follows, labelled with the action. Dash arrows for system-caused changes. Route arrows through the gaps between frames.
10. Check the file: every cell id is unique, every arrow has a source and a target, nothing overlaps or clips inside a frame, and no two arrows share a segment or cross ([Edges do not overlap](../drawio/references/drawio-file.md#edges-do-not-overlap)). Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Product experience in `product-design.md`, with its question. State what it does not test: no real interaction, no data, no responsive behaviour beyond the frames drawn, and no accessibility conformance or usability result.

**Reply:** the file path, the question, the device, the screens and states drawn, whose visual style it follows, and what it does not test.
