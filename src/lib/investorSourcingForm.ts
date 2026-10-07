import type {
  exchangeStatusOptions,
  financingStatusOptions,
} from "@/content/investorSourcing";
import {
  buildStructuredFormSubmission,
  submitStructuredForm,
} from "@/lib/formSubmission";
export { getInvestorInquiryPriority } from "@/lib/inquiryPriority";

export type InvestorInquiryValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  exchangeStatus: (typeof exchangeStatusOptions)[number];
  identificationDeadline: string;
  targetLocations: string;
  assetTypes: string[];
  purchasePriceMin: string;
  purchasePriceMax: string;
  availableEquity: string;
  financingStatus: (typeof financingStatusOptions)[number];
  acquisitionRequirements: string;
  consent: boolean;
  website: string;
};

export const buildInvestorInquiryPayload = (
  values: InvestorInquiryValues,
  sourcePage = "/investors/1031-exchange",
  startedAt = new Date().toISOString(),
) => buildStructuredFormSubmission(
  "investor-sourcing",
  "1031 and Investor Property Sourcing",
  values,
  sourcePage,
  startedAt,
);

export const submitInvestorInquiry = async (
  values: InvestorInquiryValues,
  sourcePage = "/investors/1031-exchange",
  startedAt = new Date().toISOString(),
) => submitStructuredForm(buildInvestorInquiryPayload(values, sourcePage, startedAt));
