import { describe, expect, it } from "vitest";
import { featuredNewsItem, homepageNewsItems, newsItems, supportingNewsItems } from "@/content/news";

describe("news and media source of truth", () => {
  it("uses one featured item and two supporting homepage items", () => {
    expect(homepageNewsItems).toHaveLength(3);
    expect(featuredNewsItem).toMatchObject({
      id: "investor-podcast-gaurang-gala",
      format: "Podcast",
      associatedEntity: "Gala Investments · Radius Capital Development",
    });
    expect(supportingNewsItems).toHaveLength(2);
  });

  it("keeps explicit attribution and safe external URLs on every record", () => {
    newsItems.forEach((item) => {
      expect(item.associatedEntity).toBeTruthy();
      expect(item.associatedEntity).not.toBe("Gala CRE Group");
      expect(item.url).toMatch(/^https:\/\//);
      expect(item.summary).toBeTruthy();
      expect(item.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
