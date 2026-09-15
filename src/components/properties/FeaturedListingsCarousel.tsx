import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredListings, type FeaturedListingPreview } from "@/content/featuredListings";

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ListingCardGalleryProps = {
  listing: FeaturedListingPreview;
  cardIndex: number;
};

const ListingCardGallery = ({ listing, cardIndex }: ListingCardGalleryProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = listing.images.length > 0
    ? listing.images
    : [{ src: listing.image, alt: `${listing.name} in ${listing.address}` }];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[imageIndex];

  const showPreviousImage = () => {
    setImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setImageIndex((current) => (current + 1) % images.length);
  };

  const keepGalleryControlOutOfCarouselDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={`gala-listing-card__media gala-listing-card__media--${cardIndex + 1}`}>
      <img
        key={currentImage.src}
        src={currentImage.src}
        alt={currentImage.alt}
        style={{ objectPosition: imageIndex === 0 ? listing.imagePosition : undefined }}
      />

      {hasMultipleImages ? (
        <>
          <div className="gala-listing-card__gallery-controls">
            <button
              type="button"
              onPointerDown={keepGalleryControlOutOfCarouselDrag}
              onClick={showPreviousImage}
              aria-label={`Previous image for ${listing.name}`}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onPointerDown={keepGalleryControlOutOfCarouselDrag}
              onClick={showNextImage}
              aria-label={`Next image for ${listing.name}`}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>

          <div className="gala-listing-card__gallery-count" aria-live="polite">
            <span className="sr-only">Image </span>
            {imageIndex + 1} / {images.length}
          </div>

          <div className="gala-listing-card__gallery-dots" aria-label={`Choose an image for ${listing.name}`}>
            {images.map((image, index) => (
              <button
                type="button"
                className={index === imageIndex ? "active" : ""}
                onPointerDown={keepGalleryControlOutOfCarouselDrag}
                onClick={() => setImageIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length} for ${listing.name}`}
                aria-current={index === imageIndex ? "true" : undefined}
                key={image.src}
              />
            ))}
          </div>
        </>
      ) : null}

      <span className="gala-listing-card__status">{listing.status}</span>
    </div>
  );
};

const FeaturedListingsCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const wheelReleaseTimer = useRef<number>();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    dragThreshold: 4,
    loop: true,
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

  useEffect(() => () => {
    if (wheelReleaseTimer.current !== undefined) {
      window.clearTimeout(wheelReleaseTimer.current);
    }
  }, []);

  const handleWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    const hasHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const hasShiftWheelIntent = event.shiftKey && Math.abs(event.deltaY) > 0;
    if (!hasHorizontalIntent && !hasShiftWheelIntent) return;

    const distance = hasHorizontalIntent ? event.deltaX : event.deltaY;
    if (Math.abs(distance) < 4) return;

    event.preventDefault();
    if (wheelReleaseTimer.current !== undefined) return;

    if (distance > 0) {
      emblaApi.scrollNext(prefersReducedMotion());
    } else {
      emblaApi.scrollPrev(prefersReducedMotion());
    }

    wheelReleaseTimer.current = window.setTimeout(() => {
      wheelReleaseTimer.current = undefined;
    }, 220);
  }, [emblaApi]);

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
          <div className="gala-featured-listings__progress" aria-label="Choose a featured listing">
            {scrollSnaps.map((_, index) => (
              <button
                type="button"
                className={index === selectedIndex ? "active" : ""}
                onClick={() => emblaApi?.scrollTo(index, prefersReducedMotion())}
                aria-label={`Go to featured listing ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                key={index}
              />
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
          aria-describedby="featured-listings-instructions"
          onWheel={handleWheel}
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
                  <ListingCardGallery listing={listing} cardIndex={index} />
                  <div className="gala-listing-card__body">
                    <div className="gala-listing-card__type">{listing.offeringType} · {listing.assetType}</div>
                    <h3>{listing.name}</h3>
                    <p className="gala-listing-card__location">{listing.address}</p>
                    <div className="gala-listing-card__metrics">
                      {listing.price ? <strong>{listing.price}</strong> : null}
                      {listing.size ? <span>{listing.size}</span> : null}
                    </div>
                    <p className="gala-listing-card__summary">{listing.summary}</p>
                    <Link to={listing.href} className="gala-text-link">View Property <ArrowUpRight size={16} /></Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="gala-featured-listings__footer">
          <div>
            <span>{featuredListings.length} active sale opportunities</span>
            <span id="featured-listings-instructions" className="gala-featured-listings__interaction-hint">
              <MoveHorizontal aria-hidden="true" /> Drag or trackpad swipe to explore
            </span>
          </div>
          <Link to="/properties" className="gala-text-link">View all properties <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
