# Gala CRE continuation instructions

This repository is in a focused September client-revision cycle following the completed property-listing and service-backpage rebuild. Before changing code, read these files in order:

1. `SEPTEMBER-CLIENT-REVISION-PLAN.md` — active scope, phase order, completion state, and exact next action.
2. `PROPERTY-DATA-REGISTER.md` — supporting property facts, conflicts, publication limits, and client-input gaps.
3. The latest checkpoint at the end of `OVERNIGHT-BUILD-PLAN.md` — historical verification and commit handoff.
4. Current branch, `HEAD`, working-tree status, and recent local history.
5. Current implementation, tests, and assets for the recorded next action.

## Non-negotiable scope

- Preserve the catalog-first `/properties` redesign already committed at baseline.
- Keep the homepage locked. Do not redesign it.
- Preserve pages outside the exact checkpoint named in `SEPTEMBER-CLIENT-REVISION-PLAN.md`; do not expand a client revision into unrelated redesign work.
- Rebuild property detail routes as concise commercial listing experiences, not long editorial pages.
- Rebuild service and capability backpages to be roughly half their former length, with distinct substance and restrained imagery.
- Never invent property facts, approvals, prices, transaction outcomes, advisor assignments, project claims, biographies, or media rights.
- Generated imagery may be used only as clearly generic service context. Never present generated imagery as a Gala listing, client property, or completed project.
- Do not push, deploy, merge, rebase, amend, reset, discard user work, or submit forms unless the user explicitly authorizes that action.

## Continuation protocol

Advance one concrete checkpoint at a time. Before implementation, name its gate. After implementation, visually verify affected routes at desktop and mobile sizes, run targeted tests, review the diff, and update `OVERNIGHT-BUILD-PLAN.md` with:

- checkpoint completed;
- files and routes changed;
- verification results;
- remaining blockers;
- exact next action.

If a required fact or asset is unavailable, omit or qualify it, record the blocker, and continue with the next safe item. Do not replace implementation with planning or research.
