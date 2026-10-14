# Sketch components

A sketch shows the shape, not the finish. Every style uses Draw.io's built-in hand-drawn rendering, `sketch=1;curveFitting=1;jiggle=2;`, in greys, so nobody mistakes it for a final design. Copy styles exactly. [example.drawio](example.drawio) uses each one.

The shapes are basic shapes on purpose. Draw.io's **Mockup** library draws finished controls, such as a combo box with its arrow or a chart with axes, and that detail is what a sketch leaves out. Do not use `mxgraph.mockup.*` or other stencil names that are not on this page.

## Board layout

- One actor and one task per file. Caption it `Actor · Task`, such as `Nurse · Ask for cover`. One pair keeps `sketch.drawio`. A second task, or a second actor doing a different task, is a step folder `1-<actor>-<task>/sketch.drawio`. Parents are `1`, `2`, `3`. A split of that step is the child, `1.1-<actor>-<task>/sketch.drawio`. The journey and the prototype of that step sit in the same folder. A happy path longer than 6 screens splits at the next handoff into that child. Inside the file, one row for that actor's happy path, screens left to right. Each alternative layout of a screen in that task gets its own row below, under the screen it replaces. States that change the layout sit on that screen's row.
- Frame size matches the prototype for the device: desktop `1440×900`, tablet `768×1024`, mobile `375×812`. [example.drawio](example.drawio) draws a reduced frame so the sample stays readable; a proposal uses the device size.
- Gap between frames: 200 across, 200 down. A caption sits 36 above each frame, and a note sits 12 below it. The gap is the arrow lane, wide enough for its label and clear of the caption and the note.
- Inside a desktop frame: top region 0–56, side region 0–240 wide, content from x 280, 1120 wide. A tablet uses the same top region and the full width, and a side region only when the product already has one. A phone has a status region 0–44, content below it, and a tab region 64 high at the bottom, with no side region.
- All coordinates are absolute on the page, and every cell's parent is `1`.

## IDs

- A screen's sketch frame is `<screen>-sketch`, for example `SC2-sketch`. Its cells start with that id.
- An alternative is `<screen>-sketch-b`, then `-c`. Captions are `…-caption`, and notes are `…-note`.
- Flow arrows are `flow-1`, `flow-2`, and so on.

## Shapes

All shapes below share the prefix `whiteSpace=wrap;html=1;sketch=1;curveFitting=1;jiggle=2;`.

| Shape | Size | style after the prefix |
| --- | --- | --- |
| Frame | 1440×900 | `rounded=0;fillColor=#ffffff;fillStyle=solid;strokeColor=#333333;strokeWidth=2;` |
| Region (top bar, menu, footer) | as needed | `rounded=0;fillColor=#eeeeee;fillStyle=solid;strokeColor=#666666;fontColor=#666666;fontSize=11;` labelled with its role, such as `Top nav` |
| Content block (list, table, card, chart, map) | as needed | `rounded=0;fillColor=none;strokeColor=#666666;align=left;verticalAlign=top;spacingLeft=8;spacingTop=2;fontSize=11;fontColor=#666666;` labelled with what it holds, such as `Upcoming shifts` |
| Selected or highlighted block | as needed | `rounded=0;fillColor=#dddddd;fillStyle=solid;strokeColor=#333333;` |
| Panel or dialog | as needed | the frame style with `align=left;verticalAlign=top;spacingLeft=8;spacingTop=4;fontSize=12;fontStyle=1;fontColor=#333333;` |
| Text line, strong | 100–200 × 8 | `rounded=1;arcSize=50;fillColor=#999999;fillStyle=solid;strokeColor=none;` |
| Text line, light | 100–320 × 8 | `rounded=1;arcSize=50;fillColor=#cccccc;fillStyle=solid;strokeColor=none;` |
| Field | 300×28 | `rounded=0;fillColor=#ffffff;fillStyle=solid;strokeColor=#333333;align=left;spacingLeft=8;fontSize=11;fontColor=#999999;` labelled with its hint, with ` ▾` for a choice |
| Primary action | auto × 30 | `rounded=1;fillColor=#333333;fillStyle=solid;strokeColor=#333333;fontColor=#ffffff;fontSize=12;` |
| Secondary action | auto × 30 | `rounded=1;fillColor=#ffffff;fillStyle=solid;strokeColor=#333333;fontColor=#333333;fontSize=12;` |
| Status tag | 76×22 | `rounded=1;arcSize=50;fillColor=none;strokeColor=#666666;fontSize=10;fontColor=#666666;` |

Text without the prefix:

| Shape | style |
| --- | --- |
| Screen title | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=16;fontStyle=1;fontColor=#333333;` |
| Field label | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=#333333;` |
| Caption | the screen title style, labelled `SC2 Ask for cover · option A: own page` |
| Callout | 20×20 `ellipse;whiteSpace=wrap;html=1;fillColor=#ff6b00;strokeColor=none;fontColor=#ffffff;fontSize=11;fontStyle=1;` numbered, explained in the note |
| Note | `shape=note;whiteSpace=wrap;html=1;size=12;sketch=1;curveFitting=1;jiggle=2;fillColor=#fff2cc;fillStyle=solid;strokeColor=#d6b656;align=left;verticalAlign=top;spacingLeft=6;fontSize=11;` |
| Flow arrow | `edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;sketch=1;curveFitting=1;jiggle=2;endArrow=open;strokeColor=#333333;strokeWidth=2;fontSize=11;labelBackgroundColor=#ffffff;` The source is the control. The label is the action. Add `dashed=1;` only for a layout option. Follow [Lines](../../drawio/references/drawio-file.md#lines) and [Edges do not overlap](../../drawio/references/drawio-file.md#edges-do-not-overlap). A same-row arrow uses the column gap and enters the next frame on the left. An arrow to the row below uses the row gap, beside the note and the caption, and enters on the top |

## What to leave out

Colour, icons, real body copy, exact spacing, and every state except the one that changes the layout. Those belong to `design-screens` and `prototype-drawio`.
