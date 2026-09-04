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

export const featuredListings: FeaturedListingPreview[] = saleListings;
