---
name: survey-existing
description: "Inspect an existing product, codebase, or service before designing in it, and decide what this slice must reuse, should reuse, or extend. Use for /survey-existing when the design target already exists, before explore-solutions, or before adding a part, schema, screen, or contract."
disable-model-invocation: true
---

# Survey Existing

Read [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), [principle-spend-less-of-the-world](../principle-spend-less-of-the-world/SKILL.md), and [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md). This skill finds what the target project already has. It does not choose the product approach; `explore-solutions` does that from these findings. It does not interview users; `discover-needs` does that.

The reuse order follows [GOV.UK's "Do less"](https://www.gov.uk/guidance/government-design-principles), [Service Standard point 2](https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem) (check whether the problem is already solved), and [point 13](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns) (use common components and authoritative data). It is not a claim that the package meets the Service Standard.

1. Name the project. Use the project the human named, or the current working project and say so. If there is no existing product, codebase, or service, write that and stop. Do not invent an inventory for a greenfield idea.
2. Read only what this outcome could touch: the README, docs, an existing `docs/product-design/` package, and the code, schema, API, screens, and UI conventions on that path. Stop when further files would not change a disposition. Do not tour the repository.
3. For each relevant thing, reuse an evidence ID (E1) or take the next free one. Record what it does for this outcome, the source path, and whether that is observed or inferred. A search that finds nothing is **unknown**, with the paths searched. It is not proof that the thing is absent.
4. Give each finding one disposition, in this order. The first one that fits wins.
   - **Must reuse.** It is the system of record, replacing it would fork a term, rule, state, or record, or an owner, a law, or a safety constraint already requires it. A second copy is a blocking question.
   - **Should reuse.** An existing screen, operation, entity, component, convention, or platform the project already uses can meet the outcome. This is the default. A different choice is **proposed**, with a reason and an owner.
   - **Extend.** Reuse as it stands does not meet the outcome, and a change to this thing would. Prefer that change over a parallel part.
   - **Not relevant.** It was found and does not bear on this outcome. Say why in one clause.
5. A new part, screen, schema, or contract is not a disposition of something that exists. Propose one only after must-reuse, should-reuse, and extend were checked, and name the findings that cannot meet the outcome. `explore-solutions` owns that recommendation.

Write the findings under Evidence and unknowns in `product-design.md`, using [the proposal format](../design-product/references/proposal-format.md). Options uses them as the existing baseline. Do not open a new file. `design-composition`, `design-data`, `design-contract`, `design-screens`, and `context-drawio` cite these IDs. They do not survey the project again. A difference is fixed here first.

**Reply:** the project, the findings and their dispositions, what was not searched, and any new part that still has to go through `explore-solutions`.
