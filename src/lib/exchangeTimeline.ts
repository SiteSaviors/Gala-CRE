export type ExchangeTimelineField =
  | "relinquishedClosingDate"
  | "identificationDeadline"
  | "completionDeadline";

export type ExchangeTimelineValues = Record<ExchangeTimelineField, string> & {
  exchangeStatus: string;
};

export type ExchangeTimelineIssue = {
  field: ExchangeTimelineField;
  message: string;
};

export const confirmedExchangeStatus = "Yes — this is a 1031 exchange";

const parseIsoCalendarDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);

  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) return null;

  return timestamp;
};

export const getExchangeTimelineIssues = (values: ExchangeTimelineValues): ExchangeTimelineIssue[] => {
  const issues: ExchangeTimelineIssue[] = [];
  const required = values.exchangeStatus === confirmedExchangeStatus;
  const fields: Array<[ExchangeTimelineField, string]> = [
    ["relinquishedClosingDate", "Enter the relinquished-property closing date."],
    ["identificationDeadline", "Enter the identification deadline."],
    ["completionDeadline", "Enter the exchange-completion deadline."],
  ];
  const parsed: Partial<Record<ExchangeTimelineField, number>> = {};

  fields.forEach(([field, requiredMessage]) => {
    const value = values[field].trim();
    if (!value) {
      if (required) issues.push({ field, message: requiredMessage });
      return;
    }

    const timestamp = parseIsoCalendarDate(value);
    if (timestamp === null) {
      issues.push({ field, message: "Enter a valid calendar date." });
      return;
    }
    parsed[field] = timestamp;
  });

  const closing = parsed.relinquishedClosingDate;
  const identification = parsed.identificationDeadline;
  const completion = parsed.completionDeadline;

  if (closing !== undefined && identification !== undefined && identification < closing) {
    issues.push({
      field: "identificationDeadline",
      message: "The identification deadline cannot be before the relinquished-property closing date.",
    });
  }
  if (identification !== undefined && completion !== undefined && completion < identification) {
    issues.push({
      field: "completionDeadline",
      message: "The exchange-completion deadline cannot be before the identification deadline.",
    });
  }

  return issues;
};
