# sandbox/

The place of freedom.

A sandbox is a file experiment that is allowed to be **outside the system**
while one question is still open. Nothing in here has to be consistent with
anything else: that is the point of the folder. It is where a shape gets tried
before anyone knows whether it deserves to become a component.

Two rules only:

- **It never gets consumed by `live/`.** The walk in `live/` is a pure consumer
  of `system/`; if a sandbox idea is good enough for the walk, it does not get
  copied there — it gets born in `system/` first (see the cycle below).
- **It is reachable from the studio.** An experiment nobody can open is a note,
  not a prototype. Add its door to `/sandboxes.html` (the shelf became a page of
  its own on 24.08; `/index.html` is the gate now and nothing else).

## Where the parametric sandboxes are

The three cards on `/sandboxes.html` right now — Checkout · V2 Pool,
Portal header, Start Gifting layouts — are **not files in here**. They are
links into `live/` with a query on them (`live/checkout.html?v=2`,
`live/portal.html?pth=1`, `live/portal.html?hero=start`): the question is being
answered inside the walk's own page, switched by a parameter, because the whole
point of those three is to be compared against the walk as it stands.

They move into this folder the day they become files of their own — the day the
experiment needs markup the live page should not be carrying.

## The cycle

```
   sandbox/            an experiment, free of the system, answering one question
      │
      ▼
   the two questions   Is there already a system component for this?
                       Can the existing one be extended instead of forked?
      │
      ▼
   system/             the answer becomes a component — with its props, its
                       tokens, its motion rules, measured on a system/pages/ page
      │
      ▼
   live/               the walk consumes it from system/. No hardcoding, no
                       second copy, no local twin with drifting numbers.
```

A sandbox that never reaches `system/` has still done its job: it answered the
question with a no. Delete it, or leave it here with the answer written at the
top of the file.
