# Product Design

Turn a human idea into an evidence-labeled product design. The proposal records what is given, observed, inferred, proposed, or unknown, and leaves the decision to build with a person.

## Run

In the project being designed:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

If the idea is too general, it first interviews you in small turns to establish the actor, concrete task/current workflow, problem or opportunity, outcome, scope, and critical constraints. A sufficient brief skips this interview. See the [context gate](skills/design-product/references/discovery-interview.md).

Say `next` when you want the next phase. That leaves Understand and continues into Shape. It does not ask you to confirm the summary again, pick a level, or answer another discovery question. Facts you have not given stay unknown. Name a level — Understand, Design documents, Mockup, or Full — when you want a shorter or longer stop. With no level, `next` runs Shape through the mockup.

Say `advise` for a proposed recommendation inside the open phase. Full permits the build specification once Specify is opened; technical views require the separately requested `/technical-design` phase. Neither the level nor advise opens later phases or approves a build.

```text
/design-product advise Staff coordinate shift swaps in chat, but the roster stays wrong.
```

In Claude Code the command is `/product-design:design-product`. Output lands in `docs/product-design/<slug>/`. What gets written, and the skills behind it, is in the [guide](docs/guide/README.md).

Neither `advise` nor `Full` skips the first interview on a vague brief. If you forbid questions and do not ask to continue, an underspecified request receives only a discovery summary, gaps, and research plan. Saying `next` anyway continues, with the gaps left unknown rather than invented. Unknown end-user facts can instead become a hypothetical exploration premise you agreed to, never fabricated validation.

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

On a fresh OpenCode install, run:

```text
/setup-product-design
```

This initializes **this plugin's agents and model choices only**. Choose an available model or `inherit` for each product/technical/review primary and research/document/artifact leaf. The plugin checks model availability and tool support, saves choices in its own storage, and reloads its agent definitions. It does not change your provider, credentials, global/default model, default agent, other plugins or project files. It does not infer which model is fastest or cheapest. Run `/setup-product-design status` to inspect choices or `/setup-product-design cancel` to leave setup. See [fresh-install setup](docs/guide/06-orchestration-and-tokens.md#fresh-install-agent-setup).

**Google Antigravity.**

```sh
agy plugin install https://github.com/tuanpep/product-design
```

**Claude Code.**

```sh
claude plugin marketplace add tuanpep/product-design
claude plugin install product-design@product-design
```

**Paseo.** Turn on **Enable plugins** under Settings → Plugins, then install this plugin on the daemon. Plugins are trusted code: the server runs as the daemon user, and the client runs inside the Paseo app.

```sh
paseo plugin install /absolute/path/to/product-design/paseo
```

From Git, the plugin is the `paseo` directory. The skills stay in the repository beside it:

```sh
paseo plugin add github:tuanpep/product-design:paseo
```

Focus an agent in the project being designed and run `/design-product` or `/technical-design`. The send-only Paseo adapter refuses `/review-design` because it cannot enforce read-only tools; run that review in the configured underlying host profile. The same actions and limitation appear in the command center. In this repository the agent reads `skills/` directly. In other projects it copies the catalog to `.paseo/product-design/skills`; leave `.paseo/` uncommitted. Open **Product design packages** for packages under `docs/product-design/`.

## Quick mockups without the full workflow

The canonical mockup reference kit uses **Ant Design light** (`antd@6.6.7`) with documented contrast and density adaptations. Browse the [16-panel editable component board](skills/mockup-drawio/references/component-recipes.drawio), [component recipes](skills/mockup-drawio/references/extended-components.md), and [theme/component mappings](skills/mockup-drawio/references/web-components.md). These are static Draw.io shapes, not a running React prototype; no Ant Design runtime dependency is needed.

The [input-type catalogue](skills/mockup-drawio/references/input-types.md) and [14-panel input board](skills/mockup-drawio/references/input-types.drawio) define text/contact/secret, numeric, temporal, selection, range and color inputs, including storage types, validation, recovery and read-only/unavailable states.

Use `/sketch-drawio` for a small editable UI mockup with labeled screen-to-screen arrows. It creates compact JSON plus a native `.drawio` file, using a bundled renderer rather than model-written XML boilerplate. No design package or MCP is required; Node.js 20.0+ is needed. Manual diagram edits are protected against overwrite. See [quick connected-screen mockups](docs/guide/07-quick-mockups.md).

This is standalone exploration, not the canonical `/mockup-drawio` handoff. Keep sketches outside product-design packages; existing phase and complete-view requirements remain unchanged. Token savings are not yet measured.

## Workers and usage

Each primary stays specialized: `design-product` coordinates product phases, `technical-design` coordinates technical design, and primary `review-design` coordinates read-only review. They keep human decisions and integration judgment, while native OpenCode subagents execute research, assigned Markdown authoring (`design-author`), specified diagrams and review. Product/technical roots may launch the four design leaves; the review root may launch only review/research. Runtime blocks direct primary mutations, execute/shell/MCP and spawning from every child. Writer permissions cover package/extension patterns, not exact task files. Owners manage at most two concurrent read-only tasks, twelve launches per request and serialized writers; these are procedures, not scheduler guarantees. Small work uses one leaf, not a compulsory swarm. Other hosts need equivalent role controls. No viewer is supplied: authorized writes may proceed, with rendering unverified unless actually viewed. Models/steps and opt-in telemetry remain configurable; native child usage coverage is incomplete, and speed and token savings are unmeasured. See [orchestration, host limitations and token accounting](docs/guide/06-orchestration-and-tokens.md).

## Develop

```sh
npm run sync:agents # after editing canonical agents/*.md
npm test
```

MIT License. Copyright 2026 tuanpep.
