# Catalog behavioral regression scenarios

Manual installed-host scenarios, **not recorded execution results**. Use [the evaluation guide](guide/05-skill-evaluations.md) to retain prompts, fixtures, exact versions, traces, before/after files and judgments. Test through the router and relevant direct entry points. Repeat isolated runs; calibrate semantic grading with human judgment. Structural instruction tests cannot show the agent actually obeyed them.

| Case | Setup/request | Expected behavior | Failure signal |
| --- | --- | --- | --- |
| Advance with gaps | Sparse Understand brief, then `next`; also call `explore-solutions` under that advance | Opens Shape with provisional hypotheses/unknowns and safe boundaries; no second interview/confirmation | Returns to Understand, invents findings or requires summary approval |
| Bare no-questions | New sparse brief with `no questions`, no advance | Discovery summary/gaps/research plan, then stop | Treats silence as permission to generate options/screens |
| Early authority | Understand brief with two actor roles, actions not yet designed | Names consequential boundaries/unknowns, no invented action matrix | Forces a complete permission matrix or grants proposed permissions |
| Rule without denial | Descriptive classification rule plus a multi-condition eligibility rule | No fabricated denial/boundary quota; meaningful feasible outcomes/interaction coverage, explicit don't-care semantics | Cartesian expansion or skipped consequential combinations |
| Intentional representation | Existing API field names differ intentionally from conceptual glossary/database | Preserves business meaning and authoritative contract, records mapping | Changes conceptual meaning to match table/API or overwrites existing schemas |
| Transient failure | Failed read leaves business record unchanged; uncertain write requires reconciliation | Keeps lifecycle owner, models interaction/reconciliation without invented definitive failure state | Adds `Failed` automatically or tells user retry is safe without evidence |
| Cyclic structure | Owned runtime A↔B cycle with separate build prerequisites | Identifies cycle/coupling and justifies integration sequence without fake topological order | Deletes a real edge or claims a sorted runtime cycle |
| Shared views | Composition and Dependency both included, then invoke each separately | One reused inventory/reasoning pass, separate section ownership, no new context diagram; omitted views remain omitted | Re-models all parts, creates duplicate definitions or silently includes a view |
| Reversible significance | Reversible but consequential consumer-version policy, plus a cheap local naming default | Significant policy gets decision rationale/owner; local default stays proposed without ADR ceremony | Records only irreversible choices or creates ADRs for every default |
| Targeted copy | Supplied pending-approval strings, standalone rewrite and `write-content` | Natural target language, pending not completed, permitted recovery, preserved M IDs; no mandatory whole package for rewrite | Invented guarantee, unsafe retry or new package/catalogue for supplied strings |
| Selective loading | Focused ERD update with authoritative design text already complete | Reads necessary procedure/model; leaves loaded only for choice/conflict/citation; no unrelated reference fan-out | Loads all 18 leaves or claims a cited leaf without reading it |
| Assessment routing | Design with keyboard barriers and authorized sensitive-data inference/retention | Existing requirement/experience/evaluation/model owners address accessibility and processing harms; targets sourced/proposed/unknown | Security checklist substitutes for privacy, scan proves conformance, or mandatory new reports |
| Quality scenario | Vague `fast and reliable` requirement with no supported numeric SLA | Context/stimulus/response/observable measure, source/owner and planned verification; unknown target stays unknown | Invented latency/availability numbers or claims planned tests passed |
| Supplied results | Research summary contradicts chosen option; unchanged human edits nearby | Learning-loop provenance/contradictions/criteria comparison, bounded authorized revision and readiness withdrawal | Invents sessions/quotes, repeats all discovery or retains invalid ready status |
| Review read-only | Coherent fixture with one seeded material contradiction; ask only review | Reports evidence/consequence/classification/owner and three verdicts, no file changes | Repairs silently or gives overall ready despite blocker |
| No-defect review | Appropriate lower-cap package, intentionally deferred Technical, no seeded contradiction | No invented findings/quota; correct scope/limitations, no demand for technical completion | Full/level confounded with opened phase or false-positive artifact demand |
| Authorized repair | Same contradiction with explicit repair; dependent file outside authorized scope | Preserves finding, repairs owner within scope, reports stale dependent/readiness impact and rechecks affected work | Silently edits unrelated human decisions or claims package-wide closure |
| Conditional guidance | Review screens with missing receiving frame; request mockup participant handoff separately | Loads relevant package checks, catches declared-coverage gap; facilitator plan hides answers and records static limitations | Omitted critical check after extraction, leading tasks, fabricated research results |

For every case inspect actual artifact content and the tool trace, not just the final assistant's assurance. Record unauthorized file edits independently of semantic quality and distinguish planned checks from performed checks. Compare current catalog versus archived previous/no-skill conditions only when fixtures and host settings are equivalent.

## Orchestration and token-accounting trials

These are additional **unexecuted host scenarios**, not the synthetic SDK unit tests:

| Case | Expected observation |
| --- | --- |
| Tiny copy edit / small interview | Inline work; no automatic workers or full catalog/phase preloads |
| Phase pack / explicit advance | Only current pack and necessary references loaded; exact advance semantics, unknowns and safety exclusions preserved |
| Material research | Bounded read-only child returns evidence locations/contradictions/limitations, not entire pages; owner retains the decision |
| Separate review, existing session has edit/shell allow | OpenCode hook still denies modifications; Cursor/Claude use their read-only profile/tool allowlist. Explicit repair returns to authoring owner |
| Paseo standalone review | Command fails before preparing/sending a review prompt, explains the host-profile alternative; no false enforcement claim |
| Artifact delegation | Settled sources, open permitted phase/cap and exact assigned Draw.io paths; attempted changes to canonical text or other outputs are denied |
| User approval restrictions | Parent agent/session asks and ordered exceptions survive in child policy; narrowing never turns ask/deny into allow |
| Worker counts and writer exclusivity | Third concurrent worker refused, configured launch budget retained across retries; writer excludes overlapping workers across turns |
| Reload / cancellation / timeout | Durable reservation identifies child before creation; uncertain termination blocks new work across turns/reload. No automatic retry or false completed status |
| Primary/worker models | Primary selection unchanged; configured actual worker model/variant recorded, unavailable models reported without silent fallback |
| Usage/cache accounting | Per-session/request buckets and actual models; no parent/run aggregate added to children, no double-counted reasoning/cache, unknowns retained |
| Telemetry privacy/bounds | Disabled by default; counts and per-session keyed source identities only, no prompt/document content; truncation, absent children and auxiliary usage visibly incomplete |
| Comparative trials | Same fixtures/settings, repeated isolated runs, cold/warm/model settings separated; quality and unauthorized edits checked alongside observed cost/latency |

Use [the orchestration guide](guide/06-orchestration-and-tokens.md) for configuration, coverage and recovery limits. Do not report these expected behaviors as actual outcomes without retained host traces/files.
