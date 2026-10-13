# Product Design

Turn a human idea into an evidence-labeled product design, from the problem through a slice someone can build. The proposal records what is given, observed, inferred, proposed, or unknown. A proposal leaves the decision to build with a person.

Run it in the project being designed:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

The result is `docs/product-design/<slug>/product-design.md`, with Draw.io journey and screen files beside it when a flow or prototype is needed. The working contract is in [the guide](docs/guide/README.md).

## Install

### Cursor

Import `https://github.com/tuanpep/product-design` from Customize. `.cursor-plugin/marketplace.json` points at this repository root. Reload, then confirm the `design-product` skill, agent, and command.

For a local copy while editing this repo, place it at `~/.cursor/plugins/local/product-design/` and reload Cursor. See [Test plugins locally](https://cursor.com/docs/plugins#test-plugins-locally).

### OpenCode V2

```sh
opencode plugin add github:tuanpep/product-design
```

That adds the plugin to the global OpenCode config. Restart OpenCode, then select the `design-product` agent or run `/design-product`. The agent can also run as a subagent. It leaves your default coding agent in place.

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

| Skill | Role |
| --- | --- |
| `/frame-problem` | Separate a requested feature from the people, problem, and outcome. |
| `/discover-needs` | Investigate users, current journeys, constraints, and sources. |
| `/define-requirements` | Turn that context into stable needs and derived requirements. |
| `/explore-solutions` | Compare approaches, including no-build, and name the reversing assumption. |
| `/design-experience` | Describe the chosen approach across interactions, rules, data, and support. |
| `/drawio` | Draw the journey or screen prototype as a Draw.io file. |
| `/plan-evaluation` | Plan the smallest real test of the assumption that would reverse the recommendation. |
| `/specify-build` | Write the first useful slice as stories, acceptance outcomes, and checks. |
| `/decide-next` | Recommend stop, learn more, test, specify a slice, or hand a named slice to builders. |
| `/review-design` | Check coherence, and report evidence and delivery readiness separately. |

Decision rules are separate skills. Their order is in [Principles](docs/guide/03-principles.md).

## Develop

```sh
npm test
```

The tests check the manifests, skill metadata, links, and OpenCode registration. They confirm the package is well formed. Try the installed plugin on a real idea before treating a proposal as ready.

MIT License. Copyright 2026 tuanpep.
