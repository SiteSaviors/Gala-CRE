import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CapabilityDetail from "@/pages/CapabilityDetail";
import Services from "@/pages/Services";
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

describe("mixed service architecture", () => {
  it("maps nine capabilities to dedicated pages and seven to parent-page sections", () => {
    expect(advertisedCapabilityRoutes.map((entry) => entry.label)).toEqual(expectedCapabilities);
    expect(new Set(advertisedCapabilityRoutes.map((entry) => entry.path)).size).toBe(expectedCapabilities.length);
    expect(dedicatedCapabilityRoutes).toHaveLength(9);
    expect(sectionCapabilityRoutes).toHaveLength(7);
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

  it("renders dedicated pages while retaining singular-service anchor redirects and development aliases", () => {
    dedicatedCapabilityRoutes.forEach((entry) => {
      const view = render(
        <MemoryRouter initialEntries={[entry.path]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>,
      );

      const content = capabilityPageByPath[entry.path];
      expect(screen.getByRole("heading", { level: 1, name: content?.hero.title ?? entry.label }), entry.path).toBeInTheDocument();
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

  it("isolates the Investment Sales pilot template to Industrial", () => {
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
      industrial.container.querySelectorAll<HTMLElement>("[data-capability-section]"),
      (section) => section.dataset.capabilitySection,
    );

    expect(industrialMain).toHaveAttribute("data-capability-family", "investment-sales");
    expect(industrial.container.querySelector("[data-capability-hero]")).toBeInTheDocument();
    expect(industrialSections).toEqual([
      "asset-positioning",
      "buyer-profile",
      "valuation-considerations",
      "sale-process",
    ]);
    expect(industrial.container.querySelector("[data-capability-related]")).toBeInTheDocument();
    expect(industrial.container.querySelector("[data-capability-cta]")).toBeInTheDocument();
    expect(
      industrial.container.querySelectorAll<HTMLAnchorElement>(
        'a[href="/contact?inquiry=investment-sales&focus=industrial"]',
      ),
    ).toHaveLength(2);
    expect(
      industrial.container.querySelector<HTMLAnchorElement>(
        '[data-capability-related] a[href="/services/investment-sales/land"]',
      ),
    ).toBeInTheDocument();
    industrial.unmount();

    const multifamily = render(
      <MemoryRouter initialEntries={["/services/investment-sales/multifamily"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const multifamilyMain = multifamily.container.querySelector<HTMLElement>("main#main-content");
    expect(multifamilyMain).not.toHaveAttribute("data-capability-family");
    expect(multifamily.container.querySelector(".gala-cap-strategy")).toBeInTheDocument();
    expect(multifamily.container.querySelector("[data-capability-section]")).not.toBeInTheDocument();
    expect(multifamily.container.querySelector("[data-capability-related]")).toBeInTheDocument();
    expect(multifamily.container.querySelector("[data-capability-cta]")).toBeInTheDocument();
    multifamily.unmount();
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
    expect(capabilityLinks.filter((link) => link.getAttribute("href")?.includes("#"))).toHaveLength(7);
    expect(capabilityLinks.filter((link) => !link.getAttribute("href")?.includes("#"))).toHaveLength(9);

    groups.forEach((group, index) => {
      const service = serviceNavigationGroups[index];
      expect(group).toHaveTextContent(service.name);
      expect(Array.from(group.querySelectorAll<HTMLAnchorElement>("li a[href]"), (link) => link.getAttribute("href"))).toEqual(
        service.capabilities.map((capability) => capability.path),
      );
    });

    expect(megaMenu?.querySelector(".gala-mega-menu__all")).toHaveAttribute("href", "/services");
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

  it("exposes nested pages only for Investment Sales and Development on mobile", () => {
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
    ]);
    expect(childLinks.map((link) => link.getAttribute("href"))).toEqual(
      dedicatedCapabilityRoutes.map((entry) => entry.path),
    );
    expect(childLinks.every((link) => link.tabIndex === -1)).toBe(true);
    expect(mobileServices?.querySelector(".mnav-services-all")).toHaveAttribute("href", "/services");

    const investmentToggle = groupToggles[0];
    const developmentToggle = groupToggles[1];
    const investmentChildren = header.container.querySelector<HTMLElement>("#mobile-service-investment-sales");
    const developmentChildren = header.container.querySelector<HTMLElement>("#mobile-service-development-services");

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

    fireEvent.click(servicesToggle as HTMLButtonElement);
    expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
    expect(developmentToggle).toHaveAttribute("aria-expanded", "false");
    expect(developmentChildren).toHaveAttribute("aria-hidden", "true");

    header.unmount();

  });

  it("keeps footer and service-index destinations aligned with the shared service model", () => {

    const footer = render(
      <MemoryRouter><SiteFooter currentPath="/" /></MemoryRouter>,
    );
    const footerPaths = Array.from(footer.container.querySelectorAll<HTMLAnchorElement>("footer a[href]"))
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(footerPaths, `footer ${service.href}`).toContain(service.href));
    footer.unmount();

    const serviceIndex = render(
      <MemoryRouter><Services /></MemoryRouter>,
    );
    const serviceIndexPaths = Array.from(serviceIndex.container.querySelectorAll<HTMLAnchorElement>(".gala-service-card a[href]"))
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(serviceIndexPaths, `service index ${service.href}`).toContain(service.href));
    expect(serviceIndexPaths.every((path) => !path?.includes("#"))).toBe(true);
    expect(serviceIndex.container.querySelectorAll(".gala-service-card")).toHaveLength(serviceNavigationGroups.length);
    expect(serviceIndex.container.querySelectorAll(".gala-service-card__media")).toHaveLength(0);
    expect(serviceIndex.container.querySelectorAll(".gala-service-card__capabilities a")).toHaveLength(0);
    advertisedCapabilityRoutes.forEach((entry) => {
      expect(serviceIndex.container.querySelector(".gala-service-grid")).toHaveTextContent(entry.label);
    });
    expect(serviceIndex.container.querySelector(".gala-cta-band .gala-button")).toHaveAttribute(
      "href",
      "/contact?inquiry=general&source=services",
    );
    serviceIndex.unmount();
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
