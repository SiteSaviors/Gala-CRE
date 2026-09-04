import churchStreetImage from "@/assets/properties/611-703-church-st.webp";
import lackeyStreetImage from "@/assets/properties/2301-lackey-st.webp";
import yadkinRoadImage from "@/assets/properties/5047-yadkin-rd.webp";
import lackeyBuildingSide from "@/assets/properties/lackey-street/building-side.webp";
import lackeyCoolerWall from "@/assets/properties/lackey-street/cooler-wall.webp";
import lackeyFuelingCanopy from "@/assets/properties/lackey-street/fueling-canopy.webp";
import lackeyRoadApproach from "@/assets/properties/lackey-street/road-approach.webp";
import lackeyStoreInterior from "@/assets/properties/lackey-street/store-interior.webp";
import churchStreetGallery01 from "@/assets/properties/church-street/church-street-01.jpg";
import churchStreetGallery02 from "@/assets/properties/church-street/church-street-02.jpg";
import churchStreetGallery04 from "@/assets/properties/church-street/church-street-04.jpg";
import churchStreetGallery06 from "@/assets/properties/church-street/church-street-06.jpg";
import churchStreetGallery08 from "@/assets/properties/church-street/church-street-08.jpg";

export const propertyAssetTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land"] as const;
export const propertyOfferingTypes = ["For Sale", "For Lease"] as const;
export const propertyStatuses = ["Active", "Under Contract", "Closed"] as const;

export type PropertyAssetType = (typeof propertyAssetTypes)[number];
export type PropertyOfferingType = (typeof propertyOfferingTypes)[number];
export type PropertyStatus = (typeof propertyStatuses)[number];

export type PropertyLink = {
  label: "Crexi" | "LoopNet" | "CoStar" | "Listing Website";
  href: string;
};

export type PropertyAdvisor = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  license?: string;
};

export type PropertyFact = {
  label: string;
  value: string;
};

export type PropertyNarrative = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export type PropertyListingMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type PropertyInformationGroup = {
  eyebrow: string;
  title: string;
  body: string;
  facts: PropertyFact[];
};

export type PropertyDocument = {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  external?: boolean;
};

export type PropertySectionIntro = {
  eyebrow: string;
  title: string;
  body?: string;
};

export type PropertyListingPage = {
  headline: string;
  lead: string;
  overviewEyebrow?: string;
  keyFacts?: PropertyFact[];
  highlights?: string[];
  information?: {
    intro: PropertySectionIntro;
    groups: PropertyInformationGroup[];
  };
  transaction?: {
    eyebrow: string;
    title: string;
    conditions: PropertyFact[];
  };
  gallery?: {
    intro: PropertySectionIntro;
    items: PropertyListingMedia[];
    note?: string;
  };
  location?: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    mapEmbedUrl: string;
    mapHref: string;
  };
  documents?: {
    intro: PropertySectionIntro;
    items: PropertyDocument[];
  };
  advisorEyebrow?: string;
  disclosure?: string;
};

export type Property = {
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates?: { latitude: number; longitude: number };
  assetType: PropertyAssetType;
  offeringType: PropertyOfferingType;
  status: PropertyStatus;
  priceDisplay?: string;
  sizeDisplay?: string;
  acreageDisplay?: string;
  heroImage: string;
  gallery: string[];
  imagePosition?: string;
  summary: string;
  overview: string;
  highlights: string[];
  details: PropertyFact[];
  opportunity: PropertyNarrative;
  location: PropertyNarrative;
  listingPage?: PropertyListingPage;
  brochurePdf?: string;
  externalLinks: PropertyLink[];
  advisor?: PropertyAdvisor;
  featured: boolean;
  sortOrder: number;
};

// Add only client-approved Gala CRE listings. Legacy template projects must never be copied here.
export const properties: Property[] = [
  {
    slug: "2301-lackey-street",
    name: "2301 Lackey Street",
    address: "2301 Lackey Street",
    city: "Lumberton",
    state: "NC",
    assetType: "Retail",
    offeringType: "For Sale",
    status: "Active",
    priceDisplay: "$549,000",
    acreageDisplay: "0.70 acres",
    heroImage: lackeyStreetImage,
    gallery: [],
    imagePosition: "center",
    summary: "Vacant gas-station and convenience-store opportunity near I-95 Exit 19.",
    overview:
      "The public Crexi offering markets this approximately 0.70-acre property as an existing gas-station and convenience-store site near I-95 Exit 19 in Lumberton. It may suit an owner-user or redevelopment concept, subject to independent verification and applicable approvals.",
    highlights: [
      "Existing gas-station and convenience-store site",
      "Near I-95 Exit 19 according to the public offering",
      "Vacant at the time of the public listing",
      "No fuel contract stated in the listing title",
    ],
    details: [
      { label: "Property type", value: "Retail" },
      { label: "Subtype", value: "Convenience store / gas station" },
      { label: "Tenancy", value: "Vacant per public listing" },
      { label: "Fuel agreement", value: "None stated in public listing" },
    ],
    opportunity: {
      eyebrow: "Offering Position",
      title: "An existing retail site positioned for a new operating concept.",
      body:
        "The public offering presents the property for evaluation as a new convenience-store, quick-service restaurant, travel-oriented, or alternative retail concept. It also states that the tanks can be removed by the seller with a clean bill from NCDEQ before sale; the exact scope, documentation, and timing should be confirmed in writing.",
      points: [
        "Fuel tanks and piping are represented as dating to 2001",
        "Tank-removal and NCDEQ terms require written confirmation",
        "Any redevelopment remains subject to buyer diligence and approvals",
      ],
    },
    location: {
      eyebrow: "Location Context",
      title: "Positioned near an I-95 interchange in Lumberton.",
      body:
        "The public offering identifies the site as being near Exit 19 on I-95. Current construction conditions, access, and suitability for any travel-oriented use should be independently verified.",
      points: ["Lumberton, North Carolina", "I-95 corridor", "Robeson County"],
    },
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st",
      },
    ],
    advisor: {
      name: "Gaurang Gala",
      title: "Broker-In-Charge",
      phone: "910-578-2828",
      license: "NC 283149",
    },
    listingPage: {
      headline: "Existing fuel-and-convenience site near I-95 Exit 19.",
      lead:
        "An approximately 0.70-acre retail offering with an existing convenience-store building, fueling canopy, pumps, and highway-oriented positioning in Lumberton.",
      overviewEyebrow: "The Opportunity",
      keyFacts: [
        { label: "Asking price", value: "$549,000" },
        { label: "Site area", value: "Approx. 0.70 acres" },
        { label: "Property type", value: "Retail" },
        { label: "Current condition", value: "Vacant per listing" },
      ],
      highlights: [
        "Existing convenience-store building, fueling canopy, and pump area",
        "No fuel contract stated in the public listing",
        "Positioned near I-95 Exit 19 in Lumberton",
        "Public offering identifies C-store, QSR, and travel-oriented evaluation paths",
      ],
      information: {
        intro: {
          eyebrow: "Property Information",
          title: "Understand the asset before choosing the path.",
          body:
            "Existing operations, physical improvements, and material diligence are presented separately so buyers can evaluate reuse and redevelopment on their own terms.",
        },
        groups: [
          {
            eyebrow: "Operating Property",
            title: "Existing improvements create more than a land-only opportunity.",
            body:
              "The offering includes an existing convenience-store and fueling-site configuration. Public marketing describes the property as currently closed and gives a buyer the ability to evaluate reuse, rebranding, or redevelopment subject to physical, operational, zoning, and environmental diligence.",
            facts: [
              { label: "Existing use", value: "Convenience store / gas station" },
              { label: "Operating status", value: "Closed / vacant per offering" },
              { label: "Building size", value: "Request confirmed square footage" },
              { label: "Site size", value: "Approx. 0.70 acres" },
              { label: "Fuel agreement", value: "None stated in public listing" },
              { label: "Improvements", value: "Store, canopy, pumps, paved site" },
            ],
          },
          {
            eyebrow: "Fuel & Environmental",
            title: "Material diligence belongs in the decision path.",
            body:
              "The public offering represents the fuel tanks and piping as having been installed in 2001 using double-wall fiberglass construction. It also states that the tanks can be removed by the seller with a clean bill from NCDEQ before sale. Buyers should confirm the exact equipment condition, environmental record, removal scope, documentation, and contractual obligations in writing.",
            facts: [
              { label: "Tank / piping date", value: "2001 per public offering" },
              { label: "Construction", value: "Double-wall fiberglass per offering" },
              { label: "Seller statement", value: "Removal and NCDEQ path described" },
              { label: "Required review", value: "Tank and environmental records" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Transaction Conditions",
        title: "What the offering says—and what still requires confirmation.",
        conditions: [
          { label: "Published offering", value: "Approx. 0.70-acre retail property at $549,000" },
          { label: "Included parcels", value: "Confirm the legal parcel schedule with the listing advisor" },
          { label: "Additional land", value: "Land behind and west is described as available; inclusion and pricing require confirmation" },
          { label: "Potential uses", value: "C-store, QSR with drive-through, travel-oriented, or alternative retail concepts are cited by the offering" },
          { label: "Approvals", value: "All zoning, access, redevelopment, and operating requirements remain subject to buyer verification" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Property Gallery",
          title: "The existing asset, shown with purpose.",
          body:
            "Branding and merchandise visible in listing photography reflect the photographed condition and do not imply a current fuel, supplier, or operating agreement.",
        },
        items: [
          {
            src: lackeyFuelingCanopy,
            alt: "Fueling canopy and pump area at 2301 Lackey Street",
            caption: "Fueling canopy and pump area",
          },
          {
            src: lackeyStoreInterior,
            alt: "Convenience-store interior at 2301 Lackey Street",
            caption: "Convenience-store interior",
          },
          {
            src: lackeyCoolerWall,
            alt: "Cooler wall and merchandising area inside 2301 Lackey Street",
            caption: "Cooler wall and merchandising area",
          },
          {
            src: lackeyRoadApproach,
            alt: "Road approach and site context for 2301 Lackey Street",
            caption: "Road approach and site context",
          },
          {
            src: lackeyBuildingSide,
            alt: "Side elevation and service area at 2301 Lackey Street",
            caption: "Side elevation and service area",
          },
        ],
      },
      location: {
        eyebrow: "Location & Access",
        title: "A Lumberton retail site positioned near the I-95 corridor.",
        body:
          "The public offering identifies the property as being near Exit 19 on I-95. Buyers should independently confirm current access, roadway construction conditions, traffic patterns, and suitability for the intended use.",
        points: [
          "2301 Lackey Street, Lumberton, North Carolina",
          "Robeson County",
          "Near I-95 Exit 19 according to the public offering",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=2301%20Lackey%20Street%2C%20Lumberton%2C%20NC%2028360&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=2301%20Lackey%20Street%2C%20Lumberton%2C%20NC%2028360",
      },
      documents: {
        intro: {
          eyebrow: "Documents & Diligence",
          title: "Move from first look to informed review.",
          body:
            "Start with the public offering, then request the records and transaction materials relevant to your proposed use.",
        },
        items: [
          {
            title: "Public listing and flyer",
            description: "Review the current Crexi listing and access its available marketing flyer.",
            actionLabel: "Open Crexi Listing",
            href: "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st",
            external: true,
          },
          {
            title: "Fuel-system and environmental records",
            description: "Request available tank, piping, removal, and NCDEQ-related information from the listing advisor.",
            actionLabel: "Request Records",
            href: "/contact?property=2301-lackey-street&topic=environmental-records",
          },
          {
            title: "Complete diligence package",
            description: "Confirm included parcels and request the materials available for buyer review.",
            actionLabel: "Request Package",
            href: "/contact?property=2301-lackey-street&topic=diligence-package",
          },
        ],
      },
      advisorEyebrow: "Listing Advisor",
      disclosure:
        "All information is deemed reliable but is not guaranteed. Buyers should independently verify property condition, boundaries, included improvements, environmental matters, approvals, access, and all other material information.",
    },
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "5047-yadkin-road",
    name: "5047 Yadkin Road",
    address: "5047 Yadkin Road",
    city: "Fayetteville",
    state: "NC",
    assetType: "Land",
    offeringType: "For Sale",
    status: "Active",
    priceDisplay: "$829,000",
    acreageDisplay: "3.46 acres",
    heroImage: yadkinRoadImage,
    gallery: [],
    imagePosition: "center",
    summary: "Commercial land marketed with an approved shopping-center site plan.",
    overview:
      "The public Crexi offering represents this approximately 3.46-acre commercial property as having an approved shopping-center site plan addressing access, circulation, parking, buffers, and utility connections. The underlying plans, approvals, and development requirements should be independently verified.",
    highlights: [
      "Shopping-center site plan represented as fully approved",
      "Permit-ready status stated in the public offering",
      "Ingress, egress, parking, and circulation addressed in the represented plan",
      "Utility availability and approved connections stated in the public offering",
    ],
    details: [
      { label: "Property type", value: "Land" },
      { label: "Subtype", value: "Commercial" },
      { label: "Development plan", value: "Shopping center" },
      { label: "Approval status", value: "Represented as approved" },
    ],
    opportunity: {
      eyebrow: "Development Readiness",
      title: "A commercial site marketed with the planning work advanced.",
      body:
        "The offering is built around a shopping-center site plan represented as approved. According to the public listing, it addresses building placement, circulation, parking, buffers, ingress and egress, and utility connections. The actual plan and municipal approval record should form the basis of the buyer's diligence.",
      points: [
        "Site-plan approval and permit readiness are stated by the offering",
        "Parking and circulation are represented as incorporated into the plan",
        "All approvals and development requirements remain subject to verification",
      ],
    },
    location: {
      eyebrow: "Site Position",
      title: "A visible commercial parcel on Yadkin Road.",
      body:
        "The property is marketed for its Yadkin Road frontage and visibility in Fayetteville. Traffic counts, zoning, access details, and distances to surrounding demand drivers should be confirmed before they are published here.",
      points: ["Fayetteville, North Carolina", "Yadkin Road", "Commercial land offering"],
    },
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center",
      },
    ],
    advisor: {
      name: "Gaurang Gala",
      title: "Broker-In-Charge",
      phone: "910-578-2828",
      license: "NC 283149",
    },
    listingPage: {
      headline: "A 3.46-acre Fayetteville commercial site marketed with an approved shopping-center plan.",
      lead:
        "A Yadkin Road land offering whose public marketing represents the site-planning work as advanced, with access, circulation, parking, buffers, and utility connections addressed in the plan. The actual plan and municipal approval record should control buyer evaluation.",
      overviewEyebrow: "Commercial Land Opportunity",
      keyFacts: [
        { label: "Asking price", value: "$829,000" },
        { label: "Site area", value: "3.46 acres" },
        { label: "Property type", value: "Commercial land" },
        { label: "Planning status", value: "Approval represented" },
      ],
      highlights: [
        "Shopping-center site plan represented as fully approved",
        "Ingress, egress, parking, circulation, and buffers addressed in the represented plan",
        "Utility availability and approved connections stated by the public offering",
        "Permit-ready position stated by the offering; buyer to verify the approval record",
      ],
      information: {
        intro: {
          eyebrow: "Development Readiness",
          title: "Evaluate the planning work before pricing the execution risk.",
          body:
            "The opportunity is the represented shopping-center approval—not simply the acreage. Buyers should compare the actual approved plan and conditions with their intended program, schedule, and capital plan.",
        },
        groups: [
          {
            eyebrow: "Represented Site Plan",
            title: "The offering says the major site-planning elements are addressed.",
            body:
              "Public marketing represents a fully approved shopping-center plan that addresses building placement, ingress and egress, traffic flow, parking, circulation, buffers, and utility connections. Those elements should be confirmed directly against the signed plan set and approval record.",
            facts: [
              { label: "Planned use", value: "Shopping center per public offering" },
              { label: "Site planning", value: "Building placement and circulation represented" },
              { label: "Access", value: "Ingress and egress represented in plan" },
              { label: "Parking / buffers", value: "Represented as incorporated" },
            ],
          },
          {
            eyebrow: "Execution Diligence",
            title: "Permit-ready language still requires document-level review.",
            body:
              "The public offering describes the property as permit-ready and states that applicable standards have been satisfied. Before relying on that position, buyers should confirm the approving jurisdiction, case or permit number, approval date, conditions, expiration, remaining permits, zoning, utilities, access, and site constraints.",
            facts: [
              { label: "Approval record", value: "Request the signed municipal record" },
              { label: "Permit status", value: "Permit-ready position stated by offering" },
              { label: "Zoning", value: "Request current jurisdiction confirmation" },
              { label: "Utilities", value: "Availability and connections require evidence" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Buyer Verification",
        title: "What is offered—and what must be confirmed before closing.",
        conditions: [
          { label: "Published offering", value: "3.46-acre commercial land opportunity at $829,000" },
          { label: "Plan status", value: "Shopping-center approval is represented; request the approved plan and record" },
          { label: "Remaining approvals", value: "Confirm permits, conditions, expiration, and any required plan revisions" },
          { label: "Site fundamentals", value: "Verify parcel, zoning, frontage, access, utilities, wetlands, and flood conditions" },
          { label: "Intended program", value: "Buyer should confirm the approved plan supports its use, scale, and schedule" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Site Context",
          title: "An annotated aerial for orientation—not a substitute for the plan.",
          body:
            "The current public aerial provides a useful first look at the marketed site and surrounding roads. It is not a survey or the represented approved shopping-center plan; request those documents for dimension, boundary, access, and layout review.",
        },
        items: [
          {
            src: yadkinRoadImage,
            alt: "Annotated aerial of the 5047 Yadkin Road commercial land offering in Fayetteville",
            caption: "Public offering aerial and site context",
          },
        ],
      },
      location: {
        eyebrow: "Location & Access",
        title: "A Fayetteville commercial site on Yadkin Road.",
        body:
          "The property is marketed for its Yadkin Road position and visibility. Buyers should verify legal access, frontage, traffic conditions, planned ingress and egress, and measured distances to surrounding demand drivers before underwriting the location.",
        points: [
          "5047 Yadkin Road, Fayetteville, North Carolina",
          "Cumberland County",
          "Commercial corridor positioning",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=5047%20Yadkin%20Road%2C%20Fayetteville%2C%20NC%2028303&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=5047%20Yadkin%20Road%2C%20Fayetteville%2C%20NC%2028303",
      },
      documents: {
        intro: {
          eyebrow: "Documents & Diligence",
          title: "Underwrite from the approved record—not the marketing summary.",
          body:
            "Review the public offering, then request the plan, approval record, and site materials needed to confirm what can be built and what remains before construction.",
        },
        items: [
          {
            title: "Public listing",
            description: "Review the current Crexi offering and the public description of the shopping-center plan.",
            actionLabel: "Open Crexi Listing",
            href: "https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center",
            external: true,
          },
          {
            title: "Approved site plan and record",
            description: "Request the represented plan, municipal approval, conditions, and available permit information.",
            actionLabel: "Request Approved Plan",
            href: "/contact?property=5047-yadkin-road&topic=approved-site-plan",
          },
          {
            title: "Development diligence package",
            description: "Request available parcel, zoning, access, utility, survey, and site-constraint materials.",
            actionLabel: "Request Diligence",
            href: "/contact?property=5047-yadkin-road&topic=development-diligence",
          },
        ],
      },
      advisorEyebrow: "Listing Advisor",
      disclosure:
        "All information is deemed reliable but is not guaranteed. Statements regarding site-plan approval, permit readiness, access, circulation, buffers, and utility connections are based on the public offering and require review of the underlying records. Buyers should independently verify the parcel, boundaries, zoning, approvals, conditions, access, utilities, environmental constraints, and all development requirements.",
    },
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "611-703-church-street",
    name: "611 & 703 Church Street",
    address: "611 & 703 Church Street",
    city: "Morrisville",
    state: "NC",
    assetType: "Land",
    offeringType: "For Sale",
    status: "Active",
    priceDisplay: "$1,190,000",
    acreageDisplay: "1.09 acres",
    heroImage: churchStreetImage,
    gallery: [
      churchStreetGallery01,
      churchStreetGallery02,
      churchStreetGallery04,
      churchStreetGallery06,
      churchStreetGallery08,
    ],
    imagePosition: "center",
    summary: "Two-site commercial land offering marketed for childcare development.",
    overview:
      "The public Crexi offering markets two adjacent Morrisville sites totaling approximately 1.09 acres with approval supporting a licensed childcare facility. All acreage, parcels, zoning, entitlements, and development requirements should be independently verified.",
    highlights: [
      "Two locations marketed together as one offering",
      "Approval for a licensed daycare facility stated by the listing",
      "Base zoning represented as supporting childcare use",
      "RTP and employment-corridor proximity cited by the listing",
    ],
    details: [
      { label: "Property type", value: "Land" },
      { label: "Subtype", value: "Commercial" },
      { label: "Offering", value: "Two adjacent sites" },
      { label: "Approved use", value: "Licensed daycare per offering" },
    ],
    opportunity: {
      eyebrow: "Entitlement Position",
      title: "A childcare-focused entitlement position represented in the offering.",
      body:
        "The public listing represents the sites as having base zoning that supports childcare use and approval for a licensed daycare facility. Those statements may provide an owner-operator or investor with a more advanced starting point, subject to review of the underlying approvals and confirmation of the two parcels.",
      points: [
        "Approximately 1.09 combined acres stated in the marketing copy",
        "Childcare-supportive base zoning stated by the offering",
        "Licensed-facility approval stated by the offering",
      ],
    },
    location: {
      eyebrow: "Market Context",
      title: "A Morrisville infill position near regional employment corridors.",
      body:
        "The offering identifies a Morrisville, Wake County location and cites surrounding residential neighborhoods plus proximity to Research Triangle Park and regional employment corridors. Exact distances and demographic claims should be verified before publication.",
      points: ["Morrisville, North Carolina", "Wake County", "RTP proximity cited by the offering"],
    },
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560",
      },
    ],
    advisor: {
      name: "Gaurang Gala",
      title: "Broker-In-Charge",
      phone: "910-578-2828",
      license: "NC 283149",
    },
    listingPage: {
      headline: "A two-site Morrisville opportunity positioned for childcare development.",
      lead:
        "A commercial land offering marketed as two adjacent sites with approximately 1.09 combined acres and approval supporting a licensed childcare facility, subject to review of the parcels, survey, zoning, and underlying approval documents.",
      overviewEyebrow: "Childcare Opportunity",
      keyFacts: [
        { label: "Asking price", value: "$1,190,000" },
        { label: "Offering", value: "Two sites marketed together" },
        { label: "Site area", value: "Approx. 1.09 acres" },
        { label: "Property type", value: "Commercial land" },
      ],
      highlights: [
        "Two Morrisville sites marketed together as one offering",
        "Licensed daycare approval represented by the public offering",
        "Base zoning represented as supporting childcare use",
        "Residential and RTP context cited by the offering; buyer to verify",
      ],
      information: {
        intro: {
          eyebrow: "Development Position",
          title: "A use-specific opportunity—not generic land.",
          body:
            "The represented childcare approval is the starting point for evaluation. The approval record, parcel schedule, survey, and remaining development requirements should guide underwriting.",
        },
        groups: [
          {
            eyebrow: "Childcare Use",
            title: "The represented approval is the center of the opportunity.",
            body:
              "The public offering represents approval for a licensed daycare facility and base zoning that supports childcare use. Buyers should review the actual approval, site plan, conditions, capacity, and remaining permitting requirements before relying on that position.",
            facts: [
              { label: "Represented use", value: "Licensed daycare facility" },
              { label: "Base zoning", value: "Childcare support stated by offering" },
              { label: "Approval materials", value: "Request the advisor package" },
              { label: "Buyer review", value: "Conditions, capacity, site plan, and permits" },
            ],
          },
          {
            eyebrow: "Offering Composition",
            title: "Two marketed sites require one clear parcel schedule.",
            body:
              "Public marketing presents two adjacent locations together. Because the published address and acreage fields are not fully consistent, buyers should confirm the legal addresses, parcel identifiers, surveyed area, and combined-sale structure with the listing advisor.",
            facts: [
              { label: "Marketed addresses", value: "611 & 703 Church Street" },
              { label: "Offering structure", value: "Two locations marketed together" },
              { label: "Combined area", value: "Approx. 1.09 acres in marketing copy" },
              { label: "Confirm", value: "Parcel IDs, legal addresses, and surveyed acreage" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Buyer Verification",
        title: "What is represented—and what the diligence package must confirm.",
        conditions: [
          { label: "Published offering", value: "Two-site commercial land offering at $1,190,000" },
          { label: "Sale structure", value: "Confirm whether the two locations must be purchased together" },
          { label: "Address record", value: "Confirm the legal address of the second site" },
          { label: "Acreage record", value: "Public fields differ; the survey and parcel records control" },
          { label: "Approval scope", value: "Verify approval, conditions, capacity, expiration, and remaining permits" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Site & Surroundings",
          title: "Five distinct aerial views of the offering context.",
          body:
            "The aerials show the marketed sites in relation to Church Street and their surroundings. They do not establish legal boundaries; request the survey and approved site plan for parcel-level review.",
        },
        items: [
          {
            src: churchStreetGallery01,
            alt: "Aerial overview of the Church Street commercial land offering in Morrisville",
            caption: "Offering overview",
          },
          {
            src: churchStreetGallery02,
            alt: "Aerial view of the Church Street approach to the Morrisville offering",
            caption: "Church Street approach",
          },
          {
            src: churchStreetGallery04,
            alt: "Aerial view of the neighborhood context around the Church Street offering",
            caption: "Neighborhood context",
          },
          {
            src: churchStreetGallery06,
            alt: "Aerial view of nearby uses surrounding the Church Street offering",
            caption: "Surrounding uses",
          },
          {
            src: churchStreetGallery08,
            alt: "Wide aerial view of the Morrisville market context around Church Street",
            caption: "Wider market context",
          },
        ],
      },
      location: {
        eyebrow: "Location Context",
        title: "A Morrisville infill position near regional employment corridors.",
        body:
          "The public offering cites surrounding residential neighborhoods and proximity to Research Triangle Park and regional employment corridors. The map centers on 611 Church Street; buyers should confirm the second legal address, parcel boundaries, access, and measured distances during diligence.",
        points: [
          "Morrisville, North Carolina",
          "Wake County",
          "RTP proximity cited by the public offering",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=611%20Church%20Street%2C%20Morrisville%2C%20NC%2027560&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=611%20Church%20Street%2C%20Morrisville%2C%20NC%2027560",
      },
      documents: {
        intro: {
          eyebrow: "Documents & Diligence",
          title: "Review the approval before underwriting the use.",
          body:
            "Start with the public offering, then request the approval, site plan, survey, parcel, and zoning materials needed to evaluate the childcare use and combined offering.",
        },
        items: [
          {
            title: "Public listing and flyer",
            description: "Review the current Crexi offering and its available public marketing materials.",
            actionLabel: "Open Crexi Listing",
            href: "https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560",
            external: true,
          },
          {
            title: "Childcare approval and site plan",
            description: "Request the represented approval, plan, conditions, and related development materials.",
            actionLabel: "Request Approval Package",
            href: "/contact?property=611-703-church-street&topic=childcare-approval",
          },
          {
            title: "Parcel, survey, and zoning records",
            description: "Confirm the legal addresses, parcel schedule, surveyed area, and zoning basis for the offering.",
            actionLabel: "Request Parcel Records",
            href: "/contact?property=611-703-church-street&topic=parcel-zoning",
          },
        ],
      },
      advisorEyebrow: "Listing Advisor",
      disclosure:
        "All information is deemed reliable but is not guaranteed. The marketed addresses and approximately 1.09-acre figure are subject to confirmation. Buyers should independently verify legal addresses, parcels, surveyed acreage, zoning, childcare approval and conditions, utilities, access, and all development requirements.",
    },
    featured: true,
    sortOrder: 3,
  },
];

const statusPriority: Record<PropertyStatus, number> = {
  Active: 0,
  "Under Contract": 1,
  Closed: 2,
};

export const sortProperties = (items: Property[]) => [...items].sort(
  (a, b) => statusPriority[a.status] - statusPriority[b.status] || a.sortOrder - b.sortOrder
);

export const sortedProperties = sortProperties(properties);

export const featuredProperties = sortedProperties.filter(
  (property) => property.featured && property.status === "Active"
);

export const propertyBySlug = Object.fromEntries(
  properties.map((property) => [property.slug, property])
) as Record<string, Property>;

export const findPropertyBySlug = (items: Property[], slug: string) =>
  items.find((property) => property.slug === slug);

export const getRelatedProperties = (slug: string, limit = 2) =>
  sortedProperties.filter((property) => property.slug !== slug).slice(0, limit);

export type PropertyFilters = {
  query: string;
  assetType: "All" | PropertyAssetType;
  offeringType: "All" | PropertyOfferingType;
  status: "All" | PropertyStatus;
};

export const filterProperties = (items: Property[], filters: PropertyFilters) => {
  const query = filters.query.trim().toLowerCase();

  return items.filter((property) => {
    const searchable = [
      property.name,
      property.address,
      property.city,
      property.state,
      property.assetType,
      property.offeringType,
      property.summary,
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (filters.assetType === "All" || property.assetType === filters.assetType) &&
      (filters.offeringType === "All" || property.offeringType === filters.offeringType) &&
      (filters.status === "All" || property.status === filters.status)
    );
  });
};
