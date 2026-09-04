import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { serviceBySlug, serviceCapabilityId, services, type ServiceSlug } from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceBySlug[slug as ServiceSlug] : undefined;
  useSiteCursor();

  if (!service) return <NotFound />;

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/services/${service.slug}`} />
      <main className="gala-page">
        <section className="gala-inner-hero gala-inner-hero--service">
          <div className="gala-shell">
            <Link to="/services" className="gala-back-link"><ArrowLeft size={16} /> All Services</Link>
            <div className="gala-kicker">{service.eyebrow}</div>
            <h1>{service.name}</h1>
            <p>{service.summary}</p>
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell gala-service-detail">
            <div>
              <div className="gala-kicker gala-kicker--dark">How We Help</div>
              <h2>Commercial guidance made easier to act on.</h2>
              <p className="gala-lead">{service.description}</p>
              {service.approvalStatus === "draft" ? (
                <p className="gala-content-note">Service copy is a structural draft pending client approval.</p>
              ) : null}
            </div>
            <div className="gala-capability-list">
              {service.capabilities.map((capability) => (
                <div id={serviceCapabilityId(capability)} key={capability}><Check size={18} /> <span>{capability}</span></div>
              ))}
              <div className="gala-service-audience"><strong>Built for</strong><span>{service.audience}</span></div>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--black">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div><div className="gala-kicker">Related Expertise</div><h2>One connected commercial platform.</h2></div>
              <Link to="/contact" className="gala-button">Talk to an Advisor <ArrowUpRight size={16} /></Link>
            </div>
            <div className="gala-related-services">
              {related.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`}>
                  <span>{item.eyebrow}</span><strong>{item.name}</strong><ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath={`/services/${service.slug}`} />
    </>
  );
};

export default ServiceDetail;
