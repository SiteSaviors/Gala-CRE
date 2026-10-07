import { useState } from "react";
import { Building2, ClipboardCheck, Megaphone, Plus, Search, Target, Users, X } from "lucide-react";
import AgentApplicationForm from "@/components/careers/AgentApplicationForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { listingAgentBenefits } from "@/content/careers";
import useSiteCursor from "@/hooks/useSiteCursor";
import benefitLeadershipImage from "@/assets/equity-alignment-context.webp";
import benefitStrategyImage from "@/assets/careers-benefit-listing-strategy-real.webp";
import benefitMarketingImage from "@/assets/gala-sales-capability.webp";
import benefitOutreachImage from "@/assets/landlord-leasing-context.webp";
import benefitCoordinationImage from "@/assets/company-approach-structure.jpg";
import benefitDevelopmentImage from "@/assets/development-infrastructure.webp";
import careersHeroImage from "@/assets/careers-hero.avif";
import careersHeroBackground from "@/assets/careers-hero-background.jpeg";

const benefitIcons = [Users, Target, Megaphone, Search, ClipboardCheck, Building2] as const;
const benefitImages = [
  benefitLeadershipImage,
  benefitStrategyImage,
  benefitMarketingImage,
  benefitOutreachImage,
  benefitCoordinationImage,
  benefitDevelopmentImage,
] as const;

const Careers = () => {
  useSiteCursor();
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);

  return (
    <>
      <PageMeta
        title="Commercial Listing Agent Careers"
        description="Explore opportunities for commercial listing agents to build their practice with Gala CRE Group in North Carolina."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/careers" />

      <main className="gala-page gala-journey-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-journey-hero gala-careers-hero" aria-labelledby="careers-hero-title">
          <img
            className="gala-careers-hero__image"
            src={careersHeroBackground}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <div className="gala-shell">
            <div className="gala-kicker">Careers at Gala CRE</div>
            <h1 id="careers-hero-title">Join Our Team</h1>
            <p>Gala CRE Group is building a brokerage for commercial real estate agents who want to grow their business with experienced leadership and practical support behind them.</p>
          </div>
        </section>

        <section className="gala-careers-opportunity" aria-labelledby="listing-agent-opportunity-title">
          <div className="gala-shell gala-careers-opportunity__grid">
            <div className="gala-careers-opportunity__copy">
              <div className="gala-kicker gala-kicker--dark">Our Mission</div>
              <h2 id="listing-agent-opportunity-title">Build a commercial practice with more behind it.</h2>
              <p className="gala-lead">At Gala CRE Group, our mission is clear: to recruit, educate, and retain agents who consistently enrich their clients and the community. The firm equips agents with tools, training, and support so they can build their business their way.</p>
              <p>For commercial listing agents, that means room to develop a distinct practice while drawing on the experience, perspective, and resources of the broader Gala platform.</p>
            </div>
            <figure className="gala-careers-opportunity__media">
              <img src={careersHeroImage} alt="Gala CRE professionals reviewing commercial real estate plans" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section className="gala-careers-benefits" aria-labelledby="listing-agent-benefits-title">
          <div className="gala-shell">
            <div className="gala-careers-benefits__intro">
              <div>
                <div className="gala-kicker gala-kicker--dark">Why Gala CRE</div>
                <h2 id="listing-agent-benefits-title">The resources to move you forward.</h2>
              </div>
              <p>Practical support for the work required to win, position, market, and execute a commercial assignment.</p>
            </div>

            <div className="gala-careers-benefits__grid">
              {listingAgentBenefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                const benefitImage = benefitImages[index];
                const isActive = activeBenefit === index;
                return (
                  <button
                    className={`gala-careers-benefit${isActive ? " is-active" : ""}`}
                    type="button"
                    key={benefit.title}
                    aria-expanded={isActive}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setActiveBenefit(index);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") setActiveBenefit(null);
                    }}
                    onClick={(event) => {
                      const isMouseClick = event.detail > 0
                        && typeof window.matchMedia === "function"
                        && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                      if (!isMouseClick) setActiveBenefit(isActive ? null : index);
                    }}
                  >
                    <img
                      className="gala-careers-benefit__image"
                      src={benefitImage}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="gala-careers-benefit__number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="gala-careers-benefit__control" aria-hidden="true">
                      {isActive ? <X size={18} /> : <Plus size={18} />}
                    </span>
                    <span className="gala-careers-benefit__front" aria-hidden={isActive}>
                      <Icon size={42} strokeWidth={1.25} aria-hidden="true" />
                      <strong>{benefit.title}</strong>
                    </span>
                    <span className="gala-careers-benefit__detail" aria-hidden={!isActive}>
                      <strong>{benefit.title}</strong>
                      <span>{benefit.body}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-career-application gala-career-application--condensed" id="agent-application">
          <div className="gala-shell gala-career-application__single">
            <AgentApplicationForm />
            <p className="gala-career-disclosure">Gala CRE Group considers qualified professionals without regard to any status protected by applicable law. Any employment, independent-contractor, brokerage, or affiliation opportunity is subject to applicable licensing requirements, mutual evaluation, and written agreement. Submission of this inquiry does not create an employment or agency relationship.</p>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/careers" />
    </>
  );
};

export default Careers;
