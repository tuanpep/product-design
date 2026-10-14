---
name: principle-make-it-testable
description: "Apply when writing a requirement, business rule, or acceptance outcome. Each has a concrete example and an observable result a person can check."
disable-model-invocation: true
---

# Make It Testable

If nobody can tell whether a statement was met, it is a wish, not a requirement. Examples settle what words leave open.

- Replace adjectives such as fast, easy, secure, or intuitive with an observable result, or mark the target unknown
- Give each rule and acceptance outcome concrete examples: one that passes, one that is denied, and one at the boundary
- Write acceptance outcomes as Given, When, Then with real values, from the user's side
- Name how each important behaviour will be checked and by which role
- A statement you cannot check yet is an open question with an owner, not a requirement
