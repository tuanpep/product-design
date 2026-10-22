---
name: write-content
description: "Write the words people encounter across a product or service: screen copy, notifications, email, assisted-service instructions, and support handoffs. Use for /write-content, while designing screens or off-screen communications, or when rules and outcomes change existing copy."
disable-model-invocation: true
---

# Write Content

Apply [the shared execution contract](../design-product/references/specialist-execution.md). Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Read [the shared content contract](../design-product/references/content-quality.md). Relevant principles: [use real content](../principle-use-real-content/SKILL.md) and [one source of truth](../principle-one-source-of-truth/SKILL.md). Content is part of the service, not decoration added after screens. This skill owns product/service copy, not document prose. Respect the current phase and output cap; it does not open Shape or require screen artifacts by itself.

1. Read the Content baseline and working vocabulary in the proposal, or the owning glossary when it exists. Reuse the users' terms and target language/locale; record unknowns or proposed defaults without treating the document language as proof of the users' language.
2. Walk every in-scope actor task, including off-screen delivery and assisted-service handoffs. For declared screen views, write titles, headings, labels, hints, and actions. Write only the relevant messages; do not generate a technical-state matrix or new views merely to display copy. Name an action by its result. An empty state gives the next useful action.
3. Keep one message catalogue with stable M IDs, trigger/source, text, and recovery. Add audience, placement/channel, variables with examples, action/destination, and approval details only where the context needs them, following the shared contract. An error describes the known outcome and safe next action without blame; do not fabricate a help route or override.
4. For notifications, specify recipient, sender, trigger, channel, subject/title when needed, minimum safe preview/body, access at the destination, delay/failure behavior, and preference/opt-out rules. Do not expose sensitive data or promise that essential service notices can be disabled without a policy source.
5. Check business truth before polishing: distinguish submitted, pending, completed, failed, and unknown results; say what changed and who acts next. Check recovery against permissions and rules. Do not invent timing, prices, guarantees, or exceptions. "Request sent" cannot become "Shift updated" until the owning behavior supports it.
6. Write natural target-language wording; load [the shared plain-copy procedure](../write-plain-copy/references/plain-copy.md) for substantial rewriting or translationese rather than invoking a second skill unconditionally. Plan locale-sensitive dates, times/time zones, numbers, currency, plurals, and long/empty variables. Check text expansion appropriate to the languages; 30% is not a universal guarantee. Do not assemble sentences from fragments.
7. After a rule, lifecycle, permission, or integration changes, reconcile only affected messages and their existing mockup instances. Preserve IDs and unaffected human edits. Where updating a dependent artifact is outside scope, name the stale message/file and required follow-up rather than claiming consistency.
8. Content is **proposed** until its owner accepts it. Legal, policy, pricing, deadlines, and guarantees need an accountable owner/source. Do not invent legally authoritative wording.

Write screen labels with their screens and the catalogue under Content and copy in `screens.md`, using [the screens format](../design-product/references/screens-format.md). Without screen files, write the service copy and catalogue under Product experience in `product-design.md`; do not create `screens.md` just for notifications. If screens are added later, move the catalogue there with the same IDs and replace the old definitions with links. At Design documents, defer detailed interface copy and keep only question-led inline examples; no-screen service communications may stay inline.

**Reply:** the language/locale and voice, catalogue location, consequential messages and channels, wording that needs an owner, terms changed for consistency, and any stale dependent copy. State which content checks ran; copy inspection is not proof of comprehension.
