---
name: principle-prefer-the-standard-method
description: "Apply when an API operation would be a custom action, a screen endpoint, or a private error body. Use the standard HTTP method when the story is list, create, read, update, or delete, and use problem details for errors."
disable-model-invocation: true
---

# Prefer the Standard Method

Callers learn one API by recognizing the next one. [AIP-121](https://google.aip.dev/121) builds that recognition from resources and a small set of methods. [AIP-130](https://google.aip.dev/130) says to choose a standard method before a custom one. [GOV.UK's API standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards) say to use each HTTP verb for its usual purpose. This is not a claim that the contract conforms to those documents.

- Name the resource, a noun from the caller's task, before naming the method
- Use the standard method when the story lists, creates, reads, updates, or deletes that resource: GET on a collection or one resource, POST to create, PATCH to update, DELETE to delete
- Use a custom method only for a guarded transition that is not a change of fields, such as accept or cancel. Name the state and the rule it applies
- Report a failure with the HTTP status and a problem-details body ([RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html)). Leave out stack traces, SQL, and physical column names
