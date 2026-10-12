import { expect, test } from "@playwright/test";

const responsiveViewports = [
  { name: "desktop", width: 1440, height: 900, columns: 4 },
  { name: "tablet", width: 834, height: 1112, columns: 2 },
  { name: "mobile", width: 390, height: 844, columns: 1 },
  { name: "narrow mobile", width: 320, height: 700, columns: 1 },
] as const;

test.describe("Development Services parent page", () => {
  for (const viewport of responsiveViewports) {
    test(`${viewport.name}: preserves the editorial journey without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/services/development-services", { waitUntil: "domcontentloaded" });

      await expect(page.getByRole("heading", { name: "Development Services", level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Development decisions made clear before commitments become costly." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Four stages. One clearer path forward." })).toBeVisible();
      await expect(page.locator(".gala-development-stage")).toHaveCount(4);
      await expect(page.getByRole("heading", { name: "Coordination that keeps the next decision visible." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Tell us what you are evaluating." })).toBeVisible();
      await expect(page.locator(".gala-service-detail")).toHaveCount(0);

      const canonicalStages = [
        "/services/development-services/site-selection",
        "/services/development-services/entitlements",
        "/services/development-services/infrastructure",
        "/services/development-services/gc-builder-relationships",
      ] as const;
      for (const href of canonicalStages) {
        await expect(page.locator(`.gala-development-stage[href="${href}"]`)).toHaveCount(1);
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);

      const stagePositions = await page.locator(".gala-development-stage").evaluateAll((stages) =>
        stages.map((stage) => {
          const element = stage as HTMLElement;
          return { x: Math.round(element.offsetLeft), y: Math.round(element.offsetTop) };
        }),
      );
      expect(new Set(stagePositions.slice(0, viewport.columns).map(({ y }) => y)).size).toBe(1);
      if (viewport.columns === 4) {
        expect(new Set(stagePositions.map(({ y }) => y)).size).toBe(1);
      } else if (viewport.columns === 2) {
        expect(new Set(stagePositions.map(({ y }) => y)).size).toBe(2);
      } else {
        expect(new Set(stagePositions.map(({ y }) => y)).size).toBe(4);
        expect(new Set(stagePositions.map(({ x }) => x)).size).toBe(1);
      }
    });
  }

  test("stage hover stays stable and keyboard focus follows the canonical path", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/development-services", { waitUntil: "domcontentloaded" });

    const firstStage = page.getByRole("link", { name: /Site Selection/i });
    const before = await firstStage.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    await firstStage.hover();
    const after = await firstStage.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    expect(after.width).toBeCloseTo(before.width, 2);
    expect(after.height).toBeCloseTo(before.height, 2);

    await firstStage.focus();
    await expect(firstStage).toBeFocused();
    await expect(firstStage).toHaveAttribute("href", "/services/development-services/site-selection");
  });

  test("reduced motion leaves every reveal item immediately visible", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/services/development-services", { waitUntil: "domcontentloaded" });

    await expect(page.locator(".gala-development-page")).not.toHaveClass(/is-motion-ready/);
    const revealItems = page.locator("[data-development-reveal]");
    expect(await revealItems.count()).toBeGreaterThan(0);
    expect(await revealItems.evaluateAll((items) => items.every((item) => {
      const styles = window.getComputedStyle(item);
      return styles.opacity === "1" && styles.transform === "none";
    }))).toBe(true);

    await context.close();
  });
});
