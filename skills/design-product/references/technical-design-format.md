# Technical design format

`docs/product-design/<slug>/technical-design.md` is the software design description for one named slice. It tells builders which views exist, why, and how those views correspond. It follows [the output standard](output-standard.md). `/technical-design` creates it through `select-views`. The view skills fill the sections they own. That same phase fills Correspondences. `/design-product` does not create this file.

Apply [the shared content contract](content-quality.md): explain structural choices in concrete terms without simplifying away technical meaning. Map consequential asynchronous outcomes, timeouts, and failures to existing M IDs in Correspondences, referencing their owning catalogue rather than copying message text into contracts. If technical decisions change user-visible outcomes, reconcile affected copy in place; do not add or redraw screens. Name missing copy and stale mockup instances, their owners or unknown owners, and the required product-design revision. Unresolved contradictions prevent readiness for the affected use.

## Correctness and change-safety review

Apply this review proportionately to the named slice before declaring readiness. Use the existing sections and IDs, not additional mandatory documents. Reuse authoritative architecture, schemas, contracts, ADRs, and threat models after checking applicability; distinguish existing, changed, and new. A copied contract is not a second authority: record its canonical source/version and whether the package file is a proposed replacement, a synchronized snapshot, or a proposal for a change. Keep the package-root artifact contract below; do not silently relocate canonical project files or claim a proposal is deployed.

**Invariants and enforcement.** Identify consequential conditions that must remain true, referencing the owning business rule rather than redefining it. In the appropriate view, name the authoritative state owner, enforcement mechanism, atomic decision boundary, threatening race/failure, and verification case. Distinguish duplicate retries from competing requests, stale requests, and partially committed work. An idempotency key alone does not prevent two different requests violating the same invariant. Describe conditional updates, uniqueness constraints, transaction scope, or another justified mechanism where needed; do not prescribe a technology without context.

**Boundary behavior.** For consequential writes, specify success/commit meaning, lost-response ambiguity, duplicate identity and scope, changed intent with the same identity, safe retry/reconciliation, and recovery ownership where applicable. For asynchronous work, identify the application's producer/consumer perspective, acknowledgment meaning, duplicate/ordering/replay handling, retry exhaustion, and consistency between stored state and publication. Do not infer delivery guarantees from an AsyncAPI schema, or invent brokers, outboxes, or exactly-once guarantees. Keep external failure behavior owned by Integrations and data in `build-spec.md`; technical mechanisms and contracts reference it. A mechanism that changes business behavior requires an explicit revision of the owning rule/acceptance outcome, not a silent technical default.

**Compatibility and transition.** Identify affected consumers and the applicable source, wire, and semantic compatibility expectations. Changed defaults, pagination, response enums, and meaning can break callers even with valid schemas. For persistence or deployment changes, describe applicable old/new coexistence, backfill/validation, sequencing, cutover/cleanup conditions, and interrupted-transition recovery. Application rollback does not necessarily reverse data changes or external effects; distinguish rollback, roll-forward, and compensation. Link the owning Rollout and verification plan in `build-spec.md` and add technical detail under Information model, Dependencies, or Deployment and resources without duplicating the plan. No SQL, migration scripts, or infrastructure code is generated.

**Concern coverage and reconciliation.** Assess relevant integrity, authorization, security, operational ownership, recovery, and compatibility concerns even when no new diagram is warranted. A concern may be addressed by cited existing evidence/text instead of a new artifact; omission of a diagram is not omission of the obligation. Identify significant security/feasibility constraints before drafting views. The view order is an initial authoring order, not a waterfall: reconcile only affected owning definitions when later views expose conflicts. Do not repeat the whole phase mechanically. Compare consequential technical alternatives without reopening settled product alternatives unless evidence invalidates them.

**Evidence and readiness.** Report checks separately as inspected, structurally validated, contract-validated, engineering-reviewed, experimentally demonstrated, or planned/not performed, naming the subject and limitation. Contract validation includes applicable reference resolution and schema/example checks; compatibility and runtime enforcement need their own evidence. Structural passes and matching status strings establish neither feasibility nor assurance. Missing consequential evidence/review remains an explicit blocker with an owner or Unknown; not every nonblocking assumption requires an experiment. If Technical discovers a blocker, set this file and `build-spec.md` to draft, withdraw the dependent ready/build-slice claim in `product-design.md` using its existing profile/gate contract, and preserve unaffected IDs and human work. Name the next owner/revision; do not redraw screens to conceal an unresolved product impact.

## Document contract

Start with a title and this header:

```text
Standard: technical-design/1.0
Status: draft | ready
Slice: the named slice
Updated: YYYY-MM-DD
Source: product-design.md
```

Choose one status. **draft** means a blocking design question remains. **ready** means none remains. Ready is still a proposal, not approval to build. When `build-spec.md` exists, the two status values match.

Use these level-two headings in order. Keep each one. A heading whose view was omitted says why in one sentence, using the same reason as Design views.

```markdown
## Design subject
## Design concerns
## Design views
## Composition
## Dependencies
## Information model
## Service contract
## Deployment and resources
## Threats
## Decisions
## Correspondences
```

**Design subject.** The slice being designed, who will build and check it, and the requirements it traces to. One paragraph.

**Design concerns.** One entry per concern that could change the design:

```text
DC1 Builders need to know which parts this slice adds
Holder: engineers on the roster team
Characteristic: maintainability
Source: R3
```

Name a [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) characteristic only when this slice actually raises it. The nine names are functional suitability, performance efficiency, compatibility, interaction capability, reliability, security, maintainability, flexibility, and safety.

**Design views.** One row per IEEE 1016-2009 viewpoint. **included** names the section or file that addresses it. **omitted** says why no concern needs it.

| Viewpoint | Concern it frames | View |
| --- | --- | --- |
| Context | DC2 | included — `context.drawio` |
| Composition | DC1 | included — Composition |
| Logical |  | omitted — no new types beyond the conceptual model |
| Dependency | DC3 | included — Dependencies |
| Information | DC4 | included — Information model |
| Patterns |  | omitted — no pattern was chosen as a decision |
| Interface | DC5 | included — Service contract |
| Structure |  | omitted — no component needs an internal breakdown |
| Interaction | DC6 | included — `sequence.drawio` |
| State dynamics | DC7 | included — `states.drawio` |
| Algorithm | DC8 | included — Business rules in `build-spec.md` |
| Resource |  | omitted — no contention or environment constraint is in scope |

**Composition.** Parts of the slice: name, kind (application, data store, external system), purpose, buy / build / reuse, and whether it is existing, changed, or new. Link the containers page of `context.drawio` when it is drawn.

**Dependencies.** Part-to-part requirements: which part requires which, what a change inside the product breaks, and a proposed build order. An external system is an integration ID. Failure behaviour stays in Integrations and data. Do not restate it.

**Information model.** The logical additions from `design-data`: primary identifier, alternate business key when a surrogate is proposed, third normal form or a recorded exception, and the physical proposal when this product stores the data. Point at Glossary and Domain model in `build-spec.md` for purpose, attribute meaning, examples, sensitivity, and cardinality. Do not restate them. Point at `erd-logical.drawio` and, when drawn, the separate `erd-physical.drawio`. Each file has one page. The service contract is the external schema and is not restated here. A physical column names its type family, nullability, constraint, and the story or rule for any index.

**Service contract.** The boundaries callers program against. Link `openapi.yaml` for HTTP and `asyncapi.yaml` for events. List each operation:

```text
OP1 List a nurse's own shift requests
Method: GET /shift-cover-requests
Serves: S1 · Rules: BR1 · Entity: Cover request
Errors: 403 problem+json when BR1 denies the caller
```

**Deployment and resources.** Where the slice runs, what it needs from that environment, and any contention or availability constraint a story actually has. Unknown stays unknown.

**Threats.** Assess consequential misuse and failures affecting assets, permissions, identities, and operations, including risks within existing boundaries. Cite the boundary where relevant; a new boundary or diagram is not required for every threat. Reuse applicable assessments and review the slice's change. Record controls, ownership, residual risk, and checks without claiming verification from documentation alone. For example:

```text
TH1 A caller reads another ward's requests
Asset: cover request, personal data
Boundary: DF1 in dataflow.drawio
What goes wrong: a stolen session lists every ward
Control: BR1
Check: C4
Blocking: no
```

**Decisions.** One record per architecturally significant choice, especially hard-to-reverse ones. Reversible choices affecting security, compatibility, operation, or later slices may still merit a record. Reuse applicable ADRs and preserve supersession history. Distinguish proposed, accepted, and implemented; never infer human acceptance from an agent draft. For example:

```text
AD1 Keep shift ownership in the roster
Status: proposed
Context: the roster is already the system of record (I1).
Options: copy ownership into this product; read and write the roster.
Decision: this product does not store a second owner.
Consequences: roster outages block cover requests. Changing this later needs a migration.
Views: information, composition
Owner: roster product owner
```

A cheap default stays in Assumptions and open questions in `build-spec.md`.

**Correspondences.** One row per fact that appears in more than one view: contract field, column, operation, part, threat control, or consequential outcome mapped to an M ID, and the single owning ID. An empty mapping cell is a gap. Fix a conflict in the owning file: glossary and domain model own meaning, rules own conditions, screens own copy (or Product experience in the proposal without screens), this file owns structure, `build-spec.md` owns stories and acceptance.

Contract files live in the package root. `openapi.yaml` is an OpenAPI 3 description. `asyncapi.yaml` is an AsyncAPI description. Do not generate server or client code from them.

## Additional research and adaptation boundaries

External pages read 2026-10-22:

- [C4 diagrams](https://c4model.com/diagrams) and [review checklist](https://c4model.com/diagrams/checklist): selective depth, clear scope, responsibilities, and labeled relationships; not a reason to omit consequential concerns.
- [OpenAPI best practices](https://learn.openapis.org/best-practices.html): design-first, authoritative descriptions, reusable definitions, and validation. Package-root proposed copies remain a plugin policy, not a recommendation to create competing authorities.
- [AWS: safe retries](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/): ambiguous outcomes, request identity, changed intent, retention, and atomic handling. [AIP-154](https://google.aip.dev/154): stale-state protection. Mechanisms are context-dependent, not universal prescriptions.
- [AIP-180](https://google.aip.dev/180): source, wire and semantic compatibility; its independently updating consumer assumptions and transport-specific rules must be adapted to the actual project.
- [AsyncAPI 3.0 specification](https://www.asyncapi.com/docs/reference/specification/v3.0.0): application-specific send/receive operations, protocol bindings, and limits on deriving opposite-party contracts. A description does not establish runtime delivery guarantees. Follow the project's supported version, not an automatic upgrade.
- [Sadalage and Fowler: evolutionary database design](https://martinfowler.com/articles/evodb.html): schema/data/application changes, transition periods and compatibility. This plugin documents transition design, not executable migrations.
- [OWASP threat modeling](https://owasp.org/www-community/Threat_Modeling): scoped, iterative assessment of threats and mitigations; not exhaustive enumeration or a penetration test.
- [ADR guidance](https://adr.github.io/) and [GDS architecture decisions](https://gds-way.digital.cabinet-office.gov.uk/standards/architecture-decisions.html): significant choices, rationale, consequences, review and supersession. GDS merge-as-acceptance conventions are not assumed here.
- [Google SRE: embracing risk](https://sre.google/sre-book/embracing-risk/): reliability aligned to user consequences, cost and accountable tolerance; not permission to relax privacy, safety or mandatory obligations.

The invariant-to-enforcement review, existing-section placement, readiness propagation and check labels are this plugin's adaptation. Sources inform the method, not a compliance claim or measured efficiency gain.

## Research basis

Primary sources inspected on 2026-10-15. These support the practices below, not a claim that a package conforms to an external standard. Paywalled ISO clause text was not fully re-verified for this change.

| Source | Practice adopted | Boundary |
| --- | --- | --- |
| IEEE 1016-2009 | Organize the description by viewpoints. Use a viewpoint when its concern applies. Record rationale and keep views consistent. | The twelve viewpoint names are the checklist. Inclusion is per slice. |
| [ISO/IEC/IEEE 42010:2022](https://www.iso.org/standard/74393.html) | Identify stakeholders and concerns, frame each concern with a viewpoint, and record correspondences and decision rationale. | Catalogue and public overview inspected. |
| [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) | Use the nine product-quality characteristics as the menu of concerns. | A characteristic unused by the slice is not a required section. |
| [FIPS PUB 184](https://nvlpubs.nist.gov/nistpubs/Legacy/FIPS/fipspub184.pdf), IDEF1X; [British Columbia ER modeling standard](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/entity_relationship_modeling_standards_and_guidelines.pdf) | Logical model before physical: one primary identifier, cardinality at both ends, third normal form, business key kept beside a surrogate, data dictionary as the source of the ERD. Logical board labels use singular PascalCase; physical labels use schema identifiers. | The diagram uses crow's foot, not IDEF1X notation. No SQL. Spaced business phrases stay in the glossary. Detail in [erd-research.md](../../erd-drawio/references/erd-research.md). |
| ANSI/SPARC three-schema architecture; NIST SP 500-122 | Conceptual schema, then external schemas, then the internal schema. | The plugin does not design a DBMS. |
| [OpenAPI design-first](https://learn.openapis.org/best-practices.html); [GOV.UK API standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards); [OpenAPI 3 as a UK open standard](https://www.gov.uk/government/publications/recommended-open-standards-for-government/describing-restful-apis-with-openapi-3) | Write the HTTP description before code. | No server generation. |
| [AIP-121](https://google.aip.dev/121); Microsoft REST API Guidelines | Resources, then relationships, then schema, then standard methods. Resources are not a copy of the domain model. | Operations stay limited to the stories. |
| [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) | Use problem details for HTTP error bodies. | |
| [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/latest) | Describe an event boundary in its own document. | Only when a message crosses the boundary. |
| [GDS architecture decisions](https://gds-way.digital.cabinet-office.gov.uk/standards/architecture-decisions.html) | Record context, decision, and consequences for a significant choice. | A decision record is not the whole design. |
| [OWASP Threat Modeling](https://owasp.org/www-project-threat-modeling/) | Say what is protected, what can go wrong, what is done about it, and how that is checked. | STRIDE is optional. This is not a penetration test. |
