---
name: principle-settle-the-logical-model
description: "Apply when a database design would choose types, indexes, or a product before each entity has an identifier, each relationship has cardinality, and the model is in third normal form or a recorded exception."
disable-model-invocation: true
---

# Settle the Logical Model

Types and indexes implement a model. They do not discover it. A logical model names entities, attributes, identifiers, and relationships without a database product. British Columbia's data-modeling standard requires that logical model to be in third normal form, and FIPS PUB 184 defines that form: every attribute depends on the whole primary key, and on nothing else. This principle is not a claim of conformance to either document.

- Give every entity one primary identifier, and state cardinality and optionality at both ends of every relationship
- Keep the business attributes that identify the thing in the world, even when a surrogate identifier is proposed
- Hold the model in third normal form. An attribute stores one value. A fact that does not depend on the whole key becomes its own entity
- Record a deliberate exception with the anomaly it accepts and the story that forces it. An exception that copies personal data, or that would lose history, stays blocking until an owner decides
- Choose column types, indexes, delete behavior, and a database product only after this model is written. Mark those choices **proposed**
