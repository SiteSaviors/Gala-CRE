import NewsCard from "@/components/news/NewsCard";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { newsItems } from "@/content/news";
import useSiteCursor from "@/hooks/useSiteCursor";

const News = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta
        title="News & Media"
        description="News coverage and conversations involving Gala leadership and affiliated real estate ventures across North Carolina."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/news" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-news-hero">
          <div className="gala-shell">
            <div className="gala-kicker">News &amp; Media</div>
            <h1>Ideas, projects, and perspective from across the Gala network.</h1>
            <p>Third-party coverage and conversations involving Gala leadership and affiliated real estate ventures.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-news-archive">
          <div className="gala-shell">
            <div className="gala-news-archive__intro">
              <div>
                <div className="gala-kicker gala-kicker--dark">Coverage &amp; Conversations</div>
                <h2>Reporting and discussions from the Triangle and beyond.</h2>
              </div>
              <p>Each item identifies the venture discussed in the original source. Coverage of an affiliated company is not presented as coverage of Gala CRE Group.</p>
            </div>
            <div className="gala-news-archive__grid">
              {newsItems.map((item) => <NewsCard item={item} featured={item.featured} key={item.id} />)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/news" />
    </>
  );
};

export default News;
