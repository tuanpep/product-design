# Product design document standard

Version 1.0. This is the plugin's output contract, not an ISO certification or proof of product validity. Use it with [the proposal format](proposal-format.md) and [the evidence contract](evidence-and-decisions.md).

## Purpose and depth

Write one decision-support document at `docs/product-design/<slug>/product-design.md`. Choose the smallest profile that supports the next decision:

- **discovery:** the next gate is stop or repeat discovery. Explain the problem, evidence, baseline, and next decision. Do not invent a product experience or release.
- **evaluation:** the next gate is test solutions or specify a slice. Describe provisional options and just enough experience to plan learning. A disposable prototype is not a production release.
- **build-slice:** the next gate is ready for a named build slice. Include the proposed production slice, traceability, acceptance outcomes, checks, dependencies, and transition. This is a recommendation for human investment, not approval to build or launch.

Profiles describe document depth, not evidence strength. A build-slice can contain untested assumptions, but unresolved safety, policy, feasibility, or ownership issues that block that slice must prevent a ready verdict. Use evaluation instead. Do not manufacture research to reach a profile. Older proposals can adopt this standard during their next revision without discarding their evidence or decision history.

## Decision header

After the title, write these plain Markdown fields before the first section:

```text
Standard: product-design/1.0
Profile: discovery | evaluation | build-slice
Updated: YYYY-MM-DD
Next gate: stop | repeat discovery | test solutions | specify a slice | ready for a named build slice
Decision owner: named person/role, or unknown
Approval: proposed, or an attributed human decision with date and source
```

Choose one value, not the list of alternatives. Follow with the named slice when ready, the decisive blockers (or explicitly none known), and the smallest next action. Keep the gate consistent with the review verdict. Never infer approval from a user's request for a design.

## Evidence and traceability

- Label consequential claims given, observed, inferred, proposed, or unknown where they occur. Consequential means changing the recommendation, scope, a rule, a check, or readiness.
- For given claims, attribute the brief or human. For observed claims, provide a source locator, date when known, observation, method, and limitations. For inferences, name the evidence and reasoning. Public guidance supports the method, not demand for this product.
- Record each reversing unknown with its decision impact, investigation method, and owner (unknown is acceptable). Thresholds without measured or approved grounding remain proposed.
- Preserve stable identifiers for items referenced across sections or revisions: for example E1 (evidence), N1 (need), R1 (requirement/rule), S1 (story), A1 (acceptance outcome), and C1 (check). Small proposals may use explicit prose links instead of tables.
- Every scoped requirement must derive from a need or attributed constraint. Every build story must serve a need. Every important acceptance outcome must trace to its requirement/rule and a check. Explain justified constraints rather than forcing them into a fictional user need.
- Checks specify the method, observable expected result, and responsible role. Separate planned checks from completed results. Use unknown rather than invented numeric performance targets or estimates.

## Experience, evaluation, and handoff

For evaluation and build-slice profiles, include the current/no-build option, credible alternatives, comparison criteria, and the reversing assumption. Document entry, success/exit, material denied or failure paths, recovery, roles, and offline/support handoffs at the needed depth.

Give the evaluation plan a research question, intended participants or relevant technical/policy reviewers, task or procedure, observations, support/weaken/reverse criteria, owner, and limitations. State explicitly whether it is planned, performed, or inspection-only. Do not apply a universal participant count.

For a build-slice, state in/out scope, stories, acceptance outcomes, verification, known dependencies, decision owners, rollout/transition and recovery implications, and outcome measurement. Where applicable, cover accessibility, privacy, security, reliability, and support. Explain exclusions. State an accessibility target and relevant checks, not an unsupported claim that a sketch is WCAG conformant.

Link each Draw.io artifact with its question, assumptions, and limitations. Keep critical branches and rules in text as well. XML must be well formed, cell IDs unique, and edge references resolved; inspect the opened diagram for clipping and overlap before claiming visual verification. If it was not opened, say so.

## Review and revisions

Report design coherence, evidence confidence, and delivery readiness separately, with reasons. Inspect the traceability chain for orphan requirements and unchecked outcomes. Record actual checks, remaining blockers, the next gate, and the human decision. Resolve contradictions in their owning sections.

On revision, preserve stable IDs and human edits, mark superseded claims, update dependent journeys/stories/checks/diagrams, and append the date, changed premise, old/new recommendation, and approval status to decision history. Withdraw invalidated readiness before revising. Do not silently rewrite an approved decision.

## Research basis

Primary sources inspected on 2026-10-14. These support the practices below, not a claim that this exact template is externally mandated:

| Source | Practice adopted | Boundary |
| --- | --- | --- |
| [GOV.UK discovery](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) | Reframe features as problems; understand users, constraints, baseline and non-software alternatives; stopping is valid. | Government service guidance, adapted here; no prescribed project duration. |
| [GOV.UK alpha](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) | Test risky assumptions with disposable prototypes, including integration and policy feasibility. | A test plan is not evidence to progress to production. |
| [GOV.UK user stories](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories) | Actor, need and goal; acceptance criteria as outcomes; evidence links; iteration-sized stories. | Stories do not replace stable needs or requirements. |
| [GOV.UK research planning](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) | Prioritize questions, choose methods and user groups, plan recruitment and inclusive research. | Participant numbers depend on the method; no invented sessions. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Testable web accessibility criteria and explicit conformance scope; automated and human evaluation. | A design document cannot establish implemented conformance or cover all user needs. |

The existing [workflow](workflow.md) also references ISO lifecycle and requirement guidance. This standard does not assert that paywalled ISO clauses were independently verified for this change. The header, profiles, identifiers, and three-verdict format are plugin conventions.
