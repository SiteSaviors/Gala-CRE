import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import companyHero from "@/assets/company-hero.avif";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TeamRoster from "@/components/team/TeamRoster";
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

const proofPoints = [
  {
    label: "Developer-Informed",
    title: "Decisions in context.",
    body: "Market position, site constraints, capital readiness, diligence, and execution are considered alongside the immediate transaction.",
  },
  {
    label: "Current Work",
    title: "Opportunities you can examine.",
    body: "Review Gala CRE’s public catalog of active commercial opportunities and selected completed transactions.",
    href: "/properties",
    action: "Explore Properties",
  },
  {
    label: "Public Context",
    title: "Coverage beyond our own site.",
    body: "Read coverage and conversations involving Gala leadership and related real estate ventures.",
    href: "/news",
    action: "View News & Media",
  },
] as const;

const Company = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta title="Company & Team" description="Meet Gala CRE Group, a Cary-based, developer-informed commercial brokerage serving owners, investors, and businesses across Raleigh-Durham and the Research Triangle." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/company" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-company-hero" aria-labelledby="company-hero-title">
          <img
            className="gala-company-hero__image"
            src={companyHero}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
          <div className="gala-shell gala-company-hero__inner">
            <div className="gala-company-hero__copy">
              <div className="gala-kicker">The Developer's Brokerage</div>
              <h1 id="company-hero-title">Who we are</h1>
              <p>Based in Cary, Gala CRE helps owners, investors, and businesses evaluate commercial real estate with the market, site, capital, and execution realities in view.</p>
              <Link className="gala-text-link gala-company-hero__link" to="/services">
                Explore our capabilities <ArrowDownRight size={17} aria-hidden="true" />
              </Link>
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

        <section className="gala-company-proof" aria-labelledby="company-proof-title">
          <div className="gala-shell">
            <div className="gala-company-proof__intro">
              <div className="gala-kicker gala-kicker--dark">Perspective in Practice</div>
              <h2 id="company-proof-title">Grounded in the work.</h2>
            </div>
            <div className="gala-company-proof__grid">
              {proofPoints.map(({ label, title, body, ...link }) => (
                <article key={label}>
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  {"href" in link ? (
                    <Link className="gala-text-link" to={link.href}>
                      {link.action} <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <TeamRoster />

        <section className="gala-company-presence" aria-labelledby="company-presence-title">
          <div className="gala-shell gala-company-presence__grid">
            <div>
              <MapPin aria-hidden="true" />
              <div className="gala-kicker">Triangle Presence</div>
              <h2 id="company-presence-title">Based in Cary. Focused on the Research Triangle.</h2>
            </div>
            <p>Gala CRE serves commercial owners, investors, landlords, tenants, developers, and business operators across Raleigh-Durham and the Research Triangle. Every assignment begins with the property, the client’s objective, and the local context that connects them.</p>
          </div>
        </section>

        <section className="gala-cta-band gala-company-close"><div className="gala-shell"><div><div className="gala-kicker">Work With Gala</div><h2>Start with a straightforward conversation.</h2></div><div className="gala-cta-band__actions"><Link to="/contact?inquiry=general&source=company" className="gala-button">Let’s Connect <ArrowUpRight size={16} aria-hidden="true" /></Link><Link to="/careers?source=company" className="gala-text-link">Explore Careers <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
      </main>
      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
