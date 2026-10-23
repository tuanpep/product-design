# Orchestration, isolation and token accounting

## What ships

The **53 catalog entries** remain. Skills are procedures, not automatically separate agents. Primaries interpret applicable procedures to make decisions and assign execution to leaves; a skill's instruction to write or inspect is not an exception to the primary's orchestration boundary. OpenCode registers their bodies without advertising disabled skills; full bodies/supporting references enter context only when loaded/read. Do not equate registration or total repository text with token consumption.

The default instruction path is the small product entry → [execution kernel](../../skills/design-product/references/execution-kernel.md) → [active phase pack](../../skills/design-product/references/phase-routing.md). Detailed discovery, workflow and compatibility playbooks remain available for relevant methods/sections; agents should not preload every phase or reference. A fresh child needs relevant facts/authorization and source pointers; switching an agent in an existing session does not reset its history.

There are three retained domain primaries and three production/research workers. No universal orchestrator or default-agent change is introduced:

| Profile | Ownership / tools |
| --- | --- |
| `design-product` | Product-phase orchestration, human clarification, canonical decisions and integration judgment; no direct production |
| `technical-design` | Explicit Full technical orchestration, technical decisions and cross-view integration judgment; no direct production |
| `review-design` | As primary, coordinates read-only review and reconciles three verdicts; as leaf, inspects assigned concerns without delegation; never repairs |
| `design-research` | Bounded read-only source/repository investigation, no human decisions |
| `design-author` | Assigned Markdown production/repairs from owner decisions; no independent policy, code or phase changes |
| `design-artifact` | Specified Draw.io output, no owning-text/rule/copy redesign |

Interviews and tightly coupled domain/rule/interface decisions stay with the primary; production, external research and inspection go to leaves. Small work uses one worker, not a compulsory swarm or agent per principle/skill. The primary routes supported authorized corrections and one affected recheck, preserves original findings, and reports unresolved issues rather than running repeated critic/repair loops. Independent read-only questions may run together; canonical writers and their dependent checks stay sequential.

## Canonical prompts and host adapters

Edit **`agents/*.md`** as the prompt source. Run:

```text
npm run sync:agents
npm test
```

This generates OpenCode bodies/frontmatter and the Paseo prompt module. Tests reject drift across every generated body, including the six profiles and all three Paseo workflows. Do not manually edit generated adapters. Runtime/model/step overrides belong in host/plugin configuration, not copies of procedural policy. Portable agent files use Claude tool allowlists and Cursor's `readonly` field; their accepted frontmatter differs by host.

| Host | Enforced boundary | Limitations |
| --- | --- | --- |
| OpenCode V2 plugin | Guards prevent direct primary mutations/external research, execute/Code Mode, shell and MCP; native spawning is root-only and target-restricted; writer package/extension path patterns; review/research are read-only | Exact task files and scheduling limits are instructions, not per-task runtime grants or a scheduler. No viewer supplied; not an OS sandbox or engineering assurance |
| Cursor | Read-only review declares `readonly: true`; primaries/leaf prompts specify their roles | Native scheduler/model behavior, root-only delegation and writer path controls require host verification. Without required role controls or isolation, report affected blocked execution |
| Claude Code | Primary allowlists exclude writes/shell/web research; author/artifact exclude shell/Agent | Shared reviewer profile needs host enforcement of root-only spawning. Writer path controls are host-specific; prompts alone do not provide isolation |
| Paseo send-only adapter | **Standalone review launch is refused before sending a prompt** because this adapter cannot enforce read-only tool access | Run review in its configured underlying host profile. Product/technical prompts share canonical policy, but `.send()` does not switch tools/model, create a fresh context or enforce scheduling procedures |

Explicit repair through the read-only review profile still produces findings for the authoring owner. This intentionally replaces the old unsafe implicit-repair behavior. Paseo no longer pretends that a review prompt makes an arbitrary selected writable agent read-only.

## OpenCode configuration

### Fresh-install agent setup

Install this plugin, then run `/setup-product-design`. No existing pstack setup, model-role file or other plugin is required. Agent roles and permission boundaries are bundled and register automatically; setup configures their models, not a new universal orchestrator.

The command lists currently available, enabled, tool-capable models and asks you to choose a model or `inherit` for each role:

- `design-product`: product decisions and phase orchestration.
- `technical-design`: technical decisions and view orchestration.
- `review-design`: root review coordination or bounded read-only child review.
- `design-research`: source investigation.
- `design-author`: assigned Markdown production.
- `design-artifact`: specified Draw.io production.

Setup does not start a design, load design skills, run inference benchmarks, create artifacts, install providers or touch credentials. It saves only role/model references in this plugin's storage and refreshes agent definitions. Model names alone are not evidence of price, speed or suitability. Unsupported/unavailable models are rejected rather than silently replaced. `inherit` leaves model selection to the existing host/session configuration.

`/setup-product-design status` reports stored choices without changing them; `/setup-product-design cancel` exits a pending setup. Setup cannot run in a child session and its application tool is accepted only after this explicit command. Re-running setup replaces this plugin's complete six-role map, not global configuration. Existing explicit `workerModels` plugin options take precedence over setup's stored choices. Later host configuration can restrict models and tools further. Agent refresh does not silently change the model already selected on a running primary session; select it explicitly or begin a fresh session as appropriate.

### Owner-managed budgets and model/step overrides

Owners follow these trial procedures: at most **2 concurrent read-only** workers and **12 launches per user request**, serialized canonical writers, no automatic retry and one authorized correction/affected recheck before reporting unresolved issues. These are not enforced quotas, exclusive lanes or wrapper timeouts. Runtime denies spawning from every child. Default worker steps: research 20, reviewer 24, author/artifact 40. Step limits are not guaranteed output-token limits or measured optimal settings.

```json
{
  "plugins": [
    {
      "package": "opencode-product-design",
      "options": {
        "telemetry": false,
        "agentSteps": {
          "design-research": 20,
          "review-design": 24,
          "design-author": 40,
          "design-artifact": 40
        }
      }
    }
  ]
}
```

Step overrides accept 1–200. Exhaustion or host interruption may leave partial work; never treat it as success or increase a limit automatically to evade it. Native subagent availability is controlled by the host and role policy, not a plugin delegation option. If unavailable, primaries report affected blocked execution rather than authoring inline.

Migration: remove the old `options.delegation` object (`enabled`, `maxConcurrent`, `maxLaunches`, `timeoutMs`). The plugin rejects it with a migration error instead of silently pretending those wrapper controls still apply. Native host settings and permissions now control delegation availability; the owner manages scheduling procedures.

Optional `workerModels` maps `design-research`, `review-design`, `design-author` or `design-artifact` to an **available** `provider/model#variant` string. No model is hard-coded. Explicit plugin overrides take precedence over stored setup choices when configuring agent defaults; otherwise native host model selection/inheritance applies. Existing running primary sessions retain their selected model. The plugin never calls `switchModel` on the primary session. Availability/permissions must be verified in the actual host; no silent expensive fallback is promised.

## Native subagents and recovery

### Activating local source changes

Editing this checkout does not update a GitHub-installed plugin. For unpublished testing, replace only this plugin's existing entry in the global `plugins` array with this checkout's absolute path (or its object form to retain options); do not add a duplicate registration or change models/default agents. Back up the config first. Reload/restart OpenCode only when running work can safely be interrupted, then start a fresh session or explicitly select the intended primary. Inspect the running service's effective agent list and plugin source: offline debug output alone may omit plugin-registered agents. Optional host verification should use an isolated fixture to test allowed native launches and denied direct primary edits/execute/shell/MCP, disallowed targets and child spawning. This change includes no live service reload, required paid benchmark or automatic config rewrite.

### Execution contract

OpenCode owners use the native subagent tool. Root design-product and technical-design may launch design-research, design-author, design-artifact and review-design. Root review-design may launch only review-design and design-research. Runtime denies spawning from every child, including child reviewers. Follow the native host's completion/session behavior; do not assume wrapper-specific waiting or background semantics. Give a self-contained brief: objective/stopping condition, package, authoritative source paths/version/known facts, open phase, cap, named handoff/authorization, checks and exact task output paths (none for research/review). Do not assume inherited conversation. The owner remains responsible for phase and behavior authorization; a valid launch is not human approval. Direct Read/Glob/Grep are available for inspection; execute/Code Mode, shell and MCP are denied for design work.

Authors receive exact task `.md` paths within the named package; product owners cannot open Technical by delegation. For an artifact, only Shape at Mockup/Full or Technical at Full is permitted, with exact task `.drawio` paths. Runtime writer controls enforce package/extension path patterns under `docs/product-design/`, not per-task exact file grants. The task list is instructional: workers must follow it, but should not demand confirmation from a removed wrapper. The owner serializes writers and reviews stable output; there is no runtime-exclusive lane. Path permissions are not a race-proof OS sandbox.

Children run under their configured agent role and applicable native host/session policy. Do not assume the primary's role-specific mutation deny is the child's production policy. Research/review cannot write, use execute/shell/MCP or spawn. Author/artifact roles have the corresponding package/extension writer permissions, not task-exact isolation. Other host restrictions may narrow access further; neither a prompt nor a native launch overrides a deny.

Track native child session IDs and outstanding assignments through the host. On interruption, partial output or uncertain completion, inspect the linked child and stop it through host controls when needed before reassigning overlapping work. Confirm its state and inspect existing output rather than blindly retrying. The plugin provides no custom scheduler timeout, replay protection or cancellation guarantee.

After a host reload, recover from native session IDs/history and actual files. Missing or unreachable child state remains uncertain; ask the operator to inspect/stop through the host before overlapping writes resume. There is no plugin orphan registry or reservation to clear, and starting another parent is not proof that earlier work stopped.

Workers save large artifacts once and return concise evidence/paths/checks/limitations. Any truncation or step exhaustion means partial work. The parent inspects consequential source/artifact content and applicable checks. No viewer is supplied by these profiles: authorized writes may proceed, but mark rendering unverified unless an actual supported editor opening occurred. A complete worker report or well-formed XML is not semantic validity, rendering verification or readiness.

## Usage and loading telemetry

`product_design_usage` makes **no model calls**. By default it returns a compact observed-usage summary, coverage, retry/request-kind counts and repeated-source counts for the current session and any observed linked children. Native child discovery and usage coverage are incomplete; do not treat this as a complete session tree or bill. `detail: true` explicitly returns the bounded ledger for evaluation export; use this only when needed, since that tool result itself consumes context. Extract the original JSON tool result from the host trace into a file outside the measured workspace rather than asking an agent to rewrite it.

With `telemetry: false` (default), no sampling hooks or usage persistence run. An on-demand snapshot can read current context usage, but compaction may already have removed history. Native child coverage may be missing even when current-session usage is available.

With `telemetry: true`, the plugin retains:

- Per-request OpenCode-normalized input, output, reasoning, cache-read/cache-write and reported cost, deduplicated by session/request ID.
- Character counts of assembled system/messages/tool schemas at dispatch, **not token counts or their contents**.
- Successful native read/skill events: category, requested range and a per-session keyed source identifier. Repeated reads within a session can be counted; different sessions use different keys. Exported ledgers omit the key and raw paths. This is not encryption/anonymization, and plugin-storage access remains sensitive.
- Retry counts and request-kind dispatch counts. No automatic model runs or billing-price inference.

No prompts, file contents, XML, credentials or raw provider bodies are intentionally persisted by this telemetry. Counts, models and session IDs still warrant retention/access controls. There is no automatic retention purge; manage the host's plugin storage deliberately.

**Coverage is explicitly incomplete.** The installed SDK does not provide complete native child enumeration through this telemetry path. Observed links do not guarantee that every child, request or usage record was captured; there is no custom delegation registry to fill the gap. Title/generate dispatches may be counted without their billed tokens, failed attempts may have unreported charges, and normalized host fields are not raw provider invoices. Usage exports remain marked incomplete even when all observed requests have numbers. Missing values are `null`, not zero.

Exports are bounded; truncation and missing child coverage must stay visible. The summary separates observed sums, missing-field counts and nullable bucket totals. OpenCode V2 buckets are disjoint: do not add reasoning/cache a second time. For another provider/SDK, normalize inclusive fields first and retain original usage evidence externally; run aggregates must never be mixed with child/request records. Request-duration sums are not parallel wall time.

## Evaluation and accounting integration

The existing recorder accepts optional `"usageFile": "usage.json"` in `trial.json`. It hashes and retains that execution-usage document, validates request uniqueness and acyclic parentage, rejects non-disjoint/run-aggregate records, and includes observed/missing usage in each trial summary. Legacy records without usage remain valid. `metrics` still holds operator-reported latency/tokens/cost; it is **not added** to the usage ledger totals.

Record optional `run.cacheState` (`cold`, `warm`, `mixed`, `unknown`) and `run.settings` (model/effort, worker settings, permission/config limitations) so unlike conditions are not grouped together. Preserve the actual per-request worker models; the parent's model alone does not describe a mixed-model run. Use authoritative provider billing/export evidence for realized cost, and distinguish subscription usage from estimated API list-price cost.

Optional, separately authorized trial conditions, with identical fixtures/settings and fresh isolated sessions (not a prerequisite for ordinary design work):

1. Archived previous catalog, if its exact installed source is available.
2. Archived inline baseline in an isolated fixture, if reproducible; do not bypass current role controls and pretend inline production is still supported.
3. Current specialized-primary orchestration with one worker at a time.
4. Current orchestration with two independent read-only workers in parallel and serialized author/artifact production.

If running trials, cover a tiny copy edit (one author expected), vague interview (primary conversation), advance-with-gaps, supplied-results revision, large existing-system survey, multi-actor mockup, correctness-heavy technical slice, seeded/no-defect read-only reviews and explicit repair. Include host interruption, owner-managed budget compliance, denied primary/out-of-pattern writes, denied child spawning and incomplete work. Repeat runs; compare semantic findings and unauthorized edits alongside observed tokens/cache, cost and wall time. Do not reward more artifacts or more findings. Preserve failures and unknown metrics, and separate cold/warm caches or changed models/settings.

See [recording instructions](05-skill-evaluations.md) and [manual scenarios](../skill-catalog-regressions.md). Automated tests use synthetic SDK fixtures, not paid host/model executions. **No installed-host performance trials or token-saving claims accompany this implementation.**

## Research basis

Read during the 2026-10-22 research: [OpenCode V2 skills](https://opencode.ai/v2/docs/skills/), [agents](https://opencode.ai/v2/docs/agents/) and [plugin API](https://opencode.ai/v2/docs/build/plugins/); [Claude Code subagents](https://code.claude.com/docs/en/sub-agents), [skills](https://code.claude.com/docs/en/skills) and [costs](https://code.claude.com/docs/en/costs); [Cursor subagents](https://cursor.com/docs/subagents); [OpenAI orchestration](https://openai.github.io/openai-agents-python/multi_agent/), [usage](https://openai.github.io/openai-agents-python/usage/) and [prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching); [Anthropic multi-agent research](https://www.anthropic.com/engineering/multi-agent-research-system) and [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). Runtime implementation follows the **installed SDK surface**, which can lag live documentation. Budget values, phase packs, narrowing policy and recorder integration are plugin adaptations, not externally measured efficiency guarantees.
