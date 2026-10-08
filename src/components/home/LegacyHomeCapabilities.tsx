import { ArrowUpRight, X } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { serviceNavigationGroups, type ServiceNavigationGroup } from "@/content/services";

const homepageCapabilities = serviceNavigationGroups.filter(
  (service): service is ServiceNavigationGroup & { image: string } => Boolean(service.image),
);

type HomepageCapability = (typeof homepageCapabilities)[number];

type HomepageCapabilityCardProps = HomepageCapability & {
  isOpen: boolean;
  onToggle: () => void;
};

const HomepageCapabilityCard = ({
  name,
  summary,
  capabilities,
  href,
  image,
  isOpen,
  onToggle,
}: HomepageCapabilityCardProps) => {
  const rows = Math.ceil(capabilities.length / 2);
  const cardStyle = {
    "--gala-capability-panel-height": `${rows * 56 + Math.max(0, rows - 1) * 10}px`,
    "--gala-capability-panel-height-mobile": `${rows * 48 + Math.max(0, rows - 1) * 8}px`,
  } as CSSProperties;

  return (
    <article
      className={`gala-capability-card gala-capability-card--has-image${isOpen ? " gala-capability-card--open" : ""}`}
      style={cardStyle}
    >
      <img className="gala-capability-card__image" src={image} alt="" aria-hidden="true" />
      <div className="gala-capability-card__content">
        <h3><Link to={href}>{name}</Link></h3>
        <p className="gala-capability-card__summary">{summary}</p>
      </div>
      <nav className="gala-capability-card__links" aria-label={`${name} capabilities`}>
        {capabilities.map((capability, capabilityIndex) => (
          <Link
            to={capability.path}
            className="gala-capability-card__link"
            style={{ "--gala-capability-index": capabilityIndex } as CSSProperties}
            key={capability.label}
          >
            <span>{capability.label}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <ArrowUpRight className="gala-capability-card__arrow" aria-hidden="true" />
      <button
        type="button"
        className="gala-capability-card__toggle"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Hide" : "Show"} ${name} capabilities`}
        onClick={onToggle}
      >
        {isOpen ? <X aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
      </button>
    </article>
  );
};

/**
 * Preserved rollback path for the homepage capability grid replaced in October 2026.
 * This component is intentionally not mounted while the portfolio treatment is active.
 */
const LegacyHomeCapabilities = () => {
  const [openCapability, setOpenCapability] = useState<string | null>(null);

  return (
    <section className="gala-section gala-section--black">
      <div className="gala-shell">
        <div className="gala-section-head gala-section-head--capabilities">
          <div className="gala-kicker">Gala CRE Capabilities</div>
          <h2><span>Built to move commercial</span>{" "}<span>opportunities forward.</span></h2>
        </div>
        <div className="gala-capability-grid">
          {homepageCapabilities.map((capability) => (
            <HomepageCapabilityCard
              {...capability}
              isOpen={openCapability === capability.name}
              onToggle={() => setOpenCapability((current) => current === capability.name ? null : capability.name)}
              key={capability.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacyHomeCapabilities;
