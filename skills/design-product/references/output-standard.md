# Product design document standard

Version 1.1. This is the plugin's output contract, not an ISO certification or proof of product validity. Use it with [the proposal format](proposal-format.md) and [the evidence contract](evidence-and-decisions.md). Version 1.1 adds the design package. A 1.0 proposal remains valid on its own.

## Purpose and depth

Write one decision-support document at `docs/product-design/<slug>/product-design.md`, plus the package files its profile needs. Choose the smallest profile that supports the next decision:

- **discovery:** the next gate is stop or repeat discovery. Explain the problem, evidence, baseline, and next decision. Do not invent a product experience or release.
- **evaluation:** the next gate is test solutions or specify a slice. Describe provisional options and enough experience that people can see and try the proposed shape. A disposable prototype is not a production release.
- **build-slice:** the next gate is ready for a named build slice. Include the proposed production slice, traceability, acceptance outcomes, checks, dependencies, and transition. This is a recommendation for human investment, not approval to build or launch.

## Design package

The proposal decides. The package shows the shape and hands it to builders. All files sit in the same folder and share IDs.

| File | Written by | Discovery | Evaluation | Build-slice |
| --- | --- | --- | --- | --- |
| `product-design.md` | `design-product` | required | required | required |
| `journey.drawio` | `design-experience`, `drawio` | none | when a few sentences cannot make the journey's decisions, exceptions, or handoffs clear | same |
| `process.drawio` | `model-process`, `drawio` | as-is only, when useful | when more than one actor acts | same |
| `sketch.drawio` | `sketch-drawio` | none | required when the option has an interface | same |
| `navigation.drawio` | `design-screens`, `drawio` | none | when a list cannot make the navigation clear | same |
| `screens.md` | `design-screens`, `write-content` | none | required when the option has an interface | required when the slice has an interface |
| `prototype.drawio` | `prototype-drawio` | none | required when `screens.md` exists | required when `screens.md` exists |
| `context.drawio` | `context-drawio` | none | when the option depends on other systems | same |
| `build-spec.md` | `specify-build` | none | `Status: draft` when the next gate is specify a slice | `Status: ready`, required |
| `erd.drawio` | `erd-drawio` | none | optional, with a draft `build-spec.md` | when the domain model has more than two related entities, or builders need a proposed schema |
| `states.drawio` | `state-drawio` | none | optional, with a draft `build-spec.md` | when a record has more than two states, a reversal, or a time limit |
| `sequence.drawio` | `sequence-drawio` | none | optional, with a draft `build-spec.md` | when an integration, notification, or handoff can fail or arrive late |
| `dataflow.drawio` | `dataflow-drawio` | none | optional, with a draft `build-spec.md` | when the slice handles personal or sensitive data, or sends data to another party |

Formats: [screens](screens-format.md) and [build spec](build-spec-format.md). When an option has no interface, such as a process or training change, say so in Product experience and skip the screen files. A file that is required but missing makes the package incomplete. Do not create files to fill the table.

A Draw.io file holds one close flow. One flow keeps the name in the table. A sketch or prototype file is one actor and one task, named `sketch-nurse-ask-cover.drawio` or `prototype-colleague-accept-cover.drawio` when a second actor or a second task would share the file. States of that task stay with it. Several flows use only the suffixed names. A second page is a paired view of that same flow: as-is and to-be, logical and physical, or context and containers. The rule is [one file per close flow](../../drawio/references/drawio-file.md#one-file-per-close-flow).

Define each term, rule, state, screen, and message once and reference its ID elsewhere. When the same fact appears in two files, the owning file wins and the other must link to it: rules, states, and stories belong to `build-spec.md`, screens and copy to `screens.md`, and needs, evidence, and decisions to `product-design.md`. Before `build-spec.md` exists, proposed rules and the draft permission matrix sit under Needs and requirements in `product-design.md`. When the build spec is written, they move there with the same IDs, and the proposal links to them.

Profiles describe document depth, not evidence strength. A build-slice can contain untested assumptions, but unresolved safety, policy, feasibility, or ownership issues that block that slice must prevent a ready verdict. Use evaluation instead. Do not manufacture research to reach a profile. Older proposals can adopt this standard during their next revision without discarding their evidence or decision history.

## Decision header

After the title, write these plain Markdown fields before the first section:

```text
Standard: product-design/1.1
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
- Preserve stable identifiers for items referenced across sections, files, or revisions. Small proposals may use explicit prose links instead of tables. Use these prefixes in every file:

  | Prefix | Item | Owning file |
  | --- | --- | --- |
  | E1 | Evidence | `product-design.md` |
  | N1 | Need | `product-design.md` |
  | R1 | Requirement or constraint | `product-design.md` |
  | BR1 | Business rule | `build-spec.md`, or `product-design.md` before it exists |
  | SC1 | Screen | `screens.md`, keeping the IDs of the sketch files |
  | M1 | Message or notification | `screens.md` |
  | S1 | Story | `build-spec.md` |
  | A1 | Acceptance outcome | `build-spec.md` |
  | C1 | Check | `build-spec.md`, or `product-design.md` before it exists |
  | I1 | Integration | `build-spec.md` |
  | Q1 | Assumption or open question | `build-spec.md` |
- Every scoped requirement must derive from a need or attributed constraint. Every build story must serve a need. Every important acceptance outcome must trace to its requirement or rule and a check. Explain justified constraints rather than forcing them into a fictional user need.
- Checks specify the method, observable expected result, and responsible role. Separate planned checks from completed results. Use unknown rather than invented numeric performance targets or estimates.

## Experience, evaluation, and handoff

For evaluation and build-slice profiles, include the current/no-build option, credible alternatives, comparison criteria, and the reversing assumption. Document entry, success/exit, material denied or failure paths, recovery, roles, and offline/support handoffs at the needed depth.

Give the evaluation plan a research question, intended participants or relevant technical/policy reviewers, task or procedure, observations, support/weaken/reverse criteria, owner, and limitations. State explicitly whether it is planned, performed, or inspection-only. Do not apply a universal participant count.

For a build-slice, state in/out scope, stories, acceptance outcomes, verification, known dependencies, decision owners, rollout/transition and recovery implications, and outcome measurement. Where applicable, cover accessibility, privacy, security, reliability, and support. Explain exclusions. State an accessibility target and relevant checks, not an unsupported claim that a sketch is WCAG conformant.

Link each Draw.io artifact with its question, assumptions, and limitations. Keep critical branches and rules in text as well. XML must be well formed, cell IDs unique, and edge references resolved; inspect the opened diagram for clipping and overlap before claiming visual verification. If it was not opened, say so.

Link each sketch file with its question and the layout option chosen, by whom, or that the choice is still proposed. Screens in `screens.md` keep the sketch's screen IDs. Link each prototype file with its question. Together they draw every screen and state in `screens.md` with realistic web or mobile components, and each frame's id is `<screen>-<state>`, such as `SC2-denied`. Opening one is a design inspection, not a usability result.

For a build-slice, acceptance outcomes use Given, When, Then with concrete values and name their check. Reversible open questions carry a proposed default and an owner. Questions that are irreversible, or touch safety, money, law, or privacy, stay blocking until an owner decides.

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

The existing [workflow](workflow.md) also references ISO lifecycle and requirement guidance. This standard does not assert that paywalled ISO clauses were independently verified for this change. The header, profiles, identifiers, three-verdict format, design package, screens and build spec formats, and story map are plugin conventions drawn from common business analysis practice. They are not attributed to an inspected external standard.
