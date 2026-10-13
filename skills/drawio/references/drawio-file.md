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

A second `<diagram>` in the same `<mxfile>` is a second page. Use another page only when the first page cannot hold the question.

## Flow chart cells

Place vertices on the layer. Connect them with edges. Step x by 200 and y by 120. Do not overlap labels.

| Step | style |
|---|---|
| Start or end | `ellipse;whiteSpace=wrap;html=1;` |
| Action | `rounded=1;whiteSpace=wrap;html=1;` |
| Decision | `rhombus;whiteSpace=wrap;html=1;` |
| Handoff to a person or another channel | `shape=document;whiteSpace=wrap;html=1;` |

```xml
<mxCell id="start" value="Start" style="ellipse;whiteSpace=wrap;html=1;" vertex="1" parent="1">
  <mxGeometry x="80" y="40" width="120" height="60" as="geometry" />
</mxCell>
<mxCell id="choice" value="Eligible?" style="rhombus;whiteSpace=wrap;html=1;" vertex="1" parent="1">
  <mxGeometry x="60" y="160" width="160" height="80" as="geometry" />
</mxCell>
<mxCell id="yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;" edge="1" parent="1" source="start" target="choice">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

Every edge has `edge="1"`, `parent="1"`, `source`, and `target`. Put the condition in the edge `value`.

## Prototype cells

One frame per step, 280 by 480, spaced 360 apart. Controls sit on the same layer, inside the frame's rectangle. Do not parent a control to the frame.

| Control | style |
|---|---|
| Screen | `rounded=0;whiteSpace=wrap;html=1;verticalAlign=top;fillColor=#ffffff;strokeColor=#666666;` |
| Button | `rounded=1;whiteSpace=wrap;html=1;fillColor=#333333;fontColor=#ffffff;` |
| Text field | `rounded=0;whiteSpace=wrap;html=1;align=left;spacingLeft=8;fillColor=#ffffff;` |
| Plain text | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;` |

```xml
<mxCell id="screen-1" value="Swap request" style="rounded=0;whiteSpace=wrap;html=1;verticalAlign=top;fillColor=#ffffff;strokeColor=#666666;" vertex="1" parent="1">
  <mxGeometry x="40" y="40" width="280" height="480" as="geometry" />
</mxCell>
<mxCell id="screen-1-title" value="Who covers your shift?" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
  <mxGeometry x="56" y="64" width="248" height="32" as="geometry" />
</mxCell>
<mxCell id="to-screen-2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;" edge="1" parent="1" source="screen-1" target="screen-2">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

Use the words the user would see. A button labeled "Submit" is not a prototype of a specific step. Name the action.
