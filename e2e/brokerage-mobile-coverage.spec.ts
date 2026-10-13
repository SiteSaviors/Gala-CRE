import { expect, test } from "@playwright/test";

test.describe("brokerage coverage on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps asset and client types in an intentional two-column grid", async ({ page }) => {
    await page.goto("/services/brokerage");

    const grid = page.locator("#brokerage-coverage-panel");
    await grid.scrollIntoViewIfNeeded();

    await expect(grid.locator(".gala-brokerage-coverage__item")).toHaveCount(7);
    await expect
      .poll(() => grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length))
      .toBe(2);

    const assetCards = grid.locator(".gala-brokerage-coverage__item");
    const firstAsset = await assetCards.nth(0).boundingBox();
    const secondAsset = await assetCards.nth(1).boundingBox();
    const lastAsset = await assetCards.nth(6).boundingBox();

    expect(firstAsset).not.toBeNull();
    expect(secondAsset).not.toBeNull();
    expect(lastAsset).not.toBeNull();
    expect(Math.abs((firstAsset?.width ?? 0) - (secondAsset?.width ?? 0))).toBeLessThan(1);
    expect(lastAsset?.width ?? 0).toBeGreaterThan((firstAsset?.width ?? 0) * 1.9);

    await page.getByRole("tab", { name: "Client Types" }).click();
    await expect(grid.locator(".gala-brokerage-coverage__item")).toHaveCount(4);
    await expect
      .poll(() => grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length))
      .toBe(2);
  });
});
