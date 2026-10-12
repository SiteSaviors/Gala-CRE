import { expect, test } from "@playwright/test";

test.describe("Custom cursor resilience", () => {
  test("keeps a native fallback until the custom cursor is ready and restores it across routes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const root = page.locator("html");
    const ring = page.locator("#cur");
    const dot = page.locator("#cdot");

    await expect(root).not.toHaveClass(/gala-custom-cursor-ready/);
    await expect(root).toHaveCSS("cursor", "auto");

    await page.mouse.move(420, 360);
    await expect(root).toHaveClass(/gala-custom-cursor-ready/);
    await expect(root).toHaveCSS("cursor", "none");
    await expect(ring).toHaveCSS("visibility", "visible");
    await expect(dot).toHaveCSS("visibility", "visible");

    await page.evaluate(() => window.scrollTo(0, 1100));
    await expect(root).toHaveClass(/gala-custom-cursor-ready/);
    await expect(ring).toHaveCSS("visibility", "visible");

    await page.locator(".site-nav .nlinks").getByRole("link", { name: "Company", exact: true }).click();
    await expect(page).toHaveURL(/\/company$/);
    await expect(root).not.toHaveClass(/gala-custom-cursor-ready/);
    await expect(root).toHaveCSS("cursor", "auto");

    await page.mouse.move(680, 420);
    await expect(root).toHaveClass(/gala-custom-cursor-ready/);
    await expect(root).toHaveCSS("cursor", "none");
    await expect(ring).toHaveCSS("visibility", "visible");
  });

  test("preserves the standard cursor on touch-sized layouts", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).not.toHaveClass(/gala-custom-cursor-ready/);
    await expect(page.locator("html")).toHaveCSS("cursor", "auto");
    await expect(page.locator("#cur")).toHaveCSS("display", "none");
    await expect(page.locator("#cdot")).toHaveCSS("display", "none");

    await context.close();
  });
});
