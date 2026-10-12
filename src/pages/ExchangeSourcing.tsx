import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import InvestorInquiryForm from "@/components/investors/InvestorInquiryForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  acquisitionCriteria,
  sourcingProcess,
} from "@/content/investorSourcing";
import useSiteCursor from "@/hooks/useSiteCursor";
import capitalReviewImage from "@/assets/gala-capital-capability.webp";

const ExchangeSourcing = () => {
  useSiteCursor();
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-exchange-reveal]"));
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
      <PageMeta
        title="1031 Exchange Replacement Property Sourcing"
        description="Share your commercial acquisition criteria with Gala CRE Group for a focused, time-sensitive replacement-property search."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/investors/1031-exchange" />

      <main className="gala-page gala-exchange-page" id="main-content" tabIndex={-1} ref={pageRef}>
        <section
          className="gala-editorial-split-hero gala-exchange-editorial-hero"
          aria-labelledby="exchange-hero-title"
        >
          <figure className="gala-editorial-split-hero__image gala-exchange-editorial-hero__image">
            <img
              src={capitalReviewImage}
              alt="Commercial real estate advisors reviewing acquisition criteria"
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
          </figure>
          <div className="gala-editorial-split-hero__copy">
            <span className="gala-editorial-split-hero__linework" aria-hidden="true"></span>
            <div className="gala-kicker">Commercial Replacement Property Sourcing</div>
            <h1 id="exchange-hero-title">1031 Exchange</h1>
            <p>Gala CRE Group turns defined timing, acquisition criteria, and capital into a focused search for commercial replacement properties.</p>
            <a className="gala-investment-narrative-button" href="#investor-inquiry">
              <span>Start Your Property Search</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
            </a>
          </div>
        </section>

        <section className="gala-exchange-strategy" aria-labelledby="exchange-strategy-title">
          <div className="gala-shell gala-exchange-strategy__grid">
            <div className="gala-exchange-strategy__copy" data-exchange-reveal>
              <div className="gala-kicker gala-kicker--dark">Focused Acquisition Strategy</div>
              <h2 id="exchange-strategy-title">A focused search when timing matters.</h2>
              <p>Gala CRE translates the timeline, investment requirements, target markets, and available capital into a decision-ready acquisition brief—then applies it to the search.</p>
              <p className="gala-exchange-strategy__note">We coordinate the commercial property search alongside your legal, tax, financing, and qualified-intermediary advisors.</p>
            </div>
            <div className="gala-exchange-strategy__criteria" aria-label="Acquisition criteria summary">
              {acquisitionCriteria.map((criterion, index) => (
                <article
                  data-exchange-reveal
                  style={{ "--gala-exchange-delay": `${index * 80}ms` } as React.CSSProperties}
                  key={criterion.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{criterion.title}</h3>
                    <p>{criterion.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-exchange-process" aria-labelledby="exchange-process-title">
          <div className="gala-shell">
            <div className="gala-exchange-process__head" data-exchange-reveal>
              <div>
                <div className="gala-kicker">A Clear Search Process</div>
                <h2 id="exchange-process-title">From a confirmed timeline to the right property fit.</h2>
              </div>
              <p>Each step narrows the field while keeping property decisions connected to the investor’s timing, criteria, and capital position.</p>
            </div>
            <ol className="gala-exchange-process__grid">
              {sourcingProcess.map((step, index) => (
                <li
                  data-exchange-reveal
                  style={{ "--gala-exchange-delay": `${index * 75}ms` } as React.CSSProperties}
                  key={step.number}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="gala-career-application gala-investor-application" id="investor-inquiry">
          <div className="gala-shell gala-investor-application__inner">
            <div className="gala-investor-application__intro" data-exchange-reveal>
              <div className="gala-kicker gala-kicker--dark">Your Acquisition Brief</div>
              <h2>Start with the essentials.</h2>
              <p>Share the timing, property criteria, and capital position Gala needs to prepare for a focused property-sourcing conversation.</p>
            </div>
            <InvestorInquiryForm />
            <div className="gala-exchange-disclaimer">
              <strong>Important 1031 exchange notice</strong>
              <p>Gala CRE Group provides commercial real estate brokerage and advisory services, not tax, legal, accounting, or qualified-intermediary services. Investors should independently confirm all exchange requirements and deadlines with their tax advisor, legal counsel, and qualified intermediary. Identification of a potential property does not guarantee availability, contract acceptance, financing, closing, or successful exchange treatment.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/investors/1031-exchange" />
    </>
  );
};

export default ExchangeSourcing;
