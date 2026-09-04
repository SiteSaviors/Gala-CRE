import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredListings } from "@/content/featuredListings";

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const FeaturedListingsCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    updateControls();
    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  return (
    <section className="gala-featured-listings" aria-labelledby="featured-listings-title">
      <div className="gala-shell">
        <div className="gala-featured-listings__header">
          <div>
            <div className="gala-kicker gala-kicker--dark">Current Opportunities</div>
            <h2 id="featured-listings-title">Featured listings</h2>
          </div>
          <p>Verified commercial properties currently represented by Gala CRE Group.</p>
        </div>

        <div className="gala-featured-listings__navigation">
          <div className="gala-featured-listings__position" aria-live="polite">
            <strong>{formatIndex(selectedIndex)}</strong>
            <span>/</span>
            <small>{String(scrollSnaps.length).padStart(2, "0")}</small>
          </div>
          <div className="gala-featured-listings__progress" aria-hidden="true">
            {scrollSnaps.map((_, index) => (
              <span className={index === selectedIndex ? "active" : ""} key={index}></span>
            ))}
          </div>
          <div className="gala-featured-listings__controls">
            <button type="button" onClick={() => emblaApi?.scrollPrev(prefersReducedMotion())} disabled={!canScrollPrev} aria-label="Previous featured listing">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => emblaApi?.scrollNext(prefersReducedMotion())} disabled={!canScrollNext} aria-label="Next featured listing">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="gala-featured-listings__viewport"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured commercial properties"
        >
          <div className="gala-featured-listings__track">
            {featuredListings.map((listing, index) => (
              <div
                className="gala-featured-listings__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${featuredListings.length}`}
                key={listing.id}
              >
                <article className="gala-listing-card">
                  <div className={`gala-listing-card__media gala-listing-card__media--${index + 1}`}>
                    <img src={listing.image} alt={`${listing.name} in ${listing.address}`} style={{ objectPosition: listing.imagePosition }} />
                    <span className="gala-listing-card__offering">{listing.offeringType}</span>
                  </div>
                  <div className="gala-listing-card__body">
                    <div className="gala-listing-card__type">{listing.assetType}</div>
                    <h3>{listing.name}</h3>
                    <div className="gala-listing-card__facts">
                      <p>{listing.address}</p>
                      <div className="gala-listing-card__metrics">
                        {listing.price ? <span><small>Price</small><strong>{listing.price}</strong></span> : null}
                        {listing.size ? <span><small>Size</small><strong>{listing.size}</strong></span> : null}
                      </div>
                    </div>
                    <Link to={listing.href} className="gala-text-link">View Property <ArrowUpRight size={16} /></Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="gala-featured-listings__footer">
          <span>{featuredListings.length} active sale opportunities</span>
          <Link to="/properties" className="gala-text-link">View all properties <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
