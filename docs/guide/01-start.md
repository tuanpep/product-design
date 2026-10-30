# Start

Install Product Design from `https://github.com/tuanpep/product-design` in Cursor, or use OpenCode V2:

```sh
opencode plugin add github:tuanpep/product-design
```

In OpenCode run `/setup-product-design` for the four role models. Then:

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong.
```

The first run stays in Understand: it records the problem, evidence, needs, unknowns and next decision in `docs/product-design/<slug>/product-design.md`. It asks only useful missing-context questions, not an interview to fill template fields. Supplied facts are reused; missing facts stay unknown.

Say `next` to open Shape without another summary-confirmation question. Default Level is design-documents. Shape compares alternatives, proposes experience/service copy and writes `test-plan.md` for the risky assumptions. Name `full` to permit Specify, then explicitly advance to write the SRS `build-spec.md` and extend the plan with verification cases. Full or advise alone does not advance a phase.

The SRS, Test Plan, Test Case and embedded Requirements Matrix are local adaptations of [Documentero's engineering templates](https://documentero.com/templates/it-engineering/). No service account, API key or external upload is needed. Unknown owners, schedules and targets are not invented. No screens, mockups, diagrams, technical design or production code are generated.

Next: [Workflow and ownership](02-design-product.md).
