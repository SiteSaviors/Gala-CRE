import { createHash } from "node:crypto";
import { z } from "zod";
import { getExchangeTimelineIssues } from "../src/lib/exchangeTimeline.js";
import { getInvestorInquiryPriority } from "../src/lib/inquiryPriority.js";

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

const experienceRanges = ["Less than 2 years", "2–5 years", "6–10 years", "11–20 years", "More than 20 years"] as const;
const specialties = ["Landlord representation", "Tenant representation", "Industrial", "Multifamily", "Retail", "Office", "Land", "Development", "Capital markets"] as const;
const volumeRanges = ["Prefer not to disclose", "Under $2 million", "$2–5 million", "$5–15 million", "$15–30 million", "More than $30 million"] as const;
const exchangeStatuses = ["Yes — this is a 1031 exchange", "No — this is a direct acquisition", "Not sure yet"] as const;
const assetTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land", "Mixed use", "Special purpose"] as const;
const financingStatuses = ["Cash acquisition", "Financing approved", "Lender engaged", "Financing not started", "Evaluating capital structure"] as const;
const marketInterests = ["On-market and off-market", "On-market opportunities", "Off-market opportunities"] as const;
const intermediaryStatuses = ["Qualified intermediary engaged", "Selecting a qualified intermediary", "Not yet engaged", "Not applicable"] as const;
const responseMethods = ["Phone", "Email", "Text message"] as const;

const optionalString = (maximum: number) => z.string().trim().max(maximum);
const requiredString = (minimum: number, maximum: number) => z.string().trim().min(minimum).max(maximum);

const careersPayloadSchema = z.object({
  name: requiredString(2, 120),
  email: z.string().trim().email().max(254),
  phone: requiredString(7, 50),
  currentBrokerage: optionalString(160),
  cityAndMarkets: requiredString(2, 500),
  licenseState: requiredString(2, 80),
  licenseNumber: requiredString(2, 120),
  yearsExperience: z.enum(experienceRanges),
  specialties: z.array(z.enum(specialties)).min(1).max(specialties.length),
  salesLeasingExperience: requiredString(20, 5000),
  transactionVolume: z.enum(volumeRanges),
  representativeTransactions: requiredString(20, 5000),
  existingPipeline: optionalString(5000),
  profileUrl: z.union([z.literal(""), z.string().trim().url().max(500)]),
  whyGala: requiredString(30, 5000),
  consent: z.literal(true),
  website: z.string().max(500),
});

const investorPayloadSchema = z.object({
  name: requiredString(2, 120),
  email: z.string().trim().email().max(254),
  phone: requiredString(7, 50),
  company: optionalString(160),
  exchangeStatus: z.enum(exchangeStatuses),
  relinquishedClosingDate: optionalString(20),
  identificationDeadline: optionalString(20),
  completionDeadline: optionalString(20),
  targetLocations: requiredString(3, 1000),
  assetTypes: z.array(z.enum(assetTypes)).min(1).max(assetTypes.length),
  purchasePriceMin: requiredString(1, 80),
  purchasePriceMax: requiredString(1, 80),
  availableEquity: requiredString(1, 80),
  financingStatus: z.enum(financingStatuses),
  occupancyAndTenantProfile: requiredString(10, 5000),
  returnAndRiskCriteria: requiredString(10, 5000),
  marketInterest: z.enum(marketInterests),
  propertiesUnderConsideration: optionalString(5000),
  intermediaryStatus: z.enum(intermediaryStatuses),
  additionalRequirements: optionalString(5000),
  preferredResponseMethod: z.enum(responseMethods),
  consent: z.literal(true),
  website: z.string().max(500),
}).superRefine((values, context) => {
  getExchangeTimelineIssues({
    exchangeStatus: values.exchangeStatus ?? "",
    relinquishedClosingDate: values.relinquishedClosingDate ?? "",
    identificationDeadline: values.identificationDeadline ?? "",
    completionDeadline: values.completionDeadline ?? "",
  }).forEach(({ field, message }) => {
    context.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
  });
});

const submissionSchema = z.discriminatedUnion("formType", [
  z.object({
    formType: z.literal("careers"),
    inquiryType: z.literal("Commercial Agent Application"),
    sourcePage: z.string().trim().min(1).max(500).startsWith("/"),
    startedAt: z.string().datetime(),
    payload: careersPayloadSchema,
  }),
  z.object({
    formType: z.literal("investor-sourcing"),
    inquiryType: z.literal("1031 and Investor Property Sourcing"),
    sourcePage: z.string().trim().min(1).max(500).startsWith("/"),
    startedAt: z.string().datetime(),
    payload: investorPayloadSchema,
  }),
]);

const parseBody = (body: unknown): Record<string, unknown> | null => {
  if (typeof body === "string") {
    if (body.length > 100_000) return null;
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : null;
    } catch {
      return null;
    }
  }
  return body && typeof body === "object" ? body as Record<string, unknown> : null;
};

const headerValue = (request: ApiRequest, name: string) => {
  const value = request.headers?.[name] ?? request.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

const getClientKey = (request: ApiRequest) => {
  const forwarded = headerValue(request, "x-forwarded-for").split(",")[0]?.trim();
  const ip = forwarded || headerValue(request, "x-real-ip") || "unknown";
  const salt = process.env.FORM_RATE_LIMIT_SALT || process.env.KV_REST_API_TOKEN || "gala-cre-forms";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
};

const positiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const checkMemoryRateLimit = (key: string, now: number, maximum: number, windowMs: number) => {
  const existing = rateBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }
  existing.count += 1;
  return {
    allowed: existing.count <= maximum,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
};

const checkRateLimit = async (key: string) => {
  const maximum = positiveInteger(process.env.FORM_RATE_LIMIT_MAX, 5);
  const windowMs = positiveInteger(process.env.FORM_RATE_LIMIT_WINDOW_MS, 900_000);
  const restUrl = process.env.KV_REST_API_URL;
  const restToken = process.env.KV_REST_API_TOKEN;

  if (restUrl && restToken) {
    try {
      const bucket = Math.floor(Date.now() / windowMs);
      const response = await fetch(`${restUrl.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${restToken}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", `gala-cre:forms:${key}:${bucket}`],
          ["PEXPIRE", `gala-cre:forms:${key}:${bucket}`, windowMs],
        ]),
      });
      if (response.ok) {
        const result = await response.json() as Array<{ result?: number }>;
        const count = Number(result[0]?.result ?? 0);
        return { allowed: count <= maximum, retryAfterSeconds: Math.ceil(windowMs / 1000) };
      }
    } catch {
      // Fall back to the per-instance limiter so delivery still fails safely.
    }
  }

  return checkMemoryRateLimit(key, Date.now(), maximum, windowMs);
};

const originIsAllowed = (request: ApiRequest) => {
  const configured = process.env.FORM_ALLOWED_ORIGINS;
  if (!configured) return true;
  const origin = headerValue(request, "origin");
  const allowed = configured.split(",").map((value) => value.trim()).filter(Boolean);
  return Boolean(origin) && allowed.includes(origin);
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const labelFor = (key: string) => key
  .replace(/([a-z])([A-Z])/g, "$1 $2")
  .replace(/^./, (character) => character.toUpperCase());

const displayValue = (value: unknown) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value || "Not provided");
};

const buildEmail = (
  submission: z.infer<typeof submissionSchema>,
  submittedAt: string,
  routing: ReturnType<typeof getInvestorInquiryPriority> | null,
) => {
  const excluded = new Set(["website"]);
  const fields: Array<[string, string]> = [
    ["Inquiry type", submission.inquiryType],
    ["Source page", submission.sourcePage],
    ["Submitted at", submittedAt],
    ...Object.entries(submission.payload)
      .filter(([key]) => !excluded.has(key))
      .map(([key, value]) => [labelFor(key), displayValue(value)] as [string, string]),
  ];
  if (routing) fields.splice(3, 0, ["Internal priority", routing.priority], ["Days to identification deadline", displayValue(routing.daysToIdentificationDeadline)]);

  const rows = fields.map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  return { rows, text };
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Allow", "POST");
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!originIsAllowed(request)) {
    response.status(403).json({ error: "Unable to accept this submission." });
    return;
  }

  const body = parseBody(request.body);
  if (!body) {
    response.status(400).json({ error: "Please review the submitted fields." });
    return;
  }

  const rawPayload = body.payload && typeof body.payload === "object" ? body.payload as Record<string, unknown> : null;
  if (typeof rawPayload?.website === "string" && rawPayload.website.trim()) {
    response.status(200).json({ ok: true });
    return;
  }

  const limit = await checkRateLimit(getClientKey(request));
  if (!limit.allowed) {
    response.setHeader("Retry-After", String(limit.retryAfterSeconds));
    response.status(429).json({ error: "Too many submissions. Please try again later." });
    return;
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    response.status(400).json({ error: "Please review the submitted fields." });
    return;
  }

  const startedAt = new Date(parsed.data.startedAt).getTime();
  const now = Date.now();
  if (startedAt > now + 300_000 || now - startedAt < 750) {
    response.status(400).json({ error: "Please review the submitted fields." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = parsed.data.formType === "careers" ? process.env.CAREERS_TO_EMAIL : process.env.INVESTOR_TO_EMAIL;
  if (!apiKey || !from || !to) {
    response.status(503).json({ error: "Unable to accept this submission right now." });
    return;
  }

  const submittedAt = new Date(now).toISOString();
  const routing = parsed.data.formType === "investor-sourcing"
    ? getInvestorInquiryPriority(parsed.data.payload.identificationDeadline, new Date(now))
    : null;
  const email = buildEmail(parsed.data, submittedAt, routing);
  const subject = parsed.data.formType === "careers"
    ? `Gala CRE agent application: ${parsed.data.payload.name}`
    : `Gala CRE investor sourcing inquiry: ${parsed.data.payload.name}`;

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.payload.email,
        subject,
        text: email.text,
        html: `<h1>${escapeHtml(parsed.data.inquiryType)}</h1><table>${email.rows}</table>`,
      }),
    });
    if (!emailResponse.ok) {
      response.status(502).json({ error: "Unable to accept this submission right now." });
      return;
    }

    const googleUrl = process.env.GOOGLE_SYNC_WEBHOOK_URL;
    if (googleUrl) {
      const syncHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.GOOGLE_SYNC_SECRET) syncHeaders.Authorization = `Bearer ${process.env.GOOGLE_SYNC_SECRET}`;
      try {
        await fetch(googleUrl, {
          method: "POST",
          headers: syncHeaders,
          body: JSON.stringify({ ...parsed.data, submittedAt, routing }),
        });
      } catch {
        // Email delivery remains the source of truth when optional synchronization is unavailable.
      }
    }

    response.status(200).json({ ok: true });
  } catch {
    response.status(502).json({ error: "Unable to accept this submission right now." });
  }
}
