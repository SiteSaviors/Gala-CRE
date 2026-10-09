import { ArrowLeft, ArrowUpRight, Building2, Check, CheckCircle2, FileSignature, Handshake, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import BrokerageServicePage from "@/components/services/BrokerageServicePage";
import InvestmentSalesNarrativePage from "@/components/services/InvestmentSalesNarrativePage";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import capitalMarketsValueImage from "@/assets/capital-markets-capital-solutions.avif";
import capitalMarketsHeroImage from "@/assets/capital-markets-hero-booklet.webp";
import capitalMarketsAdvantageImage from "@/assets/capital-markets-strategy.webp";
import capitalMarketsRelationshipsImage from "@/assets/debt-underwriting-context.webp";
import capitalMarketsStructuringImage from "@/assets/equity-alignment-context.webp";
import capitalMarketsIntelligenceImage from "@/assets/capital-strategy-context.webp";
import developmentHeroImage from "@/assets/development-hero-booklet.webp";
import { getCapabilityHref, getServiceInquiryHref, serviceBySlug, serviceCapabilityId, services, type CapabilityIconKey, type ServiceSlug } from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const capabilityIcons: Record<CapabilityIconKey, typeof Building2> = {
  building: Building2,
  handshake: Handshake,
  "trending-up": TrendingUp,
  "file-signature": FileSignature,
};

const capitalMarketsDistinctions = [
  {
    number: "01",
    title: "Connect With Active Capital",
    body: "We maintain relationships with lenders, investors, private capital, and institutional groups actively pursuing commercial real estate opportunities.",
    image: capitalMarketsRelationshipsImage,
    imageAlt: "Commercial real estate advisors reviewing capital documents",
  },
  {
    number: "02",
    title: "Structure Around the Opportunity",
    body: "We evaluate debt, equity, joint ventures, recapitalizations, and other structures to build a capital strategy aligned with the asset and the client’s objectives.",
    image: capitalMarketsStructuringImage,
    imageAlt: "Commercial real estate team evaluating a development plan",
  },
  {
    number: "03",
    title: "Advise With Market Intelligence",
    body: "We combine financial analysis, market insight, and hands-on execution to clarify the alternatives, expose the tradeoffs, and move the selected strategy toward closing.",
    image: capitalMarketsIntelligenceImage,
    imageAlt: "Commercial real estate advisor developing an asset strategy",
  },
] as const;

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceBySlug[slug as ServiceSlug] : undefined;
  const listRef = useRef<HTMLDivElement>(null);
  const capitalMarketsValueRef = useRef<HTMLElement>(null);
  const advantageSectionRef = useRef<HTMLElement>(null);
  const capitalMarketsDistinctionRef = useRef<HTMLElement>(null);
  const capitalMarketsConsultationRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (service?.slug !== "capital-markets") return;

    const valueSection = capitalMarketsValueRef.current;
    const advantageSection = advantageSectionRef.current;
    const distinctionSection = capitalMarketsDistinctionRef.current;
    const consultationSection = capitalMarketsConsultationRef.current;
    const revealItems = [
      ...Array.from(valueSection?.querySelectorAll<HTMLElement>("[data-capital-markets-reveal]") ?? []),
      ...Array.from(advantageSection?.querySelectorAll<HTMLElement>("[data-advantage-reveal]") ?? []),
      ...Array.from(distinctionSection?.querySelectorAll<HTMLElement>("[data-capital-markets-reveal]") ?? []),
      ...Array.from(consultationSection?.querySelectorAll<HTMLElement>("[data-capital-markets-reveal]") ?? []),
    ];
    if (!revealItems.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service) return <NotFound />;

  if (service.slug === "brokerage") return <BrokerageServicePage service={service} />;
  if (service.slug === "investment-sales") return <InvestmentSalesNarrativePage service={service} />;

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const usesEditorialHero = service.slug === "development-services" || service.slug === "capital-markets";
  const editorialHeroAlt = service.slug === "development-services"
    ? "Gala CRE Group Development presentation featuring an active construction site"
    : "Gala CRE Group Capital Markets presentation featuring a commercial skyline";
  const editorialHeroImage = service.slug === "development-services"
    ? developmentHeroImage
    : service.slug === "capital-markets"
      ? capitalMarketsHeroImage
      : service.image;

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/services/${service.slug}`} />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        {usesEditorialHero ? (
          <section
            className={`gala-editorial-split-hero gala-service-editorial-hero gala-service-editorial-hero--${service.slug}`}
            aria-labelledby={`${service.slug}-hero-title`}
          >
            <div className="gala-editorial-split-hero__image">
              {editorialHeroImage ? <img src={editorialHeroImage} alt={editorialHeroAlt} loading="eager" decoding="async" /> : null}
              <svg
                className="gala-editorial-split-hero__image-outline"
                viewBox="0 0 1000 700"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M78 0H1000V630L922 700H0V70Z" />
                <path className="gala-editorial-split-hero__image-accent" d="M790 -16H1018V180" />
                <path className="gala-editorial-split-hero__image-accent" d="M-16 520V716H220" />
              </svg>
            </div>
            <div className="gala-editorial-split-hero__copy">
              <span className="gala-editorial-split-hero__linework" aria-hidden="true"></span>
              <div className="gala-kicker">{service.eyebrow}</div>
              <h1 id={`${service.slug}-hero-title`}>{service.name}</h1>
              <p>{service.summary}</p>
              {service.slug === "capital-markets" ? (
                <a href="#capital-markets-consultation" className="gala-investment-narrative-button">
                  <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
                </a>
              ) : (
                <Link to={getServiceInquiryHref(service.slug)} className="gala-investment-narrative-button">
                  <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
                </Link>
              )}
            </div>
          </section>
        ) : (
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
        )}

        {service.slug === "capital-markets" ? (
          <>
          <section
            className="gala-investment-narrative-value gala-capital-markets-value"
            aria-labelledby="capital-markets-value-title"
            ref={capitalMarketsValueRef}
          >
            <div className="gala-shell gala-investment-narrative-value__grid">
              <div className="gala-investment-narrative-value__copy" data-capital-markets-reveal>
                <div className="gala-kicker gala-kicker--dark">Opinion of Value</div>
                <h2 id="capital-markets-value-title">Capital Solutions for What Comes Next</h2>
                <p>Across asset classes, Gala CRE develops intelligent capital strategies grounded in market expertise, trusted relationships, and each client’s objectives.</p>
              </div>
              <figure className="gala-investment-narrative-frame gala-investment-narrative-frame--right" data-capital-markets-reveal>
                <img src={capitalMarketsValueImage} alt="Capital markets professionals speaking during an industry panel" />
                <svg
                  className="gala-investment-narrative-frame__outline"
                  viewBox="0 0 1000 700"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M90 0H1000V620L910 700H0V80Z" />
                  <path className="gala-investment-narrative-frame__accent" d="M760 -18H1022V210" />
                  <path className="gala-investment-narrative-frame__accent" d="M-18 500V718H250" />
                </svg>
              </figure>
            </div>
          </section>
          <section
            className="gala-brokerage-advantage gala-capital-markets-advantage"
            aria-labelledby="capital-markets-advantage-title"
            ref={advantageSectionRef}
          >
            <img
              className="gala-brokerage-advantage__backdrop"
              src={capitalMarketsAdvantageImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span className="gala-brokerage-advantage__wash" aria-hidden="true"></span>
            <div className="gala-shell">
              <div className="gala-brokerage-advantage__intro" data-advantage-reveal>
                <div className="gala-kicker gala-kicker--dark">The Gala Commercial Advantage</div>
                <h2 id="capital-markets-advantage-title">Full Cycle Solutions, Tailored to You</h2>
              </div>
              <ol className="gala-brokerage-advantage__grid">
                {service.capabilities.map((capability, index) => (
                  <li
                    className="gala-brokerage-advantage__card"
                    data-advantage-reveal
                    id={serviceCapabilityId(capability.label)}
                    key={capability.label}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{capability.label}</h3>
                    {capability.lead ? <p>{capability.lead}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section
            className="gala-investment-narrative-confidence gala-capital-markets-distinction"
            aria-labelledby="capital-markets-distinction-title"
            ref={capitalMarketsDistinctionRef}
          >
            <div className="gala-shell">
              <div className="gala-investment-narrative-confidence__head" data-capital-markets-reveal>
                <h2 id="capital-markets-distinction-title">A More Connected Approach to Capital</h2>
              </div>
              <div className="gala-investment-narrative-confidence__grid">
                {capitalMarketsDistinctions.map(({ number, title, body, image, imageAlt }, index) => (
                  <article
                    className="gala-investment-narrative-confidence__panel"
                    data-capital-markets-reveal
                    style={{ "--gala-investment-delay": `${index * 90}ms` } as React.CSSProperties}
                    key={title}
                  >
                    <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
                    <span className="gala-investment-narrative-confidence__number">{number}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section
            className="gala-investment-narrative-consultation gala-capital-markets-consultation"
            id="capital-markets-consultation"
            aria-labelledby="capital-markets-consultation-title"
            ref={capitalMarketsConsultationRef}
          >
            <div className="gala-shell gala-investment-narrative-consultation__grid">
              <div className="gala-investment-narrative-consultation__copy" data-capital-markets-reveal>
                <div className="gala-kicker gala-kicker--dark">Capital Markets Consultation</div>
                <h2 id="capital-markets-consultation-title">Tell us about the opportunity.</h2>
                <p>Share the asset, capital need, timing, and objectives. A Gala CRE advisor will follow up with the appropriate next step.</p>
                <ul>
                  <li><CheckCircle2 aria-hidden="true" /> Capital Markets is selected automatically</li>
                  <li><CheckCircle2 aria-hidden="true" /> Opportunity information is reviewed privately</li>
                  <li><CheckCircle2 aria-hidden="true" /> No obligation to pursue a financing or equity process</li>
                </ul>
              </div>
              <div className="gala-investment-narrative-consultation__form" data-capital-markets-reveal>
                <InvestmentSalesInquiryForm
                  inquiryType="Capital Markets"
                  sourcePath="/services/capital-markets#capital-markets-consultation"
                  messageLabel="Tell us about the opportunity and your capital objectives"
                  successBody="A Gala CRE advisor will review your opportunity and follow up directly."
                />
              </div>
            </div>
          </section>
          </>
        ) : (
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
                        to={getCapabilityHref(service.slug, capability)}
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
                          <Link to={getServiceInquiryHref(service.slug, anchorId)} className="gala-text-link">
                            Let's Connect about {capability.label.toLowerCase()} <ArrowUpRight size={16} />
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
        )}

        <section className="gala-section gala-section--black">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div><div className="gala-kicker">Related Expertise</div><h2>One connected commercial platform.</h2></div>
              <Link to={getServiceInquiryHref(service.slug)} className="gala-button">Let's Connect <ArrowUpRight size={16} /></Link>
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
