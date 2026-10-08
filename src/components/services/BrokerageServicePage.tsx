import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building,
  Building2,
  Check,
  Factory,
  HeartHandshake,
  Hospital,
  Layers3,
  MapPinned,
  Store,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { getServiceInquiryHref, serviceBySlug, type Service } from "@/content/services";
import landlordRepresentationImage from "@/assets/brokerage-landlord-representation.webp";
import brokerageAdvantageCityscape from "@/assets/brokerage-advantage-cityscape.webp";
import brokerageHeroImage from "@/assets/brokerage-hero-booklet.webp";
import tenantRepresentationImage from "@/assets/brokerage-tenant-representation.jpg";

type BrokerageServicePageProps = {
  service: Service;
};

const brokeragePaths = [
  {
    id: "landlord-representation",
    audience: "For Owners",
    summary: "Position the property, reach qualified tenants, structure the lease, and protect the owner’s objective.",
    image: landlordRepresentationImage,
  },
  {
    id: "tenant-representation",
    audience: "For Occupiers",
    summary: "Define the requirement, compare alternatives, negotiate from clarity, and protect the needs of the business.",
    image: tenantRepresentationImage,
  },
] as const;

const brokerageAdvantages = [
  {
    title: "Market Expertise",
    detail: "We stay ahead of the curve on market trends, vacancy rates, and tenant preferences, ensuring your property is competitively priced and positioned for success.",
  },
  {
    title: "Strategic Marketing",
    detail: "We go beyond basic online listings. We develop targeted marketing campaigns that reach ideal tenants and showcase your property's unique features and benefits.",
  },
  {
    title: "Tenant Selection",
    detail: "We help you identify financially secure and reliable tenants who will be great tenants for the years (and hopefully decades) to come.",
  },
  {
    title: "Lease Negotiation",
    detail: "We work with you to secure the best possible rent and lease terms to protect your investment.",
  },
] as const;

const relatedServiceSlugs = ["investment-sales", "development-services", "capital-markets"] as const;

const brokerageAssetTypes = [
  { label: "Office", icon: Building2 },
  { label: "Industrial", icon: Factory },
  { label: "Retail", icon: Store },
  { label: "Medical + Healthcare", icon: Hospital },
  { label: "Multifamily", icon: Building },
  { label: "Land", icon: MapPinned },
  { label: "Mixed-Use", icon: Layers3 },
] as const;

const brokerageClientTypes = [
  { label: "Property Owners + Landlords", icon: Building2 },
  { label: "Business Occupiers + Tenants", icon: BriefcaseBusiness },
  { label: "Investors + Developers", icon: TrendingUp },
  { label: "Community + Institutional Organizations", icon: HeartHandshake },
] as const;

type BrokerageCoverageTab = "assets" | "clients";

const BrokerageServicePage = ({ service }: BrokerageServicePageProps) => {
  const [coverageTab, setCoverageTab] = useState<BrokerageCoverageTab>("assets");
  const advantageSectionRef = useRef<HTMLElement>(null);
  const capabilitiesByRoute = Object.fromEntries(
    service.capabilities.map((capability) => [capability.route, capability]),
  );
  const coverageItems = coverageTab === "assets" ? brokerageAssetTypes : brokerageClientTypes;

  useEffect(() => {
    const section = advantageSectionRef.current;
    if (!section) return;

    const revealItems = Array.from(section.querySelectorAll<HTMLElement>("[data-advantage-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageMeta title={service.name} description="Landlord and tenant representation grounded in clear advocacy, market context, and disciplined lease execution." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/services/brokerage" />
      <main className="gala-page gala-brokerage-page" id="main-content" tabIndex={-1}>
        <section className="gala-brokerage-hero" aria-labelledby="brokerage-hero-title">
          <div className="gala-brokerage-hero__image">
            <img src={brokerageHeroImage} alt="Gala CRE brokerage presentation featuring a commercial office property" />
            <svg
              className="gala-brokerage-hero__image-outline"
              viewBox="0 0 1000 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M78 0H1000V630L922 700H0V70Z" />
              <path className="gala-brokerage-hero__image-accent" d="M790 -16H1018V180" />
              <path className="gala-brokerage-hero__image-accent" d="M-16 520V716H220" />
            </svg>
          </div>
          <div className="gala-brokerage-hero__copy">
            <span className="gala-brokerage-hero__linework" aria-hidden="true"></span>
            <div className="gala-kicker">Landlord + Tenant Representation</div>
            <h1 id="brokerage-hero-title">Developer&apos;s Brokerage</h1>
            <p>Gala CRE Group helps landlords and tenants secure commercial real estate outcomes aligned with their long-term objectives.</p>
            <Link to={getServiceInquiryHref("brokerage")} className="gala-investment-narrative-button gala-brokerage-hero__button">
              <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
            </Link>
          </div>
        </section>

        <section className="gala-brokerage-paths" aria-labelledby="brokerage-paths-title">
          <div className="gala-shell">
            <div className="gala-brokerage-paths__head">
              <div className="gala-kicker gala-kicker--dark">Two Distinct Mandates</div>
              <h2 id="brokerage-paths-title">Two sides of the market. One disciplined standard.</h2>
            </div>
            <div className="gala-brokerage-paths__panels">
              {brokeragePaths.map((path, index) => {
                const capability = capabilitiesByRoute[path.id];
                if (!capability) return null;

                return (
                  <article
                    className={`gala-brokerage-path gala-brokerage-path--${index === 0 ? "owner" : "occupier"}`}
                    id={path.id}
                    key={path.id}
                    tabIndex={0}
                  >
                    {path.image ? <img className="gala-brokerage-path__image" src={path.image} alt="" aria-hidden="true" /> : null}
                    {path.image ? <span className="gala-brokerage-path__wash" aria-hidden="true"></span> : null}
                    <div className="gala-brokerage-path__number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="gala-brokerage-path__audience">{path.audience}</div>
                    <h3>{capability.label}</h3>
                    <p>{path.summary}</p>
                    {capability.included?.length ? (
                      <div className="gala-brokerage-path__scope">
                        <span>Scope of representation</span>
                        <ul>
                          {capability.included.map((item) => (
                            <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <Link to={getServiceInquiryHref("brokerage", path.id)} className="gala-brokerage-path__link">
                      Discuss {capability.label}<ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-brokerage-coverage" aria-labelledby="brokerage-coverage-title">
          <div className="gala-shell gala-brokerage-coverage__inner">
            <h2 id="brokerage-coverage-title" className="sr-only">Brokerage asset types and client types</h2>
            <div className="gala-brokerage-coverage__tabs" role="tablist" aria-label="Brokerage coverage">
              <button
                type="button"
                role="tab"
                id="brokerage-assets-tab"
                aria-selected={coverageTab === "assets"}
                aria-controls="brokerage-coverage-panel"
                tabIndex={coverageTab === "assets" ? 0 : -1}
                onClick={() => setCoverageTab("assets")}
              >
                Asset Types
              </button>
              <button
                type="button"
                role="tab"
                id="brokerage-clients-tab"
                aria-selected={coverageTab === "clients"}
                aria-controls="brokerage-coverage-panel"
                tabIndex={coverageTab === "clients" ? 0 : -1}
                onClick={() => setCoverageTab("clients")}
              >
                Client Types
              </button>
            </div>
            <div
              className={`gala-brokerage-coverage__grid gala-brokerage-coverage__grid--${coverageTab}`}
              id="brokerage-coverage-panel"
              role="tabpanel"
              aria-labelledby={coverageTab === "assets" ? "brokerage-assets-tab" : "brokerage-clients-tab"}
              key={coverageTab}
            >
              {coverageItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="gala-brokerage-coverage__item" key={item.label}>
                    <Icon size={48} strokeWidth={1.25} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="gala-brokerage-advantage"
          aria-labelledby="brokerage-advantage-title"
          ref={advantageSectionRef}
        >
          <img
            className="gala-brokerage-advantage__backdrop"
            src={brokerageAdvantageCityscape}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <span className="gala-brokerage-advantage__wash" aria-hidden="true"></span>
          <div className="gala-shell">
            <div className="gala-brokerage-advantage__intro" data-advantage-reveal>
              <div className="gala-kicker gala-kicker--dark">The Gala Commercial Advantage</div>
              <h2 id="brokerage-advantage-title">Full Cycle Solutions, Tailored to You</h2>
            </div>
            <ol className="gala-brokerage-advantage__grid">
              {brokerageAdvantages.map((advantage, index) => (
                <li className="gala-brokerage-advantage__card" data-advantage-reveal key={advantage.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="gala-brokerage-rail">
          <div className="gala-shell gala-brokerage-rail__inner">
            <div className="gala-brokerage-rail__audience">
              <span>Built for</span>
              <strong>{service.audience}</strong>
            </div>
            <div className="gala-brokerage-rail__links" role="navigation" aria-label="Related services">
              <span>Related services</span>
              {relatedServiceSlugs.map((slug) => {
                const relatedService = serviceBySlug[slug];
                return (
                  <Link to={`/services/${slug}`} key={slug}>
                    {relatedService.name}<ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-brokerage-cta">
          <div className="gala-shell gala-brokerage-cta__inner">
            <div>
              <div className="gala-kicker gala-kicker--dark">Start a Conversation</div>
              <h2>Have a property or space requirement?</h2>
            </div>
            <Link to={getServiceInquiryHref("brokerage")} className="gala-button gala-button--dark">
              Discuss Your Brokerage Needs<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services/brokerage" />
    </>
  );
};

export default BrokerageServicePage;
