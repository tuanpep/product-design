# Accessibility planning

Trigger: a service could exclude people through interaction, content, device, disability, assistance or channel constraints. Apply proportionately throughout the lifecycle, not only when screens exist. This is planning guidance, not WCAG conformance or legal advice.

**Owners and outputs:** `define-requirements` owns needs, barriers and applicable targets; `design-experience` owns inclusive service paths; `plan-evaluation` owns evaluation method, responsibility and limitations. Record inline in existing sections. No separate document. A named accountable human owner may remain Unknown; do not invent one.

1. Reuse evidence about people and context. Identify consequential barriers, including disabled users, assistive technology, low literacy, language and constrained devices where relevant. Do not equate personas or an agent simulation with participant evidence.
2. Record target standard/version/scope and applicable obligations from a source or as proposed/unknown. Trace specific barriers to requirements and paths, including assisted/offline alternatives only when the real service supports them. Do not assume a fallback excuses an inaccessible primary path.
3. Assign design, content, engineering, research and ongoing operational responsibilities where applicable. State remaining dependencies at the current phase, rather than pretending a static drawing implements keyboard, focus, semantics or announcements.
4. Plan complementary checks: design inspection, implementation/assistive-technology checks, and appropriately recruited participant research with accessible consent/materials. Name method, artifact/version, audience, owner, expected observation and unresolved limitations. Automated scans and contrast inspection alone cannot establish full accessibility or task success.
5. Retain a source of findings, remediation ownership and review triggers after change/release. Update affected requirements and interaction intent using the existing revision flow. A missing implementation check can permit design exploration but blocks a claim that implementation accessibility has been verified.

Basis: [W3C WAI Planning and Managing Web Accessibility](https://www.w3.org/WAI/planning-and-managing/), read 2026-10-22. Adapted to the plugin's phase/cap and evidence contracts; not a mandatory new audit ceremony.
