import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CapabilityDetail from "@/pages/CapabilityDetail";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  advertisedCapabilityRoutes,
  capabilityRouteAliases,
  dedicatedCapabilityRoutes,
  findCapabilityByRoute,
  getServiceInquiryHref,
  sectionCapabilityRoutes,
  serviceNavigationGroups,
} from "@/content/services";
import { capabilityPageByPath } from "@/content/capabilityPages";
import { serviceChapterPages } from "@/content/serviceChapterPages";

const expectedCapabilities = [
  "Landlord Representation",
  "Tenant Representation",
  "Industrial",
  "Multifamily",
  "Retail",
  "Office",
  "Land",
  "Site Selection",
  "Entitlements",
  "Infrastructure",
  "GC / Builder Relationships",
  "Debt",
  "Equity",
  "Joint Venture",
  "Capital Strategy",
  "Property Management Partnership",
];

const LocationProbe = () => {
  const location = useLocation();
  return <output aria-label="Current route">{`${location.pathname}${location.hash}`}</output>;
};

const dedicatedHeroTitleByPath: Record<string, string> = {
  "/services/investment-sales/industrial": "Industrial",
  "/services/investment-sales/multifamily": "Multifamily",
  "/services/investment-sales/retail": "Retail",
  "/services/investment-sales/office": "Office",
  "/services/investment-sales/land": "Land",
  "/services/development-services/site-selection": "Site Selection",
  "/services/development-services/entitlements": "Entitlements",
  "/services/development-services/infrastructure": "Infrastructure",
  "/services/development-services/gc-builder-relationships": "GC / Builder Relationships",
  "/services/capital-markets/debt": "Debt",
  "/services/capital-markets/equity": "Equity",
  "/services/capital-markets/joint-venture": "Joint Venture",
  "/services/capital-markets/capital-strategy": "Capital Strategy",
};

describe("mixed service architecture", () => {
  it("maps thirteen capabilities to dedicated pages and three to parent-page sections", () => {
    expect(advertisedCapabilityRoutes.map((entry) => entry.label)).toEqual(expectedCapabilities);
    expect(new Set(advertisedCapabilityRoutes.map((entry) => entry.path)).size).toBe(expectedCapabilities.length);
    expect(dedicatedCapabilityRoutes).toHaveLength(13);
    expect(sectionCapabilityRoutes).toHaveLength(3);
    expect(dedicatedCapabilityRoutes.every((entry) => !entry.path.includes("#"))).toBe(true);
    expect(dedicatedCapabilityRoutes.every((entry) => entry.path === entry.legacyPath)).toBe(true);
    expect(sectionCapabilityRoutes.every((entry) => entry.path.includes("#"))).toBe(true);
    expect(sectionCapabilityRoutes.every((entry) => !entry.legacyPath.includes("#"))).toBe(true);
    expect(new Set(advertisedCapabilityRoutes.map((entry) => entry.serviceSlug))).toEqual(
      new Set(["brokerage", "investment-sales", "development-services", "capital-markets", "property-management"]),
    );
  });

  it("preserves parent-section content and a complete editorial record for each dedicated page", () => {
    advertisedCapabilityRoutes.forEach((entry) => {
      const match = findCapabilityByRoute(entry.serviceSlug, entry.capabilityRoute);
      expect(match, entry.legacyPath).toBeDefined();
      expect(match?.capability.lead?.length ?? 0, `${entry.path} lead`).toBeGreaterThan(80);
      expect(match?.capability.included?.length ?? 0, `${entry.path} deliverables`).toBeGreaterThanOrEqual(3);
      if (entry.destination === "page") {
        const content = capabilityPageByPath[entry.path];
        expect(content, `${entry.path} editorial content`).toBeDefined();
        expect(content?.path).toBe(entry.path);
        expect(content?.metadata.title).toContain(entry.label);
        expect(content?.metadata.description.length ?? 0).toBeGreaterThan(80);
      } else {
        expect(entry.path).toBe(`/services/${entry.serviceSlug}#${entry.anchorId}`);
      }
    });
  });

  it("renders dedicated pages while retaining singular-service anchor redirects and legacy aliases", () => {
    dedicatedCapabilityRoutes.forEach((entry) => {
      const view = render(
        <MemoryRouter initialEntries={[entry.path]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>,
      );

      const content = capabilityPageByPath[entry.path];
      const heroTitle = dedicatedHeroTitleByPath[entry.path] ?? content?.hero.title ?? entry.label;
      expect(screen.getByRole("heading", { level: 1, name: heroTitle }), entry.path).toBeInTheDocument();
      expect(view.container.querySelector(".gala-cap-page"), entry.path).toBeInTheDocument();
      view.unmount();
    });

    sectionCapabilityRoutes.forEach((entry) => {
      const view = render(
        <MemoryRouter initialEntries={[entry.legacyPath]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
            <Route path="/services/:slug" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(screen.getByRole("status", { name: "Current route" }), entry.legacyPath).toHaveTextContent(entry.path);
      view.unmount();
    });

    Object.entries(capabilityRouteAliases).forEach(([alias, canonical]) => {
      const view = render(
        <MemoryRouter initialEntries={[alias]}>
          <LocationProbe />
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(screen.getByRole("status", { name: "Current route" }), alias).toHaveTextContent(canonical);
      view.unmount();
    });
  });

  it("renders each Development and Capital Markets chapter with the focused six-section architecture", () => {
    serviceChapterPages.forEach((content) => {
      const view = render(
        <MemoryRouter initialEntries={[content.path]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>,
      );

      const main = view.container.querySelector<HTMLElement>("main#main-content");
      const sections = Array.from(
        view.container.querySelectorAll<HTMLElement>("[data-chapter-section]"),
        (section) => section.dataset.chapterSection,
      );
      const form = view.container.querySelector<HTMLFormElement>(".gala-investment-narrative-form");

      expect(main, content.path).toHaveClass("gala-service-chapter");
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.title);
      expect(sections).toEqual([
        "hero",
        "positioning",
        "decision-factors",
        "execution-process",
        "sibling-rail",
        "consultation",
      ]);
      expect(view.container.querySelectorAll(".gala-service-chapter__factor-card")).toHaveLength(3);
      expect(view.container.querySelectorAll(".gala-service-chapter__process-steps > li")).toHaveLength(3);
      expect(view.container.querySelectorAll(".gala-service-chapter__rail a[href]")).toHaveLength(3);
      expect(form).toHaveAttribute(
        "data-inquiry-type",
        content.family === "development" ? "Development Services" : "Capital Markets",
      );
      expect(form).toHaveAttribute("data-service-focus", content.title);
      expect(view.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
      expect(view.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
      view.unmount();
    });
  });

  it("isolates the restrained Industrial chapter from the sibling capability template", () => {
    const industrialPath = "/services/investment-sales/industrial";
    const industrial = render(
      <MemoryRouter initialEntries={[industrialPath]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const industrialMain = industrial.container.querySelector<HTMLElement>("main#main-content");
    const industrialSections = Array.from(
      industrial.container.querySelectorAll<HTMLElement>("[data-industrial-section]"),
      (section) => section.dataset.industrialSection,
    );

    expect(industrialMain).toHaveClass("gala-industrial-page");
    expect(industrialMain).not.toHaveAttribute("data-capability-family");
    expect(industrialSections).toEqual([
      "hero",
      "positioning",
      "buyer-factors",
      "sale-strategy",
      "asset-rail",
      "consultation",
    ]);
    expect(industrial.container.querySelector("[data-capability-section]")).not.toBeInTheDocument();
    expect(industrial.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(industrial.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    expect(
      industrial.container.querySelector<HTMLAnchorElement>(
        '.gala-industrial-rail a[href="/services/investment-sales/land"]',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue("Industrial");
    industrial.unmount();

    const siteSelection = render(
      <MemoryRouter initialEntries={["/services/development-services/site-selection"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const siteSelectionMain = siteSelection.container.querySelector<HTMLElement>("main#main-content");
    expect(siteSelectionMain).toHaveClass("gala-service-chapter", "gala-service-chapter--development");
    expect(siteSelectionMain).not.toHaveAttribute("data-capability-family");
    expect(siteSelection.container.querySelectorAll("[data-chapter-section]")).toHaveLength(6);
    expect(siteSelection.container.querySelector("[data-capability-section]")).not.toBeInTheDocument();
    expect(siteSelection.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(siteSelection.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    siteSelection.unmount();
  });

  it("isolates the Multifamily chapter and preselects its consultation context", () => {
    const multifamily = render(
      <MemoryRouter initialEntries={["/services/investment-sales/multifamily"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const multifamilyMain = multifamily.container.querySelector<HTMLElement>("main#main-content");
    const multifamilySections = Array.from(
      multifamily.container.querySelectorAll<HTMLElement>("[data-multifamily-section]"),
      (section) => section.dataset.multifamilySection,
    );

    expect(multifamilyMain).toHaveClass("gala-multifamily-page");
    expect(multifamilySections).toEqual([
      "hero",
      "positioning",
      "underwriting-factors",
      "sale-strategy",
      "asset-rail",
      "consultation",
    ]);
    expect(multifamily.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(multifamily.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    expect(
      multifamily.container.querySelector<HTMLAnchorElement>(
        '.gala-multifamily-rail a[href="/services/investment-sales/industrial"]',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue("Multifamily");
    multifamily.unmount();
  });

  it("isolates the Retail chapter and preselects its consultation context", () => {
    const retail = render(
      <MemoryRouter initialEntries={["/services/investment-sales/retail"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const retailMain = retail.container.querySelector<HTMLElement>("main#main-content");
    const retailSections = Array.from(
      retail.container.querySelectorAll<HTMLElement>("[data-retail-section]"),
      (section) => section.dataset.retailSection,
    );

    expect(retailMain).toHaveClass("gala-retail-page");
    expect(retailSections).toEqual([
      "hero",
      "positioning",
      "underwriting-factors",
      "sale-strategy",
      "asset-rail",
      "consultation",
    ]);
    expect(retail.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(retail.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    expect(
      retail.container.querySelector<HTMLAnchorElement>(
        '.gala-retail-rail a[href="/services/investment-sales/office"]',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue("Retail");
    retail.unmount();
  });

  it("isolates the Office chapter and preselects its consultation context", () => {
    const office = render(
      <MemoryRouter initialEntries={["/services/investment-sales/office"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const officeMain = office.container.querySelector<HTMLElement>("main#main-content");
    const officeSections = Array.from(
      office.container.querySelectorAll<HTMLElement>("[data-office-section]"),
      (section) => section.dataset.officeSection,
    );

    expect(officeMain).toHaveClass("gala-office-page");
    expect(officeSections).toEqual([
      "hero",
      "positioning",
      "underwriting-factors",
      "sale-strategy",
      "asset-rail",
      "consultation",
    ]);
    expect(office.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(office.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    expect(
      office.container.querySelector<HTMLAnchorElement>(
        '.gala-office-rail a[href="/services/investment-sales/land"]',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue("Office");
    office.unmount();
  });

  it("isolates the Land chapter and preselects its consultation context", () => {
    const land = render(
      <MemoryRouter initialEntries={["/services/investment-sales/land"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const landMain = land.container.querySelector<HTMLElement>("main#main-content");
    const landSections = Array.from(
      land.container.querySelectorAll<HTMLElement>("[data-land-section]"),
      (section) => section.dataset.landSection,
    );

    expect(landMain).toHaveClass("gala-land-page");
    expect(landSections).toEqual([
      "hero",
      "positioning",
      "underwriting-factors",
      "sale-strategy",
      "asset-rail",
      "consultation",
    ]);
    expect(land.container.querySelector("[data-capability-related]")).not.toBeInTheDocument();
    expect(land.container.querySelector("[data-capability-cta]")).not.toBeInTheDocument();
    expect(
      land.container.querySelector<HTMLAnchorElement>(
        '.gala-land-rail a[href="/services/investment-sales/office"]',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue("Land");
    land.unmount();
  });

  it("renders the full desktop service directory with every mixed destination", () => {
    const header = render(
      <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
    );
    const megaMenu = header.container.querySelector<HTMLElement>("#services-mega-menu");
    const serviceDirectory = megaMenu?.querySelector(".gala-mega-menu__services");
    const groups = Array.from(
      megaMenu?.querySelectorAll<HTMLElement>(".gala-mega-menu__groups > .gala-mega-menu__group") ?? [],
    );
    const parentLinks = Array.from(
      megaMenu?.querySelectorAll<HTMLAnchorElement>(".gala-mega-menu__title") ?? [],
    );
    const capabilityLinks = Array.from(
      megaMenu?.querySelectorAll<HTMLAnchorElement>(".gala-mega-menu__group li a[href]") ?? [],
    );

    expect(megaMenu).toHaveAttribute("aria-label", "Services menu");
    expect(megaMenu).toHaveAttribute("aria-hidden", "true");
    expect(serviceDirectory).toBeInTheDocument();
    expect(megaMenu?.querySelector(".gala-mega-menu__groups")).toHaveAttribute(
      "aria-labelledby",
      "services-menu-heading",
    );
    expect(groups).toHaveLength(5);
    expect(parentLinks.map((link) => link.getAttribute("href"))).toEqual(
      serviceNavigationGroups.map((service) => service.href),
    );
    expect(capabilityLinks).toHaveLength(16);
    expect(capabilityLinks.map((link) => link.getAttribute("href"))).toEqual(
      advertisedCapabilityRoutes.map((entry) => entry.path),
    );
    expect(capabilityLinks.filter((link) => link.getAttribute("href")?.includes("#"))).toHaveLength(3);
    expect(capabilityLinks.filter((link) => !link.getAttribute("href")?.includes("#"))).toHaveLength(13);

    groups.forEach((group, index) => {
      const service = serviceNavigationGroups[index];
      expect(group).toHaveTextContent(service.name);
      expect(Array.from(group.querySelectorAll<HTMLAnchorElement>("li a[href]"), (link) => link.getAttribute("href"))).toEqual(
        service.capabilities.map((capability) => capability.path),
      );
    });

    expect(megaMenu?.querySelector(".gala-mega-menu__all")).not.toBeInTheDocument();
    expect(megaMenu?.querySelector(".gala-mega-menu__advisor")).toHaveAttribute(
      "href",
      "/contact?inquiry=general&source=services-menu",
    );
    expect(megaMenu?.querySelector(".gala-mega-menu__advisor img")).toHaveAttribute("alt", "");
    expect(Array.from(megaMenu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
      .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === -1));

    header.unmount();
  });

  it("opens the desktop service directory with ArrowDown and restores focus with Escape", () => {
    const originalAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    };

    try {
      const header = render(
        <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
      );
      const megaMenu = header.container.querySelector<HTMLElement>("#services-mega-menu");
      const servicesTrigger = header.container.querySelector<HTMLAnchorElement>(".nservices-trigger");
      const firstService = megaMenu?.querySelector<HTMLAnchorElement>("[data-mega-first]");

      expect(servicesTrigger).toHaveAttribute("aria-expanded", "false");
      act(() => servicesTrigger?.focus());
      fireEvent.keyDown(servicesTrigger as HTMLAnchorElement, { key: "ArrowDown" });
      expect(servicesTrigger).toHaveAttribute("aria-expanded", "true");
      expect(megaMenu).toHaveAttribute("aria-hidden", "false");
      expect(firstService).toHaveFocus();
      expect(Array.from(megaMenu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
        .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === 0));

      fireEvent.keyDown(window, { key: "Escape" });
      expect(servicesTrigger).toHaveAttribute("aria-expanded", "false");
      expect(megaMenu).toHaveAttribute("aria-hidden", "true");
      expect(servicesTrigger).toHaveFocus();
      expect(Array.from(megaMenu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
        .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === -1));

      header.unmount();
    } finally {
      window.requestAnimationFrame = originalAnimationFrame;
    }
  });

  it("exposes nested pages for Investment Sales, Development, and Capital Markets on mobile", () => {
    const header = render(
      <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
    );
    const mobileNavigation = header.container.querySelector<HTMLElement>(".mnav");
    const mobileToggle = header.container.querySelector<HTMLButtonElement>(".mnavt");
    const servicesToggle = header.container.querySelector<HTMLButtonElement>(".mnav-services-toggle");
    const mobileServices = header.container.querySelector<HTMLElement>("#mobile-services-menu");

    expect(mobileNavigation).toHaveAttribute("aria-hidden", "true");
    expect(Array.from(mobileNavigation?.querySelectorAll<HTMLElement>("a, button") ?? []))
      .toSatisfy((items: HTMLElement[]) => items.every((item) => item.tabIndex === -1));

    fireEvent.click(mobileToggle as HTMLButtonElement);
    expect(mobileToggle).toHaveAttribute("aria-expanded", "true");
    expect(mobileNavigation).toHaveAttribute("aria-hidden", "false");
    expect(servicesToggle).toHaveAttribute("tabindex", "0");
    expect(mobileServices).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(servicesToggle as HTMLButtonElement);
    expect(servicesToggle).toHaveAttribute("aria-expanded", "true");
    expect(mobileServices).toHaveAttribute("aria-hidden", "false");

    const groups = Array.from(mobileServices?.querySelectorAll<HTMLElement>(".mnav-service-group") ?? []);
    const parentLinks = Array.from(
      mobileServices?.querySelectorAll<HTMLAnchorElement>(".mnav-service-group__head > a[href]") ?? [],
    );
    const groupToggles = Array.from(
      mobileServices?.querySelectorAll<HTMLButtonElement>(".mnav-service-group__head > button") ?? [],
    );
    const childLinks = Array.from(
      mobileServices?.querySelectorAll<HTMLAnchorElement>(".mnav-service-children a[href]") ?? [],
    );

    expect(groups).toHaveLength(5);
    expect(parentLinks.map((link) => link.getAttribute("href"))).toEqual(
      serviceNavigationGroups.map((service) => service.href),
    );
    expect(parentLinks.every((link) => link.tabIndex === 0)).toBe(true);
    expect(groupToggles.map((button) => button.getAttribute("aria-label"))).toEqual([
      "Show Investment Sales pages",
      "Show Development pages",
      "Show Capital Markets pages",
    ]);
    expect(childLinks.map((link) => link.getAttribute("href"))).toEqual(
      dedicatedCapabilityRoutes.map((entry) => entry.path),
    );
    expect(childLinks.every((link) => link.tabIndex === -1)).toBe(true);
    expect(mobileServices?.querySelector(".mnav-services-all")).not.toBeInTheDocument();

    const investmentToggle = groupToggles[0];
    const developmentToggle = groupToggles[1];
    const capitalToggle = groupToggles[2];
    const investmentChildren = header.container.querySelector<HTMLElement>("#mobile-service-investment-sales");
    const developmentChildren = header.container.querySelector<HTMLElement>("#mobile-service-development-services");
    const capitalChildren = header.container.querySelector<HTMLElement>("#mobile-service-capital-markets");

    fireEvent.click(investmentToggle);
    expect(investmentToggle).toHaveAttribute("aria-expanded", "true");
    expect(investmentChildren).toHaveAttribute("aria-hidden", "false");
    expect(Array.from(investmentChildren?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
      .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === 0));
    expect(developmentToggle).toHaveAttribute("aria-expanded", "false");
    expect(developmentChildren).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(developmentToggle);
    expect(investmentToggle).toHaveAttribute("aria-expanded", "false");
    expect(investmentChildren).toHaveAttribute("aria-hidden", "true");
    expect(Array.from(investmentChildren?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
      .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === -1));
    expect(developmentToggle).toHaveAttribute("aria-expanded", "true");
    expect(developmentChildren).toHaveAttribute("aria-hidden", "false");
    expect(Array.from(developmentChildren?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
      .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === 0));

    fireEvent.click(capitalToggle);
    expect(developmentToggle).toHaveAttribute("aria-expanded", "false");
    expect(developmentChildren).toHaveAttribute("aria-hidden", "true");
    expect(capitalToggle).toHaveAttribute("aria-expanded", "true");
    expect(capitalChildren).toHaveAttribute("aria-hidden", "false");
    expect(Array.from(capitalChildren?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []))
      .toSatisfy((links: HTMLAnchorElement[]) => links.every((link) => link.tabIndex === 0));

    fireEvent.click(servicesToggle as HTMLButtonElement);
    expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
    expect(capitalToggle).toHaveAttribute("aria-expanded", "false");
    expect(capitalChildren).toHaveAttribute("aria-hidden", "true");

    header.unmount();

  });

  it("keeps footer destinations aligned with the shared service model", () => {

    const footer = render(
      <MemoryRouter><SiteFooter currentPath="/" /></MemoryRouter>,
    );
    const footerPaths = Array.from(footer.container.querySelectorAll<HTMLAnchorElement>("footer a[href]"))
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(footerPaths, `footer ${service.href}`).toContain(service.href));
    expect(footerPaths).not.toContain("/services");
    footer.unmount();
  });

  it("fades the site header after one quarter of the page scroll", () => {
    const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    const originalInnerHeight = Object.getOwnPropertyDescriptor(window, "innerHeight");
    const originalScrollHeight = Object.getOwnPropertyDescriptor(document.documentElement, "scrollHeight");
    let scrollY = 0;

    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1_000 });
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 5_000 });

    try {
      const header = render(
        <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
      );
      const navigation = header.container.querySelector("nav");

      scrollY = 60;
      fireEvent.scroll(window);
      expect(navigation).toHaveClass("scrolled");
      expect(navigation).not.toHaveClass("nav-hidden");

      scrollY = 1_000;
      fireEvent.scroll(window);
      expect(navigation).toHaveClass("nav-hidden");

      scrollY = 200;
      fireEvent.scroll(window);
      expect(navigation).not.toHaveClass("nav-hidden");
      header.unmount();
    } finally {
      if (originalScrollY) Object.defineProperty(window, "scrollY", originalScrollY);
      if (originalInnerHeight) Object.defineProperty(window, "innerHeight", originalInnerHeight);
      if (originalScrollHeight) Object.defineProperty(document.documentElement, "scrollHeight", originalScrollHeight);
    }
  });

  it("keeps service-level inquiries contextual", () => {
    expect(getServiceInquiryHref("brokerage")).toBe("/contact?inquiry=general&source=brokerage");
    expect(getServiceInquiryHref("investment-sales", "industrial")).toBe(
      "/contact?inquiry=investment-sales&focus=industrial&source=investment-sales",
    );
  });
});
