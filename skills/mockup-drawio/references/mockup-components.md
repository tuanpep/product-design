# Mockup components

Every control below is one shape from Draw.io's built-in **Mockup** library, as `Sidebar-Mockup.js` registers it. Copy a style exactly and change only the label, position, and size, plus the two colour swaps this page names. [example.drawio](example.drawio) uses the common ones on a reduced frame so the sample stays readable. A proposal uses the device size below.

These names are the library's. An unknown name draws as a plain box, or as nothing, and the error is silent. Do not use `containers.browser`, `containers.smartphone`, `forms.button`, `forms.text1`, or `containers.table`. Those names are not in the library. Do not build a control out of rectangles, and do not use `sketch=1`.

## Board layout

- One actor and one task per file. Caption it `Actor · Task`, such as `Nurse · Ask for cover`. One pair keeps `mockup.drawio`. A second task, or a second actor doing a different task, is a step folder `1-<actor>-<task>/mockup.drawio`. Parents are `1`, `2`, `3`. A split of that step is the child, `1.1-<actor>-<task>/mockup.drawio`. The journey of that step sits in the same folder. A happy path longer than 6 screens splits at the next handoff into that child. Inside the file, one row per screen, in task order. One frame per state, left to right: default first, then empty, loading, partial, error, denied, success, and offline, drawing only the states `screens.md` lists. A modal that stays on the same screen is a state of that screen.
- Desktop frame: the browser window, `550×380`. Phone frame: the window shape, `320×568`. A dialog uses the window shape at the size of its content.
- Gap between frames: 160 across, 160 down. A caption sits 36 above each frame, and a note sits 12 below it. The gap is the arrow lane.
- Desktop content starts 100 below the frame's top and 16 in from its left, clear of the tab and the address bar. Phone content starts 40 below the frame's top. Use multiples of 8.
- All coordinates are absolute on the page, and every cell's parent is `1`. Place controls on top of the frame. Do not parent them to the frame: a child's coordinates are relative, and the file check treats them as page coordinates.

## IDs

- The frame for a state has the id `<screen>-<state>`, for example `SC2-denied`. Every cell inside it starts with that id: `SC2-denied-title`.
- The caption is `<screen>-<state>-caption`, and the note is `<screen>-<state>-note`.
- A layout alternative is a frame `<screen>-b`, then `<screen>-c`. Its cells start with that id.
- Flow arrows are `flow-1`, `flow-2`, and so on.

## Frames and chrome

| Component | Size | style |
| --- | --- | --- |
| Browser window | 550×380 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.containers.browserWindow;rSize=0;strokeColor=#666666;strokeColor2=#008cff;strokeColor3=#c4c4c4;mainText=,;recursiveResize=0;` |
| Window, phone, or dialog | 320×568, or the content | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.containers.window;align=left;verticalAlign=top;spacingLeft=8;strokeColor2=#008cff;strokeColor3=#c4c4c4;fontColor=#666666;mainText=;fontSize=17;labelBackgroundColor=none;whiteSpace=wrap;` The cell value is the title. |
| Tab or address | 110×26, or 250×26 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.containers.anchor;fontSize=17;fontColor=#666666;align=left;whiteSpace=wrap;` Add `rSize=0;` on the address. The cell value is the tab title or the URL. |

## Controls

The cell value is the words the person sees, unless the row says otherwise. A primary button uses the library blue. A secondary button is that same style with `fillColor=#ffffff;fontColor=#666666;`.

| Component | Size | style |
| --- | --- | --- |
| Button | 150×50 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.buttons.button;strokeColor=#666666;fontColor=#ffffff;mainText=;buttonStyle=round;fontSize=17;fontStyle=1;fillColor=#008cff;whiteSpace=wrap;` |
| Text field | 150×30 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.textBox;fontColor=#666666;align=left;fontSize=17;spacingLeft=4;spacingTop=-3;whiteSpace=wrap;strokeColor=#666666;mainText=` |
| Combo box | 150×30 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.forms.comboBox;strokeColor=#999999;fillColor=#ddeeff;align=left;fillColor2=#aaddff;mainText=;fontColor=#666666;fontSize=17;spacingLeft=3;` |
| Password field | 150×30 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.forms.pwField;strokeColor=#999999;mainText=;align=left;fontColor=#666666;fontSize=17;spacingLeft=3;` |
| Search box | 150×30 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.forms.searchBox;strokeColor=#999999;mainText=;strokeColor2=#008cff;fontColor=#666666;fontSize=17;align=left;spacingLeft=3;whiteSpace=wrap;` |
| Checkbox, off | 15×15 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.forms.rrect;rSize=0;fillColor=#eeeeee;strokeColor=#999999;gradientColor=#cccccc;align=left;spacingLeft=4;fontSize=17;fontColor=#666666;labelPosition=right;` The cell value is the option. |
| Checkbox, on | 15×15 | `shape=mxgraph.mockup.forms.checkbox;resizable=0;fillColor=#AAAAAA;gradientColor=#666666;strokeColor=#444444;html=1;` Put the option in a text cell to its right. |
| Radio | 15×15 | `shape=ellipse;fillColor=#eeeeee;strokeColor=#999999;gradientColor=#cccccc;html=1;align=left;spacingLeft=4;fontSize=17;fontColor=#666666;labelPosition=right;shadow=0;` The library draws a radio as an ellipse. The cell value is the option. |
| List | 240×120 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.bulletedList;textColor=#666666;textSize=17;bulletStyle=none;strokeColor=none;fillColor=none;align=left;verticalAlign=top;fontSize=17;fontColor=#666666;` Set `mainText` to the items separated by commas, and the cell value to the same items one per line. |
| Link | 150×30 | `shape=rectangle;strokeColor=none;fillColor=none;linkText=;fontSize=17;fontColor=#0000ff;fontStyle=4;html=1;align=center;` |
| Pagination | 350×30 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.navigation.pagination;linkText=;fontSize=17;fontColor=#0000ff;fontStyle=4;` The cell value is the page labels. |
| Callout | 200×80 | `strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#666666;align=left;verticalAlign=top;strokeColor=#666666;` Use it for an empty, error, or denied message. |
| Progress bar | 200×20 | `verticalLabelPosition=bottom;shadow=0;dashed=0;align=center;html=1;verticalAlign=top;strokeWidth=1;shape=mxgraph.mockup.misc.progressBar;fillColor=#cccccc;strokeColor=none;fillColor2=#99ddff;barPos=80;` |
| Loading | 48×48 | `verticalLabelPosition=bottom;shadow=0;dashed=0;align=center;html=1;verticalAlign=top;strokeWidth=1;shape=mxgraph.mockup.misc.loading_circle_1;pointerEvents=1;` |

Caption, note, and a plain heading are text cells:

| Piece | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;fontStyle=1;fontSize=14;fontColor=#333333;` |
| Heading inside a frame | `text;html=1;strokeColor=none;fillColor=none;align=left;fontStyle=1;fontSize=16;fontColor=#333333;` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=12;fillColor=#fff2cc;strokeColor=#d6b656;align=left;verticalAlign=top;spacingLeft=6;fontSize=11;` |
| Flow arrow | `edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;endArrow=block;endFill=1;strokeColor=#666666;fontSize=12;labelBackgroundColor=#ffffff;` The source is the control. The label is the action. Add `dashed=1;` only for a layout option. Follow [Lines](../../drawio/references/drawio-file.md#lines) and [Edges do not overlap](../../drawio/references/drawio-file.md#edges-do-not-overlap). |

The library's grey and blue is the look of a mockup. Do not restyle it to match a product palette. A second library, such as Bootstrap, does not belong in this file.
