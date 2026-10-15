---
name: design-contract
description: "Write the service contract for a slice before implementation: an OpenAPI description for HTTP, an AsyncAPI description for events, and problem details for errors. Use for /design-contract, or when the interface view is included."
disable-model-invocation: true
---

# Design Contract

Read [principle-write-the-contract-first](../principle-write-the-contract-first/SKILL.md), [principle-prefer-the-standard-method](../principle-prefer-the-standard-method/SKILL.md), [principle-keep-the-schemas-apart](../principle-keep-the-schemas-apart/SKILL.md), [principle-make-it-testable](../principle-make-it-testable/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [principle-use-real-content](../principle-use-real-content/SKILL.md). The contract is the external schema. Callers, builders, and testers can implement against it. It is not server code, and it is not a copy of the screens or the tables.

1. Read Design views in `technical-design.md` and the stories, rules, and domain model in `build-spec.md`. If the interface view is omitted, stop. If those sources are missing, run the owning skill first.
2. List resources from the tasks callers perform, using glossary terms. A resource exists when a caller can name one instance. Give it a relationship to its parent when the path needs one. Do not create a resource for every entity, and do not create one for every screen.
3. For each story or integration that crosses an HTTP boundary, add the operation that story needs. Prefer the standard methods: list and create on a collection, get, update, and delete on one resource. Use a custom operation when the action is a guarded transition, such as accept or cancel, and point it at the state and the rule. Give the operation an ID (OP1).
4. Write `openapi.yaml` at the package root. Use the OpenAPI 3 minor version the project already standardizes, citing `survey-existing` when it recorded one, or 3.1.0 when it does not. Include `info`, a relative `servers` URL, `paths`, and `components.schemas`. Each operation has an `operationId`, a summary, its parameters, a request body when it sends one, a success response with an example that uses realistic values, and an error response of `application/problem+json` as defined by [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html). Put `x-serves`, `x-rules`, and `x-entity` on the operation so the traces stay machine-readable.
5. A collection a story can grow without a known small bound uses a page size and a continuation token. Mark that mechanism **proposed**. A create that a double submit would duplicate uses an idempotency key, also **proposed**.
6. Describe authentication with the scheme `survey-existing` recorded, or the scheme the project already uses when that survey did not run. When the scheme is unknown, omit a fake scheme, say so in Service contract, and add a question. If the operation reads or changes personal data, that question is blocking.
7. When a message is sent or received across the product boundary, write `asyncapi.yaml` for those channels only. Do not convert the HTTP file into events, and do not emit an event for every state change unless a consumer story needs it. Point each message at its story and glossary term.
8. A contract field that renames, hides, or combines conceptual attributes states that mapping in Service contract. A field with no glossary term goes back to `model-domain` first. A field that copies a physical column name for its own sake is rewritten from the caller's task.
9. Check the files: every operation traces to a story, every error a rule can cause has a problem response, and examples match the schema. Do not write server stubs, client code, or SQL.

Write the operation list under Service contract in `technical-design.md` using [the technical design format](../design-product/references/technical-design-format.md), and link the files. The YAML is **proposed**. It does not prove the service performs, authorizes correctly, or is safe to expose.

**Reply:** the resources, the operations and the stories they serve, any event channels, the mappings that are not one field to one attribute, the unknown authentication or limits, and what the contract does not implement.
