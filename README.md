# Product Design

Turn a human idea into an evidence-labeled product design using four essential **Documentero-based templates**: Software Requirements Specification, Test Plan, Test Case and Project Requirements Matrix. Local Markdown, no account or external upload. No screens, mockups, Draw.io, or technical design.

## Run

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

Phases: **Understand → Shape → Specify** (Full only). Say `next` to advance. Default Shape is **design-documents**. Levels: `understand` | `design-documents` | `full`.

Output under `docs/product-design/<slug>/`:

| Phase | Artifacts |
| --- | --- |
| Understand | `product-design.md` — evidence-led decision brief |
| Shape | Brief + `test-plan.md` — evaluation plan with cases |
| Specify (Full) | Brief + `build-spec.md` — SRS with requirements matrix; extend the plan with verification cases |

Keep requirements/rules/outcomes in the SRS and procedures/results in the plan. A planned check is not a pass; a ready spec is not permission to build. [Template selection, sources and migration](skills/design-product/references/documentero-templates.md) explain the adaptations and optional manual Word/Excel use. Original Office templates and automated DOCX/XLSX generation are not bundled.

## Install

**Cursor.** Import `https://github.com/tuanpep/product-design`, or place this checkout at `~/.cursor/plugins/local/product-design/`.

**OpenCode V2.**

```sh
opencode plugin add github:tuanpep/product-design
```

Then `/setup-product-design` for the four roles: design-product, review-design, design-research, design-author.

## Develop

Edit `agents/*.md` as the prompt source and keep the matching `.opencode/agents/*.md` bodies and `paseo/shared/agent-prompts.mjs` entries in sync manually. Preserve each host's frontmatter and permission declarations.

No test suite, output validator, evaluation recorder or prompt-sync script is bundled. Review packages against [the output standard](skills/design-product/references/output-standard.md) and verify host behavior in an isolated workspace.

MIT License. Copyright 2026 tuanpep.
