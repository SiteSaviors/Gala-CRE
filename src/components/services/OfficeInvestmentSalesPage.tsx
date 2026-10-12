import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import officeHero from "@/assets/office-investment-sales.webp";
import officeOccupancy from "@/assets/office-occupancy-context.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import "@/styles/office-investment-sales.css";

const underwritingFactors = [
  {
    number: "01",
    title: "Income + Rollover",
    body: "Tenant credit, lease term, expirations, options, concentration, recoveries, and landlord obligations establish how much of today's income can endure.",
  },
  {
    number: "02",
    title: "Leasing Costs + Downtime",
    body: "Vacancy duration, suite condition, tenant improvements, commissions, concessions, and turn costs show what the next lease may require before it produces income.",
  },
  {
    number: "03",
    title: "Building + Competitive Position",
    body: "Systems, deferred capital, amenities, parking, access, operating costs, and space adaptability shape how the property competes for tenants and buyers.",
  },
] as const;

const saleSteps = [
  {
    number: "01",
    title: "Audit",
    body: "Reconcile the rent roll, leases, options, occupancy, operating history, suite condition, leasing commitments, and known capital requirements.",
  },
  {
    number: "02",
    title: "Frame",
    body: "Separate contracted income from rollover, vacancy, leasing costs, and future capital, then align the story with the buyers suited to that plan.",
  },
  {
    number: "03",
    title: "Execute",
    body: "Manage targeted outreach, tenant-sensitive access, offer comparison, and diligence with ownership's specialist advisors through closing.",
  },
] as const;

const siblingAssets = [
  { label: "Industrial", href: "/services/investment-sales/industrial" },
  { label: "Multifamily", href: "/services/investment-sales/multifamily" },
  { label: "Retail", href: "/services/investment-sales/retail" },
  { label: "Land", href: "/services/investment-sales/land" },
] as const;

const EditorialFrameOutline = () => (
  <svg className="gala-investment-narrative-frame__outline" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <path d="M90 0H1000V620L910 700H0V80Z" />
    <path className="gala-investment-narrative-frame__accent" d="M760 -18H1022V210" />
    <path className="gala-investment-narrative-frame__accent" d="M-18 500V718H250" />
  </svg>
);

const OfficeInvestmentSalesPage = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-office-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    page.classList.add("is-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="gala-page gala-cap-page gala-investment-narrative gala-office-page"
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
    >
      <section
        className="gala-investment-narrative-hero gala-office-hero"
        aria-labelledby="office-hero-title"
        data-office-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-office-hero__image">
          <img
            src={officeHero}
            alt="Contemporary mid-rise office building with an illuminated lobby and landscaped arrival"
          />
          <svg
            className="gala-investment-narrative-hero__image-outline"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M78 0H1000V630L922 700H0V70Z" />
            <path className="gala-investment-narrative-hero__image-accent" d="M790 -16H1018V180" />
            <path className="gala-investment-narrative-hero__image-accent" d="M-16 520V716H220" />
          </svg>
        </figure>
        <div className="gala-investment-narrative-hero__copy">
          <span className="gala-investment-narrative-hero__linework" aria-hidden="true" />
          <div className="gala-kicker">Investment Sales · Office</div>
          <h1 id="office-hero-title">
            <span>Office</span>
          </h1>
          <p>Gala CRE helps owners position office properties around current occupancy, lease rollover, leasing costs, and the building's ability to compete for its next tenant or buyer.</p>
          <a href="#office-consultation" className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-office-positioning"
        aria-labelledby="office-positioning-title"
        data-office-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy" data-office-reveal>
            <div className="gala-kicker gala-kicker--dark">Office Positioning</div>
            <h2 id="office-positioning-title">
              <span>Office Space</span>
              <span>Competes Twice:</span>
              <span>For Tenants</span>
              <span>and for Capital.</span>
            </h2>
            <p>Office buyers look beyond today's occupancy. They test tenant credit, lease term, upcoming expirations, renewal exposure, concessions, tenant improvements, commissions, downtime, and the cost of turning vacant space.</p>
            <p>Gala CRE connects those lease-level exposures to building condition, amenities, parking, access, operating costs, and competitive position so the market can distinguish durable income from work the next owner must still execute.</p>
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-office-positioning__frame"
            data-office-reveal
            style={{ "--office-delay": "90ms" } as React.CSSProperties}
          >
            <img
              src={officeOccupancy}
              alt="Contemporary office interior showing collaborative areas, glass-fronted suites, and active occupancy"
            />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-office-factors"
        aria-labelledby="office-factors-title"
        data-office-section="underwriting-factors"
      >
        <div className="gala-shell">
          <header className="gala-office-factors__head" data-office-reveal>
            <div className="gala-kicker">What Office Buyers Underwrite</div>
            <h2 id="office-factors-title">
              <span>Occupancy</span>{" "}
              <span>Supports Today.</span>{" "}
              <span>Rollover</span>{" "}
              <span>Shapes Tomorrow.</span>
            </h2>
          </header>
          <div className="gala-office-factors__grid">
            {underwritingFactors.map((factor, index) => (
              <article
                className="gala-office-factors__card"
                data-office-reveal
                style={{ "--office-delay": `${index * 85}ms` } as React.CSSProperties}
                key={factor.number}
              >
                <span>{factor.number}</span>
                <h3>{factor.title}</h3>
                <p>{factor.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="gala-office-process"
        aria-labelledby="office-process-title"
        data-office-section="sale-strategy"
      >
        <div className="gala-shell">
          <div className="gala-office-process__panel">
            <header className="gala-office-process__head" data-office-reveal>
              <div className="gala-kicker">Office Sale Strategy</div>
              <h2 id="office-process-title">
                <span>Price the Rollover.</span>
                <span>Position the Building.</span>
              </h2>
              <p>A focused office assignment makes current income, future lease decisions, capital exposure, and building competitiveness understandable before buyers price the unknowns.</p>
            </header>
            <ol className="gala-office-process__steps">
              {saleSteps.map((step, index) => (
                <li
                  data-office-reveal
                  style={{ "--office-delay": `${index * 85}ms` } as React.CSSProperties}
                  key={step.number}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <nav
        className="gala-brokerage-rail gala-office-rail"
        aria-label="Other Investment Sales asset types"
        data-office-section="asset-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>Investment Sales</span>
            <strong>Office</strong>
          </div>
          <div className="gala-brokerage-rail__links">
            <span>Explore</span>
            {siblingAssets.map((asset) => (
              <a href={asset.href} key={asset.href}>
                {asset.label}<ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="gala-investment-narrative-consultation gala-office-consultation"
        id="office-consultation"
        aria-labelledby="office-consultation-title"
        data-office-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-office-reveal>
            <div className="gala-kicker gala-kicker--dark">Office Property Consultation</div>
            <h2 id="office-consultation-title">Start With the Rent Roll and the Next Lease Decision.</h2>
            <p>Share the property, occupancy, lease profile, known capital needs, ownership objective, and timing. A Gala CRE advisor will follow up with the appropriate next step.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Investment Sales and Office are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-office-reveal
            style={{ "--office-delay": "90ms" } as React.CSSProperties}
          >
            <InvestmentSalesInquiryForm
              defaultPropertyType="Office"
              sourcePath="/services/investment-sales/office#office-consultation"
              messageLabel="Tell us about the office property, tenancy, and your objectives"
              successBody="A Gala CRE advisor will review the office property information and follow up directly."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default OfficeInvestmentSalesPage;
