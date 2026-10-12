import { expect, test, type Page } from "@playwright/test";

const chapterPages = [
  { path: "/services/development-services/site-selection", title: "Site Selection", family: "Development", inquiry: "Development Services" },
  { path: "/services/development-services/entitlements", title: "Entitlements", family: "Development", inquiry: "Development Services" },
  { path: "/services/development-services/infrastructure", title: "Infrastructure", family: "Development", inquiry: "Development Services" },
  { path: "/services/development-services/gc-builder-relationships", title: "GC / Builder Relationships", family: "Development", inquiry: "Development Services" },
  { path: "/services/capital-markets/debt", title: "Debt", family: "Capital Markets", inquiry: "Capital Markets" },
  { path: "/services/capital-markets/equity", title: "Equity", family: "Capital Markets", inquiry: "Capital Markets" },
  { path: "/services/capital-markets/joint-venture", title: "Joint Venture", family: "Capital Markets", inquiry: "Capital Markets" },
  { path: "/services/capital-markets/capital-strategy", title: "Capital Strategy", family: "Capital Markets", inquiry: "Capital Markets" },
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "compact", width: 320, height: 700 },
] as const;

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
    const distance = Math.max(Math.floor(window.innerHeight * 0.68), 260);
    const height = document.documentElement.scrollHeight;
    for (let position = 0; position <= height; position += distance) {
      window.scrollTo(0, position);
      await delay(30);
    }
    window.scrollTo(0, height);
    await delay(760);
  });
};

test.describe("Development and Capital Markets service chapters", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: all eight chapters retain their authored responsive composition`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const chapter of chapterPages) {
        await page.goto(chapter.path, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);

        const main = page.locator("main.gala-service-chapter");
        const h1 = main.locator("h1");
        const form = main.locator(".gala-investment-narrative-form");
        const heroCta = main.locator(".gala-service-chapter__hero .gala-investment-narrative-button");

        await expect(main, `${viewport.name} ${chapter.path}: chapter root`).toBeVisible();
        await expect(h1, `${viewport.name} ${chapter.path}: one H1`).toHaveCount(1);
        await expect(h1, `${viewport.name} ${chapter.path}: exact H1`).toHaveText(chapter.title);
        await expect(main.locator(".gala-service-chapter__hero .gala-kicker")).toHaveText(chapter.family);
        await expect(main.locator("[data-chapter-section]")).toHaveCount(6);
        await expect(main.locator(".gala-service-chapter__factor-card")).toHaveCount(3);
        await expect(main.locator(".gala-service-chapter__process-steps > li")).toHaveCount(3);
        await expect(main.locator(".gala-service-chapter__rail a[href]")).toHaveCount(3);
        await expect(form).toHaveAttribute("data-inquiry-type", chapter.inquiry);
        await expect(form).toHaveAttribute("data-service-focus", chapter.title);
        await expect(heroCta).toHaveAttribute("href", /-consultation$/);

        const layout = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect.soft(
          layout.scrollWidth,
          `${viewport.name} ${chapter.path}: horizontal overflow (${layout.scrollWidth}px / ${layout.clientWidth}px)`,
        ).toBeLessThanOrEqual(layout.clientWidth + 1);

        const authoredLines = await main.locator("h1 > span, h2 > span").evaluateAll((spans) =>
          spans.map((span) => {
            const range = document.createRange();
            range.selectNodeContents(span);
            const spanBounds = range.getBoundingClientRect();
            const headingBounds = span.parentElement?.getBoundingClientRect();
            return {
              text: span.textContent?.trim() ?? "",
              rects: range.getClientRects().length,
              left: spanBounds.left,
              right: spanBounds.right,
              headingLeft: headingBounds?.left ?? 0,
              headingRight: headingBounds?.right ?? window.innerWidth,
              viewport: window.innerWidth,
            };
          }),
        );
        for (const line of authoredLines) {
          expect.soft(line.rects, `${viewport.name} ${chapter.path}: authored line “${line.text}” wrapped`).toBe(1);
          expect.soft(line.left, `${viewport.name} ${chapter.path}: authored line “${line.text}” escaped left`).toBeGreaterThanOrEqual(-1);
          expect.soft(line.right, `${viewport.name} ${chapter.path}: authored line “${line.text}” escaped viewport`).toBeLessThanOrEqual(line.viewport + 1);
        }

        if (viewport.width >= 1024) {
          const cardHeights = await main.locator(".gala-service-chapter__factor-card").evaluateAll((cards) =>
            cards.map((card) => Math.round(card.getBoundingClientRect().height)),
          );
          expect.soft(Math.max(...cardHeights) - Math.min(...cardHeights), `${viewport.name} ${chapter.path}: card heights`).toBeLessThanOrEqual(1);
        }

        const railHeight = await main.locator(".gala-service-chapter__rail").evaluate((rail) =>
          Math.round(rail.getBoundingClientRect().height),
        );
        expect.soft(railHeight, `${viewport.name} ${chapter.path}: compact sibling rail`).toBeLessThanOrEqual(170);

        await scrollThroughPage(page);
        await expect.poll(
          () => main.locator("img").evaluateAll((images) =>
            images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          ),
          { message: `${viewport.name} ${chapter.path}: image loading`, timeout: 8_000 },
        ).toEqual([]);
        await expect(main.locator("[data-chapter-reveal]:not(.is-visible)")).toHaveCount(0);
      }
    });
  }

  test("factor hover and hero keyboard focus remain stable", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(chapterPages[0].path, { waitUntil: "domcontentloaded" });
    const card = page.locator(".gala-service-chapter__factor-card").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/is-visible/);
    await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

    const before = await card.boundingBox();
    await card.hover();
    await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
    await expect.poll(() => card.evaluate((element) => getComputedStyle(element, "::before").height)).toBe("4px");
    const after = await card.boundingBox();
    const hoverStyles = await card.evaluate((element) => ({
      transform: getComputedStyle(element).transform,
      ruleHeight: getComputedStyle(element, "::before").height,
    }));

    expect(hoverStyles.transform).not.toBe("none");
    expect(hoverStyles.ruleHeight).toBe("4px");
    expect(Math.abs((before?.width ?? 0) - (after?.width ?? 0))).toBeLessThan(0.1);
    expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThan(0.1);

    await page.goto(chapterPages[0].path, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    const skipLink = page.locator("a.skip-link");
    if (await skipLink.count()) await expect(skipLink).toBeFocused();
    const heroCta = page.locator(".gala-service-chapter__hero .gala-investment-narrative-button");
    await heroCta.focus();
    await expect(heroCta).toBeFocused();
    await expect(heroCta).toHaveCSS("outline-style", "solid");
  });

  test("reduced motion presents every chapter element immediately", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const chapter of chapterPages) {
      await page.goto(chapter.path, { waitUntil: "domcontentloaded" });
      const revealStyles = await page.locator("[data-chapter-reveal]").evaluateAll((elements) =>
        elements.map((element) => ({
          opacity: getComputedStyle(element).opacity,
          transform: getComputedStyle(element).transform,
          transitionDuration: getComputedStyle(element).transitionDuration,
        })),
      );
      expect(revealStyles.every((style) => style.opacity === "1")).toBe(true);
      expect(revealStyles.every((style) => style.transform === "none")).toBe(true);
      expect(revealStyles.every((style) => style.transitionDuration === "0s")).toBe(true);
    }

    await context.close();
  });
});
