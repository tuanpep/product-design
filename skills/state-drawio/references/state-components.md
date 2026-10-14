# State machine components for Draw.io

Every shape below is a template from Draw.io's built-in **UML 2.5** library (state, state with compartments, initial and final pseudostates, choice, fork and join, transition). Each style is the library template followed by colour and font properties; the only template value changed is `verticalAlign`, set to `middle` so a one-line state name is centred. Copy a style exactly and change only the label, position, and size. [example.drawio](example.drawio) uses each one.

## Layout

- One page per entity: `<diagram id="<entity>" name="<Entity>">`, using the glossary term.
- A caption at the top left names the entity and the slice. A note under the diagram names the question, the source sections, and what the diagram does not test.
- The main path runs left to right at the top. Exceptions, failures, and terminal states sit in a column or a row below it.
- States are 160×70. Leave at least 280 between columns so a transition label fits on one line, and 120 between rows.
- Coordinates are absolute on the page, and every cell's parent is `1`, except a behaviour row, whose parent is its state.

## IDs

- States `st-<state>`, in kebab case: `st-waiting`, `st-needs-roster-fix`. A state's behaviour row is `st-<state>-behaviour`.
- Pseudostates `st-initial`, `st-final`, `st-choice-1`, `st-choice-2`, and `st-fork-1`, `st-join-1`.
- Transitions `tr-1`, `tr-2`, and so on, in the order the state table lists them.
- Caption `<entity>-caption`, note `<entity>-note`.

## States

The state templates:

- **State:** `html=1;align=center;verticalAlign=middle;rounded=1;absoluteArcSize=1;arcSize=10;whiteSpace=wrap;`
- **State with compartments:** `swimlane;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;html=1;rounded=1;absoluteArcSize=1;arcSize=10;whiteSpace=wrap;`

| Shape | Size | style |
| --- | --- | --- |
| State | 160×70 | State template, then `fillColor=#ffffff;strokeColor=#1f2937;strokeWidth=2;fontSize=13;fontStyle=1;fontColor=#1b1f24;` |
| Failure or recovery state | 160×70 | State template, then `fillColor=#fef3f2;strokeColor=#b42318;strokeWidth=2;fontSize=13;fontStyle=1;fontColor=#b42318;` |
| Terminal state | 160×70 | State template, then `fillColor=#eaeef2;strokeColor=#57606a;strokeWidth=1;fontSize=13;fontStyle=1;fontColor=#57606a;` |
| State with behaviour | 160×70 | State with compartments template, then `fillColor=#ffffff;swimlaneFillColor=#ffffff;strokeColor=#1f2937;strokeWidth=2;fontSize=13;fontColor=#1b1f24;` |
| Behaviour row, inside it | 160×40 at y 30 | `fillColor=none;strokeColor=none;align=left;verticalAlign=middle;spacingLeft=5;whiteSpace=wrap;html=1;fontSize=11;fontColor=#1b1f24;` |
| Initial pseudostate | 30×30 | `ellipse;fillColor=strokeColor;html=1;strokeColor=#1b1f24;` |
| Final pseudostate | 30×30 | `ellipse;html=1;shape=endState;fillColor=strokeColor;strokeColor=#1b1f24;` |
| Choice pseudostate | 40×40 | `rhombus;html=1;fillColor=#ffffff;strokeColor=#1f2937;strokeWidth=2;` |
| Fork or join | 5×80 | `html=1;points=[];perimeter=orthogonalPerimeter;fillColor=strokeColor;strokeColor=#1b1f24;` |

A state label is its name from the table. When something happens while in the state, use the state with behaviour: the header holds the name, and one behaviour row holds each `entry /`, `do /`, or `exit /` line, such as `entry / start expiry timer`. Add 40 to the state's height for each extra row.

Use the final pseudostate when the record leaves the lifecycle through a normal end, such as a shift starting. Use the terminal state style for a named end state that people will see, such as Declined. Use fork and join only when the table has parallel work that must all finish.

## Transitions

The transition template is `endArrow=open;html=1;rounded=0;align=center;verticalAlign=bottom;endFill=0;labelBackgroundColor=#ffffff;`, with the label background changed from `none` to white so a label stays readable where it crosses a line.

| Transition | style |
| --- | --- |
| Event or action | transition template, then `edgeStyle=orthogonalEdgeStyle;endSize=8;strokeColor=#1f2937;fontSize=11;fontColor=#1b1f24;` |
| Time-triggered | the same, plus `dashed=1;` |

Label a transition `event [guard] / effect`, for example `Lan accepts [BR2] / update roster (I1)`. The event is what happens or who acts. The guard is the rule ID that must pass. The effect is the message, notification, or integration call. Leave out a part that does not apply, and keep the label on one line.

Set `exitX`, `exitY`, `entryX`, and `entryY` when two transitions leave the same side of a state, so their vertical segments do not overlap. Every transition has a `source` and a `target`, and connects to the state, never to its behaviour row.

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` labelled `Cover request lifecycle · request cover` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` |

## What to leave out

Implementation states such as retry counters or queue positions, unless a person sees them or a rule depends on them. Composite and parallel regions, unless the table needs them; split a complex record into two lifecycles first.
