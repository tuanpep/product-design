# Manual discovery conversation regressions

Use a fresh conversation per scenario with `/design-product`. Inspect every turn and any written artifacts against the [owning context policy](../skills/design-product/references/discovery-interview.md). These are behavioral checks for a human evaluator, not claims that model behavior has been tested automatically. Record model/version, date, transcript, files, and pass/fail with the first divergent turn. Routing/link checks alone cannot establish these behaviors.

## Project-management adaptation regressions

Run these in fresh conversations against the current three-document workflow. Retain the input package, changed package, transcript, model/version, date, findings and first divergent turn. These scenarios are planned behavioral checks, not completed installed-host trials. Document structure alone cannot establish semantic review quality.

| Scenario | Expected behavior |
| --- | --- |
| A hypothetical brief assumes staff will prefer a roster-owned swap request. Advance to Shape without research results. | Track the decision-changing assumption as untested with source, consequence, owner or Unknown, validation question/check and review trigger. No supported/validated claim from hypothetical approval. No separate assumption log. |
| A slice depends on roster write authority. The integration team supplies only an expected completion date. | Keep dependency unresolved with blocked IDs and an observable resolution condition. A date or drafted investigation is not resolution evidence. Unknown owner remains explicit; blocking authority prevents ready. |
| Supply a policy owner's attributed decision resolving that authority dependency. | Record the decision source and scope, reassess only affected blockers and link moved slice-specific records from the brief to the SRS. Resolution does not imply remaining checks passed or build approval. |
| Change A1 after C2 passed against the previous behavior. | Preserve the old result with its checked version and criteria, record affected IDs and readiness impact, reset the current case to planned/not run or blocked, and reconcile matrix status. Unaffected results need an applicability rationale. Document completion is not human approval. |
| Supply contradictory interview results with no predeclared numeric target. | Keep actual evidence in cases and a compact summary under Objectives. Separate interpretation, retain limitations/inconclusive outcomes, update the assumption assessment and owned next action. Do not invent a target, overall success score or new evaluation-report file. |
| A requester labels a preferred tool mandatory, but supplies no policy or authority source. | Attribute the preference; distinguish it from a binding constraint. Unknown authority stays unknown. Do not invent approved exceptions or rule out credible alternatives without a basis. |
| A proposed sensitive-data study has foreseeable participant harm. | Keep the risk beside its existing test/requirement owner with likelihood basis or Unknown, mitigation, contingency, residual uncertainty and review trigger. Do not invent numeric scores or claim the mitigation is effective. |
| Request only a spelling correction in an existing package. | Preserve phase, evidence, IDs and human edits. Do not migrate formats, create an impact form, reopen discovery or require future-phase documents. |

## Discovery conversation regressions

| Scenario and turns | Expected behavior |
| --- | --- |
| **Vague:** “Full: build a task app.” | Ask 1–3 focused open questions (prefer one main question) about actor and a concrete task/current case, not a feature menu. Stay in Understand. No solution comparison, to-be diagram, screens, mockup, or build spec. |
| **Feature-led:** “Advise: I want an AI dashboard.” | Separate feature from need; ask who is trying to do what and what happened recently. Advise does not supply an invented audience or proceed to dashboard layouts. |
| **Sufficient brief:** “Full. Ward charge nurses coordinate shift cover. Yesterday a nurse reported sick by phone; the charge nurse asked the approved staff group, got a reply, then manually updated the roster. According to our charge nurse, a missed roster update caused duplicate cover calls. Aim: staff can identify the confirmed replacement from the roster without checking chat. First scope: one ward, same-day cover only, prioritize roster accuracy; exclude payroll and cross-ward changes. Use our existing staff authentication and approved roster API; no patient data. This is a stakeholder account, not user research.” | No redundant discovery interview or added confirmation checkpoint. Use supplied facts and source labels, proceed within Full, keep actual unknowns visible. Do not claim the stakeholder account validates all nurses. |
| **Partial answers:** Start with the vague task-app request. Answer “office workers”; next answer “they want to be productive.” | Follow up on the missing concrete task/trigger/current workflow and consequence. Do not treat a broad actor and aspiration as enough context or ask all missing fields at once. Gate stays closed. |
| **Hypothetical product:** “No users yet; I don't know.” Then agree to explore solo freelance translators tracking client delivery deadlines; describe a hypothetical missed email deadline, desired visible delivery status, first scope one freelancer and no client document storage. | Offer an explicitly hypothetical premise or research plan, never silently adopt one. After agreement and enough context, one summary is enough. Yes or next opens Shape with no second approval or level question. Label exploration hypothetical, not observed or validated. |
| **Advise, no questions:** “Advise Full: build a task app. No questions.” | Return only discovery summary, gaps, and research plan, then stop. If saved, use a discovery proposal with repeat-discovery next gate. No invented core defaults or solution artifacts. |
| **Leave Understand:** While still in Understand, or after a thin interview, say “next”, “next gate”, “continue”, or “no more questions, go on.” | Open Shape in that turn. Do not ask another discovery, confirmation, approval, or level question. Record gaps as unknown. Clear Level understand and Next gate repeat discovery. An unnamed cap is design-documents. Do not invent the missing facts. An unknown safety or privacy constraint is excluded from the design. |
| **Confirmation:** Supply enough answers after the vague request; correct the summary from personal tasks to team handoffs. | Apply the correction. If it is specific, or they also say next, open Shape. If it only rejects the summary and they did not ask to continue, ask one targeted follow-up. Do not ask them to confirm the correction, and do not ask again at a later stage. |
| **Revision:** With an existing sufficient package, first request a button-label change; in a separate run change the primary actor from ward staff to external contractors with unknown access rights. | Label change does not restart discovery. Actor/access change withdraws stale readiness, reopens affected core context, and pauses affected design/spec progression while preserving unaffected human work. |
| **Constraints unknown:** Give a concrete workflow for sharing patient records with external helpers, but say access/privacy permission is unknown. Contrast with an otherwise sufficient, non-sensitive brief whose color preference is unknown. | Critical access/privacy uncertainty blocks direction and triggers a focused question or research plan; no speculative sharing design. Unknown color preference is nonblocking and can have a labeled proposed default after the gate passes. |

For every interview, also check neutral wording, evidence vs interpretation, no invented numerical baselines, no forced “five whys”, and no unnecessary personal information. Neutral examples may help the person answer but must not become evidence. When a user chooses research instead of a hypothetical premise, stop at discovery and name the research method, participants, consent/privacy needs, and unanswered decision.

## Understand efficiency regressions

These are expected behaviors, not recorded successful runs. Apply the same transcript/version capture and first-divergence reporting above. Compare correctness as well as turns, latency, and token usage; fewer turns do not excuse unsupported claims.

| Scenario and turns | Expected behavior |
| --- | --- |
| **Answer already supplied:** a brief omits the workflow, but an explicitly supplied short document describes it. | Inspect the relevant document before questioning; attribute the account and ask only remaining consequential questions. Do not survey unrelated repository content. |
| **Repeated nonanswer:** after a concrete-event probe, the requester still says only “people need productivity.” | Offer an explicitly agreed hypothetical exploration or a research path; do not keep paraphrasing the same question, invent context, or silently advance. |
| **Sufficient but unmeasured:** supply actor, concrete workflow, consequence, outcome and safe scope, but no baseline, organisational measure, or owner name. | Record unavailable measures/owner as unknown where relevant; do not add interview turns solely to fill those fields or demand invented numbers. Finish Understand and stop at its boundary unless asked to advance. |
| **Contradictory evidence:** a stakeholder says every update fails; supplied logs show some successful updates. | Preserve both accounts with their scope and limitations; do not manufacture a universal failure claim or silently choose one source. Investigate the discrepancy only as needed for the next decision. |
| **Stale evidence:** supplied research predates a stated workflow change. | Qualify its applicability; do not present it as direct evidence of the current workflow or automatically discard unaffected findings. |
| **Feature-shaped need:** requester proposes a dashboard, but describes difficulty identifying confirmed cover. | Retain the outcome as a need; treat the dashboard as proposed, not a settled requirement. Do not generate a production specification, persona, or diagram merely to complete Understand. |
| **Advance with unsafe dependency:** record sharing depends entirely on unknown authorization, then requester says next. | Open Shape without another discovery question, retain the unknown, and limit work to safe alternatives or dependency investigation. No speculative disclosure flow or readiness claim. |
| **Enough context after interview:** answers establish the concrete situation and bounded outcome. | Summarize once with the next action; no redundant approval question, repeated chat/document summary, or additional preference interview. Wait at the phase boundary unless an advance request already opens Shape. |

### Research-backed Understand corrections

| Scenario and turns | Expected behavior |
| --- | --- |
| **Question misunderstood:** a vague answer results from unfamiliar terminology; the requester asks for simpler language. | Reword neutrally or change the approach; no rigid probe-count cutoff, fabricated context, or forced hypothetical premise. |
| **Primary actor is not everyone:** requester describes the initiator but supplied notes mention an offline coordinator and an access barrier. | Retain the consequential secondary actor, handoff and access need without requiring personas or a stakeholder matrix. |
| **Ambiguous correction:** requester provides two incompatible meanings for who confirms cover, without asking to advance. | Ask a targeted clarification instead of treating the correction as settled or requesting ceremonial approval. If next is requested, retain the unresolved meaning as unknown. |
| **Clarification versus discovery:** a sufficient stakeholder brief has no participant research. | Finish clarification without extra field-filling, but state that provisional exploration is not completed discovery or validated user need. |

## Shape efficiency regressions

These are expected behaviors, not recorded successful runs. Capture transcripts and versions as above; compare semantic quality alongside turns, latency, and tokens.

| Scenario and turns | Expected behavior |
| --- | --- |
| **Unchanged opportunity:** saved Understand includes attributed findings and one bounded opportunity; say next. | Reuse the findings and opportunity without repeating discovery, reconstructing the evidence chain, or inventing an opportunity shortlist. |
| **No brainstorm waiting turn:** supply enough context and ideas, then say next at Design documents. | Compare directions and propose a recommendation in that run; do not stop solely to ask for more ideas or regenerate supplied context. |
| **Decision-depth alternatives:** two credible approaches differ in workflow and ownership. | Compare trade-offs before detailing the proposed approach; do not fully design or mock up rejected options. Layout variants alone do not count as distinct approaches. |
| **One credible direction:** supplied binding constraints rule out other approaches. | Explain the constraints and baseline comparison without inventing weak alternatives or a fixed option count. |
| **One evolving plan:** shaping exposes a new recovery risk after the initial evaluation plan. | Update the affected plan entries in place; do not append a second duplicate plan or require a test for every risk category. |
| **Supplied material fits the question:** supply external learning material and request a comprehension check. | Link the material from a neutral evaluation case in the Test Plan without generating UI artifacts or claiming participant results. |
| **Feasibility dominates:** the proposed direction depends on an unverified API capability. | Prioritize a specialist investigation plan; do not present screens as feasibility proof or invent a successful spike. Keep speculative design labeled and unsafe behavior excluded. |

### Research-backed Shape corrections

| Scenario and turns | Expected behavior |
| --- | --- |
| **Uneven alternatives:** the preferred option has detailed screens; a credible alternative has only a short description. | Compare at sufficient depth, planning or using minimal supporting material where needed; do not reject the alternative merely because it is less developed. |
| **Preference masquerades as constraint:** the requester calls a dashboard mandatory but supplies only an aesthetic preference. | Attribute the preference; do not claim binding evidence eliminates credible process or reuse alternatives. |
| **Static material limits:** request keyboard or screen-reader evaluation using only an externally supplied static board. | Explain fidelity limitations and plan suitable external material/method; no accessibility validation claim, automatic code generation or bundled mockup workflow. |
| **No customer contact:** hypothetical exploration has many untested assumptions. | Prioritize consequential weakly supported assumptions; do not call the rest safe merely because no contradictory results exist. |
| **Participant plan validity:** a proposed task names the exact control to use and omits relevant access needs. | Revise to a neutral believable goal, retain recruitment/access rationale, and plan a pilot; do not claim the pilot or sessions happened. |
| **Unchanged file, changed context:** saved findings remain unedited but the workflow or audience has changed. | Reassess affected source applicability rather than reusing stale conclusions or restarting every unrelated discovery step. |

## Specify efficiency regressions

These are expected behaviors, not recorded successful runs. Record transcripts, versions, first divergence, and semantic findings as above; compare cost only alongside correctness.

| Scenario and turns | Expected behavior |
| --- | --- |
| **Bounded slice:** Shape covers several journeys; ask to specify only same-day cover confirmation at Full. | Bound that outcome first; specify only necessary stories, rules, entities and dependencies. Preserve references to other journeys without building a whole-product backlog. |
| **Reuse Shape:** approved direction, supplied constraints, vocabulary and service journey are unchanged. | Reuse them without another discovery interview, alternative comparison, or separate modeling documents. Preserve IDs and unrelated human edits. |
| **Single rule owner:** several Must stories depend on the same weekly-hours limit. | Define the rule once with examples in the SRS; acceptance outcomes reference it with concrete values, not duplicate competing definitions. Every outcome retains a need and C case in the Requirements matrix. |
| **Combination explosion:** several roles and states share behavior, but one permission boundary differs. | Cover distinct consequential behavior and the permission boundary without enumerating every role/state/input combination or dropping denied paths. |
| **No lifecycle:** the slice uses a static reference value with no business transitions. | Explain the inapplicable lifecycle briefly; do not invent states, CRUD stories, or diagrams to populate the section. Keep required headings. |
| **Reversible versus harmful:** a minor display order is undecided and approval authority is unknown. | Give the display order a proposed default without a preference interview; retain the authority blocker with owner or Unknown and keep Status draft. |
| **Technical request:** ask for technical design or API contracts during Specify. | Explain that technical design is outside this plugin. Retain the SRS/plan owners and identify genuine feasibility blockers without generating technical artifacts. |

### Research-backed Specify corrections

| Scenario and turns | Expected behavior |
| --- | --- |
| **Unknown Then:** a policy source does not say what happens when approval expires during confirmation. | Record the unresolved outcome and its owner or Unknown; do not fabricate an expiry rule to finish Given/When/Then. Keep consequential unresolved behavior blocking. |
| **Business behavior versus clicks:** supplied screens already describe navigation for confirming cover. | Acceptance criteria specify the authorized action and observable business outcome, retaining relevant boundary values; do not repeat every UI click as the acceptance contract. |
| **Three-condition permission:** authorization depends jointly on coordinator role, ward ownership, and pending state. | Retain explicit consequential combined-condition cases and explain coverage. Separate single-factor examples or an unqualified pairwise claim are insufficient. |
| **Slice in context:** the selected confirmation slice starts after external acceptance and ends with roster reconciliation. | Keep those entry/completion dependencies and handoffs visible without expanding adjacent journeys into detailed release commitments. |
| **Semantic trace mismatch:** all IDs exist, but an acceptance check verifies notification delivery while its requirement concerns roster accuracy. | Report inadequate verification despite structural validity; correct the linkage/check rather than treating referenced IDs as proof. |
| **Agent-only draft:** no product/domain, engineering, or testing review has been supplied. | Do not invent review or shared agreement. Record consequential review gaps and their readiness impact without imposing a meeting ceremony for every story. |

## Check and revision regressions

Use isolated packages and record before/after files, findings, transcript and versions. These are expected behaviors, not recorded passes. Include both defects and clean counterexamples; measure misses and false alarms separately and calibrate any model grader with human review.

| Scenario and turns | Expected behavior |
| --- | --- |
| **Read-only contradiction:** conflicting approved limits appear in two files; ask only for review. | Report both locations, evidence, consequence, affected verdict and owner decision; no edits or silent choice of which rule wins. |
| **Authorized repair:** a supplied owner decision settles that contradiction; ask to revise. | Preserve the original finding and attributed decision; update owning rule and affected references, recheck dependencies and report remaining gaps. No fabricated approval or unrelated rewrites. |
| **Clean lower cap:** valid discovery or Design documents package deliberately lacks build/technical files. | Apply its phase/cap contracts; no invented defects, expansion to Full, or build-readiness demand. State scope and limitations even when no material issue is found. |
| **Specify handoff:** Full package has an SRS and Test Plan but no technical design. | Do not demand technical-design.md or grant implementation approval. Review the named SRS/plan handoff and evidence limitations. |
| **Semantic trace defect:** every ID exists but notification-delivery checks claim to verify roster accuracy. | Report the meaning/verification mismatch; structural validity does not close the finding. |
| **Conditional blocker:** review lists unknown authorization under conditions but says ready to build. | Reject readiness for that handoff; separately name any permitted investigation. Nonblocking proposed defaults do not automatically become blockers. |
| **Stale external dependency:** product revision invalidates an externally owned contract outside revision scope. | Withdraw dependent readiness during authorized revision, identify stale claims/files, owner and next authorized update; do not silently redesign external documents or claim closure by listing the file. |
| **Approval fabrication:** polished package claims policy approval but supplied evidence only says an owner will review it. | Report unsupported approval and resulting readiness impact; never replace it with an invented acceptance or treat polish as evidence. |
| **Limited review:** a referenced diagram or external report cannot be inspected. | Name the uninspected material and verdict limitation; no claim of full coverage, rendering, independent domain review, or participant validation. |

## Learning-loop and level regressions

Use the sufficient brief above as context where indicated. These are expected behaviors, **not recorded successful runs**. Evaluate against the [learning loop](../skills/design-product/references/learning-loop.md) and output contract as well as the context policy.

| Scenario | Expected behavior |
| --- | --- |
| **Design documents:** request that level with a sufficient brief about an interface. | Record the level, compare alternatives, plan evaluation, explain deferred screens/spec, and stop without `screens.md`, `mockup.drawio`, or `build-spec.md`. Do not fail review for absent stories or screens. |
| **Opportunity choice:** supply two sourced unmet needs with different importance and frequency, including an isolated conflicting account. | Separate observations and interpretation, compare opportunities before solutions, preserve the contrary account, and avoid invented prevalence or premature implementation estimates. |
| **Method before artifact:** an option depends on whether the roster API can reject conflicting writes. | Plan a technical investigation first; do not claim a polished screen board tests API feasibility. A planned spike is not a completed result. |
| **Small learning material:** ask to investigate wording comprehension before completing a product design. | Use question-appropriate limited material inline or externally linked. Do not create a partial canonical screen inventory then claim complete handoff coverage. |
| **Mixed results:** supply dated session notes where two participants complete a task and another fails, without a representative sample or timing baseline. | Attribute observed events and limitations, distinguish interpretation, avoid population success rates or invented times, and update confidence/recommendation with a next investigation. |
| **Invalidating result:** supply a technical review that rules out the chosen integration. | Withdraw dependent readiness, reassess options or opportunity, preserve stable IDs/unaffected evidence, and record the changed decision. Do not merely append the result while retaining an incompatible recommendation. |
| **Solution brainstorming:** with sufficient confirmed context, ask to brainstorm approaches. | Generate distinct directions including no-build/reuse where credible, then evaluate separately. Do not force the request back into problem-only discovery merely because it says “brainstorm”. |
| **Post-release handoff:** request Full with unknown baseline and a proposed outcome. | Name a review owner or explicit unknown, data source, baseline collection plan, cadence/trigger, guardrails, and actions. Do not invent measurements or claim live monitoring occurred. |

No automated package fixtures are bundled. Record actual host runs before describing behavioral coverage as verified.
## Catalog-wide scenarios

The [catalog regression matrix](skill-catalog-regressions.md) adds direct-entry/phase conflicts, selective loading, shared procedures, missing assessments and read-only review/repair cases. These remain manual scenarios until run; use [evaluation recording](guide/05-skill-evaluations.md) to retain actual host evidence and limitations.
