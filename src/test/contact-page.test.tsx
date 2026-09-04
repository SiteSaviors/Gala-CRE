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

  it("prefills a focused tenant representation inquiry", () => {
    renderContact("/contact?inquiry=tenant-representation");
    expect(screen.getByRole("combobox", { name: "How can we help?" })).toHaveValue("Tenant Representation");
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
