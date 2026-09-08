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

export const marketInterestOptions = [
  "On-market and off-market",
  "On-market opportunities",
  "Off-market opportunities",
] as const;

export const intermediaryStatusOptions = [
  "Qualified intermediary engaged",
  "Selecting a qualified intermediary",
  "Not yet engaged",
  "Not applicable",
] as const;

export const responseMethodOptions = ["Phone", "Email", "Text message"] as const;

export const sourcingProcess = [
  {
    number: "01",
    title: "Establish the clock",
    body: "Organize the relinquished-property closing date, identification deadline, completion deadline, and qualified-intermediary status.",
  },
  {
    number: "02",
    title: "Define the buy box",
    body: "Clarify target markets, asset types, pricing, equity, debt readiness, occupancy preferences, and acceptable risk.",
  },
  {
    number: "03",
    title: "Screen the field",
    body: "Compare potential properties against the acquisition brief before investing time in deeper underwriting and diligence.",
  },
  {
    number: "04",
    title: "Coordinate next steps",
    body: "Keep brokerage, financing, diligence, legal, tax, and intermediary conversations aligned around the investor’s decision path.",
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
    body: "Exchange dates, intermediary readiness, on- or off-market preferences, diligence needs, and closing constraints.",
  },
] as const;

export const readinessGuidance = [
  "Confirm exchange dates with your qualified intermediary and advisors.",
  "Separate required acquisition criteria from preferences.",
  "Document available equity and the current financing path.",
  "Identify decision-makers and diligence requirements before touring.",
] as const;
