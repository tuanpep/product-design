---
name: dataflow-drawio
description: "Draw a data flow diagram with trust boundaries in Draw.io, using its built-in Threat Modeling shapes: where personal and sensitive data goes, which processes and stores hold it, which flows cross from one owner to another, and the controls and open threats at each crossing. Use for /dataflow-drawio, when a slice handles personal or sensitive data, touches a third party, or needs a privacy or security review."
disable-model-invocation: true
---

# Data flow Draw.io

Read [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md), [principle-spend-less-of-the-world](../principle-spend-less-of-the-world/SKILL.md), and [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md). The diagram shows reviewers where data goes and where control changes hands, following the data flow diagram that the [OWASP threat modelling cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) describes. It finds questions for a security and privacy review; it is not that review.

1. Name the question the diagram answers, for example: where does a nurse's phone number go, and who can read it? Read Domain model, Integrations and data, Business rules, Roles and permissions, and Quality requirements in `build-spec.md`. If the data or integrations are not described, run `model-domain` first.
2. Draw a data flow when the slice handles personal or sensitive data, sends data to another system or a third party, or changes who can read data. A slice with no data leaving the product is clearer as a row in Quality requirements.
3. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the data flow components](references/dataflow-components.md). One data journey keeps `dataflow.drawio`. Each further journey is `NN-<step>/dataflow.drawio`, in the folder of the step whose data it follows, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow).
4. Draw the people and other systems as external entities, what the product does with data as processes, and where it keeps data as stores named with the domain model's entities. Every flow runs to or from a process.
5. Label each flow with the data it carries and the ID it traces to. Tag every flow and store that carries personal or sensitive data. Do not move data the outcome does not need; a flow that no story or rule needs is removed, not drawn.
6. Draw a trust boundary wherever control changes: a person's device, the product, each other system's owner, and each third party. List every flow that crosses a boundary in the note: each crossing is a candidate threat.
7. At each crossing, tag the control that `build-spec.md` already names, by its rule or integration ID. A crossing without a control, or a question about who may read, keep, or share the data, becomes a question in Assumptions and open questions and is tagged as an open threat. Questions about personal data, law, or a third party stay **blocking** until an owner decides.
8. Check the diagram against `build-spec.md`: every store is an entity, every external system is an integration, every control exists, and every open threat has a question. A difference is fixed in `build-spec.md` first, then in the diagram. Check the file: unique cell ids, every flow with a source and a target. Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Quality requirements in `build-spec.md`, with its question, and reference it from Integrations and data. The text stays the source for data, integrations, rules, and permissions; the diagram references them. Do not design encryption, networks, or infrastructure. A data flow diagram is **proposed**. It is not a threat model, a penetration test, a privacy impact assessment, or legal advice.

**Reply:** the file path, the question, the personal and sensitive data and where it goes, every boundary crossing, the controls found, the open threats with their question IDs and owners, any difference found against `build-spec.md`, and what the diagram does not test.
