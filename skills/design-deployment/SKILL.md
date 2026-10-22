---
name: design-deployment
description: "Describe where a slice runs and which resources it needs, when an environment, capacity, or contention concern is real. Use for /design-deployment, or when the resource view is included."
disable-model-invocation: true
---

# Design Deployment

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [choose the view](../principle-choose-the-view/SKILL.md), [reversible choices](../principle-decide-the-reversible/SKILL.md), and [resource cost](../principle-spend-less-of-the-world/SKILL.md). This is the resource viewpoint: where software runs and what it consumes, not an invented cloud.

1. Read Design views in `technical-design.md`. If the resource viewpoint is omitted, stop. If Composition is still the placeholder, run `design-composition` first.
2. Name the environment only when the project or the brief already names it. Otherwise write that the environment is unknown and whose question it is. Do not draw accounts, clusters, or regions to fill the section.
3. For each part this product owns, say what it needs from that environment: the data store from the information view, the external systems from Integrations and data, and any capacity, availability, or contention a story or quality requirement actually states. A number that was not given stays unknown.
4. A resource limit that would drop or delay a task the user cannot afford to lose is a blocking question. A limit that is cheap to change later is a **proposed** default with an owner.
5. Reuse the existing operating model where applicable. Tie reliability/capacity choices to sourced requirements and accountable risk tolerance; do not invent SLOs, traffic, recovery targets, caches, queues or regions. For changed runtime parts, describe applicable deployment ordering, old/new coexistence, migration dependencies, observable failure/cutover signals, recovery and operational ownership. Link Rollout and verification rather than duplicating it. Distinguish application rollback, data recovery, compensation and roll-forward; do not promise reversal of committed external effects.
6. Check the section against Composition. A runtime part that Composition does not list is added there first. Label operational checks and rehearsals planned unless supplied evidence shows execution.

Write the section under Deployment and resources in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Do not write infrastructure code. The section is **proposed**. It is not a capacity test or an operations handover.

**Reply:** the environment or the statement that it is unknown, the resources each part needs, the proposed limits, and the blocking resource questions.
