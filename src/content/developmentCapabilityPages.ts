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

const siteSelection = createDevelopmentPage({
  slug: "site-selection",
  focus: "site-selection",
  title: "Site Selection",
  metadataDescription:
    "Commercial site selection connecting business requirements, market fit, physical constraints, access, infrastructure, approvals, and a disciplined comparison process.",
  heroLead:
    "Compare locations against the business plan before a promising address becomes an expensive commitment.",
  heroImage: siteStrategyEntitlements,
  heroAlt:
    "Generic development advisory table with site plans, material samples, and an architectural massing model",
  heroPosition: "center 54%",
  primaryLabel: "Discuss a Site",
  strategy: {
    type: "strategy",
    eyebrow: "The Location Decision",
    headline: "A compelling address can still be the wrong site.",
    introduction:
      "Gala translates operating and investment requirements into practical site criteria, compares credible alternatives, and coordinates the specialist input needed before a client commits more time or capital.",
    media: {
      src: siteStrategyFieldContext,
      alt: "Commercial advisors reviewing a generic undeveloped site, nearby access, and surrounding development context",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Requirement",
        title: "Start with what the opportunity must support.",
        body: "Intended use, scale, circulation, parking, operations, market position, timing, and capital limits define what the site must support.",
        points: [],
      },
      {
        number: "02",
        label: "Alternatives",
        title: "Compare sites on the same decision criteria.",
        body: "Location, access, utilities, topography, stormwater, environmental conditions, approvals, and off-site work are organized for comparable specialist review.",
        points: [],
      },
      {
        number: "03",
        label: "Selection Path",
        title: "Advance the strongest option with clarity.",
        body: "Market findings, agency conversations, studies, contract milestones, and capital decisions are sequenced around the questions most likely to distinguish the alternatives.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "site-selection-process",
    eyebrow: "The Site Selection Process",
    headline: "Move from requirements to a defensible site decision.",
    introduction:
      "The process turns a proposed use and a broad search into an organized comparison and diligence path.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the program, operating requirements, ownership objective, capital limits, timing, and acceptable alternatives." },
      { number: "02", title: "Search + Screen", body: "Identify credible alternatives and compare market, planning, access, utility, physical, and environmental context at the appropriate level." },
      { number: "03", title: "Test", body: "Coordinate focused input from brokers, planners, engineers, architects, attorneys, providers, and other specialists for the strongest candidates." },
      { number: "04", title: "Select", body: "Organize findings, tradeoffs, dependencies, remaining unknowns, and next steps around a clear site recommendation." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "A clearer brief before the heavy lift.",
    introduction:
      "Site selection provides commercial decision support; engineering, legal, environmental, and governmental conclusions remain with the appropriate specialists and authorities.",
    items: [
      { icon: "positioning", title: "Development Brief", body: "The intended use, operating needs, market role, timing, ownership priorities, and alternatives." },
      { icon: "economics", title: "Constraint Register", body: "Known conditions, working assumptions, missing information, and questions requiring specialist verification." },
      { icon: "prospects", title: "Site Comparison", body: "Consistent market, planning, access, infrastructure, physical, and timing criteria across credible alternatives." },
      { icon: "execution", title: "Decision Roadmap", body: "Sequenced diligence, responsibilities, milestones, dependencies, and stop-or-proceed checkpoints." },
    ],
  },
  relatedHeadline: "Turn the site decision into the right next workstream.",
  relatedIntroduction:
    "Move into approvals, infrastructure, land positioning, or capital planning only when the record supports it.",
  relatedLinks: [
    { label: "Development", title: "Entitlements", body: "Coordinate the jurisdictional path once the program is sufficiently defined.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "Infrastructure", body: "Clarify access, utility, stormwater, and off-site dependencies.", href: "/services/development-services/infrastructure" },
    { label: "Investment Sales", title: "Land", body: "Position a site around verified use paths, constraints, and timing.", href: "/services/investment-sales/land" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Align capital decisions with the development path and its dependencies.", href: "/services/capital-markets#capital-strategy" },
  ],
  ctaEyebrow: "Start Before the Commitment",
  ctaHeadline: "Bring us the requirement, the search area, and the questions that still matter.",
  ctaBody:
    "Gala will help organize the location decision, compare credible alternatives, and identify the specialist work needed to evaluate them responsibly.",
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
    { label: "Development", title: "Site Selection", body: "Clarify requirements, alternatives, and decision-driving unknowns before the approval path.", href: "/services/development-services/site-selection" },
    { label: "Development", title: "Infrastructure", body: "Coordinate access, utility, stormwater, and off-site dependencies alongside review.", href: "/services/development-services/infrastructure" },
    { label: "Development", title: "GC / Builder Relationships", body: "Connect the approved program with relevant construction relationships.", href: "/services/development-services/gc-builder-relationships" },
    { label: "Capital Markets", title: "Capital Strategy", body: "Sequence funding decisions around approval risk, timing, and milestones.", href: "/services/capital-markets#capital-strategy" },
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
    { label: "Development", title: "Site Selection", body: "Evaluate infrastructure as part of early program and site fit.", href: "/services/development-services/site-selection" },
    { label: "Development", title: "Entitlements", body: "Connect infrastructure findings to jurisdictional review and approvals.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "GC / Builder Relationships", body: "Connect verified infrastructure requirements to relevant construction conversations.", href: "/services/development-services/gc-builder-relationships" },
    { label: "Capital Markets", title: "Debt", body: "Organize financing requirements around verified scope, budget, schedule, and delivery risk.", href: "/services/capital-markets#debt" },
  ],
  ctaEyebrow: "Start With the Dependencies",
  ctaHeadline: "Make the systems, responsibilities, and timing visible.",
  ctaBody:
    "Share the site plan, provider information, consultant work, jurisdictional feedback, budget assumptions, and schedule. Gala will help organize the next coordination decisions.",
});

const gcBuilderRelationships = createDevelopmentPage({
  slug: "gc-builder-relationships",
  focus: "gc-builder-relationships",
  title: "GC / Builder Relationships",
  metadataDescription:
    "Commercial development support connecting clients with relevant general-contractor and builder relationships while organizing scope, fit, communication, and next decisions.",
  heroLead:
    "Connect the opportunity with relevant construction relationships and keep early conversations grounded in the project's real requirements.",
  heroImage: developmentOversightHero,
  heroAlt:
    "Owner representative and project professional walking a generic active commercial development site",
  heroPosition: "center",
  primaryLabel: "Discuss Your Builder Needs",
  strategy: {
    type: "strategy",
    eyebrow: "The Relationship Fit",
    headline: "The right construction relationship begins with a clear project brief.",
    introduction:
      "Gala helps clients frame the opportunity, identify relevant general-contractor and builder relationships, and organize early communication without replacing licensed design, construction, legal, or ownership responsibilities.",
    media: {
      src: developmentOversightContext,
      alt: "Anonymous owner-side team reviewing a generic development schedule, plans, and material decisions",
      position: "center",
    },
    tracks: [
      {
        number: "01",
        label: "Project Brief",
        title: "Make the opportunity legible before introductions begin.",
        body: "Program, site status, approvals, delivery expectations, available documents, timing, and ownership priorities establish the basis for a useful conversation.",
        points: [],
      },
      {
        number: "02",
        label: "Relationship Match",
        title: "Focus outreach on relevant experience and capacity.",
        body: "Project type, geography, scale, delivery needs, schedule, and relationship fit guide which contractor or builder conversations are worth advancing.",
        points: [],
      },
      {
        number: "03",
        label: "Client Control",
        title: "Keep selection and contracting decisions with the client.",
        body: "Gala coordinates context and communication while the client and its qualified advisors evaluate credentials, proposals, contracts, pricing, and construction responsibility.",
        points: [],
      },
    ],
  },
  process: {
    type: "process",
    id: "gc-builder-relationships-process",
    eyebrow: "The Relationship Process",
    headline: "Move from project requirements to productive builder conversations.",
    introduction:
      "The process keeps the project brief, relationship criteria, introductions, and next decisions organized.",
    steps: [
      { number: "01", title: "Define", body: "Confirm the project type, location, status, anticipated scope, schedule, delivery expectations, and information available for review." },
      { number: "02", title: "Identify", body: "Consider relevant contractor and builder relationships against geography, experience, scale, availability, and the client's stated needs." },
      { number: "03", title: "Connect", body: "Share an appropriate project brief, coordinate introductory conversations, and keep questions and requested information organized." },
      { number: "04", title: "Advance", body: "Document next steps while the client and its advisors control qualification, pricing, selection, contracting, and construction decisions." },
    ],
  },
  deliverables: {
    type: "deliverables",
    eyebrow: "Services + Deliverables",
    headline: "Useful introductions without replacing due diligence or the project team.",
    introduction:
      "Gala does not act as the general contractor, guarantee performance, or replace the client's architectural, engineering, legal, financial, procurement, or construction advisors.",
    items: [
      { icon: "positioning", title: "Project Brief", body: "A concise view of the opportunity, status, anticipated scope, timing, known dependencies, and client priorities." },
      { icon: "prospects", title: "Relationship Criteria", body: "The geography, asset experience, scale, capacity, delivery approach, and communication fit relevant to the conversation." },
      { icon: "marketing", title: "Introductions + Context", body: "Coordinated introductions supported by the information each party needs to determine whether further discussion is worthwhile." },
      { icon: "execution", title: "Next-Step Record", body: "Questions, information requests, meetings, responsibilities, and agreed next actions kept visible to the client." },
    ],
  },
  relatedHeadline: "Connect builder conversations to the broader development path.",
  relatedIntroduction:
    "Move directly into the site, approval, infrastructure, or capital workstream affecting the next ownership decision.",
  relatedLinks: [
    { label: "Development", title: "Site Selection", body: "Clarify the site requirement, alternatives, and decision-driving unknowns.", href: "/services/development-services/site-selection" },
    { label: "Development", title: "Entitlements", body: "Organize jurisdictional milestones and the specialist-led approval path.", href: "/services/development-services/entitlements" },
    { label: "Development", title: "Infrastructure", body: "Track access, utilities, stormwater, off-site work, and provider dependencies.", href: "/services/development-services/infrastructure" },
    { label: "Capital Markets", title: "Transaction Coordination", body: "Connect capital-source diligence and closing milestones to the development record.", href: "/services/capital-markets#transaction-coordination" },
  ],
  ctaEyebrow: "Start With the Project Brief",
  ctaHeadline: "Make the first builder conversation a useful one.",
  ctaBody:
    "Share the site, current plan, project status, anticipated scope, schedule, and relationship needs. Gala will help determine which conversations may be relevant and organize the introduction.",
});

export const developmentCapabilityPages = [
  siteSelection,
  entitlements,
  infrastructure,
  gcBuilderRelationships,
];
