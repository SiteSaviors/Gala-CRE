import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { type CSSProperties, useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import InvestmentSalesInquiryForm from "@/components/services/InvestmentSalesInquiryForm";
import {
  serviceChapterPages,
  type ServiceChapterPageContent,
} from "@/content/serviceChapterPages";
import "@/styles/service-chapter.css";

type ServiceChapterPageProps = {
  content: ServiceChapterPageContent;
};

type ChapterStyle = CSSProperties & {
  "--chapter-delay"?: string;
  "--chapter-hero-position"?: string;
  "--chapter-hero-position-mobile"?: string;
  "--chapter-positioning-position"?: string;
  "--chapter-positioning-position-mobile"?: string;
};

const HeadlineLines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}{index < lines.length - 1 ? " " : null}
      </span>
    ))}
  </>
);

const HeroFrameOutline = () => (
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
);

const EditorialFrameOutline = () => (
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
);

const ServiceChapterPage = ({ content }: ServiceChapterPageProps) => {
  const pageRef = useRef<HTMLElement>(null);
  const revealAttribute = `data-${content.slug}-reveal`;
  const siblingPages = useMemo(
    () => serviceChapterPages.filter((page) => page.family === content.family && page.path !== content.path),
    [content.family, content.path],
  );

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-chapter-reveal]"));
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
  }, [content.path]);

  const heroStyle = {
    "--chapter-hero-position": content.hero.media.position ?? "center",
    "--chapter-hero-position-mobile": content.hero.mobilePosition ?? content.hero.media.position ?? "center",
  } as ChapterStyle;
  const positioningStyle = {
    "--chapter-positioning-position": content.positioning.media.position ?? "center",
    "--chapter-positioning-position-mobile": content.positioning.mobilePosition ?? content.positioning.media.position ?? "center",
  } as ChapterStyle;
  const consultationId = `${content.slug}-consultation`;
  const inquiryType = content.family === "development" ? "Development Services" : "Capital Markets";

  return (
    <main
      className={`gala-page gala-cap-page gala-investment-narrative gala-service-chapter gala-service-chapter--${content.family} gala-service-chapter--${content.slug}`}
      id="main-content"
      tabIndex={-1}
      ref={pageRef}
      data-service-chapter={content.slug}
      data-reveal-attribute={revealAttribute}
    >
      <section
        className="gala-investment-narrative-hero gala-service-chapter__hero"
        aria-labelledby={`${content.slug}-hero-title`}
        data-chapter-section="hero"
      >
        <figure className="gala-investment-narrative-hero__image gala-service-chapter__hero-image" style={heroStyle}>
          <img src={content.hero.media.src} alt={content.hero.media.alt} loading="eager" decoding="async" />
          <HeroFrameOutline />
        </figure>
        <div className="gala-investment-narrative-hero__copy gala-service-chapter__hero-copy">
          <span className="gala-investment-narrative-hero__linework" aria-hidden="true" />
          <div className="gala-kicker">{content.familyLabel}</div>
          <h1 id={`${content.slug}-hero-title`}>
            <HeadlineLines lines={content.titleLines} />
          </h1>
          <p>{content.hero.lead}</p>
          <a href={`#${consultationId}`} className="gala-investment-narrative-button">
            <span>Request a Consultation</span>
            <i><ArrowUpRight size={17} aria-hidden="true" /></i>
          </a>
        </div>
      </section>

      <section
        className="gala-investment-narrative-value gala-service-chapter__positioning"
        aria-labelledby={`${content.slug}-positioning-title`}
        data-chapter-section="positioning"
      >
        <div className="gala-shell gala-investment-narrative-value__grid">
          <div className="gala-investment-narrative-value__copy gala-service-chapter__positioning-copy" data-chapter-reveal>
            <div className="gala-kicker gala-kicker--dark">{content.positioning.eyebrow}</div>
            <h2 id={`${content.slug}-positioning-title`}>
              <HeadlineLines lines={content.positioning.titleLines} />
            </h2>
            {content.positioning.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure
            className="gala-investment-narrative-frame gala-investment-narrative-frame--right gala-service-chapter__positioning-frame"
            data-chapter-reveal
            style={{ ...positioningStyle, "--chapter-delay": "90ms" } as ChapterStyle}
          >
            <img src={content.positioning.media.src} alt={content.positioning.media.alt} loading="lazy" decoding="async" />
            <EditorialFrameOutline />
          </figure>
        </div>
      </section>

      <section
        className="gala-service-chapter__factors"
        aria-labelledby={`${content.slug}-factors-title`}
        data-chapter-section="decision-factors"
      >
        <div className="gala-shell">
          <header className="gala-service-chapter__factors-head" data-chapter-reveal>
            <div className="gala-kicker">{content.factors.eyebrow}</div>
            <h2 id={`${content.slug}-factors-title`}>
              <HeadlineLines lines={content.factors.titleLines} />
            </h2>
          </header>
          <div className="gala-service-chapter__factors-grid">
            {content.factors.items.map((factor, index) => (
              <article
                className="gala-service-chapter__factor-card"
                data-chapter-reveal
                style={{ "--chapter-delay": `${index * 85}ms` } as ChapterStyle}
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
        className="gala-service-chapter__process"
        aria-labelledby={`${content.slug}-process-title`}
        data-chapter-section="execution-process"
      >
        <div className="gala-shell">
          <div className="gala-service-chapter__process-panel">
            <header className="gala-service-chapter__process-head" data-chapter-reveal>
              <div className="gala-kicker">{content.process.eyebrow}</div>
              <h2 id={`${content.slug}-process-title`}>
                <HeadlineLines lines={content.process.titleLines} />
              </h2>
              <p>{content.process.introduction}</p>
            </header>
            <ol className="gala-service-chapter__process-steps">
              {content.process.steps.map((step, index) => (
                <li
                  data-chapter-reveal
                  style={{ "--chapter-delay": `${index * 85}ms` } as ChapterStyle}
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
        className="gala-brokerage-rail gala-service-chapter__rail"
        aria-label={`Other ${content.familyLabel} services`}
        data-chapter-section="sibling-rail"
      >
        <div className="gala-shell gala-brokerage-rail__inner">
          <div className="gala-brokerage-rail__audience">
            <span>{content.familyLabel}</span>
            <strong aria-current="page">{content.title}</strong>
          </div>
          <div className="gala-brokerage-rail__links">
            <span>Explore</span>
            {siblingPages.map((sibling) => (
              <Link to={sibling.path} key={sibling.path}>
                {sibling.title}<ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="gala-investment-narrative-consultation gala-service-chapter__consultation"
        id={consultationId}
        aria-labelledby={`${content.slug}-consultation-title`}
        data-chapter-section="consultation"
      >
        <div className="gala-shell gala-investment-narrative-consultation__grid">
          <div className="gala-investment-narrative-consultation__copy" data-chapter-reveal>
            <div className="gala-kicker gala-kicker--dark">{content.consultation.eyebrow}</div>
            <h2 id={`${content.slug}-consultation-title`}>
              <HeadlineLines lines={content.consultation.titleLines} />
            </h2>
            <p>{content.consultation.body}</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> {content.familyLabel} and {content.title} are selected automatically</li>
              <li><CheckCircle2 aria-hidden="true" /> Opportunity information is reviewed privately</li>
              <li><CheckCircle2 aria-hidden="true" /> No obligation to advance an engagement</li>
            </ul>
          </div>
          <div
            className="gala-investment-narrative-consultation__form"
            data-chapter-reveal
            style={{ "--chapter-delay": "90ms" } as ChapterStyle}
          >
            <InvestmentSalesInquiryForm
              inquiryType={inquiryType}
              serviceFocus={content.title}
              sourcePath={`${content.path}#${consultationId}`}
              messageLabel={content.consultation.messageLabel}
              successBody={content.consultation.successBody}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceChapterPage;
