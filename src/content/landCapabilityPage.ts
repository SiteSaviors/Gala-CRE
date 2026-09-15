import landInfrastructureContext from "@/assets/land-infrastructure-context.webp";
import landInvestmentSales from "@/assets/land-investment-sales.webp";
import type { CapabilityPageContent } from "@/content/capabilityPages";

export const landCapabilityPage: CapabilityPageContent = {
  path: "/services/investment-sales/land",
  compact: true,
  metadata: {
    title: "Land Investment Sales",
    description:
      "Commercial land sale advisory connecting use, entitlement position, access, utilities, physical constraints, buyer fit, diligence, and transaction execution.",
    image: landInvestmentSales,
  },
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  hero: {
    eyebrow: "Investment Sales · Land",
    title: "Land Investment Sales",
    lead:
      "Position the site around what a qualified buyer can verify, approve, finance, and execute—not acreage alone.",
    media: {
      src: landInvestmentSales,
      alt: "Generic aerial view of a commercial land parcel near regional roads and surrounding development",
      position: "center 55%",
    },
    actions: [
      {
        label: "Discuss a Land Opportunity",
        href: "/contact?inquiry=investment-sales&focus=land",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Land sale advisory stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Land Value Story",
      headline: "Potential only matters when the path to use is credible.",
      introduction:
        "Gala separates the site's verified position from proposed outcomes, organizes the available record, and brings the opportunity to buyers whose use, experience, capital, and timeline fit the work ahead.",
      media: {
        src: landInfrastructureContext,
        alt: "Generic commercial land site shown with road access, nearby infrastructure, and surrounding development",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Use + Approvals",
          title: "Define what is allowed, proposed, and unresolved.",
          body: "Zoning, adopted plans, entitlements, conditions, and remaining approvals establish the distance between the site today and a buyer's intended program.",
          points: [],
        },
        {
          number: "02",
          label: "Access + Infrastructure",
          title: "Make the execution dependencies visible.",
          body: "Frontage, access control, utilities, stormwater, grading, environmental conditions, and off-site obligations shape feasibility, timing, and cost.",
          points: [],
        },
        {
          number: "03",
          label: "Buyer Fit + Timing",
          title: "Reach the groups equipped for the actual site.",
          body: "Owner-users, builders, developers, and land investors value the same acreage through different programs, approval paths, capital requirements, and hold periods.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "land-sale-process",
      eyebrow: "The Land Sale Process",
      headline: "Organize the record before buyers price the unknowns.",
      introduction: "Build the market process around verified site information, buyer fit, information access, and transaction certainty.",
      steps: [
        {
          number: "01",
          title: "Verify",
          body: "Assemble the parcel, survey, title, zoning, approval, access, utility, environmental, and physical information available.",
        },
        {
          number: "02",
          title: "Position",
          body: "Frame the current land position, credible use paths, material constraints, pricing context, and likely buyer groups.",
        },
        {
          number: "03",
          title: "Reach",
          body: "Target relevant developers, investors, builders, and owner-users through a clear, organized diligence path.",
        },
        {
          number: "04",
          title: "Execute",
          body: "Compare price, contingencies, approval periods, deposits, financing, extension rights, and closing certainty.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "A land offering built for real underwriting.",
      introduction:
        "Gala coordinates the sale narrative and buyer process while survey, engineering, environmental, legal, tax, and entitlement conclusions remain with qualified specialists and governing authorities.",
      items: [
        {
          icon: "positioning",
          title: "Site Record + Positioning",
          body: "Parcels, acreage, zoning, plans, approvals, access, utilities, physical conditions, pricing context, and unresolved items organized clearly.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A focused property story, imagery, site facts, approval context, and document pathway that distinguishes records from concepts.",
        },
        {
          icon: "prospects",
          title: "Buyer Outreach + Access",
          body: "Direct engagement, qualification, site access, specialist questions, and feedback across the buyer groups best equipped for the opportunity.",
        },
        {
          icon: "execution",
          title: "Offers + Diligence",
          body: "Side-by-side offer review and milestone communication through inspections, approvals, financing, title, and closing.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
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
        body: "Sale advisory for retail property where leases, access, site utility, and future use all shape value.",
        href: "/services/investment-sales/retail",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Site",
    headline: "Let’s clarify what the land can credibly offer the market.",
    body:
      "Share the address, parcel information, current use or approval position, ownership objective, and timing. Gala will begin with the questions qualified buyers are likely to test first.",
    actions: [
      {
        label: "Discuss a Land Opportunity",
        href: "/contact?inquiry=investment-sales&focus=land",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};
