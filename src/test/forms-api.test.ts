import { afterEach, describe, expect, it, vi } from "vitest";
import formsHandler from "../../api/forms";

const startedAt = () => new Date(Date.now() - 2_000).toISOString();

const careersSubmission = () => ({
  formType: "careers",
  inquiryType: "Commercial Agent Application",
  sourcePage: "/careers?source=footer",
  startedAt: startedAt(),
  payload: {
    name: "Jordan Broker",
    email: "jordan@example.com",
    phone: "919-555-0100",
    currentBrokerage: "Triangle Commercial",
    cityAndMarkets: "Raleigh-Durham",
    licenseState: "North Carolina",
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
  },
});

const investorSubmission = () => ({
  formType: "investor-sourcing",
  inquiryType: "1031 and Investor Property Sourcing",
  sourcePage: "/investors/1031-exchange?property=2301-lackey-street&source=listing",
  startedAt: startedAt(),
  payload: {
    name: "Avery Investor",
    email: "avery@example.com",
    phone: "919-555-0110",
    company: "Avery Holdings",
    exchangeStatus: "Yes — this is a 1031 exchange",
    relinquishedClosingDate: "2026-09-01",
    identificationDeadline: "2099-09-12",
    completionDeadline: "2099-12-31",
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
  },
});

const createResponse = () => {
  const result = { statusCode: 0, body: undefined as unknown, headers: {} as Record<string, string> };
  const response = {
    setHeader: vi.fn((name: string, value: string) => { result.headers[name] = value; }),
    status: vi.fn((code: number) => { result.statusCode = code; return response; }),
    json: vi.fn((body: unknown) => { result.body = body; }),
  };
  return { response, result };
};

const request = (body: unknown, ip: string, origin = "https://galacre.example") => ({
  method: "POST",
  body,
  headers: { "x-forwarded-for": ip, origin },
});

const configureDelivery = () => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Gala CRE <website@example.com>");
  vi.stubEnv("CAREERS_TO_EMAIL", "beth@galacregroup.com, gaurang@galacregroup.com");
  vi.stubEnv("INVESTOR_TO_EMAIL", "beth@galacregroup.com, gaurang@galacregroup.com");
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("shared forms API", () => {
  it("validates each form server-side", async () => {
    const { response, result } = createResponse();
    const invalid = careersSubmission();
    invalid.payload.email = "invalid";
    await formsHandler(request(invalid, "10.0.0.1"), response);
    expect(result.statusCode).toBe(400);
  });

  it("rejects invalid or incomplete exchange timelines before delivery", async () => {
    configureDelivery();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const invalid = investorSubmission();
    invalid.payload.identificationDeadline = "2026-08-31";
    invalid.payload.completionDeadline = "";
    const { response, result } = createResponse();

    await formsHandler(request(invalid, "10.0.0.8"), response);

    expect(result.statusCode).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without external delivery", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    const spam = investorSubmission();
    spam.payload.website = "spam.example";
    await formsHandler(request(spam, "10.0.0.2"), response);
    expect(result.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects implausibly fast submissions without external delivery", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const bot = careersSubmission();
    bot.startedAt = new Date().toISOString();
    const { response, result } = createResponse();

    await formsHandler(request(bot, "10.0.0.9"), response);

    expect(result.statusCode).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("routes Careers privately to its configured recipients", async () => {
    configureDelivery();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    await formsHandler(request(careersSubmission(), "10.0.0.3"), response);
    expect(result.statusCode).toBe(200);
    const emailBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(emailBody.to).toEqual(["beth@galacregroup.com", "gaurang@galacregroup.com"]);
    expect(emailBody.reply_to).toBe("jordan@example.com");
    expect(result.body).toEqual({ ok: true });
  });

  it("routes investor inquiries separately and optionally syncs a Google record", async () => {
    configureDelivery();
    vi.stubEnv("GOOGLE_SYNC_WEBHOOK_URL", "https://script.google.example/forms");
    vi.stubEnv("GOOGLE_SYNC_SECRET", "private-sync-token");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    await formsHandler(request(investorSubmission(), "10.0.0.4"), response);

    expect(result.statusCode).toBe(200);
    const emailBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(emailBody.to).toEqual(["beth@galacregroup.com", "gaurang@galacregroup.com"]);
    expect(fetchMock).toHaveBeenNthCalledWith(2, "https://script.google.example/forms", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer private-sync-token" },
      body: expect.stringContaining('"sourcePage":"/investors/1031-exchange?property=2301-lackey-street&source=listing"'),
    }));
  });

  it("rate-limits repeated submissions from the same client", async () => {
    configureDelivery();
    vi.stubEnv("FORM_RATE_LIMIT_MAX", "2");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    for (let index = 0; index < 2; index += 1) {
      const { response, result } = createResponse();
      await formsHandler(request(careersSubmission(), "10.0.0.5"), response);
      expect(result.statusCode).toBe(200);
    }
    const { response, result } = createResponse();
    await formsHandler(request(careersSubmission(), "10.0.0.5"), response);
    expect(result.statusCode).toBe(429);
    expect(result.headers["Retry-After"]).toBeDefined();
  });

  it("fails safely without exposing private configuration", async () => {
    const { response, result } = createResponse();
    await formsHandler(request(careersSubmission(), "10.0.0.6"), response);
    expect(result.statusCode).toBe(503);
    expect(JSON.stringify(result.body)).not.toMatch(/RESEND|EMAIL|KEY|recipient/i);
  });

  it("can restrict submissions to approved origins", async () => {
    vi.stubEnv("FORM_ALLOWED_ORIGINS", "https://galacre.example");
    const { response, result } = createResponse();
    await formsHandler(request(investorSubmission(), "10.0.0.7", "https://untrusted.example"), response);
    expect(result.statusCode).toBe(403);
  });
});
