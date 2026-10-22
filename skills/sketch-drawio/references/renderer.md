# Compact renderer contract

The bundled renderer produces a single-page, native editable `.drawio` file. It uses ordinary shapes, one built-in mockup input shape and attached orthogonal connectors. No external images, fonts, shape downloads or model calls. Saved JSON is the source of truth while using the renderer; it is not a product specification.

```json
{
  "id": "invoice-review",
  "title": "Invoice review — proposed task flow",
  "device": "desktop",
  "columns": 2,
  "screens": [
    {
      "id": "detail",
      "title": "Review invoice",
      "role": "Approver",
      "items": [
        {"id": "summary", "type": "card", "title": "INV-1042 · Cedar Studio", "text": "$840 · Due 30 November · Awaiting approval"},
        {"id": "reason", "type": "field", "label": "Rejection reason (required when rejecting)", "value": "Duplicate invoice"},
        {"id": "actions", "type": "actions", "buttons": [{"id": "reject", "label": "Reject invoice", "primary": true}]}
      ]
    },
    {
      "id": "rejected",
      "title": "Invoice rejected",
      "role": "Approver",
      "items": [
        {"id": "outcome", "type": "heading", "text": "Rejected"},
        {"id": "receipt", "type": "text", "text": "INV-1042 was rejected. Reason: Duplicate invoice. The requester can review and resubmit."}
      ]
    }
  ],
  "links": [{"id": "reject", "from": "detail/actions/reject", "to": "rejected", "label": "Reject with reason"}]
}
```

This is illustrative fictional behavior, not a default business rule. Adapt it to the brief.

## Fields

- Root: required `id`, `title`, `screens`; optional `device` (`desktop` default, or `mobile`), `columns` (1–4, default up to 3), `links` (default empty).
- Screen: required `id`, `title`, `items`; optional `role`, `width` (320–1440; default desktop 640/mobile 360), and paired `x`, `y` (top-left canvas position; x ≥ 0, y ≥ 100, both ≤ 20000). Height grows to fit content; these are schematic frames, not pixel-accurate responsive implementations.
- IDs: unique in their scope, lowercase kebab-case starting with a letter, at most 48 characters. Preserve them across edits. Titles and labels are literal text, not HTML/XML.
- Items: required `id`, `type`, and the following type-specific fields:

| Type | Fields | Use |
| --- | --- | --- |
| `heading` | `text` | Section or outcome heading |
| `text` | `text` | Instructions, status, explanation |
| `card` | `title`, `text` | Summary or representative list record |
| `field` | `label`, optional `value` | Labeled input; value is sample content, not a working control |
| `actions` | `buttons`: 1–3 objects with `id`, `label`, optional boolean `primary` | One row of action buttons |
| `table` | `columns`: text array; `rows`: equally sized arrays of text | Representative data table; 1–6 columns and 0–6 rows |

- Link: required `id`, `from`, `to`, `label`; optional `kind`: `navigation` (default solid) or `handoff` (dashed, meaning stated in the diagram legend). Endpoints are `screen`, `screen/item`, or `screen/actions-item/button`. Link to the actual action where useful, not an unattached coordinate. Rejection/approval branches use separate labeled links; add a decision screen only if users really see it.
- Bounds: 1–8 screens, 1–24 items per screen, up to 32 links. Oversize input fails rather than truncates. Reduce representative repetition, or explicitly split requested work into separate sketches without omitting important task steps.
- Unknown properties, invalid endpoints and overlapping frames fail before writing. There are additional text-length bounds to prevent accidental large artifacts. Font-based height estimates are conservative heuristics, not guarantees against text overflow.

## Files and checking

Output must be `sketch-<name>.drawio`; parent directory must already exist. The script has no force-overwrite option. Existing output must be an intact renderer-produced file with the same sketch ID. A content hash detects manual changes, not provenance or trust. Never run concurrent writers to the same source/output path.

Generation does not parse or import arbitrary existing Draw.io XML, synchronize manual canvas edits, run a renderer, or guarantee obstacle-free arrow routing. Inspect the file in Draw.io when available. If connectors cross screens, adjust screen positions; use a supported edge-only routing tool if available, not whole-graph auto-layout that rearranges controls inside screens. Keep exports optional and retain the `.drawio` source.
