import { Link } from "react-router-dom";
import BrandLogo from "@/components/site/BrandLogo";
import { serviceNavigationGroups } from "@/content/services";

type SiteFooterProps = {
  currentPath: string;
};

const SiteFooter = ({ currentPath: _currentPath }: SiteFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id="contact" className="site-footer">
        <div className="fbrand">
          <Link to="/" className="flogo" aria-label="Gala CRE Group home">
            <BrandLogo />
          </Link>
          <p className="ftag">
            Commercial real estate guidance for owners, investors, landlords, tenants,
            and business operators.
          </p>
          <p className="fmeta">
            Raleigh-Durham and the Research Triangle.
          </p>
        </div>
        <div className="fcol">
          <div className="fct">Explore</div>
          <ul className="flinks">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/company">Company</Link></li>
            <li><Link to="/company#team">Our Team</Link></li>
            <li><Link to="/news">News &amp; Media</Link></li>
            <li><Link to="/careers?source=footer">Careers</Link></li>
            <li><Link to="/investors/1031-exchange?source=footer">1031 Property Search</Link></li>
            <li><Link to="/contact?inquiry=general&source=footer">Let's Connect</Link></li>
          </ul>
        </div>
        <div className="fcol">
          <div className="fct">Capabilities</div>
          <ul className="flinks">
            {serviceNavigationGroups.map((service) => (
              <li key={service.serviceSlug}><Link to={service.href}>{service.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="fcol fcontact">
          <div className="fct">Gala Network</div>
          <div className="fcontact-list">
            <div className="fcontact-item">
              <div className="fcontact-label">Residential Realty</div>
              <a
                className="fcontact-value"
                href="https://www.galarealtygroupnc.com/"
                target="_blank"
                rel="noreferrer"
              >
                Gala Realty Group
              </a>
            </div>
            <div className="fcontact-item">
              <div className="fcontact-label">Commercial Inquiries</div>
              <Link className="fcontact-value" to="/contact?inquiry=general&source=footer">Let's Connect</Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="fbot">
        <span className="fcp">© {currentYear} Gala CRE Group. All rights reserved.</span>
      </div>
    </>
  );
};

export default SiteFooter;
