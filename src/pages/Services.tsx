import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { serviceNavigationGroups } from "@/content/services";
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
        <section className="gala-inner-hero gala-inner-hero--services-index">
          <div className="gala-shell">
            <div className="gala-kicker">Commercial Real Estate Services</div>
            <h1>Five disciplines. One connected platform.</h1>
            <p>Gala CRE Group brings the right expertise together around the property, the objective, and the decisions required to move forward.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-services-index">
          <div className="gala-shell">
            <div className="gala-section-head">
              <div className="gala-kicker gala-kicker--dark">Services</div>
              <h2>Start with the objective. Bring in what it requires.</h2>
            </div>
            <div className="gala-service-grid">
              {serviceNavigationGroups.map((service, index) => (
                <article key={service.serviceSlug} className="gala-service-card">
                  <div className="gala-service-card__body">
                    <div className="gala-service-card__index">{String(index + 1).padStart(2, "0")}</div>
                    <h3><Link to={service.href}>{service.serviceName}</Link></h3>
                    <p>{service.summary}</p>
                    <div className="gala-service-card__capabilities">
                      <span>Capabilities</span>
                      <ul>
                      {service.capabilities.map((capability) => (
                          <li key={capability.path}>{capability.label}</li>
                      ))}
                      </ul>
                    </div>
                    <Link className="gala-service-card__overview" to={service.href}>
                      Explore {service.serviceName}<ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-cta-band gala-services-cta">
          <div className="gala-shell">
            <div>
              <div className="gala-kicker">Start a Conversation</div>
              <h2>Bring us the opportunity. We’ll help define the path forward.</h2>
            </div>
            <Link to="/contact?inquiry=general&source=services" className="gala-button">Discuss Your Opportunity <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services" />
    </>
  );
};

export default Services;
