import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import industrialExterior from "@/assets/industrial-investment-sales.webp";
import industrialInterior from "@/assets/industrial-interior-operations.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import "@/styles/industrial-investment-sales.css";

const buyerFactors = [
  {
    number: "01",
    title: "Income + Lease Position",
    body: "Occupancy, lease structure, rollover, expenses, and identified capital needs shape the cash flow and risk a buyer can support.",
  },
  {
    number: "02",
    title: "Functional Utility",
    body: "Clear height, loading, power, circulation, yard depth, access, and configuration influence user fit, releasability, and downtime.",
  },
  {
    number: "03",
    title: "Condition + Optionality",
    body: "Physical condition, environmental records, title matters, expansion, and redevelopment potential separate in-place value from future upside.",
  },
] as const;

const saleSteps = [
  {
    number: "01",
    title: "Position",
    body: "Clarify ownership objectives, verify the operating record, and frame the building around the buyers most likely to value it.",
  },
  {
    number: "02",
    title: "Reach",
    body: "Take a focused story to relevant investors, operators, owner-users, and developers while managing access and feedback consistently.",
  },
  {
    number: "03",
    title: "Execute",
    body: "Compare offers beyond price and coordinate the diligence path with ownership's legal, tax, and technical advisors through closing.",
  },
] as const;

const siblingAssets = [
  { label: "Multifamily", href: "/services/investment-sales/multifamily" },
  { label: "Retail", href: "/services/investment-sales/retail" },
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

const IndustrialInvestmentSalesPage = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-industrial-reveal]"));
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
      className="gala-page gala-cap-page gala-investment-narrative gala-industrial-page"
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
    >
      <section
        className="gala-investment-narrative-hero gala-industrial-hero"
        aria-labelledby="industrial-hero-title"
        data-industrial-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-industrial-hero__image">
          <img
            src={industrialExterior}
            alt="Modern light-industrial distribution property with loading docks and a truck court"
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
          <div className="gala-kicker">Investment Sales · Industrial</div>
          <h1 id="industrial-hero-title">
            <span>Industrial</span>
          </h1>
          <p>Gala CRE helps owners position industrial assets around the income, utility, condition, and execution risks buyers will test.</p>
          <a href="#industrial-consultation" className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-industrial-positioning"
        aria-labelledby="industrial-positioning-title"
        data-industrial-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy" data-industrial-reveal>
            <div className="gala-kicker gala-kicker--dark">Industrial Positioning</div>
            <h2 id="industrial-positioning-title">
              <span>Value Beyond</span>
              <span>Square Footage.</span>
            </h2>
            <p>An industrial sale begins with the operating record, but buyers also price how the building works. Lease position, loading, clear height, power, access, circulation, condition, and future capital all influence conviction.</p>
            <p>Gala CRE organizes those details into a grounded value story that distinguishes verified performance from upside that still depends on diligence, capital, timing, or approvals.</p>
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-industrial-positioning__frame"
            data-industrial-reveal
            style={{ "--industrial-delay": "90ms" } as React.CSSProperties}
          >
            <img
              src={industrialInterior}
              alt="Clear-span industrial interior with loading doors, structural bays, and operational floor space"
            />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-industrial-factors"
        aria-labelledby="industrial-factors-title"
        data-industrial-section="buyer-factors"
      >
        <div className="gala-shell">
          <header className="gala-industrial-factors__head" data-industrial-reveal>
            <div className="gala-kicker">What Buyers Underwrite</div>
            <h2 id="industrial-factors-title">
              <span>The Details</span>{" "}
              <span>That Shape</span>{" "}
              <span>Buyer Conviction.</span>
            </h2>
          </header>
          <div className="gala-industrial-factors__grid">
            {buyerFactors.map((factor, index) => (
              <article
                className="gala-industrial-factors__card"
                data-industrial-reveal
                style={{ "--industrial-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-industrial-process"
        aria-labelledby="industrial-process-title"
        data-industrial-section="sale-strategy"
      >
        <div className="gala-shell">
          <div className="gala-industrial-process__panel">
            <header className="gala-industrial-process__head" data-industrial-reveal>
              <div className="gala-kicker">Industrial Sale Strategy</div>
              <h2 id="industrial-process-title">
                <span>Position the Asset</span>
                <span>Before the Market</span>{" "}
                <span>Prices It.</span>
              </h2>
              <p>A focused assignment connects the seller's objectives, property-level evidence, buyer strategy, and transaction execution.</p>
            </header>
            <ol className="gala-industrial-process__steps">
              {saleSteps.map((step, index) => (
                <li
                  data-industrial-reveal
                  style={{ "--industrial-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-brokerage-rail gala-industrial-rail"
        aria-label="Other Investment Sales asset types"
        data-industrial-section="asset-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>Investment Sales</span>
            <strong>Industrial</strong>
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
        className="gala-investment-narrative-consultation gala-industrial-consultation"
        id="industrial-consultation"
        aria-labelledby="industrial-consultation-title"
        data-industrial-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-industrial-reveal>
            <div className="gala-kicker gala-kicker--dark">Industrial Property Consultation</div>
            <h2 id="industrial-consultation-title">Tell Us About the Asset.</h2>
            <p>Share the property, your objectives, and where you are in the decision process. A Gala CRE advisor will follow up with the appropriate next step.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Investment Sales and Industrial are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-industrial-reveal
            style={{ "--industrial-delay": "90ms" } as React.CSSProperties}
          >
            <InvestmentSalesInquiryForm
              defaultPropertyType="Industrial"
              sourcePath="/services/investment-sales/industrial#industrial-consultation"
              messageLabel="Tell us about the industrial property and your objectives"
              successBody="A Gala CRE advisor will review the industrial property information and follow up directly."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default IndustrialInvestmentSalesPage;
