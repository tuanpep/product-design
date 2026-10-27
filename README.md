# Product Design

Turn a human idea into an evidence-labeled product design. **Essentials only:** discovery, document Shape, and an optional build spec. No screens, mockups, Draw.io, or technical design.

## Run

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

Phases: **Understand → Shape → Specify** (Full only). Say `next` to advance. Default Shape is **design-documents**. Levels: `understand` | `design-documents` | `full`.

Output: `docs/product-design/<slug>/product-design.md`, plus `build-spec.md` when Full Specify is open.

## Install

**Cursor.** Import `https://github.com/tuanpep/product-design`, or place this checkout at `~/.cursor/plugins/local/product-design/`.

**OpenCode V2.**

```sh
opencode plugin add github:tuanpep/product-design
```

Then `/setup-product-design` for the four roles: design-product, review-design, design-research, design-author.

## Develop

```sh
npm run sync:agents
npm test
```

MIT License. Copyright 2026 tuanpep.
