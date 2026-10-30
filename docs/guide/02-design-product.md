# Workflow and ownership

`/design-product` develops one phase and stops unless your message already opens the next. New ideas and revisions share [the execution contract](../../skills/design-product/references/execution-kernel.md).

## Three phases, four essential templates

| Phase | Work | Canonical output |
| --- | --- | --- |
| Understand | Problem, people, evidence, needs and whether to continue | Decision brief `product-design.md` |
| Shape | Current/no-build and credible alternatives, experience/service copy, riskiest assumption and test | Brief + Documentero-based `test-plan.md` |
| Specify, Full only | One useful slice, functional/quality requirements, rules/domain/permissions, stories and acceptance outcomes | SRS `build-spec.md`, embedded Requirements Matrix, Test Cases in the same plan |

Why only these? The SRS separates behavior from qualities/interfaces; the plan exposes the next learning or verification decision; cases make checks reproducible; the matrix exposes missing coverage. System Design/API/database templates would add technical architecture outside scope. Operational templates such as Incident Report, SLA or Asset Inventory do not help every product decision. Change Request is not mandatory because Decision history already records design changes.

See [source pages, adaptations and starter files](../../skills/design-product/references/documentero-templates.md). These are Markdown adaptations, not copies of the downloadable Office files or a Documentero API integration.

## Advance and levels

Say `next`, `continue`, approve a phase summary, or name the next phase to open it without another confirmation interview. Default Shape Level is design-documents. Levels are understand, design-documents and full; they cap deliverables, not evidence confidence. Legacy mockup means design-documents. Full/advise alone never advances.

Understand can finish with unknowns and research gaps. A bare `no questions` without continuation stays there. An advance carries missing facts forward as unknown and excludes unsafe behavior rather than inventing constraints. At Shape use Next gate: test solutions; name Specify as a next action without writing its files. At Full Specify a draft uses specify a slice, and a ready slice uses ready for a named build slice.

Advise recommends labeled proposed defaults in the open phase. A reversible default can avoid another preference question; unresolved safety, permission, policy or feasibility decisions remain blockers with owner or unknown.

## One owner per fact

- **Brief:** needs, evidence/provenance, alternatives, service-message M catalogue and decision history. Evaluation plan summarizes and links the plan.
- **SRS:** R requirements, BR rules, roles, terms/domain/lifecycles, S stories/A outcomes and the matrix. Move provisional definitions here during Specify without changing IDs; replace earlier definitions with links.
- **Plan:** C procedures, preconditions, test data, expected criteria and actual results/evidence. Evaluation and verification stay distinct. Do not duplicate acceptance rules in a second catalogue.

Keep Specify bounded: actor, trigger, useful outcome, scope and consequential denied/recovery paths. Resolve rules and examples before formal Given/When/Then. Unknown expected behavior is a question, not an invented Then. Requirements and outcomes need meaningful source/check coverage in both directions; a filled table does not prove adequate testing.

## Revision and results

```text
/design-product Revise docs/product-design/shift-swaps: the ward manager approved BR2, a 48-hour weekly limit. Source: meeting notes dated 2026-10-30.
```

Revise the owning definition first, then affected acceptance examples, C cases, matrix status and service copy. Withdraw stale readiness before claiming closure. Preserve unrelated human edits, IDs, prior criteria, original findings and decision history. A result for old behavior cannot verify a changed requirement.

For supplied results retain source/date/version/method and limitations, distinguish observation from interpretation, compare with predeclared criteria and update the investment recommendation. A passed rule check is not evidence of demand; an agent review is not human/domain approval.

Older packages are not rewritten on read or review. Request a migration explicitly to adopt the SRS/plan format; [migration guidance](../../skills/design-product/references/documentero-templates.md#existing-packages-and-office-documents) preserves IDs and single ownership. Cosmetic revisions do not trigger migrations or interviews.

## Review and delivery

`/review-design` is read-only and reports Design coherence, Evidence confidence and Delivery readiness independently. Authorized repairs preserve findings and recheck dependents. Ready documents are a proposal for a human investment decision, not permission to build or launch. Production implementation and research/test execution remain external.

Next: [Check output quality](04-output-standard.md).
