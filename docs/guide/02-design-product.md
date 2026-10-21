# Route work through `/design-product`

`/design-product` matches one of two playbooks, copies that playbook's steps, and calls the other skills as the steps need them. You do not have to name the playbook.

## New idea

```text
/design-product Staff coordinate shift swaps in chat, but the roster stays wrong. Design a product approach.
```

That matches [new-idea.md](../../skills/design-product/playbooks/new-idea.md). First it applies the [discovery interview and context gate](../../skills/design-product/references/discovery-interview.md). A general request such as “build a task app” gets 1–3 focused open questions per turn, usually one main question, about missing context rather than immediate solution ideas. It reuses facts you already supplied. A complete brief needs no interview. Say `next` to leave Understand. That opens Shape in the same turn and does not ask you to confirm a summary, pick approval versus a brainstorm, or choose a level.

Each run finishes one phase and stops. The next phase starts when you say next, approve the previous phase, or ask to brainstorm that next phase. "Design the product", Full, and advise do not by themselves open a later phase.

1. **Understand.** Problem, needs, and whether to continue. Only `product-design.md`.
2. **Shape.** After you say next, approve Understand, or say brainstorm the solution: alternatives, evaluation plan, journey, and process. Screens and the mockup are included unless you cap this phase at design documents. Gaps still unknown are recorded, not asked again.
3. **Specify.** After you say next, approve Shape, or say brainstorm the slice: `build-spec.md`.
4. **Technical.** `/technical-design`, after you say next, approve Specify, or ask to brainstorm the technical design.

## Advise mode

```text
/design-product advise Staff coordinate shift swaps in chat, but the roster stays wrong.
```

That uses the same playbook inside the current phase, as [advise-mode.md](../../skills/design-product/references/advise-mode.md) defines. It still interviews when a new brief is vague and you have not asked to continue. It recommends one option at each open choice in that phase, names the principle that decided it, and stops at the end of the phase unless you already said next.

A hard choice, such as safety, money, law, or privacy, still gets a recommended default, labeled **proposed — owner must confirm**. That confirmation keeps `Status: draft`. It does not stop the run. `advise mockup` caps the run at the mockup and still does not ask you to pick the layout.

Neither advise nor Full skips the first interview on a vague brief. An explicit “no questions” that does not ask to continue returns only a discovery summary, gaps, and research plan, then stops. Saying next anyway continues, and critical unknown constraints are excluded from the design rather than invented. If you do not know the user context, you can still agree a hypothetical scenario for exploration or plan real research; that agreement is not end-user validation.

Those hard-choice defaults apply inside an open phase. They cannot invent missing core facts. After you say next, a missing safety or privacy constraint is excluded from the design and left unknown.

The four stages under those levels:

1. **Understand:** frame the problem, map stakeholders, discover needs, define requirements, decide. If discovery says not to build, it stops here with only `product-design.md`.
2. **Shape:** choose a source-backed opportunity, compare alternatives, identify risky assumptions, and plan evaluation before detailed design. Choose material and fidelity to fit the question: an inline scenario or linked learning material may be enough. Then model the process and journey; at Mockup or Full write `screens.md` and `mockup.drawio` for an interface. A large journey, process, or mockup is one file per close flow, such as `1-nurse-ask-cover/mockup.drawio`. The complete mockup draws every listed screen and state with product-styled basic shapes. At Mockup, when a layout option is open, guided mode asks which layout to take and whether the screens and their order are right. At Full, and in advise mode, it picks a labeled **proposed** option and continues. Design documents stops without screens but retains its evaluation plan.
3. **Specify:** only at Full. Map stories, model the domain, define rules, and write `build-spec.md`. It is `Status: draft` while blockers remain, and lists each blocker with its owner. Reversible questions get a labeled default instead of blocking. This stage does not choose technical views or write `technical-design.md`. Run `/technical-design` afterward when the slice will be software. That command can add an ERD, state and sequence diagrams, a data-flow diagram, a composition, and OpenAPI or AsyncAPI contracts. A view with no concern is omitted, with the reason recorded.
4. **Check:** review what this level wrote and name the next gate.

Open `mockup.drawio` in Draw.io, diagrams.net, or the Draw.io VS Code extension to see each screen and state side by side. Hand `build-spec.md` to engineers once it says `Status: ready` and a person has decided to invest.

## Revision

```text
/design-product Revise docs/product-design/shift-swaps: three charge nurses said the roster is the source of truth, not the chat.
```

That matches [revise-design.md](../../skills/design-product/playbooks/revise-design.md). The agent withdraws a stale readiness claim, edits only what the new evidence invalidates, and reviews the result again. It reopens the context gate only when a core premise changes, not for unchanged context or cosmetic edits.

Supply session notes or technical/policy findings with source locators, dates, method, and limitations when available. The [learning loop](../../skills/design-product/references/learning-loop.md) separates observations, interpretation, and the resulting decision. Missing results stay missing; a stakeholder's preference or an opened diagram does not become a usability finding. Mixed or contradictory evidence may require another investigation rather than a forced winner.

Full handoff includes an owner and cadence or trigger for reviewing user/service outcomes, data sources and unknown baselines, guardrails, and the decisions those signals could change. This is a plan for external delivery and learning, not a claim that the plugin has launched or monitored a service.

## One stage

Invoke a specialist when you only need that stage, for example on an existing package:

```text
/survey-existing docs/product-design/shift-swaps
/design-screens docs/product-design/shift-swaps
/mockup-drawio docs/product-design/shift-swaps
/specify-build docs/product-design/shift-swaps
/select-views docs/product-design/shift-swaps
/design-data docs/product-design/shift-swaps
/design-contract docs/product-design/shift-swaps
/erd-drawio docs/product-design/shift-swaps
```

The bundled steps are described in the [workflow](../../skills/design-product/references/workflow.md). Each skill runs only when you name it or the playbook reaches it. For behavioral review, use the [manual discovery conversation regressions](../discovery-interview-regressions.md); automated structure checks do not validate interview behavior.

Two specialist agents take a package that already exists:

- **technical-design** continues it through the Specify views: data model and ERD, service contract, and the other views the slice's concerns include. It does not restart discovery. A declared level other than Full does not receive those files.
- **review-design** loads the review-design skill and reports coherence, evidence, and delivery readiness separately. It does not start a new design.

When an owner answers an open question in `build-spec.md`, revise with the answer, for example `/design-product Revise docs/product-design/shift-swaps: the ward manager approved a 48-hour weekly limit (BR2).` The agent replaces the default, marks it approved, and updates every reference.

Next: [Steer with principle names](03-principles.md), then [check output quality](04-output-standard.md).
