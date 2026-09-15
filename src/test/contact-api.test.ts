import { afterEach, describe, expect, it, vi } from "vitest";
import contactHandler from "../../api/contact";

const validBody = {
  name: "Taylor Gala",
  email: "taylor@example.com",
  phone: "919-555-0123",
  company: "Triangle Holdings",
  inquiryType: "Investment Sales",
  message: "I would like to discuss a commercial property disposition.",
  propertySlug: "",
  advisorId: "",
  sourcePage: "/contact",
  website: "",
};

const createResponse = () => {
  const result = { statusCode: 0, body: undefined as unknown };
  const response = {
    setHeader: vi.fn(),
    status: vi.fn((code: number) => {
      result.statusCode = code;
      return response;
    }),
    json: vi.fn((body: unknown) => {
      result.body = body;
    }),
  };
  return { response, result };
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact API", () => {
  it("rejects invalid submissions", async () => {
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: { ...validBody, email: "invalid" } }, response);
    expect(result.statusCode).toBe(400);
  });

  it("silently accepts honeypot submissions without sending email", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: { ...validBody, website: "spam.example" } }, response);
    expect(result.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("delivers a validated inquiry through Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "advisor@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Gala CRE <website@example.com>");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: validBody }, response);
    expect(result.statusCode).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({ method: "POST" }));
  });

  it("preserves an approved advisor request in the private notification", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "advisor@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Gala CRE <website@example.com>");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: { ...validBody, advisorId: "leigh-roach" } }, response);
    expect(result.statusCode).toBe(200);
    const emailBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(emailBody.text).toContain("Requested advisor: leigh-roach");
  });

  it("rejects an unrecognized advisor id", async () => {
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: { ...validBody, advisorId: "unknown-agent" } }, response);
    expect(result.statusCode).toBe(400);
  });

  it.each(["Commercial Agent Careers", "1031 / Replacement Property Search"])("accepts the contextual %s inquiry category", async (inquiryType) => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "advisor@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Gala CRE <website@example.com>");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: { ...validBody, inquiryType } }, response);
    expect(result.statusCode).toBe(200);
  });

  it("returns a gateway error when email delivery fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "advisor@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Gala CRE <website@example.com>");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const { response, result } = createResponse();
    await contactHandler({ method: "POST", body: validBody }, response);
    expect(result.statusCode).toBe(502);
  });
});
