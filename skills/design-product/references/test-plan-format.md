# Test plan and cases

Use [the starter](../templates/test-plan.md). This locally authored adaptation retains the main sections of [Documentero's Test Plan](https://documentero.com/templates/it-engineering/document/test-plan/) and nests [Test Cases](https://documentero.com/templates/it-engineering/document/test-case/) in one file. See [selection/ownership](documentero-templates.md).

Create `test-plan.md` only when Shape is open; discovery research remains inline in the brief. Specify extends the same plan with verification cases. Keep existing evaluation criteria and supplied results; do not turn participant research into deterministic software pass/fail tests.

```text
Standard: test-plan/1.0
Status: planned | in-progress | completed
Purpose: evaluation | verification | mixed
Updated: YYYY-MM-DD
Source: product-design.md
```

Pick one value per field. A completed plan has no planned, in-progress or blocked cases. Its case results retain evidence/provenance; completion is not success. A failed check can be completed work. SRS ready does not automatically complete the plan.

Retain these level-two headings in order:

```markdown
## Introduction
## Objectives
## Scope
## Testing strategy
## Test deliverables
## Testing schedule
## Resources
## Environment requirements
## Risks and mitigation
## Approval
## Test cases
```

Objectives and strategy hold the reversing assumption, decision/question, method, participants/reviewers or unknown, neutral procedure, observations and predeclared support/weaken/reverse criteria. Link the owning uncertainty record rather than copying it. Scope states exclusions. Schedule may use a decision trigger; do not invent dates or booked people. Resources names roles/owners or unknown. Environment includes data, materials, accessibility and consent/privacy safeguards. Risks states bias, coverage and limitations; consequential risks also name a response owner, proposed mitigation, contingency, residual uncertainty and review trigger. Likelihood needs a basis or Unknown, not a mandatory numeric score. Approval is proposed or an attributed human decision, never implied by drafting or passing checks. No UI artifacts or engineering architecture are mandatory deliverables.

## Supplied results summary

When actual results arrive from Shape onward, summarize them under Objectives without adding a level-two heading. Use a compact table or equivalent prose:

| Question/criterion | Predeclared expectation | Actual evidence and case/version link | Interpretation and limits | Decision, next action and owner |
| --- | --- | --- | --- | --- |

Link case-owned actual results instead of duplicating them. Keep observations separate from interpretation; retain contradictory or inconclusive outcomes. Missing prior criteria stay unknown, and later criteria must be labeled retrospective. Do not collapse demand, usability, feasibility and business outcomes into an overall success score. Name a review trigger or sourced date for follow-up, or Unknown. Human decision status stays proposed unless attributed. Update the owning uncertainty record and link decision implications from the brief; a completed case alone resolves neither an assumption nor a dependency.

## Case contract

Under Test cases use one `### C<number> Title` per check with these plain field labels, each nonempty:

```text
Type: evaluation | verification
Status: planned | in-progress | passed | failed | blocked | completed
Owner: role/person or unknown
Objective: decision question or outcome being checked
Preconditions: context, permissions and data
Steps: neutral procedure (numbered continuation permitted)
Expected result: criteria or observable outcome fixed before execution
Actual result: not run, or attributed result
Evidence: none — not run, or source/date/version/method and limitations
Related requirements: R/A IDs at Specify, or explicit exploratory rationale in Shape
Test data: concrete illustrative inputs labeled proposed, or sourced inputs
```

Evaluation cases use completed for conducted research, not passed as evidence that the product is desirable. Verification cases use passed/failed for actual outcomes. A supplied observation can inform an evaluation case when provenance/limitations are clear; it is not direct execution by the agent. Planned checks use `Actual result: not run`. Blocked cases explain the blocker and do not imply a pass. Completed/passed/failed cases require actual results and evidence. At Specify, every verification case references defined R IDs; acceptance checks also reference A IDs. The SRS matrix links these C IDs. Keep expected behavior in the SRS and procedure/results here, linking rather than creating competing definitions.

For supplied results follow [learning-loop ingestion](learning-loop.md), compare with prior criteria, update the brief's decision and history, and withdraw affected readiness before claiming closure. A plan is not a result; a conformance check is not user validation.
When revised behavior makes prior results inapplicable, retain historical evidence with its checked version, reset the current case to planned/not run or blocked as appropriate, and reconcile the matrix through the [revision pack](phases/revise.md). Historical passes are not current verification.
