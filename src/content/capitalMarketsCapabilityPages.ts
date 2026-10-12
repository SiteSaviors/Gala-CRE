import capitalMarketsStrategy from "@/assets/capital-markets-strategy.webp";
import capitalStrategyContext from "@/assets/capital-strategy-context.webp";
import capitalStrategyHero from "@/assets/capital-strategy-hero.webp";
import debtUnderwritingContext from "@/assets/debt-underwriting-context.webp";
import equityAdvisoryHero from "@/assets/equity-advisory-hero.webp";
import equityAlignmentContext from "@/assets/equity-alignment-context.webp";
import transactionControlContext from "@/assets/transaction-control-context.webp";
import transactionCoordination from "@/assets/transaction-coordination.webp";
import type {
  CapabilityPageContent,
  CapabilityPageSection,
} from "@/content/capabilityPages";

type StrategySection = Extract<CapabilityPageSection, { type: "strategy" }>;
type ProcessSection = Extract<CapabilityPageSection, { type: "process" }>;
type DeliverablesSection = Extract<CapabilityPageSection, { type: "deliverables" }>;

type CapitalPageInput = {
  slug: string;
  focus: string;
  title: string;
  metadataDescription: string;
  heroLead: string;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  primaryLabel: string;
  strategy: StrategySection;
  process: ProcessSection;
  deliverables: DeliverablesSection;
  relatedHeadline: string;
  relatedIntroduction: string;
  relatedLinks: CapabilityPageContent["relatedCapabilities"]["links"];
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaBody: string;
};

const createCapitalPage = ({
  slug,
  focus,
  title,
  metadataDescription,
  heroLead,
  heroImage,
  heroAlt,
  heroPosition,
  primaryLabel,
  strategy,
  process,
  deliverables,
  relatedHeadline,
  relatedIntroduction,
  relatedLinks,
  ctaEyebrow,
  ctaHeadline,
  ctaBody,
}: CapitalPageInput): CapabilityPageContent => {
  const inquiryHref = `/contact?inquiry=capital-markets&focus=${focus}`;

  return {
    path: `/services/capital-markets/${slug}`,
    compact: true,
    metadata: {
      title,
      description: metadataDescription,
      image: heroImage,
    },
    parent: { label: "Capital Markets", href: "/services/capital-markets" },
    hero: {
      eyebrow: `Capital Markets · ${title}`,
      title,
      lead: heroLead,
      media: { src: heroImage, alt: heroAlt, position: heroPosition },
      actions: [
        {
          label: primaryLabel,
          href: inquiryHref,
          variant: "primary",
          icon: "arrow-up-right",
        },
      ],
      signalLabel: `${title} stages`,
      signals: [],
    },
    sections: [strategy, process, deliverables],
    relatedCapabilities: {
      eyebrow: "Connected Gala Capabilities",
      headline: relatedHeadline,
      introduction: relatedIntroduction,
      links: relatedLinks,
    },
    cta: {
      eyebrow: ctaEyebrow,
      headline: ctaHeadline,
      body: ctaBody,
      actions: [
        {
          label: primaryLabel,
          href: inquiryHref,
          variant: "primary",
          icon: "arrow-up-right",
        },
      ],
    },
  };
};

const debt = createCapitalPage({
  slug: "debt",
  focus: "debt",
  title: "Debt Advisory",
  metadataDescription:
    "Commercial real estate debt advisory focused on lender fit, financing terms, diligence, and execution around the asset and business plan.",
  heroLead:
    "Build the financing request around the asset, sponsorship, repayment path, and timing—not a generic lender list.",
  heroImage: capitalMarketsStrategy,
  heroAlt:
    "Anonymous commercial real estate professionals reviewing generic financing materials and property plans",
  heroPosition: "center 52%",
  primaryLabel: "Discuss a Financing Need",
  strategy: {
    type: "strategy",
    eyebrow: "The Financing Decision",
    headline: "The best execution is more than the lowest quoted rate.",
    introduction:
      "Gala organizes the financing case, lender fit, structural tradeoffs, and closing path while lenders make credit decisions and specialist conclusions remain with the appropriate advisors.",
    media: {
      src: debtUnderwritingContext,
      alt: "Anonymous advisors reviewing a generic lender term sheet and commercial property underwriting",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Lender Fit",
        title: "Match the request to the relevant capital universe.",
        body: "Asset type, loan purpose, geography, scale, sponsorship, leverage, and risk profile shape which debt sources may fit.",
        points: [],
      },
      {
        number: "02",
        label: "Full Terms",
        title: "Compare structure—not coupon alone.",
        body: "Proceeds, pricing, recourse, amortization, reserves, covenants, fees, prepayment, and extension rights affect the real outcome.",
        points: [],
      },
      {
        number: "03",
        label: "Closing Certainty",
        title: "Prepare for the conditions behind the quote.",
        body: "Property records, third-party reports, documentation, approvals, funding requirements, and timing determine execution risk.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "debt-process",
    eyebrow: "The Debt Advisory Process",
    headline: "Make the request financeable before it reaches the market.",
    introduction:
      "A focused process moves from a clear requirement to comparable terms and an organized closing path.",
    steps: [
      { number: "01", title: "Frame", body: "Define purpose, proceeds, sponsorship, business plan, repayment path, timing, and acceptable tradeoffs." },
      { number: "02", title: "Prepare", body: "Organize the property, financial, lease, borrower, development, and diligence materials lenders will test." },
      { number: "03", title: "Compare", body: "Engage relevant sources and evaluate economics, structure, conditions, flexibility, and certainty side by side." },
      { number: "04", title: "Close", body: "Coordinate commercial diligence, reports, documentation, funding conditions, milestones, and open decisions." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "A financing process built for clear decisions.",
    introduction:
      "Capital availability and terms are never guaranteed. The work is designed to improve preparation, comparison, and execution visibility.",
    items: [
      { icon: "positioning", title: "Financing Brief", body: "Purpose, requested proceeds, asset position, sponsorship, business plan, timing, and structural priorities." },
      { icon: "marketing", title: "Lender Package", body: "A consistent financing narrative and organized property, sponsor, financial, and diligence record." },
      { icon: "economics", title: "Outreach + Term Comparison", body: "Focused lender engagement and a clear view of economics, structure, conditions, and certainty." },
      { icon: "execution", title: "Diligence + Closing Control", body: "Open-item and milestone coordination across lender review, reports, documents, conditions, and funding." },
    ],
  },
  relatedHeadline: "Keep financing connected to the ownership plan.",
  relatedIntroduction:
    "Move into equity, capital sequencing, transaction control, or development oversight when those decisions shape the debt requirement.",
  relatedLinks: [
    { label: "Capital Markets", title: "Equity", body: "Test sponsor and investor alignment alongside the financing structure.", href: "/services/capital-markets/equity" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Sequence debt, equity, reserves, and funding milestones around the business plan.", href: "/services/capital-markets/capital-strategy" },
    { label: "Capital Markets", title: "Joint Venture", body: "Connect partner alignment, governance, and future funding to the financing structure.", href: "/services/capital-markets/joint-venture" },
    { label: "Development", title: "GC / Builder Relationships", body: "Connect project scope, schedule, and construction relationships to the financing path.", href: "/services/development-services/gc-builder-relationships" },
  ],
  ctaEyebrow: "Start With the Requirement",
  ctaHeadline: "Define the financing need before approaching the market.",
  ctaBody:
    "Share the property, loan purpose, requested proceeds, sponsorship, business plan, timing, and current materials. Gala will begin with fit and readiness.",
});

const equity = createCapitalPage({
  slug: "equity",
  focus: "equity",
  title: "Equity Advisory",
  metadataDescription:
    "Commercial real estate equity advisory focused on the investment case, sponsor objectives, partner fit, structure, and diligence coordination.",
  heroLead:
    "Clarify the opportunity, sponsorship, risk, economics, and execution plan before testing investor alignment.",
  heroImage: equityAdvisoryHero,
  heroAlt:
    "Anonymous sponsor and investment professionals discussing a generic commercial real estate opportunity",
  heroPosition: "center",
  primaryLabel: "Discuss an Equity Need",
  strategy: {
    type: "strategy",
    eyebrow: "The Partnership Decision",
    headline: "Equity is a relationship around risk—not simply a funding gap.",
    introduction:
      "Gala helps sponsors organize the investment case and test relevant relationships while securities, legal, tax, accounting, valuation, and investment decisions remain with qualified parties.",
    media: {
      src: equityAlignmentContext,
      alt: "Anonymous professionals comparing a generic real estate investment structure around plans and a scale model",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Investment Case",
        title: "Make the opportunity and its risks legible.",
        body: "Basis, market, business plan, assumptions, capital need, milestones, risk, and exit should tell one consistent story.",
        points: [],
      },
      {
        number: "02",
        label: "Partner Fit",
        title: "Target mandate—not attention.",
        body: "Check size, strategy, geography, duration, risk appetite, return framework, and control needs shape relevance.",
        points: [],
      },
      {
        number: "03",
        label: "Alignment",
        title: "Surface partnership terms early.",
        body: "Economics, governance, reporting, future funding, decision rights, and exit provisions affect the working relationship.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "equity-process",
    eyebrow: "The Equity Advisory Process",
    headline: "Clarify the partnership before broadening the conversation.",
    introduction:
      "The process centers on a credible case, relevant relationships, and transparent comparison of fit and structure.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the capital need, sponsor contribution, business plan, risk, return framework, timing, and governance priorities." },
      { number: "02", title: "Prepare", body: "Organize the property, market, model, sponsorship, execution plan, diligence record, and assumptions." },
      { number: "03", title: "Align", body: "Engage relevant relationships and compare mandate, economics, control, reporting, timing, and working fit." },
      { number: "04", title: "Advance", body: "Coordinate commercial diligence, decisions, documentation, funding conditions, and the path to closing." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "An equity process centered on fit and transparency.",
    introduction:
      "No capital commitment or investment outcome is guaranteed, and Gala does not provide securities, legal, tax, accounting, or investment advice.",
    items: [
      { icon: "positioning", title: "Capital + Sponsor Brief", body: "The requirement, sponsor contribution, opportunity, plan, timing, risk, and partnership objectives." },
      { icon: "marketing", title: "Investment Narrative", body: "A consistent presentation of basis, market, assumptions, milestones, execution plan, and exit." },
      { icon: "prospects", title: "Relationship + Structure Review", body: "Focused engagement and comparison of mandate, contribution, economics, governance, reporting, and control." },
      { icon: "execution", title: "Diligence + Decision Support", body: "Organized information flow and milestone visibility through commercial diligence, documentation, and funding." },
    ],
  },
  relatedHeadline: "Keep partnership terms connected to the full capital plan.",
  relatedIntroduction:
    "Move into debt, capital sequencing, transaction control, or investment sales when those decisions shape investor fit.",
  relatedLinks: [
    { label: "Capital Markets", title: "Debt", body: "Evaluate lender fit and debt structure alongside the equity requirement.", href: "/services/capital-markets/debt" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Sequence debt and equity decisions around the business plan.", href: "/services/capital-markets/capital-strategy" },
    { label: "Capital Markets", title: "Joint Venture", body: "Clarify partner roles, governance, economics, and exit expectations alongside the equity requirement.", href: "/services/capital-markets/joint-venture" },
    { label: "Investment Sales", title: "Investment Sales", body: "Connect the acquisition or disposition thesis to the capital case.", href: "/services/investment-sales" },
  ],
  ctaEyebrow: "Start With the Investment Case",
  ctaHeadline: "Define what an aligned equity conversation requires.",
  ctaBody:
    "Share the opportunity, sponsor background, capital need, business plan, model, timing, and partnership objectives. Gala will begin with fit and preparation.",
});

const capitalStrategy = createCapitalPage({
  slug: "capital-strategy",
  focus: "capital-strategy",
  title: "Capital Strategy",
  metadataDescription:
    "Commercial real estate capital strategy aligning debt, equity, timing, risk, ownership objectives, and funding milestones.",
  heroLead:
    "Make the debt, equity, timing, and ownership tradeoffs visible before individual terms dictate the plan.",
  heroImage: capitalStrategyHero,
  heroAlt:
    "Anonymous commercial real estate professionals arranging generic capital and property decision materials",
  heroPosition: "center",
  primaryLabel: "Discuss a Capital Plan",
  strategy: {
    type: "strategy",
    eyebrow: "The Structure Decision",
    headline: "Capital choices change the business plan—and one another.",
    introduction:
      "Gala helps clients compare practical structures and sequence decisions around the asset plan while final investment, financing, legal, tax, and accounting conclusions remain with the client and qualified advisors.",
    media: {
      src: capitalStrategyContext,
      alt: "Anonymous advisor comparing generic commercial property capital scenarios with plans and a scale model",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Sources + Uses",
        title: "Map the requirement across time.",
        body: "Acquisition, development, reserves, carry, leasing, contingencies, refinance, and exit create different funding needs.",
        points: [],
      },
      {
        number: "02",
        label: "Risk + Control",
        title: "See what each structure changes.",
        body: "Leverage, recourse, covenants, dilution, governance, future funding, and flexibility alter ownership risk and control.",
        points: [],
      },
      {
        number: "03",
        label: "Sequence",
        title: "Put decisions against the execution calendar.",
        body: "Approvals, closing, construction, lease-up, stabilization, sale, and refinance determine the order and timing of capital decisions.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "capital-strategy-process",
    eyebrow: "The Capital Strategy Process",
    headline: "Build the structure around the real execution calendar.",
    introduction:
      "The process maps the requirement, tests practical alternatives, compares tradeoffs, and sequences the selected path.",
    steps: [
      { number: "01", title: "Map", body: "Define sources, uses, timing, asset position, sponsorship, ownership objectives, milestones, and constraints." },
      { number: "02", title: "Test", body: "Organize practical debt, equity, reserve, contingency, bridge, refinance, and exit scenarios." },
      { number: "03", title: "Compare", body: "Evaluate proceeds, pricing, recourse, governance, dilution, flexibility, conditions, and certainty." },
      { number: "04", title: "Sequence", body: "Establish decisions, information needs, market timing, funding milestones, dependencies, and next actions." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "A decision framework for the capital stack.",
    introduction:
      "The framework organizes alternatives and execution planning without replacing the client's underwriting, investment committee, or specialist review.",
    items: [
      { icon: "positioning", title: "Capital Requirement Map", body: "A time-based view of acquisition, development, operating, reserve, refinance, and exit needs." },
      { icon: "economics", title: "Scenario Comparison", body: "The commercial effects of practical debt, equity, leverage, contribution, reserve, and timing alternatives." },
      { icon: "prospects", title: "Capital-Source Readiness", body: "Relevant lender and investor profiles plus the narrative, model, and diligence record needed for outreach." },
      { icon: "execution", title: "Decision + Execution Roadmap", body: "Sequenced decisions, market windows, dependencies, funding milestones, documentation, and closing workstreams." },
    ],
  },
  relatedHeadline: "Carry the capital framework into execution.",
  relatedIntroduction:
    "Move directly into the debt, equity, partnership, or development workstream affecting the next decision.",
  relatedLinks: [
    { label: "Capital Markets", title: "Debt", body: "Prepare and run a lender process around the selected financing requirement.", href: "/services/capital-markets/debt" },
    { label: "Capital Markets", title: "Equity", body: "Organize the investment case and test partner fit.", href: "/services/capital-markets/equity" },
    { label: "Capital Markets", title: "Joint Venture", body: "Connect the selected capital path to partner economics, governance, and future funding decisions.", href: "/services/capital-markets/joint-venture" },
    { label: "Development", title: "GC / Builder Relationships", body: "Connect funding decisions to approvals, infrastructure, schedule, and construction relationships.", href: "/services/development-services/gc-builder-relationships" },
  ],
  ctaEyebrow: "See the Whole Capital Picture",
  ctaHeadline: "Organize the structure before the market narrows the choices.",
  ctaBody:
    "Share the opportunity, sources and uses, sponsorship, business plan, timing, assumptions, and ownership priorities. Gala will help frame the alternatives.",
});

const jointVenture = createCapitalPage({
  slug: "joint-venture",
  focus: "joint-venture",
  title: "Joint Venture",
  metadataDescription:
    "Commercial real estate joint venture advisory focused on partner fit, contributions, economics, governance, decision rights, reporting, and exit alignment.",
  heroLead:
    "Build the partnership around aligned capital, responsibilities, decision rights, and exit expectations—not funding alone.",
  heroImage: transactionCoordination,
  heroAlt:
    "Generic commercial real estate partnership workspace with plans, documents, and capital materials",
  heroPosition: "center 52%",
  primaryLabel: "Discuss a Joint Venture",
  strategy: {
    type: "strategy",
    eyebrow: "The Partnership Structure",
    headline: "Shared capital only works when the partnership is aligned.",
    introduction:
      "Gala helps clients organize the commercial framework and evaluate partner fit while legal, tax, securities, accounting, and investment conclusions remain with qualified parties.",
    media: {
      src: transactionControlContext,
      alt: "Anonymous commercial real estate partners coordinating a generic investment plan and decision record",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Partner Fit",
        title: "Align mandate before negotiating structure.",
        body: "Strategy, geography, scale, duration, risk appetite, operating role, and working style determine whether a partnership is worth advancing.",
        points: [],
      },
      {
        number: "02",
        label: "Economics + Control",
        title: "Make contributions and decision rights explicit.",
        body: "Capital contributions, distributions, future funding, governance, approvals, reporting, and control shape the working relationship.",
        points: [],
      },
      {
        number: "03",
        label: "Duration + Exit",
        title: "Plan for change before it becomes conflict.",
        body: "Business-plan milestones, hold period, transfer rights, exit expectations, defaults, and resolution mechanisms belong in the early alignment record.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "joint-venture-process",
    eyebrow: "The Joint Venture Process",
    headline: "Turn shared intent into an executable partnership.",
    introduction:
      "The process clarifies the opportunity, tests working fit, organizes commercial terms, and keeps the diligence path visible.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the opportunity, business plan, capital requirement, sponsor role, timing, risk, and partnership objectives." },
      { number: "02", title: "Evaluate", body: "Test relevant relationships against mandate, experience, working fit, contribution capacity, and decision expectations." },
      { number: "03", title: "Align", body: "Organize economics, roles, governance, reporting, future funding, exit expectations, and open commercial decisions." },
      { number: "04", title: "Advance", body: "Coordinate commercial diligence and milestones alongside the parties' legal, tax, securities, accounting, and investment advisors." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Partnership Decision Support",
    headline: "A clearer record before the partnership is documented.",
    introduction:
      "Gala supports commercial preparation and coordination; it does not provide legal, tax, securities, accounting, valuation, or investment advice.",
    items: [
      { icon: "positioning", title: "Partnership Brief", body: "The opportunity, business plan, capital need, parties, roles, timing, risk, and desired working relationship." },
      { icon: "prospects", title: "Partner-Fit Review", body: "A focused comparison of mandate, experience, contribution capacity, working style, and strategic alignment." },
      { icon: "economics", title: "Commercial Alignment Record", body: "Contributions, economics, governance, approvals, reporting, future funding, duration, and exit expectations." },
      { icon: "execution", title: "Diligence + Decision Path", body: "Information needs, open questions, specialist workstreams, responsibilities, milestones, and closing dependencies." },
    ],
  },
  relatedHeadline: "Keep partnership decisions connected to the capital plan.",
  relatedIntroduction:
    "Move directly into the debt, equity, capital-strategy, or development workstream affecting partner alignment.",
  relatedLinks: [
    { label: "Capital Markets", title: "Debt", body: "Evaluate lender fit and debt structure alongside partner contributions.", href: "/services/capital-markets/debt" },
    { label: "Capital Markets", title: "Equity", body: "Organize the investment case and test broader investor alignment.", href: "/services/capital-markets/equity" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Sequence debt, equity, reserves, and funding milestones around the business plan.", href: "/services/capital-markets/capital-strategy" },
    { label: "Development", title: "GC / Builder Relationships", body: "Connect project requirements and construction relationships to partner decisions.", href: "/services/development-services/gc-builder-relationships" },
  ],
  ctaEyebrow: "Start With Alignment",
  ctaHeadline: "Clarify what the partnership must accomplish before documenting the structure.",
  ctaBody:
    "Share the opportunity, capital requirement, business plan, proposed roles, timing, and current partnership questions. Gala will help organize the commercial framework.",
});

export const capitalCapabilityPages = [
  debt,
  equity,
  jointVenture,
  capitalStrategy,
];
