export const inquiryTypes = [
  "General Inquiry",
  "List or Sell a Property",
  "Landlord Representation",
  "Tenant Representation",
  "Investment Sales",
  "Development Services",
  "Capital Markets",
  "Property Management",
  "Property Inquiry",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const contactHero = {
  eyebrow: "Talk to an Advisor",
  title: "Start with a clear conversation.",
  body: "Tell us what you are evaluating, what outcome matters, and where you are in the process. A Gala CRE advisor will follow up with the right next step.",
};

export const contactDetails = [
  { id: "market", label: "Primary Market", value: "Raleigh-Durham and the Research Triangle" },
  { id: "response", label: "What to Expect", value: "A direct follow-up from the commercial team" },
] as const;

export const contactFormConfig = {
  title: "How can we help?",
  description: "Share a few details so we can route your inquiry to the right commercial advisor.",
  submitLabel: "Send Inquiry",
  resetLabel: "Send another inquiry",
  successTitle: "Inquiry received",
  successBody: "Thank you. A Gala CRE advisor will review your message and follow up directly.",
  errorBody: "We couldn’t send your message right now. Please try again in a moment.",
};
