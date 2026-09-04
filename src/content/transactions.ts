export type Transaction = {
  id: string;
  status: "Closed" | "Under Contract";
  headline: string;
  location: string;
  priceDisplay: string;
  priceLabel: string;
  summary: string;
};

// Add only client-confirmed transactions with a verified price and location.
export const transactions: Transaction[] = [
  {
    id: "chapel-hill-road",
    status: "Closed",
    headline: "10414 & 10416 Chapel Hill Road",
    location: "Morrisville, NC",
    priceDisplay: "$1.8M",
    priceLabel: "Combined Sale Price",
    summary: "10414 and 10416 Chapel Hill Road completed as a combined $1.8 million transaction in Morrisville.",
  },
];

export const featuredTransaction = transactions[0];
