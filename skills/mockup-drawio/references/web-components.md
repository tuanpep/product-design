# Ant Design UI components for Draw.io mockups

An editable kit for **static screen/state mockups with annotated flows**, based on [Ant Design](https://ant.design/). These are drawings of components, not executable React components. Use [example.drawio](example.drawio) for cover-request states, [collection-flow.drawio](collection-flow.drawio) for find → inspect → edit, and [component-recipes.drawio](component-recipes.drawio) for isolated specimens. The [input-type catalogue](input-types.md) defines value semantics, validation and storage with a separate [14-panel input board](input-types.drawio).

## Research and scope

Researched **2026-10-23**. Baseline: **Ant Design light**, `theme.defaultAlgorithm`, pinned to **`antd@6.6.7`** ([published package](https://unpkg.com/antd@6.6.7/package.json)). This is a source snapshot, not an installed runtime dependency. Existing target-product components and their installed version take precedence. The boards apply the explicit contrast and density adaptations below; they are not pixel-perfect default-theme screenshots.

| Official source | Applied guidance |
| --- | --- |
| [React introduction](https://ant.design/docs/react/introduce), [customize theme](https://ant.design/docs/react/customize-theme) | Import named components from `antd`; use `ConfigProvider` for theme tokens and component overrides. Resolve seed → map → alias tokens for the chosen algorithm. |
| [Button](https://ant.design/components/button) | `type="primary"` for the main action, default for Cancel, `type="text"` for borderless actions. Primary is blue, not dark neutral. `loading` and `disabled` are distinct states. |
| [Form](https://ant.design/components/form), [Input](https://ant.design/components/input) | `Form layout="vertical"` + `Form.Item` + `Input`/`Input.TextArea`; visible labels, rules and help. Explicitly set validation timing rather than inheriting `onChange` unintentionally. |
| [Radio](https://ant.design/components/radio), [Checkbox](https://ant.design/components/checkbox), [Switch](https://ant.design/components/switch) | Single answer, independent answer and immediate setting are different semantics. Radio selection is blue with a white center, not keyboard focus. |
| [Table](https://ant.design/components/table), [Tag](https://ant.design/components/tag), [Descriptions](https://ant.design/components/descriptions) | Compare records in aligned columns; tag status with text; read-only entity facts are descriptions, not disabled inputs. |
| [Alert](https://ant.design/components/alert), [Message](https://ant.design/components/message) | Error Alert uses a tinted surface, border and optional `showIcon`. Critical recovery persists; same-view transient feedback may use Message. Use context-aware hooks/App when theme context is needed. |
| [Collapse](https://ant.design/components/collapse), [Dropdown](https://ant.design/components/dropdown) | `items` APIs; leading Collapse caret. Action Dropdown uses `menu`, not form options; explicitly choose `trigger={['click']}` instead of default hover. |
| [DatePicker](https://ant.design/components/date-picker), [TimePicker](https://ant.design/components/time-picker), [Upload](https://ant.design/components/upload), [AutoComplete](https://ant.design/components/auto-complete) | Use real component APIs, not inherited behavior from another library. See the sixteen [extended recipes](extended-components.md). |
| [Tabs](https://ant.design/components/tabs), [Steps](https://ant.design/components/steps), [Modal](https://ant.design/components/modal), [Drawer](https://ant.design/components/drawer), [Pagination](https://ant.design/components/pagination) | Peer navigation, ordered task progress, confirmation, contextual panels and collection paging are separate patterns; include only when the task needs them. |
| [InputNumber](https://ant.design/components/input-number), [Cascader](https://ant.design/components/cascader), [TreeSelect](https://ant.design/components/tree-select), [Slider](https://ant.design/components/slider), [ColorPicker](https://ant.design/components/color-picker) | Numeric values are not digit-only identifiers; path selection differs from selecting a node; sliders need exact-entry alternatives; colors need visible text and separate contrast checks. See [input types](input-types.md). |
| [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/), [APG modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Labels, contrast, focus, targets, reflow and dialog focus behavior remain implementation requirements, not guarantees from XML. |

### Extended recipes and Ant Design styling

`Button`, `Form.Item` and other names identify implementation mappings, not claims that a Draw.io cell instantiates React. No runtime package, remote font, branding or external image is required to open these drawings.

## Foundations

Ant Design uses alpha text colors; the table resolves those on **white** for opaque Draw.io shapes. Recalculate on changed layers. Prefer semantic tokens in an implementation, not copied hex values.

| Role / token | Light value used | Use and deviation |
| --- | --- | --- |
| `colorBgContainer` / `colorBgLayout` / table `headerBg` | `#ffffff` / `#f5f5f5` / `#fafafa` | White content / supporting layout / table header |
| `colorText`, `colorTextHeading` / `colorTextSecondary` | `#1f1f1f` / `#595959` | Black at .88 / .65 resolved on white; secondary used for readable help |
| `colorBorder` / `colorBorderSecondary` | `#d9d9d9` / `#f0f0f0` | Default decorative borders / dividers |
| Input, InputNumber, Select, Cascader, TreeSelect, DatePicker, ColorPicker and Radio `colorBorder` override | `#8c8c8c` | Stronger normal control boundary; default `#d9d9d9` does not meet 3:1 on white |
| `colorPrimary` | `#1677ff` | Selected radio and default primary/selected-navigation accents |
| Button `colorPrimary` override | `#0958d9` | White primary-button text contrast adaptation; unmodified `#1677ff` does not meet 4.5:1 |
| Default Button | `#ffffff` / `#1f1f1f` / `#d9d9d9` | Surface / text / border; Cancel is not primary |
| `colorLink` override / schematic focus | `#0958d9` | Links / visible outer focus; focus drawing is not the default translucent input shadow |
| `colorError` / `colorErrorText` override | `#ff4d4f` / `#c41d24` | Invalid outline / readable error copy; default error text lacks normal-text contrast |
| `colorErrorBg` / `colorErrorBorder` | `#fff2f0` / `#ffccc7` | Error Alert background / border |
| Neutral Tag | `#f5f5f5` / `#1f1f1f` / `#d9d9d9` | Stable metadata, not completion |
| Blue Tag | `#e6f4ff` / `#0958d9` / `#91caff` | Pending/in-progress metadata, not acceptance |
| Menu selected background / text | `#e6f4ff` / `#1677ff` | Text emphasis; existing navigation marker uses blue, not orange |
| Hover / skeleton | `#f5f5f5` / `#f0f0f0` | Opaque approximations of neutral fill on white; not measured progress |

Suggested implementation theme for the **adapted roles**, not a runtime included in this repository:

```tsx
import { ConfigProvider, theme } from 'antd';

const mockupTheme = {
  algorithm: theme.defaultAlgorithm,
  token: { colorLink: '#0958d9', colorErrorText: '#c41d24', controlHeight: 48 },
  components: {
    Button: { colorPrimary: '#0958d9' },
    Input: { colorBorder: '#8c8c8c' }, // Also review Password and OTP variants.
    InputNumber: { colorBorder: '#8c8c8c' },
    Select: { colorBorder: '#8c8c8c' },
    Cascader: { colorBorder: '#8c8c8c' },
    TreeSelect: { colorBorder: '#8c8c8c' },
    DatePicker: { colorBorder: '#8c8c8c' },
    ColorPicker: { colorBorder: '#8c8c8c' },
    Radio: { colorBorder: '#8c8c8c' },
  },
};

// Wrap the actual React tree with <ConfigProvider theme={mockupTheme}>…</ConfigProvider>.
```

Overrides derive related tokens and states; inspect actual resulting hover, active, disabled and focus styles in the installed version. AutoComplete uses Select styles; TimePicker uses DatePicker styling. Sliders and other non-outline controls need their own state/contrast review rather than an assumed border override. Local bold field labels, persistent link underlining and the opaque focus annotation also require explicit styling if reproducing the drawings exactly.

Type: body/help/control 14, with at least 22-unit line allowance (default line-height ~1.5714); labels/legends 14 bold are a local emphasis choice, metadata 12, section title 20, page title 30 (Ant heading-2 scale). `fontFamily=Arial` is a portable member of Ant Design's system-font fallback stack, not identical metrics or 600 weight. Grow text boxes for wrapping.

Density: **48-high local controls and labelled targets** preserve the existing boards. Ant defaults are 32, large 40 and small 24; 48 is an explicit `controlHeight` adaptation, not `size="large"`. Use 12 horizontal padding, 8 label gap and 24 between groups on a 4-unit spacing scale. Local 64-high table rows and shell dimensions are composition assumptions. Draw.io units are not CSS-pixel accessibility evidence.

## Draw.io style primitives

Copy complete styles; replace properties instead of appending duplicate keys. Radius 6 is `rounded=1;absoluteArcSize=1;arcSize=12;` (absolute arc size is twice corner radius). Cards use radius 8 / `arcSize=16`, tags radius 4 / `arcSize=8`, not pills. Glyphs and dividers remain unrounded.

| Primitive | Complete style |
| --- | --- |
| Text | `text;html=0;whiteSpace=wrap;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=14;fontColor=#1f1f1f;align=left;spacing=0;` |
| Label (local bold) | `text;html=0;strokeColor=none;fillColor=none;fontFamily=Arial;fontSize=14;fontStyle=1;fontColor=#1f1f1f;align=left;spacing=0;` |
| Primary Button (adapted) | `rounded=1;absoluteArcSize=1;arcSize=12;html=0;fillColor=#0958d9;strokeColor=none;fontFamily=Arial;fontSize=14;fontColor=#ffffff;align=center;spacingLeft=12;spacingRight=12;` |
| Default Button | `rounded=1;absoluteArcSize=1;arcSize=12;html=0;fillColor=#ffffff;strokeColor=#d9d9d9;fontFamily=Arial;fontSize=14;fontColor=#1f1f1f;align=center;spacingLeft=12;spacingRight=12;` |
| Text Button | `rounded=1;absoluteArcSize=1;arcSize=12;html=0;fillColor=none;strokeColor=none;fontFamily=Arial;fontSize=14;fontColor=#1f1f1f;align=center;spacingLeft=12;spacingRight=12;` |
| Input/TextArea (adapted boundary) | `rounded=1;absoluteArcSize=1;arcSize=12;html=0;fillColor=#ffffff;strokeColor=#8c8c8c;strokeWidth=1;fontFamily=Arial;fontSize=14;fontColor=#1f1f1f;align=left;spacingLeft=12;spacingRight=12;` |
| Card | `rounded=1;absoluteArcSize=1;arcSize=16;fillColor=#ffffff;strokeColor=#d9d9d9;` |
| Schematic focus | `rounded=1;absoluteArcSize=1;arcSize=12;fillColor=none;strokeColor=#0958d9;strokeWidth=2;` |
| Divider | `fillColor=#f0f0f0;strokeColor=none;` |
| Blue Tag | `rounded=1;absoluteArcSize=1;arcSize=8;html=0;fillColor=#e6f4ff;strokeColor=#91caff;fontFamily=Arial;fontSize=12;fontColor=#0958d9;align=center;spacingLeft=8;spacingRight=8;` |
| Neutral Tag | `rounded=1;absoluteArcSize=1;arcSize=8;html=0;fillColor=#f5f5f5;strokeColor=#d9d9d9;fontFamily=Arial;fontSize=12;fontColor=#1f1f1f;align=center;spacingLeft=8;spacingRight=8;` |
| Error Alert | `rounded=1;absoluteArcSize=1;arcSize=12;html=0;whiteSpace=wrap;fillColor=#fff2f0;strokeColor=#ffccc7;fontFamily=Arial;fontSize=14;fontColor=#1f1f1f;align=left;spacing=16;` |

Focus drawings use a 2-wide blue outline with white separation, one focus location per snapshot; the 4–6-unit gap is schematic, not Ant's exact CSS. Invalid fields retain error border/copy when focused. Default error border `#ff4d4f` is approximately 3.27:1 on white, meeting the selected boundary threshold but not the 4.5:1 normal-text threshold; use the darker error-copy override. Selection is separate from focus.

## Composition before components

1. Read owning `screens.md`: task, actor, copy, decisions, permissions, recovery and view order. Do not invent features to display components.
2. One close task per file; use root `mockup.drawio` or actor/task folders. See [product-layouts.md](product-layouts.md).
3. Full-size default frames: desktop 1440×900, tablet 768×1024, mobile 375×812; assumptions, not device research. Keep shell/data consistent.
4. Business order left to right then top to bottom; gaps 240 horizontal, 280 vertical; captions 40 above, notes at least 20 below. Keep connector lanes clear.
5. Absolute cells, `parent="1"`, frame `<screen>-<view>`, interior IDs prefixed with that frame; annotations end `-caption`/`-note`, edges `flow-1`, etc. View names must not prefix another view name of the same screen.
6. Only end-user UI and copy belong inside frames; put SC IDs, token assumptions, caveats and behavior explanations outside.
7. Local desktop shell: 48-high header, optional 224–256 sidebar, main starts 32–40 after sidebar; form 560–640 wide. Fictional application, not an Ant Design Pro chrome replica.
8. Narrow layouts use 16–24 margins, stack labels/actions and specify table-to-list or horizontal scrolling. Never shrink desktop type to fake responsiveness.

## Component mapping and state rules

| Pattern | Ant Design mapping | Drawing and specification boundary |
| --- | --- | --- |
| Shell/navigation | `Layout`, `Menu`, `Breadcrumb`, `Typography.Link`, `Tabs` | Light selected item uses blue tint/text. Preserve destinations and return focus; tabs are peers, not steps. |
| Field group | `Form.Item`, `Input`, `Input.TextArea`, `Select` | White full-outline fields, radius 6; visible label/help/error and retained values. Select is not an action menu. |
| Typed values | `Input` with native type, `Input.Password`, `Input.OTP`, `InputNumber` | Choose from [input types](input-types.md); identifiers/codes remain strings, precision and empty values are explicit, and presentation does not verify credentials. |
| Temporal values | `DatePicker`, `TimePicker`, `DatePicker.RangePicker` | Date-only, local time, interval and zoned instant are distinct storage contracts. No implicit timezone conversion. |
| Structured/approximate values | `Cascader`, `TreeSelect`, `Slider`, `ColorPicker` | Define path versus entity IDs, numeric alternatives and canonical colors; no pointer-only or swatch-only answer. |
| Single choice | `Radio.Group`, `Radio` | Named group and regular option labels, help beneath; no bordered-card requirement. Eligibility is separate. |
| Independent choice / immediate setting | `Checkbox` / `Switch` | Do not use Switch for consent or submit-driven answers. `Form.Item valuePropName="checked"` binds these values. |
| Search | `Input` with `onPressEnter`, or `Input.Search` with `onSearch` | Match declared Enter-to-submit behavior; do not silently add live filtering. |
| Collection | `Table`, optionally `Pagination` | Real headers/records and explicit row links. Disable pagination for three records. Skeleton is not a completion percentage. |
| Metadata | `Descriptions`, `Tag` | Pending acceptance uses blue, not success. Taxonomy labels and statuses are different concepts. |
| Validation / policy failure | `Alert type="error" showIcon` + `Form.Item` feedback | Error-tinted bordered surface with icon and matching inline recovery. Summary links/focus are application behavior, not supplied by the drawing. |
| Completion | Outcome heading + `Card`/`Descriptions`, or task-appropriate `Result` | Accurate outcome/next action, not an unnecessary success Alert. Sending is not acceptance. |
| Transient feedback | `message` via `App.useApp()` or `message.useMessage()` | Persistent critical recovery must not disappear in a transient message. |
| Modal / drawer | `Modal`, `Drawer` | Only when task needs them; specify focus entry/return, Escape, background isolation and scroll. Static rectangles implement none of these. |
| Loading / empty | `Skeleton`, `Spin`, `Empty` | Distinguish no records, no matches, loading and failed fetch. Keep context and specific recovery. |

## Board annotations and flow routing

Captions 20 bold; notes 14 with wrapping and enough height. Notes are not product alerts. Flow style: `edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=block;strokeColor=#0958d9;strokeWidth=2;fontFamily=Arial;fontSize=14;labelBackgroundColor=#ffffff;`.

Start user arrows at actual controls; label automatic transitions `System:`. Use waypoints in gaps, destination boundary ports and no unrelated frames/notes. Dashed edges are layout alternatives, not error paths. Explain unroutable secondary outcomes in owning text rather than creating spaghetti.

## Measured default pairs

Calculate opaque foreground/background pairs with the [WCAG sRGB formula](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Tests check actual role cells for body/help, adapted white-on-primary, links, error text, tags and control/focus pairs (4.5:1 normal text, 3:1 required non-text). Default `#1677ff` on white, default error text and default input border fail their respective thresholds; the overrides are deliberate, not Ant defaults. Selected-navigation text also needs implementation-level review. Decorative borders, disabled styling and icons have different obligations. No blanket AA claim follows from passing selected pairs.

## Accessibility and verification

Drawings have no HTML semantics, keyboard behavior, validation, uploads or announcements. Record roles, labels/legends, tab order, selected versus focused state, validation timing, focus after submit/return, status announcements and responsive treatment in owning text. Use the system-font stack and `@ant-design/icons` in implementation; editable line/ellipse icons here are schematic.

Before handoff: validate XML IDs/parents/references, screen/view coverage, full-size geometry, containment and action sources; inspect actual rendering at reading scale; calculate contrast; test keyboard, screen readers, targets, zoom and reflow on a running implementation. Report these separately. No user-testing, exact runtime fidelity or accessibility-conformance claim follows from fixtures.
