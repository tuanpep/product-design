# Content quality across the flow

Use this contract with [the output standard](output-standard.md). It distinguishes decision-support writing from the words people encounter in the service. `write-content` owns product/service copy, not the prose of every document. Keep existing phase boundaries, level caps, headings, and artifact ownership; this adds no phase or mandatory file.

## Write useful documents

- Name the reader and the decision or task the section supports. Lead with the recommendation, result, or required action, then explain why.
- Use concrete actors, conditions, consequences, and examples. Replace assurances such as "seamless", "robust", or "user-friendly" with the behavior and how it would be checked.
- Separate sourced facts, interpretations, proposals, and unknowns. Put qualifications beside the claim they limit, not only in a closing disclaimer.
- Explain consequential choices and trade-offs, not the agent's working process. Use tables for comparisons, catalogues, and mappings; use prose for reasoning.
- Link the owning definition, rule, or decision instead of repeating it. A summary must preserve its conditions and uncertainty. Keep an inapplicable or deferred section to one useful sentence.
- Use natural language for the document's audience, but preserve necessary specialist terms, formal identifiers, code, and contract names. Do not apply UI-label simplification to technical schemas.

## Establish language and vocabulary early

Under Evidence and unknowns in `product-design.md`, record a short **Content baseline:** document language, intended user-facing language(s), locale(s) where relevant, and whether each is given, observed, proposed, or unknown. Reuse the brief and existing product. When unspecified, the request's language is a proposed document-language default, not proof of the users' language. Ask only when the uncertainty blocks safe or meaningful work within the existing context gate.

Start a small working vocabulary under Needs and requirements: term, meaning, source, and confusing synonyms to avoid. Use the users' words; do not invent business terms to fill a glossary. `model-domain` later moves the definitions into Glossary in `build-spec.md`, preserving terms and replacing the earlier entries with links. A screen's vocabulary list references that owner, rather than creating another definition. Record a necessary difference between a technical identifier and a user-facing label as a mapping.

## Own content beyond screens

In Shape, inspect the whole in-scope task: entry, decision, action, waiting, outcome, return, and handoff. Include email, SMS, push, letters, assisted-service instructions, and support handoffs when the service needs them, even with no screen UI. Do not invent channels or communications merely to fill this list.

- When `screens.md` exists, its Content and copy section owns the message catalogue, including off-screen messages. Screen-specific labels remain with their screen. The proposal links to the catalogue.
- Without `screens.md`, Product experience in `product-design.md` owns service copy and its message catalogue. Do not create screen files for an email-only, manual, or operational service.
- If screen files are legitimately added later, move the catalogue into `screens.md`, preserve M IDs, and replace the old definitions with links. Do not retain two catalogues.
- At Understand, record language, vocabulary, evidence, and gaps only, not invented to-be copy. At Design documents, an interface's detailed screen copy remains deferred; include only question-led inline examples. A no-screen service can specify its relevant communications inline without adding screen artifacts.

## Specify only useful messages

Give a consequential or reused message a stable M ID. Do not assign an ID to every heading, label, or decorative string, or manufacture a routine technical-state matrix. Keep the basic catalogue columns **ID | Trigger/source | Text | Recovery**. Define each M ID once; references elsewhere say "See M1" or link to it rather than repeating a definition row.

For messages whose meaning depends on context, add only the needed details in extra columns or notes under the same entry:

- Audience and placement: screen/view or delivery channel, recipient, and trigger/rule/lifecycle reference. Before a catalogue exists, cite the proposed journey behavior rather than inventing a rule ID.
- What changed, what did not, whether the outcome is pending/confirmed/unknown, and who acts next.
- Variables and plausible examples, including empty/long values and locale-sensitive dates, times/time zones, numbers, currency, and plurals. Avoid ambiguous dates and glued-together sentence fragments. Text-expansion checks are examples, not a guarantee that a fixed percentage covers every language.
- Action label, real destination or support route, and what happens to already entered work. Mark a genuinely unavailable recovery as such, with the responsible owner; do not invent an override or help channel.
- For notifications, sender, subject/title where needed, minimum safe preview/body, recipient access at the destination, delivery delay/failure behavior, and preference/opt-out rules. Distinguish optional notifications from essential service notices; do not promise an opt-out that policy does not allow.
- Approval owner/status for legal, policy, pricing, deadlines, guarantees, or other consequential wording. Unknown policy stays unknown; proposed wording cannot grant a permission or exception.

## Check business truth before polishing

For each consequential message, check it against the owning journey, rule, permission, lifecycle, and integration behavior:

- Acknowledging a request is not completing it. "Request sent. Waiting for approval" must not become "Shift updated" before the roster actually changes.
- A timeout may leave the result unknown. Do not assert "Nothing was saved" or tell people to repeat an irreversible action unless that is known to be safe.
- Recovery and overrides must be permitted for this recipient. Do not reveal another person's identity, eligibility, or record existence to an unauthorized reader. Notification previews should not expose sensitive details by default.
- Timing, amounts, retention, eligibility, and guarantees need their owning source. A friendly phrase cannot create a service promise.
- Read the wording in the target language and context. Natural language, understandable actions, and preserved policy meaning matter more than word-for-word translation or an arbitrary length target.

## Reconcile at handoffs

| Phase | Content check |
| --- | --- |
| Understand | Concrete, attributed problem and outcomes; language baseline and working vocabulary; no invented solution copy |
| Shape | Each in-scope actor can understand the decision and next action across screens and off-screen handoffs; wording matches proposed behavior |
| Specify | Reconcile affected M IDs, labels, and examples after rules, permissions, and lifecycles settle; do not leave Shape copy promising superseded behavior |
| Technical | Map consequential asynchronous outcomes and integration failures to existing M IDs; flag missing or stale copy without inventing new screen flows |
| Revise | Trace the changed premise to affected messages, variables, translations, and mockup instances; preserve unaffected content and IDs |
| Review | Report clarity, business accuracy, journey/channel coverage, and cross-artifact consistency separately, with concrete failures or "not applicable" |

Fix in-scope contradictions in the owning text and its existing representations. If the phase or requested scope prevents updating a dependent artifact, identify the exact stale message/file, the reason, owner or unknown owner, and the next authorized update. Do not claim that content is reconciled or ready for the affected use while that contradiction remains. Technical design may correct affected copy in place but does not add or redraw screens; flag stale mockup instances for the next product-design revision.

Structural checks can detect missing or duplicate M definitions. They cannot establish natural language quality, true business outcomes, permitted recovery, privacy, or comprehension. The plugin checkout's `docs/guide/04-output-standard.md` contains content scenarios for installed-plugin evaluations; copied skill catalogs need not include that developer guide. Report actual runs and limitations, not an assumed improvement in user success.
