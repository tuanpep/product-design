# Discovery interview and sufficient-context gate

This reference owns the context gate for every mode and level. It takes precedence over instructions to continue, supply defaults, skip questions, or deliver Full. A short brief can be sufficient; a long feature list can be insufficient. Check meaning, not word count. Reuse facts already supplied in the brief, repository, or existing design rather than asking again.

## Enough context to Shape

Before comparing solutions or producing a to-be design, establish:

- An identifiable primary actor and the context in which they act.
- A concrete task, trigger, and current workflow, grounded in a recent real case; for a new product, an explicitly hypothetical scenario confirmed by the human is acceptable.
- A specific friction and consequence, or opportunity, with its source recorded.
- An observable desired outcome. Do not invent metrics or demand numbers where none exist.
- The decision this work supports and the distinction between user outcomes and business/service outcomes; mark an unavailable owner or organisational measure unknown rather than guessing. Explain known conflicts.
- First scope and priorities, and critical constraints that could invalidate the direction. Record other unknowns explicitly with a way to learn them; not every project detail is required.

Missing core facts cannot be supplied as proposed defaults. An unknown constraint is blocking when it could invalidate the actor, task, scope, safe use, or feasibility of the direction (for example, whether sensitive records may be shared). Optional preferences and reversible implementation details need not block. Once the gate is clear, nonblocking unknowns can have labeled proposed defaults under the normal evidence contract.

## Interview when the gate is not clear

Stay in **Understand**. Ask 1–3 focused open questions per turn, preferably one main question about the most consequential gap. Do not send a questionnaire covering every field. Start broad, then follow the person's answer with targeted probes. Skip known information.

For “build a task app”, a useful first question is: “Who would use it, and can you walk me through the last time they tried to keep track of work?” Follow up on the trigger, what happened, what made it difficult, and the consequence. For a feature-led request, separate the requested feature from the outcome before exploring solutions. Ask “What led to that?” rather than an accusatory sequence of “why” questions. Neutral examples can help someone answer, but are aids, not evidence or suggested core facts to silently adopt.

Brainstorm the **context** together: possible actors, situations, and questions to investigate, not premature screens or solution options. Separate verbatim statements from interpretation; mark stakeholder accounts as given, not direct observation or end-user validation. A single person's story is one data point, not a population finding. Do not invent quotes, research results, or causal certainty.

If the person does not know, offer a choice: agree a representative hypothetical scenario as an explicit, human-approved exploration premise, or plan real research. Never silently choose the scenario. Stakeholder approval permits exploration; it does not validate end users. For real participant research, plan informed consent, voluntary participation, privacy, and safe handling of notes; avoid unnecessary identifying or sensitive details in chat or files.

After an interview supplies enough context, summarize the actor, task/current workflow, friction/source, outcome, scope/priorities, constraints, and remaining unknowns. Ask the human to confirm or correct that understanding **before the first Shape step**. Corrections that expose a core gap keep the gate closed. Do not require this additional confirmation for an already sufficient brief. Do not repeat it on every stage or unchanged revision.

## While blocked

No solution comparison, to-be diagrams, screens, mockup, or build spec. You may save `product-design.md` with `Profile: discovery` and `Next gate: repeat discovery`, discovery gaps, a research plan, and current-state notes. Do not dress guesses up as requirements. A requested level is a cap, not permission to pass this gate.

**Advise and Full do not override this gate.** Pause to interview if core context is missing. If the person explicitly forbids questions, provide only the discovery summary, gaps, and research plan, then stop. Do not output a speculative solution package. In revisions, reopen this gate only if a core premise changes or is invalidated; preserve unaffected work and do not restart discovery for copy or layout edits.

## Brainstorm after understanding

"Brainstorm" alone does not select Understand: ask whether the person wants to explore the problem or alternative solutions when unclear. Problem/context brainstorming stays in Understand. Solution brainstorming still requires this gate, regardless of mode or requested level. Before that brainstorming, use [the learning loop](learning-loop.md) to synthesize sources through observations, patterns (including contradictions), findings, and opportunities, and select a bounded target opportunity. Hypothetical context can support a provisional opportunity hypothesis, not an observed finding.

Once the gate passes and an opportunity is selected, use this sequence in `explore-solutions`:

1. Frame one bounded, solution-neutral question from the confirmed problem: “How might we help [actor] achieve [outcome] when [situation]?” Avoid embedding an app, AI, dashboard, or other requested implementation in the question unless it is a genuine confirmed constraint.
2. Invite the human's ideas first in guided mode. Generate a small set of meaningfully different directions together; build on suggestions and defer judgment during generation. Include the existing approach, reuse, and a process or non-software change where credible. Do not treat generated ideas as evidence.
3. Separate evaluation from generation. Group related ideas, then compare against the confirmed outcome, constraints, user effort, risk, and reversibility. Ask which trade-off matters most when it cannot be inferred from the confirmed context. Advise mode may recommend that trade-off without pausing once the context gate is clear.
4. Summarize the promising direction, alternatives not taken, and the weakest assumption. Choose the smallest check that could disprove that assumption before further commitment. Human preference is a decision input, not proof of demand or usability.

This is conversational divergence and convergence, not a requirement to hold a timed workshop or produce a fixed number of ideas. If the human only wants problem brainstorming, remain in Understand rather than using this sequence to advance their requested level.

## Research basis and adaptation boundaries

Primary sources inspected 2026-10-15:

- [GOV.UK: in-depth interviews](https://www.gov.uk/service-manual/user-research/using-in-depth-interviews): open neutral questions, real stories and examples, flexible follow-ups, summaries to check understanding, and consent/privacy. Adapted here to a short stakeholder dialogue; this chat is not a substitute for participant research.
- [GOV.UK: user research in discovery](https://www.gov.uk/service-manual/user-research/user-research-in-discovery) and [how discovery works](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works): learn who users are, their tasks, current process, problems, and constraints before planning/design/build; challenge predefined solutions and do not build during discovery.
- [IDEO Design Kit: Interview](https://www.designkit.org/methods/interview.html): broad to specific, distinguish quotes from interpretation, and treat each account as one data point.
- [IDEO: Five Whys](https://www.designkit.org/methods/the-five-whys.html): probe motivations in depth. Adapt with non-accusatory wording; do not force exactly five questions or claim a verified causal root.
- [IDEO: How Might We](https://www.designkit.org/methods/how-might-we.html): derive bounded prompts from insights, neither too broad nor embedding the solution.
- [IDEO: Brainstorm](https://www.designkit.org/methods/brainstorm.html) and [Brainstorm Rules](https://www.designkit.org/methods/28.html): defer judgment, generate alternatives, and build on ideas before separate evaluation. Solution brainstorming belongs after the context gate, not in place of it.

The qualitative checklist, 1–3-question turn limit, confirmation checkpoint, mode precedence, and artifact restrictions are this plugin's operational adaptation, not requirements claimed verbatim from these sources. They establish enough context to explore, not proof of demand, safety, feasibility, or permission to build.
