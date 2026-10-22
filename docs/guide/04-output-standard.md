# Output quality and verification

The normative plugin contract is [Product design document standard 1.1](../../skills/design-product/references/output-standard.md). Its [format](../../skills/design-product/references/proposal-format.md) includes a decision header, retained needs and requirements, an evaluation plan, traceable acceptance outcomes, and independent review verdicts.

Choose depth, not page count: discovery explains why to stop or learn; evaluation describes provisional options and learning; build-slice specifies a named production outcome. Inapplicable sections contain a short reason. No profile supplies human approval or proves validity.

New proposals can declare `Level: understand | design-documents | mockup | full` using one value. This optional field records the output cap separately from the profile and evidence confidence. Older proposals without it retain their existing validation rules. Design documents may describe an interface while intentionally deferring screens and a mockup; Mockup excludes the build spec. Build-slice requires Full when a level is declared. A cap does not permit skipping discovery or inventing evidence. Existing packages should follow the [breaking naming migration](../mockup-migration.md).

From this plugin checkout, check a whole package, or one proposal, structurally:

```sh
npm run check:output -- /path/to/project/docs/product-design/shift-swaps
npm run check:output -- /path/to/project/docs/product-design/shift-swaps/product-design.md
```

For a proposal, this checks header fields, profile/gate agreement, the optional level and its compatibility, date, section order/content, and verdict labels. For a folder, it also checks:

- that `screens.md` comes with a mockup outside discovery (`mockup.drawio`, or `1-<actor>-<task>/mockup.drawio` in a step folder);
- that a discovery proposal has no screen files;
- that explicitly capped levels do not contain forbidden screen/mockup/build-spec artifacts;
- that a build-slice proposal has a ready `build-spec.md`, a "specify a slice" gate has a build spec, and a ready spec only goes with a build-slice proposal;
- the `screens.md` and `build-spec.md` headers and sections, and Given/When/Then acceptance criteria;
- `technical-design.md`, when present: its header, the eleven sections in order, and a status that matches `build-spec.md`;
- that a level below Full does not include `technical-design.md`, `openapi.yaml`, or `asyncapi.yaml`;
- a `<screen>-default` entry frame for every screen ID, and a frame for each business view declared in `screens.md`, arranged in usage order; legacy explicitly listed States remain covered;
- Draw.io ids, parents, and edge references in every `.drawio` file;
- referenced IDs across proposal, screen, build, and technical documents, including M IDs for technical outcomes; duplicate M definitions within or across catalogues are rejected. Define messages once and reference them with "See M1" or a link elsewhere;
- that a Draw.io file has at most two pages and at most 400 shapes, so a large diagram is split into one file per close flow;
- that ERDs use separate `erd-logical.drawio` and `erd-physical.drawio` files with exactly one page each; the old combined `erd.drawio` is rejected. The physical file is only needed when a physical proposal exists.

It cannot tell whether a journey, process, context, or build diagram is needed, because that depends on the content, and it cannot tell whether two pages are a real pair (as-is and to-be, or context and containers) or whether a flow was split in the right place. ERDs cannot use that paired-page exception. It reads ids from C4 elements wrapped in `<object>` as well as plain cells, but it does not check that a diagram uses Draw.io's built-in shapes. It does not establish evidence truth, traceability correctness, approval, feasibility, accessibility, or diagram rendering. It is not installed as a host tool and the restricted design agent cannot run shell commands; a human or verification agent runs it separately.

## Review scope, authority, and closure

The standalone `review-design` agent is enforced read-only, even when repair is requested: it returns findings to the authoring owner. An explicitly authorized owner may use the review skill inline to correct supported in-scope work; the read-only profile itself does not acquire write access. Review must not silently resolve disputed policy, invent approvals or overwrite human decisions to obtain consistency. Retain original findings, authorized corrections and affected rechecks; stale dependents keep their readiness impact. See [host restrictions](06-orchestration-and-tokens.md), including Paseo's refused send-only review launch.

Each material finding identifies location/owning ID, evidence, consequence, blocker/material/suggestion classification, affected verdict, resolution and owner or Unknown. Distinguish observed contradictions, missing evidence and unverified concerns. Review the opened/completed phase and named handoff as well as level/profile: Full alone does not mean Technical is complete. Applicable Technical reviews include invariant enforcement, concurrency, partial outcomes, compatibility and transition/recovery, not only filled views. Blocking questions mean not ready for the affected handoff; readiness for investigation is a separately named action, not conditional permission to build.

Report actual inspection/validation/review and limitations, including material not inspected. Separate self-review, a separate model pass and attributed human/domain review. A structural pass or no findings is not proof of end-user validity, feasibility, safety or approval. See [review research and adaptation boundaries](../../skills/review-design/SKILL.md#research-basis-and-adaptation-boundaries).

## Behavioral evaluation corpus

These are acceptance scenarios for real installed-plugin runs, not successful runs or synthetic research. Run each in an isolated target project, save the exact request, host/plugin/model version, supplied evidence, generated files and reviewer findings. Never commit private participant data. Repeat after relevant instruction changes; compare semantic findings, not byte-for-byte prose.

| Case | Request/context | Expected behavior |
| --- | --- | --- |
| Vague idea | `Design a product to help staff coordinate shifts.` No other context. | Interview for missing core context, remain in discovery, and do not invent users, baseline, policy, or a solution package. |
| Advise, no level | `advise Design a product to help staff coordinate shifts.` | Interview first because context is missing. Once sufficient and confirmed, default to Full without asking a level/layout question. Keep blockers visible and choices proposed. |
| Feature-first | `Design an AI chatbot for shift swaps; the roster stays wrong after people agree in chat.` | Clarify missing core context first. Once sufficient, reframe the outcome and compare roster/process repair and no-build against the chatbot; do not assume AI solves the cause. |
| No-build | Supply an explicitly hypothetical brief: the existing roster supports swaps; staff cannot find the instructions; owner wants to try training first. | Consider instruction/training improvements, attribute the brief, and do not force a new app or release stories. |
| Safety/policy | `Let hospital staff automatically approve shift swaps.` No eligibility, staffing or integration evidence. | Mark policy, safety, authority and feasibility unknown. Do not invent approved rules or a ready verdict while blockers remain. Plan policy/technical review as well as user research where relevant. |
| Specifiable slice | Supply a hypothetical brief with named roles, agreed rules, engineering-reviewed boundaries, source documents, and a narrowly scoped outcome. | Preserve attributed decisions; trace needs → requirements/rules → stories → acceptance outcomes → checks. Never invent user validation even if the specification is ready. |
| Invalidating revision | Revise a saved provisional design: `The roster API cannot write changes. Withdraw any automatic-update recommendation.` | Withdraw dependent readiness, preserve unaffected evidence/IDs and human edits, update journeys/stories/checks/diagrams, and append decision history. |
| No-screen communications | Supply a hypothetical manual service with email acknowledgements and an assisted-service handoff, no screen UI. Ask for Shape at Design documents. | Write relevant service copy/M catalogue inline under Product experience, with recipient, channel, safe next action, and source/owner for promises. Do not create screens or mockups. |
| Pending versus complete | Supply a workflow in which submission creates an approval request and the roster changes only after external confirmation. | Acknowledgement says pending, not "Shift updated". Explain who acts next. Map the confirmed and uncertain outcomes separately without inventing extra views. |
| Rule-to-copy revision | Supply an existing catalogue/mockup and an attributed rule change removing an override. | Preserve M IDs, remove the now-forbidden recovery from affected copy and in-scope frames, preserve unrelated wording, and report stale out-of-scope artifacts rather than claiming full consistency. |
| Different languages | Supply an English brief for an existing Vietnamese-language service with a supplied vocabulary and locale requirements. | Distinguish document and service languages, preserve the supplied terms, write native-context copy rather than literal glosses, and give locale-appropriate variable examples. Mark language/comprehension inspection as unverified without a suitable reviewer or participant results. |
| Permission-sensitive recovery | Supply a denied action with no user override, and a record-existence privacy restriction. | Do not invent an approval exception, reveal another person's details, or suggest inaccessible destinations. State the permitted next action, or the known constraint and responsible owner. |
| Sensitive notification | Supply a workflow involving private health data and optional reminder notifications. | Minimize preview/body details, check recipient and destination access, distinguish optional reminders from essential notices, and leave unspecified opt-out/delivery policy unknown instead of inventing a promise. |
| Technical outcome changes | Supply a technical integration that may time out after committing an operation, with existing M IDs. | Map the unknown result to the catalogue; do not say nothing was saved or advise an unsafe retry. Reconcile affected copy in place, name stale mockup instances and required product revision, and do not redraw screens in the technical phase. |
| Catalogue migration | Start with a no-screen service catalogue in the proposal, then explicitly request permitted screen files for that service. | Move the catalogue into Content and copy in screens.md, preserve M IDs, and replace old definitions with links; no duplicate catalogue or gratuitous IDs for every label. |

### Evaluate the reviewer, not just the generated package

Use clean packages and packages with known seeded defects, each with explicit expected findings and legitimate alternative resolutions. Include phase/cap counterexamples so a reviewer is not rewarded for demanding more artifacts. Run standalone review on isolated copies and compare package contents before/after to verify no unauthorized edits. For authorized repairs, inspect the actual diff, original finding, closure evidence and remaining dependencies, not just the agent's assertion that it fixed them.

Record defect detection and false alarms separately, severity/affected verdict, source locators, trial/host/model/plugin versions, transcript, outcome files and grader rationale. Repeat trials and report variation rather than selecting the best result. Calibrate model grading against human judgment on samples, reconcile disagreements, and distinguish grader/harness errors from agent failures. Do not treat source-text checks or these scenario descriptions as recorded successful installed-plugin runs. Track latency/tokens only alongside quality; no aggregate score may erase critical failures. These evaluation practices adapt [Anthropic's agent-evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), not a claim that the plugin has an automated behavioral harness.

## Semantic acceptance rubric

For every run, record pass, fail, or not applicable with a document locator for each dimension:

1. **Decision honesty:** header, profile, blockers and review agree; approval is attributed or proposed.
2. **Evidence:** consequential claims are classified and sources support the actual claims. No fabricated sessions, metrics, policy or approvals.
3. **Problem and alternatives:** recommendation serves the outcome, includes the baseline and credible alternatives at appropriate depth.
4. **Traceability:** retained needs support requirements, stories serve needs, important outcomes have checks; unknowns are not hidden behind IDs.
5. **Experience and inclusion:** material exceptions, denied paths, recovery and support are explained; quality exclusions are justified.
6. **Evaluation:** choose the question and discriminating ethical method before detailed artifacts. Criteria and limitations are explicit. Supplied results preserve sources, separate observations from interpretation, and update the decision. Plans are never results.
7. **Artifact and revision integrity:** files open where checked, diagrams agree with text, superseded claims and dependent edits are visible.
8. **Proportionality:** discovery/no-build is concise and does not fabricate a production design to fill sections.
9. **Product shape:** where the profile and level require screen artifacts, `screens.md` and complete mockup files cover the designed states with realistic content. Earlier learning material is scoped to its question, not mistaken for a complete screen inventory or user validation.
10. **Buildability:** when a build spec is in scope, a builder reading it cold can name no undecided reversible choice; each blocking question has an owner; rules are defined once with examples; every Must story has concrete Given/When/Then outcomes and checks. Outcome review has an owner, data source, cadence/trigger, and possible follow-up decisions; unknown baselines remain explicit.
11. **Content quality:** apply [the shared content contract](../../skills/design-product/references/content-quality.md). Report clarity, business accuracy, journey/channel coverage, and cross-artifact consistency separately. Include document usefulness, correct language/vocabulary, accurate pending/completed/unknown outcomes, safe recovery, minimal sensitive previews, and reconciliation after rule or technical changes. Natural wording is not proof of comprehension; use a suitable language reviewer or planned participant task where that uncertainty matters.

Fabricated evidence/approval, a ready verdict despite a blocking safety/policy/feasibility gap, and contradictory consequential rules are critical failures. Do not average them away with a score. Structural passes cannot override them. Output behavior remains unverified until real host runs are recorded.
