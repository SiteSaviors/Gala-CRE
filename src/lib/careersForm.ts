import type { experienceRanges, transactionVolumeRanges } from "@/content/careers";
import {
  buildStructuredFormSubmission,
  submitStructuredForm,
} from "@/lib/formSubmission";

export type AgentApplicationValues = {
  name: string;
  email: string;
  phone: string;
  currentBrokerage: string;
  cityAndMarkets: string;
  licenseState: string;
  licenseNumber: string;
  yearsExperience: (typeof experienceRanges)[number];
  specialties: string[];
  salesLeasingExperience: string;
  transactionVolume: (typeof transactionVolumeRanges)[number];
  representativeTransactions: string;
  existingPipeline: string;
  profileUrl: string;
  whyGala: string;
  consent: boolean;
  website: string;
};

export const buildAgentApplicationPayload = (
  values: AgentApplicationValues,
  sourcePage = "/careers",
  startedAt = new Date().toISOString(),
) => buildStructuredFormSubmission(
  "careers",
  "Commercial Agent Application",
  values,
  sourcePage,
  startedAt,
);

export const submitAgentApplication = async (
  values: AgentApplicationValues,
  sourcePage = "/careers",
  startedAt = new Date().toISOString(),
) => submitStructuredForm(buildAgentApplicationPayload(values, sourcePage, startedAt));
