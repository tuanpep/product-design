# Advise mode

Advise mode recommends choices inside the current phase **after [the discovery interview and context gate](discovery-interview.md) passes**. It does not approve a phase and it does not open the next one. Missing core context requires an interview, not a proposed default. If questions are explicitly forbidden, provide only discovery summary, gaps, and research plan, then stop. The rules below apply only after this gate, including human confirmation when an interview was triggered, and only inside the phase this message opened. The person still owns whether to build. Every suggestion stays **proposed**. Advise mode does not approve, and it does not invent interviews, test results, costs, or a legal interpretation.

## When it is on

Turn it on when the person tells you to advise, to run advise mode, or to suggest the solution and design without waiting for a decision. `advise`, `advise mode`, and `auto advice` count. A product whose users "get advice" does not turn this mode on by itself.

Guided mode stays the default when none of that appears. In guided mode, resolve missing core context first, then ask a missing level before Shape.

A named level still caps artifacts inside the open phase: `advise mockup` stops after the mockup because that is the level. When they do not name a level, use the cap of the phase this message opened. Do not run a later phase to reach Full.

## What changes

These replace the questions in [new-idea.md](../playbooks/new-idea.md) and [revise-design.md](../playbooks/revise-design.md). A `decide-next` result of stop or repeat discovery still ends the run after `product-design.md`. That is the agent declining to invent a product, not a question for the person.

- **Level.** Do not ask which level to run. Record the cap of the open phase. New packages record it in the machine-readable Level header: Understand uses `understand`, Shape without screens uses `design-documents`, Shape with a mockup uses `mockup`, and an opened Specify phase uses `full`. The field remains optional for legacy compatibility. A cap is not evidence maturity and not approval of the next phase.
- **Open choices.** Recommend one option. Name the principle that decided it, the option it costs, and who can reverse it. Label the choice **proposed**. Write the next file. Do not ask a question that must be answered first.
- **Learning before detail.** Follow [the learning loop](learning-loop.md): synthesize evidence and choose an opportunity, compare alternatives, then `plan-evaluation` before detailed experience/screens. Recommend question, method, and least necessary material, not a screen prototype by default. Keep partial learning material inline or externally linked. Design documents includes that plan but no screens. Do not claim the test ran.
- **Mockup.** At Mockup or Full only, recommend the layout the deciding principle favours. Skip the shape checkpoint. Write complete `screens.md` and `mockup.drawio` from that recommendation, and list the layouts you did not take. Learning material does not replace their screen/state coverage contract.
- **Hard choices.** Safety, money, law, privacy, and choices that are hard to reverse still get a recommended default inside this phase. Label it **proposed — owner must confirm**, and say what goes wrong if it is wrong. Finish this phase. Do not set `Status: ready` while one of these is unconfirmed. Do not treat the request for a design as approval to start the next phase. This applies [principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md) without pausing inside the phase.
- **Nonblocking facts you cannot obtain.** Leave them **unknown**. Say how to learn each one, and design the rest around the unknown. Missing core context and critical constraints cannot be handled this way; the context gate wins over hard-choice defaults too.
- **Revision.** Apply the new evidence and recommend the updated design. Leave a human edit in place, name it, and design around it.

## What stays

Evidence labels, the principles, [the output standard](output-standard.md), and the decision to build. A confirmation item still blocks a ready verdict. It does not block the draft.

**Reply:** the phase just finished, the recommendation, why that option, the files written, each principle that changed a choice, the proposed defaults, the hard confirmations, the strongest evidence, the weakest assumption, and the next test. Record that the next phase waits for approval or a brainstorm. Do not start that phase in this run.
