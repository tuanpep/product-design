---
name: map-stakeholders
description: "Identify the people, roles, systems, and decision owners around a product idea, with their goals, influence, and permissions. Use for /map-stakeholders, at the start of discovery, or when roles, approvals, or ownership are unclear."
disable-model-invocation: true
---

# Map Stakeholders

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack.

A stakeholder's statement is given, not an observed user need. Load [the evidence contract](../design-product/references/evidence-and-decisions.md) only when classifying a claim.

1. List every actor that touches the outcome: end users by role, people who approve or support them, people affected but absent from the interface, and external systems. Name the hardest realistic user. Load [principle-include-the-hardest-case](../principle-include-the-hardest-case/SKILL.md) only when inclusion could change the framing or support a citation.
2. For each actor, record their goal, what they do today, what they would lose if the design changes, and the evidence class of each claim.
3. Name the decision owner for scope, business rules, policy, data, and launch. Use unknown when the owner is not known. Never fill an owner from a guessed job title.
4. Match authority detail to the phase. In Understand, identify consequential decision/access boundaries and unknowns; do not invent solution actions or require a permission matrix. In Shape, record permissions needed by proposed behavior. In Specify, complete the applicable action/role matrix with allowed, denied or conditional cells referencing rules. Proposed cells are not approval. Reuse an existing authoritative matrix rather than rebuilding it.
5. Record who must be consulted before each consequential decision, and where stakeholder goals conflict. Do not resolve a conflict silently. Name the principle that settles it, or the owner who must.

Write actors and goals under Problem and outcome in `product-design.md`, and decision owners and applicable authority notes under Needs and requirements. When a matrix is warranted before Specify, keep it there provisionally. At Specify its owner is Roles and permissions in `build-spec.md`; replace earlier definitions with links and preserve IDs.

**Reply:** the actors, the hardest realistic user, the decision owners and the unknown ones, the conflicts, and the permission cells that need approval.
