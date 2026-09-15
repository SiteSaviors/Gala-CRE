import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import galaCapitalCapability from "@/assets/gala-capital-capability.webp";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";
import industrialInvestmentSales from "@/assets/industrial-investment-sales.webp";
import multifamilyInvestmentSales from "@/assets/multifamily-investment-sales.webp";
import officeInvestmentSales from "@/assets/office-investment-sales.webp";
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
        src: industrialInvestmentSales,
        alt: "Wide view of a contemporary industrial facility, loading area, and circulation",
        position: "center 62%",
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
      {
        label: "See the Sale Process",
        href: "#multifamily-sale-process",
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: "Multifamily sale advisory stages",
    signals: ["Prepare", "Underwrite", "Market", "Close"],
  },
  sections: [
    {
      type: "challenge",
      watermark: "PERFORMANCE",
      eyebrow: "The Operating Story",
      headline: "Buyers price the income—and the work behind it.",
      body: [
        "A multifamily sale is underwritten unit by unit and line by line. Rent roll, collections, concessions, vacancy, lease expirations, controllable expenses, taxes, insurance, utilities, and recurring capital needs all influence how buyers view current income and future performance.",
        "The offering must connect those operating realities to the physical property and its market position. Clean preparation helps buyers distinguish durable performance from temporary variance while giving ownership an informed view of the questions likely to affect pricing and certainty.",
      ],
      emphasis:
        "A persuasive multifamily story begins with reconciled operations, not a projected headline.",
      pressures: [
        {
          number: "01",
          title: "Revenue Quality",
          body: "Occupancy, collections, concessions, loss-to-lease, and lease timing shape how revenue is credited.",
        },
        {
          number: "02",
          title: "Expense Reality",
          body: "Taxes, insurance, utilities, payroll, repairs, and management assumptions can materially change net income.",
        },
        {
          number: "03",
          title: "Capital + Condition",
          body: "Deferred maintenance, unit interiors, building systems, and planned improvements affect buyer reserves and execution risk.",
        },
      ],
    },
    {
      type: "process",
      id: "multifamily-sale-process",
      eyebrow: "The Multifamily Sale Process",
      headline: "Prepare the asset before the market sets the narrative.",
      introduction:
        "Gala organizes the process around decision-useful information, likely buyer questions, and ownership's timing so the market can evaluate the opportunity on a consistent basis.",
      steps: [
        {
          number: "01",
          title: "Prepare",
          body: "Clarify the seller's objectives and assemble the rent roll, operating statements, lease information, capital history, and available property records.",
        },
        {
          number: "02",
          title: "Underwrite",
          body: "Reconcile current performance, identify normalization questions, frame market context, and distinguish documented results from forward-looking assumptions.",
        },
        {
          number: "03",
          title: "Market",
          body: "Build the offering narrative, activate relevant buyers, manage access and questions, and compare interest on economics, timing, and execution strength.",
        },
        {
          number: "04",
          title: "Close",
          body: "Coordinate diligence flow and milestones with ownership's legal, tax, accounting, property-management, and technical advisors through closing.",
        },
      ],
    },
    {
      type: "strategy",
      eyebrow: "Buyer Underwriting",
      headline: "Separate today's performance from tomorrow's plan.",
      introduction:
        "Different buyers value stabilized income and operational upside differently. A disciplined process shows what the property is producing now, what has been verified, and what a buyer would need to execute to reach another outcome.",
      media: {
        src: multifamilyInvestmentSales,
        alt: "Wide courtyard view across a mid-rise multifamily community",
        position: "center 58%",
      },
      tracks: [
        {
          number: "01",
          label: "Current Operations",
          title: "Make the in-place performance legible.",
          body: "Buyers need a consistent picture of unit status, collections, revenue, expenses, lease exposure, and the physical condition supporting current operations.",
          points: [
            "Rent-roll and unit-status review",
            "Trailing operations and expense context",
            "Lease expirations, concessions, and collections",
            "Capital history and known condition items",
          ],
        },
        {
          number: "02",
          label: "Future Execution",
          title: "Define upside without presenting it as certainty.",
          body: "Renovation, lease-up, expense changes, management transitions, or repositioning may support a buyer's plan, but assumptions must remain separate from documented results.",
          points: [
            "Market-rent and comparable context",
            "Renovation or lease-up assumptions",
            "Supply, demand, and location considerations",
            "Execution requirements and buyer diligence",
          ],
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "A sale process grounded in operating evidence.",
      introduction:
        "The assignment connects property preparation, buyer communication, and transaction coordination while leaving legal, tax, accounting, engineering, and environmental conclusions to the appropriate advisors.",
      items: [
        {
          icon: "economics",
          title: "Operating Review",
          body: "Rent-roll, trailing-statement, collections, concessions, occupancy, and expense context organized to identify gaps and likely buyer questions.",
        },
        {
          icon: "positioning",
          title: "Valuation + Buyer Strategy",
          body: "Relevant sales, income context, market position, and likely buyer profiles considered alongside ownership's timing and priorities.",
        },
        {
          icon: "marketing",
          title: "Offering Narrative",
          body: "Coordinated facts, imagery, operating information, and market context that distinguish documented performance from buyer assumptions.",
        },
        {
          icon: "prospects",
          title: "Qualified Buyer Outreach",
          body: "Targeted engagement with relevant private investors, operators, and acquisition groups based on asset scale and strategy.",
        },
        {
          icon: "tours",
          title: "Access + Offer Management",
          body: "Property tours, information requests, feedback, and offer comparison managed around resident privacy and operating continuity.",
        },
        {
          icon: "execution",
          title: "Diligence Coordination",
          body: "An organized path for leases, financial records, contracts, physical reports, and closing milestones across the seller's advisory team.",
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
      {
        label: "See the Sale Process",
        href: "#retail-sale-process",
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: "Retail sale advisory stages",
    signals: ["Read", "Position", "Reach", "Execute"],
  },
  sections: [
    {
      type: "challenge",
      watermark: "RELEVANCE",
      eyebrow: "The Retail Value Story",
      headline: "Retail value lives where the lease meets the site.",
      body: [
        "The tenant and lease can establish income, but the real estate determines how durable and transferable that income may be. Trade-area demand, access, visibility, parking, circulation, co-tenancy, use restrictions, and the building's ability to support another operator all influence buyer conviction.",
        "A credible offering shows how those pieces relate. It presents in-place economics clearly, identifies lease and site questions before they disrupt the process, and reaches the investors, operators, or developers whose strategy fits the property's current income and future utility.",
      ],
      emphasis:
        "The strongest retail positioning explains both why the tenant belongs there and why the real estate remains useful.",
      pressures: [
        {
          number: "01",
          title: "Tenancy",
          body: "Credit, sales context when available, lease term, options, guarantees, and rollover shape the income profile.",
        },
        {
          number: "02",
          title: "Site",
          body: "Access, visibility, parking, circulation, signage rights, and physical configuration determine operating utility.",
        },
        {
          number: "03",
          title: "Durability",
          body: "Trade area, competition, restrictions, co-tenancy, capital needs, and alternative-use potential affect long-term risk.",
        },
      ],
    },
    {
      type: "strategy",
      eyebrow: "Buyer Segmentation",
      headline: "Market the asset to the capital that can value its real story.",
      introduction:
        "A net-leased property, multi-tenant center, vacant owner-user building, and redevelopment site do not share one buyer pool. Gala frames outreach around the property's verified tenancy, economics, physical utility, and execution requirements.",
      media: {
        src: retailInvestmentSales,
        alt: "Wide view across a retail center showing storefront frontage and parking circulation",
        position: "center 58%",
      },
      tracks: [
        {
          number: "01",
          label: "Income Buyers",
          title: "Make the lease economics comparable.",
          body: "For occupied retail, buyers need a coherent view of the tenant, rent, reimbursements, options, responsibilities, and the events that could change future income.",
          points: [
            "Lease term, rent, options, and escalations",
            "Expense reimbursements and ownership obligations",
            "Tenant-credit and guarantee documentation",
            "Co-tenancy, exclusives, and use restrictions",
          ],
        },
        {
          number: "02",
          label: "Operators + Repositioning",
          title: "Show what the real estate can support.",
          body: "When value depends on releasing, owner occupancy, pad utility, or redevelopment, site function and approval questions become central to the decision.",
          points: [
            "Access, visibility, parking, and circulation",
            "Building or suite adaptability",
            "Zoning, restrictions, and approval questions",
            "Delivery condition and capital requirements",
          ],
        },
      ],
    },
    {
      type: "process",
      id: "retail-sale-process",
      eyebrow: "The Retail Sale Process",
      headline: "Read the leases before the market writes the conclusion.",
      introduction:
        "The process begins with the seller's objective and the documents that govern income and site use, then connects those findings to pricing context, the likely buyer pool, and an organized transaction path.",
      steps: [
        {
          number: "01",
          title: "Read",
          body: "Organize leases, amendments, options, reimbursements, restrictions, operating history, site information, and known physical or environmental items.",
        },
        {
          number: "02",
          title: "Position",
          body: "Frame the asset's economics, trade-area role, site utility, likely buyer groups, valuation context, and material diligence questions.",
        },
        {
          number: "03",
          title: "Reach",
          body: "Launch coordinated materials and targeted outreach, qualify interest, manage property access, and compare offers beyond headline price.",
        },
        {
          number: "04",
          title: "Execute",
          body: "Coordinate lease, title, survey, estoppel, physical, environmental, financing, and closing milestones with ownership's appropriate advisors.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "Retail-specific preparation from lease file to closing file.",
      introduction:
        "The assignment keeps property positioning, buyer engagement, and diligence communication connected while legal, tax, engineering, environmental, and tenant-credit conclusions remain with qualified specialists.",
      items: [
        {
          icon: "economics",
          title: "Lease + Income Review",
          body: "An organized view of term, rent, escalations, options, reimbursements, guarantees, rights, and open document questions.",
        },
        {
          icon: "positioning",
          title: "Trade Area + Site Positioning",
          body: "Relevant customer, competition, access, visibility, parking, circulation, and physical-utility context tailored to the property.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A coordinated narrative, fact set, imagery, lease summary, and diligence pathway that separates verified facts from buyer assumptions.",
        },
        {
          icon: "prospects",
          title: "Buyer Targeting",
          body: "Outreach shaped for net-lease investors, private capital, operators, owner-users, or developers as the property's profile requires.",
        },
        {
          icon: "tours",
          title: "Access + Offer Management",
          body: "Property access, tenant-sensitive communication, feedback, and offer comparison managed around operating continuity.",
        },
        {
          icon: "execution",
          title: "Diligence + Closing Coordination",
          body: "A clear path for leases, estoppels, title, survey, physical records, environmental information, financing, and closing milestones.",
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
      {
        label: "See the Sale Process",
        href: "#office-sale-process",
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: "Office sale advisory stages",
    signals: ["Audit", "Model", "Market", "Close"],
  },
  sections: [
    {
      type: "challenge",
      watermark: "RELEVANCE",
      eyebrow: "The Office Value Story",
      headline: "Office space competes twice: for tenants and for capital.",
      body: [
        "Buyers test whether the building can retain and attract users as carefully as they test the in-place income. Lease expirations, tenant credit, renewal probability, submarket alternatives, suite condition, amenities, parking, access, and the cost to prepare space can all change how future cash flow is priced.",
        "A credible sale process makes that exposure visible. It connects the rent roll to the physical asset, separates contracted income from leasing assumptions, and presents the opportunity to buyers whose strategy and capital can address the property's actual occupancy profile.",
      ],
      emphasis:
        "The goal is not to minimize rollover or capital needs. It is to show buyers how the building competes and what execution requires.",
      pressures: [
        {
          number: "01",
          title: "Rollover",
          body: "Lease expirations, options, contraction rights, subleases, and tenant concentration shape income durability.",
        },
        {
          number: "02",
          title: "Leasing Capital",
          body: "Tenant improvements, commissions, free rent, downtime, and suite work affect the real cost of occupancy changes.",
        },
        {
          number: "03",
          title: "Competitiveness",
          body: "Location, parking, access, floor plates, systems, amenities, and space quality influence tenant demand and exit liquidity.",
        },
      ],
    },
    {
      type: "strategy",
      eyebrow: "Buyer Underwriting",
      headline: "Frame the office asset around its occupancy path.",
      introduction:
        "A stabilized single-tenant property, a diversified multi-tenant building, a medical-office asset, and a vacant owner-user opportunity do not carry the same risk or buyer audience. Positioning must follow the documented lease profile and the work needed to sustain or rebuild occupancy.",
      media: {
        src: officeInvestmentSales,
        alt: "Wide view of a modern office property showing floor plates, entrance, and parking access",
        position: "center 57%",
      },
      tracks: [
        {
          number: "01",
          label: "Stabilized Income",
          title: "Show what is contracted—and what could change.",
          body: "For leased assets, buyers need a consistent view of tenancy, rent, reimbursements, options, expirations, guarantees, and the obligations that affect net income.",
          points: [
            "Tenant roster, credit context, and concentration",
            "Rent, escalations, and expense recoveries",
            "Options, expirations, and rollover schedule",
            "Landlord obligations and near-term capital",
          ],
        },
        {
          number: "02",
          label: "Lease-Up + Repositioning",
          title: "Make the cost of the next lease visible.",
          body: "When value depends on renewal, backfill, owner occupancy, conversion, or repositioning, the strategy must account for space condition, market competition, time, and capital rather than treating upside as automatic.",
          points: [
            "Available suites and delivery condition",
            "Tenant-improvement and commission assumptions",
            "Downtime, absorption, and competing inventory",
            "Alternative-use and approval questions",
          ],
        },
      ],
    },
    {
      type: "process",
      id: "office-sale-process",
      eyebrow: "The Office Sale Process",
      headline: "Make occupancy risk understandable before buyers price uncertainty.",
      introduction:
        "The process brings leases, operations, space condition, market position, and ownership objectives together before outreach, then keeps buyer communication and diligence moving against a clear transaction plan.",
      steps: [
        {
          number: "01",
          title: "Audit",
          body: "Organize leases, amendments, rent roll, operating history, capital records, suite condition, vendor information, and known property diligence.",
        },
        {
          number: "02",
          title: "Model",
          body: "Frame contracted income, rollover, leasing exposure, capital requirements, market context, buyer groups, and the assumptions requiring verification.",
        },
        {
          number: "03",
          title: "Market",
          body: "Launch coordinated materials and targeted outreach, manage tenant-sensitive access and questions, and compare offers on economics and certainty.",
        },
        {
          number: "04",
          title: "Close",
          body: "Coordinate lease, estoppel, title, survey, physical, environmental, financing, and closing milestones with ownership's legal and technical advisors.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "Preparation for the questions office buyers ask first.",
      introduction:
        "The assignment connects lease and occupancy analysis to property positioning and buyer execution while legal, tax, engineering, environmental, accessibility, and code conclusions remain with qualified specialists.",
      items: [
        {
          icon: "economics",
          title: "Lease + Rollover Review",
          body: "An organized view of tenancy, rent, options, expirations, reimbursements, obligations, concentration, and near-term income exposure.",
        },
        {
          icon: "positioning",
          title: "Space + Market Positioning",
          body: "Suite condition, building systems, amenities, parking, access, location, and competing inventory considered against likely user demand.",
        },
        {
          icon: "marketing",
          title: "Offering Materials",
          body: "A coordinated property narrative, rent-roll summary, imagery, capital context, and diligence roadmap that distinguishes facts from assumptions.",
        },
        {
          icon: "prospects",
          title: "Buyer Segmentation",
          body: "Targeted outreach to income investors, private capital, medical-office buyers, owner-users, or repositioning groups as the asset requires.",
        },
        {
          icon: "tours",
          title: "Access + Offer Management",
          body: "Property and suite access, tenant communication, information requests, feedback, and offer comparison managed with appropriate discretion.",
        },
        {
          icon: "execution",
          title: "Diligence Coordination",
          body: "A clear path for leases, estoppels, financial records, contracts, physical reports, title, survey, financing, and closing milestones.",
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
