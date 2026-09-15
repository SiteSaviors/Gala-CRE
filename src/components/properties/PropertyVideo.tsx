import { useEffect, useRef, useState } from "react";

type PropertyVideoProps = {
  sourceUrl: string;
  posterImage: string;
  ariaLabel: string;
  orientation?: "landscape" | "portrait";
};

const PropertyVideo = ({
  sourceUrl,
  posterImage,
  ariaLabel,
  orientation = "landscape",
}: PropertyVideoProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="gala-commercial-listing__video-frame"
      data-orientation={orientation}
    >
      <video
        controls
        playsInline
        preload="none"
        poster={posterImage}
        aria-label={ariaLabel}
        src={shouldLoad ? sourceUrl : undefined}
      >
        Your browser does not support embedded video.
      </video>
    </div>
  );
};

export default PropertyVideo;
