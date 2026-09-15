import galaLogo from "@/assets/gala-cre-logo.png";
import galaNavLogo from "@/assets/gala-cre-nav-logo.avif";

type BrandLogoProps = {
  variant?: "default" | "navigation";
};

const BrandLogo = ({ variant = "default" }: BrandLogoProps) => (
  <span className={`brand-logo brand-logo--${variant}`} aria-hidden="true">
    <span className={variant === "navigation" ? "brand-logo__nav-lockup" : "brand-logo__mark"}>
      <img src={variant === "navigation" ? galaNavLogo : galaLogo} alt="" />
    </span>
    {variant === "default" ? (
      <span className="brand-logo__tagline">The Developer’s Brokerage</span>
    ) : null}
  </span>
);

export default BrandLogo;
