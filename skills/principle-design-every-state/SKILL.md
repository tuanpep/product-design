---
name: principle-design-every-state
description: "Apply when a business journey, lifecycle, or integration has consequential branches. Preserve recovery and safety without drawing a technical UI-state matrix."
disable-model-invocation: true
---

# Design Every State

A product is mostly the states nobody drew. Builders who meet an undesigned state will invent one, and users will meet it first.

- Start with the business task and its meaningful outcomes: pending approval, approved, rejected, withdrawn, blocked, fulfilled, or closed where applicable. Draw views that change a decision, responsibility, next action, or handoff
- Every record with a lifecycle names its states, the allowed transitions, who triggers each, and the way back. Include cancelled, expired, failed, and reversed where they can happen
- Every integration names what happens when the other side is slow, down, or returns something unexpected
- Do not require empty, loading, partial, error, denied, success, and offline frames for every screen. Shared technical behavior belongs in concise specification notes; draw an exception only when consequential to the business journey or explicitly requested
- Each error or denied state names its recovery in the user's words and who can help
