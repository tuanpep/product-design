# Screens format

`docs/product-design/<slug>/screens.md` shows the shape of the proposed product: what people see, what they can do, and every state. It follows [the output standard](output-standard.md) and is written by `design-screens` and `write-content`. Everything in it is **proposed** unless an owner approved it.

Start with a title and this header:

```text
Standard: screens/1.0
Updated: YYYY-MM-DD
Source: product-design.md
```

Use these level-two headings in order:

```markdown
## Navigation map
## Screen inventory
## Screens
## Content and copy
## Accessibility
```

**Navigation map.** Entry points, the path through the journey, back and cancel destinations, and exits. Link `journey.drawio` or `navigation.drawio` if one exists.

**Screen inventory.** One row per screen, in the order and with the IDs of `sketch.drawio`. Serves lists story IDs once a story map exists, and requirement IDs before that:

| ID | Screen | Role | Purpose | Entered from | Exits to | Serves |
| --- | --- | --- | --- | --- | --- | --- |
| SC1 | My shifts | Nurse | See upcoming shifts and start a swap | Menu, notification | SC2 | S1 (R1) |

**Screens.** One level-three heading per screen, written `### SC1 My shifts`. Under each:

- **Purpose** and the journey step it serves.
- **Content:** what is shown, with the entity attribute it comes from.
- **Inputs:** field, type, required or optional, validation rule ID, example value.
- **Actions:** the real label, its result, and the next screen.
- **States:** consider default, empty, loading, partial, error, denied, success, and offline. List the designed ones on one line, each state name first with its details in brackets, separated by semicolons: `**States:** default; empty (M2, recovery: Book later); denied (BR1, M1, recovery: See free rooms)`. `prototype.drawio` needs one frame for each listed state. After the list, say in a sentence why any other state cannot happen.
- **Rules:** referenced by ID, not restated.

**Content and copy.** Voice, terms from the glossary, and the message catalogue:

| ID | Trigger | Text | Recovery |
| --- | --- | --- | --- |
| M1 | BR2 denies the request | Lan would work more than 48 hours this week. Choose another colleague, or ask the charge nurse to approve an exception. | Choose another colleague (SC2) |

Notifications record channel, trigger, recipient, content, and opt-out.

**Accessibility.** The target, for example WCAG 2.2 AA for the web, the criteria to check per screen, and who checks them. A screens document cannot establish conformance.
