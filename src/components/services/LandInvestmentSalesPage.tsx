import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import landInfrastructure from "@/assets/land-infrastructure-context.webp";
import landHero from "@/assets/land-investment-sales.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import "@/styles/land-investment-sales.css";

const underwritingFactors = [
  {
    number: "01",
    title: "Use + Approval Position",
    body: "Jurisdiction, zoning, adopted plans, entitlements, conditions, and remaining approvals define what is allowed today and what still depends on execution.",
  },
  {
    number: "02",
    title: "Access + Infrastructure",
    body: "Frontage, ingress and egress, utilities, road capacity, stormwater, and off-site obligations shape feasibility, timing, and development cost.",
  },
  {
    number: "03",
    title: "Physical Constraints + Timing",
    body: "Parcel configuration, topography, soils, environmental conditions, wetlands, flood exposure, grading, and holding periods influence the path a buyer can support.",
  },
] as const;

const saleSteps = [
  {
    number: "01",
    title: "Verify",
    body: "Assemble the available parcel, survey, title, zoning, approval, access, utility, environmental, and physical-site record.",
  },
  {
    number: "02",
    title: "Position",
    body: "Separate verified conditions from proposed outcomes, then align the site with the buyers, uses, capital, and timelines suited to the work ahead.",
  },
  {
    number: "03",
    title: "Execute",
    body: "Manage targeted outreach, site access, offer comparison, and diligence around price, contingencies, approval periods, deposits, extensions, and closing certainty.",
  },
] as const;

const siblingAssets = [
  { label: "Industrial", href: "/services/investment-sales/industrial" },
  { label: "Multifamily", href: "/services/investment-sales/multifamily" },
  { label: "Retail", href: "/services/investment-sales/retail" },
  { label: "Office", href: "/services/investment-sales/office" },
] as const;

const EditorialFrameOutline = () => (
  <svg className="gala-investment-narrative-frame__outline" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <path d="M90 0H1000V620L910 700H0V80Z" />
    <path className="gala-investment-narrative-frame__accent" d="M760 -18H1022V210" />
    <path className="gala-investment-narrative-frame__accent" d="M-18 500V718H250" />
  </svg>
);

const LandInvestmentSalesPage = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-land-reveal]"));
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
      className="gala-page gala-cap-page gala-investment-narrative gala-land-page"
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
    >
      <section
        className="gala-investment-narrative-hero gala-land-hero"
        aria-labelledby="land-hero-title"
        data-land-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-land-hero__image">
          <img
            src={landHero}
            alt="Aerial view of a commercial land site with road access and surrounding development"
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
          <div className="gala-kicker">Investment Sales · Land</div>
          <h1 id="land-hero-title">
            <span>Land</span>
          </h1>
          <p>Gala CRE positions commercial land around what a qualified buyer can verify, approve, finance, and execute—not acreage alone.</p>
          <a href="#land-consultation" className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-land-positioning"
        aria-labelledby="land-positioning-title"
        data-land-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy" data-land-reveal>
            <div className="gala-kicker gala-kicker--dark">Land Positioning</div>
            <h2 id="land-positioning-title">
              <span>Acreage Sets</span>
              <span>the Scale.</span>
              <span>Execution Sets</span>
              <span>the Value.</span>
            </h2>
            <p>Land buyers test more than location and acreage. They evaluate parcel configuration, jurisdiction, zoning, adopted plans, approval status, access control, utilities, topography, stormwater, environmental conditions, and off-site obligations.</p>
            <p>Gala CRE organizes the available record and distinguishes verified conditions from proposed outcomes so the market can understand the site today and the work required to advance another use.</p>
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-land-positioning__frame"
            data-land-reveal
            style={{ "--land-delay": "90ms" } as React.CSSProperties}
          >
            <img
              src={landInfrastructure}
              alt="Aerial commercial land site showing roadway frontage, nearby utilities, and surrounding development"
            />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-land-factors"
        aria-labelledby="land-factors-title"
        data-land-section="underwriting-factors"
      >
        <div className="gala-shell">
          <header className="gala-land-factors__head" data-land-reveal>
            <div className="gala-kicker">What Land Buyers Underwrite</div>
            <h2 id="land-factors-title">
              <span>Price the Land.</span>
              <span>Then Price</span>{" "}
              <span>the Work.</span>
            </h2>
          </header>
          <div className="gala-land-factors__grid">
            {underwritingFactors.map((factor, index) => (
              <article
                className="gala-land-factors__card"
                data-land-reveal
                style={{ "--land-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-land-process"
        aria-labelledby="land-process-title"
        data-land-section="sale-strategy"
      >
        <div className="gala-shell">
          <div className="gala-land-process__panel">
            <header className="gala-land-process__head" data-land-reveal>
              <div className="gala-kicker">Land Sale Strategy</div>
              <h2 id="land-process-title">
                <span>Verify the Site.</span>
                <span>Then Market the Path.</span>
              </h2>
              <p>A focused land assignment gives buyers a clear view of the site's current position, credible use paths, unresolved dependencies, and transaction requirements.</p>
            </header>
            <ol className="gala-land-process__steps">
              {saleSteps.map((step, index) => (
                <li
                  data-land-reveal
                  style={{ "--land-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-brokerage-rail gala-land-rail"
        aria-label="Other Investment Sales asset types"
        data-land-section="asset-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>Investment Sales</span>
            <strong>Land</strong>
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
        className="gala-investment-narrative-consultation gala-land-consultation"
        id="land-consultation"
        aria-labelledby="land-consultation-title"
        data-land-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-land-reveal>
            <div className="gala-kicker gala-kicker--dark">Land Opportunity Consultation</div>
            <h2 id="land-consultation-title">Start With the Site as It Exists Today.</h2>
            <p>Share the address, parcel information, current use or approval position, ownership objective, and timing. A Gala CRE advisor will follow up with the appropriate next step.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Investment Sales and Land are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Site information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-land-reveal
            style={{ "--land-delay": "90ms" } as React.CSSProperties}
          >
            <InvestmentSalesInquiryForm
              defaultPropertyType="Land"
              sourcePath="/services/investment-sales/land#land-consultation"
              messageLabel="Tell us about the land, its current position, and your objectives"
              successBody="A Gala CRE advisor will review the land opportunity information and follow up directly."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandInvestmentSalesPage;
