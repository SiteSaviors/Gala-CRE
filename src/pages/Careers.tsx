import { useState } from "react";
import { Building2, ClipboardCheck, Megaphone, Plus, Search, Target, Users, X } from "lucide-react";
import AgentApplicationForm from "@/components/careers/AgentApplicationForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { listingAgentBenefits } from "@/content/careers";
import useSiteCursor from "@/hooks/useSiteCursor";
import careersHeroImage from "@/assets/careers-hero.avif";
import listingOpportunityImage from "@/assets/site-strategy-field-context.webp";

const benefitIcons = [Users, Target, Megaphone, Search, ClipboardCheck, Building2] as const;

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
            src={careersHeroImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
          <div className="gala-shell">
            <div className="gala-kicker">Careers at Gala CRE</div>
            <h1 id="careers-hero-title">Join Our Team</h1>
            <p>Gala CRE Group is building a platform for commercial listing agents who value clear advice, disciplined execution, and long-term client relationships.</p>
          </div>
        </section>

        <section className="gala-careers-opportunity" aria-labelledby="listing-agent-opportunity-title">
          <div className="gala-shell gala-careers-opportunity__grid">
            <figure className="gala-careers-opportunity__media">
              <img src={listingOpportunityImage} alt="Commercial real estate professionals evaluating a development site" loading="lazy" decoding="async" />
            </figure>
            <div className="gala-careers-opportunity__copy">
              <div className="gala-kicker gala-kicker--dark">The Opportunity for Listing Agents</div>
              <h2 id="listing-agent-opportunity-title">Build a stronger commercial listing practice.</h2>
              <p className="gala-lead">Gala CRE is looking for listing agents who want to originate meaningful assignments, advise property owners with confidence, and grow durable client relationships.</p>
              <p>Bring your market knowledge and relationships. Gala brings direct leadership, coordinated resources, and a broader view of the development, capital, and execution questions surrounding each property.</p>
            </div>
          </div>
        </section>

        <section className="gala-careers-benefits" aria-labelledby="listing-agent-benefits-title">
          <div className="gala-shell">
            <div className="gala-careers-benefits__intro">
              <div>
                <div className="gala-kicker gala-kicker--dark">What Gala Provides</div>
                <h2 id="listing-agent-benefits-title">More behind every listing.</h2>
              </div>
              <p>Practical support for the work required to win, position, market, and execute a commercial assignment.</p>
            </div>

            <div className="gala-careers-benefits__grid">
              {listingAgentBenefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
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
          <div className="gala-shell gala-career-application__grid">
            <div className="gala-career-application__intro">
              <div className="gala-kicker gala-kicker--dark">Confidential Inquiry</div>
              <h2>Tell us what you want to build.</h2>
              <p>Share enough context to begin a meaningful conversation about your listing experience, market, and goals.</p>
              <div className="gala-career-application__note">
                <strong>What happens with your information</strong>
                <p>Your information is used only to evaluate a potential professional relationship and contact you about this inquiry. Please do not include confidential client or transaction records.</p>
              </div>
            </div>
            <AgentApplicationForm />
          </div>
          <div className="gala-shell">
            <p className="gala-career-disclosure">Gala CRE Group considers qualified professionals without regard to any status protected by applicable law. Any employment, independent-contractor, brokerage, or affiliation opportunity is subject to applicable licensing requirements, mutual evaluation, and written agreement. Submission of this inquiry does not create an employment or agency relationship.</p>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/careers" />
    </>
  );
};

export default Careers;
