import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  FileCheck2,
  Megaphone,
  Target,
  UsersRound,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { CapabilityActionLink } from "@/components/site/CapabilityPageHero";
import type {
  CapabilityPageContent,
  CapabilityPageIcon,
  CapabilityPageSection,
} from "@/content/capabilityPages";

const deliverableIcons: Record<CapabilityPageIcon, typeof Building2> = {
  positioning: Target,
  marketing: Megaphone,
  prospects: UsersRound,
  tours: Building2,
  economics: BarChart3,
  execution: FileCheck2,
};

const revealStyle = (index: number) => ({ "--gala-reveal-index": index } as CSSProperties);

const ChallengeSection = ({ section }: { section: Extract<CapabilityPageSection, { type: "challenge" }> }) => (
  <section
    className="gala-cap-section gala-cap-challenge"
    id={section.id}
    data-watermark={section.watermark}
  >
    <div className="gala-shell">
      <div className="gala-cap-challenge__intro">
        <div data-capability-reveal>
          <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">{section.eyebrow}</div>
          <h2>{section.headline}</h2>
        </div>
        <div className="gala-cap-challenge__copy" data-capability-reveal style={revealStyle(1)}>
          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote>{section.emphasis}</blockquote>
        </div>
      </div>
      <div className="gala-cap-challenge__pressures">
        {section.pressures.map((pressure, index) => (
          <article data-capability-reveal style={revealStyle(index)} key={pressure.number}>
            <span>{pressure.number}</span>
            <h3>{pressure.title}</h3>
            <p>{pressure.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = ({ section }: { section: Extract<CapabilityPageSection, { type: "process" }> }) => (
  <section className="gala-cap-section gala-cap-process" id={section.id}>
    <div className="gala-shell">
      <div className="gala-cap-process__header">
        <div data-capability-reveal>
          <div className="gala-cap-eyebrow">{section.eyebrow}</div>
          <h2>{section.headline}</h2>
        </div>
        <p data-capability-reveal style={revealStyle(1)}>{section.introduction}</p>
      </div>
      <div className="gala-cap-process__steps">
        {section.steps.map((step, index) => (
          <article data-capability-reveal style={revealStyle(index)} key={step.number}>
            <span className="gala-cap-process__number">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const DeliverablesSection = ({ section }: { section: Extract<CapabilityPageSection, { type: "deliverables" }> }) => (
  <section className="gala-cap-section gala-cap-deliverables" id={section.id}>
    <div className="gala-shell gala-cap-deliverables__layout">
      <div className="gala-cap-deliverables__heading" data-capability-reveal>
        <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">{section.eyebrow}</div>
        <h2>{section.headline}</h2>
        <p>{section.introduction}</p>
      </div>
      <div className="gala-cap-deliverables__list">
        {section.items.map((item, index) => {
          const Icon = deliverableIcons[item.icon];
          return (
            <article data-capability-reveal style={revealStyle(index)} key={item.title}>
              <Icon aria-hidden="true" />
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const StrategySection = ({ section }: { section: Extract<CapabilityPageSection, { type: "strategy" }> }) => (
  <section className="gala-cap-section gala-cap-strategy" id={section.id}>
    <div className="gala-cap-strategy__media" data-capability-reveal>
      <img
        src={section.media.src}
        alt={section.media.alt}
        style={section.media.position ? { objectPosition: section.media.position } : undefined}
      />
      <span aria-hidden="true"></span>
    </div>
    <div className="gala-cap-strategy__content">
      <div className="gala-cap-eyebrow">{section.eyebrow}</div>
      <h2 data-capability-reveal>{section.headline}</h2>
      <p className="gala-cap-strategy__intro" data-capability-reveal style={revealStyle(1)}>{section.introduction}</p>
      <div className="gala-cap-strategy__tracks">
        {section.tracks.map((track, index) => (
          <article data-capability-reveal style={revealStyle(index)} key={track.number}>
            <div className="gala-cap-strategy__track-head"><span>{track.number}</span><small>{track.label}</small></div>
            <h3>{track.title}</h3>
            <p>{track.body}</p>
            {track.points.length > 0 && (
              <ul>{track.points.map((point) => <li key={point}><Check size={14} aria-hidden="true" />{point}</li>)}</ul>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);

const RationaleSection = ({ section }: { section: Extract<CapabilityPageSection, { type: "rationale" }> }) => (
  <section className="gala-cap-section gala-cap-representation" id={section.id}>
    <div className="gala-shell">
      <div className="gala-cap-representation__statement" data-capability-reveal>
        <div className="gala-cap-eyebrow gala-cap-eyebrow--dark">{section.eyebrow}</div>
        <h2>{section.headline}</h2>
        <p>{section.body}</p>
      </div>
      <div className="gala-cap-representation__reasons">
        {section.reasons.map((reason, index) => (
          <article data-capability-reveal style={revealStyle(index)} key={reason.title}>
            <span>{String(index + 1).padStart(2, "0")}</span><h3>{reason.title}</h3><p>{reason.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const CapabilitySectionRenderer = ({ section }: { section: CapabilityPageSection }) => {
  switch (section.type) {
    case "challenge": return <ChallengeSection section={section} />;
    case "process": return <ProcessSection section={section} />;
    case "deliverables": return <DeliverablesSection section={section} />;
    case "strategy": return <StrategySection section={section} />;
    case "rationale": return <RationaleSection section={section} />;
  }
};

export const RelatedCapabilityNavigation = ({ content }: { content: CapabilityPageContent["relatedCapabilities"] }) => (
  <section className="gala-cap-section gala-cap-connected">
    <div className="gala-shell">
      <div className="gala-cap-connected__header">
        <div data-capability-reveal>
          <div className="gala-cap-eyebrow">{content.eyebrow}</div>
          <h2>{content.headline}</h2>
        </div>
        <p data-capability-reveal style={revealStyle(1)}>{content.introduction}</p>
      </div>
      <div className="gala-cap-connected__links">
        {content.links.map((link, index) => (
          <Link to={link.href} data-capability-reveal style={revealStyle(index)} key={`${link.title}-${link.href}`}>
            <small>{link.label}</small>
            <h3>{link.title}</h3>
            <p>{link.body}</p>
            <span>Explore <ArrowUpRight size={16} aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export const CapabilityPageCta = ({ content }: { content: CapabilityPageContent["cta"] }) => (
  <section className="gala-cap-cta">
    <div className="gala-cap-cta__glow" aria-hidden="true"></div>
    <div className="gala-shell gala-cap-cta__inner">
      <div data-capability-reveal>
        <div className="gala-cap-eyebrow">{content.eyebrow}</div>
        <h2>{content.headline}</h2>
      </div>
      <div className="gala-cap-cta__action" data-capability-reveal style={revealStyle(1)}>
        <p>{content.body}</p>
        <div className="gala-cap-cta__buttons">
          {content.actions.map((action) => (
            <CapabilityActionLink action={action} key={`${action.label}-${action.href}`} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
