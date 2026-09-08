import { ArrowLeft, ArrowUpRight, Building2, Check, FileSignature, Handshake, TrendingUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import EditorialCapabilityPage from "@/components/site/EditorialCapabilityPage";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { findCapabilityPageContent } from "@/content/capabilityPages";
import { findCapabilityByRoute, services, type CapabilityIconKey } from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const capabilityIcons: Record<CapabilityIconKey, typeof Building2> = {
  building: Building2,
  handshake: Handshake,
  "trending-up": TrendingUp,
  "file-signature": FileSignature,
};

const CapabilityDetail = () => {
  const { slug, capability: capabilitySlug } = useParams();
  useSiteCursor();

  const match = slug && capabilitySlug ? findCapabilityByRoute(slug, capabilitySlug) : undefined;
  if (!match) return <NotFound />;

  const { service, capability } = match;
  const Icon = capability.icon ? capabilityIcons[capability.icon] : Check;
  const path = `/services/${service.slug}/${capability.route}`;
  const editorialContent = findCapabilityPageContent(service.slug, capability.route);

  if (editorialContent) {
    return (
      <>
        <PageMeta
          title={editorialContent.metadata.title}
          description={editorialContent.metadata.description}
          image={editorialContent.metadata.image ?? editorialContent.hero.media.src}
        />
        <div id="cur"></div><div id="cdot"></div>
        <SiteHeader currentPath={path} />
        <EditorialCapabilityPage content={editorialContent} />
        <SiteFooter currentPath={path} />
      </>
    );
  }

  const siblingCapabilities = service.capabilities.filter(
    (item) => item.route && item.route !== capability.route
  );
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3 - siblingCapabilities.length);

  return (
    <>
      <PageMeta
        title={`${capability.label} | ${service.name}`}
        description={capability.lead ?? capability.detail ?? service.summary}
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={path} />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-inner-hero--service gala-inner-hero--capability">
          {service.image ? (
            <>
              <img src={service.image} alt="" aria-hidden="true" className="gala-inner-hero__bg" />
              <div className="gala-inner-hero__duotone"></div>
              <div className="gala-inner-hero__shade"></div>
            </>
          ) : null}
          <div className="gala-shell">
            <Link to={`/services/${service.slug}`} className="gala-back-link"><ArrowLeft size={16} /> {service.name}</Link>
            <div className="gala-kicker">{service.eyebrow}</div>
            <h1>{capability.label}</h1>
            {capability.lead ? <p>{capability.lead}</p> : null}
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell gala-capability-detail">
            <div className="gala-capability-detail__icon"><Icon aria-hidden="true" /></div>
            <div className="gala-capability-detail__body">
              <div className="gala-kicker gala-kicker--dark">What This Includes</div>
              <h2>{capability.label}, done right.</h2>
              {capability.included?.length ? (
                <ul className="gala-capability-detail__included">
                  {capability.included.map((item) => (
                    <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              ) : null}
              <div className="gala-service-audience"><strong>Built for</strong><span>{service.audience}</span></div>
              <Link to="/contact" className="gala-button gala-button--dark">
                Talk to an Advisor about {capability.label.toLowerCase()} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--black">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div><div className="gala-kicker">Keep Exploring</div><h2>One connected commercial platform.</h2></div>
              <Link to={`/services/${service.slug}`} className="gala-button">View {service.name} <ArrowUpRight size={16} /></Link>
            </div>
            <div className="gala-related-services">
              {siblingCapabilities.map((item) => (
                <Link key={item.route} to={`/services/${service.slug}/${item.route}`}>
                  <span>{service.eyebrow}</span><strong>{item.label}</strong><ArrowUpRight size={18} />
                </Link>
              ))}
              {relatedServices.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`}>
                  <span>{item.eyebrow}</span><strong>{item.name}</strong><ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath={path} />
    </>
  );
};

export default CapabilityDetail;
