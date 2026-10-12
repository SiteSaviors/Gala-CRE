import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import multifamilyHero from "@/assets/multifamily-investment-sales.webp";
import multifamilyOperations from "@/assets/multifamily-operations-context.webp";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import "@/styles/multifamily-investment-sales.css";

const underwritingFactors = [
  {
    number: "01",
    title: "Revenue + Rent Roll",
    body: "Occupancy, collections, concessions, lease expirations, other income, and loss-to-lease establish the revenue buyers can verify.",
  },
  {
    number: "02",
    title: "Expenses + Capital",
    body: "Operating expenses, unit turns, building systems, deferred maintenance, and capital history shape reserves and the cost of maintaining performance.",
  },
  {
    number: "03",
    title: "Execution + Upside",
    body: "Renovation, lease-up, market-rent, and management opportunities carry different timelines, capital needs, disruption, and diligence risk.",
  },
] as const;

const saleSteps = [
  {
    number: "01",
    title: "Reconcile",
    body: "Bring the rent roll, operating statements, occupancy, collections, capital history, and available property records into one supportable baseline.",
  },
  {
    number: "02",
    title: "Position",
    body: "Frame current performance, market context, physical condition, and credible upside for the buyers most likely to value the opportunity.",
  },
  {
    number: "03",
    title: "Execute",
    body: "Manage targeted outreach, resident-sensitive access, offer comparison, and diligence with ownership's specialist advisors through closing.",
  },
] as const;

const siblingAssets = [
  { label: "Industrial", href: "/services/investment-sales/industrial" },
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

const MultifamilyInvestmentSalesPage = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-multifamily-reveal]"));
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
      className="gala-page gala-cap-page gala-investment-narrative gala-multifamily-page"
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
    >
      <section
        className="gala-investment-narrative-hero gala-multifamily-hero"
        aria-labelledby="multifamily-hero-title"
        data-multifamily-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-multifamily-hero__image">
          <img
            src={multifamilyHero}
            alt="Contemporary multifamily community with apartment buildings and a landscaped courtyard"
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
          <div className="gala-kicker">Investment Sales · Multifamily</div>
          <h1 id="multifamily-hero-title">
            <span>Multifamily</span>
          </h1>
          <p>Gala CRE helps owners position multifamily assets around the operating performance, physical condition, and execution path buyers will underwrite.</p>
          <a href="#multifamily-consultation" className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-multifamily-positioning"
        aria-labelledby="multifamily-positioning-title"
        data-multifamily-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy" data-multifamily-reveal>
            <div className="gala-kicker gala-kicker--dark">Multifamily Positioning</div>
            <h2 id="multifamily-positioning-title">
              <span>The Rent Roll</span>
              <span>Sets the Baseline.</span>
              <span>Operations</span>
              <span>Define the Value.</span>
            </h2>
            <p>A multifamily sale starts with the rent roll, but buyers test the income behind it. Occupancy, collections, concessions, lease expirations, expenses, property condition, and capital history determine how durable today’s performance appears.</p>
            <p>Gala CRE organizes those facts into a clear sale position that separates verified results from renovation, lease-up, rent-growth, or expense assumptions that still require time and capital.</p>
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-multifamily-positioning__frame"
            data-multifamily-reveal
            style={{ "--multifamily-delay": "90ms" } as React.CSSProperties}
          >
            <img
              src={multifamilyOperations}
              alt="Multifamily advisor reviewing a landscaped apartment community and its building condition"
            />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-multifamily-factors"
        aria-labelledby="multifamily-factors-title"
        data-multifamily-section="underwriting-factors"
      >
        <div className="gala-shell">
          <header className="gala-multifamily-factors__head" data-multifamily-reveal>
            <div className="gala-kicker">What Multifamily Buyers Underwrite</div>
            <h2 id="multifamily-factors-title">
              <span>The Evidence</span>{" "}
              <span>Behind the</span>{" "}
              <span>Income.</span>
            </h2>
          </header>
          <div className="gala-multifamily-factors__grid">
            {underwritingFactors.map((factor, index) => (
              <article
                className="gala-multifamily-factors__card"
                data-multifamily-reveal
                style={{ "--multifamily-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-multifamily-process"
        aria-labelledby="multifamily-process-title"
        data-multifamily-section="sale-strategy"
      >
        <div className="gala-shell">
          <div className="gala-multifamily-process__panel">
            <header className="gala-multifamily-process__head" data-multifamily-reveal>
              <div className="gala-kicker">Multifamily Sale Strategy</div>
              <h2 id="multifamily-process-title">
                <span>Prepare the</span>{" "}
                <span>Property</span>{" "}
                <span>Before Buyers</span>{" "}
                <span>Set the Story.</span>
              </h2>
              <p>A focused assignment connects ownership’s objectives, operating evidence, buyer positioning, resident-sensitive access, and transaction execution.</p>
            </header>
            <ol className="gala-multifamily-process__steps">
              {saleSteps.map((step, index) => (
                <li
                  data-multifamily-reveal
                  style={{ "--multifamily-delay": `${index * 85}ms` } as React.CSSProperties}
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
        className="gala-brokerage-rail gala-multifamily-rail"
        aria-label="Other Investment Sales asset types"
        data-multifamily-section="asset-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>Investment Sales</span>
            <strong>Multifamily</strong>
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
        className="gala-investment-narrative-consultation gala-multifamily-consultation"
        id="multifamily-consultation"
        aria-labelledby="multifamily-consultation-title"
        data-multifamily-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-multifamily-reveal>
            <div className="gala-kicker gala-kicker--dark">Multifamily Property Consultation</div>
            <h2 id="multifamily-consultation-title">Tell Us About the Property.</h2>
            <p>Share the asset, current occupancy, operating history, ownership objective, and timing. A Gala CRE advisor will follow up with the appropriate next step.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Investment Sales and Multifamily are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-multifamily-reveal
            style={{ "--multifamily-delay": "90ms" } as React.CSSProperties}
          >
            <InvestmentSalesInquiryForm
              defaultPropertyType="Multifamily"
              sourcePath="/services/investment-sales/multifamily#multifamily-consultation"
              messageLabel="Tell us about the multifamily property and your objectives"
              successBody="A Gala CRE advisor will review the multifamily property information and follow up directly."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MultifamilyInvestmentSalesPage;
