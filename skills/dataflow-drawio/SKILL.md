---
name: dataflow-drawio
description: "Draw a data flow diagram with trust boundaries in Draw.io, using its built-in Threat Modeling shapes: where personal and sensitive data goes, which processes and stores hold it, and which flows cross from one owner to another. Use for /dataflow-drawio, when a slice handles personal or sensitive data, touches a third party, or needs a privacy or security review. assess-threats owns the threats, controls, and blocking questions."
disable-model-invocation: true
---

# Data flow Draw.io

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [protection](../principle-protect-before-you-enable/SKILL.md), [resource/data cost](../principle-spend-less-of-the-world/SKILL.md), and [single ownership](../principle-one-source-of-truth/SKILL.md). The diagram shows data movement and control changes following the [OWASP data-flow method](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). `assess-threats` owns security risks/controls/questions; [privacy-risk guidance](../design-product/references/privacy-risk.md) covers processing harms. The diagram is neither assessment.

1. Name the question the diagram answers, for example: where does a nurse's phone number go, and who can read it? Read Domain model, Integrations and data, Business rules, Roles and permissions, and Quality requirements in `build-spec.md`. If the data or integrations are not described, run `model-domain` first.
2. Draw a data flow when the slice handles personal or sensitive data, sends data to another system or a third party, or changes who can read data. A slice with no data leaving the product is clearer as a row in Quality requirements.
3. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the data flow components](references/dataflow-components.md). One data journey keeps `dataflow.drawio`. Each further journey is `1-<step>/dataflow.drawio`, in the folder of the step whose data it follows, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow).
4. Draw the people and other systems as external entities, what the product does with data as processes, and where it keeps data as stores named with the domain model's entities. Every flow runs to or from a process.
5. Label each flow with the data it carries and the ID it traces to. Tag every flow and store that carries personal or sensitive data. Do not move data the outcome does not need; a flow that no story or rule needs is removed, not drawn.
6. Draw a trust boundary wherever control changes: a person's device, the product, each other system's owner, and each third party. Only a data flow crosses a boundary. List every flow that crosses a boundary in the note: each crossing is a candidate threat.
7. A label may point at a rule or integration ID that `build-spec.md` already has. Do not describe the control, invent a threat ID, or open a question. A crossing with no such ID is listed in the note and left for `assess-threats`.
8. Check the diagram against `build-spec.md`: every store is an entity and every external system is an integration. A difference is fixed in `build-spec.md` first, then in the diagram. Check the file: unique cell ids, every flow with a source and a target, and the geometry check in [Relationship lines](../drawio/references/drawio-file.md#relationship-lines). Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Quality requirements in `build-spec.md`, with its question, and reference it from Integrations and data. The text stays the source for data, integrations, rules, and permissions; the diagram references them. Do not design encryption, networks, or infrastructure. A data flow diagram is **proposed**. It is not a threat assessment, a penetration test, a privacy impact assessment, or legal advice.

**Reply:** the file path, the question, the personal and sensitive data and where it goes, every boundary crossing, any difference found against `build-spec.md`, and what the diagram does not test. Threats and blocking questions are not part of this reply.
