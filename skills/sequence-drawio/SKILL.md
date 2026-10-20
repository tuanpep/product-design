---
name: sequence-drawio
description: "Draw a UML sequence diagram in Draw.io for a scenario that crosses people, the product, and other systems: who asks whom, in what order, what each answer is, and what happens when an integration fails or times out, using alt, opt, and loop frames. Use for /sequence-drawio, after model-domain, or when an integration, a notification, or a handoff could fail or arrive late."
disable-model-invocation: true
---

# Sequence Draw.io

Read [principle-design-every-state](../principle-design-every-state/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [principle-behave-predictably](../principle-behave-predictably/SKILL.md). The diagram draws an interaction that `build-spec.md` already names; it does not design the API. The notation follows the sequence diagram of [UML 2.5.1](https://www.omg.org/spec/UML/2.5.1/), drawn with Draw.io's built-in UML shapes.

1. Name the question the diagram answers, for example: what does each person see when the roster update fails? Read Integrations and data, Business rules, States and lifecycle, and Quality requirements in `build-spec.md`, and the messages in `screens.md`. If the integrations are not described, run `model-domain` first.
2. Draw a sequence only when the order matters: an integration call, a notification, a handoff between people, a timeout, or a retry that a person can notice. A scenario with one actor and one screen is clearer as a journey.
3. Write uncompressed XML in `docs/product-design/<slug>/`, following [the Draw.io file skeleton](../drawio/references/drawio-file.md) and [the sequence components](references/sequence-components.md). One scenario keeps `sequence.drawio`. Each further scenario is `1-<step>/sequence.drawio`, one page, in the step folder of the journey it draws, as [one file per close flow](../drawio/references/drawio-file.md#one-file-per-close-flow).
4. Draw one lifeline per participant: the people involved, the product, and each other system with its integration ID. Put the starter on the left and people who are only told on the right, so most messages run left to right. One scenario per file.
5. Draw the messages top to bottom in the order they happen. Mark each as a call, an asynchronous message, or a return. Label each with what is asked or said and the ID it traces to: a screen (SC), a rule (BR), an integration (I), or a message (M).
6. For every call to another system, draw what happens when it fails, times out, or answers late, inside an `alt` frame with guards that cover every case. Show what each person is told in the failure path, and use the state it leads to from States and lifecycle.
7. Use `opt` for a step that may not happen and `loop` for a repeat with its limit. A timeout, retry limit, or wait that `build-spec.md` does not state is a **proposed** default with an owner, recorded in Assumptions and open questions.
8. Check the diagram against `build-spec.md`: every participant is an actor, the product, or a listed integration; every message ID exists; every failure path ends in a named state. A difference is fixed in `build-spec.md` first, then in the diagram. Check the file: unique cell ids, every message connects two activation bars, every message between lifelines is horizontal, and the geometry check in [Relationship lines](../drawio/references/drawio-file.md#relationship-lines). Open it in Draw.io or diagrams.net before claiming that it renders. If you could not open it, say so.

Link the file under Integrations and data in `build-spec.md` with its question. The text in `build-spec.md` stays the source for integrations, rules, and states; the diagram references them. Do not write endpoint paths, payloads, or code. A sequence diagram is **proposed**. It does not test the other system's real behaviour, response times, or error codes.

**Reply:** the file path, the question, the participants, the failure and timeout paths drawn, the proposed timeouts and retries with owners, any difference found against `build-spec.md`, and what the diagram does not test.
