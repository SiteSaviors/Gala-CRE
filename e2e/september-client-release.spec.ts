import { expect, test } from "@playwright/test";

const teamExpectations = [
  {
    id: "gaurang-gala",
    name: "Gaurang Gala",
    email: "gaurang@galacregroup.com",
    phone: "910-578-2828",
    telephoneHref: "tel:+19105782828",
    portfolio: [
      "/properties/611-703-church-street",
      "/properties/1111-brown-street",
      "/properties/2301-lackey-street",
      "/properties/5047-yadkin-road",
      "/properties/802-bragg-boulevard",
      "/properties/10416-chapel-hill-road",
    ],
  },
  {
    id: "leigh-roach",
    name: "Leigh Roach",
    email: "leigh@galacregroup.com",
    phone: "(919) 886-9181",
    telephoneHref: "tel:+19198869181",
    portfolio: ["/properties/5911-family-farm-road"],
  },
  {
    id: "goverdhan-vavilala",
    name: "Dr. Goverdhan Reddy Vavilala",
    email: "goverdhan@galacregroup.com",
    phone: "(919) 462-1494",
    telephoneHref: "tel:+19194621494",
    portfolio: ["/properties/10416-chapel-hill-road"],
  },
] as const;

const propertyExpectations = [
  ["611-703-church-street", "611 & 703 Church Street", "gaurang-gala"],
  ["5911-family-farm-road", "5911 Family Farm Road", "leigh-roach"],
  ["1111-brown-street", "Lexington Townhome Site", "gaurang-gala"],
  ["2301-lackey-street", "2301 Lackey Street", "gaurang-gala"],
  ["5047-yadkin-road", "5047 Yadkin Road", "gaurang-gala"],
  ["802-bragg-boulevard", "802 Bragg Boulevard", "gaurang-gala"],
  ["202-north-main-street", "202 North Main Street", ""],
  ["10416-chapel-hill-road", "10416 Chapel Hill Road", "gaurang-gala"],
] as const;

test.describe("September client release acceptance", () => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ] as const) {
    test(`${viewport.name}: Team contacts, Home navigation, and advisor portfolios are correct`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error" && !message.location().url.includes("/_vercel/insights/script.js")) {
          consoleErrors.push(message.text());
        }
      });

      await page.goto("/team", { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { name: "Our Team" })).toBeVisible();
      await expect(page.locator(".gala-team-card")).toHaveCount(3);

      for (const member of teamExpectations) {
        const card = page.locator(".gala-team-card").filter({
          has: page.getByRole("heading", { name: member.name, exact: true }),
        });
        await expect(card).toHaveCount(1);
        const portrait = card.getByRole("img", { name: member.name });
        await expect(portrait).toBeVisible();
        await expect
          .poll(() => portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth))
          .toBeGreaterThan(0);
        await expect(card.getByRole("link", { name: member.email })).toHaveAttribute("href", `mailto:${member.email}`);
        await expect(card.getByRole("link", { name: member.phone })).toHaveAttribute("href", member.telephoneHref);
        await expect(card.getByRole("link", { name: "Contact Agent" })).toHaveAttribute("href", `mailto:${member.email}`);
        await expect(card.getByRole("link", { name: /View Listings & Transactions/i })).toHaveAttribute(
          "href",
          `/properties?advisor=${member.id}`,
        );
      }

      if (viewport.name === "desktop") {
        const firstDesktopDestination = page.locator(".nlinks > li > a").first();
        await expect(firstDesktopDestination).toHaveText("Home");
        await expect(firstDesktopDestination).toHaveAttribute("href", "/");
      } else {
        const navigationToggle = page.getByRole("button", { name: "Toggle navigation" });
        await navigationToggle.click();
        const firstMobileDestination = page.locator(".mnav > a").first();
        await expect(firstMobileDestination).toBeVisible();
        await expect(firstMobileDestination).toHaveText("Home");
        await expect(firstMobileDestination).toHaveAttribute("href", "/");
      }

      const teamLayout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(teamLayout.scrollWidth).toBeLessThanOrEqual(teamLayout.clientWidth + 1);

      for (const member of teamExpectations) {
        await page.goto(`/properties?advisor=${member.id}`, { waitUntil: "domcontentloaded" });
        await expect(page.getByText(`Listings and completed transactions associated with ${member.name}`)).toBeVisible();
        const portfolioLinks = await page.locator(".gala-property-grid > a.gala-property-card").evaluateAll((links) =>
          links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
        );
        expect(portfolioLinks).toEqual(member.portfolio);
        const layout = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
      }

      expect(pageErrors).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }

  test("catalog order, shared attribution, inquiries, and privacy controls are release-safe", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    let currentPath = "";
    page.on("pageerror", (error) => pageErrors.push(`${currentPath}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.location().url.includes("/_vercel/insights/script.js")) {
        consoleErrors.push(`${currentPath}: ${message.text()}`);
      }
    });

    currentPath = "/properties";
    await page.goto("/properties", { waitUntil: "domcontentloaded" });

    const catalogLinks = await page.locator(".gala-property-grid > a.gala-property-card").evaluateAll((links) =>
      links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
    );
    expect(catalogLinks).toEqual(propertyExpectations.map(([slug]) => `/properties/${slug}`));

    for (const [slug, name, advisorId] of propertyExpectations) {
      currentPath = `/properties/${slug}`;
      await page.goto(`/properties/${slug}`, { waitUntil: "domcontentloaded" });
      const expectedInquiryHref = `/contact?property=${slug}${advisorId ? `&advisor=${advisorId}` : ""}`;
      await expect(page.locator(`a[href="${expectedInquiryHref}"]`).first()).toBeVisible();
      await expect(page.locator('a[href*="download-center"], a[href$=".pdf"], a[href*=".pdf?"]')).toHaveCount(0);
      await expect(page.getByText(/view documents|download brochure|open media package|property media package/i)).toHaveCount(0);

      currentPath = expectedInquiryHref;
      await page.goto(expectedInquiryHref, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { name: `Ask about ${name}` })).toBeVisible();
      await expect(page.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Property Inquiry");
    }

    currentPath = "/properties/10416-chapel-hill-road";
    await page.goto("/properties/10416-chapel-hill-road", { waitUntil: "domcontentloaded" });
    const transactionTeam = page.locator(".gala-listing-compact__advisor-list");
    await expect(transactionTeam).toContainText("Gaurang Gala");
    await expect(transactionTeam).toContainText("Dr. Goverdhan Reddy Vavilala");
    await expect(transactionTeam).not.toContainText(/buyer representative|seller representative|transaction volume|sale price/i);
    await expect(page.getByText("Gaurang Gala and Dr. Goverdhan Reddy Vavilala")).toBeVisible();
    await expect(page.getByText(/relationship to 10414 remains unconfirmed/i)).toBeVisible();
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
