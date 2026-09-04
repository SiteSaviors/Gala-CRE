# Gala CRE Overnight Build Plan

Last updated: 2026-09-04 05:54 CDT

Branch: `codex/phase-0-stabilization`
Working rule: Preserve all existing work. Complete, verify, and locally commit one concrete checkpoint per pulse, then leave an explicit handoff for the next pulse.

## Continuation source of truth

Read these in order before changing code:

1. The current user instructions and recent task context.
2. The checked-out Git branch, `git status --short`, and recent local commit history.
3. This file for phase status, the last completed checkpoint, and the next action.
4. `PROPERTY-DATA-REGISTER.md` for verified facts, conflicts, and client-input gaps.
5. The current application code, tests, assets, and live routes.
6. Authoritative client materials or public primary sources only when missing facts must be researched.

If an older note conflicts with the current branch, tested code, or a newer explicit user instruction, use the newer authoritative state and record the correction here. Do not switch branches, pull, merge, rebase, or rewrite history during a pulse.

## Pulse protocol

Every 30-minute pulse must follow this sequence:

1. Confirm the repository path, current branch name, starting `HEAD`, working-tree state, and most recent handoff before changing anything.
2. Read the source-of-truth sequence above and resume the first incomplete phase at its recorded **Next action**.
3. Define one concrete checkpoint small enough to implement and verify during the pulse. Record its gate before coding.
4. Implement that checkpoint. A plan or status-only pulse does not count.
5. Run verification proportional to the change: targeted tests during implementation, browser QA for changed UI, and full tests/build/lint whenever a phase gate or shared system is affected.
6. Update this file before committing: check completed items, record files/routes changed, verification results, blockers, the exact next action, and the intended commit message.
7. Review the diff and stage only files belonging to the checkpoint, including this ledger update. Never sweep unrelated user changes into a commit.
8. Create one descriptive local commit only after the checkpoint's gate passes. Use `feat:`, `fix:`, `refactor:`, `test:`, or `docs:` and include the phase/checkpoint in the subject when useful.
9. Confirm the resulting commit hash and remaining working-tree state. Do not amend, reset, rebase, force, or push.
10. Leave an explicit task handoff containing the phase, checkpoint, verification, commit hash, remaining dirty files or blockers, and the exact first action for the next pulse.
11. Never treat completion of one page, one component, one test, or one commit as completion of the overnight objective.
12. If an item is blocked by missing client facts, media, credentials, form IDs, or URLs, record the blocker and immediately continue with the next safe, unblocked checkpoint. Do not create an empty commit.

### First-pulse baseline checkpoint

The branch currently contains accumulated, uncommitted Gala CRE work from the approved stabilization, service-page, homepage, and listing phases. Before new Phase 1 implementation, the first pulse must:

1. Inspect the entire working-tree diff and separate any unrelated or ambiguous files.
2. Run the full test suite, production build, and lint.
3. If the Gala changes are coherent and verification passes, stage only the verified Gala work plus this ledger and create a local baseline commit named `chore: establish verified Gala CRE overnight baseline`.
4. Record the baseline commit hash and any intentionally uncommitted files in the pulse log.
5. Leave Phase 1's existing next action as the explicit handoff.

This baseline is the first concrete checkpoint. Do not mix new Phase 1 refactoring into it.

## Non-negotiable guardrails

- Do not invent property facts, prices, acreage, addresses, approvals, parcels, transaction records, biographies, social URLs, documents, environmental claims, or form endpoints.
- Keep active listings, under-contract opportunities, and completed transactions clearly separated.
- Do not assume every property prospect is a land developer.
- Use only verified, client-supplied, properly licensed, or clearly generic imagery. Never imply generic imagery depicts a Gala property.
- Do not submit test forms, email Beth, publish, deploy, push, amend, reset, rebase, force-update, or discard existing work.
- Local commits are authorized only after the checkpoint's verification gate passes.
- Never commit secrets, environment files, downloaded research caches, build output, or unrelated user files.
- Do not expose internal approval notes, missing-data notes, configuration details, or draft warnings on public pages.
- Reuse the established visual system. Add abstractions only when they eliminate demonstrated repetition.
- Prefer concise, commercially useful pages over long editorial filler.

## Verified baseline

- [x] Phase 0 stabilization work is preserved on the current branch.
- [x] Landlord Representation is a complete flagship capability route.
- [x] Tenant Representation is distinct from the landlord journey.
- [x] The homepage closing sequence and Chapel Hill Road spotlight have been refined without adding unsupported facts.
- [x] 2301 Lackey Street is rebuilt as the flagship commercial-property listing.
- [x] Lackey includes a five-image purposeful gallery, commercial operating facts, fuel/environmental diligence, transaction conditions, map, documents, advisor, inquiry routing, and disclosure.
- [x] Latest full suite: 30 tests passed.
- [x] Latest production build passed.
- [x] Latest lint: zero errors and seven pre-existing Fast Refresh warnings in shared UI files.
- [x] Lackey passed desktop, tablet, mobile, overflow, route, and browser-console checks.

## Phase 1 — Commercial listing framework

Status: **Completed**

Objective: Convert the completed Lackey experience into a reusable, schema-driven system without weakening its commercial-property focus.

- [x] Audit `CommercialListingPage` for Lackey-specific presentation text that belongs in property data.
- [x] Define conditional modules for identity, economics, physical facts, operating status, occupancy, improvements, fuel/environmental diligence, entitlement or redevelopment considerations, availability, maps, documents, gallery, advisor, inquiry routing, and disclosure.
- [x] Ensure missing modules disappear cleanly without empty space or public placeholder language.
- [x] Preserve flexible page lengths; properties do not need matching section counts.
- [x] Add model and rendering tests for conditional module behavior.
- [x] Confirm the existing catalog and Lackey route have no regression.

Gate: Lackey renders entirely through reusable property data, unsupported sections disappear cleanly, and targeted tests pass.

Next action: Phase gate passed. Continue with the first Phase 2 action below.

## Phase 2 — Complete verified active listings

Status: **In progress**

Objective: Finish each verified active listing with a journey appropriate to its actual asset and buyer.

- [x] Rebuild 611 & 703 Church Street through the shared listing system.
- [x] Make childcare approval and the two-site offering the central Church Street differentiators, subject to source verification.
- [ ] Rebuild 5047 Yadkin Road through the shared system.
- [ ] Make represented shopping-center approval, site planning, access, and development diligence central to Yadkin.
- [ ] Add Family Farm Road only when authoritative facts and media can be verified.
- [ ] Confirm each page's property-specific inquiry preselection, documents, map, gallery, advisor, and disclosure.

Gate: A prospect can understand each verified active offering, material conditions, available diligence, advisor, and next action within two minutes.

Next action: Build 5047 Yadkin Road's structured `listingPage` data through the shared system, keeping the represented shopping-center approval, site planning, access, and development diligence central while clearly identifying the approved plan and municipal approval record as request items.

## Phase 3 — Capability route architecture

Status: **Pending**

Objective: Give every advertised capability a deliberate, test-covered destination.

- [ ] Create a route matrix covering all desktop-menu, mobile-menu, footer, service-index, and related-capability links.
- [ ] Cover Landlord Representation and Tenant Representation.
- [ ] Cover Industrial, Multifamily, Retail, Office, and Land investment sales.
- [ ] Cover Site Strategy, Entitlements, Infrastructure, and Development Oversight.
- [ ] Cover Debt, Equity, Capital Strategy, and Transaction Coordination.
- [ ] Cover Property Management Partnership.
- [ ] Remove dead ends, hash-only substitutes, and placeholder-only public routes.
- [ ] Add automated route coverage for every advertised capability.

Gate: Every advertised capability resolves to a valid route and no navigation surface promotes a dead end.

Next action: Generate the route matrix from existing service and navigation data after active listings are stable.

## Phase 4 — GalaBroker and GalaSales pages

Status: **Pending**

Objective: Complete the remaining brokerage and investment-sales capability routes.

- [ ] Give every page a distinct client, commercial problem, advisory process, deliverables, and outcome.
- [ ] Add purposeful imagery and accurate alt text to every route.
- [ ] Add page-specific metadata and concise inquiry CTAs.
- [ ] Add related-capability navigation without circular filler.
- [ ] Keep Landlord and Tenant Representation substantively different.
- [ ] Ensure Industrial, Multifamily, Retail, Office, and Land do not read as one page with swapped nouns.

Gate: Every GalaBroker and GalaSales route is persuasive, visually complete, responsive, and materially specific.

Next action: Build pages in the order established by the Phase 3 route matrix.

## Phase 5 — GalaDevelop, GalaCapital, and Property Management

Status: **Pending**

Objective: Complete the remaining service ecosystem without overstating Gala's role.

- [ ] Build Site Strategy.
- [ ] Build Entitlements.
- [ ] Build Infrastructure.
- [ ] Build Development Oversight.
- [ ] Build Debt.
- [ ] Build Equity.
- [ ] Build Capital Strategy.
- [ ] Build Transaction Coordination.
- [ ] Build Property Management Partnership.
- [ ] Clearly distinguish direct Gala services, coordination, capital access, and partner-delivered work.
- [ ] Add appropriate imagery, metadata, cross-links, and CTAs.

Gate: Every remaining capability route is complete, accurately scoped, cross-linked, responsive, and free of unsupported promises.

Next action: Start with the highest-intent GalaDevelop route after Phase 4 passes.

## Phase 6 — Careers and agent recruiting

Status: **Pending**

Objective: Build a credible recruiting journey for experienced commercial real-estate agents.

- [ ] Add Careers to desktop navigation, mobile navigation, and footer.
- [ ] Explain commercial development listings, sales-team support, and commercial listing opportunities.
- [ ] Capture experience, specialties, license information, past sales, production context, geography, and contact details.
- [ ] Add accessible validation, success and error states, spam protection, and keyboard behavior.
- [ ] Build a production-safe submission adapter intended to route to `beth@galacregroup.com`.
- [ ] Do not send test submissions.
- [ ] If the approved Google Form or endpoint is missing, complete the UX and integration boundary and record the single configuration requirement privately.
- [ ] Do not expose a broken submit button publicly.

Gate: Careers is a finished recruiting experience that becomes live when the approved submission endpoint is configured.

Next action: Audit the existing contact API and form patterns before choosing the smallest reusable integration.

## Phase 7 — Time-sensitive 1031 and investor sourcing

Status: **Pending**

Objective: Create a focused replacement-property sourcing inquiry for time-sensitive investors.

- [ ] Create a distinct route and CTA entry point.
- [ ] Capture exchange deadline, target geography, asset type, budget or equity range, financing status, risk profile, contact details, and timing.
- [ ] Preserve relevant property and referral query parameters.
- [ ] Include appropriate tax and legal-advice boundaries without overwhelming the page.
- [ ] Reuse the secure form foundation from Careers/contact where appropriate.
- [ ] Do not send test submissions.

Gate: The journey is concise, appropriately urgent, accessible, and safely routed once approved backend configuration is present.

Next action: Define the minimum decision-useful form fields after the Careers integration pattern is settled.

## Phase 8 — Transactions and property inventory

Status: **Pending**

Objective: Correctly classify and present Gala's active, under-contract, and completed work.

- [ ] Verify the correct spelling, address, status, facts, and media for 802 Bragg Boulevard.
- [ ] Verify 10414 and 10416 Chapel Hill Road transaction details and combined $1.8M presentation.
- [ ] Verify Pittard Sears address, status, transaction facts, and the basis for any record-breaking claim.
- [ ] Verify Family Farm Road facts, active status, listing links, flyer, and photography.
- [ ] Keep closed transactions out of active Listings.
- [ ] Label under-contract opportunities accurately.
- [ ] Strengthen the Chapel Hill Road homepage spotlight using only verified facts.
- [ ] Build the transaction display system even if some client records remain blocked.

Gate: Active listings, under-contract opportunities, and completed transactions are never conflated.

Next action: Cross-reference `PROPERTY-DATA-REGISTER.md`, client materials, and authoritative public sources.

## Phase 9 — Brand, social, navigation, and conversion integration

Status: **Pending**

Objective: Make the entire site navigable, credible, and conversion-ready.

- [ ] Add Gaurang Gala's Instagram only after confirming the authoritative profile URL.
- [ ] Add Leigh Gala's Instagram only after confirming the authoritative profile URL.
- [ ] Audit desktop navigation, mega-menu, mobile navigation, and footer.
- [ ] Audit service cross-links, property filters, CTA hierarchy, contact preselection, and inquiry routing.
- [ ] Confirm every primary journey works by keyboard and touch.
- [ ] Confirm query parameters survive through the intended inquiry path.

Gate: Every primary user journey reaches the correct context without dead links, guessed profiles, or navigation traps.

Next action: Run a route-and-CTA crawl after the new pages exist.

## Phase 10 — Sitewide quality pass

Status: **Pending**

Objective: Remove presentation risks before the meeting.

- [ ] Test desktop, tablet, and mobile layouts.
- [ ] Test reduced motion and keyboard focus.
- [ ] Check semantic headings, alt text, form labels, errors, and status messages.
- [ ] Check maps, filters, canonical links, metadata, and social previews.
- [ ] Review console errors and loading failures.
- [ ] Review image weight, lazy loading, and major performance problems.
- [ ] Run targeted tests, the full suite, production build, and lint.
- [ ] Fix errors and meaningful project-introduced warnings.
- [ ] Do not rewrite stable third-party UI files solely to eliminate pre-existing non-blocking warnings.

Gate: Production build and tests pass with no horizontal overflow, broken navigation, page-specific console errors, or obvious unfinished public content.

Next action: Perform the full route matrix across three representative viewport widths.

## Phase 11 — Meeting package

Status: **Pending**

Objective: Make the overnight work easy to review and demonstrate.

- [ ] Create a concise morning status report.
- [ ] Create a client-decision and missing-input list.
- [ ] List every route ready to demonstrate.
- [ ] Identify missing property facts and imagery.
- [ ] Identify the approved form endpoint or Google Form configuration still needed.
- [ ] Identify social URLs that still require confirmation.
- [ ] Recommend a short meeting demonstration order.
- [ ] Document the exact command and local URL needed to start the site.

Gate: Luke can understand what is ready, what remains, and what to show in under five minutes.

Next action: Compile only after the sitewide QA gate passes.

## Phase 12 — Evidence-based benchmark improvement loop

Status: **Pending**

Objective: Continue improving after the assigned backlog is complete instead of stopping.

- [ ] Research current leading U.S. commercial real-estate brokerage and development websites.
- [ ] Include strong property-detail, services, credibility, navigation, and conversion examples.
- [ ] Record source URLs, observed patterns, and relevance to Gala.
- [ ] Compare findings with the confident feel of `radiusbuilt.com` without copying it.
- [ ] Rank opportunities by user value and implementation risk.
- [ ] Implement the highest-value one to three findings.
- [ ] Re-run the affected phase gates.
- [ ] Repeat with the next evidence-backed opportunity until the heartbeat is paused.

Gate: Each benchmark-driven change materially improves information architecture, property evaluation, commercial credibility, usability, conversion, or visual polish.

Next action: Begin only after Phases 1–11 have passed.

## Known client-input blockers

These blockers must not stop unrelated work:

- Family Farm Road: authoritative property facts, flyer, listing link, and approved photography.
- 802 Bragg Boulevard: exact address/spelling, transaction facts, date, asset type, and approved media.
- 10414 and 10416 Chapel Hill Road: closing details, transaction date, asset classification, and approved media beyond the verified combined $1.8M reference.
- Pittard Sears: exact property identity, address, contract status, pricing context, approved media, and substantiation for the record-breaking claim.
- Careers: approved Google Form ID or production submission endpoint and confirmation of required recipient routing.
- 1031 sourcing: approved recipient routing and any required compliance language.
- Social: authoritative Instagram profile URLs for Gaurang and Leigh Gala.
- Services: additional client photography where generic contextual imagery would be insufficient.

## Pulse log

Every new entry must use this handoff shape:

```text
### Pulse — YYYY-MM-DD HH:MM TZ
- Starting branch / HEAD:
- Source-of-truth checked:
- Phase / checkpoint:
- Gate:
- Completed:
- Files and routes changed:
- Verification:
- Commit:
- Remaining working-tree state:
- Blockers:
- Exact next action:
```

### Baseline — 2026-09-04 04:54 CDT

- Phase worked: Ledger initialization before Phase 1.
- Completed: Created the persistent execution plan and recorded the verified state inherited from the completed stabilization, service-page, homepage, QA, and Lackey listing work.
- Verification: Repository and branch inspected; no existing changes were committed or discarded.
- Blockers: Recorded above; none prevent Phase 1.
- Exact next action: Audit the flagship listing component against the structured property data and begin extracting the reusable commercial-listing framework.

### Pulse — 2026-09-04 05:13 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `2d373e0`.
- Source-of-truth checked: Current user instruction, branch/status/log, this ledger, `PROPERTY-DATA-REGISTER.md`, complete source diff, tests, assets, research records, and ignore rules.
- Phase / checkpoint: First-pulse verified baseline checkpoint.
- Gate: The accumulated Gala-only work is coherent; no unrelated files or secret values are included; full tests and production build pass; lint has zero errors.
- Completed: Audited the accumulated stabilization, capability-page, homepage, property-platform, contact, research, media, and test changes. Confirmed that the two research documents are intentional project records and that generated `dist` output remains ignored.
- Files and routes changed: Existing accumulated Gala CRE implementation plus `GALA-CRE-LISTING-STRUCTURE-RESEARCH.md`, `report-source.md`, `PROPERTY-DATA-REGISTER.md`, and this continuation ledger. Public work includes the homepage, service routes, Landlord and Tenant Representation, property catalog, Church Street gallery, Lackey flagship listing, contact routing, header, and footer.
- Verification: `git diff --check` passed; secret-pattern scan found no secret values; 30/30 tests passed; production build passed; sequential lint passed with zero errors and seven pre-existing Fast Refresh warnings in shared UI files. Earlier responsive/browser QA passed for the changed flagship routes.
- Commit: This checkpoint commit; intended message `chore: establish verified Gala CRE overnight baseline`. Resolve the hash with `git log -1 --oneline` at the next continuation.
- Remaining working-tree state: Expected clean after the baseline commit; confirm immediately after committing.
- Blockers: Existing client-input blockers remain recorded above; none prevent Phase 1.
- Exact next action: On the verified baseline, audit `src/components/properties/CommercialListingPage.tsx` against `src/content/properties.ts`, identify hard-coded Lackey language, and move the first shared and asset-specific section content into the structured listing schema.

### Immediate checkpoint — 2026-09-04 05:17 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at verified baseline `994bc58` with a clean working tree.
- Source-of-truth checked: Current user instruction, branch/status/log, this ledger, `PROPERTY-DATA-REGISTER.md`, the Lackey listing schema, shared renderer, and property tests.
- Phase / checkpoint: Phase 1 — make the commercial listing renderer data-driven and conditionally composable.
- Gate: Lackey preserves its approved content and appearance; asset-specific section copy lives in structured property data; unsupported modules disappear without placeholders; shared tests/build/lint/browser QA pass.
- Completed: Added structured information, transaction, gallery, location, document, advisor, overview, and fact modules; made every non-core module optional; conditionally removed empty sections; made document grids adapt to their item count; added minimal-record rendering coverage.
- Files and routes changed: `src/content/properties.ts`, `src/components/properties/CommercialListingPage.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, and `src/test/properties-model.test.ts`; verified `/properties/2301-lackey-street`.
- Verification: 31/31 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop browser check preserved five gallery images, three document cards, one map, metadata, and no console errors; mobile check confirmed 390px layout with no horizontal overflow; `git diff --check` passed.
- Commit: This checkpoint commit; intended message `refactor: make commercial listing modules data driven`. Resolve the hash with `git log -1 --oneline` at the next continuation.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: None for the framework. Church Street's address, surveyed acreage, and underlying approval documents remain client-confirmation items and must stay qualified.
- Exact next action: Build Church Street's structured `listingPage` data with its approved aerial gallery and a concise childcare-opportunity journey, while preserving every documented qualification.

### Pulse — 2026-09-04 05:54 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `e088ed5` with a clean working tree.
- Source-of-truth checked: Current heartbeat instructions and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; the current property schema, Church Street data and approved aerial assets; route tests; and the live local route.
- Phase / checkpoint: Phase 2 — rebuild Church Street as the childcare-specific active-listing journey.
- Gate: Church Street renders through the shared listing system; a prospect can identify the two-site offering, represented childcare approval, material verification items, available aerial context, documents path, location, advisor, and property-specific inquiry without unsupported claims or public draft language; desktop and mobile layouts have no horizontal overflow.
- Completed: Added Church Street's structured identity, economics, childcare-use position, offering composition, buyer-verification conditions, five-image aerial gallery, qualified location context, diligence requests, named advisor, inquiry routing, and brokerage disclosure. Kept the marketed 611/703 title and approximate 1.09-acre figure qualified; did not resolve the conflicting public address or acreage fields without client records.
- Files and routes changed: `src/content/properties.ts`, `src/test/gala-pages.test.tsx`, `src/test/properties-model.test.ts`, and this ledger; rebuilt `/properties/611-703-church-street`.
- Verification: 17/17 targeted tests passed; 31/31 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop and 390px mobile browser checks passed with five gallery items, working map/document/advisor/inquiry surfaces, no horizontal overflow, and no page-specific console errors; `git diff --check` passed.
- Commit: Intended message `feat: rebuild Church Street listing journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: The second legal address (703 versus 711), parcel IDs, surveyed combined acreage (1.09 versus 1.000 public figures), combined-sale requirement, approval record, site plan, zoning confirmation, and approval conditions remain client/document inputs. The page identifies these as diligence items without exposing internal draft notices.
- Exact next action: Build 5047 Yadkin Road's structured `listingPage` data through the shared system, using the verified price/site facts and treating the represented approved shopping-center plan, permit readiness, access, circulation, buffers, and utility connections as document-backed claims that buyers must verify.
