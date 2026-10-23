# Task-appropriate model setup

Standard: product-design/1.1
Profile: discovery
Level: understand
Updated: 2026-10-22
Next gate: repeat discovery
Decision owner: unknown
Approval: proposed

Phase: Understand completed. No Shape, Specify, Technical or implementation authorization is recorded for this package.
Named handoff: model-routing context and constraints for the product-design plugin.
Target: this repository, assumed from the active workspace and conversation.

## Recommendation

Establish model-routing needs for the requested setup command before implementation. The user's request is to create a command for better model fit by task, not to change this machine's model settings now. No command or configuration changes have been made.

Command naming, configuration scope, recommendation criteria and implementation remain unsettled. Model discovery alone cannot establish which model is better at a task or prove that a provider request will succeed.

## Problem and outcome

**Given, E1:** The user first reported apparently sequential execution by the design and architecture agents, asked about parallel subagents, requested external research, then asked: "create a setup models command for better fit models per tasks."

The actor is a person configuring the product-design plugin in OpenCode. The concrete task is selecting models appropriate to the work performed by its agents. **Inferred:** Model assignment is a separate problem from scheduling; changing a model assignment does not itself dispatch workers concurrently.

The desired user outcome is to understand and control which model performs each kind of work. **Inferred service outcome:** Avoid unnecessary inference cost or waiting without losing task quality. Current time, cost, failure rate and quality baselines are unknown. Faster or cheaper execution is not established by the request or by published results from another system.

The hardest supported case is a user with inherited settings, an explicit worker override and a catalog-listed model whose actual access has not been tested. Treat this as a boundary to investigate, not an observed user session.

## Evidence and unknowns

| ID | Status and source | Observation and limitation |
| --- | --- | --- |
| E1 | Given, conversation, 2026-10-22 | Request and friction above. No installed-host timing trace or task-quality comparison supplied. |
| E2 | Observed, `runtime/delegation.mjs:6-38,170` | Two owner IDs and three worker IDs exist. Plugin model overrides accept only workers. Delegated model precedence is plugin worker override, effective worker model, parent session model. No capability ranking is encoded here. |
| E3 | Observed, `index.js:108-120,145-160` | The plugin transforms agent definitions and registers `design-product`. This registration contains no setup-models command. It does not establish the absence of an unrelated host command. |
| E4 | Observed, OpenCode models catalog calls, 2026-10-22 | Catalog returned 39 entries across five providers. The current provider returned `dxt/gpt-6.1-sol` and `dxt/gpt-6-luna`, each with low, medium and high variants. Catalog discovery did not perform inference or establish relative quality, billing or successful authentication. |
| E5 | Observed documentation, [OpenCode V2 agents](https://opencode.ai/v2/docs/agents) and [configuration](https://opencode.ai/v2/docs/config), fetched 2026-10-22 | Subagents can inherit the parent model. Selecting a primary agent does not replace the model stored on an existing session. Configuration has multiple precedence layers. These are documented behaviors, not a performed installed-host verification. |
| E6 | Published engineering report, [Anthropic multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system), 2025-06-13, inspected 2026-10-22 | Independent research directions benefited from parallel workers, with additional token consumption and coordination costs. This supports investigating task fit, not copying its model roster or latency gains. |
| E7 | Published research, [Towards a Science of Scaling Agent Systems, v3](https://arxiv.org/abs/2512.08296v3), 2026-04-08, abstract and opening sections inspected 2026-10-22 | Across 260 configurations and six benchmarks, reported collaboration benefits depended on task structure and architecture. This is not a benchmark of this plugin or its catalog models. |

**Content baseline:** English is the proposed document language, following the request. Command-facing language, locale and localization needs are unknown.

Open questions that could change scope:

- Is the first target only this plugin's five agents, or a general-purpose setup for other installed agents? Current package scope is limited to this plugin; expansion needs a human decision.
- Should changes apply to this project, all projects, or both through an explicit choice? Configuration scope is undecided, and no writes are authorized here.
- What does better fit prioritize: task quality, elapsed time, price, privacy or a combination? User priorities and spending limits are unknown.
- Which catalog entries permit successful calls, which satisfy data-handling constraints, and which work reliably with required tools? These remain untested. No inference probes or provider changes were performed.

Owners for these decisions and investigations are unknown. Missing access or policy facts exclude silent provider changes and unsupported success claims.

## Needs and requirements

| ID | Need or constraint | Basis and status |
| --- | --- | --- |
| N1 | Match model selection to the work instead of treating every task as interchangeable. | Given E1. |
| N2 | Understand the actual model used, including inheritance and overriding settings. | Inferred from E2 and E5. |
| N3 | Retain control of cost, provider choice and configuration scope. | Proposed safeguard given unknown budget, data policy and scope. |
| R1 | Any future recommendation must distinguish detected model metadata, confirmed invocation access and measured task performance. | Derived from N1 and E4; proposed constraint. |
| R2 | A future setup must account for effective overrides and session behavior rather than equating a saved assignment with verified routing. | Derived from N2, E2 and E5; proposed constraint. |
| R3 | Preserve unrelated configuration, human choices, permissions, concurrency limits and phase boundaries. Do not send project data to a new provider or run paid model probes without appropriate authorization. | Derived from N3; proposed safety constraint. |
| R4 | Do not claim that model assignment enables parallel scheduling or guarantees faster completion. | Derived from N1, E2, E6 and E7. |

Current role inventory, not a proposed model assignment:

- `design-product`: product phase ownership and integration.
- `technical-design`: explicitly opened technical phase ownership.
- `design-research`: bounded read-only investigation.
- `design-artifact`: settled large Draw.io artifact production.
- `review-design`: read-only package review.

Working vocabulary: a **model assignment** selects a model for an agent; **inheritance** uses the applicable parent/default choice when no effective pin exists; **variant** is a supported model option; **task fit** is suitability for a stated outcome, not a model-name ranking. IDs and current responsibilities come from E2 and the corresponding `agents/*.md` files.

## Options

Deferred to Shape. Existing behavior supports manual worker overrides and inheritance; alternatives have not been compared in this phase.

## Product experience

Deferred to Shape. No command syntax, interactive flow, presets, screen copy or detailed configuration design is specified.

## Evaluation plan

Planned, not performed: inspect effective model assignments and their configuration sources for these five roles; establish the user's priority and scope; then compare representative research, artifact and review tasks under matched inputs and quality criteria. A separate session-model check is needed for primary agents.

Record elapsed time, completed-task quality, failures, integration effort and parent-plus-child usage where available. Distinguish cache conditions, provider settings and models. Capability gates and an authorized budget must precede any paid probes. No task workload should be sent to an unapproved provider.

Support task-specific routing if repeated comparisons show a useful quality, time or cost advantage under the chosen priority. Weaken or reverse the premise if inheritance performs comparably, setup adds more effort than it saves, or required models cannot meet access or data constraints. Thresholds and evaluation owner remain unknown.

## First useful release

Not specified in Understand. This file is a discovery handoff, not an implemented command, setup skill or build specification.

## Review and next steps

**Design coherence:** Coherent as a bounded discovery account. Model routing and scheduling remain separate concerns; scope and success criteria are explicitly unresolved.

**Evidence confidence:** Supported for inspected source behavior and catalog contents; untested for comparative model fit, provider access and user outcomes. External evidence supports investigation, not local speed or quality claims.

**Delivery readiness:** Ready to discuss the routing decision; not ready to install, apply settings or claim a working command. This agent is restricted to product-design documents, so implementation requires a code-capable agent.

Performed checks: inspected current model parsing, override targets, fallback precedence and command registration; enumerated model metadata; checked official host documentation; self-reviewed this discovery against its phase and output cap. No independent review, configuration reload, inference benchmark or end-to-end command test occurred.

Next gate remains repeat discovery. A human request to continue opens Shape without another general discovery interview. Unknown preferences remain visible rather than becoming approved defaults. No readiness verdict grants build permission.

## Decision history

- 2026-10-22: User requested a setup-models command. Initial discovery recorded in the current repository. Command implementation and global configuration edits were excluded by the active design-agent role. No model assignments selected or applied; proposal only.
