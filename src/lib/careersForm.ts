import type { careerStages } from "@/content/careers";
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
  careerStage: (typeof careerStages)[number];
  specialties: string;
  experienceAndGoals: string;
  profileUrl: string;
  consent: boolean;
  website: string;
};

export const buildAgentApplicationPayload = (
  values: AgentApplicationValues,
  sourcePage = "/careers",
  startedAt = new Date().toISOString(),
) => buildStructuredFormSubmission(
  "careers",
  "Commercial Listing Agent Inquiry",
  values,
  sourcePage,
  startedAt,
);

export const submitAgentApplication = async (
  values: AgentApplicationValues,
  sourcePage = "/careers",
  startedAt = new Date().toISOString(),
) => submitStructuredForm(buildAgentApplicationPayload(values, sourcePage, startedAt));
