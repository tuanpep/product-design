# Advise mode

Advise mode suggests a solution and a design in one pass. It does not stop to wait for a human decision. The person still owns whether to build. Every suggestion stays **proposed**. Advise mode does not approve, and it does not invent interviews, test results, costs, or a legal interpretation.

## When it is on

Turn it on when the person tells you to advise, to run advise mode, or to suggest the solution and design without waiting for a decision. `advise`, `advise mode`, and `auto advice` count. A product whose users "get advice" does not turn this mode on by itself.

Guided mode stays the default when none of that appears. In guided mode, a missing level is still a question you ask before any design work.

A named level still caps the run: `advise mockup` stops after the mockup because that is the level, not because you are waiting. When they do not name a level, run **Full**.

## What changes

These replace the questions in [new-idea.md](../playbooks/new-idea.md) and [revise-design.md](../playbooks/revise-design.md). A `decide-next` result of stop or repeat discovery still ends the run after `product-design.md`. That is the agent declining to invent a product, not a question for the person.

- **Level.** Do not ask. Record `Level: Full (proposed)` in the decision history when they did not name one, and say so in the reply.
- **Open choices.** Recommend one option. Name the principle that decided it, the option it costs, and who can reverse it. Label the choice **proposed**. Write the next file. Do not ask a question that must be answered first.
- **Mockup.** Recommend the layout the deciding principle favours. Skip the shape checkpoint. Write `screens.md` and `mockup.drawio` from that recommendation, and list the layouts you did not take.
- **Hard choices.** Safety, money, law, privacy, and choices that are hard to reverse still get a recommended default. Label it **proposed — owner must confirm**, and say what goes wrong if it is wrong. Keep writing the rest of the package. Do not set `Status: ready` while one of these is unconfirmed. Do not treat the request for a design as approval. This applies [principle-decide-the-reversible](../../principle-decide-the-reversible/SKILL.md) without pausing the run.
- **Facts you cannot obtain.** Leave them **unknown**. Do not pause to ask. Say how to learn each one, and design the rest around the unknown.
- **Revision.** Apply the new evidence and recommend the updated design. Leave a human edit in place, name it, and design around it.

## What stays

Evidence labels, the principles, [the output standard](output-standard.md), and the decision to build. A confirmation item still blocks a ready verdict. It does not block the draft.

**Reply:** the recommendation, why that option, the files written, each principle that changed a choice, the proposed defaults, the hard confirmations, the strongest evidence, the weakest assumption, and the next test. Record the next human decision in the package. Do not end the run by asking it.
