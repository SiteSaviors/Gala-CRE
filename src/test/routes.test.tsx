import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LegacyProjectRedirect } from "@/App";

const Location = () => <span data-testid="location">{useLocation().pathname}</span>;

describe("legacy project routes", () => {
  it("redirects an unmatched legacy project to the property catalog", async () => {
    render(
      <MemoryRouter initialEntries={["/projects/old-radius-project"]}>
        <Routes>
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/properties" element={<Location />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByTestId("location")).toHaveTextContent("/properties");
  });
});
