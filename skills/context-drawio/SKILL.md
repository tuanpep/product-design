---
name: context-drawio
description: "Draw a C4 system context diagram in Draw.io with its built-in C4 shapes: the product as one system, the people who use it, and the systems it depends on, each with its integration ID; and, only when the target project already has an architecture, a containers view of what this slice changes. Use for /context-drawio, when shaping a product that touches other systems, or when people disagree about what is in scope."
disable-model-invocation: true
---

# Context Draw.io

Read [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md), and [principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md). The diagram shows the product's scope and dependencies to everyone, including people outside engineering, following the [C4 model](https://c4model.com/diagrams/system-context). It does not choose an architecture.

1. Name the question the diagram answers, for example: which systems does shift swaps depend on, and who is the system of record? Read the stakeholder map and the scope in `product-design.md`, and Integrations and data in `build-spec.md` when it exists.
2. Write `docs/product-design/<slug>/context.drawio` as uncompressed XML, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the C4 context components](references/context-components.md).
3. **Context page.** Draw the product as one software system. Draw each kind of person who uses it, from the stakeholder map, and each system it exchanges data with directly. Put the people and systems inside the organisation in one boundary, and outside parties beyond it.
4. Describe each element in one plain sentence of what it does for this product. Give each other system its integration ID (I1) and say whether it or the product is the system of record for the data they share. A system without an integration ID goes into Integrations and data first, or becomes an open question.
5. Draw one relationship per direction of use, from the one who acts, labelled with what flows: `Reads shifts, changes shift owner (I1)`. Name a technology only when the target project already uses it.
6. **Containers page.** Draw it only when the target project already has an architecture and the slice changes which part talks to which. Inspect the code or docs first and draw the existing containers as they are. Mark a new or changed container **proposed**, with the reason and an owner. Never invent servers, queues, or frameworks.
7. A dependency that would move personal data to a new party, or that the product cannot work without, is a risk: name it in the note and keep its open question blocking in Assumptions and open questions.
8. Check the diagram against the text: every person is a stakeholder, every system is an integration, and nothing extra. A difference is fixed in the text first, then in the diagram. Check the file: unique ids, every relationship with a source and a target. Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Product experience in `product-design.md` and under Integrations and data in `build-spec.md`, with its question. The text stays the source for stakeholders, scope, and integrations; the diagram references them. A context diagram is **proposed**. It does not test that the integrations exist, perform, or allow these uses.

**Reply:** the file path, the question, the people and systems drawn with their integration IDs, the system of record for each shared kind of data, whether a containers page was drawn and from which source, the risks, and what the diagram does not test.
