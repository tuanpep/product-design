# Product design document standard

Version 1.1. This is the plugin's output contract, not an ISO certification or proof of product validity. Use it with [the proposal format](proposal-format.md) and [the evidence contract](evidence-and-decisions.md). Version 1.1 adds the design package. A 1.0 proposal remains valid on its own.

## Purpose and depth

Write one decision-support document at `docs/product-design/<slug>/product-design.md`, plus the package files allowed by its output level and needed by its profile. Level, profile, and evidence confidence are independent: level caps deliverables, profile names the decision supported, and evidence confidence reports what is actually known. More artifacts do not mean stronger evidence. Choose the smallest profile that supports the next decision:

- **discovery:** the next gate is stop or repeat discovery. Explain the problem, evidence, baseline, and next decision. Do not invent a product experience or release.
- **evaluation:** the next gate is test solutions or specify a slice. Describe provisional options and enough experience that people can see and try the proposed shape. A Draw.io mockup is not a production release.
- **build-slice:** the next gate is ready for a named build slice. Include the proposed production slice, traceability, acceptance outcomes, checks, dependencies, and transition. This is a recommendation for human investment, not approval to build or launch.

The optional `Level` header is recommended for new packages. Select one cap:

- **understand:** discovery only; no `screens.md`, `mockup.drawio`, or `build-spec.md`.
- **design-documents:** discovery or evaluation; document options, experience, and an evaluation plan, deliberately deferring canonical screens and mockups. No `screens.md`, `mockup.drawio`, or `build-spec.md`, even when an option has an interface. Explain the deferral under Product experience.
- **mockup:** discovery or evaluation; interface evaluation retains the screen/mockup coverage below. No `build-spec.md`, `technical-design.md`, or contract file.
- **full:** any profile; permits the complete package, including `technical-design.md` when the slice will be implemented in software, but does not require unnecessary artifacts or imply build readiness.

Only full (or a legacy proposal without Level) can use build-slice or the next gate specify a slice. A capped evaluation uses test solutions instead. Without Level, existing profile/package requirements remain unchanged; do not infer a level from prose or retrofit one silently.

## Design package

The proposal decides. The package shows the shape and hands it to builders. All files belong to the same package and share IDs; decision documents stay at its root, and split diagrams use nested step folders. Apply the level cap first: the evaluation requirements below for canonical screens/mockups apply at mockup/full or when Level is absent; build specs are full-only when Level is explicit.

| File | Written by | Discovery | Evaluation | Build-slice |
| --- | --- | --- | --- | --- |
| `product-design.md` | `design-product` | required | required | required |
| `journey.drawio` | `design-experience`, `drawio` | none | when a few sentences cannot make the journey's decisions, exceptions, or handoffs clear | same |
| `process.drawio` | `model-process`, `drawio` | as-is only, when useful | when more than one actor acts | same |
| `navigation.drawio` | `design-screens`, `drawio` | none | when a list cannot make the navigation clear | same |
| `screens.md` | `design-screens`, `write-content` | none | required when the option has an interface | required when the slice has an interface |
| `mockup.drawio` | `mockup-drawio` | none | required when `screens.md` exists | required when `screens.md` exists |
| `context.drawio` | `context-drawio` | none | when the option depends on other systems | same |
| `build-spec.md` | `specify-build` | none | `Status: draft` when the next gate is specify a slice | `Status: ready`, required |
| `technical-design.md` | `select-views` and the included view skills | none | none | when the slice will be implemented in software |
| `openapi.yaml` | `design-contract` | none | none | when the interface view includes an HTTP boundary |
| `asyncapi.yaml` | `design-contract` | none | none | when the interface view includes an event boundary |
| `erd.drawio` | `design-data`, `erd-drawio` | none | optional, with a draft `build-spec.md` | when the information view is included |
| `states.drawio` | `state-drawio` | none | optional, with a draft `build-spec.md` | when a record has more than two states, a reversal, or a time limit |
| `sequence.drawio` | `sequence-drawio` | none | optional, with a draft `build-spec.md` | when an integration, notification, or handoff can fail or arrive late |
| `dataflow.drawio` | `dataflow-drawio` | none | optional, with a draft `build-spec.md` | when the slice handles personal or sensitive data, or sends data to another party |

Formats: [screens](screens-format.md), [build spec](build-spec-format.md), and [technical design](technical-design-format.md). When an option has no interface, such as a process or training change, say so in Product experience and skip the screen files. A software slice at Full also skips a technical view that Design views omits, and says why. A file that is required but missing makes the package incomplete. Do not create files to fill the table. Structural validation detects existing `screens.md` and checks its coverage; it does not infer an interface or a deliberate deferral from keywords. Human review checks those scope decisions.

A Draw.io file holds one close flow. One flow keeps the name in the table. A mockup file is one actor and one task. Several flows are step folders in parent/child index order, `1-nurse-ask-cover/` then `1-nurse-ask-cover/1.1-nurse-choose-colleague/` then `2-colleague-accept-cover/`, and each folder holds that step's diagrams under their short names. Children must be physically inside their parent, not sibling folders with decimal names. The index starts at `1`. States of that task stay with it. A second page is a paired view of that same flow: as-is and to-be, logical and physical, or context and containers. The rule is [one file per close flow](../../drawio/references/drawio-file.md#one-file-per-close-flow).

Define each term, rule, state, screen, and message once and reference its ID elsewhere. When the same fact appears in two files, the owning file wins and the other must link to it: rules, states, and stories belong to `build-spec.md`, screens and copy to `screens.md`, needs, evidence, and the decision to build to `product-design.md`, and design concerns, views, contracts, threats, and technical decisions to `technical-design.md`. Before `build-spec.md` exists, proposed rules and the draft permission matrix sit under Needs and requirements in `product-design.md`. When the build spec is written, they move there with the same IDs, and the proposal links to them.

Profiles describe document depth, not evidence strength. A build-slice can contain untested assumptions, but unresolved safety, policy, feasibility, or ownership issues that block that slice must prevent a ready verdict. Use evaluation instead. Do not manufacture research to reach a profile. Older proposals can adopt this standard during their next revision without discarding their evidence or decision history.

## Decision header

After the title, write these plain Markdown fields before the first section:

```text
Standard: product-design/1.1
Profile: discovery | evaluation | build-slice
Level: understand | design-documents | mockup | full
Updated: YYYY-MM-DD
Next gate: stop | repeat discovery | test solutions | specify a slice | ready for a named build slice
Decision owner: named person/role, or unknown
Approval: proposed, or an attributed human decision with date and source
```

Choose one value, not the list of alternatives. Level is optional; all other fields above remain required. Follow with the named slice when ready, the decisive blockers (or explicitly none known), and the smallest next action. Keep the gate consistent with the review verdict. Never infer approval from a user's request for a design.

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
  | SC1 | Screen | `screens.md` |
  | M1 | Message or notification | `screens.md` |
  | S1 | Story | `build-spec.md` |
  | A1 | Acceptance outcome | `build-spec.md` |
  | C1 | Check | `build-spec.md`, or `product-design.md` before it exists |
  | I1 | Integration | `build-spec.md` |
  | Q1 | Assumption or open question | `build-spec.md` |
  | DC1 | Design concern | `technical-design.md` |
  | OP1 | Service operation | `technical-design.md` |
  | TH1 | Threat | `technical-design.md` |
  | AD1 | Technical decision | `technical-design.md` |
- Every scoped requirement must derive from a need or attributed constraint. Every build story must serve a need. Every important acceptance outcome must trace to its requirement or rule and a check. Explain justified constraints rather than forcing them into a fictional user need.
- Checks specify the method, observable expected result, and responsible role. Separate planned checks from completed results. Use unknown rather than invented numeric performance targets or estimates.

## Experience, evaluation, and handoff

For evaluation and build-slice profiles, include the current/no-build option, credible alternatives, comparison criteria, and the reversing assumption. Document entry, success/exit, material denied or failure paths, recovery, roles, and offline/support handoffs at the needed depth.

Give the evaluation plan a research question, intended participants or relevant technical/policy reviewers, task or procedure, observations, support/weaken/reverse criteria, owner, and limitations. State explicitly whether it is planned, performed, or inspection-only. Do not apply a universal participant count.

Write the evaluation plan before choosing or producing learning artifacts. Early learning materials can be a small inline example in the proposal or linked external materials, limited to the risky question; they need not become canonical `screens.md` or `mockup.drawio`. Respect the level cap. When supplied results exist, use the existing Evaluation plan section to link the source, separate observations from interpretation, compare results with support/weaken/reverse criteria, state limitations, and explain what decision changes (or why it does not). Link changed decisions to Decision history. Missing results remain planned or unknown: never invent sessions, quotes, success rates, or evidence.

For a build-slice, state in/out scope, stories, acceptance outcomes, verification, known dependencies, decision owners, rollout/transition and recovery implications, and outcome measurement. Where applicable, cover accessibility, privacy, security, reliability, and support. Explain exclusions. State an accessibility target and relevant checks, not an unsupported claim that a prototype is WCAG conformant.

Under the build spec's existing Rollout and verification heading, hand off post-release learning: responsible owner, baseline (or unknown), outcome data source, guardrails, review cadence or trigger, and decision actions such as continue, change, rollback, or stop. This is a handoff within the named slice, not a new production stage, a requirement to operate production, or another mandatory document.

Link each Draw.io artifact with its question, assumptions, and limitations. Keep critical branches and rules in text as well. XML must be well formed, cell IDs unique, and edge references resolved; inspect the opened diagram for clipping and for edges that share a segment or cross ([Edges do not overlap](../../drawio/references/drawio-file.md#relationship-lines)) before claiming visual verification. Write the XML into the `.drawio` file. Do not create a Python script, an HTML page, or an image to generate or preview it. If it was not opened, say so.

Link each mockup file with its question and proposed or chosen layout. Organize the package around the business journey: initiation, decisions, parallel work where applicable, role handoffs, confirmation, tracking, completion, and consequential branches. Separate setup and post-completion support from daily work. Draw every screen and declared **Views:** snapshot in `screens.md` using [the component library](../../mockup-drawio/references/web-components.md). Frame IDs are `<screen>-<view>`, such as `SC2-awaiting-approval`, with a `-default` entry frame per screen. Arrange views in declared usage order, not fixed technical-state columns. Summarize routine technical feedback in prose; no empty/loading/partial/error/denied/success/offline matrix is required. Draw an exception only when it materially changes the business decision, risk, action, recovery, or handoff, or detailed UI states are requested. Legacy **States:** lists remain supported and require their declared frames until the owning specification is revised. Match the project's UI or use the default palette, and name that choice in frame notes. Opening a diagram is a design inspection, not a usability result.

For a build-slice, acceptance outcomes use Given, When, Then with concrete values and name their check. Reversible open questions carry a proposed default and an owner. Questions that are irreversible, or touch safety, money, law, or privacy, stay blocking until an owner decides. [Advise mode](advise-mode.md) does not remove that block from a ready verdict. It writes the recommended default and continues the draft instead of pausing for an answer.

## Review and revisions

Report design coherence, evidence confidence, and delivery readiness separately, with reasons. Inspect the traceability chain for orphan requirements and unchecked outcomes. Record actual checks, remaining blockers, the next gate, and the human decision. Resolve contradictions in their owning sections.

On revision, preserve stable IDs and human edits, mark superseded claims, update dependent journeys/stories/checks/diagrams, and append the date, changed premise, old/new recommendation, and approval status to decision history. Withdraw invalidated readiness before revising. Do not silently rewrite an approved decision.

## Research basis

Primary sources inspected on 2026-10-14. These support the practices below, not a claim that this exact template is externally mandated:

| Source | Practice adopted | Boundary |
| --- | --- | --- |
| [GOV.UK discovery](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) | Reframe features as problems; understand users, constraints, baseline and non-software alternatives; stopping is valid. | Government service guidance, adapted here; no prescribed project duration. |
| [GOV.UK alpha](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) | Test risky assumptions with a disposable prototype, including integration and policy feasibility. | A test plan is not evidence to progress to production. |
| [GOV.UK user stories](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories) | Actor, need and goal; acceptance criteria as outcomes; evidence links; iteration-sized stories. | Stories do not replace stable needs or requirements. |
| [GOV.UK research planning](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) | Prioritize questions, choose methods and user groups, plan recruitment and inclusive research. | Participant numbers depend on the method; no invented sessions. |
| [GOV.UK prototyping](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) | Choose disposable learning work to test risky assumptions before production investment. | Early learning materials are not the complete canonical screen/state handoff. |
| [GOV.UK analysing research](https://www.gov.uk/service-manual/user-research/analyse-a-research-session) | Separate observations, findings, and actions; use results to change decisions. | Supplied results retain their method and limitations; do not fabricate research. |
| [GOV.UK measuring success](https://www.gov.uk/service-manual/measuring-success) | Plan performance data and use it to improve a service. | The build spec hands off owners, baseline, sources, guardrails, review triggers, and actions; it does not claim a live service was measured. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Testable web accessibility criteria and explicit conformance scope; automated and human evaluation. | A design document cannot establish implemented conformance or cover all user needs. |

The existing [workflow](workflow.md) also references ISO lifecycle and requirement guidance. This standard does not assert that paywalled ISO clauses were independently verified for this change. The header, profiles, identifiers, three-verdict format, design package, screens and build spec formats, and story map are plugin conventions drawn from common business analysis practice. They are not attributed to an inspected external standard.
