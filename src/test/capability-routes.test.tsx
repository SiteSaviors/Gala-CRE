import { fireEvent, render, screen } from "@testing-library/react";
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
  "Capital Strategy",
  "Transaction Coordination",
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

  it("keeps the consolidated desktop and mobile navigation aligned", () => {
    const header = render(
      <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
    );
    const megaMenu = header.container.querySelector("#services-mega-menu");
    const megaPaths = Array.from(megaMenu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(megaPaths, `desktop ${service.href}`).toContain(service.href));
    expect(megaPaths).toContain("/services");
    expect(megaPaths).toHaveLength(serviceNavigationGroups.length + 1);
    expect(megaPaths.every((path) => !path?.includes("#"))).toBe(true);
    expect(megaMenu).toHaveTextContent("One platform. Five ways to move an opportunity forward.");
    serviceNavigationGroups.forEach((service) => expect(megaMenu).toHaveTextContent(service.summary));

    const mobileServicePaths = Array.from(header.container.querySelectorAll<HTMLAnchorElement>("#mobile-services-menu a[href]"))
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(mobileServicePaths, `mobile ${service.href}`).toContain(service.href));
    expect(mobileServicePaths).toContain("/services");
    expect(mobileServicePaths).toHaveLength(serviceNavigationGroups.length + 1);
    expect(header.container.querySelector("#mobile-services-menu small")).not.toBeInTheDocument();

    const servicesTrigger = header.container.querySelector<HTMLAnchorElement>(".nservices-trigger");
    expect(servicesTrigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.focus(servicesTrigger as HTMLAnchorElement);
    expect(servicesTrigger).toHaveAttribute("aria-expanded", "true");
    expect(megaMenu).toHaveAttribute("aria-hidden", "false");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(servicesTrigger).toHaveAttribute("aria-expanded", "false");
    expect(servicesTrigger).toHaveFocus();
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
