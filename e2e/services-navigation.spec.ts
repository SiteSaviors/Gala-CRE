import { expect, test } from "@playwright/test";

const serviceParents = [
  "/services/brokerage",
  "/services/investment-sales",
  "/services/development-services",
  "/services/capital-markets",
  "/services/property-management",
] as const;

const desktopCapabilities = [
  "/services/brokerage#landlord-representation",
  "/services/brokerage#tenant-representation",
  "/services/investment-sales/industrial",
  "/services/investment-sales/multifamily",
  "/services/investment-sales/retail",
  "/services/investment-sales/office",
  "/services/investment-sales/land",
  "/services/development-services/site-selection",
  "/services/development-services/entitlements",
  "/services/development-services/infrastructure",
  "/services/development-services/gc-builder-relationships",
  "/services/capital-markets#debt",
  "/services/capital-markets#equity",
  "/services/capital-markets#capital-strategy",
  "/services/capital-markets#transaction-coordination",
  "/services/property-management#property-management-partnership",
] as const;

const mobileBackpages = desktopCapabilities.filter((path) => !path.includes("#"));

test("desktop Services menu is a full-width, keyboard-usable five-column directory", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/services", { waitUntil: "domcontentloaded" });

  const trigger = page.locator(".nservices-trigger");
  const menu = page.locator("#services-mega-menu");
  const groups = menu.locator(".gala-mega-menu__group");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveAttribute("aria-hidden", "true");

  await trigger.focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toHaveAttribute("aria-hidden", "false");
  await expect(menu).toBeVisible();
  await expect(groups).toHaveCount(5);
  await expect(menu.locator(".gala-mega-menu__advisor")).toBeVisible();

  const geometry = await menu.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return {
      left: bounds.left,
      right: bounds.right,
      viewportWidth: window.innerWidth,
    };
  });
  expect(geometry.left).toBeLessThanOrEqual(1);
  expect(Math.abs(geometry.viewportWidth - geometry.right)).toBeLessThanOrEqual(1);

  await expect(menu.locator(".gala-mega-menu__title")).toHaveCount(serviceParents.length);
  expect(await menu.locator(".gala-mega-menu__title").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  )).toEqual(serviceParents);
  expect(await menu.locator(".gala-mega-menu__group li a[href]").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  )).toEqual(desktopCapabilities);
  await expect(menu.getByRole("link", { name: /view all services/i })).toHaveAttribute("href", "/services");

  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(menu.locator("[data-mega-first]")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
});

test("mobile Services menu nests only the nine dedicated backpages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/services", { waitUntil: "domcontentloaded" });

  const navigation = page.locator(".mnav");
  const menu = page.locator("#mobile-services-menu");
  await page.locator(".mnavt").click();
  await expect(navigation).toHaveAttribute("aria-hidden", "false");

  const servicesToggle = navigation.locator(".mnav-services-toggle");
  await servicesToggle.click();
  await expect(servicesToggle).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toHaveAttribute("aria-hidden", "false");

  const groups = menu.locator(".mnav-service-group");
  const parentLinks = menu.locator(".mnav-service-group__head > a[href]");
  const groupToggles = menu.locator(".mnav-service-group__head > button");
  const childLinks = menu.locator(".mnav-service-children a[href]");

  await expect(groups).toHaveCount(5);
  expect(await parentLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(serviceParents);
  await expect(groupToggles).toHaveCount(2);
  await expect(groupToggles.nth(0)).toHaveAttribute("aria-label", "Show Investment Sales pages");
  await expect(groupToggles.nth(1)).toHaveAttribute("aria-label", "Show Development pages");
  expect(await childLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(mobileBackpages);
  expect(await childLinks.evaluateAll((links) => links.every((link) => link.tabIndex === -1))).toBe(true);

  const investmentToggle = groupToggles.nth(0);
  const developmentToggle = groupToggles.nth(1);
  const investmentChildren = page.locator("#mobile-service-investment-sales");
  const developmentChildren = page.locator("#mobile-service-development-services");

  await investmentToggle.click();
  await expect(investmentToggle).toHaveAttribute("aria-expanded", "true");
  await expect(investmentChildren).toHaveAttribute("aria-hidden", "false");
  await expect(investmentChildren.locator('a[href="/services/investment-sales/industrial"]')).toBeVisible();
  expect(await investmentChildren.locator("a[href]").evaluateAll((links) =>
    links.every((link) => link.tabIndex === 0),
  )).toBe(true);
  await expect(developmentChildren).toHaveAttribute("aria-hidden", "true");

  await developmentToggle.click();
  await expect(investmentToggle).toHaveAttribute("aria-expanded", "false");
  await expect(investmentChildren).toHaveAttribute("aria-hidden", "true");
  expect(await investmentChildren.locator("a[href]").evaluateAll((links) =>
    links.every((link) => link.tabIndex === -1),
  )).toBe(true);
  await expect(developmentToggle).toHaveAttribute("aria-expanded", "true");
  await expect(developmentChildren).toHaveAttribute("aria-hidden", "false");
  await expect(developmentChildren.locator('a[href="/services/development-services/site-selection"]')).toBeVisible();

  await servicesToggle.click();
  await expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
  await expect(developmentToggle).toHaveAttribute("aria-expanded", "false");
  await expect(developmentChildren).toHaveAttribute("aria-hidden", "true");
});

test("desktop service directory removes motion when reduced motion is requested", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/services", { waitUntil: "domcontentloaded" });
  await page.locator(".nservices-trigger").focus();

  const durations = await page.locator("#services-mega-menu").evaluate((menu) => {
    const group = menu.querySelector(".gala-mega-menu__group");
    const advisor = menu.querySelector(".gala-mega-menu__advisor");
    return [menu, group, advisor].map((element) => element ? getComputedStyle(element).transitionDuration : null);
  });
  expect(durations).toEqual(["0s", "0s", "0s"]);

  await context.close();
});
