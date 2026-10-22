# Record installed-host skill evaluations

The catalog retains **52 public skills**. Shared policy ownership, selective principle loading, shared composition/dependency reasoning and on-demand plain-copy guidance are implemented; their performance benefits are **not measured**. No public name is deprecated or removed. Accessibility, privacy and quality-scenario guidance stays within existing package sections.

`npm test` checks code, instruction structure, references and fixtures. `npm run check:output -- <package>` checks package structure. Neither runs a host, establishes semantic correctness or validates a product with users. Manual scenarios are specifications until an actual run is recorded.

For the new phase-loading/worker implementation, host-specific restrictions, optional `usageFile`, `run.cacheState`/`run.settings`, telemetry privacy and incomplete billing coverage, see [Orchestration and tokens](06-orchestration-and-tokens.md). In particular, do not add a parent/SDK aggregate to child per-request usage or confuse cached input cost with context size. Paseo's send-only review path is blocked rather than pretending to enforce read-only permissions.

## Compare equivalent isolated runs

1. Choose a realistic case and explicit success/failure criteria **before** the run. Use [the catalog scenarios](../skill-catalog-regressions.md) and the existing [phase scenarios](../discovery-interview-regressions.md). Include good and defective packages; do not reward finding more issues or writing more files.
2. Retain the exact prompt, fixture files, baseline and installed plugin source/version. For an uncommitted plugin, archive the installed tree/diff as an input; a commit ID alone cannot identify dirty source. Record host/model settings and limitations in the trace. Remove production personal data and credentials before fixtures or traces are retained.
3. Use a fresh temporary workspace and session for each repetition. Keep model, tools, permissions and fixture equivalent across conditions, or explicitly report differences. Freeze writes while taking snapshots. Retain actual before/after workspace copies (or a baseline plus complete patch/new files) outside the workspace being measured; hashes cannot reconstruct content.
4. Before execution, enumerate exact allowed changed file paths; do not authorize files after seeing results. Read-only review should use an empty list. Snapshot the **whole isolated fixture workspace**, not just the output folder. File checks do not monitor external effects; use host permissions/isolation and inspect tool traces separately.
5. Run the installed host externally. Save its full relevant transcript/tool trace and final artifacts, including failures, refusals, unauthorized edits and incomplete work. Record actual host/model/plugin versions and session, latency/tokens/cost where available; use explicit `unknown` text or `null` metrics rather than estimates presented as measurements.
6. Snapshot after execution and inspect the retained actual files and trace. Grade semantic expectations separately from structural checks; retain concrete findings and evidence. Identify self, separate-model and human judgments. Calibrate model judgments against human examples; none supplies product-user validation or owner approval.
7. Record every trial, not only successes. Repeat isolated runs with distinct sessions and repetition numbers. Summarize individual outcomes per case/condition/version; do not combine a critical failure into an average score. Compare token/latency/cost only when available on equivalent runs and report spread and missing observations.

Useful conditions: an archived pre-change catalog, this policy-canonicalized catalog with the same names, and a no-skill baseline when the host permits it. Later experiments may compare fewer registered principle entries or alternate merges, **without changing the shipping catalog until evidence supports it**. Do not describe the shared implementation as a proven catalog reduction.

## Local recorder

Requires Node.js (same runtime as repository tests). It does not invoke a host, execute metadata, call APIs, fetch links, grade semantics or attest that the supplied run actually happened. Results are operator-supplied evidence, not independent assurance.

```text
npm run eval:record -- snapshot <isolated-workspace> <trial-folder>/before.json
# Run the actual installed host externally, retain its trace and actual result files.
npm run eval:record -- snapshot <isolated-workspace> <trial-folder>/after.json
npm run eval:record -- record <trial-folder>/trial.json <trial-folder>/record.json
npm run eval:record -- summarize <trial-folder>/record.json <another-trial>/record.json
```

Use `node scripts/record-evaluation.mjs summarize ... > summary.json` when redirecting JSON; npm may print its command banner. Output files must be new; the recorder refuses overwrite. Snapshot output must be outside the measured workspace and its parent must exist. Artifact paths inside `trial.json` resolve relative to that file, **not** the current directory; input/output arguments to the CLI resolve normally.

The following is a **template**, not a trial result. Replace placeholders using a real run before recording it. Retain `prompt.txt`, `trace.txt`, fixture and actual result files at the paths you specify. Empty `outputFiles` is appropriate for a read-only run with no saved result file; the response must still be retained in the trace.

```json
{
  "caseId": "catalog-review-read-only",
  "condition": "canonical-same-52",
  "repetition": 1,
  "run": {
    "performedAt": "REPLACE_WITH_ISO_TIMESTAMP",
    "host": "REPLACE_WITH_HOST",
    "hostVersion": "REPLACE_WITH_VERSION_OR_UNKNOWN",
    "model": "REPLACE_WITH_EXACT_MODEL_AND_SETTINGS_OR_UNKNOWN",
    "pluginVersion": "REPLACE_WITH_INSTALLED_VERSION",
    "pluginRevision": "REPLACE_WITH_REVISION_AND_ARCHIVED_DIRTY_SOURCE_REFERENCE",
    "session": "REPLACE_WITH_FRESH_SESSION_ID",
    "isolated": true
  },
  "reviewer": { "kind": "human", "name": "REPLACE_WITH_REVIEWER" },
  "promptFile": "prompt.txt",
  "transcriptFile": "trace.txt",
  "inputs": ["fixture/product-design.md", "installed-source.patch"],
  "outputFiles": [],
  "before": "before.json",
  "after": "after.json",
  "allowedPaths": [],
  "checks": [
    {
      "name": "reports seeded contradiction without repairing it",
      "kind": "semantic",
      "status": "not-run",
      "evidence": "REPLACE_AFTER_INSPECTING_TRACE_AND_FILES"
    }
  ],
  "findings": [],
  "metrics": { "latencyMs": null, "inputTokens": null, "outputTokens": null, "costUsd": null }
}
```

Check status is `pass`, `fail` or `not-run`; kind is `structural`, `semantic`, `human` or `model`. Record material findings as `{ "severity": "blocker|material|suggestion", "location": "...", "evidence": "...", "consequence": "..." }`. Check evidence may name a trace location or limitation. Findings in this record judge the agent's output/behavior, not certification of the proposed product.

## Bounds and limitations

- Snapshots record relative file paths, byte sizes and SHA-256 content hashes, not content, permissions or empty directories. Added/deleted/modified files are compared with exact `allowedPaths`; there are no wildcard grants. All mismatches are reported, not silently repaired.
- `.git` and `node_modules` **directories** are excluded at any depth. Other hidden files are included. Changes within excluded directories, transient edits later reverted, network/process effects and edits outside the measured root are not detected. Explicitly inspect the trace and repository status for those effects; do not claim "no unauthorized actions" from a clean file diff.
- Symlinks/junctions and nonregular files encountered in the scan are refused, not followed. The workspace must be quiescent and trusted, not a hostile concurrently modified filesystem. Entry limit: 10,000; per-file limit: 16 MiB; total hashed content: 64 MiB. Exceeding bounds fails instead of producing a partial pass. Use a smaller realistic fixture rather than silently omitting relevant files.
- Retained metadata/transcripts/files can contain sensitive information. The recorder does not redact or sandbox them, and hashing is not anonymization. Review access and retention; do not commit sensitive trial material. Retained artifact integrity can be checked against hashes, but operator-supplied metadata, grades and snapshots are not independently authenticated.
- Summary groups by case, condition and reported host/model/plugin versions; individual repetitions, non-isolation, failed/unrun checks, blockers, unauthorized edits and metrics remain visible. Duplicate repetition/session within a group is rejected. Summary output is not an efficiency claim, statistical test or substitute for inspecting records.

Current verification consists of automated structural/unit tests and documented manual scenarios. **No installed-host trials have been executed as part of this catalog change.**

## Research behind the catalog changes

Sources read during the 2026-10-22 audit:

- [Agent Skills specification](https://agentskills.io/specification) and [best practices](https://agentskills.io/skill-creation/best-practices): coherent units of work and progressive disclosure. Applied as selective principle/reference loading and shared implementation, not evidence that fewer folders are faster.
- [Agent Skills evaluation guidance](https://agentskills.io/skill-creation/evaluating-skills): isolated comparisons against previous/no-skill configurations, realistic expectations and trace inspection. The local recorder supports evidence retention; it does not execute those evaluations.
- [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) and [building effective agents](https://www.anthropic.com/engineering/building-effective-agents): high-signal context and simple composable workflows. Canonical policy ownership and retained public entry points are plugin adaptations, not externally proven performance gains.
- [W3C accessibility planning](https://www.w3.org/WAI/planning-and-managing/), [NIST privacy FAQ](https://www.nist.gov/privacy-framework/frequently-asked-questions) and [arc42 quality requirements](https://docs.arc42.org/section-10/): ongoing assigned accessibility work, processing harms beyond security incidents, and concrete quality scenarios. Their shared references explicitly name existing skill/section owners and limits; using them establishes no compliance claim.
