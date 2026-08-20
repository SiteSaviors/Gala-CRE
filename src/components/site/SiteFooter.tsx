import { Link } from "react-router-dom";
import galaLogo from "@/assets/gala-cre-logo.png";

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
            <img src={galaLogo} alt="Gala CRE Group" />
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
          <div className="fct">Navigation</div>
          <ul className="flinks">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/company">Company</Link></li>
            <li><Link to="/contact">Talk to an Advisor</Link></li>
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
              <Link className="fcontact-value" to="/contact">Talk to an Advisor</Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="fbot">
        <span className="fcp">© {currentYear} Gala CRE Group. All rights reserved.</span>
        <span className="fcp">Brokerage disclosures pending client confirmation.</span>
      </div>
    </>
  );
};

export default SiteFooter;
