import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AgentApplicationForm from "@/components/careers/AgentApplicationForm";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("careers application form", () => {
  it("validates its own schema before calling the shared endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(<MemoryRouter initialEntries={["/careers?source=test"]}><AgentApplicationForm /></MemoryRouter>);

    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
      expect(screen.getByText("Enter your license number or status.")).toBeInTheDocument();
      expect(screen.getByText("Select at least one commercial specialty.")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("retains entered data and shows a safe inline failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: "Unavailable" }), { status: 503 }));
    render(<MemoryRouter initialEntries={["/careers?source=test"]}><AgentApplicationForm /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Jordan Broker" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jordan@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "919-555-0100" } });
    fireEvent.change(screen.getByLabelText("City and markets served"), { target: { value: "Raleigh-Durham" } });
    fireEvent.change(screen.getByLabelText("License state"), { target: { value: "North Carolina" } });
    fireEvent.change(screen.getByLabelText("License number or status"), { target: { value: "NC 123456" } });
    fireEvent.click(screen.getByLabelText("Industrial"));
    fireEvent.change(screen.getByLabelText("Sales and leasing experience"), { target: { value: "Commercial sales and leasing across the Triangle market." } });
    fireEvent.change(screen.getByLabelText("Representative past transactions"), { target: { value: "An industrial owner-user sale and commercial land disposition." } });
    fireEvent.change(screen.getByLabelText("Why Gala CRE?"), { target: { value: "I want to build lasting commercial relationships within a connected platform." } });
    fireEvent.click(screen.getByLabelText(/I consent to Gala CRE Group using this information/i));
    fireEvent.click(screen.getByRole("button", { name: "Submit Application" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Your information has not been submitted");
    expect(screen.getByDisplayValue("Jordan Broker")).toBeInTheDocument();
  });
});
