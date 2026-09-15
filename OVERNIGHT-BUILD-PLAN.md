# Gala CRE property and service rebuild

Last updated: 2026-09-15 03:51 CDT

Authoritative branch: `codex/compact-listings-services`

Baseline: `d7b6204726cc04422c09b37c42d33e34e23e7afd` (`main`/`origin/main` at branch creation)

This file is the durable source of truth for the current rebuild. It supersedes the older September 4 overnight plan. Historical implementation details remain available in Git history and `PROPERTY-DATA-REGISTER.md`.

## Working rules

1. Read `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, Git status/history, and the exact implementation named under **Next action** before editing.
2. Preserve the catalog-first `/properties` redesign contained in baseline commit `d7b6204`.
3. Keep the homepage locked. Preserve Team, Careers, Company, Contact, News, and the footer unless a broken approved pathway requires a correction.
4. Advance one property, service group, or shared-system checkpoint at a time. Define its gate before implementation.
5. Verify changed routes visually at desktop and mobile sizes, run targeted tests, and run the full test/build/lint gate when a shared system or phase is completed.
6. Never invent facts, prices, approvals, outcomes, advisor assignments, documents, or media rights. Unknown information is omitted or carefully qualified.
7. Generated imagery is service context only and must never be represented as an actual Gala property or completed project.
8. Update this file after every checkpoint with the completed work, verification, blockers, and exactly one next action.

## Phase 0 — Protect and inventory

Status: **Complete**

- [x] Create the working branch `codex/compact-listings-services` from clean, synced `main`.
- [x] Confirm the catalog-first Properties redesign is preserved in baseline commit `d7b6204`.
- [x] Run baseline tests, production build, and lint.
- [x] Inventory every property detail, service overview, and service capability route.
- [x] Record desktop/mobile page heights, current imagery, structural content, and known blockers.
- [x] Identify reusable property media and service routes that need distinct contextual imagery.
- [x] Add repository-level continuation instructions for future agents.

Gate: Every affected route is documented, current work is protected, and nothing outside the approved scope is touched. **Passed.**

### Baseline verification

- Full test suite: **100/100 passed** across 18 files.
- Production build: **passed**.
- Lint: **0 errors, 7 existing Fast Refresh warnings** in shared UI primitives.
- Note: the initial parallel lint/build attempt hit a transient Vite timestamp-file race; lint passed when rerun sequentially.

### Property-route inventory

Heights were measured at 1440×900 desktop and 390×844 mobile. Current shared structure is hero → fact bar → overview → early 1031 strip → information/conditions → gallery → optional video → map → documents/advisor/disclosure. The redesign will replace that long editorial sequence with a compact evaluation workspace.

| Route | Status | Desktop | Mobile | Current media | Known presentation/data constraint |
| --- | --- | ---: | ---: | --- | --- |
| `/properties/2301-lackey-street` | Active | 6,959px | 9,216px | Hero plus 5 approved listing images | Flagship candidate; duplicated identity/overview and early 1031 interruption; no video |
| `/properties/5047-yadkin-road` | Active | 7,437px | 9,638px | One annotated aerial reused | Only one approved property image; approval/access/utility claims remain document-qualified |
| `/properties/611-703-church-street` | Active | 8,401px | 10,094px | Hero, 5 aerials, local video | 703/711 address conflict, acreage conflict, approval/site-plan documents not supplied |
| `/properties/5911-family-farm-road` | Active | 8,626px | 10,273px | Hero, 5 images, local video | Parcel schedule, survey, zoning, private-road and utility-condition records remain inputs |
| `/properties/1111-brown-street` | Active | 8,738px | 10,861px | Hero, 5 aerials, portrait video | Price conflict and current status/transferability of historical approvals remain inputs |
| `/properties/802-bragg-boulevard` | Closed | 7,100px | 9,329px | Hero plus 3 approved former-listing images | Closing date, consideration, and preferred transaction credit are not approved |
| `/properties/202-north-main-street` | Closed | 5,783px | 6,958px | Shared non-photographic transaction artwork | Gala role, price, advisor credit, and photography rights are unconfirmed |
| `/properties/10416-chapel-hill-road` | Closed | 5,716px | 6,981px | Shared non-photographic transaction artwork | Combined-address structure, economics, preferred credit, and photography remain unconfirmed |

### Service-route inventory

All routes render and have metadata. Their central issue is excessive copy, repeated story beats, generous vertical spacing, and repeated imagery—not missing routes.

#### Service overviews

| Route | Desktop | Mobile | Current hero asset | Rebuild note |
| --- | ---: | ---: | --- | --- |
| `/services/brokerage` | 4,093px | 5,355px | `gala-broker-capability.avif` | Compact overview; avoid repeating full capability essays |
| `/services/investment-sales` | 3,942px | 4,971px | `gala-sales-capability.webp` | Compact asset-class gateway |
| `/services/development-services` | 3,426px | 4,397px | `gala-develop-capability.webp` | Clarify coordination role and shorten capability teasers |
| `/services/capital-markets` | 3,703px | 4,780px | `gala-capital-capability.webp` | Clarify access/advisory scope and remove duplicated 1031 interruption |
| `/services/property-management` | 3,335px | 3,578px | No service-level image assigned | Needs a distinct restrained hero using existing PM context or a new generic asset |

#### Capability backpages

| Route | Desktop | Mobile | Current hero/context asset | Rebuild note |
| --- | ---: | ---: | --- | --- |
| `/services/brokerage/landlord-representation` | 8,717px | 12,236px | `gala-broker-capability.avif` | Reduce 8 sections; retain owner focus |
| `/services/brokerage/tenant-representation` | 8,822px | 12,329px | `gala-capital-capability.webp` | Needs occupier imagery; reduce 8 sections |
| `/services/investment-sales/industrial` | 4,345px | 6,543px | `industrial-investment-sales.webp` | Already partially compact; use as Phase 3 standard and tighten |
| `/services/investment-sales/multifamily` | 8,432px | 11,504px | `multifamily-investment-sales.webp` | Reduce 7 sections; retain rent-roll/operations focus |
| `/services/investment-sales/retail` | 8,246px | 11,452px | `retail-investment-sales.webp` | Reduce 7 sections; retain tenancy/trade-area/access focus |
| `/services/investment-sales/office` | 8,467px | 11,688px | `office-investment-sales.webp` | Reduce 7 sections; retain occupancy/rollover/capital-needs focus |
| `/services/investment-sales/land` | 6,717px | 9,325px | `land-investment-sales.webp` | Reduce 6 sections; retain use/entitlement/access/utility focus |
| `/services/development-services/site-strategy` | 6,584px | 9,195px | `site-strategy-entitlements.webp` | Shared with Entitlements; concise distinct path needed |
| `/services/development-services/entitlements` | 6,693px | 9,371px | `site-strategy-entitlements.webp` | Shared with Site Strategy; retain jurisdictional/approval focus |
| `/services/development-services/infrastructure` | 6,495px | 9,250px | `development-infrastructure.webp` | Shared with Oversight; retain access/utilities/off-site focus |
| `/services/development-services/development-oversight` | 6,579px | 9,334px | `development-infrastructure.webp` | Shared with Infrastructure; distinct ownership image preferred |
| `/services/capital-markets/debt` | 6,717px | 9,557px | `capital-markets-strategy.webp` | Shared across three routes; retain lender-fit/term/execution focus |
| `/services/capital-markets/equity` | 6,901px | 9,505px | `capital-markets-strategy.webp` | Shared across three routes; needs sponsor/investor context |
| `/services/capital-markets/capital-strategy` | 6,817px | 9,489px | `capital-markets-strategy.webp` | Shared across three routes; retain stack/sequencing focus |
| `/services/capital-markets/transaction-coordination` | 6,781px | 9,552px | `transaction-coordination.webp` | Retain document/milestone/accountability focus |
| `/services/property-management/property-management-partnership` | 6,929px | 9,629px | `property-management-partnership.webp` | Keep partner-led boundary explicit; reduce 6 sections |

### Image disposition

- Reuse all client-supplied property imagery and videos already assigned in `src/content/properties.ts`; do not generate property imagery.
- Existing distinct contextual service assets are suitable starting points for Industrial, Multifamily, Retail, Office, Land, Transaction Coordination, and Property Management.
- Existing top-level Brokerage, Investment Sales, Development, and Capital Markets imagery can remain while layouts are compacted.
- Priority new contextual imagery candidates: Tenant Representation, Development Oversight, Equity Advisory, and the Property Management overview.
- No page is blocked on generated imagery; compact layout and content first, then generate only for demonstrated gaps.

## Phase 1 — Establish the compact listing standard

Status: **Complete**

Rebuild `/properties/2301-lackey-street` as the shared commercial listing standard:

- [x] Compact identity and classification header.
- [x] Inline gallery with a primary image and selectable thumbnails; no lightbox.
- [x] Price, acreage, status, use, documents, advisor, and inquiry action immediately visible.
- [x] Concise overview and non-repeating investment/occupancy highlights.
- [x] Scannable property-information tables and property-specific diligence.
- [x] Integrate map, optional video/media, documents, related listings, and closing contact without full-page chapters.
- [x] Remove the early 1031 interruption and long-form editorial repetition.
- [x] Preserve conditional rendering for partial property data and the distinct closed-record path.

Gate: Lackey feels like a premium brokerage listing and can be evaluated within two minutes on desktop and mobile. **Passed.**

## Phase 2 — Convert every property page

Status: **In progress**

Active listings:

- [x] 5047 Yadkin Road
- [x] 611 & 703 Church Street
- [x] 5911 Family Farm Road
- [x] Lexington Townhome Site (`/properties/1111-brown-street`)

Closed transaction variants:

- [x] 802 Bragg Boulevard
- [x] 202 North Main Street
- [ ] 10416 Chapel Hill Road

Gate: Every property route is concise, property-specific, media-rich where approved media exists, and connected to the correct advisor and inquiry context. Unknown facts remain hidden or qualified, and closed records cannot be confused with active inventory.

## Phase 3 — Establish the premium service-page standard

Status: **Not started**

Use Industrial as the first redesigned service backpage with this spine:

1. Short image-led hero.
2. One focused value section.
3. Compact three- or four-step process.
4. Four concrete deliverables.
5. Related capabilities.
6. Concise closing CTA.

Target 3,200–4,200px desktop. Remove repeated explanations, duplicate process previews, oversized headings, long essays, decorative filler, excessive padding, and generic closing language.

Gate: Industrial retains its commercial substance at roughly half the original long-form standard and feels premium through clarity, imagery, and restraint.

## Phase 4 — Rebuild every service and capability backpage

Status: **Not started**

Brokerage:

- [ ] Brokerage overview
- [ ] Landlord Representation
- [ ] Tenant Representation

Investment Sales:

- [ ] Investment Sales overview
- [ ] Multifamily
- [ ] Retail
- [ ] Office
- [ ] Land

Development:

- [ ] Development overview
- [ ] Site Strategy
- [ ] Entitlements
- [ ] Infrastructure
- [ ] Development Oversight

Capital Markets:

- [ ] Capital Markets overview
- [ ] Debt
- [ ] Equity
- [ ] Capital Strategy
- [ ] Transaction Coordination

Property Management:

- [ ] Property Management overview
- [ ] Property Management Partnership

Each route must retain distinct clients, problems, decisions, and deliverables. Do not create pages by merely swapping nouns.

Gate: Every advertised service route is concise, differentiated, visually complete, and free of unnecessary repetition.

### Service imagery direction

- Refined, realistic commercial environments.
- Owners, advisors, developers, operators, and occupiers shown naturally.
- Industrial, retail, multifamily, office, land, development, and capital contexts.
- Restrained black, neutral, and warm-gold influence.
- No generated text, logos, signs, parcel boundaries, or property claims.
- No obvious stock poses or exaggerated luxury.
- Save every selected project image into `src/assets` before referencing it.

Gate: Imagery strengthens comprehension and atmosphere without fabricating Gala projects or services.

## Phase 5 — Reconcile indexes, navigation, and conversion

Status: **Not started**

- [ ] Refine `/services` to introduce the shorter service system.
- [ ] Verify every mega-menu and mobile-navigation route.
- [ ] Standardize related-capability links and service CTA language/parameters.
- [ ] Verify property catalog/detail connections and inquiry context.
- [ ] Do not alter locked homepage design.
- [ ] Preserve Team, Careers, Company, Contact, News, and footer except necessary broken-link corrections.

Gate: Every catalog, listing, and service pathway reaches the correct next action without dead ends or conflicting language.

## Phase 6 — Full QA, commit, and morning package

Status: **Not started**

- [ ] Test every property and service route at desktop, tablet, and mobile sizes.
- [ ] Verify galleries, video, maps, documents, filters, keyboard behavior, and reduced motion.
- [ ] Verify inquiry preselection, metadata/social previews, overflow, and console errors.
- [ ] Run the full test suite, production build, and lint.
- [ ] Prepare demo-ready routes and recommended meeting walkthrough.
- [ ] Prepare remaining client-input list and before/after page-height comparison.
- [ ] Record local commit(s), deployment state, local URL, and production URL.

Gate: The complete public property and service experience is credible, consistent, responsive, and ready for the client meeting.

## Known client-input blockers

These do not stop unrelated implementation:

- Yadkin: underlying plan/approval, zoning, parcel, access, utility, and physical-condition records.
- Church Street: 703/711 address conflict, legal parcels, surveyed acreage, approval/site-plan evidence, and combined-sale structure.
- Family Farm: legal parcels, survey, zoning confirmation, private-road obligations, existing residence/well/septic condition, and document publication choices.
- Lexington: current asking price, gross surveyed acreage, current/transferable approval status, and publication rights for third-party diligence artwork/documents.
- 802 Bragg: final consideration, closing date, and preferred Gala transaction credit.
- 202 North Main: exact Gala role, price classification, advisor credit, and non-MLS photography.
- 10416 Chapel Hill: combined 10414/10416 structure, economics, preferred credit, and non-MLS photography.
- Services: no client case studies, quantified outcomes, testimonials, or additional approved project photography have been supplied.

## Checkpoint log

### 2026-09-15 — Phase 0 baseline and continuity anchor

- Starting branch / HEAD: `main` at `d7b6204`, clean and synchronized with `origin/main`.
- Branch created: `codex/compact-listings-services`; no branch switching, merging, or remote changes after creation.
- Protected work: baseline commit `d7b6204` contains the approved catalog-first `/properties` redesign across `SiteHeader.tsx`, `Properties.tsx`, `gala.css`, and page tests.
- Source of truth checked: user goal objective and referenced plan, repository status/history, prior ledger, `PROPERTY-DATA-REGISTER.md`, application routes, property/service content, shared renderers, assets, and tests.
- Gate: document every affected route, preserve current work, touch nothing outside approved scope.
- Completed: added `AGENTS.md`; replaced the outdated multi-project ledger with this focused, route-level execution source; recorded route heights, media reuse, and blockers.
- Verification: 100/100 tests passed; production build passed; sequential lint passed with 0 errors and 7 existing warnings; all 29 affected routes rendered during measurement.
- Files changed: `AGENTS.md`, `OVERNIGHT-BUILD-PLAN.md` only.
- Commit: this checkpoint's local documentation commit; resolve the hash from `git log -1` before continuing.
- Remaining working tree: expected to contain only the two continuity files before the Phase 0 commit.
- Blockers: none for Phase 1.
- Exact next action: Recompose `CommercialListingPage.tsx` and its CSS into the compact Lackey evaluation workspace while preserving the current property schema and conditional data; add focused tests for inline gallery selection, first-screen facts/advisor/actions, removal of the early 1031 strip, and optional sections.

### 2026-09-15 — Phase 1 compact Lackey listing standard

- Starting branch / HEAD: `codex/compact-listings-services` at Phase 0 commit `103a8bc`, clean.
- Source of truth checked: this ledger, `PROPERTY-DATA-REGISTER.md`, shared property schema and renderer, all eight property records, advisor data, current property media, existing tests, and live Lackey route.
- Gate: make Lackey a premium, two-minute commercial listing with first-screen media, economics, facts, advisor, documents, and inquiry actions; remove the early 1031 interruption; preserve conditional modules and verified data.
- Completed: replaced the full-bleed editorial property template with a compact identity header and evaluation workspace; added a selectable in-place image gallery with accessible thumbnails; surfaced price/status, key facts, advisor contacts, listing source, documents, and inquiry actions beside the media; condensed property details into scannable tables; integrated map/video, documents, disclosure, and two related opportunities into restrained modules; removed the early 1031 callout; retained active/closed variations and all property-specific facts.
- Files and routes changed: `src/components/properties/CommercialListingPage.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, and this ledger; primary route `/properties/2301-lackey-street`; shared renderer also visually checked across all seven other property routes.
- Verification: Lackey reduced from 6,959px to 4,752px desktop and from 9,216px to 7,551px mobile including the global footer. Gallery selection changes the primary image in place. Price enters the first 390×844 viewport. No horizontal overflow or page-specific console errors at 1440px, 834px, or 390px. All eight property routes render, maps remain present, all three videos load only near their viewport, and no early 1031 callout remains. Full suite 100/100 passed; production build passed; lint passed with 0 errors and 7 unchanged shared-UI warnings.
- Commit: this checkpoint's local implementation commit; resolve the hash from `git log -1` before continuing.
- Remaining working tree: expected clean after commit.
- Blockers: none for the shared listing standard. Existing property-data and media blockers remain listed above.
- Exact next action: Audit and tighten `/properties/5047-yadkin-road` within the compact system: remove any remaining repeated marketing prose, keep represented approvals explicitly qualified, make the one-image treatment intentional, and verify facts, documents, map, advisor, related links, and inquiry context at desktop and mobile sizes.

### 2026-09-15 — Phase 2 Yadkin compact listing

- Starting branch / HEAD: `codex/compact-listings-services` at `a711e2e`, clean.
- Source of truth checked: this ledger, Yadkin's record in `PROPERTY-DATA-REGISTER.md`, current listing data, the shared compact renderer, its sole approved annotated aerial, and property/page tests.
- Gate: make Yadkin concise and purposeful with one approved image while clearly separating the offering's represented plan/permit claims from the records a buyer must verify.
- Completed: tightened the headline, lead, highlights, readiness copy, and buyer-verification table; combined overlapping plan/permit conditions; changed the summary panel to use each property's short catalog summary rather than repeat the opportunity headline; preserved price, acreage, land classification, plan positioning, advisor, map, document requests, disclosure, and inquiry context. The single annotated aerial now functions as an intentional primary media panel without empty thumbnail slots.
- Files and routes changed: `src/content/properties.ts`, `src/components/properties/CommercialListingPage.tsx`, and this ledger; `/properties/5047-yadkin-road` plus the short-summary treatment shared by property routes.
- Verification: 36/36 targeted page/property tests passed. Desktop height reduced from 7,437px baseline to 5,110px; mobile from 9,638px to 7,678px, both including the global footer. The 1440px and 390px routes show the approved aerial without cropping its central boundary context, expose `$829,000`, Gaurang Gala, documents, map, and inquiry context, and have no overflow or console errors.
- Commit: this checkpoint's local implementation commit; resolve the hash from `git log -1` before continuing.
- Remaining working tree: expected clean after commit.
- Blockers: underlying approved plan, approval record, zoning, parcel, access, utility, and physical-condition records remain client inputs and are not represented as verified facts.
- Exact next action: Audit and tighten `/properties/611-703-church-street` within the compact system, preserving the childcare thesis and two-site context while removing repeated claims, keeping the 703/711 and acreage conflicts qualified, and verifying the six-image selector, video, map, documents, advisor, and inquiry context at desktop and mobile sizes.

### 2026-09-15 — Phase 2 Church Street compact listing

- Starting branch / HEAD: `codex/compact-listings-services` at `4a64c56`, clean.
- Source of truth checked: this ledger, Church Street's record in `PROPERTY-DATA-REGISTER.md`, the current offering data, five approved aerials, local web video, advisor assignment, shared renderer, and property/video/page tests.
- Gate: make the represented childcare approval and two-site composition immediately understandable without resolving the documented address, acreage, or approval-record conflicts by assumption.
- Completed: tightened the opportunity headline, lead, highlights, diligence close, and transaction conditions; combined overlapping address/acreage/sale-structure checks; retained the represented childcare approval and zoning language with explicit document-review boundaries. The compact page presents six deduplicated media views (hero plus five aerials), property video, map, price, site composition, Gaurang Gala, documents, inquiry context, and related listings without the former full-page gallery and video chapters.
- Files and routes changed: `src/content/properties.ts` and this ledger; `/properties/611-703-church-street`.
- Verification: 37/37 targeted property/video/page tests passed. Desktop height reduced from 8,401px baseline to 5,289px; mobile from 10,094px to 8,110px, including the global footer. The six-image selector changes the primary image; the deferred MP4 source attaches near the video viewport; the video and live map form one integrated media band; price, advisor, documents, and inquiry context remain present; no overflow or page-specific console errors at 1440px or 390px.
- Commit: this checkpoint's local implementation commit; resolve the hash from `git log -1` before continuing.
- Remaining working tree: expected clean after commit.
- Blockers: the second legal address (703 versus 711), parcel IDs, surveyed acreage, combined-sale requirement, approval/site-plan record, zoning confirmation, and conditions remain client inputs and stay qualified.
- Exact next action: Audit and tighten `/properties/5911-family-farm-road` within the compact system, prioritizing Leigh Roach's advisor assignment, the residential-land thesis, property-condition/private-road diligence, five-image selector, video/map integration, document paths, and mobile scan length without adding unsupported parcel or utility claims.

### 2026-09-15 — Phase 2 Family Farm Road compact listing

- Starting branch / HEAD: `codex/compact-listings-services` at `9c7b3cc`, clean.
- Source of truth checked: the goal objective, `AGENTS.md`, this ledger, Family Farm's record in `PROPERTY-DATA-REGISTER.md`, current listing data, five approved aerials, local web video, Leigh Roach's client-confirmed assignment, shared renderer, and property/video/page tests.
- Gate: present the approximately 2.10-acre residential opportunity and Leigh Roach immediately, while keeping the parcel, private-road, existing residence, well/septic, zoning, and future-use questions explicit and easy to scan.
- Completed: tightened the summary, opportunity thesis, highlights, information tables, buyer-verification conditions, media copy, location copy, and document descriptions; reduced overlapping acreage, zoning, utility, and potential-use statements; combined related facts without weakening the unsafe-residence or as-is warnings. The compact page retains five distinct selectable media views, the property video, live map, current price, Leigh's email, source links, diligence request, inquiry context, and related listings.
- Files and routes changed: `src/content/properties.ts` and this ledger; `/properties/5911-family-farm-road`.
- Verification: 37/37 targeted property/video/page tests passed. Desktop height reduced from 8,626px baseline to 5,361px; mobile from 10,273px to 8,180px, including the global footer. All five selector buttons change the primary image in place; the MP4 source remains absent until the player nears the viewport; the live map, `$995,000`, Leigh Roach, `Leigh@galacregroup.com`, documents, and `/contact?property=5911-family-farm-road` inquiry path are present; no horizontal overflow or page-specific console errors at 1440px or 390px.
- Commit: `refactor: tighten Family Farm listing journey` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: legal parcel IDs, survey, municipal zoning confirmation, private-road rights and maintenance obligations, existing residence/well/septic condition, and additional document-publication choices remain client inputs and stay qualified.
- Exact next action: Audit and tighten `/properties/1111-brown-street` within the compact system, preserving the proposed 58-townhome thesis and historical-approval context while keeping price, gross acreage, approval currency/transferability, and third-party document rights unresolved; verify the five-image selector, portrait video, map, documents, Gaurang Gala, and inquiry context at desktop and mobile sizes.

### 2026-09-15 — Phase 2 Lexington compact listing

- Starting branch / HEAD: `codex/compact-listings-services` at `1c80e44`, clean.
- Source of truth checked: the goal objective, `AGENTS.md`, this ledger, Lexington's record in `PROPERTY-DATA-REGISTER.md`, current property data, five client-supplied aerials, local portrait video/poster, Gaurang Gala's verified assignment, shared renderer, and property/video/page tests.
- Gate: make the proposed 58-townhome program, three-parcel context, and available historical records immediately understandable without publishing either conflicting price, treating approximately 6.6 acres as surveyed acreage, or implying the approvals remain current or transferable.
- Completed: tightened the opportunity headline, lead, highlights, property tables, buyer-verification conditions, media copy, location copy, and document descriptions; concentrated the approval caveats in the diligence and decision areas; combined overlapping parcel, survey, NCDOT, access, utility, and remaining-requirement statements. The page retains five distinct selectable aerials, the vertical property video, live map, “Contact for pricing,” Gaurang Gala, three inquiry-only document paths, and related listings.
- Files and routes changed: `src/content/properties.ts`, `src/test/gala-pages.test.tsx`, and this ledger; `/properties/1111-brown-street`.
- Verification: 37/37 targeted property/video/page tests passed, including explicit protection against publishing the conflicting `$990,000` and `$1,000,000` figures. Desktop height reduced from 8,738px baseline to 5,698px; mobile from 10,861px to 8,651px, including the global footer. The five-image selector changes the primary image; the portrait MP4 remains unloaded until near the viewport; the live map, Gaurang Gala, approval-record request, and `/contact?property=1111-brown-street` inquiry route are present; no standalone “fully entitled” or “permit-ready” claim, horizontal overflow, or page-specific console error appears at 1440px or 390px.
- Commit: `refactor: tighten Lexington listing journey` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: current asking price, gross surveyed acreage, current or transferable status of the historical approvals, work completed under the 2023 records, controlling land-use approval, and publication rights for third-party documents/artwork remain client inputs and stay omitted or qualified.
- Exact next action: Audit and tighten the closed-record variant at `/properties/802-bragg-boulevard`, leading with completed-transaction status and verified physical facts while keeping closing date, consideration, current operating status, and preferred Gala transaction credit unpublished; verify its three-image selector, historical-use language, source records, map, and similar-property inquiry path at desktop and mobile sizes.

### 2026-09-15 — Phase 2 802 Bragg Boulevard closed record

- Starting branch / HEAD: `codex/compact-listings-services` at `733e67a`, clean.
- Source of truth checked: the goal objective, `AGENTS.md`, this ledger, the 802 Bragg record in `PROPERTY-DATA-REGISTER.md`, the client-confirmed recently sold status, public Crexi/LoopNet facts, three optimized former-listing images, Gaurang Gala's public listing record, shared renderer, and property/page tests.
- Gate: make the closed status and verified physical profile immediately clear while keeping sale consideration, closing date, confidential terms, and post-closing occupancy or operating conditions unpublished.
- Completed: tightened the completed-transaction thesis, highlights, physical and former-offering tables, transaction conditions, gallery and location copy, and public-record descriptions; combined frontage/parking and building-profile facts; separated historical occupancy/fuel conditions from current representations; removed the redundant similar-property document card while retaining the primary and closing conversion actions.
- Files and routes changed: `src/content/properties.ts`, `src/test/gala-pages.test.tsx`, and this ledger; `/properties/802-bragg-boulevard`.
- Verification: 36/36 targeted page/property tests passed, including an explicit assertion that sale consideration and closing date remain unpublished. Desktop height reduced from 7,100px baseline to 5,163px; mobile from 9,329px to 7,627px, including the global footer. The three-image selector changes the primary image; Closed and Sale Transaction labels, verified physical facts, Crexi and LoopNet records, live map, and `/contact?property=802-bragg-boulevard` similar-property inquiry remain present; former asking prices are absent; the map loads after entering its lazy viewport; no horizontal overflow or page-specific console errors appear at 1440px or 390px.
- Commit: `refactor: tighten Bragg Boulevard transaction record` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: final consideration, closing date, preferred Gala transaction credit, approved closing announcement details, and current ownership/operating information remain client inputs and stay unpublished.
- Exact next action: Audit and tighten `/properties/202-north-main-street` as a compact non-photographic closed record, preserving the July 30, 2026 date and verified physical facts while keeping the displayed MLS amount, Gala's exact transaction role, advisor credit, and restricted MLS photography unpublished; verify the completed-transaction artwork, map, disclosure, and similar-property inquiry at desktop and mobile sizes.

### 2026-09-15 — Phase 2 202 North Main Street closed record

- Starting branch / HEAD: `codex/compact-listings-services` at `bfc24d0`, clean.
- Source of truth checked: the goal objective, `AGENTS.md`, this ledger, the 202 North Main record in `PROPERTY-DATA-REGISTER.md`, the client-supplied MLS facts and restrictions, shared completed-transaction artwork, compact renderer/styles, and property/page tests.
- Gate: make the July 30, 2026 closing and verified physical profile feel complete without approved photography, while withholding the ambiguous `$825,000` MLS display, Gala's exact role, advisor credit, and restricted MLS media.
- Completed: shortened the transaction thesis and physical profile; removed the repetitive highlight list; combined building stories/year; concentrated economics, representation, and photography limitations in the transaction table; shortened the location copy; removed the duplicate similar-property document card; and added a reusable single-column close state so records without public documents end with one intentional CTA rather than an empty second column.
- Files and routes changed: `src/content/properties.ts`, `src/components/properties/CommercialListingPage.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, and this ledger; `/properties/202-north-main-street` plus the no-document close layout shared by partial records.
- Verification: 36/36 targeted page/property tests passed, including explicit protection for the unpublished transaction amount and unassigned Gala role/advisor. Desktop height reduced from 5,783px baseline to 4,776px; mobile from 6,958px to 6,049px, including the global footer. The branded completed-transaction graphic is announced accurately and no gallery is implied; the July 30, 2026 date, physical facts, live map, disclosure, and `/contact?property=202-north-main-street` inquiry route are present; `$825,000` remains absent; the single-column close renders cleanly; no horizontal overflow or page-specific console errors appear at 1440px or 390px.
- Commit: `refactor: tighten North Main transaction record` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: Gala's exact transaction role, advisor credit, price classification or closing consideration, legal parcel schedule, and approved non-MLS photography remain client inputs and stay unpublished.
- Exact next action: Audit and tighten `/properties/10416-chapel-hill-road` as the final compact non-photographic closed record, preserving the July 29, 2026 closing, approximately 3.3 acres, two-parcel record, and documented Gala listing involvement while keeping disputed economics, the separate 10414 relationship, advisor credit, building area, and restricted MLS photography unresolved; verify the transaction artwork, map, disclosure, and similar-property inquiry at desktop and mobile sizes, then run the Phase 2 full gate across all property routes.
