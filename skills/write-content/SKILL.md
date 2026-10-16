---
name: write-content
description: "Write the words a product shows: titles, labels, hints, actions, empty states, confirmations, error messages, and notifications, in plain language ready for localization. Use for /write-content, or while designing screens."
disable-model-invocation: true
---

# Write Content

Read [principle-use-real-content](../principle-use-real-content/SKILL.md), [principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md), and [write-plain-copy](../write-plain-copy/SKILL.md). Content is part of the design, not decoration added after it. Write in the interface language. Rewrite word-for-word drafts; do not gloss them.

1. Use the words users used in discovery and the glossary terms. One concept, one word, everywhere.
2. For each screen, write the title, headings, field labels, hint text, and actions. Name each action by what it does. An empty state says what to do next. A confirmation says what happened and what happens next.
3. Keep a message catalogue: ID (M1), trigger (rule ID or failure), text, and recovery. An error says what happened, how to fix it, and who can help, without blaming the person.
4. For each notification, record channel, trigger, recipient, content, and how to stop receiving it.
5. Follow `write-plain-copy` for voice, sentence length, and the translationese check. Plan for localization: date, number, and currency formats, plurals, and strings that run 30% longer after translation.
6. Content is **proposed**. Legal, policy, or pricing wording needs a named owner.

Write labels into each screen and the catalogue under Content and copy in `screens.md`, using [the screens format](../design-product/references/screens-format.md).

**Reply:** the voice, the message catalogue, the wording that needs an owner, and the terms changed for consistency.
