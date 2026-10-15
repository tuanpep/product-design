# Draw.io file

Write this uncompressed XML into the `.drawio` file. Draw.io and diagrams.net open it directly. Do not create a Python script, an HTML page, or an image to generate or preview it. Add cells inside `<root>`, after the two reserved cells. Keep `id="0"` and `id="1"` exactly as they are.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" type="device">
  <diagram id="page-1" name="Journey">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## One file per close flow

One file answers one question and draws one close flow: one entry, the main steps, the decisions on that path, and the recovery that belongs to them. A second outcome is a second file.

A mockup uses a high-fidelity wireflow arrangement: one actor completing one task, with an annotated arrow from the control they use. The caption names both, `Nurse · Ask for cover`. Arrange business views in the usage order declared by `screens.md`, left to right and then top to bottom, with important branches clearly labelled. Do not use fixed technical-state columns. A role variant that makes a distinct business decision needs its actual inputs and actions drawn, not just a denied frame or annotation. A second actor doing a different task gets their own file. End this file at the handoff. Start the other actor's file at what they receive, and name the handoff in both captions. Reuse screen IDs across meaningful business views. The cross-actor picture stays in `process.drawio`, with parallel work visibly parallel rather than explained away in a note.

Name one flow `journey.drawio`, `process.drawio`, `navigation.drawio`, `mockup.drawio`, `context.drawio`, `erd.drawio`, `states.drawio`, `sequence.drawio`, or `dataflow.drawio`, in the package folder.

Several flows are grouped in step folders. The index is a parent, or that parent and a child: `1`, then `1.1`, then `2`. It starts at `1`. Do not pad it with a zero. The folder is the group a reader opens. The files inside keep the short names:

```text
docs/product-design/shift-swaps/
  product-design.md
  screens.md
  1-nurse-ask-cover/
    journey.drawio
    mockup.drawio
  1.1-nurse-choose-colleague/
    mockup.drawio
  2-colleague-accept-cover/
    journey.drawio
    mockup.drawio
    sequence.drawio
```

`1` is the first business step. `1.1` is a split of that step, such as the next handoff inside the same task. `2` is the next business step. Parents run `1`, `2`, `3` with no gaps. Children of a parent run `.1`, `.2`, `.3` with no gaps, and a child is named only when that parent folder exists. The folder name is the business step, and includes the actor when the step is one actor's task. A folder holds every diagram of that step: the journey, the mockup, the sequence, the state machine. The decision documents stay in the package folder. A diagram of the whole product that was not split stays there too, such as one `context.drawio`. A kind lives in the package folder or in the step folders. After a step is added or removed, renumber that parent and its children so the sequence has no gaps, and update the links. Screen IDs stay as they are. Link each folder in index order, parent before its children, with the actor, the task, and the question it answers. A flow arrow stays inside its file.

Keep one page. A second `<diagram>` is a paired view of that same flow, and only when each view still fits: as-is and to-be in a process, logical and physical in an ERD, context and containers in a context diagram.

Split when any of these is true:

- The file would hold a second close flow: another task, another actor doing a different task, another scenario, another entity lifecycle, or another data journey.
- A flowchart or swimlane would need more than 12 steps.
- A mockup happy path would need more than 6 screens. State frames of those screens stay with the task.
- The file would have more than 400 shapes, or a third page.

An ERD splits when a second cluster of entities shares no relationship with the first. Logical and physical of one cluster stay together.

## Built-in shapes first

Draw.io ships a library for most software diagrams. A shape from the library opens as the real thing: a person can edit an ER table row by row, add a lane to a BPMN process, or change a C4 element's properties, and the notation is the one readers already know.

1. Use the built-in library that names the diagram, from the table below. Copy the library's template style exactly, then add only colour, stroke, and font properties after it. Change a template value only when a components reference says which and why.
2. Use only shape names that appear in a components reference or in a Draw.io library template. Never invent a `shape=mxgraph.*` name: an unknown name draws as a plain box, or as nothing, and the error is silent.
3. Screen mockups are the exception: use product-styled basic shapes from `mockup-drawio/references/web-components.md` to match the target UI. For other diagrams, fall back to a basic shape (rectangle, rounded rectangle, ellipse, rhombus, text, note) only when no library shape means the thing. The components reference says which shapes are basic and why.
4. Do not mix two libraries for the same kind of element in one file.

| Diagram | File | Built-in library | Skill |
| --- | --- | --- | --- |
| Journey flow | `journey.drawio` | Flowchart | `drawio` |
| Swimlane process | `process.drawio` | BPMN 2.0: lanes, events, tasks, gateways, sequence flow | `drawio` |
| Navigation map | `navigation.drawio` | Sitemap | `drawio` |
| Entity relationship | `erd.drawio` | Entity Relation: table, crow's-foot ends | `erd-drawio` |
| State machine | `states.drawio` | UML 2.5: state, pseudostates, transition | `state-drawio` |
| Sequence | `sequence.drawio` | UML: lifeline, activation, message, frame | `sequence-drawio` |
| System context | `context.drawio` | C4 | `context-drawio` |
| Data flow and trust boundaries | `dataflow.drawio` | Threat Modeling | `dataflow-drawio` |
| Screen mockup | `mockup.drawio` | Basic shapes styled to the product: chrome, navigation, tables, forms, and feedback | `mockup-drawio` |

## Edges do not overlap

Every connector keeps its own lane. Two edges do not share a segment, and they do not cross. A label does not sit on another edge or on a shape. This applies to every Draw.io file: journey, process, navigation, mockup, context, ERD, state, sequence, and data flow.

1. Leave a gap between shapes wide enough for the label. That gap is the lane.
2. Set `exitX`, `exitY`, `entryX`, and `entryY` so two edges do not leave or enter the same point. When several edges use one side, spread them (`0.25`, `0.5`, `0.75`).
3. Add waypoints so each segment stays in its lane and runs through the gap, not across a shape. A waypoint is an `<mxPoint>` inside `<Array as="points">`.
4. When two labels would meet, move one along its edge with `<mxGeometry x="-0.5" relative="1" as="geometry" />` (`x` from `-1` to `1`). A labelled edge keeps `labelBackgroundColor=#ffffff`.
5. Reroute before you allow a crossing. A crossing that cannot be rerouted adds `jumpStyle=arc;jumpSize=12;`. Sequence messages stay horizontal, one y each, so they never jump. A crow's-foot line moves its table instead of crossing another table.

Mockup frames use the gap between frames as the lane. The component page for a diagram says which lane is which.

## Lines

A line is the relationship. The same stroke means the same thing in a flowchart, a swimlane, a navigation map, and a mockup.

- **Solid.** This path happens. The label is the trigger. A person acts in the words they see (`Ask for cover`). Nobody acts: `System:` plus the condition or the rule id (`System: Hours rule fails (BR2)`). A line with no choice has an empty value.
- **Dashed** (`dashed=1`). An alternative that is not a path the product takes: a layout option, or a design branch still open. A decision's Yes and No are solid. A state the product shows, including empty, error, and denied, is solid.

Every edge has `edge="1"`, a `source`, and a `target`. A flowchart, navigation, or mockup edge has `parent="1"`. A swimlane sequence flow also has `parent="1"`, including a flow that stays inside one lane. A labelled edge keeps `labelBackgroundColor=#ffffff`.

Direction is left to right and top to bottom. A line enters a shape on the left (`entryX=0`) or the top (`entryY=0`) and leaves on the right (`exitX=1`) or the bottom (`exitY=1`). Two lines that use one side take `0.25` and `0.75`, not the same point. A waypoint sits in the gap named below, not on a shape. When two lines arrive at one shape, offset the join so they do not share a segment.

A wireflow arrow starts on the control the person uses. When nobody acts, it starts on the frame. A same-row arrow travels in the column gap and enters the next frame on the left. An arrow to the row below travels in the row gap, beside the caption and the note, and enters the next frame on the top.

Set `pageWidth` and `pageHeight` to the bounds of the shapes plus 40, rounded up to a multiple of 10, so the chart is not left on the default A4 page when it is taller or wider.

## Flow chart cells

Use the built-in **Flowchart** library. Copy a name from the table.

**Organize.** One main column, top to bottom: a terminator, the steps, a terminator. The main path is the column. A decision has one entry, from the top. One exit stays in the column and leaves the bottom. Each other exit leaves a different side into its own column: the right side first, then the left. The exits are mutually exclusive and cover every case. Two exits may be labelled Yes and No. Three or more use the real conditions. A path that joins back runs through the gap and enters the main shape on the left or the top.

The first shape is a terminator. The last shape of every path that leaves the chart is a terminator. When the next file continues this flow, both terminators use the same handoff words (`Colleague receives the request`). A step that is only a pointer to that file is a predefined process, labelled with the next file's caption. An off-page reference is the pair of shapes that break one line across two files of the same actor; both shapes use one label, such as `1.1 Choose colleague`. A handoff to someone else ends in a terminator. A line that the same actor continues in the next file ends in an off-page reference.

An action label is a verb plus an object (`Ask a colleague to cover`). The same words mean the same step. A screen id (SC1) or a rule id (BR1) goes in the label when it exists. Text that does not fit is an annotation connected to the shape, not a second process.

**Place.** On a grid of 10. The main column's 160-wide shapes sit at x = 320. A terminator in that column sits at x = 340, so the centres share x = 400. The first shape's y is 40. Each next shape on that path is 160 lower. The right-hand column's 160-wide shapes sit at x = 600 (a 120 gap for the label). A terminator in that column sits at x = 620. The left-hand column, used only for a third exit, sits at x = 40. A 60-wide off-page reference is centred on its column (main column x = 370).

| Step | Size | style |
| --- | --- | --- |
| Start, end, or handoff | 120×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;` |
| Action in the product | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.process;whiteSpace=wrap;` |
| Decision | 160×80 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.decision;whiteSpace=wrap;` |
| A person does it by hand, or the work leaves the product | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.manual_operation;whiteSpace=wrap;` |
| A form, message, or paper | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.document;whiteSpace=wrap;` |
| A screen the person is shown | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.display;whiteSpace=wrap;` |
| Wait | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.delay;whiteSpace=wrap;` |
| This step is drawn in the next file | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.predefined_process;whiteSpace=wrap;` |
| The line continues in the next file | 60×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.off-page_reference;whiteSpace=wrap;` |
| Note that does not fit in the shape | as needed | `strokeWidth=2;html=1;shape=mxgraph.flowchart.annotation_1;whiteSpace=wrap;` |

**Relate.** The connector is `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;strokeWidth=2;fontSize=12;labelBackgroundColor=#ffffff;`. The main path leaves the bottom and enters the top. Yes leaves the bottom. No leaves the right and enters the side column on the left. A third condition leaves the left. Follow [Lines](#lines) and [Edges do not overlap](#edges-do-not-overlap).

```xml
<mxCell id="start" value="Start" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="340" y="40" width="120" height="60" as="geometry" />
</mxCell>
<mxCell id="choice" value="Eligible?" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.decision;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="320" y="200" width="160" height="80" as="geometry" />
</mxCell>
<mxCell id="ask" value="Ask a colleague to cover (SC2)" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.process;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="320" y="360" width="160" height="60" as="geometry" />
</mxCell>
<mxCell id="end" value="Request sent" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="340" y="520" width="120" height="60" as="geometry" />
</mxCell>
<mxCell id="handoff" value="Ask the charge nurse" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="620" y="210" width="120" height="60" as="geometry" />
</mxCell>
<mxCell id="to-choice" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;strokeWidth=2;fontSize=12;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="start" target="choice">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
<mxCell id="yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;strokeWidth=2;fontSize=12;labelBackgroundColor=#ffffff;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="choice" target="ask">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
<mxCell id="no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;strokeWidth=2;fontSize=12;labelBackgroundColor=#ffffff;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="choice" target="handoff">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

## Swimlane process cells

Use the built-in **BPMN 2.0** library. One lane per actor or system, 1000 wide by 160 tall, stacked with no gap. A step inside a lane uses the lane's id as its `parent`, and its geometry is relative to the lane. Flows between lanes keep `parent="1"`.

Events, tasks, and gateways share these template prefixes; the table adds the rest.

- **Event:** `points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;`
- **Task:** `points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task2;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;`
- **Gateway:** `points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;`

| Shape | Size | style |
| --- | --- | --- |
| Lane | 1000×160 | `swimlane;html=1;startSize=20;fontStyle=0;collapsible=0;horizontal=0;swimlaneLine=1;swimlaneFillColor=#ffffff;strokeWidth=2;whiteSpace=wrap;` |
| Start | 50×50 | Event, then `outline=standard;symbol=general;` |
| End | 50×50 | Event, then `outline=end;symbol=terminate2;` |
| Wait or timeout | 50×50 | Event, then `outline=catching;symbol=timer;`, labelled with the time, such as `12 h before shift` |
| Message received | 50×50 | Event, then `outline=catching;symbol=message;` |
| Step a person does in the product | 120×80 | Task, then `taskMarker=user;` |
| Step done by hand, outside any system | 120×80 | Task, then `taskMarker=manual;` |
| Step a system does | 120×80 | Task, then `taskMarker=service;` |
| Message sent | 120×80 | Task, then `taskMarker=send;` |
| Rule check | 120×80 | Task, then `taskMarker=businessRule;`, labelled with the rule ID |
| Decision | 50×50 | Gateway, then `outline=none;symbol=none;gwType=exclusive;`, with the question as its label |
| Parallel split or join | 50×50 | Gateway, then `outline=none;symbol=none;gwType=parallel;` |
| Flow | edge | `edgeStyle=elbowEdgeStyle;fontSize=12;html=1;endArrow=blockThin;endFill=1;` |

```xml
<mxCell id="lane-nurse" value="Nurse" style="swimlane;html=1;startSize=20;fontStyle=0;collapsible=0;horizontal=0;swimlaneLine=1;swimlaneFillColor=#ffffff;strokeWidth=2;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="40" y="40" width="1000" height="160" as="geometry" />
</mxCell>
<mxCell id="lane-roster" value="Roster system" style="swimlane;html=1;startSize=20;fontStyle=0;collapsible=0;horizontal=0;swimlaneLine=1;swimlaneFillColor=#ffffff;strokeWidth=2;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="40" y="200" width="1000" height="160" as="geometry" />
</mxCell>
<mxCell id="ask" value="Ask a colleague to cover (SC2)" style="points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task2;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;taskMarker=user;" vertex="1" parent="lane-nurse">
  <mxGeometry x="80" y="40" width="120" height="80" as="geometry" />
</mxCell>
<mxCell id="check" value="Check hours rule (BR2)" style="points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task2;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;taskMarker=businessRule;" vertex="1" parent="lane-roster">
  <mxGeometry x="300" y="40" width="120" height="80" as="geometry" />
</mxCell>
<mxCell id="ask-check" value="" style="edgeStyle=elbowEdgeStyle;fontSize=12;html=1;endArrow=blockThin;endFill=1;" edge="1" parent="1" source="ask" target="check">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

**Organize.** The actor who starts is the top lane. Time runs left to right. Every shape sits on a path from a start event to an end event. A task has one way in and one way out. Branching is a gateway: an exclusive gateway's exits are mutually exclusive and cover every case, and a join is the gateway with several ways in and one way out. A parallel gateway's arrows have an empty value. An activity label is a verb plus an object. Two end events share a name only when they are the same outcome.

**Place.** The first step in a lane is at x = 40, and each next step is 200 to the right (an 80 gap after a 120-wide task). A wait is a timer event in the lane of whoever waits, not a task.

**Relate.** Follow [Lines](#lines). A cross-lane flow runs through the gap between steps, not across a task, and follows [Edges do not overlap](#edges-do-not-overlap). An exclusive exit is labelled Yes or No, or with the condition, and leaves the side that faces its target (`exitX=1` going right, `entryX=0` on the target).

## Navigation map cells

Use the built-in **Sitemap** library. One shape per screen, 160×90, labelled `SC1 My shifts`. Every screen shares this template prefix; the shape name after it says what kind of screen it is.

`html=1;whiteSpace=wrap;strokeColor=none;fillColor=#0079D6;labelPosition=center;verticalLabelPosition=middle;verticalAlign=top;align=center;fontSize=12;outlineConnect=0;spacingTop=-6;fontColor=#FFFFFF;sketch=0;shape=mxgraph.sitemap.`

| Screen | Shape name |
| --- | --- |
| Any screen without a better match | `page` |
| Home or dashboard | `home` |
| Sign in | `login` |
| Form or request | `form` |
| Search or list to search | `search` |
| Calendar or schedule | `calendar` |
| Settings | `settings` |
| Profile or account | `profile` |
| Messages or inbox | `mail` |
| Confirmation | `success` |
| Error or blocked | `error` |
| Warning | `warning` |
| Help | `faq` |

Use `page` for any screen the table does not cover, rather than guessing another name. Place the entry screen at the left or the top, and step 200 to the next screen so the gap holds the label. Label each arrow with the action that moves between screens, in the words the user sees, using the flow chart connector. The line follows [Lines](#lines): it leaves the right or the bottom and enters the left or the top, and it follows [Edges do not overlap](#edges-do-not-overlap). Screen mockups use the component library in `mockup-drawio`.
