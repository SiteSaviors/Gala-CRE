# Gala CRE property and service rebuild

Last updated: 2026-09-15 03:25 CDT

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

Status: **In progress**

Rebuild `/properties/2301-lackey-street` as the shared commercial listing standard:

- [ ] Compact identity and classification header.
- [ ] Inline gallery with a primary image and selectable thumbnails; no lightbox.
- [ ] Price, acreage, status, use, documents, advisor, and inquiry action immediately visible.
- [ ] Concise overview and non-repeating investment/occupancy highlights.
- [ ] Scannable property-information tables and property-specific diligence.
- [ ] Integrate map, optional video/media, documents, related listings, and closing contact without full-page chapters.
- [ ] Remove the early 1031 interruption and long-form editorial repetition.
- [ ] Preserve conditional rendering for partial property data and the distinct closed-record path.

Gate: Lackey feels like a premium brokerage listing and can be evaluated within two minutes on desktop and mobile.

## Phase 2 — Convert every property page

Status: **Not started**

Active listings:

- [ ] 5047 Yadkin Road
- [ ] 611 & 703 Church Street
- [ ] 5911 Family Farm Road
- [ ] Lexington Townhome Site (`/properties/1111-brown-street`)

Closed transaction variants:

- [ ] 802 Bragg Boulevard
- [ ] 202 North Main Street
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
