# Web components for Draw.io prototypes

Every component below is built from Draw.io's basic shapes, so it renders the same in Draw.io desktop, diagrams.net, and the VS Code extension. Copy a style exactly and change only the label, position, and size. [example.drawio](example.drawio) uses every common component.

This is the one place where basic shapes come before a built-in library, because a prototype has to look like the target product. Draw.io's **Mockup** library draws a fixed grey wireframe look, and its **Bootstrap** library is rounded rectangles in Bootstrap's colours; neither takes the project's colours, font, or corner radius. A built-in table cannot hold the badges and buttons a product table row needs. So do not use `mxgraph.mockup.*`, `mxgraph.bootstrap.*`, or other stencil names that are not on this page.

## Board layout

- One row per screen, in journey order. One frame per state, left to right: default first, then empty, loading, partial, error, denied, success, and offline, drawing only the states `screens.md` lists.
- Frame size by device: desktop `1280×800`, tablet `768×1024`, mobile `375×812`. Use the device from the context of use.
- Gap between frames: 160 across, 200 down. A caption sits 40 above each frame, and a note sits 20 below it.
- Content grid inside a desktop frame: browser bar 0–40, top navigation 40–96, sidebar 0–240 wide, content from x 280 to x 1240 (960 wide), starting at y 120. Use multiples of 8 for spacing.
- All coordinates are absolute on the page, and every cell's parent is `1`.

## IDs

- The frame for a state has the id `<screen>-<state>`, for example `SC2-denied`. Every cell inside it starts with that id: `SC2-denied-title`.
- The caption is `<screen>-<state>-caption`, and the note is `<screen>-<state>-note`.
- Flow arrows are `flow-1`, `flow-2`, and so on.

## Palette

| Role | Colour |
| --- | --- |
| Text | `#1b1f24` |
| Muted text | `#57606a` |
| Border | `#d0d7de` |
| Input border | `#8c959f` |
| Surface | `#f6f8fa` |
| Primary | `#1f6b4a` |
| Link and focus | `#0b57d0` |
| Danger | `#b42318` |
| Warning fill and text | `#fff4ce`, `#7a5a00` |
| Success fill and text | `#dcfce7`, `#166534` |

If the target project has a design system or tokens, replace these colours, the font, and the corner radius with its values and say so in the note.

## Chrome

| Component | Size | style |
| --- | --- | --- |
| Browser frame | 1280×800 | `rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#c9ced6;` |
| Browser bar | 1280×40 at frame top | `rounded=0;whiteSpace=wrap;html=1;fillColor=#eef0f3;strokeColor=none;` |
| Window dot | 10×10, red, amber, green | `ellipse;html=1;fillColor=#ff5f57;strokeColor=none;` with `#febc2e` and `#28c840` |
| Address field | 560×24 | `rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d0d7de;align=left;spacingLeft=12;fontSize=12;fontColor=#57606a;` |
| Mobile frame | 375×812 | `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1b1f24;strokeWidth=2;` |
| Mobile status bar | 375×44 | `text;html=1;strokeColor=none;fillColor=none;align=center;fontSize=13;fontStyle=1;` with label `9:41` |
| Top navigation | full width × 56 | `rounded=0;whiteSpace=wrap;html=1;fillColor=#1f2937;strokeColor=none;` |
| Navigation text | 80×32 | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=14;` add `fontStyle=1;` for the current item and the product name |
| Avatar | 32×32 | `ellipse;whiteSpace=wrap;html=1;fillColor=#1f6b4a;strokeColor=#ffffff;fontColor=#ffffff;fontSize=12;fontStyle=1;` with initials |
| Sidebar | 240 × remaining height | `rounded=0;whiteSpace=wrap;html=1;fillColor=#f6f8fa;strokeColor=none;` |
| Sidebar item | 208×36 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=none;strokeColor=none;align=left;spacingLeft=12;fontSize=14;fontColor=#1b1f24;` |
| Sidebar item, current | 208×36 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#e6f0ff;strokeColor=none;align=left;spacingLeft=12;fontSize=14;fontColor=#0b57d0;fontStyle=1;` |
| Mobile tab bar | 375×64 at frame bottom | `rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d0d7de;` with text items spaced evenly |

## Text

| Component | style |
| --- | --- |
| Page title | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=24;fontStyle=1;fontColor=#1b1f24;` |
| Section heading | same, with `fontSize=18;` |
| Body | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontColor=#1b1f24;` |
| Muted or hint | same, with `fontSize=13;fontColor=#57606a;` |
| Breadcrumb | muted, label like `Home / My shifts / Ask for cover` |
| Link | body, with `fontColor=#0b57d0;fontStyle=4;` |
| Field error | body, with `fontSize=13;fontColor=#b42318;` |

## Controls

| Component | Size | style |
| --- | --- | --- |
| Primary button | auto × 40 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#1f6b4a;strokeColor=none;fontColor=#ffffff;fontSize=14;fontStyle=1;` |
| Secondary button | auto × 40 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1f6b4a;fontColor=#1f6b4a;fontSize=14;fontStyle=1;` |
| Destructive button | auto × 40 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#b42318;strokeColor=none;fontColor=#ffffff;fontSize=14;fontStyle=1;` |
| Disabled button | auto × 40 | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#eaeef2;strokeColor=none;fontColor=#8c959f;fontSize=14;fontStyle=1;` |
| Field label | auto × 20 | body, with `fontStyle=1;` |
| Text input | auto × 40 | `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#8c959f;align=left;spacingLeft=12;fontSize=14;fontColor=#1b1f24;` |
| Placeholder text | | the input style with `fontColor=#8c959f;` |
| Input with error | auto × 40 | the input style with `strokeColor=#b42318;strokeWidth=2;` |
| Text area | auto × 96 | the input style with `verticalAlign=top;spacingTop=8;spacingRight=12;` |
| Select | input, plus a 24×40 caret | caret: `text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=14;fontColor=#57606a;` with label `▾`, at the input's right edge minus 32 |
| Search | input | label starts with `⌕ ` and uses placeholder colour |
| Checkbox, checked | 18×18 | `rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#1f6b4a;strokeColor=#1f6b4a;fontColor=#ffffff;fontSize=12;fontStyle=1;` with label `✓` |
| Checkbox, empty | 18×18 | `rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#8c959f;` |
| Radio, selected | 18×18, plus 8×8 dot centred | `ellipse;html=1;fillColor=#ffffff;strokeColor=#1f6b4a;strokeWidth=2;` and dot `ellipse;html=1;fillColor=#1f6b4a;strokeColor=none;` |
| Radio, empty | 18×18 | `ellipse;html=1;fillColor=#ffffff;strokeColor=#8c959f;` |
| Toggle, on | 36×20, plus 16×16 knob at right | `rounded=1;arcSize=50;html=1;fillColor=#1f6b4a;strokeColor=none;` and knob `ellipse;html=1;fillColor=#ffffff;strokeColor=none;` |
| Tab | auto × 32 | body, centred; the current tab adds `fontStyle=1;fontColor=#1f6b4a;` and a 3-high underline in primary |
| Pagination | 32×32 each | the secondary button style with `fontStyle=0;`; current page uses the primary style |

## Content

| Component | style |
| --- | --- |
| Card | `rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d0d7de;` |
| Divider | 1 high: `rounded=0;html=1;fillColor=#d0d7de;strokeColor=none;` |
| Table header row | `rounded=0;whiteSpace=wrap;html=1;fillColor=#f6f8fa;strokeColor=none;` with header text `fontSize=12;fontStyle=1;fontColor=#57606a;` |
| Table cell | body text, one cell per column, rows 64 high, divider between rows |
| Badge, neutral | `rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#eaeef2;strokeColor=none;fontColor=#1b1f24;fontSize=12;` 28 high |
| Badge, warning or success | same, with the warning or success fill and text colours |
| Progress bar | 8 high: track `rounded=1;arcSize=50;html=1;fillColor=#eaeef2;strokeColor=none;` and fill in primary or danger |
| Skeleton (loading) | `rounded=1;arcSize=20;html=1;fillColor=#eaeef2;strokeColor=none;` in place of each text line |
| Empty-state icon | 64×64: `ellipse;whiteSpace=wrap;html=1;fillColor=#e6f0ff;strokeColor=none;fontSize=28;` with one emoji |

## Feedback

| Component | style |
| --- | --- |
| Alert, error | box `rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#fef3f2;strokeColor=#f4c7c3;` with a 4-wide left bar `rounded=0;html=1;fillColor=#b42318;strokeColor=none;`, a bold title in danger, and body text |
| Alert, warning or success | the same with the warning or success colours |
| Toast | `rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#1b1f24;strokeColor=none;fontColor=#ffffff;fontSize=14;align=left;spacingLeft=16;` 360×48, bottom right of the content area |
| Modal overlay | full frame below the browser bar: `rounded=0;html=1;fillColor=#000000;strokeColor=none;opacity=40;` |
| Modal dialog | card style with `shadow=1;`, 480 wide, centred, containing a title, body, and buttons at bottom right |
| Spinner | 24×24: `ellipse;html=1;fillColor=none;strokeColor=#0b57d0;strokeWidth=3;dashed=1;` beside a "Loading…" label |

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` label `SC2 Ask for cover · denied` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` naming the rules, messages, and states shown |
| Flow arrow | `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;strokeColor=#0b57d0;strokeWidth=2;fontSize=13;fontColor=#0b57d0;labelBackgroundColor=#ffffff;` from the control the user acts on to the next frame, labelled with the action. Add `dashed=1;` for a system-caused change such as a denial or an empty result. Set `exitX`, `exitY`, `entryX`, and `entryY` so the arrow runs through the gaps between frames, not across controls |
