import { ArrowDown, Check, Clock3, Scale, Search } from "lucide-react";
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

  return (
    <>
      <PageMeta
        title="1031 Exchange Replacement Property Sourcing"
        description="Share your commercial acquisition criteria with Gala CRE Group for a focused, time-sensitive replacement-property search."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/investors/1031-exchange" />

      <main className="gala-page gala-journey-page gala-exchange-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-journey-hero gala-exchange-hero">
          <div className="gala-shell gala-exchange-hero__grid">
            <div>
              <div className="gala-kicker">1031 Replacement Property Sourcing</div>
              <h1>A focused search when timing matters.</h1>
              <p>Define the acquisition criteria, timing, and capital position Gala needs to begin identifying potential commercial replacement properties.</p>
              <a className="gala-button gala-button--gold" href="#investor-inquiry">
                Start Your Property Search <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="gala-exchange-hero__signals" aria-label="Search priorities">
              <div><Clock3 aria-hidden="true" /><strong>Timing</strong><span>The dates shaping the search</span></div>
              <div><Search aria-hidden="true" /><strong>Property Criteria</strong><span>Markets, property types, and requirements</span></div>
              <div><Scale aria-hidden="true" /><strong>Capital Readiness</strong><span>Equity, financing, and purchase range</span></div>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-exchange-role">
          <div className="gala-shell gala-exchange-role__grid">
            <div>
              <div className="gala-kicker gala-kicker--dark">What Gala Does</div>
              <h2>A commercial property search built around your criteria.</h2>
              <p className="gala-lead">Gala CRE translates timing, investment requirements, markets, and capital into a usable acquisition brief—then applies it to the search.</p>
              <ul className="gala-exchange-role__list">
                <li><Check aria-hidden="true" /><span>Translate timing and investment requirements into a clear search brief.</span></li>
                <li><Check aria-hidden="true" /><span>Identify and compare potential commercial properties.</span></li>
                <li><Check aria-hidden="true" /><span>Coordinate property conversations, tours, and next steps.</span></li>
                <li><Check aria-hidden="true" /><span>Work alongside the investor’s legal, tax, financing, and intermediary advisors.</span></li>
              </ul>
              <p className="gala-exchange-role__limitation">Property availability, suitability, contract acceptance, financing, diligence, closing, and exchange treatment depend on the facts of each transaction and the guidance of the investor’s advisors.</p>
            </div>
            <figure>
              <img src={capitalReviewImage} alt="Professionals reviewing investment materials" />
              <figcaption>A focused brief gives the search direction.</figcaption>
            </figure>
          </div>
        </section>

        <section className="gala-section gala-section--black gala-exchange-process">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div>
                <div className="gala-kicker">A Clear Search Process</div>
                <h2>From confirmed timing to the right property fit.</h2>
              </div>
              <p>Each step narrows the search and keeps property decisions connected to the investor’s timing, criteria, and capital position.</p>
            </div>
            <div className="gala-exchange-process__grid">
              {sourcingProcess.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="gala-exchange-criteria__grid" aria-label="Acquisition criteria summary">
              {acquisitionCriteria.map((criterion, index) => (
                <article key={criterion.title}>
                  <span>0{index + 1}</span>
                  <h3>{criterion.title}</h3>
                  <p>{criterion.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-career-application gala-investor-application" id="investor-inquiry">
          <div className="gala-shell gala-investor-application__inner">
            <div className="gala-investor-application__intro">
              <div className="gala-kicker gala-kicker--dark">Investor Inquiry</div>
              <h2>Start with the essentials.</h2>
              <p>Share the timing, property criteria, and capital position Gala needs to prepare for a focused first conversation.</p>
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
