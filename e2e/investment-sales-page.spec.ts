import { expect, test } from "@playwright/test";

const responsiveViewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow mobile", width: 320, height: 700 },
] as const;

test.describe("Investment Sales narrative service page", () => {
  for (const viewport of responsiveViewports) {
    test(`${viewport.name}: preserves the full journey without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/services/investment-sales", { waitUntil: "domcontentloaded" });

      await expect(page.getByRole("heading", { name: "Investment Sales", level: 1 })).toBeVisible();
      await expect(page.locator(".gala-investment-narrative-hero__image>img")).toHaveCount(1);
      await expect(page.locator(".gala-service-detail__media")).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "Start With an Opinion of Value" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Preparation and Outreach That Build Buyer Confidence" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Target the Right Buyers" })).toBeVisible();
      await expect(page.locator(".gala-investment-narrative-confidence__panel")).toHaveCount(3);
      await expect(page.locator(".gala-investment-narrative-confidence__panel>img")).toHaveCount(3);
      await expect(page.locator(".gala-investment-narrative-outreach")).toHaveCount(0);
      await expect(page.getByText("Current Opportunities", { exact: true })).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "Asset Types", exact: true })).toBeVisible();
      await expect(page.locator(".gala-investment-narrative-assets__grid .gala-brokerage-coverage__item")).toHaveCount(5);
      await expect(page.locator(".gala-investment-narrative-faq__item")).toHaveCount(4);
      await expect(page.getByRole("button", { name: "Request a Consultation" })).toBeVisible();

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);

      if (viewport.width > 768) {
        await expect(page.locator(".gala-investment-narrative-hero h1")).toHaveCSS("white-space", "nowrap");
        expect(await page.locator(".gala-investment-narrative-hero").evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(620);
      } else {
        expect(await page.locator(".gala-investment-narrative-hero").evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(700);
      }
    });
  }

  test("asset-class routes open their dedicated editorial pages", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/investment-sales/land", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/services\/investment-sales\/land$/);
    await expect(page.locator(".gala-cap-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Land Investment Sales", level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Discuss a Land Opportunity/i }).first()).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=land",
    );
  });

  test("reduced motion and keyboard access remain usable", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/services/investment-sales", { waitUntil: "domcontentloaded" });

    const revealItems = page.locator("[data-investment-narrative-reveal]");
    await expect(revealItems.first()).toHaveClass(/is-visible/);
    expect(await revealItems.evaluateAll((items) => items.every((item) => item.classList.contains("is-visible")))).toBe(true);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    await context.close();
  });

});
