import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.key]);

  return null;
};

export default ScrollManager;
