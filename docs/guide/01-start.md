# Start

Run `/design-product` in the product's project, in Cursor, OpenCode V2, Google Antigravity, or Paseo. In Claude Code the same skill is `/product-design:design-product`. In OpenCode V2 you can also select the `design-product` agent for the session. In Antigravity the slash command is the `design-product` skill. In Paseo, focus an agent and run `/design-product`, `/review-design`, or `/technical-design`. Supply whatever you already know about people, goals, constraints, and existing research.

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

Pick `/design-product` from the `/` menu before you type, so the host attaches the skill to the message.

Say `next` to leave the current phase. From Understand that opens Shape. The agent does not ask you to confirm a summary, choose approval versus a brainstorm, or pick a level first. If you name no level, Shape runs through the mockup. Name Understand, Design documents, Mockup, or Full when you want a different stop. It writes an evidence-labeled design package in `docs/product-design/<slug>/` in the project being designed, and stops at that level: the decision in `product-design.md`, and, when the level includes them, journey and process diagrams, `screens.md`, a Draw.io mockup, an engineer-facing `build-spec.md`, and the technical views that slice needs. Design documents includes alternatives and an evaluation plan but intentionally defers screens. A large diagram is one file per close flow, grouped in a step folder. At Mockup, when a layout option is open, guided mode stops and asks which layout to take. Unknowns stay unknown. Proposed choices stay proposed. It does not fabricate interviews, test outcomes, budgets, or approvals, and it does not write production code.

To skip level and layout questions inside the open phase, start the same request with `advise`. Advise mode recommends the solution and the design and does not wait for those choices. Saying `next` still opens the next phase. Choices stay proposed. A safety, policy, or feasibility confirmation still keeps the build spec a draft.

On a vague new brief, the [context gate](../../skills/design-product/references/discovery-interview.md) interviews you in small turns before solution work. A sufficient brief skips that interview. Saying `next` ends it: missing facts stay unknown, and an unknown safety or privacy constraint is left out of the design rather than guessed. Advise and Full do not skip the first interview. If you forbid questions and do not ask to continue, the agent returns only a discovery summary, gaps, and research plan, then stops.

The [learning loop](../../skills/design-product/references/learning-loop.md) chooses an opportunity and plans useful tests before detailed design. Limited learning material is not a complete handoff mockup. Supply real research or technical results to revise the recommendation; a Full package also hands off who should review outcomes after release. Neither a level nor a structurally valid package is proof of demand, usability, or permission to launch.

For a local Cursor install, copy this plugin to `~/.cursor/plugins/local/product-design/` and reload Cursor. For OpenCode V2, add this directory to the product project's `opencode.json` plugins list. For Antigravity, install the GitHub repository with `agy plugin install`, or copy this directory to `.agents/plugins/product-design/`. For Claude Code, add this repository as a marketplace and install `product-design@product-design`. For Paseo, install the `paseo` directory on the daemon with `paseo plugin install`. Those paths are in the [README](../../README.md).

Next: [Route work through `/design-product`](02-design-product.md).
