import capitalMarketsStrategy from "@/assets/capital-markets-strategy.webp";
import propertyManagementPartnership from "@/assets/property-management-partnership.webp";
import transactionCoordination from "@/assets/transaction-coordination.webp";
import { buildCapabilityPage } from "@/content/capabilityPageBlueprint";

const debt = buildCapabilityPage({
  path: "/services/capital-markets/debt",
  parent: { label: "GalaCapital", href: "/services/capital-markets" },
  image: capitalMarketsStrategy,
  metadataDescription:
    "Commercial real estate debt advisory organizing the financing request, lender fit, term comparison, diligence, and closing coordination around the asset and business plan.",
  hero: {
    eyebrow: "GalaCapital · Debt",
    title: "Debt Advisory",
    lead:
      "Build a financing process around the asset, sponsorship, business plan, repayment profile, and timing—not a generic lender list.",
    alt: "Generic commercial real estate financing meeting with plans, property imagery, and underwriting materials",
    position: "center 52%",
    primaryLabel: "Discuss a Financing Need",
    inquiryHref: "/contact?inquiry=capital-markets&focus=debt",
    processLabel: "See the Financing Process",
    processId: "debt-process",
    signalLabel: "Debt advisory stages",
    signals: ["Frame", "Prepare", "Engage", "Close"],
  },
  challenge: {
    watermark: "TERMS",
    eyebrow: "The Financing Decision",
    headline: "The lowest quoted rate is not always the best execution.",
    body: [
      "Leverage, proceeds, recourse, amortization, covenants, reserves, prepayment, timing, fees, extension rights, reporting, and lender certainty can matter as much as coupon. Those terms must also fit the property's income, condition, lease profile, development plan, and exit strategy.",
      "Gala helps sponsors organize the financing case, approach relevant capital relationships, compare executable alternatives, and coordinate the commercial process alongside legal, tax, accounting, appraisal, and technical advisors.",
    ],
    emphasis:
      "Capital availability and terms are never guaranteed. The objective is a better-prepared request and a clearer comparison of real options.",
    pressures: [
      { number: "01", title: "Lender Fit", body: "Asset type, loan purpose, geography, size, sponsorship, leverage, and risk profile narrow the relevant capital universe." },
      { number: "02", title: "Structure", body: "Proceeds, pricing, amortization, recourse, covenants, reserves, and prepayment shape the full financing outcome." },
      { number: "03", title: "Execution", body: "Documentation, third-party reports, appraisal, lender diligence, conditions, and timing can determine closing certainty." },
    ],
  },
  process: {
    eyebrow: "The Debt Advisory Process",
    headline: "Make the request financeable before it reaches the market.",
    introduction:
      "Gala frames the requirement, prepares a consistent lender story, manages focused outreach, and helps keep diligence and decisions moving toward closing.",
    steps: [
      { number: "01", title: "Frame", body: "Define loan purpose, proceeds, timing, asset position, sponsorship, business plan, repayment path, and acceptable structural tradeoffs." },
      { number: "02", title: "Prepare", body: "Organize the property, financial, lease, development, borrower, and diligence information needed for a credible financing request." },
      { number: "03", title: "Engage", body: "Approach relevant debt sources, manage questions, clarify proposals, and compare economics, structure, conditions, and certainty." },
      { number: "04", title: "Close", body: "Coordinate the commercial timeline across lender diligence, reports, documentation, conditions, funding requirements, and closing parties." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A financing process organized for decision and execution.",
    introduction:
      "Gala provides capital-market guidance and coordination; lenders make credit decisions, and clients rely on their legal, tax, accounting, insurance, and technical advisors for specialist conclusions.",
    items: [
      { icon: "positioning", title: "Financing Requirement", body: "A clear brief covering purpose, requested proceeds, asset, sponsorship, business plan, timing, and structural priorities." },
      { icon: "marketing", title: "Lender Presentation", body: "A consistent commercial narrative and information package built from verified property and sponsor materials." },
      { icon: "prospects", title: "Debt-Source Outreach", body: "Focused engagement with lender types and relationships relevant to the request's size, profile, geography, and risk." },
      { icon: "economics", title: "Term Comparison", body: "Side-by-side review of proceeds, pricing, amortization, recourse, reserves, covenants, fees, prepayment, and conditions." },
      { icon: "tours", title: "Lender Diligence Support", body: "Organized communication around property access, third-party reports, information requests, underwriting, and approvals." },
      { icon: "execution", title: "Closing Coordination", body: "Milestone and open-item management across term acceptance, documentation, conditions, funding, and closing." },
    ],
  },
  related: {
    headline: "Debt should support the broader ownership plan.",
    introduction:
      "Gala can connect financing to the equity, development, acquisition, disposition, and transaction work that shapes the capital requirement.",
    links: [
      { label: "GalaCapital", title: "Equity", body: "Organize the investment case and evaluate whether outside equity fits the opportunity.", href: "/services/capital-markets/equity" },
      { label: "GalaCapital", title: "Capital Strategy", body: "Compare debt, equity, timing, and funding dependencies before choosing a structure.", href: "/services/capital-markets/capital-strategy" },
      { label: "GalaCapital", title: "Transaction Coordination", body: "Keep lender diligence, documentation, conditions, and closing milestones visible.", href: "/services/capital-markets/transaction-coordination" },
      { label: "GalaDevelop", title: "Development Oversight", body: "Connect development scope, decisions, schedule, and reporting to the capital plan.", href: "/services/development-services/development-oversight" },
    ],
  },
  cta: {
    eyebrow: "Start With the Requirement",
    headline: "Let’s define the financing need before approaching the market.",
    body:
      "Share the property, loan purpose, requested proceeds, business plan, sponsorship, timing, and current materials. Gala will begin with lender fit and the information needed to support the request.",
  },
});

const equity = buildCapabilityPage({
  path: "/services/capital-markets/equity",
  parent: { label: "GalaCapital", href: "/services/capital-markets" },
  image: capitalMarketsStrategy,
  metadataDescription:
    "Commercial real estate equity advisory organizing the investment case, sponsor objectives, structure, investor fit, diligence, and process coordination.",
  hero: {
    eyebrow: "GalaCapital · Equity",
    title: "Equity Advisory",
    lead:
      "Present the opportunity, sponsorship, risk, economics, and execution plan clearly enough to test real alignment.",
    alt: "Generic commercial property investment meeting with underwriting, plans, and a small architectural model",
    position: "center 46%",
    primaryLabel: "Discuss an Equity Need",
    inquiryHref: "/contact?inquiry=capital-markets&focus=equity",
    processLabel: "See the Equity Process",
    processId: "equity-process",
    signalLabel: "Equity advisory stages",
    signals: ["Define", "Prepare", "Align", "Advance"],
  },
  challenge: {
    watermark: "ALIGN",
    eyebrow: "The Partnership Decision",
    headline: "Equity is a relationship around risk—not simply a funding gap.",
    body: [
      "Outside equity introduces shared economics, control rights, reporting, decision thresholds, business-plan expectations, hold-period assumptions, and exit alignment. A compelling property alone does not resolve those partnership questions.",
      "Gala helps sponsors organize the investment case and engage relevant relationships while securities, legal, tax, accounting, valuation, and investment decisions remain with qualified advisors and the parties involved.",
    ],
    emphasis:
      "No capital commitment or investment outcome is guaranteed. Fit depends on the opportunity, sponsor, structure, diligence, and investor mandate.",
    pressures: [
      { number: "01", title: "Investment Case", body: "Basis, business plan, market, assumptions, risks, capital needs, milestones, and exit must tell one consistent story." },
      { number: "02", title: "Partner Fit", body: "Check size, strategy, geography, risk appetite, control needs, duration, and return expectations shape relevance." },
      { number: "03", title: "Alignment", body: "Governance, economics, reporting, future funding, decision rights, and exit provisions affect the working partnership." },
    ],
  },
  process: {
    eyebrow: "The Equity Advisory Process",
    headline: "Clarify the partnership before broadening the conversation.",
    introduction:
      "Gala frames the capital need and sponsor objectives, prepares the commercial story, coordinates focused dialogue, and keeps fit and open items visible as the process advances.",
    steps: [
      { number: "01", title: "Define", body: "Clarify required equity, sponsor contribution, business plan, timing, return framework, risk, governance priorities, and alternatives." },
      { number: "02", title: "Prepare", body: "Organize the property, market, financial model, sponsorship, execution plan, diligence record, and assumptions into a consistent case." },
      { number: "03", title: "Align", body: "Engage relevant relationships, manage questions, compare structures, and test mandate, economics, control, timing, and working fit." },
      { number: "04", title: "Advance", body: "Coordinate commercial diligence, information flow, decision milestones, legal documentation, funding conditions, and the path to closing." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "An equity process centered on fit and transparency.",
    introduction:
      "Gala coordinates the commercial capital process and does not provide securities, legal, tax, accounting, or investment advice.",
    items: [
      { icon: "positioning", title: "Capital + Sponsor Brief", body: "A clear statement of the equity requirement, sponsor contribution, opportunity, plan, timing, and partnership objectives." },
      { icon: "marketing", title: "Investment Narrative", body: "A consistent presentation of basis, market, operating or development plan, assumptions, milestones, risks, and exit." },
      { icon: "prospects", title: "Relationship Targeting", body: "Focused engagement with equity relationships whose mandate may fit the opportunity's scale, geography, strategy, and risk." },
      { icon: "economics", title: "Structure Comparison", body: "Commercial comparison of contribution, priority, sharing, fees, governance, reporting, future capital, and exit concepts." },
      { icon: "tours", title: "Diligence Coordination", body: "Organized access to property, sponsor, market, financial, technical, approval, and execution information." },
      { icon: "execution", title: "Decision + Closing Support", body: "Milestone visibility across indication, diligence, documentation, conditions, funding, and transaction parties." },
    ],
  },
  related: {
    headline: "Equity is one part of the capital and execution plan.",
    introduction:
      "Gala can connect the partnership discussion to debt, development, transaction, and investment-sales decisions when they materially affect structure or timing.",
    links: [
      { label: "GalaCapital", title: "Debt", body: "Evaluate lender fit and debt terms alongside the proposed equity structure.", href: "/services/capital-markets/debt" },
      { label: "GalaCapital", title: "Capital Strategy", body: "Sequence debt and equity decisions around the business plan and funding milestones.", href: "/services/capital-markets/capital-strategy" },
      { label: "GalaCapital", title: "Transaction Coordination", body: "Organize cross-party diligence, conditions, documentation, and closing milestones.", href: "/services/capital-markets/transaction-coordination" },
      { label: "GalaSales", title: "Investment Sales", body: "Connect acquisition or disposition strategy to the investment thesis and capital plan.", href: "/services/investment-sales" },
    ],
  },
  cta: {
    eyebrow: "Start With the Investment Case",
    headline: "Let’s determine what an aligned equity conversation requires.",
    body:
      "Share the opportunity, sponsor background, capital need, business plan, model, timing, and partnership objectives. Gala will begin with fit, preparation, and the questions investors are likely to test.",
  },
});

const capitalStrategy = buildCapabilityPage({
  path: "/services/capital-markets/capital-strategy",
  parent: { label: "GalaCapital", href: "/services/capital-markets" },
  image: capitalMarketsStrategy,
  metadataDescription:
    "Commercial real estate capital strategy aligning debt, equity, timing, risk, ownership objectives, funding milestones, and execution alternatives.",
  hero: {
    eyebrow: "GalaCapital · Capital Strategy",
    title: "Capital Strategy",
    lead:
      "Make the debt, equity, timing, and ownership tradeoffs visible before individual terms dictate the plan.",
    alt: "Generic commercial real estate capital strategy session with property plans and underwriting materials",
    position: "center 58%",
    primaryLabel: "Discuss a Capital Plan",
    inquiryHref: "/contact?inquiry=capital-markets&focus=capital-strategy",
    processLabel: "See the Strategy Process",
    processId: "capital-strategy-process",
    signalLabel: "Capital strategy stages",
    signals: ["Map", "Model", "Compare", "Sequence"],
  },
  challenge: {
    watermark: "STACK",
    eyebrow: "The Structure Decision",
    headline: "Capital choices change the business plan—and one another.",
    body: [
      "More leverage may reduce equity but add recourse, reserves, covenants, or refinance exposure. New equity may improve capacity while changing economics, governance, reporting, and exit decisions. Timing gaps can create additional funding needs even when the end-state structure appears sound.",
      "Gala helps clients organize those relationships around the asset and execution plan before evaluating individual proposals in isolation.",
    ],
    emphasis:
      "Capital strategy is scenario and process guidance. Final investment, financing, legal, tax, and accounting decisions remain with the client and qualified advisors.",
    pressures: [
      { number: "01", title: "Sources + Uses", body: "Acquisition, development, reserves, carry, leasing, fees, contingencies, and refinance needs must be funded across time." },
      { number: "02", title: "Risk + Control", body: "Recourse, covenants, governance, future funding, dilution, and decision rights alter the ownership risk profile." },
      { number: "03", title: "Sequence", body: "Approvals, closing, construction, lease-up, stabilization, sale, and refinance create different capital milestones and dependencies." },
    ],
  },
  process: {
    eyebrow: "The Capital Strategy Process",
    headline: "Build the structure around the real execution calendar.",
    introduction:
      "The process maps the full requirement, tests practical alternatives, identifies sensitivities and dependencies, and sequences market engagement around the client's decisions.",
    steps: [
      { number: "01", title: "Map", body: "Define sources, uses, timing, asset position, sponsorship, ownership objectives, business-plan milestones, and known constraints." },
      { number: "02", title: "Model", body: "Organize base assumptions and practical debt, equity, reserve, contingency, bridge, refinance, and exit scenarios." },
      { number: "03", title: "Compare", body: "Evaluate how proceeds, pricing, recourse, governance, dilution, flexibility, conditions, and certainty affect the plan." },
      { number: "04", title: "Sequence", body: "Establish decision points, information needs, market timing, funding milestones, dependencies, and coordinated next actions." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A decision framework for the capital stack.",
    introduction:
      "Gala organizes alternatives and execution planning without replacing the client's underwriting, investment committee, lender, investor, legal, tax, or accounting review.",
    items: [
      { icon: "positioning", title: "Capital Requirement Map", body: "A time-based view of acquisition, development, operating, reserve, contingency, refinance, and exit funding needs." },
      { icon: "economics", title: "Scenario Comparison", body: "Commercial comparison of practical debt, equity, leverage, contribution, reserve, and timing alternatives." },
      { icon: "prospects", title: "Capital-Source Fit", body: "Identification of the lender and investor profiles that may align with the opportunity's scale, stage, geography, and risk." },
      { icon: "marketing", title: "Market-Readiness Plan", body: "The narrative, information, model outputs, sponsor materials, and diligence record needed before outreach." },
      { icon: "tours", title: "Decision Calendar", body: "Clear client decisions, dependencies, funding milestones, market windows, and specialist inputs across the plan." },
      { icon: "execution", title: "Execution Roadmap", body: "Sequenced debt, equity, diligence, documentation, condition, funding, and closing workstreams." },
    ],
  },
  related: {
    headline: "Capital strategy should stay connected to the asset plan.",
    introduction:
      "Gala can carry the framework into focused debt, equity, transaction, and development conversations as the client selects a path.",
    links: [
      { label: "GalaCapital", title: "Debt", body: "Prepare and run a focused lender process around the selected financing requirement.", href: "/services/capital-markets/debt" },
      { label: "GalaCapital", title: "Equity", body: "Organize the investment case and test fit with relevant equity relationships.", href: "/services/capital-markets/equity" },
      { label: "GalaCapital", title: "Transaction Coordination", body: "Keep diligence, documentation, conditions, and funding milestones moving across parties.", href: "/services/capital-markets/transaction-coordination" },
      { label: "GalaDevelop", title: "Development Oversight", body: "Connect capital milestones to approvals, infrastructure, schedule, and ownership decisions.", href: "/services/development-services/development-oversight" },
    ],
  },
  cta: {
    eyebrow: "See the Whole Capital Picture",
    headline: "Let’s organize the structure before the market narrows the choices.",
    body:
      "Share the opportunity, sources and uses, sponsorship, business plan, timing, current assumptions, and ownership priorities. Gala will help frame the alternatives and next decisions.",
  },
});

const transactionCoordinationPage = buildCapabilityPage({
  path: "/services/capital-markets/transaction-coordination",
  parent: { label: "GalaCapital", href: "/services/capital-markets" },
  image: transactionCoordination,
  metadataDescription:
    "Commercial real estate capital transaction coordination connecting diligence, third-party reports, documentation, conditions, funding, parties, and closing milestones.",
  hero: {
    eyebrow: "GalaCapital · Transaction Coordination",
    title: "Transaction Coordination",
    lead:
      "Keep information, decisions, diligence, conditions, and closing milestones visible across every party in the capital process.",
    alt: "Generic commercial transaction workspace with a document folio, plans, keys, and an abstract milestone timeline",
    position: "center 52%",
    primaryLabel: "Discuss Transaction Support",
    inquiryHref: "/contact?inquiry=capital-markets&focus=transaction-coordination",
    processLabel: "See the Coordination Process",
    processId: "capital-transaction-process",
    signalLabel: "Transaction coordination stages",
    signals: ["Launch", "Track", "Resolve", "Fund"],
  },
  challenge: {
    watermark: "CLOSE",
    eyebrow: "The Execution Challenge",
    headline: "A sound capital decision can still fail in an unmanaged closing process.",
    body: [
      "Capital transactions bring together ownership, lenders, investors, attorneys, title, escrow, appraisers, insurers, inspectors, engineers, environmental professionals, accountants, and other parties—each with information needs and dependencies.",
      "Gala helps organize the commercial workstream and communication across those parties while licensed and contracted professionals remain responsible for their documentation, reports, approvals, and specialist advice.",
    ],
    emphasis:
      "Coordination creates accountability and visibility; it does not replace legal closing, escrow, underwriting, or third-party diligence functions.",
    pressures: [
      { number: "01", title: "Information", body: "Incomplete, inconsistent, or late materials slow underwriting and create avoidable follow-up across parties." },
      { number: "02", title: "Conditions", body: "Appraisal, reports, insurance, documentation, equity, reserves, approvals, and other conditions may depend on one another." },
      { number: "03", title: "Calendar", body: "Expirations, deposits, extension dates, rate locks, funding notices, approvals, and closing requirements need active ownership." },
    ],
  },
  process: {
    eyebrow: "The Transaction Coordination Process",
    headline: "Create one visible path from term sheet to funding.",
    introduction:
      "Gala establishes the working transaction plan, manages information flow and open items, and maintains a clear decision and milestone rhythm through closing.",
    steps: [
      { number: "01", title: "Launch", body: "Confirm parties, roles, term requirements, information needs, diligence scope, decision rights, target dates, and communication protocol." },
      { number: "02", title: "Track", body: "Maintain the request list, reports, documents, conditions, dependencies, responsible parties, decisions, and transaction calendar." },
      { number: "03", title: "Resolve", body: "Surface inconsistencies and blockers, route questions to the appropriate party, document decisions, and update downstream dependencies." },
      { number: "04", title: "Fund", body: "Coordinate final commercial conditions, funding requirements, closing readiness, responsibilities, and post-closing handoffs." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A disciplined control layer around the capital closing.",
    introduction:
      "The coordination system complements—not duplicates—the work of legal counsel, title, escrow, lenders, investors, and third-party specialists.",
    items: [
      { icon: "positioning", title: "Transaction Plan", body: "A consolidated view of parties, roles, terms, milestones, dependencies, communication, and closing objectives." },
      { icon: "marketing", title: "Information Request Control", body: "One organized record of requested, received, updated, outstanding, and restricted transaction materials." },
      { icon: "prospects", title: "Party Coordination", body: "Clear routing across ownership, capital sources, counsel, title, escrow, consultants, and other transaction participants." },
      { icon: "tours", title: "Third-Party Report Tracking", body: "Visibility into ordering, access, delivery, follow-up, and open questions for required external reports." },
      { icon: "economics", title: "Condition + Decision Log", body: "Material conditions, changes, waivers, approvals, funding items, ownership decisions, and responsible parties tracked." },
      { icon: "execution", title: "Closing Readiness", body: "A final view of commercial requirements, open items, funds, documents, dates, responsibilities, and handoffs." },
    ],
  },
  related: {
    headline: "Execution begins before the closing calendar does.",
    introduction:
      "Gala can connect transaction control to the debt, equity, capital-strategy, and development decisions that create the closing requirements.",
    links: [
      { label: "GalaCapital", title: "Debt", body: "Prepare the lender request and compare financing alternatives before execution begins.", href: "/services/capital-markets/debt" },
      { label: "GalaCapital", title: "Equity", body: "Organize investor fit, structure, diligence, and partnership milestones.", href: "/services/capital-markets/equity" },
      { label: "GalaCapital", title: "Capital Strategy", body: "Define the selected capital path, dependencies, and funding sequence.", href: "/services/capital-markets/capital-strategy" },
      { label: "GalaDevelop", title: "Development Oversight", body: "Keep project milestones and ownership decisions connected to capital conditions and timing.", href: "/services/development-services/development-oversight" },
    ],
  },
  cta: {
    eyebrow: "Create Closing Visibility",
    headline: "Let’s organize the capital transaction before open items become delays.",
    body:
      "Share the accepted terms, parties, target dates, current request list, known reports, documentation status, and active conditions. Gala will help establish the coordination plan.",
  },
});

export const capitalCapabilityPages = [
  debt,
  equity,
  capitalStrategy,
  transactionCoordinationPage,
];

export const propertyManagementCapabilityPage = buildCapabilityPage({
  path: "/services/property-management/property-management-partnership",
  parent: { label: "Property Management", href: "/services/property-management" },
  image: propertyManagementPartnership,
  metadataDescription:
    "Partner-led commercial property management coordination connecting ownership priorities, operating scope, property information, manager selection, transition, and ongoing brokerage context.",
  hero: {
    eyebrow: "Property Management · Partner-Led",
    title: "Property Management Partnership",
    lead:
      "Connect ownership with an operating partner whose scope fits the property—while preserving continuity with the broader commercial plan.",
    alt: "Generic commercial property operations professional reviewing building mechanical systems",
    position: "center 51%",
    primaryLabel: "Discuss Property Operations",
    inquiryHref: "/contact?inquiry=property-management",
    processLabel: "See the Partnership Process",
    processId: "property-management-process",
    signalLabel: "Property management partnership stages",
    signals: ["Define", "Match", "Transition", "Connect"],
  },
  challenge: {
    watermark: "OPERATE",
    eyebrow: "The Ownership Need",
    headline: "A transaction plan is only as durable as the operations behind it.",
    body: [
      "Tenant communication, rent administration, vendor oversight, maintenance, reporting, budgeting, compliance coordination, and capital planning affect both day-to-day performance and future leasing or sale decisions.",
      "Gala does not present property management as a direct in-house service. We help ownership define the need, connect with an appropriate management partner, coordinate the handoff, and retain continuity where brokerage, capital, or development context remains relevant.",
    ],
    emphasis:
      "The selected management partner controls and is responsible for the contracted management services; Gala's role is connection and coordination.",
    pressures: [
      { number: "01", title: "Scope Fit", body: "Asset type, tenancy, systems, staffing, reporting, geography, and ownership expectations determine the appropriate operating scope." },
      { number: "02", title: "Transition", body: "Leases, contacts, vendors, balances, records, access, open work, and tenant communication need a disciplined handoff." },
      { number: "03", title: "Continuity", body: "Operating information should inform leasing, capital, development, and future transaction decisions without creating role confusion." },
    ],
  },
  process: {
    eyebrow: "The Partnership Process",
    headline: "Move from ownership priorities to a clear operating handoff.",
    introduction:
      "Gala helps frame the requirement, identify a relevant partner, coordinate scope and transition discussions, and preserve the appropriate link to the commercial strategy.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the property, tenancy, systems, current operations, ownership priorities, reporting needs, open issues, and desired management scope." },
      { number: "02", title: "Match", body: "Identify and introduce a partner whose experience, geography, staffing model, systems, and service scope may fit the assignment." },
      { number: "03", title: "Transition", body: "Support clear discussion of responsibilities, records, vendors, tenant communication, access, open work, timing, and onboarding." },
      { number: "04", title: "Connect", body: "Maintain the agreed interface between property operations and Gala's brokerage, capital, development, or ownership-strategy work." },
    ],
  },
  deliverables: {
    eyebrow: "Coordination + Handoff",
    headline: "A management pathway with roles made explicit.",
    introduction:
      "Management agreements, fees, staffing, accounting controls, vendor authority, insurance, compliance, and performance obligations are established directly between ownership and the selected partner.",
    items: [
      { icon: "positioning", title: "Ownership Requirements Brief", body: "A concise summary of the property, current operating context, priorities, reporting needs, open issues, and desired service scope." },
      { icon: "prospects", title: "Partner Introduction", body: "A focused connection to a potential management partner based on known asset, market, and scope requirements." },
      { icon: "economics", title: "Scope Comparison Support", body: "Commercial coordination around proposed responsibilities, exclusions, staffing, reporting, fees, transition, and decision points." },
      { icon: "marketing", title: "Information Handoff", body: "Organization of available leases, contacts, vendors, operating records, property information, access, and open-item context." },
      { icon: "tours", title: "Transition Coordination", body: "Working communication among ownership, the outgoing team when applicable, the selected partner, tenants, and relevant vendors." },
      { icon: "execution", title: "Strategic Continuity", body: "An agreed connection between operating information and active Gala leasing, sale, capital, or development assignments." },
    ],
  },
  related: {
    headline: "Operations support the decisions ownership makes next.",
    introduction:
      "Gala can connect the operating conversation to leasing, investment sales, capital, and development work when those decisions require shared context.",
    links: [
      { label: "GalaBroker", title: "Landlord Representation", body: "Connect leasing strategy and prospect activity to current property operations.", href: "/services/brokerage/landlord-representation" },
      { label: "GalaSales", title: "Investment Sales", body: "Prepare an ownership and operating record that supports a future disposition process.", href: "/services/investment-sales" },
      { label: "GalaCapital", title: "Capital Strategy", body: "Align operating needs, reserves, capital work, and financing decisions.", href: "/services/capital-markets/capital-strategy" },
      { label: "GalaDevelop", title: "Development Oversight", body: "Coordinate ownership decisions when renovation, repositioning, or development work changes operations.", href: "/services/development-services/development-oversight" },
    ],
  },
  cta: {
    eyebrow: "Start With the Operating Need",
    headline: "Let’s define the management scope before making the introduction.",
    body:
      "Share the property, tenancy, current arrangement, operating priorities, reporting expectations, open issues, and timing. Gala will help frame the partner conversation and handoff.",
  },
});
