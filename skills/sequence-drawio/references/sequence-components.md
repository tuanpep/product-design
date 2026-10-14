# Sequence diagram components for Draw.io

Every shape below is a template from Draw.io's built-in **UML** library: lifeline, activation bar, message, return, self call, and frame. Each style is the library template followed by colour and font properties. Messages use the library's `sequenceEdgeStyle`, which keeps them horizontal, and also set their exit and entry points so they stay horizontal in older Draw.io builds. Copy a style exactly and change only the label, position, and size. [example.drawio](example.drawio) uses each one.

## Layout

- One file per scenario, one page: `<diagram id="<scenario>" name="<Scenario>">`, such as `Accept cover`. One scenario is `sequence.drawio`. Each further scenario is `1-<step>/sequence.drawio`, in that step's folder.
- Lifelines are 160 wide, 240 apart, starting at x 40, y 80. The people who start the scenario are on the left, then the product, then other systems, then the people who are told last.
- Messages run top to bottom, one every 40 to 50 down, starting at y 160. Every message is horizontal: its two ends share one y, and no two messages share a y ([Edges do not overlap](../../drawio/references/drawio-file.md#edges-do-not-overlap)). A self-call loop stays 50 right of that lifeline, clear of the next one.
- A caption sits at the top left. A note under the lifelines names the question, the source sections, and what the diagram does not test.

## Structure

| Cell | parent | geometry |
| --- | --- | --- |
| Lifeline | `1` | absolute; 160 wide, tall enough to pass the last message by 40 |
| Activation bar | its lifeline | relative to the lifeline: x 75 (centred), y = the bar's top minus the lifeline's top; 10 wide |
| Nested bar, for a self call | its lifeline | as above, with x 80 |
| Message, return, self call | `1` | `relative="1"`; source and target are activation bars |
| Frame, guard, divider | `1` | absolute, drawn before the lifelines so they sit behind |

Every message connects two activation bars, never a lifeline, so it has a `source` and a `target`. Set the ends so the line is horizontal at the message's y: `exitX=1` and `entryX=0` when the target is to the right, `exitX=0` and `entryX=1` when it is to the left, and `exitY` and `entryY` equal to the message's y minus the bar's top, divided by the bar's height.

## IDs

- Lifelines `ll-<participant>`, in kebab case: `ll-colleague`, `ll-roster`.
- Activation bars `act-<participant>`, then `act-<participant>-2` for a second or nested bar.
- Messages `msg-1`, `msg-2`, and so on, top to bottom, including returns and self calls.
- Frames `frag-<operator>-1`, with guards `frag-<operator>-1-guard-1` and dividers `frag-<operator>-1-else`.
- Caption `sequence-caption`, note `sequence-note`.

## Lifelines

The lifeline template is:

`shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={&quot;edgeStyle&quot;:&quot;sequenceEdgeStyle&quot;,&quot;libavoidRouting&quot;:0,&quot;curved&quot;:0,&quot;rounded&quot;:0};`

Then add `size=40;fontSize=13;fontStyle=1;` and one of:

| Participant | style after the template | Label |
| --- | --- | --- |
| Person | `fillColor=#ffffff;strokeColor=#1f2937;fontColor=#1b1f24;` | name and role, such as `Lan · colleague` |
| The product | `fillColor=#1f6b4a;strokeColor=#1f6b4a;fontColor=#ffffff;` | the product or service name, such as `Shift swaps` |
| Another system | `fillColor=#f6f8fa;strokeColor=#8c959f;fontColor=#57606a;dashed=1;` | the system and its integration ID, such as `Roster system (I1)` |

A person is a lifeline box, not the library's actor figure (`participant=umlActor`): the figure draws the name on top of itself. Split the product into parts, such as an API and a worker, only when the build-spec names them or a failure between them changes what a person sees.

## Activation bars

The activation bar template, then `fillColor=#ffffff;strokeColor=#1f2937;`:

`html=1;points=[[0,0,0,0,5],[0,1,0,0,-5],[1,0,0,0,5],[1,1,0,0,-5]];perimeter=orthogonalPerimeter;outlineConnect=0;targetShapes=umlLifeline;portConstraint=eastwest;newEdgeStyle={&quot;edgeStyle&quot;:&quot;sequenceEdgeStyle&quot;,&quot;libavoidRouting&quot;:0,&quot;curved&quot;:0,&quot;rounded&quot;:0};`

A bar starts 10 above the first message it sends or receives and ends 10 below the last. A participant that only receives a notification gets a 30-high bar around that message.

## Messages

All messages share the library's sequence routing, `edgeStyle=sequenceEdgeStyle;libavoidRouting=0;curved=0;rounded=0;`, then `strokeColor=#1f2937;fontSize=11;fontColor=#1b1f24;labelBackgroundColor=#ffffff;`, then the exit and entry points.

| Message | Template before the routing | Use |
| --- | --- | --- |
| Call | `html=1;verticalAlign=bottom;endArrow=block;` | the sender waits for an answer |
| Asynchronous | `html=1;verticalAlign=bottom;endArrow=open;endSize=8;` | a notification, an email, or a queued job: the sender does not wait |
| Return | `html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;` | the answer to a call, including an error or a timeout |
| Self call | `html=1;align=left;spacingLeft=2;endArrow=block;` | a step the participant does itself, such as a rule check; from the bar to a nested bar, with two waypoints 50 right of the lifeline's centre |

The asynchronous message is the call template with the return's open arrowhead: UML draws an asynchronous message with an open arrow.

Label a message with what is asked or said, in plain words, then the ID it traces to: `accept cover request (SC3)`, `check hours rule (BR2)`, `update shift owner (I1)`, `notify: Lan covers your shift (M2)`. A return names the answer the sender acts on, such as `updated` or `error, or no reply`, not a status code.

## Frames

| Item | style |
| --- | --- |
| Frame | `shape=umlFrame;whiteSpace=wrap;html=1;pointerEvents=0;width=50;height=24;strokeColor=#57606a;fontSize=12;fontStyle=1;fontColor=#1b1f24;` labelled with the UML operator: `alt`, `opt`, `loop`, `par`, or `break` |
| Guard | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontColor=#57606a;` labelled with the condition in square brackets, such as `[roster updated]` |
| Divider between `alt` operands | `line;strokeWidth=1;html=1;dashed=1;dashPattern=8 4;strokeColor=#57606a;` 10 high, the frame's width |

The frame spans every lifeline its messages touch, from 40 above its first message to 30 below its last. Use `alt` for either-or outcomes, `opt` for a step that may not happen, `loop` with a guard such as `[every 5 min, up to 3 times]`, `par` for steps that run at the same time, and `break` for a path that ends the scenario. The guards of one `alt` must cover every case.

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` labelled `Accept cover · roster update` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` |

## What to leave out

Endpoint paths, payload fields, status codes, class and method names, retries inside a library, and logging. Those belong to the build. Draw a technical step only when its failure changes what a person sees or what a rule allows.
