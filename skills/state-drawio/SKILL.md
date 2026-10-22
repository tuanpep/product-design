---
name: state-drawio
description: "Draw a UML state machine in Draw.io for each record with a lifecycle: states, transitions labelled event [guard] / effect, time-triggered transitions, failure and recovery states, terminal states, and the way back. Use for /state-drawio, after model-domain, or when a record has more than two states, a reversal, or a time limit."
disable-model-invocation: true
---

# State Draw.io

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Relevant principles: [meaningful states](../principle-design-every-state/SKILL.md), [single ownership](../principle-one-source-of-truth/SKILL.md), and [predictable behavior](../principle-behave-predictably/SKILL.md). Draw the owning state table in `build-spec.md`, without adding states it lacks. Use simplified [UML 2.5.1 state machines](https://www.omg.org/spec/UML/2.5.1/) for readers outside engineering.

1. Name the question the diagram answers, for example: what happens to a cover request when nobody answers? Read States and lifecycle, Business rules, and Integrations and data in `build-spec.md`. If the state table does not exist, run `model-domain` first.
2. Draw a lifecycle when the record has more than two states, a reversal, a time limit, or an integration that can fail. A two-state record with no way back is clearer as a row in the table.
3. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the state components](references/state-components.md). One entity keeps `states.drawio`. Each further entity is `1-<entity>/states.drawio`, named with its glossary term and numbered in parent/child index order, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow). Put it in the step folder when that step owns the record.
4. Draw one initial pseudostate at the left, then every state from the table, named exactly as the table names it. The main path runs left to right, and a normal end sits at the right. Put exceptions, failures, and the way back on the row below. A transition back to the same state is a small loop beside that state.
5. Label each transition `event [guard] / effect`: the event or actor that triggers it, the guarding rule ID in square brackets, and the side effect such as a message ID, a notification, or an integration call. Leave out a part that does not apply. A transition triggered by time, such as an expiry, is dashed and names the time in its event.
6. When one event can lead to different states, draw a choice pseudostate with guarded transitions covering the modeled outcomes. Do not invent a failure state for every integration error: a transient failed read may leave business state unchanged, and an ambiguous write may require reconciliation rather than definitive failure. Draw only states supported by the owning table; put interaction-only failures in the integration/sequence description and propose any necessary lifecycle change there first.
7. Mark a state with no way out as terminal. For every terminal state that a person could reach by mistake, show the way back, or say in the note why there is none and who can help.
8. Check the diagram against the table: every state, every allowed transition, and nothing extra. A difference is fixed in `build-spec.md` first, then in the diagram. Check the file: unique cell ids, every transition with a source and a target, and the geometry check in [Relationship lines](../drawio/references/drawio-file.md#relationship-lines). Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under States and lifecycle in `build-spec.md` with its question. Screens show each state through the states in `screens.md`; reference the state by name rather than restating it. A state machine is **proposed**. It does not test that the product enforces the transitions or that people understand them.

**Reply:** the file path, the question, the entities drawn, the failure and terminal states, the ways back, any difference found between the diagram and the state table, and what the diagram does not test.
