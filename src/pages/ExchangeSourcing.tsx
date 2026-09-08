import { ArrowDown, Check, Clock3, Scale, Search } from "lucide-react";
import InvestorInquiryForm from "@/components/investors/InvestorInquiryForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  acquisitionCriteria,
  readinessGuidance,
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
              <div className="gala-kicker">1031 + Investor Property Sourcing</div>
              <h1>Move quickly with a clearer acquisition brief.</h1>
              <p>Give Gala CRE the timing, capital position, and property criteria needed to organize a focused commercial real estate search.</p>
              <a className="gala-button gala-button--gold" href="#investor-inquiry">
                Share Your Criteria <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="gala-exchange-hero__signals" aria-label="Search priorities">
              <div><Clock3 aria-hidden="true" /><strong>Timing</strong><span>Key exchange and transaction dates</span></div>
              <div><Search aria-hidden="true" /><strong>Criteria</strong><span>A defined commercial acquisition profile</span></div>
              <div><Scale aria-hidden="true" /><strong>Readiness</strong><span>Capital, financing, and decision requirements</span></div>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-exchange-role">
          <div className="gala-shell gala-exchange-role__grid">
            <div>
              <div className="gala-kicker gala-kicker--dark">Gala’s Sourcing Role</div>
              <h2>A focused search—not a promise of an outcome.</h2>
              <p className="gala-lead">Time pressure makes clarity more valuable. Gala CRE begins by translating the investor’s dates, economics, market preferences, and risk boundaries into an acquisition brief that can guide the search.</p>
              <p className="gala-body-copy">From there, Gala can help identify and compare potential commercial opportunities and coordinate property-level conversations. Availability, suitability, contract acceptance, financing, diligence, closing, and exchange treatment remain subject to the investor’s advisors and the facts of each transaction.</p>
            </div>
            <figure>
              <img src={capitalReviewImage} alt="Professionals reviewing investment materials" />
              <figcaption>Criteria first. Property evaluation second.</figcaption>
            </figure>
          </div>
        </section>

        <section className="gala-section gala-section--black gala-exchange-process">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div>
                <div className="gala-kicker">Replacement-Property Search</div>
                <h2>Make each decision narrow the field.</h2>
              </div>
              <p>The process starts with what is known, identifies what still needs confirmation, and gives each potential property a consistent screen.</p>
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
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-exchange-criteria">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div>
                <div className="gala-kicker gala-kicker--dark">Acquisition Criteria</div>
                <h2>Build a buy box Gala can work from.</h2>
              </div>
              <p>A useful brief distinguishes genuine transaction requirements from preferences that can flex when the right opportunity appears.</p>
            </div>
            <div className="gala-exchange-criteria__grid">
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

        <section className="gala-section gala-section--light gala-exchange-readiness">
          <div className="gala-shell gala-exchange-readiness__grid">
            <div>
              <div className="gala-kicker gala-kicker--dark">Timeline + Readiness</div>
              <h2>Confirm the clock. Prepare the decisions.</h2>
              <p className="gala-lead">Gala uses the dates you provide to understand internal priority, but does not calculate, confirm, or guarantee exchange deadlines.</p>
            </div>
            <ul>
              {readinessGuidance.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-career-application gala-investor-application" id="investor-inquiry">
          <div className="gala-shell gala-career-application__grid">
            <div className="gala-career-application__intro">
              <div className="gala-kicker gala-kicker--dark">Investor Inquiry</div>
              <h2>Give the search a useful starting point.</h2>
              <p>Share enough information to identify immediate constraints, screen potential opportunities, and prepare a productive first conversation.</p>
              <div className="gala-career-application__note">
                <strong>How timing is used</strong>
                <p>Exchange dates help Gala organize the inquiry internally. They do not create a response-time commitment or confirm compliance with tax rules.</p>
              </div>
            </div>
            <InvestorInquiryForm />
          </div>
          <div className="gala-shell">
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
