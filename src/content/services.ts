export type ServiceSlug =
  | "brokerage"
  | "investment-sales"
  | "development-services"
  | "capital-markets"
  | "property-management";

export type Service = {
  slug: ServiceSlug;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  capabilities: string[];
  audience: string;
  approvalStatus: "draft" | "client-approved";
};

export const services: Service[] = [
  {
    slug: "brokerage",
    name: "Brokerage",
    eyebrow: "Landlord + Tenant Representation",
    summary: "Commercial representation grounded in clear advice, local knowledge, and disciplined execution.",
    description:
      "Gala CRE Group helps owners position and lease commercial space while helping occupiers evaluate locations, negotiate terms, and move forward with confidence.",
    capabilities: ["Landlord representation", "Tenant representation", "Market positioning", "Lease strategy and negotiation"],
    audience: "Property owners, landlords, tenants, and business operators",
    approvalStatus: "draft",
  },
  {
    slug: "investment-sales",
    name: "Investment Sales",
    eyebrow: "Private Capital + Commercial Assets",
    summary: "Sale advisory for commercial owners and private investors across the primary asset classes.",
    description:
      "We simplify the disposition and acquisition process with focused positioning, practical underwriting insight, and a transaction strategy shaped around each client’s objectives.",
    capabilities: ["Industrial", "Multifamily", "Retail", "Office", "Land"],
    audience: "Owners, private investors, buyers, and sellers",
    approvalStatus: "draft",
  },
  {
    slug: "development-services",
    name: "Development Services",
    eyebrow: "From Site Strategy to Execution",
    summary: "Predevelopment guidance that turns complex land and development questions into a clearer path forward.",
    description:
      "Gala coordinates early-stage strategy and the specialist relationships required to move commercial opportunities from initial evaluation toward execution readiness.",
    capabilities: ["Feasibility and site strategy", "Entitlements", "Infrastructure coordination", "Project oversight"],
    audience: "Landowners, developers, investors, and operating businesses",
    approvalStatus: "draft",
  },
  {
    slug: "capital-markets",
    name: "Capital Markets",
    eyebrow: "Debt + Equity Access",
    summary: "Capital guidance designed to align financing strategy with the realities of the opportunity.",
    description:
      "We help clients organize their capital needs, evaluate alternatives, and connect with relevant debt and equity relationships for commercial real estate transactions.",
    capabilities: ["Debt placement support", "Equity introductions", "Capital strategy", "Transaction coordination"],
    audience: "Owners, investors, developers, and sponsors",
    approvalStatus: "draft",
  },
  {
    slug: "property-management",
    name: "Property Management Partnership",
    eyebrow: "Partner-Led Operations Support",
    summary: "A planned partner-led pathway focused on property performance and a more coordinated ownership experience.",
    description:
      "The partner, scope, and delivery structure for Property Management are awaiting client confirmation. Gala CRE Group is not represented here as directly providing this service.",
    capabilities: ["Service scope pending client approval", "Operating model pending client approval"],
    audience: "Commercial property owners",
    approvalStatus: "draft",
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
) as Record<ServiceSlug, Service>;

export const serviceCapabilityId = (capability: string) =>
  capability
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const assetTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land"] as const;
