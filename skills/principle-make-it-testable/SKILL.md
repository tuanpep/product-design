---
name: principle-make-it-testable
description: "Apply when writing a requirement, business rule, or acceptance outcome. Each has a concrete example and an observable result a person can check."
disable-model-invocation: true
---

# Make It Testable

If nobody can tell whether a statement was met, it is a wish, not a requirement. Examples settle what words leave open.

- Replace adjectives such as fast, easy, secure, or intuitive with an observable result, or mark the target unknown
- Use concrete examples to distinguish outcomes and material boundaries; include denied and boundary cases where applicable, not as a quota for every outcome. Preserve consequential interacting-condition coverage and reference shared examples instead of multiplying equivalents
- Write acceptance outcomes as Given, When, Then with real values, from the user's side
- Name how each important behaviour will be checked and by which role
- A statement you cannot check yet is an open question with an owner, not a requirement
