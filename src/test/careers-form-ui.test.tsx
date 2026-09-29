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

    fireEvent.click(screen.getByRole("button", { name: "Start a Confidential Conversation" }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
      expect(screen.getByText("Tell us where you currently work.")).toBeInTheDocument();
      expect(screen.getByText("Tell us which property types you focus on.")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("retains entered data and shows a safe inline failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: "Unavailable" }), { status: 503 }));
    render(<MemoryRouter initialEntries={["/careers?source=test"]}><AgentApplicationForm /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Jordan Broker" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jordan@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "919-555-0100" } });
    fireEvent.change(screen.getByLabelText("Markets served"), { target: { value: "Raleigh-Durham" } });
    fireEvent.change(screen.getByLabelText("Commercial specialties"), { target: { value: "Industrial and commercial land" } });
    fireEvent.change(screen.getByLabelText("Listing experience and goals"), { target: { value: "Commercial sales and leasing across the Triangle market, with a focus on growing an active listing practice." } });
    fireEvent.click(screen.getByLabelText(/I consent to Gala CRE Group using this information/i));
    fireEvent.click(screen.getByRole("button", { name: "Start a Confidential Conversation" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Your information has not been submitted");
    expect(screen.getByDisplayValue("Jordan Broker")).toBeInTheDocument();
  });
});
