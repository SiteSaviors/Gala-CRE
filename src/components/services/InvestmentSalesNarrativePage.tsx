import {
  ArrowUpRight,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  Factory,
  MapPinned,
  Store,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import diligenceImage from "@/assets/transaction-control-context.webp";
import heroImage from "@/assets/investment-sales-blue-booklet.webp";
import outreachImage from "@/assets/investment-sales-buyer-outreach.webp";
import positioningImage from "@/assets/investment-sales-operating-story.webp";
import valuationImage from "@/assets/brokerage-hero.avif";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import type { Service } from "@/content/services";

type InvestmentSalesNarrativePageProps = {
  service: Service;
};

const investmentAssetTypes = [
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "multifamily", label: "Multifamily", icon: Building },
  { id: "retail", label: "Retail", icon: Store },
  { id: "office", label: "Office", icon: Building2 },
  { id: "land", label: "Land", icon: MapPinned },
] as const;

const faqs = [
  {
    question: "Can a sale process remain confidential?",
    answer: "Yes. The launch and outreach plan can be structured around the level of confidentiality the owner requires. Gala CRE can help define how information is shared, which buyers are contacted, and when deeper property materials become available.",
  },
  {
    question: "How can Gala help when a 1031 exchange is involved?",
    answer: "Gala CRE can coordinate property search and transaction timing around the exchange milestones provided by the client and their advisors. Tax, legal, and qualified-intermediary guidance should remain with the appropriate specialists.",
  },
  {
    question: "What determines a commercial property's value before listing?",
    answer: "Income, tenancy, lease terms, operating history, property condition, location, comparable activity, capital requirements, and current buyer expectations all influence value. The relevant factors depend on the asset and the owner's objective.",
  },
  {
    question: "What information will buyers expect during diligence?",
    answer: "The request varies by asset, but buyers commonly evaluate leases, income and expense records, operating history, title and survey materials, property condition, environmental information, and other documents relevant to the transaction.",
  },
] as const;

const confidencePanels = [
  {
    number: "01",
    title: "Make Diligence More Predictable",
    titleLines: null,
    body: "Organize the leases, income, expenses, occupancy, property condition, capital history, and open questions buyers will use to test the opportunity.",
    image: diligenceImage,
    imageAlt: "Commercial real estate transaction documents organized for review",
  },
  {
    number: "02",
    title: "Tell the Operating Story Clearly",
    titleLines: ["Tell the Operating", "Story Clearly"],
    body: "Translate performance, risk, and credible upside into decision-ready context without overstating what the property can support.",
    image: positioningImage,
    imageAlt: "Commercial real estate advisor walking buyers through a property",
  },
  {
    number: "03",
    title: "Target the Right Buyers",
    titleLines: null,
    body: "We reach qualified local buyers aligned with your commercial property investment goals, including institutional players when the deal supports it.",
    image: outreachImage,
    imageAlt: "Commercial property owners meeting with a real estate advisor",
  },
] as const;

const InvestmentSalesNarrativePage = ({ service }: InvestmentSalesNarrativePageProps) => {
  const pageRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-investment-narrative-reveal]"));

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageMeta title={service.name} description={service.summary} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/services/investment-sales" />
      <main className="gala-page gala-investment-narrative" id="main-content" tabIndex={-1} ref={pageRef}>
        <section className="gala-investment-narrative-hero" aria-labelledby="investment-narrative-title">
          <div className="gala-investment-narrative-hero__image">
            <img src={heroImage} alt="Gala CRE Group Investment Sales presentation booklets" />
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
          </div>
          <div className="gala-investment-narrative-hero__copy">
            <span className="gala-investment-narrative-hero__linework" aria-hidden="true"></span>
            <div className="gala-kicker">Private Capital + Commercial Assets</div>
            <h1 id="investment-narrative-title">Investment Sales</h1>
            <p>Gala CRE Group helps owners navigate the details that shape price, terms, and closing confidence.</p>
            <a href="#investment-sales-consultation" className="gala-investment-narrative-button">
              <span>Request a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
            </a>
          </div>
        </section>

        <section className="gala-brokerage-coverage gala-investment-narrative-assets" aria-labelledby="investment-asset-types-title">
          <div className="gala-shell gala-brokerage-coverage__inner">
            <h2 id="investment-asset-types-title" className="gala-investment-narrative-assets__title" data-investment-narrative-reveal>
              Asset Types
            </h2>
            <div className="gala-brokerage-coverage__grid gala-investment-narrative-assets__grid" data-investment-narrative-reveal>
              {investmentAssetTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="gala-brokerage-coverage__item" id={item.id} key={item.id}>
                    <Icon size={48} strokeWidth={1.25} aria-hidden="true" />
                    <span>{item.label}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-investment-narrative-value" aria-labelledby="investment-value-title">
          <div className="gala-shell gala-investment-narrative-value__grid">
            <div className="gala-investment-narrative-value__copy" data-investment-narrative-reveal>
              <div className="gala-kicker gala-kicker--dark">Opinion of Value</div>
              <h2 id="investment-value-title">Start With an Opinion of Value</h2>
              <p>Gala CRE starts commercial investment sales with an opinion of value that calls out what’s driving demand, what’s creating drag, and what buyers will test in diligence. For owners weighing timing, that clarity helps set a path that fits the business plan, including tax considerations.</p>
            </div>
            <figure className="gala-investment-narrative-frame gala-investment-narrative-frame--right" data-investment-narrative-reveal>
              <img src={valuationImage} alt="Gala CRE advisor discussing a commercial investment strategy" />
              <svg
                className="gala-investment-narrative-frame__outline"
                viewBox="0 0 1000 700"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M90 0H1000V620L910 700H0V80Z" />
                <path className="gala-investment-narrative-frame__accent" d="M760 -18H1022V210" />
                <path className="gala-investment-narrative-frame__accent" d="M-18 500V718H250" />
              </svg>
            </figure>
          </div>
        </section>

        <section className="gala-investment-narrative-pricing" aria-label="Pricing consultation">
          <div className="gala-shell">
            <div className="gala-investment-narrative-pricing__panel" data-investment-narrative-reveal>
              <div>
                <div className="gala-kicker">Sale Strategy</div>
                <h2>Build the pricing and launch plan before going to market.</h2>
                <p>Focused positioning, grounded underwriting, and a defined buyer audience create a cleaner path from initial valuation through closing.</p>
              </div>
              <a href="#investment-sales-consultation" className="gala-investment-narrative-button gala-investment-narrative-button--light">
                <span>Schedule a Consultation</span><i><ArrowUpRight size={17} aria-hidden="true" /></i>
              </a>
            </div>
          </div>
        </section>

        <section className="gala-investment-narrative-confidence" aria-labelledby="investment-confidence-title">
          <div className="gala-shell">
            <div className="gala-investment-narrative-confidence__head" data-investment-narrative-reveal>
              <h2 id="investment-confidence-title">
                <span>Preparation and Outreach</span>
                <span>That Build Buyer Confidence</span>
              </h2>
            </div>
            <div className="gala-investment-narrative-confidence__grid">
              {confidencePanels.map(({ number, title, titleLines, body, image, imageAlt }, index) => (
                <article
                  className="gala-investment-narrative-confidence__panel"
                  data-investment-narrative-reveal
                  style={{ "--gala-investment-delay": `${index * 90}ms` } as React.CSSProperties}
                  key={title}
                >
                  <img src={image} alt={imageAlt} />
                  <span className="gala-investment-narrative-confidence__number">{number}</span>
                  <h3 className={titleLines ? "is-line-locked" : undefined}>
                    {titleLines ? <><span>{titleLines[0]}</span>{" "}<span>{titleLines[1]}</span></> : title}
                  </h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gala-investment-narrative-faq" aria-labelledby="investment-faq-title">
          <div className="gala-shell gala-investment-narrative-faq__inner">
            <header data-investment-narrative-reveal>
              <div className="gala-kicker gala-kicker--dark">Investment Sales FAQs</div>
              <h2 id="investment-faq-title">What owners ask before going to market.</h2>
            </header>
            <div className="gala-investment-narrative-faq__items" data-investment-narrative-reveal>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const answerId = `investment-sales-faq-${index}`;
                return (
                  <div className={`gala-investment-narrative-faq__item${isOpen ? " is-open" : ""}`} key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span><ChevronDown aria-hidden="true" />
                    </button>
                    <div id={answerId} className="gala-investment-narrative-faq__answer" hidden={!isOpen}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gala-investment-narrative-consultation" id="investment-sales-consultation" aria-labelledby="investment-consultation-title">
          <div className="gala-shell gala-investment-narrative-consultation__grid">
            <div className="gala-investment-narrative-consultation__copy" data-investment-narrative-reveal>
              <div className="gala-kicker gala-kicker--dark">Property Consultation</div>
              <h2 id="investment-consultation-title">Tell us about your property.</h2>
              <p>Share the property type, your objectives, and where you are in the decision process. A Gala CRE advisor will follow up with the appropriate next step.</p>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /> Investment Sales is selected automatically</li>
                <li><CheckCircle2 aria-hidden="true" /> Property information is reviewed privately</li>
                <li><CheckCircle2 aria-hidden="true" /> No obligation to take the property to market</li>
              </ul>
            </div>
            <div className="gala-investment-narrative-consultation__form" data-investment-narrative-reveal>
              <InvestmentSalesInquiryForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/services/investment-sales" />
    </>
  );
};

export default InvestmentSalesNarrativePage;
