# Input types: Ant Design light

Baseline: **`antd@6.6.7`**, researched **2026-10-23**. Use the [theme and drawing contract](web-components.md#foundations) and [editable input board](input-types.drawio). This is a catalogue of **value semantics**, not just different-looking boxes. It complements the [16 general component recipes](extended-components.md); it does not add inputs to existing product flows automatically.

## Define the value before choosing the control

Each input specification should name:

| Contract | Define explicitly |
| --- | --- |
| Meaning and ownership | What question is answered; who may see/change it; source of options; required versus optional |
| Data type | String, exact decimal string, integer, boolean, entity ID(s), date-only, local time, zoned instant, interval or color; empty/null semantics |
| Display versus storage | Localized display, canonical representation, units/currency/timezone, retained leading zeros; no silent conversion |
| Entry behavior | Ant component and native `type`/`inputMode`/`autoComplete` where applicable; typing/paste, IME, autofill, clear and selection rules |
| Constraints | Length/count, range/step/precision, allowed values, uniqueness, cross-field rules, permissions and server checks |
| Validation | When validation runs; exact error and recovery; preserve entered value; normalize only under an explicit rule |
| State and commitment | Empty, filled, focused, invalid, loading, unavailable and read-only; submit-driven versus immediate change |
| Accessibility | Visible label, help/error association, group/option names, keyboard and popup behavior, spoken units/state, focus after failure/return |

Component `status`, `min`, `max`, `precision`, `maxLength`, `disabled` or browser `type` alone do **not** define a secure business rule. Validate authorization and canonical values server-side. Use `Form.Item` names/rules and explicit validation timing; labels are not placeholders. Initial values belong to Form `initialValues`, not child `defaultValue` in a named field.

Example owning specification (illustrative, not a new product requirement):

```text
Field: Duration
Meaning/control: planned effort; InputNumber, visible label "Duration (hours)"
Canonical value: decimal hours; null means unanswered, 0 means zero effort
Rules: required, 0–24 inclusive, increments of 0.25; reject rather than round
Commit: saved with the form, not on every stepper change
Validation: on submit, then revalidate the affected field after correction
Recovery: "Enter hours from 0 to 24 in quarter-hour increments."
Retained value: preserve invalid text for correction using application-owned
  edit state or a text-input strategy if InputNumber would normalize it
Accessibility: named field, units and error association; summary focus on failure
Server: recheck numeric domain, quarter-hour rule and permission to change effort
```

The example highlights a component boundary: if a strict retained-invalid-text requirement conflicts with numeric blur normalization, choose/configure the entry strategy deliberately rather than claiming the static InputNumber supplies that behavior automatically.

### Input selection matrix

| Value / task | Ant Design mapping | Stored value and key rule |
| --- | --- | --- |
| Name / short text | `Input type="text"` | String; do not restrict names to ASCII or silently change case |
| Reference, postal code, account identifier | `Input type="text"` | String, even if digits only; preserve `001042` |
| Email | `Input type="email"` | String; syntax is not address ownership |
| Phone | `Input type="tel"` | String; international prefix/extension policy, not arithmetic |
| Website | `Input type="url"` | URL string; explicit allowed schemes and safe rendering |
| Search query | `Input.Search` or labelled `Input` | String; declare submit/clear behavior, not automatic entity selection |
| Password | `Input.Password` | Sensitive string; mask is presentation, never a security boundary |
| One-time code | `Input.OTP` | String of fixed length; preserve leading zeros; filled is not verified |
| Count / decimal measurement | `InputNumber` | Number or exact decimal string; empty differs from zero |
| Money / percentage | `InputNumber` with deliberate formatting | Exact amount plus currency / percent unit, not a locale-formatted storage string |
| Long text | `Input.TextArea` | String with explicit length/counting and newline policy |
| Date / time / date-time | `DatePicker`, `TimePicker`, `DatePicker showTime` | Date-only, local-time or zoned instant are different types |
| Interval | `DatePicker.RangePicker`, `TimePicker.RangePicker`, `Slider range` | Ordered endpoints with units, boundary and empty-end rules |
| One known value / several known values | `Radio.Group` or `Select`; `Checkbox.Group` or `Select mode="multiple"` | ID or ID array, not display label; validate membership and permissions |
| Free-text suggestions / new labels | `AutoComplete`; `Select mode="tags"` | Free text / string array, not necessarily existing entity IDs |
| Hierarchical path / entity in a tree | `Cascader`; `TreeSelect` | Path array / selected node ID(s); define allowed parent/leaf selection |
| Bounded approximate quantity | `Slider` with numeric alternative | Scalar or interval; units, min/max/step and keyboard route |
| Color | `ColorPicker` with visible value | Canonical color including alpha policy; contrast is a separate check |
| Boolean / consent / immediate preference | `Checkbox` / `Switch` | Boolean with explicit commit/pending/failure semantics; see [choice recipe](extended-components.md#8-checkbox-and-switch) |
| File | `Upload` | Selected file metadata differs from uploaded asset ID; see [upload recipe](extended-components.md#5-upload-validation) |

## 1. Text and identifier

Source: [Input](https://ant.design/components/input), [pinned Input API](https://github.com/ant-design/ant-design/blob/6.6.7/components/input/index.en-US.md). Board prefix: `text`.

**Examples:** Full name → Mai Tran; Reference ID → `001042`. Both are strings. A reference may use `inputMode="numeric"` **only when** its format is digits-only; `inputMode` suggests a keyboard, it does not validate. Postal codes, phone numbers and account IDs are not `InputNumber` values. Never strip leading zeros or coerce empty to zero.

Define maximum length, whitespace/normalization policy and whether an identifier is editable. For names, permit the scripts and punctuation the service needs; do not invent a first/last-name split from this example. Use `autoComplete="name"` for a person's full name where appropriate. Recovery: “Enter your full name” or “Enter the six-character reference” only if those are actual owned rules. Read-only references remain copyable.

## 2. Email and phone

Sources: [Input](https://ant.design/components/input), [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types). Board prefix: `contact`.

**Examples:** `mai@example.com`, `+84 90 123 4567`. Map to `Input type="email" autoComplete="email"` and `Input type="tel" autoComplete="tel"`. Phone is a string; keep international prefix and specify extensions, country context and display/canonical formatting deliberately. Do not impose one country's format globally. Browser email validation is not proof of deliverability or identity; verify ownership separately when required.

Use meaningful labels, not email/phone icons alone. Avoid validation on every partial keystroke; preserve input on failure. Recovery: “Enter a complete email address, for example mai@example.com.” For phone errors, name the expected country/format only if the service requires it. Use fictional contact data in drawings; never expose real personal contacts in fixtures.

## 3. URL and search

Source: [Input / Input.Search](https://ant.design/components/input). Board prefix: `web`.

**Examples:** Website → `https://example.com/help`; Search requests → Repair light. Map URL to `Input type="url"`; define whether scheme is required, permit only owned schemes (commonly HTTPS), validate length and render safely. A client URL check does not make a backend fetch safe: server fetchers must prevent access to internal/private destinations. Displaying a string in the diagram does not make it clickable.

`Input.Search` uses `onSearch` on Enter/search-button activation **and on clear**, with `source="input" | "clear"`. Define whether Clear resets results immediately or waits for submit; do not accidentally submit twice via both Enter handlers and Form submit. Preserve query/context across detail navigation. A search string is not a selected entity. Loading, no matches, failed search and zero records need distinct feedback.

## 4. Password and one-time code

Source: [Input.Password / Input.OTP](https://ant.design/components/input), [pinned Input API](https://github.com/ant-design/ant-design/blob/6.6.7/components/input/index.en-US.md). Board prefix: `secret`.

Password uses `Input.Password`; select `autoComplete="current-password"` versus `"new-password"` according to task. Allow paste/password managers, give any reveal control a usable name/state and keep policy instructions visible. Do not invent a maximum or composition rule from the drawing. Masking does not secure stored/transmitted values; exclude secrets from URLs, analytics, logs and mockups. The board's bullets are illustrative, not a real password.

One-time code uses `Input.OTP length={6} autoComplete="one-time-code"`; six is a **fixture rule**, not universal. Store a string (`001042`) and allow paste/autofill; choose digits-only policy explicitly. `onChange` fires when all fields are filled, `onInput` reports partial input; neither means verification succeeded. Specify a Verify action versus deliberate auto-submit, expiry, rate limits, resend cooldown and server verification. Never use a live code in a fixture. Name the group/positions, explain errors and test focus/backspace/paste behavior in the installed version. Recovery should distinguish expired from incorrect without leaking sensitive account information.

## 5. Integer and decimal measurement

Source: [InputNumber](https://ant.design/components/input-number), [pinned numeric API](https://github.com/ant-design/ant-design/blob/6.6.7/components/input-number/index.en-US.md). Board prefix: `numeric`.

**Examples:** Quantity `3`, integer 1–99; Duration `1.5` hours, 0–24 with step0.25. These ranges are fictional teaching rules. Specify unit, sign, range, decimal scale and permitted increments. `precision` controls display behavior; `step` controls increments, not a guarantee that every typed value is step-aligned. Validate canonical values separately; define rounding versus rejecting excessive precision rather than silently truncating.

Use `onChange(number | string | null)`, not formatted `event.target.value` on blur; null means unanswered, not zero. `stringMode` returns a string for high-precision values. Controlled values can exceed min/max, and `changeOnBlur` may normalize on blur by default—decide and test retention/commit behavior. Avoid passing `type="number"` merely for a keyboard: native wheel behavior can bypass `changeOnWheel`. Do not let scrolling silently change a high-risk quantity. Recovery names range and units: “Enter a whole number from1 to99.”

## 6. Currency and percentage

Source: [InputNumber](https://ant.design/components/input-number). Board prefix: `amount`.

**Examples:** Amount `1234.50` USD; Discount `12.5` percent. Money is an exact decimal string plus a currency code (or an explicitly chosen minor-unit representation), not a binary floating-point promise. The fixture uses `stringMode`, scale2 and an explicit USD label; not all currencies have two decimal places. Validate amount, currency, sign, maximum and rounding rules server-side using exact arithmetic. `formatter`/`parser` only bridge display and value; define accepted separators/locales and do not strip arbitrary non-digits to guess an amount.

Percentage here uses domain0–100, so `12.5` means12.5%, **not** fraction0.125. State whether backend storage uses percent or fraction and convert once. Zero, blank and not-applicable differ. Suffix/prefix text is not the accessible label; units/currency must be spoken and visible. Error example: “Enter a percentage from0 to100.”

## 7. Multiline text

Source: [Input.TextArea](https://ant.design/components/input). Board prefix: `multiline`.

Use `Input.TextArea`, **not** `Input type="textarea"`. Example: “Please deliver after 14:00.” Use visible label/instructions, top-aligned text and at least96-high drawing area; `autoSize={{ minRows: 3, maxRows: 6 }}` is a runtime option, not implemented in XML.

Define maximum length, whether it counts UTF-16 units, graphemes or bytes, newline normalization and whether formatting is plain text. Ant `count.max` marks overflow but does not truncate unless configured; native `maxLength` and controlled values have different behavior. Use the same counting rule on server and client, preserve overflow text with recovery rather than silently deleting it, and avoid announcing every typed character. Do not request sensitive explanations the task does not need.

## 8. Date and time

Sources: [DatePicker](https://ant.design/components/date-picker), [TimePicker](https://ant.design/components/time-picker). Board prefix: `temporal`.

Examples:28/02/2026 and09:30, with visible formats DD/MM/YYYY and HH:mm, 24-hour. `DatePicker format="DD/MM/YYYY"` and `TimePicker format="HH:mm"` use Day.js by default and custom popups, not native browser calendars. Date-only storage (e.g. `2026-02-28`) must not shift a day through an accidental UTC conversion. A local time such as09:30 is not an instant without date and zone.

Specify min/max, disabled dates/times with explanations, strict parsing, clear/null policy and `needConfirm` behavior. The specimen uses fixed Asia/Ho_Chi_Minh (UTC+07:00); a production timezone with daylight-saving transitions needs explicit ambiguous/nonexistent-time recovery. `preserveInvalidOnBlur` is false by default for DatePicker; decide deliberately if correction requires retaining invalid text. See the [plain-text invalid-date recipe](extended-components.md#4-date-and-time-entry), which is a different input strategy. Inspect calendar/time keyboard navigation and spoken values in runtime.

## 9. Date interval and date-time

Source: [DatePicker / RangePicker](https://ant.design/components/date-picker). Board prefix: `period`.

Examples:28/02/2026–02/03/2026 and28/02/2026 at09:30 Asia/Ho_Chi_Minh. Use `DatePicker.RangePicker` for a pair, `DatePicker showTime` for a date plus time. Label both endpoints; define inclusive/exclusive boundaries, whether same-day intervals are allowed, open-ended values and cross-field ordering. Ant's auto-ordering must not silently replace a task's validation rule.

The date interval stores two dates, not a timestamp duration. A scheduled instant needs date, time, IANA zone and an explicit canonical conversion/storage policy; `showTime` itself is **not timezone selection**. Do not encode a timezone abbreviation alone. Preserve the user's intended local values on failure, explain unavailable intervals, and prevent an end earlier than start server-side. Neither static popup icons nor formatted dates prove valid scheduling.

## 10. Multiple choices and created labels

Source: [Select](https://ant.design/components/select). Board prefix: `selection`.

`Select mode="multiple"` chooses known values (Support, Billing); store IDs and validate membership/permissions, not labels. `Select mode="tags"` can create a new string label (review-needed); never use it for a constrained existing-user/team lookup. Define duplicates/case/whitespace, maxCount, creation permissions and deletion/removal. Removing a selected chip is not deletion of the underlying entity.

Query, keyboard-active option and committed selection remain distinct. Label clear/remove actions and announce changed counts; keep a usable layout when chips wrap. For Ant6 search configuration, use the supported `showSearch` object rather than copying deprecated filter props. Options loading, no matches and failed fetch are different; async queries need cancellation/stale-result handling. For a small set of visible independent choices use Checkbox.Group instead. Single-value Select and free-text AutoComplete remain in the general board.

## 11. Hierarchical path and tree entity

Sources: [Cascader](https://ant.design/components/cascader), [TreeSelect](https://ant.design/components/tree-select). Board prefix: `hierarchy`.

Cascader answers a path such as Vietnam → Ho Chi Minh City; its value is a path of IDs. TreeSelect answers one or several selected nodes such as Cedar ward; define node IDs, parent/leaf eligibility and whether selecting a parent includes descendants. These are not interchangeable merely because both have nested options.

Define loading/errors for branches, disabled ancestor/leaf reasons, search behavior, clear/removal and retained selections when the tree changes. Cascader `loadData` cannot combine with `showSearch`; TreeSelect does not invoke `loadData` while filtering, so remote search needs application-owned logic. Display enough ancestor context to disambiguate duplicate labels. Do not turn path text into an actionable breadcrumb accidentally. Test keyboard expansion/navigation and announce the selected path/node, not only a chevron. The board shows closed committed values, not functioning expanded trees.

## 12. Slider and numeric alternative

Source: [Slider](https://ant.design/components/slider). Board prefix: `range`.

Examples: single value40 on0–100; interval20–60. Use a Slider for an appropriate bounded approximate quantity, not an account number or precise amount. Provide visible current value, units and exact numeric entry (for example a synchronized InputNumber); do not require pointer dragging. The single numeric field and slider represent **one** answer, not two independent stored values.

Specify min/max/step, keyboard increments, thumb names/values and range endpoint ordering. `onChange` reports intermediate value; `onChangeComplete` fires on pointer/keyboard completion, not a successful server save. Distinguish value selection from focus. For range inputs name each thumb and provide labelled start/end numeric alternatives in a running implementation. Static rails and thumbs implement no drag, key or submission behavior.

## 13. Color value

Source: [ColorPicker](https://ant.design/components/color-picker). Board prefix: `color`.

Example `#0958D9`, shown as **both swatch and text**. Use `ColorPicker showText`, `format="hex"`, explicit single/gradient mode and an alpha policy. The specimen is an opaque single color (`disabledAlpha` intent), not a full color editor. A color string must be parsed/validated, not inserted as arbitrary CSS.

Define canonical storage (six-digit hex here), empty/reset/default behavior, presets and whether user-created colors are allowed. In controlled mode the official API recommends Color objects to avoid repeated format-conversion precision loss; serialize deliberately at the boundary. Color selection alone does not verify contrast or permit replacing semantic error/success colors. Calculate foreground/background contrast after edits, provide named values and test nonvisual/keyboard entry. `onChangeComplete` is not proof of persistence.

## 14. Read-only and unavailable

Sources: [Input](https://ant.design/components/input), [Form](https://ant.design/components/form). Board prefix: `states`.

Read-only Reference ID `001042` remains readable/copyable and is not an unanswered disabled field. Use `readOnly` when field presentation is needed; use Descriptions for ordinary read-only entity facts. A disabled project-dependent field needs visible explanation: “Select a project first.” Disabled fields generally cannot be focused; keep their reason reachable outside the control. Do not assume disabled values are submitted or omitted identically by every Form serialization strategy.

Required, optional, invalid, disabled, loading and read-only are separate concepts. Show loading as a temporary request state, not a read-only permission. Enforce permissions server-side: disabled appearance does not protect restricted data. Retain unsaved values after ordinary validation/network errors, but never retain secrets across contexts without an explicit security decision. The static board does not implement form submission, access control or announcements.

## Drawing and verification contract

The input board has 14 panels in seven rows, distinct from the 16-panel general-component board. Each panel is 720×440 on the existing two-column grid. All cells are editable, flat, uniquely namespaced under `parent="1"`; no scripts, executable links, external images or SC product frames. Controls retain 48-high local density, with 96-high TextArea and schematic smaller icons/thumbs. Use the same theme/version, visible labels and enough space for instructions/recovery. Only one keyboard-focus depiction per snapshot; selection is not focus.

All fixture constraints and values are illustrative, not organizational policy or real credentials. Automated XML/geometry/content tests and render inspection do not validate browser input behavior, date parsing, authentication, money arithmetic, upload security, accessibility or server rules. Test these on an owned implementation; no runtime dependency or backend is supplied by this catalogue.
