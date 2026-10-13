import { expect, test } from "@playwright/test";

const serviceHeroes = [
  { route: "/services/brokerage", frame: ".gala-brokerage-hero__image" },
  { route: "/services/investment-sales", frame: ".gala-investment-narrative-hero__image" },
  { route: "/services/development-services", frame: ".gala-editorial-split-hero__image" },
  { route: "/services/capital-markets", frame: ".gala-editorial-split-hero__image" },
  { route: "/services/property-management", frame: ".gala-editorial-split-hero__image" },
] as const;

test.describe("Mobile service hero frames", () => {
  for (const service of serviceHeroes) {
    test(`${service.route} keeps the hero image evenly inset inside its outline`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(service.route, { waitUntil: "domcontentloaded" });

      const frame = page.locator(service.frame);
      await expect(frame.locator("img")).toHaveCount(1);

      const insets = await frame.evaluate((element) => {
        const styles = window.getComputedStyle(element);
        return [styles.paddingTop, styles.paddingRight, styles.paddingBottom, styles.paddingLeft];
      });

      expect(insets).toEqual(["14px", "14px", "14px", "14px"]);
    });
  }
});
