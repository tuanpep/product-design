# Concrete quality scenarios

Trigger: a quality adjective or vague target could change a product decision or prevent meaningful verification. `define-requirements` owns the requirement; `specify-build` carries it into SRS Non-functional requirements. Reuse the owning R requirement ID; procedures/results belong to C cases in the Test Plan.

For a consequential usage or change scenario, state:

**Context/environment → stimulus and source → affected scope → expected response → measure/target → source/owner → verification.**

Example (proposed, not a benchmark): while an operator views a queue on a constrained connection, another actor changes a record; the next committing action detects a stale version and preserves the operator's entered work. Measure: no silent overwrite in the specified competing-write scenario; source/owner and implementation check remain to be assigned. A latency target would need its own source and workload, not an invented number.

- Specify boundary/workload and how the response is observed. Qualitative pass/fail can be meaningful; arbitrary milliseconds or percentages are not mandatory.
- Keep source and evidence class beside each target. Record an unknown target with owner/question and the decision it affects. Do not supply false precision to complete a row.
- Use scenarios for material availability/recovery, performance, accessibility, privacy, security, compatibility, operability and modifiability concerns as applicable. Do not generate one per characteristic by quota.
- Start with brief quality goals in Understand. Add scenario detail when Shape/Specify or Technical needs it; do not freeze a mechanism prematurely. Include competing goals and the trade-off decision when relevant.
- Distinguish planned verification from measured results, workload assumptions from actual traces, and structural validation from behavioral assurance. Reference existing adequate scenarios rather than rewriting them.

Write inline in existing Needs and requirements or SRS Non-functional requirements. No extra artifact or formal scenario catalogue is required. Technical architecture remains outside this plugin.

Basis: [arc42 Quality Requirements](https://docs.arc42.org/section-10/), read 2026-10-22, supports concrete usage/change scenarios and references to already specified goals. The compact fields and phase integration above are plugin adaptations.
