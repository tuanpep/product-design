---
name: model-domain
description: "Describe the information a product keeps and how it changes: glossary, entities, attributes, relationships, lifecycle states, systems of record, and integrations. Use for /model-domain, before specifying a build slice, or when terms and data are ambiguous."
disable-model-invocation: true
---

# Model Domain

Read [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), [principle-keep-the-schemas-apart](../principle-keep-the-schemas-apart/SKILL.md), and [principle-design-every-state](../principle-design-every-state/SKILL.md). The model gives designers, builders, and testers one vocabulary. It is the conceptual schema, not a database schema and not an API. `design-data` specifies the logical model and any physical proposal. `erd-drawio` draws them. `design-contract` writes the external schema.

1. Write the glossary. Define each business term once, with an example and the synonyms to avoid. Use exactly these terms everywhere else.
2. List the entities the slice needs: purpose, key attributes (meaning, required or optional, example value, source, sensitivity), and relationships with cardinality, readable in both directions. Model only what a need or rule requires. This section owns those facts. Do not choose identifiers, tables, column types, or frameworks.
3. For each entity with a lifecycle, write a state table: state, meaning, allowed next states, trigger and actor, guarding rule ID, and side effect such as a notification or audit record. Include cancelled, expired, failed, and reversed where they can happen. A transition with no way back says why.
4. Name the system of record for each entity. For each integration, record direction, data, trigger, frequency, behaviour when the other side fails, owner, and the evidence class of its feasibility. This section owns that failure behaviour. Unknown feasibility stays unknown and can block readiness.
5. Mark personal or sensitive data: purpose, who can see it, and a proposed retention. Read [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md) and [principle-spend-less-of-the-world](../principle-spend-less-of-the-world/SKILL.md) before keeping data the outcome does not need.

Write Glossary, Domain model, States and lifecycle, and Integrations and data in `build-spec.md` using [the build spec format](../design-product/references/build-spec-format.md). At evaluation depth, a short version can sit under Product experience in `product-design.md`. Do not draw the ERD, state, sequence, or data-flow diagrams here. `select-views` chooses those views. `design-data` cites this model and adds identifiers, normalization, and any physical proposal.

**Reply:** the entities and their states, the integrations and their feasibility class, the sensitive data, and the terms that were ambiguous.
