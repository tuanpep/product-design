---
name: principle-choose-the-view
description: "Apply when a diagram, schema, or interface would be added because a template lists it, or skipped while a stakeholder concern still has no view. Include a view only for a named concern, and give every named concern a view."
disable-model-invocation: true
---

# Choose the View for the Concern

A design description is complete when every concern has a view, and no larger. A fixed gallery of diagrams hides the concerns that matter and invents the ones that do not. This paraphrases viewpoint selection in IEEE 1016-2009 and ISO/IEC/IEEE 42010:2022. It is not a claim of conformance.

- Name the design concern and who holds it before choosing a viewpoint
- Include a view only when that concern is real for this slice. Record the viewpoint and the concern it frames
- Omit a viewpoint that nothing in this slice raises, and say why in one sentence
- Treat a characteristic from [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) as a concern only when a requirement, a risk, or a stakeholder makes it real here
- An extra diagram does not make the design more ready
