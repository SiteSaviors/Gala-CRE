# September client revision release handoff

Last verified: September 22, 2026

## Live release

- Source branch: `codex/september-client-updates`
- Release branch: `main`
- Starting release baseline: `main` / `origin/main` at `e98d8d4`
- Certified content commit: `931e87e`
- Vercel project: `gala-cre`
- Production URL: `https://gala-cre.vercel.app`
- Production deployment: `dpl_C3X2F8YTXDY4dbDmRVdcmxmcxsnk` reached **Ready** and owns the production alias
- Promotion state: the certified branch was fast-forwarded into `main`, pushed to GitHub, deployed to Vercel, and smoke-tested without submitting forms

The current branch contains the complete September client revision set: supplied real Team portraits and approved contacts/biographies, shared agent/property relationships, Team and Contact actions, labeled Home navigation, the approved property order, removal of public property documents and internal media-package access, and the rebuilt conditional listing-video layout.

## Verified release gate

- All three Team cards use the approved identity records, portraits, email addresses, telephone numbers, **Contact Agent**, and **View Listings & Transactions** actions.
- Gaurang's portfolio returns four active listings and two closed transactions in the approved order.
- Leigh's portfolio returns Family Farm Road.
- Goverdhan's portfolio returns the 10416 Chapel Hill Road closing rather than an inaccurate empty state.
- 10416 Chapel Hill Road credits Gaurang and Goverdhan without assigning unsupported individual transaction roles or publishing economics.
- Desktop and mobile navigation expose Home as the first labeled destination; the logo continues to link home.
- The public catalog order is Church Street, Family Farm, Lexington, Lackey, Yadkin, Bragg, North Main, then Chapel Hill.
- Every property inquiry carries the property slug; assigned properties also carry the primary verified advisor. Contact displays the correct property and inquiry type without submitting a form.
- No property document, offering file, diligence download, media-package URL, dormant brochure field, PDF, Word file, spreadsheet, or archive is present in the public source or production bundle.
- Church Street, Family Farm, and Lexington videos use supplied posters, controls, `playsInline`, lazy source loading, and no autoplay. Non-video properties render no empty player.
- Desktop, tablet, and mobile route matrices pass without horizontal overflow, broken internal paths, missing images, or application console errors.
- Keyboard skip navigation, Services-menu focus/Escape behavior, visible focus, and reduced-motion behavior pass.

## Verification commands

```bash
npm test -- --run
npm run build
npm run lint
npm run test:e2e
```

Expected non-blocking notices are the existing stale Browserslist-data message, the large-chunk build notice, and seven shared-UI Fast Refresh lint warnings. There are no lint errors.

## Production form configuration blocker

`vercel env ls` returned **no environment variables** for the linked `gala-cre` project during Phase 5. The Careers, 1031, and general Contact interfaces therefore fail safely rather than delivering production submissions. Do not represent production form delivery as active until the following private configuration is approved and verified:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `CAREERS_TO_EMAIL=beth@galacregroup.com,gaurang@galacregroup.com`
- `INVESTOR_TO_EMAIL=beth@galacregroup.com,gaurang@galacregroup.com`
- `FORM_ALLOWED_ORIGINS=https://gala-cre.vercel.app` (plus any approved canonical domain)
- Durable KV/Redis rate-limit credentials for multi-instance production use
- Optional Google synchronization URL/secret only after the destination and retention policy are approved

The API tests verify that the Careers and 1031 adapters support the two approved recipients without exposing those values in the client bundle. No test form was submitted.

## Remaining client inputs

- 202 North Main Street advisor credit remains unassigned because no attribution was supplied.
- The 10414/10416 Chapel Hill transaction structure, economics, and individual team roles remain intentionally unpublished.
- Existing property fact, approval, photography, social-profile, and form-disclosure gaps remain recorded in `PROPERTY-DATA-REGISTER.md`.

## Completed promotion checks

1. Confirmed `main` and `origin/main` shared the certified baseline with no divergence.
2. Fast-forwarded `main` through the six verified September revision commits and pushed it to GitHub.
3. Deployed the linked `gala-cre` project and confirmed the production alias returns HTTP 200.
4. Exercised all 31 property/service routes at desktop, tablet, and mobile widths.
5. Rechecked Team contacts and portraits, advisor portfolios, the catalog order, shared Chapel Hill attribution, inquiry context, property videos, privacy controls, keyboard/focus behavior, console health, and horizontal overflow.
6. Submitted no forms and left delivery disabled pending approved private configuration.

Local review command:

```bash
cd /Users/admin/Downloads/Gala-CRE
npm run dev -- --host 0.0.0.0 --port 8080
```
