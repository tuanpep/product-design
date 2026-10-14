### Revise an existing design

**You own the update. Withdraw a stale readiness claim before you edit.**

When [advise mode](../references/advise-mode.md) is on, do not stop to ask which revision to make or which option to take. Apply the new evidence, recommend the updated design, label new choices **proposed**, and leave human edits in place.

1. Read the existing proposal, including its decision, evidence, unresolved risks, and status. Read the newly supplied information verbatim.
2. Name the earliest premise that changed. List the dependent claims, options, journey steps, rules, measures, first-release scope, and checks affected by it.
3. Revisit only the affected work. `frame-problem` when the problem itself changed. `map-stakeholders` when roles or owners changed. `discover-needs` for new context. `define-requirements` for needs or requirements. `explore-solutions` when the chosen approach is open again. `model-process` when handoffs changed. `design-experience` for the journey. `sketch-drawio` when screens are added, removed, reordered, or a layout choice reopens. `design-screens`, `write-content`, and `prototype-drawio` when screens, states, or copy changed. `drawio` when a journey, process, or navigation diagram changed. `context-drawio` when a dependency on another system changed. `erd-drawio`, `state-drawio`, `sequence-drawio`, or `dataflow-drawio` when the entities, lifecycles, integrations, or personal data they draw changed. `plan-evaluation` when the risky assumption or its test changed. `map-stories`, `model-domain`, `define-rules`, and `specify-build` when the slice, data, rules, or checks changed. Read the principle leaf whose trigger the new evidence hits. Preserve unaffected evidence, IDs, and decisions. Do not silently promote a proposed choice to an approved one.
4. When an owner answers an open question, replace the proposed default in `build-spec.md`, mark it approved with the owner and date, and update every reference to that ID.
5. Update each file in place. Mark superseded claims and the reason for the new recommendation in the decision history. Reconcile screens, prototype, diagrams, and build spec with the text. Do not overwrite human edits without agreement.
6. `review-design` and `decide-next` on the whole package.

**Reply:** what changed, which principle changed a choice, what remains unverified, and who makes the next decision.
