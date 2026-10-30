# Record installed-host skill evaluations

The catalog contains 29 public skills, including twelve principles. Selective loading and shared policy ownership are implemented, but their performance benefits are not measured. No automated test suite, output validator or evaluation recorder is bundled.

Use [the catalog scenarios](../skill-catalog-regressions.md), [phase scenarios](../discovery-interview-regressions.md) and [template scenarios](../template-workflow-regressions.md) as manual trial plans. They are not recorded results or proof of model behavior.

## Compare equivalent isolated runs

1. Choose a realistic case and explicit success/failure criteria before the run. Include good and defective packages; do not reward more findings or more files.
2. Retain the prompt, input files and exact installed plugin source/version. For an uncommitted plugin, archive the installed tree or diff; a commit ID alone cannot identify dirty source. Record host/model settings and limitations.
3. Use a fresh temporary workspace and session for each repetition. Keep tools, permissions, model and inputs equivalent across conditions, or report differences. Retain actual before/after files outside the workspace being measured.
4. Enumerate exact allowed changed paths before execution. Read-only review permits none. Compare the whole isolated workspace, not just the output folder. Inspect tool traces separately for network/process effects and writes outside the workspace.
5. Run the installed host and retain its transcript, tool trace and artifacts, including failures, refusals, unauthorized edits and incomplete work. Record host/model/plugin versions, session ID, latency, tokens and cost where available. Missing measurements stay unknown.
6. Inspect actual output and changes. Record each finding's location, evidence, consequence and severity. Separate document-structure checks from semantic, model and human judgments. None establishes product-user validation or owner approval.
7. Retain every trial. Repeat with distinct sessions and summarize each outcome before comparing costs. Do not average away critical failures or compare unlike cache/model conditions.

Useful conditions include an archived previous catalog, the current essentials catalog and a no-skill baseline when the host permits it. Retain the exact source for each. A smaller catalog alone does not prove better performance.

## Keep a manual trial record

Use a local document with:

- Case, condition, repetition, date and fresh session ID.
- Host, model/settings and installed plugin version/source.
- Prompt, inputs, before/after files and full relevant transcript/tool trace.
- Predeclared allowed paths and observed unauthorized changes.
- Criteria, performed checks, results, findings, limitations and reviewer identity.
- Measured latency, tokens, cost and cache state, or explicit unknowns.

Save the original `product_design_usage` JSON result alongside the trace when needed. Its child inventory and billing coverage are incomplete. Keep per-request usage separate from parent/run aggregates and operator-reported totals. See [orchestration and tokens](06-orchestration-and-tokens.md).

## Limits

File comparisons cannot detect transient edits that were reverted, network/process effects or writes outside the compared workspace. Hashes cannot reconstruct content, prove authenticity or anonymize sensitive material. Inspect retained files and traces, and use host permissions and isolation.

Remove production personal data and credentials before retaining trial material. Review access and retention. Operator-supplied evidence is not independent assurance.

No installed-host performance trials or token-saving claims accompany this catalog.
