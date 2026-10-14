---
name: principle-design-every-state
description: "Apply when specifying a screen, a record with a lifecycle, or an integration. Design the empty, loading, partial, error, denied, and success states, not only the happy path."
disable-model-invocation: true
---

# Design Every State

A product is mostly the states nobody drew. Builders who meet an undesigned state will invent one, and users will meet it first.

- Every screen names its default, empty, loading, partial, error, denied, and success states. Offline or slow applies when the context of use makes it likely
- Every record with a lifecycle names its states, the allowed transitions, who triggers each, and the way back. Include cancelled, expired, failed, and reversed where they can happen
- Every integration names what happens when the other side is slow, down, or returns something unexpected
- A state that cannot happen in this slice says why, rather than being left out
- Each error or denied state names its recovery in the user's words and who can help
