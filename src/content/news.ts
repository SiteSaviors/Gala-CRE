export type NewsFormat = "Podcast" | "News Coverage";

export type NewsItem = {
  id: string;
  headline: string;
  outlet: string;
  publishedAt: string;
  dateDisplay: string;
  format: NewsFormat;
  summary: string;
  associatedEntity: string;
  url: string;
  homepage: boolean;
  featured: boolean;
};

// These records describe third-party coverage of Gala leadership and affiliated
// ventures. They must not be presented as coverage of Gala CRE Group unless a
// source expressly identifies Gala CRE Group.
export const newsItems: NewsItem[] = [
  {
    id: "investor-podcast-gaurang-gala",
    headline: "Gaurang Gala on land, capital, and opportunity in the Research Triangle",
    outlet: "The Investor with Joel Palathinkal",
    publishedAt: "2026-08-13",
    dateDisplay: "August 13, 2026",
    format: "Podcast",
    summary:
      "A conversation about zoning, entitlements, capital readiness, land value, and the infrastructure shaping the Southeast's next phase of growth.",
    associatedEntity: "Gala Investments · Radius Capital Development",
    url: "https://pod.wave.co/podcast/the-investor-with-joel-palathinkal/gaurang-galla-founder-of-gala-investments-llc-and-principal-at-radius-capital-development",
    homepage: true,
    featured: true,
  },
  {
    id: "legacy-carolina-pittard-sears",
    headline: "Cary firm plans luxury homes near proposed Apple campus",
    outlet: "Triangle Business Journal",
    publishedAt: "2025-07-25",
    dateDisplay: "July 25, 2025",
    format: "News Coverage",
    summary:
      "Triangle Business Journal reported on a proposed Chatham County community near Research Triangle Park and the Apple campus site.",
    associatedEntity: "Legacy Carolina Development",
    url: "https://www.bizjournals.com/triangle/news/2025/07/25/chatham-cary-annexation-homes-cali-transplants-rtp.html",
    homepage: true,
    featured: false,
  },
  {
    id: "gala-investments-franklin",
    headline: "Developers submit plans for downtown Cary's tallest building yet",
    outlet: "The News & Observer",
    publishedAt: "2024-07-18",
    dateDisplay: "July 18, 2024",
    format: "News Coverage",
    summary:
      "The News & Observer covered plans for The Franklin, a proposed mixed-use condominium project opposite Downtown Cary Park.",
    associatedEntity: "Gala Investments",
    url: "https://www.newsobserver.com/news/local/counties/wake-county/article290132709.html",
    homepage: true,
    featured: false,
  },
  {
    id: "gala-investments-west-cary-townhomes",
    headline: "New townhomes coming to busy corridor in Cary",
    outlet: "Triangle Business Journal",
    publishedAt: "2023-05-16",
    dateDisplay: "May 16, 2023",
    format: "News Coverage",
    summary:
      "Coverage of a planned 55-townhome community along the Highway 55 corridor in west Cary.",
    associatedEntity: "Gala Investments",
    url: "https://www.bizjournals.com/triangle/news/2023/05/16/cary-new-townhomes-development-new-homes.html",
    homepage: false,
    featured: false,
  },
];

export const homepageNewsItems = newsItems.filter(({ homepage }) => homepage);
export const featuredNewsItem = homepageNewsItems.find(({ featured }) => featured) ?? homepageNewsItems[0];
export const supportingNewsItems = homepageNewsItems.filter(({ id }) => id !== featuredNewsItem?.id);
