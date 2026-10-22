# Build spec format

`docs/product-design/<slug>/build-spec.md` is the implementation handoff for one named slice. Engineers, testers, and designers should be able to build and check the slice from it without guessing. It follows [the output standard](output-standard.md), preserves existing IDs from `product-design.md`, and is written by `specify-build` with `map-stories`, `model-domain`, and `define-rules`. Technical views are a later phase under [technical-design.md](technical-design-format.md); their absence alone does not require creating them during Specify.

## Specify proportionately

Bound the slice before expanding stories: actor, trigger, observable outcome, in/out scope, and consequential denied or recovery paths. Reuse the selected Shape approach, evidence, vocabulary, screens, and known constraints. Do not repeat discovery, reopen settled alternatives, or respecify the entire product unless new evidence invalidates the premise. Keep the surrounding journey shallow but explicit enough to expose entry, completion, dependencies, and handoffs; preserve out-of-slice references without expanding them into release commitments. A screen, button, or technical layer is not by itself a user-value slice.

Story mapping, domain modeling, and rule definition are responsibilities within this file, not mandatory separate workshops or documents. This removes ceremony, not necessary collaboration: distinguish agent-drafted behavior from attributed product/domain, engineering, and testing review. Record consequential review gaps with an owner or Unknown and their effect on readiness; do not imply that generated prose establishes shared understanding or approval. Include only concepts, actions, states, rules, and integrations needed to explain or check the slice. Do not invent lifecycle states, CRUD stories, role variants, or future entities to fill a section. Keep every required heading; explain genuinely inapplicable sections briefly rather than padding them.

Establish rules and concrete examples before formalizing Given/When/Then. If the expected outcome is unresolved, record a question or blocker rather than inventing a Then to complete the template. Proposed reversible defaults must remain labeled; they are not agreed rules. Write acceptance criteria as observable business behavior, not click-by-click UI procedures or implementation steps. Keep concrete values where they distinguish outcomes or boundaries; put navigation detail in the screen specification or check procedure.

Define each consequential fact once in its owning section. Stories and acceptance criteria reference rule IDs and use concrete examples rather than restating the catalogue; screen summaries link existing artifacts. One check can cover several outcomes when each remains explicitly traceable. Do not mechanically enumerate the Cartesian product of roles, states, and inputs. Identify relevant interacting conditions and explain coverage proportionately to rules, hazards, boundaries, and required assurance. Separate examples for each factor, or pairwise coverage alone, do not establish coverage of multi-condition rules. Retain explicit cases for consequential combinations, including permissions dependent on role, ownership, and lifecycle state. Never remove a safety, permission, or recovery case merely to shorten the document.

Check traceability in both directions for meaning as well as ID existence: each in-scope requirement needs a justified source and adequate acceptance/check coverage, and each acceptance outcome/check must serve the behavior it references. Record the rationale and authority for derived constraints rather than fabricating a user need. Structural validation cannot establish semantic justification, sufficient verification, or completed review.

Give reversible choices a labeled proposed default and continue without another preference interview. Keep harmful, irreversible, policy, permission, and feasibility blockers explicit with an owner or Unknown. Do not invent decisions to obtain ready status or require every nonblocking assumption to be researched. Reconcile only affected copy and artifacts after settling rules; preserve unrelated human edits. Planned tests and rollout checks are not completed results.

## Research basis and adaptation boundaries

External source pages read 2026-10-22:

- [Agile Alliance: User stories](https://agilealliance.org/glossary/user-stories/): value-contributing increments, detail appropriate to the planning horizon, and warnings against equating stories with screens or technical components.
- [Cucumber: Introducing Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/) and [Your first Example Mapping session](https://cucumber.io/blog/bdd/your-first-example-mapping-session/): distinguish stories, rules, examples, and unanswered questions; clarify behavior before formal Gherkin. An unclear outcome is a question, not an established example.
- [Cucumber: Writing better Gherkin](https://cucumber.io/docs/bdd/better-gherkin/): describe intended behavior rather than implementation mechanics. Retaining concrete business boundary values is this plugin's application of that distinction.
- [Cucumber: Who does what?](https://cucumber.io/docs/bdd/who-does-what/): product, developer, and tester perspectives contribute to shared understanding; an agent draft cannot claim their review happened.
- [NASA: Requirements management](https://www.nasa.gov/reference/6-2-requirements-management/): bidirectional source traceability, justified derived requirements, change impact, and review of whether requirements fulfill their parents. Adapted without imposing NASA governance or claiming compliance.
- [NIST: Combinatorial testing FAQs](https://csrc.nist.gov/projects/automated-combinatorial-testing-for-software/faqs): interaction coverage and assurance needs matter; pairwise coverage can miss higher-order faults. Applying this warning to acceptance-example selection is an adaptation, not proof that selected examples provide sufficient test coverage.

The single-file format, required headings, proposed-default policy, and readiness labels are plugin choices, not prescriptions from these sources. These sources inform the method; they do not establish efficiency gains for this plugin without comparative installed-host runs.

## Document contract

Apply [the shared content contract](content-quality.md) to the handoff. Move the proposal's working vocabulary into Glossary with unchanged meanings and links back from the proposal. Reconcile affected M IDs, labels, and examples against finalized rules, permissions, and lifecycles; reference the single catalogue in `screens.md`, or Product experience in `product-design.md` when screens do not exist. Update existing representations within scope or name stale dependent files and required follow-up. Do not claim the affected handoff is ready while copy contradicts its behavior.

Start with a title and this header:

```text
Standard: build-spec/1.0
Status: draft | ready
Slice: the named slice
Updated: YYYY-MM-DD
Source: product-design.md
```

Choose one status. **draft** means blockers remain, and each is listed under Assumptions and open questions. **ready** means no blocking question remains and `product-design.md` names this slice as ready. Ready is still a proposal for a person to invest in, not approval to build or launch.

When the proposal has a Level header, only `Level: full` permits this file. A legacy proposal without Level retains its existing behavior. Evaluation with next gate specify a slice needs a draft spec; a capped evaluation instead uses test solutions and defers specification. Build-slice requires full when Level is present.

Use these level-two headings in order. Keep each one. A heading that does not apply to the slice says why in one sentence.

```markdown
## Overview
## Glossary
## Roles and permissions
## Domain model
## States and lifecycle
## Business rules
## Screens and navigation
## Stories and acceptance criteria
## Integrations and data
## Quality requirements
## Rollout and verification
## Assumptions and open questions
## Traceability
```

**Overview.** The slice outcome, who it serves, what is in and out of scope, and a link to the proposal. When `technical-design.md` exists, link it and the contract files here. Two paragraphs at most.

**Glossary.** Each term once: definition, example, and synonyms to avoid.

**Roles and permissions.** Actions as rows, roles as columns, each cell allowed, denied, or conditional with the rule ID.

**Domain model.** Entities, key attributes (meaning, required, example, source, sensitivity), relationships with cardinality read both ways, and the system of record. This section owns those facts. It is the conceptual schema. Identifiers, normalization, and a physical proposal are the logical additions in Information model. Link `erd-logical.drawio` and, when drawn, `erd-physical.drawio` separately, or each cluster's files under `1-<cluster>/` in parent/child index order. Each ERD file has one page; do not combine the views. A physical schema appears only in its physical file, as a **proposed** internal schema that follows the target project's conventions. The service contract in `technical-design.md` is the external schema. No framework choices, SQL, or migrations.

**States and lifecycle.** For each entity with a lifecycle: state, meaning, allowed next states, trigger and actor, guarding rule, side effect. Link `states.drawio`, or each `1-<entity>/states.drawio` in parent/child index order, when it is drawn.

**Business rules.** The catalogue with IDs, decision tables, and examples that pass, are denied, and sit on the boundary. Owner and approval status for each.

**Screens and navigation.** A summary and a link to `screens.md` and the mockup files. Do not restate screen content.

**Stories and acceptance criteria.** The story map with the first-release line, then each Must story:

```text
S1 As a nurse, I need to ask a qualified colleague to cover my shift, so that the roster stays right without chat.
Serves: N1, R2 · Rules: BR1, BR2 · Screens: SC1, SC2 · Depends on: roster read access (I1)
A1 Given Lan is qualified for Ward 4B nights and has 36 hours this week
   When I ask Lan to cover my 12-hour Thursday night
   Then Lan receives the request and my shift shows "Waiting for Lan"
A2 Given Lan has 40 hours this week
   When I ask Lan to cover the same shift
   Then I see M1 and can choose another colleague
Checked by: C1 (tester, scripted walkthrough), C2 (rule unit check by engineer)
```

**Integrations and data.** Each integration: direction, data, trigger, frequency, failure behaviour, owner, feasibility evidence class. This section owns how an external system fails. Personal data: purpose, visibility, proposed retention. Link the context and sequence files when they are drawn.

**Quality requirements.** Accessibility target and checks, privacy, security, performance, reliability, and observability or analytics events, each measurable or marked unknown. Link the data-flow files when they are drawn. Threats, controls, and blocking security questions are written once, under Threats in `technical-design.md`.

**Rollout and verification.** Transition from the current service, data migration, rollout and rollback, support readiness, how the outcome will be measured, and the definition of done. Hand off post-release learning here: responsible owner, baseline or explicitly unknown, outcome data source, guardrails, review cadence or trigger, and decision actions (continue, change, rollback, or stop). Distinguish planned measurement from actual results; do not invent baselines or thresholds. This uses the existing heading, not a new production stage or mandatory document. See [GOV.UK measuring success](https://www.gov.uk/service-manual/measuring-success).

**Assumptions and open questions.** One table: ID, question or assumption, proposed default if reversible, blocking or not, owner, and what changes if it is wrong.

**Traceability.** One row per acceptance outcome: need, requirement, rule, story, acceptance outcome, check. Every Must story appears. No row has an empty need or check.
