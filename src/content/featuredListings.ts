import { featuredProperties } from "@/content/properties";

export type FeaturedListingPreview = {
  id: string;
  name: string;
  offeringType: "For Lease" | "For Sale";
  assetType: string;
  address: string;
  details?: string;
  price?: string;
  size?: string;
  href: string;
  image?: string;
  imagePosition?: string;
};

const leasePlaceholders: FeaturedListingPreview[] = [
  {
    id: "lease-placeholder-01",
    name: "Featured Lease Opportunity 01",
    offeringType: "For Lease",
    assetType: "Office",
    address: "Raleigh-Durham, North Carolina",
    details: "Rate and availability forthcoming",
    href: "/properties",
  },
  {
    id: "lease-placeholder-02",
    name: "Featured Lease Opportunity 02",
    offeringType: "For Lease",
    assetType: "Retail",
    address: "Research Triangle, North Carolina",
    details: "Rate and availability forthcoming",
    href: "/properties",
  },
  {
    id: "lease-placeholder-03",
    name: "Featured Lease Opportunity 03",
    offeringType: "For Lease",
    assetType: "Industrial",
    address: "Triangle Region, North Carolina",
    details: "Rate and availability forthcoming",
    href: "/properties",
  },
  {
    id: "lease-placeholder-04",
    name: "Featured Lease Opportunity 04",
    offeringType: "For Lease",
    assetType: "Land",
    address: "Raleigh-Durham, North Carolina",
    details: "Rate and acreage forthcoming",
    href: "/properties",
  },
];

const saleListings: FeaturedListingPreview[] = featuredProperties
  .filter((property) => property.offeringType === "For Sale")
  .map((property) => ({
    id: property.slug,
    name: property.name,
    offeringType: property.offeringType,
    assetType: property.assetType,
    address: `${property.city}, ${property.state}`,
    price: property.priceDisplay,
    size: property.acreageDisplay ?? property.sizeDisplay,
    href: `/properties/${property.slug}`,
    image: property.heroImage,
    imagePosition: property.imagePosition,
  }));

// Lease cards remain structural placeholders until client-approved listings arrive.
export const featuredListingPlaceholders: FeaturedListingPreview[] = [
  ...leasePlaceholders,
  ...saleListings,
];
