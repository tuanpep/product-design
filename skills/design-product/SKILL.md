---
name: design-product
description: "Turn a human idea into an evidence-labeled product design package, from the problem through a sketch, screens, a Draw.io screen prototype, and an implementation-ready build spec with its ERD, state, sequence, context, and data flow diagrams, or revise one when evidence or a decision changes. Use for /design-product, product discovery, product design, business analysis, and scoping a first useful release. Use advise mode when the person wants a suggested solution and design without waiting for a decision."
disable-model-invocation: true
---

# Design product

Bundled skills live at `../<name>/SKILL.md` from this file. You own the product proposal, not the decision to build. Work in the **project the human wants designed**. If the target project is unclear, use the current working project and state that choice.

## Non-negotiables

The Principles section below grounds every trade-off. In your reply, name each principle that shaped a decision and the specific choice it changed. Cite only principles whose leaf SKILL.md you read this session.

- Advise mode, when the person says advise or asks you to suggest the solution and design without waiting for a decision → read [advise-mode.md](references/advise-mode.md) and apply it before the playbook. Do not stop for a level, a layout, or any other human decision. Then [new-idea.md](playbooks/new-idea.md), or [revise-design.md](playbooks/revise-design.md) when a design already exists.
- A new idea, or no existing design, in guided mode → [new-idea.md](playbooks/new-idea.md). If the person did not name a level, stop and ask which of Understand, Design documents, Sketch, Prototype, or Full to run. Do not start the playbook until they answer.
- An existing design with new evidence, changed scope, or a changed decision → [revise-design.md](playbooks/revise-design.md).
- The request names a screen, feature, or technology → [principle-start-from-the-outcome](../principle-start-from-the-outcome/SKILL.md), then `frame-problem`.
- A faster path could hide harm, trap a person, or spend their trust → [principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md).
- Choosing what to build or not build → [principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md).
- Shaping the interaction → [principle-behave-predictably](../principle-behave-predictably/SKILL.md), then `design-screens`.
- More than one role or system acts → `model-process`.
- Showing the product's shape → `sketch-drawio` first for a quick, reviewable shape, then `design-screens`, `write-content`, and `prototype-drawio`.
- Handing a slice to builders → `map-stories`, `model-domain`, `define-rules`, `specify-build`.
- The product depends on other systems, or scope is disputed → `context-drawio`.
- After `model-domain`, when the package table calls for them → `erd-drawio` for the data, `state-drawio` for lifecycles, `sequence-drawio` for integrations that can fail, and `dataflow-drawio` for personal data and trust boundaries.
- A journey, process, or navigation diagram → `drawio`. Every Draw.io file uses Draw.io's built-in shapes first ([drawio-file.md](../drawio/references/drawio-file.md#built-in-shapes-first)).
- Read [the evidence contract](references/evidence-and-decisions.md) before classifying a claim. A plan to test is not a test result.
- Do not write production code or alter the product unless explicitly asked in a separate task. A disposable prototype in the design folder is not production code.
- Do not delegate stakeholder interviews or human approval to an agent.

## Principles

Read the leaf skill in full for any principle you apply. Each entry names when it applies. Each leaf is the **principle-<title>** skill. When two conflict, the earlier entry wins. The same order is in [the principles index](references/principles.md).

- **Protect before you enable** ([principle-protect-before-you-enable](../principle-protect-before-you-enable/SKILL.md)). A faster path would hide harm, trap a person, or spend their trust.
- **Start from the outcome** ([principle-start-from-the-outcome](../principle-start-from-the-outcome/SKILL.md)). The request names a feature, screen, or technology.
- **Include the hardest realistic case** ([principle-include-the-hardest-case](../principle-include-the-hardest-case/SKILL.md)). A polished path would exclude the people who most need the outcome.
- **See the whole service, then do less** ([principle-see-the-whole-service](../principle-see-the-whole-service/SKILL.md)). Choosing what this product will and will not do.
- **Take on the hard work** ([principle-take-on-the-hard-work](../principle-take-on-the-hard-work/SKILL.md)). Simplicity came from leaving a rule, exception, or hard case to the user.
- **Behave predictably and recoverably** ([principle-behave-predictably](../principle-behave-predictably/SKILL.md)). Shaping the interaction itself.
- **Spend less of the world** ([principle-spend-less-of-the-world](../principle-spend-less-of-the-world/SKILL.md)). A real choice changes energy, duplication, retained data, or repeated work.

Specification quality, below the seven above:

- **Design every state** ([principle-design-every-state](../principle-design-every-state/SKILL.md)). Specifying a screen, a record with a lifecycle, or an integration.
- **Make it testable** ([principle-make-it-testable](../principle-make-it-testable/SKILL.md)). Writing a requirement, rule, or acceptance outcome.
- **One source of truth** ([principle-one-source-of-truth](../principle-one-source-of-truth/SKILL.md)). A term, rule, state, or message appears in more than one place.
- **Decide the reversible** ([principle-decide-the-reversible](../principle-decide-the-reversible/SKILL.md)). An open question would leave a builder guessing.
- **Use real content** ([principle-use-real-content](../principle-use-real-content/SKILL.md)). Drafting screens, examples, copy, or a prototype.

Polish, novelty, and satisfaction yield to all of the above.

## Write the package

Create `docs/product-design/<slug>/` with a short kebab-case slug, and reuse the folder for revisions. `product-design.md` is the decision document. Follow [the output standard](references/output-standard.md) and [the proposal format](references/proposal-format.md). The standard's design package table says which other files each profile needs: `journey.drawio`, `process.drawio`, `sketch.drawio`, `navigation.drawio`, `screens.md` ([format](references/screens-format.md)), `prototype.drawio`, `context.drawio`, `build-spec.md` ([format](references/build-spec-format.md)), and the build diagrams `erd.drawio`, `states.drawio`, `sequence.drawio`, and `dataflow.drawio`. A large diagram is one file per close flow, grouped in a step folder `1-<step>/` in parent/child index order, as [drawio-file.md](../drawio/references/drawio-file.md#one-file-per-close-flow) defines. A split of that step is `1.1-<step>/`.

Choose discovery, evaluation, or build-slice depth based on the next gate, not on how polished the design is. The level the person chose caps how far the run goes: Understand stops after the decision, Design documents before any screen, Sketch at the layout question, Prototype after the screen prototype, and Full through the build spec. Once an approach is chosen, show its shape only when the level includes it: a sketch for the person to review first, then screens and a prototype. Draft the build spec only when the level is Full. Preserve needs, requirements, and traceability. A small idea warrants small files. Link each artifact to the question it answers.

**Reply:** what you recommend, the files written, the strongest evidence and weakest assumption, each principle that changed a choice, the proposed defaults an owner should review, what you actually checked, and the next human decision or test. In advise mode, record that decision in the package and do not end the run by asking it. A design package is not user validation, feasibility approval, or permission to launch.
