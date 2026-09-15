import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NewsCard from "@/components/news/NewsCard";
import { featuredNewsItem, supportingNewsItems } from "@/content/news";

const HomeNews = () => {
  if (!featuredNewsItem) return null;

  return (
    <section className="gala-news-preview" aria-labelledby="news-preview-title">
      <div className="gala-shell">
        <div className="gala-news-preview__header">
          <div>
            <div className="gala-kicker">In the News</div>
            <h2 id="news-preview-title">Ideas, projects, and perspective shaping the market.</h2>
          </div>
          <div>
            <p>Coverage and conversations involving Gala leadership and affiliated real estate ventures.</p>
            <Link to="/news" className="gala-text-link">
              View All News &amp; Media <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="gala-news-preview__grid">
          <NewsCard item={featuredNewsItem} featured />
          <div className="gala-news-preview__supporting">
            {supportingNewsItems.map((item) => <NewsCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
