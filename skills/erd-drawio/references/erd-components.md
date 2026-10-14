# ERD components for Draw.io

Entities use Draw.io's built-in **Entity Relation → Table** shape (`shape=table`, `shape=tableRow`, `shape=partialRectangle`), and relationships use its built-in crow's-foot arrow ends. The file opens in Draw.io desktop, diagrams.net, and the VS Code extension as a real table: rows can be added, moved, and resized in the editor. Copy a style exactly and change only the label, position, and size. [example.drawio](example.drawio) uses each one on a logical and a physical page.

## Pages

- Page 1 is `Logical`, with `<diagram id="logical" name="Logical">`. It is always drawn.
- Page 2 is `Physical`, with `<diagram id="physical" name="Physical">`. It is drawn only when the target project has a database or the human asks.
- One cluster of entities that share relationships is one file, `erd.drawio`. A second cluster that shares none is `NN-<cluster>/erd.drawio`, numbered in the order the business needs the data, with the same two pages when a physical view is drawn.
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

## Layout

- Put parent entities on the left and their children to the right, so relationships run left to right. Columns of tables are 400 apart on the logical page and 560 apart on the physical page. Start at x 40, y 80.
- A label that would not fit its cell is shortened, not wrapped.
- When a relationship's vertical segment would cross another table, move the target table down until the path is clear. Two relationships do not share a segment ([Edges do not overlap](../../drawio/references/drawio-file.md#edges-do-not-overlap)). When several leave one row, give each its own exit and a parallel lane.

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
| External reference | an entity whose system of record is another system | `fillColor=#f6f8fa;strokeColor=#8c959f;fontColor=#57606a;dashed=1;` labelled with the entity and its integration, such as `Roster shift (I1)` |

Label a table with its real name: the glossary term on the logical page, such as `Cover request`, and the table name on the physical page, such as `cover_request`.

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
| Primary key | `PK` | add `fontStyle=5;` (bold, underlined) | `PK` · `Cover request ID` | `PK` · `id` · `bigint` · `identity` |
| Foreign key | `FK` | as is | `FK` · `Shift` | `FK` · `shift_id` · `bigint` · `not null · on delete restrict` |
| Attribute | empty | as is | `Sent at` or `Decided at (optional)` | `sent_at` · `timestamptz` · `not null · default now()` |
| Personal or sensitive | as its key kind | every cell `fontColor=#b42318;` | `Decline reason (optional, personal)` | `decline_reason` · `text` · `null · personal` |
| Changed or new column in an existing table | as its key kind | every cell `fontColor=#7a5a00;`, name cell `fontStyle=1;` | not used | `qualified_ward_ids` · `bigint[]` · `proposed` |
| Index or constraint | `UQ` or `IX` | every cell `fontSize=11;fontColor=#57606a;` in place of `fontSize=12;fontColor=#1b1f24;` | not used | `UQ` · `shift_id` · empty · `where status = 'waiting' · BR3` |

A lifecycle is an attribute that points to its source rather than repeating the states: `Status (States and lifecycle)` on the logical page, and `status` · `text` · `check: lifecycle states` on the physical page. Draw the lifecycle itself with `state-drawio`.

## Relationships

Draw each relationship from the row of the parent's key to the row of the child's foreign key. The source end is the parent and the target end is the child.

`edgeStyle=entityRelationEdgeStyle;html=1;startFill=0;endFill=0;strokeColor=#57606a;fontSize=11;fontColor=#57606a;labelBackgroundColor=#ffffff;` followed by a `startArrow` and an `endArrow` from Draw.io's built-in crow's-foot ends:

| Cardinality at that end | Arrow |
| --- | --- |
| Exactly one | `ERmandOne` |
| Zero or one | `ERzeroToOne` |
| One or many | `ERoneToMany` |
| Zero or many | `ERzeroToMany` |

For example, a ward runs zero or many shifts: `startArrow=ERmandOne;endArrow=ERzeroToMany;`. Label the logical relationship with its glossary verb, such as `runs`. When several relationships leave the same row, give each label a different `x` on `<mxGeometry x="0.3" relative="1" as="geometry" />` (from `-1` to `1`) so the labels do not stack.

A link to an external reference uses `edgeStyle=entityRelationEdgeStyle;html=1;dashed=1;startArrow=none;endArrow=open;strokeColor=#8c959f;fontSize=11;fontColor=#57606a;labelBackgroundColor=#ffffff;`, labelled with the integration ID.

## Board annotations

| Item | style |
| --- | --- |
| Caption | `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=20;fontStyle=1;fontColor=#1b1f24;` labelled `Logical model · shift swaps` |
| Legend swatch | 100×24, the table style without the prefix, plus `rounded=0;whiteSpace=wrap;html=1;fontSize=11;`, labelled `New`, `Existing`, `Changed`, or `External` |
| Note | `shape=note;whiteSpace=wrap;html=1;size=14;fillColor=#fff2cc;strokeColor=#d6b656;align=left;spacingLeft=8;verticalAlign=top;fontSize=12;` |

## What to leave out

SQL, migration scripts, ORM code, and storage engine settings belong to the build. Columns, indexes, and tables that no need, rule, story, or retention requirement asks for are left out, not drawn as "maybe later".
