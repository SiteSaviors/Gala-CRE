import churchStreetImage from "@/assets/properties/611-703-church-st.webp";
import lackeyStreetImage from "@/assets/properties/2301-lackey-st.webp";
import yadkinRoadImage from "@/assets/properties/5047-yadkin-rd.webp";

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
    summary: "Retail property near I-95 with redevelopment potential.",
    overview:
      "This 0.70-acre retail property offers an existing gas station and convenience-store site near I-95 Exit 19 in Lumberton. The property is positioned for an owner-user or redevelopment concept, subject to buyer verification and applicable approvals.",
    highlights: [
      "Existing gas station and convenience-store site",
      "Located near I-95 Exit 19",
      "Offered without an existing fuel contract",
      "Potential for alternative retail redevelopment",
    ],
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st",
      },
    ],
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
    summary: "Commercial land planned for a future shopping-center development.",
    overview:
      "This 3.46-acre commercial land opportunity includes an approved shopping-center site plan with planned access, circulation, parking, buffers, and utility connections. Buyers should independently verify all permits, approvals, and development requirements.",
    highlights: [
      "Approved shopping-center site plan",
      "Community Commercial zoning",
      "Planned ingress, egress, parking, and circulation",
      "Utility connections included in the approved plan",
    ],
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2033921/north-carolina-prime-location---land-with-opportunity-for-shopping-center",
      },
    ],
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
    gallery: [],
    imagePosition: "center",
    summary: "Entitlement-ready commercial land planned for childcare use.",
    overview:
      "Two adjacent infill parcels totaling approximately 1.09 acres in Morrisville offer a commercial development opportunity with approvals supporting a licensed childcare facility. Buyers should independently verify all zoning, entitlements, and development requirements.",
    highlights: [
      "Two adjacent infill parcels",
      "Entitlement-ready for childcare use",
      "Base zoning supports daycare operations",
      "Near Research Triangle Park and major employment corridors",
    ],
    externalLinks: [
      {
        label: "Crexi",
        href: "https://www.crexi.com/properties/2335675/north-carolina-611-703-church-st-morrisville-cary-nc-27560",
      },
    ],
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
