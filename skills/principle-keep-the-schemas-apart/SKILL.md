---
name: principle-keep-the-schemas-apart
description: "Apply when an API, a screen, and a database schema would be made into copies of each other. Keep the conceptual model, the external contract, and the internal schema separate, and map them explicitly."
disable-model-invocation: true
---

# Keep the Schemas Apart

The conceptual model says what the business keeps. The external contract says what a consumer can ask. The internal schema says how a database stores it. Folding them together couples every consumer to every storage change. The split follows the ANSI/SPARC three-schema architecture. It is not a claim that the package is a DBMS architecture.

- Write the conceptual model in business terms, with no column types, URL paths, or frameworks
- Derive the external contract from the stories and the conceptual model. Hide, combine, or rename a stored fact when the consumer's task needs a different shape
- Derive the internal schema from the conceptual model and the access the stories need. Mark it **proposed**
- Where a contract field or a column is not one glossary attribute, state the mapping
- Diagnose disagreements before editing: changed business meaning belongs to the conceptual owner; intentional external/internal representation differences need explicit mappings; implementation drift belongs to the drifting representation. Never change business meaning merely to match a table or API
