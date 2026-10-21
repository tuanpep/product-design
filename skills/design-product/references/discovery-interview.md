# Discovery interview and sufficient-context gate

This reference owns the context gate for every mode and level. On a new brief that does not ask to continue, it takes precedence over advise, Full, proposed defaults, and instructions to skip questions. An advance request, defined below, takes precedence over this interview: open the next phase and record the gaps as unknown. A short brief can be sufficient; a long feature list can be insufficient. Check meaning, not word count. Reuse facts already supplied in the brief, repository, or existing design rather than asking again.

## Enough context to Shape

Before comparing solutions or producing a to-be design, establish:

- An identifiable primary actor and the context in which they act.
- A concrete task, trigger, and current workflow, grounded in a recent real case; for a new product, an explicitly hypothetical scenario confirmed by the human is acceptable.
- A specific friction and consequence, or opportunity, with its source recorded.
- An observable desired outcome. Do not invent metrics or demand numbers where none exist.
- The decision this work supports and the distinction between user outcomes and business/service outcomes; mark an unavailable owner or organisational measure unknown rather than guessing. Explain known conflicts.
- First scope and priorities, and critical constraints that could invalidate the direction. Record other unknowns explicitly with a way to learn them; not every project detail is required.

Missing core facts cannot be invented or supplied as proposed defaults. While the person has not asked to leave Understand, an unknown constraint is blocking when it could invalidate the actor, task, scope, safe use, or feasibility of the direction (for example, whether sensitive records may be shared). When they ask to leave, record that constraint as unknown and exclude the unsafe behavior instead of asking again. Optional preferences and reversible implementation details need not block. Once the next phase is open, nonblocking unknowns can have labeled proposed defaults under the normal evidence contract.

## Interview when the gate is not clear

Stay in **Understand** until the person asks to leave. Ask 1–3 focused open questions per turn, preferably one main question about the most consequential gap. Do not send a questionnaire covering every field. Start broad, then follow the person's answer with targeted probes. Skip known information. When they ask to go next, stop interviewing and follow [When they ask to leave Understand](#when-they-ask-to-leave-understand).

For “build a task app”, a useful first question is: “Who would use it, and can you walk me through the last time they tried to keep track of work?” Follow up on the trigger, what happened, what made it difficult, and the consequence. For a feature-led request, separate the requested feature from the outcome before exploring solutions. Ask “What led to that?” rather than an accusatory sequence of “why” questions. Neutral examples can help someone answer, but are aids, not evidence or suggested core facts to silently adopt.

Brainstorm the **context** together: possible actors, situations, and questions to investigate, not premature screens or solution options. Separate verbatim statements from interpretation; mark stakeholder accounts as given, not direct observation or end-user validation. A single person's story is one data point, not a population finding. Do not invent quotes, research results, or causal certainty.

If the person does not know, offer a choice: agree a representative hypothetical scenario as an explicit, human-approved exploration premise, or plan real research. Never silently choose the scenario. Stakeholder approval permits exploration; it does not validate end users. For real participant research, plan informed consent, voluntary participation, privacy, and safe handling of notes; avoid unnecessary identifying or sensitive details in chat or files.

After an interview supplies enough context, summarize the actor, task/current workflow, friction/source, outcome, scope/priorities, constraints, and remaining unknowns once. Skip that summary for an already sufficient brief. Do not repeat it on a later phase or an unchanged revision. Apply a correction before Shape. If the correction is specific, or the person also asks to continue, open Shape. If the correction removes a core fact and they did not ask to continue, ask one targeted follow-up. Do not ask them to confirm the correction, and do not ask whether they approve the phase or which level to run.

## While blocked

Until the person asks to leave Understand, do not compare solutions or write a to-be diagram, screens, mockup, or build spec. You may save `product-design.md` with `Profile: discovery` and `Next gate: repeat discovery`, discovery gaps, a research plan, and current-state notes. Do not dress guesses up as requirements.

**Advise and Full do not skip a first interview.** A vague new brief is still interviewed. If the person forbids questions and does not ask to continue, provide only the discovery summary, gaps, and research plan, then stop. Do not invent a solution package. In a revision, reopen this gate only when a core premise changes and they have not asked to continue. Preserve unaffected work. Do not restart discovery for copy or layout edits.

## When they ask to leave Understand

An advance request opens the next phase in this message. It overrides a still-open interview, a pending summary, an Understand level cap, and `Next gate: repeat discovery`.

Treat these as that request when they are about moving on: next, next gate, next phase, continue, proceed, go ahead, move on, approve, approved, brainstorm the solution, brainstorm screens, brainstorm the slice, and naming Shape, screens, the mockup, or Specify. Also treat yes, that's right, and looks good when they answer a summary or an offer to continue. "Stop asking" and "no more questions" are an advance request once an interview has started. A bare "no questions" on a new brief that never asks to continue is not one: stop at discovery, as above. "Brainstorm the problem" stays in Understand.

Do not ask another discovery question. Do not ask which level. Do not ask them to choose approval versus a brainstorm. An unnamed cap becomes Mockup: write Shape through the mockup. If Understand is not written yet, write the known discovery decision and the unknowns, then continue into Shape in the same run.

Record unresolved facts as unknown. Do not invent actors, workflows, outcomes, metrics, or constraints. If safety, privacy, or access is still unknown, leave that behavior out of the design and say what is excluded. The request explores the next phase. It is not user validation and it is not permission to build.

A first message that does not ask to advance, such as "build a task app", stays in Understand and gets one main question.

## Brainstorm after understanding

"Brainstorm" alone does not select Understand: ask whether the person wants to explore the problem or alternative solutions when unclear, unless they already asked to go next. Problem/context brainstorming stays in Understand. "Brainstorm the solution" or "brainstorm screens" is an advance request: open Shape, record thin context as unknown, and do not interview again first. Before generating options, use [the learning loop](learning-loop.md) to synthesize sources through observations, patterns (including contradictions), findings, and opportunities, and select a bounded target opportunity. Hypothetical or incomplete context supports a provisional opportunity hypothesis, not an observed finding.

Once Shape is open and an opportunity is selected, use this sequence in `explore-solutions`. An advance request opens Shape even when some facts are still unknown; use those unknowns as assumptions, not as another interview.

1. Frame one bounded, solution-neutral question from the stated problem: “How might we help [actor] achieve [outcome] when [situation]?” Avoid embedding an app, AI, dashboard, or other requested implementation in the question unless it is a genuine confirmed constraint. Where the actor or outcome is unknown, say so in the question rather than inventing it.
2. Invite the human's ideas first in guided mode. Generate a small set of meaningfully different directions together; build on suggestions and defer judgment during generation. Include the existing approach, reuse, and a process or non-software change where credible. Do not treat generated ideas as evidence.
3. Separate evaluation from generation. Group related ideas, then compare against the stated outcome, constraints, user effort, risk, and reversibility. When they asked to go next, or advise mode is on, recommend the trade-off and label it proposed. Otherwise ask which trade-off matters most when it cannot be inferred.
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

The qualitative checklist, 1–3-question turn limit, one summary, and artifact restrictions are this plugin's operational adaptation, not requirements claimed verbatim from these sources. An advance request ends the interview. The interview establishes enough context to explore, not proof of demand, safety, feasibility, or permission to build.
