---
name: model-process
description: "Model how work moves between people and systems today and in the proposed design, as swimlane processes with handoffs, waits, and failure paths. Use for /model-process, or when more than one role or system acts in the journey."
disable-model-invocation: true
---

# Model Process

Read [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md) and [principle-take-on-the-hard-work](../principle-take-on-the-hard-work/SKILL.md). A process is the whole service, including the parts outside any screen.

1. Model the **as-is** process from discovery evidence: trigger, each step, the actor who performs it, handoffs, waits, decisions, rework loops, and where the outcome fails. Label each step's evidence class. Leave gaps unknown rather than inventing a current process.
2. Mark each pain point with the evidence that shows it: delay, duplicate entry, lost information, error, or workaround.
3. Model the **to-be** process for the recommended option. Each change removes a named pain point or serves a need. Steps that stay manual or offline remain visible. Say which actor or system now carries each rule and exception.
4. For every handoff between actors, name what is passed, how the receiver learns of it, and what happens when it does not arrive: timeout, reminder, escalation, or owner.
5. When more than one actor acts, use `drawio` to write `process.drawio` with one swimlane per actor, as-is and to-be on separate pages. Keep critical branches in the text too.

Summarize the to-be process under Product experience in `product-design.md` and link the diagram with the question it answers. Do not claim the as-is process was observed unless someone observed it.

**Reply:** the pain points removed, those that remain and why, each handoff and its failure path, and the diagram path.
