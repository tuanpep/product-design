---
name: write-content
description: "Write the words people encounter across a product or service: notifications, email, assisted-service instructions, and support handoffs. Use for /write-content while shaping experience or when rules change existing copy."
disable-model-invocation: true
---

# Write Content

Load [the shared execution contract](../design-product/references/specialist-execution.md) only for a direct call without an owner, or a scope/policy conflict. Prefer the owner's kernel and active pack. Principle links below are selective candidates, not mandatory preloads; read a leaf before citing it.

Read [the shared content contract](../design-product/references/content-quality.md). Relevant principles: [use real content](../principle-use-real-content/SKILL.md) and [one source of truth](../principle-one-source-of-truth/SKILL.md). This skill owns service copy, not document prose. Do not create screens.md or mockups.

1. Read the Content baseline and working vocabulary in the proposal, or the glossary when it exists. Reuse the users' terms and target language/locale.
2. Walk every in-scope actor task, including off-screen delivery and assisted-service handoffs. Write only relevant messages; do not invent a technical-state matrix.
3. Keep one message catalogue with stable M IDs under Product experience in `product-design.md`.
4. For notifications, specify recipient, sender, trigger, channel, safe preview/body, access at destination, delay/failure behavior, and opt-out rules without exposing sensitive data.
5. Check business truth before polishing: pending/completed/failed/unknown; say what changed and who acts next.
6. Write natural target-language wording; load [plain-copy](../write-plain-copy/references/plain-copy.md) for substantial rewriting or translationese.
7. After a rule, lifecycle, permission, or integration change, reconcile only affected messages. Name stale dependents when out of scope.
8. Content is **proposed** until its owner accepts it.

**Reply:** language/locale and voice, catalogue location, consequential messages, wording that needs an owner, and checks run.
