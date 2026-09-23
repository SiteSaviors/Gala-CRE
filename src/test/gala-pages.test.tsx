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
    expect(landlordPage.compact).toBe(true);
    expect(landlordPage.hero.actions.map((action) => action.variant)).toEqual(["primary"]);
    expect(landlordPage.hero.signals).toEqual([]);
    expect(landlordPage.sections.map((section) => section.type)).toEqual([
      "strategy",
      "process",
      "deliverables",
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

    const churchSlide = screen.getByRole("group", { name: "1 of 5" });
    expect(within(churchSlide).getByRole("img", { name: "611 & 703 Church Street in Morrisville, NC" })).toBeInTheDocument();
    expect(within(churchSlide).getByText("Active")).toBeInTheDocument();
    expect(within(churchSlide).getByText("For Sale · Land")).toBeInTheDocument();
    expect(within(churchSlide).getByText("611 & 703 Church Street, Morrisville, NC")).toBeInTheDocument();
    expect(within(churchSlide).getByText(/Two-site commercial land offering marketed for childcare development/i)).toBeInTheDocument();
    fireEvent.click(within(churchSlide).getByRole("button", { name: "Next image for 611 & 703 Church Street" }));
    expect(within(churchSlide).getByRole("img", { name: "Aerial overview of the Church Street commercial land offering in Morrisville" })).toBeInTheDocument();
    expect(within(churchSlide).getByText("2 / 6")).toBeInTheDocument();

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
        matches: query === "(max-width: 767px)",
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

  it("presents Property Management as a partner-led service overview", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/services/property-management"]}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Property Management", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/partner-led/i).length).toBeGreaterThan(0);
    expect(container.querySelector(".gala-inner-hero__bg")).toHaveAttribute(
      "src",
      expect.stringMatching(/property-management-overview\.webp$/),
    );
    expect(screen.getByRole("link", { name: /Property Management Partnership/i })).toHaveAttribute(
      "href",
      "/services/property-management/property-management-partnership",
    );
  });

  it("presents the shared Team roster within Company", () => {
    const company = renderPage(<Company />, "/company");
    const navigation = document.querySelector("nav");
    expect(screen.queryByText(/pending client|awaiting client|client approval/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Who we are", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("The Developer's Brokerage")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The transaction is only one part of the decision.", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A connected path from opportunity to execution.", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Grounded in the work.", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Evaluate", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Position", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Structure", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Execute", level: 3 })).toBeInTheDocument();
    expect(screen.queryByText("Our Purpose")).not.toBeInTheDocument();
    expect(screen.queryByText("A practical standard for every engagement.")).not.toBeInTheDocument();
    expect(screen.queryByText("Rooted in Raleigh-Durham.")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Properties/i })).toHaveAttribute("href", "/properties");
    expect(screen.getByRole("link", { name: /View News & Media/i })).toHaveAttribute("href", "/news");
    expect(screen.getByRole("heading", { name: "Our Team", level: 2 })).toBeInTheDocument();
    expect(document.querySelector("#team")).toHaveAttribute("aria-labelledby", "team-heading");
    expect(screen.getByRole("heading", { name: "Based in Cary. Focused on the Research Triangle.", level: 2 })).toBeInTheDocument();
    const companyClose = document.querySelector(".gala-company-close");
    expect(companyClose).not.toBeNull();
    expect(within(companyClose!).getByRole("link", { name: /Let’s Connect/i })).toHaveAttribute("href", "/contact?inquiry=general&source=company");
    expect(screen.queryByRole("link", { name: /Meet Our Team/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our Team", exact: true })).toHaveAttribute("href", "/company#team");
    expect(navigation).not.toBeNull();
    expect(within(navigation!).queryByRole("link", { name: "Team", exact: true })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Careers/i })).toHaveAttribute("href", "/careers?source=company");
    expect(screen.getAllByRole("link", { name: "Careers" }).some((link) => link.getAttribute("href") === "/careers?source=footer")).toBe(true);
    expect(screen.getByRole("heading", { name: "Gaurang Gala" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Leigh Roach" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dr. Goverdhan Reddy Vavilala" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gaurang Gala" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Leigh Roach" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Dr. Goverdhan Reddy Vavilala" })).toBeInTheDocument();

    const leighCard = screen.getByRole("heading", { name: "Leigh Roach" }).closest("article");
    expect(leighCard).not.toBeNull();
    expect(within(leighCard!).getByRole("link", { name: "leigh@galacregroup.com" })).toHaveAttribute("href", "mailto:leigh@galacregroup.com");
    expect(within(leighCard!).getByRole("link", { name: "(919) 886-9181" })).toHaveAttribute("href", "tel:+19198869181");
    expect(within(leighCard!).getByRole("link", { name: "Contact Agent" })).toHaveAttribute("href", "mailto:leigh@galacregroup.com");
    expect(within(leighCard!).getByRole("link", { name: /View Listings & Transactions/i })).toHaveAttribute("href", "/properties?advisor=leigh-roach");

    const goverdhanCard = screen.getByRole("heading", { name: "Dr. Goverdhan Reddy Vavilala" }).closest("article");
    expect(goverdhanCard).not.toBeNull();
    expect(within(goverdhanCard!).getByRole("link", { name: "goverdhan@galacregroup.com" })).toHaveAttribute(
      "href",
      "mailto:goverdhan@galacregroup.com",
    );
    expect(within(goverdhanCard!).getByRole("link", { name: "(919) 462-1494" })).toHaveAttribute("href", "tel:+19194621494");
    expect(within(goverdhanCard!).getByRole("link", { name: "Contact Agent" })).toHaveAttribute(
      "href",
      "mailto:goverdhan@galacregroup.com",
    );
    company.unmount();
  });

  it("redirects the legacy Team route to the Company roster", async () => {
    render(
      <MemoryRouter initialEntries={["/team"]}>
        <Routes>
          <Route path="/team" element={<Team />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Our Team", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Who we are", level: 1 })).toBeInTheDocument();
  });

  it("filters the property catalog to an advisor's listings and transactions", () => {
    renderPage(<Properties />, "/properties?advisor=leigh-roach");
    expect(screen.getByText("Listings and completed transactions associated with Leigh Roach")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5911 Family Farm Road" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "2301 Lackey Street" })).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Property status" })).toHaveValue("All");
  });

  it("includes shared closed transactions in each associated agent portfolio", () => {
    const gaurang = renderPage(<Properties />, "/properties?advisor=gaurang-gala");
    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "10416 Chapel Hill Road" })).toBeInTheDocument();
    expect(Array.from(document.querySelectorAll(".gala-property-grid h2"), (heading) => heading.textContent)).toEqual([
      "611 & 703 Church Street",
      "Lexington Townhome Site",
      "2301 Lackey Street",
      "5047 Yadkin Road",
      "802 Bragg Boulevard",
      "10416 Chapel Hill Road",
    ]);
    gaurang.unmount();

    renderPage(<Properties />, "/properties?advisor=goverdhan-vavilala");
    expect(screen.getByText("Listings and completed transactions associated with Dr. Goverdhan Reddy Vavilala")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "10416 Chapel Hill Road" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "2301 Lackey Street" })).not.toBeInTheDocument();
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

  it("keeps investor sourcing on Investment Sales without interrupting Capital Markets", () => {
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
    expect(screen.getByRole("link", { name: /^Debt Debt strategy/i })).toHaveAttribute("href", "/services/capital-markets/debt");
    expect(screen.getByRole("link", { name: /^Equity Equity conversations/i })).toHaveAttribute("href", "/services/capital-markets/equity");
    expect(screen.queryByRole("link", { name: /Discuss Exchange Financing/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Find a Replacement Property/i })).not.toBeInTheDocument();
  });

  it("keeps the Brokerage overview focused on its two representation paths", () => {
    const view = render(
      <MemoryRouter initialEntries={["/services/brokerage"]}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Brokerage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Two sides of the market. One clear point of advocacy." })).toBeInTheDocument();
    expect(view.container.querySelectorAll(".gala-capability-teaser")).toHaveLength(2);
    expect(view.container.querySelectorAll(".gala-capability-section")).toHaveLength(0);
    expect(screen.queryByText(/market positioning/i)).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /owner and leasing advisor evaluating a vacant commercial suite/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Position the space around the owner’s real objective." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Move from availability to an informed lease decision." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One owner-side assignment from strategy through execution." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Your property deserves an advocate/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /business leaders and a commercial real estate advisor touring/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /business decision-makers comparing commercial occupancy options/i })).toBeInTheDocument();
    expect(screen.getByText(/represents the tenant’s interests exclusively/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Choose space through the lens of the business." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Move from requirement to an executable occupancy plan." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A tenant-side record your team can act on." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /The best answer may not be a new address/i })).not.toBeInTheDocument();
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

  it("renders a concise partner-led Property Management journey", () => {
    render(
      <MemoryRouter initialEntries={["/services/property-management/property-management-partnership"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Property Management Partnership", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /operations professional reviewing building mechanical systems/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /owner and operations partner organizing/i })).toBeInTheDocument();
    expect(screen.getByText(/does not provide day-to-day property management in house/i)).toBeInTheDocument();
    expect(screen.getByText(/selected partner contracts directly with ownership/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Start with the owner’s requirements—not a generic management package." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Move from an operating need to a responsible handoff." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The information and decisions needed for a clear transition." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Partnership Process/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss Property Operations/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=property-management",
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /multifamily advisor reviewing/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Buyers price the income—and the work behind it." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Prepare the asset before the market sets the narrative." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep opportunity separate from assumption." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A sale process grounded in operating evidence." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Sale Process/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /active neighborhood retail center/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Retail value lives where the lease meets the site." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Match the buyer to the actual value path." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Read the leases before the market writes the conclusion." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Retail-specific preparation from lease file to closing file." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Sale Process/i })).not.toBeInTheDocument();
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
    expect(screen.getByRole("img", { name: /contemporary office interior/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Office space competes twice: for tenants and for capital." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Match the buyer to the building's real plan." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Make occupancy risk understandable before buyers price uncertainty." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Preparation for the questions office buyers ask first." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Sale Process/i })).not.toBeInTheDocument();
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

  it("renders a diligence-led compact journey for Land Investment Sales", () => {
    render(
      <MemoryRouter initialEntries={["/services/investment-sales/land"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Land Investment Sales", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /generic aerial view of a commercial land parcel/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /generic commercial land site shown with road access/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Potential only matters when the path to use is credible." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Define what is allowed, proposed, and unresolved." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Make the execution dependencies visible." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Organize the record before buyers price the unknowns." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A land offering built for real underwriting." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Sale Process/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Land Opportunity/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=investment-sales&focus=land"
    );
    expect(screen.getByRole("link", { name: /Site Strategy/i })).toHaveAttribute(
      "href",
      "/services/development-services/site-strategy"
    );
    expect(screen.queryByText(/pending client|client approval|coming soon/i)).not.toBeInTheDocument();
  });

  it("renders Development Oversight as a concise owner-side coordination journey", () => {
    render(
      <MemoryRouter initialEntries={["/services/development-services/development-oversight"]}>
        <Routes>
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Development Oversight", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /owner representative and project professional/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /owner-side team reviewing a generic development schedule/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Complex projects lose time in the gaps between teams." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Create one decision rhythm across the project." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Owner-side clarity without replacing the project team." })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /See the Oversight Process/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Development/i })[0]).toHaveAttribute(
      "href",
      "/contact?inquiry=development-services&focus=development-oversight"
    );
    expect(screen.getByRole("link", { name: /Transaction Coordination/i })).toHaveAttribute(
      "href",
      "/services/capital-markets/transaction-coordination"
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
    expect(Array.from(document.querySelectorAll(".gala-property-grid h2"), (heading) => heading.textContent)).toEqual([
      "611 & 703 Church Street",
      "5911 Family Farm Road",
      "Lexington Townhome Site",
      "2301 Lackey Street",
      "5047 Yadkin Road",
      "802 Bragg Boulevard",
      "202 North Main Street",
      "10416 Chapel Hill Road",
    ]);
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
    expect(screen.getAllByRole("link", { name: /Request Property Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=2301-lackey-street&advisor=gaurang-gala"
    );
    expect(screen.queryByRole("link", { name: /Share Your Acquisition Criteria/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View on Crexi/i })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st"
    );
    expect(screen.getByRole("link", { name: "View on Crexi" })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/2344758/north-carolina-2301-lackey-st"
    );
    expect(screen.queryByText(/View Documents|Documents & Diligence|Request Package|Request Records/i)).not.toBeInTheDocument();
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "910-578-2828" })).toHaveAttribute("href", "tel:+19105782828");
    const lackeyOpportunity = screen.getByRole("region", { name: "Existing fuel-and-convenience site near I-95 Exit 19." });
    expect(lackeyOpportunity.querySelector(".gala-listing-compact__opportunity-video")).not.toBeInTheDocument();
    expect(lackeyOpportunity.querySelector(".gala-commercial-listing__highlights--row")).not.toBeInTheDocument();
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
      advisorAssignments: [],
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
    expect(within(screen.getByRole("region", { name: /Church Street property gallery/i })).getAllByRole("button", { name: /View image/i })).toHaveLength(6);
    expect(screen.getAllByRole("link", { name: /Request Property Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=611-703-church-street&advisor=gaurang-gala"
    );
    expect(screen.queryByText(/View Documents|Documents & Diligence|Request Approval Package|Request Parcel Records/i)).not.toBeInTheDocument();
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByTitle("Map of 611 & 703 Church Street")).toBeInTheDocument();
    const churchVideo = screen.getByLabelText("Play the aerial property video for 611 and 703 Church Street");
    const churchOpportunity = screen.getByRole("region", { name: "A two-site Morrisville opportunity centered on childcare use." });
    expect(churchOpportunity).toContainElement(churchVideo);
    expect(churchOpportunity.querySelector(".gala-commercial-listing__highlights--row")?.children).toHaveLength(3);
    expect(document.querySelector(".gala-listing-compact__location-media video")).not.toBeInTheDocument();
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
    expect(within(screen.getByRole("region", { name: /5047 Yadkin Road property gallery/i })).getAllByRole("img")).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: /Request Property Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=5047-yadkin-road&advisor=gaurang-gala"
    );
    expect(screen.queryByText(/View Documents|Documents & Diligence|Request Approved Plan|Request Diligence/i)).not.toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "View on LoopNet" })).toHaveAttribute(
      "href",
      "https://www.loopnet.com/Listing/5911-Family-Farm-Rd-Morrisville-NC/41146198/"
    );
    expect(screen.queryByText(/Media Package|View Documents|Documents & Diligence|Request Diligence/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Request Property Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=5911-family-farm-road&advisor=leigh-roach"
    );
    expect(screen.getByText("Leigh Roach")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "leigh@galacregroup.com" })).toHaveAttribute("href", "mailto:leigh@galacregroup.com");
    expect(screen.getByTitle("Map of 5911 Family Farm Road")).toBeInTheDocument();
    const familyFarmVideo = screen.getByLabelText("Play the aerial property video for 5911 Family Farm Road");
    const familyFarmOpportunity = screen.getByRole("region", { name: "Approximately 2.10 acres in an established Morrisville setting." });
    expect(familyFarmOpportunity).toContainElement(familyFarmVideo);
    expect(familyFarmOpportunity.querySelector(".gala-commercial-listing__highlights--row")?.children).toHaveLength(3);
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
    expect(screen.queryByText(/View Documents|Documents & Diligence|Request Approval Record/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Request Property Information/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=1111-brown-street&advisor=gaurang-gala",
    );
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByTitle("Map of 1111 Brown Street")).toBeInTheDocument();
    const lexingtonVideo = screen.getByLabelText("Play the vertical property video for the Lexington Townhome Site");
    const lexingtonOpportunity = screen.getByRole("region", { name: "A proposed 58-townhome site with a documented diligence history." });
    expect(lexingtonOpportunity).toContainElement(lexingtonVideo);
    expect(lexingtonOpportunity.querySelector(".gala-commercial-listing__highlights--row")?.children).toHaveLength(3);
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
      "/contact?property=802-bragg-boulevard&advisor=gaurang-gala"
    );
    expect(screen.getByRole("link", { name: "View on Crexi" })).toHaveAttribute(
      "href",
      "https://www.crexi.com/properties/1810031/north-carolina-valero"
    );
    expect(screen.getByRole("link", { name: "View on LoopNet" })).toHaveAttribute(
      "href",
      "https://www.loopnet.com/Listing/802-Bragg-Blvd-Fayetteville-NC/39012701/"
    );
    expect(screen.queryByText(/View Documents|Public Transaction Record/i)).not.toBeInTheDocument();
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
    expect(screen.getByText("Gaurang Gala")).toBeInTheDocument();
    expect(screen.getByText("Dr. Goverdhan Reddy Vavilala")).toBeInTheDocument();
    expect(screen.getByText("Gaurang Gala and Dr. Goverdhan Reddy Vavilala")).toBeInTheDocument();
    expect(screen.getByText(/relationship to 10414 remains unconfirmed/i)).toBeInTheDocument();
    expect(screen.queryByText("$2,500,000")).not.toBeInTheDocument();
    expect(screen.queryByText("$1.8M")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /property gallery/i })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /completed transaction graphic/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Discuss a Similar Property/i })[0]).toHaveAttribute(
      "href",
      "/contact?property=10416-chapel-hill-road&advisor=gaurang-gala",
    );
  });
});
