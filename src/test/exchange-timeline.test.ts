import { describe, expect, it } from "vitest";
import { confirmedExchangeStatus, getExchangeTimelineIssues } from "@/lib/exchangeTimeline";

const timeline = (overrides: Partial<Parameters<typeof getExchangeTimelineIssues>[0]> = {}) => ({
  exchangeStatus: confirmedExchangeStatus,
  identificationDeadline: "2026-10-16",
  ...overrides,
});

describe("1031 exchange timeline validation", () => {
  it("accepts a confirmed identification deadline", () => {
    expect(getExchangeTimelineIssues(timeline())).toEqual([]);
  });

  it("requires the identification deadline for a confirmed 1031 exchange", () => {
    expect(getExchangeTimelineIssues(timeline({ identificationDeadline: "" }))).toEqual([
      { field: "identificationDeadline", message: "Enter the identification deadline." },
    ]);
  });

  it("does not require a deadline for a direct acquisition", () => {
    expect(getExchangeTimelineIssues(timeline({
      exchangeStatus: "No — this is a direct acquisition",
      identificationDeadline: "",
    }))).toEqual([]);
  });

  it("rejects an invalid supplied calendar date", () => {
    expect(getExchangeTimelineIssues(timeline({ identificationDeadline: "2026-02-30" }))).toEqual([
      { field: "identificationDeadline", message: "Enter a valid calendar date." },
    ]);
  });
});
