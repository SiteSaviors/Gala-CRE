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
  brandName: string;
  homepageSummary?: string;
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
    brandName: "GalaBroker",
    homepageSummary: "Commercial leasing and occupancy representation.",
    eyebrow: "Landlord + Tenant Representation",
    summary: "Commercial representation grounded in clear advice, local knowledge, and disciplined execution.",
    description:
      "Gala CRE Group helps owners position and lease commercial space while helping occupiers evaluate locations, negotiate terms, and move forward with confidence.",
    capabilities: [
      {
        label: "Landlord Representation",
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
        label: "Tenant Representation",
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
    brandName: "GalaSales",
    homepageSummary: "Commercial property acquisitions, dispositions, and marketing.",
    eyebrow: "Private Capital + Commercial Assets",
    summary: "Sale advisory for commercial owners and private investors across the primary asset classes.",
    description:
      "We simplify the disposition and acquisition process with focused positioning, practical underwriting insight, and a transaction strategy shaped around each client’s objectives.",
    capabilities: [
      {
        label: "Industrial",
        route: "industrial",
        lead: "Industrial transactions depend on functional real estate, credible operating assumptions, and a buyer story grounded in how the asset actually performs.",
        included: [
          "Warehouse, distribution, and flex-industrial positioning",
          "Occupancy, access, loading, and physical-asset review",
          "Buyer outreach and transaction coordination",
        ],
      },
      {
        label: "Multifamily",
        route: "multifamily",
        lead: "Multifamily sale strategy connects operating performance, location, physical condition, and the buyer's view of durable income and execution risk.",
        included: [
          "Operating and rent-roll positioning",
          "Comparable-sales and buyer-demand context",
          "Marketing, diligence, and closing coordination",
        ],
      },
      {
        label: "Retail",
        route: "retail",
        lead: "Retail value is shaped by tenancy, trade area, access, visibility, lease structure, and the property's ability to support its current or next use.",
        included: [
          "Single-tenant, shopping-center, and mixed-use retail",
          "Lease, tenancy, access, and site-position review",
          "Buyer targeting and transaction execution",
        ],
      },
      {
        label: "Office",
        route: "office",
        lead: "Office transactions require a clear view of tenancy, rollover, space quality, location, and the capital needed to compete for users and buyers.",
        included: [
          "Single-tenant, multi-tenant, and medical-office assets",
          "Lease rollover, occupancy, and capital-needs context",
          "Positioning, buyer outreach, and diligence coordination",
        ],
      },
      {
        label: "Land",
        route: "land",
        lead: "Land is evaluated through the lens of use, entitlement, access, utilities, timing, and the buyer pool capable of carrying the site through execution.",
        included: [
          "Raw, entitled, and owner-user land opportunities",
          "Use, entitlement, access, and utility positioning",
          "Developer and investor outreach with diligence coordination",
        ],
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
    brandName: "GalaDevelop",
    homepageSummary: "Commercial development planning and execution.",
    eyebrow: "From Site Strategy to Execution",
    summary: "Predevelopment guidance that turns complex land and development questions into a clearer path forward.",
    description:
      "Gala coordinates early-stage strategy and the specialist relationships required to move commercial opportunities from initial evaluation toward execution readiness.",
    capabilities: [
      {
        label: "Site Strategy",
        route: "site-strategy",
        lead: "A development decision starts with whether the site, intended use, market, access, infrastructure, and approval path can support the client's objective.",
        included: [
          "Early use, density, access, and market-fit evaluation",
          "Key constraint and stakeholder identification",
          "A coordinated next-step and diligence roadmap",
        ],
      },
      {
        label: "Entitlements",
        route: "entitlements",
        lead: "Entitlement work aligns the intended program with the jurisdictional process, technical team, public requirements, and decisions needed to advance a site.",
        included: [
          "Zoning and approval-path coordination",
          "Consultant, municipality, and stakeholder alignment",
          "Milestone tracking and decision support",
        ],
      },
      {
        label: "Infrastructure",
        route: "infrastructure",
        lead: "Access, utilities, stormwater, and off-site requirements can determine whether a commercial plan is feasible, financeable, and ready to execute.",
        included: [
          "Utility, access, and site-infrastructure coordination",
          "Civil, municipal, and provider alignment",
          "Dependency, timing, and responsibility tracking",
        ],
      },
      {
        label: "Development Oversight",
        route: "development-oversight",
        lead: "Development oversight keeps ownership decisions, consultants, approvals, schedule, and transaction priorities connected as the project advances.",
        included: [
          "Cross-team milestone and decision coordination",
          "Schedule, risk, and open-item visibility",
          "Ownership reporting through key development stages",
        ],
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
    brandName: "GalaCapital",
    homepageSummary: "Debt and equity sourcing for commercial opportunities.",
    eyebrow: "Debt + Equity Access",
    summary: "Capital guidance designed to align financing strategy with the realities of the opportunity.",
    description:
      "We help clients organize their capital needs, evaluate alternatives, and connect with relevant debt and equity relationships for commercial real estate transactions.",
    capabilities: [
      {
        label: "Debt",
        route: "debt",
        lead: "Debt strategy begins with the asset, sponsorship, business plan, timing, and repayment profile—not a one-size-fits-all lender list.",
        included: [
          "Financing requirement and lender-fit organization",
          "Debt-source outreach and term comparison support",
          "Coordination from lender engagement through closing",
        ],
      },
      {
        label: "Equity",
        route: "equity",
        lead: "Equity conversations require a clear investment case, aligned expectations, and relevant relationships for the opportunity's scale and risk profile.",
        included: [
          "Investment-case and capital-need organization",
          "Relevant equity relationship introductions",
          "Process coordination around fit, structure, and timing",
        ],
      },
      {
        label: "Capital Strategy",
        route: "capital-strategy",
        lead: "Capital strategy connects debt, equity, timing, risk, and ownership objectives before individual terms are evaluated in isolation.",
        included: [
          "Capital-stack and sequencing guidance",
          "Debt and equity alternative comparison",
          "Funding-milestone and execution planning",
        ],
      },
      {
        label: "Transaction Coordination",
        route: "transaction-coordination",
        lead: "Capital execution depends on organized information, accountable milestones, and communication across ownership, capital sources, advisors, and closing parties.",
        included: [
          "Term-sheet and diligence milestone coordination",
          "Information-flow and open-item management",
          "Closing-path communication across transaction parties",
        ],
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
    brandName: "Property Management",
    eyebrow: "Partner-Led Operations Support",
    summary: "A partner-led pathway focused on property performance and a more coordinated ownership experience.",
    description:
      "Gala CRE Group connects commercial property owners with coordinated, partner-led management support designed to protect the continuity between a transaction and day-to-day operations.",
    capabilities: [
      {
        label: "Property Management Partnership",
        route: "property-management-partnership",
        lead: "Gala coordinates a partner-led path to day-to-day property operations while keeping the ownership plan and brokerage context connected.",
        included: [
          "Property and ownership-priority handoff",
          "Partner introduction and scope coordination",
          "Continuity between transactions and ongoing operations",
        ],
      },
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

export type AdvertisedCapabilityRoute = {
  label: string;
  serviceName: string;
  serviceSlug: ServiceSlug;
  capabilityRoute: string;
  path: string;
};

export const advertisedCapabilityRoutes: AdvertisedCapabilityRoute[] = services.flatMap((service) =>
  service.capabilities
    .filter((capability): capability is Capability & { route: string } => Boolean(capability.route))
    .map((capability) => ({
      label: capability.label,
      serviceName: service.name,
      serviceSlug: service.slug,
      capabilityRoute: capability.route,
      path: `/services/${service.slug}/${capability.route}`,
    })),
);

export type ServiceNavigationGroup = {
  name: string;
  serviceName: string;
  serviceSlug: ServiceSlug;
  href: string;
  summary: string;
  image?: string;
  capabilities: AdvertisedCapabilityRoute[];
};

export const serviceNavigationGroups: ServiceNavigationGroup[] = services.map((service) => ({
  name: service.brandName,
  serviceName: service.name,
  serviceSlug: service.slug,
  href: `/services/${service.slug}`,
  summary: service.homepageSummary ?? service.summary,
  image: service.image,
  capabilities: advertisedCapabilityRoutes.filter((capability) => capability.serviceSlug === service.slug),
}));

export const assetTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land"] as const;
