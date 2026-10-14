# Product Design

Turn a human idea into an evidence-labeled product design, from the problem through a slice someone can build. The proposal records what is given, observed, inferred, proposed, or unknown. A proposal leaves the decision to build with a person.

Run it in the project being designed:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

The result is a design package in `docs/product-design/<slug>/`. Which files appear depends on how far the evidence lets the design go:

| File | What it gives you | Appears at |
| --- | --- | --- |
| `product-design.md` | The decision: problem, evidence, needs, options, recommendation, next gate | always |
| `journey.drawio` | The user's journey as a flowchart, with decisions, exceptions, and handoffs | evaluation, build-slice |
| `process.drawio` | As-is and to-be BPMN swimlane process across roles and systems | when more than one actor acts |
| `context.drawio` | A C4 system context: the product, its users, and the systems it depends on | when the option depends on other systems |
| `sketch.drawio` | A hand-drawn, grayscale sketch of each screen in journey order, with alternative layouts where the choice is open. The agent stops here for you to choose before it details the screens | evaluation, build-slice, when there is an interface |
| `screens.md` | Navigation map, screen inventory, every screen's content, actions, and states, copy | evaluation, build-slice |
| `navigation.drawio` | A navigation map between screens | when a list cannot make the navigation clear |
| `prototype.drawio` | Every screen and state drawn as a real web or mobile layout: browser frame, navigation, sidebar, tables, forms, badges, alerts, with flow arrows between states | evaluation, build-slice |
| `build-spec.md` | Engineer handoff: glossary, roles and permissions, domain model, lifecycle states, business rules, stories with Given/When/Then, quality requirements, rollout, open questions, traceability | draft once a direction is chosen, ready at build-slice |
| `erd.drawio` | An entity relationship diagram with crow's-foot cardinality, and a proposed physical schema when the project has a database | build-slice, when the data has more than two related entities |
| `states.drawio` | A UML state machine for each record with a lifecycle, including failures and the way back | build-slice, when a record has more than two states, a reversal, or a time limit |
| `sequence.drawio` | A UML sequence of who asks whom, with failure and timeout paths | build-slice, when an integration or notification can fail |
| `dataflow.drawio` | Where personal data goes, the trust boundaries it crosses, and the controls and open threats at each crossing | build-slice, when the slice handles personal data or a third party |

A large diagram is split into one file per close flow and grouped in a step folder, for example `01-nurse-ask-cover/journey.drawio` beside `01-nurse-ask-cover/prototype.drawio`, then `02-colleague-accept-cover/`. One flow keeps the name in the table.

Every diagram uses Draw.io's built-in libraries first, so it opens as the real notation: Flowchart, BPMN, Sitemap, Entity Relation tables, UML, C4, and Threat Modeling. Sketches and screen prototypes use basic shapes on purpose, so they can follow the target product's look.

Files follow [output standard 1.1](skills/design-product/references/output-standard.md). The working contract is in [the guide](docs/guide/README.md).

## Install

### Cursor

Import `https://github.com/tuanpep/product-design` from Customize. `.cursor-plugin/marketplace.json` points at this repository root. Reload, then confirm the `design-product` skill, agent, and command.

For a local copy while editing this repo, place it at `~/.cursor/plugins/local/product-design/` and reload Cursor. See [Test plugins locally](https://cursor.com/docs/plugins#test-plugins-locally).

### OpenCode V2

```sh
opencode plugin add github:tuanpep/product-design
```

That adds the plugin to the global OpenCode config. Restart OpenCode, then select the `design-product` agent or run `/design-product`. The command switches the current session to the restricted design agent before prompting; switch back to your coding agent for later implementation. The agent can also run as a subagent. The plugin does not change your configured default agent.

To load this checkout instead of the GitHub package, run `npm install` here and add the absolute path to the product project's `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/absolute/path/to/product-design"]
}
```

Use either the GitHub package or the local path. OpenCode V2 is required. Install and plugin layout are documented at [Plugins](https://v2.opencode.ai/docs/plugins) and [Build a plugin](https://v2.opencode.ai/docs/build/plugins).

## Skills

`/design-product` picks a playbook and calls the other skills as the steps need them. You can also invoke a skill on its own.

| Stage | Skill | Role |
| --- | --- | --- |
| Understand | `/frame-problem` | Separate a requested feature from the people, problem, and outcome. |
| | `/map-stakeholders` | Name actors, the hardest realistic user, decision owners, and a draft permission matrix. |
| | `/discover-needs` | Investigate users, current journeys, constraints, and sources. |
| | `/define-requirements` | Turn that context into stable needs and testable requirements. |
| Shape | `/explore-solutions` | Compare approaches, including no-build, and name the reversing assumption. |
| | `/model-process` | Map the as-is and to-be process as swimlanes, with handoffs and failure paths. |
| | `/context-drawio` | Draw a C4 system context of the product, its users, and the systems it depends on. |
| | `/design-experience` | Describe the chosen approach across the whole journey. |
| | `/sketch-drawio` | Sketch each screen's rough layout in Draw.io, with alternative layouts, for a person to agree before the detail. |
| | `/design-screens` | Write the navigation map and each screen's content, actions, and the states that change it. |
| | `/write-content` | Write labels, actions, empty states, errors, and notifications. |
| | `/prototype-drawio` | Draw each screen and the states `screens.md` lists, with realistic web or mobile components in Draw.io. |
| | `/drawio` | Draw a journey, swimlane process, or navigation map as a Draw.io file. |
| | `/plan-evaluation` | Plan the smallest real test of the assumption that would reverse the recommendation. |
| Specify | `/map-stories` | Build a story map and draw the first-release line. |
| | `/model-domain` | Write the glossary, entities, lifecycle states, and integrations. |
| | `/erd-drawio` | Draw the entities and relationships, and a proposed physical schema when the project has a database. |
| | `/state-drawio` | Draw each record's lifecycle as a UML state machine. |
| | `/sequence-drawio` | Draw an integration or handoff as a UML sequence, with failure and timeout paths. |
| | `/dataflow-drawio` | Draw where personal data goes and which flows cross a trust boundary. |
| | `/define-rules` | Catalogue business rules with decision tables and examples. |
| | `/specify-build` | Assemble `build-spec.md` with Given/When/Then criteria, quality, rollout, and traceability. |
| Check | `/decide-next` | Recommend stop, learn more, test, specify a slice, or hand a named slice to builders. |
| | `/review-design` | Check the whole package for coherence, evidence, and delivery readiness. |

Decision rules are separate skills: seven design principles and five specification-quality principles. Their order is in [Principles](docs/guide/03-principles.md).

## Develop

```sh
npm test
```

The tests check the manifests, skill metadata, links, mocked OpenCode registration/routing, and the output and package structure validators. They do not prove generated output quality or live host enforcement. See [output verification](docs/guide/04-output-standard.md) for the document check and behavioral evaluation corpus. Use Node 22.19 or newer for the current locked dependency tree.

MIT License. Copyright 2026 tuanpep.
