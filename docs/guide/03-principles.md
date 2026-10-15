# Steer with principle names

The plugin ships eighteen principles as individual skills: seven that decide the design, and eleven that keep the specification and its technical design buildable. `/design-product` reads a principle's skill before it cites that principle, and names the decision the principle changed.

You can also say the name yourself when a choice is stuck. One phrase redirects the work.

```text
start from the outcome. the roster being wrong is the problem, not a request for another chat feature.
```

```text
see the whole service, then do less. if the roster tool already records swaps, do not design a second one.
```

```text
include the hardest realistic case. night-shift staff with low confidence have to complete this without a charge nurse nearby.
```

A principle citation with no decision behind it is a name, not an application. The agent still has to say which choice the rule changed.

They yield in this order. An earlier principle settles the conflict.

- [Protect before you enable](../../skills/principle-protect-before-you-enable/SKILL.md) when a faster path would hide harm, trap someone, or spend their trust.
- [Start from the outcome](../../skills/principle-start-from-the-outcome/SKILL.md) when the request names a feature, screen, or technology.
- [Include the hardest realistic case](../../skills/principle-include-the-hardest-case/SKILL.md) when a polished path would exclude the people who most need the outcome.
- [See the whole service, then do less](../../skills/principle-see-the-whole-service/SKILL.md) when choosing what this product will and will not do.
- [Take on the hard work](../../skills/principle-take-on-the-hard-work/SKILL.md) when simplicity came from leaving a rule or exception to the user.
- [Behave predictably and recoverably](../../skills/principle-behave-predictably/SKILL.md) when shaping the interaction itself.
- [Spend less of the world](../../skills/principle-spend-less-of-the-world/SKILL.md) when a real choice changes energy, duplication, retained data, or repeated work.

The specification and technical-design principles come after those seven and never override them:

- [Design every state](../../skills/principle-design-every-state/SKILL.md) when specifying a screen, a record with a lifecycle, or an integration.
- [Make it testable](../../skills/principle-make-it-testable/SKILL.md) when writing a requirement, rule, or acceptance outcome.
- [One source of truth](../../skills/principle-one-source-of-truth/SKILL.md) when a term, rule, state, or message appears in more than one place.
- [Decide the reversible](../../skills/principle-decide-the-reversible/SKILL.md) when an open question would leave a builder guessing.
- [Use real content](../../skills/principle-use-real-content/SKILL.md) when drafting screens, examples, copy, or a mockup.
- [Choose the view for the concern](../../skills/principle-choose-the-view/SKILL.md) when a diagram would be added because a template lists it, or a real concern has no view.
- [Keep the schemas apart](../../skills/principle-keep-the-schemas-apart/SKILL.md) when an API, a screen, and a database schema would be written as copies of each other.
- [Write the contract first](../../skills/principle-write-the-contract-first/SKILL.md) when builders would have to infer the service interface from screens or tables.
- [Record the decision](../../skills/principle-record-the-decision/SKILL.md) when a technical choice is hard to reverse and only the resulting picture was going to be kept.
- [Settle the logical model](../../skills/principle-settle-the-logical-model/SKILL.md) when a database design would choose types, indexes, or a product before identifiers, cardinality, and third normal form are settled.
- [Prefer the standard method](../../skills/principle-prefer-the-standard-method/SKILL.md) when an API operation would be a custom action or a private error body.

```text
design every state. what does the nurse see when nobody qualified is free to cover?
```

```text
decide the reversible. propose a default reminder time instead of leaving it open; the ward manager can change it.
```

```text
keep the schemas apart. the cover-request API is the caller's view of the roster, with the mapping written down.
```

```text
settle the logical model. name the identifier and the cardinality before choosing column types.
```

```text
prefer the standard method. accepting a cover request is a guarded transition on that resource, with a problem-details error when the rule denies it.
```

In advise mode that default is written into the package and the run continues. A choice that is hard to reverse, or that touches safety, money, law, or privacy, stays a confirmation item on the draft. It does not pause the suggestion, and it does not make the build spec ready.

Polish, novelty, and satisfaction yield to all of these. The same order is in [the agent index](../../skills/design-product/references/principles.md).
