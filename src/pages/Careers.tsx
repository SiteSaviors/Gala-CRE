import { BriefcaseBusiness, Building2, Check, Users } from "lucide-react";
import AgentApplicationForm from "@/components/careers/AgentApplicationForm";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  candidateProfile,
  careerOpportunities,
  platformAdvantages,
  recruitingProcess,
  teamSupport,
} from "@/content/careers";
import useSiteCursor from "@/hooks/useSiteCursor";
import careerPlatformImage from "@/assets/gala-introduction-gaurang.webp";

const opportunityIcons = [Building2, BriefcaseBusiness, Users] as const;

const Careers = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta
        title="Commercial Real Estate Careers"
        description="Explore commercial real estate career opportunities with Gala CRE Group in North Carolina."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/careers" />

      <main className="gala-page gala-journey-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-journey-hero">
          <div className="gala-shell">
            <div className="gala-kicker">Careers at Gala CRE</div>
            <h1>Build your commercial real estate career with intention.</h1>
            <p>Gala CRE Group is creating a connected platform for commercial agents who value clear advice, disciplined execution, and long-term client relationships.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell gala-split">
            <div>
              <div className="gala-kicker gala-kicker--dark">The Opportunity</div>
              <h2>Bring your experience into a broader commercial platform.</h2>
            </div>
            <div>
              <p className="gala-lead">Gala CRE is interested in hearing from commercially minded agents who want to grow through real assignments, coordinated support, and direct accountability.</p>
              <p className="gala-body-copy">The recruiting process will focus on experience, market knowledge, specialties, representative transactions, and the kind of business an agent wants to build.</p>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--black">
          <div className="gala-shell">
            <div className="gala-section-head">
              <div className="gala-kicker">Ways to Contribute</div>
              <h2>A place to build commercial momentum.</h2>
            </div>
            <div className="gala-principle-grid">
              {careerOpportunities.map(({ title, body }, index) => {
                const Icon = opportunityIcons[index];
                return (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-career-platform">
          <div className="gala-shell gala-career-platform__grid">
            <figure>
              <img src={careerPlatformImage} alt="Gaurang Gala at a commercial development site" />
              <figcaption>Commercial perspective in the field</figcaption>
            </figure>
            <div>
              <div className="gala-kicker gala-kicker--dark">The Gala Platform</div>
              <h2>More than a list of properties.</h2>
              <p className="gala-lead">Commercial assignments become stronger when brokerage is informed by development realities, capital requirements, and the client’s larger objective.</p>
              <ul className="gala-career-checklist">
                {platformAdvantages.map((advantage) => (
                  <li key={advantage}><Check size={17} aria-hidden="true" /><span>{advantage}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-career-support">
          <div className="gala-shell">
            <div className="gala-section-head gala-section-head--row">
              <div>
                <div className="gala-kicker gala-kicker--dark">Sales + Transaction Support</div>
                <h2>Support built around moving the assignment forward.</h2>
              </div>
              <p>Every opportunity is different. The common standard is organized communication, clear ownership of next steps, and attention to the details that influence execution.</p>
            </div>
            <div className="gala-career-support__grid">
              {teamSupport.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--black gala-career-fit">
          <div className="gala-shell gala-career-fit__grid">
            <div>
              <div className="gala-kicker">Who We Want to Meet</div>
              <h2>Commercial professionals who care how the work gets done.</h2>
              <ul className="gala-career-fit__traits">
                {candidateProfile.map((trait) => <li key={trait}><Check size={17} aria-hidden="true" />{trait}</li>)}
              </ul>
            </div>
            <div className="gala-career-process">
              <div className="gala-kicker">Recruiting Process</div>
              {recruitingProcess.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-career-application" id="agent-application">
          <div className="gala-shell gala-career-application__grid">
            <div className="gala-career-application__intro">
              <div className="gala-kicker gala-kicker--dark">Agent Application</div>
              <h2>Introduce your experience and the business you want to build.</h2>
              <p>Gala CRE is looking for enough context to have a serious first conversation—not a generic résumé drop.</p>
              <div className="gala-career-application__note">
                <strong>What happens with your information</strong>
                <p>Application details are used to evaluate a potential professional relationship and to contact you about that inquiry. Please do not include confidential client records or transaction documents.</p>
              </div>
            </div>
            <AgentApplicationForm />
          </div>
          <div className="gala-shell">
            <p className="gala-career-disclosure">Gala CRE Group considers qualified applicants without regard to any status protected by applicable law. Any employment, independent-contractor, brokerage, or affiliation opportunity is subject to applicable licensing requirements, mutual evaluation, and written agreement. Submission of an application does not create an employment or agency relationship.</p>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/careers" />
    </>
  );
};

export default Careers;
