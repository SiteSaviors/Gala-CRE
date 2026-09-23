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

Status: **Complete in the current verified checkpoint; commit is recorded in `OVERNIGHT-BUILD-PLAN.md`.**

- [x] Place a large listing video beside the opportunity narrative on video-enabled properties.
- [x] Move the three supporting points into a full-width row beneath the narrative and video.
- [x] Stack narrative, video, and points cleanly on mobile.
- [x] Support landscape and vertical social-video proportions without excessive empty space.
- [x] Preserve poster images, native controls, lazy loading, `playsInline`, and no autoplay.
- [x] Omit the module cleanly on properties without video.
- [x] Apply and verify the shared module on Family Farm Road, Church Street, and Lexington Townhome Site.

Gate: video reads as a primary listing asset, performs safely on mobile, and creates no empty state on listings without video.

Checkpoint files and routes: `src/components/properties/CommercialListingPage.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/public-route-matrix.spec.ts`, `PROPERTY-DATA-REGISTER.md`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/properties/611-703-church-street`, `/properties/5911-family-farm-road`, `/properties/1111-brown-street`, plus every non-video listing through the shared conditional path.

Verification: targeted video/property tests passed 44/44; full Vitest passed 116/116; the production build passed; lint passed with 0 errors and the same 7 shared-UI Fast Refresh warnings; the production-preview Playwright matrix passed 7/7 across all 31 audited routes at desktop, tablet, and mobile, including player metadata, layout order, no autoplay, no overflow, and clean no-video omission. Live local browser QA passed for the Church landscape layout, Lexington portrait layout, and Lackey no-video path. No form was submitted.

Blockers: none for this checkpoint. The three existing optimized videos and supplied posters remain unchanged; no new media or facts were required.

Intended commit: `refactor: elevate property listing videos`.

## Phase 5 — Full relationship, privacy, and release QA

Status: **Complete in the current verified checkpoint; commit is recorded in `OVERNIGHT-BUILD-PLAN.md`.**

- [x] Verify every Team contact action and direct email/telephone link.
- [x] Verify all three profiles and every agent-filtered active, under-contract, and closed relationship.
- [x] Verify shared Chapel Hill attribution without unsupported role or economics claims.
- [x] Verify labeled Home navigation on desktop and mobile.
- [x] Verify the approved catalog order and agent-filtered ordering.
- [x] Verify property inquiry preselection and assigned-agent context.
- [x] Prove public document/media-package URLs and dormant brochure paths are removed.
- [x] Verify the three listing videos, posters, controls, lazy loading, and responsive layout.
- [x] Run desktop, tablet, mobile, keyboard, focus, console, test, build, and lint gates.
- [x] Record remaining client inputs and prepare a deployment handoff. Deployment remains a separate explicitly authorized action.

Gate: no agent is incorrectly attributed, no confidential document remains public, and every requested journey works on desktop and mobile.

Checkpoint files: `e2e/september-client-release.spec.ts`, `SEPTEMBER-RELEASE-HANDOFF.md`, `PROPERTY-DATA-REGISTER.md`, `OVERNIGHT-BUILD-PLAN.md`, and this plan. No public route implementation required correction during the audit.

Verification: the new September acceptance suite passed 3/3; the full browser suite passed 10/10 across 31 property/service routes at desktop, tablet, and mobile plus Team/portfolio/privacy/inquiry journeys; full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 shared-UI Fast Refresh warnings. Static source/bundle scans found no forbidden property-document files or retired URL/action strings. Live local Team and Goverdhan portfolio checks showed all portraits loaded, zero horizontal overflow, correct contact values, and the Chapel Hill closed record. No form was submitted.

Release blocker: the linked Vercel project currently reports no environment variables. Careers, 1031, and general Contact submission delivery therefore remains safely disabled until approved private sender, recipient, origin, and rate-limit configuration is installed and verified. This does not block the verified content/navigation release, but it blocks representing forms as operational.

Intended commit: `test: certify September client release`.

## Post-release fix — Mobile homepage hero playback

Status: **Complete and deployed to production.**

- [x] Use the inverse of `prefers-reduced-motion: reduce` so capable mobile browsers are not excluded by a brittle `no-preference` query.
- [x] Keep the video muted, inline, looping, and autoplay-enabled while motion is allowed.
- [x] Retry playback when the media reaches `loadeddata` or `canplay`.
- [x] Pause when the hero leaves the viewport or the document becomes hidden.
- [x] Resume when the hero returns to view or the page is restored.
- [x] Preserve a poster-only reduced-motion fallback and an autoplay fallback when `IntersectionObserver` is unavailable.
- [x] Verify behavior at a 390×844 mobile viewport in automated and live local browser checks.

Gate: the mobile hero plays and loops while visible, pauses when offscreen, resumes on return, and respects reduced-motion/browser autoplay policies without hiding the poster fallback.

Checkpoint files: `src/pages/Index.tsx`, `src/test/gala-pages.test.tsx`, `e2e/public-route-matrix.spec.ts`, `OVERNIGHT-BUILD-PLAN.md`, and this plan.

Verification: focused homepage tests passed 36/36; full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 shared-UI Fast Refresh warnings; full Playwright passed 11/11. Live Chrome QA at 390×844 confirmed `muted`, `loop`, `playsInline`, ready state 4, active playback in view, paused playback offscreen, and resumed playback after returning to the hero.

Production verification: commit `e896ef1` was pushed to `origin/main` and included in production deployment `dpl_3sVshst5MTT2QWqzq1XMnHMMvHxV`; the focused live mobile playback test passed against `https://gala-cre.vercel.app`.

Intended commit: `fix: stabilize mobile hero video playback`.

## Post-release refinement — Simplify the Team introduction

Status: **Complete and deployed to production.**

- [x] Remove the large black Team hero.
- [x] Remove “Advice stays personal when responsibility stays clear.”
- [x] Use **Our Team** as the page's single level-one heading.
- [x] Move the roster into the immediate light-page introduction while preserving every profile, contact action, and portfolio link.
- [x] Give `/team` the solid navigation treatment so removing the dark hero does not create white-on-white links.
- [x] Preserve clean header clearance and zero horizontal overflow at desktop and mobile sizes.

Gate: `/team` opens directly with a concise **Our Team** introduction and roster, with no black hero, no redundant slogan, readable navigation, and no regression to agent data or actions.

Checkpoint files: `src/pages/Team.tsx`, `src/components/site/SiteHeader.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/september-client-release.spec.ts`, `OVERNIGHT-BUILD-PLAN.md`, and this plan.

Verification: focused Team tests passed 36/36; focused September browser acceptance passed 3/3; full Vitest passed 116/116; the production build passed; lint passed with 0 errors and the same 7 shared-UI Fast Refresh warnings; full Playwright passed 11/11. Live local Chrome QA at 1280×720 and 390×844 confirmed the hero and slogan are absent, the solid header is readable, the introduction clears the header by 39px desktop and 33px mobile, all three cards are present, and horizontal overflow is zero.

Production verification: commit `f00aa4d` was pushed to `origin/main` and included in production deployment `dpl_3sVshst5MTT2QWqzq1XMnHMMvHxV`; focused desktop and mobile Team acceptance passed against `https://gala-cre.vercel.app`.

Intended commit: `refactor: simplify team page introduction`.

## Post-release refinement — Consolidate Company and Team

Status: **Implemented and verified locally; not pushed or deployed.**

- [x] Make **Company** the single top-level navigation destination for the firm and its people.
- [x] Move the complete Team roster into `/company` after “How We Work.”
- [x] Keep all biographies, portraits, direct contacts, licenses, and portfolio actions sourced from `teamMembers`.
- [x] Remove the separate Team destination from desktop and mobile navigation.
- [x] Point footer and Company Team links to `/company#team`.
- [x] Preserve `/team` as a compatibility redirect to `/company#team`.
- [x] Keep a single page H1 and use an accessible H2/H3 hierarchy for the Team section and profiles.
- [x] Verify direct and redirected anchor positioning beneath the fixed header.

Gate: Company tells one coherent firm-and-people story, header navigation no longer presents Company and Team as competing destinations, every agent action remains intact, and existing `/team` links resolve safely.

Checkpoint files and routes: `src/components/team/TeamRoster.tsx`, `src/pages/Company.tsx`, `src/pages/Team.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/september-client-release.spec.ts`, `LAUNCH-READINESS.md`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/company`, `/company#team`, and legacy `/team`.

Verification: focused Company/Team and anchor tests passed 39/39; full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 shared-UI Fast Refresh warnings; full Playwright passed 11/11. Live local Chrome QA confirmed the simplified six-link desktop navigation, integrated Team section, correct Company current state, clean anchor landing beneath the fixed header, and preserved profile actions; automated browser checks passed at desktop, tablet, and mobile widths with no horizontal overflow.

Intended commit: `refactor: consolidate team into company`.

## Company refinement — Phase 1: Confirm the story and visual direction

Status: **Complete — research and publication boundaries documented locally.**

- [x] Research Gala CRE Group / Gala Real Estate Advisors, Gala Investments, Radius Development Group, Legacy Carolina Development, Gala Realty Group, Gaurang's public brokerage profile, public interviews, and relevant government/news records.
- [x] Separate a shared principal and shared address from an unsupported corporate ownership claim.
- [x] Define the evidence-backed meaning of **The Developer's Brokerage** as developer-informed commercial brokerage, not an assertion that every affiliated capability is delivered directly by Gala CRE.
- [x] Record the safe current market wording and the broader geographic question that still requires client confirmation.
- [x] Audit approved local brand imagery and cross-company/public imagery reuse limits.
- [x] Record the founding-year, operating-history, affiliation-language, geography, and media-rights questions required for final copy.
- [x] Create `COMPANY-STORY-REGISTER.md` as the focused source of truth for Company-page claims and imagery.

Gate: every proposed company claim and image is classified as publishable, qualified, client-confirmation-required, or prohibited; the Phase 2 rebuild can proceed without inventing history, ownership, markets, metrics, or media rights.

Checkpoint files: `COMPANY-STORY-REGISTER.md`, `OVERNIGHT-BUILD-PLAN.md`, and this plan. No public route or production asset changes in this research checkpoint.

Verification: source URLs were opened or fetched directly where available; the current Company implementation, shared Team records, site assets, property register, public brokerage identity, affiliated-company sites, published interview transcript, and relevant public records were compared. The North Carolina Secretary of State registry remains a manual follow-up because its real-time search presented a security-verification barrier and prohibits scripted search automation.

Intended commit: `docs: establish Gala CRE company story source`.

## Company refinement — Phase 2: Rebuild the Company narrative

Status: **Implemented and verified locally; not pushed or deployed.**

- [x] Replace the oversized generic hero with a shorter split composition led by approved real Team photography.
- [x] Lead with **The Developer's Brokerage** and a specific, evidence-safe Company headline.
- [x] Replace the abstract Purpose section with a concise explanation of why a developer-informed view matters to commercial decisions.
- [x] Replace the principles grid with the connected **Evaluate → Position → Structure → Execute** operating model.
- [x] Remove the redundant standalone Research Triangle section while retaining safe Cary and Research Triangle language in public metadata and site chrome.
- [x] Preserve the complete shared Team roster, direct contacts, biographies, licenses, and portfolio actions unchanged.
- [x] Omit founding dates, firm-age metrics, affiliate ownership claims, broader territory claims, and unapproved affiliate/project imagery.

Gate: `/company` presents a specific, image-led, developer-informed story before the existing Team roster; the narrative is concise, responsive, accessible, free of unsupported claims, and creates no regression to Team or legacy `/team` journeys.

Checkpoint files and route: `src/pages/Company.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/september-client-release.spec.ts`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/company` and legacy `/team`.

Verification: focused Company tests passed 36/36; full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 existing shared-UI Fast Refresh warnings; full Playwright passed 11/11. Live local Chrome QA confirmed the real-photo desktop hero, clear Why Gala hierarchy, compact four-step operating model, clean transition into Team, and no visible layout defects. Automated desktop and mobile acceptance confirmed the new narrative, three hero images, four operating steps, legacy redirect, Team actions, and no horizontal overflow.

Intended commit: `refactor: sharpen company story and operating model`.

## Company refinement — Phase 3: Complete the Company journey and QA

Status: **Implemented and verified locally; not pushed or deployed.**

- [x] Preserve the complete shared Team roster, biographies, direct contacts, licenses, and portfolio actions.
- [x] Add a compact non-metric proof layer grounded in Gala CRE's public property catalog, News archive, and evidence-safe developer-informed perspective.
- [x] Improve the narrative transition into Team and normalize card heights without changing Team data or actions.
- [x] Restore verified Triangle context as a compact, text-led presence band because no general-use Company or geographic photograph is currently cleared.
- [x] Simplify the final Company close to **Let’s Connect** and **Explore Careers** only, with source context preserved.
- [x] Update metadata and internal links to Services, Properties, News, Contact, and Careers.
- [x] Verify desktop, tablet, mobile, keyboard entry, Team anchor clearance, hero-image loading, responsive crops/spacing, console health, and horizontal overflow.

Final sequence: **Hero → Why Gala → Connected Platform → Proof → Our Team → Triangle Presence → CTA**.

Gate: the Company page feels complete and specific without becoming another long service page; every public claim is supported or carefully qualified, the Team system remains intact, and all responsive and keyboard journeys pass.

Checkpoint files and routes: `src/pages/Company.tsx`, `src/components/team/TeamRoster.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/september-client-release.spec.ts`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/company`, `/company#team`, and legacy `/team`.

Verification: focused Company page tests passed 36/36; focused Company browser acceptance passed 3/3 at 1440×900, 834×1112, and 390×844; full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 existing shared-UI Fast Refresh warnings; full Playwright passed 12/12. Live local Chrome QA confirmed the proof-to-Team transition, equal-height Team cards, compact Triangle presence, and two-action close. No form was submitted.

Intended commit: `feat: complete company journey`.

## Company section refinement — Full-bleed hero image

Status: **Implemented and verified locally; not pushed or deployed.**

- [x] Replace the three-portrait split hero with the user-selected `Company-hero.avif` as one full-bleed architectural image.
- [x] Preserve **The Developer's Brokerage**, the existing Company headline, supporting copy, and capability action.
- [x] Use a restrained desktop gradient that keeps the wall-mounted Gala mark visible while maintaining readable copy.
- [x] Art-direct the mobile crop so the architectural mark sits above the headline rather than behind it.
- [x] Preserve the approved Company sequence, Team roster, metadata, internal links, and legacy `/team` journey.
- [x] Register the generated image as conceptual brand imagery that must not be described as Gala CRE's actual office, employees, headquarters, or completed project.

Gate: the selected hero reads as a premium full-bleed Company introduction at desktop, tablet, and mobile widths; copy remains legible, the architectural mark survives each crop, no Team behavior regresses, and the route has no horizontal overflow or console error.

Checkpoint files and route: `src/assets/company-hero.avif`, `src/pages/Company.tsx`, `src/styles/gala.css`, `e2e/september-client-release.spec.ts`, `COMPANY-STORY-REGISTER.md`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/company` only, with legacy `/team` covered through the existing redirect.

Verification: full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 existing shared-UI Fast Refresh warnings; focused Company browser acceptance passed 3/3 at 1440×900, 834×1112, and 390×844. Visual desktop, tablet, and mobile screenshots confirmed the full-bleed crop, text contrast, architectural-logo visibility, and adjusted mobile composition. No form was submitted.

Intended commit: `feat: add full-bleed company hero`.

### Hero headline refinement

Status: **Complete locally; not pushed or deployed.**

- [x] Replace **See the whole opportunity.** with the user-approved **Who we are** headline.
- [x] Preserve the full-bleed image, supporting copy, capability action, responsive crop, and Company-page hierarchy.
- [x] Update unit and browser acceptance assertions.

Gate: **Who we are** is the single Company H1 and remains clear at desktop, tablet, and mobile widths without changing the approved hero composition. **Passed.**

Verification: focused Company tests passed 36/36; the production build completed through the focused Playwright server; focused Company browser acceptance passed 3/3 at desktop, tablet, and mobile widths; lint passed with 0 errors and the same 7 existing shared-UI Fast Refresh warnings.

Intended commit: `refactor: simplify company hero headline`.

## Company section refinement — Team profile dialogs

Status: **Implemented and verified locally; not pushed or deployed.**

- [x] Replace the long inline Team biographies with image-led cards containing only portrait, name, role, and a plus trigger.
- [x] Open each complete profile in a large accessible dialog modeled on the interaction pattern reviewed at `radiusbuilt.com/company` without copying its branding.
- [x] Preserve each approved biography, license, email, telephone number, **Contact Agent**, and **View Listings & Transactions** action inside the dialog.
- [x] Support keyboard focus trapping, Escape/close behavior, return focus, visible focus treatment, and reduced motion.
- [x] Give mobile dialogs a fixed portrait region and independently scrollable profile content so the close action remains available.

Gate: the Team section presents three concise image-led cards; every plus opens the correct complete profile; all verified actions remain accurate; and dialogs work without overflow or inaccessible content at desktop, tablet, and mobile widths. **Passed.**

Checkpoint files and route: `src/components/team/TeamRoster.tsx`, `src/styles/gala.css`, `src/test/gala-pages.test.tsx`, `e2e/september-client-release.spec.ts`, `OVERNIGHT-BUILD-PLAN.md`, and this plan; `/company#team` and legacy `/team`.

Verification: full Vitest passed 116/116; production build passed; lint passed with 0 errors and the same 7 existing shared-UI Fast Refresh warnings; focused Company/Team browser acceptance passed 3/3 at desktop, tablet, and mobile widths, including every dialog's contact links, portfolio path, close behavior, and focus return. Visual QA confirmed the three-card presentation, wide desktop profile, mobile portrait/content split, independently scrollable long biography, persistent close control, and reachable actions. No form was submitted.

Intended commit: `refactor: add team profile dialogs`.

## Exact next action

Present the updated local `/company#team` interaction for user review and wait for the user to identify the next Company section. Do not push or deploy until explicitly requested.
