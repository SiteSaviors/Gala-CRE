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
import familyFarm01 from "@/assets/properties/family-farm-road/family-farm-01.webp";
import familyFarm02 from "@/assets/properties/family-farm-road/family-farm-02.webp";
import familyFarm03 from "@/assets/properties/family-farm-road/family-farm-03.webp";
import familyFarm04 from "@/assets/properties/family-farm-road/family-farm-04.webp";
import familyFarm05 from "@/assets/properties/family-farm-road/family-farm-05.webp";
import lexington01 from "@/assets/properties/lexington-townhomes/lexington-01.webp";
import lexington02 from "@/assets/properties/lexington-townhomes/lexington-02.webp";
import lexington03 from "@/assets/properties/lexington-townhomes/lexington-03.webp";
import lexington04 from "@/assets/properties/lexington-townhomes/lexington-04.webp";
import lexington05 from "@/assets/properties/lexington-townhomes/lexington-05.webp";
import churchStreetTour from "@/assets/properties/videos/church-street-tour.mp4";
import familyFarmTour from "@/assets/properties/videos/family-farm-tour.mp4";
import lexingtonTourPoster from "@/assets/properties/videos/lexington-townhomes-poster.webp";
import lexingtonTour from "@/assets/properties/videos/lexington-townhomes-tour.mp4";
import braggBoulevardExterior from "@/assets/properties/802-bragg-boulevard/bragg-03.webp";
import braggBoulevardApproach from "@/assets/properties/802-bragg-boulevard/bragg-01.webp";
import braggBoulevardInterior from "@/assets/properties/802-bragg-boulevard/bragg-02.webp";
import transactionRecordGraphic from "@/assets/properties/transaction-record.svg";
import type { TeamMemberId } from "@/content/team";

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
  video?: {
    eyebrow: string;
    title: string;
    body?: string;
    sourceUrl: string;
    posterImage: string;
    ariaLabel: string;
    orientation?: "landscape" | "portrait";
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
  imageAlt?: string;
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
  advisorId?: TeamMemberId;
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
    coordinates: { latitude: 34.63501, longitude: -79.027371 },
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
    advisorId: "gaurang-gala",
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
    coordinates: { latitude: 35.0832956, longitude: -78.9697544 },
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
    advisorId: "gaurang-gala",
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
    coordinates: { latitude: 35.830585, longitude: -78.8338643 },
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
    advisorId: "gaurang-gala",
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
      video: {
        eyebrow: "Property Film",
        title: "See the Church Street opportunity in context.",
        body:
          "A web-optimized aerial overview provides additional orientation to the sites and surrounding Morrisville context. Marketing imagery does not establish legal boundaries.",
        sourceUrl: churchStreetTour,
        posterImage: churchStreetImage,
        ariaLabel: "Play the aerial property video for 611 and 703 Church Street",
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
  {
    slug: "5911-family-farm-road",
    name: "5911 Family Farm Road",
    address: "5911 Family Farm Road",
    city: "Morrisville",
    state: "NC",
    coordinates: { latitude: 35.8367102, longitude: -78.8465691 },
    assetType: "Land",
    offeringType: "For Sale",
    status: "Active",
    priceDisplay: "$995,000",
    acreageDisplay: "2.10 acres",
    heroImage: familyFarm01,
    gallery: [],
    imagePosition: "center 48%",
    summary: "Two-lot residential land offering in Morrisville with VLDR zoning and an existing tear-down structure.",
    overview:
      "The public MLS and commercial offering market approximately 2.10 acres in Morrisville for a custom estate, builder, investor, or potential residential development path, subject to buyer verification and Town of Morrisville approval.",
    highlights: [
      "Approximately 2.10 acres in Morrisville",
      "Two lots represented by the public MLS marketing",
      "VLDR zoning reported by the public listing",
      "Existing well and septic system reported by the offering",
    ],
    details: [
      { label: "Property type", value: "Land" },
      { label: "Zoning", value: "VLDR per public MLS" },
      { label: "Offering composition", value: "Two lots per public MLS marketing" },
      { label: "Existing structure", value: "Tear-down; do not enter" },
    ],
    opportunity: {
      eyebrow: "Offering Position",
      title: "A residential land opportunity within an established Morrisville setting.",
      body:
        "The offering presents the property for evaluation as a custom estate, builder, investor, or future residential development opportunity. Any subdivision, development, buildability, or intended use remains subject to independent review and Town of Morrisville and Wake County requirements.",
      points: [
        "Approximately 2.10 acres marketed across two lots",
        "VLDR zoning reported by the current MLS record",
        "Existing residence conveys at no value and is not safe to enter",
      ],
    },
    location: {
      eyebrow: "Location Context",
      title: "An infill residential land position in Morrisville.",
      body:
        "The MLS directions place the property off McCrimmon Parkway via Liberty Rose Drive and Family Farm Road. Buyers should confirm legal access, road maintenance, parcel configuration, and measured proximity to regional destinations.",
      points: [
        "Morrisville, North Carolina",
        "Wake County",
        "Near the Research Triangle employment corridor",
      ],
    },
    externalLinks: [
      {
        label: "LoopNet",
        href: "https://www.loopnet.com/Listing/5911-Family-Farm-Rd-Morrisville-NC/41146198/",
      },
      {
        label: "Listing Website",
        href: "https://doorifymls.com/properties/NC/Morrisville/27560/10277/5911-family-farm-road-morrisville-nc-27560/775842597",
      },
    ],
    advisorId: "leigh-roach",
    listingPage: {
      headline: "Approximately 2.10 acres for residential use and development evaluation.",
      lead:
        "A Morrisville land offering marketed across two lots with reported VLDR zoning, an existing well and septic system, and multiple residential evaluation paths subject to local approval.",
      overviewEyebrow: "The Opportunity",
      keyFacts: [
        { label: "Asking price", value: "$995,000" },
        { label: "Site area", value: "Approx. 2.10 acres" },
        { label: "Property type", value: "Residential land" },
        { label: "Existing improvement", value: "Tear-down / do not enter" },
      ],
      highlights: [
        "Two-lot composition represented by the current MLS marketing",
        "VLDR zoning reported by the public MLS record",
        "Existing well and septic system reported by the offering",
        "Custom estate, builder, investor, and residential development paths cited for evaluation",
      ],
      information: {
        intro: {
          eyebrow: "Property Information",
          title: "Separate the current record from future potential.",
          body:
            "The marketed facts describe the property today. Buildability, subdivision, utility capacity, and development potential require direct confirmation with the governing authorities and buyer advisers.",
        },
        groups: [
          {
            eyebrow: "Current Property",
            title: "An acreage offering with an existing residential structure.",
            body:
              "The public offering describes approximately 2.10 acres, an existing residence that conveys at no value, and an existing well and septic system. The residence is represented as unsafe and must not be entered.",
            facts: [
              { label: "Published area", value: "Approx. 2.10 acres" },
              { label: "Offering composition", value: "Two lots per MLS marketing" },
              { label: "Existing residence", value: "Tear-down; conveys at no value" },
              { label: "Site access", value: "Shown by appointment only" },
              { label: "Water", value: "Existing well reported by offering" },
              { label: "Sewer", value: "Existing septic system reported by offering" },
            ],
          },
          {
            eyebrow: "Planning Review",
            title: "Potential is conditional on the verified land record.",
            body:
              "Public marketing cites custom-estate, builder, investor, and residential development possibilities. Buyers should confirm the legal parcel schedule, VLDR requirements, setbacks, access, utility options, subdivision standards, environmental conditions, and intended use before relying on a development concept.",
            facts: [
              { label: "Reported zoning", value: "VLDR" },
              { label: "Jurisdiction", value: "Town of Morrisville / Wake County review" },
              { label: "Road frontage", value: "Private-road context reported by MLS" },
              { label: "Road surface", value: "Dirt / gravel reported by MLS" },
              { label: "Subdivision", value: "Subject to municipal verification and approval" },
              { label: "Utility capacity", value: "Buyer to verify existing and future service" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Buyer Verification",
        title: "Confirm the property record before defining the program.",
        conditions: [
          { label: "Published offering", value: "Approximately 2.10 acres offered at $995,000" },
          { label: "Lot record", value: "MLS marketing references two lots; confirm the legal parcel schedule" },
          { label: "Existing improvements", value: "Residence conveys at no value and is represented as unsafe to enter" },
          { label: "Sale condition", value: "Marketed as-is, where-is on the public commercial offering" },
          { label: "Future use", value: "Buildability, subdivision, development, and utilities remain subject to buyer and authority review" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Site & Surroundings",
          title: "Aerial context with the marketed property clearly identified.",
          body:
            "The supplied aerials provide orientation to the property and surrounding residential context. Boundary lines are approximate marketing graphics and are not a survey.",
        },
        items: [
          {
            src: familyFarm01,
            alt: "Annotated aerial overview of 5911 Family Farm Road in Morrisville",
            caption: "Approximate marketed property outline",
          },
          {
            src: familyFarm02,
            alt: "Closer annotated aerial of the two marketed areas at 5911 Family Farm Road",
            caption: "Two-lot offering context",
          },
          {
            src: familyFarm03,
            alt: "Wide aerial view of 5911 Family Farm Road and surrounding Morrisville neighborhoods",
            caption: "Wider neighborhood context",
          },
          {
            src: familyFarm04,
            alt: "Top-down aerial view of the Family Farm Road land and existing improvements",
            caption: "Site and existing improvements",
          },
          {
            src: familyFarm05,
            alt: "Aerial view of the existing residence and wooded setting at 5911 Family Farm Road",
            caption: "Existing residence and site condition",
          },
        ],
        note: "Approximate marketing outlines are for orientation only and do not replace a boundary survey.",
      },
      video: {
        eyebrow: "Property Film",
        title: "See the Family Farm Road setting from above.",
        body:
          "A web-optimized aerial overview provides additional orientation to the property and surrounding Morrisville setting. Approximate marketing outlines are not a survey.",
        sourceUrl: familyFarmTour,
        posterImage: familyFarm01,
        ariaLabel: "Play the aerial property video for 5911 Family Farm Road",
      },
      location: {
        eyebrow: "Location & Access",
        title: "A Morrisville location near the Research Triangle employment corridor.",
        body:
          "The public offering cites convenient access to Research Triangle Park, RDU Airport, I-540, shopping, and dining. Buyers should verify legal access, private-road obligations, parcel configuration, traffic routes, and all measured distances independently.",
        points: [
          "5911 Family Farm Road, Morrisville, North Carolina",
          "Wake County",
          "Accessed from McCrimmon Parkway via Liberty Rose Drive according to MLS directions",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=5911%20Family%20Farm%20Road%2C%20Morrisville%2C%20NC%2027560&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=5911%20Family%20Farm%20Road%2C%20Morrisville%2C%20NC%2027560",
      },
      documents: {
        intro: {
          eyebrow: "Documents & Diligence",
          title: "Start with the offering, then verify the land record.",
          body:
            "Review the current public marketing and supplied aerials, then request the parcel, zoning, utility, access, and property-condition materials relevant to the intended use.",
        },
        items: [
          {
            title: "Current commercial offering",
            description: "Review the active LoopNet marketing, asking price, acreage, and published sale conditions.",
            actionLabel: "Open LoopNet Listing",
            href: "https://www.loopnet.com/Listing/5911-Family-Farm-Rd-Morrisville-NC/41146198/",
            external: true,
          },
          {
            title: "Property media package",
            description: "View the supplied NestVisions photography and available property-marketing media.",
            actionLabel: "Open Media Package",
            href: "https://media.nestvisions.com/listings/019f6824-ff78-7307-b536-803ab910a9ca/download-center",
            external: true,
          },
          {
            title: "Land and authority records",
            description: "Request the legal parcel schedule and available zoning, survey, access, utility, septic, well, and condition information.",
            actionLabel: "Request Diligence",
            href: "/contact?property=5911-family-farm-road&topic=land-diligence",
          },
        ],
      },
      disclosure:
        "All information is deemed reliable but is not guaranteed. Acreage, lot composition, zoning, access, existing utilities, property condition, boundaries, buildability, subdivision, development potential, and intended uses require independent verification. The existing residence is represented as unsafe; do not enter it. Approximate aerial outlines are marketing graphics and are not a survey.",
    },
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "1111-brown-street",
    name: "Lexington Townhome Site",
    address: "1111 Brown Street",
    city: "Lexington",
    state: "NC",
    coordinates: { latitude: 35.7860804, longitude: -80.2780045 },
    assetType: "Land",
    offeringType: "For Sale",
    status: "Active",
    priceDisplay: "Contact for pricing",
    acreageDisplay: "Approx. 6.6 acres",
    heroImage: lexington01,
    gallery: [lexington02, lexington03, lexington04, lexington05],
    imagePosition: "center 52%",
    summary: "Proposed 58-townhome opportunity in Lexington with a historical planning and utility approval record.",
    overview:
      "A three-parcel development opportunity at 1111 Brown Street marketed for a proposed 58-townhome program. Client-supplied records include historical 2023 erosion-control, driveway, water-main, and wastewater approvals; their current status, transferability, conditions, and remaining requirements must be independently confirmed.",
    highlights: [
      "Proposed 58-townhome development program",
      "Approximately 6.6 acres represented in marketing materials",
      "Three-parcel assemblage identified in the supplied property record",
      "Historical 2023 approval and utility records available for diligence",
    ],
    details: [
      { label: "Property type", value: "Residential development land" },
      { label: "Proposed program", value: "58 townhomes" },
      { label: "Offering composition", value: "Three parcels" },
      { label: "Approval record", value: "Historical approvals; current status to verify" },
    ],
    opportunity: {
      eyebrow: "Development Opportunity",
      title: "A proposed townhome site with an established diligence record.",
      body:
        "The opportunity pairs a defined 58-townhome concept with a package of historical planning, access, water, and wastewater records. Those materials provide a useful starting point—not a representation that the site is currently fully entitled or permit-ready.",
      points: [
        "Wastewater permit record references service for 58 three-bedroom townhomes",
        "2023 driveway and water-main approvals are included in the supplied file",
        "Current approvals and development requirements remain subject to verification",
      ],
    },
    location: {
      eyebrow: "Location Context",
      title: "A residential development site in Lexington, North Carolina.",
      body:
        "The property is identified at 1111 Brown Street in Lexington. Buyers should confirm the legal parcel schedule, access, municipal requirements, utility service, and measured proximity to surrounding destinations during diligence.",
      points: ["Lexington, North Carolina", "Davidson County", "Brown Street address"],
    },
    externalLinks: [],
    advisorId: "gaurang-gala",
    listingPage: {
      headline: "A proposed 58-townhome opportunity supported by a historical approval record.",
      lead:
        "A three-parcel Lexington development site marketed at approximately 6.6 acres, with a proposed 58-townhome program and client-supplied 2023 planning, access, and utility records available for buyer review.",
      overviewEyebrow: "The Opportunity",
      keyFacts: [
        { label: "Offering", value: "Contact for pricing" },
        { label: "Site area", value: "Approx. 6.6 acres" },
        { label: "Proposed program", value: "58 townhomes" },
        { label: "Approval record", value: "Historical; verify current status" },
      ],
      highlights: [
        "Three-parcel assemblage identified in the supplied property materials",
        "Wastewater permit record references 58 three-bedroom townhomes",
        "Historical 2023 driveway, water-main, and erosion-control records supplied",
        "Current status, transferability, conditions, and remaining approvals require verification",
      ],
      information: {
        intro: {
          eyebrow: "Property Information",
          title: "Separate the proposed program from the current approval record.",
          body:
            "The supplied materials establish a documented planning history. Buyers should review each record against the current site plan, ownership, schedule, and intended development program.",
        },
        groups: [
          {
            eyebrow: "Site & Program",
            title: "A defined townhome concept across three identified parcels.",
            body:
              "Marketing materials describe an approximately 6.6-acre site at 1111 Brown Street for a proposed 58-townhome community. Surveyed acreage, boundaries, parcel ownership, density, and the final program should be confirmed from the current legal and municipal record.",
            facts: [
              { label: "Street address", value: "1111 Brown Street" },
              { label: "Marketed area", value: "Approx. 6.6 acres" },
              { label: "Parcel count", value: "Three identified parcels" },
              { label: "Proposed homes", value: "58 townhomes" },
              { label: "Site plan", value: "Request current plan and revision history" },
              { label: "Survey", value: "Buyer to confirm boundaries and acreage" },
            ],
          },
          {
            eyebrow: "Historical Approval Record",
            title: "Useful diligence exists, but currency and transferability matter.",
            body:
              "Client-supplied records include 2023 erosion-control, driveway, water-main, and wastewater approvals. Several contain completion, expiration, transfer, certification, or other conditions. They should be reviewed with the issuing authorities and buyer advisers before reliance.",
            facts: [
              { label: "Erosion control", value: "2023 approval with modifications; verify current status" },
              { label: "Driveway connection", value: "2023 NCDOT record; verify completion and validity" },
              { label: "Water main", value: "2023 encroachment record; verify completion and validity" },
              { label: "Wastewater", value: "2023 permit record for proposed 58-home service" },
              { label: "Transferability", value: "Confirm with each issuing authority" },
              { label: "Remaining permits", value: "Buyer and authorities to determine" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Buyer Verification",
        title: "What is offered—and what the diligence package must establish.",
        conditions: [
          { label: "Pricing", value: "Contact the listing advisor for current pricing" },
          { label: "Program", value: "Proposed 58-townhome opportunity" },
          { label: "Site area", value: "Approximately 6.6 acres in marketing; survey controls" },
          { label: "Approval position", value: "Historical records available; no current fully entitled representation" },
          { label: "Buyer review", value: "Confirm ownership, boundaries, approvals, conditions, utilities, and remaining development requirements" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Site & Surroundings",
          title: "Aerial context for the proposed Lexington townhome site.",
          body:
            "Client-supplied drone photography shows the property setting and surrounding context. These unannotated images do not establish parcel boundaries or the limits of the offering.",
        },
        items: [
          {
            src: lexington01,
            alt: "Aerial view toward the proposed townhome site at 1111 Brown Street in Lexington",
            caption: "Brown Street and site context",
          },
          {
            src: lexington02,
            alt: "Top-down aerial context of the proposed Lexington townhome site",
            caption: "Site and surrounding context",
          },
          {
            src: lexington03,
            alt: "Angled aerial view of the Brown Street site and nearby neighborhood",
            caption: "Neighborhood context",
          },
          {
            src: lexington04,
            alt: "Wide aerial view of the area surrounding 1111 Brown Street in Lexington",
            caption: "Wider Lexington context",
          },
          {
            src: lexington05,
            alt: "Aerial view of the wooded site setting near Brown Street",
            caption: "Existing site setting",
          },
        ],
        note: "Photography is for orientation only and does not establish legal boundaries.",
      },
      video: {
        eyebrow: "Property Film",
        title: "Explore the Lexington opportunity in motion.",
        body:
          "This vertical property film introduces the Lexington market and proposed townhome opportunity. The video is marketing context only; current approvals, boundaries, acreage, and development feasibility require independent verification.",
        sourceUrl: lexingtonTour,
        posterImage: lexingtonTourPoster,
        ariaLabel: "Play the vertical property video for the Lexington Townhome Site",
        orientation: "portrait",
      },
      location: {
        eyebrow: "Location & Access",
        title: "A Lexington site with a documented Brown Street address.",
        body:
          "The property is identified at 1111 Brown Street in Lexington, Davidson County. Buyers should independently verify legal access, roadway conditions, parcel boundaries, municipal jurisdiction, utility availability, and distances to surrounding destinations.",
        points: [
          "1111 Brown Street, Lexington, North Carolina",
          "Davidson County",
          "Three-parcel assemblage identified in supplied materials",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=1111%20Brown%20Street%2C%20Lexington%2C%20NC%2027292&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=1111%20Brown%20Street%2C%20Lexington%2C%20NC%2027292",
      },
      documents: {
        intro: {
          eyebrow: "Documents & Diligence",
          title: "Review the record before underwriting the program.",
          body:
            "Request the current property package and evaluate the historical approvals with the issuing authorities and appropriate legal, engineering, and development advisers.",
        },
        items: [
          {
            title: "Historical approval record",
            description: "Request the supplied erosion-control, NCDOT, water-main, and wastewater records for review.",
            actionLabel: "Request Approval Record",
            href: "/contact?property=1111-brown-street&topic=approval-record",
          },
          {
            title: "Survey and parcel package",
            description: "Request the available parcel schedule, survey, ownership, and site-plan materials.",
            actionLabel: "Request Property Record",
            href: "/contact?property=1111-brown-street&topic=property-record",
          },
          {
            title: "Development diligence package",
            description: "Request the available materials needed to evaluate access, utilities, approvals, and remaining development work.",
            actionLabel: "Request Diligence",
            href: "/contact?property=1111-brown-street&topic=development-diligence",
          },
        ],
      },
      advisorEyebrow: "Listing Advisor",
      disclosure:
        "All information is deemed reliable but is not guaranteed. The proposed 58-townhome program, approximately 6.6-acre figure, parcel composition, and historical approval record require independent verification. Historical records may contain expiration, completion, transfer, certification, or other conditions and do not establish current entitlement or permit readiness. Buyers should independently verify ownership, boundaries, acreage, access, utilities, approvals, conditions, and all development requirements.",
    },
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "802-bragg-boulevard",
    name: "802 Bragg Boulevard",
    address: "802 Bragg Boulevard",
    city: "Fayetteville",
    state: "NC",
    coordinates: { latitude: 35.0626545, longitude: -78.8911598 },
    assetType: "Retail",
    offeringType: "For Sale",
    status: "Closed",
    sizeDisplay: "2,529 SF",
    acreageDisplay: "1.15 acres",
    heroImage: braggBoulevardExterior,
    gallery: [braggBoulevardApproach, braggBoulevardInterior],
    imagePosition: "center",
    summary: "Recently sold retail property with convenience-store, automotive-service, and car-wash improvements.",
    overview:
      "A recently completed Gala CRE transaction involving a 2,529-square-foot retail property on approximately 1.15 acres along Bragg Boulevard in Fayetteville.",
    highlights: [
      "Recently sold retail transaction",
      "2,529-square-foot building",
      "Approximately 1.15-acre site",
      "Convenience-store, automotive-service, and car-wash improvements represented at the time of offering",
    ],
    details: [
      { label: "Transaction status", value: "Recently sold" },
      { label: "Property type", value: "Retail" },
      { label: "Building area", value: "2,529 SF" },
      { label: "Site area", value: "1.15 acres" },
    ],
    opportunity: {
      eyebrow: "Completed Transaction",
      title: "A flexible retail and service property on Bragg Boulevard.",
      body:
        "At the time of offering, the property combined a convenience store, automotive-service space, car-wash improvements, and fuel infrastructure. The completed transaction is presented as a record of Gala CRE's retail brokerage work, not as current availability.",
      points: [
        "Multiple operating components represented in the former offering",
        "Bragg Boulevard frontage and established commercial positioning",
        "Prior asking terms are not represented as the final sale terms",
      ],
    },
    location: {
      eyebrow: "Property Context",
      title: "A Bragg Boulevard retail position near central Fayetteville.",
      body:
        "The property sits along Bragg Boulevard in Fayetteville. The former offering cited proximity to the downtown corridor; all location details shown here describe the property context and do not imply that it remains available.",
      points: ["Fayetteville, North Carolina", "Cumberland County", "Bragg Boulevard frontage"],
    },
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/1810031/north-carolina-valero",
      },
      {
        label: "LoopNet",
        href: "https://www.loopnet.com/Listing/802-Bragg-Blvd-Fayetteville-NC/39012701/",
      },
    ],
    advisorId: "gaurang-gala",
    listingPage: {
      headline: "Recently sold retail property on Bragg Boulevard.",
      lead:
        "A completed Fayetteville transaction involving a 2,529-square-foot convenience-store and automotive-service property on approximately 1.15 acres.",
      overviewEyebrow: "Recently Sold",
      keyFacts: [
        { label: "Transaction status", value: "Recently sold" },
        { label: "Building area", value: "2,529 SF" },
        { label: "Site area", value: "1.15 acres" },
        { label: "Asset type", value: "Retail / service" },
      ],
      highlights: [
        "One-story retail and service building",
        "Convenience-store, automotive-service, and car-wash components represented in the former offering",
        "Bragg Boulevard frontage with pylon signage",
        "Gala CRE listing representation documented by the public Crexi record",
      ],
      information: {
        intro: {
          eyebrow: "Property at Closing",
          title: "A multi-component commercial property with operating flexibility.",
          body:
            "The public marketing record describes the asset as it was offered. Tenant, lease, fuel, occupancy, and operating conditions may have changed as part of or after the transaction.",
        },
        groups: [
          {
            eyebrow: "Physical Profile",
            title: "Retail and service improvements on a 1.15-acre site.",
            body:
              "The former offering combined a convenience-store building, automotive bays, car-wash improvements, fuel pumps, and supporting site area along Bragg Boulevard.",
            facts: [
              { label: "Building area", value: "2,529 SF" },
              { label: "Site area", value: "1.15 acres" },
              { label: "Buildings", value: "One" },
              { label: "Stories", value: "One" },
              { label: "Year built", value: "1987 per LoopNet" },
              { label: "Zoning", value: "C3 reported by public listings" },
            ],
          },
          {
            eyebrow: "Former Offering",
            title: "The sale followed a flexible owner-user and investor position.",
            body:
              "Crexi's former marketing described three operating components and month-to-month occupancy, along with an expired fuel agreement. Those details explain the original brokerage thesis but are not presented as current post-closing conditions.",
            facts: [
              { label: "Former subtype", value: "Convenience store" },
              { label: "Operating components", value: "C-store, automotive service, and car wash" },
              { label: "Fuel agreement", value: "Reported expired at time of offering" },
              { label: "Frontage", value: "99 feet on Bragg Boulevard per LoopNet" },
              { label: "Parking", value: "10 spaces reported by LoopNet" },
              { label: "Opportunity zone", value: "Reported by Crexi and LoopNet" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Transaction Record",
        title: "What this page confirms—and what remains private.",
        conditions: [
          { label: "Status", value: "Recently sold, as confirmed by Gala CRE and the current Crexi sold flag" },
          { label: "Public availability", value: "The property is no longer advertised on LoopNet" },
          { label: "Sale price", value: "Not published; former asking prices are not presented as closing consideration" },
          { label: "Closing date", value: "Not published" },
          { label: "Operating details", value: "Listing-period facts only; not represented as current ownership or tenancy conditions" },
        ],
      },
      gallery: {
        intro: {
          eyebrow: "Transaction Gallery",
          title: "The property as presented during the sale process.",
          body:
            "These images come from the former Crexi listing and document the property's exterior, Bragg Boulevard setting, and convenience-store interior at the time of marketing.",
        },
        items: [
          {
            src: braggBoulevardExterior,
            alt: "Front exterior of the retail and automotive property at 802 Bragg Boulevard",
            caption: "Retail, automotive-service, and car-wash improvements",
          },
          {
            src: braggBoulevardApproach,
            alt: "Bragg Boulevard street view of the retail and automotive property",
            caption: "Bragg Boulevard frontage and pylon signage",
          },
          {
            src: braggBoulevardInterior,
            alt: "Convenience-store interior at 802 Bragg Boulevard during the former offering",
            caption: "Convenience-store interior during marketing",
          },
        ],
      },
      location: {
        eyebrow: "Location & Context",
        title: "A commercial site on Bragg Boulevard in Fayetteville.",
        body:
          "The property is located in Cumberland County along Bragg Boulevard. Public marketing identified proximity to central Fayetteville and the downtown corridor. The map is provided as historical property context, not current availability.",
        points: [
          "802 Bragg Boulevard, Fayetteville, North Carolina 28301",
          "Cumberland County",
          "Bragg Boulevard frontage",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=802%20Bragg%20Boulevard%2C%20Fayetteville%2C%20NC%2028301&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=802%20Bragg%20Boulevard%2C%20Fayetteville%2C%20NC%2028301",
      },
      documents: {
        intro: {
          eyebrow: "Public Transaction Record",
          title: "Review the former marketing record or discuss a similar assignment.",
          body:
            "The linked marketplace pages preserve the public property record. Confidential closing terms and post-closing operating details are not published here.",
        },
        items: [
          {
            title: "Crexi transaction record",
            description: "Review the former Gala CRE listing, property facts, and current sold designation.",
            actionLabel: "Open Crexi Record",
            href: "https://www.crexi.com/properties/1810031/north-carolina-valero",
            external: true,
          },
          {
            title: "LoopNet property record",
            description: "Review the archived public property facts and off-market availability notice.",
            actionLabel: "Open LoopNet Record",
            href: "https://www.loopnet.com/Listing/802-Bragg-Blvd-Fayetteville-NC/39012701/",
            external: true,
          },
          {
            title: "Similar-property conversation",
            description: "Speak with Gala CRE about selling, acquiring, or repositioning a comparable retail property.",
            actionLabel: "Discuss a Similar Property",
            href: "/contact?property=802-bragg-boulevard&topic=similar-property",
          },
        ],
      },
      advisorEyebrow: "Transaction Advisor",
      disclosure:
        "This page presents a completed transaction and is not an offer to sell or lease the property. Physical, operating, tenant, lease, fuel, zoning, parking, frontage, and opportunity-zone details reflect the former public marketing record and are not represented as current. Sale price, closing date, and confidential transaction terms have not been published.",
    },
    featured: false,
    sortOrder: 1,
  },
  {
    slug: "202-north-main-street",
    name: "202 North Main Street",
    address: "202 North Main Street",
    city: "Fuquay-Varina",
    state: "NC",
    coordinates: { latitude: 35.5867757, longitude: -78.7997934 },
    assetType: "Retail",
    offeringType: "For Sale",
    status: "Closed",
    sizeDisplay: "3,333 SF",
    acreageDisplay: "0.23 acres",
    heroImage: transactionRecordGraphic,
    imageAlt: "Gala CRE completed transaction graphic; property photography is not published",
    imagePosition: "center",
    summary: "Completed commercial transaction involving a 3,333-square-foot property on approximately 0.23 acres.",
    overview:
      "The client-directed transaction record identifies a commercial property at 202 North Main Street that closed on July 30, 2026. Physical facts shown here come from the supplied MLS record; transaction pricing and MLS photography remain unpublished.",
    highlights: [
      "Closed July 30, 2026",
      "3,333-square-foot commercial building",
      "Approximately 0.23-acre site",
      "Two-story property built in 1958 per the supplied record",
    ],
    details: [
      { label: "Transaction status", value: "Closed" },
      { label: "Closing date", value: "July 30, 2026" },
      { label: "Building area", value: "3,333 SF" },
      { label: "Site area", value: "Approx. 0.23 acres" },
    ],
    opportunity: {
      eyebrow: "Completed Transaction",
      title: "A commercial property transaction in Fuquay-Varina.",
      body:
        "The supplied record describes a two-story commercial property with a retail classification. This page documents the completed transaction without publishing unconfirmed economics or restricted MLS media.",
      points: [
        "Commercial / retail classification in the supplied MLS record",
        "DC-2 zoning reported by the supplied record",
        "Former marketing referenced two parcels; the legal parcel schedule is not represented here",
      ],
    },
    location: {
      eyebrow: "Property Context",
      title: "A North Main Street property in Fuquay-Varina.",
      body:
        "The completed transaction is identified at 202 North Main Street in Fuquay-Varina, Wake County. Location details are provided as historical transaction context and do not imply current availability.",
      points: ["Fuquay-Varina, North Carolina", "Wake County", "North Main Street"],
    },
    externalLinks: [],
    gallery: [],
    listingPage: {
      headline: "A completed 3,333-square-foot commercial transaction in Fuquay-Varina.",
      lead:
        "Closed July 30, 2026, this transaction involved a two-story commercial property on approximately 0.23 acres. Pricing and MLS photography are intentionally not published.",
      overviewEyebrow: "Completed Transaction",
      keyFacts: [
        { label: "Transaction status", value: "Closed" },
        { label: "Closing date", value: "July 30, 2026" },
        { label: "Building area", value: "3,333 SF" },
        { label: "Site area", value: "Approx. 0.23 acres" },
      ],
      highlights: [
        "Commercial / retail property classification",
        "Two-story building constructed in 1958 per the supplied record",
        "DC-2 zoning reported by the supplied MLS record",
        "No transaction price or MLS photography published",
      ],
      information: {
        intro: {
          eyebrow: "Property Record",
          title: "Verified physical facts, separated from confidential terms.",
          body:
            "The supplied MLS display supports a concise property profile. It does not clearly identify the displayed price as closing consideration, so no price is represented here.",
        },
        groups: [
          {
            eyebrow: "Physical Profile",
            title: "A two-story commercial building on North Main Street.",
            body:
              "The property record identifies a 3,333-square-foot building on approximately 0.23 acres. All facts describe the property at the time of the supplied record and are not a statement of current condition or availability.",
            facts: [
              { label: "Building area", value: "3,333 SF" },
              { label: "Site area", value: "Approx. 0.23 acres" },
              { label: "Stories", value: "Two" },
              { label: "Year built", value: "1958 per supplied record" },
              { label: "Reported zoning", value: "DC-2" },
              { label: "Parcel presentation", value: "Former marketing referenced two parcels" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Transaction Record",
        title: "What is confirmed—and what remains unpublished.",
        conditions: [
          { label: "Status", value: "Closed July 30, 2026" },
          { label: "Transaction price", value: "Not published pending confirmation" },
          { label: "Photography", value: "MLS imagery not republished" },
          { label: "Property facts", value: "Based on the client-supplied MLS display" },
          { label: "Current availability", value: "Not available; completed transaction" },
        ],
      },
      location: {
        eyebrow: "Location & Context",
        title: "A completed transaction in Fuquay-Varina, North Carolina.",
        body:
          "The map identifies the recorded street address for historical context. It does not represent current availability, ownership, tenancy, or operating conditions.",
        points: [
          "202 North Main Street, Fuquay-Varina, North Carolina 27526",
          "Wake County",
          "Closed July 30, 2026",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=202%20North%20Main%20Street%2C%20Fuquay-Varina%2C%20NC%2027526&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=202%20North%20Main%20Street%2C%20Fuquay-Varina%2C%20NC%2027526",
      },
      documents: {
        intro: {
          eyebrow: "Work With Gala CRE",
          title: "Discuss a comparable commercial assignment.",
          body:
            "Confidential transaction terms are not published. Connect with Gala CRE to discuss a similar property, disposition, or acquisition requirement.",
        },
        items: [
          {
            title: "Similar-property conversation",
            description: "Discuss selling, acquiring, or evaluating a comparable commercial property with Gala CRE.",
            actionLabel: "Discuss a Similar Property",
            href: "/contact?property=202-north-main-street&topic=similar-property",
          },
        ],
      },
      disclosure:
        "This page presents a completed transaction and is not an offer to sell or lease the property. Physical and zoning details reflect the supplied transaction record and are not represented as current. Transaction price, confidential terms, MLS photography, current ownership, occupancy, and operating information are not published.",
    },
    featured: false,
    sortOrder: 2,
  },
  {
    slug: "10416-chapel-hill-road",
    name: "10416 Chapel Hill Road",
    address: "10416 Chapel Hill Road",
    city: "Morrisville",
    state: "NC",
    coordinates: { latitude: 35.8389721, longitude: -78.8311721 },
    assetType: "Land",
    offeringType: "For Sale",
    status: "Closed",
    acreageDisplay: "Approx. 3.3 acres",
    heroImage: transactionRecordGraphic,
    imageAlt: "Gala CRE completed transaction graphic; property photography is not published",
    imagePosition: "center",
    summary: "Completed commercial land transaction involving approximately 3.3 acres in Morrisville.",
    overview:
      "The supplied MLS record identifies a commercial transaction at 10416 Chapel Hill Road that closed on July 29, 2026 and involved two parcels totaling approximately 3.3 acres. Transaction pricing and MLS photography remain unpublished.",
    highlights: [
      "Closed July 29, 2026",
      "Approximately 3.3 acres",
      "Two parcels identified in the supplied transaction record",
      "Gala listing involvement documented by the supplied MLS display",
    ],
    details: [
      { label: "Transaction status", value: "Closed" },
      { label: "Closing date", value: "July 29, 2026" },
      { label: "Site area", value: "Approx. 3.3 acres" },
      { label: "Parcel count", value: "Two per supplied record" },
    ],
    opportunity: {
      eyebrow: "Completed Transaction",
      title: "A commercial land transaction in Morrisville.",
      body:
        "The supplied record describes a commercial sale involving land marketed for commercial use, two parcels, and an existing one-story improvement. This page documents the completed transaction without publishing disputed economics or restricted MLS media.",
      points: [
        "Approximately 3.3 acres in the supplied record",
        "Two parcels identified by the transaction record",
        "Gala Real Estate Advisors listing involvement documented by the supplied MLS display",
      ],
    },
    location: {
      eyebrow: "Property Context",
      title: "A Chapel Hill Road transaction in Morrisville.",
      body:
        "The completed transaction is identified at 10416 Chapel Hill Road in Morrisville, Wake County. Location details are provided as historical transaction context and do not imply current availability.",
      points: ["Morrisville, North Carolina", "Wake County", "Chapel Hill Road"],
    },
    externalLinks: [],
    gallery: [],
    listingPage: {
      headline: "A completed commercial land transaction on Chapel Hill Road.",
      lead:
        "Closed July 29, 2026, the supplied record describes approximately 3.3 acres across two parcels in Morrisville. Pricing and MLS photography are intentionally not published.",
      overviewEyebrow: "Completed Transaction",
      keyFacts: [
        { label: "Transaction status", value: "Closed" },
        { label: "Closing date", value: "July 29, 2026" },
        { label: "Site area", value: "Approx. 3.3 acres" },
        { label: "Parcel count", value: "Two per supplied record" },
      ],
      highlights: [
        "Gala Real Estate Advisors listing involvement documented by the supplied MLS display",
        "Two parcels identified by the supplied MLS display",
        "One-story improvement built in 1920 reported by the supplied record",
        "No transaction price or MLS photography published",
      ],
      information: {
        intro: {
          eyebrow: "Property Record",
          title: "A concise record of the completed assignment.",
          body:
            "The supplied MLS display supports the address, closing date, approximate acreage, parcel count, and Gala listing involvement. Conflicting price and combined-address information remain outside the public presentation.",
        },
        groups: [
          {
            eyebrow: "Physical Profile",
            title: "Two commercial parcels totaling approximately 3.3 acres.",
            body:
              "The transaction record identifies two parcels and a one-story improvement at the marketed address. Facts shown here reflect the supplied record and are not a statement of current condition or availability.",
            facts: [
              { label: "Site area", value: "Approx. 3.3 acres" },
              { label: "Parcel count", value: "Two" },
              { label: "Improvement", value: "One-story structure per supplied record" },
              { label: "Year built", value: "1920 per supplied record" },
              { label: "Property position", value: "Commercial use cited in former marketing" },
              { label: "Building area", value: "Not published" },
            ],
          },
        ],
      },
      transaction: {
        eyebrow: "Transaction Record",
        title: "What is confirmed—and what remains unpublished.",
        conditions: [
          { label: "Status", value: "Closed July 29, 2026" },
          { label: "Off-market record", value: "July 31, 2026 in the supplied MLS display" },
          { label: "Transaction price", value: "Not published pending confirmation" },
          { label: "Photography", value: "MLS imagery not republished" },
          { label: "Address presentation", value: "This record is limited to 10416 Chapel Hill Road" },
        ],
      },
      location: {
        eyebrow: "Location & Context",
        title: "A completed transaction in Morrisville, North Carolina.",
        body:
          "The map identifies the recorded street address for historical context. It does not represent current availability, ownership, tenancy, or development status.",
        points: [
          "10416 Chapel Hill Road, Morrisville, North Carolina 27560",
          "Wake County",
          "Closed July 29, 2026",
        ],
        mapEmbedUrl:
          "https://www.google.com/maps?q=10416%20Chapel%20Hill%20Road%2C%20Morrisville%2C%20NC%2027560&output=embed",
        mapHref:
          "https://www.google.com/maps/search/?api=1&query=10416%20Chapel%20Hill%20Road%2C%20Morrisville%2C%20NC%2027560",
      },
      documents: {
        intro: {
          eyebrow: "Work With Gala CRE",
          title: "Discuss a comparable commercial assignment.",
          body:
            "Confidential transaction terms are not published. Connect with Gala CRE to discuss a similar land, disposition, or acquisition requirement.",
        },
        items: [
          {
            title: "Similar-property conversation",
            description: "Discuss selling, acquiring, or evaluating a comparable commercial property with Gala CRE.",
            actionLabel: "Discuss a Similar Property",
            href: "/contact?property=10416-chapel-hill-road&topic=similar-property",
          },
        ],
      },
      disclosure:
        "This page presents a completed transaction and is not an offer to sell or lease the property. Physical and property-use details reflect the supplied transaction record and are not represented as current. Transaction price, confidential terms, MLS photography, current ownership, occupancy, and development information are not published. This page is limited to the 10416 Chapel Hill Road record and does not characterize any separate 10414 Chapel Hill Road transaction.",
    },
    featured: false,
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
  advisorId?: TeamMemberId;
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
      (!filters.advisorId || property.advisorId === filters.advisorId) &&
      (filters.assetType === "All" || property.assetType === filters.assetType) &&
      (filters.offeringType === "All" || property.offeringType === filters.offeringType) &&
      (filters.status === "All" || property.status === filters.status)
    );
  });
};
