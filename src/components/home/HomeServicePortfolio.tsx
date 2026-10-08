import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import brokerageImage from "@/assets/home-portfolio/brokerage.avif";
import capitalMarketsImage from "@/assets/home-portfolio/capital-markets.avif";
import developmentImage from "@/assets/home-portfolio/development-services.avif";
import investmentSalesImage from "@/assets/home-portfolio/investment-sales.avif";
import propertyManagementImage from "@/assets/home-portfolio/property-management.avif";

const portfolioServices = [
  {
    name: "Brokerage",
    description: "Leasing + occupancy representation",
    href: "/services/brokerage",
    image: brokerageImage,
    imagePosition: "52% center",
  },
  {
    name: "Investment Sales",
    description: "Property positioning + disposition",
    href: "/services/investment-sales",
    image: investmentSalesImage,
    imagePosition: "61% center",
  },
  {
    name: "Development Services",
    description: "Site strategy through execution",
    href: "/services/development-services",
    image: developmentImage,
    imagePosition: "50% center",
  },
  {
    name: "Capital Markets",
    description: "Debt + equity guidance",
    href: "/services/capital-markets",
    image: capitalMarketsImage,
    imagePosition: "65% center",
  },
  {
    name: "Property Management",
    description: "Owner-aligned operations",
    href: "/services/property-management",
    image: propertyManagementImage,
    imagePosition: "70% center",
  },
] as const;

const defaultActiveIndex = 2;

const HomeServicePortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  const syncMobileIndex = () => {
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;

      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      const folios = Array.from(track.querySelectorAll<HTMLElement>(".gala-service-portfolio__folio"));
      const nextIndex = folios.reduce((closestIndex, folio, index) => {
        const folioCenter = folio.offsetLeft + folio.offsetWidth / 2;
        const closestFolio = folios[closestIndex];
        const closestCenter = closestFolio.offsetLeft + closestFolio.offsetWidth / 2;
        return Math.abs(folioCenter - trackCenter) < Math.abs(closestCenter - trackCenter)
          ? index
          : closestIndex;
      }, 0);

      setMobileIndex(nextIndex);
      setActiveIndex(nextIndex);
      scrollFrameRef.current = null;
    });
  };

  return (
    <section className="gala-service-portfolio" aria-labelledby="gala-service-portfolio-title">
      <div className="gala-shell gala-service-portfolio__inner">
        <header className="gala-service-portfolio__header">
          <div className="gala-kicker">Gala CRE Capabilities</div>
          <h2 id="gala-service-portfolio-title">Built to move commercial opportunities forward.</h2>
        </header>

        <div
          className="gala-service-portfolio__track"
          data-active-index={activeIndex}
          ref={trackRef}
          onMouseLeave={() => setActiveIndex(defaultActiveIndex)}
          onScroll={syncMobileIndex}
        >
          {portfolioServices.map((service, index) => {
            const serviceNumber = String(index + 1).padStart(2, "0");
            const position = index < activeIndex ? "before" : index > activeIndex ? "after" : "active";
            const isIvory = index % 2 === 1;

            return (
              <article
                className={`gala-service-portfolio__folio gala-service-portfolio__folio--${isIvory ? "ivory" : "black"}`}
                data-position={position}
                data-active={index === activeIndex ? "true" : "false"}
                key={service.name}
              >
                <Link
                  to={service.href}
                  className="gala-service-portfolio__link"
                  aria-label={`Explore ${service.name}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(defaultActiveIndex)}
                >
                  <div className="gala-service-portfolio__folio-head">
                    <span className="gala-service-portfolio__number">{serviceNumber}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </div>
                  <div className="gala-service-portfolio__title">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <figure className="gala-service-portfolio__media">
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: service.imagePosition }}
                    />
                  </figure>
                  <div className="gala-service-portfolio__folio-foot" aria-hidden="true">
                    <span>///</span>
                    <i />
                    <b>{serviceNumber}</b>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="gala-service-portfolio__mobile-progress" aria-hidden="true">
          <span>{String(mobileIndex + 1).padStart(2, "0")} / 05</span>
          <i><b style={{ width: `${((mobileIndex + 1) / portfolioServices.length) * 100}%` }} /></i>
          <small>Swipe to explore</small>
        </div>
      </div>
    </section>
  );
};

export default HomeServicePortfolio;
