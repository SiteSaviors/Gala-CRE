import developmentInfrastructure from "@/assets/development-infrastructure.webp";
import siteStrategyEntitlements from "@/assets/site-strategy-entitlements.webp";
import { buildCapabilityPage } from "@/content/capabilityPageBlueprint";

const siteStrategy = buildCapabilityPage({
  path: "/services/development-services/site-strategy",
  parent: { label: "Development", href: "/services/development-services" },
  image: siteStrategyEntitlements,
  metadataDescription:
    "Commercial site strategy connecting intended use, market fit, physical constraints, access, infrastructure, approvals, and a disciplined diligence roadmap.",
  hero: {
    eyebrow: "Development · Site Strategy",
    title: "Site Strategy",
    lead:
      "Test the site against the business plan early—before assumptions become expensive commitments.",
    alt: "Generic development advisory table with site plans, material samples, and an architectural massing model",
    position: "center 54%",
    primaryLabel: "Discuss a Site",
    inquiryHref: "/contact?inquiry=development-services&focus=site-strategy",
    processLabel: "See the Evaluation Process",
    processId: "site-strategy-process",
    signalLabel: "Site strategy stages",
    signals: ["Define", "Screen", "Test", "Sequence"],
  },
  challenge: {
    watermark: "FIT",
    eyebrow: "The Early Decision",
    headline: "A compelling location can still be the wrong site.",
    body: [
      "Development feasibility lives at the intersection of use, demand, land configuration, access, utilities, jurisdiction, schedule, and capital. Looking at any one of those in isolation can make a site appear simpler than it is.",
      "Gala helps ownership frame the right questions, engage the appropriate specialists, and understand which findings should change the plan before more time and capital are committed.",
    ],
    emphasis:
      "Site strategy is decision support—not a substitute for engineering, legal, environmental, or governmental approval.",
    pressures: [
      { number: "01", title: "Program Fit", body: "The intended use, scale, circulation, parking, and operating model must fit the site's physical and regulatory context." },
      { number: "02", title: "Critical Constraints", body: "Access, utilities, topography, stormwater, environmental conditions, and off-site work can reshape feasibility." },
      { number: "03", title: "Sequence", body: "The order of studies, agency conversations, contracts, and capital decisions affects both cost and leverage." },
    ],
  },
  process: {
    eyebrow: "The Site Strategy Process",
    headline: "Move from possibility to a defensible next decision.",
    introduction:
      "The process establishes the objective, screens the available record, identifies decision-driving unknowns, and sequences the specialist work needed to evaluate them.",
    steps: [
      { number: "01", title: "Define", body: "Clarify the intended use, operating requirements, ownership objective, capital limits, timing, and acceptable alternatives." },
      { number: "02", title: "Screen", body: "Review the known parcel, planning, access, utility, physical, environmental, and market context at an appropriate early level." },
      { number: "03", title: "Test", body: "Coordinate focused input from brokers, planners, engineers, architects, attorneys, providers, and other specialists as needed." },
      { number: "04", title: "Sequence", body: "Create a practical roadmap of decisions, diligence, approvals, dependencies, responsibilities, and stop-or-proceed points." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A clearer development brief before the heavy lift.",
    introduction:
      "The work product is a decision framework that makes the program, constraints, open questions, specialist assignments, and next milestones visible.",
    items: [
      { icon: "positioning", title: "Development Objective", body: "A concise brief connecting intended use, scale, operating needs, timing, ownership priorities, and alternatives." },
      { icon: "marketing", title: "Site + Market Context", body: "A commercial view of location, surrounding uses, likely demand, competitive context, and the site's role in the market." },
      { icon: "prospects", title: "Constraint Register", body: "An organized list of known conditions, assumptions, missing information, and questions requiring specialist verification." },
      { icon: "tours", title: "Specialist Coordination", body: "Introductions and working sessions with the technical, legal, planning, and market professionals appropriate to the decision." },
      { icon: "economics", title: "Dependency View", body: "A practical look at how access, utilities, approvals, schedule, and site work may influence cost and capital timing." },
      { icon: "execution", title: "Decision Roadmap", body: "Sequenced next steps, ownership decisions, responsible parties, and milestone checkpoints for moving forward or stopping." },
    ],
  },
  related: {
    headline: "A site strategy should lead somewhere useful.",
    introduction:
      "Gala connects early evaluation to the approval, infrastructure, sale, and capital work that may follow once the opportunity is sufficiently understood.",
    links: [
      { label: "Development", title: "Entitlements", body: "Coordinate the jurisdictional path and the team required to advance a defined program.", href: "/services/development-services/entitlements" },
      { label: "Development", title: "Infrastructure", body: "Clarify access, utility, stormwater, and off-site dependencies affecting execution.", href: "/services/development-services/infrastructure" },
      { label: "Investment Sales", title: "Land", body: "Position a site for buyers based on verified use paths, constraints, and timing.", href: "/services/investment-sales/land" },
      { label: "Capital Markets", title: "Capital Strategy", body: "Align funding structure and timing with the development plan and its dependencies.", href: "/services/capital-markets/capital-strategy" },
    ],
  },
  cta: {
    eyebrow: "Start Before the Commitment",
    headline: "Bring us the site, the idea, and the questions that still matter.",
    body:
      "Gala will help organize the early commercial decision and identify the specialist work needed to evaluate the opportunity responsibly.",
  },
});

const entitlements = buildCapabilityPage({
  path: "/services/development-services/entitlements",
  parent: { label: "Development", href: "/services/development-services" },
  image: siteStrategyEntitlements,
  metadataDescription:
    "Commercial entitlement coordination aligning the proposed program, jurisdictional process, consultant team, public requirements, milestones, and ownership decisions.",
  hero: {
    eyebrow: "Development · Entitlements",
    title: "Entitlements",
    lead:
      "Turn an intended program into an organized approval path with the right team, decisions, and dependencies visible.",
    alt: "Generic planning workspace with site plans and a development massing model used for entitlement coordination",
    position: "center 47%",
    primaryLabel: "Discuss an Approval Path",
    inquiryHref: "/contact?inquiry=development-services&focus=entitlements",
    processLabel: "See the Coordination Process",
    processId: "entitlement-process",
    signalLabel: "Entitlement coordination stages",
    signals: ["Frame", "Assemble", "Advance", "Resolve"],
  },
  challenge: {
    watermark: "PATH",
    eyebrow: "The Approval Challenge",
    headline: "Approvals are a coordinated process, not a single submission.",
    body: [
      "A proposed use may require zoning interpretation, rezoning, special approvals, site-plan review, agency coordination, technical studies, public meetings, conditions, and follow-through across several disciplines.",
      "Gala helps ownership keep the commercial objective, consultant work, jurisdictional milestones, and decision calendar connected while the appropriate professionals provide legal, planning, engineering, and environmental conclusions.",
    ],
    emphasis:
      "No entitlement outcome can be guaranteed. The value is a better-organized path, clearer decisions, and fewer preventable gaps.",
    pressures: [
      { number: "01", title: "Jurisdiction", body: "Procedures, review bodies, submittal requirements, public processes, and timing differ by location and approval type." },
      { number: "02", title: "Technical Record", body: "Plans and studies must respond to access, utilities, stormwater, traffic, environmental, and design requirements." },
      { number: "03", title: "Ownership Decisions", body: "Program changes, conditions, cost exposure, schedule, and risk require timely direction from the client." },
    ],
  },
  process: {
    eyebrow: "The Entitlement Coordination Process",
    headline: "Keep the program, team, and approval calendar aligned.",
    introduction:
      "Gala organizes the commercial workstream around a specialist-led approval process and maintains visibility into what has been decided, submitted, requested, and left open.",
    steps: [
      { number: "01", title: "Frame", body: "Define the proposed program, current land-use position, likely approval path, material constraints, and client decision criteria." },
      { number: "02", title: "Assemble", body: "Coordinate the planners, engineers, architects, attorneys, environmental professionals, and other specialists required for the path." },
      { number: "03", title: "Advance", body: "Track submittals, meetings, comments, revisions, dependencies, and ownership decisions against the working schedule." },
      { number: "04", title: "Resolve", body: "Document conditions, remaining approvals, cost and schedule implications, and the next execution requirements after each milestone." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "Commercial continuity around a specialist-led process.",
    introduction:
      "Gala provides coordination and decision support; governmental authorities issue approvals, and licensed professionals remain responsible for their work and opinions.",
    items: [
      { icon: "positioning", title: "Approval-Path Brief", body: "A working summary of the proposed program, current position, anticipated approvals, dependencies, and open questions." },
      { icon: "prospects", title: "Consultant Alignment", body: "Clear roles and communication across planning, civil, architecture, traffic, environmental, legal, and other required disciplines." },
      { icon: "tours", title: "Agency + Meeting Coordination", body: "Preparation, attendance support, follow-up, and action tracking around jurisdictional and stakeholder conversations." },
      { icon: "marketing", title: "Comment + Revision Tracking", body: "An organized record of agency comments, team responses, plan changes, responsibilities, and unresolved decisions." },
      { icon: "economics", title: "Condition Impact Review", body: "Commercial visibility into how proposed conditions or revisions may affect program, schedule, cost, and transaction objectives." },
      { icon: "execution", title: "Milestone Reporting", body: "Concise ownership updates covering completed work, pending decisions, upcoming submissions, risks, and next steps." },
    ],
  },
  related: {
    headline: "Approvals must stay connected to execution.",
    introduction:
      "Gala can coordinate the surrounding infrastructure, oversight, capital, and transaction conversations when they are material to the approval path.",
    links: [
      { label: "Development", title: "Site Strategy", body: "Clarify program fit and decision-driving unknowns before committing to the entitlement path.", href: "/services/development-services/site-strategy" },
      { label: "Development", title: "Infrastructure", body: "Coordinate access, utility, stormwater, and off-site dependencies alongside approvals.", href: "/services/development-services/infrastructure" },
      { label: "Development", title: "Development Oversight", body: "Keep ownership decisions, consultants, schedule, and execution priorities aligned as the project advances.", href: "/services/development-services/development-oversight" },
      { label: "Capital Markets", title: "Capital Strategy", body: "Sequence funding decisions around approval risk, timing, and development milestones.", href: "/services/capital-markets/capital-strategy" },
    ],
  },
  cta: {
    eyebrow: "Start With the Current Record",
    headline: "Let’s organize the path from proposed use to actionable approval milestones.",
    body:
      "Share the site, intended program, known approvals, consultant work, jurisdictional feedback, and timing. Gala will help identify the coordination gaps and next decisions.",
  },
});

const infrastructure = buildCapabilityPage({
  path: "/services/development-services/infrastructure",
  parent: { label: "Development", href: "/services/development-services" },
  image: developmentInfrastructure,
  metadataDescription:
    "Commercial development infrastructure coordination covering access, utilities, stormwater, off-site obligations, specialist responsibilities, timing, and execution dependencies.",
  hero: {
    eyebrow: "Development · Infrastructure",
    title: "Infrastructure Coordination",
    lead:
      "Make access, utilities, stormwater, and off-site work visible before they control the project from the shadows.",
    alt: "Generic commercial development site with roadway, utility, drainage, and building-pad work underway",
    position: "center 56%",
    primaryLabel: "Discuss Infrastructure Needs",
    inquiryHref: "/contact?inquiry=development-services&focus=infrastructure",
    processLabel: "See the Coordination Process",
    processId: "infrastructure-process",
    signalLabel: "Infrastructure coordination stages",
    signals: ["Map", "Validate", "Coordinate", "Track"],
  },
  challenge: {
    watermark: "SYSTEMS",
    eyebrow: "The Execution Dependency",
    headline: "A site does not work until its systems do.",
    body: [
      "Road access, water, sewer, power, communications, stormwater, grading, easements, capacity, extensions, and off-site improvements can determine whether a program is feasible and when it can move.",
      "Gala helps ownership coordinate the information, specialists, providers, public agencies, responsibilities, and decisions surrounding those systems without presenting itself as the engineer, utility, contractor, or approving authority.",
    ],
    emphasis:
      "Infrastructure coordination creates visibility. Capacity, design, cost, and approval conclusions remain subject to provider and specialist verification.",
    pressures: [
      { number: "01", title: "Capacity", body: "Availability nearby does not establish adequate capacity, connection rights, pressure, service, or delivery timing." },
      { number: "02", title: "Responsibility", body: "On-site work, off-site work, extensions, easements, fees, and cost participation need clear ownership." },
      { number: "03", title: "Critical Path", body: "Design, approvals, procurement, provider schedules, and construction sequencing can control the development calendar." },
    ],
  },
  process: {
    eyebrow: "The Infrastructure Coordination Process",
    headline: "Expose the dependencies, then manage the handoffs.",
    introduction:
      "The process organizes known conditions and specialist findings into a working path of confirmations, responsibilities, decisions, and milestones.",
    steps: [
      { number: "01", title: "Map", body: "Identify required access, utility, stormwater, grading, easement, and off-site systems against the proposed program." },
      { number: "02", title: "Validate", body: "Coordinate specialist and provider confirmation of availability, capacity, connection conditions, approvals, timing, and known constraints." },
      { number: "03", title: "Coordinate", body: "Align civil, utility, jurisdictional, ownership, contractor, and adjacent-party workstreams around current information and decisions." },
      { number: "04", title: "Track", body: "Maintain visibility into responsibilities, dependencies, open items, cost inputs, schedule exposure, and completion evidence." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "A coordinated view of the systems beneath the plan.",
    introduction:
      "Gala supports ownership communication and execution planning while technical design, estimates, permits, and construction remain with the appropriate professionals.",
    items: [
      { icon: "positioning", title: "Infrastructure Matrix", body: "A clear inventory of required systems, current information, verification source, responsible party, status, and dependency." },
      { icon: "tours", title: "Provider Coordination", body: "Organized communication with relevant utility providers, agencies, municipalities, and technical consultants." },
      { icon: "prospects", title: "Responsibility Map", body: "Visibility into owner, provider, jurisdiction, contractor, and third-party responsibilities for key workstreams." },
      { icon: "economics", title: "Cost-Input Coordination", body: "Collection and comparison of specialist and provider inputs needed for ownership budgeting and capital planning." },
      { icon: "marketing", title: "Schedule + Dependency Tracking", body: "A working view of approvals, design, easements, procurement, construction, and other critical-path relationships." },
      { icon: "execution", title: "Decision + Completion Record", body: "Ownership decisions, submitted materials, conditions, outstanding items, and available completion evidence kept organized." },
    ],
  },
  related: {
    headline: "Infrastructure shapes more than the site plan.",
    introduction:
      "The same findings can affect entitlements, development sequencing, capital needs, buyer interest, and transaction conditions across the opportunity.",
    links: [
      { label: "Development", title: "Site Strategy", body: "Evaluate infrastructure as part of early program and site fit.", href: "/services/development-services/site-strategy" },
      { label: "Development", title: "Entitlements", body: "Coordinate infrastructure findings with jurisdictional review and approval milestones.", href: "/services/development-services/entitlements" },
      { label: "Development", title: "Development Oversight", body: "Track infrastructure decisions and dependencies across the broader project plan.", href: "/services/development-services/development-oversight" },
      { label: "Capital Markets", title: "Debt", body: "Organize financing requirements around verified scope, budget, schedule, and delivery risk.", href: "/services/capital-markets/debt" },
    ],
  },
  cta: {
    eyebrow: "Start With the Dependencies",
    headline: "Let’s make the systems, responsibilities, and timing visible.",
    body:
      "Share the site plan, known provider information, consultant work, jurisdictional feedback, budget assumptions, and schedule. Gala will help organize the next coordination decisions.",
  },
});

const developmentOversight = buildCapabilityPage({
  path: "/services/development-services/development-oversight",
  parent: { label: "Development", href: "/services/development-services" },
  image: developmentInfrastructure,
  metadataDescription:
    "Owner-side commercial development oversight connecting decisions, consultants, approvals, budget inputs, schedule, risks, reporting, and transaction priorities.",
  hero: {
    eyebrow: "Development · Development Oversight",
    title: "Development Oversight",
    lead:
      "Keep ownership decisions, specialists, approvals, schedule, and commercial priorities moving as one coordinated project.",
    alt: "Generic commercial project under development with an advisor reviewing site progress",
    position: "center 48%",
    primaryLabel: "Discuss a Development",
    inquiryHref: "/contact?inquiry=development-services&focus=development-oversight",
    processLabel: "See the Oversight Process",
    processId: "development-oversight-process",
    signalLabel: "Development oversight stages",
    signals: ["Align", "Monitor", "Decide", "Report"],
  },
  challenge: {
    watermark: "CONTROL",
    eyebrow: "The Ownership Challenge",
    headline: "Complex projects lose time in the gaps between teams.",
    body: [
      "Design, approvals, infrastructure, pricing, procurement, construction, leasing, capital, and transaction work may be led by different professionals with different scopes and calendars.",
      "Gala provides owner-side coordination around the commercial plan so decisions, dependencies, open items, and material changes remain visible. Licensed design, engineering, legal, financial, and construction responsibilities stay with the contracted specialists.",
    ],
    emphasis:
      "Oversight does not replace the project team. It gives ownership a clearer view across it.",
    pressures: [
      { number: "01", title: "Alignment", body: "The program, budget, schedule, approvals, leasing, and capital plan must reflect the same ownership objective." },
      { number: "02", title: "Decisions", body: "Late or poorly framed choices can create redesign, delay, cost, and transaction consequences." },
      { number: "03", title: "Visibility", body: "Ownership needs concise reporting on progress, risks, changes, responsibilities, and next milestones." },
    ],
  },
  process: {
    eyebrow: "The Development Oversight Process",
    headline: "Create one decision rhythm across the project.",
    introduction:
      "Gala establishes the ownership brief and reporting structure, then maintains cross-team visibility as specialist work and project milestones advance.",
    steps: [
      { number: "01", title: "Align", body: "Confirm the ownership objective, program, team roles, decision rights, workstreams, baseline schedule, and commercial milestones." },
      { number: "02", title: "Monitor", body: "Track consultant work, approvals, infrastructure, pricing, procurement, capital, leasing, risks, and interdependent dates." },
      { number: "03", title: "Decide", body: "Frame material choices with the relevant specialist input, alternatives, timing, and commercial consequences visible." },
      { number: "04", title: "Report", body: "Provide concise ownership updates on completed work, changes, open decisions, upcoming milestones, and accountable next actions." },
    ],
  },
  deliverables: {
    eyebrow: "Services + Deliverables",
    headline: "Owner-side clarity without duplicating specialist scopes.",
    introduction:
      "The oversight layer is designed around coordination, decisions, and reporting—not architectural, engineering, legal, contractor, or property-management services.",
    items: [
      { icon: "positioning", title: "Ownership Brief", body: "A shared definition of project objectives, program, commercial priorities, decision criteria, roles, and reporting expectations." },
      { icon: "prospects", title: "Team + Scope Alignment", body: "Clear workstream ownership, interfaces, dependencies, communication paths, and escalation points across the project team." },
      { icon: "marketing", title: "Milestone Dashboard", body: "A concise working view of approvals, design, infrastructure, budget inputs, procurement, construction, leasing, and capital dates." },
      { icon: "economics", title: "Change + Risk Visibility", body: "Material changes, open assumptions, emerging risks, cost inputs, schedule effects, and required ownership decisions documented." },
      { icon: "tours", title: "Meeting + Action Coordination", body: "Focused agendas, decision preparation, action ownership, follow-up, and cross-team issue resolution." },
      { icon: "execution", title: "Ownership Reporting", body: "Regular updates organized around progress, exceptions, near-term decisions, critical dependencies, and the path ahead." },
    ],
  },
  related: {
    headline: "Oversight keeps the commercial plan connected.",
    introduction:
      "Gala can coordinate the surrounding site, approval, infrastructure, capital, and market conversations when those workstreams affect development decisions.",
    links: [
      { label: "Development", title: "Site Strategy", body: "Clarify the development brief, site fit, and decision-driving unknowns.", href: "/services/development-services/site-strategy" },
      { label: "Development", title: "Entitlements", body: "Organize jurisdictional milestones and the specialist-led approval path.", href: "/services/development-services/entitlements" },
      { label: "Development", title: "Infrastructure", body: "Track access, utilities, stormwater, off-site work, and provider dependencies.", href: "/services/development-services/infrastructure" },
      { label: "Capital Markets", title: "Transaction Coordination", body: "Keep capital-source diligence and closing milestones connected to the development record.", href: "/services/capital-markets/transaction-coordination" },
    ],
  },
  cta: {
    eyebrow: "Create Project Visibility",
    headline: "Let’s organize the decisions that ownership needs to control.",
    body:
      "Share the current plan, project team, approvals, schedule, active risks, and near-term milestones. Gala will help define the oversight layer that adds useful clarity.",
  },
});

export const developmentCapabilityPages = [
  siteStrategy,
  entitlements,
  infrastructure,
  developmentOversight,
];
