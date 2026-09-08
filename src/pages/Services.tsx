import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { assetTypes, serviceNavigationGroups } from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";

const Services = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta
        title="Commercial Real Estate Services"
        description="Brokerage, investment sales, development services, capital markets, and property guidance across the Research Triangle."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/services" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero">
          <div className="gala-shell">
            <div className="gala-kicker">Full-Service Commercial Real Estate</div>
            <h1>Clear advice across the commercial real estate lifecycle.</h1>
            <p>Gala CRE Group brings brokerage, transaction, development, capital, and operating perspectives together so clients can make informed decisions with less friction.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell">
            <div className="gala-section-head">
              <div className="gala-kicker gala-kicker--dark">Services</div>
              <h2>Expertise organized around your objective.</h2>
            </div>
            <div className="gala-service-grid">
              {serviceNavigationGroups.map((service, index) => (
                <article key={service.serviceSlug} className="gala-service-card">
                  <span className="gala-service-card__index">0{index + 1}</span>
                  <div>
                    <div className="gala-service-card__eyebrow">{service.name}</div>
                    <h3><Link to={service.href}>{service.serviceName}</Link></h3>
                    <p>{service.summary}</p>
                    <nav className="gala-service-card__links" aria-label={`${service.serviceName} capabilities`}>
                      {service.capabilities.map((capability) => (
                        <Link key={capability.path} to={capability.path}>
                          {capability.label}<ArrowUpRight size={13} aria-hidden="true" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <Link className="gala-service-card__arrow" to={service.href} aria-label={`View ${service.serviceName}`}>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--black">
          <div className="gala-shell gala-split">
            <div>
              <div className="gala-kicker">Asset Expertise</div>
              <h2>Commercial perspective across the primary asset classes.</h2>
            </div>
            <div className="gala-asset-list">
              {assetTypes.map((asset) => <span key={asset}>{asset}</span>)}
            </div>
          </div>
        </section>

        <section className="gala-cta-band">
          <div className="gala-shell">
            <div>
              <div className="gala-kicker">Start a Conversation</div>
              <h2>What are you trying to accomplish?</h2>
            </div>
            <Link to="/contact" className="gala-button">Talk to an Advisor <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services" />
    </>
  );
};

export default Services;
