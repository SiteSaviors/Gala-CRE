import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import galaLogo from "@/assets/gala-cre-logo.png";

type SiteHeaderProps = {
  currentPath: string;
};

const SiteHeader = ({ currentPath }: SiteHeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
  }, [currentPath]);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nlogo" aria-label="Gala CRE Group home">
        <img src={galaLogo} alt="Gala CRE Group" />
      </Link>
      <ul className="nlinks">
        <li><Link to="/services">Services</Link></li>
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
        onClick={() => setMobileNavOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`mnav${mobileNavOpen ? " open" : ""}`}>
        <Link to="/services" onClick={() => setMobileNavOpen(false)}>Services</Link>
        <Link to="/properties" onClick={() => setMobileNavOpen(false)}>Properties</Link>
        <Link to="/company" onClick={() => setMobileNavOpen(false)}>Company</Link>
        <Link to="/contact" onClick={() => setMobileNavOpen(false)}>Contact</Link>
        <Link to="/contact" className="mnav-primary" onClick={() => setMobileNavOpen(false)}>Talk to an Advisor</Link>
      </div>
    </nav>
  );
};

export default SiteHeader;
