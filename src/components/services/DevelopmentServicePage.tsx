import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import developmentHeroImage from "@/assets/development-hero-booklet.webp";
import developmentInfrastructureImage from "@/assets/development-infrastructure.webp";
import developmentOversightImage from "@/assets/development-oversight-hero.webp";
import entitlementsImage from "@/assets/entitlements-coordination-hero.webp";
import siteSelectionImage from "@/assets/site-strategy-field-context.webp";
import developmentPointImage from "@/assets/site-strategy-entitlements.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { serviceBySlug, type Service } from "@/content/services";

type DevelopmentServicePageProps = {
  service: Service;
};

const developmentStageMedia = [
  {
    route: "site-selection",
    number: "01",
    image: siteSelectionImage,
    imageAlt: "Commercial real estate advisors evaluating a potential development site",
  },
  {
    route: "entitlements",
    number: "02",
    image: entitlementsImage,
    imageAlt: "Development team coordinating plans and the entitlement path",
  },
  {
    route: "infrastructure",
    number: "03",
    image: developmentInfrastructureImage,
    imageAlt: "Infrastructure installation at a commercial development site",
  },
  {
    route: "gc-builder-relationships",
    number: "04",
    image: developmentOversightImage,
    imageAlt: "Commercial construction professionals walking an active project",
  },
] as const;

const developmentAdvantages = [
  {
    number: "01",
    title: "Clarify Feasibility Early",
    body: "Bring the intended use, site conditions, market context, access, approvals, and infrastructure questions into view before the opportunity advances too far.",
  },
  {
    number: "02",
    title: "Coordinate the Right Specialists",
    body: "Help organize the engineers, attorneys, municipalities, contractors, and other specialists appropriate to the project and the decisions ahead.",
  },
  {
    number: "03",
    title: "Keep Decisions Visible",
    body: "Track the dependencies, open questions, responsibilities, and next decisions that determine whether the path remains practical and executable.",
  },
] as const;

const relatedServices = ["brokerage", "investment-sales", "capital-markets"] as const;

const DevelopmentServicePage = ({ service }: DevelopmentServicePageProps) => {
  const pageRef = useRef<HTMLElement>(null);
  const stages = useMemo(
    () => developmentStageMedia.map((stage) => ({
      ...stage,
      capability: service.capabilities.find((capability) => capability.route === stage.route),
    })).filter((stage) => stage.capability),
    [service.capabilities],
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-development-reveal]"));
    page.classList.add("is-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      page.classList.remove("is-motion-ready");
    };
  }, []);

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/services/development-services" />
      <main className="gala-page gala-development-page" id="main-content" tabIndex={-1} ref={pageRef}>
        <section
          className="gala-editorial-split-hero gala-service-editorial-hero gala-service-editorial-hero--development-services"
          aria-labelledby="development-services-hero-title"
        >
          <div className="gala-editorial-split-hero__image">
            <img
              src={developmentHeroImage}
              alt="Gala CRE Group Development presentation featuring an active construction site"
              loading="eager"
              decoding="async"
            />
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
            <h1 id="development-services-hero-title">{service.name}</h1>
            <p>{service.summary}</p>
            <a href="#development-consultation" className="gala-investment-narrative-button">
              <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
            </a>
          </div>
        </section>

        <section className="gala-development-point" aria-labelledby="development-point-title">
          <div className="gala-shell gala-development-point__grid">
            <div className="gala-development-point__copy" data-development-reveal>
              <div className="gala-kicker gala-kicker--dark">Development Strategy</div>
              <h2 id="development-point-title">Development decisions made clear before commitments become costly.</h2>
              <p>Gala CRE helps clients evaluate sites, organize the approval path, surface infrastructure dependencies, and coordinate the relationships needed to prepare a project for execution.</p>
              <p className="gala-development-point__note">Technical, legal, engineering, and construction decisions remain with the appropriate licensed and contracted specialists.</p>
            </div>
            <figure className="gala-development-point__media" data-development-reveal>
              <img src={developmentPointImage} alt="Development team evaluating plans, site conditions, and a commercial program" />
              <svg viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
                <path d="M90 0H1000V620L910 700H0V80Z" />
                <path className="gala-development-point__accent" d="M760 -18H1022V210" />
                <path className="gala-development-point__accent" d="M-18 500V718H250" />
              </svg>
            </figure>
          </div>
        </section>

        <section className="gala-development-stages" aria-labelledby="development-stages-title">
          <div className="gala-shell">
            <div className="gala-development-stages__head" data-development-reveal>
              <div>
                <div className="gala-kicker">A Connected Development Path</div>
                <h2 id="development-stages-title">Four stages. One clearer path forward.</h2>
              </div>
              <p>Each stage resolves a different set of questions while keeping the next decision connected to the larger development objective.</p>
            </div>
            <div className="gala-development-stages__grid" data-development-reveal>
              {stages.map(({ route, number, image, imageAlt, capability }, index) => (
                <Link
                  to={`/services/development-services/${route}`}
                  className="gala-development-stage"
                  data-development-reveal
                  style={{ "--gala-development-delay": `${index * 85}ms` } as React.CSSProperties}
                  key={route}
                >
                  <span className="gala-development-stage__media">
                    <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
                  </span>
                  <span className="gala-development-stage__body">
                    <span className="gala-development-stage__number">{number}</span>
                    <span className="gala-development-stage__title">{capability?.label}</span>
                    <span className="gala-development-stage__description">{capability?.lead}</span>
                    <span className="gala-development-stage__link">Explore the stage <ArrowUpRight size={16} aria-hidden="true" /></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-development-advantage" aria-labelledby="development-advantage-title">
          <div className="gala-shell">
            <div className="gala-development-advantage__head" data-development-reveal>
              <div className="gala-kicker gala-kicker--dark">How Gala Helps</div>
              <h2 id="development-advantage-title">Coordination that keeps the next decision visible.</h2>
            </div>
            <div className="gala-development-advantage__grid">
              {developmentAdvantages.map((advantage, index) => (
                <article
                  className="gala-development-advantage__item"
                  data-development-reveal
                  style={{ "--gala-development-delay": `${index * 80}ms` } as React.CSSProperties}
                  key={advantage.title}
                >
                  <span>{advantage.number}</span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.body}</p>
                </article>
              ))}
            </div>
            <div className="gala-development-audience" data-development-reveal>
              <strong>Built for</strong>
              <span>{service.audience}</span>
            </div>
          </div>
        </section>

        <section
          className="gala-investment-narrative-consultation gala-development-consultation"
          id="development-consultation"
          aria-labelledby="development-consultation-title"
        >
          <div className="gala-shell gala-investment-narrative-consultation__grid">
            <div className="gala-investment-narrative-consultation__copy" data-development-reveal>
              <div className="gala-kicker gala-kicker--dark">Development Consultation</div>
              <h2 id="development-consultation-title">Tell us what you are evaluating.</h2>
              <p>Share the site, intended use, timing, and questions shaping the opportunity. A Gala CRE advisor will follow up with an appropriate next step.</p>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /> Development Services is selected automatically</li>
                <li><CheckCircle2 aria-hidden="true" /> Opportunity information is reviewed privately</li>
                <li><CheckCircle2 aria-hidden="true" /> No obligation to advance a development engagement</li>
              </ul>
            </div>
            <div className="gala-investment-narrative-consultation__form" data-development-reveal>
              <InvestmentSalesInquiryForm
                inquiryType="Development Services"
                sourcePath="/services/development-services#development-consultation"
                messageLabel="Tell us about the site, intended use, and questions you are evaluating"
                successBody="A Gala CRE advisor will review your development inquiry and follow up directly."
              />
            </div>
          </div>
        </section>

        <section className="gala-development-related" aria-labelledby="development-related-title">
          <div className="gala-shell gala-development-related__inner">
            <div className="gala-development-related__label">
              <div className="gala-kicker">Related Expertise</div>
              <h2 id="development-related-title">Connect the next commercial decision.</h2>
            </div>
            <nav className="gala-development-related__links" aria-label="Related services">
              {relatedServices.map((slug) => {
                const related = serviceBySlug[slug];
                return (
                  <Link to={`/services/${slug}`} key={slug}>
                    <span>{related.name}</span><ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services/development-services" />
    </>
  );
};

export default DevelopmentServicePage;
