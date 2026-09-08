import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Page Not Found" description="The requested Gala CRE Group page could not be found." />
      <SiteHeader currentPath={location.pathname} />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-not-found">
          <div className="gala-shell">
            <div className="gala-kicker">404</div>
            <h1>That page is not available.</h1>
            <p>The link may have changed. Return to the Gala CRE homepage or explore current commercial properties.</p>
            <div className="gala-not-found__actions">
              <Link to="/" className="gala-button">Return Home</Link>
              <Link to="/properties" className="gala-back-link">View Properties</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath={location.pathname} />
    </>
  );
};

export default NotFound;
