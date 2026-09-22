# Gala CRE property data register

Last reviewed: September 22, 2026
Purpose: Control which listing facts are safe to publish and identify the client material still required.

## Publishing rules

- **Verified public:** Present on the current Gala/Crexi public listing and internally consistent.
- **Represented by offering:** A marketing assertion that can be attributed to the listing but still requires buyer verification.
- **Client confirmation needed:** Conflicting, ambiguous, or time-sensitive. Do not state as an unqualified fact.
- **Document needed:** Do not describe as approved, permit-ready, environmentally cleared, or contractually required without the underlying material.
- **Publication rights unresolved:** File access or an MLS display does not establish a right to republish photography, video, plans, documents, or third-party copy. Keep the asset private until the client confirms the applicable license or ownership.
- **Internal only:** Signed agreements, owner contact information, signatures, and non-public diligence records must not be placed on the public website.
- **No public property-document distribution:** Per the client's September 21, 2026 direction, listing documents, property documents, diligence packages, approval packages, surveys, flyers, and downloadable media packages are inquiry-only. Public marketplace listing links may remain only as secondary listing references; they must not be presented as downloadable property documents. This rule supersedes older property-specific questions about making documents downloadable.
- When sources conflict, omit the disputed field from prominent marketing or label it approximate and explain the verification requirement.
- The publication posture in this register is a conservative content-control decision, not a legal opinion.

## Team records

| Field | Working value | Status |
| --- | --- | --- |
| Gaurang Gala | CEO \| BIC; gaurang@galacregroup.com; 910-578-2828; NC 283149 | Name, title, email, phone, and new real photograph client-supplied; new web asset registered September 22, 2026 |
| Leigh Roach | Agent; leigh@galacregroup.com; (919) 886-9181 | Biography, email, phone, and replacement portrait client-supplied; new web asset registered September 22, 2026 |
| Dr. Goverdhan Reddy Vavilala | Agent; goverdhan@galacregroup.com; (919) 462-1494 | Full public name, role, email, phone, full biography, and portrait client-supplied; connected to the shared Team record September 22, 2026 |

## September 21 client revision register

This section records the latest client direction and controls the next implementation checkpoints. The email screenshots are treated as internal references and are not copied into the public application bundle.

### Registered portrait assets

The supplied originals remain unchanged in `/Users/admin/Downloads`. Web-ready derivatives were created without generative alteration or clothing recoloring and visually inspected against the originals.

| Team member | Supplied original | Registered web asset | Dimensions | File size | Current public use at audit time |
| --- | --- | --- | --- | --- | --- |
| Gaurang Gala | `Gaurang.jpg` | `src/assets/team/gaurang-gala-2026.webp` | 1600 × 1067 | 64 KB | Connected to the shared Team record; used by Team, Contact, and property-advisor presentations. The separate homepage introduction and Careers editorial image remains unchanged. |
| Dr. Goverdhan Reddy Vavilala | `Gov.jpeg` | `src/assets/team/goverdhan-vavilala-2026.webp` | 1200 × 1800 | 172 KB | Connected to the shared Team record; used by Team, Contact, and shared transaction presentations. |
| Leigh Roach | `Leigh.jpeg` | `src/assets/team/leigh-roach-2026.webp` | 1066 × 1600 | 100 KB | Connected to the shared Team record; used by Team, Contact, and Family Farm advisor presentations. |

### Authoritative property-catalog order

The user's written correction supersedes the numbered screenshot and the current `sortOrder` values:

1. 611 & 703 Church Street — Active
2. 5911 Family Farm Road — Active
3. Lexington Townhome Site — Active
4. 2301 Lackey Street — Active
5. 5047 Yadkin Road — Active
6. 802 Bragg Boulevard — Closed
7. 202 North Main Street — Closed
8. 10416 Chapel Hill Road — Closed

The structured `sortOrder` values now implement this sequence. The catalog, advisor-filtered subsets, related-property selection, and the homepage's active Featured Listings subset all derive from that shared order. The homepage change follows the user's explicit September 22 direction and therefore supersedes the earlier plan note to keep its curated order independent.

### Public removal targets

| Target | Prior audit finding | Current treatment |
| --- | --- | --- |
| Property media package | Family Farm exposed a NestVisions download-center URL through a “Property media package” / “Open Media Package” card. | Complete: the card, label, and URL are removed. The approved local listing video remains a separate inline media asset. |
| Property-document CTA | Six records rendered a “View Documents” action when `listingPage.documents.items` was populated: Lackey, Yadkin, Church, Family Farm, Lexington, and Bragg. | Complete: the CTA and document-card renderer are removed and replaced by property/advisor inquiry context. |
| Property-document data | All eight records contained a `documents` object; 202 North Main and 10416 Chapel Hill used empty item lists only for close-section copy. | Complete: the public document schema is retired; inquiry closes and disclosures are independent of document data. |
| Legacy brochure path | The generic fallback in `src/pages/PropertyDetail.tsx` could render `brochurePdf`, although no current structured property supplied one. | Complete: the field and public brochure/download renderer are removed, preventing accidental reintroduction through structured data. |
| Internal reference material | Signed agreements, raw diligence, source folders, and client email screenshots were not imported into the application. | Verified unchanged: they remain outside `src`, `public`, and the production bundle. |

Public marketplace pages may remain available as secondary “View Listing” links where the source is current. They are not substitutes for Gala-controlled document downloads and do not authorize republishing third-party documents.

### Agent-to-property audit

| Property | Status | Structured advisor assignments | Latest client direction / implementation result |
| --- | --- | --- | --- |
| 611 & 703 Church Street | Active | Gaurang Gala — Listing Advisor | Retained; the assignment resolves through the shared Team record. |
| 5911 Family Farm Road | Active | Leigh Roach — Listing Advisor | Retained with supplied email, phone, biography, and replacement portrait. |
| Lexington Townhome Site | Active | Gaurang Gala — Listing Advisor | Retained; the assignment resolves through the shared Team record. |
| 2301 Lackey Street | Active | Gaurang Gala — Listing Advisor | Retained; the assignment resolves through the shared Team record. |
| 5047 Yadkin Road | Active | Gaurang Gala — Listing Advisor | Retained; the assignment resolves through the shared Team record. |
| 802 Bragg Boulevard | Closed | Gaurang Gala — Listing representation | Retained as structured transaction credit. |
| 202 North Main Street | Closed | Unassigned | No new advisor credit supplied. |
| 10416 Chapel Hill Road | Closed | Gaurang Gala; Dr. Goverdhan Reddy Vavilala | Client-directed shared credit is implemented. Individual roles remain omitted because none were supplied. |

Properties now use ordered `advisorAssignments`, allowing multiple agents and an optional per-assignment role. Transactions derive those assignments from the property record instead of maintaining duplicate advisor fields. The advisor-filtered catalog preserves the selected agent, defaults to all statuses, labels the result as listings and completed transactions, and continues to sort active inventory before closed work. Under-contract associations are supported by the same status-independent relationship model; no current public property is classified under contract.

### Listing-video layout audit

- Approved local, web-optimized videos exist for Church Street, Family Farm Road, and Lexington Townhome Site.
- `PropertyVideo` already uses native controls, `playsInline`, `preload="none"`, a poster image, and Intersection Observer loading. It does not autoplay.
- The current renderer places video later in a dark Location & Media section, alongside the map when both exist.
- The client reference instead places the listing video in the right column of The Opportunity section for video-enabled properties, with the three highlight points moved into a full-width row below the opportunity statement and video.
- Properties without video should retain the concise statement-and-highlights opportunity layout without an empty media slot.

### Phase 0 conclusion

All supplied assets, requested removal targets, current assignments, catalog statuses/order, portrait usages, and existing video behavior are identified. No supplied fact has been inferred. Phase 0 intentionally registers assets and implementation boundaries without changing public behavior.

### Phase 3 publication controls implemented

- Removed the public property-document type and every per-property document record from the shared listing schema.
- Removed the Family Farm NestVisions download-center URL, the internal-facing media-package card, all topic-specific document request URLs, and the dormant generic `brochurePdf` field and renderer.
- Replaced active listing document areas with a single **Request Property Information** pathway. The property slug and first assigned advisor are carried into Contact; the Contact submission adapter explicitly writes those URL-derived values into the outbound payload. North Main remains property-only because no advisor attribution is confirmed.
- Preserved current public marketplace references as secondary **View on Crexi**, **View on LoopNet**, or equivalent links without presenting them as Gala-hosted documents.
- Verified that no PDF, Word, archive, or spreadsheet files are tracked under `src` or `public`, and that the production bundle contains no such files or forbidden media-package/download strings.
- Verified the approved order in the catalog, advisor-filtered portfolios, and homepage active subset through model, rendered-page, browser, and production-preview regression coverage.

## Homepage track record and selected transactions

This table controls which completed transactions may feed the future homepage proof section. Detailed property notes and source links remain in the individual records below. A transaction is not homepage-ready merely because a marketplace or article mentions the property.

| Property | Status / closing date | Asset and location | Gala role | Publishable price | Approved homepage photography | Advisor | Detail route | Homepage posture |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10416 Chapel Hill Road | Closed July 29, 2026 | Commercial land; Morrisville, NC | Gala listing involvement documented | None confirmed | None; supplied MLS photography is not cleared | Gaurang Gala; Dr. Goverdhan Reddy Vavilala | `/properties/10416-chapel-hill-road` | Publishable in qualified form. The supplied record supports 10416 only; do not combine it with 10414 until the client confirms the relationship and preferred presentation. Individual transaction roles are not published because none were supplied. |
| 802 Bragg Boulevard | Closed; date not supplied | Retail / convenience store and automotive service; Fayetteville, NC | Listing representation documented | None confirmed | Three former-listing images are already in use under the client's direction; separate rights documentation is not recorded | Gaurang Gala | `/properties/802-bragg-boulevard` | Best current visual candidate, with closing date and economics omitted. |
| 202 North Main Street | Closed July 30, 2026 | Commercial / retail; Fuquay-Varina, NC | Not confirmed | None confirmed | None; supplied MLS photography is not cleared | Not confirmed | `/properties/202-north-main-street` | Publishable in qualified, non-photographic form; not yet suitable for a visual homepage card. |
| Watkins / Alta Watkins | Transaction status not established | Proposed multifamily development; Watkins Road, Morrisville, NC | Not established | None | None; saved article imagery is not project-specific or cleared | Not established | None | Blocked. The saved article documents a 2025 proposal, not a Gala transaction or closing. |

No additional completed transactions are currently represented in the structured property catalog. The older note connecting 10414 Chapel Hill Road to the 10416 closing is retained as a client follow-up item, not a separate publishable transaction record.

### Nullable track-record metrics

All homepage values are intentionally null. A metric may be populated only after Gala confirms the value, measurement basis, and applicable reporting period.

| Metric | Current value | Required definition before publication |
| --- | --- | --- |
| Closed transaction volume | Null | Career-wide or firm-wide; sale consideration or another defined basis; start and end dates |
| Transactions completed | Null | Career-wide or firm-wide; sales only or sales and leases; start and end dates |
| Acreage or square footage represented | Null | Which unit and transaction types are included; whether active listings are excluded; start and end dates |
| Years of experience | Null | Individual, combined team, or firm operating history; verified start year |

The application exposes these through `trackRecordMetrics` and filters public output through `publishedTrackRecordMetrics`; null values must never render as zeroes, blanks, or placeholders.

## 2301 Lackey Street

Source: [Crexi](https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st)

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 2301 Lackey Street, Lumberton, NC 28360 | Verified public |
| Asking price | $549,000 | Verified public |
| Site area | 0.70 acres | Verified public |
| Type | Retail | Verified public |
| Subtype | Convenience store / gas station | Verified public |
| Current condition | Closed/vacant in public offering | Confirm whether still current |
| Fuel agreement | No fuel contract | Verified in listing title; confirm transaction documents |
| Fuel system | Tanks and piping represented as installed in 2001; double-wall fiberglass | Represented by offering; tank records needed |
| Environmental / removal | Seller can remove tanks and provide a clean bill from NCDEQ before sale | Document needed; clarify whether optional or contractual |
| Adjacent parcels | Parcels behind and west are described as also available | Confirm whether included in $549,000 and 0.70 acres |
| I-95 construction | Listing attributes closure to nearby construction | Time-sensitive; verify before reuse |
| Zoning | Not established by the current public detail fields | Client confirmation/document needed |
| Building area | Not published in the current listing details | Client confirmation needed |

Client questions:

1. Which parcel IDs and improvements are included in the $549,000 offering?
2. Are the adjacent parcels included, optional, or separately priced?
3. Is the seller obligated to remove the tanks before closing, and what NCDEQ document will be delivered?
4. Is I-95 construction still affecting operation or access?
5. What are the zoning, building area, access points, and current utility conditions?

## 5047 Yadkin Road

Source: [Crexi](https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center)

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 5047 Yadkin Road, Fayetteville, NC 28303 | Verified public |
| Asking price | $829,000 | Verified public |
| Site area | 3.46 acres | Verified public |
| Type / subtype | Land / Commercial | Verified public |
| Shopping-center plan | Represented as fully approved | Approved plan and approval record needed |
| Permit readiness | Represented as permit-ready with standards satisfied | Document needed before unqualified use |
| Access / circulation | Ingress, egress, traffic flow, parking, and circulation represented as approved | Site plan needed |
| Buffers | Represented as incorporated | Site plan needed |
| Utilities | Availability and approved connections represented by offering | Utility evidence needed |
| Zoning | Not shown in the current public detail fields | Confirm jurisdiction and zoning; historical material is not enough |
| Marketing description | Current field contains only “For Sale” | Replace with concise, evidence-based overview |
| Photos | Three on Crexi | Site plan, boundary aerial, and additional site context needed |

Client questions:

1. Can we receive the approved site plan as a publication-quality PDF or image?
2. Which jurisdiction approved it, on what date, and under what case or permit number?
3. What approvals remain before construction can begin?
4. What are the parcel ID, zoning, frontage, access points, utility providers, and wetland/flood conditions?
5. Which flyer or diligence materials can be downloadable versus inquiry-only?

## 611–703 Church Street

Source: [Crexi](https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560)

| Field | Working value | Status / action |
| --- | --- | --- |
| Marketing title | 611 & 703 Church Street | Public title/description |
| Map addresses | 611 and 711 Church Street | Conflicts with marketing title; client confirmation required |
| Asking price | $1,190,000 | Verified public |
| Combined site area | Approximately 1.09 acres in headline/description | Conflicts with 1.000 structured field; survey needed |
| Type / subtype | Land / Commercial | Verified public |
| Offering composition | Two locations marketed together | Verified public; exact parcels needed |
| Childcare approval | Approval for a licensed daycare facility represented by offering | Approval document needed |
| Base zoning | Represented as supporting daycare | Zoning documentation needed |
| Demographic demand | Dense residential and strong family demographics asserted in copy | Demographic source needed or soften |
| RTP / employment access | Proximity asserted in copy | Verify distances and corridors before quantifying |
| Photos | Five aerials on Crexi | Existing approved assets; annotate boundary if possible |
| Video package | One 508,017,685-byte QuickTime source plus a [NestVisions hosted player](https://media.nestvisions.com/videos/019f960d-edc5-7270-9b09-b63f8e27ad1a) | A 7.0 MB, 480×270 H.264/AAC derivative is packaged for the property page and loaded only when the player nears the viewport; the half-gigabyte source remains out of the application bundle |
| Listing advisor | Gaurang Gala | Existing verified listing record; retain unless the client changes the assignment |

Client questions:

1. Is the second property 703 or 711 Church Street?
2. What are the two parcel IDs and surveyed combined acreage?
3. Is 1.09 acres the correct combined area, and why does Crexi show 1.000 in Details?
4. Can we receive the daycare approval, site plan, zoning confirmation, and any conditions of approval?
5. Is the offering intended for one combined sale only?

## 802 Bragg Boulevard

Sources: [Crexi](https://www.crexi.com/properties/1810031/north-carolina-valero), its current public asset/gallery API records, [LoopNet](https://www.loopnet.com/Listing/802-Bragg-Blvd-Fayetteville-NC/39012701/), and the client's September 8 instruction to present the property as recently sold.

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 802 Bragg Boulevard, Fayetteville, NC 28301 | Verified across current public sources; marketplace URLs abbreviate Boulevard as Blvd |
| Transaction status | Recently sold / closed | Client-confirmed; Crexi returns `isSold: true`; LoopNet says the property is no longer advertised |
| Sale price | Not published | Do not reuse former asking prices as closing consideration |
| Closing date | Not published | Client confirmation needed before adding a date |
| Property type / subtype | Retail / convenience store | Verified by Crexi; LoopNet classifies the record as retail / auto repair |
| Building area | 2,529 SF | Verified across Crexi and LoopNet |
| Site area | 1.15 acres | Verified across Crexi and LoopNet |
| Buildings / stories | One / one | Verified by Crexi |
| Year built | 1987 | Published by LoopNet; Crexi's current sold record masks the year |
| Zoning | C3 | Reported by Crexi and LoopNet; municipal record controls |
| Former operating components | Convenience store, automotive service, and car wash | Represented by the former Crexi marketing description |
| Former tenancy | Three month-to-month operating components at time of offering | Historical marketing fact only; not a current post-closing representation |
| Fuel agreement | Reported expired at time of offering | Historical marketing fact only |
| Frontage / parking | 99 feet on Bragg Boulevard / 10 spaces | Reported by LoopNet |
| Opportunity zone | Yes | Reported by Crexi and LoopNet |
| Listing advisor | Gaurang Gala, Broker-In-Charge, NC 283149 | Verified by Crexi |
| Photography | Three former-listing images | Retrieved from Crexi's public gallery record and optimized locally |

Client questions:

1. What closing date, if any, may be published?
2. May the final sale price be published, or should economics remain confidential?
3. Should Gala's side of the transaction be described more specifically than listing representation?
4. Are there approved closing-announcement or buyer/seller attribution details?

## 5911 Family Farm Road

Sources: [Doorify MLS](https://doorifymls.com/properties/NC/Morrisville/27560/10277/5911-family-farm-road-morrisville-nc-27560/775842597), [LoopNet](https://www.loopnet.com/Listing/5911-Family-Farm-Rd-Morrisville-NC/41146198/), [Zillow MLS display](https://www.zillow.com/homedetails/5911-Family-Farm-Rd-Morrisville-NC-27560/132117756_zpid/), and the client-supplied [NestVisions media package](https://media.nestvisions.com/listings/019f6824-ff78-7307-b536-803ab910a9ca/download-center).

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 5911 Family Farm Road, Morrisville, NC 27560 | Verified across current public sources |
| Status | Active | Current MLS/Zillow record; recheck before launch |
| Asking price | $995,000 | Verified across MLS, Zillow, and LoopNet |
| Site area | Approximately 2.10 acres | Verified across public sources; survey controls |
| Type / subtype | Land / residential | Verified public |
| Offering composition | Two lots | Represented by MLS narrative; LoopNet structured field says one lot, so legal parcel schedule is required |
| Zoning | VLDR | Reported by current MLS; confirm with Town of Morrisville |
| Existing residence | Tear-down, conveys at no value, represented as unsafe to enter | Verified public marketing; property-condition records needed |
| Water / sewer | Existing well and septic system | Represented by public offering; capacity and condition require verification |
| Road | Private road with dirt/gravel surface | Reported by MLS; confirm access and maintenance obligations |
| Sale condition | As-is, where-is | Represented by LoopNet offering |
| Potential uses | Custom estate, builder/investor, or residential development evaluation | Marketing position only; subject to buyer verification and Town approval |
| Photography | 22 images supplied through NestVisions | Five distinct images selected; approximate boundary graphics labeled accordingly |
| Video package | One 421,008,554-byte QuickTime source plus a [NestVisions hosted player](https://media.nestvisions.com/videos/019f954e-6a5b-720a-a20b-f83bc610cd3a) | A 6.1 MB, 480×270 H.264/AAC derivative is packaged for the property page and loaded only when the player nears the viewport; the 400+ MB source remains out of the application bundle |
| Listing advisor | Leigh Roach, Gala CRE Group; Leigh@galacregroup.com | Client-confirmed September 2026 |

Client questions:

1. What are the two legal parcel IDs and surveyed acreage?
2. What brokerage disclosure language should accompany Leigh Roach's client-confirmed listing assignment?
3. Can we receive the survey, current zoning confirmation, and any subdivision or planning correspondence?
4. What are the documented condition and status of the well, septic system, residence, access, and private-road obligations?
5. Which records are current and available for advisor-led follow-up after a qualified inquiry?

## 1111 Brown Street / Lexington Townhomes

Sources: the client-supplied [Lexington Townhomes Drive folder](https://drive.google.com/drive/folders/1qLNN_OTTpI28lSVzH1A6AaVCTZ0AVh_o), its signed listing agreement, the MPV-branded `1111 Brown St Land Flyer-sm.pdf`, eight drone photographs, one QuickTime video, and the supplied engineering and approval files. The client described this as a new on-market deal in September 2026.

| Field | Working value | Status / action |
| --- | --- | --- |
| Property identity | Lexington Townhome Site / Townes at Brown Street | The marketing name and permit-project name differ; either can be used with the address, but do not imply a built community |
| Address | 1111 Brown Street, Lexington, NC 27292 | Verified by the signed listing agreement and marketing flyer |
| Status | Active / available on market | Client-confirmed; the signed exclusive listing term runs through December 31, 2026, but recheck that the property is not under contract or withdrawn immediately before publication |
| Asking price | $990,000 in the signed listing agreement; $1,000,000 in the flyer | Conflict. Do not publish a fixed price until the client confirms the current asking price |
| Site area | Approximately 6.6 acres in the flyer | The NCDEQ erosion-control record covers 6.34 acres; that is an approved disturbance figure, not proof of gross parcel acreage. Survey or legal acreage is required |
| Parcels | Davidson County PIDs 11346A0000017, 11346A0000016, and 11346B0000014 | Verified in the signed listing agreement and flyer; survey and title records control |
| Asset type | Land / residential development opportunity | Verified by the listing materials |
| Proposed program | 58 townhomes | The flyer markets 58 townhomes; wastewater Permit WQ0044629 specifically describes service for 58 three-bedroom townhomes |
| Entitlement claim | Flyer says “fully entitled” | Do not publish unqualified. The supplied records verify several approvals but do not establish that every land-use approval is current or transferable |
| Erosion and sediment control | NCDEQ approval with modifications, Project DAVID-2023-059, dated May 16, 2023, covering 6.34 acres | The letter says it expires after three years if no land-disturbing activity began. Its current validity therefore requires confirmation after May 16, 2026 |
| Driveway access | NCDOT Permit D091-029-23-00031 dated April 13, 2023 | The permit approved a Brown Street connection, expressly did not approve the site plan/subdivision, and required completion within one year absent further direction. Current status or reapproval is required |
| Water-main encroachment | NCDOT Agreement E091-029-23-00230 dated August 10, 2023 | Approved a specific right-of-way water-main installation subject to conditions and a one-year completion provision. Confirm whether work occurred or the approval was renewed |
| Wastewater | NCDEQ Permit WQ0044629 dated August 4, 2023 | Describes about 1,517 linear feet of 8-inch gravity sewer serving 58 three-bedroom townhomes at 20,880 GPD; effective until rescinded, non-transferable, and subject to construction/certification conditions |
| Listing advisor | Gaurang Gala, Gala Real Estate Advisors LLC | Verified by the signed listing agreement; the agreement itself is internal only |
| Photography | Eight drone JPEGs in the Drive `Pictures` folder | Five client-supplied aerials selected and optimized for the website under the client's listing-build instruction; captions do not imply parcel boundaries |
| Video | `Gala.mov`, QuickTime, 109,600,381 bytes | The client's express instruction to add the supplied Lexington video authorizes site use for this build. A 2.7 MB, 168×300 H.264/AAC mobile derivative and a 67 KB poster are packaged locally; the 109.6 MB source remains private and out of the application bundle |
| Marketing flyer | Ten-page MPV Properties flyer | Useful fact source, but it is MPV-branded and names an MPV broker. Do not offer it publicly or copy its third-party prose/images without MPV/client permission |
| Diligence files | Site plans, feasibility work, survey, rent survey, approval package, wastewater materials, environmental/erosion records, and NCDOT materials | Keep inquiry-only until the client identifies the current controlling versions and approves public distribution |

Implementation posture:

- The qualified listing is implemented at `/properties/1111-brown-street` with “Contact for pricing,” client-confirmed active status, proposed 58-townhome positioning, qualified approximate acreage, three-parcel context, and Gaurang Gala as listing advisor.
- Safe only with careful attribution and currency language: the historic permit summaries above. Do not call the site “fully entitled,” “permit-ready,” or “shovel-ready” without a current land-use approval set and written client confirmation.
- Not public: the signed listing agreement, signatures, owner information, and raw diligence documents.
- Media: five client-supplied drone images are in use without boundary overlays. The client-supplied video is published only as a web-optimized mobile derivative with a locally generated poster and no autoplay. The MPV flyer, site-plan artwork, signed agreement, raw diligence files, and 109.6 MB QuickTime source remain private.

Readiness: **Qualified page implemented; fixed pricing and a current entitlement claim remain blocked.** The public copy deliberately treats the supplied approvals as historical diligence and requires buyers to verify currency, transferability, conditions, and remaining requirements.

Client questions:

1. Is the current asking price $990,000 or $1,000,000?
2. May Gala publish the eight drone images and `Gala.mov`, and does that permission include the MPV flyer/site-plan artwork?
3. Which municipal land-use approval establishes the 58-unit plan, and is it current and transferable?
4. Did work begin under the 2023 erosion, driveway, and encroachment approvals, or were they extended/reissued?
5. Which diligence records are current and available for advisor-led follow-up after a qualified inquiry?

## HMS closed transaction — 202 North Main Street

Source: the client-supplied [HomeSpotter / Doorify MLS record 10119823](https://l.hms.pt/403/340/10119823/295011/306991/sJ).

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 202 North Main Street, Fuquay-Varina, NC 27526 | Verified by the supplied MLS display |
| Status | Closed July 30, 2026 | Verified by the supplied MLS display |
| Displayed price | $825,000 | The page does not label this as list price or closing consideration. Do not call it the sale price without a closing record or client confirmation |
| Asset type | Commercial sale / retail | Verified by the supplied MLS display |
| Site / building | 0.23 acres; 3,333 SF; two stories; built 1958 | Verified by the supplied MLS display; public remarks say the offering included two parcels, while the structured page exposes one parcel number |
| Zoning | DC-2 | Reported by the MLS display; municipal record controls |
| Sharing agent | Leigh Roach | The supplied page is personalized to Leigh, but that alone does not establish Gala's role in the closed transaction |
| Listing brokerage | Century 21 Triangle Group | The MLS copyright block attributes the listing to Century 21 Triangle Group |
| Media | 26 MLS photographs | Not cleared for republication; the page limits IDX data to personal, non-commercial consumer use |

Publication posture: the user's September 14 direction establishes 202 North Main Street as a selected closed transaction for the Gala site. The implemented record uses the address, closed date, and carefully qualified physical facts without assigning Gala's exact side or a named advisor. Do not reuse the MLS photographs or copy. Do not publish $825,000 as sale consideration until confirmed.

Readiness: **Published locally in qualified form** at `/properties/202-north-main-street` using the non-photographic Gala completed-transaction treatment. Gala's exact role, advisor credit, transaction economics, and approved property photography remain enhancement inputs.

## HMS closed transaction — 10416 Chapel Hill Road

Source: the client-supplied [HomeSpotter / Doorify MLS record 10040138](https://l.hms.pt/403/340/10040138/295011/306991/sJ).

| Field | Working value | Status / action |
| --- | --- | --- |
| Address | 10416 Chapel Hill Road, Morrisville, NC 27560 | Verified by the supplied MLS display |
| Status | Closed July 29, 2026; off market July 31, 2026 | Verified by the supplied MLS display |
| Displayed price | $2,500,000 | The page does not label this as list price or closing consideration and it conflicts with the older client note describing 10414/10416 together at $1.8M. Do not publish transaction economics yet |
| Asset type | Commercial sale / business; land marketed for commercial use | Verified by the supplied MLS display and public remarks |
| Site area | 3.30 acres structured; 3.33 acres in public remarks | Use “approximately 3.3 acres” unless a survey is supplied |
| Parcels | 0756002327 and 0756005432 | Verified by the supplied MLS display; confirm whether these correspond to both 10414 and 10416 Chapel Hill Road |
| Improvements | One story; year built 1920 | Reported by the supplied MLS display; building area is not supplied |
| Listing context | Listing courtesy of Gala Real Estate Advisors, LLC; page personalized to Leigh Roach | Supports Gala listing involvement and identifies the MLS-page contact; it does not override the client's separate transaction-team direction |
| Transaction team | Gaurang Gala and Dr. Goverdhan Reddy Vavilala | Client-supplied September 21 direction; individual roles were not supplied and remain omitted |
| Media | 12 MLS photographs | Not cleared for republication; the page limits IDX data to personal, non-commercial consumer use |

Publication posture: the user's September 14 direction authorizes a 10416 Chapel Hill Road closed-transaction record using the address, closed status/date, approximate acreage, parcel count, and Gala listing involvement. Do not use the MLS photos/copy or publish a sale price until the combined 10414/10416 structure and economics are confirmed.

Readiness: **Published locally in qualified form** at `/properties/10416-chapel-hill-road` using the non-photographic Gala completed-transaction treatment. Gaurang Gala and Dr. Goverdhan Reddy Vavilala are connected as the shared transaction team without invented individual roles. The correct combined-address presentation, transaction price, and approved property photography remain enhancement inputs.

## Watkins deal material

Source available locally: a saved June 9, 2025 Triangle Business Journal article about the proposed Alta Watkins development. No client-supplied closing statement, listing record, marketing package, agent assignment, or transaction image was found in the repository or Downloads folder.

| Field | Working value | Status / action |
| --- | --- | --- |
| Project identity | Alta Watkins, a proposed Wood Partners multifamily development | Verified only as a 2025 development proposal, not as a Gala transaction |
| Location | 403, 405, and 511 Watkins Road plus one unaddressed Watkins Road parcel, Morrisville, NC | Reported by the saved article; parcel/legal records needed |
| Proposed program | 357 apartments in four buildings on 8.09 acres | Reported by the saved article and subject to plan changes |
| Status | Site plans had been submitted in June 2025 | This is not evidence of a closed deal, active Gala listing, approval, or construction status in September 2026 |
| Value | $2.8 million assessed value cited in the article | Not a sale price or transaction consideration; do not publish as deal value |
| Gala role / listing agent | Unknown | No supplied material connects Gala or a team member to the project or transaction |
| Media | Article uses a representative image of another/typical Alta-brand property | Not project-specific and not cleared for Gala republication |

Publication posture: **Do not publish as a Gala deal yet.** The article can guide follow-up questions but cannot establish transaction status, Gala's role, economics, or image rights.

Readiness: **Blocked** pending the exact transaction/property identity, Gala's role, closing or contract status, approved facts, advisor assignment, and client-owned imagery.

## Required client asset package

- Current flyer or offering memorandum for each property
- Surveys and parcel IDs
- Approved site plans and approval letters
- Zoning and entitlement summaries
- Utility and access information
- Environmental/tank documentation for Lackey Street
- Approved replacement photography for any remaining non-photographic transaction records
- Current controlling records for advisor-led diligence follow-up; all property and listing documents remain inquiry-only under the September 21 client direction
