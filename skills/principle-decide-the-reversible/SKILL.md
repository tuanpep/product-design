---
name: principle-decide-the-reversible
description: "Apply when an open question would leave a builder guessing. Propose a labeled default for a reversible choice and name who can change it. Keep only irreversible, harmful, or owner-reserved choices open."
disable-model-invocation: true
---

# Decide the Reversible

An unanswered question in a specification is answered later by whoever writes the code. A labeled default is more honest than a silent guess.

- For a choice that is cheap to change later, propose a default, label it **proposed**, give the reason, and name who can change it
- Keep a question open, and blocking, when the choice is hard to reverse, touches safety, money, law, or privacy, or belongs to a named owner
- A default is not evidence. It never upgrades an unknown to observed or approved
- List every default in one place so an owner can review them together
- Say what would change if the default turns out wrong
