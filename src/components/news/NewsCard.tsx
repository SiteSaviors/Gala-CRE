import { ArrowUpRight, Headphones, Newspaper } from "lucide-react";
import type { NewsItem } from "@/content/news";

type NewsCardProps = {
  item: NewsItem;
  featured?: boolean;
};

const NewsCard = ({ item, featured = false }: NewsCardProps) => {
  const FormatIcon = item.format === "Podcast" ? Headphones : Newspaper;

  return (
    <article className={`gala-news-card${featured ? " gala-news-card--featured" : ""}`}>
      <div className="gala-news-card__topline">
        <span><FormatIcon size={15} aria-hidden="true" /> {item.format}</span>
        <time dateTime={item.publishedAt}>{item.dateDisplay}</time>
      </div>
      <div className="gala-news-card__content">
        <p className="gala-news-card__outlet">{item.outlet}</p>
        <h3>{item.headline}</h3>
        <p className="gala-news-card__summary">{item.summary}</p>
      </div>
      <div className="gala-news-card__footer">
        <p><span>Associated entity</span>{item.associatedEntity}</p>
        <a href={item.url} target="_blank" rel="noreferrer" className="gala-text-link">
          {item.format === "Podcast" ? "Listen to Episode" : "Read Coverage"}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> on {item.outlet} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
