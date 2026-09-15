import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import galaCapitalCapability from "@/assets/gala-capital-capability.webp";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";
import industrialInteriorOperations from "@/assets/industrial-interior-operations.webp";
import industrialInvestmentSales from "@/assets/industrial-investment-sales.webp";
import multifamilyOperationsContext from "@/assets/multifamily-operations-context.webp";
import multifamilyInvestmentSales from "@/assets/multifamily-investment-sales.webp";
import officeOccupancyContext from "@/assets/office-occupancy-context.webp";
import officeInvestmentSales from "@/assets/office-investment-sales.webp";
import retailAccessContext from "@/assets/retail-access-context.webp";
import retailInvestmentSales from "@/assets/retail-investment-sales.webp";
import {
  capitalCapabilityPages,
  propertyManagementCapabilityPage,
} from "@/content/capitalCapabilityPages";
import { developmentCapabilityPages } from "@/content/developmentCapabilityPages";
import { landCapabilityPage } from "@/content/landCapabilityPage";

export type CapabilityPageIcon =
  | "positioning"
  | "marketing"
  | "prospects"
  | "tours"
  | "economics"
  | "execution";

export type CapabilityPageMedia = {
  src: string;
  alt: string;
  position?: string;
};

export type CapabilityPageAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  icon?: "arrow-up-right" | "arrow-down";
};

export type CapabilityPageSection =
  | {
      type: "challenge";
      id?: string;
      watermark?: string;
      eyebrow: string;
      headline: string;
      body: string[];
      emphasis: string;
      pressures: Array<{ number: string; title: string; body: string }>;
    }
  | {
      type: "process";
      id?: string;
      eyebrow: string;
      headline: string;
      introduction: string;
      steps: Array<{ number: string; title: string; body: string }>;
    }
  | {
      type: "deliverables";
      id?: string;
      eyebrow: string;
      headline: string;
      introduction: string;
      items: Array<{ icon: CapabilityPageIcon; title: string; body: string }>;
    }
  | {
      type: "strategy";
      id?: string;
      eyebrow: string;
      headline: string;
      introduction: string;
      media: CapabilityPageMedia;
      tracks: Array<{ number: string; label: string; title: string; body: string; points: string[] }>;
    }
  | {
      type: "rationale";
      id?: string;
      eyebrow: string;
      headline: string;
      body: string;
      reasons: Array<{ title: string; body: string }>;
    };

export type CapabilityPageContent = {
  path: string;
  compact?: boolean;
  metadata: {
    title: string;
    description: string;
    image?: string;
  };
  parent: { label: string; href: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    media: CapabilityPageMedia;
    actions: CapabilityPageAction[];
    signalLabel: string;
    signals: string[];
  };
  sections: CapabilityPageSection[];
  relatedCapabilities: {
    eyebrow: string;
    headline: string;
    introduction: string;
    links: Array<{ label: string; title: string; body: string; href: string }>;
  };
  cta: {
    eyebrow: string;
    headline: string;
    body: string;
    actions: CapabilityPageAction[];
  };
};

const landlordRepresentation: CapabilityPageContent = {
  path: "/services/brokerage/landlord-representation",
  metadata: {
    title: "Landlord Representation",
    description:
      "Strategic landlord representation for commercial property owners across Raleigh-Durham and the Research Triangle, from market positioning through lease execution.",
    image: galaBrokerCapability,
  },
  parent: { label: "Brokerage", href: "/services/brokerage" },
  hero: {
    eyebrow: "Brokerage · Landlord Representation",
    title: "Landlord Representation",
    lead:
      "Protect the income, positioning, and long-term value of your property with a leasing strategy built around ownership outcomes.",
    media: {
      src: galaBrokerCapability,
      alt: "Commercial real estate advisor reviewing a property strategy",
    },
    actions: [
      {
        label: "Discuss Your Property",
        href: "/contact?inquiry=landlord-representation",
        variant: "primary",
        icon: "arrow-up-right",
      },
      {
        label: "See Our Process",
        href: "#leasing-process",
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: "Landlord representation stages",
    signals: ["Position", "Market", "Qualify", "Negotiate"],
  },
  sections: [
    {
      type: "challenge",
    watermark: "OWNER",
    eyebrow: "The Ownership Challenge",
    headline: "Vacancy has a cost. So does the wrong tenant.",
    body: [
      "When commercial space sits vacant, the impact reaches beyond lost rent. Carrying costs continue, momentum slows, and a property can lose leverage in the market.",
      "Filling the space quickly is only part of the assignment. The right strategy must also protect the asset’s positioning, attract credible prospects, and produce terms that support the owner’s broader plan.",
    ],
    emphasis:
      "The goal is not simply an occupied space. It is a lease that strengthens the property.",
    pressures: [
      {
        number: "01",
        title: "Time",
        body: "Every day on market affects carrying costs and negotiating leverage.",
      },
      {
        number: "02",
        title: "Terms",
        body: "Rate is only one part of the economics; concessions, timing, and obligations matter too.",
      },
      {
        number: "03",
        title: "Tenant Fit",
        body: "Use, financial readiness, and operating compatibility shape long-term performance.",
      },
    ],
  },
    {
      type: "process",
      id: "leasing-process",
    eyebrow: "The Gala Leasing Process",
    headline: "A deliberate path from availability to execution.",
    introduction:
      "Each engagement begins with the asset and the owner’s objectives. From there, we build and manage a leasing process with clear decisions, consistent communication, and accountable next steps.",
    steps: [
      {
        number: "01",
        title: "Position",
        body: "Evaluate the property, competing inventory, likely users, pricing, and deal parameters before the space reaches the market.",
      },
      {
        number: "02",
        title: "Launch",
        body: "Create the leasing narrative, prepare the marketing package, and activate the channels most likely to reach qualified prospects and brokers.",
      },
      {
        number: "03",
        title: "Engage",
        body: "Manage inquiries, tours, follow-up, and market feedback while keeping ownership informed about activity and necessary adjustments.",
      },
      {
        number: "04",
        title: "Structure + Close",
        body: "Compare proposals, qualify prospective tenants, negotiate the full economics, and coordinate the path through lease execution.",
      },
    ],
  },
    {
      type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "The work behind a stronger leasing outcome.",
    introduction:
      "Gala combines strategy, marketing, market engagement, and deal coordination into one owner-focused assignment.",
    items: [
      {
        icon: "positioning",
        title: "Market Positioning",
        body: "Competitive-set review, pricing context, use considerations, and a clear go-to-market recommendation.",
      },
      {
        icon: "marketing",
        title: "Leasing Narrative + Materials",
        body: "A concise property story and coordinated marketing package designed around how prospects evaluate the opportunity.",
      },
      {
        icon: "prospects",
        title: "Targeted Prospecting",
        body: "Broker outreach, direct prospect engagement, and relevant listing-channel exposure guided by the likely tenant profile.",
      },
      {
        icon: "tours",
        title: "Inquiry + Tour Management",
        body: "Responsive qualification, property tours, follow-up, and feedback capture throughout the campaign.",
      },
      {
        icon: "economics",
        title: "Proposal Comparison",
        body: "Side-by-side review of economics, concessions, timing, use, and other terms that affect the ownership decision.",
      },
      {
        icon: "execution",
        title: "Negotiation + Execution",
        body: "Deal structuring, letter-of-intent coordination, and communication with the owner’s legal and project teams through lease execution.",
      },
    ],
  },
    {
      type: "strategy",
    eyebrow: "Market Reach + Tenant Quality",
    headline: "Create attention without compromising the asset.",
    introduction:
      "Exposure and qualification are not separate tasks. The campaign must reach the market effectively while giving ownership the information needed to choose the right path.",
    media: {
      src: galaSalesCapability,
      alt: "Active mixed-use commercial destination at dusk",
    },
    tracks: [
      {
        number: "01",
        label: "Property Marketing",
        title: "Build the right market story.",
        body: "We translate the property’s location, physical attributes, use potential, and ownership priorities into a clear leasing proposition.",
        points: ["Positioning and pricing narrative", "Broker and direct-prospect outreach", "Listing-platform strategy", "Campaign feedback and refinement"],
      },
      {
        number: "02",
        label: "Tenant Qualification",
        title: "Know who is across the table.",
        body: "Before momentum becomes commitment, we help ownership evaluate the prospect’s use, readiness, timing, and proposed economics.",
        points: ["Use and operational fit", "Financial-readiness coordination", "Timing and delivery requirements", "Proposal and risk comparison"],
      },
    ],
  },
    {
      type: "rationale",
    eyebrow: "Why Dedicated Representation",
    headline: "Your property deserves an advocate at every point in the deal.",
    body:
      "A dedicated landlord representative protects continuity. The person shaping the market strategy also interprets feedback, manages the prospect relationship, and carries the owner’s priorities into negotiation.",
    reasons: [
      {
        title: "One accountable strategy",
        body: "Positioning, outreach, tours, and negotiation stay connected to the same ownership objective.",
      },
      {
        title: "Better decision context",
        body: "Ownership receives more than activity reports—Gala translates market response into practical next decisions.",
      },
      {
        title: "The full economics protected",
        body: "We evaluate the complete proposal, not only face rent, so tradeoffs remain visible throughout negotiation.",
      },
    ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Leasing decisions rarely exist in isolation.",
    introduction:
      "When an assignment reaches beyond leasing, Gala can connect the conversation across the broader commercial platform.",
    links: [
      {
        label: "Brokerage",
        title: "Tenant Representation",
        body: "A disciplined occupier-side process for businesses evaluating and securing commercial space.",
        href: "/services/brokerage/tenant-representation",
      },
      {
        label: "Investment Sales",
        title: "Investment Sales",
        body: "Disposition and acquisition strategy for commercial owners and private investors.",
        href: "/services/investment-sales",
      },
      {
        label: "Development",
        title: "Development Services",
        body: "Early-stage strategy and coordination for properties with development or repositioning potential.",
        href: "/services/development-services",
      },
      {
        label: "Capital Markets",
        title: "Capital Markets",
        body: "Debt and equity guidance aligned with the realities of the asset and transaction.",
        href: "/services/capital-markets",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Property",
    headline: "Let’s build the leasing strategy around your asset.",
    body:
      "Tell us what is available, what ownership is working toward, and where the property stands today. We’ll begin with a focused conversation about the next best move.",
    actions: [
      {
        label: "Discuss Your Property",
        href: "/contact?inquiry=landlord-representation",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

const tenantRepresentation: CapabilityPageContent = {
  path: "/services/brokerage/tenant-representation",
  metadata: {
    title: "Tenant Representation",
    description:
      "Business-led tenant representation across Raleigh-Durham and the Research Triangle, from occupancy requirements and site selection through lease execution.",
    image: galaCapitalCapability,
  },
  parent: { label: "Brokerage", href: "/services/brokerage" },
  hero: {
    eyebrow: "Brokerage · Tenant Representation",
    title: "Tenant Representation",
    lead:
      "Turn real estate into a business decision with a search, comparison, and negotiation process built around how your company operates.",
    media: {
      src: galaCapitalCapability,
      alt: "Business leaders reviewing commercial occupancy requirements and costs",
      position: "44% center",
    },
    actions: [
      {
        label: "Discuss Your Space",
        href: "/contact?inquiry=tenant-representation",
        variant: "primary",
        icon: "arrow-up-right",
      },
      {
        label: "See the Search Process",
        href: "#tenant-search-process",
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: "Tenant representation stages",
    signals: ["Define", "Search", "Compare", "Negotiate"],
  },
  sections: [
    {
      type: "challenge",
      watermark: "OCCUPIER",
      eyebrow: "The Business Challenge",
      headline: "The wrong space keeps costing you after the lease is signed.",
      body: [
        "A commercial lease affects far more than an address. It shapes customer access, employee experience, operating efficiency, future flexibility, and the cost structure of the business.",
        "The right decision begins before the property search. Requirements, timing, financial priorities, and alternatives must be clear enough to guide the market process and keep attractive spaces from becoming expensive distractions.",
      ],
      emphasis:
        "The goal is not simply to find available space. It is to secure space that supports the business.",
      pressures: [
        {
          number: "01",
          title: "Operations",
          body: "Location, access, layout, infrastructure, and use must work for the way the business operates.",
        },
        {
          number: "02",
          title: "Economics",
          body: "Base rent alone does not reveal the full occupancy cost or the tradeoffs between alternatives.",
        },
        {
          number: "03",
          title: "Timing",
          body: "Renewal dates, construction, approvals, and move coordination can narrow the window for a sound decision.",
        },
      ],
    },
    {
      type: "process",
      id: "tenant-search-process",
      eyebrow: "The Gala Occupancy Process",
      headline: "From business requirement to occupied space.",
      introduction:
        "Gala organizes the decision around the business first, then manages the market work, comparisons, negotiation, and coordination needed to move from strategy to occupancy.",
      steps: [
        {
          number: "01",
          title: "Define",
          body: "Translate operational needs, geography, timing, budget, and growth plans into a clear occupancy requirement.",
        },
        {
          number: "02",
          title: "Search + Tour",
          body: "Identify viable sites, organize market options, coordinate tours, and evaluate each property against the requirement.",
        },
        {
          number: "03",
          title: "Compare",
          body: "Review market context and occupancy economics so decision-makers can see costs, constraints, and tradeoffs side by side.",
        },
        {
          number: "04",
          title: "Negotiate + Occupy",
          body: "Structure the LOI, negotiate business terms, and coordinate the lease path and key milestones through occupancy.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "A decision process your team can act on.",
      introduction:
        "Each assignment connects business requirements with practical market intelligence and a disciplined path to commitment.",
      items: [
        {
          icon: "positioning",
          title: "Requirement Strategy",
          body: "A working brief covering use, location, physical needs, timing, economics, and future flexibility.",
        },
        {
          icon: "prospects",
          title: "Site Selection",
          body: "A focused search of relevant market options rather than an undifferentiated list of available spaces.",
        },
        {
          icon: "tours",
          title: "Tours + Evaluation",
          body: "Coordinated tours, property-level observations, and follow-up organized around the approved requirement.",
        },
        {
          icon: "economics",
          title: "Occupancy-Cost Comparison",
          body: "Side-by-side analysis of rent, concessions, operating costs, timing, and other meaningful economic differences.",
        },
        {
          icon: "marketing",
          title: "LOI + Lease Negotiation",
          body: "Business-term strategy and negotiation aligned with the tenant’s objectives and coordinated with legal review.",
        },
        {
          icon: "execution",
          title: "Occupancy Coordination",
          body: "Continued communication around delivery, construction, move timing, and other milestones that affect occupancy.",
        },
      ],
    },
    {
      type: "strategy",
      eyebrow: "Stay, Move, or Reshape",
      headline: "The best answer may not be a new address.",
      introduction:
        "Tenant representation should compare the real alternatives available to the business, including the option to remain in place under better-aligned terms.",
      media: {
        src: galaBrokerCapability,
        alt: "Commercial real estate advisor evaluating occupancy alternatives",
        position: "53% center",
      },
      tracks: [
        {
          number: "01",
          label: "Stay",
          title: "Renew with market context.",
          body: "A renewal deserves the same preparation as a relocation. We evaluate the existing space, market alternatives, timing, and business terms before commitment.",
          points: [
            "Renewal and restructure strategy",
            "Market benchmark comparison",
            "Expansion within the property",
            "Timing and leverage planning",
          ],
        },
        {
          number: "02",
          label: "Move",
          title: "Change space with purpose.",
          body: "When the business needs a different footprint or location, the search is shaped around the operational reason for moving—not availability alone.",
          points: [
            "Relocation and expansion",
            "Downsizing and consolidation",
            "Site and property comparison",
            "Transition through occupancy",
          ],
        },
      ],
    },
    {
      type: "rationale",
      eyebrow: "Why Dedicated Representation",
      headline: "Your advisor should answer only to your side of the table.",
      body:
        "Gala represents the tenant’s interests throughout the assignment. That focus keeps the requirement, market search, comparisons, and negotiations connected to the business decision the client actually needs to make.",
      reasons: [
        {
          title: "Undivided advocacy",
          body: "The process is organized around the tenant’s priorities, alternatives, economics, and desired outcome.",
        },
        {
          title: "Comparable decisions",
          body: "Options are evaluated against the same requirement so tradeoffs remain clear and defensible.",
        },
        {
          title: "Continuity through occupancy",
          body: "The advisory relationship continues beyond site selection and negotiation into the milestones that make the space usable.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Occupancy decisions can connect to a larger strategy.",
    introduction:
      "When the requirement touches ownership, development, or capital questions, Gala can connect the conversation across its broader commercial platform.",
    links: [
      {
        label: "Brokerage",
        title: "Landlord Representation",
        body: "Owner-focused positioning, marketing, tenant qualification, and lease execution.",
        href: "/services/brokerage/landlord-representation",
      },
      {
        label: "Investment Sales",
        title: "Investment Sales",
        body: "Commercial acquisition and disposition strategy for owners and private investors.",
        href: "/services/investment-sales",
      },
      {
        label: "Development",
        title: "Development Services",
        body: "Site strategy and coordination when an occupancy need involves development or repositioning.",
        href: "/services/development-services",
      },
      {
        label: "Capital Markets",
        title: "Capital Markets",
        body: "Debt and equity guidance for commercial opportunities and transactions.",
        href: "/services/capital-markets",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Requirement",
    headline: "Let’s clarify what the business needs from its next space.",
    body:
      "Tell us what is changing, what the space must support, and when a decision needs to be made. We’ll begin with the business requirement and build the real estate process around it.",
    actions: [
      {
        label: "Discuss Your Space",
        href: "/contact?inquiry=tenant-representation",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

const industrialInvestmentSalesPage: CapabilityPageContent = {
  path: "/services/investment-sales/industrial",
  compact: true,
  metadata: {
    title: "Industrial Investment Sales",
    description:
      "Industrial property sale advisory for owners and investors, connecting functional real estate, operating context, buyer positioning, diligence, and transaction execution.",
    image: industrialInvestmentSales,
  },
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  hero: {
    eyebrow: "Investment Sales · Industrial",
    title: "Industrial Investment Sales",
    lead:
      "Position the building around what industrial buyers actually underwrite: durable income, functional utility, physical condition, and a credible path through diligence.",
    media: {
      src: industrialInvestmentSales,
      alt: "Modern light-industrial distribution property with loading docks and a truck court",
      position: "center 56%",
    },
    actions: [
      {
        label: "Discuss an Industrial Asset",
        href: "/contact?inquiry=investment-sales&focus=industrial",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Industrial sale advisory stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Industrial Value Story",
      headline: "A warehouse is more than its square footage.",
      introduction:
        "Gala organizes the sale around the property's verified income, operating utility, physical condition, and the risks buyers will test in diligence.",
      media: {
        src: industrialInteriorOperations,
        alt: "Clear-span industrial interior with loading doors, structural bays, and operational floor space",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Income + Operations",
          title: "Show how the property performs today.",
          body: "Lease structure, occupancy, rollover, expenses, capital needs, and availability shape the durability of income and the likely buyer pool.",
          points: [],
        },
        {
          number: "02",
          label: "Physical Function",
          title: "Make operational utility legible.",
          body: "Clear height, loading, circulation, power, yard depth, access, and configuration determine which users and investors can execute with confidence.",
          points: [],
        },
        {
          number: "03",
          label: "Optionality + Risk",
          title: "Separate opportunity from assumption.",
          body: "Condition, environmental records, title, expansion, re-tenanting, and redevelopment questions are framed clearly so buyers can price both potential and execution risk.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "industrial-sale-process",
      eyebrow: "The Industrial Sale Process",
      headline: "Build conviction before asking the market to act.",
      introduction: "Connect the seller's objectives, property-level evidence, buyer strategy, and transaction execution.",
      steps: [
        {
          number: "01",
          title: "Diagnose",
          body: "Clarify ownership objectives, timing, operations, lease position, physical attributes, and known diligence items.",
        },
        {
          number: "02",
          title: "Position",
          body: "Define the likely buyers, valuation context, differentiators, constraints, and evidence supporting the offering.",
        },
        {
          number: "03",
          title: "Market",
          body: "Launch coordinated materials and targeted outreach, qualify interest, manage access, and report market feedback.",
        },
        {
          number: "04",
          title: "Execute",
          body: "Compare offers beyond price and coordinate diligence with ownership's legal, tax, and technical advisors through closing.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "The information buyers need. The process sellers need.",
      introduction:
        "A focused assignment connects market positioning, buyer engagement, and accountable execution.",
      items: [
        {
          icon: "positioning",
          title: "Asset + Valuation Positioning",
          body: "A sale thesis grounded in verified income, tenancy, physical utility, location, market context, and the buyers most likely to value them.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A coordinated property narrative, fact set, imagery, and diligence roadmap that separates verified information from buyer assumptions.",
        },
        {
          icon: "prospects",
          title: "Buyer Outreach + Access",
          body: "Direct engagement with relevant investors, operators, owner-users, and developers, with qualification, property access, and feedback managed consistently.",
        },
        {
          icon: "execution",
          title: "Negotiation + Execution",
          body: "Offer comparison, diligence communication, and milestone coordination through closing, with specialist conclusions left to the appropriate advisors.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Connected expertise when the asset requires it.",
    introduction:
      "Move directly into the occupancy, land, development, or capital questions surrounding the sale.",
    links: [
      {
        label: "Investment Sales",
        title: "Land",
        body: "Sale strategy for sites where access, utilities, approvals, and timing shape value.",
        href: "/services/investment-sales/land",
      },
      {
        label: "Brokerage",
        title: "Tenant Representation",
        body: "Occupier-side search and negotiation when a sale creates a relocation requirement.",
        href: "/services/brokerage/tenant-representation",
      },
      {
        label: "Development",
        title: "Development Oversight",
        body: "Coordination for industrial repositioning or development work.",
        href: "/services/development-services/development-oversight",
      },
      {
        label: "Capital Markets",
        title: "Capital Strategy",
        body: "Debt and equity planning aligned with the asset and execution plan.",
        href: "/services/capital-markets/capital-strategy",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Asset",
    headline: "Let’s identify what the market should understand first.",
    body:
      "Share the property, current occupancy, timing, and ownership objective. Gala will begin with the asset facts buyers are most likely to test.",
    actions: [
      {
        label: "Discuss an Industrial Asset",
        href: "/contact?inquiry=investment-sales&focus=industrial",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

const multifamilyInvestmentSalesPage: CapabilityPageContent = {
  path: "/services/investment-sales/multifamily",
  compact: true,
  metadata: {
    title: "Multifamily Investment Sales",
    description:
      "Multifamily sale advisory for owners and investors, connecting property operations, rent-roll performance, physical condition, buyer underwriting, and transaction execution.",
    image: multifamilyInvestmentSales,
  },
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  hero: {
    eyebrow: "Investment Sales · Multifamily",
    title: "Multifamily Investment Sales",
    lead:
      "Bring the operating story, physical asset, and buyer underwriting into one sale process built to make performance understandable and risk visible.",
    media: {
      src: multifamilyInvestmentSales,
      alt: "Contemporary multifamily community with apartment buildings and a landscaped courtyard",
      position: "center 54%",
    },
    actions: [
      {
        label: "Discuss a Multifamily Asset",
        href: "/contact?inquiry=investment-sales&focus=multifamily",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Multifamily sale advisory stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Operating Story",
      headline: "Buyers price the income—and the work behind it.",
      introduction:
        "Gala connects the rent roll, expense history, physical asset, and market position so buyers can distinguish current performance from the work required to reach another outcome.",
      media: {
        src: multifamilyOperationsContext,
        alt: "Multifamily advisor reviewing a landscaped apartment community and its building condition",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Income Quality",
          title: "Reconcile what the property earns today.",
          body: "Occupancy, collections, concessions, lease expirations, revenue, and controllable expenses establish the operating baseline buyers can test.",
          points: [],
        },
        {
          number: "02",
          label: "Physical Asset",
          title: "Connect operations to property condition.",
          body: "Unit interiors, building systems, deferred maintenance, capital history, and resident access shape reserves, disruption, and execution risk.",
          points: [],
        },
        {
          number: "03",
          label: "Future Execution",
          title: "Keep opportunity separate from assumption.",
          body: "Market-rent, renovation, lease-up, expense, or management opportunities are framed with the time, capital, and diligence required to pursue them.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "multifamily-sale-process",
      eyebrow: "The Multifamily Sale Process",
      headline: "Prepare the asset before the market sets the narrative.",
      introduction: "Organize the operating evidence, buyer strategy, access, and diligence around ownership's timing.",
      steps: [
        {
          number: "01",
          title: "Prepare",
          body: "Clarify objectives and assemble the rent roll, operating statements, capital history, and available property records.",
        },
        {
          number: "02",
          title: "Underwrite",
          body: "Reconcile performance, frame market context, and separate documented results from forward-looking assumptions.",
        },
        {
          number: "03",
          title: "Market",
          body: "Activate relevant buyers, manage resident-sensitive access and questions, and compare offers beyond headline price.",
        },
        {
          number: "04",
          title: "Close",
          body: "Coordinate financial, lease, physical, and closing milestones with ownership's specialist advisors.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "A sale process grounded in operating evidence.",
      introduction:
        "The assignment connects property preparation, buyer communication, and transaction coordination while specialist conclusions remain with the appropriate advisors.",
      items: [
        {
          icon: "economics",
          title: "Operations + Valuation",
          body: "Rent-roll, trailing-statement, occupancy, expense, market, and likely buyer context organized into one credible sale position.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "Coordinated facts, imagery, operating information, capital context, and a diligence roadmap that distinguish evidence from projections.",
        },
        {
          icon: "prospects",
          title: "Buyer Outreach + Access",
          body: "Targeted engagement, qualification, tours, information requests, and feedback managed around resident privacy and operating continuity.",
        },
        {
          icon: "execution",
          title: "Offers + Execution",
          body: "Offer comparison and an organized path for financial, lease, contract, physical, financing, and closing diligence.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "The transaction may be one part of the ownership plan.",
    introduction:
      "Gala can connect the sale conversation to capital, development, and property-management coordination when those decisions affect timing or execution.",
    links: [
      {
        label: "Capital Markets",
        title: "Capital Strategy",
        body: "Debt and equity planning aligned with the asset, sponsorship, timing, and investment plan.",
        href: "/services/capital-markets/capital-strategy",
      },
      {
        label: "Capital Markets",
        title: "Transaction Coordination",
        body: "Organized information flow and milestone visibility across ownership, capital sources, advisors, and closing parties.",
        href: "/services/capital-markets/transaction-coordination",
      },
      {
        label: "Development",
        title: "Development Oversight",
        body: "Coordination across consultants, approvals, schedule, and ownership decisions for development or repositioning work.",
        href: "/services/development-services/development-oversight",
      },
      {
        label: "Gala Platform",
        title: "Property Management Partnership",
        body: "A coordinated connection to property-management resources when operations and ownership strategy need to stay aligned.",
        href: "/services/property-management/property-management-partnership",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Operations",
    headline: "Let’s understand what the property is producing today.",
    body:
      "Share the asset, current occupancy, operating history, ownership objective, and timing. Gala will begin with the information buyers are likely to test first.",
    actions: [
      {
        label: "Discuss a Multifamily Asset",
        href: "/contact?inquiry=investment-sales&focus=multifamily",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

const retailInvestmentSalesPage: CapabilityPageContent = {
  path: "/services/investment-sales/retail",
  compact: true,
  metadata: {
    title: "Retail Investment Sales",
    description:
      "Retail property sale advisory for owners and investors, connecting tenancy, lease structure, trade-area context, access, site utility, buyer positioning, and diligence.",
    image: retailInvestmentSales,
  },
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  hero: {
    eyebrow: "Investment Sales · Retail",
    title: "Retail Investment Sales",
    lead:
      "Position the income and the real estate together with a sale process built around tenancy, lease structure, customer access, site utility, and buyer fit.",
    media: {
      src: retailInvestmentSales,
      alt: "Contemporary neighborhood retail center with storefronts, parking, and landscaped access",
      position: "center 55%",
    },
    actions: [
      {
        label: "Discuss a Retail Asset",
        href: "/contact?inquiry=investment-sales&focus=retail",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Retail sale advisory stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Retail Value Story",
      headline: "Retail value lives where the lease meets the site.",
      introduction:
        "Gala presents the in-place economics, customer access, physical utility, and long-term durability together so the market can understand both the tenant and the real estate.",
      media: {
        src: retailAccessContext,
        alt: "Active neighborhood retail center showing storefronts, customer access, and parking circulation",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Tenancy + Income",
          title: "Make the lease economics comparable.",
          body: "Tenant credit, rent, reimbursements, guarantees, term, options, co-tenancy, and use restrictions define the income buyers can underwrite.",
          points: [],
        },
        {
          number: "02",
          label: "Site Utility",
          title: "Show how customers and operators use the property.",
          body: "Trade-area position, access, visibility, parking, circulation, signage rights, and configuration determine day-to-day operating utility.",
          points: [],
        },
        {
          number: "03",
          label: "Durability + Next Use",
          title: "Match the buyer to the actual value path.",
          body: "Net-lease investors, operators, owner-users, and developers weigh rollover, capital needs, adaptability, restrictions, and redevelopment questions differently.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "retail-sale-process",
      eyebrow: "The Retail Sale Process",
      headline: "Read the leases before the market writes the conclusion.",
      introduction: "Connect the documents governing income and site use to the right pricing, buyer, and transaction strategy.",
      steps: [
        {
          number: "01",
          title: "Read",
          body: "Organize leases, options, reimbursements, restrictions, operating history, site information, and known diligence items.",
        },
        {
          number: "02",
          title: "Position",
          body: "Frame the economics, trade-area role, site utility, buyer groups, valuation context, and material questions.",
        },
        {
          number: "03",
          title: "Reach",
          body: "Launch coordinated materials, qualify interest, manage property access, and compare offers beyond headline price.",
        },
        {
          number: "04",
          title: "Execute",
          body: "Coordinate lease, title, survey, estoppel, physical, environmental, financing, and closing milestones.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "Retail-specific preparation from lease file to closing file.",
      introduction:
        "The assignment keeps property positioning, buyer engagement, and diligence communication connected while specialist conclusions remain with qualified advisors.",
      items: [
        {
          icon: "economics",
          title: "Lease + Site Positioning",
          body: "A coherent view of term, rent, options, responsibilities, trade area, access, visibility, and physical utility.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A coordinated narrative, fact set, imagery, lease summary, and diligence pathway that separates verified facts from buyer assumptions.",
        },
        {
          icon: "prospects",
          title: "Buyer Outreach + Access",
          body: "Targeted outreach, qualification, tours, tenant-sensitive communication, and feedback managed around operating continuity.",
        },
        {
          icon: "execution",
          title: "Offers + Execution",
          body: "Offer comparison and a clear path for leases, estoppels, title, survey, physical records, financing, and closing milestones.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Retail strategy can extend beyond a single disposition.",
    introduction:
      "Gala can connect the sale conversation to leasing, land, development, and capital decisions when they materially affect the property's timing or buyer story.",
    links: [
      {
        label: "Brokerage",
        title: "Landlord Representation",
        body: "Owner-focused positioning, prospecting, tenant qualification, and lease execution when occupancy is part of the value plan.",
        href: "/services/brokerage/landlord-representation",
      },
      {
        label: "Investment Sales",
        title: "Land",
        body: "Sale strategy for commercial sites where access, utilities, approvals, and timing determine buyer fit.",
        href: "/services/investment-sales/land",
      },
      {
        label: "Development",
        title: "Site Strategy",
        body: "Early coordination around intended use, access, infrastructure, market fit, and the approval path.",
        href: "/services/development-services/site-strategy",
      },
      {
        label: "Capital Markets",
        title: "Capital Strategy",
        body: "Debt and equity planning aligned with the asset, sponsorship, timing, and transaction strategy.",
        href: "/services/capital-markets/capital-strategy",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Lease + Site",
    headline: "Let’s identify what makes the retail asset durable.",
    body:
      "Share the property, tenancy, lease position, ownership objective, and timing. Gala will begin with the income and real-estate questions buyers are likely to test first.",
    actions: [
      {
        label: "Discuss a Retail Asset",
        href: "/contact?inquiry=investment-sales&focus=retail",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

const officeInvestmentSalesPage: CapabilityPageContent = {
  path: "/services/investment-sales/office",
  compact: true,
  metadata: {
    title: "Office Investment Sales",
    description:
      "Office property sale advisory for owners and investors, connecting occupancy, lease rollover, tenant improvements, space quality, capital exposure, buyer positioning, and diligence.",
    image: officeInvestmentSales,
  },
  parent: { label: "Investment Sales", href: "/services/investment-sales" },
  hero: {
    eyebrow: "Investment Sales · Office",
    title: "Office Investment Sales",
    lead:
      "Build the sale strategy around the property's real occupancy, lease exposure, space competitiveness, and capital requirements—not yesterday's assumptions.",
    media: {
      src: officeInvestmentSales,
      alt: "Contemporary mid-rise office building with an illuminated lobby and landscaped arrival",
      position: "center 53%",
    },
    actions: [
      {
        label: "Discuss an Office Asset",
        href: "/contact?inquiry=investment-sales&focus=office",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Office sale advisory stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Office Value Story",
      headline: "Office space competes twice: for tenants and for capital.",
      introduction:
        "Gala connects the rent roll, rollover exposure, leasing capital, space quality, and buyer strategy so the market can see how the building performs and what comes next.",
      media: {
        src: officeOccupancyContext,
        alt: "Contemporary office interior showing common areas, glass-fronted suites, and active occupancy",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Income + Rollover",
          title: "Show what is contracted—and what could change.",
          body: "Tenant credit, rent, recoveries, options, expirations, concentration, and landlord obligations establish the durability of in-place income.",
          points: [],
        },
        {
          number: "02",
          label: "Space + Capital",
          title: "Make the cost of the next lease visible.",
          body: "Suite condition, tenant improvements, commissions, free rent, downtime, building systems, parking, and amenities define the capital path.",
          points: [],
        },
        {
          number: "03",
          label: "Occupancy Path",
          title: "Match the buyer to the building's real plan.",
          body: "Income investors, medical-office buyers, owner-users, and repositioning groups weigh retention, lease-up, competition, alternative use, and timing differently.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "office-sale-process",
      eyebrow: "The Office Sale Process",
      headline: "Make occupancy risk understandable before buyers price uncertainty.",
      introduction: "Bring leases, space condition, market position, buyer outreach, and diligence into one clear transaction plan.",
      steps: [
        {
          number: "01",
          title: "Audit",
          body: "Organize leases, rent roll, operating history, capital records, suite condition, vendor information, and known diligence.",
        },
        {
          number: "02",
          title: "Model",
          body: "Frame contracted income, rollover, leasing exposure, capital requirements, market context, and likely buyer groups.",
        },
        {
          number: "03",
          title: "Market",
          body: "Launch coordinated materials, manage tenant-sensitive access and questions, and compare offers on economics and certainty.",
        },
        {
          number: "04",
          title: "Close",
          body: "Coordinate lease, estoppel, title, survey, physical, environmental, financing, and closing milestones.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "Preparation for the questions office buyers ask first.",
      introduction:
        "The assignment connects occupancy analysis to property positioning and buyer execution while specialist conclusions remain with qualified advisors.",
      items: [
        {
          icon: "economics",
          title: "Occupancy + Valuation",
          body: "Tenancy, rent, options, expirations, recoveries, concentration, leasing capital, and market context organized into one sale position.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A coordinated property narrative, rent-roll summary, imagery, capital context, and diligence roadmap that distinguishes facts from assumptions.",
        },
        {
          icon: "prospects",
          title: "Buyer Outreach + Access",
          body: "Targeted engagement with the right capital, with property access, tenant communication, questions, and feedback managed discreetly.",
        },
        {
          icon: "execution",
          title: "Offers + Execution",
          body: "Offer comparison and a clear path for leases, estoppels, financial records, physical reports, title, financing, and closing milestones.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Office value is often shaped before the sale launches.",
    introduction:
      "Gala can connect the disposition conversation to leasing, occupancy, capital, and property-management coordination when those decisions affect marketability or timing.",
    links: [
      {
        label: "Brokerage",
        title: "Landlord Representation",
        body: "Owner-focused positioning, prospecting, tenant qualification, and lease execution when occupancy is central to the value plan.",
        href: "/services/brokerage/landlord-representation",
      },
      {
        label: "Brokerage",
        title: "Tenant Representation",
        body: "Business-led site selection and negotiation when an owner-user or tenant needs to renew, relocate, expand, or downsize.",
        href: "/services/brokerage/tenant-representation",
      },
      {
        label: "Capital Markets",
        title: "Capital Strategy",
        body: "Debt and equity planning aligned with occupancy, capital requirements, sponsorship, timing, and the transaction plan.",
        href: "/services/capital-markets/capital-strategy",
      },
      {
        label: "Gala Platform",
        title: "Property Management Partnership",
        body: "A coordinated connection to property-management resources when operations, tenant service, and ownership strategy need alignment.",
        href: "/services/property-management/property-management-partnership",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Rent Roll",
    headline: "Let’s clarify how the office asset competes today.",
    body:
      "Share the property, current occupancy, lease profile, known capital needs, ownership objective, and timing. Gala will begin with the issues buyers are likely to underwrite first.",
    actions: [
      {
        label: "Discuss an Office Asset",
        href: "/contact?inquiry=investment-sales&focus=office",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
};

export const capabilityPages: CapabilityPageContent[] = [
  landlordRepresentation,
  tenantRepresentation,
  industrialInvestmentSalesPage,
  multifamilyInvestmentSalesPage,
  retailInvestmentSalesPage,
  officeInvestmentSalesPage,
  landCapabilityPage,
  ...developmentCapabilityPages,
  ...capitalCapabilityPages,
  propertyManagementCapabilityPage,
];

export const capabilityPageByPath: Record<string, CapabilityPageContent> = Object.fromEntries(
  capabilityPages.map((page) => [page.path, page]),
);

export const findCapabilityPageContent = (serviceSlug: string, capabilitySlug: string) =>
  capabilityPageByPath[`/services/${serviceSlug}/${capabilitySlug}`];
