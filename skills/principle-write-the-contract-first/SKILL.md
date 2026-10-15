---
name: principle-write-the-contract-first
description: "Apply when builders would have to infer a service interface from screens, a schema, or code. Write the interface description before implementation, and include only the operations a story or integration needs."
disable-model-invocation: true
---

# Write the Contract First

The interface is the agreement among builders, callers, and testers. A screen shows one use of it. A table stores one implementation of it. Neither is the contract. The OpenAPI Initiative and the [GOV.UK API technical and data standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards) both put that description before code.

- Write the machine-readable interface before any implementation of that boundary
- Describe an HTTP boundary with OpenAPI 3 and an event boundary with AsyncAPI. Use another description only when the project already standardizes it, and name that standard
- Add an operation because a story, a rule, or an integration needs it. A resource does not automatically receive create, read, update, and delete
- Give every operation a concrete success example and the error response a caller must handle
- Leave authentication, a limit, or a field unknown when it is unknown. Do not invent it to finish the file
