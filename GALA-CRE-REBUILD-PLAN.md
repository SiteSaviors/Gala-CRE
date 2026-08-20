# Gala CRE Group Rebuild Guide

## Creative brief

- **Positioning:** CRE, Simplified.
- **Audience:** Commercial property owners, private investors, landlords, tenants, and business operators.
- **Market:** Raleigh-Durham and the Research Triangle.
- **Visual direction:** Premium editorial layouts, commercial property photography, restrained motion, black, white, silver, gold, and yellow. No blue interface accents.
- **Primary conversion:** Talk to an Advisor.
- **Content rule:** Radius-specific projects, people, statistics, partner logos, contact details, and claims are not approved for Gala.

## Reference-site insights

- Franklin Street makes client objectives and integrated service access immediately understandable.
- Foundry Commercial separates service expertise from asset-class expertise, making complex offerings easier to scan.
- Gala should adopt those information patterns without copying either firm’s claims, language, or visual identity.
- Gala’s residential website remains a separate customer journey and appears only as an affiliate footer link.

## Sitemap

- `/` Home
- `/services` Services overview
- `/services/brokerage`
- `/services/investment-sales`
- `/services/development-services`
- `/services/capital-markets`
- `/services/property-management`
- `/properties` Searchable property catalog
- `/properties/:slug` Property detail
- `/company` Company and team
- `/contact` Advisor inquiry

Legacy routes redirect from `/what-we-do`, `/projects`, and `/projects/:slug`.

## Phase tracker

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | Brand separation, guide, routes, navigation, metadata | Client Review |
| 2 | Homepage and service pages | Client Review |
| 3 | Property catalog and details | In Progress |
| 4 | Company, contact endpoint, SEO, launch QA | In Progress |

## Page requirements and status

| Route | Required sections | Status |
| --- | --- | --- |
| `/` | Commercial hero, owner/investor value, three client paths, five pillars, featured properties, asset expertise, Triangle market, team preview, advisor CTA | Client Review |
| `/services` | Service overview, five service pathways, asset classes, advisor CTA | Client Review |
| `/services/:slug` | Service positioning, capabilities, intended audience, related expertise, advisor CTA | Client Review |
| `/properties` | Keyword search, asset/offering/status filters, active-first ordering, cards, intake/no-results states | In Progress: awaiting listings |
| `/properties/:slug` | Gallery, facts, overview, highlights, brochure, platform links, assigned advisor and property-aware inquiry | In Progress: awaiting listings |
| `/company` | Commercial story, principles, Triangle focus, approved team roster, advisor CTA | In Progress: awaiting company/team copy |
| `/contact` | Multi-intent form, property context, server validation, honeypot and Resend delivery | In Progress: awaiting inbox configuration |

## Public interfaces

- `src/content/services.ts` is the shared typed service source for overview and detail pages.
- `src/content/properties.ts` owns the typed `Property` model, lookup, active-first ordering, featured selection, and filtering.
- `src/lib/contactForm.ts` defines browser submission fields and source-page context.
- `api/contact.ts` is the only server endpoint and sends validated inquiries through Resend.
- Legacy `/what-we-do` and `/projects` URLs redirect through both React and Vercel configuration.

## Client content intake

- [ ] Final service copy and approved service claims
- [ ] Legal entity name, broker-in-charge, licenses, and disclosures
- [ ] Confirmation that Property Management is directly provided by Gala
- [ ] Team names, titles, bios, headshots, and contact details
- [ ] Primary advisor inquiry email
- [ ] Gala Investments and Gala Capital URLs
- [ ] Property PDFs, platform URLs, facts, status, images, and image-use approval
- [ ] Approved statistics, testimonials, transaction claims, and client logos
- [ ] Final social links and office information

## Property intake checklist

- Property name and address
- Asset type and offering type
- Active, under-contract, or closed status
- Price/rate, building size, and acreage display
- Approved summary, overview, and highlights
- Hero image and gallery
- Brochure PDF
- Crexi, LoopNet, CoStar, or other approved links
- Assigned advisor
- Featured and sort-order decisions

## Launch blockers

- Legal and brokerage disclosures are not yet confirmed.
- Direct Property Management representation requires written confirmation.
- Property records must be added from client-approved listing data.
- Resend environment variables and destination inbox must be configured in Vercel.
- Affiliate URLs for Gala Investments and Gala Capital are pending.

## Acceptance criteria

- No visible Radius branding or Radius-specific business claims.
- No blue interface accents; photography may contain natural blue tones.
- Responsive at mobile, tablet, desktop, and wide desktop sizes.
- Keyboard-accessible navigation, filters, forms, and property actions.
- Reduced-motion preferences respected.
- Property filtering, detail routes, legacy redirects, and inquiry context tested.
- Build, lint, unit tests, and Playwright visual checks pass before production merge.

## Deployment log

| Date | Environment | Commit | Approval |
| --- | --- | --- | --- |
| 2026-08-19 | Local feature branch | Uncommitted | Automated checks passed; visual/client review pending |
| Pending | Vercel Preview | Pending | Pending |

## Environment contract

Configure these values for Preview and Production in the Gala Vercel project:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

The sender must use a domain verified in Resend. Do not reuse Radius project environment variables or Vercel project linkage.
