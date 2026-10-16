import { createHash } from "node:crypto";

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

const allowedInquiryTypes = new Set([
  "General Inquiry",
  "List or Sell a Property",
  "Landlord Representation",
  "Tenant Representation",
  "Investment Sales",
  "Development Services",
  "Capital Markets",
  "Property Management",
  "Property Inquiry",
  "Commercial Agent Careers",
  "1031 / Replacement Property Search",
]);
const allowedAdvisorIds = new Set(["gaurang-gala", "leigh-roach", "goverdhan-vavilala"]);
const advisorEmailEnvironmentById: Record<string, string> = {
  "gaurang-gala": "ADVISOR_GAURANG_EMAIL",
  "leigh-roach": "ADVISOR_LEIGH_EMAIL",
  "goverdhan-vavilala": "ADVISOR_GOVERDHAN_EMAIL",
};

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getAdvisorRecipient = (advisorId: string) => {
  const environmentName = advisorEmailEnvironmentById[advisorId];
  return environmentName ? asString(process.env[environmentName]) : "";
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const parseBody = (body: unknown): Record<string, unknown> | null => {
  if (typeof body === "string") {
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
  const salt = process.env.FORM_RATE_LIMIT_SALT || process.env.KV_REST_API_TOKEN || "gala-cre-contact";
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
      const result = await fetch(`${restUrl.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${restToken}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", `gala-cre:contact:${key}:${bucket}`],
          ["PEXPIRE", `gala-cre:contact:${key}:${bucket}`, windowMs],
        ]),
      });
      if (result.ok) {
        const response = await result.json() as Array<{ result?: number }>;
        const count = Number(response[0]?.result ?? 0);
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
  const origin = headerValue(request, "origin");
  if (!origin) return false;

  if (configured) {
    const allowed = configured.split(",").map((value) => value.trim()).filter(Boolean);
    return allowed.includes(origin);
  }

  const forwardedHost = headerValue(request, "x-forwarded-host").split(",")[0]?.trim();
  const host = forwardedHost || headerValue(request, "host").split(",")[0]?.trim();
  if (!host) return false;

  try {
    const parsedOrigin = new URL(origin);
    const forwardedProto = headerValue(request, "x-forwarded-proto").split(",")[0]?.trim();
    const protocolMatches = !forwardedProto || parsedOrigin.protocol === `${forwardedProto}:`;
    return protocolMatches && parsedOrigin.host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
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
    response.status(400).json({ error: "Invalid request body" });
    return;
  }

  if (asString(body.website)) {
    response.status(200).json({ ok: true });
    return;
  }

  const limit = await checkRateLimit(getClientKey(request));
  if (!limit.allowed) {
    response.setHeader("Retry-After", String(limit.retryAfterSeconds));
    response.status(429).json({ error: "Too many submissions. Please try again later." });
    return;
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const company = asString(body.company);
  const inquiryType = asString(body.inquiryType);
  const message = asString(body.message);
  const propertySlug = asString(body.propertySlug);
  const advisorId = asString(body.advisorId);
  const sourcePage = asString(body.sourcePage) || "/contact";
  const emailIsValid = isValidEmail(email);

  if (
    name.length < 2 || name.length > 120 ||
    !emailIsValid || email.length > 254 ||
    !allowedInquiryTypes.has(inquiryType) ||
    message.length < 10 || message.length > 5000 ||
    phone.length > 50 || company.length > 160 || propertySlug.length > 180 ||
    (advisorId && !allowedAdvisorIds.has(advisorId)) || sourcePage.length > 500
  ) {
    response.status(400).json({ error: "Please review the submitted fields." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const defaultRecipient = asString(process.env.CONTACT_TO_EMAIL);
  const from = process.env.CONTACT_FROM_EMAIL;
  const isListingInquiry = inquiryType === "Property Inquiry" && Boolean(propertySlug);
  const directAdvisorRecipient = isListingInquiry && advisorId
    ? getAdvisorRecipient(advisorId)
    : "";
  const recipient = isListingInquiry ? directAdvisorRecipient : defaultRecipient;
  if (!apiKey || !isValidEmail(recipient) || !from) {
    response.status(503).json({ error: "Unable to accept this submission right now." });
    return;
  }

  const fields = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Company", company || "Not provided"],
    ["Inquiry", inquiryType],
    ["Property", propertySlug || "Not specified"],
    ["Requested advisor", advisorId || "Not specified"],
    ["Source", sourcePage],
  ];
  const rows = fields.map(([label, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`).join("");
  const textFields = fields.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: propertySlug
          ? `Gala CRE property inquiry: ${propertySlug}`
          : `Gala CRE inquiry: ${inquiryType}`,
        text: `${textFields}\n\nMessage:\n${message}`,
        html: `<h1>New Gala CRE inquiry</h1><table>${rows}</table><h2>Message</h2><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!resendResponse.ok) {
      response.status(502).json({ error: "Unable to accept this submission right now." });
      return;
    }

    response.status(200).json({ ok: true });
  } catch {
    response.status(502).json({ error: "Unable to accept this submission right now." });
  }
}
