import { expect, test } from "@playwright/test";

const requiredSitemapPaths = [
  "/news",
  "/properties/2301-lackey-street",
  "/properties/5047-yadkin-road",
  "/properties/611-703-church-street",
  "/properties/5911-family-farm-road",
  "/properties/802-bragg-boulevard",
] as const;

test.describe("launch artifacts", () => {
  test("publishes the current social card and complete priority sitemap", async ({ request }) => {
    const socialCard = await request.get("/gala-cre-social-share-v4.jpg");
    expect(socialCard.status()).toBe(200);
    expect(socialCard.headers()["content-type"]).toContain("image/jpeg");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapBody = await sitemap.text();

    for (const path of requiredSitemapPaths) {
      expect(sitemapBody).toContain(`<loc>https://www.galacregroup.com${path}</loc>`);
    }
  });
});
