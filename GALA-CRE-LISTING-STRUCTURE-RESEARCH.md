# Gala CRE listing structure

## The decision

Gala should stop treating every property route like a long brand story. The current opportunities are **commercial real estate listings**. Their job is to let a buyer, operator, developer, or investor answer four questions quickly:

1. What is being offered?
2. What is already known or approved?
3. What materials can I review?
4. Who do I contact to move forward?

The research set contains many excellent developer websites, but most of their project pages are built to prove experience—not market an active property. The clearest regional reference, [Beacon Partners](https://beacondevelopment.com/), explicitly separates its searchable [available-property inventory](https://beacondevelopment.com/properties) from its [development project gallery](https://beacondevelopment.com/projects). Gala should do the same.

## What the research actually shows

Developer portfolio pages tend to be short and visual. They communicate location, project type, scale, lifecycle, the developer's role, and a concise project story. [Mavrek](https://mavrekdevelopment.com/projects), [Sterling Bay](https://sterlingbay.com/our-portfolio/), [Golub](https://golubandcompany.com/portfolio/), [Magellan](https://www.magellandevelopment.com/projects/thestregischicago/), [Trilogy](https://trilogyreg.com/portfolio), and [California Landmark](https://californialandmark.com/properties/) all reinforce that pattern in different ways. Land developers add site scale, development program, entitlement or infrastructure challenges, and delivery outcomes; [Benchmark Austin](https://benchmark-austin.com/) and [Leonard Developments](https://leonarddevelopments.com/projects/) are good examples.

Active property pages behave differently. [Beacon's Edwardia Industrial Park page](https://beacondevelopment.com/properties/business-park/7095/edwardia-industrial-park) presents the address and gallery, then current availability, downloadable flyers, the named agent, an inquiry form, overview bullets, and hard property facts. [L&L's 195 Broadway page](https://llgroup.com/portfolio/195-broadway/) uses overview, gallery, availabilities, floor/stacking plans, specifications, location, transit, and named leasing contacts. The pattern is not “add more sections.” It is “show the right evidence in the order a prospect needs it.”

## The Gala property-page blueprint

### 1. Identity and primary facts

The first screen should contain:

- Property name and full address
- Status: Active, Under Contract, or Closed
- Offering: For Sale or For Lease
- Asset and subtype
- Asking price when public
- Acreage for land or available square feet for space
- One strong hero image—preferably an annotated aerial for land
- Primary actions: **Download Flyer**, **Request Information**, and **View on Crexi**

Do not make a visitor scroll to discover price, acreage, status, or the next action.

### 2. Offering at a glance

Use a compact, asset-specific fact grid. Never fill a generic template with vague substitutes.

For land:

- Total acreage and number of parcels
- Zoning and jurisdiction
- Approved or proposed use
- Entitlement / permit status
- Access, frontage, and ingress/egress
- Utilities
- Parcel IDs
- Asking price and price per acre, if verified

For an operating property or building:

- Building and available square footage
- Site area
- Occupancy / tenancy
- Year built or renovated
- Clear height, loading, parking, power, or other type-specific specifications
- Lease or sale status
- Asking rate or price, if public

Only show fields supported by client material or an authoritative listing source.

### 3. Investment or site highlights

Four to six short bullets should state the property's differentiators. Each bullet should be factual, specific, and useful in a decision. Avoid turning the page into a second brochure by repeating these points in multiple sections.

### 4. Site and development position

For land, this is one focused section—not three essays. Pair an aerial, concept plan, or approved site plan with a short explanation of:

- What is approved today
- What physical or planning work has been completed
- What a buyer still needs to verify
- Which user or development profiles the site plausibly supports

For existing buildings, replace this section with availability and specifications.

### 5. Location

Use an embedded map or strong locator graphic, then list only verified access and demand drivers. Good examples include highway interchanges, employment centers, major institutions, nearby population, or traffic data—but distances and statistics should not be invented or estimated casually.

### 6. Documents

This is core listing content, not an optional decorative section. Support these document types as they become available:

- Offering flyer or memorandum
- Site or concept plan
- Survey
- Zoning / entitlement summary
- Utility information
- Environmental or due-diligence materials
- Floor plans or stacking plans for buildings

If no document has been supplied, show **Request Due Diligence Materials** rather than a dead download button.

### 7. Gallery

Use a small set of genuinely different and useful images:

- Primary aerial
- Annotated parcel boundary
- Site plan
- Street/frontage view
- Access/intersection context
- Existing improvements

Five slightly different drone frames do not equal five pieces of information. The gallery should help a prospect understand the property.

### 8. Named advisor and property-specific inquiry

Every listing should end with the listing professional's name, title, phone, email, license information where appropriate, and a form that carries the property name automatically. “Contact Gala” is weaker than “Request details for 5047 Yadkin Road.” Beacon, L&L, and Gala's own [Crexi listings](https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center) all make the responsible person visible.

### 9. Disclosure

End the page with concise brokerage language: information is from sources believed reliable, is not guaranteed, may change or be withdrawn, and must be independently verified. Use client/legal-approved wording before publication.

## What to remove from the current build

- Remove the full-screen “Explore” behavior; visitors already know how to scroll.
- Merge “Property Overview” and “The Opportunity / Development Readiness / Entitlement Position” into one concise overview plus highlights.
- Replace the large black location essay with an actual map/locator and verified location facts.
- Move related properties below the inquiry/contact block or omit them while inventory is only three listings.
- Remove the separate generic closing CTA; the named advisor and property inquiry should be the conversion point.
- Reduce repeated disclaimers to one visible, consistent disclosure at the end.
- Do not create empty sections to make all listings the same length.

The visual design can remain polished. The change is primarily editorial hierarchy and data architecture.

## The three Gala listings, corrected

### Resolve these source conflicts first

The live Crexi pages should remain the working source, but they are not internally consistent enough to copy blindly:

- **Church Street address conflict:** the listing title and description say **611 & 703 Church Street**, while Crexi's two-location map currently identifies **611 Church Street and 711 Church Street**. Confirm the second address and parcel IDs with the client or flyer.
- **Church Street acreage conflict:** the structured Details field says **1.000 acre**, while the page headline and description say **1.09 acres**. Confirm whether 1.09 is the combined surveyed acreage and use one value consistently.
- **Lackey Street offering boundary:** the narrative says the parcels behind and west of the store are also available, but the main listing identifies a 0.70-acre offering. Confirm whether those parcels are included in the $549,000 price, separately available, or simply adjacent opportunities.
- **Lackey Street time-sensitive claim:** the listing says the store is closed because of nearby I-95 construction. Verify that this is still current before repeating it on Gala's permanent page.
- **Lackey Street environmental language:** confirm the documented tank status and the exact seller obligation. “Can be removed” is not the same as “will be removed before closing.”
- **Yadkin Road approval claim:** obtain the approved site plan and approval/permit documents before presenting “permit-ready” or “all development standards satisfied” as independently established facts.
- **Yadkin Road copy gap:** Crexi's Marketing Description currently contains only “For Sale”; all useful substance is in nine investment-highlight bullets. Gala can improve the presentation without adding unsupported facts.

Until these are resolved, the Gala page should attribute material statements to the offering information and retain clear buyer-verification language.

### 2301 Lackey Street

Lead with **$549,000**, **0.70 acres**, **vacant gas station / convenience store**, **no fuel contract**, and **near I-95 Exit 19**. The tank and environmental language is material and should be visible in a clearly labeled due-diligence note—not buried in a cinematic narrative. The page should prioritize the flyer, site photographs, fuel-system facts supplied by the client, seller obligations, zoning, parcel information, and direct contact. Source: [Gala's Crexi listing](https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st).

### 5047 Yadkin Road

This should become the flagship **land listing** template. Lead with **$829,000**, **3.46 acres**, **commercial land**, and the **approved shopping-center site plan**. The core page is the approved plan, entitlement/permit status, zoning, access and circulation, parking, buffers, utilities, and the materials a developer needs to validate those claims. Source: [Gala's Crexi listing](https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center).

### 611–703 Church Street

Lead with **$1,190,000**, **approximately 1.09 acres**, **two adjacent infill parcels**, and the **licensed-daycare approval**. The page should make the approved use, zoning position, entitlement documents, parcel map, site plan, residential context, and advisor contact immediately understandable. The aerial gallery should be edited down to distinct views and annotated when possible. Source: [Gala's Crexi listing](https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560).

## Recommended site architecture

Use three separate content systems:

| System | Purpose | Typical fields |
| --- | --- | --- |
| **Properties** | Market active, under-contract, and closed opportunities | Price/rate, status, acreage/SF, zoning/specifications, availability, documents, advisor |
| **Projects** | Prove GalaDevelop's execution and experience | Gala's role, stage, program, site size, team, approvals, delivery, gallery |
| **Transactions / Case Studies** | Prove brokerage outcomes | Client objective, challenge, representation, process, result, verified transaction facts |

These systems can share the same design language, cards, gallery component, and metadata framework. They should not share one rigid page template.

## Immediate implementation order

1. Rebuild **5047 Yadkin Road** as the flagship land-listing page.
2. Convert the property schema from long narrative fields to asset-specific facts, documents, map/location data, and advisor data.
3. Reuse that structure for Church Street while preserving its childcare-specific entitlement story.
4. Create a retail / operating-site variant for Lackey Street; do not force it into the land template.
5. Keep the existing `/properties` filters, but make cards emphasize status, price, asset subtype, and acreage/SF.
6. Add documents and verified client data as soon as the flyers and supporting materials are available.
7. Build development projects and closed transactions later as separate systems.

## Meeting-ready position

“We separated Gala's live opportunities from its future project and transaction portfolio. Active listings now prioritize the facts, plans, documents, and direct advisor access that buyers and developers need. The same design language will later support richer GalaDevelop project stories and brokerage case studies without forcing them into the listing template.”

## Sources reviewed

The comparison emphasized first-party pages from the supplied set, with the highest weight given to active-property behavior:

- [Beacon property inventory](https://beacondevelopment.com/properties), [project gallery](https://beacondevelopment.com/projects), and [Edwardia detail page](https://beacondevelopment.com/properties/business-park/7095/edwardia-industrial-park)
- [L&L 195 Broadway](https://llgroup.com/portfolio/195-broadway/)
- [Sterling Bay portfolio](https://sterlingbay.com/our-portfolio/) and [600 West Chicago](https://sterlingbay.com/properties/600-west-chicago/)
- [Mavrek projects](https://mavrekdevelopment.com/projects) and [Claremont](https://mavrekdevelopment.com/project/claremont)
- [Golub portfolio](https://golubandcompany.com/portfolio/) and [1001 State](https://golubandcompany.com/portfolio/1001-state-street/)
- [Magellan St. Regis](https://www.magellandevelopment.com/projects/thestregischicago/)
- [Focus](https://workwithfocus.com/), [Bayshore Grove](https://www.bayshoregrovecapital.com/portfolio), [Trilogy](https://trilogyreg.com/portfolio), [California Landmark](https://californialandmark.com/properties/), [Peebles](https://peeblescorp.com/portfolio), [Benchmark Austin](https://benchmark-austin.com/), [Leonard Developments](https://leonarddevelopments.com/projects/), [RDG](https://www.rdgnc.com/land-development), [Thornton Development](https://www.thorntondevelopmentgroup.com/), and [Pearlstone](https://www.pearlstonepartners.com/)
- [Clarion representative properties](https://www.clarionpartners.com/invest/properties), [Clarion case studies](https://www.clarionpartners.com/our-approach/case-studies), [BAM track record](https://bamcapital.com/portfolio-track-record/), and [Canfield investor disclosures](https://www.canfield-development.com/investors/)
- Gala's active [Lackey Street](https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st), [Yadkin Road](https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center), and [Church Street](https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560) listings
