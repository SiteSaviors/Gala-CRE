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
export const properties: Property[] = [];

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
