import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredListingPlaceholders } from "@/content/featuredListings";

type OfferingFilter = "For Lease" | "For Sale";

const FeaturedListingsCarousel = () => {
  const [offeringFilter, setOfferingFilter] = useState<OfferingFilter>("For Sale");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  const visibleListings = useMemo(
    () => featuredListingPlaceholders.filter((listing) => listing.offeringType === offeringFilter),
    [offeringFilter],
  );

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
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

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    updateControls();
  }, [emblaApi, offeringFilter, updateControls]);

  return (
    <section className="gala-featured-listings" aria-labelledby="featured-listings-title">
      <div className="gala-shell">
        <div className="gala-featured-listings__header">
          <div>
            <div className="gala-kicker gala-kicker--dark">Current Opportunities</div>
            <h2 id="featured-listings-title">Featured listings</h2>
          </div>
          <div className="gala-listing-filter" aria-label="Filter featured listings">
            {(["For Sale", "For Lease"] as OfferingFilter[]).map((filter) => (
              <button
                type="button"
                key={filter}
                className={offeringFilter === filter ? "active" : ""}
                aria-pressed={offeringFilter === filter}
                onClick={() => setOfferingFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="gala-featured-listings__controls">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!canScrollPrev} aria-label="Previous featured listing">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!canScrollNext} aria-label="Next featured listing">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="gala-featured-listings__viewport" ref={emblaRef}>
          <div className="gala-featured-listings__track">
            {visibleListings.map((listing, index) => (
              <div className="gala-featured-listings__slide" key={listing.id}>
                <article className="gala-listing-card">
                  <div className={`gala-listing-card__media gala-listing-card__media--${index + 1}`}>
                    {listing.image ? (
                      <img src={listing.image} alt={`${listing.name} in ${listing.address}`} style={{ objectPosition: listing.imagePosition }} />
                    ) : (
                      <div className="gala-listing-card__placeholder" role="img" aria-label="Listing photography placeholder">
                        <Building2 aria-hidden="true" />
                        <span>Listing photography</span>
                      </div>
                    )}
                    <span className="gala-listing-card__offering">{listing.offeringType}</span>
                  </div>
                  <div className="gala-listing-card__body">
                    <div className="gala-listing-card__type">{listing.assetType}</div>
                    <h3>{listing.name}</h3>
                    <div className="gala-listing-card__facts">
                      <p>{listing.address}</p>
                      {listing.price || listing.size ? (
                        <div className="gala-listing-card__metrics">
                          {listing.price && <span><small>Price</small><strong>{listing.price}</strong></span>}
                          {listing.size && <span><small>Size</small><strong>{listing.size}</strong></span>}
                        </div>
                      ) : listing.details ? <p>{listing.details}</p> : null}
                    </div>
                    <Link to={listing.href} className="gala-text-link">View Property <ArrowUpRight size={16} /></Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="gala-featured-listings__footer">
          <Link to="/properties" className="gala-text-link">View all properties <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
