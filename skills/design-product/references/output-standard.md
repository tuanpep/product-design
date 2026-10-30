# Product design document standard

Version 1.3: evidence-led brief plus essential [Documentero-based templates](documentero-templates.md). No screens, mockups, diagrams or technical design files. Templates are local Markdown adaptations, not a document-generation service dependency.

## Phase, depth and artifacts

Write inside `docs/product-design/<slug>/`:

| Phase | Level | Files |
| --- | --- | --- |
| Understand | understand, design-documents or full | `product-design.md` only |
| Shape | design-documents or full | `product-design.md` + `test-plan.md` (evaluation) |
| Specify | full only | `product-design.md` + `build-spec.md` (SRS) + `test-plan.md` (cases) |

Levels: `understand` discovery only; `design-documents` permits Shape; `full` permits Specify only after advance. Default unnamed Shape after advance is design-documents. Legacy `mockup` is treated as design-documents. Full/advise alone never advances. Do not create an SRS during Shape to satisfy a future gate.

Profiles: discovery recommends stop/repeat discovery; evaluation recommends test solutions (Shape) or specify a slice (draft Specify); build-slice recommends ready for a named build slice (Specify). Missing facts remain unknown, not reasons to fabricate data or force approval.

## Decision header

```text
Standard: product-design/1.3
Phase: understand | shape | specify
Profile: discovery | evaluation | build-slice
Level: understand | design-documents | full
Updated: YYYY-MM-DD
Next gate: stop | repeat discovery | test solutions | specify a slice | ready for a named build slice
Decision owner: named person/role, or unknown
Approval: proposed, or an attributed human decision with date and source
```

Choose one value per field. Phase and Level are required in 1.3; older 1.0–1.2 packages remain valid under their existing formats. Do not silently migrate them; use [the migration policy](documentero-templates.md#existing-packages-and-office-documents) when revision is authorized.

Keep [the ten proposal headings](proposal-format.md). The brief owns evidence/needs/alternatives, service copy M catalogue and decision history. In Shape, Evaluation plan summarizes the reversing assumption and links the test plan; procedures/results are owned there. Specify moves provisional requirement/rule/vocabulary/permission definitions into the [SRS](build-spec-format.md) with stable IDs, replacing old definitions with links. Its appendices contain the requirements matrix. The [test plan](test-plan-format.md) contains C cases and actual results.

## Evidence, traceability and readiness

Label consequential claims given, observed, inferred, proposed or unknown. Preserve E, N, R, BR, S, A, M, Q and C IDs. Need → requirement/rule → story → acceptance outcome → check remains traceable in both directions, including applicable quality requirements. One owner per definition; a matrix row is a reference, not a duplicate requirement.

`Status: ready` requires no blocking question for the named slice, a matching build-slice recommendation and coherent SRS/plan/copy. Plans may remain unexecuted when execution is not a prerequisite; do not claim they passed. Readiness, evidence confidence, context sufficiency and human approval are separate. Generated documents and structural validation are not permission to build or launch.
