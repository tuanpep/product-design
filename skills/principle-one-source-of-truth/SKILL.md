---
name: principle-one-source-of-truth
description: "Apply when a term, rule, state, threshold, or message appears in more than one place. Define it once with a stable ID and reference it everywhere else."
disable-model-invocation: true
---

# One Source of Truth

Two copies of a rule become two rules. Contradictions in a specification come from restating, not from disagreeing.

- Define each business term once in the glossary and use exactly that word in screens, copy, rules, and stories
- Give each rule, state, message, and screen a stable ID, and reference the ID instead of rewriting its content
- When a fact changes, change it where it is owned and check every reference
- Name the system of record for each piece of data. A second copy needs a reason and a way to stay in step
- If two sources disagree, record the conflict and its owner. Do not pick one silently
