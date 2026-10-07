import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import InvestorInquiryForm from "@/components/investors/InvestorInquiryForm";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("investor sourcing form", () => {
  it("validates the acquisition brief before attempting delivery", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    render(
      <MemoryRouter initialEntries={["/investors/1031-exchange?source=test"]}>
        <InvestorInquiryForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start Property Search" }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
      expect(screen.getByText("Enter the identification deadline.")).toBeInTheDocument();
      expect(screen.getByText("Select at least one asset type.")).toBeInTheDocument();
    });
    const assetTypes = screen.getByRole("group", { name: "Asset types" });
    const groupMessage = screen.getByText("Select at least one asset type.");
    expect(assetTypes).toHaveAttribute("aria-invalid", "true");
    expect(assetTypes).toHaveAttribute("aria-describedby", groupMessage.id);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("only asks for an identification deadline on confirmed exchanges", () => {
    render(
      <MemoryRouter initialEntries={["/investors/1031-exchange?source=test"]}>
        <InvestorInquiryForm />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Identification deadline")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Is this a 1031 exchange?"), {
      target: { value: "No — this is a direct acquisition" },
    });
    expect(screen.queryByLabelText("Identification deadline")).not.toBeInTheDocument();
  });

  it("retains an acquisition brief when delivery fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: "Unavailable" }), { status: 503 }));
    render(
      <MemoryRouter initialEntries={["/investors/1031-exchange?source=test"]}>
        <InvestorInquiryForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Avery Investor" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "avery@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "919-555-0110" } });
    fireEvent.change(screen.getByLabelText("Identification deadline"), { target: { value: "2026-10-16" } });
    fireEvent.change(screen.getByLabelText("Target markets"), { target: { value: "Raleigh-Durham" } });
    fireEvent.click(screen.getByLabelText("Industrial"));
    fireEvent.change(screen.getByLabelText("Purchase-price minimum"), { target: { value: "$2,000,000" } });
    fireEvent.change(screen.getByLabelText("Purchase-price maximum"), { target: { value: "$5,000,000" } });
    fireEvent.change(screen.getByLabelText("Available equity"), { target: { value: "$1,500,000" } });
    fireEvent.change(screen.getByLabelText("Brief property and investment requirements"), { target: { value: "Occupied property with established tenants and limited capital needs." } });
    fireEvent.click(screen.getByLabelText(/I consent to Gala CRE Group using this information/i));
    fireEvent.click(screen.getByRole("button", { name: "Start Property Search" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Your information has not been submitted");
    expect(screen.getByDisplayValue("Avery Investor")).toBeInTheDocument();
  });
});
