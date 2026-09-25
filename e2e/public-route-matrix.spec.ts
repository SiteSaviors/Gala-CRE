import { expect, test, type Page } from "@playwright/test";

const propertyRoutes = [
  "/properties/2301-lackey-street",
  "/properties/5047-yadkin-road",
  "/properties/611-703-church-street",
  "/properties/5911-family-farm-road",
  "/properties/1111-brown-street",
  "/properties/802-bragg-boulevard",
  "/properties/202-north-main-street",
  "/properties/10416-chapel-hill-road",
] as const;

const serviceOverviewRoutes = [
  "/services/brokerage",
  "/services/investment-sales",
  "/services/development-services",
  "/services/capital-markets",
  "/services/property-management",
] as const;

const capabilityRoutes = [
  "/services/brokerage/landlord-representation",
  "/services/brokerage/tenant-representation",
  "/services/investment-sales/industrial",
  "/services/investment-sales/multifamily",
  "/services/investment-sales/retail",
  "/services/investment-sales/office",
  "/services/investment-sales/land",
  "/services/development-services/site-strategy",
  "/services/development-services/entitlements",
  "/services/development-services/infrastructure",
  "/services/development-services/development-oversight",
  "/services/capital-markets/debt",
  "/services/capital-markets/equity",
  "/services/capital-markets/capital-strategy",
  "/services/capital-markets/transaction-coordination",
  "/services/property-management/property-management-partnership",
] as const;

const auditedRoutes = [
  "/properties",
  ...propertyRoutes,
  "/services",
  ...serviceOverviewRoutes,
  ...capabilityRoutes,
] as const;

const publicPaths = new Set([
  "/",
  ...auditedRoutes,
  "/company",
  "/team",
  "/careers",
  "/investors/1031-exchange",
  "/news",
  "/contact",
]);

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
] as const;

const videoRoutes = new Set([
  "/properties/611-703-church-street",
  "/properties/5911-family-farm-road",
  "/properties/1111-brown-street",
]);

const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
    const distance = Math.max(Math.floor(window.innerHeight * 0.8), 360);
    const height = document.documentElement.scrollHeight;
    for (let position = 0; position < height; position += distance) {
      window.scrollTo(0, position);
      await delay(20);
    }
    window.scrollTo(0, height);
    await delay(80);
  });
};

test.describe("public property and service route matrix", () => {
  for (const viewport of viewports) {
    test(`${viewport.name}: all ${auditedRoutes.length} routes render without structural defects`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];
      let currentPath = "";
      page.on("pageerror", (error) => pageErrors.push(`${currentPath}: ${error.message}`));
      page.on("console", (message) => {
        const sourceUrl = message.location().url;
        const isLocalVercelAnalyticsRequest = sourceUrl.includes("/_vercel/insights/script.js");
        if (message.type() === "error" && !isLocalVercelAnalyticsRequest) {
          consoleErrors.push(`${currentPath}: ${message.text()}${sourceUrl ? ` (${sourceUrl})` : ""}`);
        }
      });

      const heights: Record<string, number> = {};
      const verifiedShareImages = new Set<string>();

      for (const route of auditedRoutes) {
        currentPath = route;
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect.soft(response?.status(), `${viewport.name} ${route}: document response`).toBeLessThan(400);
        await expect(page.locator("main#main-content")).toBeVisible();
        await expect(page.locator("h1").first()).toBeVisible();
        await expect(page.locator("h1").first(), `${viewport.name} ${route}: not a 404`).not.toContainText(/not found/i);

        await expect.poll(() => page.title(), { message: `${viewport.name} ${route}: title` }).toMatch(/\| Gala CRE Group$/);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /^.{30,}$/);
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\| Gala CRE Group$/);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https?:\/\//);
        await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
        );

        const shareImage = await page.locator('meta[property="og:image"]').getAttribute("content");
        const shareImagePath = shareImage ? new URL(shareImage).pathname : "";
        if (shareImagePath && !verifiedShareImages.has(shareImagePath)) {
          verifiedShareImages.add(shareImagePath);
          const localShareImage = new URL(shareImagePath, page.url()).toString();
          const shareImageResponse = await page.request.get(localShareImage);
          expect.soft(shareImageResponse.status(), `${viewport.name} ${route}: social image`).toBeLessThan(400);
        }

        const layout = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        }));
        heights[route] = layout.height;
        expect.soft(
          layout.scrollWidth,
          `${viewport.name} ${route}: horizontal overflow (${layout.scrollWidth}px / ${layout.clientWidth}px)`,
        ).toBeLessThanOrEqual(layout.clientWidth + 1);

        const internalTargets = await page.locator('a[href^="/"]').evaluateAll((links) =>
          links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
        );
        for (const target of internalTargets) {
          expect.soft(publicPaths.has(target), `${viewport.name} ${route}: internal target ${target}`).toBe(true);
        }

        await scrollThroughPage(page);
        await expect.poll(
          () => page.locator("img").evaluateAll((images) =>
            images
              .filter((image) => !image.complete || image.naturalWidth === 0)
              .map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src || "missing src"),
          ),
          { message: `${viewport.name} ${route}: broken images`, timeout: 8_000 },
        ).toEqual([]);

        if (propertyRoutes.includes(route as (typeof propertyRoutes)[number])) {
          await expect(page.getByRole("region", { name: /property (gallery|media)$/i })).toBeVisible();
          await expect(page.locator('.gala-listing-compact__map iframe[src*="google.com/maps"]')).toHaveCount(1);
          await expect(page.locator(`a[href^="/contact?property=${route.split("/").at(-1)}"]`).first()).toBeVisible();
          await expect(page.locator(".gala-listing-compact__related")).toBeVisible();
          await expect(page.locator(".gala-listing-compact__documents, #listing-documents")).toHaveCount(0);
          await expect(page.locator('a[href*="download-center"], a[href$=".pdf"], a[href*=".pdf?"]')).toHaveCount(0);
          await expect(page.getByText(/view documents|download brochure|open media package/i)).toHaveCount(0);

          const videos = page.locator(".gala-commercial-listing__video-frame video");
          await expect(videos).toHaveCount(videoRoutes.has(route) ? 1 : 0);
          if (videoRoutes.has(route)) {
            const video = videos.first();
            const opportunity = page.locator(".gala-listing-compact__opportunity");
            const opportunityCopy = opportunity.locator(".gala-listing-compact__opportunity-copy");
            const opportunityVideo = opportunity.locator(".gala-listing-compact__opportunity-video");
            const supportingPoints = opportunity.locator(".gala-commercial-listing__highlights--row");

            await expect(opportunityVideo.locator("video")).toHaveCount(1);
            await expect(supportingPoints.locator(":scope > div")).toHaveCount(3);
            await expect(page.locator(".gala-listing-compact__location-media video")).toHaveCount(0);
            await expect(video).toHaveAttribute("controls", "");
            await expect(video).toHaveAttribute("playsinline", "");
            await expect(video).toHaveAttribute("poster", /\S+/);
            await expect(video).toHaveAttribute("src", /\.mp4$/);
            expect(await video.evaluate((element) => (element as HTMLVideoElement).autoplay)).toBe(false);

            await expect
              .poll(() =>
                opportunity.evaluate((section, width) => {
                  const copyBox = section.querySelector(".gala-listing-compact__opportunity-copy")?.getBoundingClientRect();
                  const videoBox = section.querySelector(".gala-listing-compact__opportunity-video")?.getBoundingClientRect();
                  const pointsBox = section.querySelector(".gala-commercial-listing__highlights--row")?.getBoundingClientRect();

                  if (!copyBox || !videoBox || !pointsBox) return false;
                  if (width > 850) {
                    return (
                      videoBox.x >= copyBox.x + copyBox.width - 2 &&
                      pointsBox.y >= Math.max(copyBox.y + copyBox.height, videoBox.y + videoBox.height) - 2 &&
                      pointsBox.width > copyBox.width
                    );
                  }
                  if (width <= 620) {
                    return (
                      videoBox.y >= copyBox.y + copyBox.height - 2 &&
                      pointsBox.y >= videoBox.y + videoBox.height - 2
                    );
                  }
                  return true;
                }, viewport.width),
              )
              .toBe(true);
          } else {
            await expect(page.locator(".gala-listing-compact__opportunity-video")).toHaveCount(0);
          }
        }

        if (capabilityRoutes.includes(route as (typeof capabilityRoutes)[number])) {
          const inquiryLinks = page.locator('.gala-cap-page a[href^="/contact?inquiry="]');
          await expect(inquiryLinks.first()).toBeVisible();
          const href = await inquiryLinks.first().getAttribute("href");
          const inquiryUrl = new URL(href ?? "", "https://galacregroup.com");
          const capability = route.split("/").at(-1);
          const expectedInquiry = route.startsWith("/services/brokerage/")
            ? capability
            : route.startsWith("/services/investment-sales/")
              ? "investment-sales"
              : route.startsWith("/services/development-services/")
                ? "development-services"
                : route.startsWith("/services/capital-markets/")
                  ? "capital-markets"
                  : "property-management";
          expect.soft(inquiryUrl.pathname, `${viewport.name} ${route}: inquiry destination`).toBe("/contact");
          expect.soft(inquiryUrl.searchParams.get("inquiry"), `${viewport.name} ${route}: inquiry type`).toBe(expectedInquiry);
          if (!route.startsWith("/services/brokerage/") && !route.startsWith("/services/property-management/")) {
            expect.soft(inquiryUrl.searchParams.get("focus"), `${viewport.name} ${route}: inquiry focus`).toBe(capability);
          }
        }
      }

      expect.soft(pageErrors, `${viewport.name}: uncaught page errors`).toEqual([]);
      expect.soft(consoleErrors, `${viewport.name}: console errors`).toEqual([]);
      console.log(`ROUTE_HEIGHTS ${viewport.name} ${JSON.stringify(heights)}`);
    });
  }
});

test("homepage hero video plays only while visible on mobile", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const video = page.locator("#hvideo");
  await expect(video).toHaveAttribute("autoplay", "");
  await expect(video).toHaveAttribute("loop", "");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).toHaveAttribute("preload", "auto");
  await expect(video.locator("source")).toHaveAttribute("src", /\.mp4$/);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).muted)).toBe(true);
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(false);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(false);
  await context.close();

  const reducedMotionContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const reducedMotionPage = await reducedMotionContext.newPage();
  await reducedMotionPage.goto("/", { waitUntil: "domcontentloaded" });
  const reducedMotionVideo = reducedMotionPage.locator("#hvideo");
  await expect(reducedMotionVideo).not.toHaveAttribute("autoplay", "");
  await expect(reducedMotionVideo.locator("source")).toHaveCount(0);
  expect(await reducedMotionVideo.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);
  await reducedMotionContext.close();
});

test("homepage featured listings present three desktop cards without coupling the galleries", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#featured-listings-title", { waitUntil: "domcontentloaded" });

  const carousel = page.getByRole("region", { name: "Featured commercial properties" });
  const layout = await carousel.evaluate((viewport) => {
    const viewportBox = viewport.getBoundingClientRect();
    const cardBoxes = Array.from(viewport.querySelectorAll(".gala-listing-card"), (card) =>
      card.getBoundingClientRect(),
    );

    return {
      fullyVisible: cardBoxes.filter(
        (card) => card.left >= viewportBox.left - 1 && card.right <= viewportBox.right + 1,
      ).length,
    };
  });

  expect(layout.fullyVisible).toBe(3);

  await page.getByRole("button", { name: "Next featured listing" }).click();
  await expect(page.locator(".gala-featured-listings__position strong")).toHaveText("02");

  const familyFarmGalleryNext = page.getByRole("button", { name: "Next image for 5911 Family Farm Road" });
  await familyFarmGalleryNext.click();
  await expect(page.getByText("Image 2 / 5")).toBeVisible();
  await expect(page.locator(".gala-featured-listings__position strong")).toHaveText("02");
});

test("property catalog filters, map view, and gallery stay interactive", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/properties", { waitUntil: "domcontentloaded" });

  await page.getByLabel("Property status").selectOption("Active");
  await expect(page.locator(".gala-results-head__summary").first()).toContainText("5 properties");
  await page.getByPlaceholder("Search by property, city, or address").fill("Lackey");
  await expect(page.locator(".gala-property-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator(".gala-property-card")).toHaveCount(8);

  await page.getByRole("button", { name: "Map" }).click();
  await expect(page).toHaveURL(/\/properties\?view=map$/);
  await expect(page.locator(".leaflet-container")).toBeVisible();
  await expect(page.locator(".leaflet-marker-icon")).toHaveCount(8);

  await page.goto("/properties/2301-lackey-street", { waitUntil: "domcontentloaded" });
  const gallery = page.getByRole("region", { name: /2301 Lackey Street property gallery/i });
  const thumbnails = gallery.locator("button");
  await expect(thumbnails).toHaveCount(6);
  await thumbnails.nth(1).click();
  await expect(thumbnails.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator("figcaption")).toContainText("02 / 06");
});

test("property videos load playable metadata on mobile without autoplay", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of videoRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const video = page.locator(".gala-commercial-listing__video-frame video");
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute("src", /\.mp4$/);

    const mediaState = await video.evaluate(async (element) => {
      const player = element as HTMLVideoElement;
      player.load();
      await new Promise<void>((resolve, reject) => {
        if (player.readyState >= HTMLMediaElement.HAVE_METADATA) {
          resolve();
          return;
        }
        const timeout = window.setTimeout(() => reject(new Error("Timed out loading video metadata")), 15_000);
        player.addEventListener("loadedmetadata", () => {
          window.clearTimeout(timeout);
          resolve();
        }, { once: true });
        player.addEventListener("error", () => {
          window.clearTimeout(timeout);
          reject(new Error(player.error?.message || "Video failed to load"));
        }, { once: true });
      });
      return {
        autoplay: player.autoplay,
        duration: player.duration,
        height: player.videoHeight,
        width: player.videoWidth,
      };
    });

    expect(mediaState.autoplay).toBe(false);
    expect(mediaState.duration).toBeGreaterThan(0);
    expect(mediaState.width).toBeGreaterThan(0);
    expect(mediaState.height).toBeGreaterThan(0);
  }
});

test("property and service inquiries arrive with their context selected", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto("/properties/2301-lackey-street", { waitUntil: "domcontentloaded" });
  await page.locator('a[href="/contact?property=2301-lackey-street&advisor=gaurang-gala"]').first().click();
  await expect(page).toHaveURL(/\/contact\?property=2301-lackey-street&advisor=gaurang-gala$/);
  await expect(page.getByRole("heading", { name: "Ask about 2301 Lackey Street" })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Property Inquiry");

  await page.goto("/services/investment-sales/industrial", { waitUntil: "domcontentloaded" });
  await page.locator('a[href="/contact?inquiry=investment-sales&focus=industrial"]').first().click();
  await expect(page).toHaveURL(/\/contact\?inquiry=investment-sales&focus=industrial$/);
  await expect(page.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Investment Sales");
});

test("keyboard and reduced-motion paths remain usable", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/services/investment-sales/industrial", { waitUntil: "domcontentloaded" });

  const revealItems = page.locator("[data-capability-reveal]");
  await expect(revealItems.first()).toHaveClass(/is-visible/);
  expect(await revealItems.evaluateAll((items) => items.every((item) => item.classList.contains("is-visible")))).toBe(true);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.goto("/services", { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const servicesMenuLink = page.locator(".nservices-trigger");
  await expect(servicesMenuLink).toBeFocused();
  await expect(servicesMenuLink).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(servicesMenuLink).toHaveAttribute("aria-expanded", "false");
  await expect(servicesMenuLink).toBeFocused();

  await context.close();
});
