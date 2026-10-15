# Data flow components for Draw.io

Every shape below is a template from Draw.io's built-in **Threat Modeling** library: external entity, process, data store, data flow, trust boundary, and the asset and control labels. Each style is the library template followed by a font size. Two template values change: a data flow's label is dark instead of red, so red marks only trust boundaries, and a control label carries a rule or integration ID instead of the library's C01, because C already means a check. Copy a style exactly and change only the label, position, and size. [example.drawio](example.drawio) uses each one. Do not draw a threat label. `assess-threats` owns threat IDs and open questions.

## Layout

- One page: `<diagram id="dataflow" name="Data flow">`. One data journey is `dataflow.drawio`. Each further journey is `1-<step>/dataflow.drawio`, in that step's folder.
- People on the left, the product's processes and stores in the middle inside its trust boundary, other systems on the right inside their own boundary, and third parties outside every boundary.
- Leave 140 between shapes so flow labels fit. Route every flow by [Edges do not overlap](../../drawio/references/drawio-file.md#edges-do-not-overlap).
- A caption at the top left, a legend under the diagram, and a note under the legend.
- Every cell's parent is `1`. Boundaries are drawn first, so they sit behind.

## IDs

- External entities `ext-<name>`, processes `proc-<name>`, data stores `store-<entity>`, in kebab case. A store uses the entity's glossary term.
- Flows `flow-1`, `flow-2`, and so on. Boundaries `boundary-<name>`. Labels `tag-1`, `tag-2`, and so on. Legend `legend-<kind>` and `legend-<kind>-text`.
- Caption `dataflow-caption`, note `dataflow-note`.

## Elements

| Element | Size | style | Label |
| --- | --- | --- | --- |
| External entity: a person or a system outside the product | 140×60, or 160×60 for a system | `rounded=0;whiteSpace=wrap;html=1;fontSize=12;` | the role or the system and its integration ID, such as `Roster system (I1)` |
| Process: something the product does with data | 120×120 | `ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=12;` | a verb phrase, such as `Request and accept cover` |
| Data store: where the product keeps data | 160×60 | `shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;fontSize=12;` | the entity's glossary term, plural, such as `Cover requests` |
| Trust boundary | around what it contains | `html=1;fontColor=#FF3333;fontStyle=1;align=left;verticalAlign=top;spacing=0;labelBorderColor=none;fillColor=none;dashed=1;strokeWidth=2;strokeColor=#FF3333;spacingLeft=4;spacingTop=-3;` | who controls what is inside, such as `Shift swaps service` or `Hospital core systems` |

A trust boundary is drawn wherever control changes: between a person's device and the product, between the product and each other organisation's or team's system, and around a third party.

## Flows

| Flow | style |
| --- | --- |
| One way | `endArrow=classic;html=1;fontColor=#1b1f24;fontSize=11;labelBackgroundColor=#ffffff;` |
| Both ways | `endArrow=classic;startArrow=classic;html=1;fontColor=#1b1f24;fontSize=11;labelBackgroundColor=#ffffff;` |

Label a flow with the data it carries, in plain words, then the ID it traces to: `identity, ward, role (I2)`, `name, phone, message text`. A flow connects to a process at least at one end; data never moves between two stores or two external entities without a process. Set `exitX`, `exitY`, `entryX`, and `entryY`, and move a label along its flow with `<mxGeometry x="-0.5" relative="1" as="geometry" />` when two labels would meet. Two flows do not share a segment or cross.

## Labels

| Label | Size | style | Text |
| --- | --- | --- | --- |
| Asset: personal or sensitive data | 56×20 | `text;html=1;strokeColor=#d6b656;fillColor=#fff2cc;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;fontSize=10;` | `personal` or `sensitive` |
| Control pointer | as needed × 20 | `text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;fontSize=10;` | an existing rule or integration ID, such as `BR1` or `I2` |

Place a label beside the flow or store it describes, not on the line. A control pointer names an ID that already exists in `build-spec.md`. A crossing with no such ID is named in the note and left for `assess-threats`. Do not draw a question ID on the diagram.

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` labelled `Data flow · shift swaps` |
| Legend text | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontColor=#57606a;` beside one label of each kind |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` naming the question, every flow that crosses a boundary, the sources, and what the diagram does not test |

## What to leave out

Networks, servers, ports, protocols, encryption settings, and cloud services. Those belong to the build and its security review. Internal steps of a process, unless data leaves the process between them.
