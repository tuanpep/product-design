---
name: drawio
description: "Create Draw.io journey flows (Flowchart shapes), swimlane process maps (BPMN shapes), and navigation maps (Sitemap shapes) as uncompressed .drawio files, and hold the shared file skeleton and built-in-shapes-first rule for every Draw.io skill. Use for /drawio, a journey map, an as-is or to-be process, or a navigation map. ERDs, state machines, sequences, system context, and data flows have their own skills; screen mockups are mockup-drawio."
disable-model-invocation: true
---

# Drawio

Draw journey flow charts, swimlane processes, and navigation maps as [Draw.io](https://www.drawio.com/) files. Screen mockups are `mockup-drawio`, and the specialist diagrams are `erd-drawio`, `state-drawio`, `sequence-drawio`, `context-drawio`, and `dataflow-drawio`. Copy the skeleton in [drawio-file.md](references/drawio-file.md) and fill it. Write uncompressed XML into the `.drawio` file. Do not base64-encode the diagram, and do not create a Python script, an HTML page, or an image to generate or preview it.

Use Draw.io's built-in library shapes first, as [drawio-file.md](references/drawio-file.md#built-in-shapes-first) lists: Flowchart for a journey, BPMN for a process, and Sitemap for a navigation map. Never invent a shape name.

1. Name the question the diagram answers. One file, one close flow, as [drawio-file.md](references/drawio-file.md#one-file-per-close-flow) defines. A journey that is already clear in a few sentences does not need a file.
2. Save it beside the proposal in `docs/product-design/<slug>/`: `journey.drawio` for a user's flow, `process.drawio` for a swimlane process across actors, or `navigation.drawio` for a navigation map. When the diagram would be large, put each close flow in a step folder, such as `1-ask-cover/journey.drawio`. Reuse the same file when revising that flow. Do not overwrite a human edit without agreement.
3. For a flow chart, follow [Flow chart cells](references/drawio-file.md#flow-chart-cells). Show entry, the main task, each decision, the exception or recovery path, support or offline handoffs, and exit. The main path is one column, top to bottom. Each decision exit leaves a different side, and the exits cover every case. A handoff done by hand is a manual operation, a form or message is a document, a screen is a display, a wait is a delay, and a step drawn in the next file is a predefined process. Start and end with a terminator. Stop at 12 steps; the next handoff is the next file, and both files name that handoff with the same words.
4. For a swimlane process, give each actor or system one lane, top to bottom, using BPMN lanes. Put each step in the lane of the actor who does it, as a task marked for a person, a system, a message, or a rule check. Time runs left to right. The happy path is one horizontal line. Exceptions and failures drop below it. A gateway either splits or joins. Every shape sits on a path from a start event to an end event, a task has one way in and one way out, and branching is a gateway. Show handoffs as flows that cross lanes through the gap between steps, decisions as exclusive gateways whose exits cover every case, and waits or timeouts as timer events. Put as-is and to-be of the same flow on separate pages when each page still fits. A second outcome is another file.
5. For a navigation map, draw one sitemap shape per screen labelled with its ID and name, the entry at the left or the top, and an arrow for each way between them, labelled with the action. One close flow per file. Screens drawn as the product belong to `mockup-drawio`.
6. Link the file from `product-design.md` under the section it supports. State what the diagram does not test.

Every shape's parent is `1`, except a step inside a swimlane, whose parent is the lane. Ids `0` and `1` are reserved. Escape `&`, `<`, and `>` in labels. Route every arrow by [Relationship lines](references/drawio-file.md#relationship-lines): orthogonal edges, explicit ends, page-coordinate waypoints, one spine per fork, and a 24 px clearance. Open the file in Draw.io or the diagrams.net editor and run that section's geometry check.

A diagram is **proposed**. It is not evidence that a user succeeded, and it is not permission to build.

**Reply:** the file path, the question it answers, and what it does not test.
