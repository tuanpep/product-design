# Product Design

Turn a human idea into an evidence-labeled product design. The proposal records what is given, observed, inferred, proposed, or unknown, and leaves the decision to build with a person.

## Run

In the project being designed:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

If the idea is too general, it first interviews you in small turns to establish the actor, concrete task/current workflow, problem or opportunity, outcome, scope, and critical constraints. It summarizes that understanding for confirmation before shaping a solution. A sufficient brief skips this interview. See the [context gate](skills/design-product/references/discovery-interview.md).

It asks which level to stop at: Understand, Design documents, Mockup, or Full. Name the level to skip that question. Say `advise` for a suggested solution and design in one pass once enough context is known. Full includes the technical views the slice's concerns require, such as the information model and the service contract, and omits a view that no concern needs.

```text
/design-product advise Staff coordinate shift swaps in chat, but the roster stays wrong.
```

In Claude Code the command is `/product-design:design-product`. Output lands in `docs/product-design/<slug>/`. What gets written, and the skills behind it, is in the [guide](docs/guide/README.md).

Neither `advise` nor `Full` bypasses missing core context. If you forbid questions, an underspecified request receives only a discovery summary, gaps, and research plan—not speculative screens or a build spec. Unknown end-user facts can instead become a human-approved hypothetical exploration premise, never fabricated validation.

## How it learns before designing

Mockups are **business-journey first**: initiation → decisions → task execution and role handoffs → confirmation → tracking → completion, with parallel work and important business exceptions shown explicitly. Setup and post-completion support are separate from daily work. `screens.md` declares ordered **Views:** such as `default; awaiting-approval; approved; withdrawal-request`; the validator checks their frames and order. Routine loading, empty-result, validation, permission, and network feedback is documented briefly, not expanded into a mandatory technical UI-state matrix. Draw those exceptions only when they materially change the business action or risk, or when detailed UI states are explicitly requested. Existing declared **States:** remain supported.

The workflow connects the decision and user/service outcomes to source-backed findings, a focused opportunity, alternative approaches, and the assumptions worth testing. It plans the smallest useful investigation **before** detailed screens. Early learning material can be a short scenario in the proposal or linked research material; the complete `mockup.drawio` remains the screen/state design artifact, not proof of usability. See the [breaking naming migration](docs/mockup-migration.md) for existing packages and commands.

Supply real research results to revise a package: the agent separates observations from interpretation, records limitations, and updates the recommendation rather than treating a plan as evidence. A Full handoff also names who will review outcome signals after release and what could trigger another discovery cycle. Building, running participant sessions, and operating the service require people or separate tasks.

The four levels cap output, not evidence maturity or approval. See the [learning loop](skills/design-product/references/learning-loop.md) and [manual regression scenarios](docs/discovery-interview-regressions.md).

## Install

**Cursor.** Import `https://github.com/tuanpep/product-design` from Customize, then reload. To edit this checkout, place it at `~/.cursor/plugins/local/product-design/`.

**OpenCode V2.**

```sh
opencode plugin add github:tuanpep/product-design
```

**Google Antigravity.**

```sh
agy plugin install https://github.com/tuanpep/product-design
```

**Claude Code.**

```sh
claude plugin marketplace add tuanpep/product-design
claude plugin install product-design@product-design
```

## Develop

```sh
npm test
```

MIT License. Copyright 2026 tuanpep.
