import developmentInfrastructure from "@/assets/development-infrastructure.webp";
import developmentOversightContext from "@/assets/development-oversight-context.webp";
import developmentOversightHero from "@/assets/development-oversight-hero.webp";
import entitlementsCoordinationHero from "@/assets/entitlements-coordination-hero.webp";
import entitlementsReviewContext from "@/assets/entitlements-review-context.webp";
import infrastructureFieldContext from "@/assets/infrastructure-field-context.webp";
import siteStrategyEntitlements from "@/assets/site-strategy-entitlements.webp";
import siteStrategyFieldContext from "@/assets/site-strategy-field-context.webp";
import type {
  CapabilityPageContent,
  CapabilityPageSection,
} from "@/content/capabilityPages";

type StrategySection = Extract<CapabilityPageSection, { type: "strategy" }>;
type ProcessSection = Extract<CapabilityPageSection, { type: "process" }>;
type DeliverablesSection = Extract<CapabilityPageSection, { type: "deliverables" }>;

type DevelopmentPageInput = {
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

const createDevelopmentPage = ({
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
}: DevelopmentPageInput): CapabilityPageContent => {
  const inquiryHref = `/contact?inquiry=development-services&focus=${focus}`;

  return {
    path: `/services/development-services/${slug}`,
    compact: true,
    metadata: {
      title,
      description: metadataDescription,
      image: heroImage,
    },
    parent: { label: "Development", href: "/services/development-services" },
    hero: {
      eyebrow: `Development · ${title}`,
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

const siteStrategy = createDevelopmentPage({
  slug: "site-strategy",
  focus: "site-strategy",
  title: "Site Strategy",
  metadataDescription:
    "Commercial site strategy connecting intended use, market fit, physical constraints, access, infrastructure, approvals, and a disciplined diligence roadmap.",
  heroLead:
    "Test the site against the business plan early—before assumptions become expensive commitments.",
  heroImage: siteStrategyEntitlements,
  heroAlt:
    "Generic development advisory table with site plans, material samples, and an architectural massing model",
  heroPosition: "center 54%",
  primaryLabel: "Discuss a Site",
  strategy: {
    type: "strategy",
    eyebrow: "The Early Decision",
    headline: "A compelling location can still be the wrong site.",
    introduction:
      "Gala frames the commercial question, surfaces decision-driving unknowns, and coordinates the specialist input needed before ownership commits more time or capital.",
    media: {
      src: siteStrategyFieldContext,
      alt: "Commercial advisors reviewing a generic undeveloped site, nearby access, and surrounding development context",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Program Fit",
        title: "Start with the use—not the parcel story.",
        body: "Intended use, scale, circulation, parking, operations, market position, timing, and capital limits define what the site must support.",
        points: [],
      },
      {
        number: "02",
        label: "Site Reality",
        title: "Find the constraints that can change the plan.",
        body: "Access, utilities, topography, stormwater, environmental conditions, approvals, and off-site work are organized for specialist verification.",
        points: [],
      },
      {
        number: "03",
        label: "Decision Sequence",
        title: "Spend diligence dollars in the right order.",
        body: "Studies, agency conversations, contract milestones, and capital decisions are sequenced around the questions most likely to affect a stop-or-proceed choice.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "site-strategy-process",
    eyebrow: "The Site Strategy Process",
    headline: "Move from possibility to a defensible next decision.",
    introduction:
      "The process turns a proposed use and an incomplete site record into an organized evaluation path.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the program, operating requirements, ownership objective, capital limits, timing, and acceptable alternatives." },
      { number: "02", title: "Screen", body: "Review the known parcel, market, planning, access, utility, physical, and environmental context at the appropriate level." },
      { number: "03", title: "Test", body: "Coordinate focused input from brokers, planners, engineers, architects, attorneys, providers, and other specialists as needed." },
      { number: "04", title: "Decide", body: "Organize findings, dependencies, remaining unknowns, and next steps around a clear proceed, revise, or stop decision." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "A clearer brief before the heavy lift.",
    introduction:
      "Site strategy provides commercial decision support; engineering, legal, environmental, and governmental conclusions remain with the appropriate specialists and authorities.",
    items: [
      { icon: "positioning", title: "Development Brief", body: "The intended use, operating needs, market role, timing, ownership priorities, and alternatives." },
      { icon: "economics", title: "Constraint Register", body: "Known conditions, working assumptions, missing information, and questions requiring specialist verification." },
      { icon: "prospects", title: "Specialist Plan", body: "The planning, civil, architectural, legal, environmental, provider, and market inputs needed for the decision." },
      { icon: "execution", title: "Decision Roadmap", body: "Sequenced diligence, responsibilities, milestones, dependencies, and stop-or-proceed checkpoints." },
    ],
  },
  relatedHeadline: "Turn site findings into the right next workstream.",
  relatedIntroduction:
    "Move into approvals, infrastructure, land positioning, or capital planning only when the record supports it.",
  relatedLinks: [
    { label: "Development", title: "Entitlements", body: "Coordinate the jurisdictional path once the program is sufficiently defined.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "Infrastructure", body: "Clarify access, utility, stormwater, and off-site dependencies.", href: "/services/development-services/infrastructure" },
    { label: "Investment Sales", title: "Land", body: "Position a site around verified use paths, constraints, and timing.", href: "/services/investment-sales/land" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Align capital decisions with the development path and its dependencies.", href: "/services/capital-markets/capital-strategy" },
  ],
  ctaEyebrow: "Start Before the Commitment",
  ctaHeadline: "Bring us the site, the idea, and the questions that still matter.",
  ctaBody:
    "Gala will help organize the early commercial decision and identify the specialist work needed to evaluate it responsibly.",
});

const entitlements = createDevelopmentPage({
  slug: "entitlements",
  focus: "entitlements",
  title: "Entitlements",
  metadataDescription:
    "Commercial entitlement coordination aligning the proposed program, jurisdictional process, consultant team, public requirements, milestones, and ownership decisions.",
  heroLead:
    "Turn an intended program into an organized approval path with the team, decisions, and dependencies visible.",
  heroImage: entitlementsCoordinationHero,
  heroAlt:
    "Generic development team reviewing site plans and a physical planning model in a studio",
  heroPosition: "center",
  primaryLabel: "Discuss an Approval Path",
  strategy: {
    type: "strategy",
    eyebrow: "The Approval Path",
    headline: "Approvals are a coordinated process—not a single submission.",
    introduction:
      "Gala keeps the commercial objective, specialist work, jurisdictional milestones, and ownership decisions connected while qualified professionals and public authorities control their respective conclusions.",
    media: {
      src: entitlementsReviewContext,
      alt: "Anonymous planning specialists coordinating revisions around generic site plans and a scale model",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Jurisdiction",
        title: "Define the actual review path.",
        body: "Zoning interpretation, rezoning, special approvals, site-plan review, public meetings, and agency procedures vary by location and program.",
        points: [],
      },
      {
        number: "02",
        label: "Technical Record",
        title: "Keep plans, studies, and comments aligned.",
        body: "Access, utilities, stormwater, traffic, environmental, architecture, and design responses move through the right specialists and review cycles.",
        points: [],
      },
      {
        number: "03",
        label: "Ownership Decisions",
        title: "Resolve changes with the commercial plan visible.",
        body: "Program revisions, proposed conditions, schedule exposure, and cost implications are framed for timely ownership direction.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "entitlement-process",
    eyebrow: "The Entitlement Coordination Process",
    headline: "Keep the program, team, and review calendar aligned.",
    introduction:
      "The process makes what is decided, submitted, requested, revised, and still open visible to ownership.",
    steps: [
      { number: "01", title: "Frame", body: "Define the proposed program, current land-use position, likely approval path, material constraints, and decision criteria." },
      { number: "02", title: "Assemble", body: "Align the planners, engineers, architects, attorneys, environmental professionals, and other specialists required." },
      { number: "03", title: "Advance", body: "Track meetings, submittals, comments, revisions, dependencies, and ownership decisions against the working schedule." },
      { number: "04", title: "Resolve", body: "Document conditions, remaining approvals, commercial implications, and execution requirements after each milestone." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "Commercial continuity around a specialist-led process.",
    introduction:
      "Gala provides coordination and decision support. Governmental authorities issue approvals, and licensed professionals remain responsible for their work and opinions.",
    items: [
      { icon: "positioning", title: "Approval-Path Brief", body: "The proposed program, current position, anticipated approvals, dependencies, and decision-driving unknowns." },
      { icon: "prospects", title: "Team + Agency Coordination", body: "Clear roles, meetings, communication, and follow-up across the jurisdiction and required disciplines." },
      { icon: "marketing", title: "Comment + Revision Record", body: "Agency comments, team responses, plan changes, responsibilities, and unresolved issues kept organized." },
      { icon: "execution", title: "Milestone Decision Report", body: "Completed work, proposed conditions, pending decisions, upcoming submissions, risks, and next steps." },
    ],
  },
  relatedHeadline: "Keep approvals connected to execution.",
  relatedIntroduction:
    "Approval decisions can change infrastructure, ownership oversight, capital timing, and the value of the land itself.",
  relatedLinks: [
    { label: "Development", title: "Site Strategy", body: "Clarify program fit and decision-driving unknowns before the approval path.", href: "/services/development-services/site-strategy" },
    { label: "Development", title: "Infrastructure", body: "Coordinate access, utility, stormwater, and off-site dependencies alongside review.", href: "/services/development-services/infrastructure" },
    { label: "Development", title: "Development Oversight", body: "Keep ownership decisions and specialist work aligned as the project advances.", href: "/services/development-services/development-oversight" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Sequence funding decisions around approval risk, timing, and milestones.", href: "/services/capital-markets/capital-strategy" },
  ],
  ctaEyebrow: "Start With the Current Record",
  ctaHeadline: "Organize the path from proposed use to the next approval milestone.",
  ctaBody:
    "Share the site, program, known approvals, consultant work, jurisdictional feedback, and timing. Gala will help identify the coordination gaps and next decisions.",
});

const infrastructure = createDevelopmentPage({
  slug: "infrastructure",
  focus: "infrastructure",
  title: "Infrastructure Coordination",
  metadataDescription:
    "Commercial development infrastructure coordination covering access, utilities, stormwater, off-site obligations, specialist responsibilities, timing, and execution dependencies.",
  heroLead:
    "Make access, utilities, stormwater, and off-site work visible before they control the project from the shadows.",
  heroImage: developmentInfrastructure,
  heroAlt:
    "Generic commercial development site with roadway, utility, drainage, and building-pad work underway",
  heroPosition: "center 56%",
  primaryLabel: "Discuss Infrastructure Needs",
  strategy: {
    type: "strategy",
    eyebrow: "The Execution Dependency",
    headline: "A site does not work until its systems do.",
    introduction:
      "Gala organizes the information, specialist findings, provider conversations, responsibilities, and timing around the systems the program requires.",
    media: {
      src: infrastructureFieldContext,
      alt: "Civil and utility professionals reviewing generic commercial development infrastructure in the field",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Availability + Capacity",
        title: "Nearby service is not confirmed service.",
        body: "Access, water, sewer, power, communications, stormwater, and grading require provider or specialist confirmation of capacity, conditions, and timing.",
        points: [],
      },
      {
        number: "02",
        label: "Rights + Responsibility",
        title: "Make ownership of the work explicit.",
        body: "On-site work, off-site improvements, extensions, easements, fees, provider obligations, and third-party participation are tracked separately.",
        points: [],
      },
      {
        number: "03",
        label: "Critical Path",
        title: "Connect systems to schedule and capital.",
        body: "Design, approvals, procurement, provider calendars, cost inputs, and construction sequencing are organized around execution.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "infrastructure-process",
    eyebrow: "The Infrastructure Coordination Process",
    headline: "Expose the dependencies, then manage the handoffs.",
    introduction:
      "The process turns scattered assumptions and findings into a working record of confirmations, owners, decisions, and milestones.",
    steps: [
      { number: "01", title: "Map", body: "Identify the access, utility, stormwater, grading, easement, and off-site systems the proposed program requires." },
      { number: "02", title: "Validate", body: "Coordinate provider and specialist confirmation of availability, capacity, conditions, approvals, timing, and constraints." },
      { number: "03", title: "Coordinate", body: "Align civil, utility, jurisdictional, ownership, contractor, and adjacent-party workstreams around current information." },
      { number: "04", title: "Track", body: "Maintain visibility into responsibilities, dependencies, cost inputs, schedule exposure, open items, and completion evidence." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "One coordinated view of the systems beneath the plan.",
    introduction:
      "Gala supports ownership communication and execution planning while technical design, estimates, permits, capacity determinations, and construction remain with the appropriate parties.",
    items: [
      { icon: "positioning", title: "Infrastructure Matrix", body: "Required systems, current information, verification sources, responsible parties, status, and dependencies." },
      { icon: "prospects", title: "Provider + Specialist Alignment", body: "Organized communication with utilities, agencies, municipalities, civil consultants, and other technical professionals." },
      { icon: "economics", title: "Responsibility + Cost Record", body: "Owner, provider, jurisdiction, contractor, third-party, easement, fee, and available budget inputs kept distinct." },
      { icon: "execution", title: "Schedule + Completion View", body: "Approvals, design, procurement, construction, handoffs, outstanding items, and available completion evidence." },
    ],
  },
  relatedHeadline: "Infrastructure changes the rest of the development plan.",
  relatedIntroduction:
    "Verified system constraints can reshape site fit, approvals, owner decisions, and financing requirements.",
  relatedLinks: [
    { label: "Development", title: "Site Strategy", body: "Evaluate infrastructure as part of early program and site fit.", href: "/services/development-services/site-strategy" },
    { label: "Development", title: "Entitlements", body: "Connect infrastructure findings to jurisdictional review and approvals.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "Development Oversight", body: "Track system decisions and dependencies across the broader project.", href: "/services/development-services/development-oversight" },
    { label: "Capital Markets", title: "Debt", body: "Organize financing requirements around verified scope, budget, schedule, and delivery risk.", href: "/services/capital-markets/debt" },
  ],
  ctaEyebrow: "Start With the Dependencies",
  ctaHeadline: "Make the systems, responsibilities, and timing visible.",
  ctaBody:
    "Share the site plan, provider information, consultant work, jurisdictional feedback, budget assumptions, and schedule. Gala will help organize the next coordination decisions.",
});

const developmentOversight = createDevelopmentPage({
  slug: "development-oversight",
  focus: "development-oversight",
  title: "Development Oversight",
  metadataDescription:
    "Owner-side commercial development oversight connecting decisions, consultants, approvals, budget inputs, schedule, risks, reporting, and transaction priorities.",
  heroLead:
    "Keep ownership decisions, specialists, approvals, schedule, and commercial priorities moving as one coordinated project.",
  heroImage: developmentOversightHero,
  heroAlt:
    "Owner representative and project professional walking a generic active commercial development site",
  heroPosition: "center",
  primaryLabel: "Discuss a Development",
  strategy: {
    type: "strategy",
    eyebrow: "The Ownership View",
    headline: "Complex projects lose time in the gaps between teams.",
    introduction:
      "Gala creates an owner-side decision rhythm across design, approvals, infrastructure, pricing, capital, construction, leasing, and transaction work without duplicating specialist scopes.",
    media: {
      src: developmentOversightContext,
      alt: "Anonymous owner-side team reviewing a generic development schedule, plans, and material decisions",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Shared Baseline",
        title: "Put every workstream against one objective.",
        body: "Program, team roles, approvals, budget inputs, schedule, leasing, capital, and transaction priorities begin from the same ownership brief.",
        points: [],
      },
      {
        number: "02",
        label: "Cross-Team Visibility",
        title: "Find the gaps before they become delays.",
        body: "Dependencies, open items, changes, risks, responsible parties, and interdependent dates stay visible across the project team.",
        points: [],
      },
      {
        number: "03",
        label: "Ownership Decisions",
        title: "Frame choices with consequences attached.",
        body: "Material decisions are organized with the relevant specialist input, alternatives, timing, and commercial effects visible to ownership.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "development-oversight-process",
    eyebrow: "The Development Oversight Process",
    headline: "Create one decision rhythm across the project.",
    introduction:
      "The oversight layer connects specialist progress to concise ownership decisions and reporting.",
    steps: [
      { number: "01", title: "Align", body: "Confirm the ownership objective, program, team roles, decision rights, workstreams, baseline schedule, and commercial milestones." },
      { number: "02", title: "Monitor", body: "Track consultant work, approvals, infrastructure, pricing, procurement, capital, leasing, risks, and dependent dates." },
      { number: "03", title: "Decide", body: "Frame material choices with the relevant specialist input, alternatives, timing, and commercial consequences visible." },
      { number: "04", title: "Report", body: "Summarize completed work, changes, open decisions, upcoming milestones, exceptions, and accountable next actions." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "Owner-side clarity without replacing the project team.",
    introduction:
      "Architectural, engineering, legal, financial, contractor, and property-management responsibilities remain with the contracted specialists.",
    items: [
      { icon: "positioning", title: "Ownership Brief", body: "Project objectives, program, commercial priorities, decision criteria, roles, and reporting expectations." },
      { icon: "marketing", title: "Integrated Milestone View", body: "Approvals, design, infrastructure, budget inputs, procurement, construction, leasing, and capital dates." },
      { icon: "economics", title: "Change + Risk Record", body: "Material changes, open assumptions, emerging risks, cost inputs, schedule effects, and required decisions." },
      { icon: "execution", title: "Ownership Reporting", body: "Focused meetings and updates organized around progress, exceptions, next decisions, and accountable actions." },
    ],
  },
  relatedHeadline: "Keep the commercial plan connected as work advances.",
  relatedIntroduction:
    "Move directly into the site, approval, infrastructure, or capital workstream affecting the next ownership decision.",
  relatedLinks: [
    { label: "Development", title: "Site Strategy", body: "Clarify the development brief, site fit, and decision-driving unknowns.", href: "/services/development-services/site-strategy" },
    { label: "Development", title: "Entitlements", body: "Organize jurisdictional milestones and the specialist-led approval path.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "Infrastructure", body: "Track access, utilities, stormwater, off-site work, and provider dependencies.", href: "/services/development-services/infrastructure" },
    { label: "Capital Markets", title: "Transaction Coordination", body: "Connect capital-source diligence and closing milestones to the development record.", href: "/services/capital-markets/transaction-coordination" },
  ],
  ctaEyebrow: "Create Project Visibility",
  ctaHeadline: "Organize the decisions that ownership needs to control.",
  ctaBody:
    "Share the current plan, project team, approvals, schedule, active risks, and near-term milestones. Gala will help define the oversight layer that adds useful clarity.",
});

export const developmentCapabilityPages = [
  siteStrategy,
  entitlements,
  infrastructure,
  developmentOversight,
];
