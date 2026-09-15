import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { capabilityPageByPath, capabilityPages } from "@/content/capabilityPages";
import { propertyBySlug } from "@/content/properties";
import CommercialListingPage from "@/components/properties/CommercialListingPage";
import CapabilityDetail from "@/pages/CapabilityDetail";
import Careers from "@/pages/Careers";
import Company from "@/pages/Company";
import ExchangeSourcing from "@/pages/ExchangeSourcing";
import Index from "@/pages/Index";
import News from "@/pages/News";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import ServiceDetail from "@/pages/ServiceDetail";
import Services from "@/pages/Services";
import Team from "@/pages/Team";

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  TileLayer: () => null,
  Marker: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  Popup: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  useMap: () => ({
    invalidateSize: vi.fn(),
    setView: vi.fn(),
    fitBounds: vi.fn(),
  }),
}));

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
    expect(screen.getByRole("heading", { name: "Brokerage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Built to move commercial opportunities forward." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Investment Sales" })).toBeInTheDocument();
    expect(screen.getByText("Commercial property acquisitions, dispositions, and marketing.")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Investment Sales capabilities" })).getByRole("link", { name: "Industrial" }))
      .toHaveAttribute("href", "/services/investment-sales/industrial");
    expect(within(screen.getByRole("navigation", { name: "Brokerage capabilities" })).getByRole("link", { name: "Landlord Representation" }))
      .toHaveAttribute("href", "/services/brokerage/landlord-representation");
    expect(within(screen.getByRole("navigation", { name: "Brokerage capabilities" })).getByRole("link", { name: "Tenant Representation" }))
      .toHaveAttribute("href", "/services/brokerage/tenant-representation");
    expect(screen.getByRole("heading", { name: "Development" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Capital Markets" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Featured listings" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Featured commercial properties" })).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("button", { name: "Previous featured listing" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next featured listing" })).toBeInTheDocument();
    expect(screen.getByText("Drag or trackpad swipe to explore")).toBeInTheDocument();
    expect(screen.getByText("5 active sale opportunities")).toBeInTheDocument();
    expect(screen.queryByText(/Featured Lease Opportunity/i)).not.toBeInTheDocument();
    expect(screen.getByText("2301 Lackey Street")).toBeInTheDocument();
    expect(screen.getByText("$549,000")).toBeInTheDocument();
    expect(screen.getByText("5047 Yadkin Road")).toBeInTheDocument();
    expect(screen.getByText("$829,000")).toBeInTheDocument();
    expect(screen.getByText("611 & 703 Church Street")).toBeInTheDocument();
    expect(screen.getByText("$1,190,000")).toBeInTheDocument();
    expect(screen.getByText("5911 Family Farm Road")).toBeInTheDocument();
    expect(screen.getByText("$995,000")).toBeInTheDocument();
    expect(screen.getByText("Lexington Townhome Site")).toBeInTheDocument();
    expect(screen.getByText("Contact for pricing")).toBeInTheDocument();

    const lackeySlide = screen.getByRole("group", { name: "1 of 5" });
    expect(within(lackeySlide).getByRole("img", { name: "2301 Lackey Street in Lumberton, NC" })).toBeInTheDocument();
    expect(within(lackeySlide).getByText("Active")).toBeInTheDocument();
    expect(within(lackeySlide).getByText("For Sale · Retail")).toBeInTheDocument();
    expect(within(lackeySlide).getByText("2301 Lackey Street, Lumberton, NC")).toBeInTheDocument();
    expect(within(lackeySlide).getByText(/Vacant gas-station and convenience-store opportunity/i)).toBeInTheDocument();
    fireEvent.click(within(lackeySlide).getByRole("button", { name: "Next image for 2301 Lackey Street" }));
    expect(within(lackeySlide).getByRole("img", { name: "Fueling canopy and pump area at 2301 Lackey Street" })).toBeInTheDocument();
    expect(within(lackeySlide).getByText("2 / 6")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "In the News" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Gaurang Gala on land, capital, and opportunity/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Cary firm plans luxury homes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /downtown Cary's tallest building/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View All" })).toHaveAttribute("href", "/news");
    expect(screen.queryByRole("heading", { name: "A recent transaction, at a glance." })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Let’s move your next opportunity forward." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Let’s Connect" })).not.toHaveLength(0);
    expect(container).not.toHaveTextContent(/radiusbuilt\.com/i);
  });

  it("loads the muted inline hero video on mobile when motion is allowed", () => {
    const defaultMatchMedia = window.matchMedia;
    const defaultInnerWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: no-preference)" || query === "(max-width: 767px)",
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
      const { container, unmount } = renderPage(<Index />);
      const video = container.querySelector<HTMLVideoElement>("#hvideo");
      expect(video).toHaveAttribute("autoplay");
      expect(video?.muted).toBe(true);
      expect(video).toHaveAttribute("playsinline");
      expect(video?.querySelector("source")).toBeInTheDocument();
      unmount();
    } finally {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: defaultInnerWidth });
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: defaultMatchMedia,
      });
    }
  });

  it("renders the five approved service structures", () => {
    renderPage(<Services />, "/services");
    expect(screen.getAllByText("Brokerage").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Investment Sales").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Development Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Capital Markets").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Property Management Partnership").length).toBeGreaterThan(0);
  });

  it("connects the Company page to the approved Team route", () => {
    const company = renderPage(<Company />, "/company");
    expect(screen.queryByText(/pending client|awaiting client|client approval/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Meet Our Team/i })).toHaveAttribute("href", "/team");
    expect(screen.getByRole("link", { name: /Explore Careers/i })).toHaveAttribute("href", "/careers?source=company");
    expect(screen.getAllByRole("link", { name: "Careers" }).some((link) => link.getAttribute("href") === "/careers?source=footer")).toBe(true);
    company.unmount();
  });

  it("renders the Team route from one structured roster", () => {
    renderPage(<Team />, "/team");
    expect(screen.getByRole("heading", { name: "Our Team" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gaurang Gala" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Leigh Roach" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Goverdhan Vavilala" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Leigh Roach" })).toBeInTheDocument();

    const leighCard = screen.getByRole("heading", { name: "Leigh Roach" }).closest("article");
    expect(leighCard).not.toBeNull();
    expect(within(leighCard!).getByRole("link", { name: "Leigh@galacregroup.com" })).toHaveAttribute("href", "mailto:Leigh@galacregroup.com");
    expect(within(leighCard!).getByRole("link", { name: "Contact Agent" })).toHaveAttribute("href", "mailto:Leigh@galacregroup.com");
    expect(within(leighCard!).getByRole("link", { name: /View Active Listings/i })).toHaveAttribute("href", "/properties?advisor=leigh-roach");

    const goverdhanCard = screen.getByRole("heading", { name: "Goverdhan Vavilala" }).closest("article");
    expect(goverdhanCard).not.toBeNull();
    expect(within(goverdhanCard!).getByRole("link", { name: "Contact Agent" })).toHaveAttribute(
      "href",
      "/contact?advisor=goverdhan-vavilala&source=team",
    );
    expect(screen.getAllByRole("link", { name: "Team" }).some((link) => link.getAttribute("href") === "/team")).toBe(true);
  });

  it("filters the property catalog to an advisor's active listings", () => {
    renderPage(<Properties />, "/properties?advisor=leigh-roach");
    expect(screen.getByText("Active listings represented by Leigh Roach")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5911 Family Farm Road" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "2301 Lackey Street" })).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property status" })).toHaveValue("Active");
  });

  it("creates a discoverable commercial-agent careers route", () => {
    renderPage(<Careers />, "/careers");
    expect(screen.getByRole("heading", { name: /Build your commercial real estate career with intention/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Development opportunities" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Commercial assignments" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A connected team" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "More than a list of properties." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Support built around moving the assignment forward/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Commercial professionals who care how the work gets done/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tell us about your commercial experience/i })).toBeInTheDocument();
    expect(screen.getAllByText("Join Our Team")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: /Introduce your experience and the business you want to build/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("License number or status")).not.toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Commercial specialties" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Why Gala CRE?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit Application" })).toBeEnabled();
    expect(screen.getByText(/without regard to any status protected by applicable law/i)).toBeInTheDocument();
    expect(screen.getByText(/does not create an employment or agency relationship/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Careers" }).some((link) => link.getAttribute("href") === "/careers")).toBe(true);
  });

  it("creates a distinct 1031 replacement-property sourcing route", () => {
    renderPage(<ExchangeSourcing />, "/investors/1031-exchange");
    expect(screen.getByRole("heading", { name: /Move quickly with a clearer acquisition brief/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A focused search—not a promise of an outcome/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Establish the clock" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Define the buy box" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Screen the field" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Coordinate next steps" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Share your acquisition brief/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Is this a 1031 exchange?")).toBeInTheDocument();
    expect(screen.getByLabelText("Identification deadline")).toHaveAttribute("type", "date");
    expect(screen.getByRole("group", { name: "Asset types" })).toBeInTheDocument();
    expect(screen.getByLabelText("Financing status")).toBeInTheDocument();
    expect(screen.getByLabelText("Qualified intermediary status")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred response method")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Share Acquisition Criteria/i })).toBeEnabled();
    expect(screen.getByText(/not tax, legal, accounting, or qualified-intermediary services/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Share Your Criteria/i })).toHaveAttribute("href", "#investor-inquiry");
  });

  it("presents attributed news and media without calling it Gala CRE coverage", () => {
    renderPage(<News />, "/news");

    expect(screen.getByRole("heading", { name: "In the News" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("heading", { name: "Latest coverage" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /opens in a new tab/i })).toHaveLength(4);
    expect(screen.getAllByRole("link", { name: "News & Media" }).some((link) => link.getAttribute("href") === "/news")).toBe(true);
  });

  it("routes Investment Sales to sourcing and Capital Markets to exchange-financing coordination", () => {
    const sales = render(
      <MemoryRouter initialEntries={["/services/investment-sales"]}>
        <Routes><Route path="/services/:slug" element={<ServiceDetail />} /></Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Find a Replacement Property/i })).toHaveAttribute("href", "/investors/1031-exchange?source=gala-sales");
    sales.unmount();

    render(
      <MemoryRouter initialEntries={["/services/capital-markets"]}>
        <Routes><Route path="/services/:slug" element={<ServiceDetail />} /></Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Discuss Exchange Financing/i })).toHaveAttribute("href", "/contact?inquiry=capital-markets&focus=1031-financing&source=gala-capital");
    expect(screen.queryByRole("link", { name: /Find a Replacement Property/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /clear-span industrial interior/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A warehouse is more than its square footage." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Show how the property performs today." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Make operational utility legible." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Separate opportunity from assumption." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Build conviction before asking the market to act." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The information buyers need. The process sellers need." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Sale Process/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "Properties", level: 1 })).toBeInTheDocument();
    expect(document.querySelector(".gala-inner-hero")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search properties" })).toBeInTheDocument();
    expect(screen.getByText("8 properties")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5047 Yadkin Road" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "611 & 703 Church Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5911 Family Farm Road" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lexington Townhome Site" })).toBeInTheDocument();
    const northMainCard = screen.getByRole("heading", { name: "202 North Main Street" }).closest("a");
    expect(northMainCard).not.toBeNull();
    expect(within(northMainCard as HTMLElement).getByText("Closed")).toBeInTheDocument();
    expect(within(northMainCard as HTMLElement).queryByText("$825,000")).not.toBeInTheDocument();
    const chapelHillCard = screen.getByRole("heading", { name: "10416 Chapel Hill Road" }).closest("a");
    expect(chapelHillCard).not.toBeNull();
    expect(within(chapelHillCard as HTMLElement).getByText("Closed")).toBeInTheDocument();
    expect(within(chapelHillCard as HTMLElement).queryByText("$2,500,000")).not.toBeInTheDocument();
    const braggCard = screen.getByRole("heading", { name: "802 Bragg Boulevard" }).closest("a");
    expect(braggCard).not.toBeNull();
    expect(within(braggCard as HTMLElement).getByText("Closed")).toBeInTheDocument();
    expect(within(braggCard as HTMLElement).getByText("Recently Sold · Retail")).toBeInTheDocument();
    expect(within(braggCard as HTMLElement).queryByText("$800,000")).not.toBeInTheDocument();
    const sourcingLink = screen.getByRole("link", { name: /Start a 1031 Property Search/i });
    expect(sourcingLink).toHaveAttribute("href", "/investors/1031-exchange?source=property-catalog");
    expect(braggCard?.compareDocumentPosition(sourcingLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("switches the filtered property catalog between grid and map views", async () => {
    renderPage(<Properties />, "/properties");

    const gridButton = screen.getByRole("button", { name: "Grid" });
    const mapButton = screen.getByRole("button", { name: "Map" });
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
    expect(mapButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(mapButton);

    expect(mapButton).toHaveAttribute("aria-pressed", "true");
    expect(gridButton).toHaveAttribute("aria-pressed", "false");
    expect(await screen.findByRole("region", { name: "Map of filtered properties" })).toBeInTheDocument();
    expect(screen.getByText("Use the map controls to zoom. Select a marker to preview a property.")).toBeInTheDocument();
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
    expect(screen.queryByRole("link", { name: /Share Your Acquisition Criteria/i })).not.toBeInTheDocument();
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
    const lackeyGallery = screen.getByRole("region", { name: /2301 Lackey Street property gallery/i });
    expect(within(lackeyGallery).getAllByRole("button", { name: /View image/i })).toHaveLength(6);
    fireEvent.click(within(lackeyGallery).getByRole("button", { name: /View image 2 of 6/i }));
    expect(within(lackeyGallery).getByRole("img", { name: /Fueling canopy and pump area/i })).toBeInTheDocument();
    expect(screen.getByText("Other current opportunities.")).toBeInTheDocument();
    expect(document.querySelector(".gala-property-hero__scroll")).not.toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("removes unsupported commercial-listing modules without leaving placeholders", () => {
    const lackey = propertyBySlug["2301-lackey-street"];
    const minimalProperty = {
      ...lackey,
      advisorId: undefined,
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
    expect(within(screen.getByRole("region", { name: /Church Street property gallery/i })).getAllByRole("button", { name: /View image/i })).toHaveLength(6);
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
    const churchVideo = screen.getByLabelText("Play the aerial property video for 611 and 703 Church Street");
    expect(churchVideo).toHaveAttribute("controls");
    expect(churchVideo).toHaveAttribute("preload", "none");
    expect(churchVideo).toHaveAttribute("playsinline");
    expect(churchVideo).not.toHaveAttribute("autoplay");
    expect(churchVideo).not.toHaveAttribute("src");
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

  it("renders Family Farm Road as a residential-land diligence journey", () => {
    render(
      <MemoryRouter initialEntries={["/properties/5911-family-farm-road"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "5911 Family Farm Road" })).toBeInTheDocument();
    expect(screen.getByText("$995,000")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Separate the current record from future potential." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Potential is conditional on the verified land record." })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /5911 Family Farm Road property gallery/i })).getAllByRole("button", { name: /View image/i })).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Open LoopNet Listing" })).toHaveAttribute(
      "href",
      "https://www.loopnet.com/Listing/5911-Family-Farm-Rd-Morrisville-NC/41146198/"
    );
    expect(screen.getByRole("link", { name: "Open Media Package" })).toHaveAttribute(
      "href",
      "https://media.nestvisions.com/listings/019f6824-ff78-7307-b536-803ab910a9ca/download-center"
    );
    expect(screen.getByRole("link", { name: "Request Diligence" })).toHaveAttribute(
      "href",
      "/contact?property=5911-family-farm-road&topic=land-diligence"
    );
    expect(screen.getAllByRole("link", { name: /Request Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=5911-family-farm-road"
    );
    expect(screen.getByText("Leigh Roach")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leigh@galacregroup.com" })).toHaveAttribute("href", "mailto:Leigh@galacregroup.com");
    expect(screen.getByTitle("Map of 5911 Family Farm Road")).toBeInTheDocument();
    const familyFarmVideo = screen.getByLabelText("Play the aerial property video for 5911 Family Farm Road");
    expect(familyFarmVideo).toHaveAttribute("controls");
    expect(familyFarmVideo).toHaveAttribute("preload", "none");
    expect(familyFarmVideo).toHaveAttribute("playsinline");
    expect(familyFarmVideo).not.toHaveAttribute("autoplay");
    expect(familyFarmVideo).not.toHaveAttribute("src");
    expect(screen.getByText("Listing Advisor")).toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon|documents have not yet been added/i)).not.toBeInTheDocument();
  });

  it("renders Lexington as a qualified townhome-development opportunity", () => {
    render(
      <MemoryRouter initialEntries={["/properties/1111-brown-street"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Lexington Townhome Site" })).toBeInTheDocument();
    expect(screen.getByText("Contact for pricing")).toBeInTheDocument();
    expect(screen.queryByText("$990,000")).not.toBeInTheDocument();
    expect(screen.queryByText("$1,000,000")).not.toBeInTheDocument();
    expect(screen.getAllByText("Proposed 58-townhome opportunity").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Useful diligence exists, but currency and transferability matter." })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /Lexington Townhome Site property gallery/i })).getAllByRole("button", { name: /View image/i })).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Request Approval Record" })).toHaveAttribute(
      "href",
      "/contact?property=1111-brown-street&topic=approval-record",
    );
    expect(screen.getAllByRole("link", { name: /Request Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=1111-brown-street",
    );
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByTitle("Map of 1111 Brown Street")).toBeInTheDocument();
    const lexingtonVideo = screen.getByLabelText("Play the vertical property video for the Lexington Townhome Site");
    expect(lexingtonVideo).toHaveAttribute("controls");
    expect(lexingtonVideo).toHaveAttribute("preload", "none");
    expect(lexingtonVideo).toHaveAttribute("playsinline");
    expect(lexingtonVideo).toHaveAttribute("poster", expect.stringMatching(/lexington-townhomes-poster\.webp$/));
    expect(lexingtonVideo).not.toHaveAttribute("autoplay");
    expect(lexingtonVideo).not.toHaveAttribute("src");
    expect(screen.queryByText(/fully entitled$|permit-ready$/i)).not.toBeInTheDocument();
  });

  it("renders 802 Bragg Boulevard as a completed retail transaction", () => {
    render(
      <MemoryRouter initialEntries={["/properties/802-bragg-boulevard"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "802 Bragg Boulevard" })).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();
    expect(screen.getByText("Sale Transaction")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recently sold retail property on Bragg Boulevard." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A multi-component commercial property with operating flexibility." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What this page confirms—and what remains private." })).toBeInTheDocument();
    expect(screen.getByText("Sale consideration and closing date are not published")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /802 Bragg Boulevard property gallery/i })).getAllByRole("button", { name: /View image/i })).toHaveLength(3);
    expect(screen.getAllByRole("link", { name: /Discuss a Similar Property/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=802-bragg-boulevard"
    );
    expect(screen.getByRole("link", { name: "Open Crexi Record" })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/1810031/north-carolina-valero"
    );
    expect(screen.getByRole("link", { name: "Open LoopNet Record" })).toHaveAttribute(
      "href",
      "https://www.loopnet.com/Listing/802-Bragg-Blvd-Fayetteville-NC/39012701/"
    );
    expect(screen.getByTitle("Map of 802 Bragg Boulevard")).toBeInTheDocument();
    expect(screen.queryByText("$800,000")).not.toBeInTheDocument();
    expect(screen.queryByText("$850,000")).not.toBeInTheDocument();
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders 202 North Main Street without unconfirmed economics or MLS photography", () => {
    render(
      <MemoryRouter initialEntries={["/properties/202-north-main-street"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "202 North Main Street" })).toBeInTheDocument();
    expect(screen.getByText("July 30, 2026")).toBeInTheDocument();
    expect(screen.getAllByText("3,333 SF").length).toBeGreaterThan(0);
    expect(screen.getByText("Transaction price", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("Not published pending confirmation")).toBeInTheDocument();
    expect(screen.getByText("Gala's exact transaction role and advisor credit are not yet published")).toBeInTheDocument();
    expect(screen.queryByText("$825,000")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /property gallery/i })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /completed transaction graphic/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Similar Property/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=202-north-main-street",
    );
  });

  it("renders 10416 Chapel Hill Road without disputed pricing or MLS photography", () => {
    render(
      <MemoryRouter initialEntries={["/properties/10416-chapel-hill-road"]}>
        <Routes>
          <Route path="/properties/:slug" element={<PropertyDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "10416 Chapel Hill Road" })).toBeInTheDocument();
    expect(screen.getByText("July 29, 2026")).toBeInTheDocument();
    expect(screen.getAllByText("Approx. 3.3 acres").length).toBeGreaterThan(0);
    expect(screen.getByText(/Gala Real Estate Advisors.*listing involvement/i)).toBeInTheDocument();
    expect(screen.getByText(/individual advisor credit remains unassigned/i)).toBeInTheDocument();
    expect(screen.getByText(/relationship to 10414 remains unconfirmed/i)).toBeInTheDocument();
    expect(screen.queryByText("$2,500,000")).not.toBeInTheDocument();
    expect(screen.queryByText("$1.8M")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /property gallery/i })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /completed transaction graphic/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Similar Property/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=10416-chapel-hill-road",
    );
  });
});
