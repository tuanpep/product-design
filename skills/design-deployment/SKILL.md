---
name: design-deployment
description: "Describe where a slice runs and which resources it needs, when an environment, capacity, or contention concern is real. Use for /design-deployment, or when the resource view is included."
disable-model-invocation: true
---

# Design Deployment

Read [principle-choose-the-view](../principle-choose-the-view/SKILL.md), [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md), and [principle-spend-less-of-the-world](../principle-spend-less-of-the-world/SKILL.md). This is the resource viewpoint: where the software runs and what it consumes. It does not invent a cloud.

1. Read Design views in `technical-design.md`. If the resource viewpoint is omitted, stop. If Composition is still the placeholder, run `design-composition` first.
2. Name the environment only when the project or the brief already names it. Otherwise write that the environment is unknown and whose question it is. Do not draw accounts, clusters, or regions to fill the section.
3. For each part this product owns, say what it needs from that environment: the data store from the information view, the external systems from Integrations and data, and any capacity, availability, or contention a story or quality requirement actually states. A number that was not given stays unknown.
4. A resource limit that would drop or delay a task the user cannot afford to lose is a blocking question. A limit that is cheap to change later is a **proposed** default with an owner.
5. Check the section against Composition. A runtime part that Composition does not list is added there first.

Write the section under Deployment and resources in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Do not write infrastructure code. The section is **proposed**. It is not a capacity test or an operations handover.

**Reply:** the environment or the statement that it is unknown, the resources each part needs, the proposed limits, and the blocking resource questions.
