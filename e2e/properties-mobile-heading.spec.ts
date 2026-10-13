import { expect, test } from "@playwright/test";

test.describe("properties mobile heading", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps Current Listings on one line", async ({ page }) => {
    await page.goto("/properties");

    const heading = page.getByRole("heading", { name: "Current Listings", level: 1 });
    await expect(heading).toBeVisible();
    await expect
      .poll(() =>
        heading.evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getClientRects().length;
        }),
      )
      .toBe(1);
  });
});
