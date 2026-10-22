# ERD components for Draw.io

Entities use Draw.io's built-in **Entity Relation → Table** shape (`shape=table`, `shape=tableRow`, `shape=partialRectangle`), and relationships use its built-in crow's-foot arrow ends. The file opens in Draw.io desktop, diagrams.net, and the VS Code extension as a real table: rows can be added, moved, and resized in the editor. Copy a style exactly and change only the label, position, and size. Specimens: [example-logical.drawio](example-logical.drawio) and [example-physical.drawio](example-physical.drawio); [example-erd.md](example-erd.md) lists the entities, relationships, and naming choices. Naming and layering follow [erd-research.md](erd-research.md).

## Pages

- `erd-logical.drawio` has exactly one page, `Logical`, with `<diagram id="logical" name="Logical">`. It is always drawn.
- `erd-physical.drawio` has exactly one page, `Physical`, with `<diagram id="physical" name="Physical">`. It is drawn only when `design-data` wrote a physical proposal; otherwise omit the file.
- Always keep these views in separate files, even for a small model. Do not create a combined `erd.drawio` or put both pages in either file.
- In a product package, one cluster of entities that share relationships uses those short filenames. Multiple unrelated clusters use `1-<cluster>/erd-logical.drawio` and, when applicable, `1-<cluster>/erd-physical.drawio`, numbered in parent/child index order.
- The separate specimen files (`example-logical.drawio`, `example-physical.drawio`) match the package's split-file structure.
- Each page starts with a caption at the top left, and ends with a note under the diagram that names the question, the source sections in `build-spec.md`, the conventions followed, and what the diagram does not test.

## Structure

A table has three levels, and each level's `parent` is the level above it:

| Level | parent | geometry |
| --- | --- | --- |
| Table | `1` | absolute: `x`, `y`, full width, `30 + 30 × rows` high |
| Row | the table | `y` = 30 for the first row, then every 30; full table width; 30 high |
| Cell | the row | `x` = the sum of the earlier cell widths; the column width; 30 high; plus `<mxRectangle width="…" height="30" as="alternateBounds" />` |

Every row has the same cells in the same order, so the columns line up:

| Page | Columns and widths | Table width |
| --- | --- | --- |
| Logical | key 30, name 250 | 280 |
| Physical | key 40, column 150, type 100, constraints 190 | 480 |

Draw each relationship between rows, never between cells: cells are `connectable=0`.

## Naming

Both pages use formal identifiers. Logical is PascalCase; physical follows the schema. Spaced prose (`Cover request`, `Sent at`) stays in the glossary, not on the board.

| Kind | Logical page | Physical page |
| --- | --- | --- |
| Entity / table | Singular PascalCase from the glossary term: `CoverRequest` | Table name from the proposal: `cover_request` |
| Attribute / column | Singular PascalCase: `SentAt`, `DeclineReason (optional, personal)` | Column name from the proposal: `sent_at`, `decline_reason` |
| Primary identifier | Entity-qualified or `Id`: `CoverRequestId` | Column name: `id` or `cover_request_id` as the proposal uses |
| Foreign key | Role or entity + `Id`: `ShiftId`, `RequesterId` | Column name: `shift_id`, `requester_id` |
| Relationship | Present-tense verb from the domain model: `runs`. When the reverse reading differs and fits, `runs / belongs to` | Usually unlabelled; cardinality stays in the crow's-foot ends |

Rules:

- Derive logical PascalCase from the glossary term by removing spaces and capitalising each word. Do not invent a different concept name.
- Do not put types, nullability SQL, or DBMS keywords on the logical page. Marks `(optional)` and `(personal)` are allowed after the identifier.
- Physical names follow the existing schema or the physical proposal, using [the database standard](../../design-data/references/database-standard.md). New identifiers and authored captions, legends, and notes use English; preserve existing identifiers and externally governed codes exactly. Do not paste PascalCase or glossary phrases as column labels.
- Draw.io cell `id` values stay kebab-case (`ent-cover-request`); they are not ER names.
- Row order inside a table: primary key, then foreign keys, then required attributes, then optional attributes. Index rows come last on the physical page.

## Layout

A reader starts at the top left and follows the main chain left to right. The "one" side is the parent, on the left. The crow's foot points right, toward the child. Snap every `x` and `y` to the 10 grid. Sources and the choices this section does not take are in [erd-research.md](erd-research.md#layout).

**Columns.** A table with no foreign key is rank 0. Every other table is one rank higher than its highest-rank parent. Same rank, same x. A child is never left of its parent.

| Page | First column | Next column | Table width | Gutter between edges |
| --- | --- | --- | --- | --- |
| Logical | x 40 | +400 | 280 | 120 |
| Physical | x 40 | +560 | 480 | 80 |

The first table in a column starts at y 80, under the caption. Stack later tables in that column with at least 40 between them, or 80 when a line must pass through the gap. Do not overlap a table, the caption, the legend, or the note. Keep the main chain short: a parent and its child sit in neighbouring columns. An external reference stays in the rightmost column, dashed, and is not inserted between a parent and its child.

**One straight stroke, then at most one elbow.** Give the parent key row and the child foreign-key row the same page y (`table y + row y`) so the crow's foot is one horizontal segment in the gutter. If that alignment would cover the caption or another table, keep the column x and move the child down. The line is then one vertical in the gutter and one horizontal into the row. Do not draw a diagonal. Move a table to clear a crossing. Do not add bends or a jump arc to hide one.

**Lines.** Keep `entityRelationEdgeStyle`. Draw from the parent key row to the child foreign-key row. A line touches a table only at those two rows. Every other part stays in the gutter, at least 24 outside every table. Two lines in one gutter run parallel and at least 40 apart. They do not share a segment ([Edges do not overlap](../../drawio/references/drawio-file.md#relationship-lines)). Two roles from the same parent (requester and colleague) end on two foreign-key rows. A relationship from a table to itself stays in that table's right gutter and does not cross another table. Give each label a different `x` on `<mxGeometry x="0.3" relative="1" as="geometry" />` (`x` from `-1` to `1`) so the words do not stack. A label keeps `labelBackgroundColor=#ffffff` and does not sit on a table.

**Frame.** The caption is top left. The physical legend is top right, 24 clear of the nearest table. The note sits 40 below the lowest table. Set `pageWidth` and `pageHeight` to the bounds of every shape plus 40, rounded up to a multiple of 10. Shorten explanatory labels rather than wrapping them. Never shorten a schema identifier to fit: widen the table's columns consistently and increase the column pitch to retain the gutter, or move constraint detail to a keyed note. After placing, zoom out: the main chain should still read left to right without tracing a line.

## IDs

- Logical table `ent-<entity>`, its rows `ent-<entity>-<attribute>`, and the cells `ent-<entity>-<attribute>-key` and `-name`. Relationships are `rel-1`, `rel-2`, and so on.
- Physical table `tbl-<table>`, its rows `tbl-<table>-<column>`, and the cells `-key`, `-name`, `-type`, and `-rule`. Foreign keys are `fk-1`, `fk-2`, and so on.
- Use the glossary term in kebab case for `<entity>`, and the column name for `<column>`. An index row uses its index name, such as `tbl-cover_request-uq_waiting`. Captions are `logical-caption` and `physical-caption`, notes are `logical-note` and `physical-note`, and legend swatches are `physical-legend-<kind>`.

## Tables

All table styles share the built-in table prefix:

`shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;html=1;fontSize=13;swimlaneFillColor=#ffffff;`

| Table | Use | style after the prefix |
| --- | --- | --- |
| Logical entity | every entity on the logical page | `fillColor=#1f2937;strokeColor=#1f2937;fontColor=#ffffff;` |
| New table | a table this slice adds | `fillColor=#1f6b4a;strokeColor=#1f6b4a;fontColor=#ffffff;` |
| Existing table | a table that already exists, unchanged | `fillColor=#eaeef2;strokeColor=#8c959f;fontColor=#1b1f24;` |
| Changed table | an existing table this slice changes | `fillColor=#fff4ce;strokeColor=#7a5a00;fontColor=#7a5a00;` |
| External reference | an entity whose system of record is another system | `fillColor=#f6f8fa;strokeColor=#8c959f;fontColor=#57606a;dashed=1;` labelled with the PascalCase entity and its integration, such as `RosterShift (I1)` |

Label a table with its identifier for that page only: PascalCase on the logical page (`CoverRequest`), and the table name on the physical page (`cover_request`).

## Rows

Every row uses the built-in table row style, with an empty `value`:

`shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;fillColor=none;collapsible=0;dropTarget=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;top=0;left=0;right=0;bottom=0;strokeColor=#d0d7de;`

Change `bottom=0` to `bottom=1` to draw a rule under the row: under the primary key row, and under the last column row when index rows follow.

## Cells

All cells share the built-in partial rectangle prefix:

`shape=partialRectangle;connectable=0;fillColor=none;top=0;left=0;bottom=0;right=0;overflow=hidden;whiteSpace=wrap;html=1;fontSize=12;`

| Cell | style after the prefix |
| --- | --- |
| Key (first column) | `fontStyle=1;fontColor=#1b1f24;` |
| Name, type, or constraints | `align=left;spacingLeft=6;fontColor=#1b1f24;` |

Then vary the row's cells by what the row holds:

| Row | Key cell | Name cell | Logical example | Physical example |
| --- | --- | --- | --- | --- |
| Primary key | `PK` | add `fontStyle=5;` (bold, underlined) | `PK` · `CoverRequestId` | `PK` · `id` · `bigint` · `identity` |
| Alternate key | `AK` | as is | `AK` · `WorkEmail` | `AK` · `work_email` · empty · `unique` |
| Foreign key | `FK` | as is | `FK` · `ShiftId` | `FK` · `shift_id` · `bigint` · `not null · on delete restrict` |
| Attribute | empty | as is | `SentAt` or `DecidedAt (optional)` | `sent_at` · `timestamptz` · `not null · default now()` |
| Personal or sensitive | as its key kind | every cell `fontColor=#b42318;` | `DeclineReason (optional, personal)` | `decline_reason` · `text` · `null · personal` |
| Changed or new column in an existing table | as its key kind | every cell `fontColor=#7a5a00;`, name cell `fontStyle=1;` | not used | `qualified_ward_ids` · `bigint[]` · `proposed` |
| Index or constraint | `UQ` or `IX` | every cell `fontSize=11;fontColor=#57606a;` in place of `fontSize=12;fontColor=#1b1f24;` | not used | `UQ` · `shift_id` · empty · `where status = 'waiting' · BR3` |

A lifecycle is an attribute that points to its source rather than repeating the states: `Status` on the logical page (source named in the board note), and `status` · `text` · `check: lifecycle states` on the physical page. Draw the lifecycle itself with `state-drawio`.

## Relationships

Draw each relationship from the row of the parent's key to the row of the child's foreign key. The source end is the parent and the target end is the child.

`edgeStyle=entityRelationEdgeStyle;html=1;startFill=0;endFill=0;strokeColor=#57606a;fontSize=11;fontColor=#57606a;labelBackgroundColor=#ffffff;` followed by a `startArrow` and an `endArrow` from Draw.io's built-in crow's-foot ends:

| Cardinality at that end | Arrow |
| --- | --- |
| Exactly one | `ERmandOne` |
| Zero or one | `ERzeroToOne` |
| One or many | `ERoneToMany` |
| Zero or many | `ERzeroToMany` |

For example, a ward runs zero or many shifts: `startArrow=ERmandOne;endArrow=ERzeroToMany;`. Read each end from the table outward: the mark nearest the table is the maximum, and the mark nearer the line is the minimum. Label the logical relationship with the domain model's present-tense verb, such as `runs`, or `runs / belongs to` when the reverse reading differs and the label still fits. The domain model owns the full both-way sentence with cardinality. Place the tables and route the line with [Layout](#layout).

A link to an external reference uses `edgeStyle=entityRelationEdgeStyle;html=1;dashed=1;startArrow=none;endArrow=open;strokeColor=#8c959f;fontSize=11;fontColor=#57606a;labelBackgroundColor=#ffffff;`, labelled with the integration ID.

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` labelled `Logical · ShiftSwaps` |
| Legend swatch | 100×24, the table style without the prefix, plus `rounded=0;whiteSpace=wrap;html=1;fontSize=11;`, labelled `New`, `Existing`, `Changed`, or `External` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` |

## What to leave out

SQL, migration scripts, ORM code, and storage engine settings belong to the build. Columns, indexes, and tables that no need, rule, story, or retention requirement asks for are left out, not drawn as "maybe later".
