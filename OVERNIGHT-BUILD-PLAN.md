# Gala CRE property and service rebuild

Last updated: 2026-09-15 09:49 CDT

Authoritative branch: `main`

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

Status: **Complete**

Active listings:

- [x] 5047 Yadkin Road
- [x] 611 & 703 Church Street
- [x] 5911 Family Farm Road
- [x] Lexington Townhome Site (`/properties/1111-brown-street`)

Closed transaction variants:

- [x] 802 Bragg Boulevard
- [x] 202 North Main Street
- [x] 10416 Chapel Hill Road

Gate: Every property route is concise, property-specific, media-rich where approved media exists, and connected to the correct advisor and inquiry context. Unknown facts remain hidden or qualified, and closed records cannot be confused with active inventory. **Passed.**

## Phase 3 — Establish the premium service-page standard

Status: **Complete**

Use Industrial as the first redesigned service backpage with this spine:

1. Short image-led hero.
2. One focused value section.
3. Compact three- or four-step process.
4. Four concrete deliverables.
5. Related capabilities.
6. Concise closing CTA.

Target 3,200–4,200px desktop. Remove repeated explanations, duplicate process previews, oversized headings, long essays, decorative filler, excessive padding, and generic closing language.

Gate: Industrial retains its commercial substance at roughly half the original long-form standard and feels premium through clarity, imagery, and restraint. **Passed.**

## Phase 4 — Rebuild every service and capability backpage

Status: **Complete**

Brokerage:

- [x] Brokerage overview
- [x] Landlord Representation
- [x] Tenant Representation

Investment Sales:

- [x] Investment Sales overview
- [x] Multifamily
- [x] Retail
- [x] Office
- [x] Land

Development:

- [x] Development overview
- [x] Site Strategy
- [x] Entitlements
- [x] Infrastructure
- [x] Development Oversight

Capital Markets:

- [x] Capital Markets overview
- [x] Debt
- [x] Equity
- [x] Capital Strategy
- [x] Transaction Coordination

Property Management:

- [x] Property Management overview
- [x] Property Management Partnership

Each route must retain distinct clients, problems, decisions, and deliverables. Do not create pages by merely swapping nouns.

Gate: Every advertised service route is concise, differentiated, visually complete, and free of unnecessary repetition. **Passed.**

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

Status: **Complete**

- [x] Refine `/services` to introduce the shorter service system.
- [x] Verify every mega-menu and mobile-navigation route.
- [x] Standardize related-capability links and service CTA language/parameters.
- [x] Verify property catalog/detail connections and inquiry context.
- [x] Do not alter locked homepage design.
- [x] Preserve Team, Careers, Company, Contact, News, and footer except necessary broken-link corrections.

Gate: Every catalog, listing, and service pathway reaches the correct next action without dead ends or conflicting language. **Passed.**

## Phase 6 — Full QA, commit, and morning package

Status: **Complete**

- [x] Test every property and service route at desktop, tablet, and mobile sizes.
- [x] Verify galleries, video, maps, documents, filters, keyboard behavior, and reduced motion.
- [x] Verify inquiry preselection, metadata/social previews, overflow, and console errors.
- [x] Run the full test suite, production build, and lint.
- [x] Prepare demo-ready routes and recommended meeting walkthrough.
- [x] Prepare remaining client-input list and before/after page-height comparison.
- [x] Record local commit(s), deployment state, local URL, and production URL.

Gate: The complete public property and service experience is credible, consistent, responsive, and ready for the client meeting. **Passed.**

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

### 2026-09-15 — Phase 2 10416 Chapel Hill Road and property-system gate

- Starting branch / HEAD: `codex/compact-listings-services` at `c31e972`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, the 10416 Chapel Hill record in `PROPERTY-DATA-REGISTER.md`, current property data, shared completed-transaction artwork, compact renderer/styles, all property routes, and property/page/video tests.
- Gate: complete a concise non-photographic 10416 transaction record that preserves the July 29, 2026 closing, approximately 3.3 acres, two-parcel profile, and documented Gala listing involvement while isolating disputed economics, the unresolved 10414 relationship, individual advisor credit, building area, and restricted MLS photography; then prove all eight property routes remain responsive and functional.
- Completed: shortened the transaction thesis; removed the repetitive highlight list; combined improvement stories/year and closing/off-market dates; clarified that Gala listing involvement is documented while individual advisor credit remains unassigned; explicitly limited the record to 10416 while the 10414 relationship remains unconfirmed; shortened the map and closing copy; and removed the duplicate similar-property document card so the page ends with one focused conversion action.
- Files and routes changed: `src/content/properties.ts`, `src/test/gala-pages.test.tsx`, and this ledger; `/properties/10416-chapel-hill-road`.
- Verification: 37/37 targeted page/property/video tests passed. At 1440px, 10416 reduced from 5,716px baseline to 4,843px; at 390px, from 6,981px to 6,113px, including the global footer. The transaction graphic, closing date, approximate acreage, parcel count, Gala listing involvement, live map, disclosure, and `/contact?property=10416-chapel-hill-road` inquiry route are present; `$2,500,000` and `$1.8M` remain absent; no gallery is implied. The Phase 2 browser gate rendered all eight property routes at 1440px, 834px, and 390px with correct titles, H1s, primary media, property-specific inquiry links, live map modules, zero horizontal overflow, and zero page errors. Gallery selectors expose 6 Lackey views, 6 Church views, 5 Family Farm views, 5 Lexington views, and 3 Bragg views; the three property-video routes remain present. Full suite: 100/100 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Commit: `refactor: complete compact property transaction system` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: the combined 10414/10416 structure, transaction economics, preferred individual credit, building area, and approved non-MLS photography remain client inputs. All earlier property-specific blockers remain listed above and continue to be omitted or qualified.
- Exact next action: Start Phase 3 by live-auditing `/services/investment-sales/industrial` against the 3,200–4,200px target, then rebuild it through the short image-led hero → focused industrial value → compact process → four deliverables → related capabilities → concise CTA spine without changing the locked homepage or inventing case-study claims.

### 2026-09-15 — Phase 3 compact Industrial service standard

- Starting branch / HEAD: `codex/compact-listings-services` at `8ef8f30`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Industrial capability record, shared capability renderer/styles, existing service imagery, relevant tests, and the live Industrial route.
- Gate: retain the route's industrial underwriting substance while reducing it to the short image-led hero → focused value → compact process → four deliverables → related capabilities → concise CTA spine, within the 3,200–4,200px desktop target and without unsupported performance claims.
- Completed: preserved the already-sound six-part content structure; tightened hero, section, process, deliverable, related-link, and CTA spacing only for compact capability pages; replaced the repeated exterior photo in the value section with a distinct generic clear-span warehouse interior; and retained the asset-specific discussion of income, operations, clear height, loading, power, yards, access, condition, environmental diligence, positioning, buyer outreach, negotiation, and closing.
- Imagery: generated a generic service-context warehouse interior with no people, signage, logos, or property claims; optimized it to `src/assets/industrial-interior-operations.webp`. It is not represented as a Gala listing or completed project.
- Files and routes changed: `src/assets/industrial-interior-operations.webp`, `src/content/capabilityPages.ts`, `src/styles/capability-page.css`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/investment-sales/industrial`.
- Verification: 36/36 targeted page/capability tests passed. Desktop height reduced from the live compact baseline of 4,353px to 4,095px at 1440×900; mobile reduced from 6,543px to 6,373px at 390×844; tablet measured 5,054px at 834×1112. Both contextual images load at full intrinsic width, the property-specific CTA route is correct, and no horizontal overflow or page-specific console errors appear at desktop, tablet, or mobile sizes. Full suite: 100/100 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Commit: `refactor: establish compact service page standard` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: no client case studies, quantified outcomes, testimonials, or additional approved project photography have been supplied; none blocks the compact standard because no such proof is fabricated.
- Exact next action: Start Phase 4 with `/services/investment-sales`, `/services/investment-sales/multifamily`, `/services/investment-sales/retail`, `/services/investment-sales/office`, and `/services/investment-sales/land`; apply the Industrial compact standard while preserving each route's distinct underwriting thesis and existing unique imagery, prioritize Land's access/utilities/entitlement/diligence journey, and do not clone Industrial by swapping nouns.

### 2026-09-15 — Phase 4 compact Investment Sales group

- Starting branch / HEAD: `codex/compact-listings-services` at `cc3548f`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Investment Sales overview and five asset-class records, shared capability renderer/styles, current service imagery, relevant tests, and all five live routes.
- Gate: make the Investment Sales overview and Multifamily, Retail, Office, and Land routes concise, visually complete, and asset-specific through the compact Industrial standard, while preserving the strongest underwriting and diligence guidance and avoiding noun-swapped duplicates.
- Completed: audited and retained the already-compact Investment Sales overview as the asset-class gateway; rebuilt Multifamily, Retail, and Office around one distinct value section, a four-step sale process, four concrete deliverables, compact related capabilities, and one focused CTA; rebuilt Land directly around use and approvals, access and infrastructure, buyer fit and timing, a four-step execution path, and four land-specific deliverables. Removed duplicate process-preview actions, hero signal strips, repeated strategy chapters, and overlapping six-card responsibility lists.
- Imagery: generated four distinct generic service-context images for multifamily operations, retail access and circulation, office occupancy, and land infrastructure; optimized them to WebP in `src/assets`. They contain no Gala branding, parcel boundaries, property labels, or representations of Gala listings or completed projects.
- Files and routes changed: `src/assets/multifamily-operations-context.webp`, `src/assets/retail-access-context.webp`, `src/assets/office-occupancy-context.webp`, `src/assets/land-infrastructure-context.webp`, `src/content/capabilityPages.ts`, `src/content/landCapabilityPage.ts`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/investment-sales`, `/services/investment-sales/multifamily`, `/services/investment-sales/retail`, `/services/investment-sales/office`, and `/services/investment-sales/land`.
- Verification: the overview remains 3,950px at 1440px. Multifamily reduced from 8,432px baseline to 4,185px desktop and 6,357px mobile; Retail from 8,246px to 4,177px desktop and 6,346px mobile; Office from 8,467px to 4,355px desktop and 6,505px mobile; Land from 6,717px to 4,088px desktop and 6,371px mobile. All five routes render at 1440px, 834px, and 390px with loaded imagery, correct H1s and contextual inquiry routes, zero horizontal overflow, and zero browser-console errors. Targeted suite: 37/37 passed. Full suite: 101/101 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Commit: `refactor: compact Investment Sales service group` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: no client case studies, quantified outcomes, testimonials, or additional approved project photography have been supplied; none blocks these concise service routes because no unsupported proof is fabricated.
- Exact next action: Rebuild `/services/development-services`, `/services/development-services/site-strategy`, `/services/development-services/entitlements`, `/services/development-services/infrastructure`, and `/services/development-services/development-oversight` through the compact visual system; distinguish early feasibility, approvals, civil/infrastructure coordination, and execution oversight; use the existing development imagery first and generate only distinct generic service-context imagery needed to avoid repetition.

### 2026-09-15 — Phase 4 compact Development group

- Starting branch / HEAD: `codex/compact-listings-services` at `b7e1fe9`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Development overview and four capability records, shared capability renderer/styles, current development imagery, relevant tests, and all five live routes.
- Gate: make all five Development routes concise and visually complete while clearly separating early feasibility, jurisdictional approvals, infrastructure dependencies, and owner-side execution oversight; preserve specialist and public-authority boundaries and avoid presenting coordination as guaranteed approval or construction delivery.
- Completed: audited and retained the already-compact Development overview; rebuilt Site Strategy around program fit, site reality, and the stop-or-proceed sequence; rebuilt Entitlements around jurisdictional path, technical review, and ownership decisions; rebuilt Infrastructure around capacity, responsibility, and critical-path dependencies; rebuilt Development Oversight around the ownership baseline, cross-team visibility, and material decisions. Each capability now uses one value section, a four-step process, four deliverables, compact related links, and one contextual inquiry action. Removed duplicate process-preview actions, hero signal strips, long challenge essays, and overlapping six-card responsibility lists. Added a shared compact-mobile title rule after live QA exposed clipping on “Development Oversight.”
- Imagery: retained the strongest existing Site Strategy and Infrastructure hero assets, then generated six distinct generic service-context images for site evaluation, entitlement planning and revision review, infrastructure field coordination, and owner-side project oversight. All are optimized WebP assets with no Gala branding, legible plans, parcel boundaries, approval claims, property claims, or representation as Gala projects.
- Files and routes changed: `src/assets/site-strategy-field-context.webp`, `src/assets/entitlements-coordination-hero.webp`, `src/assets/entitlements-review-context.webp`, `src/assets/infrastructure-field-context.webp`, `src/assets/development-oversight-hero.webp`, `src/assets/development-oversight-context.webp`, `src/content/developmentCapabilityPages.ts`, `src/styles/capability-page.css`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/development-services`, `/services/development-services/site-strategy`, `/services/development-services/entitlements`, `/services/development-services/infrastructure`, and `/services/development-services/development-oversight`.
- Verification: the overview remains 3,434px desktop and 4,410px mobile. Site Strategy reduced from 6,592px to 4,026px desktop and from 9,195px to 6,191px mobile; Entitlements from 6,701px to 4,346px desktop and from 9,371px to 6,456px mobile; Infrastructure from 6,503px to 4,181px desktop and from 9,250px to 6,475px mobile; Development Oversight from 6,587px to 4,182px desktop and from 9,334px to 6,332px mobile. All five routes render at 1440px, 834px, and 390px with unique loaded imagery, correct H1s and contextual inquiry routes, zero horizontal overflow, and zero current browser-console errors. Targeted suite: 39/39 passed. Full suite: 103/103 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Commit: `refactor: compact Development service group` after the verified diff is staged.
- Remaining working tree: expected clean after commit.
- Blockers: no client case studies, quantified outcomes, testimonials, project-specific development photography, or direct specialist credentials have been supplied; none blocks these routes because the copy stays within coordination and decision-support boundaries.
- Exact next action: Rebuild `/services/capital-markets`, `/services/capital-markets/debt`, `/services/capital-markets/equity`, `/services/capital-markets/capital-strategy`, and `/services/capital-markets/transaction-coordination` through the compact visual system; distinguish lender fit and term execution, sponsor/investor alignment, capital-stack sequencing, and document/milestone coordination; remove the overview's duplicated 1031 interruption if it repeats the surrounding conversion path; generate distinct generic Equity and capital-decision imagery only where current assets repeat.

### 2026-09-15 — Phase 4 compact Capital Markets group

- Starting branch / HEAD: `codex/compact-listings-services` at `b583861`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Capital Markets overview and four capability records, shared capability renderer/styles, current capital imagery, relevant tests, and all five live routes.
- Gate: make all five Capital Markets routes concise, visually complete, and commercially distinct by separating lender fit and term execution, sponsor/investor alignment, capital-stack sequencing, and document/milestone control; remove the overview's repeated 1031 interruption without removing the dedicated investor journey elsewhere.
- Completed: audited the already-compact Capital Markets overview and removed its duplicate exchange-financing interruption; rebuilt Debt around lender fit, full-term comparison, and closing certainty; rebuilt Equity around the investment case, partner mandate, and alignment; rebuilt Capital Strategy around sources and uses, risk and control, and execution sequencing; rebuilt Transaction Coordination around information, accountability, and the closing calendar. Each capability now uses one decision section, a four-step process, four deliverables, compact related links, and one contextual inquiry action. No page implies a capital commitment, investment outcome, specialist conclusion, or guaranteed financing.
- Imagery: retained the strongest existing Debt and Transaction Coordination hero assets, then generated six distinct generic service-context images for debt underwriting, equity conversations and alignment, capital planning and scenario comparison, and transaction control. All are optimized WebP assets with no Gala branding, readable financial information, property identities, or representations of Gala transactions.
- Files and routes changed: `src/assets/debt-underwriting-context.webp`, `src/assets/equity-advisory-hero.webp`, `src/assets/equity-alignment-context.webp`, `src/assets/capital-strategy-hero.webp`, `src/assets/capital-strategy-context.webp`, `src/assets/transaction-control-context.webp`, `src/content/capitalMarketsCapabilityPages.ts`, `src/content/capabilityPages.ts`, `src/pages/ServiceDetail.tsx`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/capital-markets`, `/services/capital-markets/debt`, `/services/capital-markets/equity`, `/services/capital-markets/capital-strategy`, and `/services/capital-markets/transaction-coordination`.
- Verification: the overview measured 3,371px desktop. Debt reduced from 6,620px to 4,143px desktop and measured 6,341px mobile; Equity from 6,752px to 4,116px desktop and measured 6,385px mobile; Capital Strategy from 6,676px to 4,143px desktop and measured 6,408px mobile; Transaction Coordination from 6,641px to 4,106px desktop and measured 6,377px mobile. Tablet heights were 3,696px for the overview and 5,114–5,163px for the capability pages. All five routes render at 1440px, 834px, and 390px with distinct loaded imagery, correct H1s and inquiry routes, no duplicate exchange-financing band, zero horizontal overflow, and zero current browser-console errors. Targeted suite: 40/40 passed. Full suite: 104/104 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Intended commit: `refactor: compact Capital Markets service group`.
- Remaining working tree: expected clean after commit.
- Blockers: no client case studies, quantified outcomes, testimonials, capital commitments, specialist credentials, or approved transaction-specific capital imagery have been supplied; none blocks these routes because the copy stays within advisory, access, coordination, and decision-support boundaries.
- Exact next action: Rebuild `/services/brokerage`, `/services/brokerage/landlord-representation`, and `/services/brokerage/tenant-representation` through the compact system; preserve the owner-versus-occupier distinction, cut both long editorial essays to strategy/process/deliverables, generate distinct generic occupier imagery only where current media repeats, and keep inquiry routing correct.

### 2026-09-15 — Phase 4 compact Brokerage group

- Starting branch / HEAD: `codex/compact-listings-services` at `e7d263c`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Brokerage overview and both representation records, shared capability renderer/styles, current brokerage imagery, relevant tests, and all three live routes.
- Gate: reduce the Brokerage overview to its two client paths and rebuild Landlord and Tenant Representation through the compact hero → strategy → process → deliverables → related capabilities → CTA system, while keeping owner economics and tenant occupancy decisions unmistakably different and preserving correct inquiry routing.
- Completed: tightened the Brokerage overview around only Landlord and Tenant Representation; rebuilt Landlord around ownership plan, market position, tenant quality, property marketing, prospect qualification, proposal economics, negotiation, and execution; rebuilt Tenant around operational requirements, site selection, full occupancy-cost comparison, tours, LOI and lease negotiation, renew/relocate/expand/downsize decisions, coordination through occupancy, and exclusive tenant-side advocacy. Each representation page now has one primary action, no signal strip, one focused decision section, four process steps, four deliverables, compact related links, and a concise close.
- Imagery: retained the existing generic Brokerage hero for Landlord, then generated three restrained generic service-context images for an owner-side leasing review, a tenant site tour, and tenant option evaluation. All are optimized WebP assets with no Gala branding, readable documents, property identities, or representations of Gala listings or client assignments.
- Files and routes changed: `src/assets/landlord-leasing-context.webp`, `src/assets/tenant-representation-hero.webp`, `src/assets/tenant-site-evaluation-context.webp`, `src/content/capabilityPages.ts`, `src/content/services.ts`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/brokerage`, `/services/brokerage/landlord-representation`, and `/services/brokerage/tenant-representation`.
- Verification: Brokerage reduced from 4,101px to 3,195px desktop; Landlord from 8,725px to 4,194px desktop; Tenant from 8,830px to 4,129px desktop. At 834px, the three routes measure 3,495px, 5,062px, and 5,114px; at 390px, 4,237px, 6,429px, and 6,339px. All routes render with loaded imagery, contained headings, correct inquiry links, zero horizontal overflow, and zero current browser-console errors. Targeted suite: 41/41 passed. Full suite: 105/105 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Intended commit: `refactor: compact Brokerage service group`.
- Remaining working tree: expected clean after commit.
- Blockers: no client case studies, quantified outcomes, testimonials, representation results, or approved assignment-specific imagery have been supplied; none blocks these routes because the copy stays within advisory, marketing, qualification, negotiation, and coordination boundaries.
- Exact next action: Rebuild `/services/property-management` and `/services/property-management/property-management-partnership` through the compact system; add a distinct restrained generic overview hero, keep the partner-delivered boundary explicit, clarify ownership scope, manager selection, transition, and ongoing coordination, and verify that no copy implies in-house property management or guaranteed partner performance.

### 2026-09-15 — Phase 4 compact Property Management group and phase gate

- Starting branch / HEAD: `codex/compact-listings-services` at `afce837`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the Property Management overview and partnership content, shared service and capability renderers/styles, current operations imagery, relevant tests, and both live routes.
- Gate: give the Property Management overview a distinct visual identity and rebuild the partnership route through the compact system while making ownership requirements, manager fit, scope comparison, transition, and ongoing coordination clear; state explicitly that Gala does not provide day-to-day management in house and does not assume the selected partner’s contracted responsibilities.
- Completed: renamed the overview from “Property Management Partnership” to the clearer service-level “Property Management” while retaining the partnership as its dedicated capability; added a service-level hero and tightened the overview narrative; rebuilt the capability around three operating decisions, a four-step selection and transition process, four concrete coordination deliverables, related ownership workstreams, and one inquiry action. Removed the process-preview CTA, signal strip, repeated ownership essay, and overlapping six-item handoff list. The selected partner’s direct contract and responsibility are stated in both the decision and deliverables sections.
- Imagery: retained the existing generic mechanical-systems operations image for the capability hero; generated a distinct commercial-property site-review hero for the overview and an owner/operations-partner transition context image for the capability. Both new images are optimized WebP assets and are not represented as Gala properties, clients, completed work, or a named management partner.
- Files and routes changed: `src/assets/property-management-overview.webp`, `src/assets/property-management-transition-context.webp`, `src/content/capitalCapabilityPages.ts`, `src/content/services.ts`, `src/test/capability-routes.test.tsx`, `src/test/gala-pages.test.tsx`, and this ledger; `/services/property-management` and `/services/property-management/property-management-partnership`.
- Verification: the overview changed from a 3,343px image-less route to a 3,151px desktop visual route; the partnership page reduced from 6,937px to 4,514px desktop. At 834px the routes measure 3,281px and 5,273px; at 390px they measure 3,965px and 6,874px. Both routes render with loaded imagery, contained headings, the correct `/contact?inquiry=property-management` action, zero horizontal overflow, and zero current browser-console errors. Targeted suite: 44/44 passed. Full suite: 108/108 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings. With Property Management complete, every Phase 4 service overview and advertised capability route now uses the concise system or an already-approved compact overview.
- Intended commit: `refactor: compact Property Management service group`.
- Remaining working tree: expected clean after commit.
- Blockers: no approved management-partner identity, executed partnership terms, direct service territory, operating standards, case studies, quantified outcomes, testimonials, or assignment-specific imagery have been supplied. None blocks this partner-led route because no named partner, direct-management claim, performance promise, or client outcome is published.
- Exact next action: Start Phase 5 by auditing `/services`, the desktop mega-menu, mobile service navigation, footer service links, related-capability links, and service inquiry CTAs against the shared route matrix; then implement one consistent service-index and conversion-path checkpoint without altering the locked homepage or unrelated pages.

### 2026-09-15 — Phase 5 service discovery and conversion reconciliation

- Starting branch / HEAD: `codex/compact-listings-services` at `9cdec9f`, clean.
- Source of truth checked: the goal objective and referenced plan, `AGENTS.md`, this ledger, `PROPERTY-DATA-REGISTER.md`, the shared service route matrix, Services index, desktop mega-menu, mobile navigation, footer, service overview renderer, Contact query mapping, property catalog/detail inquiry paths, and the relevant tests and live routes.
- Gate: make `/services` a concise visual gateway; keep every desktop, mobile, footer, and related-capability destination valid; preserve service inquiry context; and leave the locked homepage and unrelated pages unchanged.
- Completed: shortened the Services hero; converted the five text-only directory entries into a responsive image-led two-row system; removed the redundant asset-label chapter already represented by Investment Sales; added direct overview and capability actions; standardized service and footer conversion language to “Let's Connect”; centralized overview inquiry URLs with service and optional focus context; taught Contact to preserve general service-index inquiries; clarified mobile service groups with capability counts; and corrected the mobile primary CTA’s visual treatment. The desktop mega-menu remains the direct capability navigator while mobile stays concise by routing through complete service overviews.
- Files and routes changed: `src/pages/Services.tsx`, `src/pages/ServiceDetail.tsx`, `src/pages/Contact.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/content/services.ts`, `src/styles/gala.css`, `src/test/capability-routes.test.tsx`, `src/test/contact-page.test.tsx`, and this ledger; `/services`, all five `/services/:slug` overviews, the shared desktop/mobile service navigation, footer contact pathways, and `/contact` preselection.
- Verification: `/services` measures 3,075px at 1280px, 3,698px at 834px, and 4,882px at 390px; all five card images load; the desktop grid resolves to 2+3 cards, the tablet grid to 2+2+1, and mobile to one column with zero horizontal overflow. Desktop keyboard focus opens the full capability menu and Escape closes it; the mobile navigation and service submenu open cleanly; the mobile primary CTA is visible; live Investment Sales navigation reaches `/contact?inquiry=investment-sales&source=investment-sales` with Investment Sales selected. Browser QA found no page-specific errors, only the existing React Router future warnings. Full suite: 110/110 passed. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings.
- Intended commit: `refactor: reconcile service discovery and inquiry paths`.
- Remaining working tree: expected clean after commit.
- Blockers: no new blockers. The existing property-data, approved-media, case-study, and quantified-proof inputs listed above remain outside this shared-path checkpoint.
- Exact next action: Start Phase 6 with one automated route-by-route desktop/tablet/mobile audit of every property and service URL, capturing page height, horizontal overflow, missing media, broken internal destinations, console errors, CTA inquiry context, metadata, and interactive module presence; fix only verified defects found, then prepare the final meeting-readiness package and commit/deployment record.

### 2026-09-15 — Phase 6 release-candidate certification and morning package

- Starting branch / HEAD: `codex/compact-listings-services` at `17ab720`, clean.
- Source of truth checked: the current goal objective and referenced plan, `AGENTS.md`, Git branch/status/history, this ledger, `PROPERTY-DATA-REGISTER.md`, all property and service route/data definitions, shared renderers, navigation and inquiry mappings, assets, tests, local live routes, production preview, and current Vercel response/deployment state.
- Gate: prove every public property and service route at desktop, tablet, and mobile; verify interactive media and conversion behavior; fix verified defects; record a reproducible release gate, remaining client inputs, before/after measurements, demo order, and deployment state.
- Completed: added a production-preview Playwright system covering 31 property/service destinations at three breakpoints plus catalog filters, eight map markers, inline gallery selection, three mobile property videos, contextual property and service inquiries, keyboard navigation, skip-link behavior, and reduced motion. The matrix verifies runtime metadata, canonical/social tags, social-image availability, internal destinations, media loading, conditional document/video modules, map presence, related listings, and horizontal overflow. Corrected a production-only metadata defect by replacing inlined SVG `data:` URLs with the public Gala share image. Added the complete meeting-readiness and deployment handoff in `LAUNCH-READINESS.md`.
- Files and routes changed: `.gitignore`, `package.json`, `playwright.config.ts`, `e2e/public-route-matrix.spec.ts`, `src/components/site/PageMeta.tsx`, `src/test/launch-readiness.test.tsx`, `LAUNCH-READINESS.md`, and this ledger; all 31 `/properties` and `/services` destinations are covered without changing their approved presentation.
- Verification: 7/7 production-preview Playwright tests passed, including 93 responsive route renders at 1440×900, 834×1112, and 390×844. Full Vitest suite: 111/111 passed across 18 files. Production build passed. Lint passed with 0 errors and 7 unchanged shared-UI Fast Refresh warnings. Manual browser spot checks passed on desktop Lackey and Industrial and mobile Family Farm. Production `https://gala-cre.vercel.app` responds, but this branch remains intentionally local and undeployed.
- Intended commit: `test: certify property and service release candidate`.
- Remaining working tree: expected clean after the Phase 6 commit.
- Blockers: client property facts/media and service proof listed above remain pending but are safely omitted or qualified; production form secrets/origin/KV and final disclosure approval remain configuration inputs; client-rendered route-specific crawler previews require future prerendering/SSR; the 752KB minified JavaScript chunk and 8.1MB hero video are future performance opportunities; merge, push, and deployment require explicit authorization and are outside this checkpoint.
- Exact next action: User reviews the release candidate locally. After explicit approval, merge `codex/compact-listings-services` into `main`, push, deploy to Vercel, and smoke-test the production routes and form configuration.

### 2026-09-15 — Production promotion and live smoke test

- Starting branch / HEAD: `codex/compact-listings-services` at `4b177d1`, clean; `origin/main` remained at the `d7b6204` baseline and was a direct ancestor with no divergence.
- Gate: fast-forward the verified release into `main`, push the exact history, deploy the linked `gala-cre` Vercel project to production, and validate the live public routes without submitting forms.
- Completed: fast-forwarded local `main` through all 17 verified rebuild commits; pushed `main` to GitHub; deployed the linked Vercel project; confirmed deployment `dpl_G3E3pNcs3MKBfN5aR3Zi6FjkNMqd` reached `Ready` and received the `https://gala-cre.vercel.app` alias.
- Verification: production root, `/properties`, `/properties/2301-lackey-street`, `/services`, and `/services/investment-sales/industrial` returned HTTP 200. The production Playwright suite exercised the same 31 routes at desktop, tablet, and mobile plus catalog, map, gallery, video, contextual inquiry, keyboard, and reduced-motion journeys. Desktop and tablet passed immediately; mobile passed on rerun after one non-reproducible `google is not defined` exception inside Google's hosted Maps embed script. No application defect was reproduced and no form was submitted.
- Release state: application release commit `4b177d1` is on `main`, `origin/main`, and production. This deployment record is the only follow-up documentation change.
- Remaining blockers: production form delivery still requires verification of Vercel secrets, allowed origins, durable rate limiting, and approved disclosure/privacy configuration before real submissions are promoted; client-content gaps remain listed above.
- Exact next action: Review `https://gala-cre.vercel.app` before the client meeting, then continue only with specifically approved content refinements or production-form configuration.
