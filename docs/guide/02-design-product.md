# Route work through `/design-product`

`/design-product` matches one of two playbooks, copies that playbook's steps, and calls the other skills as the steps need them. You do not have to name the playbook.

## New idea

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

That matches [new-idea.md](../../skills/design-product/playbooks/new-idea.md): frame, discover, define, decide, explore, design, plan the test, specify the slice, then review. If discovery says not to build, it stops there.

## Revision

```text
/design-product Revise docs/product-design/shift-swaps: three charge nurses said the roster is the source of truth, not the chat.
```

That matches [revise-design.md](../../skills/design-product/playbooks/revise-design.md). The agent withdraws a stale readiness claim, edits only what the new evidence invalidates, and reviews the result again.

## One stage

Invoke a specialist when you only need that stage: `/frame-problem`, `/discover-needs`, `/define-requirements`, `/explore-solutions`, `/design-experience`, `/drawio`, `/plan-evaluation`, `/specify-build`, `/decide-next`, or `/review-design`. `/drawio` writes a `.drawio` journey flow or screen prototype next to the proposal. Each skill runs only when you name it or the playbook reaches it.

Next: [Steer with principle names](03-principles.md).
