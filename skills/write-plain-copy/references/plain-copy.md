# Plain-copy procedure

Shared by the optional standalone `write-plain-copy` entry and `write-content`. Load for substantial rewriting, unfamiliar target-language wording or translationese, not as a compulsory second skill for every string. `write-content` and [the content contract](../../design-product/references/content-quality.md) retain catalogue and business-truth ownership.

Write in the service language, which may differ from the document language. Carry meaning across languages by writing again, not swapping words one for one.

## Write

1. Name the reader and the one thing they need to do or know. Put that first.
2. Use the words those people already use. One concept, one term, including consistent capitalization. Explain a specialist term once, in the same sentence, or drop it.
3. Use everyday words, present tense and active voice. Address the reader directly when natural in that language. Use passive voice when who acted does not matter.
4. One idea per sentence. Keep subject and verb together; cut words that do not change meaning.
5. Name actions by result: "Send request", not "Submit" or "OK". Empty states give a useful next action; errors explain what happened and safe recovery without blame; confirmations say what changed and what happens next.
6. Avoid idioms, jokes, metaphors and culture-bound references that do not transfer or could be taken literally.
7. Allow strings to grow. Plan locale-sensitive dates, times, numbers, currency and plurals. Do not assemble sentences from fragments.

## Reject word-for-word drafts

Read the target-language draft naturally; do not claim a native-speaker review unless one actually occurred. Rewrite source-language word swaps, unnatural articles/order/noun stacks, carried-over polite formulas/titles/system names, or mixed-language labels. Write the meaning afresh, then compare facts, conditions and restrictions with the source. Consult [translationese patterns](translationese.md) only when relevant.

## Check

- The reader can act from the title/first sentence; the same thing has the same name everywhere.
- No unexplained internal codes, file names or word-for-word glosses appear as user-facing text.
- Legal, policy and pricing wording remains marked for its owner; do not invent authoritative language.
- Apply [the business-truth check](../../design-product/references/content-quality.md#check-business-truth-before-polishing): preserve pending/completed/unknown outcomes, permissions, safe recovery, timing qualifications and privacy. Shorter/friendlier cannot mean less accurate.
- Revise owning strings first, then affected catalogue/mockup/translation instances within authorized scope. Preserve M IDs and unrelated human edits. Report stale dependents when updates are out of scope.

Sources: [GOV.UK clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/), [digital.gov plain language](https://digital.gov/guides/plain-language/writing), [National Archives principles](https://www.archives.gov/open/plain-writing/10-principles.html), and [Google translation guidance](https://developers.google.com/style/translation). Inspection is not participant comprehension evidence.
