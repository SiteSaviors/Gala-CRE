export const exchangeStatusOptions = [
  "Yes — this is a 1031 exchange",
  "No — this is a direct acquisition",
  "Not sure yet",
] as const;

export const investorAssetTypes = [
  "Industrial",
  "Multifamily",
  "Retail",
  "Office",
  "Land",
  "Mixed use",
  "Special purpose",
] as const;

export const financingStatusOptions = [
  "Cash acquisition",
  "Financing approved",
  "Lender engaged",
  "Financing not started",
  "Evaluating capital structure",
] as const;

export const sourcingProcess = [
  {
    number: "01",
    title: "Confirm the timeline",
    body: "Document the dates supplied by the investor and their advisors.",
  },
  {
    number: "02",
    title: "Define the criteria",
    body: "Establish markets, property types, pricing, occupancy, capital, and risk parameters.",
  },
  {
    number: "03",
    title: "Screen opportunities",
    body: "Compare potential properties against the acquisition brief.",
  },
  {
    number: "04",
    title: "Advance the right fit",
    body: "Coordinate tours, property conversations, diligence, financing, and negotiation.",
  },
] as const;

export const acquisitionCriteria = [
  {
    title: "Property fit",
    body: "Location, asset class, occupancy, tenant profile, physical condition, and operational requirements.",
  },
  {
    title: "Investment fit",
    body: "Purchase-price range, available equity, financing position, income expectations, and risk tolerance.",
  },
  {
    title: "Execution fit",
    body: "Timing, advisor coordination, diligence needs, decision-makers, and closing constraints.",
  },
] as const;
