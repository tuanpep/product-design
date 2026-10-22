# Physical database design standard

Researched: 2026-10-22. Scope: relational schema proposals and their physical ERDs. `design-data` owns the proposal in Information model in `technical-design.md`; `erd-drawio` copies it. This is a project standard informed by the sources below, not certification against SQL, ISO, or a vendor standard. It does not authorize schema changes.

## Language and existing schemas

- Write all authored physical ERD captions, legends, notes, descriptions, and comments in English. Name all new database objects and application-owned lifecycle codes in English. Derive terms from the domain glossary, not literal transliteration or an invented synonym. Record a precise English mapping when the source term is in another language.
- Preserve existing identifiers and externally governed codes exactly, including non-English names. Explain them in English in the proposal. Never translate an existing identifier only on the diagram or silently propose a production rename. A required rename needs an explicit old-to-new mapping, owner, compatibility plan, and migration-safety review.
- English-only metadata does not mean English-only stored data. Preserve multilingual names, addresses, free text, and external payloads. Document Unicode encoding and comparison requirements without translating user content.
- Existing authoritative schema conventions govern names, key types, timestamps, and deletion behavior. Cite the schema, migration, or ORM source and its revision. Apply the defaults below only where no applicable convention exists. Record departures with their reason and owner.

## Naming defaults for new schemas

These are project choices, not universal SQL requirements. Apply them to databases, schemas, tables, columns, constraints, indexes, and any other proposed objects where the engine permits them.

| Item | Convention | Example |
| --- | --- | --- |
| Identifier form | Lowercase ASCII `snake_case`, matching `^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$` | `cover_request` |
| Table | Singular English noun or noun phrase; no `tbl_` prefix | `staff_member`, `cover_request` |
| Association table | Name its business concept; otherwise join the singular entity names in a documented, consistent order | `staff_ward` |
| Column | Specific singular English term; no data-type prefix | `decline_reason`, not `str_reason` |
| Primary key | `id` for a single surrogate key; preserve meaningful names for natural or composite keys | `id`, or composite `staff_id` + `ward_id` |
| Foreign key column | Referenced entity or relationship role plus `_id` for a single identifier; use explicit component names for a composite key | `ward_id`, `requester_id`, `colleague_id` |
| Boolean | Positive predicate with `is_`, `has_`, or `can_` | `is_active`, `has_consent` |
| Time | `_at` for an instant, `_date` for a calendar date; document local wall-clock time separately | `sent_at`, `birth_date`, `opening_time` |
| Primary-key constraint | `pk_<table>` | `pk_cover_request` |
| Foreign-key constraint | `fk_<child>_<role>` | `fk_cover_request_requester` |
| Unique constraint or unique index | `uq_<table>_<columns_or_rule>` | `uq_cover_request_waiting_shift` |
| Check constraint | `ck_<table>_<rule>` | `ck_cover_request_different_staff` |
| Non-unique index | `ix_<table>_<columns_or_purpose>` | `ix_cover_request_colleague_sent_at` |

Use full words except familiar technical terms such as `id`, `url`, and `uuid`, or abbreviations defined in the glossary. Avoid reserved words, vague names such as `data` or `value` without context, spaces, punctuation, mixed case, and names that require quoting to be legal. This does not prohibit consistent ORM-generated quoting of otherwise safe identifiers.

Check identifier length and uniqueness in the target engine's object namespace, including generated names. PostgreSQL normally allows 63 bytes; MySQL 8.4 allows 64 characters for common schema objects. Neither limit is universal. Until the engine is chosen, 63 ASCII characters is a provisional ceiling, not a portability guarantee. Shorten long names using documented abbreviations or a stable collision-checked suffix. Never rely on silent truncation.

## Required physical proposal

Record these facts in Information model before drawing. Reference domain meaning, stories, rules, lifecycle states, and retention instead of copying their definitions.

| Scope | Required facts |
| --- | --- |
| Target | Database product and version, schema or namespace, existing convention sources, and unresolved choices with owners |
| Table | Exact identifier, conceptual entity mapping, existing/changed/new status, primary key, alternate business keys, and any normalization exception |
| Column | Exact identifier, concrete engine type and applicable length/precision/scale, explicit `NULL` or `NOT NULL`, default or `none`, generation strategy when relevant, and applicable constraints |
| Foreign key | Constraint name, ordered child columns, qualified referenced table and ordered key columns, both-way cardinality, `ON DELETE`, `ON UPDATE`, and any relevant deferral or composite-null behavior |
| Constraint | Name, participating columns or predicate, source rule, and enforcement mechanism; lifecycle checks link to the authoritative states |
| Index | Name, uniqueness, ordered keys and direction, predicate or included columns when used, source lookup/order/rule, and whether the engine already creates a supporting index |
| Sensitive data | Link to purpose, permitted readers, retention, and any relevant protection or deletion requirement |
| Changed persistence | Link to coexistence, backfill/validation, cutover/cleanup, and interrupted-transition recovery plan |

When the engine or version is unknown, use type families and mark the proposal **engine unresolved**. Give an owner for concrete type selection, naming-limit checks, supported features, collation, and referential-action semantics. A physical ERD may illustrate that proposal, but its caption/note must retain this qualification. Do not call it implementation-ready or mix vendor types as if they were portable.

## Keys, constraints, and relationships

- Give every proposed table one primary-key constraint, which may span several columns. Do not add a surrogate key to an association table automatically. Choose a natural, composite, generated integer, or UUID key from existing conventions and identity requirements, and document the generation owner. No universal `bigint` or UUID default applies across products.
- Keep a real business key enforceable when adding a surrogate. Specify uniqueness scope, case/collation behavior, and treatment of nulls. A nullable unique constraint does not necessarily mean at most one null.
- Match FK and referenced-key column definitions. Include applicable size, signedness, and collation requirements for the chosen engine. Reference a supported primary or candidate key. Draw external-system identifiers as integration references, not unenforceable database FKs.
- Required FK columns use `NOT NULL`; optional relationships may use nullable FKs. For a composite FK, specify whether partially null keys are allowed and how the engine enforces the intended rule. A unique child FK can enforce at most one child; an ordinary FK alone cannot guarantee that every parent has a child. Name the enforcement boundary for mandatory parent participation or other cross-row rules.
- Choose referential actions from lifecycle and retention rules. Prefer restrictive deletion unless a child has no independent meaning and no rule requires keeping it. `SET NULL` requires nullable columns. Record effective update behavior even when it is the engine default. `NO ACTION`, `RESTRICT`, and deferral are not interchangeable across engines.
- Use database constraints for enforceable invariants. Record the transaction/conditional-update mechanism for rules that need more than a row constraint. Do not imply that a row-level check enforces cross-table or concurrent-write rules.

## Types, nulls, and defaults

- Use integer types for counts and exact `decimal`/`numeric` with justified precision and scale for fractional quantities that require exactness. Do not use floating point for exact monetary amounts. State units, currency, range, and rounding rules through the owning domain entries. Do not assume every currency has two fractional digits.
- Distinguish a calendar date, local wall-clock time, and an absolute instant. For an instant, document UTC handling, precision, supported range, and display conversion. PostgreSQL `timestamptz` normalizes instants but does not retain the original named zone. MySQL `TIMESTAMP` and `DATETIME` have different conversion and range behavior. Store a named zone separately only when the domain needs it.
- Use a boolean type where supported for true/false facts; use an explicit constrained representation where it is not. Do not encode a multi-state lifecycle as several contradictory booleans.
- Choose text length from a real bound, not a blanket `varchar(255)`. Record Unicode and case/accent comparison behavior where it affects lookup or uniqueness. Identifiers such as postal codes and telephone numbers are text, not arithmetic quantities.
- Use `NULL` for a defined absent/unknown/not-applicable meaning. Do not replace it with empty strings, zero identifiers, or fake dates. Distinguish `default none` from a meaningful default. A default does not by itself make a column required or update an `updated_at` column on later writes.
- Keep repeating relational facts in child/association tables. JSON, arrays, snapshots, or denormalized copies need an explicit reason, validation/query strategy, and consistency owner. They are not a shortcut around keys or the logical model.
- Do not add audit, history, `created_at`, `updated_at`, or `deleted_at` columns automatically. Add them only for a cited rule, recovery path, or retention need. When soft deletion is required, define its effect on uniqueness, references, access, and eventual erasure.

## Indexes

Start with indexes required by the selected engine for keys and constraints. Do not draw a duplicate index over the same keys merely because it is an FK. PostgreSQL does not automatically create a child-side FK index; MySQL InnoDB requires a suitable child-side index and creates one when necessary.

Review every FK for joins, child lookup, and parent update/delete cost. Record a proposed supporting index or the reason for omitting it. Add other indexes only for a cited access pattern, ordering, or invariant. Record composite key order and supported conditional-uniqueness mechanisms explicitly. A PostgreSQL partial unique index is not a portable MySQL feature. An ERD does not prove index effectiveness; builders must check representative queries and write cost.

## Physical ERD acceptance

1. The English captions and notes identify the target engine/version or say **engine unresolved**, cite the owning proposal, and retain proposed choices and owners. Preserved legacy identifiers and external codes stay exact, with English explanations in the proposal.
2. Each table and column matches the proposal, including composite keys, role-specific FKs, types, nullability, defaults, referential actions, and indexes. Existing/changed/new and personal/sensitive marks agree with that text.
3. Crow's-foot ends agree with nullability and uniqueness. Separate conceptual participation requirements from what the physical constraints actually enforce. External references are visibly not database FKs.
4. Show named composite constraints and indexes as separate rows or keyed notes, not independent column-level constraints. Include their ordered columns or link their full definition in Information model. A compact display must not change or truncate a schema identifier. Widen a cell/table or move detail to a keyed note.
5. Keep `erd-physical.drawio` separate from `erd-logical.drawio`, one page per file. Follow the existing Draw.io components and layout. Do not generate SQL, migrations, or ORM code in this design workflow.
6. Check the source-to-diagram mapping and open the file before claiming rendering works. Neither this checklist nor a picture proves migration safety, concurrency correctness, retention enforcement, or query performance.

## External research

Sources checked 2026-10-22. Vendor behavior below is scoped to the cited version. English-only metadata, singular names, the naming patterns, and separate Draw.io files are project policy, not requirements attributed to these sources.

| Source | Evidence used and limits |
| --- | --- |
| [PostgreSQL 18 identifier syntax](https://www.postgresql.org/docs/18/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) | Unquoted names fold to lowercase; quoted names can be case-sensitive; default identifier limit is 63 bytes. PostgreSQL also permits non-English identifiers, so English is our policy. |
| [PostgreSQL 18 table basics](https://www.postgresql.org/docs/18/ddl-basics.html) | Recommends consistency; explicitly acknowledges both singular and plural naming choices. Does not mandate our singular convention. |
| [MySQL 8.4 identifier case sensitivity](https://dev.mysql.com/doc/refman/8.4/en/identifier-case-sensitivity.html) and [length limits](https://dev.mysql.com/doc/refman/8.4/en/identifier-length.html) | Recommends lowercase table/database names for portability across operating systems; common object names allow 64 characters. |
| [PostgreSQL 18 constraints](https://www.postgresql.org/docs/18/ddl-constraints.html) | PK, FK, null, unique, check, referential-action, and child-side indexing behavior. Cross-row guarantees need more than ordinary row checks. |
| [MySQL 8.4 foreign keys](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html) | InnoDB type compatibility, required supporting indexes, restrictive actions, and lack of deferred constraint checking; not identical to PostgreSQL behavior. |
| [PostgreSQL 18 numeric types](https://www.postgresql.org/docs/18/datatype-numeric.html) and [MySQL 8.4 fixed-point types](https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html) | Exact decimal versus approximate numeric storage; precision/scale and bounds are engine-specific. |
| [PostgreSQL 18 date/time types](https://www.postgresql.org/docs/18/datatype-datetime.html) and [MySQL 8.4 date/time types](https://dev.mysql.com/doc/refman/8.4/en/datetime.html) | Zone conversion, precision, and range differences. No universal timestamp type follows from these documents. |

The earlier [BC physical modeling standard](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-technology/standards/economy-sector/database_design_physical_modelling_standards_and_guidelines.pdf), version 2.0.1 from 2017, supports documented logical-to-physical mapping and descriptive names. Its uppercase names, plural tables, application prefixes, and historical Oracle limits are organization-specific and are not adopted as cross-engine rules. Its naming sections were checked through externally indexed text; the PDF could not be rendered by the research fetch tool.
