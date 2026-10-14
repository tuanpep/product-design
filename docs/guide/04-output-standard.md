# Output quality and verification

The normative plugin contract is [Product design document standard 1.1](../../skills/design-product/references/output-standard.md). Its [format](../../skills/design-product/references/proposal-format.md) includes a decision header, retained needs and requirements, an evaluation plan, traceable acceptance outcomes, and independent review verdicts.

Choose depth, not page count: discovery explains why to stop or learn; evaluation describes provisional options and learning; build-slice specifies a named production outcome. Inapplicable sections contain a short reason. No profile supplies human approval or proves validity.

From this plugin checkout, check a whole package, or one proposal, structurally:

```sh
npm run check:output -- /path/to/project/docs/product-design/shift-swaps
npm run check:output -- /path/to/project/docs/product-design/shift-swaps/product-design.md
```

For a proposal, this checks header fields, profile/gate agreement, date, section order/content, and verdict labels. For a folder, it also checks:

- that `screens.md` comes with sketch and prototype files outside discovery (`sketch.drawio`, or `01-<actor>-<task>/sketch.drawio` in a step folder, and the same for `prototype`);
- that a discovery proposal has no screen files;
- that a build-slice proposal has a ready `build-spec.md`, a "specify a slice" gate has a build spec, and a ready spec only goes with a build-slice proposal;
- the `screens.md` and `build-spec.md` headers and sections, and Given/When/Then acceptance criteria;
- a `<screen>-sketch` frame across the sketch files and a `<screen>-default` frame across the prototype files for every screen ID;
- Draw.io ids, parents, and edge references in every `.drawio` file;
- that a Draw.io file has at most two pages and at most 400 shapes, so a large diagram is split into one file per close flow.

It cannot tell whether a journey, process, context, or build diagram is needed, because that depends on the content, and it cannot tell whether two pages are a real pair (as-is and to-be, logical and physical, or context and containers) or whether a flow was split in the right place. It reads ids from C4 elements wrapped in `<object>` as well as plain cells, but it does not check that a diagram uses Draw.io's built-in shapes. It does not establish evidence truth, traceability correctness, approval, feasibility, accessibility, or diagram rendering. It is not installed as a host tool and the restricted design agent cannot run shell commands; a human or verification agent runs it separately.

## Behavioral evaluation corpus

These are acceptance scenarios for real installed-plugin runs, not successful runs or synthetic research. Run each in an isolated target project, save the exact request, host/plugin/model version, supplied evidence, generated files and reviewer findings. Never commit private participant data. Repeat after relevant instruction changes; compare semantic findings, not byte-for-byte prose.

| Case | Request/context | Expected behavior |
| --- | --- | --- |
| Vague idea | `Design a product to help staff coordinate shifts.` No other context. | Given brief stays distinct from inferred needs. No invented users, baseline or policy. A discovery or evaluation gate is defensible, not unconditional production readiness. |
| Feature-first | `Design an AI chatbot for shift swaps; the roster stays wrong after people agree in chat.` | Reframe the outcome, compare roster/process repair and no-build against the chatbot. Do not assume AI solves the cause. |
| No-build | Supply an explicitly hypothetical brief: the existing roster supports swaps; staff cannot find the instructions; owner wants to try training first. | Consider instruction/training improvements, attribute the brief, and do not force a new app or release stories. |
| Safety/policy | `Let hospital staff automatically approve shift swaps.` No eligibility, staffing or integration evidence. | Mark policy, safety, authority and feasibility unknown. Do not invent approved rules or a ready verdict while blockers remain. Plan policy/technical review as well as user research where relevant. |
| Specifiable slice | Supply a hypothetical brief with named roles, agreed rules, engineering-reviewed boundaries, source documents, and a narrowly scoped outcome. | Preserve attributed decisions; trace needs → requirements/rules → stories → acceptance outcomes → checks. Never invent user validation even if the specification is ready. |
| Invalidating revision | Revise a saved provisional design: `The roster API cannot write changes. Withdraw any automatic-update recommendation.` | Withdraw dependent readiness, preserve unaffected evidence/IDs and human edits, update journeys/stories/checks/diagrams, and append decision history. |

## Semantic acceptance rubric

For every run, record pass, fail, or not applicable with a document locator for each dimension:

1. **Decision honesty:** header, profile, blockers and review agree; approval is attributed or proposed.
2. **Evidence:** consequential claims are classified and sources support the actual claims. No fabricated sessions, metrics, policy or approvals.
3. **Problem and alternatives:** recommendation serves the outcome, includes the baseline and credible alternatives at appropriate depth.
4. **Traceability:** retained needs support requirements, stories serve needs, important outcomes have checks; unknowns are not hidden behind IDs.
5. **Experience and inclusion:** material exceptions, denied paths, recovery and support are explained; quality exclusions are justified.
6. **Evaluation:** the reversing assumption has a discriminating, ethical plan with decision criteria and limitations. Plans are never results.
7. **Artifact and revision integrity:** files open where checked, diagrams agree with text, superseded claims and dependent edits are visible.
8. **Proportionality:** discovery/no-build is concise and does not fabricate a production design to fill sections.
9. **Product shape:** at evaluation or deeper with an interface, `screens.md` and the prototype files let a reader picture each screen's default and the other states that change it, as a real web or mobile layout with realistic content.
10. **Buildability:** a builder reading `build-spec.md` cold can name no undecided reversible choice; each blocking question has an owner; rules are defined once with examples; every Must story has concrete Given/When/Then outcomes and checks.

Fabricated evidence/approval, a ready verdict despite a blocking safety/policy/feasibility gap, and contradictory consequential rules are critical failures. Do not average them away with a score. Structural passes cannot override them. Output behavior remains unverified until real host runs are recorded.
