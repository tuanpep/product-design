# Fresh-install agent setup (OpenCode V2)

Install only this plugin:

```sh
opencode plugin add github:tuanpep/product-design
```

Then run:

```text
/setup-product-design
```

Choose an available model or `inherit` for each role when prompted:

| Primary | Responsibility |
| --- | --- |
| `design-product` | Product decisions, human clarification and phase orchestration |
| `technical-design` | Explicit technical continuation and technical decisions |
| `review-design` | Read-only review coordination and reconciled verdicts |

| Leaf | Execution |
| --- | --- |
| `design-research` | Read-only source investigation |
| `design-author` | Exact-path Markdown production from owner decisions |
| `design-artifact` | Exact-path specified Draw.io production |

`review-design` can also run as a nonrecursive review leaf. Setup does not add a universal primary, replace Code, configure other plugins, or require pstack. Agent definitions and capability boundaries register automatically; setup saves role/model choices, not copies of global agent files.

The available-model list comes from your host. Unavailable/disabled models, models without tool support, and nonexistent variants are rejected. No model is assumed faster or cheaper based on its name. `inherit` uses existing host/session defaults; it does not erase an explicit host model setting.

## Inspect, rerun or cancel

```text
/setup-product-design status
/setup-product-design cancel
```

Re-running the wizard replaces this plugin's six-role model map only after complete validation. Choices persist in plugin storage. Explicit `workerModels` plugin options take precedence, and host policies can still restrict access. Running primary sessions are not silently switched to another model; select the intended model or start a fresh session as appropriate.

Setup does not write `opencode.json`, project files, credentials, provider definitions, or other plugin settings. It does not change the default primary, install packages, reload the service, run benchmarks, invoke product-design skills, or begin a product design. The interactive model-selection conversation itself uses your current model; status and cancel do not request inference. If your host cannot list models or reload agent definitions, report setup as blocked rather than claiming success.

After setup, select `design-product` or run `/design-product <brief>`. Primaries own decisions; leaves execute. Independent read-only assignments can run in parallel (two maximum); canonical writers are serialized. See [orchestration and model precedence](guide/06-orchestration-and-tokens.md).

Setup is an OpenCode V2 command; other host adapters do not expose this wizard. Automated tests use mocked SDK calls, not paid inference or a live-host installation trial.
