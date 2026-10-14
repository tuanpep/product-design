# C4 context components for Draw.io

Every element below is a template from Draw.io's built-in **C4** library. Copy each one exactly, including its colours: C4 readers know them, and Draw.io's **Edit Data** dialog (Ctrl+M) edits the name, type, and description that the label shows. Change only the properties, position, and size the tables name. [example.drawio](example.drawio) uses each one on a context page.

## How a C4 element is written

A C4 element is an `<object>` that holds the properties, wrapping an `<mxCell>` that holds the style and geometry. The `id` is on the `<object>`; the `<mxCell>` has none. The label is a template that shows the properties, so change the properties, never the label.

```xml
<object placeholders="1" c4Name="Ward nurse" c4Type="Person" c4Description="Asks a colleague to cover a shift, or covers one." label="&lt;font style=&quot;font-size: 16px&quot;&gt;&lt;b&gt;%c4Name%&lt;/b&gt;&lt;/font&gt;&lt;div&gt;[%c4Type%]&lt;/div&gt;&lt;br&gt;&lt;div&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;&lt;font color=&quot;#cccccc&quot;&gt;%c4Description%&lt;/font&gt;&lt;/div&gt;" id="person-nurse">
  <mxCell style="html=1;fontSize=11;dashed=0;whiteSpace=wrap;fillColor=#083F75;strokeColor=#06315C;fontColor=#ffffff;shape=mxgraph.c4.person2;align=center;metaEdit=1;points=[[0.5,0,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0]];resizable=0;" vertex="1" parent="1">
    <mxGeometry x="560" y="100" width="200" height="180" as="geometry" />
  </mxCell>
</object>
```

Every element and relationship has `placeholders="1"`. Escape `&`, `<`, `>`, and `"` inside property values and the label.

## Pages

- Page 1 is `Context`, with `<diagram id="context" name="Context">`. It is always drawn: the product as one system, the people who use it, and the systems it talks to directly.
- Page 2 is `Containers`, with `<diagram id="containers" name="Containers">`. Draw it only when the target project already has an architecture, from its code or docs, and the slice changes which part talks to which. Mark each container existing or new in its description.
- One slice is `context.drawio`. A second slice with different dependencies is `NN-<slice>/context.drawio`, numbered in business order.

## Layout

- People in the top row, the product in the middle, the systems it depends on in the bottom row, and systems outside the organisation to the right, outside the boundary.
- People are 200×180 and systems 240×120; both have `resizable=0`. Leave 240 across and 100 down between elements so relationship labels fit.
- Every element's parent is `1`. The boundary is drawn first, so it sits behind.

## IDs

- People `person-<role>`, systems `system-<name>`, containers `container-<name>`, in kebab case.
- Boundaries `boundary-<name>`, the title `context-title` or `containers-title`, the note `context-note` or `containers-note`.
- Relationships `rel-1`, `rel-2`, and so on.

## Elements

The C4 template's connection points, shared by systems, containers, boundaries, and the title:

`points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];`

| Element | Size | `c4Type` | style |
| --- | --- | --- | --- |
| Person | 200×180 | `Person` | `html=1;fontSize=11;dashed=0;whiteSpace=wrap;fillColor=#083F75;strokeColor=#06315C;fontColor=#ffffff;shape=mxgraph.c4.person2;align=center;metaEdit=1;points=[[0.5,0,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0]];resizable=0;` |
| External person, outside the organisation | 200×180 | `Person` | the person style with `fillColor=#6C6477;strokeColor=#4D4D4D;` |
| The product | 240×120 | `Software System` | `rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#1061B0;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#0D5091;metaEdit=1;resizable=0;` then the points |
| Another system | 240×120 | `Software System` | `rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#8C8496;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#736782;metaEdit=1;resizable=0;` then the points |
| Container | 240×120 | `Container` | `rounded=1;whiteSpace=wrap;html=1;fontSize=11;labelBackgroundColor=none;fillColor=#23A2D9;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#0E7DAD;metaEdit=1;resizable=0;` then the points |
| Data container | 240×120 | `Container` | `shape=cylinder3;size=15;whiteSpace=wrap;html=1;boundedLbl=1;rounded=0;labelBackgroundColor=none;fillColor=#23A2D9;fontSize=12;fontColor=#ffffff;align=center;strokeColor=#0E7DAD;metaEdit=1;points=[[0.5,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.5,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];resizable=0;` |

| Element | Properties | label |
| --- | --- | --- |
| Person or system | `c4Name`, `c4Type`, `c4Description` | `<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%]</div><br><div><font style="font-size: 11px"><font color="#cccccc">%c4Description%</font></div>` |
| Container | add `c4Technology` | `<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%: %c4Technology%]</div><br><div><font style="font-size: 11px"><font color="#E6E6E6">%c4Description%</font></div>` |

`c4Name` is the glossary or product name. `c4Description` says in one sentence what the element does for this product, in plain words, and ends with its integration ID for another system, such as `System of record for shifts and who works them. I1.` For the product, add whether it is new or changed in this slice. `c4Technology` is only what the target project already uses; a container without a known technology is not drawn.

## Boundaries and title

| Item | Properties | style |
| --- | --- | --- |
| Organisation boundary | `c4Name` the organisation, `c4Type` `SystemScopeBoundary`, `c4Application` `Enterprise` | `rounded=1;fontSize=11;whiteSpace=wrap;html=1;dashed=1;arcSize=20;fillColor=none;strokeColor=#666666;fontColor=#333333;labelBackgroundColor=none;align=left;verticalAlign=bottom;labelBorderColor=none;spacingTop=0;spacing=10;dashPattern=8 4;metaEdit=1;rotatable=0;perimeter=rectanglePerimeter;noLabel=0;labelPadding=0;allowArrows=0;connectable=0;expand=0;recursiveResize=0;editable=1;pointerEvents=0;absoluteArcSize=1;` then the points |
| System boundary, on the containers page | `c4Name` the product, `c4Type` `SystemScopeBoundary`, `c4Application` `Software System` | the same style |
| Title | `c4Name` `[System Context] <product>`, `c4Type` `ContainerScopeBoundary` as the library sets it, `c4Description` the question | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;metaEdit=1;allowArrows=0;resizable=1;rotatable=0;connectable=0;recursiveResize=0;expand=0;pointerEvents=0;` then the points |

The boundary label is `<font style="font-size: 16px"><b><div style="text-align: left">%c4Name%</div></b></font><div style="text-align: left">[%c4Application%]</div>`, and the title label is `<font style="font-size: 16px"><b><div style="text-align: left">%c4Name%</div></b></font><div style="text-align: left">%c4Description%</div>`.

## Relationships

`endArrow=blockThin;html=1;fontSize=10;fontColor=#404040;strokeWidth=1;endFill=1;strokeColor=#828282;elbow=vertical;metaEdit=1;endSize=14;startSize=14;jumpStyle=arc;jumpSize=16;rounded=0;edgeStyle=orthogonalEdgeStyle;` then the exit and entry points.

| Relationship | Properties | label |
| --- | --- | --- |
| With a description | `c4Type` `Relationship`, `c4Description` | `<div style="text-align: left"><div style="text-align: center"><b>%c4Description%</b></div>` |
| With a technology, only when the project already uses it | add `c4Technology` | `<div style="text-align: left"><div style="text-align: center"><b>%c4Description%</b></div><div style="text-align: center">[%c4Technology%]</div></div>` |

A relationship is an `<object>` wrapping an `<mxCell edge="1" parent="1" source="…" target="…">`. Point it from the one who acts to the one acted on, and describe what flows in the words of the build-spec, with the integration ID: `Reads shifts, changes shift owner (I1)`. Set `exitX`, `exitY`, `entryX`, and `entryY` so two relationships do not share a side of an element.

## Board annotations

| Item | style |
| --- | --- |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` naming the question, the source sections, and what the diagram does not test |

## What to leave out

Servers, networks, cloud services, and frameworks the project does not already use. Components and code belong to the build. Systems that the product does not talk to directly, even if they are nearby.
