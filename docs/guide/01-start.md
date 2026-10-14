# Start

Run `/design-product` in the product's project, in Cursor or OpenCode V2. In OpenCode V2 you can also select the `design-product` agent for the session. Supply whatever you already know about people, goals, constraints, and existing research.

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

Pick `/design-product` from the `/` menu before you type, so the host attaches the skill to the message.

The agent asks which level to run before it writes: Understand, Design documents, Sketch, Prototype, or Full. Name the level in the same message to skip the question. It then writes an evidence-labeled design package in `docs/product-design/<slug>/` in the project being designed, and stops at that level: the decision in `product-design.md`, and, when the level includes them, journey and process diagrams, a rough sketch, `screens.md`, a web-style screen prototype, and an engineer-facing `build-spec.md`. A large diagram is one file per close flow, grouped in a step folder. At Sketch it stops and asks you to choose the layout before it details the screens. Unknowns stay unknown. Proposed choices stay proposed. It does not fabricate interviews, test outcomes, budgets, or approvals, and it does not write production code.

To skip those questions, start the same request with `advise`. Advise mode runs Full unless you name a shorter level, recommends the solution and the design, and does not wait for you to decide. Choices stay proposed. A safety, policy, or feasibility confirmation still keeps the build spec a draft.

For a local Cursor install, copy this plugin to `~/.cursor/plugins/local/product-design/` and reload Cursor. For OpenCode V2, add this directory to the product project's `opencode.json` plugins list. Both paths are in the [README](../../README.md).

Next: [Route work through `/design-product`](02-design-product.md).
