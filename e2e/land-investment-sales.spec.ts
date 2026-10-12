import { expect, test, type Page } from "@playwright/test";

const landPath = "/services/investment-sales/land";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "compact mobile", width: 320, height: 720 },
] as const;

const requiredSections = [
  "hero",
  "positioning",
  "underwriting-factors",
  "sale-strategy",
  "asset-rail",
  "consultation",
] as const;

const scrollThroughPage = async (page: Page) => {
  const revealItems = page.locator("main#main-content [data-land-reveal]");
  for (let index = 0; index < await revealItems.count(); index += 1) {
    await revealItems.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(55);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(120);
};

test.describe("Land Investment Sales chapter", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: keeps the land journey intentional and free of overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(landPath, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      const main = page.locator("main#main-content.gala-land-page");
      await expect(main).toBeVisible();
      await expect(page.getByRole("heading", { name: "Land", level: 1 })).toBeVisible();

      for (const section of requiredSections) {
        await expect(main.locator(`[data-land-section="${section}"]`)).toHaveCount(1);
      }

      await expect(main.locator(".gala-land-factors__card")).toHaveCount(3);
      await expect(main.locator(".gala-land-process__steps > li")).toHaveCount(3);
      await expect(main.locator(".gala-land-rail a")).toHaveCount(4);
      await expect(page.getByRole("combobox", { name: "Property type" })).toHaveValue("Land");

      const titleLines = main.locator(".gala-land-hero h1 > span");
      await expect(titleLines).toHaveCount(1);
      expect(await titleLines.evaluateAll((lines) => lines.map((line) => line.getBoundingClientRect().width > 0))).toEqual([true]);
      expect(await main.locator(".gala-land-hero").evaluate((hero) => {
        const copy = hero.querySelector<HTMLElement>(".gala-investment-narrative-hero__copy");
        const lines = Array.from(hero.querySelectorAll<HTMLElement>("h1 > span"));
        if (!copy) return false;
        const copyRight = copy.getBoundingClientRect().right;
        return lines.every((line) => line.getBoundingClientRect().right <= copyRight + 1);
      })).toBe(true);
      expect(await main.locator("h1, h2").evaluateAll((headings) => headings.every((heading) =>
        Array.from(heading.querySelectorAll(":scope > span")).every((span) => {
          const range = document.createRange();
          range.selectNodeContents(span);
          return range.getClientRects().length === 1;
        }),
      )), `${viewport.name}: authored Land headline spans remain single lines`).toBe(true);

      for (const selector of [
        "#land-positioning-title",
        "#land-factors-title",
        "#land-process-title",
      ]) {
        expect(await main.locator(selector).evaluate((heading) => {
          const blockLines = Array.from(heading.querySelectorAll<HTMLElement>("span")).filter(
            (line) => getComputedStyle(line).display === "block",
          );
          return heading.scrollWidth <= heading.clientWidth + 1 && blockLines.every(
            (line) => line.scrollWidth <= line.clientWidth + 1,
          );
        }), `${viewport.name}: ${selector} keeps its deliberate line breaks`).toBe(true);
      }

      await scrollThroughPage(page);
      expect(await main.locator("[data-land-reveal]").evaluateAll((items) =>
        items.every((item) => item.classList.contains("is-visible")),
      )).toBe(true);

      const cardHeights = await main.locator(".gala-land-factors__card").evaluateAll((cards) =>
        cards.map((card) => card.getBoundingClientRect().height),
      );
      expect(Math.max(...cardHeights) - Math.min(...cardHeights)).toBeLessThanOrEqual(1);
      expect(await main.locator(".gala-land-rail").evaluate((rail) => rail.getBoundingClientRect().height)).toBeLessThanOrEqual(130);

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
        { message: `${viewport.name}: Land images load`, timeout: 8_000 },
      ).toEqual([]);
    });
  }

  test("consultation anchor and sibling asset links preserve their context", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(landPath, { waitUntil: "domcontentloaded" });

    const consultation = page.getByRole("link", { name: "Request a Consultation" });
    await consultation.click();
    await expect(page).toHaveURL(/#land-consultation$/);
    await expect(page.locator("#land-consultation")).toBeInViewport();
    await expect(page.getByRole("combobox", { name: "Property type" })).toHaveValue("Land");

    await page.locator('.gala-land-rail a[href="/services/investment-sales/industrial"]').click();
    await expect(page).toHaveURL(/\/services\/investment-sales\/industrial$/);
    await expect(page.getByRole("heading", { name: "Industrial", level: 1 })).toBeVisible();
  });

  test("desktop cards retain the restrained gold hover treatment", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(landPath, { waitUntil: "domcontentloaded" });

    const firstCard = page.locator(".gala-land-factors__card").first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toHaveClass(/is-visible/);
    const cardBox = await firstCard.boundingBox();
    expect(cardBox).not.toBeNull();
    await page.mouse.move(
      (cardBox?.x ?? 0) + (cardBox?.width ?? 0) / 2,
      (cardBox?.y ?? 0) + (cardBox?.height ?? 0) / 2,
    );

    await expect.poll(() => firstCard.evaluate((card) => ({
      transform: getComputedStyle(card).transform,
      ruleHeight: getComputedStyle(card, "::before").height,
    }))).toEqual(expect.objectContaining({ ruleHeight: "4px" }));
    expect(await firstCard.evaluate((card) => getComputedStyle(card).transform)).not.toBe("none");
  });

  test("card entrances use the approved restrained distance and stagger without layout shift", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(landPath, { waitUntil: "domcontentloaded" });

    const cards = page.locator(".gala-land-factors__card");
    const firstCard = cards.first();
    await expect(firstCard).not.toHaveClass(/is-visible/);

    const before = await cards.evaluateAll((items) => items.map((item) => {
      const element = item as HTMLElement;
      const styles = getComputedStyle(element);
      return {
        height: element.offsetHeight,
        offsetTop: element.offsetTop,
        transitionDuration: styles.transitionDuration,
        transitionDelay: styles.transitionDelay,
      };
    }));

    expect(before.map((card) => card.transitionDelay)).toEqual([
      "0s, 0s",
      "0.085s, 0.085s",
      "0.17s, 0.17s",
    ]);
    expect(before.every((card) => card.transitionDuration === "0.62s, 0.7s")).toBe(true);

    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toHaveClass(/is-visible/);
    await expect(firstCard).toHaveCSS("transform", "none");

    const after = await cards.evaluateAll((items) => items.map((item) => {
      const element = item as HTMLElement;
      return { height: element.offsetHeight, offsetTop: element.offsetTop };
    }));
    expect(after).toEqual(before.map(({ height, offsetTop }) => ({ height, offsetTop })));
  });

  test("keyboard focus and reduced motion keep every Land chapter available", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(landPath, { waitUntil: "domcontentloaded" });

    const revealItems = page.locator("main#main-content [data-land-reveal]");
    expect(await revealItems.count()).toBeGreaterThan(0);
    expect(await revealItems.evaluateAll((items) => items.every((item) => {
      const styles = getComputedStyle(item);
      return styles.opacity === "1" && styles.transform === "none";
    }))).toBe(true);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    const consultation = page.getByRole("link", { name: "Request a Consultation" });
    await consultation.focus();
    expect(await consultation.evaluate((link) => getComputedStyle(link).outlineStyle)).not.toBe("none");

    for (const section of requiredSections) {
      await expect(page.locator(`[data-land-section="${section}"]`)).toBeAttached();
    }

    await context.close();
  });
});
