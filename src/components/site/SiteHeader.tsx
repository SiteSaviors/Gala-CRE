import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/site/BrandLogo";
import { serviceNavigationGroups } from "@/content/services";

type SiteHeaderProps = {
  currentPath: string;
};

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const [pastHeaderThreshold, setPastHeaderThreshold] = useState(false);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextFocusOpenRef = useRef(false);
  const startsTransparent =
    currentPath === "/" ||
    currentPath === "/company" ||
    currentPath === "/news" ||
    currentPath === "/careers" ||
    currentPath === "/contact" ||
    currentPath.startsWith("/investors") ||
    currentPath.startsWith("/services") ||
    currentPath.startsWith("/properties/");
  const [scrolled, setScrolled] = useState(!startsTransparent);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(!startsTransparent || window.scrollY > 40);
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      setPastHeaderThreshold(scrollableDistance > 0 && window.scrollY >= scrollableDistance * 0.25);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
  const isCurrentSection = (path: string) => (
    path === "/"
      ? currentPath === "/"
      : currentPath === path || currentPath.startsWith(`${path}/`)
  );
  const currentState = (path: string) => isCurrentSection(path) ? "page" as const : undefined;
  const headerHidden = pastHeaderThreshold && !mobileNavOpen && !servicesMegaOpen;

  return (
    <nav className={`${scrolled || servicesMegaOpen ? "scrolled" : ""}${servicesMegaOpen ? " services-open" : ""}${headerHidden ? " nav-hidden" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Link to="/" className="nlogo" aria-label="Gala CRE Group home">
        <BrandLogo variant="navigation" />
      </Link>
      <ul className="nlinks">
        <li><Link to="/" aria-current={currentState("/")}>Home</Link></li>
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
            aria-current={currentState("/services")}
          >
            Services <ChevronDown size={13} aria-hidden="true" />
          </Link>
        </li>
        <li><Link to="/properties" aria-current={currentState("/properties")}>Listings</Link></li>
        <li><Link to="/company" aria-current={currentState("/company")}>Company</Link></li>
        <li><Link to="/careers" aria-current={currentState("/careers")}>Careers</Link></li>
        <li><Link to="/contact" aria-current={currentState("/contact")}>Contact</Link></li>
      </ul>
      <Link to="/contact" className="nbtn">Let's Connect</Link>
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
        <Link to="/" aria-current={currentState("/")} onClick={() => setMobileNavOpen(false)}>Home</Link>
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
          {serviceNavigationGroups.map((service) => (
            <Link
              to={service.href}
              onClick={() => setMobileNavOpen(false)}
              key={service.name}
            >
              <span>{service.name}</span>
            </Link>
          ))}
          <Link className="mnav-services-all" to="/services" onClick={() => setMobileNavOpen(false)}>
            <span>View All Services</span><ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <Link to="/properties" aria-current={currentState("/properties")} onClick={() => setMobileNavOpen(false)}>Listings</Link>
        <Link to="/company" aria-current={currentState("/company")} onClick={() => setMobileNavOpen(false)}>Company</Link>
        <Link to="/careers" aria-current={currentState("/careers")} onClick={() => setMobileNavOpen(false)}>Careers</Link>
        <Link to="/contact" aria-current={currentState("/contact")} onClick={() => setMobileNavOpen(false)}>Contact</Link>
        <Link to="/contact" className="mnav-primary" onClick={() => setMobileNavOpen(false)}>Let's Connect</Link>
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
          <section className="gala-mega-menu__intro" aria-labelledby="services-menu-heading">
            <div className="gala-mega-menu__eyebrow">Connected Commercial Services</div>
            <h2 id="services-menu-heading">One platform. Five ways to move an opportunity forward.</h2>
            <p>Brokerage, investment, development, capital, and operating support—connected around the needs of the property and the client.</p>
            <Link className="gala-mega-menu__all" to="/services" tabIndex={megaLinkTabIndex}>
              View All Services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </section>
          <div className="gala-mega-menu__rows" aria-label="Service categories">
            {serviceNavigationGroups.map((service, index) => (
              <Link
                className="gala-mega-menu__row"
                to={service.href}
                tabIndex={megaLinkTabIndex}
                key={service.name}
              >
                <span className="gala-mega-menu__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="gala-mega-menu__row-copy">
                  <strong>{service.name}</strong>
                  <small>{service.summary}</small>
                </span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
