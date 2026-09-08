# Gala CRE Launch Readiness

Updated: September 8, 2026

## Current result

The Careers and 1031 investor journeys are implementation-complete and pass the current launch QA gate. Their public forms validate accessibly, preserve entered data after a delivery failure, reject spam and invalid exchange timelines, retain source context, and route only through the private server adapter. No live application, inquiry, email, or Google record was sent during testing.

The broader public route matrix also passed responsive browser QA at desktop, tablet, and mobile widths with no horizontal overflow, broken images, missing primary headings, missing main-content targets, page-specific console errors, or absent runtime canonical/social metadata.

## Verified

- 74 automated tests pass across page rendering, route coverage, contact/form behavior, server routing, property data, and scroll behavior.
- Production build passes.
- Lint passes with zero errors and seven pre-existing Fast Refresh warnings in shared UI primitives.
- 31 public routes pass at 1440 × 900, 820 × 1180, and 390 × 844: 93 responsive checks total.
- Keyboard focus begins with a visible “Skip to main content” link and moves to the first invalid form field after submit.
- Checkbox groups and consent controls expose their error messages through `aria-describedby` and `aria-invalid`.
- Careers and investor forms expose loading, success, and failure states and retain data after failed delivery.
- 1031 timelines require the applicable dates, reject invalid calendar dates, and reject deadlines that move backward. Gala does not calculate or guarantee tax deadlines.
- Honeypot, completion-time rejection, request-size validation, optional origin allowlisting, and rate limiting are implemented and tested without external delivery.
- Careers and investor notifications select independent private recipients; optional Google synchronization preserves form type and source-page context in mocked integration tests.
- Mobile navigation, property search/reset, contextual 1031 CTAs, and Contact inquiry preselection pass browser checks.
- Runtime canonical, Open Graph, and Twitter metadata are present; Careers and the 1031 route are included in the sitemap.
- Careers privacy/licensing language and the 1031 tax, legal, accounting, qualified-intermediary, and outcome boundaries are present.
- The active desktop hero video was reduced from 23.8 MB to 15.7 MB. Mobile and reduced-motion users receive the poster without loading the full video binary.

## Required before enabling production submissions

1. Confirm the final Careers recipient, currently intended for `beth@galacregroup.com`.
2. Confirm the investor/1031 recipient.
3. Configure a verified Resend sender and `RESEND_API_KEY`.
4. Set `FORM_ALLOWED_ORIGINS` to the final production origin.
5. Configure durable Redis/KV rate limiting for multi-instance deployment.
6. Decide whether Google record synchronization is required; if so, approve the destination, access, retention policy, webhook, and secret.
7. Review and approve the inline privacy, recruiting, brokerage, and 1031 disclosures. Add a full public privacy policy before collecting production personal information.
8. Set `VITE_SITE_URL` to the final canonical domain and verify deployed social-card rendering with the target platforms. The current single-page build provides a site-wide static fallback; route-specific crawler previews may require prerendering or server rendering.

Until the private delivery variables are configured, the form endpoint fails safely with a generic unavailable message and does not expose recipients or credentials.

## Remaining performance recommendation

The optimized desktop hero loop is substantially smaller but remains 15.7 MB. It is suitable for the local meeting demonstration, but a sub-5 MB web encode or image-sequence alternative should be produced before a bandwidth-sensitive public launch. The original 23.8 MB source remains in the repository and is no longer included in the production bundle.

## Local review

```bash
cd /Users/admin/Downloads/Gala-CRE
npm run dev -- --host 0.0.0.0 --port 8080
```

Open `http://localhost:8080/`, then review `/careers` and `/investors/1031-exchange` without submitting live data.
