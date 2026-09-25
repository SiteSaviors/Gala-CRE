import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import companyHero from "@/assets/company-hero.avif";
import companyAboutPrimary from "@/assets/site-strategy-field-context.webp";
import companyAboutInset from "@/assets/office-investment-sales.webp";
import triangleMarketVisual from "@/assets/triangle-market-raleigh.webp";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TeamRoster from "@/components/team/TeamRoster";
import useSiteCursor from "@/hooks/useSiteCursor";

const operatingModel = [
  {
    step: "01",
    title: "Evaluate",
    body: "Understand the objective, property, market, timing, and material risks.",
  },
  {
    step: "02",
    title: "Position",
    body: "Define the opportunity, intended audience, and strongest path to market.",
  },
  {
    step: "03",
    title: "Structure",
    body: "Align the transaction with the development, capital, and specialist expertise it requires.",
  },
  {
    step: "04",
    title: "Execute",
    body: "Lead negotiations, diligence, coordination, and the path to closing.",
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

        <section className="gala-company-about" aria-labelledby="company-about-title">
          <div className="gala-shell gala-company-about__grid">
            <div className="gala-company-about__media" aria-hidden="true">
              <img
                className="gala-company-about__primary"
                src={companyAboutPrimary}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <img
                className="gala-company-about__inset"
                src={companyAboutInset}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="gala-company-about__copy">
              <div className="gala-kicker gala-kicker--dark">About Gala CRE</div>
              <h2 id="company-about-title">Brokerage grounded in how real estate gets built.</h2>
              <p className="gala-lead">Gala CRE brings a developer-informed perspective to commercial real estate decisions.</p>
              <p>We look beyond the immediate sale, lease, or acquisition to the market, site, capital, diligence, and execution questions that can shape the outcome.</p>
              <p>From our Cary base, we help owners, investors, and businesses make those tradeoffs visible and bring the right capabilities together around a clear objective.</p>
            </div>
          </div>
        </section>

        <section className="gala-company-model" aria-labelledby="company-model-title">
          <div className="gala-shell">
            <div className="gala-company-model__intro">
              <div>
                <div className="gala-kicker">The Gala Approach</div>
                <h2 id="company-model-title">From first evaluation to final execution.</h2>
              </div>
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

        <section className="gala-company-presence" aria-labelledby="company-presence-title">
          <div className="gala-shell gala-company-presence__grid">
            <div className="gala-company-presence__copy">
              <div className="gala-kicker">Triangle Market Perspective</div>
              <h2 id="company-presence-title">Grounded in one of North Carolina’s most dynamic markets.</h2>
              <p>Based in Cary, Gala CRE works across Raleigh, Durham, and the communities connecting the Research Triangle. We bring local market context to site selection, investment, development, leasing, and disposition decisions—helping clients understand not only where an opportunity sits, but what surrounds it and what may shape its future.</p>
              <p className="gala-company-presence__markets" aria-label="Markets served">
                Cary <span aria-hidden="true">·</span> Raleigh <span aria-hidden="true">·</span> Durham <span aria-hidden="true">·</span> Morrisville <span aria-hidden="true">·</span> Apex <span aria-hidden="true">·</span> Research Triangle Park
              </p>
            </div>
          </div>
          <figure className="gala-company-presence__media">
            <img src={triangleMarketVisual} alt="Conceptual city skyline emerging from an architectural site plan" loading="lazy" decoding="async" />
          </figure>
        </section>

        <section className="gala-cta-band gala-company-close"><div className="gala-shell"><div><div className="gala-kicker">Work With Gala</div><h2>Start with a straightforward conversation.</h2></div><div className="gala-cta-band__actions"><Link to="/contact?inquiry=general&source=company" className="gala-button">Let’s Connect <ArrowUpRight size={16} aria-hidden="true" /></Link><Link to="/careers?source=company" className="gala-text-link">Explore Careers <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
      </main>
      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
