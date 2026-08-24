import { describe, expect, it } from "vitest";
import {
  filterProperties,
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
  property({ slug: "active-retail", name: "Active Retail", assetType: "Retail", offeringType: "For Lease", sortOrder: 3 }),
  property({ slug: "active-industrial", name: "Active Industrial", sortOrder: 1 }),
  property({ slug: "contract-land", name: "Contract Land", assetType: "Land", status: "Under Contract", sortOrder: 1 }),
];

describe("property content model", () => {
  it("includes the three current Gala sale listings", () => {
    expect(properties).toHaveLength(3);
    expect(properties.every((item) => item.offeringType === "For Sale")).toBe(true);
    expect(propertyBySlug["2301-lackey-street"]?.priceDisplay).toBe("$549,000");
    expect(propertyBySlug["5047-yadkin-road"]?.acreageDisplay).toBe("3.46 acres");
    expect(propertyBySlug["611-703-church-street"]?.city).toBe("Morrisville");
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
});
