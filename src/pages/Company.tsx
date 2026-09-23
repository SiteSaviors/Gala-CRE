import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TeamRoster from "@/components/team/TeamRoster";
import { teamMembers } from "@/content/team";
import useSiteCursor from "@/hooks/useSiteCursor";

const operatingModel = [
  {
    step: "01",
    title: "Evaluate",
    body: "Start with the objective, then examine the market, property, timing, and diligence questions that shape the decision.",
  },
  {
    step: "02",
    title: "Position",
    body: "Define the clearest market story, intended audience, and path forward before an opportunity is introduced or pursued.",
  },
  {
    step: "03",
    title: "Structure",
    body: "Shape the transaction plan and coordinate the development, capital, or specialist input the assignment requires.",
  },
  {
    step: "04",
    title: "Execute",
    body: "Lead the transaction, keep diligence moving, and align the parties around the next critical milestone.",
  },
] as const;

const Company = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta title="Company" description="Meet Gala CRE Group, a developer-informed commercial brokerage helping owners, investors, and businesses across Raleigh-Durham and the Research Triangle." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/company" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-company-hero" aria-labelledby="company-hero-title">
          <div className="gala-shell gala-company-hero__grid">
            <div className="gala-company-hero__copy">
              <div className="gala-kicker">The Developer's Brokerage</div>
              <h1 id="company-hero-title">See the whole opportunity.</h1>
              <p>Based in Cary, Gala CRE helps owners, investors, and businesses evaluate commercial real estate with the market, site, capital, and execution realities in view.</p>
              <Link className="gala-text-link gala-company-hero__link" to="/services">
                Explore our capabilities <ArrowDownRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="gala-company-hero__portraits" aria-hidden="true">
              {teamMembers.map((member, index) => (
                <figure className="gala-company-hero__portrait" key={member.id}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-company-why" aria-labelledby="company-why-title">
          <div className="gala-shell gala-company-why__grid">
            <div className="gala-company-why__heading">
              <div className="gala-kicker gala-kicker--dark">Why Gala</div>
              <h2 id="company-why-title">The transaction is only one part of the decision.</h2>
            </div>
            <div className="gala-company-why__copy">
              <p className="gala-lead">A sale can expose entitlement questions. A site search can change capital needs. A lease can shape operations long after it is signed.</p>
              <p>Gala brings those consequences into the conversation early. We begin with the client’s objective, make the tradeoffs visible, and connect the appropriate brokerage capability or outside professional as the assignment develops.</p>
              <p>The result is a clearer path from opportunity to execution—without treating the property, the transaction, and what comes next as separate decisions.</p>
            </div>
          </div>
        </section>

        <section className="gala-company-model" aria-labelledby="company-model-title">
          <div className="gala-shell">
            <div className="gala-company-model__intro">
              <div>
                <div className="gala-kicker">How Gala Works</div>
                <h2 id="company-model-title">A connected path from opportunity to execution.</h2>
              </div>
              <p>Each engagement is different. The sequence stays disciplined enough to keep the objective, the real estate, and the next decision aligned.</p>
            </div>
            <ol className="gala-company-model__steps">
              {operatingModel.map(({ step, title, body }) => (
                <li key={title}>
                  <span>{step}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <TeamRoster />

        <section className="gala-cta-band"><div className="gala-shell"><div><div className="gala-kicker">Work With Gala</div><h2>Start with a straightforward conversation.</h2></div><div className="gala-cta-band__actions"><Link to="/company#team" className="gala-text-link">Meet Our Team <ArrowUpRight size={16} /></Link><Link to="/careers?source=company" className="gala-text-link">Explore Careers <ArrowUpRight size={16} /></Link><Link to="/contact" className="gala-button">Talk to an Advisor <ArrowUpRight size={16} /></Link></div></div></section>
      </main>
      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
