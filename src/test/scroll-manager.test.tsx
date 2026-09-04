import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScrollManager from "@/components/site/ScrollManager";

const PageWithAnchor = () => (
  <>
    <Link to="/other">Go elsewhere</Link>
    <div id="tenant-representation">Tenant representation</div>
  </>
);

const OtherPage = () => <div>Other page</div>;

const renderAt = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ScrollManager />
      <Routes>
        <Route path="/services/brokerage" element={<PageWithAnchor />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("ScrollManager", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("scrolls the matching anchor target into view when the URL has a hash", () => {
    const scrollIntoView = vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(() => {});
    renderAt("/services/brokerage#tenant-representation");
    expect(screen.getByText("Tenant representation")).toBeInTheDocument();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });

  it("resets scroll to the top when navigating to a route with no hash", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderAt("/services/brokerage");
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("link", { name: "Go elsewhere" }));

    expect(await screen.findByText("Other page")).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("falls back to scrolling to the top when the hash target does not exist", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderAt("/services/brokerage#not-a-real-anchor");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
