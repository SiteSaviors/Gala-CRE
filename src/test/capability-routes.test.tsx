import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CapabilityDetail from "@/pages/CapabilityDetail";
import Services from "@/pages/Services";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { capabilityPageByPath } from "@/content/capabilityPages";
import { advertisedCapabilityRoutes, findCapabilityByRoute, serviceNavigationGroups } from "@/content/services";

const expectedCapabilities = [
  "Landlord Representation",
  "Tenant Representation",
  "Industrial",
  "Multifamily",
  "Retail",
  "Office",
  "Land",
  "Site Strategy",
  "Entitlements",
  "Infrastructure",
  "Development Oversight",
  "Debt",
  "Equity",
  "Capital Strategy",
  "Transaction Coordination",
  "Property Management Partnership",
];

describe("advertised capability route matrix", () => {
  it("defines one unique route for every advertised commercial capability", () => {
    expect(advertisedCapabilityRoutes.map((entry) => entry.label)).toEqual(expectedCapabilities);
    expect(new Set(advertisedCapabilityRoutes.map((entry) => entry.path)).size).toBe(expectedCapabilities.length);
    expect(advertisedCapabilityRoutes.every((entry) => !entry.path.includes("#"))).toBe(true);
  });

  it("resolves every route to substantive capability content", () => {
    advertisedCapabilityRoutes.forEach((entry) => {
      const match = findCapabilityByRoute(entry.serviceSlug, entry.capabilityRoute);
      expect(match, entry.path).toBeDefined();
      if (!match) return;

      expect(match.capability.lead?.length ?? 0, `${entry.path} lead`).toBeGreaterThan(80);
      expect(match.capability.included?.length ?? 0, `${entry.path} deliverables`).toBeGreaterThanOrEqual(3);
      const editorialPage = capabilityPageByPath[entry.path];
      expect(editorialPage, `${entry.path} editorial content`).toBeDefined();
      expect(editorialPage?.metadata.image, `${entry.path} metadata image`).toBeTruthy();
      expect(editorialPage?.hero.media.src, `${entry.path} hero image`).toBeTruthy();
      expect(editorialPage?.hero.media.alt.length ?? 0, `${entry.path} hero alt`).toBeGreaterThan(30);
      expect(editorialPage?.sections.length ?? 0, `${entry.path} sections`).toBeGreaterThanOrEqual(3);
      expect(editorialPage?.relatedCapabilities.links.length ?? 0, `${entry.path} related links`).toBeGreaterThanOrEqual(4);
      expect(editorialPage?.hero.actions[0]?.href, `${entry.path} primary CTA`).toMatch(/^\/contact\?inquiry=/);
    });

    expect(Object.keys(capabilityPageByPath)).toHaveLength(expectedCapabilities.length);
    expect(new Set(Object.values(capabilityPageByPath).map((page) => page.hero.title)).size).toBe(expectedCapabilities.length);
    expect(new Set(Object.values(capabilityPageByPath).map((page) => page.sections[0]?.headline)).size)
      .toBe(expectedCapabilities.length);
  });

  it("renders every advertised path without falling through to a missing or placeholder page", () => {
    advertisedCapabilityRoutes.forEach((entry) => {
      const view = render(
        <MemoryRouter initialEntries={[entry.path]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>,
      );

      expect(screen.getByRole("heading", { name: new RegExp(entry.label, "i"), level: 1 }), entry.path).toBeInTheDocument();
      expect(view.container).not.toHaveTextContent(/page not found|coming soon|pending client approval/i);
      view.unmount();
    });
  });

  it("keeps the two Brokerage journeys compact and audience-specific", () => {
    const brokeragePages = [
      capabilityPageByPath["/services/brokerage/landlord-representation"],
      capabilityPageByPath["/services/brokerage/tenant-representation"],
    ];

    brokeragePages.forEach((page) => {
      expect(page.compact, page.path).toBe(true);
      expect(page.hero.signals, page.path).toEqual([]);
      expect(page.hero.actions, page.path).toHaveLength(1);
      expect(page.sections.map((section) => section.type), page.path).toEqual([
        "strategy",
        "process",
        "deliverables",
      ]);
      expect(page.sections.find((section) => section.type === "strategy")?.tracks, page.path).toHaveLength(3);
      expect(page.sections.find((section) => section.type === "process")?.steps, page.path).toHaveLength(4);
      expect(page.sections.find((section) => section.type === "deliverables")?.items, page.path).toHaveLength(4);
      expect(page.relatedCapabilities.links, page.path).toHaveLength(4);
    });

    expect(brokeragePages[0].hero.media.src).not.toBe(brokeragePages[1].hero.media.src);
    expect(brokeragePages[0].sections[0].headline).not.toBe(brokeragePages[1].sections[0].headline);
    expect(brokeragePages[0].hero.actions[0].href).toBe("/contact?inquiry=landlord-representation");
    expect(brokeragePages[1].hero.actions[0].href).toBe("/contact?inquiry=tenant-representation");
  });

  it("keeps every Investment Sales asset journey concise without losing its core sale path", () => {
    ["industrial", "multifamily", "retail", "office", "land"].forEach((assetType) => {
      const page = capabilityPageByPath[`/services/investment-sales/${assetType}`];

      expect(page.compact, assetType).toBe(true);
      expect(page.hero.signals, assetType).toEqual([]);
      expect(page.sections.map((section) => section.type), assetType).toEqual([
        "strategy",
        "process",
        "deliverables",
      ]);
      expect(page.sections.find((section) => section.type === "strategy")?.tracks, assetType).toHaveLength(3);
      expect(page.sections.find((section) => section.type === "process")?.steps, assetType).toHaveLength(4);
      expect(page.sections.find((section) => section.type === "deliverables")?.items, assetType).toHaveLength(4);
      expect(page.relatedCapabilities.links, assetType).toHaveLength(4);
    });
  });

  it("keeps every Development journey compact, distinct, and action-oriented", () => {
    const developmentPages = [
      capabilityPageByPath["/services/development-services/site-strategy"],
      capabilityPageByPath["/services/development-services/entitlements"],
      capabilityPageByPath["/services/development-services/infrastructure"],
      capabilityPageByPath["/services/development-services/development-oversight"],
    ];

    developmentPages.forEach((page) => {
      expect(page.compact, page.path).toBe(true);
      expect(page.hero.signals, page.path).toEqual([]);
      expect(page.hero.actions, page.path).toHaveLength(1);
      expect(page.sections.map((section) => section.type), page.path).toEqual([
        "strategy",
        "process",
        "deliverables",
      ]);
      expect(page.sections.find((section) => section.type === "strategy")?.tracks, page.path).toHaveLength(3);
      expect(page.sections.find((section) => section.type === "process")?.steps, page.path).toHaveLength(4);
      expect(page.sections.find((section) => section.type === "deliverables")?.items, page.path).toHaveLength(4);
      expect(page.relatedCapabilities.links, page.path).toHaveLength(4);
    });

    expect(new Set(developmentPages.map((page) => page.hero.media.src)).size).toBe(developmentPages.length);
    expect(new Set(developmentPages.map((page) => page.sections.find((section) => section.type === "strategy")?.media.src)).size)
      .toBe(developmentPages.length);
  });

  it("keeps every Capital Markets journey compact and distinct", () => {
    const capitalPages = [
      capabilityPageByPath["/services/capital-markets/debt"],
      capabilityPageByPath["/services/capital-markets/equity"],
      capabilityPageByPath["/services/capital-markets/capital-strategy"],
      capabilityPageByPath["/services/capital-markets/transaction-coordination"],
    ];

    capitalPages.forEach((page) => {
      expect(page.compact, page.path).toBe(true);
      expect(page.hero.signals, page.path).toEqual([]);
      expect(page.hero.actions, page.path).toHaveLength(1);
      expect(page.sections.map((section) => section.type), page.path).toEqual([
        "strategy",
        "process",
        "deliverables",
      ]);
      expect(page.sections.find((section) => section.type === "strategy")?.tracks, page.path).toHaveLength(3);
      expect(page.sections.find((section) => section.type === "process")?.steps, page.path).toHaveLength(4);
      expect(page.sections.find((section) => section.type === "deliverables")?.items, page.path).toHaveLength(4);
      expect(page.relatedCapabilities.links, page.path).toHaveLength(4);
    });

    expect(new Set(capitalPages.map((page) => page.hero.media.src)).size).toBe(capitalPages.length);
    expect(new Set(capitalPages.map((page) => page.sections.find((section) => section.type === "strategy")?.media.src)).size)
      .toBe(capitalPages.length);
  });

  it("keeps header, mobile, footer, and service-index destinations aligned with the shared matrix", () => {
    const header = render(
      <MemoryRouter><SiteHeader currentPath="/" /></MemoryRouter>,
    );
    const megaMenu = header.container.querySelector("#services-mega-menu");
    const megaPaths = Array.from(megaMenu?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []).map((link) => link.getAttribute("href"));
    advertisedCapabilityRoutes.forEach((entry) => expect(megaPaths, `desktop ${entry.path}`).toContain(entry.path));

    const mobileServicePaths = Array.from(header.container.querySelectorAll<HTMLAnchorElement>("#mobile-services-menu a[href]"))
      .map((link) => link.getAttribute("href"));
    serviceNavigationGroups.forEach((service) => expect(mobileServicePaths, `mobile ${service.href}`).toContain(service.href));
    header.unmount();

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
    advertisedCapabilityRoutes.forEach((entry) => expect(serviceIndexPaths, `service index ${entry.path}`).toContain(entry.path));
    serviceIndex.unmount();
  });
});
