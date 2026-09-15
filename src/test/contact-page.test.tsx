import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "@/pages/Contact";

const renderContact = (route = "/contact") => render(
  <MemoryRouter initialEntries={[route]}>
    <Routes><Route path="/contact" element={<Contact />} /></Routes>
  </MemoryRouter>
);

const completeForm = () => {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Taylor Gala" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "taylor@example.com" } });
  fireEvent.change(screen.getByLabelText("Phone Optional"), { target: { value: "919-555-0123" } });
  fireEvent.change(screen.getByLabelText("Company Optional"), { target: { value: "Triangle Holdings" } });
  fireEvent.change(screen.getByLabelText("What are you evaluating?"), {
    target: { value: "I would like to evaluate a commercial property disposition." },
  });
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("advisor inquiry form", () => {
  it("validates required fields", async () => {
    renderContact();
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));
    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Please share a few more details.")).toBeInTheDocument();
  });

  it("preserves property context and posts the expanded payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    renderContact("/contact?property=approved-listing");
    completeForm();
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Property Inquiry");
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(await screen.findByRole("heading", { name: "Inquiry received" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    const payload = JSON.parse(String(request.body));
    expect(payload).toMatchObject({
      company: "Triangle Holdings",
      inquiryType: "Property Inquiry",
      phone: "919-555-0123",
      propertySlug: "approved-listing",
      sourcePage: "/contact?property=approved-listing",
      website: "",
    });
  });

  it("prefills a focused landlord representation inquiry", () => {
    renderContact("/contact?inquiry=landlord-representation");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Landlord Representation");
  });

  it("prefills a focused investment sales inquiry", () => {
    renderContact("/contact?inquiry=investment-sales");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Investment Sales");
  });

  it("preserves Capital Markets exchange-financing context", () => {
    renderContact("/contact?inquiry=capital-markets&focus=1031-financing&source=gala-capital");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Capital Markets");
  });

  it.each([
    ["/contact?inquiry=development-services&focus=site-strategy", "Development Services"],
    ["/contact?inquiry=property-management", "Property Management"],
  ])("preserves capability inquiry context for %s", (path, expectedInquiry) => {
    renderContact(path);
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue(expectedInquiry);
  });

  it("prefills a focused tenant representation inquiry", () => {
    renderContact("/contact?inquiry=tenant-representation");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Tenant Representation");
  });

  it("preserves a team-member contact request", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    renderContact("/contact?advisor=goverdhan-vavilala&source=team");
    expect(screen.getByRole("heading", { name: "Contact Goverdhan Vavilala" })).toBeInTheDocument();
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));
    await screen.findByRole("heading", { name: "Inquiry received" });
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      advisorId: "goverdhan-vavilala",
      sourcePage: "/contact?advisor=goverdhan-vavilala&source=team",
    });
  });

  it("preselects Careers and reveals the dedicated recruiting journey", () => {
    renderContact("/contact?inquiry=careers");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Commercial Agent Careers");
    expect(screen.getByRole("link", { name: "Continue to Agent Application" })).toHaveAttribute("href", "/careers?source=contact");
  });

  it("preselects 1031 sourcing and reveals the dedicated acquisition brief", () => {
    renderContact("/contact?inquiry=1031-exchange");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("1031 / Replacement Property Search");
    expect(screen.getByRole("link", { name: "Continue to Acquisition Brief" })).toHaveAttribute("href", "/investors/1031-exchange?source=contact");
  });

  it("retains input and displays an inline delivery error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    renderContact();
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByDisplayValue("Taylor Gala")).toBeInTheDocument();
  });
});
