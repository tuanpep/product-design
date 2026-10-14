# Product Design

Turn a human idea into an evidence-labeled product design. The proposal records what is given, observed, inferred, proposed, or unknown, and leaves the decision to build with a person.

## Run

In the project being designed:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

It asks which level to stop at: Understand, Design documents, Mockup, or Full. Name the level to skip that question. Say `advise` for a suggested solution and design in one pass:

```text
/design-product advise Staff coordinate shift swaps in chat, but the roster stays wrong.
```

In Claude Code the command is `/product-design:design-product`. Output lands in `docs/product-design/<slug>/`. What gets written, and the skills behind it, is in the [guide](docs/guide/README.md).

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
