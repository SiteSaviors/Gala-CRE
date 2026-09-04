import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import galaLogo from "@/assets/gala-cre-logo.png";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";
import { serviceCapabilityId } from "@/content/services";

type SiteHeaderProps = {
  currentPath: string;
};

const serviceNavigation = [
  {
    name: "GalaBroker",
    href: "/services/brokerage",
    capabilities: [
      { label: "Landlord Representation", target: "Landlord representation", route: "landlord-representation" },
      { label: "Tenant Representation", target: "Tenant representation", route: "tenant-representation" },
    ],
  },
  {
    name: "GalaSales",
    href: "/services/investment-sales",
    capabilities: [
      { label: "Industrial", target: "Industrial" },
      { label: "Multifamily", target: "Multifamily" },
      { label: "Retail", target: "Retail" },
      { label: "Office", target: "Office" },
      { label: "Land", target: "Land" },
    ],
  },
  {
    name: "GalaDevelop",
    href: "/services/development-services",
    capabilities: [
      { label: "Site Strategy", target: "Feasibility and site strategy" },
      { label: "Entitlements", target: "Entitlements" },
      { label: "Infrastructure", target: "Infrastructure coordination" },
      { label: "Development Oversight", target: "Project oversight" },
    ],
  },
  {
    name: "GalaCapital",
    href: "/services/capital-markets",
    capabilities: [
      { label: "Debt", target: "Debt placement support" },
      { label: "Equity", target: "Equity introductions" },
      { label: "Capital Strategy", target: "Capital strategy" },
      { label: "Transaction Coordination", target: "Transaction coordination" },
    ],
  },
] as const;

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextFocusOpenRef = useRef(false);
  const startsTransparent =
    currentPath === "/" ||
    currentPath === "/company" ||
    currentPath === "/contact" ||
    currentPath.startsWith("/services") ||
    currentPath.startsWith("/properties");
  const [scrolled, setScrolled] = useState(!startsTransparent);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(!startsTransparent || window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startsTransparent]);

  useEffect(() => {
    setMobileNavOpen(false);
    setMobileServicesOpen(false);
    setServicesMegaOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !servicesMegaOpen) return;
      suppressNextFocusOpenRef.current = true;
      setServicesMegaOpen(false);
      servicesTriggerRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [servicesMegaOpen]);

  const openServicesMega = () => {
    if (suppressNextFocusOpenRef.current) {
      suppressNextFocusOpenRef.current = false;
      return;
    }
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setServicesMegaOpen(true);
  };

  const scheduleServicesClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setServicesMegaOpen(false), 160);
  };

  const megaLinkTabIndex = servicesMegaOpen ? 0 : -1;

  return (
    <nav className={`${scrolled || servicesMegaOpen ? "scrolled" : ""}${servicesMegaOpen ? " services-open" : ""}`}>
      <Link to="/" className="nlogo" aria-label="Gala CRE Group home">
        <img src={galaLogo} alt="Gala CRE Group" />
      </Link>
      <ul className="nlinks">
        <li className="nservices" onMouseEnter={openServicesMega} onMouseLeave={scheduleServicesClose}>
          <Link
            to="/services"
            className="nservices-trigger"
            aria-haspopup="true"
            aria-expanded={servicesMegaOpen}
            aria-controls="services-mega-menu"
            ref={servicesTriggerRef}
            onFocus={openServicesMega}
            onBlur={scheduleServicesClose}
          >
            Services <ChevronDown size={13} aria-hidden="true" />
          </Link>
        </li>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <Link to="/contact" className="nbtn">Talk to an Advisor</Link>
      <button
        type="button"
        className={`mnavt${mobileNavOpen ? " open" : ""}`}
        aria-expanded={mobileNavOpen}
        aria-label="Toggle navigation"
        onClick={() => {
          setMobileNavOpen((open) => !open);
          if (mobileNavOpen) setMobileServicesOpen(false);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`mnav${mobileNavOpen ? " open" : ""}`}>
        <button
          type="button"
          className={`mnav-services-toggle${mobileServicesOpen ? " open" : ""}`}
          aria-expanded={mobileServicesOpen}
          aria-controls="mobile-services-menu"
          onClick={() => setMobileServicesOpen((open) => !open)}
        >
          <span>Services</span><ChevronDown size={16} aria-hidden="true" />
        </button>
        <div className={`mnav-services${mobileServicesOpen ? " open" : ""}`} id="mobile-services-menu">
          <Link to="/services" onClick={() => setMobileNavOpen(false)}>All Services</Link>
          {serviceNavigation.map((service) => (
            <Link to={service.href} onClick={() => setMobileNavOpen(false)} key={service.name}>{service.name}</Link>
          ))}
        </div>
        <Link to="/properties" onClick={() => setMobileNavOpen(false)}>Properties</Link>
        <Link to="/company" onClick={() => setMobileNavOpen(false)}>Company</Link>
        <Link to="/contact" onClick={() => setMobileNavOpen(false)}>Contact</Link>
        <Link to="/contact" className="mnav-primary" onClick={() => setMobileNavOpen(false)}>Talk to an Advisor</Link>
      </div>

      <div
        className={`gala-mega-menu${servicesMegaOpen ? " open" : ""}`}
        id="services-mega-menu"
        aria-label="Services menu"
        aria-hidden={!servicesMegaOpen}
        onMouseEnter={openServicesMega}
        onMouseLeave={scheduleServicesClose}
        onFocus={openServicesMega}
        onBlur={scheduleServicesClose}
      >
        <div className="gala-mega-menu__shell">
          <div className="gala-mega-menu__services">
            <div className="gala-mega-menu__eyebrow">Commercial Capabilities</div>
            <div className="gala-mega-menu__groups">
              {serviceNavigation.map((service) => (
                <section className="gala-mega-menu__group" key={service.name}>
                  <Link className="gala-mega-menu__title" to={service.href} tabIndex={megaLinkTabIndex}>
                    {service.name}<ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  <ul>
                    {service.capabilities.map((capability) => (
                      <li key={capability.label}>
                        <Link
                          to={"route" in capability && capability.route ? `${service.href}/${capability.route}` : `${service.href}#${serviceCapabilityId(capability.target)}`}
                          tabIndex={megaLinkTabIndex}
                        >
                          <span>{capability.label}</span><ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <Link className="gala-mega-menu__all" to="/services" tabIndex={megaLinkTabIndex}>
              View All Services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <Link className="gala-mega-menu__advisor" to="/contact" tabIndex={megaLinkTabIndex}>
            <img src={galaSalesCapability} alt="Commercial property in North Carolina" />
            <span className="gala-mega-menu__advisor-shade" aria-hidden="true"></span>
            <span className="gala-mega-menu__advisor-content">
              <small>Have a commercial opportunity?</small>
              <strong>Let's discuss what comes next.</strong>
              <span>Talk to an Advisor <ArrowUpRight size={16} aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
