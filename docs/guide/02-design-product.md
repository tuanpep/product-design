# Route work through `/design-product`

`/design-product` matches one of two playbooks, copies that playbook's steps, and calls the other skills as the steps need them. You do not have to name the playbook.

## New idea

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

That matches [new-idea.md](../../skills/design-product/playbooks/new-idea.md) in four stages:

1. **Understand:** frame the problem, map stakeholders, discover needs, define requirements, decide. If discovery says not to build, it stops here with only `product-design.md`.
2. **Shape:** compare options, model the process, design the journey, then sketch the screens in `sketch.drawio`. A large journey, process, or sketch is one file per close flow, such as `01-nurse-ask-cover/sketch.drawio`. The agent stops here and asks which layout to take and whether the screens and their order are right. Ask for the whole package in one pass if you want it to pick a labeled **proposed** option and continue. After your answer it writes `screens.md` and `prototype.drawio`, a Draw.io board of each screen and the states that change it, drawn with real web layout and components, so you can see the product. A large prototype is one file per close flow too.
3. **Specify:** map stories, model the domain, define rules, and write `build-spec.md`. It is `Status: draft` while blockers remain, and lists each blocker with its owner. Reversible questions get a labeled default instead of blocking. Where the slice needs them, the agent draws `erd.drawio`, `states.drawio`, `sequence.drawio`, and `dataflow.drawio` from the build spec, each with Draw.io's built-in notation.
4. **Check:** review the whole package and name the next gate.

Open `prototype.drawio` in Draw.io, diagrams.net, or the Draw.io VS Code extension to see each screen and state side by side. Hand `build-spec.md` to engineers once it says `Status: ready` and a person has decided to invest.

## Revision

```text
/design-product Revise docs/product-design/shift-swaps: three charge nurses said the roster is the source of truth, not the chat.
```

That matches [revise-design.md](../../skills/design-product/playbooks/revise-design.md). The agent withdraws a stale readiness claim, edits only what the new evidence invalidates, and reviews the result again.

## One stage

Invoke a specialist when you only need that stage, for example on an existing package:

```text
/sketch-drawio docs/product-design/shift-swaps
/design-screens docs/product-design/shift-swaps
/prototype-drawio docs/product-design/shift-swaps
/specify-build docs/product-design/shift-swaps
/erd-drawio docs/product-design/shift-swaps
```

The full list is in the [README](../../README.md#skills). Each skill runs only when you name it or the playbook reaches it.

When an owner answers an open question in `build-spec.md`, revise with the answer, for example `/design-product Revise docs/product-design/shift-swaps: the ward manager approved a 48-hour weekly limit (BR2).` The agent replaces the default, marks it approved, and updates every reference.

Next: [Steer with principle names](03-principles.md), then [check output quality](04-output-standard.md).
