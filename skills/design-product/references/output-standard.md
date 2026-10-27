# Product design document standard

Version 1.2 essentials. Use with [proposal format](proposal-format.md) and [evidence contract](evidence-and-decisions.md). Apply [content contract](content-quality.md) to decision prose and service copy. No screens, mockups, diagrams or technical design files.

## Purpose and depth

Write `docs/product-design/<slug>/product-design.md`, plus `build-spec.md` only when Level is full and Specify is open.

Profiles:

- **discovery** — stop or repeat discovery
- **evaluation** — test solutions or specify a slice (documents only)
- **build-slice** — ready for a named build slice recommendation (not build approval)

Levels (recommended on new packages):

- **understand** — discovery only; no build-spec
- **design-documents** — evaluation documents; no build-spec. Default after advance into Shape
- **full** — permits `build-spec.md` when Specify is open

Legacy `mockup` level is treated as design-documents. Do not create screens or Draw.io.

| File | Discovery | Evaluation | Build-slice |
| --- | --- | --- | --- |
| `product-design.md` | required | required | required |
| `build-spec.md` | none | none | required when Specify open at full |

Product experience in the proposal owns journey prose and the M catalogue. Before build-spec exists, provisional rules/vocabulary/permissions sit under Needs; then move to build-spec with stable IDs.

## Decision header

```text
Standard: product-design/1.2
Profile: discovery | evaluation | build-slice
Level: understand | design-documents | full
Updated: YYYY-MM-DD
Next gate: stop | repeat discovery | test solutions | specify a slice | ready for a named build slice
Decision owner: named person/role, or unknown
Approval: proposed, or an attributed human decision with date and source
```

Level is optional for legacy packages; other fields remain required. Never infer approval from a design request.

## Evidence and IDs

Label consequential claims given, observed, inferred, proposed, or unknown. Preserve stable IDs (E, N, BR, S, M, Q). Unknowns stay unknown. A plan is not a result.

## Readiness

`Status: ready` on a build-spec only when no blocker remains for that named slice. Context sufficiency, evidence confidence, specification completeness and human approval remain separate. Coherent documents are not permission to build or launch.
