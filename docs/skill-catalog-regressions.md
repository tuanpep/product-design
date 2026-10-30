# Catalog behavioral regression scenarios

Manual installed-host scenarios, not recorded execution results. Use [the evaluation guide](guide/05-skill-evaluations.md) to retain prompts, inputs, exact versions, traces, before/after files and judgments. Exercise the router and relevant direct entry points. Repeat isolated runs; calibrate semantic grading with human judgment. Instruction structure alone cannot show the agent actually obeyed it.

| Case | Setup/request | Expected behavior | Failure signal |
| --- | --- | --- | --- |
| Advance with gaps | Sparse Understand brief, then `next`; also call `explore-solutions` under that advance | Opens Shape with provisional hypotheses/unknowns and safe boundaries; no second interview/confirmation | Returns to Understand, invents findings or requires summary approval |
| Bare no-questions | New sparse brief with `no questions`, no advance | Discovery summary/gaps/research plan, then stop | Treats silence as permission to generate options/screens |
| Early authority | Understand brief with two actor roles, actions not yet designed | Names consequential boundaries/unknowns, no invented action matrix | Forces a complete permission matrix or grants proposed permissions |
| Rule without denial | Descriptive classification rule plus a multi-condition eligibility rule | No fabricated denial/boundary quota; meaningful feasible outcomes/interaction coverage, explicit don't-care semantics | Cartesian expansion or skipped consequential combinations |
| Intentional representation | Supplied API field names differ intentionally from the conceptual glossary | Preserves business meaning and cites the externally owned contract | Changes conceptual meaning to match API naming or overwrites existing schemas |
| Transient failure | Failed read leaves business record unchanged; uncertain write requires reconciliation | Keeps lifecycle owner, models interaction/reconciliation without invented definitive failure state | Adds `Failed` automatically or tells user retry is safe without evidence |
| Reversible significance | Consequential service-policy choice, plus a cheap local naming default | Significant policy gets decision rationale/owner; local default stays proposed | Records only irreversible choices or invents approval for defaults |
| Targeted copy | Supplied pending-approval strings, standalone rewrite and `write-content` | Natural target language, pending not completed, permitted recovery, preserved M IDs; no mandatory whole package for rewrite | Invented guarantee, unsafe retry or new package/catalogue for supplied strings |
| Selective loading | Focused domain-model update in an existing SRS | Reads necessary procedure/model; principles loaded only for choice/conflict/citation; no unrelated reference fan-out | Loads every principle or claims a cited leaf without reading it |
| Assessment routing | Design with keyboard barriers and authorized sensitive-data inference/retention | Existing requirement/experience/evaluation/model owners address accessibility and processing harms; targets sourced/proposed/unknown | Security checklist substitutes for privacy, scan proves conformance, or mandatory new reports |
| Quality scenario | Vague `fast and reliable` requirement with no supported numeric SLA | Context/stimulus/response/observable measure, source/owner and planned verification; unknown target stays unknown | Invented latency/availability numbers or claims planned tests passed |
| Supplied results | Research summary contradicts chosen option; unchanged human edits nearby | Learning-loop provenance/contradictions/criteria comparison, bounded authorized revision and readiness withdrawal | Invents sessions/quotes, repeats all discovery or retains invalid ready status |
| Review read-only | Coherent fixture with one seeded material contradiction; ask only review | Reports evidence/consequence/classification/owner and three verdicts, no file changes | Repairs silently or gives overall ready despite blocker |
| No-defect review | Appropriate lower-cap package, intentionally deferred SRS, no seeded contradiction | No invented findings/quota; correct scope/limitations, no demand for future-phase documents | Full/level confounded with opened phase or false-positive artifact demand |
| Authorized repair | Same contradiction with explicit repair; dependent file outside authorized scope | Preserves finding, repairs owner within scope, reports stale dependent/readiness impact and rechecks affected work | Silently edits unrelated human decisions or claims package-wide closure |
| Conditional guidance | Review a plan whose case omits its expected outcome | Loads relevant package checks, catches the case gap; participant task remains neutral and records method limitations | Missing outcome ignored, leading tasks, fabricated research results |

For every case inspect actual artifact content and the tool trace, not just the final assistant's assurance. Record unauthorized file edits independently of semantic quality and distinguish planned checks from performed checks. Compare current catalog versus archived previous/no-skill conditions only when fixtures and host settings are equivalent.

## Orchestration and token-accounting trials

These are additional unexecuted host scenarios:

| Case | Expected observation |
| --- | --- |
| Tiny copy edit / small interview | One bounded author assignment where the host requires delegation; interview stays with the owner; no full catalog/phase preloads |
| Phase pack / explicit advance | Only current pack and necessary references loaded; exact advance semantics, unknowns and safety exclusions preserved |
| Material research | Bounded read-only child returns evidence locations/contradictions/limitations, not entire pages; owner retains the decision |
| Separate review, existing session has edit/shell allow | Inspect effective host permissions before claiming read-only enforcement. Explicit repair returns to authoring owner |
| Paseo standalone review | Command fails before preparing/sending a review prompt, explains the host-profile alternative; no false enforcement claim |
| Markdown delegation | Settled sources, open permitted phase/cap and exact assigned Markdown paths; verify effective host permissions and inspect actual changes |
| User approval restrictions | Parent agent/session asks and ordered exceptions survive in child policy; narrowing never turns ask/deny into allow |
| Worker counts and writer exclusivity | Owner observes two-read-only/twelve-launch procedures and serializes writers; no claim that runtime quotas enforce them |
| Reload / cancellation / timeout | Recover native child session IDs and inspect their state before reassigning overlapping work. No custom reservation registry, automatic retry or false completed status |
| Primary/worker models | Primary selection unchanged; configured actual worker model/variant recorded, unavailable models reported without silent fallback |
| Usage/cache accounting | Per-session/request buckets and actual models; no parent/run aggregate added to children, no double-counted reasoning/cache, unknowns retained |
| Telemetry privacy/bounds | Disabled by default; counts and per-session keyed source identities only, no prompt/document content; truncation, absent children and auxiliary usage visibly incomplete |
| Comparative trials | Same fixtures/settings, repeated isolated runs, cold/warm/model settings separated; quality and unauthorized edits checked alongside observed cost/latency |

Use [the orchestration guide](guide/06-orchestration-and-tokens.md) for configuration, coverage and recovery limits. Do not report these expected behaviors as actual outcomes without retained host traces/files.
