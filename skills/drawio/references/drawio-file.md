# Draw.io file

Write this uncompressed XML. Draw.io and diagrams.net open it directly. Add cells inside `<root>`, after the two reserved cells. Keep `id="0"` and `id="1"` exactly as they are.

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

A sketch or a prototype is a wireflow: one actor completing one task, with an arrow from the control they use. The caption names both, `Nurse · Ask for cover`. States of those screens (empty, error, denied, loading) and layout alternatives of a screen in that task stay in the file. A second actor who does this same task with less access stays too, as a denied or read-only state. A second actor who does a different task gets their own file. End this file at the handoff. Start the other actor's file at what they receive, and name the handoff in both captions. The screen is drawn once, in the file of the actor who acts on it. The cross-actor picture stays in `process.drawio`.

Name one flow `journey.drawio`, `process.drawio`, `navigation.drawio`, `sketch.drawio`, `prototype.drawio`, `context.drawio`, `erd.drawio`, `states.drawio`, `sequence.drawio`, or `dataflow.drawio`, in the package folder.

Several flows are grouped in step folders, numbered in business order. The folder is the group a reader opens. The files inside keep the short names:

```text
docs/product-design/shift-swaps/
  product-design.md
  screens.md
  01-nurse-ask-cover/
    journey.drawio
    sketch.drawio
    prototype.drawio
  02-colleague-accept-cover/
    journey.drawio
    sketch.drawio
    prototype.drawio
    sequence.drawio
```

`NN` is two digits starting at 01. The folder name is the business step, and includes the actor when the step is one actor's task. A folder holds every diagram of that step: the journey, the sketch, the prototype, the sequence, the state machine. The decision documents stay in the package folder. A diagram of the whole product that was not split stays there too, such as one `context.drawio`. A kind lives in the package folder or in the step folders. After a step is added or removed, renumber the folders so the sequence has no gaps, and update the links. Screen IDs stay as they are. Link each folder in index order, with the actor, the task, and the question it answers. A flow arrow stays inside its file.

Keep one page. A second `<diagram>` is a paired view of that same flow, and only when each view still fits: as-is and to-be in a process, logical and physical in an ERD, context and containers in a context diagram.

Split when any of these is true:

- The file would hold a second close flow: another task, another actor doing a different task, another scenario, another entity lifecycle, or another data journey.
- A flowchart or swimlane would need more than 12 steps.
- A sketch or prototype happy path would need more than 6 screens. State frames of those screens stay with the task.
- The file would have more than 400 shapes, or a third page.

An ERD splits when a second cluster of entities shares no relationship with the first. Logical and physical of one cluster stay together.

## Built-in shapes first

Draw.io ships a library for most software diagrams. A shape from the library opens as the real thing: a person can edit an ER table row by row, add a lane to a BPMN process, or change a C4 element's properties, and the notation is the one readers already know.

1. Use the built-in library that names the diagram, from the table below. Copy the library's template style exactly, then add only colour, stroke, and font properties after it. Change a template value only when a components reference says which and why.
2. Use only shape names that appear in a components reference or in a Draw.io library template. Never invent a `shape=mxgraph.*` name: an unknown name draws as a plain box, or as nothing, and the error is silent.
3. Fall back to a basic shape (rectangle, rounded rectangle, ellipse, rhombus, text, note) only when no library shape means the thing. The components reference says which shapes are basic and why.
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
| Sketch | `sketch.drawio` | Basic shapes with Draw.io's built-in `sketch=1` rendering | `sketch-drawio` |
| Screen prototype | `prototype.drawio` | Basic shapes styled as the product; see `prototype-drawio` for why | `prototype-drawio` |

## Edges do not overlap

Every connector keeps its own lane. Two edges do not share a segment, and they do not cross. A label does not sit on another edge or on a shape. This applies to every Draw.io file: journey, process, navigation, sketch, prototype, context, ERD, state, sequence, and data flow.

1. Leave a gap between shapes wide enough for the label. That gap is the lane.
2. Set `exitX`, `exitY`, `entryX`, and `entryY` so two edges do not leave or enter the same point. When several edges use one side, spread them (`0.25`, `0.5`, `0.75`).
3. Add waypoints so each segment stays in its lane and runs through the gap, not across a shape. A waypoint is an `<mxPoint>` inside `<Array as="points">`.
4. When two labels would meet, move one along its edge with `<mxGeometry x="-0.5" relative="1" as="geometry" />` (`x` from `-1` to `1`). A labelled edge keeps `labelBackgroundColor=#ffffff`.
5. Reroute before you allow a crossing. A crossing that cannot be rerouted adds `jumpStyle=arc;jumpSize=12;`. Sequence messages stay horizontal, one y each, so they never jump. A crow's-foot line moves its table instead of crossing another table.

Sketch and prototype frames use the gap between frames as the lane. The component page for a diagram says which lane is which.

## Flow chart cells

Use the built-in **Flowchart** library. Place vertices on the layer and connect them with edges. Step x by 200 and y by 120. Do not overlap labels.

| Step | Size | style |
| --- | --- | --- |
| Start or end | 120×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;` |
| Action | 160×60 | `rounded=1;whiteSpace=wrap;html=1;absoluteArcSize=1;arcSize=14;strokeWidth=2;` |
| Decision | 160×80 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.decision;whiteSpace=wrap;` |
| Handoff to a person or another channel | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.document2;whiteSpace=wrap;size=0.25;` |
| Wait | 160×60 | `strokeWidth=2;html=1;shape=mxgraph.flowchart.delay;whiteSpace=wrap;` |

```xml
<mxCell id="start" value="Start" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.terminator;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="80" y="40" width="120" height="60" as="geometry" />
</mxCell>
<mxCell id="choice" value="Eligible?" style="strokeWidth=2;html=1;shape=mxgraph.flowchart.decision;whiteSpace=wrap;" vertex="1" parent="1">
  <mxGeometry x="60" y="160" width="160" height="80" as="geometry" />
</mxCell>
<mxCell id="yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;" edge="1" parent="1" source="start" target="choice">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

Every edge has `edge="1"`, `parent="1"`, `source`, and `target`, and uses Draw.io's default connector, `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;`. Put the condition in the edge `value`. Yes and No leave a decision from different sides. Route every edge by [Edges do not overlap](#edges-do-not-overlap).

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

Label a decision's outgoing flows Yes or No, or with the condition. A wait is a timer event in the lane of whoever waits, not a step. A flow that crosses lanes runs through the gap between steps, not across a task, and follows [Edges do not overlap](#edges-do-not-overlap).

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

Use `page` for any screen the table does not cover, rather than guessing another name. Label each arrow with the action that moves between screens, in the words the user sees, using the flow chart connector, and route it by [Edges do not overlap](#edges-do-not-overlap). Screen prototypes use the component library in `prototype-drawio`.
