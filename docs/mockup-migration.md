# Draw.io mockup naming migration

This is a breaking rename with no legacy command, level, filename, or validator API aliases. The canonical artifact is a **static high-fidelity screen/state mockup with annotated flows**, not an implemented interactive UI.

| Before | Now |
| --- | --- |
| `/prototype-drawio <package>` / skill `prototype-drawio` | `/mockup-drawio <package>` / skill `mockup-drawio` |
| Level **Prototype**, `advise prototype` | Level **Mockup**, `advise mockup` |
| `Level: prototype` | `Level: mockup` |
| `docs/product-design/<slug>/prototype.drawio` | `docs/product-design/<slug>/mockup.drawio` |
| `1-<actor>-<task>/prototype.drawio` (also child `1.1-<step>/`) | Same step folder, `mockup.drawio` |
| `checkPrototypeDrawio(xml, ids, states)` | `checkMockupDrawio(xml, ids, states)` |
| `skills/prototype-drawio/references/prototyping-research.md` | `skills/mockup-drawio/references/mockup-research.md` |

Rename existing canonical files and update their links, command references, imports, and any explicit Level header. Keep screen IDs, state frames, copy, annotations, evidence, and decisions intact. Do not merge root and step boards: one close flow stays at the root; multiple flows use only indexed step folders for that kind. Run `npm run check:output -- docs/product-design/<slug>` afterward.

The validator rejects `Level: prototype` and obsolete `prototype.drawio` at the root or in step folders, including when a canonical mockup also exists. Packages without a Level header still use their existing structural/profile contracts; do not add a header, infer evidence maturity, or require new deliverables just to migrate a name. This exception does not make the retired filenames valid. Standard versions and screen/state coverage contracts are unchanged. Mockup excludes build specs; Full permits them subject to profile/gate rules.

## Why this term, and what stays “prototype”

[NN/g's UX deliverables glossary](https://www.nngroup.com/articles/ux-deliverables-glossary/) (2024-08-09) defines mockup as “A static, high-fidelity simulation of a proposed UI design that includes visual-design details such as colors and imagery.” [UXPin's mockup guide](https://www.uxpin.com/studio/blog/what-is-a-mockup-the-final-layer-of-ui-design) (2026-05-22) likewise describes static visuals and recommends annotating transitions/state changes. We retain annotated flows and every listed screen/state, not interactive functionality.

This is a local convention, not a universal ban on “static prototype.” NN/g's fidelity guidance allows human-operated static prototypes. General research terms such as **learning prototype**, externally supplied **interactive prototype**, and original source titles/URLs remain unchanged. They do not rename or replace the complete canonical handoff.

Draw.io itself supports [interactive links/layers](https://www.drawio.com/docs/tutorials/interactive-diagram-layers/) and [custom actions/animations](https://www.drawio.com/blog/custom-link-actions/). This skill deliberately produces static frames without those mechanisms. The naming migration does not implement interactivity, establish accessibility conformance, or supply usability evidence. See the [research basis and method boundaries](../skills/mockup-drawio/references/mockup-research.md).
