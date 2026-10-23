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
| `design-author` | Exact-path Markdown production/repairs from owner decisions; no independent policy, code or phase changes |
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
| OpenCode V2 plugin | Guards prevent direct primary mutations/research, Code Mode and native spawning; exact-path author/artifact writes; scoped review/research stay read-only despite session allows | Scoped tools are exposed directly, not through Code Mode/direct fetch. Other hooks/config may restrict further; not an OS sandbox or engineering assurance |
| Cursor | Read-only review declares `readonly: true`; primaries/leaf prompts specify their roles | Native scheduler/model behavior, root-only delegation and exact write grants require host verification. Without enforced leaf/no-recursion and path policy or isolation, report blocked execution |
| Claude Code | Primary allowlists exclude writes/shell/web research; author/artifact exclude shell/Agent | Shared reviewer profile needs host enforcement of root-only spawning. Per-file write isolation and quotas are host-specific; absent controls block execution |
| Paseo send-only adapter | **Standalone review launch is refused before sending a prompt** because this adapter cannot enforce read-only tool access | Run review in its configured underlying host profile. Product/technical prompts share canonical policy, but `.send()` does not switch tools/model, create a fresh context or enforce OpenCode quotas |

Explicit repair through the read-only review profile still produces findings for the authoring owner. This intentionally replaces the old unsafe implicit-repair behavior. Paseo no longer pretends that a review prompt makes an arbitrary selected writable agent read-only.

## OpenCode configuration

### Fresh-install agent setup

Install this plugin, then run `/setup-product-design`. No existing pstack setup, model-role file or other plugin is required. Agent roles and permission boundaries are bundled and register automatically; setup configures their models, not a new universal orchestrator.

The command lists currently available, enabled, tool-capable models and asks you to choose a model or `inherit` for each role:

- `design-product`: product decisions and phase orchestration.
- `technical-design`: technical decisions and view orchestration.
- `review-design`: root review coordination or bounded read-only child review.
- `design-research`: source investigation.
- `design-author`: exact-path Markdown production.
- `design-artifact`: specified Draw.io production.

Setup does not start a design, load design skills, run inference benchmarks, create artifacts, install providers or touch credentials. It saves only role/model references in this plugin's storage and refreshes agent definitions. Model names alone are not evidence of price, speed or suitability. Unsupported/unavailable models are rejected rather than silently replaced. `inherit` leaves model selection to the existing host/session configuration.

`/setup-product-design status` reports stored choices without changing them; `/setup-product-design cancel` exits a pending setup. Setup cannot run in a child session and its application tool is accepted only after this explicit command. Re-running setup replaces this plugin's complete six-role map, not global configuration. Existing explicit `workerModels` plugin options take precedence over setup's stored choices. Later host configuration can restrict models and tools further. Agent refresh does not silently change the model already selected on a running primary session; select it explicitly or begin a fresh session as appropriate.

### Optional budgets and overrides

Defaults: delegation available, at most **2 concurrent read-only** workers and **12 launches per user request**, no child-of-child delegation, **120 seconds** including setup per invocation, and at most 5 additional seconds of bounded termination/persistence cleanup. Canonical writers occupy the lane exclusively. Default worker steps: research 20, reviewer 24, author/artifact 40. No automatic retry. These are trial guardrails, not measured optimal settings or guaranteed output-token limits.

```json
{
  "plugins": [
    {
      "package": "opencode-product-design",
      "options": {
        "delegation": {
          "enabled": true,
          "maxConcurrent": 2,
          "maxLaunches": 12,
          "timeoutMs": 120000
        },
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

Set `delegation.enabled` false to remove the delegation tool; primaries then report blocked execution, not inline authoring. `maxConcurrent` accepts 1–2, `maxLaunches` 1–20, `timeoutMs` 1–600000, and step overrides 1–200. A cap/timeout may leave honest partial work; never treat exhaustion as success or increase a limit automatically to evade it.

Optional `workerModels` maps `design-research`, `review-design`, `design-author` or `design-artifact` to an **available** `provider/model#variant` string. No model is hard-coded. The delegator uses explicit plugin worker override, otherwise the setup selection for that worker, otherwise the configured worker model, otherwise the parent's model. Setup selections are also applied to agent defaults; existing running primary sessions retain their selected model. The plugin never calls `switchModel` on the primary session. Availability/permissions must be verified in the actual host; no silent expensive fallback is promised.

## Scoped delegation and recovery

### Activating local source changes

Editing this checkout does not update a GitHub-installed plugin. For unpublished testing, replace only this plugin's existing entry in the global `plugins` array with this checkout's absolute path (or its object form to retain options); do not add a duplicate registration or change models/default agents. Back up the config first. Reload/restart OpenCode only when running work can safely be interrupted, then start a fresh session or explicitly select the intended primary. Inspect the running service's effective agent list and plugin source: offline debug output alone may omit plugin-registered agents. Test allowed scoped delegation and denied direct primary edits/shell/MCP/native spawning in an isolated fixture. This change includes no live service reload or automatic config rewrite.

### Execution contract

OpenCode owners use `product_design_delegate`, not the native subagent tool. Scoped delegation and usage/setup tools are directly exposed (`codemode: false`), so Code Mode remains denied. Calls wait for completion; issue independent read-only tool calls together rather than calling them serially or assuming native background notifications. The handoff requires objective/stopping condition, package, authoritative source paths/version/known facts, open phase, cap, named handoff/authorization, checks and exact `writePaths` (empty for research/review). It does not carry the full parent conversation. The owner remains responsible for whether the phase and behavior are genuinely authorized; syntactically valid inputs are not human approval. Root review-design may dispatch only research/review; child reviewers cannot delegate.

Authors receive exact `.md` paths within the named package; product owners cannot open Technical by delegation. For an artifact, only Shape at Mockup/Full or Technical at Full is permitted, with exact `.drawio` paths. No traversal/globs/symlinks are allowed. Edit permission checks narrow to exact paths and recheck path ancestors. Every writer occupies the delegation lane exclusively, including across new user turns. The filesystem must be trusted/quiescent; path checks are not a race-proof OS sandbox.

Children use their own configured agent rules (including global policy) plus explicit parent session constraints. They do **not** inherit the primary's role-level mutation deny, which would prevent delegated production. Explicit session asks/denies remain ordered and a capability hook **only narrows** the resolved effect; it never upgrades ask/deny to allow. Research/review cannot write, run shell, call arbitrary MCP tools or spawn. Authors/artifact workers can read and edit only their scoped outputs; invoking an unscoped production profile cannot grant edit rights. A parent role-specific restriction that should also apply to children belongs in explicit session constraints or policy, not only the primary's agent profile.

Parent-wide reservations are persisted **before** child creation using a preallocated child ID. Launch counts are per attributed user request; active reservations are across turns. Deadlines bound the caller's wait for setup and model execution, not cancellation of underlying SDK operations: the installed Promise adapter ignores request abort options. Cleanup waits for outstanding creation/prompt admission to settle before attempting interruption and checking idle. A late admission, uncertain creation or unconfirmed termination leaves a durable fail-closed reservation instead of freeing a writer lane or retrying work. Definitive pre-submission failures release the lane. Replaying an identical tool call is rejected rather than launching again.

After a runtime reload, a previously admitted/running reservation is reconciled only when the linked child is confirmed idle. Reserved/submitting/uncertain admissions require operator inspection even if an idle snapshot exists, because an old SDK operation could still be admitted later. If a child is missing/unreachable or termination is uncertain, inspect/stop that child in the host using the reported session ID before resuming. Do not start another parent just to evade a hold. A crash before session creation can require operator inspection of plugin storage `delegation/<parent-session-id>`; only after confirming no late/active child exists should an operator repair an orphaned reservation. Do not delete the child permission scope while it can still run. There is deliberately no model-callable "force clear" escape hatch.

Workers save large artifacts once and return concise evidence/paths/checks/limitations. Reports longer than 12,000 characters are explicitly truncated/partial. The parent inspects consequential source/artifact content and applicable checks. A complete worker report is not semantic validity, rendering verification or readiness.

## Usage and loading telemetry

`product_design_usage` makes **no model calls**. By default it returns a compact observed-usage summary, coverage, retry/request-kind counts and repeated-source counts for the current session and plugin-managed children. `detail: true` explicitly returns the bounded ledger for evaluation export; use this only when needed, since that tool result itself consumes context. Extract the original JSON tool result from the host trace into a file outside the measured workspace rather than asking an agent to rewrite it.

With `telemetry: false` (default), no sampling hooks or usage persistence run. An on-demand snapshot can read current context usage, but compaction may already have removed history. Delegation reservations/child permission scopes are still persisted because they are safety state, not optional telemetry.

With `telemetry: true`, the plugin retains:

- Per-request OpenCode-normalized input, output, reasoning, cache-read/cache-write and reported cost, deduplicated by session/request ID.
- Character counts of assembled system/messages/tool schemas at dispatch, **not token counts or their contents**.
- Successful native read/skill events: category, requested range and a per-session keyed source identifier. Repeated reads within a session can be counted; different sessions use different keys. Exported ledgers omit the key and raw paths. This is not encryption/anonymization, and plugin-storage access remains sensitive.
- Retry counts and request-kind dispatch counts. No automatic model runs or billing-price inference.

No prompts, file contents, XML, credentials or raw provider bodies are intentionally persisted by this telemetry. Counts, models and session IDs still warrant retention/access controls. There is no automatic retention purge; manage the host's plugin storage deliberately. Do not delete active delegation safety records merely to clear telemetry.

**Coverage is explicitly incomplete.** The installed 2.0.28 plugin SDK has no `session.list` or `permission.assert`; runtime code uses supported hooks and its own durable child registry instead. Native/unrelated children are not enumerated. Title/generate dispatches may be counted without their billed tokens, failed attempts may have unreported charges, and normalized host fields are not raw provider invoices. Usage exports remain marked incomplete even when all observed requests have numbers. Missing values are `null`, not zero.

Bounds: at most 20 exported sessions, 2,000 requests/context samples/load events per retained session and 100 parent registry entries before completed-history pruning. Truncation/missing children stay visible. The summary separates observed sums, missing-field counts and nullable bucket totals. OpenCode V2 buckets are disjoint: do not add reasoning/cache a second time. For another provider/SDK, normalize inclusive fields first and retain original usage evidence externally; run aggregates must never be mixed with child/request records. Request-duration sums are not parallel wall time.

## Evaluation and accounting integration

The existing recorder accepts optional `"usageFile": "usage.json"` in `trial.json`. It hashes and retains that execution-usage document, validates request uniqueness and acyclic parentage, rejects non-disjoint/run-aggregate records, and includes observed/missing usage in each trial summary. Legacy records without usage remain valid. `metrics` still holds operator-reported latency/tokens/cost; it is **not added** to the usage ledger totals.

Record optional `run.cacheState` (`cold`, `warm`, `mixed`, `unknown`) and `run.settings` (model/effort, worker settings, permission/config limitations) so unlike conditions are not grouped together. Preserve the actual per-request worker models; the parent's model alone does not describe a mixed-model run. Use authoritative provider billing/export evidence for realized cost, and distinguish subscription usage from estimated API list-price cost.

Trial conditions, with identical fixtures/settings and fresh isolated sessions:

1. Archived previous catalog, if its exact installed source is available.
2. Archived inline baseline in an isolated fixture, if reproducible; do not disable current delegation and pretend inline production is still supported.
3. Current specialized-primary orchestration with one worker at a time.
4. Current orchestration with two independent read-only workers in parallel and serialized author/artifact production.

Cover a tiny copy edit (one author expected), vague interview (primary conversation), advance-with-gaps, supplied-results revision, large existing-system survey, multi-actor mockup, correctness-heavy technical slice, seeded/no-defect read-only reviews and explicit repair. Include cancellation, quota, denied primary/scoped writes and incomplete work. Repeat runs; compare semantic findings and unauthorized edits alongside observed tokens/cache, cost and wall time. Do not reward more artifacts or more findings. Preserve failures and unknown metrics, and separate cold/warm caches or changed models/settings.

See [recording instructions](05-skill-evaluations.md) and [manual scenarios](../skill-catalog-regressions.md). Automated tests use synthetic SDK fixtures, not paid host/model executions. **No installed-host performance trials or token-saving claims accompany this implementation.**

## Research basis

Read during the 2026-10-22 research: [OpenCode V2 skills](https://opencode.ai/v2/docs/skills/), [agents](https://opencode.ai/v2/docs/agents/) and [plugin API](https://opencode.ai/v2/docs/build/plugins/); [Claude Code subagents](https://code.claude.com/docs/en/sub-agents), [skills](https://code.claude.com/docs/en/skills) and [costs](https://code.claude.com/docs/en/costs); [Cursor subagents](https://cursor.com/docs/subagents); [OpenAI orchestration](https://openai.github.io/openai-agents-python/multi_agent/), [usage](https://openai.github.io/openai-agents-python/usage/) and [prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching); [Anthropic multi-agent research](https://www.anthropic.com/engineering/multi-agent-research-system) and [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). Runtime implementation follows the **installed SDK surface**, which can lag live documentation. Budget values, phase packs, narrowing policy and recorder integration are plugin adaptations, not externally measured efficiency guarantees.
