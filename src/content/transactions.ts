export type Transaction = {
  id: string;
  status: "Closed" | "Under Contract";
  headline: string;
  location: string;
  metricDisplay: string;
  metricLabel: string;
  summary: string;
};

// Add only client-confirmed transactions. Keep economics unpublished until the
// closing consideration is confirmed for public use.
export const transactions: Transaction[] = [
  {
    id: "chapel-hill-road",
    status: "Closed",
    headline: "10414 & 10416 Chapel Hill Road",
    location: "Morrisville, NC",
    metricDisplay: "Closed",
    metricLabel: "Transaction Status",
    summary: "10414 and 10416 Chapel Hill Road completed as a combined transaction in Morrisville.",
  },
];

export const featuredTransaction = transactions[0];
