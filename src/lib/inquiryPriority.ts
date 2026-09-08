export type InvestorInquiryPriority = "immediate" | "high" | "active" | "standard";

const daysUntil = (dateValue: string, now: Date) => {
  if (!dateValue) return null;
  const deadline = new Date(`${dateValue}T23:59:59`);
  if (Number.isNaN(deadline.getTime())) return null;
  return Math.ceil((deadline.getTime() - now.getTime()) / 86_400_000);
};

export const getInvestorInquiryPriority = (
  identificationDeadline: string,
  now = new Date(),
): { priority: InvestorInquiryPriority; daysToIdentificationDeadline: number | null } => {
  const days = daysUntil(identificationDeadline, now);
  if (days === null) return { priority: "standard", daysToIdentificationDeadline: null };
  if (days <= 7) return { priority: "immediate", daysToIdentificationDeadline: days };
  if (days <= 14) return { priority: "high", daysToIdentificationDeadline: days };
  if (days <= 30) return { priority: "active", daysToIdentificationDeadline: days };
  return { priority: "standard", daysToIdentificationDeadline: days };
};
