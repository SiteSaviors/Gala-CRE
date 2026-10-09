import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import galaSalesCapability from "@/assets/gala-sales-capability.webp";
import BrandLogo from "@/components/site/BrandLogo";
import { serviceNavigationGroups, type ServiceSlug } from "@/content/services";

type SiteHeaderProps = {
  currentPath: string;
};

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileServiceGroupOpen, setMobileServiceGroupOpen] = useState<ServiceSlug | null>(null);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const [pastHeaderThreshold, setPastHeaderThreshold] = useState(false);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);
  const servicesMegaRef = useRef<HTMLDivElement>(null);
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
    setMobileServiceGroupOpen(null);
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

  const closeMobileNavigation = () => {
    setMobileNavOpen(false);
    setMobileServicesOpen(false);
    setMobileServiceGroupOpen(null);
  };

  const megaLinkTabIndex = servicesMegaOpen ? 0 : -1;
  const mobileLinkTabIndex = mobileNavOpen ? 0 : -1;
  const mobileServiceLinkTabIndex = mobileNavOpen && mobileServicesOpen ? 0 : -1;
  const isCurrentSection = (path: string) => (
    path === "/"
      ? currentPath === "/"
      : currentPath === path || currentPath.startsWith(`${path}/`)
  );
  const currentState = (path: string) => isCurrentSection(path) ? "page" as const : undefined;
  const headerHidden = pastHeaderThreshold && !mobileNavOpen && !servicesMegaOpen;

  return (
    <nav className={`site-nav${scrolled || servicesMegaOpen ? " scrolled" : ""}${servicesMegaOpen ? " services-open" : ""}${headerHidden ? " nav-hidden" : ""}`}>
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
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown") return;
              event.preventDefault();
              openServicesMega();
              window.requestAnimationFrame(() => {
                servicesMegaRef.current?.querySelector<HTMLAnchorElement>("[data-mega-first]")?.focus();
              });
            }}
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
          if (mobileNavOpen) {
            setMobileServicesOpen(false);
            setMobileServiceGroupOpen(null);
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`mnav${mobileNavOpen ? " open" : ""}`} aria-hidden={!mobileNavOpen}>
        <Link to="/" tabIndex={mobileLinkTabIndex} aria-current={currentState("/")} onClick={closeMobileNavigation}>Home</Link>
        <button
          type="button"
          className={`mnav-services-toggle${mobileServicesOpen ? " open" : ""}`}
          aria-expanded={mobileServicesOpen}
          aria-controls="mobile-services-menu"
          tabIndex={mobileLinkTabIndex}
          onClick={() => {
            setMobileServicesOpen((open) => !open);
            if (mobileServicesOpen) setMobileServiceGroupOpen(null);
          }}
        >
          <span>Services</span><ChevronDown size={16} aria-hidden="true" />
        </button>
        <div
          className={`mnav-services${mobileServicesOpen ? " open" : ""}`}
          id="mobile-services-menu"
          aria-hidden={!mobileServicesOpen}
        >
          {serviceNavigationGroups.map((service) => {
            const dedicatedChildren = service.capabilities.filter((capability) => capability.destination === "page");
            const hasDedicatedChildren = dedicatedChildren.length > 0;
            const groupOpen = mobileServiceGroupOpen === service.serviceSlug;

            return (
              <div className={`mnav-service-group${groupOpen ? " open" : ""}`} key={service.name}>
                <div className="mnav-service-group__head">
                  <Link
                    to={service.href}
                    tabIndex={mobileServiceLinkTabIndex}
                    onClick={closeMobileNavigation}
                  >
                    <span>{service.name}</span>
                  </Link>
                  {hasDedicatedChildren ? (
                    <button
                      type="button"
                      aria-label={`Show ${service.name} pages`}
                      aria-expanded={groupOpen}
                      aria-controls={`mobile-service-${service.serviceSlug}`}
                      tabIndex={mobileServiceLinkTabIndex}
                      onClick={() => setMobileServiceGroupOpen((open) => open === service.serviceSlug ? null : service.serviceSlug)}
                    >
                      <ChevronDown size={15} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
                {hasDedicatedChildren ? (
                  <div
                    className="mnav-service-children"
                    id={`mobile-service-${service.serviceSlug}`}
                    aria-hidden={!groupOpen}
                  >
                    {dedicatedChildren.map((capability) => (
                      <Link
                        to={capability.path}
                        tabIndex={mobileNavOpen && mobileServicesOpen && groupOpen ? 0 : -1}
                        onClick={closeMobileNavigation}
                        key={capability.path}
                      >
                        {capability.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link className="mnav-services-all" to="/services" tabIndex={mobileServiceLinkTabIndex} onClick={closeMobileNavigation}>
            <span>View All Services</span><ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <Link to="/properties" tabIndex={mobileLinkTabIndex} aria-current={currentState("/properties")} onClick={closeMobileNavigation}>Listings</Link>
        <Link to="/company" tabIndex={mobileLinkTabIndex} aria-current={currentState("/company")} onClick={closeMobileNavigation}>Company</Link>
        <Link to="/careers" tabIndex={mobileLinkTabIndex} aria-current={currentState("/careers")} onClick={closeMobileNavigation}>Careers</Link>
        <Link to="/contact" tabIndex={mobileLinkTabIndex} aria-current={currentState("/contact")} onClick={closeMobileNavigation}>Contact</Link>
        <Link to="/contact" tabIndex={mobileLinkTabIndex} className="mnav-primary" onClick={closeMobileNavigation}>Let's Connect</Link>
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
        ref={servicesMegaRef}
      >
        <div className="gala-mega-menu__shell">
          <div className="gala-mega-menu__services">
            <div className="gala-mega-menu__eyebrow" id="services-menu-heading">Commercial Capabilities</div>
            <div className="gala-mega-menu__groups" aria-labelledby="services-menu-heading">
              {serviceNavigationGroups.map((service, serviceIndex) => (
                <section className="gala-mega-menu__group" key={service.name}>
                  <Link
                    className="gala-mega-menu__title"
                    to={service.href}
                    tabIndex={megaLinkTabIndex}
                    data-mega-first={serviceIndex === 0 ? "true" : undefined}
                  >
                    {service.name}<ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  <ul>
                    {service.capabilities.map((capability) => (
                      <li key={capability.label}>
                        <Link to={capability.path} tabIndex={megaLinkTabIndex}>
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
          <Link
            className="gala-mega-menu__advisor"
            to="/contact?inquiry=general&source=services-menu"
            tabIndex={megaLinkTabIndex}
          >
            <img src={galaSalesCapability} alt="" />
            <span className="gala-mega-menu__advisor-shade" aria-hidden="true"></span>
            <span className="gala-mega-menu__advisor-content">
              <small>Have a commercial opportunity?</small>
              <strong>Let's discuss what comes next.</strong>
              <span>Let's Connect <ArrowUpRight size={16} aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
