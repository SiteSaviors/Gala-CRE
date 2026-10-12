import { expect, test, type Page } from "@playwright/test";

const industrialPath = "/services/investment-sales/industrial";

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
  "buyer-factors",
  "sale-strategy",
  "asset-rail",
  "consultation",
] as const;

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
    const distance = Math.max(Math.floor(window.innerHeight * 0.8), 360);
    const height = document.documentElement.scrollHeight;

    for (let position = 0; position < height; position += distance) {
      window.scrollTo(0, position);
      await delay(35);
    }

    window.scrollTo(0, 0);
    await delay(120);
  });
};

test.describe("Industrial Investment Sales chapter", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: keeps the editorial journey intentional and free of overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

      const main = page.locator("main#main-content.gala-industrial-page");
      await expect(main).toBeVisible();
      await expect(page.getByRole("heading", { name: "Industrial", level: 1 })).toBeVisible();

      for (const section of requiredSections) {
        await expect(main.locator(`[data-industrial-section="${section}"]`)).toHaveCount(1);
      }

      await expect(main.locator(".gala-industrial-factors__card")).toHaveCount(3);
      await expect(main.locator(".gala-industrial-process__steps > li")).toHaveCount(3);
      await expect(main.locator(".gala-industrial-rail a")).toHaveCount(4);
      await expect(page.getByRole("combobox", { name: "Property type" })).toHaveValue("Industrial");

      const titleLines = main.locator(".gala-industrial-hero h1 > span");
      await expect(titleLines).toHaveCount(1);
      expect(await titleLines.evaluateAll((lines) => lines.map((line) => line.getBoundingClientRect().width > 0))).toEqual([true]);
      expect(await main.locator(".gala-industrial-hero").evaluate((hero) => {
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
      )), `${viewport.name}: authored Industrial headline spans remain single lines`).toBe(true);

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

  test("consultation anchor and sibling asset links preserve their context", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

    const consultation = page.getByRole("link", { name: "Request a Consultation" });
    await consultation.click();
    await expect(page).toHaveURL(/#industrial-consultation$/);
    await expect(page.locator("#industrial-consultation")).toBeInViewport();
    await expect(page.getByRole("combobox", { name: "Property type" })).toHaveValue("Industrial");

    await page.locator('.gala-industrial-rail a[href="/services/investment-sales/land"]').click();
    await expect(page).toHaveURL(/\/services\/investment-sales\/land$/);
    await expect(page.getByRole("heading", { name: "Land", level: 1 })).toBeVisible();
  });

  test("desktop cards retain the restrained gold hover treatment", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(industrialPath, { waitUntil: "domcontentloaded" });

    const firstCard = page.locator(".gala-industrial-factors__card").first();
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

  test("keyboard focus and reduced motion keep every Industrial chapter available", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(industrialPath, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Industrial", level: 1 })).toBeVisible();

    const revealItems = page.locator("main#main-content [data-industrial-reveal]");
    expect(await revealItems.count()).toBeGreaterThan(0);
    expect(await revealItems.evaluateAll((items) => items.every((item) => {
      const styles = getComputedStyle(item);
      return styles.opacity === "1" && styles.transform === "none";
    }))).toBe(true);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    for (const section of requiredSections) {
      await expect(page.locator(`[data-industrial-section="${section}"]`)).toBeAttached();
    }

    await context.close();
  });
});
