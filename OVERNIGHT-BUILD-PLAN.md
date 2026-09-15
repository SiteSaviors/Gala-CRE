# Gala CRE Overnight Build Plan

Last updated: 2026-09-08 01:00 CDT

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

Status: **Completed**

Objective: Finish each verified active listing with a journey appropriate to its actual asset and buyer.

- [x] Rebuild 611 & 703 Church Street through the shared listing system.
- [x] Make childcare approval and the two-site offering the central Church Street differentiators, subject to source verification.
- [x] Rebuild 5047 Yadkin Road through the shared system.
- [x] Make represented shopping-center approval, site planning, access, and development diligence central to Yadkin.
- [x] Evaluate Family Farm Road for inclusion; initially deferred, then added September 8 after the client supplied current Zillow, Doorify MLS, LoopNet, and NestVisions sources.
- [x] Confirm each currently verified page's property-specific inquiry preselection, documents, map, gallery, advisor, and disclosure. Family Farm Road was assigned to Leigh Roach by the client on September 14.

Gate: A prospect can understand each verified active offering, material conditions, available diligence, advisor, and next action within two minutes.

Next action: Phase gate passed for the four verified active offerings. Continue with Phase 3 by generating one authoritative advertised-capability route matrix from the current navigation and service data, then add automated coverage that fails on any missing or placeholder-only destination.

## Phase 3 — Capability route architecture

Status: **Completed**

Objective: Give every advertised capability a deliberate, test-covered destination.

- [x] Create a route matrix covering all desktop-menu, mobile-menu, footer, service-index, homepage, and related-capability links.
- [x] Cover Landlord Representation and Tenant Representation.
- [x] Cover Industrial, Multifamily, Retail, Office, and Land investment sales.
- [x] Cover Site Strategy, Entitlements, Infrastructure, and Development Oversight.
- [x] Cover Debt, Equity, Capital Strategy, and Transaction Coordination.
- [x] Cover Property Management Partnership.
- [x] Remove dead ends, hash-only substitutes, and placeholder-only public routes.
- [x] Add automated route coverage for every advertised capability.

Gate: Every advertised capability resolves to a valid route and no navigation surface promotes a dead end.

Next action: Phase gate passed. Continue with Phase 4 by building Industrial as the first distinct GalaSales editorial capability page, using asset-specific decision criteria, a sale process, concrete deliverables, accurate diligence language, purposeful contextual imagery, page metadata, related links, and a concise inquiry CTA.

## Phase 4 — GalaBroker and GalaSales pages

Status: **Completed**

Objective: Complete the remaining brokerage and investment-sales capability routes.

- [x] Give every page a distinct client, commercial problem, advisory process, deliverables, and outcome.
- [x] Add purposeful imagery and accurate alt text to every route.
- [x] Add page-specific metadata and concise inquiry CTAs.
- [x] Add related-capability navigation without circular filler.
- [x] Keep Landlord and Tenant Representation substantively different.
- [x] Ensure Industrial, Multifamily, Retail, Office, and Land do not read as one page with swapped nouns.
- [x] Build Industrial as a distinct owner/investor sale-advisory journey with contextual imagery, accurate diligence boundaries, metadata, related links, and focused inquiry routing.
- [x] Build Multifamily as a distinct owner/investor sale-advisory journey grounded in rent-roll, operating, physical-condition, and underwriting decisions.
- [x] Build Retail as a distinct owner/investor sale-advisory journey grounded in lease, tenant, trade-area, access, and site-utility decisions.
- [x] Build Office as a distinct owner/investor sale-advisory journey grounded in occupancy, rollover, leasing-capital, and space-competitiveness decisions.
- [x] Build Land as the final distinct GalaSales route, centered on verified use paths, access, infrastructure, physical constraints, buyer fit, diligence, transaction conditions, and execution.

Gate: Every GalaBroker and GalaSales route is persuasive, visually complete, responsive, and materially specific.

Next action: Phase gate passed. All GalaBroker and GalaSales capabilities now use the editorial system and retain distinct audiences, decision criteria, processes, deliverables, imagery, metadata, cross-links, and inquiry context.

## Phase 5 — GalaDevelop, GalaCapital, and Property Management

Status: **Completed**

Objective: Complete the remaining service ecosystem without overstating Gala's role.

- [x] Build Site Strategy.
- [x] Build Entitlements.
- [x] Build Infrastructure.
- [x] Build Development Oversight.
- [x] Build Debt.
- [x] Build Equity.
- [x] Build Capital Strategy.
- [x] Build Transaction Coordination.
- [x] Build Property Management Partnership.
- [x] Clearly distinguish direct Gala services, coordination, capital access, and partner-delivered work.
- [x] Add appropriate imagery, metadata, cross-links, and CTAs.

Gate: Every remaining capability route is complete, accurately scoped, cross-linked, responsive, and free of unsupported promises.

Next action: Phase gate passed. Hold the unresolved property, social, profile, and form-delivery inputs for the user's later return; the next user-directed work can begin the planned refinement and audit pass.

## Phase 6 — Careers and agent recruiting

Status: **Complete within the approved implementation scope; recipient configuration deferred**

Objective: Build a credible recruiting journey for experienced commercial real-estate agents.

- [x] Add Careers to desktop navigation, mobile navigation, and footer.
- [x] Create `/careers` and explain commercial development listings, sales-team support, and commercial listing opportunities.
- [x] Capture experience, specialties, license information, past sales, production context, geography, and contact details.
- [x] Add accessible validation, success and error states, spam protection, and keyboard behavior.
- [x] Build a production-safe shared submission adapter with private Careers recipient routing intended for `beth@galacregroup.com` once approved.
- [x] Do not send test submissions.
- [x] Complete the UX and private integration boundary without hard-coding an endpoint, recipient, or provider credential in browser code.
- [x] Fail safely with an inline error if server delivery is unavailable while retaining the applicant's entered information.

Gate: Careers is a finished recruiting experience that becomes live when the approved submission endpoint is configured.

Next action: Configure and verify the approved careers delivery endpoint only after the user supplies recipient and storage requirements; until then, proceed with the 1031 acquisition-criteria experience.

## Phase 7 — Time-sensitive 1031 and investor sourcing

Status: **Complete within the approved implementation scope; recipient configuration deferred**

Objective: Create a focused replacement-property sourcing inquiry for time-sensitive investors.

- [x] Create `/investors/1031-exchange` and surface it from Properties, property detail pages, GalaSales, GalaCapital, and the footer without adding another top-level navigation item.
- [x] Capture contact details, exchange status, relinquished closing, identification and completion deadlines, target geography, asset type, pricing, equity, financing, occupancy, tenant, return/risk, market-interest, intermediary, and response preferences.
- [x] Preserve relevant property and referral query parameters in the eventual submission payload.
- [x] Use supplied identification dates to calculate internal routing priority without publishing response-time or closing promises.
- [x] Include appropriate tax, legal, accounting, and qualified-intermediary boundaries without overwhelming the page.
- [x] Reuse the secure form foundation from Careers/contact with accessible validation, consent, spam protection, and success/error states.
- [x] Fail safely at the private handler until an approved recipient is configured; no external email or Google record is created when delivery configuration is missing.
- [x] Route through the shared server-side handler with independent validation, rate limiting, private email routing, and optional Google record synchronization.
- [x] Do not send test submissions.

Gate: The journey is concise, appropriately urgent, accessible, and safely routed once approved backend configuration is present.

Next action: Configure and verify the approved investor-inquiry endpoint only after the user supplies recipient and storage requirements; until then, proceed to transaction and inventory verification.

## Phase 8 — Transactions and property inventory

Status: **In progress; verified listing, video, and transaction-record updates implemented**

Objective: Correctly classify and present Gala's active, under-contract, and completed work.

- [x] Verify and add 802 Bragg Boulevard as a recently sold retail transaction using the client-supplied status, Crexi sold designation and three listing images, and LoopNet's off-market record. Do not publish former asking prices as closing consideration.
- [x] Audit the supplied HMS record for 10416 Chapel Hill Road. It verifies a July 29, 2026 closed status, Gala listing involvement, two parcels, and approximately 3.3 acres, but does not resolve the 10414/10416 combined-address structure or whether its displayed $2.5M is list or closing price.
- [ ] Verify 10414 and 10416 Chapel Hill Road transaction details and combined $1.8M presentation with client/closing records.
- [x] Audit HMS record 10119823 for 202 North Main Street. It verifies the July 30, 2026 closed status and property facts, but the record attributes the listing to Century 21 and does not establish Gala's transaction role or label the displayed $825,000 as closing consideration.
- [x] Add a qualified closed-transaction card and detail route for 202 North Main Street using its verified address, closing date, and physical facts. Keep the ambiguous $825,000 display and all MLS photography unpublished; use the shared Gala completed-transaction graphic and omit unconfirmed advisor credit.
- [x] Add a qualified closed-transaction card and detail route for 10416 Chapel Hill Road using its verified address, closing date, approximate acreage, parcel count, and Gala listing involvement. Keep the conflicting $2.5M/$1.8M economics and all MLS photography unpublished; limit the record to 10416 until the combined-address structure is confirmed.
- [x] Audit the Lexington Townhomes Drive folders. The materials verify 1111 Brown Street, three parcels, a proposed 58-townhome program, Gaurang Gala's listing assignment, eight drone images, one video, and multiple 2023 approvals; price, current approval status, and publication rights remain unresolved.
- [x] Audit the Family Farm and Church Street NestVisions packages. Each contains one hosted/downloadable video plus its existing image package; use the hosted player or a web-optimized derivative instead of the 421 MB and 508 MB source files.
- [x] Replace the hosted-player embeds with a shared native-video module and locally packaged low-bandwidth derivatives for Family Farm Road and Church Street; add the client-supplied Lexington video as a compressed portrait derivative. All three use poster images, controls, `playsinline`, `preload="none"`, viewport-proximity source loading, and no autoplay.
- [x] Audit the only Watkins material found locally. The 2025 news article describes a proposed Alta Watkins development but does not substantiate a Gala transaction, transaction status/value, advisor assignment, or reusable media.
- [ ] Verify Pittard Sears address, status, transaction facts, and the basis for any record-breaking claim.
- [x] Add Family Farm Road from the supplied MLS, LoopNet, Zillow, and NestVisions sources with verified public facts, five distinct images, careful diligence language, and property-specific inquiry routing. Leigh Roach's listing assignment was subsequently client-confirmed; underlying land records remain client inputs.
- [x] Add Lexington Townhome Site at `/properties/1111-brown-street` through the shared listing system using “Contact for pricing,” proposed 58-townhome positioning, qualified historical-approval language, Gaurang Gala as advisor, five client-supplied aerials, and inquiry-only diligence materials. Keep it out of the homepage carousel pending review.
- [x] Keep closed transactions out of the active homepage carousel and visually distinguish them from active inventory in the Properties catalog.
- [ ] Label under-contract opportunities accurately.
- [x] Strengthen the Chapel Hill Road homepage spotlight using only verified facts and remove the unconfirmed combined price from public display.
- [x] Build the transaction display system even if some client records remain blocked.

Gate: Active listings, under-contract opportunities, and completed transactions are never conflated.

Next action: Obtain authoritative Pittard Sears property identity, contract status, approved media, and substantiation for the record-breaking claim before preparing its under-contract record.

## Phase 9 — Brand, social, navigation, and conversion integration

Status: **In progress; current Careers and 1031 conversion paths verified**

Objective: Make the entire site navigable, credible, and conversion-ready.

- [ ] Add Gaurang Gala's Instagram only after confirming the authoritative profile URL.
- [ ] Add Leigh Gala's Instagram only after confirming the authoritative profile URL.
- [x] Audit desktop navigation, mega-menu, mobile navigation, and footer across the current public route matrix.
- [x] Audit service cross-links, property filters, CTA hierarchy, contact preselection, and inquiry routing for the current public route matrix.
- [x] Confirm current primary journeys work by keyboard and touch, including the new main-content skip link and mobile Careers navigation.
- [x] Confirm Careers, property-sourcing, property-detail, GalaSales, GalaCapital, and Contact query parameters survive through the intended inquiry path.

Gate: Every primary user journey reaches the correct context without dead links, guessed profiles, or navigation traps.

Next action: Add the authoritative Gaurang and Leigh Instagram URLs only after the client supplies or confirms them; do not guess profile destinations.

## Phase 10 — Sitewide quality pass

Status: **Current route and form scope passed; production configuration and later content additions require a final rerun**

Objective: Remove presentation risks before the meeting.

- [x] Test the current 33-route matrix at desktop, tablet, and mobile widths (99 combinations), including the later-added Family Farm and 802 Bragg Boulevard routes at all three sizes.
- [x] Test reduced motion, keyboard focus, first-error focus, and a visible main-content skip link.
- [x] Check primary headings, main landmarks, form labels, grouped-field error associations, errors, and status messages.
- [x] Check property filters, canonical links, runtime Open Graph/Twitter metadata, and sitemap inclusion for Careers and 1031. Map rendering remains subject to the property data supplied for each listing.
- [x] Review console errors, broken images, and loading failures across the current route matrix.
- [x] Review image weight and lazy loading; replace the active 23.8 MB hero video with a 15.7 MB 720p derivative and prevent the full video binary from loading on mobile or under reduced motion.
- [x] Run targeted tests, the full 76-test suite, production build, and lint.
- [x] Fix the discovered tablet Brokerage overflow and current project-introduced accessibility/metadata defects.
- [x] Leave the seven stable shared-UI Fast Refresh warnings unchanged.

Gate: Production build and tests pass with no horizontal overflow, broken navigation, page-specific console errors, or obvious unfinished public content.

Next action: Re-run this gate after later capability, transaction, social, or production-form configuration changes; before public launch, create a sub-5 MB hero encode, set the final canonical domain, verify deployed social previews, approve a full privacy policy, and test production delivery only with explicit recipient approval.

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

- Family Farm Road: legal parcel schedule, survey, brokerage disclosure language, zoning record, and available well, septic, access, private-road, and property-condition documents. Leigh Roach's listing assignment is client-confirmed; current facts and five selected images are sourced from the supplied active listing and NestVisions package.
- 802 Bragg Boulevard: final sale price and closing date remain unpublished client inputs. The address, retail classification, physical facts, Crexi sold designation, LoopNet off-market status, Gala advisor, and three former-listing images are verified.
- 10414 and 10416 Chapel Hill Road: confirm the combined-address structure, closing economics, preferred transaction credit, and approved non-MLS imagery. The existing homepage and 10416 record intentionally publish no price.
- Lexington Townhomes / 1111 Brown Street: current asking price ($990,000 agreement versus $1,000,000 flyer), current status of the time-conditioned 2023 approvals, controlling land-use approval, survey/gross acreage, and media/document publication rights.
- 202 North Main Street: Gala's exact transaction role, whether the displayed $825,000 is closing consideration, preferred advisor credit, and approved non-MLS imagery; the qualified closed record is live locally without those claims.
- 10416 Chapel Hill Road HMS record: whether the displayed $2.5M is list or closing price, how the two MLS parcels map to 10414/10416, the approved combined-address presentation, preferred advisor credit, and reusable transaction imagery; the qualified 10416-only record is live locally without price or MLS photography.
- Watkins: exact deal/property identity, Gala's role, transaction status and economics, advisor assignment, and approved imagery; the saved 2025 article alone is insufficient.
- Pittard Sears: exact property identity, address, contract status, pricing context, approved media, and substantiation for the record-breaking claim.
- Careers: recipient and Google/email storage configuration intentionally deferred by the user until after the recruiting form is built.
- 1031 sourcing: recipient and Google/email storage configuration intentionally deferred by the user until after the investor form is built; baseline tax/legal boundary copy is now present for client review.
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

### Pulse — 2026-09-04 06:28 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `8ffc52c` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; Yadkin's entry in `PROPERTY-DATA-REGISTER.md`; the current listing schema and renderer; the only approved Yadkin aerial asset; existing property tests; and the live local Yadkin route.
- Phase / checkpoint: Phase 2 — rebuild 5047 Yadkin Road and close the verified-active-listing gate.
- Gate: Yadkin renders through the shared listing system; a prospect can identify the price, acreage, represented shopping-center plan, site-planning scope, material approval and development checks, aerial context, document path, location, advisor, and property-specific inquiry within two minutes; unsupported approval details are not presented as verified; desktop and mobile layouts have no horizontal overflow.
- Completed: Added Yadkin's structured identity, economics, planning position, execution-diligence path, transaction conditions, single purposeful annotated-aerial module, qualified location context, plan and development-document requests, named advisor, inquiry routing, and disclosure. Clearly attributed plan approval, permit readiness, access, circulation, buffers, and utility claims to the public offering and directed buyers to the underlying records. Family Farm Road was subsequently added from the client-supplied current listing sources and media package, bringing Phase 2 to four verified active offerings.
- Files and routes changed: `src/content/properties.ts`, `src/test/gala-pages.test.tsx`, `src/test/properties-model.test.ts`, and this ledger; rebuilt `/properties/5047-yadkin-road`.
- Verification: 18/18 targeted tests passed; 32/32 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop and 390px mobile browser checks passed with one annotated-aerial gallery item, three document paths, map/advisor/inquiry surfaces, no horizontal overflow, and no page-specific console errors; `git diff --check` passed.
- Commit: Intended message `feat: rebuild Yadkin Road listing journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: The approved shopping-center plan, municipal approval record, case or permit number, approval date and conditions, remaining permits, parcel ID, zoning, frontage, access details, utility evidence, wetland/flood information, and additional approved site media remain client/document inputs. Family Farm Road still requires its legal parcel schedule, survey, brokerage disclosure language, zoning record, and available well, septic, access, private-road, and property-condition documents; Leigh Roach's listing assignment is confirmed.
- Exact next action: Generate a single advertised-capability route matrix from the desktop menu, mobile menu, footer, service index, and related-capability data; add automated coverage that asserts every promoted path resolves to substantive page content rather than a dead end or placeholder.

### Pulse — 2026-09-04 07:03 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `6eaef65` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; application routes; service, header, homepage, footer, capability-page, and service-detail data; current tests; and representative live capability routes.
- Phase / checkpoint: Phase 3 — define the authoritative capability route matrix and eliminate promoted hash-only destinations.
- Gate: All 16 user-specified commercial capabilities have unique dedicated paths; each path resolves through current route lookup to meaningful lead and deliverable content or an approved editorial page; existing homepage and desktop mega-menu capability links target the dedicated routes; automated coverage fails on missing, duplicate, hash-only, or placeholder content.
- Completed: Added dedicated slugs, audience-specific leads, and at least three concrete inclusions for Industrial, Multifamily, Retail, Office, Land, Site Strategy, Entitlements, Infrastructure, Development Oversight, Debt, Equity, Capital Strategy, Transaction Coordination, and Property Management Partnership. Exported one generated `advertisedCapabilityRoutes` matrix alongside the canonical service data. Updated homepage and desktop mega-menu capability destinations from in-page hashes to dedicated routes. Added route uniqueness, content-depth, and render coverage for all 16 paths.
- Files and routes changed: `src/content/services.ts`, `src/components/site/SiteHeader.tsx`, `src/pages/Index.tsx`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger. Added or activated routes under `/services/investment-sales/*`, `/services/development-services/*`, `/services/capital-markets/*`, and `/services/property-management/property-management-partnership` while preserving the two existing brokerage routes.
- Verification: 17/17 targeted tests passed; 35/35 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; representative Industrial route passed desktop and 390px mobile browser checks with three deliverables, related-route navigation, no horizontal overflow, and no page-specific console errors; `git diff --check` passed.
- Commit: Intended message `feat: define commercial capability route matrix`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No route-definition blocker. Most new routes intentionally use the concise shared capability shell and service-level imagery until Phases 4 and 5 provide distinct editorial journeys and purposeful media.
- Exact next action: Refactor the desktop mega-menu, mobile service navigation, footer service links, service index, homepage capability cards, and related-capability navigation to consume the canonical route matrix instead of maintaining duplicate labels and paths; include Property Management Partnership in the appropriate navigation surfaces and add consistency tests for every rendered capability link.

### Pulse — 2026-09-04 07:40 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `b0b8045` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; the canonical service and capability route data; header, mobile menu, homepage, service index, footer, related navigation, styles, tests, and representative live navigation surfaces.
- Phase / checkpoint: Phase 3 — connect the canonical capability matrix across every navigation surface and close the route-architecture gate.
- Gate: Desktop mega-menu, mobile service navigation, homepage capability cards, service index, footer, and related-capability navigation derive destinations from shared service data; all 16 dedicated capability routes remain reachable without duplicated hard-coded paths, hash substitutes, dead ends, or placeholder-only pages; Property Management Partnership appears in the applicable fifth-service surfaces; responsive navigation has no horizontal overflow.
- Completed: Added canonical service brand names and homepage summaries, generated reusable service navigation groups from the route matrix, removed duplicate header and homepage route definitions, added Property Management to desktop/mobile/footer navigation, surfaced all 16 capability paths on the service index, expanded the footer to include all five service families, and added automated cross-surface destination checks. Preserved the four-card homepage composition while deriving those cards from the same source.
- Files and routes changed: `src/content/services.ts`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/pages/Index.tsx`, `src/pages/Services.tsx`, `src/styles/gala.css`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; affected `/`, `/services`, all `/services/*` navigation surfaces, and all 16 capability paths.
- Verification: 18/18 targeted tests passed; 36/36 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop service index showed five service cards and 16 capability links; the five-column desktop mega-menu rendered cleanly with Property Management; the 390px mobile menu displayed all five service families without horizontal overflow; footer links were present and the full page width remained bounded; no page-specific console errors; `git diff --check` passed.
- Commit: Intended message `refactor: unify capability navigation surfaces`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No Phase 3 blockers. New capability routes still require their Phase 4 and Phase 5 editorial content and route-specific imagery; Property Management has no dedicated approved image yet.
- Exact next action: Build `/services/investment-sales/industrial` as a distinct GalaSales editorial page with industrial owner/investor decision criteria, positioning and sale process, concrete deliverables, accurate diligence boundaries, the best suitable approved or clearly generic contextual imagery available, metadata, related capabilities, and an industrial-specific contact CTA.

### Pulse — 2026-09-04 08:16 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `d954683` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; capability content and rendering system; route matrix; current imagery; contact inquiry routing; tests; and the live Industrial and contact routes.
- Phase / checkpoint: Phase 4 — replace Industrial's concise capability shell with a distinct GalaSales editorial sale-advisory journey.
- Gate: `/services/investment-sales/industrial` clearly serves industrial owners and investors; explains income, functional-utility, physical-condition, buyer-positioning, sale-process, and diligence decisions without making property-specific claims; includes purposeful contextual imagery, metadata, related capabilities, and a preselected Investment Sales inquiry; passes responsive, route, browser-console, test, build, lint, and diff checks.
- Completed: Added a dedicated Industrial Investment Sales content journey with four disciplined sections rather than cloning the brokerage pages: industrial value drivers, income/operations versus optionality/risk buyer lenses, a four-stage sale process, and concrete seller deliverables. Added a route-specific generated contextual industrial image with factual alt text, clearly kept separate from listing/property content. Added explicit legal, tax, environmental, and technical diligence boundaries; related Land, Tenant Representation, Development Oversight, and Capital Strategy paths; page metadata; and an Industrial-context contact CTA that correctly preselects Investment Sales.
- Files and routes changed: `src/assets/industrial-investment-sales.webp`, `src/content/capabilityPages.ts`, `src/test/gala-pages.test.tsx`, and this ledger; rebuilt `/services/investment-sales/industrial` and verified its handoff to `/contact?inquiry=investment-sales&focus=industrial`.
- Verification: 19/19 targeted tests passed; 37/37 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop browser QA confirmed a 1280px responsive hero, correct metadata, no broken images, and no horizontal overflow; 390px browser QA confirmed full-width layout, no broken images, correct H1 and CTA, and no horizontal overflow; the CTA correctly preselected Investment Sales without submitting the form; a fresh Industrial page console contained no errors; `git diff --check` passed.
- Commit: Intended message `feat: build industrial investment sales journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No Industrial content blocker. The new image is generic contextual service imagery and must not be represented as a Gala listing or completed project. No approved Industrial-specific client photography has been supplied.
- Exact next action: Build `/services/investment-sales/multifamily` as a distinct GalaSales editorial route centered on operating performance, rent roll and lease-up context, physical condition, buyer underwriting, sale preparation, and diligence coordination; add route-specific contextual imagery, accurate boundaries, metadata, related links, tests, and a focused Investment Sales inquiry CTA.

### Pulse — 2026-09-04 08:51 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `b29ad1a` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; the Industrial editorial checkpoint; capability content and renderer; route matrix; contact inquiry mapping; current tests; imagery; and the live Multifamily and contact routes.
- Phase / checkpoint: Phase 4 — replace Multifamily's concise capability shell with a distinct operating-performance-led GalaSales journey.
- Gate: `/services/investment-sales/multifamily` clearly serves multifamily owners and investors; separates documented current operations from forward-looking buyer assumptions; covers rent-roll, revenue, expenses, physical condition, sale preparation, underwriting, marketing, access, diligence, and closing without promising outcomes or presenting projections as facts; includes route-specific contextual imagery, metadata, related capabilities, and a preselected Investment Sales inquiry; passes responsive, route, browser-console, test, build, lint, and diff checks.
- Completed: Built four focused editorial sections around multifamily operating evidence rather than adapting the Industrial copy: an operating-story challenge, a Prepare/Underwrite/Market/Close process, current-operations versus future-execution buyer lenses, and multifamily-specific deliverables. Added explicit distinctions between verified historical results and renovation, lease-up, market-rent, and other buyer assumptions. Added resident-privacy and operating-continuity considerations, appropriate legal/tax/accounting/engineering/environmental boundaries, connected capital/development/property-management paths, route metadata, and a Multifamily-context CTA. Generated and optimized one unbranded, generic multifamily community image solely for service-page context.
- Files and routes changed: `src/assets/multifamily-investment-sales.webp`, `src/content/capabilityPages.ts`, `src/test/gala-pages.test.tsx`, and this ledger; rebuilt `/services/investment-sales/multifamily` and verified its handoff to `/contact?inquiry=investment-sales&focus=multifamily`.
- Verification: 20/20 targeted tests passed; 38/38 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop browser QA confirmed correct metadata, headings, hero composition, no broken images, and no horizontal overflow at 1280px; 390px browser QA confirmed the full hero, mobile CTAs and four-stage signal grid fit without overflow; the CTA correctly preselected Investment Sales without submitting the form; no Multifamily or contact page console errors were recorded; `git diff --check` passed.
- Commit: Intended message `feat: build multifamily investment sales journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No Multifamily content blocker. The image is generated generic service imagery and must not be represented as a Gala listing or completed project. No approved Multifamily client photography, operating case study, or transaction record has been supplied.
- Exact next action: Build `/services/investment-sales/retail` as a distinct GalaSales editorial route centered on tenancy and lease structure, trade area, access and visibility, site utility, buyer segmentation, sale preparation, and diligence coordination; add route-specific contextual imagery, accurate boundaries, metadata, related links, tests, and a focused Investment Sales inquiry CTA.

### Pulse — 2026-09-04 09:25 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `0a49c5c` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; the Industrial and Multifamily editorial checkpoints; capability content and renderer; route matrix; contact inquiry mapping; current tests and imagery; and the live Retail and contact routes.
- Phase / checkpoint: Phase 4 — replace Retail's concise capability shell with a distinct lease-and-site-led GalaSales journey.
- Gate: `/services/investment-sales/retail` clearly serves retail owners and investors; covers tenancy, lease structure, income obligations, trade-area context, access, visibility, parking, site utility, restrictions, alternative use, buyer segmentation, sale preparation, diligence, and closing without making property-specific claims; includes route-specific contextual imagery, metadata, related capabilities, and a preselected Investment Sales inquiry; passes responsive, route, browser-console, test, build, lint, and diff checks.
- Completed: Built four retail-specific editorial sections rather than adapting the prior asset pages: the relationship between lease durability and site utility, separate income-buyer and operator/repositioning lenses, a Read/Position/Reach/Execute sale process, and retail-specific deliverables from lease file to closing file. Added lease amendments, options, reimbursements, guarantees, co-tenancy, exclusives, use restrictions, estoppels, tenant-sensitive access, trade-area, parking, circulation, alternative-use, physical, title, survey, and environmental decision points with appropriate professional-advisor boundaries. Added connected Landlord Representation, Land, Site Strategy, and Capital Strategy paths; route metadata; and a Retail-context CTA. Generated and optimized one unbranded, generic neighborhood retail-center image solely for service-page context.
- Files and routes changed: `src/assets/retail-investment-sales.webp`, `src/content/capabilityPages.ts`, `src/test/gala-pages.test.tsx`, and this ledger; rebuilt `/services/investment-sales/retail` and verified its handoff to `/contact?inquiry=investment-sales&focus=retail`.
- Verification: 21/21 targeted tests passed; 39/39 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop browser QA confirmed correct metadata, headings, settled hero composition, no broken images, and no horizontal overflow at 1280px; 390px browser QA confirmed the full hero, CTA stack, and four-stage signal grid fit without overflow; the CTA correctly preselected Investment Sales without submitting the form; no Retail or contact page console errors were recorded; `git diff --check` passed.
- Commit: Intended message `feat: build retail investment sales journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No Retail content blocker. The image is generated generic service imagery and must not be represented as a Gala listing or completed project. No approved Retail client photography, case study, tenant-sales data, or transaction record has been supplied.
- Exact next action: Build `/services/investment-sales/office` as a distinct GalaSales editorial route centered on occupancy, tenant improvements, lease rollover, space quality, location, capital requirements, buyer segmentation, sale preparation, and diligence coordination; add route-specific contextual imagery, accurate boundaries, metadata, related links, tests, and a focused Investment Sales inquiry CTA.

### Pulse — 2026-09-04 10:00 CDT

- Starting branch / HEAD: `codex/phase-0-stabilization` at `075b540` with a clean working tree.
- Source-of-truth checked: Current heartbeat and recent task context; branch, status, and local history; this ledger; `PROPERTY-DATA-REGISTER.md`; the Industrial, Multifamily, and Retail editorial checkpoints; capability content and renderer; route matrix; contact inquiry mapping; current tests and imagery; and the live Office and contact routes.
- Phase / checkpoint: Phase 4 — replace Office's concise capability shell with a distinct occupancy-and-rollover-led GalaSales journey.
- Gate: `/services/investment-sales/office` clearly serves office owners and investors; covers occupancy, tenant credit and concentration, lease rollover, options, reimbursements, landlord obligations, tenant improvements, commissions, downtime, space condition, building competitiveness, capital requirements, buyer segmentation, sale preparation, diligence, and closing without presenting leasing assumptions as facts; includes route-specific contextual imagery, metadata, related capabilities, and a preselected Investment Sales inquiry; passes responsive, route, browser-console, test, build, lint, and diff checks.
- Completed: Built four office-specific editorial sections rather than adapting another asset page: the relationship between tenant demand and capital demand, separate stabilized-income and lease-up/repositioning underwriting paths, an Audit/Model/Market/Close sale process, and deliverables focused on rent roll, rollover, space competitiveness, access, and diligence. Added tenant-improvement, commission, free-rent, downtime, suite-condition, medical-office, owner-user, conversion, parking, building-system, estoppel, title, survey, physical, and environmental decision points with clear professional-advisor boundaries. Added connected Landlord Representation, Tenant Representation, Capital Strategy, and Property Management Partnership paths; route metadata; and an Office-context CTA. Generated and optimized one unbranded, generic mid-rise office image solely for service-page context.
- Files and routes changed: `src/assets/office-investment-sales.webp`, `src/content/capabilityPages.ts`, `src/test/gala-pages.test.tsx`, and this ledger; rebuilt `/services/investment-sales/office` and verified its handoff to `/contact?inquiry=investment-sales&focus=office`.
- Verification: 22/22 targeted tests passed; 40/40 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; desktop browser QA confirmed correct metadata, headings, settled hero composition, no broken images, and no horizontal overflow at 1280px; 390px browser QA confirmed the full hero, CTA stack, and four-stage signal grid fit without overflow; the CTA correctly preselected Investment Sales without submitting the form; no Office or contact page console errors were recorded; `git diff --check` passed.
- Commit: Intended message `feat: build office investment sales journey`; record the resulting hash immediately after commit.
- Remaining working-tree state: Expected clean after the checkpoint commit; confirm immediately after committing.
- Blockers: No Office content blocker. The image is generated generic service imagery and must not be represented as a Gala listing or completed project. No approved Office client photography, rent roll, leasing case study, or transaction record has been supplied.
- Exact next action: Build `/services/investment-sales/land` as the final distinct GalaSales editorial route centered on use and buyer fit, entitlement and approval status, access, utilities, environmental and physical constraints, timing, pricing strategy, diligence sequencing, and transaction execution; add route-specific contextual imagery, accurate boundaries, metadata, related links, tests, and a focused Investment Sales inquiry CTA, then run the full Phase 4 gate across every GalaBroker/GalaSales route.

### Manual checkpoint — 2026-09-14 Phase 4 property updates

- Starting branch / HEAD: `codex/site-refinement` at `e77153b`, with the existing Phase 1/2 working tree preserved.
- Source-of-truth checked: Current user instructions; branch, status, and history; this ledger; `PROPERTY-DATA-REGISTER.md`; shared property data and renderer; supplied NestVisions video players; client-supplied Lexington Drive files and selected aerials; property tests; and live local routes.
- Phase / checkpoint: Implement verified property updates for Family Farm Road, Church Street, and Lexington Townhome Site.
- Gate: Family Farm and Church Street display their stable hosted videos; Lexington is discoverable in the Properties catalog and renders through the shared property system using contact pricing, proposed-program language, historical-approval qualifications, Gaurang as advisor, and only selected client-supplied media; the reviewed homepage carousel remains unchanged.
- Completed: Added an optional schema-driven video section and embedded the two NestVisions players; optimized five Lexington aerials; added `/properties/1111-brown-street` with a complete identity, facts, opportunity, approval-record, transaction-condition, gallery, map, diligence, advisor, inquiry, disclosure, and metadata journey; added sitemap and automated coverage.
- Files and routes changed: `src/content/properties.ts`, `src/components/properties/CommercialListingPage.tsx`, `src/styles/gala.css`, `src/assets/properties/lexington-townhomes/*`, `src/test/properties-model.test.ts`, `src/test/gala-pages.test.tsx`, `public/sitemap.xml`, `PROPERTY-DATA-REGISTER.md`, and this ledger; affected `/properties`, `/properties/5911-family-farm-road`, `/properties/611-703-church-street`, and `/properties/1111-brown-street`.
- Verification: 32/32 targeted tests passed; 86/86 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings. Desktop browser QA confirmed the Lexington route, five-image gallery, map, property-context inquiry, correct metadata, no horizontal overflow, and no page-specific console errors; Family Farm and Church Street showed the correct hosted video URLs, no overflow, and no page-specific console errors; both hosted player URLs returned HTTP 200.
- Commit: Not requested; changes remain uncommitted with the existing approved Phase 1/2 work.
- Blockers: Lexington's fixed asking price remains conflicted, so the site correctly uses “Contact for pricing.” The supplied 2023 approvals require current-status and transferability confirmation. HMS transactions, Watkins, Pittard Sears, social URLs, Goverdhan's completed profile, and final form delivery credentials remain separately blocked. The client's later instruction to add the supplied Lexington video supersedes the earlier media-publication hold; the original 109.6 MB source remains private.
- Exact next action: Obtain the HMS transaction roles, economics, and approved imagery needed for the two closed-deal cards.

### Manual checkpoint — 2026-09-14 closed-transaction records

- Starting branch / HEAD: `codex/site-refinement` at `e77153b`, with the existing approved Phase 1–4 working tree preserved.
- Source-of-truth checked: Current user direction; branch, status, and history; this ledger; `PROPERTY-DATA-REGISTER.md`; the supplied HMS transaction records already audited in the register; shared property and transaction models; catalog/detail renderers; sitemap; automated tests; and the live homepage, property catalog, and both transaction routes.
- Phase / checkpoint: Phase 8 — prepare closed-transaction cards and detail records for 202 North Main Street and 10416 Chapel Hill Road without unconfirmed economics or MLS photography.
- Gate: Both transactions appear only as Closed in the Properties catalog, have focused detail routes using verified facts, omit disputed prices and MLS imagery, preserve property-specific inquiry context, remain off the active homepage carousel, and render without layout or console regressions; the homepage must not continue publishing the unconfirmed combined Chapel Hill price.
- Completed: Added reusable non-photographic completed-transaction art; added qualified schema-driven records at `/properties/202-north-main-street` and `/properties/10416-chapel-hill-road`; omitted price, gallery, and unconfirmed advisor fields; added map, transaction-condition, inquiry, disclosure, alt-text, sitemap, and automated coverage; corrected fact-card separators when price is absent; and replaced the homepage's unconfirmed `$1.8M` metric with a status-led transaction snapshot.
- Files and routes changed: `src/assets/properties/transaction-record.svg`, `src/content/properties.ts`, `src/content/transactions.ts`, `src/content/featuredListings.ts`, `src/components/properties/PropertyCard.tsx`, `src/components/properties/CommercialListingPage.tsx`, `src/components/site/TransactionSpotlight.tsx`, `src/pages/PropertyDetail.tsx`, `src/styles/gala.css`, `src/test/properties-model.test.ts`, `src/test/gala-pages.test.tsx`, `public/sitemap.xml`, `PROPERTY-DATA-REGISTER.md`, and this ledger; affected `/`, `/properties`, `/properties/202-north-main-street`, and `/properties/10416-chapel-hill-road`.
- Verification: 34/34 targeted property/page tests passed; 88/88 full tests passed; production build passed; lint completed with zero errors and seven unchanged Fast Refresh warnings; `git diff --check` passed; desktop browser QA confirmed both catalog cards crop cleanly, both detail routes omit galleries and disputed prices, the homepage no longer contains `$1.8M`, all three routes have no horizontal overflow or page-specific console errors, and both property CTAs retain the correct slug.
- Commit: Not requested; changes remain uncommitted with the existing approved Phase 1–4 work.
- Blockers: Approved property photography, public closing consideration, the exact Gala role/advisor credit for 202 North Main, and the combined 10414/10416 address structure and preferred transaction credit remain unconfirmed. The cards intentionally use the shared Gala transaction graphic until approved non-MLS media is supplied.
- Exact next action: Obtain authoritative Pittard Sears property identity, contract status, approved media, and substantiation for the record-breaking claim before preparing its under-contract record.

### Manual checkpoint — 2026-09-14 property video delivery

- Starting branch / HEAD: `codex/site-refinement` at `e77153b`, with the existing approved Phase 1–4 and transaction work preserved.
- Source-of-truth checked: Current user direction; branch, status, and history; this ledger; `PROPERTY-DATA-REGISTER.md`; shared property data and renderer; the client-supplied Family Farm and Church Street NestVisions packages; the client-supplied Lexington Drive video; current property tests; production output; and live desktop/mobile routes.
- Phase / checkpoint: Phase 6 — add inline, mobile-friendly video modules for Family Farm Road, Church Street, and Lexington Townhomes.
- Gate: Every requested property displays a poster-backed native video outside the image gallery; controls and inline playback work without autoplay; the media source is deferred until the player nears the viewport; compressed files decode on desktop and a 390×844 mobile viewport without horizontal overflow; production media weight remains bounded.
- Completed: Replaced the two hosted-player iframes with a reusable native-video component; packaged 6.1 MB Family Farm and 7.0 MB Church Street H.264/AAC derivatives from their supplied hosted packages; compressed the 109.6 MB Lexington QuickTime source to a 2.7 MB portrait H.264/AAC derivative with a 67 KB poster; added Lexington's separate property-film section; and preserved each route's image gallery as an independent module. The component uses native controls, `playsinline`, `preload="none"`, no autoplay, and one-time IntersectionObserver source activation within 320 pixels of the viewport.
- Files and routes changed: `src/components/properties/PropertyVideo.tsx`, `src/components/properties/CommercialListingPage.tsx`, `src/content/properties.ts`, `src/styles/gala.css`, `src/assets/properties/videos/*`, `src/test/property-video.test.tsx`, `src/test/properties-model.test.ts`, `src/test/gala-pages.test.tsx`, `PROPERTY-DATA-REGISTER.md`, and this ledger; affected `/properties/5911-family-farm-road`, `/properties/611-703-church-street`, and `/properties/1111-brown-street`.
- Verification: 35/35 targeted property/video/page tests passed; 89/89 full tests passed; production build passed; lint passed with zero errors and seven unchanged Fast Refresh warnings; `git diff --check` passed. Browser QA confirmed real playback and decoding for all three files, working controls, no autoplay, inline playback, `preload="none"`, poster images, deferred source attachment, and no overflow. At 390×844, Family Farm and Church Street render in 350×196.875 landscape frames; Lexington renders in a centered 350×622.219 portrait frame. Production outputs are 6.43 MB, 7.38 MB, and 2.86 MB respectively and are not part of the initial JavaScript payload.
- Commit: Not requested; changes remain uncommitted with the existing approved work.
- Blockers: No implementation blocker. Caption or transcript files were not supplied; add them later if the videos contain decision-relevant spoken information. Lexington's fixed asking price and current approval status remain separate property-data blockers.
- Exact next action: Obtain authoritative Pittard Sears property identity, contract status, approved media, and substantiation for the record-breaking claim before preparing its under-contract record.

### Manual checkpoint — 2026-09-14 capability completion

- Starting branch / HEAD: `codex/site-refinement` at `e77153b`, with all existing approved and uncommitted Gala CRE work preserved.
- Source-of-truth checked: Current user direction; branch, status, and history; this ledger; the shared service and capability route matrices; all existing editorial capability content; the generic capability fallback; Contact inquiry mapping; current image assets; automated tests; production output; and live desktop/mobile routes.
- Phase / checkpoint: Close Phase 4 and Phase 5 by finishing Land, all GalaDevelop routes, all GalaCapital routes, and Property Management Partnership at the established editorial standard.
- Gate: All 16 advertised capabilities resolve to substantive editorial pages with distinct audiences, commercial problems, processes, deliverables, metadata, imagery, related links, and focused inquiry context; none uses the thin generic fallback; direct, coordinated, capital-access, specialist, and partner-delivered roles remain accurately distinguished; all routes render without overflow on desktop or a 390×844 mobile viewport.
- Completed: Built Land Investment Sales, Site Strategy, Entitlements, Infrastructure Coordination, Development Oversight, Debt Advisory, Equity Advisory, Capital Strategy, Transaction Coordination, and Property Management Partnership through the shared editorial system. Added a compact blueprint builder for the demonstrated repeated page structure while keeping every route's substantive content distinct. Added six optimized, unbranded generic contextual images; none is represented as a Gala listing, client property, or completed project. Corrected Contact inquiry mapping so Development Services and Property Management CTAs preserve their intended categories alongside Investment Sales and Capital Markets.
- Files and routes changed: `src/content/capabilityPageBlueprint.ts`, `src/content/landCapabilityPage.ts`, `src/content/developmentCapabilityPages.ts`, `src/content/capitalCapabilityPages.ts`, `src/content/capabilityPages.ts`, `src/pages/Contact.tsx`, `src/assets/land-investment-sales.webp`, `src/assets/site-strategy-entitlements.webp`, `src/assets/development-infrastructure.webp`, `src/assets/capital-markets-strategy.webp`, `src/assets/transaction-coordination.webp`, `src/assets/property-management-partnership.webp`, `src/test/capability-routes.test.tsx`, `src/test/contact-page.test.tsx`, and this ledger; affected all ten previously generic capability routes and their Contact handoffs.
- Verification: 33/33 initial targeted capability/page tests passed; the capability registry contains editorial records for all 16 advertised routes with unique titles and opening problem statements. Desktop browser QA confirmed all ten new routes use the editorial renderer, load their hero image, expose four main sections, preserve the expected CTA, and have no horizontal overflow. Visual review confirmed the settled Land, Site Strategy, Capital Strategy, and Property Management hero compositions. At 390×844, all ten routes loaded their imagery, kept long headings and both stacked CTAs within a 350px content width, and had no overflow. Browser QA caught and then confirmed the fix for Development Services and Property Management Contact preselection; 16/16 focused capability/contact tests passed after the correction. Final verification: 91/91 full tests passed; production build passed; TypeScript and `git diff --check` passed; lint completed with zero errors and the same seven Fast Refresh warnings in existing shared UI files.
- Commit: Not requested; this checkpoint remains uncommitted with the existing approved work.
- Blockers: No capability-page implementation blocker. The new images are generated generic context and must never be captioned or represented as Gala properties or completed work. Client case studies, quantified outcomes, project photography, and testimonials were not supplied, so no such claims were added.
- Exact next action: Hold the separately deferred property, social, profile, and production-form inputs. When the user returns, begin the planned sitewide refinement and audit pass from this now-complete capability baseline.
