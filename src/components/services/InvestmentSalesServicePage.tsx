import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  getServiceInquiryHref,
  serviceBySlug,
  type Service,
} from "@/content/services";

type InvestmentSalesServicePageProps = {
  service: Service;
};

const assetClassIds = ["industrial", "multifamily", "retail", "office", "land"] as const;

const transactionStages = [
  {
    title: "Position",
    detail: "Establish the asset story, objectives, and buyer audience.",
  },
  {
    title: "Underwrite",
    detail: "Evaluate income, assumptions, condition, and transaction risk.",
  },
  {
    title: "Market",
    detail: "Present the opportunity and reach qualified buyers.",
  },
  {
    title: "Negotiate + Close",
    detail: "Structure terms, coordinate diligence, and move through closing.",
  },
] as const;

const relatedServiceSlugs = ["brokerage", "capital-markets", "development-services"] as const;

const InvestmentSalesServicePage = ({ service }: InvestmentSalesServicePageProps) => {
  const pageRef = useRef<HTMLElement>(null);
  const capabilitiesByRoute = Object.fromEntries(
    service.capabilities.map((capability) => [capability.route, capability]),
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-investment-reveal]"));
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
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/services/investment-sales" />
      <main
        className="gala-page gala-investment-sales-page"
        id="main-content"
        tabIndex={-1}
        ref={pageRef}
      >
        <section className="gala-investment-sales-hero">
          {service.image ? <img src={service.image} alt="" aria-hidden="true" /> : null}
          <span className="gala-investment-sales-hero__wash" aria-hidden="true"></span>
          <div className="gala-shell gala-investment-sales-hero__inner">
            <Link to="/services" className="gala-back-link"><ArrowLeft size={16} /> All Services</Link>
            <div className="gala-kicker">{service.eyebrow}</div>
            <h1>{service.name}</h1>
            <p>{service.summary}</p>
          </div>
        </section>

        <section className="gala-investment-sales-intro" aria-labelledby="investment-sales-intro-title">
          <div className="gala-shell gala-investment-sales-intro__inner" data-investment-reveal>
            <div className="gala-kicker gala-kicker--dark">How We Help</div>
            <div className="gala-investment-sales-intro__copy">
              <h2 id="investment-sales-intro-title">{service.capabilitiesHeadline}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        </section>

        <section className="gala-investment-assets" aria-labelledby="investment-assets-title">
          <div className="gala-shell">
            <header className="gala-investment-assets__head" data-investment-reveal>
              <div className="gala-kicker">Commercial Asset Advisory</div>
              <h2 id="investment-assets-title">Five asset classes. One disciplined sale process.</h2>
            </header>
            <div className="gala-investment-assets__grid">
              {assetClassIds.map((id, index) => {
                const capability = capabilitiesByRoute[id];
                if (!capability) return null;

                return (
                  <article
                    className={`gala-investment-asset${index === 0 ? " gala-investment-asset--featured" : ""}`}
                    id={id}
                    key={id}
                    data-investment-reveal
                    style={{ "--gala-investment-index": index } as React.CSSProperties}
                  >
                    <span className="gala-investment-asset__number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{capability.label}</h3>
                      <p>{capability.lead}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-investment-process" aria-labelledby="investment-process-title">
          <div className="gala-shell">
            <div className="gala-investment-process__head" data-investment-reveal>
              <div>
                <div className="gala-kicker gala-kicker--dark">Transaction Path</div>
                <h2 id="investment-process-title">From market position to closing.</h2>
              </div>
              <p>A focused sequence keeps the asset story, buyer outreach, diligence, and deal terms moving together.</p>
            </div>
            <ol className="gala-investment-process__stages">
              {transactionStages.map((stage, index) => (
                <li key={stage.title} data-investment-reveal style={{ "--gala-investment-index": index } as React.CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="gala-investment-sourcing" aria-labelledby="investment-sourcing-title">
          <div className="gala-shell gala-investment-sourcing__inner" data-investment-reveal>
            <div>
              <div className="gala-kicker gala-kicker--dark">Investor Property Sourcing</div>
              <h2 id="investment-sourcing-title">Working against an acquisition or exchange timeline?</h2>
              <p>Organize your commercial property criteria, capital position, and timing before the search begins.</p>
            </div>
            <Link to="/investors/1031-exchange?source=gala-sales" className="gala-button gala-button--dark">
              Find a Replacement Property <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <aside className="gala-investment-related" aria-label="Related services">
          <div className="gala-shell gala-investment-related__inner">
            <span>Related Services</span>
            <div className="gala-investment-related__links" role="navigation" aria-label="Related Investment Sales services">
              {relatedServiceSlugs.map((slug) => (
                <Link to={`/services/${slug}`} key={slug}>
                  {serviceBySlug[slug].name}<ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="gala-investment-cta">
          <div className="gala-shell gala-investment-cta__inner">
            <div>
              <div className="gala-kicker gala-kicker--dark">Start a Conversation</div>
              <h2>Considering a sale or acquisition?</h2>
            </div>
            <Link to={getServiceInquiryHref("investment-sales")} className="gala-button gala-button--dark">
              Discuss Your Investment Strategy <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services/investment-sales" />
    </>
  );
};

export default InvestmentSalesServicePage;
