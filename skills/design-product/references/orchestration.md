# Bounded orchestration

`design-product` owns product phases; primary `review-design` owns review scope. They retain interviews, phase authorization, recommendations and integration judgment. Delegate research/authoring/review when the host requires it; do not manufacture a swarm.

## Allowed work

- Research: `design-research` — read-only, evidence locations and limitations
- Author: `design-author` — assigned Markdown from settled decisions
- Review: `review-design` leaf — read-only findings on a stable package

No Draw.io / artifact worker. Small or coupled work stays with the owner when the host allows writes. Never create one worker per skill/principle. No autonomous phase progression.

## Handoff

Send objective, package paths/version, phase/cap, facts/unknowns, exact write paths, budget and escalation. Return paths, checks performed, findings and blockers — not whole documents.

## Budgets

At most two concurrent read-only workers and twelve launches per request; serialize writers; one authorized correction/recheck. These are procedures, not runtime quotas. Children cannot spawn. OpenCode roots may launch only design-research, design-author and review-design.
