---
name: write-plain-copy
description: "Rewrite product copy so it sounds native and is easy to understand. Use for interface text, errors, empty states, notifications, and short service pages, especially when a draft was translated word for word. Triggers: copy, microcopy, plain language, translationese, word-for-word, calque."
disable-model-invocation: true
---

# Write plain copy

Write the words a person reads in the product. Write them in the language the interface uses. If a draft exists in another language, carry the meaning across and write again. Do not translate word for word.

Sources: [GOV.UK clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/), [digital.gov plain language](https://digital.gov/guides/plain-language/writing), [National Archives plain-language principles](https://www.archives.gov/open/plain-writing/10-principles.html), and [Google's guidance on writing for translation](https://developers.google.com/style/translation). Patterns to reject are in [translationese](references/translationese.md).

## Write

1. Name the reader and the one thing they need to do or know. Put that first.
2. Use the words those people already use. One concept, one term, including the same capitalization. Explain a specialist term once, in the same sentence, or drop it.
3. Use everyday words, present tense, and active voice. Address the reader as "you" when the language has a natural direct form. Use passive voice only when who acted does not matter.
4. One idea per sentence. Keep the subject and verb together. Cut words that do not change the meaning.
5. Name the action by its result: "Send request", not "Submit" or "OK". An empty state says what to do next. An error says what happened and how to fix it, without blame. A confirmation says what changed and what happens next.
6. Skip idioms, jokes, metaphors, and culture-bound references. They fail for another language and for people who take words literally.
7. Keep each string able to grow. Plan for dates, numbers, currency, and plurals in the reader's locale. Do not glue a sentence together from word fragments.

## Reject a word-for-word draft

Read the draft aloud in the target language. Rewrite when any of these are true:

- A source-language word was swapped one for one and the sentence is not something a native speaker would say.
- The grammar follows the source language: extra articles, missing articles, source word order, or a noun stack.
- A polite formula, title, or system name was carried over instead of the task.
- Two languages sit in one label.

Write the meaning in a fresh sentence. Then compare it with the draft only to check that no fact, condition, or restriction was dropped.

## Check

- A person can act from the title or the first sentence alone.
- The same thing has the same name on every screen.
- No string is an internal code, a file name, or a word-for-word gloss.
- Legal, policy, and pricing wording stays marked for its owner. Do not invent those sentences.

**Reply:** the language written, the strings, any term you made consistent, and any line that still needs an owner.
