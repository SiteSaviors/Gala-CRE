import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import industrialInteriorOperations from "@/assets/industrial-interior-operations.webp";
import industrialInvestmentSales from "@/assets/industrial-investment-sales.webp";
import landlordLeasingContext from "@/assets/landlord-leasing-context.webp";
import multifamilyOperationsContext from "@/assets/multifamily-operations-context.webp";
import multifamilyInvestmentSales from "@/assets/multifamily-investment-sales.webp";
import officeOccupancyContext from "@/assets/office-occupancy-context.webp";
import officeInvestmentSales from "@/assets/office-investment-sales.webp";
import retailAccessContext from "@/assets/retail-access-context.webp";
import retailInvestmentSales from "@/assets/retail-investment-sales.webp";
import tenantRepresentationHero from "@/assets/tenant-representation-hero.webp";
import tenantSiteEvaluationContext from "@/assets/tenant-site-evaluation-context.webp";
import { propertyManagementCapabilityPage } from "@/content/capitalCapabilityPages";
import { capitalCapabilityPages } from "@/content/capitalMarketsCapabilityPages";
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
  compact: true,
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
    ],
    signalLabel: "Landlord representation stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Leasing Decision",
      headline: "Position the space around the owner’s real objective.",
      introduction:
        "Gala connects the ownership plan, market position, and prospect quality so lease-up decisions account for income, risk, flexibility, and long-term asset value—not occupancy alone.",
      media: {
        src: landlordLeasingContext,
        alt: "Anonymous owner and leasing advisor evaluating a vacant commercial suite",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Ownership Plan",
          title: "Define what the lease must accomplish.",
          body: "Hold period, cash-flow priorities, future sale or repositioning plans, acceptable uses, delivery scope, and flexibility shape the assignment.",
          points: [],
        },
        {
          number: "02",
          label: "Market Position",
          title: "Compete on more than asking rent.",
          body: "Availability, demand, physical readiness, use, access, timing, concessions, and competing inventory determine how the space should enter the market.",
          points: [],
        },
        {
          number: "03",
          label: "Tenant Quality",
          title: "Evaluate the prospect behind the proposal.",
          body: "Use compatibility, financial readiness, delivery needs, timing, obligations, and the complete economics help ownership compare fit and execution risk.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "leasing-process",
      eyebrow: "The Leasing Process",
      headline: "Move from availability to an informed lease decision.",
      introduction:
        "One accountable process carries the owner’s priorities from initial positioning through market response, proposal comparison, and execution.",
      steps: [
        {
          number: "01",
          title: "Diagnose",
          body: "Clarify the asset, ownership objective, target users, physical readiness, timing, and acceptable deal parameters.",
        },
        {
          number: "02",
          title: "Position + Launch",
          body: "Set the pricing and leasing story, prepare the materials, and activate the channels most relevant to likely prospects and brokers.",
        },
        {
          number: "03",
          title: "Qualify + Tour",
          body: "Manage inquiries, use and readiness checks, property access, follow-up, and market feedback with clear ownership visibility.",
        },
        {
          number: "04",
          title: "Negotiate + Execute",
          body: "Compare complete proposals, negotiate business terms, and coordinate the LOI and lease path with ownership and counsel.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "One owner-side assignment from strategy through execution.",
      introduction:
        "Dedicated representation keeps positioning, market response, tenant qualification, proposal economics, and negotiation connected to the same ownership objective.",
      items: [
        {
          icon: "positioning",
          title: "Leasing Strategy",
          body: "Competitive context, target users, pricing and concession parameters, physical readiness, and a clear launch recommendation.",
        },
        {
          icon: "marketing",
          title: "Marketing + Outreach",
          body: "A concise leasing story, coordinated materials, listing-channel exposure, broker engagement, and direct prospecting where relevant.",
        },
        {
          icon: "prospects",
          title: "Prospect + Proposal Management",
          body: "Qualification, tours, follow-up, feedback, and side-by-side comparison of use, readiness, timing, obligations, and economics.",
        },
        {
          icon: "execution",
          title: "Negotiation + Execution",
          body: "Business-term strategy, LOI coordination, and an organized path through lease documentation with ownership and counsel.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Connect leasing to the ownership plan.",
    introduction:
      "Move into investment sales, development, capital, or property operations when those decisions shape the leasing assignment.",
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
        title: "Development",
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
    headline: "Build the leasing strategy around the asset and ownership plan.",
    body:
      "Share what is available, where the property stands today, what ownership needs the lease to accomplish, and the timing behind the decision.",
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
  compact: true,
  metadata: {
    title: "Tenant Representation",
    description:
      "Business-led tenant representation across Raleigh-Durham and the Research Triangle, from occupancy requirements and site selection through lease execution.",
    image: tenantRepresentationHero,
  },
  parent: { label: "Brokerage", href: "/services/brokerage" },
  hero: {
    eyebrow: "Brokerage · Tenant Representation",
    title: "Tenant Representation",
    lead:
      "Turn real estate into a business decision with a search, comparison, and negotiation process built around how your company operates.",
    media: {
      src: tenantRepresentationHero,
      alt: "Anonymous business leaders and a commercial real estate advisor touring a vacant commercial space",
      position: "center",
    },
    actions: [
      {
        label: "Discuss Your Space",
        href: "/contact?inquiry=tenant-representation",
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
    signalLabel: "Tenant representation stages",
    signals: [],
  },
  sections: [
    {
      type: "strategy",
      eyebrow: "The Occupancy Decision",
      headline: "Choose space through the lens of the business.",
      introduction:
        "Gala represents the tenant’s interests exclusively, turning operating requirements, market alternatives, total occupancy cost, and timing into one comparable decision.",
      media: {
        src: tenantSiteEvaluationContext,
        alt: "Anonymous business decision-makers comparing commercial occupancy options with an advisor",
        position: "center",
      },
      tracks: [
        {
          number: "01",
          label: "Operational Fit",
          title: "Start with how the business must function.",
          body: "Geography, access, layout, infrastructure, customer and employee needs, approvals, and delivery conditions define the real requirement.",
          points: [],
        },
        {
          number: "02",
          label: "Occupancy Economics",
          title: "Compare the complete cost—not rent alone.",
          body: "Base rent, escalations, operating expenses, concessions, improvements, downtime, move costs, and obligations shape the financial decision.",
          points: [],
        },
        {
          number: "03",
          label: "Alternatives + Timing",
          title: "Test staying against moving.",
          body: "Renewal, relocation, expansion, contraction, and ownership alternatives should be evaluated before the current lease or market dictates the answer.",
          points: [],
        },
      ],
    },
    {
      type: "process",
      id: "tenant-search-process",
      eyebrow: "The Occupancy Process",
      headline: "Move from requirement to an executable occupancy plan.",
      introduction:
        "The search begins with a business brief, not an availability list, then advances through disciplined comparison, tenant-side negotiation, and occupancy coordination.",
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
          title: "Compare + Negotiate",
          body: "Test property fit and total occupancy economics, structure the LOI, and negotiate business terms from the tenant’s side of the table.",
        },
        {
          number: "04",
          title: "Coordinate Occupancy",
          body: "Track lease, delivery, construction, approvals, move timing, and other dependencies with the tenant and its specialist teams.",
        },
      ],
    },
    {
      type: "deliverables",
      eyebrow: "Services + Deliverables",
      headline: "A tenant-side record your team can act on.",
      introduction:
        "Requirements, options, economics, negotiations, and occupancy milestones stay connected to the same business objective.",
      items: [
        {
          icon: "positioning",
          title: "Requirements + Market Brief",
          body: "A practical definition of use, geography, physical needs, timing, budget, future flexibility, and relevant market context.",
        },
        {
          icon: "prospects",
          title: "Site Search + Tour Plan",
          body: "A focused field of viable options, organized property information, coordinated tours, observations, and follow-up against the brief.",
        },
        {
          icon: "economics",
          title: "Option + Cost Comparison",
          body: "Side-by-side evaluation of operational fit, rent, operating expenses, concessions, improvements, timing, obligations, and transition costs.",
        },
        {
          icon: "execution",
          title: "Tenant-Side Negotiation + Coordination",
          body: "LOI and business-term strategy plus an organized path through lease review, delivery, construction, approvals, and occupancy with counsel and specialists.",
        },
      ],
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    headline: "Connect occupancy to the larger business decision.",
    introduction:
      "Move into ownership, development, or capital workstreams when the requirement extends beyond a conventional lease.",
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
        title: "Site Strategy",
        body: "Site strategy and coordination when an occupancy need involves development or repositioning.",
        href: "/services/development-services/site-strategy",
      },
      {
        label: "Capital Markets",
        title: "Debt Advisory",
        body: "Financing strategy when acquisition or owner occupancy becomes part of the comparison.",
        href: "/services/capital-markets/debt",
      },
    ],
  },
  cta: {
    eyebrow: "Start With the Requirement",
    headline: "Clarify what the business needs before the market shapes the answer.",
    body:
      "Share what is changing, what the space must support, the current lease timeline, target geography, budget, and the alternatives already under consideration.",
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
