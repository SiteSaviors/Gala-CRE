import { ArrowUpRight, Building2, Compass, Handshake, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import useSiteCursor from "@/hooks/useSiteCursor";

const principles = [
  { icon: Compass, title: "Clarity", body: "Explain the tradeoffs, sequence the decisions, and make the next step understandable." },
  { icon: Building2, title: "Commercial Perspective", body: "Evaluate each opportunity through its market, property, capital, and execution realities." },
  { icon: Handshake, title: "Direct Partnership", body: "Give clients senior attention, responsive communication, and advice shaped around their objectives." },
] as const;

const Company = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta title="Company" description="Meet Gala CRE Group, a commercial real estate brokerage and advisory platform serving Raleigh-Durham and the Research Triangle." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/company" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero">
          <div className="gala-shell"><div className="gala-kicker">Company</div><h1>Commercial expertise made more personal.</h1><p>Gala CRE Group is building a clearer, more connected commercial real estate experience for owners, investors, landlords, tenants, and business operators.</p></div>
        </section>

        <section className="gala-section gala-section--light"><div className="gala-shell gala-split">
          <div><div className="gala-kicker gala-kicker--dark">Our Purpose</div><h2>Bring institutional perspective within reach.</h2></div>
          <div><p className="gala-lead">Commercial real estate decisions can become fragmented across brokerage, development, operations, and capital. Gala CRE Group is designed to make that process easier to understand and easier to act on.</p><p className="gala-body-copy">We bring the right conversations together early, communicate the tradeoffs clearly, and keep each decision connected to the client’s larger objective.</p></div>
        </div></section>

        <section className="gala-section gala-section--black"><div className="gala-shell">
          <div className="gala-section-head"><div className="gala-kicker">How We Work</div><h2>A practical standard for every engagement.</h2></div>
          <div className="gala-principle-grid">{principles.map(({ icon: Icon, title, body }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div></section>

        <section className="gala-section gala-section--silver"><div className="gala-shell gala-split">
          <div><MapPin className="gala-large-icon" aria-hidden="true" /><div className="gala-kicker gala-kicker--dark">Research Triangle</div><h2>Rooted in Raleigh-Durham.</h2></div>
          <div><p className="gala-lead">Local context matters. Gala’s commercial platform is focused on helping clients understand opportunity across one of North Carolina’s most dynamic regions.</p></div>
        </div></section>

        <section className="gala-cta-band"><div className="gala-shell"><div><div className="gala-kicker">Work With Gala</div><h2>Start with a straightforward conversation.</h2></div><div className="gala-cta-band__actions"><Link to="/team" className="gala-text-link">Meet Our Team <ArrowUpRight size={16} /></Link><Link to="/careers?source=company" className="gala-text-link">Explore Careers <ArrowUpRight size={16} /></Link><Link to="/contact" className="gala-button">Talk to an Advisor <ArrowUpRight size={16} /></Link></div></div></section>
      </main>
      <SiteFooter currentPath="/company" />
    </>
  );
};

export default Company;
