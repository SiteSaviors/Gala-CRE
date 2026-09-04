import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import galaCapitalCapability from "@/assets/gala-capital-capability.webp";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";

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
  parent: { label: "GalaBroker", href: "/services/brokerage" },
  hero: {
    eyebrow: "GalaBroker · Landlord Representation",
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
        label: "GalaBroker",
        title: "Tenant Representation",
        body: "A disciplined occupier-side process for businesses evaluating and securing commercial space.",
        href: "/services/brokerage/tenant-representation",
      },
      {
        label: "GalaSales",
        title: "Investment Sales",
        body: "Disposition and acquisition strategy for commercial owners and private investors.",
        href: "/services/investment-sales",
      },
      {
        label: "GalaDevelop",
        title: "Development Services",
        body: "Early-stage strategy and coordination for properties with development or repositioning potential.",
        href: "/services/development-services",
      },
      {
        label: "GalaCapital",
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
  parent: { label: "GalaBroker", href: "/services/brokerage" },
  hero: {
    eyebrow: "GalaBroker · Tenant Representation",
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
        label: "GalaBroker",
        title: "Landlord Representation",
        body: "Owner-focused positioning, marketing, tenant qualification, and lease execution.",
        href: "/services/brokerage/landlord-representation",
      },
      {
        label: "GalaSales",
        title: "Investment Sales",
        body: "Commercial acquisition and disposition strategy for owners and private investors.",
        href: "/services/investment-sales",
      },
      {
        label: "GalaDevelop",
        title: "Development Services",
        body: "Site strategy and coordination when an occupancy need involves development or repositioning.",
        href: "/services/development-services",
      },
      {
        label: "GalaCapital",
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

export const capabilityPages: CapabilityPageContent[] = [
  landlordRepresentation,
  tenantRepresentation,
];

export const capabilityPageByPath: Record<string, CapabilityPageContent> = Object.fromEntries(
  capabilityPages.map((page) => [page.path, page]),
);

export const findCapabilityPageContent = (serviceSlug: string, capabilitySlug: string) =>
  capabilityPageByPath[`/services/${serviceSlug}/${capabilitySlug}`];
