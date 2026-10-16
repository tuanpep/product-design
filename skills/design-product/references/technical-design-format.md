# Technical design format

`docs/product-design/<slug>/technical-design.md` is the software design description for one named slice. It tells builders which views exist, why, and how those views correspond. It follows [the output standard](output-standard.md). `/technical-design` creates it through `select-views`. The view skills fill the sections they own. That same phase fills Correspondences. `/design-product` does not create this file.

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

**Information model.** The logical additions from `design-data`: primary identifier, alternate business key when a surrogate is proposed, third normal form or a recorded exception, and the physical proposal when this product stores the data. Point at Glossary and Domain model in `build-spec.md` for purpose, attribute meaning, examples, sensitivity, and cardinality. Do not restate them. Point at `erd.drawio` for the drawing. The service contract is the external schema and is not restated here. A physical column names its type family, nullability, constraint, and the story or rule for any index.

**Service contract.** The boundaries callers program against. Link `openapi.yaml` for HTTP and `asyncapi.yaml` for events. List each operation:

```text
OP1 List a nurse's own shift requests
Method: GET /shift-cover-requests
Serves: S1 · Rules: BR1 · Entity: Cover request
Errors: 403 problem+json when BR1 denies the caller
```

**Deployment and resources.** Where the slice runs, what it needs from that environment, and any contention or availability constraint a story actually has. Unknown stays unknown.

**Threats.** For each abuse of a trust boundary:

```text
TH1 A caller reads another ward's requests
Asset: cover request, personal data
Boundary: DF1 in dataflow.drawio
What goes wrong: a stolen session lists every ward
Control: BR1
Check: C4
Blocking: no
```

**Decisions.** One record per hard-to-reverse technical choice:

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

**Correspondences.** One row per fact that appears in more than one view: contract field, column, operation, part, or threat control, and the single owning ID. An empty mapping cell is a gap. Fix a conflict in the owning file: glossary and domain model own meaning, rules own conditions, screens own copy, this file owns structure, `build-spec.md` owns stories and acceptance.

Contract files live in the package root. `openapi.yaml` is an OpenAPI 3 description. `asyncapi.yaml` is an AsyncAPI description. Do not generate server or client code from them.

## Research basis

Primary sources inspected on 2026-10-15. These support the practices below, not a claim that a package conforms to an external standard. Paywalled ISO clause text was not fully re-verified for this change.

| Source | Practice adopted | Boundary |
| --- | --- | --- |
| IEEE 1016-2009 | Organize the description by viewpoints. Use a viewpoint when its concern applies. Record rationale and keep views consistent. | The twelve viewpoint names are the checklist. Inclusion is per slice. |
| [ISO/IEC/IEEE 42010:2022](https://www.iso.org/standard/74393.html) | Identify stakeholders and concerns, frame each concern with a viewpoint, and record correspondences and decision rationale. | Catalogue and public overview inspected. |
| [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) | Use the nine product-quality characteristics as the menu of concerns. | A characteristic unused by the slice is not a required section. |
| [FIPS PUB 184](https://nvlpubs.nist.gov/nistpubs/Legacy/FIPS/fipspub184.pdf), IDEF1X; [British Columbia ER modeling standard](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/entity_relationship_modeling_standards_and_guidelines.pdf) | Logical model before physical: one primary identifier, cardinality at both ends, third normal form, business key kept beside a surrogate, data dictionary as the source of the ERD. | The diagram uses crow's foot, not IDEF1X notation. No SQL. |
| ANSI/SPARC three-schema architecture; NIST SP 500-122 | Conceptual schema, then external schemas, then the internal schema. | The plugin does not design a DBMS. |
| [OpenAPI design-first](https://learn.openapis.org/best-practices.html); [GOV.UK API standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards); [OpenAPI 3 as a UK open standard](https://www.gov.uk/government/publications/recommended-open-standards-for-government/describing-restful-apis-with-openapi-3) | Write the HTTP description before code. | No server generation. |
| [AIP-121](https://google.aip.dev/121); Microsoft REST API Guidelines | Resources, then relationships, then schema, then standard methods. Resources are not a copy of the domain model. | Operations stay limited to the stories. |
| [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) | Use problem details for HTTP error bodies. | |
| [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/latest) | Describe an event boundary in its own document. | Only when a message crosses the boundary. |
| [GDS architecture decisions](https://gds-way.digital.cabinet-office.gov.uk/standards/architecture-decisions.html) | Record context, decision, and consequences for a significant choice. | A decision record is not the whole design. |
| [OWASP Threat Modeling](https://owasp.org/www-project-threat-modeling/) | Say what is protected, what can go wrong, what is done about it, and how that is checked. | STRIDE is optional. This is not a penetration test. |
