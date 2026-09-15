# Gala CRE meeting readiness

Updated: September 15, 2026

## Current result

The compact property and service rebuild is complete on `codex/compact-listings-services`. Every current property record now uses one concise evaluation system, and every advertised service capability uses the shorter visual service system. The branch is locally verified and ready for client review; it has not been merged, pushed, or deployed.

No form was submitted and no external message was sent during QA.

## Release gate

- **31 property and service routes** passed production-preview browser QA at 1440×900, 834×1112, and 390×844: **93 responsive route renders**.
- **7/7 Playwright journeys passed**, covering route structure, media, catalog filters, map markers, inline galleries, mobile video playback, inquiry preselection, keyboard navigation, and reduced motion.
- **111/111 unit and integration tests passed** across 18 test files.
- Production build passed.
- Lint passed with **0 errors** and 7 unchanged Fast Refresh warnings in shared UI primitives.
- All audited routes have a visible primary heading, main-content target, runtime title, description, canonical URL, Open Graph/Twitter metadata, working internal destinations, loaded images, and no horizontal overflow.
- All eight property pages expose their inline gallery, map, advisor/inquiry context, related opportunities, and only the documents or videos actually assigned to that record.
- Family Farm Road, Church Street, and Lexington videos load playable mobile metadata, show poster images and controls, and do not autoplay.
- Closed records without approved documents remove that module cleanly instead of displaying an empty state.
- Property and service CTAs carry the correct property, inquiry, and capability context into Contact.
- The local production preview emits one expected 404 for Vercel Analytics' `/_vercel/insights/script.js`; the platform supplies that endpoint after Vercel deployment. The browser suite excludes only that exact local-preview request.

## What changed materially

### Property experience

- Replaced long editorial detail pages with a shared, compact brokerage-listing workspace.
- Moved identity, economics, core facts, advisor, documents, and inquiry actions into the primary evaluation area.
- Added selectable inline galleries without a lightbox.
- Integrated maps and optional videos into restrained media modules.
- Removed the early 1031 interruption and repeated marketing narratives.
- Kept active and closed records distinct and hid unsupported facts.

Average property-page height fell from approximately **7,345px to 5,125px on desktop** and **9,169px to 7,493px on mobile**. Active listings still run longer on mobile because their facts, diligence, video, and advisor information stack vertically, but the sequence is now scannable and transaction-focused.

| Property | Desktop before → after | Mobile before → after |
| --- | ---: | ---: |
| 2301 Lackey Street | 6,959 → 4,767px | 9,216 → 7,551px |
| 5047 Yadkin Road | 7,437 → 5,110px | 9,638 → 7,678px |
| 611 & 703 Church Street | 8,401 → 5,289px | 10,094 → 8,110px |
| 5911 Family Farm Road | 8,626 → 5,361px | 10,273 → 8,180px |
| Lexington Townhome Site | 8,738 → 5,698px | 10,861 → 8,651px |
| 802 Bragg Boulevard | 7,100 → 5,163px | 9,329 → 7,627px |
| 202 North Main Street | 5,783 → 4,776px | 6,958 → 6,049px |
| 10416 Chapel Hill Road | 5,716 → 4,839px | 6,981 → 6,097px |

### Service experience

- Rebuilt the Services index as a concise image-led gateway.
- Standardized capability pages around hero → decision/value → process → deliverables → related work → CTA.
- Preserved distinct owner, occupier, investment-sales, development, capital, and partner-management narratives.
- Added purposeful generic context imagery where the prior pages repeated assets or lacked visual support.
- Reconciled desktop mega-menu, mobile navigation, footer, related links, and Contact inquiry routing.

Average capability-page height fell from approximately **7,140px to 4,206px on desktop** and **9,997px to 6,397px on mobile**. Landlord and Tenant Representation each fell by roughly half while retaining their separate client journeys. Industrial remains near 4,100px because it had already been partially shortened before this rebuild.

## Recommended client walkthrough

1. `/` — open with the established brand and homepage system.
2. `/properties` — demonstrate search, status filters, grid/map switching, and the full inventory.
3. `/properties/2301-lackey-street` — show the compact commercial-listing standard, inline gallery, facts, diligence, advisor, and inquiry path.
4. `/properties/5911-family-farm-road` or `/properties/611-703-church-street` — show a media-rich land listing with controlled video.
5. `/services` — show the five service pillars and direct capability discovery.
6. `/services/investment-sales/industrial` — demonstrate the concise premium capability standard.
7. `/services/brokerage/tenant-representation`, `/services/development-services/development-oversight`, and `/services/capital-markets/capital-strategy` — use only as breadth proof if the client wants to inspect additional paths.
8. `/team` and `/contact` — close with people and the correctly routed conversion journey.

## Client inputs still needed

These items do not block the meeting build; the site currently omits or qualifies them.

- **Yadkin:** underlying plan/approval, zoning, parcel, access, utility, and physical-condition records.
- **Church Street:** 703/711 address resolution, legal parcels, surveyed acreage, approval/site-plan evidence, and combined-sale structure.
- **Family Farm:** legal parcels, survey, zoning confirmation, private-road obligations, residence/well/septic condition, and final document-publication choices.
- **Lexington:** current asking price, gross surveyed acreage, current/transferable approval status, and publication rights for third-party diligence artwork/documents.
- **802 Bragg:** final consideration, closing date, and preferred Gala transaction credit.
- **202 North Main:** exact Gala role, price classification, advisor credit, and approved non-MLS photography.
- **10416 Chapel Hill:** 10414/10416 transaction structure, economics, preferred credit, and approved non-MLS photography.
- **Services:** approved case studies, quantified outcomes, testimonials, specialist credentials, and additional project photography if Gala wants proof beyond the current service explanation.
- **Team/social:** Goverdhan's approved photograph/biography/contact details and authoritative social-profile URLs where still outstanding.

## Production configuration still needed

- Configure the approved form-delivery provider, verified sender, and `RESEND_API_KEY`.
- Careers and 1031 recipient configuration is prepared for `beth@galacregroup.com` and `gaurang@galacregroup.com`; confirm those environment values in Vercel before enabling submissions.
- Set `FORM_ALLOWED_ORIGINS` to the final production domain.
- Configure durable Redis/KV rate limiting for multi-instance production use.
- Approve any optional Google record destination, access, retention policy, webhook, and secret.
- Approve the privacy, recruiting, brokerage, and 1031 disclosures before collecting production personal information.
- Set `VITE_SITE_URL` if the final canonical domain changes from `https://gala-cre.vercel.app`.

Until the private delivery variables are configured, forms fail safely without exposing recipients or credentials.

## Metadata and performance notes

- Runtime route-specific metadata is verified. Because this is a client-rendered single-page application, crawlers that do not execute JavaScript receive the site-wide static fallback; true route-specific link previews require prerendering or server rendering.
- An inlined SVG used by the two photography-pending closed records now falls back to the public Gala share image, preventing invalid `data:` URLs in social metadata.
- The main JavaScript bundle is approximately **752KB minified / 208KB gzip**. This is a future code-splitting opportunity, not a meeting blocker.
- The current hero video is approximately **8.1MB** in the production bundle. Property videos are lazy-loaded and range from approximately 2.9MB to 7.4MB.
- Browserslist data is stale and can be refreshed in a maintenance pass; it does not affect this release gate.

## Review and deployment state

- Local review: `http://localhost:8080/`
- Current production: `https://gala-cre.vercel.app` — responding, but still represents the previously deployed `main` branch.
- Release candidate: `codex/compact-listings-services` — locally complete and verified, awaiting explicit approval to merge, push, and deploy.

Local server command:

```bash
cd /Users/admin/Downloads/Gala-CRE
npm run dev -- --host 0.0.0.0 --port 8080
```
