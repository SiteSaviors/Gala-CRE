import type { CapabilityPageContent, CapabilityPageSection } from "@/content/capabilityPages";
import { capitalCapabilityPages } from "@/content/capitalMarketsCapabilityPages";
import { developmentCapabilityPages } from "@/content/developmentCapabilityPages";

type StrategySection = Extract<CapabilityPageSection, { type: "strategy" }>;
type ProcessStep = Extract<CapabilityPageSection, { type: "process" }>["steps"][number];

export type ServiceChapterFamily = "development" | "capital-markets";

export type ServiceChapterPageContent = {
  path: string;
  slug: string;
  family: ServiceChapterFamily;
  familyLabel: "Development" | "Capital Markets";
  title: string;
  titleLines: string[];
  metadata: CapabilityPageContent["metadata"];
  hero: {
    lead: string;
    media: CapabilityPageContent["hero"]["media"];
    mobilePosition?: string;
  };
  positioning: {
    eyebrow: string;
    titleLines: string[];
    body: string[];
    media: StrategySection["media"];
    mobilePosition?: string;
  };
  factors: {
    eyebrow: string;
    titleLines: string[];
    items: Array<{ number: string; title: string; body: string }>;
  };
  process: {
    eyebrow: string;
    titleLines: string[];
    introduction: string;
    steps: ProcessStep[];
  };
  consultation: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    messageLabel: string;
    successBody: string;
  };
};

type ChapterInput = {
  source: CapabilityPageContent;
  family: ServiceChapterFamily;
  familyLabel: ServiceChapterPageContent["familyLabel"];
  title: string;
  titleLines: string[];
  positioningLines: string[];
  factorsEyebrow: string;
  factorsLines: string[];
  processLines: string[];
  processSteps: ProcessStep[];
  consultationLines: string[];
  messageLabel: string;
  successBody: string;
  heroMobilePosition?: string;
  positioningMobilePosition?: string;
};

const getSection = <T extends CapabilityPageSection["type"]>(
  source: CapabilityPageContent,
  type: T,
) => source.sections.find((section) => section.type === type) as Extract<CapabilityPageSection, { type: T }>;

const createChapter = ({
  source,
  family,
  familyLabel,
  title,
  titleLines,
  positioningLines,
  factorsEyebrow,
  factorsLines,
  processLines,
  processSteps,
  consultationLines,
  messageLabel,
  successBody,
  heroMobilePosition,
  positioningMobilePosition,
}: ChapterInput): ServiceChapterPageContent => {
  const strategy = getSection(source, "strategy");
  const process = getSection(source, "process");
  const deliverables = getSection(source, "deliverables");

  return {
    path: source.path,
    slug: source.path.split("/").at(-1) ?? "service",
    family,
    familyLabel,
    title,
    titleLines,
    metadata: {
      ...source.metadata,
      title,
    },
    hero: {
      lead: source.hero.lead,
      media: source.hero.media,
      mobilePosition: heroMobilePosition,
    },
    positioning: {
      eyebrow: strategy.eyebrow,
      titleLines: positioningLines,
      body: [strategy.introduction, deliverables.introduction],
      media: strategy.media,
      mobilePosition: positioningMobilePosition,
    },
    factors: {
      eyebrow: factorsEyebrow,
      titleLines: factorsLines,
      items: strategy.tracks.map(({ number, title: itemTitle, body }) => ({
        number,
        title: itemTitle,
        body,
      })),
    },
    process: {
      eyebrow: process.eyebrow,
      titleLines: processLines,
      introduction: process.introduction,
      steps: processSteps,
    },
    consultation: {
      eyebrow: source.cta.eyebrow,
      titleLines: consultationLines,
      body: source.cta.body,
      messageLabel,
      successBody,
    },
  };
};

const developmentBySlug = Object.fromEntries(
  developmentCapabilityPages.map((page) => [page.path.split("/").at(-1), page]),
) as Record<string, CapabilityPageContent>;

const capitalBySlug = Object.fromEntries(
  capitalCapabilityPages.map((page) => [page.path.split("/").at(-1), page]),
) as Record<string, CapabilityPageContent>;

const siteSelection = createChapter({
  source: developmentBySlug["site-selection"],
  family: "development",
  familyLabel: "Development",
  title: "Site Selection",
  titleLines: ["Site Selection"],
  positioningLines: ["The Right Site", "Has to Work", "Beyond the Map."],
  factorsEyebrow: "What the Site Must Support",
  factorsLines: ["Compare the Site.", "Then Test", "the Unknowns."],
  processLines: ["Move From", "Requirement to a", "Defensible Site", "Decision."],
  processSteps: [
    { number: "01", title: "Define", body: "Clarify the program, operating requirements, ownership objective, capital limits, timing, and acceptable alternatives." },
    { number: "02", title: "Compare", body: "Screen credible alternatives against consistent market, access, infrastructure, physical, approval, and timing criteria." },
    { number: "03", title: "Advance", body: "Coordinate focused specialist input and organize the tradeoffs, remaining unknowns, and next decision around the strongest option." },
  ],
  consultationLines: ["Bring Us the", "Requirement", "Before", "Committing to", "the Site."],
  messageLabel: "Tell us about the intended use, search area, timing, and site questions",
  successBody: "A Gala CRE advisor will review the site-selection requirement and follow up directly.",
  heroMobilePosition: "center 52%",
  positioningMobilePosition: "58% center",
});

const entitlements = createChapter({
  source: developmentBySlug.entitlements,
  family: "development",
  familyLabel: "Development",
  title: "Entitlements",
  titleLines: ["Entitlements"],
  positioningLines: ["Approvals Move", "When the Whole", "Path Stays", "Visible."],
  factorsEyebrow: "What the Approval Path Requires",
  factorsLines: ["Keep the Program,", "Record, and", "Calendar Aligned."],
  processLines: ["Advance the", "Program Without", "Losing the Record."],
  processSteps: [
    { number: "01", title: "Frame", body: "Define the proposed program, current land-use position, likely approval path, material constraints, and decision criteria." },
    { number: "02", title: "Coordinate", body: "Align the appropriate planners, engineers, architects, attorneys, environmental professionals, and agency conversations." },
    { number: "03", title: "Resolve", body: "Track submittals, comments, revisions, conditions, ownership decisions, and remaining execution requirements through each milestone." },
  ],
  consultationLines: ["Start With the", "Record and the", "Next Milestone."],
  messageLabel: "Tell us about the site, intended program, current approvals, and open questions",
  successBody: "A Gala CRE advisor will review the entitlement path and follow up directly.",
  heroMobilePosition: "53% center",
  positioningMobilePosition: "center",
});

const infrastructure = createChapter({
  source: developmentBySlug.infrastructure,
  family: "development",
  familyLabel: "Development",
  title: "Infrastructure",
  titleLines: ["Infrastructure"],
  positioningLines: ["A Site Only Works", "When Its", "Systems Do."],
  factorsEyebrow: "What the Plan Depends On",
  factorsLines: ["Confirm the Systems", "Beneath the Plan."],
  processLines: ["Expose the", "Dependencies.", "Manage the", "Handoffs."],
  processSteps: [
    { number: "01", title: "Map", body: "Identify the access, utility, stormwater, grading, easement, and off-site systems the proposed program requires." },
    { number: "02", title: "Validate", body: "Coordinate provider and specialist confirmation of availability, capacity, conditions, approvals, timing, and constraints." },
    { number: "03", title: "Track", body: "Keep responsibilities, cost inputs, provider calendars, construction handoffs, open items, and completion evidence visible." },
  ],
  consultationLines: ["Make the", "Systems,", "Responsibilities,", "and Timing", "Visible."],
  messageLabel: "Tell us about the site, required systems, current findings, and timing",
  successBody: "A Gala CRE advisor will review the infrastructure dependencies and follow up directly.",
  heroMobilePosition: "center 58%",
  positioningMobilePosition: "60% center",
});

const gcBuilderRelationships = createChapter({
  source: developmentBySlug["gc-builder-relationships"],
  family: "development",
  familyLabel: "Development",
  title: "GC / Builder Relationships",
  titleLines: ["GC / Builder", "Relationships"],
  positioningLines: ["Start With", "the Project.", "Then Find", "the Right", "Relationship."],
  factorsEyebrow: "What Makes an Introduction Relevant",
  factorsLines: ["Make Every", "Introduction Worth", "the Conversation."],
  processLines: ["Move From", "Project Brief to", "Productive", "Conversations."],
  processSteps: [
    { number: "01", title: "Define", body: "Confirm the project type, geography, current status, anticipated scope, schedule, delivery expectations, and available information." },
    { number: "02", title: "Identify", body: "Consider relevant contractor and builder relationships against experience, scale, capacity, availability, and working fit." },
    { number: "03", title: "Connect", body: "Share an appropriate brief, organize introductory conversations, and keep questions and next actions visible while the client controls selection." },
  ],
  consultationLines: ["Make the First", "Builder", "Conversation", "a Useful One."],
  messageLabel: "Tell us about the project, anticipated scope, schedule, and relationship needs",
  successBody: "A Gala CRE advisor will review the project and relationship needs and follow up directly.",
  heroMobilePosition: "62% center",
  positioningMobilePosition: "center",
});

const debt = createChapter({
  source: capitalBySlug.debt,
  family: "capital-markets",
  familyLabel: "Capital Markets",
  title: "Debt",
  titleLines: ["Debt"],
  positioningLines: ["The Best", "Financing Is", "the Structure", "That Can Close."],
  factorsEyebrow: "What Shapes Debt Execution",
  factorsLines: ["Compare the Terms", "That Shape", "the Outcome."],
  processLines: ["Make the Request", "Financeable Before", "It Reaches", "the Market."],
  processSteps: [
    { number: "01", title: "Frame + Prepare", body: "Define the purpose, proceeds, business plan, repayment path, sponsorship, timing, and lender materials." },
    { number: "02", title: "Compare", body: "Evaluate relevant sources across economics, structure, recourse, covenants, reserves, flexibility, conditions, and certainty." },
    { number: "03", title: "Close", body: "Coordinate commercial diligence, reports, documentation, funding conditions, milestones, and open decisions through closing." },
  ],
  consultationLines: ["Define the", "Financing Need", "Before", "Approaching", "the Market."],
  messageLabel: "Tell us about the asset, financing requirement, business plan, and timing",
  successBody: "A Gala CRE advisor will review the debt requirement and follow up directly.",
  heroMobilePosition: "58% center",
  positioningMobilePosition: "center",
});

const equity = createChapter({
  source: capitalBySlug.equity,
  family: "capital-markets",
  familyLabel: "Capital Markets",
  title: "Equity",
  titleLines: ["Equity"],
  positioningLines: ["Alignment Has", "to Work Beyond", "the Capital", "Check."],
  factorsEyebrow: "What Shapes Partner Fit",
  factorsLines: ["Test the Fit", "Behind the Capital."],
  processLines: ["Clarify the", "Partnership Before", "Broadening the", "Conversation."],
  processSteps: [
    { number: "01", title: "Define + Prepare", body: "Clarify the capital need, sponsor contribution, business plan, risk, return framework, timing, and investment narrative." },
    { number: "02", title: "Align", body: "Engage relevant relationships and compare mandate, economics, control, reporting, duration, timing, and working fit." },
    { number: "03", title: "Advance", body: "Coordinate commercial diligence, decisions, documentation, funding conditions, and the path to closing alongside qualified advisors." },
  ],
  consultationLines: ["Define What an", "Aligned Equity", "Conversation", "Requires."],
  messageLabel: "Tell us about the opportunity, capital need, sponsorship, and partnership objectives",
  successBody: "A Gala CRE advisor will review the equity requirement and follow up directly.",
  heroMobilePosition: "58% center",
  positioningMobilePosition: "center",
});

const jointVenture = createChapter({
  source: capitalBySlug["joint-venture"],
  family: "capital-markets",
  familyLabel: "Capital Markets",
  title: "Joint Venture",
  titleLines: ["Joint Venture"],
  positioningLines: ["Build the", "Partnership", "Before You Build", "the Deal."],
  factorsEyebrow: "What Partnership Alignment Requires",
  factorsLines: ["Align the", "Economics, Control,", "and Exit."],
  processLines: ["Turn Shared Intent", "Into an Executable", "Partnership."],
  processSteps: [
    { number: "01", title: "Define", body: "Clarify the opportunity, business plan, capital requirement, sponsor role, timing, risk, and partnership objectives." },
    { number: "02", title: "Align", body: "Test working fit and organize contributions, economics, roles, governance, reporting, future funding, duration, and exit expectations." },
    { number: "03", title: "Advance", body: "Coordinate commercial diligence and milestones alongside the parties' legal, tax, securities, accounting, and investment advisors." },
  ],
  consultationLines: ["Clarify the", "Partnership", "Before", "Documenting", "the Structure."],
  messageLabel: "Tell us about the opportunity, proposed roles, capital requirement, and partnership questions",
  successBody: "A Gala CRE advisor will review the joint venture opportunity and follow up directly.",
  heroMobilePosition: "center 52%",
  positioningMobilePosition: "center",
});

const capitalStrategy = createChapter({
  source: capitalBySlug["capital-strategy"],
  family: "capital-markets",
  familyLabel: "Capital Markets",
  title: "Capital Strategy",
  titleLines: ["Capital", "Strategy"],
  positioningLines: ["Structure the", "Capital Around", "the Real", "Business Plan."],
  factorsEyebrow: "What the Capital Plan Must Resolve",
  factorsLines: ["See the Whole Stack", "Before Choosing", "a Path."],
  processLines: ["Build the", "Structure Around", "the Real Execution", "Calendar."],
  processSteps: [
    { number: "01", title: "Map + Test", body: "Define sources, uses, timing, sponsorship, ownership objectives, milestones, constraints, and practical capital alternatives." },
    { number: "02", title: "Compare", body: "Evaluate proceeds, pricing, recourse, governance, dilution, flexibility, reserves, conditions, and certainty." },
    { number: "03", title: "Sequence", body: "Establish decisions, information needs, market windows, funding milestones, dependencies, and next actions against the business plan." },
  ],
  consultationLines: ["Organize the", "Structure Before", "the Choices", "Narrow."],
  messageLabel: "Tell us about the opportunity, sources and uses, timing, and ownership priorities",
  successBody: "A Gala CRE advisor will review the capital strategy and follow up directly.",
  heroMobilePosition: "58% center",
  positioningMobilePosition: "center",
});

export const serviceChapterPages: ServiceChapterPageContent[] = [
  siteSelection,
  entitlements,
  infrastructure,
  gcBuilderRelationships,
  debt,
  equity,
  jointVenture,
  capitalStrategy,
];

export const serviceChapterPageByPath: Record<string, ServiceChapterPageContent> = Object.fromEntries(
  serviceChapterPages.map((page) => [page.path, page]),
);

export const findServiceChapterPage = (path: string) => serviceChapterPageByPath[path];
