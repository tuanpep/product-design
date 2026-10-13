# Product Design

A Cursor and OpenCode V2 plugin that takes a human idea and develops an end-to-end product **design proposal**. It separates the feature from the problem, investigates the context, defines requirements, compares options, describes the whole experience, plans the riskiest test, and specifies the first useful slice. It does not claim that untested ideas have been validated, or write production code.

## Cursor: try locally

Copy this directory to `~/.cursor/plugins/local/product-design/` and reload Cursor. In Customize → Skills, confirm that `design-product` appears. Then run:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

Cursor's [local plugin instructions](https://cursor.com/docs/plugins#test-plugins-locally) describe this development path. The `.cursor-plugin/plugin.json` manifest identifies this as a Cursor plugin; the `skills/` directory holds the instructions. No global configuration files are modified by this project.

## OpenCode V2: try locally

Run `npm install` in this plugin directory, then add it to the **product project's** `opencode.json` (substitute this project's absolute path):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/absolute/path/to/product-design"]
}
```

Start OpenCode in the product project. Select the `design-product` agent, or run `/design-product <your idea>`. The [OpenCode V2 plugin API](https://v2.opencode.ai/docs/build/plugins) registers the bundled skills, the [agent](https://v2.opencode.ai/docs/agents), and the slash command without copying files to global configuration. The agent can run as the session agent or as a subagent. It writes under `docs/product-design/` and leaves `build` as the default coding agent. The command attaches the entry skill to the prompt. OpenCode V2 is required; the V1 plugin API and `plugin` (singular) configuration are different.

For a published npm/Git package, use [OpenCode's package install flow](https://v2.opencode.ai/docs/plugins) instead of a local path. Do not install the same plugin both globally and per project.

## What it does

`/design-product` routes a new idea through framing, discovery, requirements, option comparison, experience design, an evaluation plan, an implementation-ready slice, and a stop-or-build decision. A later invocation can revise the same design when evidence or a decision changes. Supporting skills can also be invoked directly in Cursor or loaded by ID in OpenCode:

- `/frame-problem` separates a proposed feature from the people, problem, and outcome.
- `/discover-needs` investigates users, current journeys, constraints, and sources.
- `/define-requirements` turns that context into stable needs and derived requirements.
- `/explore-solutions` compares approaches and their risky assumptions.
- `/design-experience` describes the chosen approach across interactions, rules, data, and support.
- `/drawio` draws the journey flow chart or screen prototype as a Draw.io file.
- `/plan-evaluation` plans the smallest real test of the assumption that would reverse the recommendation.
- `/specify-build` writes the first useful slice as stories, acceptance outcomes, and checks.
- `/decide-next` recommends stop, learn more, test solutions, specify a slice, or hand a named slice to builders.
- `/review-design` checks coherence and reports evidence and delivery readiness separately.

By default, the proposal lives in `docs/product-design/<slug>/product-design.md` in the **project being designed**. The document remains useful even when the agent has no access to actual users: unknowns stay unknown, and proposed choices stay proposed. See [the guide](docs/guide/README.md) for the working contract. The decision rules are separate skills, listed in [Principles](docs/guide/03-principles.md).

## Develop

Run `npm test` to check the manifests, skill metadata, links, and OpenCode registration behavior. These are package checks, **not** evidence that Cursor loaded the plugin or that a proposed product works for users. Test the local installation in each host before distributing it.

This is a standalone project. It does not depend on another plugin or package.
