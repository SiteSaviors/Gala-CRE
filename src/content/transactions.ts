import { propertyBySlug, type PropertyAssetType } from "@/content/properties";
import type { TeamMemberId } from "@/content/team";

export type TrackRecordMetricId =
  | "transaction-volume"
  | "completed-transactions"
  | "represented-scale"
  | "years-experience";

export type TrackRecordMetric = {
  id: TrackRecordMetricId;
  label: string;
  value: string | null;
  reportingPeriod: string | null;
};

// These values intentionally remain null until Gala confirms both the number
// and its scope. The future homepage renderer must use publishedTrackRecordMetrics
// so an unverified metric can never appear as a zero or placeholder.
export const trackRecordMetrics: TrackRecordMetric[] = [
  {
    id: "transaction-volume",
    label: "Closed transaction volume",
    value: null,
    reportingPeriod: null,
  },
  {
    id: "completed-transactions",
    label: "Transactions completed",
    value: null,
    reportingPeriod: null,
  },
  {
    id: "represented-scale",
    label: "Acreage or square footage represented",
    value: null,
    reportingPeriod: null,
  },
  {
    id: "years-experience",
    label: "Years of experience",
    value: null,
    reportingPeriod: null,
  },
];

export type PublishedTrackRecordMetric = TrackRecordMetric & { value: string };

export const publishedTrackRecordMetrics = trackRecordMetrics.filter(
  (metric): metric is PublishedTrackRecordMetric => metric.value !== null,
);

export type TransactionPhotography = {
  src: string;
  alt: string;
};

type TransactionSource = {
  id: string;
  propertySlug: string;
  closeDate: string | null;
  galaRole: string | null;
  publishablePrice: string | null;
  advisorId: TeamMemberId | null;
  photographyApprovedForHomepage: boolean;
  identityScope: string;
  statement: string;
  summary: string;
};

export type Transaction = {
  id: string;
  propertySlug: string;
  status: "Closed";
  headline: string;
  location: string;
  assetType: PropertyAssetType;
  closeDate: string | null;
  galaRole: string | null;
  publishablePrice: string | null;
  advisorId: TeamMemberId | null;
  approvedPhotography: TransactionPhotography | null;
  identityScope: string;
  detailPath: string;
  metricDisplay: string;
  metricLabel: string;
  factDisplay: string;
  factLabel: string;
  statement: string;
  summary: string;
};

const transactionSources: TransactionSource[] = [
  {
    id: "10416-chapel-hill-road",
    propertySlug: "10416-chapel-hill-road",
    closeDate: "July 29, 2026",
    galaRole: "Listing involvement",
    publishablePrice: null,
    advisorId: null,
    photographyApprovedForHomepage: false,
    identityScope:
      "The supplied transaction record supports 10416 Chapel Hill Road only; the relationship to 10414 Chapel Hill Road requires client confirmation.",
    statement: "A completed commercial land transaction in Morrisville.",
    summary:
      "The supplied record documents a two-parcel commercial land transaction at 10416 Chapel Hill Road in Morrisville.",
  },
  {
    id: "802-bragg-boulevard",
    propertySlug: "802-bragg-boulevard",
    closeDate: null,
    galaRole: "Listing representation",
    publishablePrice: null,
    advisorId: "gaurang-gala",
    photographyApprovedForHomepage: true,
    identityScope: "The completed transaction record is limited to 802 Bragg Boulevard.",
    statement: "A completed retail and automotive-service transaction in Fayetteville.",
    summary:
      "Gala CRE represented the former listing for a 2,529-square-foot retail and service property on approximately 1.15 acres.",
  },
  {
    id: "202-north-main-street",
    propertySlug: "202-north-main-street",
    closeDate: "July 30, 2026",
    galaRole: null,
    publishablePrice: null,
    advisorId: null,
    photographyApprovedForHomepage: false,
    identityScope: "The completed transaction record is limited to 202 North Main Street.",
    statement: "A completed commercial transaction in Fuquay-Varina.",
    summary:
      "The supplied record documents a 3,333-square-foot commercial property transaction on approximately 0.23 acres.",
  },
];

const buildTransaction = (source: TransactionSource): Transaction => {
  const property = propertyBySlug[source.propertySlug];

  if (!property || property.status !== "Closed") {
    throw new Error(`Transaction source ${source.id} must reference a closed property record.`);
  }

  return {
    id: source.id,
    propertySlug: source.propertySlug,
    status: "Closed",
    headline: property.name,
    location: `${property.city}, ${property.state}`,
    assetType: property.assetType,
    closeDate: source.closeDate,
    galaRole: source.galaRole,
    publishablePrice: source.publishablePrice,
    advisorId: source.advisorId,
    approvedPhotography: source.photographyApprovedForHomepage
      ? {
          src: property.heroImage,
          alt: property.imageAlt ?? `${property.name} completed transaction`,
        }
      : null,
    identityScope: source.identityScope,
    detailPath: `/properties/${property.slug}`,
    metricDisplay: "Closed",
    metricLabel: "Transaction Status",
    factDisplay: property.acreageDisplay ?? property.sizeDisplay ?? property.assetType,
    factLabel: property.acreageDisplay ? "Site area" : property.sizeDisplay ? "Building area" : "Asset type",
    statement: source.statement,
    summary: source.summary,
  };
};

// The order is deliberate: the current homepage continues to use the first
// record until the Selected Transactions section is rebuilt in Phase 2.
export const transactions = transactionSources.map(buildTransaction);

export const featuredTransaction = transactions[0];

export type TransactionCandidate = {
  id: string;
  propertyIdentity: string;
  status: null;
  closeDate: null;
  location: string;
  assetType: string;
  galaRole: null;
  publishablePrice: null;
  approvedPhotography: null;
  advisorId: null;
  detailPath: null;
  publicationStatus: "Blocked";
  blocker: string;
};

export const transactionCandidates: TransactionCandidate[] = [
  {
    id: "watkins",
    propertyIdentity: "Alta Watkins development proposal",
    status: null,
    closeDate: null,
    location: "Watkins Road, Morrisville, NC",
    assetType: "Proposed multifamily development",
    galaRole: null,
    publishablePrice: null,
    approvedPhotography: null,
    advisorId: null,
    detailPath: null,
    publicationStatus: "Blocked",
    blocker:
      "No supplied closing record, Gala role, advisor assignment, transaction economics, or approved project-specific photography.",
  },
];
