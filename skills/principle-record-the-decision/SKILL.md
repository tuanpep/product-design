---
name: principle-record-the-decision
description: "Apply when a technical choice will be hard to reverse, or sets a precedent for later work. Record the context, the options, the decision, and the consequences. A diagram of the result is not the rationale."
disable-model-invocation: true
---

# Record the Decision

A diagram shows what was chosen. The next person still needs to know why the other options lost, and what the choice makes expensive to change. IEEE 1016-2009 requires design rationale. The [GDS Way](https://gds-way.digital.cabinet-office.gov.uk/standards/architecture-decisions.html) records significant decisions as context, decision, and consequences. A decision record is not the architecture.

- Record a decision when it is hard to reverse, touches safety, money, law, or privacy, or later slices will have to live with it
- State the context, the options considered, the decision, and the consequences, including the cost of changing it
- Label the record **proposed** until a named person accepts it. A proposed record does not make the slice ready when the choice is blocking
- Leave a cheap, local choice as a proposed default in the open questions, not as a decision record
- When a later decision replaces one, mark the earlier record superseded and point to the new one
