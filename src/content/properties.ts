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
