# Research basis for the ERD skill

Sources consulted 2026-10-20. These support the naming and layering practices below, not a claim that a package conforms to an external standard. Paywalled ISO clause text was not fully re-verified for this change.

| Source | Relevant guidance | Application here |
| --- | --- | --- |
| [FIPS PUB 184](https://nvlpubs.nist.gov/nistpubs/Legacy/FIPS/fipspub184.pdf) (IDEF1X) | Entity and attribute names are singular noun phrases. Relationship names are verb phrases; a reverse reading may be shown with `/`. Logical models carry meaning without a DBMS product. | Logical page uses singular PascalCase identifiers derived from the glossary. Crow's foot replaces IDEF1X box notation. |
| [British Columbia Entity Relationship Modeling Standards and Guidelines](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/entity_relationship_modeling_standards_and_guidelines.pdf) (v2.0.2, 2024-06-07) | Logical entities: singular, one to three real words, no hyphens or underscores. Relationships readable both ways. Logical before physical; data dictionary is the source of the ERD. | Adopt singular nouns, both-way cardinality, and logical-before-physical. **Board labels use PascalCase** (`CoverRequest`) instead of spaced business phrases (`Cover request`), so the diagram is an identifier handoff, not prose. Glossary and domain model keep the human wording. |
| [British Columbia Database Design (Physical) Modeling Standards](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/database_design_physical_modelling_standards_and_guidelines.pdf) | Physical objects use DBMS-safe names: underscores for clarity, nouns, approved abbreviations, no reserved words. | Physical page follows the target schema's conventions (usually `snake_case`). |
| [ISO/IEC 11179-5](https://www.iso.org/standard/60341.html) naming principles | Object class + property (+ representation) terms for precision. | PascalCase logical names follow that composition when the glossary term maps cleanly (`CoverRequest`, `SentAt`). |
| ANSI/SPARC three-schema; NIST SP 500-122 | Separate conceptual, external, and internal schemas. | Logical page = logical model; physical page = proposed internal schema; service contract stays in `technical-design.md`. |

## Naming by page

| Page | Label form | Example |
| --- | --- | --- |
| Logical | Singular PascalCase identifier from the glossary term | `CoverRequest`, `SentAt`, `RequesterId` |
| Physical | Schema identifier from the physical proposal | `cover_request`, `sent_at`, `requester_id` |

Both pages use formal identifiers. Neither page uses spaced prose labels (`Cover request`, `Sent at`). Optionality and sensitivity stay as short marks after the identifier: `(optional)`, `(personal)`.

Meaning, examples, and plain-language definitions stay in Glossary and Domain model. The ERD does not restate them.

## Layout

Sources consulted 2026-10-20 for how to place tables and route lines.

| Source | Relevant guidance | Application here |
| --- | --- | --- |
| [British Columbia ER modeling standard](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/entity_relationship_modeling_standards_and_guidelines.pdf) (v2.0.2), diagramming style | Independent entities sit above dependents. The many end is at the bottom or the right. Relationship names stay horizontal and do not overlap. | Parents are the left column. Crow's feet point right. Labels sit on the line with a white background. |
| Crow's-foot reading practice | Read each end from the entity outward. The mark nearest the entity is the maximum. The mark nearer the line is the minimum. | A straight left-to-right stroke makes that pair readable. See [Relationships](erd-components.md#relationships). |
| Diagram layout practice (orthogonal routing, crossing reduction) | Move boxes to remove crossings. Prefer one horizontal or vertical stroke. A turn is 90 degrees. Keep related entities close and reference data off the main chain. | [Layout](erd-components.md#layout): one straight stroke, then at most one elbow. Move a table instead of adding a bend or a jump. External references stay in the rightmost column. |

Not adopted:

- High-volume entities at the top left, with feet pointing down. That fights parent-on-the-left.
- A keys-only picture with attributes only in a side list. A slice ERD still draws the attributes from the domain model. The glossary remains the dictionary.
- A hard cap of about 15 entities per page. A second file is only for a cluster that shares no relationship with the first.

## Boundaries

- Notation is Draw.io Entity Relation crow's foot, not IDEF1X or Barker IE boxes.
- BC diagram-summary metadata is not required; the caption and note carry the question and sources.
- No SQL, migrations, or ORM code. The diagram is **proposed**.
- Draw.io cell `id` values may use kebab-case (`ent-cover-request`); those are editor identifiers, not ER names.
