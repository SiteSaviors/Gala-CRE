import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import galaCapitalCapability from "@/assets/gala-capital-capability.webp";
import galaDevelopCapability from "@/assets/gala-develop-capability.webp";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";

export type ServiceSlug =
  | "brokerage"
  | "investment-sales"
  | "development-services"
  | "capital-markets"
  | "property-management";

export type CapabilityIconKey = "building" | "handshake" | "trending-up" | "file-signature";

export type Capability = {
  label: string;
  detail?: string;
  lead?: string;
  included?: string[];
  icon?: CapabilityIconKey;
  /** If set, this capability has its own dedicated page at /services/:slug/:route instead of an in-page section. */
  route?: string;
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  capabilities: Capability[];
  capabilitiesHeadline: string;
  image?: string;
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
    capabilities: [
      {
        label: "Landlord representation",
        lead: "When commercial space sits vacant, it costs you every day it's empty. We manage the full leasing process on your behalf — from positioning the space to closing the lease — so you can stay focused on ownership, not marketing.",
        included: [
          "Space positioning and marketing strategy",
          "Tenant prospect qualification and tours",
          "Lease negotiation and deal structuring",
          "Coordination through lease execution",
        ],
        icon: "building",
        route: "landlord-representation",
      },
      {
        label: "Tenant representation",
        lead: "Finding and securing the right space is a business decision, not just a real estate transaction. We represent your interests exclusively — evaluating options, negotiating terms, and advocating for you through the entire process.",
        included: [
          "Site selection and market evaluation",
          "Financial and lease term comparison",
          "Negotiation on your behalf, not the landlord's",
          "Guidance through move-in and occupancy",
        ],
        icon: "handshake",
        route: "tenant-representation",
      },
      {
        label: "Market positioning",
        lead: "A space priced or presented incorrectly sits empty. We evaluate comparable properties, current demand, and market conditions to position your property competitively from day one.",
        included: [
          "Comparable market analysis",
          "Pricing and terms strategy",
          "Marketing material and positioning",
          "Ongoing adjustment as market conditions shift",
        ],
        icon: "trending-up",
      },
      {
        label: "Lease strategy and negotiation",
        lead: "Lease terms shape how your business operates for years. We structure and negotiate terms, renewal options, and concessions around what actually matters to your operation.",
        included: [
          "Lease term and structure guidance",
          "Renewal option strategy",
          "Concession and allowance negotiation",
          "Risk and liability review coordination",
        ],
        icon: "file-signature",
      },
    ],
    capabilitiesHeadline: "Representation shaped around how space actually gets used.",
    image: galaBrokerCapability,
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
    capabilities: [
      {
        label: "Industrial",
        detail: "Warehouse, distribution, and flex-industrial dispositions and acquisitions across the Triangle's logistics corridors.",
      },
      {
        label: "Multifamily",
        detail: "Apartment and multifamily investment sales, from garden-style communities to mixed-use residential assets.",
      },
      {
        label: "Retail",
        detail: "Single-tenant, shopping center, and mixed-use retail dispositions and acquisitions for owners and private investors.",
      },
      {
        label: "Office",
        detail: "Office building sales and acquisitions across single-tenant, multi-tenant, and medical office assets.",
      },
      {
        label: "Land",
        detail: "Raw and entitled land dispositions and acquisitions for development, investment, and owner-user opportunities.",
      },
    ],
    capabilitiesHeadline: "Positioned, priced, and marketed for real buyer demand.",
    image: galaSalesCapability,
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
    capabilities: [
      {
        label: "Feasibility and site strategy",
        detail: "Early-stage evaluation of a site's development potential, including use, density, and market fit.",
      },
      {
        label: "Entitlements",
        detail: "Coordination through zoning, permitting, and approval processes required to move a site toward development readiness.",
      },
      {
        label: "Infrastructure coordination",
        detail: "Alignment of utility, access, and site infrastructure requirements with civil engineers and municipal stakeholders.",
      },
      {
        label: "Project oversight",
        detail: "Ongoing coordination across the development team to keep a project on schedule and aligned with its original strategy.",
      },
    ],
    capabilitiesHeadline: "From feasibility to execution, without the guesswork.",
    image: galaDevelopCapability,
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
    capabilities: [
      {
        label: "Debt placement support",
        detail: "Coordination with lending relationships to help structure financing aligned with a project's timeline and risk profile.",
      },
      {
        label: "Equity introductions",
        detail: "Connections to equity sources for clients seeking partners or additional capital for a commercial opportunity.",
      },
      {
        label: "Capital strategy",
        detail: "Guidance on how to sequence and structure debt and equity across a transaction's lifecycle.",
      },
      {
        label: "Transaction coordination",
        detail: "Coordination between capital sources, ownership, and other transaction parties from term sheet through closing.",
      },
    ],
    capabilitiesHeadline: "Capital structured around the realities of your deal.",
    image: galaCapitalCapability,
    audience: "Owners, investors, developers, and sponsors",
    approvalStatus: "draft",
  },
  {
    slug: "property-management",
    name: "Property Management Partnership",
    eyebrow: "Partner-Led Operations Support",
    summary: "A partner-led pathway focused on property performance and a more coordinated ownership experience.",
    description:
      "Gala CRE Group connects commercial property owners with coordinated, partner-led management support designed to protect the continuity between a transaction and day-to-day operations.",
    capabilities: [
      { label: "Property management partner coordination", detail: "A connected handoff to operational support aligned with the property and ownership plan." },
      { label: "Ownership continuity", detail: "Communication that keeps brokerage decisions, property priorities, and ongoing operations connected." },
    ],
    capabilitiesHeadline: "A coordinated path from transaction to operations.",
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

export const findCapabilityByRoute = (slug: string, route: string) => {
  const service = serviceBySlug[slug as ServiceSlug];
  const capability = service?.capabilities.find((item) => item.route === route);
  return service && capability ? { service, capability } : undefined;
};

export const assetTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land"] as const;
