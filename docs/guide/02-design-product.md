# Route work through `/design-product`

`/design-product` matches one of two playbooks, copies that playbook's steps, and calls the other skills as the steps need them. You do not have to name the playbook.

## New idea

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

That matches [new-idea.md](../../skills/design-product/playbooks/new-idea.md). Before it writes anything, guided mode asks which level to run, unless your message already names one:

1. **Understand.** Problem, needs, and whether to continue. Only `product-design.md`.
2. **Design documents.** The proposal, the journey, and the process. No screens.
3. **Mockup.** Screens and a Draw.io mockup. When a layout option is open, guided mode stops to choose it.
4. **Full.** The whole package in one pass, including the build spec.

## Advise mode

```text
/design-product advise Staff coordinate shift swaps in chat, but the roster stays wrong.
```

That uses the same playbook with the stops removed, as [advise-mode.md](../../skills/design-product/references/advise-mode.md) defines. The agent does not ask which level to run, which layout to take, or any other question that would pause the package. With no level named, it runs Full and records that choice as proposed. It recommends one option at each open choice, names the principle that decided it, and keeps writing screens, the mockup, and a draft build spec.

A hard choice, such as safety, money, law, or privacy, still gets a recommended default, labeled **proposed — owner must confirm**. That confirmation keeps `Status: draft`. It does not stop the run. `advise mockup` caps the run at the mockup and still does not ask you to pick the layout.

The four stages under those levels:

1. **Understand:** frame the problem, map stakeholders, discover needs, define requirements, decide. If discovery says not to build, it stops here with only `product-design.md`.
2. **Shape:** compare options, model the process, design the journey, then write `screens.md` and `mockup.drawio`. A large journey, process, or mockup is one file per close flow, such as `1-nurse-ask-cover/mockup.drawio`. The mockup is a Draw.io wireframe of every screen and state, drawn with the Mockup library. At Mockup, when a layout option is open, guided mode stops and asks which layout to take and whether the screens and their order are right. At Full, and in advise mode, it picks a labeled **proposed** option and continues.
3. **Specify:** only at Full. Map stories, model the domain, define rules, and write `build-spec.md`. It is `Status: draft` while blockers remain, and lists each blocker with its owner. Reversible questions get a labeled default instead of blocking. Where the slice needs them, the agent draws `erd.drawio`, `states.drawio`, `sequence.drawio`, and `dataflow.drawio` from the build spec, each with Draw.io's built-in notation.
4. **Check:** review what this level wrote and name the next gate.

Open `mockup.drawio` in Draw.io, diagrams.net, or the Draw.io VS Code extension to see each screen and state side by side. Hand `build-spec.md` to engineers once it says `Status: ready` and a person has decided to invest.

## Revision

```text
/design-product Revise docs/product-design/shift-swaps: three charge nurses said the roster is the source of truth, not the chat.
```

That matches [revise-design.md](../../skills/design-product/playbooks/revise-design.md). The agent withdraws a stale readiness claim, edits only what the new evidence invalidates, and reviews the result again.

## One stage

Invoke a specialist when you only need that stage, for example on an existing package:

```text
/design-screens docs/product-design/shift-swaps
/mockup-drawio docs/product-design/shift-swaps
/specify-build docs/product-design/shift-swaps
/erd-drawio docs/product-design/shift-swaps
```

The full list is in the [README](../../README.md#skills). Each skill runs only when you name it or the playbook reaches it.

When an owner answers an open question in `build-spec.md`, revise with the answer, for example `/design-product Revise docs/product-design/shift-swaps: the ward manager approved a 48-hour weekly limit (BR2).` The agent replaces the default, marks it approved, and updates every reference.

Next: [Steer with principle names](03-principles.md), then [check output quality](04-output-standard.md).
