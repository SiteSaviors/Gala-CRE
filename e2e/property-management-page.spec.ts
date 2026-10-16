import { expect, test } from "@playwright/test";

const responsiveViewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow mobile", width: 320, height: 700 },
] as const;

test.describe("Property Management editorial service page", () => {
  for (const viewport of responsiveViewports) {
    test(`${viewport.name}: preserves the single-page journey without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/services/property-management", { waitUntil: "domcontentloaded" });

      await expect(page.getByRole("heading", { name: "Property Management", level: 1 })).toBeVisible();
      await expect(page.locator(".gala-service-editorial-hero--property-management")).toBeVisible();
      await expect(page.locator(".gala-inner-hero")).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "Property operations should protect the plan behind the asset." })).toBeVisible();
      await expect(page.locator(".gala-property-management-path__card")).toHaveCount(3);
      await expect(page.locator(".gala-property-management-continuity__list article")).toHaveCount(3);
      await expect(page.getByText(/does not provide day-to-day property management in house/i)).toBeVisible();
      await expect(page.getByRole("link", { name: /Visit MKM Property Management/i })).toHaveAttribute(
        "href",
        "https://www.mkmpropertymanagement.com/",
      );
      await expect(page.getByRole("button", { name: "Request a Consultation" })).toBeVisible();

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
    });
  }

  test("consultation anchor and inquiry context remain connected", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/property-management", { waitUntil: "domcontentloaded" });

    const consultationLink = page.getByRole("link", { name: "Request a Consultation" });
    await expect(consultationLink).toHaveAttribute("href", "#property-management-consultation");
    await consultationLink.click();
    await expect(page).toHaveURL(/#property-management-consultation$/);
    await expect(page.locator("form[data-inquiry-type='Property Management']")).toBeVisible();
  });

  test("reduced motion and keyboard access remain usable", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/services/property-management", { waitUntil: "domcontentloaded" });

    const revealItems = page.locator("[data-property-management-reveal]");
    await expect(revealItems.first()).toHaveClass(/is-visible/);
    expect(await revealItems.evaluateAll((items) => items.every((item) => item.classList.contains("is-visible")))).toBe(true);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    await context.close();
  });
});
