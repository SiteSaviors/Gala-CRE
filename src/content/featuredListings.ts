import { featuredProperties } from "@/content/properties";

export type FeaturedListingPreview = {
  id: string;
  name: string;
  offeringType: "For Lease" | "For Sale";
  status: "Active" | "Under Contract" | "Closed";
  assetType: string;
  address: string;
  summary: string;
  price?: string;
  size?: string;
  href: string;
  image: string;
  imagePosition?: string;
  images: {
    src: string;
    alt: string;
  }[];
};

const saleListings: FeaturedListingPreview[] = featuredProperties
  .filter((property) => property.offeringType === "For Sale")
  .map((property) => {
    const images = [
      {
        src: property.heroImage,
        alt: `${property.name} in ${property.city}, ${property.state}`,
      },
      ...(property.listingPage?.gallery?.items.map(({ src, alt }) => ({ src, alt })) ?? []),
      ...property.gallery.map((src, index) => ({
        src,
        alt: `${property.name} property view ${index + 2}`,
      })),
    ].filter((image, index, collection) =>
      collection.findIndex((candidate) => candidate.src === image.src) === index
    );

    return {
      id: property.slug,
      name: property.name,
      offeringType: property.offeringType,
      status: property.status,
      assetType: property.assetType,
      address: `${property.address}, ${property.city}, ${property.state}`,
      summary: property.summary,
      price: property.priceDisplay,
      size: property.acreageDisplay ?? property.sizeDisplay,
      href: `/properties/${property.slug}`,
      image: property.heroImage,
      imagePosition: property.imagePosition,
      images,
    };
  });

export const featuredListings: FeaturedListingPreview[] = saleListings;
