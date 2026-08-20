import type { InquiryType } from "@/content/contact";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: InquiryType;
  message: string;
  propertySlug: string;
  website: string;
};

export type ContactSubmissionPayload = ContactFormValues & {
  sourcePage: string;
  submittedAt: string;
};

export const buildContactSubmissionPayload = (
  values: ContactFormValues,
  sourcePage = "/contact"
): ContactSubmissionPayload => ({ ...values, sourcePage, submittedAt: new Date().toISOString() });

export const submitContactForm = async (values: ContactFormValues, sourcePage = "/contact") => {
  const payload = buildContactSubmissionPayload(values, sourcePage);
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/contact";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Contact form request failed");
  return { payload };
};
