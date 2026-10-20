# Web UI components for Draw.io mockups

An editable drawing kit for **static high-fidelity screen/state mockups with annotated flows**. “Web components” here means UI patterns, not executable Custom Elements, Shadow DOM, or a component package. Use [example.drawio](example.drawio) as a worked task, not a catalogue to squeeze into every screen.

## Research and scope

Researched 2026-10-15. All components default to **Carbon-informed White** unless the target project supplies design tokens. These sources inform the patterns; the chosen density, Arial fallback and simplified Draw.io recipes are local adaptations, not a pixel-perfect Carbon implementation.

| Source | Applied guidance |
| --- | --- |
| [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/) | Pair a summary with matching field errors, preserve recovery context, and specify focus and links to affected answers. Its mandated wording and placement are GOV.UK conventions, not universal WCAG requirements. |
| [GOV.UK radios](https://design-system.service.gov.uk/components/radios/) | Use radios for one choice, group with a legend, keep labels visible, and avoid preselection for an unanswered question. A later frame may depict a deliberate selection; say what action produced it. |
| [Carbon data table](https://carbondesignsystem.com/components/data-table/usage/) | Distinguish table title, toolbar, column headers, rows, and optional pagination; allow space for meaningful data; use a loading skeleton for an expected table load. Do not add sorting, selection, or pagination unless needed. |
| [Carbon data table specifications](https://carbondesignsystem.com/components/data-table/style/) | Standard row and column-header heights are 24/32/40/48/64; match the header to the chosen row height. Title 20 regular, column headings 14 semibold, row text 14 regular, horizontal padding 16; 64-high two-line rows use top padding 16. |
| [Carbon radio button specifications](https://carbondesignsystem.com/components/radio-button/style/) and [checkbox specifications](https://carbondesignsystem.com/components/checkbox/style/) | Radio outer glyph 20×20 with 8×8 selected dot; checkbox 16×16 with white check when selected. Both use icon-primary `#161616`, 14 labels and 8 glyph-to-label gap; group labels use 12. The 48-high labelled target here is a local choice. |
| [Carbon notification specifications](https://carbondesignsystem.com/components/notification/style/) | Inline, toast and callout use a 3-wide left accent. Inline minimum height 48, vertical padding 12, details margin 16, close target 48 with 16 icon; title 14 semibold and body 14 regular. Light neutral surfaces here are a local approximation, not exact notification theme tokens. |
| [Carbon tag specifications](https://carbondesignsystem.com/components/tag/style/) | Label 12; small/medium/large heights 18/24/32; corner radius 16. Medium horizontal padding 8, large 12. Draw.io proportional rounding approximates the pill, not a CSS radius token. |
| [WAI-ARIA APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | A modal needs inert background, contained focus, Escape/visible dismissal, appropriate initial focus, and logical return focus. Record these as requirements, not features implemented by a drawn overlay. |
| [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) and [Target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Check labels, errors, contrast, focus, reflow, semantics, and targets. AA target size is generally 24×24 CSS pixels or the specified spacing/other exceptions; the kit's 48-high controls are a comfortable local default, not a claim that WCAG AA universally requires 48. |

Use project tokens first. Basic rectangles, ellipses, text, lines, and orthogonal edges keep the XML editable and permit product styling. Do not use screenshots as controls, fixed-style UI stencils, external fonts/images, emoji icons, executable links, or layer actions. Viewers can render text differently: inspect the final board in the intended viewer.

### Extended recipes and Carbon styling

Use [extended-components.md](extended-components.md) for reusable field groups, disclosures/accordions, action menus, date/time entry, file upload, comboboxes, and review summaries. The separate [component specimen board](component-recipes.drawio) demonstrates those recipes; it is a reference catalogue, not a product flow or a replacement for the journey views in `screens.md`. The [cover-request example](example.drawio) illustrates legacy state frames, not a mandatory state checklist; illustrative assets do not define a second default palette.

Use the defaults below consistently across a board. Existing target-project tokens override these defaults; resolve the project's theme, layer, density and installed version before drawing. Do not introduce a separate optional style kit or mix unrelated palettes within one board.

The **Carbon-informed White** defaults use [Carbon text-input specifications](https://carbondesignsystem.com/components/text-input/style/), [button specifications](https://carbondesignsystem.com/components/button/style/), and [White-theme token values](https://carbondesignsystem.com/guidelines/color/tokens/) consulted 2026-10-15:

| Concern | Reference choice | Boundary |
| --- | --- | --- |
| Geometry | Square corners; 48-high large controls; 16 horizontal padding; 8 label gap; 2 focus/invalid border | Carbon text inputs also offer other sizes. 48 is this specimen's chosen density, not a universal Carbon or WCAG rule. |
| Type | Field/body 14; label/helper 12; section 20; page 32 | Arial fallback for portable drawings, not a claim to reproduce IBM Plex metrics. Retain larger project type if needed; never shrink text to hide overflow. |
| White base / field | `#ffffff` / `#f4f4f4` | Field and layer tokens change with theme and nesting. These recipes assume the indicated White base. |
| Text / secondary | `#161616` / `#525252` | Use explicit colour roles, not arbitrary gray shades. |
| Input bottom border | `#8d8d8d`, 1 high | Draw a separate bottom-border rectangle, not a full default outline. |
| Primary / focus | `#0f62fe` | Default focus is a 2-wide outline; controls with coloured fills may need an inset contrasting treatment. |
| Error | `#da1e28` | Pair an invalid border with text recovery; don't imply border colour alone explains the problem. |
| Selected / hover | `#e0e0e0` / `#e8e8e8` | State snapshots, not implemented interactions. |
| Secondary / tertiary button | Filled `#393939` with white text / outlined `#0f62fe` with blue text | Keep these distinct: an outlined action is tertiary, not secondary. |

For a closer Carbon button composition, use its button-specific geometry rather than borrowing input padding: standard no-icon buttons have 16 left and 64 right padding; ghost no-icon buttons use 16 on both sides. Standard icon buttons use the documented icon spacing and reserve icon space. The reference specimens may use simplified label-fit sizing and must not be described as pixel-exact Carbon. Do not mix heights within a button group.

For [Carbon typography](https://carbondesignsystem.com/guidelines/typography/type-sets/), productive compact body is 14/18 (size/line height), longer body 14/20, label/helper 12/16, heading-03 20/28 regular, and heading-05 32/40 regular. These are the default sizing allowances for text boxes. Arial metrics are not IBM Plex metrics; inspect wrapping rather than claiming exact Carbon typography.

Component states such as expanded, focused, uploading, or selected usually stay inside a business view or a specification note. Create another snapshot only when the task needs a distinct decision or interaction; declare its descriptive kebab-case name under Views in `screens.md`. Do not multiply frames merely to demonstrate component variants. Reference specimen panels use descriptive IDs instead of SC IDs because they are not product screens.

These are approximations for a static drawing, not Carbon components, a full theme implementation, or accessibility certification. See the extended recipes for source-specific component details, states and behaviour requirements.

See [Measured default pairs](#measured-default-pairs) for calculated contrast; measurements do not cover different layers, transparency, every state, or rendered accessibility.

## Composition before components

Use [product page layouts and workflow coverage](product-layouts.md) before picking controls. Its [collection → detail → edit example](collection-flow.drawio), owned by [collection-screens.md](collection-screens.md), complements the legacy cover-request board with a populated searchable list and an explicit return loop. Component specimens alone are not complete product screens.

1. Read `screens.md` for task, screen order, states, exact copy, permissions, and recovery. Do not invent a new state contract through decoration.
2. One actor/task per file. A close flow stays at root `mockup.drawio`; multiple flows use `1-<actor>-<task>/mockup.drawio`, with child steps nested inside their parent, such as `1-<actor>-<task>/1.1-<actor>-<subtask>/mockup.drawio`. Keep that step's journey alongside it.
3. Arrange views in business usage order, left to right and then top to bottom, not numeric SC order or technical-state columns. Keep decision branches near their origin and identify the main path. Same-screen review panels and confirmations can be named business views, not new screen IDs. Do not generate routine technical-state boards.
4. Default full-size frames: desktop 1440×900, tablet 768×1024, mobile 375×812. These are assumptions, not a device research result. Do not shrink an example to avoid layout work. [NN/g wireflows](https://www.nngroup.com/articles/wireflows/) allow a desktop step to show only the region that changed. This handoff keeps the full frame so the shell and the unchanged content stay visible. The arrow still starts on the control the person uses.
5. Gaps are 240 horizontally and 280 vertically. Caption 40 above a frame; note starts 20 below. Reserve separate lanes for notes and flow edges. For row height 900, next row starts 1180 lower.
6. All cells use absolute coordinates and `parent="1"`. Frame ID `<screen>-<view>`; interior cells prefix that ID. Captions and notes end in `-caption` and `-note`; edges are `flow-1`, etc. View names must not prefix other view names of that screen. Keep SC IDs stable when order changes.
7. Repeat the same shell and data across states; change only what the state requires. An empty filtered result is different from having no records; a denied action is different from a validation error.
8. Inside a screen frame, draw only real end-user UI components and product copy. Keep screen IDs/view labels, design rationale, workflow narration, layout/token/viewport assumptions, interaction specifications and accessibility annotations outside the screen in captions/notes. A genuine product alert, field hint, validation error, permission notice or save confirmation belongs inside only when users would actually see it. Do not disguise a design explanation as an in-app notice.

### Desktop layout

Coordinates here are relative to the frame; add its board origin in XML. Optional browser chrome occupies y 0–40; application header y 40–88 (48 high); optional sidebar x 0–256 from y 88. Main content begins x 288, y 120 and ends by x 1392. Without a sidebar, use a 32-unit content margin. This is a local layout assumption, not mandatory Carbon shell geometry. A focused form is 560–640 wide, not the whole available canvas. Keep meaningful content inside the visible fold; annotate scrolling and sticky behaviour instead of squeezing text.

For mobile, use 16–24 side margins, a single column, and full-width fields/actions where appropriate. Resolve tables into an explicitly specified card/list or horizontal-scroll design; never just scale desktop text down. Separate viewport drawings do not prove intermediate breakpoints, zoom, or reflow.

## Foundations

| Token | Default | Use |
| --- | --- | --- |
| Font | Arial fallback; body/control 14; label/helper 12; section 20 regular; page 32 regular | Explicit `fontFamily=Arial`; sentence case. Line heights: compact body 18, longer body 20, label/helper 16, section 28, page 40. No text smaller than 12 in board annotations. |
| Space | 4, 8, 12, 16, 24, 32, 48, 64 | Group related label/hint/field; larger space between groups. |
| Geometry | Square `rounded=0`; controls 48 high; 16 horizontal inset; 8 label gap | Round radio glyphs, switch tracks/knobs and pill tags are intentional exceptions, not a rounded-control theme. |
| Text / secondary text | `#161616` / `#525252` | Secondary still carries readable content; helper uses this role as a local simplification. |
| Background / layer-01 / layer-02 | `#ffffff` / `#f4f4f4` / `#ffffff` | Layers alternate; use field-01 `#f4f4f4` on background and field-02 `#ffffff` on layer-01. |
| Divider / strong control rule | `#e0e0e0` / `#8d8d8d` | Decorative divider versus a separate 1-high input bottom rule; no full default input outline. |
| Primary / primary text | `#0f62fe` / `#ffffff` | One dominant action per local decision. |
| Secondary / tertiary | `#393939` filled with white text / blue outline with blue text | Tertiary interior is transparent; preserve layer contrast. |
| Link / focus | `#0f62fe` / `#0f62fe` | Underline links; focus outline is 2 wide with contrasting inset on filled controls. |
| Error / success / warning / information accents | `#da1e28` / `#24a148` / `#f1c21b` / `#0043ce` | Status icon/accent roles, not body-text colours or branding. Use explicit status text in `#161616` on a light neutral surface. |
| Notification surface | `#f4f4f4` | Local light neutral approximation with a separate 3-wide status accent and status icon/text; resolve actual notification theme tokens for closer fidelity. |
| Selected / hover / skeleton | `#e0e0e0` / `#e8e8e8` / `#c6c6c6` | Selection is not focus; neutral state snapshots do not implement interaction. |

Measure the actual foreground/background combinations before claiming contrast. General AA thresholds: 4.5:1 normal text, 3:1 qualifying large text, and 3:1 for required non-text indicators/boundaries, with criterion-specific exceptions. Decorative dividers need not carry control semantics. Disabled styling is not a substitute for explaining unavailable actions.

### Measured default pairs

Calculated 2026-10-15 using the [WCAG sRGB relative-luminance formula](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) for these opaque, solid colours only. Values rounded to two decimals for display; compare unrounded values to thresholds. Retest after token changes or layering. This is a palette calculation, not a rendered accessibility audit.

| Foreground / background | Contrast |
| --- | --- |
| `#161616` / `#f4f4f4` (text / field) | 16.45:1 |
| `#525252` / `#f4f4f4` (secondary text / field) | 7.10:1 |
| `#ffffff` / `#0f62fe` (primary button) | 5.00:1 |
| `#da1e28` / `#ffffff` (error text) | 5.00:1 |
| `#8d8d8d` / `#f4f4f4` (strong boundary) | 3.02:1 |
| `#0f62fe` / `#f4f4f4` (focus) | 4.55:1 |
| `#ffffff` / `#393939` (secondary button) | 11.55:1 |

## Draw.io style primitives

Recipes below are complete base styles. Change explicit token values rather than appending conflicting duplicate properties. Set a generous geometry for wrapping; don't hide clipping with smaller fonts.

| Primitive | Style |
| --- | --- |
| Text | `text;rounded=0;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#161616;align=left;verticalAlign=middle;spacing=0;` |
| Label/helper | `text;rounded=0;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=12;fontStyle=0;fontColor=#525252;align=left;verticalAlign=middle;spacing=0;` |
| Surface | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#ffffff;strokeColor=none;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#161616;align=left;verticalAlign=middle;spacing=0;` |
| Primary button | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#0f62fe;strokeColor=#0f62fe;strokeWidth=1;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#ffffff;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=64;` |
| Secondary button | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#393939;strokeColor=#393939;strokeWidth=1;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#ffffff;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=64;` |
| Tertiary button | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=none;strokeColor=#0f62fe;strokeWidth=1;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#0f62fe;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=64;` |
| Input | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#f4f4f4;strokeColor=none;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#161616;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=16;` |
| Input bottom rule | `shape=rectangle;rounded=0;html=1;fillColor=#8d8d8d;strokeColor=none;` |
| Focus ring | `shape=rectangle;rounded=0;html=1;fillColor=none;strokeColor=#0f62fe;strokeWidth=2;` |
| Contrasting focus inset | `shape=rectangle;rounded=0;html=1;fillColor=none;strokeColor=#ffffff;strokeWidth=1;` |
| Divider | `shape=rectangle;rounded=0;html=1;fillColor=#e0e0e0;strokeColor=none;` |
| Radio boundary | `ellipse;html=1;fillColor=none;strokeColor=#161616;strokeWidth=1;` |
| Radio selected dot | `ellipse;html=1;fillColor=#161616;strokeColor=none;` |
| Checkbox boundary | `shape=rectangle;rounded=0;html=1;fillColor=none;strokeColor=#161616;strokeWidth=1;` |
| Checkbox selected | `shape=rectangle;rounded=0;html=1;fillColor=#161616;strokeColor=#161616;strokeWidth=1;` |
| Icon/check line | `edgeStyle=none;rounded=0;html=1;startArrow=none;endArrow=none;strokeColor=#ffffff;strokeWidth=2;` |
| Switch track (off) | `shape=rectangle;rounded=1;arcSize=100;html=1;fillColor=#8d8d8d;strokeColor=none;` |
| Switch knob | `ellipse;html=1;fillColor=#ffffff;strokeColor=none;` |
| Neutral tag | `shape=rectangle;rounded=1;arcSize=100;html=1;whiteSpace=wrap;fillColor=#e0e0e0;strokeColor=none;fontFamily=Arial;fontSize=12;fontStyle=0;fontColor=#161616;align=center;verticalAlign=middle;spacingLeft=8;spacingRight=8;` |
| Feedback surface | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#f4f4f4;strokeColor=none;fontFamily=Arial;fontSize=14;fontStyle=0;fontColor=#161616;align=left;verticalAlign=middle;spacing=0;` |
| Status accent (error) | `shape=rectangle;rounded=0;html=1;fillColor=#da1e28;strokeColor=none;` |
| Skeleton | `shape=rectangle;rounded=0;html=1;fillColor=#c6c6c6;strokeColor=none;` |

Give text boxes the line-height allowances above; do not assume `fontSize` sets line height in every viewer. For status accents replace the error fill with the success, warning or information role as needed. Draw symbols separately and retain status text; yellow or green accents alone are not required control boundaries. For a selected checkbox add two white check segments; indeterminate uses a white horizontal segment. These base styles plus the component geometry below define the default composition.

### Shell, text, and navigation

| Component | Composition and sizing | Intent to specify |
| --- | --- | --- |
| Browser frame | 1440×900 surface; optional 40-high neutral bar and textual fictional URL | Chrome is not application navigation; use only when context needs it. |
| App header | 48 high, neutral surface, product name, current area, signed-in person | Do not fill it with unrelated menu items or decorative alerts. This local White shell is not a pixel-exact Carbon UI shell. |
| Sidebar | Optional local layout, 256 wide; items 48 high | Current item uses a marker and selected neutral background, not colour alone. |
| Heading | Text primitive: page 32/40 regular, section 20/28 regular | Preserve a logical heading hierarchy in `screens.md`. |
| Breadcrumb/back link | 14/18, underlined actionable label | Show only useful hierarchy; don't label a navigation action as a button. |
| Tabs | 48-high local targets with current blue underline and selected text emphasis | Use for peer panels, not sequential steps. Specify selection, keyboard model and panel association externally. |
| Link | Text primitive, blue, `fontStyle=4` | Destination is clear in context; use a button for an action. |

### Form controls and actions

| Component | Composition and sizing | Required states/decisions |
| --- | --- | --- |
| Button | Primary/filled secondary/outlined tertiary primitive, 48 high; no-icon padding 16 left/64 right; ghost 16 both sides | Default, focus, submitting or unavailable when relevant. Verb-led labels such as “Send request.” Destructive variant changes fill/border to error red and states consequences. Reserve documented icon space for icon variants. |
| Focused control | Separate 2-wide blue ring inset 1; on filled buttons add white inset at 3 | Keep label visible, draw one actual focus location per state, and retain error indicators alongside focus. Record focus order and visibility; rings cannot implement keyboard access. |
| Text field | Visible 12/16 label, 8 gap, 48-high gray input with separate 1-high bottom rule, helper/error below | Preserve entered values after failure; placeholder is example content, not the label. Change field fill with the layer. |
| Textarea | Same group and bottom rule, input 96–144 high; top-aligned 14/20 text with 16 padding | Show meaningful saved/typed text; counts/limits only if the spec needs them. |
| Select | Label + 48-high field and bottom rule + editable line chevron in reserved trailing space | Use for a longer known list; specify actual native/custom behaviour. For a few choices prefer visible radios, not a fake searchable combobox. |
| Search | Visible “Search shifts” label plus input and deliberate submit/clear control | Specify whether results update on typing or submit; distinguish no matches from no data. |
| Radio group | 12/16 legend and optional hint; 20×20 ring + 8×8 selected dot in `#161616`; 8 gap to 14/18 label; full labelled row at least 48 high locally | One choice; explain availability/hours alongside each colleague. Note that the label is the intended hit area. |
| Checkbox | 16×16 square box in `#161616` plus white vector check when selected; 8 gap to 14/18 label; full labelled row at least 48 high locally | Independent choices; include unchecked/checked/indeterminate only when needed. Do not use a Unicode check as the only meaning. |
| Switch | Intentional round exception: local 48×24 track + 18 knob, within a 48-high labelled target; on track `#24a148` | For immediate on/off settings, not a substitute for submit or a consent checkbox. Include explicit On/Off text if unclear; on colour means status, not brand. |
| Unavailable action | Muted surface, visible reason nearby and an alternative | Decide disabled vs read-only vs denied in the spec. Don't leave people guessing why nothing can happen. |

### Data and content

| Component | Composition and sizing | Intent to specify |
| --- | --- | --- |
| Table | Title 20/28 regular and description; optional toolbar; column headings 14 semibold, row text 14 regular; 16 side padding; neutral header/rows and dividers | Choose 48 or 64 row height here and match column-header height; Carbon also offers 24/32/40. For 64-high two-line rows use top padding 16. If content requires 80 or another height, label it a local adaptation, not a standard Carbon density. Fit 48-high local action targets without clipping. Arial bold may approximate semibold, not reproduce its exact weight. Do not make the entire row a mystery action. No pagination for three records. |
| Summary card/list | 24 padding, heading, label/value pairs, explicit action | Best for shift details or confirmation; don't force a table into a narrow form. |
| Badge/tag | Neutral pill tag; default medium 24 high, 12/16 text, horizontal padding 8; small 18 or large 32 (large padding 12) if needed; Carbon radius 16 approximated by Draw.io rounding | Non-interactive state such as “Pending acceptance,” not a button. Never communicate status with colour alone. Interactive/removable tags need separately specified 48-high local targets. |
| Pagination | 48-high controls below results and current-page text | Only when needed; record totals, page size, and filter interaction. |
| Progress | Label/value plus 8-high track and fill | Only known progress gets a percentage. A static skeleton must not suggest measured completion. |
| Empty state | Plain-language heading, what is absent, next action | Keep relevant navigation/filters; no decorative emoji or invented failure. |
| Loading state | Retain shell and table headers; neutral skeleton rows + “Loading shifts…” | Specify busy/status announcements, timeout and retry behaviour in owning text. No fake interactive animation. |

### Feedback and overlays

| Component | Composition | Behaviour to document, not claim as implemented |
| --- | --- | --- |
| Validation summary | Square neutral feedback surface with 3-wide error accent above form heading, problem title, one underlined line per error | On failed submit focus summary; each line points to the matching answer and repeats its inline error. Preserve other fields. GOV.UK is the source for this adopted pattern, not a claim this is a Carbon component. |
| Inline error | Label/hint + explicit 12/16 red error text + 2-wide error field outline and vector error icon; remove normal bottom rule | Explain how to correct; avoid “Invalid input.” Do not replace label or hide values. |
| Denied state | Explanation of rule or permission with an allowed alternative | A correct value can still be disallowed. Do not call a policy limit a typing error. |
| Success panel | Local light neutral surface with 3-wide Carbon success accent, status icon/text, precise outcome, next action, outstanding conditions | “Request sent” is not “Shift reassigned”; retain pending status until acceptance. |
| Notification/toast | Square local light neutral surface with 3-wide left status accent (error/success/warning/information); inline minimum height 48, vertical padding 12, details margin 16; title 14 semibold, body 14 regular; close target 48 with 16 icon if dismissible | Grow for actual copy and padding; 48 is a minimum, not a fixed height. Draw.io bold may approximate semibold; no exact font-weight claim with Arial fallback. Critical information must not rely only on an ephemeral toast; specify announcement and persistence. |
| Modal | Dim app region with neutral `#161616` scrim (local 40% opacity); centred square layer-01 surface 480–640 wide, 20/28 regular title, 14/20 body, 48-high explicit actions/close target | Only when interruption is justified. Define focus entry/trap/return, Escape, inert background, overflow, and consequences using APG. Use layer-02 fields inside it. Do not add a modal just to exhibit the kit. |

## Board annotations and flow routing

Caption: text, 20/28 regular, e.g. `SC2 Ask for cover · denied`. Note: square light neutral surface, 14/20 text, clear policy/message references, recovery and keyboard/announcement intent. Notes and captions are outside the frame and are not participant-facing UI.

Flow style: `edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;endArrow=block;strokeColor=#0f62fe;strokeWidth=2;fontFamily=Arial;fontSize=14;fontColor=#0f62fe;labelBackgroundColor=#ffffff;`

Source an action edge from its control; label the action. Source a system transition from the frame; label `System:` and the condition. A path users can take is solid, including errors and recovery; dashed lines are reserved for layout alternatives. Use explicit waypoints in frame/row gaps and ports on the destination boundary. Avoid passing through unrelated frames, notes, captions, controls, or other labels; follow [edge rules](../../drawio/references/drawio-file.md#relationship-lines). Notes describe alternative outcomes that cannot be routed clearly without clutter; do not draw a spaghetti inventory of every theoretical path.

## Accessibility and viewport intent

These are visual representations, not accessible HTML. Visible labels, group legends, matching error copy, text status, target areas, and focus outlines communicate intent. Keep semantic roles, reading/tab order, status announcements, modal entry/return focus, responsive treatment and recovery in `screens.md`, with frame notes referring to that owner. A static drawing cannot verify them. Use the WCAG references above for criteria and exceptions, and APG for applicable widget behaviour; avoid ARIA where a native control will do.

Record the viewport, fold, scroll regions and sticky elements. A 20×20 radio or 16×16 checkbox glyph belongs inside a 48-high labelled target, not a glyph-sized hit area. Draw.io dimensions are not evidence of CSS-pixel sizing. Layouts at two widths do not establish reflow or zoom support.

## Worked example and verification

The example is one fictional task: nurse Mai Tran asks a colleague to cover a Cedar ward shift. Its owning scenario and state intent are in [example-screens.md](example-screens.md). It demonstrates the relevant subset—shell, table, buttons/focus, radio choices, textarea, loading/empty, validation, denied policy, and pending success—not every component in the kit. A fictional 48-hour rule is illustrative, not clinical or legal guidance. Full-size frames keep the same shell, records, and copy across states.

Before handoff:
- Validate XML IDs/parents/references, full-size geometry, declared journey-view ordering, frame containment, screen/view coverage, and action sources.
- Inspect the rendered board at reading scale in the intended viewer for clipping, font fallback, overlaps and edge lanes. Structural checks cannot establish these visual results.
- Record measured contrast pairs and assumptions if checked. Validate keyboard access, semantics, announcements, target sizes in CSS pixels, zoom, and reflow on an appropriately implemented artifact, not this XML.
- Treat supplied research results, design inspection, and automated checks as separate evidence. The example has no user-testing or accessibility-conformance claim.
