import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CapabilityPageAction, CapabilityPageContent } from "@/content/capabilityPages";

type CapabilityPageHeroProps = Pick<CapabilityPageContent, "hero" | "parent">;

const ActionIcon = ({ action }: { action: CapabilityPageAction }) => {
  if (action.icon === "arrow-down") return <ArrowDown size={15} aria-hidden="true" />;
  if (action.icon === "arrow-up-right") return <ArrowUpRight size={16} aria-hidden="true" />;
  return null;
};

export const CapabilityActionLink = ({ action }: { action: CapabilityPageAction }) => {
  const className = `gala-cap-button gala-cap-button--${action.variant === "primary" ? "gold" : "ghost"}`;
  const contents = <>{action.label} <ActionIcon action={action} /></>;

  return action.href.startsWith("#") ? (
    <a href={action.href} className={className}>{contents}</a>
  ) : (
    <Link to={action.href} className={className}>{contents}</Link>
  );
};

const CapabilityPageHero = ({ hero, parent }: CapabilityPageHeroProps) => (
  <section className="gala-cap-hero">
    <img
      className="gala-cap-hero__image"
      src={hero.media.src}
      alt={hero.media.alt}
      style={hero.media.position ? { objectPosition: hero.media.position } : undefined}
    />
    <div className="gala-cap-hero__wash" aria-hidden="true"></div>
    <div className="gala-cap-hero__grid" aria-hidden="true"></div>
    <div className="gala-shell gala-cap-hero__inner">
      <Link to={parent.href} className="gala-cap-hero__back">
        <ArrowLeft size={15} aria-hidden="true" /> {parent.label}
      </Link>
      <div className="gala-cap-hero__copy">
        <div className="gala-cap-eyebrow">{hero.eyebrow}</div>
        <h1>{hero.title}</h1>
        <p>{hero.lead}</p>
        <div className="gala-cap-hero__actions">
          {hero.actions.map((action) => <CapabilityActionLink action={action} key={`${action.label}-${action.href}`} />)}
        </div>
      </div>
      <div className="gala-cap-hero__signals" aria-label={hero.signalLabel}>
        {hero.signals.map((signal, index) => (
          <span key={signal}><small>{String(index + 1).padStart(2, "0")}</small>{signal}</span>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilityPageHero;
