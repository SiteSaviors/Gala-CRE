import { ArrowLeft, ArrowUpRight, Building2, Check, FileSignature, Handshake, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { serviceBySlug, serviceCapabilityId, services, type CapabilityIconKey, type ServiceSlug } from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const capabilityIcons: Record<CapabilityIconKey, typeof Building2> = {
  building: Building2,
  handshake: Handshake,
  "trending-up": TrendingUp,
  "file-signature": FileSignature,
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceBySlug[slug as ServiceSlug] : undefined;
  const listRef = useRef<HTMLDivElement>(null);
  useSiteCursor();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const targets = ".gala-capability-item, .gala-capability-section, .gala-capability-teaser";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.querySelectorAll(targets).forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    list.querySelectorAll(targets).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service) return <NotFound />;

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const supportsInvestorSourcing = service.slug === "investment-sales";
  const supportsExchangeFinancing = service.slug === "capital-markets";

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/services/${service.slug}`} />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-inner-hero--service">
          {service.image ? (
            <>
              <img src={service.image} alt="" aria-hidden="true" className="gala-inner-hero__bg" />
              <div className="gala-inner-hero__duotone"></div>
              <div className="gala-inner-hero__shade"></div>
            </>
          ) : null}
          <div className="gala-shell">
            <Link to="/services" className="gala-back-link"><ArrowLeft size={16} /> All Services</Link>
            <div className="gala-kicker">{service.eyebrow}</div>
            <h1>{service.name}</h1>
            <p>{service.summary}</p>
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell gala-service-detail">
            {service.image ? (
              <figure className="gala-service-detail__media">
                <img src={service.image} alt="" aria-hidden="true" />
                <figcaption>
                  <small>{service.eyebrow}</small>
                  <strong>{service.name}</strong>
                </figcaption>
              </figure>
            ) : null}
            <div className="gala-service-detail__body">
              <div className="gala-kicker gala-kicker--dark">How We Help</div>
              <h2>{service.capabilitiesHeadline}</h2>
              <p className="gala-lead">{service.description}</p>
              <div className="gala-capability-list" ref={listRef}>
                {service.capabilities.map((capability, index) => {
                  const anchorId = serviceCapabilityId(capability.label);
                  const style = { "--gala-capability-item-index": index } as React.CSSProperties;

                  if (capability.route) {
                    const Icon = capability.icon ? capabilityIcons[capability.icon] : Check;
                    return (
                      <Link
                        id={anchorId}
                        to={`/services/${service.slug}/${capability.route}`}
                        className="gala-capability-teaser"
                        style={style}
                        key={capability.label}
                      >
                        <span className="gala-capability-teaser__icon"><Icon aria-hidden="true" /></span>
                        <div>
                          <span className="gala-capability-teaser__label">{capability.label}</span>
                          {capability.lead ? <p className="gala-capability-teaser__detail">{capability.lead}</p> : null}
                        </div>
                        <ArrowUpRight className="gala-capability-teaser__arrow" aria-hidden="true" />
                      </Link>
                    );
                  }

                  if (capability.lead && capability.included?.length) {
                    const Icon = capability.icon ? capabilityIcons[capability.icon] : Check;
                    return (
                      <div id={anchorId} className="gala-capability-section" style={style} key={capability.label}>
                        <div className="gala-capability-section__icon"><Icon aria-hidden="true" /></div>
                        <div className="gala-capability-section__body">
                          <h3>{capability.label}</h3>
                          <p className="gala-capability-section__lead">{capability.lead}</p>
                          <ul className="gala-capability-section__included">
                            {capability.included.map((item) => (
                              <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>
                            ))}
                          </ul>
                          <Link to="/contact" className="gala-text-link">
                            Talk to an Advisor about {capability.label.toLowerCase()} <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div id={anchorId} className="gala-capability-item" style={style} key={capability.label}>
                      <span className="gala-capability-item__badge"><Check size={15} aria-hidden="true" /></span>
                      <div>
                        <span className="gala-capability-item__label">{capability.label}</span>
                        {capability.detail ? <p className="gala-capability-item__detail">{capability.detail}</p> : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="gala-service-audience"><strong>Built for</strong><span>{service.audience}</span></div>
            </div>
          </div>
        </section>

        {supportsInvestorSourcing ? (
          <section className="gala-investor-pathway">
            <div className="gala-shell">
              <div>
                <span>Investor Property Sourcing</span>
                <h2>Working against an acquisition or exchange timeline?</h2>
                <p>Organize your commercial property criteria, capital position, and timing before the search begins.</p>
              </div>
              <Link to="/investors/1031-exchange?source=gala-sales" className="gala-button gala-button--dark">
                Find a Replacement Property <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ) : null}

        {supportsExchangeFinancing ? (
          <section className="gala-investor-pathway">
            <div className="gala-shell">
              <div>
                <span>Exchange Financing Coordination</span>
                <h2>Need a capital plan aligned with an exchange acquisition?</h2>
                <p>Discuss the debt, equity, timing, and transaction requirements that may shape the replacement-property search.</p>
              </div>
              <Link to="/contact?inquiry=capital-markets&focus=1031-financing&source=gala-capital" className="gala-button gala-button--dark">
                Discuss Exchange Financing <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ) : null}

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
