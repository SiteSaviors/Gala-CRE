import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { capabilityPageByPath, capabilityPages } from "@/content/capabilityPages";
import { propertyBySlug } from "@/content/properties";
import CommercialListingPage from "@/components/properties/CommercialListingPage";
import CapabilityDetail from "@/pages/CapabilityDetail";
import Company from "@/pages/Company";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import ServiceDetail from "@/pages/ServiceDetail";
import Services from "@/pages/Services";

const renderPage = (page: React.ReactNode, route = "/") => render(
  <MemoryRouter initialEntries={[route]}>{page}</MemoryRouter>
);

describe("Gala CRE public pages", () => {
  it("defines editorial capability pages through the reusable page system", () => {
    const landlordPage = capabilityPageByPath["/services/brokerage/landlord-representation"];

    expect(capabilityPages).toContain(landlordPage);
    expect(landlordPage.metadata).toMatchObject({
      title: "Landlord Representation",
      description: expect.stringContaining("Raleigh-Durham"),
    });
    expect(landlordPage.hero.media).toMatchObject({
      src: expect.any(String),
      alt: expect.any(String),
    });
    expect(landlordPage.hero.actions.map((action) => action.variant)).toEqual(["primary", "secondary"]);
    expect(landlordPage.sections.map((section) => section.type)).toEqual([
      "challenge",
      "process",
      "deliverables",
      "strategy",
      "rationale",
    ]);
    expect(landlordPage.relatedCapabilities.links).toHaveLength(4);
    expect(landlordPage.cta.actions[0]).toMatchObject({
      href: "/contact?inquiry=landlord-representation",
      variant: "primary",
    });
  });

  it("positions the homepage around commercial services", () => {
    const { container } = renderPage(<Index />);
    expect(screen.getByRole("heading", { name: /Commercial Real Estate, Simplified/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaBroker" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Built to move commercial opportunities forward." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaSales" })).toBeInTheDocument();
    expect(screen.getByText("Commercial property acquisitions, dispositions, and marketing.")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "GalaSales capabilities" })).getByRole("link", { name: "Industrial" }))
      .toHaveAttribute("href", "/services/investment-sales/industrial");
    expect(within(screen.getByRole("navigation", { name: "GalaBroker capabilities" })).getByRole("link", { name: "Landlord Representation" }))
      .toHaveAttribute("href", "/services/brokerage/landlord-representation");
    expect(within(screen.getByRole("navigation", { name: "GalaBroker capabilities" })).getByRole("link", { name: "Tenant Representation" }))
      .toHaveAttribute("href", "/services/brokerage/tenant-representation");
    expect(screen.getByRole("heading", { name: "GalaDevelop" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaCapital" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Featured listings" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Featured commercial properties" })).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("button", { name: "Previous featured listing" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next featured listing" })).toBeInTheDocument();
    expect(screen.getByText("3 active sale opportunities")).toBeInTheDocument();
    expect(screen.queryByText(/Featured Lease Opportunity/i)).not.toBeInTheDocument();
    expect(screen.getByText("2301 Lackey Street")).toBeInTheDocument();
    expect(screen.getByText("$549,000")).toBeInTheDocument();
    expect(screen.getByText("5047 Yadkin Road")).toBeInTheDocument();
    expect(screen.getByText("$829,000")).toBeInTheDocument();
    expect(screen.getByText("611 & 703 Church Street")).toBeInTheDocument();
    expect(screen.getByText("$1,190,000")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "10414 & 10416 Chapel Hill Road" })).toBeInTheDocument();
    expect(screen.getByText("$1.8M")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A recent transaction, at a glance." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bring us your next commercial real estate decision." })).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/radiusbuilt\.com/i);
  });

  it("renders the five approved service structures", () => {
    renderPage(<Services />, "/services");
    expect(screen.getByText("Brokerage")).toBeInTheDocument();
    expect(screen.getByText("Investment Sales")).toBeInTheDocument();
    expect(screen.getByText("Development Services")).toBeInTheDocument();
    expect(screen.getByText("Capital Markets")).toBeInTheDocument();
    expect(screen.getAllByText("Property Management Partnership").length).toBeGreaterThan(0);
  });

  it("keeps unapproved team claims out of the site", () => {
    const company = renderPage(<Company />, "/company");
    expect(screen.queryByText(/pending client|awaiting client|client approval/i)).not.toBeInTheDocument();
    company.unmount();
  });

  it("gives in-page-only capabilities real explanatory detail, not just a label", () => {
    render(
      <MemoryRouter initialEntries={["/services/brokerage"]}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Brokerage" })).toBeInTheDocument();
    const marketPositioning = screen.getByRole("heading", { name: "Market positioning" }).closest(".gala-capability-section");
    expect(marketPositioning).not.toBeNull();
    expect(within(marketPositioning as HTMLElement).getByText(/a space priced or presented incorrectly/i)).toBeInTheDocument();
    expect(document.getElementById("market-positioning")).toBe(marketPositioning);
  });

  it("sends Landlord and Tenant Representation to their own dedicated pages instead of an in-page section", () => {
    render(
      <MemoryRouter initialEntries={["/services/brokerage"]}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Tenant representation/i })).toHaveAttribute(
      "href",
      "/services/brokerage/tenant-representation"
    );
    expect(screen.queryByRole("heading", { name: "Tenant representation" })).not.toBeInTheDocument();
  });

  it("renders a full dedicated page for Landlord Representation", () => {
    render(
      <MemoryRouter initialEntries={["/services/brokerage/landlord-representation"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Landlord representation/i })).toBeInTheDocument();
    expect(screen.getByText(/when commercial space sits vacant/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A deliberate path from availability to execution." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The work behind a stronger leasing outcome." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Create attention without compromising the asset." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your property deserves an advocate at every point in the deal." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss Your Property/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=landlord-representation"
    );
    expect(screen.getByRole("link", { name: /Tenant representation/i })).toHaveAttribute(
      "href",
      "/services/brokerage/tenant-representation"
    );
    expect(screen.queryByText(/pending client|client approval/i)).not.toBeInTheDocument();
  });

  it("reveals editorial service content immediately when reduced motion is preferred", () => {
    const defaultMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    try {
      const { container } = render(
        <MemoryRouter initialEntries={["/services/brokerage/landlord-representation"]}>
          <Routes>
            <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          </Routes>
        </MemoryRouter>
      );
      const revealItems = Array.from(container.querySelectorAll("[data-capability-reveal]"));
      expect(revealItems.length).toBeGreaterThan(0);
      expect(revealItems.every((item) => item.classList.contains("is-visible"))).toBe(true);
    } finally {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: defaultMatchMedia,
      });
    }
  });

  it("renders a full dedicated page for Tenant Representation", () => {
    render(
      <MemoryRouter initialEntries={["/services/brokerage/tenant-representation"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Tenant Representation" })).toBeInTheDocument();
    expect(screen.getByText(/commercial lease affects far more than an address/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "From business requirement to occupied space." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A decision process your team can act on." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The best answer may not be a new address." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your advisor should answer only to your side of the table." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss Your Space/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=tenant-representation"
    );
    expect(screen.getByRole("link", { name: /Landlord representation/i })).toHaveAttribute(
      "href",
      "/services/brokerage/landlord-representation"
    );
    expect(screen.queryByText(/pending client|client approval/i)).not.toBeInTheDocument();
  });

  it("renders a distinct editorial journey for Industrial Investment Sales", () => {
    render(
      <MemoryRouter initialEntries={["/services/investment-sales/industrial"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Industrial Investment Sales", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /modern light-industrial distribution property/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A warehouse is more than its square footage." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Match the story to the way the asset creates value." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Build conviction before asking the market to act." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The information buyers need. The process sellers need." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss an Industrial Asset/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=industrial"
    );
    expect(screen.getByRole("link", { name: /Capital Strategy/i })).toHaveAttribute(
      "href",
      "/services/capital-markets/capital-strategy"
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders a distinct editorial journey for Multifamily Investment Sales", () => {
    render(
      <MemoryRouter initialEntries={["/services/investment-sales/multifamily"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Multifamily Investment Sales", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /contemporary multifamily community/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Buyers price the income—and the work behind it." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Prepare the asset before the market sets the narrative." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Separate today's performance from tomorrow's plan." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A sale process grounded in operating evidence." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Multifamily Asset/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=multifamily"
    );
    expect(screen.getByRole("link", { name: /Property Management Partnership/i })).toHaveAttribute(
      "href",
      "/services/property-management/property-management-partnership"
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders a distinct editorial journey for Retail Investment Sales", () => {
    render(
      <MemoryRouter initialEntries={["/services/investment-sales/retail"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Retail Investment Sales", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /contemporary neighborhood retail center/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Retail value lives where the lease meets the site." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Market the asset to the capital that can value its real story." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Read the leases before the market writes the conclusion." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Retail-specific preparation from lease file to closing file." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Retail Asset/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=retail"
    );
    expect(screen.getByRole("link", { name: /Landlord Representation/i })).toHaveAttribute(
      "href",
      "/services/brokerage/landlord-representation"
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders a distinct editorial journey for Office Investment Sales", () => {
    render(
      <MemoryRouter initialEntries={["/services/investment-sales/office"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Office Investment Sales", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /contemporary mid-rise office building/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Office space competes twice: for tenants and for capital." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frame the office asset around its occupancy path." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Make occupancy risk understandable before buyers price uncertainty." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Preparation for the questions office buyers ask first." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss an Office Asset/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=office"
    );
    expect(screen.getByRole("link", { name: /Tenant Representation/i })).toHaveAttribute(
      "href",
      "/services/brokerage/tenant-representation"
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders the current approved property catalog", () => {
    renderPage(<Properties />, "/properties");
    expect(screen.getByText("3 properties")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5047 Yadkin Road" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "611 & 703 Church Street" })).toBeInTheDocument();
  });

  it("renders Lackey Street as a commercial-property diligence journey", () => {
    render(
      <MemoryRouter initialEntries={["/properties/2301-lackey-street"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByText("$549,000")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Existing fuel-and-convenience site near I-95 Exit 19." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Existing improvements create more than a land-only opportunity." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Material diligence belongs in the decision path." })).toBeInTheDocument();
    expect(screen.getByText("Request confirmed square footage")).toBeInTheDocument();
    expect(screen.getByText("Confirm the legal parcel schedule with the listing advisor")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Request Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=2301-lackey-street"
    );
    expect(screen.getByRole("link", { name: /View on Crexi/i })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st"
    );
    expect(screen.getByRole("link", { name: "Open Crexi Listing" })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st"
    );
    expect(screen.getByRole("link", { name: "Request Records" })).toHaveAttribute(
      "href",
      "/contact?property=2301-lackey-street&topic=environmental-records"
    );
    expect(screen.getByRole("link", { name: "Request Package" })).toHaveAttribute(
      "href",
      "/contact?property=2301-lackey-street&topic=diligence-package"
    );
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "910-578-2828" })).toHaveAttribute("href", "tel:+19105782828");
    expect(screen.getAllByRole("img", { name: /2301 Lackey Street/i })).toHaveLength(6);
    expect(screen.queryByText("Other current opportunities.")).not.toBeInTheDocument();
    expect(document.querySelector(".gala-property-hero__scroll")).not.toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("removes unsupported commercial-listing modules without leaving placeholders", () => {
    const lackey = propertyBySlug["2301-lackey-street"];
    const minimalProperty = {
      ...lackey,
      advisor: undefined,
      externalLinks: [],
      listingPage: {
        headline: "A concise commercial opportunity.",
        lead: "Only verified property information is shown.",
      },
    };

    renderPage(
      <CommercialListingPage property={minimalProperty} />,
      "/properties/2301-lackey-street"
    );

    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A concise commercial opportunity." })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Primary property facts" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /property gallery/i })).not.toBeInTheDocument();
    expect(screen.queryByTitle("Map of 2301 Lackey Street")).not.toBeInTheDocument();
    expect(screen.queryByText("Listing Advisor")).not.toBeInTheDocument();
    expect(screen.queryByText("Documents & Diligence")).not.toBeInTheDocument();
  });

  it("renders Church Street as a childcare-specific diligence journey", () => {
    render(
      <MemoryRouter initialEntries={["/properties/611-703-church-street"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "611 & 703 Church Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The represented approval is the center of the opportunity." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Two marketed sites require one clear parcel schedule." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Review the approval before underwriting the use." })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /Church Street property gallery/i })).getAllByRole("img")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Request Approval Package" })).toHaveAttribute(
      "href",
      "/contact?property=611-703-church-street&topic=childcare-approval"
    );
    expect(screen.getByRole("link", { name: "Request Parcel Records" })).toHaveAttribute(
      "href",
      "/contact?property=611-703-church-street&topic=parcel-zoning"
    );
    expect(screen.getAllByRole("link", { name: /Request Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=611-703-church-street"
    );
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByTitle("Map of 611 & 703 Church Street")).toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon|documents have not yet been added/i)).not.toBeInTheDocument();
  });

  it("renders Yadkin Road as a plan-led development diligence journey", () => {
    render(
      <MemoryRouter initialEntries={["/properties/5047-yadkin-road"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "5047 Yadkin Road" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The offering says the major site-planning elements are addressed." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Permit-ready language still requires document-level review." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Underwrite from the approved record—not the marketing summary." })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /5047 Yadkin Road property gallery/i })).getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Request Approved Plan" })).toHaveAttribute(
      "href",
      "/contact?property=5047-yadkin-road&topic=approved-site-plan"
    );
    expect(screen.getByRole("link", { name: "Request Diligence" })).toHaveAttribute(
      "href",
      "/contact?property=5047-yadkin-road&topic=development-diligence"
    );
    expect(screen.getAllByRole("link", { name: /Request Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=5047-yadkin-road"
    );
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByTitle("Map of 5047 Yadkin Road")).toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon|documents have not yet been added/i)).not.toBeInTheDocument();
  });
});
