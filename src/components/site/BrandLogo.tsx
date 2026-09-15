import galaLogo from "@/assets/gala-cre-logo.png";

const BrandLogo = () => (
  <span className="brand-logo" aria-hidden="true">
    <span className="brand-logo__mark">
      <img src={galaLogo} alt="" />
    </span>
    <span className="brand-logo__tagline">The Developer’s Brokerage</span>
  </span>
);

export default BrandLogo;
