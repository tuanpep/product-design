---
name: drawio
description: "Create Draw.io journey flows (Flowchart shapes), swimlane process maps (BPMN shapes), and navigation maps (Sitemap shapes) as uncompressed .drawio files, and hold the shared file skeleton and built-in-shapes-first rule for every Draw.io skill. Use for /drawio, a journey map, an as-is or to-be process, or a navigation map. ERDs, state machines, sequences, system context, and data flows have their own skills; sketches are sketch-drawio and screen prototypes are prototype-drawio."
disable-model-invocation: true
---

# Drawio

Draw journey flow charts, swimlane processes, and navigation maps as [Draw.io](https://www.drawio.com/) files. Sketches are `sketch-drawio`, screen prototypes are `prototype-drawio`, and the specialist diagrams are `erd-drawio`, `state-drawio`, `sequence-drawio`, `context-drawio`, and `dataflow-drawio`. Copy the skeleton in [drawio-file.md](references/drawio-file.md) and fill it. Write uncompressed XML. Do not base64-encode the diagram.

Use Draw.io's built-in library shapes first, as [drawio-file.md](references/drawio-file.md#built-in-shapes-first) lists: Flowchart for a journey, BPMN for a process, and Sitemap for a navigation map. Never invent a shape name.

1. Name the question the diagram answers. One file, one close flow, as [drawio-file.md](references/drawio-file.md#one-file-per-close-flow) defines. A journey that is already clear in a few sentences does not need a file.
2. Save it beside the proposal in `docs/product-design/<slug>/`: `journey.drawio` for a user's flow, `process.drawio` for a swimlane process across actors, or `navigation.drawio` for a navigation map. When the diagram would be large, put each close flow in a step folder, such as `01-ask-cover/journey.drawio`. Reuse the same file when revising that flow. Do not overwrite a human edit without agreement.
3. For a flow chart, show entry, the main task, each decision, the exception or recovery path, support or offline handoffs, and exit. Label decision arrows Yes or No, or with the actual condition. Reference screen IDs (SC1) and rule IDs (BR1) in labels when they exist. Stop at 12 steps; the next handoff is the next file.
4. For a swimlane process, give each actor or system one lane, top to bottom, using BPMN lanes. Put each step in the lane of the actor who does it, as a task marked for a person, a system, a message, or a rule check. Show handoffs as flows that cross lanes, decisions as exclusive gateways, and waits or timeouts as timer events. Put as-is and to-be of the same flow on separate pages when each page still fits. A second outcome is another file.
5. For a navigation map, draw one sitemap shape per screen labelled with its ID and name, and an arrow for each way between them, labelled with the action. One close flow per file. Screens drawn as the real product belong to `prototype-drawio`.
6. Link the file from `product-design.md` under the section it supports. State what the diagram does not test.

Every shape's parent is `1`, except a step inside a swimlane, whose parent is the lane. Ids `0` and `1` are reserved. Escape `&`, `<`, and `>` in labels. Open the file in Draw.io or the diagrams.net editor and confirm every arrow has a source and a target, and that no two arrows share a segment or cross ([Edges do not overlap](references/drawio-file.md#edges-do-not-overlap)).

A diagram is **proposed**. It is not evidence that a user succeeded, and it is not permission to build.

**Reply:** the file path, the question it answers, and what it does not test.
