---
name: map-stakeholders
description: "Identify the people, roles, systems, and decision owners around a product idea, with their goals, influence, and permissions. Use for /map-stakeholders, at the start of discovery, or when roles, approvals, or ownership are unclear."
disable-model-invocation: true
---

# Map Stakeholders

Read [the evidence contract](../design-product/references/evidence-and-decisions.md). A stakeholder's statement is given, not an observed user need.

1. List every actor that touches the outcome: end users by role, people who approve or support them, people affected but absent from the interface, and external systems. Read [principle-include-the-hardest-case](../principle-include-the-hardest-case/SKILL.md) and name the hardest realistic user.
2. For each actor, record their goal, what they do today, what they would lose if the design changes, and the evidence class of each claim.
3. Name the decision owner for scope, business rules, policy, data, and launch. Use unknown when the owner is not known. Never fill an owner from a guessed job title.
4. Draft a role and permission matrix: actions as rows, roles as columns, each cell allowed, denied, or conditional with its rule ID. Every cell is **proposed** until an owner approves it.
5. Record who must be consulted before each consequential decision, and where stakeholder goals conflict. Do not resolve a conflict silently. Name the principle that settles it, or the owner who must.

Write actors and goals under Problem and outcome in `product-design.md`, and decision owners and the draft permission matrix under Needs and requirements. When a slice is specified, the matrix moves to Roles and permissions in `build-spec.md`, and `product-design.md` links to it instead.

**Reply:** the actors, the hardest realistic user, the decision owners and the unknown ones, the conflicts, and the permission cells that need approval.
