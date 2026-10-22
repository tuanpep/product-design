---
name: assess-threats
description: "Assess what a slice must protect, what can go wrong at each trust boundary, which control applies, and how that control is checked. Use for /assess-threats, or when the security concern is included."
disable-model-invocation: true
---

# Assess Threats

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [protection](../principle-protect-before-you-enable/SKILL.md), [choose the view](../principle-choose-the-view/SKILL.md), [testability](../principle-make-it-testable/SKILL.md), and [single ownership](../principle-one-source-of-truth/SKILL.md). Answer the four [OWASP Threat Modeling](https://owasp.org/www-project-threat-modeling/) questions: what are we protecting, what can go wrong, what are we doing about it, and did we do enough? STRIDE is optional, not a required grid. This is not a penetration test, certification or complete privacy assessment; use [privacy-risk guidance](../design-product/references/privacy-risk.md) for authorized-processing harms.

1. Read Design views in `technical-design.md`. If no security or trust-boundary concern is included, stop. Read `dataflow.drawio` and Integrations and data, Roles and permissions, and Business rules in `build-spec.md`. If personal or sensitive data is in scope and the data-flow diagram does not exist, run `dataflow-drawio` first.
2. Reuse applicable threat models and assess the slice's change. Include consequential misuse and failures affecting assets, identities, permissions and operations within existing boundaries, not only new crossings. For each relevant crossing or abuse case, name the asset, boundary or operational context, what can go wrong, existing or explicitly proposed control, owner, residual risk, and verification check. Give the threat an ID (TH1). Proposed controls do not close blockers without appropriate evidence or attributed risk decisions. The diagram lists crossings; this section owns the assessment. Do not invent crossings just to give every threat a diagram ID.
3. A crossing with no control, or a control nobody owns, becomes a blocking question in Assumptions and open questions. This is the only place that question is opened. Personal data, credentials, and money stay blocking until an owner decides. Do not invent a control to close the row.
4. When the service contract exists, externally observable denials need the appropriate operation response; some mitigations have no caller-visible denial. Add missing responses through `design-contract`, without revealing restricted record existence or sensitive detail. Reconcile affected earlier views when a threat changes the design; do not wait until the end to raise a design-invalidating risk.
5. Check the rows against the data-flow diagram. A boundary that is not on the diagram is added to the diagram's owning text first.

Write the entries under Threats in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md). Link `dataflow.drawio`. The assessment is **proposed**. It does not show that the controls resist an attacker.

**Reply:** the assets, the threats and their controls, the crossings with no control, the blocking questions, and what was not tested.
