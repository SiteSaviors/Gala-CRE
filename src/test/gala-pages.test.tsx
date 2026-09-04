import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Company from "@/pages/Company";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import Services from "@/pages/Services";

const renderPage = (page: React.ReactNode, route = "/") => render(
  <MemoryRouter initialEntries={[route]}>{page}</MemoryRouter>
);

describe("Gala CRE public pages", () => {
  it("positions the homepage around commercial services", () => {
    const { container } = renderPage(<Index />);
    expect(screen.getByRole("heading", { name: /Commercial Real Estate, Simplified/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaBroker" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Built to move commercial opportunities forward." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaSales" })).toBeInTheDocument();
    expect(screen.getByText("Commercial property acquisitions, dispositions, and marketing.")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "GalaSales capabilities" })).getByRole("link", { name: "Industrial" }))
      .toHaveAttribute("href", "/services/investment-sales#industrial");
    expect(screen.getByRole("heading", { name: "GalaDevelop" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GalaCapital" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Featured listings" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "For Lease" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "For Sale" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("2301 Lackey Street")).toBeInTheDocument();
    expect(screen.getByText("$549,000")).toBeInTheDocument();
    expect(screen.getByText("5047 Yadkin Road")).toBeInTheDocument();
    expect(screen.getByText("$829,000")).toBeInTheDocument();
    expect(screen.getByText("611 & 703 Church Street")).toBeInTheDocument();
    expect(screen.getByText("$1,190,000")).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/radiusbuilt\.com/i);
  });

  it("renders the five approved service structures", () => {
    renderPage(<Services />, "/services");
    expect(screen.getByText("Brokerage")).toBeInTheDocument();
    expect(screen.getByText("Investment Sales")).toBeInTheDocument();
    expect(screen.getByText("Development Services")).toBeInTheDocument();
    expect(screen.getByText("Capital Markets")).toBeInTheDocument();
    expect(screen.getByText("Property Management Partnership")).toBeInTheDocument();
  });

  it("keeps unapproved team claims out of the site", () => {
    const company = renderPage(<Company />, "/company");
    expect(screen.getByText("Team profiles are awaiting client approval.")).toBeInTheDocument();
    company.unmount();
  });

  it("renders the current approved property catalog", () => {
    renderPage(<Properties />, "/properties");
    expect(screen.getByText("3 properties")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2301 Lackey Street" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "5047 Yadkin Road" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "611 & 703 Church Street" })).toBeInTheDocument();
  });
});
