# Bounded orchestration

The active product/technical owner retains human interviews, phase authorization, recommendations, canonical definitions and final integration. Skills run inline by default. Delegate only large exploratory or artifact-heavy work that benefits from clean context or independent investigation; never one worker per skill/principle. No autonomous phase progression or human approval through a worker.

## Allowed work

- Research: bounded existing-system or external-source investigation, read-only, evidence locations and limitations; use a suitable host read-only worker or `design-research`.
- Artifact: large specified Draw.io work only after owning behavior is settled, `design-artifact`; exact authorized output paths, no conceptual/rule/copy decisions in XML. One writer per canonical artifact; never concurrent edits to the same output.
- Review: `review-design` on a stable package version/named handoff, read-only findings. Owner integrates corrections; no reviewer edits or recursive review loops. A separate model pass is not human approval.

Small copy changes, coupled rules/domain/contracts, and simple interviews stay inline. Do not delegate stakeholder decisions or browse unrelated sources. Reuse a worker for follow-up only if its evidence/version/scope remains applicable; stale context is not free.

## Handoff contract

Send objective/stopping condition; package and authoritative source paths/version; open phase, level/profile and named handoff; relevant facts/unknowns/accepted decisions; exact operation/write paths; tools/sources/checks needed; budget and escalation conditions. No prior conversation is assumed in a fresh child. Explicitly say read-only when appropriate. Switching primary agents in one session is not fresh context.

Return outcome/evidence locations, changed paths if allowed, checks actually performed, findings/uncertainties, blocked/deferred work and next owner. Save large artifacts once; return paths and a concise report, not entire XML/schemas/logs. The owner must inspect consequential sources/changes and applicable checks, not just accept a worker assurance. Truncation, timeout or step exhaustion is partial work, never success.

## Budgets and host support

Trial defaults: one delegation level, at most two concurrent workers, at most four launches per user request; no automatic retry and one owner correction/affected recheck before unresolved issues are reported. These are experimental guardrails, not measured optimal budgets. Workers cannot launch children. Disable delegation or select supported worker models/steps through host configuration; do not silently switch the user's primary model. Do not raise a budget or start a new session just to evade a limit.

OpenCode's plugin delegation tool enforces its own quotas, cancellation/timeout, write grants and child permissions; author profiles deny native child launching to avoid bypass. On other hosts these limits are procedure/host controls rather than the same runtime scheduler. If required isolation/tools/model are unavailable, work inline within the same safeguards or report the limitation; do not pretend isolation was enforced. Cursor read-only fields and Claude tool allowlists enforce read-only profiles, but per-file write grants require the host's permissions/isolation.

Token accounting must include parent and children, retries and auxiliary requests where available, cache reads/writes and actual models. Missing usage stays unknown. Retain provider accounting semantics so aggregate totals or reasoning are not counted twice. Cold/warm-cache runs, changed models and changed settings are separate conditions. No efficiency claim without equivalent repeated host trials.

At a phase/context handoff, update existing package headings with the opened/completed phase, attributed advance/repair request, cap/profile, authoritative source/version/IDs, accepted versus proposed decisions, blockers/unknowns and next permitted action. Pass these pointers and relevant facts to a fresh context; do not copy the whole transcript or create a mandatory checkpoint file. A summary is not an alternative source of truth.
