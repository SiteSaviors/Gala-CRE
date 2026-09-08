import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildAgentApplicationPayload,
  submitAgentApplication,
  type AgentApplicationValues,
} from "@/lib/careersForm";

const validApplication: AgentApplicationValues = {
  name: "Jordan Broker",
  email: "jordan@example.com",
  phone: "919-555-0100",
  currentBrokerage: "Triangle Commercial",
  cityAndMarkets: "Raleigh-Durham",
  licenseState: "North Carolina",
  licenseNumber: "NC 123456",
  yearsExperience: "6–10 years",
  specialties: ["Industrial", "Land"],
  salesLeasingExperience: "Commercial sales and leasing representation across the Triangle.",
  transactionVolume: "$5–15 million",
  representativeTransactions: "Industrial owner-user sale and a commercial land disposition.",
  existingPipeline: "",
  profileUrl: "https://example.com/jordan",
  whyGala: "I want to work within a connected commercial platform and grow durable client relationships.",
  consent: true,
  website: "",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("careers submission boundary", () => {
  it("adds source and inquiry context to the shared form contract", () => {
    const startedAt = "2026-09-08T12:00:00.000Z";
    const submission = buildAgentApplicationPayload(validApplication, "/careers?source=footer", startedAt);
    expect(submission).toMatchObject({
      formType: "careers",
      inquiryType: "Commercial Agent Application",
      sourcePage: "/careers?source=footer",
      startedAt,
      payload: {
        name: "Jordan Broker",
        specialties: ["Industrial", "Land"],
      },
    });
  });

  it("posts the structured application through the shared private endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    await submitAgentApplication(validApplication, "/careers?source=footer", "2026-09-08T12:00:00.000Z");

    expect(fetchMock).toHaveBeenCalledWith("/api/forms", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.stringContaining('"licenseNumber":"NC 123456"'),
    }));
  });

  it("rejects cleanly when the shared endpoint cannot deliver", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: "Unavailable" }), { status: 503 }));
    await expect(submitAgentApplication(validApplication)).rejects.toMatchObject({ status: 503 });
  });
});
