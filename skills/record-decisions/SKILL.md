---
name: record-decisions
description: "Record hard-to-reverse technical decisions with their context, options, consequences, and owner. Use for /record-decisions, after the technical views for a slice, or when a diagram shows a choice but not why."
disable-model-invocation: true
---

# Record Decisions

Read [principle-record-the-decision](../principle-record-the-decision/SKILL.md) and [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md). A decision record explains a choice the views forced. It does not replace those views.

1. Read `technical-design.md` and Assumptions and open questions in `build-spec.md`. If the design views section is missing, run `select-views` and the included view skills first.
2. Record a decision only when it is hard to reverse, touches safety, money, law, or privacy, or a later slice would have to conform to it. Give it an ID (AD1). A reversible default stays in the open-questions table with its owner. Do not write a record for a column type, a page size, or a name.
3. For each record, state the context as given or inferred, the options that were real, the decision, and the consequences, including what becomes expensive to change. Name the views that carry the decision. Name the owner. Set status to **proposed** until a person accepts it. In advise mode, recommend the option, label it **proposed — owner must confirm** when it is blocking, and continue.
4. A blocking decision also appears in Assumptions and open questions, with the same owner. Accepting it later updates both places and does not leave the record proposed.
5. When a new decision replaces an older one, keep the old ID, set its status to superseded, and point to the new ID.

Write the records under Decisions in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). When no decision meets the bar, the section says that and points at the open-questions table. A record is not approval to build, and it is not evidence that the option works.

**Reply:** the decisions recorded, the options they rejected, which ones still block a ready verdict, and the choices left as reversible defaults.
