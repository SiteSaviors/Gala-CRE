import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildInvestorInquiryPayload,
  getInvestorInquiryPriority,
  submitInvestorInquiry,
  type InvestorInquiryValues,
} from "@/lib/investorSourcingForm";

const validInquiry: InvestorInquiryValues = {
  name: "Avery Investor",
  email: "avery@example.com",
  phone: "919-555-0110",
  company: "Avery Holdings",
  exchangeStatus: "Yes — this is a 1031 exchange",
  relinquishedClosingDate: "2026-09-01",
  identificationDeadline: "2026-09-12",
  completionDeadline: "2027-02-28",
  targetLocations: "Raleigh-Durham and central North Carolina",
  assetTypes: ["Industrial", "Retail"],
  purchasePriceMin: "$2,000,000",
  purchasePriceMax: "$5,000,000",
  availableEquity: "$1,500,000",
  financingStatus: "Lender engaged",
  occupancyAndTenantProfile: "Occupied property with durable lease term and established tenants.",
  returnAndRiskCriteria: "Current income with limited near-term capital requirements.",
  marketInterest: "On-market and off-market",
  propertiesUnderConsideration: "One marketed industrial property in Wake County.",
  intermediaryStatus: "Qualified intermediary engaged",
  additionalRequirements: "Convenient highway access and a conventional diligence period.",
  preferredResponseMethod: "Phone",
  consent: true,
  website: "",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("investor sourcing submission boundary", () => {
  it("derives internal priority from the supplied identification deadline", () => {
    expect(getInvestorInquiryPriority("2026-09-12", new Date("2026-09-08T12:00:00Z"))).toEqual({
      priority: "immediate",
      daysToIdentificationDeadline: 5,
    });
    expect(getInvestorInquiryPriority("", new Date("2026-09-08T12:00:00Z"))).toEqual({
      priority: "standard",
      daysToIdentificationDeadline: null,
    });
  });

  it("preserves referral context and structured acquisition criteria", () => {
    const startedAt = "2026-09-08T12:00:00.000Z";
    const submission = buildInvestorInquiryPayload(
      validInquiry,
      "/investors/1031-exchange?property=2301-lackey-street&source=listing",
      startedAt,
    );

    expect(submission).toMatchObject({
      formType: "investor-sourcing",
      inquiryType: "1031 and Investor Property Sourcing",
      sourcePage: "/investors/1031-exchange?property=2301-lackey-street&source=listing",
      startedAt,
      payload: {
        assetTypes: ["Industrial", "Retail"],
        intermediaryStatus: "Qualified intermediary engaged",
      },
    });
  });

  it("posts the acquisition brief through the shared private endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    await submitInvestorInquiry(validInquiry, "/investors/1031-exchange?source=footer", "2026-09-08T12:00:00.000Z");

    expect(fetchMock).toHaveBeenCalledWith("/api/forms", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.stringContaining('"identificationDeadline":"2026-09-12"'),
    }));
  });

  it("rejects cleanly when the shared endpoint cannot deliver", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ error: "Unavailable" }), { status: 503 }));
    await expect(submitInvestorInquiry(validInquiry)).rejects.toMatchObject({ status: 503 });
  });
});
