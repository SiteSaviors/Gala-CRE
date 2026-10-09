import {
  ArrowUpRight,
  BarChart3,
  Building2,
  FileCheck2,
  Megaphone,
  Target,
  UsersRound,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type {
  CapabilityPageContent,
  CapabilityPageIcon,
  CapabilityPageSection,
} from "@/content/capabilityPages";
import "@/styles/investment-sales-capability.css";

type StrategySection = Extract<CapabilityPageSection, { type: "strategy" }>;
type ProcessSection = Extract<CapabilityPageSection, { type: "process" }>;
type DeliverablesSection = Extract<CapabilityPageSection, { type: "deliverables" }>;

const scopeIcons: Record<CapabilityPageIcon, typeof Building2> = {
  positioning: Target,
  marketing: Megaphone,
  prospects: UsersRound,
  tours: Building2,
  economics: BarChart3,
  execution: FileCheck2,
};

const revealStyle = (index: number) => ({ "--gala-reveal-index": index } as CSSProperties);

const InvestmentRelatedRail = ({
  content,
  headingId,
}: {
  content: CapabilityPageContent["relatedCapabilities"];
  headingId: string;
}) => (
  <section className="gala-is-related" data-capability-related aria-labelledby={headingId}>
    <div className="gala-shell">
      <div className="gala-is-related__header" data-capability-reveal>
        <div>
          <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">{content.eyebrow}</div>
          <h2 id={headingId}>{content.headline}</h2>
        </div>
        <p>{content.introduction}</p>
      </div>
      <nav className="gala-is-related__links" aria-label="Related capabilities">
        {content.links.map((link, index) => (
          <Link
            to={link.href}
            data-capability-reveal
            style={revealStyle(index)}
            key={`${link.title}-${link.href}`}
          >
            <small>{link.label}</small>
            <strong>{link.title}</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </div>
  </section>
);

const InvestmentSalesCapabilitySections = ({ content }: { content: CapabilityPageContent }) => {
  const template = content.template?.kind === "investment-sales" ? content.template : null;
  const positioning = content.sections.find((section): section is StrategySection => section.type === "strategy");
  const process = content.sections.find((section): section is ProcessSection => section.type === "process");
  const scope = content.sections.find((section): section is DeliverablesSection => section.type === "deliverables");

  if (!template || !positioning || !process || !scope) return null;

  const idPrefix = content.path.split("/").filter(Boolean).at(-1) ?? "investment-sales";
  const headingIds = {
    positioning: `${idPrefix}-asset-positioning-title`,
    buyers: `${idPrefix}-buyer-profile-title`,
    valuation: `${idPrefix}-valuation-considerations-title`,
    process: `${idPrefix}-sale-process-title`,
    scope: `${idPrefix}-assignment-scope-title`,
    related: `${idPrefix}-related-title`,
  };

  return (
    <>
      <section
        className="gala-is-positioning"
        id="asset-positioning"
        data-capability-section="asset-positioning"
        aria-labelledby={headingIds.positioning}
      >
        <div className="gala-shell gala-is-positioning__grid">
          <div className="gala-is-positioning__copy" data-capability-reveal>
            <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">Asset Positioning</div>
            <h2 id={headingIds.positioning}>{positioning.headline}</h2>
            <p>{positioning.introduction}</p>
            <span className="gala-is-positioning__note">{positioning.eyebrow}</span>
          </div>
          <figure className="gala-is-positioning__media" data-capability-reveal style={revealStyle(1)}>
            <img
              src={positioning.media.src}
              alt={positioning.media.alt}
              style={positioning.media.position ? { objectPosition: positioning.media.position } : undefined}
            />
            <span aria-hidden="true"></span>
          </figure>
        </div>
      </section>

      <section
        className="gala-is-buyers"
        id="buyer-profile"
        data-capability-section="buyer-profile"
        aria-labelledby={headingIds.buyers}
      >
        <div className="gala-shell">
          <div className="gala-is-buyers__header">
            <div data-capability-reveal>
              <div className="gala-cap-eyebrow">{template.buyerProfile.eyebrow}</div>
              <h2 id={headingIds.buyers}>{template.buyerProfile.headline}</h2>
            </div>
            <p data-capability-reveal style={revealStyle(1)}>{template.buyerProfile.introduction}</p>
          </div>
          <div className="gala-is-buyers__grid">
            {template.buyerProfile.groups.map((group, index) => (
              <article data-capability-reveal style={revealStyle(index)} key={group.title}>
                <div className="gala-is-buyers__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{group.label}</small>
                </div>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="gala-is-valuation"
        id="valuation-considerations"
        data-capability-section="valuation-considerations"
        aria-labelledby={headingIds.valuation}
      >
        <div className="gala-shell">
          <div className="gala-is-valuation__header">
            <div data-capability-reveal>
              <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">{template.valuation.eyebrow}</div>
              <h2 id={headingIds.valuation}>{template.valuation.headline}</h2>
            </div>
            <p data-capability-reveal style={revealStyle(1)}>{template.valuation.introduction}</p>
          </div>
          <div className="gala-is-valuation__ledger">
            {positioning.tracks.map((track, index) => (
              <article data-capability-reveal style={revealStyle(index)} key={track.number}>
                <span className="gala-is-valuation__number" aria-hidden="true">{track.number}</span>
                <small>{track.label}</small>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="gala-is-execution"
        id={process.id ?? "sale-process"}
        data-capability-section="sale-process"
        aria-labelledby={headingIds.process}
      >
        <div className="gala-shell">
          <div className="gala-is-execution__header">
            <div data-capability-reveal>
              <div className="gala-cap-eyebrow">{process.eyebrow}</div>
              <h2 id={headingIds.process}>{process.headline}</h2>
            </div>
            <p data-capability-reveal style={revealStyle(1)}>{process.introduction}</p>
          </div>
          <div className="gala-is-execution__steps">
            {process.steps.map((step, index) => (
              <article data-capability-reveal style={revealStyle(index)} key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <section className="gala-is-execution__scope" aria-labelledby={headingIds.scope}>
            <div className="gala-is-execution__scope-intro" data-capability-reveal>
              <small>{scope.eyebrow}</small>
              <h2 id={headingIds.scope}>{scope.headline}</h2>
              <p>{scope.introduction}</p>
            </div>
            <div className="gala-is-execution__scope-grid">
              {scope.items.map((item, index) => {
                const Icon = scopeIcons[item.icon];
                return (
                  <article data-capability-reveal style={revealStyle(index)} key={item.title}>
                    <Icon aria-hidden="true" />
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <InvestmentRelatedRail content={content.relatedCapabilities} headingId={headingIds.related} />
    </>
  );
};

export default InvestmentSalesCapabilitySections;
