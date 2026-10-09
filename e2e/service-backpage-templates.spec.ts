import { expect, test, type Page } from "@playwright/test";

const industrialPath = "/services/investment-sales/industrial";
const industrialInquiryPath = "/contact?inquiry=investment-sales&focus=industrial";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  { name: "compact mobile", width: 320, height: 700 },
] as const;

const requiredSections = [
  "asset-positioning",
  "buyer-profile",
  "valuation-considerations",
  "sale-process",
] as const;

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
    const distance = Math.max(Math.floor(window.innerHeight * 0.8), 360);
    const height = document.documentElement.scrollHeight;

    for (let position = 0; position < height; position += distance) {
      window.scrollTo(0, position);
      await delay(20);
    }

    window.scrollTo(0, 0);
    await delay(80);
  });
};

test.describe("Industrial Investment Sales pilot template", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: preserves the underwriting-led journey without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

      const main = page.locator('main#main-content[data-capability-family="investment-sales"]');
      await expect(main).toBeVisible();
      await expect(main.locator("[data-capability-hero]")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Industrial Investment Sales", level: 1 })).toBeVisible();

      for (const section of requiredSections) {
        await expect(main.locator(`[data-capability-section="${section}"]`)).toHaveCount(1);
      }

      await expect(main.locator("[data-capability-related]")).toHaveCount(1);
      await expect(main.locator("[data-capability-cta]")).toHaveCount(1);
      await expect(main.locator(".gala-is-buyers__grid > article")).toHaveCount(3);
      await expect(main.locator(".gala-is-valuation__ledger > article")).toHaveCount(3);
      await expect(main.locator(".gala-is-execution__steps > article")).toHaveCount(4);
      await expect(main.locator(".gala-is-execution__scope-grid > article")).toHaveCount(4);

      const relatedRail = main.locator(".gala-is-related__links");
      expect(await relatedRail.evaluate((element) => getComputedStyle(element).position)).not.toBe("fixed");
      expect(await relatedRail.evaluate((element) => element.getBoundingClientRect().top + window.scrollY)).toBeGreaterThan(
        await main.locator("[data-capability-hero]").evaluate((element) => element.getBoundingClientRect().height),
      );

      const inquiryLinks = main.locator(`a[href="${industrialInquiryPath}"]`);
      await expect(inquiryLinks).toHaveCount(2);
      await expect(inquiryLinks.first()).toHaveAccessibleName("Discuss an Industrial Asset");
      await expect(main.locator('[data-capability-related] a[href="/services/investment-sales/land"]')).toHaveCount(1);

      await scrollThroughPage(page);
      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);

      await expect.poll(
        () => page.locator("img").evaluateAll((images) =>
          images
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src || "missing src"),
        ),
        { message: `${viewport.name}: Industrial images load`, timeout: 8_000 },
      ).toEqual([]);
    });
  }

  test("related capability navigation stays contextual without submitting a form", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

    const relatedLand = page.locator('[data-capability-related] a[href="/services/investment-sales/land"]');
    await relatedLand.click();
    await expect(page).toHaveURL(/\/services\/investment-sales\/land$/);
    await expect(page.getByRole("heading", { name: "Land Investment Sales", level: 1 })).toBeVisible();
  });

  test("reduced motion reveals every Industrial chapter immediately", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

    const revealItems = page.locator("main#main-content [data-capability-reveal]");
    await expect(revealItems.first()).toHaveClass(/is-visible/);
    expect(await revealItems.evaluateAll((items) => items.every((item) => item.classList.contains("is-visible")))).toBe(true);

    for (const section of requiredSections) {
      await expect(page.locator(`[data-capability-section="${section}"]`)).toBeAttached();
    }

    await context.close();
  });
});
