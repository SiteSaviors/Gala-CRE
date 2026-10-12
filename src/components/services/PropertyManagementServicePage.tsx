import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import propertyManagementOverviewImage from "@/assets/property-management-overview.webp";
import propertyManagementPartnershipImage from "@/assets/property-management-partnership.webp";
import propertyManagementTransitionImage from "@/assets/property-management-transition-context.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { serviceBySlug, type Service } from "@/content/services";

type PropertyManagementServicePageProps = {
  service: Service;
};

const managementPath = [
  {
    number: "01",
    title: "Define the Operating Requirement",
    body: "Clarify the property needs, reporting expectations, budget priorities, tenant experience, maintenance responsibilities, and ownership objectives the engagement must support.",
    image: propertyManagementTransitionImage,
    imageAlt: "Commercial property owners reviewing operating requirements and property records",
  },
  {
    number: "02",
    title: "Select the Right Management Partner",
    body: "Compare relevant property experience, proposed scope, communication approach, fee structure, and the team that will be accountable for day-to-day execution.",
    image: propertyManagementPartnershipImage,
    imageAlt: "Property operations professional reviewing commercial building systems",
  },
  {
    number: "03",
    title: "Coordinate a Clear Transition",
    body: "Organize the records, responsibilities, timelines, introductions, and open items needed to move from selection into active property operations.",
    image: propertyManagementOverviewImage,
    imageAlt: "Commercial property team walking an office property",
  },
] as const;

const connectedPriorities = [
  {
    title: "Leasing Context",
    body: "Keep the operating plan aware of tenant commitments, leasing activity, and the experience the property needs to deliver.",
  },
  {
    title: "Capital Planning",
    body: "Bring known maintenance items, planned improvements, and near-term capital priorities into the transition conversation.",
  },
  {
    title: "Ownership Reporting",
    body: "Define the cadence, information, and accountability ownership needs to stay informed after the handoff.",
  },
] as const;

const relatedServices = ["brokerage", "investment-sales", "capital-markets"] as const;

const PropertyManagementServicePage = ({ service }: PropertyManagementServicePageProps) => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-property-management-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

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
      <SiteHeader currentPath="/services/property-management" />
      <main className="gala-page gala-property-management-page" id="main-content" tabIndex={-1} ref={pageRef}>
        <section
          className="gala-editorial-split-hero gala-service-editorial-hero gala-service-editorial-hero--property-management"
          aria-labelledby="property-management-hero-title"
        >
          <div className="gala-editorial-split-hero__image">
            <img
              src={propertyManagementOverviewImage}
              alt="Commercial property team walking an office property"
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
            <h1 id="property-management-hero-title"><span>Property</span><span>Management</span></h1>
            <p>{service.summary}</p>
            <a href="#property-management-consultation" className="gala-investment-narrative-button">
              <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
            </a>
          </div>
        </section>

        <section className="gala-property-management-point" aria-labelledby="property-management-point-title">
          <div className="gala-shell gala-property-management-point__grid">
            <div className="gala-property-management-point__copy" data-property-management-reveal>
              <div className="gala-kicker gala-kicker--dark">Ownership-Aligned Operations</div>
              <h2 id="property-management-point-title">Property operations should protect the plan behind the asset.</h2>
              <p>Gala CRE helps owners define the operating requirement, evaluate an appropriate management partner, coordinate the transition, and keep property operations connected to broader leasing, capital, and ownership decisions.</p>
              <p className="gala-property-management-point__note"><strong>A clear division of responsibility:</strong> Gala CRE does not provide day-to-day property management in house. The selected management partner contracts directly with ownership while Gala helps organize the brief, comparison, and handoff.</p>
            </div>
            <figure className="gala-property-management-point__media" data-property-management-reveal>
              <img src={propertyManagementTransitionImage} alt="Commercial property owners reviewing an operating plan and transition materials" />
              <svg viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
                <path d="M90 0H1000V620L910 700H0V80Z" />
                <path className="gala-property-management-point__accent" d="M760 -18H1022V210" />
                <path className="gala-property-management-point__accent" d="M-18 500V718H250" />
              </svg>
            </figure>
          </div>
        </section>

        <section className="gala-property-management-path" aria-labelledby="property-management-path-title">
          <div className="gala-shell">
            <div className="gala-property-management-path__head" data-property-management-reveal>
              <div>
                <div className="gala-kicker">A Clear Management Partnership</div>
                <h2 id="property-management-path-title">From ownership priorities to an accountable operating handoff.</h2>
              </div>
              <p>The management decision starts with a clear brief, a deliberate comparison, and a transition that gives ownership and the selected partner a shared operating record.</p>
            </div>
            <div className="gala-property-management-path__grid">
              {managementPath.map((step, index) => (
                <article
                  className="gala-property-management-path__card"
                  data-property-management-reveal
                  style={{ "--gala-property-management-delay": `${index * 90}ms` } as React.CSSProperties}
                  key={step.number}
                >
                  <img src={step.image} alt={step.imageAlt} loading="lazy" decoding="async" />
                  <span className="gala-property-management-path__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-property-management-continuity" aria-labelledby="property-management-continuity-title">
          <div className="gala-shell gala-property-management-continuity__grid">
            <div className="gala-property-management-continuity__head" data-property-management-reveal>
              <div className="gala-kicker gala-kicker--dark">Beyond the Handoff</div>
              <h2 id="property-management-continuity-title">Keep the operating plan connected to the asset strategy.</h2>
            </div>
            <div className="gala-property-management-continuity__list">
              {connectedPriorities.map((priority, index) => (
                <article
                  data-property-management-reveal
                  style={{ "--gala-property-management-delay": `${index * 75}ms` } as React.CSSProperties}
                  key={priority.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{priority.title}</h3>
                    <p>{priority.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="gala-investment-narrative-consultation gala-property-management-consultation"
          id="property-management-consultation"
          aria-labelledby="property-management-consultation-title"
        >
          <div className="gala-shell gala-investment-narrative-consultation__grid">
            <div className="gala-investment-narrative-consultation__copy" data-property-management-reveal>
              <div className="gala-kicker gala-kicker--dark">Property Management Consultation</div>
              <h2 id="property-management-consultation-title">Tell us what the property needs next.</h2>
              <p>Share the asset, current operating situation, ownership priorities, and timing. A Gala CRE advisor will follow up with the appropriate next step.</p>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /> Property Management is selected automatically</li>
                <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
                <li><CheckCircle2 aria-hidden="true" /> No obligation to engage a management partner</li>
              </ul>
            </div>
            <div className="gala-investment-narrative-consultation__form" data-property-management-reveal>
              <InvestmentSalesInquiryForm
                inquiryType="Property Management"
                sourcePath="/services/property-management#property-management-consultation"
                messageLabel="Tell us about the property, operating need, and ownership priorities"
                successBody="A Gala CRE advisor will review your property management inquiry and follow up directly."
              />
            </div>
          </div>
        </section>

        <section className="gala-development-related gala-property-management-related" aria-labelledby="property-management-related-title">
          <div className="gala-shell gala-development-related__inner">
            <div className="gala-development-related__label">
              <div className="gala-kicker">Related Expertise</div>
              <h2 id="property-management-related-title">Connect operations to the wider asset plan.</h2>
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
      <SiteFooter currentPath="/services/property-management" />
    </>
  );
};

export default PropertyManagementServicePage;
