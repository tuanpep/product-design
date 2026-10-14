---
name: design-product
description: "Turn a human idea into an evidence-labeled product design, from the problem through an implementation-ready slice, or revise one when evidence or a decision changes. Use for /design-product, product discovery, product design, and scoping a first useful release."
disable-model-invocation: true
---

# Design product

Bundled skills live at `../<name>/SKILL.md` from this file. You own the product proposal, not the decision to build. Work in the **project the human wants designed**. If the target project is unclear, use the current working project and state that choice.

## Non-negotiables

The Principles section below grounds every trade-off. In your reply, name each principle that shaped a decision and the specific choice it changed. Cite only principles whose leaf SKILL.md you read this session.

- A new idea, or no existing design → [new-idea.md](playbooks/new-idea.md).
- An existing design with new evidence, changed scope, or a changed decision → [revise-design.md](playbooks/revise-design.md).
- The request names a screen, feature, or technology → **principle-start-from-the-outcome**, then `frame-problem`.
- A faster path could hide harm, trap a person, or spend their trust → **principle-protect-before-you-enable**.
- Choosing what to build or not build → **principle-see-the-whole-service**.
- Shaping the interaction → **principle-behave-predictably**.
- A journey flow chart or a screen prototype → `drawio`.
- Read [the evidence contract](references/evidence-and-decisions.md) before classifying a claim. A plan to test is not a test result.
- Do not write production code or alter the product unless explicitly asked in a separate task.
- Do not delegate stakeholder interviews or human approval to an agent.

## Principles

Read the leaf skill in full for any principle you apply. Each entry names when it applies. Each leaf is the **principle-<title>** skill. When two conflict, the earlier entry wins. The same order is in [the principles index](references/principles.md).

- **Protect before you enable** (**principle-protect-before-you-enable**). A faster path would hide harm, trap a person, or spend their trust.
- **Start from the outcome** (**principle-start-from-the-outcome**). The request names a feature, screen, or technology.
- **Include the hardest realistic case** (**principle-include-the-hardest-case**). A polished path would exclude the people who most need the outcome.
- **See the whole service, then do less** (**principle-see-the-whole-service**). Choosing what this product will and will not do.
- **Take on the hard work** (**principle-take-on-the-hard-work**). Simplicity came from leaving a rule, exception, or hard case to the user.
- **Behave predictably and recoverably** (**principle-behave-predictably**). Shaping the interaction itself.
- **Spend less of the world** (**principle-spend-less-of-the-world**). A real choice changes energy, duplication, retained data, or repeated work.

Polish, novelty, and satisfaction yield to all of the above.

## Write the proposal

Create `docs/product-design/<slug>/product-design.md`, with a short kebab-case slug. Reuse the same folder for revisions. Follow [the output standard](references/output-standard.md) and [the proposal format](references/proposal-format.md). Choose discovery, evaluation, or build-slice depth based on the next gate, not on how polished the design is. Preserve needs, requirements, and traceability in the final document. A small idea warrants a short proposal. Flow charts and screen prototypes are `.drawio` files from `drawio`, beside the proposal. Link each to the question it tests.

**Reply:** what you recommend, the strongest evidence and weakest assumption, each principle that changed a choice, what you actually checked, and the next human decision or test. A design proposal is not user validation, feasibility approval, or permission to launch.
