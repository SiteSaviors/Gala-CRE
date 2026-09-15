import { describe, expect, it } from "vitest";
import {
  filterProperties,
  featuredProperties,
  findPropertyBySlug,
  properties,
  propertyBySlug,
  sortProperties,
  type Property,
} from "@/content/properties";

const property = (overrides: Partial<Property>): Property => ({
  slug: "triangle-industrial",
  name: "Triangle Industrial Center",
  address: "100 Commerce Way",
  city: "Durham",
  state: "NC",
  assetType: "Industrial",
  offeringType: "For Sale",
  status: "Active",
  heroImage: "/property.jpg",
  gallery: [],
  summary: "Approved industrial opportunity in the Research Triangle.",
  overview: "Property overview.",
  highlights: [],
  externalLinks: [],
  featured: true,
  sortOrder: 2,
  ...overrides,
});

const records = [
  property({ slug: "closed-office", name: "Closed Office", assetType: "Office", status: "Closed", sortOrder: 1 }),
  property({ slug: "active-retail", name: "Active Retail", assetType: "Retail", offeringType: "For Lease", advisorId: "leigh-roach", sortOrder: 3 }),
  property({ slug: "active-industrial", name: "Active Industrial", sortOrder: 1 }),
  property({ slug: "contract-land", name: "Contract Land", assetType: "Land", status: "Under Contract", sortOrder: 1 }),
];

describe("property content model", () => {
  it("includes five active listings and three completed transactions", () => {
    expect(properties).toHaveLength(8);
    expect(properties.every((item) => item.offeringType === "For Sale")).toBe(true);
    expect(properties.filter((item) => item.status === "Active")).toHaveLength(5);
    expect(properties.filter((item) => item.status === "Closed")).toHaveLength(3);
    expect(properties.every((item) => item.coordinates)).toBe(true);
    expect(featuredProperties).toHaveLength(5);
    expect(propertyBySlug["2301-lackey-street"]?.priceDisplay).toBe("$549,000");
    expect(propertyBySlug["5047-yadkin-road"]?.acreageDisplay).toBe("3.46 acres");
    expect(propertyBySlug["611-703-church-street"]?.city).toBe("Morrisville");
    expect(propertyBySlug["5911-family-farm-road"]).toMatchObject({
      priceDisplay: "$995,000",
      acreageDisplay: "2.10 acres",
      assetType: "Land",
      status: "Active",
    });
    expect(propertyBySlug["1111-brown-street"]).toMatchObject({
      priceDisplay: "Contact for pricing",
      acreageDisplay: "Approx. 6.6 acres",
      assetType: "Land",
      status: "Active",
      advisorId: "gaurang-gala",
      featured: true,
      coordinates: { latitude: 35.7860804, longitude: -80.2780045 },
    });
    expect(propertyBySlug["802-bragg-boulevard"]).toMatchObject({
      sizeDisplay: "2,529 SF",
      acreageDisplay: "1.15 acres",
      assetType: "Retail",
      status: "Closed",
      featured: false,
    });
    expect(propertyBySlug["202-north-main-street"]).toMatchObject({
      sizeDisplay: "3,333 SF",
      acreageDisplay: "0.23 acres",
      assetType: "Retail",
      status: "Closed",
      featured: false,
    });
    expect(propertyBySlug["202-north-main-street"]?.priceDisplay).toBeUndefined();
    expect(propertyBySlug["10416-chapel-hill-road"]).toMatchObject({
      acreageDisplay: "Approx. 3.3 acres",
      assetType: "Land",
      status: "Closed",
      featured: false,
    });
    expect(propertyBySlug["10416-chapel-hill-road"]?.priceDisplay).toBeUndefined();
    expect(featuredProperties.some((item) => item.slug === "802-bragg-boulevard")).toBe(false);
    expect(propertyBySlug["5911-family-farm-road"]?.advisorId).toBe("leigh-roach");
    expect(properties.filter((item) => item.advisorId && item.slug !== "5911-family-farm-road").every((item) => item.advisorId === "gaurang-gala")).toBe(true);
    expect(propertyBySlug["2301-lackey-street"]?.listingPage?.gallery?.items).toHaveLength(5);
    expect(propertyBySlug["2301-lackey-street"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["611-703-church-street"]?.listingPage?.gallery?.items).toHaveLength(5);
    expect(propertyBySlug["611-703-church-street"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["5047-yadkin-road"]?.listingPage?.gallery?.items).toHaveLength(1);
    expect(propertyBySlug["5047-yadkin-road"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["5911-family-farm-road"]?.listingPage?.gallery?.items).toHaveLength(5);
    expect(propertyBySlug["5911-family-farm-road"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["5911-family-farm-road"]?.listingPage?.video?.sourceUrl).toMatch(/family-farm-tour\.mp4$/);
    expect(propertyBySlug["611-703-church-street"]?.listingPage?.video?.sourceUrl).toMatch(/church-street-tour\.mp4$/);
    expect(propertyBySlug["1111-brown-street"]?.listingPage?.gallery?.items).toHaveLength(5);
    expect(propertyBySlug["1111-brown-street"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["1111-brown-street"]?.listingPage?.video).toMatchObject({
      sourceUrl: expect.stringMatching(/lexington-townhomes-tour\.mp4$/),
      posterImage: expect.stringMatching(/lexington-townhomes-poster\.webp$/),
      orientation: "portrait",
    });
    expect(propertyBySlug["1111-brown-street"]?.opportunity.body).toContain(
      "not a representation that the site is currently fully entitled or permit-ready",
    );
    expect(propertyBySlug["802-bragg-boulevard"]?.listingPage?.gallery?.items).toHaveLength(3);
    expect(propertyBySlug["802-bragg-boulevard"]?.listingPage?.information?.groups).toHaveLength(2);
    expect(propertyBySlug["202-north-main-street"]?.listingPage?.gallery).toBeUndefined();
    expect(propertyBySlug["10416-chapel-hill-road"]?.listingPage?.gallery).toBeUndefined();
    expect(JSON.stringify(propertyBySlug["202-north-main-street"])).not.toContain("$825,000");
    expect(JSON.stringify(propertyBySlug["10416-chapel-hill-road"])).not.toContain("$2,500,000");
  });

  it("orders active records before under-contract and closed records", () => {
    expect(sortProperties(records).map((item) => item.slug)).toEqual([
      "active-industrial",
      "active-retail",
      "contract-land",
      "closed-office",
    ]);
  });

  it("combines keyword, asset, offering, and status filters", () => {
    expect(filterProperties(records, {
      query: "retail",
      assetType: "Retail",
      offeringType: "For Lease",
      status: "Active",
    }).map((item) => item.slug)).toEqual(["active-retail"]);
  });

  it("returns no results for a nonmatching query and finds records by slug", () => {
    expect(filterProperties(records, {
      query: "Charlotte",
      assetType: "All",
      offeringType: "All",
      status: "All",
    })).toEqual([]);
    expect(findPropertyBySlug(records, "contract-land")?.name).toBe("Contract Land");
    expect(findPropertyBySlug(records, "missing")).toBeUndefined();
  });

  it("filters active inventory by its authoritative advisor id", () => {
    expect(filterProperties(records, {
      query: "",
      assetType: "All",
      offeringType: "All",
      status: "Active",
      advisorId: "leigh-roach",
    }).map((item) => item.slug)).toEqual(["active-retail"]);
  });
});
