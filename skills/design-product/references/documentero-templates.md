# Essential document templates

Use this selection, not the entire template gallery. Public source pages were read on 2026-10-30. These are locally authored Markdown adaptations of the published structures, not bundled Documentero Office files or an API integration. No account, network request, or external upload is needed to run the plugin.

| Template | Why keep it | Canonical home |
| --- | --- | --- |
| [Software Requirements Specification](https://documentero.com/templates/it-engineering/document/software-requirements-specification/) | Separates functionality, qualities, interfaces and assumptions for one useful slice | `build-spec.md`, Full Specify only |
| [Test Plan](https://documentero.com/templates/it-engineering/document/test-plan/) | Makes the next learning or verification decision explicit before claiming results | `test-plan.md`, Shape onward |
| [Test Case](https://documentero.com/templates/it-engineering/document/test-case/) | Gives each check preconditions, procedure, expected and actual results, and requirement links | Test cases in `test-plan.md` |
| [Project Requirements Matrix](https://documentero.com/templates/it-engineering/spreadsheet/project-requirements-matrix/) | Exposes missing source and acceptance/check coverage | Appendices → Requirements matrix in `build-spec.md` |

Do not add four independent documents. The plan contains the cases; the SRS contains the matrix. Keep `product-design.md` as the evidence-led decision brief because none of these engineering templates adequately captures discovery, alternatives or decision history. Three files at most are required by this workflow.

## Phase and ownership

1. **Understand:** decision brief only. Needs, supplied constraints and research gaps; no invented solution specification or test cases to fill a form.
2. **Shape:** revise the brief and create an evaluation test plan. Link the plan from Evaluation plan; keep only the reversing assumption and decision implications in that summary. Choose methods before materials. A research case may be a neutral interview or operational review, not a software pass/fail test.
3. **Specify (Full):** create the SRS and extend the same plan with acceptance and quality checks. Keep evaluation criteria/results intact. The SRS owns requirements, rules, stories, acceptance outcomes, domain meanings and the matrix. The plan owns procedures and actual check results. The brief owns evidence, alternatives, service copy and the investment recommendation.

Use [the brief starter](../templates/decision-brief.md), [the SRS starter](../templates/software-requirements-specification.md) and [the plan starter](../templates/test-plan.md), with [the format contracts](output-standard.md). Fill supported facts; remove starter tokens; explicitly defer inapplicable subsections. Do not make a question blocking just because a template has a field. Dates, schedules, people, metrics and approvals stay unknown unless sourced. No mandatory project manager, contact details or signatures.

## Adaptations that matter

- SRS retains Documentero's seven main sections. Add evidence/source, owner and approval to requirements, measurable checks to qualities, and permission/rule/domain details as subsections rather than technical architecture.
- Test Plan retains its ten main sections and adds Test cases. Separate evaluation from verification in each case. A generated plan is not execution, a passed rule check is not evidence of demand, and an agent review is not human approval.
- Test cases retain general information, objective, preconditions, steps, expected result, actual result, related requirements and test data. Use stable C IDs. At Specify, each acceptance outcome A ID links to at least one C ID. One case may cover several outcomes when all remain explicit.
- The requirements matrix extends the website's requirement/priority/source/owner/deliverable/status columns with need, rule, story and acceptance outcome. `planned` is not `completed`. It is coverage, not a second requirements catalogue or proof of adequate testing.

## Not essential

System Design, Software Architecture, API Documentation and database/network/cloud templates introduce technical design outside this plugin. Incident reports, asset inventories, SLAs, release notes and deployment documents belong to later operational work. Change Request is optional external paperwork; Decision history already owns design-change rationale here. Do not add these to every run.

## Selected project-management patterns

The [Project & Business Management gallery](https://documentero.com/templates/project-management/) supplies useful fields, not additional required documents. The rendered bodies of these pages were read on 2026-10-30; downloadable Office files were not inspected.

| Source template | Published fields borrowed | Local adaptation and home |
| --- | --- | --- |
| [Project Assumptions Log](https://documentero.com/templates/project-management/document/project-assumptions-log/) | Assumption, impact, validation method, status, review history | Track consequential assumptions through evidence and review triggers using the [learning loop](learning-loop.md#track-consequential-uncertainty). Keep discovery assumptions in the brief and slice-specific ones in the SRS. |
| [Dependency Tracker](https://documentero.com/templates/project-management/document/dependency-tracker/) | Dependent task, blocker, team, impact, resolution date and steps, next review | Identify the blocked decision/slice, resolution owner and evidence needed to unblock it in the existing uncertainty record. Use triggers when dates are unknown. |
| [Change Request Form](https://documentero.com/templates/project-management/document/change-request-form/) | Reason, impact, solution, alternatives, related documents, final decision | Record affected IDs, prior-result applicability and readiness impact in Decision history via the [revision pack](phases/revise.md). Editing completion is separate from human approval. |
| [Project Constraints Log](https://documentero.com/templates/project-management/document/project-constraints-log/) | Type, impact, owner, mitigation, sources, approved exceptions | Separate binding constraints from preferences and assumptions in Needs and requirements, then SRS Constraints and business rules. Attribute exception authority. |
| [Risk Management Plan](https://documentero.com/templates/project-management/document/risk-management-plan/) | Likelihood, impact, mitigation, owner, contingency, review | Give consequential risks a response, contingency and review trigger alongside their existing owner. Unknown likelihood stays unknown; numeric scoring is not required. |
| [Project Evaluation Form](https://documentero.com/templates/project-management/document/project-evaluation-form/) | Criterion, target, result, met/not met, follow-up action, owner, deadline | Summarize supplied results against predeclared criteria under Test Plan Objectives, with evidence links, interpretation and next owner. Allow inconclusive results. |

Assessment values, evidence/version links, affected requirement/check IDs and resolution conditions are plugin adaptations, not verbatim Documentero fields. Apply them only to decision-changing uncertainty or supplied results. Keep the existing headings, three-file limit and phase boundaries; no format-version change or forced migration. Structural validation does not establish semantic adequacy.

PRD, Business Case, Charter and Scope Statement largely duplicate existing scope/outcome/alternative prompts. Do not add them by default. RACI responsibilities are not product access permissions. WBS, Gantt, capacity, budget and recurring status/communication operations remain outside this design workflow. These examples do not establish effectiveness or standards compliance.

## Existing packages and Office documents

Read older packages without rewriting them. For an authorized migration, preserve IDs, evidence, human edits and history; move old build-spec facts into the SRS sections, checks into the plan, and traceability into its matrix. Update links and the proposal to `product-design/1.3` with an explicit Phase. In Shape, do not create an SRS. In Specify, retain `draft` while blockers remain. Never infer that an old ready status proves current consistency or completed tests. Do not leave two competing owners after migration.

For Word/Excel, download the original template from its linked page and populate it manually from the Markdown owners. Preserve evidence/approval/status extensions in the customized document and label the export with source/version/date. Automated Office generation is not implemented. Redistribution rights for the original downloadable files have not been verified; they are not included or relicensed by this plugin. Any future external generation needs explicit authorization to transmit project data.
