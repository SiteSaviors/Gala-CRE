export type ExchangeTimelineField = "identificationDeadline";

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
  const value = values.identificationDeadline.trim();

  if (!value) {
    if (required) issues.push({ field: "identificationDeadline", message: "Enter the identification deadline." });
    return issues;
  }

  if (parseIsoCalendarDate(value) === null) {
    issues.push({ field: "identificationDeadline", message: "Enter a valid calendar date." });
  }

  return issues;
};
