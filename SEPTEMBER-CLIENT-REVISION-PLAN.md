# September client revision plan

Last reviewed: September 22, 2026

## How to use this plan

This file is the active source of truth for the scope, phase order, completion state, and exact next action in the September client revisions. It prevents the current work from being buried in the completed overnight-build history.

- `PROPERTY-DATA-REGISTER.md` is the supporting fact register for publishable property facts, attribution evidence, media rights, conflicts, and missing client inputs. It is not the active work plan.
- `OVERNIGHT-BUILD-PLAN.md` is the historical rebuild/checkpoint ledger. New checkpoint verification and commit hashes are appended there for continuity, and its final next action must mirror this file. Its older phase checklist is not the current work plan.
- If this file conflicts with a newer client instruction or tested application behavior, follow the newer source and record the correction here and in the relevant supporting register.
- Complete and locally commit one verified checkpoint at a time. Do not combine unrelated phases simply because their files overlap.
- Do not push, merge, deploy, submit forms, or send messages unless the user explicitly requests that action in the current turn.

## Locked client decisions

- Use the supplied real portraits for Gaurang Gala, Leigh Roach, and Dr. Goverdhan Reddy Vavilala.
- Team actions say **Contact Agent** and **View Listings & Transactions**.
- Agent portfolios include active, under-contract, and closed associated work.
- The 10416 Chapel Hill Road closing credits both Gaurang and Goverdhan; individual transaction roles remain unpublished until supplied.
- Do not publish listing documents, property documents, diligence packages, approval packages, surveys, flyers, or downloadable media packages.
- Keep listing videos inline, controlled, lazy-loaded, non-autoplaying, and separate from image galleries.
- Add a labeled Home destination to desktop and mobile navigation; the logo continues to link home.
- Use this property-catalog order:
  1. 611 & 703 Church Street
  2. 5911 Family Farm Road
  3. Lexington Townhome Site
  4. 2301 Lackey Street
  5. 5047 Yadkin Road
  6. 802 Bragg Boulevard
  7. 202 North Main Street
  8. 10416 Chapel Hill Road
- Do not redesign the homepage or unrelated service pages during these revisions.

## Phase 0 — Register assets and removal targets

Status: **Complete** — commit `68784a9`

- [x] Register the three supplied portraits without altering the originals.
- [x] Record the approved biography and contact facts.
- [x] Record the authoritative catalog order.
- [x] Identify the internal-only media-package surface.
- [x] Identify every public property-document path and the dormant brochure path.
- [x] Audit current agent relationships and advisor filtering.
- [x] Audit existing listing-video behavior and the requested layout.

Gate: every supplied asset and removal target is identified without guessing.

## Phase 1 — Correct agent and transaction data

Status: **Complete in the current verified checkpoint; commit is recorded in `OVERNIGHT-BUILD-PLAN.md`.**

- [x] Connect approved names, biographies, emails, phone numbers, and real portraits through the shared Team source.
- [x] Replace the single property advisor with ordered multi-agent assignments.
- [x] Support optional relationship roles and every property status.
- [x] Derive transaction relationships from property data rather than duplicating identity data.
- [x] Credit both Gaurang and Goverdhan on 10416 Chapel Hill Road without inventing individual roles.
- [x] Make agent-filtered catalogs return active inventory and completed transactions, active first.
- [x] Verify desktop and mobile Team, portfolio, and shared-transaction presentations.

Gate: agent information comes from one source of truth, shared transactions support multiple agents, and associated work is accurate.

## Phase 2 — Finish Team, Contact, and navigation

Status: **Complete in the current verified checkpoint; commit is recorded in `OVERNIGHT-BUILD-PLAN.md`.**

- [x] Update Team portraits, biographies, direct email and phone links, Contact Agent actions, and portfolio actions.
- [x] Provide an accurate empty state when an agent has no associated public work.
- [x] Add a restrained Contact-page advisor directory using the shared Team records for all three agents.
- [x] Add Home as the first labeled desktop and mobile navigation destination.
- [x] Verify current-path treatment, keyboard navigation, responsive layout, and Contact inquiry context.

Gate: visitors can contact each agent, view associated work, and return home through an explicit navigation link.

## Phase 3 — Apply catalog order and remove private materials

Status: **Complete in the current verified checkpoint; commit is recorded in `OVERNIGHT-BUILD-PLAN.md`.**

- [x] Apply the approved eight-property order through structured data.
- [x] Apply the user's current explicit order to the homepage's active Featured Listings subset.
- [x] Remove the Family Farm public media-package card and download-center URL.
- [x] Remove property-document cards, actions, public URLs, and document metadata from the listing schema.
- [x] Remove the dormant generic brochure path so future records cannot re-enable public downloads.
- [x] Preserve marketplace listing references as secondary external links.
- [x] Replace document-access language with property-aware advisor inquiry actions.
- [x] Confirm internal screenshots, source agreements, private diligence, and document files are absent from the production bundle.

Gate: the catalog uses the approved order and no internal or property-document material remains publicly accessible.

## Phase 4 — Rebuild the conditional listing-video module

Status: **Not started**

- [ ] Place a large listing video beside the opportunity narrative on video-enabled properties.
- [ ] Move the three supporting points into a full-width row beneath the narrative and video.
- [ ] Stack narrative, video, and points cleanly on mobile.
- [ ] Support landscape and vertical social-video proportions without excessive empty space.
- [ ] Preserve poster images, native controls, lazy loading, `playsInline`, and no autoplay.
- [ ] Omit the module cleanly on properties without video.
- [ ] Apply and verify the shared module on Family Farm Road, Church Street, and Lexington Townhome Site.

Gate: video reads as a primary listing asset, performs safely on mobile, and creates no empty state on listings without video.

## Phase 5 — Full relationship, privacy, and release QA

Status: **Not started**

- [ ] Verify every Team contact action and direct email/telephone link.
- [ ] Verify all three profiles and every agent-filtered active, under-contract, and closed relationship.
- [ ] Verify shared Chapel Hill attribution without unsupported role or economics claims.
- [ ] Verify labeled Home navigation on desktop and mobile.
- [ ] Verify the approved catalog order and agent-filtered ordering.
- [ ] Verify property inquiry preselection and assigned-agent context.
- [ ] Prove public document/media-package URLs and dormant brochure paths are removed.
- [ ] Verify the three listing videos, posters, controls, lazy loading, and responsive layout.
- [ ] Run desktop, tablet, mobile, keyboard, focus, console, test, build, and lint gates.
- [ ] Record remaining client inputs and prepare a deployment handoff. Deployment remains a separate explicitly authorized action.

Gate: no agent is incorrectly attributed, no confidential document remains public, and every requested journey works on desktop and mobile.

## Exact next action

Start Phase 4 by moving the existing conditional listing-video module into the opportunity section beside the narrative, placing the verified highlights beneath that narrative/video row, and verifying the shared layout first on Church Street at desktop and mobile sizes before applying it to Family Farm and Lexington.
