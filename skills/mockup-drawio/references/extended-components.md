# Extended editable components: Carbon-informed White defaults

Researched **2026-10-15** against the official Carbon pages below. This is a recipe library for static Draw.io screen/state mockups, not a Carbon implementation or an exact reproduction. Use the canonical [Carbon-informed White defaults](web-components.md#extended-recipes-and-carbon-styling), [foundations](web-components.md#foundations) and [measured pairs](web-components.md#measured-default-pairs) for every component. Existing target-project design tokens override these defaults; there is no separate optional kit.

Use these seven additions only when the task in `screens.md` needs them: reusable field group, accordion/disclosure, menu button/menu, date/time entry, file uploader, dropdown/combobox, and structured list/review summary. Examples below are fictional, not product requirements. See [component-recipes.drawio](component-recipes.drawio) for editable static specimens. Its dates, city search, delivery copy and file limits are independent demonstrations, not extra states or records in the cover-request example; format differences are explicitly labelled.

## Source-to-guidance map

These are primary sources fetched on the research date. Carbon's old `/components/.../usage/` routes may redirect to its newer building-blocks pages; the links here identify the guidance actually consulted.

| Official source | Guidance applied here |
| --- | --- |
| [Accordion guidelines](https://carbondesignsystem.com/building-blocks/core/components/accordion/guidelines) | Related, nonessential content; brief headings; down/up end chevron; independent sections may remain open; avoid panel-internal scrolling. |
| [Disclosures pattern](https://carbondesignsystem.com/building-blocks/core/patterns/disclosures) | User-triggered popovers, concise optional content, one floating disclosure at a time, no nested popovers or hidden critical input. This is not the accordion's multiple-expanded-panel rule. |
| [Menu buttons guidelines](https://carbondesignsystem.com/building-blocks/core/components/menu-buttons/guidelines) and [Menu guidelines](https://carbondesignsystem.com/building-blocks/core/components/menu/guidelines) | Distinguish equal-priority actions, split/default actions, and row overflow; match trigger/item heights; keep action lists short; menus are not form-value pickers. |
| [Date picker guidelines, including time pickers](https://carbondesignsystem.com/building-blocks/core/components/date-picker/guidelines) | Memorable dates use simple entry; scheduling can use a calendar with manual entry; persistent format, start/end labels, 12/24-hour choice and timezone; mark only the invalid factor. |
| [File uploader guidelines](https://carbondesignsystem.com/building-blocks/core/components/file-uploader/guidelines) | Explain file limits, offer file-dialog activation as well as drag/drop, stack file rows, match input heights, show per-file progress/error/removal, use tertiary when a primary action already exists. |
| [Dropdown guidelines](https://carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines) | Persistent labels; single-select versus multiselect versus editable combo box; same-height options; consider native select for form/mobile use; specify custom-value policy. |
| [Structured list guidelines](https://carbondesignsystem.com/building-blocks/core/components/structured-list/guidelines) | Simple scannable related information; default rows are read-only, not interactive; use a data table for complex operations. Review/change actions here are a local composition, not a separate Carbon review component. |
| [Text input guidelines](https://carbondesignsystem.com/building-blocks/core/components/text-input/guidelines) | Visible sentence-case labels, persistent helper text, proportional field widths, consistent heights and explicit error message/icon/border. |
| [Button specifications](https://carbondesignsystem.com/building-blocks/core/components/button/specifications) | Regular 14 text, square productive controls, distinct filled secondary and outlined tertiary, focus treatment with contrasting inset. Our simplified button padding is not exact Carbon geometry. |
| [Themes overview](https://carbondesignsystem.com/building-blocks/foundations/themes/overview) and [Color tokens, White tab](https://carbondesignsystem.com/guidelines/color/tokens/) | Values depend on theme, role and layer. White background uses gray field-01; fields on layer-01 use white field-02. White secondary button is gray 80, not an outline. |

## Defaults and editing contract

- Local dimensions: square corners; controls **48** high; body/control text **14**; labels/helpers **12**; internal padding **16**; related-element gap **8**; between field groups **24**. Carbon offers other sizes (often 40 default); 48 is this kit's chosen density, not a universal Carbon requirement. Round switch/radio geometry and pill tags are intentional exceptions defined in the main defaults.
- Explicit `fontFamily=Arial` is a portable **fallback, NOT IBM Plex or an exact reproduction**. Recheck wrapping and glyph placement in the intended viewer. Allow body 14/18 compact or 14/20 longer text, labels/helpers 12/16, section headings 20/28 regular and page headings 32/40 regular; keep annotations at least 12. Grow the recipe text boxes below to fit these line heights and actual copy.
- On a white page: field `#f4f4f4`, strong field border/bottom rule `#8d8d8d`, primary text `#161616`, secondary text `#525252`, primary/focus `#0f62fe`, error `#da1e28`. Helpers use the local secondary color for simplicity; Carbon has a separate helper token.
- Layer/context matters: White `$background=#ffffff`, `$layer-01=#f4f4f4`, `$layer-02=#ffffff`; `$field-01=#f4f4f4` on background, `$field-02=#ffffff` on layer-01. Do not paste gray fields onto every gray container. The styles below assume a white page unless a recipe says otherwise. These are not universal token values across themes, layers or states.
- Carbon White **secondary is filled `#393939` with white text**; **tertiary is blue outlined with transparent interior**. Menu triggers use primary, tertiary or ghost; filled secondary is provided for other action groups, not as a Carbon menu-button variant.
- All parts remain basic rectangles, ellipses, text and lines; no screenshots, fixed UI stencils, external fonts/images, emoji icons, executable links or layer actions. Keep labels, values, icons and borders separately editable. Draw icons from line segments, not font glyphs.
- Coordinates below are local `(x,y,w,h)` offsets from a component origin. Add the frame origin; follow the existing kit's absolute cells with `parent="1"` and screen/state-prefixed IDs. “Group” means a logical reusable bundle, not a required nested XML parent.

## Complete base styles

These identifiers are documentation shorthand, **not registered Draw.io named styles**. Copy the full style into each cell. For variants, replace the stated property once rather than append duplicate keys. Text styles deliberately have zero padding; geometry provides text inset. The compact button recipes below use simplified label-fit padding (16 each side); for standard no-icon Carbon buttons use the main kit's 16-left/64-right padding and widen the button to preserve label space. Icon-bearing menu/split triggers reserve their trailing icon space explicitly. Do not treat compact specimen geometry as a second button system.

| ID | Complete style |
| --- | --- |
| `CW.text` | `text;html=1;whiteSpace=wrap;rounded=0;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=14;fontColor=#161616;fontStyle=0;align=left;verticalAlign=middle;spacing=0;` |
| `CW.label` | `text;html=1;whiteSpace=wrap;rounded=0;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=12;fontColor=#525252;fontStyle=0;align=left;verticalAlign=middle;spacing=0;` |
| `CW.errorText` | `text;html=1;whiteSpace=wrap;rounded=0;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=12;fontColor=#da1e28;fontStyle=0;align=left;verticalAlign=middle;spacing=0;` |
| `CW.field` | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#f4f4f4;strokeColor=none;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#161616;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=48;` |
| `CW.surface` | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#ffffff;strokeColor=none;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#161616;align=left;verticalAlign=middle;spacing=0;` |
| `CW.rule` | `shape=rectangle;rounded=0;html=1;fillColor=#8d8d8d;strokeColor=none;strokeWidth=1;` |
| `CW.divider` | `shape=rectangle;rounded=0;html=1;fillColor=#e0e0e0;strokeColor=none;strokeWidth=1;` |
| `CW.primary` | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#0f62fe;strokeColor=#0f62fe;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#ffffff;fontStyle=0;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=16;` |
| `CW.secondary` | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=#393939;strokeColor=#393939;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#ffffff;fontStyle=0;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=16;` |
| `CW.tertiary` | `shape=rectangle;rounded=0;html=1;whiteSpace=wrap;fillColor=none;strokeColor=#0f62fe;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#0f62fe;fontStyle=0;align=left;verticalAlign=middle;spacingLeft=16;spacingRight=16;` |
| `CW.focus` | `shape=rectangle;rounded=0;html=1;fillColor=none;strokeColor=#0f62fe;strokeWidth=2;` |
| `CW.inset` | `shape=rectangle;rounded=0;html=1;fillColor=none;strokeColor=#ffffff;strokeWidth=1;` |
| `CW.line` | `edgeStyle=none;rounded=0;html=1;startArrow=none;endArrow=none;strokeColor=#161616;strokeWidth=1.5;` |
| `CW.dot` | `ellipse;html=1;fillColor=#161616;strokeColor=none;strokeWidth=1;` |
| `CW.skeleton` | `shape=rectangle;rounded=0;html=1;fillColor=#c6c6c6;strokeColor=none;strokeWidth=1;` |

Focus convention: draw `CW.focus` just inside the active control bounds, inset 1; on filled buttons add `CW.inset` inset 3 for contrast. This is a simplified visual focus convention, not a claim of pixel-exact Carbon focus. Draw only **one actual focus location** per state; selection/highlight is not focus. Error + focus keeps the red error indicator/message and adds the blue ring. Hover can replace neutral field fill with `#e8e8e8`; do not use hover alone to explain availability.

## 1. Reusable field group

**Recipe:** default width 320, total height 104. Label `CW.label (0,0,320,16)`; field `CW.field (0,24,320,48)`; bottom `CW.rule (0,71,320,1)`; helper `CW.label (0,80,320,24)`. Use separate `CW.text (16,38,256,20)` for a value if the background cell is empty. Do not put the same value in both cells. Next group starts at y128. Make width proportional to data; preserve space for right-side icons.

**Copy:** “Project name”; value “Cedar staffing”; helper “Use the name your team recognizes.” Required/optional indication follows the owning form's convention, not an invented asterisk legend. Placeholder never replaces the label or format instructions.

**States:** empty, populated, focused, error, read-only, unavailable and loading as needed. For error, set field stroke to `#da1e28`, width 2; remove the normal bottom rule; add a 16×16 red outlined circle plus line/dot error mark in the trailing area and `CW.errorText` below: “Enter a project name.” Increase message height when wrapping. Keep values after failure. Read-only keeps readable content and a “Read-only” explanation; unavailable uses a local pale fill `#e0e0e0`, secondary text and a visible reason, without pretending it is editable. Loading uses neutral bars plus “Loading project details…” rather than fake values.

**Behaviour/accessibility to specify:** native label association, helper/error description, required/invalid semantics, validation timing and focus after failed submission. Related fields need a legend. A visual field bundle is not an accessible form, and read-only and disabled are not interchangeable.

## 2. Accordion / disclosure

**Inline accordion recipe:** width 560; `CW.divider (0,0,560,1)`, white header `CW.surface (0,1,560,48)`, title `CW.text (16,15,496,20)` “Upload requirements”, two `CW.line` segments forming a 12×6 down chevron at `(528,22)`, bottom divider at y49. Closed height 50. Expanded state flips chevron up and inserts a panel `(0,49,560,104)` with text `(16,65,528,72)` “Attach a PDF or PNG. Each file must be 10 MB or smaller.” Move the bottom divider to y153 and later content down; grow the panel for actual copy.

**States:** closed, closed-focused header, open, open-focused header; focus ring bounds the 48-high header, not the entire expanded content. Multiple sections can stay expanded independently. Show required instructions outside a collapsed section. Do not hide errors inside it or nest accordions merely to save space. Whole page scrolls; no tiny panel scrollbar.

**Floating disclosure alternative:** tertiary “Upload help” trigger `(0,0,160,48)` and, only in the open frame, white panel `(0,56,320,144)` with 16 padding, 20/28 regular heading and wrapping body. This is a local popup composition, not an accordion panel. Keep one floating disclosure open, avoid nesting, and place it within the viewport; do not apply that one-open rule to inline accordion sections.

**Behaviour/accessibility to specify:** accordion heading with a real button and expanded/control relationship; Tab between headers, Enter/Space toggles. For a floating disclosure, record trigger, popup semantics, entry/return focus, Escape/outside dismissal and sensible tab order for its content. It is not a tooltip or a modal by appearance alone. Drawn closed/open/focus frames implement none of these keys.

## 3. Menu button / menu

**Recipe:** tertiary “Actions” trigger `(0,0,160,48)` with label left and 12×6 down caret at `(132,21)`; reserve the caret area from text. Open panel `CW.surface (0,48,224,144)`; three 48-high rows, each with 16 horizontal padding: “Duplicate”, “Download”, “Archive”. Keep the trigger visible. Neutral row hover uses `#e8e8e8`; a focused row gets `CW.focus` inside its own bounds. No diagram shadow is required; any basic-shape shadow is only an elevation hint, not Carbon's exact CSS shadow.

**Variants:** overflow uses a 48×48 unfilled surface with three 3×3 `CW.dot` cells and a contextual accessible-name note, e.g. “More actions for Cedar staffing”. Align its 224-wide menu to the trigger's right edge. A combo/split button uses a primary 160×48 “Save” plus a separate primary 48×48 caret segment and white divider; only the caret opens alternatives. Name the caret “More save options”. Do not make the whole split trigger a single ambiguous action.

**States/copy:** closed, closed-trigger-focused, open-first-item-focused, open-other-item-focused, unavailable item with reason where needed. Focus moves from trigger to item, not both. Add danger copy and a separated section only if the task contains a destructive command; “Delete project…” requires a defined confirmation/recovery, not just red ink. Grow width for copy; Carbon menu guidance uses 160–288 for ordinary short triggers, with longer triggers requiring a menu at least as wide. Keep this menu below five actions; avoid nested submenus unless required.

**Behaviour/accessibility to specify:** action menu, not a field value/listbox; button has popup/expanded relationship; Enter/Space opens, arrows move items, Enter activates, Escape closes and returns focus. Record outside dismissal, unavailable-item handling and destination/focus after actions. A split button has two focusable actions. Icons and static rings do not make it keyboard operable.

## 4. Date picker / time entry

**Closed recipe:** reuse field group at width 240. Label “Start date”; value “2026-10-22”; persistent helper “YYYY-MM-DD”. Calendar icon is an editable 16×16 outline rectangle, top divider and two short binding lines, centered in the trailing 48 area. For memorable dates, omit icon/calendar and use simple text entry. For a range use separate “Start date” and “End date” groups, width 240 each, gap 16; stack on narrow screens.

**Open calendar recipe:** a local simplified 336×344 `CW.surface` aligned to the field's left edge below its 48-high control, overlaying rather than pushing following fields. Use header 48 high, month/year “October 2026” centered, previous/next line chevrons in 48-wide targets; weekday row 24 high; six rows of seven 48×44 day cells; bottom padding 8. For a Monday-first calendar October 1, 2026 is Thursday: three leading September dates precede it. Keep actual day numbers/month transitions correct. Selected day uses a blue filled square with white text; today has an outline and note, not an invented second selection. Focus uses a separate ring on one day; annotate its distinction from selection. This geometry is a drawing approximation, not Carbon's fixed calendar specification.

**Time recipe:** alongside/below date, width 120 field group labeled “Start time”, value “09:30”, helper “24-hour time”. Add a 240-wide timezone group, value “Asia/Ho_Chi_Minh (UTC+07:00)”. For 12-hour input use a separate labeled 96-wide AM/PM select; do not silently omit the period. A time field has no calendar popup. Explain a fixed timezone as readable text instead of a fake selector when it cannot change.

**States/copy:** empty, filled, text-focused, calendar-open/day-focused, selected/closed, individual-factor error and unavailable date with explanation. Example error “Enter a real date in YYYY-MM-DD format.” Keep “2026-02-30” visible for correction; range errors say “End date must be on or after start date.” Do not mark the valid start field invalid. Record min/max rules and timezone/DST handling as product requirements; examples here create no scheduling policy.

**Behaviour/accessibility to specify:** localized format/week start, manual typing, parse/validation timing, calendar naming, full spoken date, month/year navigation, arrow navigation, Enter selection, Escape dismissal and return focus. A date selection can close the popup. Calendar focus-on-input versus explicit-trigger opening must be settled for the chosen implementation; a closed-focused frame may represent focus on the trigger before activation. Static cells do not validate dates, resolve timezones or implement a calendar grid.

## 5. File uploader

**Recipe:** 400-wide section; heading `CW.text (0,0,400,28)` “Supporting files” (20/28 regular); description `CW.label (0,32,400,32)` “PDF or PNG. Up to 3 files, 10 MB each.”; tertiary “Add files” `(0,72,160,48)`. Optional drop zone replaces the button area with a `CW.surface (0,72,400,112)`, stroke `#8d8d8d`, `dashed=1`; 16-padding copy “Drag files here or choose files”. Make “Choose files” an explicit 48-high intended action, not drag-only. Limits are fictional and must match `screens.md`.

**File rows:** below button/drop zone, gap 8, 400×48 `CW.field` per file; filename at x16, separate textual status to its right or on an expanded second line, trailing 48-wide remove target. Draw remove X with two line segments; annotate name “Remove handover.pdf”. Example uploaded row: “handover.pdf · Uploaded”. Add rows vertically, not horizontally. Longer names may wrap in a taller local row or truncate with a full-name disclosure requirement; never hide the distinguishing extension without a way to read it.

**States/copy:** empty, chooser-trigger-focused, drag-over (blue 2 border), uploading “Uploading handover.pdf…”, success “Upload complete”, stable uploaded/removable, and per-file error “File is larger than 10 MB. Choose a smaller file.” Error rows grow for copy and offer “Try again” only for retryable transfer failures. Use known percentages only when the system provides them. A selected file is not necessarily uploaded or submitted. State whether removing it deletes a server file or only detaches it; do not guess.

**Behaviour/accessibility to specify:** native file chooser with keyboard alternative to drop, accepted types/count/size, progress/error announcements, return focus after chooser, focus after removal, cancel/retry and duplicate-file rules. Actual type/size/security checks and storage are implementation work, not guaranteed by an extension label. Avoid multi-file upload in a cramped modal.

## 6. Dropdown / combobox

**Recipe:** 320-wide field group; label “Ward”; closed placeholder “Choose a ward”; end chevron as in accordion. Open list `CW.surface (0,72,320,144)` immediately under the field (its top begins at group y24). Three 48-high option rows with 16 padding: “Birch”, “Cedar”, “Maple”. Move helper below the open list in a catalogue specimen, or annotate it as obscured by the overlay in a real screen; do not silently overlap readable text. Use neutral selection fill `#e0e0e0` plus a two-segment check, with `CW.focus` on only the active option. Selected value “Cedar” remains in the field after closing.

**Combobox variant:** same group with editable query “Ce”, clear X in a separate trailing target, and filtered result “Cedar”. Widen to 368 if clear and chevron need separate 48-wide areas; reserve their space from value text. State “Choose an existing ward” for a constrained search, or explicitly permit a custom value when the task allows it. Carbon describes a custom-value combo box; a restricted lookup is a deliberate product constraint, not that same free-entry contract. Do not draw search merely because an ordinary dropdown has a chevron.

**States/copy:** closed-empty, closed-focused, open-option-focused, selected/closed, query/results, query/no matches (“No wards match ‘Zz’”), loading results (“Loading wards…”), error (“Choose a ward”), read-only and unavailable as required. No matches is not a selectable option or a network failure. Preserve the query on error. Empty options and loading need distinct explanations. Multiselect is a different variant: checkboxes, explicit count/clear intent, menu remains open during selection; do not add it to a single-select drawing without a requirement.

**Behaviour/accessibility to specify:** prefer native select for a straightforward form/mobile choice and radios for two options. Custom dropdown/listbox and editable combobox require different focus/key models; document popup association, active option versus committed selection, arrows/Enter/Escape, result announcements, clear action and custom-value commit rules. Editable queries retain text-input editing keys. No action-menu roles for form choices. Open direction/scroll boundary must fit the viewport; show a scroll cue if options exceed the visible list. Drawn lists are not functioning selects or autocomplete.

## 7. Structured list / review summary

**Read-only recipe:** width 560, heading “Review request” at `(0,0,560,28)` (20/28 regular), optional column headings “Detail” and “Value” at y40; divider y71. Each following row is at least 64 high, with term `CW.label (16,rowY+16,144,32)`, value `CW.text (176,rowY+16,272,40)`, and bottom divider. Example pairs: “Ward / Cedar”, “Start / 22 October 2026, 09:30 (UTC+07:00)”, “Attachment / handover.pdf”. Grow rows for wrapping instead of clipping or reducing type. No selection glyphs, row hover or row focus in a read-only list.

**Review composition:** optional separate blue underlined “Change” action at `(464,rowY+8,80,48)`; annotate accessible name “Change start date and time”, etc. This local review adaptation is not a claim that Carbon's default structured list provides edit links. Below rows, leave 24 then a primary 176×48 “Send request”; supporting copy “Nothing is sent until you select Send request.” Values are saved answers, not editable input lookalikes. A definition list may better fit term/value review semantics; a true multi-column comparison needs appropriate headers/table semantics.

**States:** populated/read-only, loading skeleton with “Loading request details…”, missing required value “Not provided” with a clear correction action, change-action-focused, sending “Sending request…”, and send failure retaining all answers with “Request was not sent. Try again.” A disabled send action needs a reason; don't invent permission rules. Focus belongs on the Change/Send action, not the whole static row. If the task truly needs single row selection, use an explicit selectable-list variant with radio indicators and its own selected/focused states; complex sorting/filtering/multi-selection belongs in a data table.

**Behaviour/accessibility to specify:** logical term/value reading order, meaningful change names/destinations, returning to review without losing answers, focus after return, submit status/error announcement and retry safety. A readable summary is not evidence that sending succeeded; show confirmation only after the specified system outcome.

## Handoff boundaries

Keep screen/state IDs, frame sizes, board lanes and flow routing from [web-components.md](web-components.md). Use static snapshots with captioned triggers, not Draw.io actions that pretend to run a widget. Closed/open/focus are component variants, not new canonical SC state suffixes: use the owning screen's supported state classification and explicitly annotate the depicted variant. The reference specimen board uses descriptive non-SC IDs because it is not a product flow. Do not add every variant to every screen; use the owning scenario's state contract.

Record semantics, keyboard model, tab/reading order, accessible names, focus entry/return, announcements, validation, responsive treatment and recovery in `screens.md` and short board notes. Static Draw.io shapes implement **no keyboard functionality**, file transfer, form validation, focus management or screen-reader semantics. Their dimensions do not establish CSS-pixel target sizes or reflow.

Before handoff, inspect the rendered board for label/value clipping, icon alignment, focus visibility, calendar correctness, panel containment, overlay occlusion and narrow-screen stacking. Measure actual foreground/background contrast after theme/layer changes; palette names and official token roles are not a rendered accessibility audit or a conformance claim. Structural checks, visual review and implementation accessibility tests are separate evidence.
