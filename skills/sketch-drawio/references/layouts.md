# Selective layout recipes

Use only the recipe the requested task needs. These are patterns, not mandatory additional screens.

| Screen | Minimal items | Typical relationship |
| --- | --- | --- |
| List | `heading` or instructions, `table` with representative rows, `actions` | Open selected record → detail |
| Detail | `card` summary, `text` or `table` details, `actions` | Edit → form; submit → outcome |
| Form | brief `text`, labeled `field` items, `actions` | Save/submit → result; cancel → previous screen |
| Confirmation/dialog | `heading`, consequence `text`, `actions` | Confirm → outcome; cancel → originating screen |
| Tracking | status `heading`, summary `card`, next-step `text` | Material business transition → next relevant view |
| Role handoff | Separate role-labeled screens with task-relevant content | `kind: "handoff"`, label the responsibility/action |

Use a few representative rows, not a reproduction of a dataset. Do not replace a consequential form or choice with a generic gray rectangle. Show the controls needed to understand the action. A repeated view is justified by a meaningful task change, not by a quota of loading/error/success states. Do not imply pending actions have completed.
