# Quick connected-screen mockups

Use `/sketch-drawio` for a small editable UI mockup without the product-design workflow:

```text
/sketch-drawio Sketch an invoice review flow for an approver:
invoice list → detail → rejection reason → rejected outcome.
Desktop, neutral styling, fictional data. Label the action arrows.
```

In Claude Code use `/product-design:sketch-drawio`. Other hosts expose the installed skill using their normal skill invocation. No new phase-owner agent or MCP connection is required. The Paseo command-center adapter still exposes its existing workflow actions; it does not add a dedicated sketch action.

The agent writes `mockups/sketch-<name>.json` and generates `mockups/sketch-<name>.drawio` with the bundled Node.js script. Node.js 20.0+ is required; no additional npm dependencies are needed by this renderer. The JSON keeps model-authored content small; repeated XML and geometry are generated in code. Actual token savings have not been benchmarked.

The result contains grouped editable screen shapes and attached labeled arrows. It is static exploration, not a working prototype, usability evidence or approval. Default fidelity is mid-level: real labels and representative content, not elaborate brand decoration. Screen dimensions are schematic. Ask explicitly for alternatives, extra states or image exports.

An [editable invoice example](../../skills/sketch-drawio/examples/sketch-invoices.drawio) and its [compact JSON source](../../skills/sketch-drawio/examples/invoices.json) ship with the skill. This example has structural test coverage, not a completed visual-rendering review.

For revisions, patch affected JSON entries and rerun. Stable IDs and deterministic output keep unaffected cells identical when layout does not change. Manual Draw.io edits are **not** imported back into JSON. The renderer detects changes to its saved output and refuses to overwrite them. Reconcile authorized manual edits, edit directly, or choose a new output file. Do not bypass this guard by deleting the file. Avoid concurrent writes.

Input checks cover schema, IDs, relationships and screen overlap. An available Draw.io renderer must still be used to inspect text and connector routing; otherwise report rendering as unverified. A successful script run does not prove visual correctness.

## Separate from the complete handoff

Keep these exploratory files outside `docs/product-design/`. `/mockup-drawio` remains the existing complete screen handoff from `screens.md`, with package phase/cap checks and complete declared-view coverage. `/sketch-drawio` does not replace it, advance a phase, modify accepted rules, or establish readiness. A package may link to an external sketch as learning material where its existing policy permits.

## External research behind the approach

Original renderer and instructions, informed by these external sources (reviewed 22 October 2026):

- [Official Draw.io interface-mockup tutorial](https://www.drawio.com/docs/tutorials/mockups-in-jira/): built-in UI libraries, grouping, containers and editable examples.
- [Official Draw.io agent integration](https://github.com/jgraph/drawio-mcp): native XML file generation, optional MCP and export paths. This lightweight renderer does not install or depend on that integration.
- [Official condensed XML reference](https://github.com/jgraph/drawio-mcp/blob/main/shared/xml-essentials.md): native cells, container-relative geometry and attached edges. Its generic flowchart grid is not used for UI control layout.
- [Official editable templates](https://github.com/jgraph/drawio-diagrams/tree/dev/templates/layout): web wireframes and mobile layouts; no template collection is loaded at runtime.
- [Community wireframes/mockups recipes](https://github.com/markus41/claude/blob/main/plugins/drawio-diagramming/skills/wireframes-mockups/SKILL.md): comparison reference for fidelity levels and screen-flow arrows, not a runtime dependency or copied skill bundle.

See the [renderer contract](../../skills/sketch-drawio/references/renderer.md) for the compact source format and limits.
