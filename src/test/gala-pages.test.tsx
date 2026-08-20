import { render, screen } from "@testing-library/react";
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
  it("positions the homepage around commercial advisory", () => {
    const { container } = renderPage(<Index />);
    expect(screen.getByRole("heading", { name: /CRE, Simplified/i })).toBeInTheDocument();
    expect(screen.getByText("Sell or Lease")).toBeInTheDocument();
    expect(screen.getByText("Find Space")).toBeInTheDocument();
    expect(screen.getByText("Invest")).toBeInTheDocument();
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

  it("keeps unapproved team and property claims out of the site", () => {
    const company = renderPage(<Company />, "/company");
    expect(screen.getByText("Team profiles are awaiting client approval.")).toBeInTheDocument();
    company.unmount();

    renderPage(<Properties />, "/properties");
    expect(screen.getByText("Approved Gala listings are coming soon.")).toBeInTheDocument();
    expect(screen.getByText("0 properties")).toBeInTheDocument();
  });
});
