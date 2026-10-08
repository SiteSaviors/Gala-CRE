import { expect, test } from "@playwright/test";

test.describe("homepage service portfolio", () => {
  test("presents five stable interactive folios on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const section = page.locator(".gala-service-portfolio");
    const track = section.locator(".gala-service-portfolio__track");
    const folios = section.locator(".gala-service-portfolio__folio");
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole("heading", { name: "Built to move commercial opportunities forward." })).toBeVisible();
    await expect(folios).toHaveCount(5);
    await expect(section.getByRole("link", { name: "Explore Brokerage" })).toHaveAttribute("href", "/services/brokerage");
    await expect(section.getByRole("link", { name: "Explore Investment Sales" })).toHaveAttribute("href", "/services/investment-sales");
    await expect(section.getByRole("link", { name: "Explore Development Services" })).toHaveAttribute("href", "/services/development-services");
    await expect(section.getByRole("link", { name: "Explore Capital Markets" })).toHaveAttribute("href", "/services/capital-markets");
    await expect(section.getByRole("link", { name: "Explore Property Management" })).toHaveAttribute("href", "/services/property-management");

    const initialSectionBox = await section.boundingBox();
    expect(initialSectionBox?.height).toBeLessThan(1000);
    await expect(folios.nth(2)).toHaveAttribute("data-active", "true");
    const defaultStackingOrder = await folios.evaluateAll((items) =>
      items.map((item) => Number.parseInt(window.getComputedStyle(item).zIndex, 10)),
    );
    expect(defaultStackingOrder[3]).toBeGreaterThan(defaultStackingOrder[4]);

    await section.getByRole("link", { name: "Explore Investment Sales" }).hover();
    await expect(folios.nth(1)).toHaveAttribute("data-active", "true");
    await expect(folios.nth(0)).toHaveAttribute("data-position", "before");
    await expect(folios.nth(2)).toHaveAttribute("data-position", "after");
    expect(await section.locator(".gala-service-portfolio__title h3").evaluateAll((titles) => titles.every((title) => {
      const rect = title.getBoundingClientRect();
      const hitTarget = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return Boolean(hitTarget && title.closest(".gala-service-portfolio__folio") === hitTarget.closest(".gala-service-portfolio__folio"));
    }))).toBe(true);

    const activeTransform = await folios.nth(1).evaluate((folio) => getComputedStyle(folio).transform);
    expect(activeTransform).not.toBe("none");
    const inactiveFilter = await folios.nth(4).locator("img").evaluate((image) => getComputedStyle(image).filter);
    await expect.poll(() => folios.nth(1).locator("img").evaluate((image) => getComputedStyle(image).filter))
      .not.toBe(inactiveFilter);

    await section.getByRole("heading", { name: "Built to move commercial opportunities forward." }).hover();
    await expect(folios.nth(2)).toHaveAttribute("data-active", "true");
    expect((await section.boundingBox())?.height).toBeCloseTo(initialSectionBox?.height ?? 0, 0);

    await section.getByRole("link", { name: "Explore Property Management" }).focus();
    await expect(folios.nth(4)).toHaveAttribute("data-active", "true");

    const optimizedSources = await folios.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
    expect(optimizedSources.every((src) => /\.(?:avif|webp)(?:$|\?)/.test(src ?? ""))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
  });

  test("becomes a native snap-scrolling portfolio on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const section = page.locator(".gala-service-portfolio");
    const track = section.locator(".gala-service-portfolio__track");
    const folios = section.locator(".gala-service-portfolio__folio");
    await section.scrollIntoViewIfNeeded();

    await expect(folios).toHaveCount(5);
    await expect(section.locator(".gala-service-portfolio__mobile-progress")).toContainText("01 / 05");
    const mobileMetrics = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      snapType: getComputedStyle(element).scrollSnapType,
      firstFolioWidth: (element.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0,
    }));
    expect(mobileMetrics.scrollWidth).toBeGreaterThan(mobileMetrics.clientWidth);
    expect(mobileMetrics.snapType).toContain("x");
    expect(mobileMetrics.firstFolioWidth).toBeLessThan(mobileMetrics.clientWidth);
    expect(mobileMetrics.firstFolioWidth).toBeGreaterThan(280);

    await track.evaluate((element) => {
      const secondFolio = element.children[1] as HTMLElement;
      element.scrollTo({ left: secondFolio.offsetLeft, behavior: "instant" });
    });
    await expect(section.locator(".gala-service-portfolio__mobile-progress")).toContainText("02 / 05");
    await expect(folios.nth(1)).toHaveAttribute("data-active", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("removes portfolio movement when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const section = page.locator(".gala-service-portfolio");
    await section.scrollIntoViewIfNeeded();
    const developmentFolio = section.locator(".gala-service-portfolio__folio").nth(2);
    await expect(developmentFolio).toHaveAttribute("data-active", "true");
    expect(Number.parseFloat(await developmentFolio.evaluate((folio) => getComputedStyle(folio).transitionDuration))).toBeLessThan(.001);
    expect(await developmentFolio.evaluate((folio) => getComputedStyle(folio).transform)).toBe("none");
  });
});
