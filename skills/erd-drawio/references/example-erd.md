# Shift-swaps ERD example

Standard: erd/1.0
Updated: 2026-10-20
Source: illustrative erd-drawio specimen, not a researched product proposal

All names, policies, and schema choices are fictional and **proposed**. This companion describes the two specimen boards. It is not a complete product-design package, SQL, or evidence that a schema performs or migrates safely. Naming follows [erd-research.md](erd-research.md) and [erd-components.md](erd-components.md).

| File | Page |
| --- | --- |
| [example-logical.drawio](example-logical.drawio) | Logical · PascalCase identifiers |
| [example-physical.drawio](example-physical.drawio) | Physical · `snake_case` schema identifiers |

In a product package, both views live as two pages inside one `erd.drawio`. The skill keeps them as separate files so each opens on its own.

## Question

Can a `CoverRequest` exist without a `Shift` and two `Staff`? No. Each `CoverRequest` has exactly one `Shift`, one `RequesterId`, and one `ColleagueId`; a `Shift` or `Staff` can have none or many.

## Pages

| Page | Purpose | Label form |
| --- | --- | --- |
| Logical | Entities, attributes, keys, crow's-foot relationships | PascalCase (`CoverRequest`, `SentAt`) |
| Physical | Proposed roster schema | `snake_case` (`cover_request`, `sent_at`) |

Spaced glossary prose (`Cover request`, `Sent at`) is not drawn on either page.

## Logical entities

| Entity | Primary identifier | Attributes (PK, FKs, required, optional) |
| --- | --- | --- |
| `Ward` | `WardId` | `Name` |
| `Staff` | `StaffId` | `FullName (personal)`, `WorkEmail (personal)`, `Grade` |
| `Shift` | `ShiftId` | `WardId`, `AssignedStaffId`, `StartsAt`, `EndsAt`, `ShiftType` |
| `CoverRequest` | `CoverRequestId` | `ShiftId`, `RequesterId`, `ColleagueId`, `Status`, `SentAt`, `DecidedAt (optional)`, `DeclineReason (optional, personal)` |

## Relationships

| ID | From → to | Cardinality | Label |
| --- | --- | --- | --- |
| rel-1 | `Ward` → `Shift` | 1 → 0..* | `runs / belongs to` |
| rel-2 | `Staff` → `Shift` | 1 → 0..* | `is assigned / works` |
| rel-3 | `Shift` → `CoverRequest` | 1 → 0..* | `has / covers` |
| rel-4 | `Staff` → `CoverRequest` via `RequesterId` | 1 → 0..* | `requests / from` |
| rel-5 | `Staff` → `CoverRequest` via `ColleagueId` | 1 → 0..* | `is asked / as colleague` |

## Physical proposal (illustrative)

| Table | Kind | Notes |
| --- | --- | --- |
| `ward` | Existing | Unchanged |
| `staff` | Changed | Proposed column `qualified_ward_ids` (amber) |
| `shift` | Existing | Unchanged |
| `cover_request` | New | Slice focus; UQ (BR3), IX (SC3) |

Conventions: `snake_case`, `bigint` identity, `timestamptz`. `decline_reason` personal; proposed retention 12 months, owner ward manager (Q2).

## Demonstrates

- PascalCase logical vs `snake_case` physical identifiers
- PK / FK / attribute / personal / proposed / UQ / IX row styles
- New, Existing, and Changed table colours
- Lifecycle `Status` without listing states on the board
- `verb / reverse` relationship labels

## Does not demonstrate

- External-reference (dashed) entities — see [erd-components.md](erd-components.md)
- Alternate keys as `AK` rows
- SQL, migrations, or retention enforcement

Open each `.drawio` in Draw.io or diagrams.net.
