type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

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
]);

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

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

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Allow", "POST");
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
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

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const company = asString(body.company);
  const inquiryType = asString(body.inquiryType);
  const message = asString(body.message);
  const propertySlug = asString(body.propertySlug);
  const sourcePage = asString(body.sourcePage) || "/contact";
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (
    name.length < 2 || name.length > 120 ||
    !emailIsValid || email.length > 254 ||
    !allowedInquiryTypes.has(inquiryType) ||
    message.length < 10 || message.length > 5000 ||
    phone.length > 50 || company.length > 160 || propertySlug.length > 180 || sourcePage.length > 500
  ) {
    response.status(400).json({ error: "Please review the submitted fields." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    response.status(503).json({ error: "Contact delivery is not configured." });
    return;
  }

  const fields = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Company", company || "Not provided"],
    ["Inquiry", inquiryType],
    ["Property", propertySlug || "Not specified"],
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
        to: [to],
        reply_to: email,
        subject: `Gala CRE inquiry: ${inquiryType}`,
        text: `${textFields}\n\nMessage:\n${message}`,
        html: `<h1>New Gala CRE inquiry</h1><table>${rows}</table><h2>Message</h2><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!resendResponse.ok) {
      response.status(502).json({ error: "Email delivery failed." });
      return;
    }

    response.status(200).json({ ok: true });
  } catch {
    response.status(502).json({ error: "Email delivery failed." });
  }
}
