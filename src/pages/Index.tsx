import { ArrowUpRight, Building2, KeyRound, Landmark, MapPin, Search, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroPosterDesktop from "@/assets/GALA-CRE-HERO-DESKTOP.webp";
import heroPosterMobile from "@/assets/GALA-CRE-HERO-MOBILE.webp";
import heroVideo from "@/assets/GALA-CRE-HERO-LOOP.mp4";
import PropertyCard from "@/components/properties/PropertyCard";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { featuredProperties } from "@/content/properties";
import { assetTypes, services } from "@/content/services";
import { useIsMobile } from "@/hooks/use-mobile";
import useSiteCursor from "@/hooks/useSiteCursor";

const clientPaths = [
  { title: "Sell or Lease", body: "Position a commercial property with a strategy shaped around your timing, market, and ownership goals.", href: "/services/brokerage", icon: Building2 },
  { title: "Find Space", body: "Evaluate locations, compare opportunities, and negotiate from a clearer understanding of the market.", href: "/properties", icon: Search },
  { title: "Invest", body: "Assess acquisitions, dispositions, development paths, and capital decisions with connected guidance.", href: "/services/investment-sales", icon: TrendingUp },
] as const;

const Index = () => {
  const isMobile = useIsMobile();
  const heroPoster = isMobile ? heroPosterMobile : heroPosterDesktop;
  const introductionRef = useRef<HTMLElement>(null);
  useSiteCursor();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const video = document.getElementById("hvideo") as HTMLVideoElement | null;
    if (!hero || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.2 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = introductionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      section.style.setProperty("--gala-intro-shift", "0px");
      return;
    }

    let animationFrame = 0;
    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
      section.style.setProperty("--gala-intro-shift", `${(progress - 0.5) * 220}px`);
      animationFrame = 0;
    };
    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <PageMeta title="Commercial Real Estate, Simplified" description="Commercial real estate brokerage and advisory for owners, investors, landlords, tenants, and business operators across the Research Triangle." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/" />
      <main className="gala-home">
        <section className="hero gala-hero" id="hero">
          <div className="hbg" style={{ backgroundImage: `url(${heroPoster})` }}>
            <video className="hbgv" id="hvideo" muted loop playsInline preload="metadata" poster={heroPoster} aria-hidden="true" disablePictureInPicture>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <div className="hinner"><div className="glass text-left">
            <div className="ey">Commercial Brokerage · Advisory · Development</div>
            <h1>CRE,<br />Simplified.</h1>
            <p className="hsp">Institution-level commercial real estate guidance delivered with clarity, local perspective, and a more personal process.</p>
            <div className="hbtns"><Link to="/contact" className="bp">Talk to an Advisor</Link><Link to="/properties" className="bg">View Properties <ArrowUpRight size={15} /></Link></div>
          </div></div>
          <div className="si"><div className="silbl">Scroll</div><div className="sil"></div></div>
        </section>

        <section className="gala-editorial-intro" ref={introductionRef}>
          <div className="gala-editorial-intro__wordfield" aria-hidden="true">
            <div className="gala-editorial-intro__wordrow gala-editorial-intro__wordrow--one">
              {Array.from({ length: 4 }, (_, index) => <span key={index}>GALA</span>)}
            </div>
            <div className="gala-editorial-intro__wordrow gala-editorial-intro__wordrow--two">
              {Array.from({ length: 4 }, (_, index) => <span key={index}>GALA</span>)}
            </div>
          </div>
          <div className="gala-editorial-intro__body">
            <div className="gala-editorial-intro__copy">
              <div className="gala-kicker gala-kicker--dark">Introduction</div>
              <h2>About Gala CRE Group</h2>
              <p>Gala CRE Group helps property owners, private investors, and businesses navigate commercial real estate with the strategy and perspective typically associated with larger institutions.</p>
              <p>From brokerage and investment sales to development services and capital guidance, we bring each opportunity into focus and make the path forward easier to understand.</p>
              <Link to="/company" className="gala-text-link">Meet Gala CRE Group <ArrowUpRight size={16} /></Link>
            </div>
            <figure className="gala-editorial-intro__media">
              <picture>
                <source media="(max-width: 768px)" srcSet={heroPosterMobile} />
                <img src={heroPosterDesktop} alt="Modern multifamily property exterior" />
              </picture>
              <figcaption>North Carolina Commercial Real Estate</figcaption>
            </figure>
          </div>
        </section>

        <section className="gala-section gala-section--black"><div className="gala-shell">
          <div className="gala-section-head"><div className="gala-kicker">Start With Your Objective</div><h2>Where can we help you move forward?</h2></div>
          <div className="gala-path-grid">{clientPaths.map(({ title, body, href, icon: Icon }, index) => (
            <Link to={href} className="gala-path-card" key={title}><div className="gala-path-card__top"><span>0{index + 1}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{body}</p><ArrowUpRight className="gala-path-card__arrow" aria-hidden="true" /></Link>
          ))}</div>
        </div></section>

        <section className="gala-section gala-section--silver"><div className="gala-shell">
          <div className="gala-section-head gala-section-head--row"><div><div className="gala-kicker gala-kicker--dark">Full-Service Perspective</div><h2>Connected expertise from strategy through execution.</h2></div><Link to="/services" className="gala-text-link">Explore All Services <ArrowUpRight size={16} /></Link></div>
          <div className="gala-service-list">{services.map((service, index) => (
            <Link to={`/services/${service.slug}`} key={service.slug}><span>0{index + 1}</span><strong>{service.name}</strong><p>{service.summary}</p><ArrowUpRight size={19} /></Link>
          ))}</div>
        </div></section>

        <section className="gala-section gala-section--light"><div className="gala-shell">
          <div className="gala-section-head gala-section-head--row"><div><div className="gala-kicker gala-kicker--dark">Featured Properties</div><h2>Commercial opportunities in the Triangle.</h2></div><Link to="/properties" className="gala-text-link">View All Properties <ArrowUpRight size={16} /></Link></div>
          {featuredProperties.length ? <div className="gala-property-grid">{featuredProperties.slice(0, 3).map((property) => <PropertyCard key={property.slug} property={property} />)}</div> : <div className="gala-inline-empty"><Landmark aria-hidden="true" /><div><strong>Property intake is underway.</strong><p>Approved Gala listings will appear here as client PDFs, facts, and photography are finalized.</p></div></div>}
        </div></section>

        <section className="gala-section gala-section--black"><div className="gala-shell gala-split gala-asset-section">
          <div><div className="gala-kicker">Asset Expertise</div><h2>Focused across five essential commercial property types.</h2><p>Each opportunity is evaluated through its market, operating profile, physical constraints, and path to value.</p></div>
          <div className="gala-asset-list">{assetTypes.map((asset, index) => <span key={asset}><small>0{index + 1}</small>{asset}</span>)}</div>
        </div></section>

        <section className="gala-market-section"><div className="gala-market-section__shade"></div><div className="gala-shell gala-market-section__content"><MapPin aria-hidden="true" /><div className="gala-kicker">Raleigh-Durham + The Research Triangle</div><h2>Local perspective in a market defined by growth.</h2><p>Gala CRE Group is being built around the relationships, context, and practical market knowledge required to navigate commercial opportunity across the Triangle.</p></div></section>

        <section className="gala-section gala-section--light"><div className="gala-shell gala-split">
          <div><div className="gala-kicker gala-kicker--dark">The Gala Team</div><h2>Experienced guidance. Direct access. Clear communication.</h2></div>
          <div><p className="gala-lead">Approved commercial team profiles, credentials, and advisor contact details will be added when supplied by Gala.</p><Link to="/company" className="gala-text-link">About the Company <ArrowUpRight size={16} /></Link></div>
        </div></section>

        <section className="gala-cta-band"><div className="gala-shell"><div><div className="gala-kicker">Your Next Move</div><h2>Tell us what you are working toward.</h2></div><Link to="/contact" className="gala-button">Talk to an Advisor <KeyRound size={16} /></Link></div></section>
      </main>
      <SiteFooter currentPath="/" />
    </>
  );
};

export default Index;
