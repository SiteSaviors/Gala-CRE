import { describe, expect, it } from "vitest";
import { confirmedExchangeStatus, getExchangeTimelineIssues } from "@/lib/exchangeTimeline";

const timeline = (overrides: Partial<Parameters<typeof getExchangeTimelineIssues>[0]> = {}) => ({
  exchangeStatus: confirmedExchangeStatus,
  relinquishedClosingDate: "2026-09-01",
  identificationDeadline: "2026-10-16",
  completionDeadline: "2027-02-28",
  ...overrides,
});

describe("1031 exchange timeline validation", () => {
  it("accepts a complete chronological timeline", () => {
    expect(getExchangeTimelineIssues(timeline())).toEqual([]);
  });

  it("requires all dates for a confirmed 1031 exchange", () => {
    expect(getExchangeTimelineIssues(timeline({ identificationDeadline: "" }))).toEqual([
      { field: "identificationDeadline", message: "Enter the identification deadline." },
    ]);
  });

  it("rejects invalid calendar dates even when the acquisition is not confirmed as an exchange", () => {
    expect(getExchangeTimelineIssues(timeline({
      exchangeStatus: "Not sure yet",
      relinquishedClosingDate: "2026-02-30",
    }))).toEqual([
      { field: "relinquishedClosingDate", message: "Enter a valid calendar date." },
    ]);
  });

  it("rejects deadlines that move backward", () => {
    expect(getExchangeTimelineIssues(timeline({
      identificationDeadline: "2026-08-31",
      completionDeadline: "2026-08-30",
    }))).toEqual([
      {
        field: "identificationDeadline",
        message: "The identification deadline cannot be before the relinquished-property closing date.",
      },
      {
        field: "completionDeadline",
        message: "The exchange-completion deadline cannot be before the identification deadline.",
      },
    ]);
  });
});
