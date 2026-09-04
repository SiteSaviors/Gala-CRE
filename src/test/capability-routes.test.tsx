import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CapabilityDetail from "@/pages/CapabilityDetail";
import { capabilityPageByPath } from "@/content/capabilityPages";
import { advertisedCapabilityRoutes, findCapabilityByRoute } from "@/content/services";

const expectedCapabilities = [
  "Landlord representation",
  "Tenant representation",
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
      expect(
        Boolean(capabilityPageByPath[entry.path]) || Boolean(match.capability.lead && match.capability.included?.length),
        `${entry.path} content`,
      ).toBe(true);
    });
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
});
