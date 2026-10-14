---
name: principle-design-every-state
description: "Apply when specifying a screen, a record with a lifecycle, or an integration. Design each state a person can reach that changes what they see or can do. Leave out a state that cannot happen or does not change the screen."
disable-model-invocation: true
---

# Design Every State

A product is mostly the states nobody drew. Builders who meet an undesigned state will invent one, and users will meet it first.

- A screen lists default, plus any state a person can reach that changes what they see or can do. Empty, error, and denied belong when the screen can be empty, fail, or refuse. Loading, partial, success, and offline belong when they change this screen
- Leave out a screen state that cannot happen, that another screen already shows, or that leaves this screen unchanged. Do not list the ones left out
- Every record with a lifecycle names its states, the allowed transitions, who triggers each, and the way back. Include cancelled, expired, failed, and reversed where they can happen
- Every integration names what happens when the other side is slow, down, or returns something unexpected
- Each error or denied state that is listed names its recovery in the user's words and who can help
