import landInvestmentSales from "@/assets/land-investment-sales.webp";
import { buildCapabilityPage } from "@/content/capabilityPageBlueprint";

export const landCapabilityPage = buildCapabilityPage({
  path: "/services/investment-sales/land",
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  image: landInvestmentSales,
  metadataDescription:
    "Commercial land sale advisory connecting use, entitlement position, access, utilities, physical constraints, buyer fit, diligence, and transaction execution.",
  hero: {
    eyebrow: "Investment Sales · Land",
    title: "Land Investment Sales",
    lead:
      "Position the site around what a qualified buyer can verify, approve, finance, and execute—not acreage alone.",
    alt: "Generic aerial view of a commercial land parcel near regional roads and surrounding development",
    position: "center 55%",
    primaryLabel: "Discuss a Land Opportunity",
    inquiryHref: "/contact?inquiry=investment-sales&focus=land",
    processLabel: "See the Sale Process",
    processId: "land-sale-process",
    signalLabel: "Land sale advisory stages",
    signals: ["Verify", "Position", "Reach", "Execute"],
  },
  challenge: {
    watermark: "SITE",
    eyebrow: "The Land Value Story",
    headline: "Potential only matters when the path to use is credible.",
    body: [
      "Land buyers underwrite the distance between the site as it exists and the project they intend to deliver. Zoning, approvals, access, utilities, topography, environmental conditions, off-site work, timing, and jurisdictional requirements can materially change that distance.",
      "A disciplined sale process separates verified conditions from proposed outcomes, organizes the available record, and brings the opportunity to buyers whose use, experience, capital, and timeline fit the site.",
    ],
    emphasis:
      "The goal is not to market every possible use. It is to make the most credible buyer paths understandable.",
    pressures: [
      {
        number: "01",
        title: "Use + Approvals",
        body: "Current zoning, adopted plans, entitlements, conditions, and remaining approvals define what is verified versus conceptual.",
      },
      {
        number: "02",
        title: "Access + Infrastructure",
        body: "Frontage, access control, utilities, stormwater, grading, and off-site obligations affect feasibility and cost.",
      },
      {
        number: "03",
        title: "Buyer Fit + Timing",
        body: "Owner-users, builders, developers, and land investors value the same site through different programs and execution horizons.",
      },
    ],
  },
  process: {
    eyebrow: "The Land Sale Process",
    headline: "Organize the record before buyers price the unknowns.",
    introduction:
      "Gala begins with ownership's objective and the controlling site information, then builds a qualified market process around buyer fit, information access, and transaction certainty.",
    steps: [
      {
        number: "01",
        title: "Verify",
        body: "Assemble the parcel, survey, title, zoning, approval, access, utility, environmental, and physical information available for the site.",
      },
      {
        number: "02",
        title: "Position",
        body: "Frame the current land position, credible use paths, material constraints, pricing context, and likely buyer groups without overstating future outcomes.",
      },
      {
        number: "03",
        title: "Reach",
        body: "Launch clear materials, target relevant developers, investors, builders, and owner-users, and manage questions through an organized diligence path.",
      },
      {
        number: "04",
        title: "Execute",
        body: "Compare price, contingencies, approval periods, deposits, financing, extension rights, and closing certainty while coordinating the transaction calendar.",
      },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A land offering built for real underwriting.",
    introduction:
      "Gala coordinates the sale narrative and buyer process while survey, engineering, environmental, legal, tax, and entitlement conclusions remain with qualified specialists and governing authorities.",
    items: [
      {
        icon: "positioning",
        title: "Site Record Organization",
        body: "A working view of parcels, acreage, zoning, plans, approvals, access, utilities, physical conditions, and unresolved diligence items.",
      },
      {
        icon: "economics",
        title: "Pricing + Buyer Strategy",
        body: "Pricing context and buyer segmentation aligned with the site's verified position, credible uses, timing, and execution burden.",
      },
      {
        icon: "marketing",
        title: "Offering Materials",
        body: "A focused property story, imagery, site facts, approval context, and document pathway that distinguishes records from concepts.",
      },
      {
        icon: "prospects",
        title: "Targeted Market Outreach",
        body: "Direct and broker engagement with the buyer groups most capable of evaluating and carrying the opportunity forward.",
      },
      {
        icon: "tours",
        title: "Site Access + Feedback",
        body: "Coordinated property access, inquiry qualification, specialist questions, and market feedback throughout the campaign.",
      },
      {
        icon: "execution",
        title: "Offer + Diligence Coordination",
        body: "Side-by-side offer review and milestone communication through inspections, approvals, financing, title, and closing.",
      },
    ],
  },
  related: {
    headline: "Land decisions connect across the Gala platform.",
    introduction:
      "When value depends on planning, infrastructure, or capital, Gala can connect the sale conversation to the next commercial decision without blurring specialist responsibilities.",
    links: [
      {
        label: "Development",
        title: "Site Strategy",
        body: "Clarify intended use, constraints, stakeholders, and the most useful next diligence steps before committing to a path.",
        href: "/services/development-services/site-strategy",
      },
      {
        label: "Development",
        title: "Entitlements",
        body: "Coordinate the approval path, consultant team, jurisdictional milestones, and ownership decisions required to advance a site.",
        href: "/services/development-services/entitlements",
      },
      {
        label: "Capital Markets",
        title: "Capital Strategy",
        body: "Organize debt, equity, timing, and funding dependencies around the opportunity's actual execution plan.",
        href: "/services/capital-markets/capital-strategy",
      },
      {
        label: "Investment Sales",
        title: "Retail",
        body: "Sale advisory for income, owner-user, or redevelopment-oriented retail properties where leases and site utility both matter.",
        href: "/services/investment-sales/retail",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Site",
    headline: "Let’s clarify what the land can credibly offer the market.",
    body:
      "Share the address, parcel information, current use or approval position, ownership objective, and timing. Gala will begin with the questions qualified buyers are likely to test first.",
  },
});
