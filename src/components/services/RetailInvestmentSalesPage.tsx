import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import retailHero from "@/assets/retail-investment-sales.webp";
import retailAccess from "@/assets/retail-access-context.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import "@/styles/retail-investment-sales.css";

const underwritingFactors = [
  {
    number: "01",
    title: "Tenant + Lease Exposure",
    body: "Rent, reimbursements, term, options, guarantees, use restrictions, co-tenancy, and rollover define the income and risk a buyer can support.",
  },
  {
    number: "02",
    title: "Access + Site Utility",
    body: "Visibility, ingress and egress, parking, circulation, signage, trade-area position, and configuration shape daily performance and releasability.",
  },
  {
    number: "03",
    title: "Rollover + Reuse",
    body: "Lease expirations, capital needs, adaptability, restrictions, and redevelopment potential determine whether value depends on holding, re-leasing, or a different use.",
  },
] as const;

const saleSteps = [
  {
    number: "01",
    title: "Read",
    body: "Bring the leases, amendments, options, reimbursements, restrictions, operating history, site information, and known diligence items into one supportable record.",
  },
  {
    number: "02",
    title: "Position",
    body: "Separate in-place income from rollover, re-leasing, and site upside, then frame the property for the buyers most likely to value that path.",
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
  { label: "Office", href: "/services/investment-sales/office" },
  { label: "Land", href: "/services/investment-sales/land" },
] as const;

const EditorialFrameOutline = () => (
  <svg className="gala-investment-narrative-frame__outline" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <path d="M90 0H1000V620L910 700H0V80Z" />
    <path className="gala-investment-narrative-frame__accent" d="M760 -18H1022V210" />
    <path className="gala-investment-narrative-frame__accent" d="M-18 500V718H250" />
  </svg>
);

const RetailInvestmentSalesPage = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-retail-reveal]"));
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
      className="gala-page gala-cap-page gala-investment-narrative gala-retail-page"
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
    >
      <section
        className="gala-investment-narrative-hero gala-retail-hero"
        aria-labelledby="retail-hero-title"
        data-retail-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-retail-hero__image">
          <img
            src={retailHero}
            alt="Contemporary neighborhood retail center with storefronts, parking, and landscaped access"
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
          <div className="gala-kicker">Investment Sales · Retail</div>
          <h1 id="retail-hero-title">
            <span>Retail</span>
          </h1>
          <p>Gala CRE helps owners position retail assets around the lease economics, customer access, site utility, and value path buyers will underwrite.</p>
          <a href="#retail-consultation" className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-retail-positioning"
        aria-labelledby="retail-positioning-title"
        data-retail-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy" data-retail-reveal>
            <div className="gala-kicker gala-kicker--dark">Retail Positioning</div>
            <h2 id="retail-positioning-title">
              <span>Retail Value Lives</span>
              <span>Where the Lease</span>
              <span>Meets the Site.</span>
            </h2>
            <p>A retail sale is not only a rent stream. Buyers test tenant credit, lease structure, rollover, reimbursements, options, restrictions, and guarantees alongside visibility, access, parking, circulation, signage, and trade-area position.</p>
            <p>Gala CRE connects the income and the real estate so the market can distinguish durable in-place performance from re-leasing, capital, repositioning, or redevelopment assumptions that still require execution.</p>
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-retail-positioning__frame"
            data-retail-reveal
            style={{ "--retail-delay": "90ms" } as React.CSSProperties}
          >
            <img
              src={retailAccess}
              alt="Active neighborhood retail center showing storefronts, customer access, and parking circulation"
            />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-retail-factors"
        aria-labelledby="retail-factors-title"
        data-retail-section="underwriting-factors"
      >
        <div className="gala-shell">
          <header className="gala-retail-factors__head" data-retail-reveal>
            <div className="gala-kicker">What Retail Buyers Underwrite</div>
            <h2 id="retail-factors-title">
              <span>The Lease Defines</span>{" "}
              <span>the Income.</span>{" "}
              <span>The Site Defines</span>{" "}
              <span>the Options.</span>
            </h2>
          </header>
          <div className="gala-retail-factors__grid">
            {underwritingFactors.map((factor, index) => (
              <article
                className="gala-retail-factors__card"
                data-retail-reveal
                style={{ "--retail-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-retail-process"
        aria-labelledby="retail-process-title"
        data-retail-section="sale-strategy"
      >
        <div className="gala-shell">
          <div className="gala-retail-process__panel">
            <header className="gala-retail-process__head" data-retail-reveal>
              <div className="gala-kicker">Retail Sale Strategy</div>
              <h2 id="retail-process-title">
                <span>Read the Leases.</span>
                <span>Then Price the</span>{" "}
                <span>Real Estate.</span>
              </h2>
              <p>A focused retail assignment connects lease-level evidence, site performance, buyer strategy, operating continuity, and transaction execution.</p>
            </header>
            <ol className="gala-retail-process__steps">
              {saleSteps.map((step, index) => (
                <li
                  data-retail-reveal
                  style={{ "--retail-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-brokerage-rail gala-retail-rail"
        aria-label="Other Investment Sales asset types"
        data-retail-section="asset-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>Investment Sales</span>
            <strong>Retail</strong>
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
        className="gala-investment-narrative-consultation gala-retail-consultation"
        id="retail-consultation"
        aria-labelledby="retail-consultation-title"
        data-retail-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-retail-reveal>
            <div className="gala-kicker gala-kicker--dark">Retail Property Consultation</div>
            <h2 id="retail-consultation-title">Start With the Lease and the Site.</h2>
            <p>Share the property, tenancy, lease position, ownership objective, and timing. A Gala CRE advisor will follow up with the appropriate next step.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Investment Sales and Retail are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-retail-reveal
            style={{ "--retail-delay": "90ms" } as React.CSSProperties}
          >
            <InvestmentSalesInquiryForm
              defaultPropertyType="Retail"
              sourcePath="/services/investment-sales/retail#retail-consultation"
              messageLabel="Tell us about the retail property, tenancy, and your objectives"
              successBody="A Gala CRE advisor will review the retail property information and follow up directly."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default RetailInvestmentSalesPage;
