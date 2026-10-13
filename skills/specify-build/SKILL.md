---
name: specify-build
description: "Specify a chosen product design so someone else can build and check a first useful slice. Use for /specify-build, or when writing stories, acceptance outcomes, and verification."
disable-model-invocation: true
---

# Specify Build

Read the story shape and requirement checks in [the workflow reference](../design-product/references/workflow.md), and the precedence in [the principles index](../design-product/references/principles.md). Read the leaf for any principle the slice claims to meet.

1. Communicate the chosen design to implementers: context of use, needs, the approach and the rejected alternatives, journeys, exceptions, rules, and support or offline handoffs.
2. Define the first useful outcome and what explicitly waits.
3. Write each slice as who needs it, what they need to do, and why. Add acceptance outcomes that say when the user need is met, and link them to the need, evidence, or rule they come from. Keep implementation choices out of those outcomes.
4. Split a slice that cannot be checked inside one iteration.
5. For every important behavior, name how it will be checked. Where the slice depends on them, include accessibility, privacy, failure of the online channel, and transition from the current service.
6. Apply the requirement checks at this level. A failed check becomes an unknown or a smaller slice, not invented precision.

The slice must be able to meet the principles it claims. If a higher principle cannot be met in this slice, say so and whose problem remains. A specified slice is **proposed** until a person decides to invest. Do not write production code. Do not treat the specification as proof that users succeed or as permission to launch.

**Reply:** the first useful outcome, what waits, the stories and acceptance outcomes, and any principle this slice cannot yet meet.
