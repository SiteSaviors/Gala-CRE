# Gala CRE property data register

Last reviewed: September 8, 2026
Purpose: Control which listing facts are safe to publish and identify the client material still required.

## Publishing rules

- **Verified public:** Present on the current Gala/Crexi public listing and internally consistent.
- **Represented by offering:** A marketing assertion that can be attributed to the listing but still requires buyer verification.
- **Client confirmation needed:** Conflicting, ambiguous, or time-sensitive. Do not state as an unqualified fact.
- **Document needed:** Do not describe as approved, permit-ready, environmentally cleared, or contractually required without the underlying material.
- When sources conflict, omit the disputed field from prominent marketing or label it approximate and explain the verification requirement.

## Shared listing advisor

| Field | Working value | Status |
| --- | --- | --- |
| Name | Gaurang Gala | Verified public on four Crexi listings |
| Public-facing name | Gaurang Gala versus Greg Gala | Client confirmation needed |
| Title | Broker-In-Charge | Verified public |
| North Carolina license | NC 283149 | Verified public; confirm preferred formatting |
| Brokerage | Gala Real Estate Advisors LLC | Verified public |
| Brokerage phone | 910-578-2828 | Verified public |
| Email | Not publicly visible without revealing gated contact data | Client confirmation needed |
| Headshot | Not supplied as an approved website asset | Client asset needed |

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
| Listing advisor | Public records conflict between the MLS listing office/agent and LoopNet contact | Omitted from Gala page until client confirms the correct public advisor and brokerage relationship |

Client questions:

1. What are the two legal parcel IDs and surveyed acreage?
2. Who should be presented as the Gala website listing advisor, and what brokerage relationship should be disclosed?
3. Can we receive the survey, current zoning confirmation, and any subdivision or planning correspondence?
4. What are the documented condition and status of the well, septic system, residence, access, and private-road obligations?
5. Which additional property documents may be published versus provided only after inquiry?

## Required client asset package

- Current flyer or offering memorandum for each property
- Surveys and parcel IDs
- Approved site plans and approval letters
- Zoning and entitlement summaries
- Utility and access information
- Environmental/tank documentation for Lackey Street
- Approved advisor headshot, email, title, phone, and preferred public name
- Permission to publish each document or clear instruction to make it inquiry-only
