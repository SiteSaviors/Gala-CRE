import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/content/news";

type NewsCardProps = {
  item: NewsItem;
  featured?: boolean;
};

const NewsCard = ({ item, featured = false }: NewsCardProps) => {
  return (
    <article className={`gala-news-card${featured ? " gala-news-card--featured" : ""}`}>
      <div className="gala-news-card__image-link">
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
      </div>
      <div className="gala-news-card__content">
        <p className="gala-news-card__meta">
          <span>{item.outlet}</span>
          <time dateTime={item.publishedAt}>{item.dateDisplay}</time>
        </p>
        <h3><a href={item.url} target="_blank" rel="noreferrer">{item.headline}</a></h3>
        {featured && <p className="gala-news-card__summary">{item.summary}</p>}
        <a href={item.url} target="_blank" rel="noreferrer" className="gala-text-link">
          {item.format === "Podcast" ? "Listen" : "Read Article"}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> on {item.outlet} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
