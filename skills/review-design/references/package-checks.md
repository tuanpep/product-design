# Package integrity checks

Load only for supplied artifacts. New product-design/1.3 packages need `product-design.md` with Phase; Shape adds `test-plan.md`; Full Specify adds SRS `build-spec.md` with embedded Requirements matrix. Check older formats without forcing migration.

## Core

- Stable IDs with one owner; no duplicate definitions.
- Evidence labels present on consequential claims.
- Consequential uncertainty has one owner, evidence, blocking rationale, validation/resolution condition and review trigger. Assumptions and dependencies have distinct assessments; unresolved blockers prevent ready, while missing nonblocking details stay explicit.
- Next gate matches profile and level.
- Service copy M catalogue lives under Product experience unless moved into build-spec ownership.

## Build-spec when supplied

- Stories link to needs/rules; acceptance outcomes are testable.
- Blockers prevent ready status.
- Traceability is semantic, not ID-only.
- SRS uses the seven Documentero-based sections; C cases in the Test Plan own procedure/results and link back to requirements/outcomes. All in-scope requirements and acceptance outcomes have matrix/check coverage. Matrix status agrees with case status; planned is not completed. Real results retain provenance and limitations.
- Changed behavior has an explicit prior-result applicability decision. Historical results retain checked versions and do not masquerade as current passes. Decision history names affected IDs, readiness impact and human decision status separately from document completion.

## Triggered assessments

Use [accessibility](../../design-product/references/accessibility-planning.md), [privacy](../../design-product/references/privacy-risk.md) and [quality scenarios](../../design-product/references/quality-scenarios.md) only when those concerns appear. No mandatory separate reports.

## Content when supplied or affected

Pending/completed/unknown truth; safe recovery; one catalogue. Clarity, business accuracy and consistency are separate findings.
