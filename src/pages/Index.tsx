import { ArrowUpRight, KeyRound, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import heroPosterDesktop from "@/assets/GALA-CRE-HERO-DESKTOP.webp";
import heroPosterMobile from "@/assets/GALA-CRE-HERO-MOBILE.webp";
import heroVideo from "@/assets/GALA-CRE-HERO-LOOP.mp4";
import galaBrokerCapability from "@/assets/gala-broker-capability.avif";
import galaCapitalCapability from "@/assets/gala-capital-capability.webp";
import galaDevelopCapability from "@/assets/gala-develop-capability.webp";
import galaIntroductionPortrait from "@/assets/gala-introduction-gaurang.webp";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";
import FeaturedListingsCarousel from "@/components/properties/FeaturedListingsCarousel";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { assetTypes, serviceCapabilityId } from "@/content/services";
import { useIsMobile } from "@/hooks/use-mobile";
import useSiteCursor from "@/hooks/useSiteCursor";

const homepageCapabilities = [
  {
    name: "GalaBroker",
    summary: "Commercial leasing and occupancy representation.",
    capabilities: [
      { label: "Landlord Representation", target: "Landlord representation" },
      { label: "Tenant Representation", target: "Tenant representation" },
    ],
    href: "/services/brokerage",
    image: galaBrokerCapability,
    imagePosition: "center",
  },
  {
    name: "GalaSales",
    summary: "Commercial property acquisitions, dispositions, and marketing.",
    capabilities: [
      { label: "Industrial", target: "Industrial" },
      { label: "Multifamily", target: "Multifamily" },
      { label: "Retail", target: "Retail" },
      { label: "Office", target: "Office" },
      { label: "Land", target: "Land" },
    ],
    href: "/services/investment-sales",
    image: galaSalesCapability,
    imagePosition: "center",
  },
  {
    name: "GalaDevelop",
    summary: "Commercial development planning and execution.",
    capabilities: [
      { label: "Site Strategy", target: "Feasibility and site strategy" },
      { label: "Entitlements", target: "Entitlements" },
      { label: "Infrastructure", target: "Infrastructure coordination" },
      { label: "Development Oversight", target: "Project oversight" },
    ],
    href: "/services/development-services",
    image: galaDevelopCapability,
    imagePosition: "center",
  },
  {
    name: "GalaCapital",
    summary: "Debt and equity sourcing for commercial opportunities.",
    capabilities: [
      { label: "Debt", target: "Debt placement support" },
      { label: "Equity", target: "Equity introductions" },
      { label: "Capital Strategy", target: "Capital strategy" },
      { label: "Transaction Coordination", target: "Transaction coordination" },
    ],
    href: "/services/capital-markets",
    image: galaCapitalCapability,
    imagePosition: "center",
  },
] as const;

type HomepageCapability = (typeof homepageCapabilities)[number];

type HomepageCapabilityCardProps = HomepageCapability & {
  isOpen: boolean;
  onToggle: () => void;
};

const HomepageCapabilityCard = ({
  name,
  summary,
  capabilities,
  href,
  image,
  imagePosition,
  isOpen,
  onToggle,
}: HomepageCapabilityCardProps) => {
  const rows = Math.ceil(capabilities.length / 2);
  const cardStyle = {
    "--gala-capability-panel-height": `${rows * 56 + Math.max(0, rows - 1) * 10}px`,
    "--gala-capability-panel-height-mobile": `${rows * 48 + Math.max(0, rows - 1) * 8}px`,
  } as CSSProperties;

  return (
    <article
      className={`gala-capability-card gala-capability-card--has-image${isOpen ? " gala-capability-card--open" : ""}`}
      style={cardStyle}
    >
      <img className="gala-capability-card__image" src={image} alt="" aria-hidden="true" style={{ objectPosition: imagePosition }} />
      <div className="gala-capability-card__content">
        <h3><Link to={href}>{name}</Link></h3>
        <p className="gala-capability-card__summary">{summary}</p>
      </div>
      <nav className="gala-capability-card__links" aria-label={`${name} capabilities`}>
        {capabilities.map((capability, capabilityIndex) => (
          <Link
            to={`${href}#${serviceCapabilityId(capability.target)}`}
            className="gala-capability-card__link"
            style={{ "--gala-capability-index": capabilityIndex } as CSSProperties}
            key={capability.label}
          >
            <span>{capability.label}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <ArrowUpRight className="gala-capability-card__arrow" aria-hidden="true" />
      <button
        type="button"
        className="gala-capability-card__toggle"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Hide" : "Show"} ${name} capabilities`}
        onClick={onToggle}
      >
        {isOpen ? <X aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
      </button>
    </article>
  );
};

const Index = () => {
  const isMobile = useIsMobile();
  const heroPoster = isMobile ? heroPosterMobile : heroPosterDesktop;
  const introductionRef = useRef<HTMLElement>(null);
  const [openCapability, setOpenCapability] = useState<string | null>(null);
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
      <PageMeta title="Commercial Real Estate, Simplified" description="Commercial real estate brokerage, sales, development, and capital services for clients across North Carolina." />
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
            <div className="ey">Brokerage · Sales · Development · Capital</div>
            <h1>Commercial Real Estate,<br />Simplified</h1>
            <p className="hsp">Gala CRE Group helps clients buy, sell, lease, develop, and source capital for commercial property across North Carolina.</p>
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
              <div className="gala-editorial-intro__text">
                <p>Built on more than two decades of experience, Gala CRE Group helps property owners, private investors, and businesses navigate commercial real estate with clarity and confidence.</p>
                <p>From brokerage and investment sales to development services and capital markets, our connected approach brings the right people, information, and resources together around each client’s goals. The result is a simpler, more coordinated path from opportunity to outcome.</p>
              </div>
              <Link to="/company" className="gala-text-link">Meet Gala CRE Group <ArrowUpRight size={16} /></Link>
            </div>
            <figure className="gala-editorial-intro__media">
              <img src={galaIntroductionPortrait} alt="Gaurang Gala at a commercial development site" />
              <figcaption>North Carolina Commercial Real Estate</figcaption>
            </figure>
          </div>
        </section>

        <section className="gala-section gala-section--black"><div className="gala-shell">
          <div className="gala-section-head gala-section-head--capabilities">
            <div className="gala-kicker">Gala CRE Capabilities</div>
            <h2><span>Built to move commercial</span>{" "}<span>opportunities forward.</span></h2>
          </div>
          <div className="gala-capability-grid">{homepageCapabilities.map((capability) => (
            <HomepageCapabilityCard
              {...capability}
              isOpen={openCapability === capability.name}
              onToggle={() => setOpenCapability((current) => current === capability.name ? null : capability.name)}
              key={capability.name}
            />
          ))}</div>
        </div></section>

        <FeaturedListingsCarousel />

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
