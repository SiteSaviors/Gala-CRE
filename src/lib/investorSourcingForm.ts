import type {
  exchangeStatusOptions,
  financingStatusOptions,
  intermediaryStatusOptions,
  marketInterestOptions,
  responseMethodOptions,
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
  relinquishedClosingDate: string;
  identificationDeadline: string;
  completionDeadline: string;
  targetLocations: string;
  assetTypes: string[];
  purchasePriceMin: string;
  purchasePriceMax: string;
  availableEquity: string;
  financingStatus: (typeof financingStatusOptions)[number];
  occupancyAndTenantProfile: string;
  returnAndRiskCriteria: string;
  marketInterest: (typeof marketInterestOptions)[number];
  propertiesUnderConsideration: string;
  intermediaryStatus: (typeof intermediaryStatusOptions)[number];
  additionalRequirements: string;
  preferredResponseMethod: (typeof responseMethodOptions)[number];
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
