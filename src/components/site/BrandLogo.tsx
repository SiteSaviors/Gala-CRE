import galaNavLogo from "@/assets/gala-cre-nav-logo.avif";

type BrandLogoProps = {
  variant?: "default" | "navigation";
};

const BrandLogo = ({ variant = "default" }: BrandLogoProps) => (
  <span className={`brand-logo brand-logo--${variant}`} aria-hidden="true">
    <span className={variant === "navigation" ? "brand-logo__nav-lockup" : "brand-logo__mark"}>
      <img src={galaNavLogo} alt="" />
    </span>
  </span>
);

export default BrandLogo;
