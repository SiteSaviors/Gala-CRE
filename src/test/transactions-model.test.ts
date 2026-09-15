import { describe, expect, it } from "vitest";
import { propertyBySlug } from "@/content/properties";
import {
  publishedTrackRecordMetrics,
  trackRecordMetrics,
  transactionCandidates,
  transactions,
} from "@/content/transactions";

describe("transaction source of truth", () => {
  it("derives every publishable transaction from a closed property record", () => {
    expect(transactions.map((transaction) => transaction.propertySlug)).toEqual([
      "10416-chapel-hill-road",
      "802-bragg-boulevard",
      "202-north-main-street",
    ]);

    transactions.forEach((transaction) => {
      expect(propertyBySlug[transaction.propertySlug]?.status).toBe("Closed");
      expect(transaction.detailPath).toBe(`/properties/${transaction.propertySlug}`);
      expect(transaction.publishablePrice).toBeNull();
    });
  });

  it("records only approved homepage photography", () => {
    expect(transactions.find(({ id }) => id === "802-bragg-boulevard")?.approvedPhotography).not.toBeNull();
    expect(transactions.find(({ id }) => id === "10416-chapel-hill-road")?.approvedPhotography).toBeNull();
    expect(transactions.find(({ id }) => id === "202-north-main-street")?.approvedPhotography).toBeNull();
  });

  it("keeps the unresolved Watkins proposal out of publishable transactions", () => {
    expect(transactions.some(({ id }) => id === "watkins")).toBe(false);
    expect(transactionCandidates).toContainEqual(expect.objectContaining({
      id: "watkins",
      status: null,
      publicationStatus: "Blocked",
      detailPath: null,
    }));
  });

  it("publishes no track-record metrics until values and scopes are confirmed", () => {
    expect(trackRecordMetrics).toHaveLength(4);
    expect(trackRecordMetrics.every(({ value, reportingPeriod }) => value === null && reportingPeriod === null)).toBe(true);
    expect(publishedTrackRecordMetrics).toEqual([]);
  });
});
