# Service requests: collection, detail and edit

Standard: screens/1.0
Updated: 2026-10-23
Source: fictional layout reference, not a researched product

## Navigation map

UI baseline: proposed Ant Design light from [web-components.md](web-components.md), pinned `antd@6.6.7` / `theme.defaultAlgorithm` researched 2026-10-23; no supplied product screenshots. Arial system-stack fallback, radius6 fields/buttons, adapted blue primary actions/links, white default/Cancel actions and blue-tinted selected navigation. Contrast overrides darken primary Button/link/error text and strengthen normal field borders. Local48-high header/controls, 256-wide navigation and64-high rows are composition assumptions, not Ant sizing defaults. The [drawing](collection-flow.drawio) maps to Layout/Menu, Table, Typography.Link, Descriptions, Form.Item/Input, Button and Tag; static shapes, not a working React prototype or Ant Design Pro replica.

| Actor/task | Entry | Collection/find | Inspect | Act | Outcome | Return/handoff |
| --- | --- | --- | --- | --- | --- | --- |
| Coordinator updates request summary | Requests navigation | SC1 default, populated table | SC2 default, SR-1042 | SC3 default, edit summary | Save persists summary, returns SC2 with inline “Request updated” feedback | Back to requests returns SC1 with updated summary and retained query/context; Cancel returns SC2 unchanged |

No create/delete/bulk operation is needed for this bounded task. These are not implied features. Search submits on Enter; blank query shows all three records. The fixture draws the initial collection, detail and edit snapshots. Save and return outcomes are specified below, not claimed as additional rendered snapshots.

## Screen inventory

| ID | Screen | Role | Purpose | Entered from | Exits to | Serves |
| --- | --- | --- | --- | --- | --- | --- |
| SC1 | Service requests | Coordinator | Find existing work | Requests navigation, SC2 back link | SC2 | Illustrative update task |
| SC2 | Request details | Coordinator | Inspect status and summary | SC1 request link, SC3 Save/Cancel | SC1, SC3 | Illustrative update task |
| SC3 | Edit request | Coordinator | Change summary | SC2 Edit request | SC2 | Illustrative update task |

## Screens

### SC1 Service requests

- **Purpose:** find and reopen a request, not a dashboard proxy.
- **Layout:** collection; persistent header and active Requests navigation; title, search, count, aligned table. Desktop 1440×900, all three records above fold. No sticky region or pagination. On narrow screens use one list item per request retaining linked ID/summary, status, owner and updated date; stack labelled search above it.
- **Content:** request.id, summary, status, owner and updated date. SR-1042 “Repair reception light”, In progress, Mai Tran, 15 Oct 2026; SR-1041 “Replace meeting-room cable”, Open, Alex Chen, 14 Oct 2026; SR-1039 “Check access reader”, Resolved, Lan Nguyen, 13 Oct 2026. No sensitive real records.
- **Inputs:** optional Search requests text, initially blank; matches ID or summary on Enter, no filters or sorting for this small dataset.
- **Actions:** linked SR-1042 opens SC2. Other row links use the same detail layout with their own record, outside this bounded illustrated task.
- **Views:** default.
- **Technical behavior:** loading retains navigation/search/table headings and announces busy status. No matches retains the submitted query and offers Clear search; a genuinely empty collection says “No service requests yet” without an unauthorized create action. Failed fetch offers Retry. Preserve query and scroll when returning; focus the originating row link. Save updates the summary in the list; if it no longer matches the retained search, explain that it was saved but is not in these results and offer Clear search.
- **Rules:** only authorized coordinators can inspect these records; enforce access server-side in an implementation.

### SC2 Request details

- **Purpose:** inspect SR-1042 before changing it.
- **Layout:** detail; same shell; Back to requests, record heading, status and Edit request; grouped read-only summary/owner/updated facts. Narrow layout stacks actions and facts without reducing type.
- **Content:** same SR-1042 record as SC1. Labels and values are separate UI elements, not disabled fields.
- **Inputs:** none.
- **Actions:** Back to requests returns SC1 preserving search, scroll and originating-link focus; Edit request opens SC3. After Save from SC3, show the saved summary and real inline “Request updated” feedback, then allow return to the refreshed list. Cancel from SC3 returns unchanged and focuses Edit request.
- **Views:** default.
- **Technical behavior:** denied access shows no restricted record data and offers an allowed destination; load failure provides Retry and Back to requests.
- **Rules:** summary changes do not silently change ownership or status.

### SC3 Edit request

- **Purpose:** edit only the request summary.
- **Layout:** form; same shell, a 640-wide form column, visible label and 48-high input, then Save changes and Cancel. Narrow layout uses full available width with 16–24 margins and non-overlapping actions.
- **Content:** SR-1042 identity and current summary.
- **Inputs:** Summary, required text, 1–120 non-whitespace characters; starts “Repair reception light”. Example replacement: “Repair reception ceiling light”.
- **Actions:** Save changes persists the summary and returns SC2 with updated content, feedback and heading focus. Cancel discards this edit and returns SC2 unchanged; no request is sent. The drawing shows the initial value, not a fake submitted success.
- **Views:** default.
- **Technical behavior:** failed validation retains text, displays matching inline error and summary with focus/recovery. Network failure retains unsaved text and offers retry; prevent duplicate saves while pending. Check for concurrent changes before overwriting and provide review/reload recovery.
- **Rules:** retain request identity, status and owner; do not expose unauthorized edits.

## Content and copy

Inside frames: real product headings, labels, links, record data and actions only. Outside frames: SC IDs/view captions, viewport/theme assumptions, design explanations, workflow behavior and accessibility notes. Real product error/help/success copy belongs inside when actually shown; never insert a designer's explanation as a fake notification.

No matches: “No requests match your search.” Recovery: Clear search. Empty collection: “No service requests yet.” Required summary: “Enter a summary.” Over limit: “Use 120 characters or fewer.” Save feedback: “Request updated.” The fixture does not render every technical state or outcome.

## Accessibility

Target intent WCAG 2.2 AA, unverified. Use semantic table headers, contextual linked request IDs, labelled search and Summary input, required indication, named navigation and native actions. On narrow screens retain the same reading order and explicit status. Preserve visible focus and return focus as specified. Contrast, keyboard behavior, zoom/reflow and screen-reader announcements require implementation testing. The XML checks do not establish rendered fidelity or accessibility conformance.
