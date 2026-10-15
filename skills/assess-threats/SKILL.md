---
name: assess-threats
description: "Assess what a slice must protect, what can go wrong at each trust boundary, which control applies, and how that control is checked. Use for /assess-threats, or when the security concern is included."
disable-model-invocation: true
---

# Assess Threats

Read [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md), [principle-choose-the-view](../principle-choose-the-view/SKILL.md), [principle-make-it-testable](../principle-make-it-testable/SKILL.md), and [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md). Answer the four threat-modeling questions for this slice: what are we protecting, what can go wrong, what are we doing about it, and did we do a good enough job. This follows the [OWASP Threat Modeling](https://owasp.org/www-project-threat-modeling/) questions. STRIDE is an optional prompt, not a required grid. The result is not a penetration test or a certification.

1. Read Design views in `technical-design.md`. If no security or trust-boundary concern is included, stop. Read `dataflow.drawio` and Integrations and data, Roles and permissions, and Business rules in `build-spec.md`. If personal or sensitive data is in scope and the data-flow diagram does not exist, run `dataflow-drawio` first.
2. For each trust-boundary crossing on the data-flow diagram, name the asset, the boundary, what can go wrong, the control that already exists as a rule, permission, or contract error, and the check that would show the control holds. Give the threat an ID (TH1). The diagram lists the crossing. This section owns the threat, the control citation, and the check. Do not copy that assessment back onto the diagram.
3. A crossing with no control, or a control nobody owns, becomes a blocking question in Assumptions and open questions. This is the only place that question is opened. Personal data, credentials, and money stay blocking until an owner decides. Do not invent a control to close the row.
4. When the service contract exists, every denial in this list has a matching error on the operation that would be abused. Add the missing error through `design-contract` rather than only in this section.
5. Check the rows against the data-flow diagram. A boundary that is not on the diagram is added to the diagram's owning text first.

Write the entries under Threats in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Link `dataflow.drawio`. The assessment is **proposed**. It does not show that the controls resist an attacker.

**Reply:** the assets, the threats and their controls, the crossings with no control, the blocking questions, and what was not tested.
