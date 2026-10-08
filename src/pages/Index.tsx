import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroPosterDesktop from "@/assets/GALA-CRE-HERO-DESKTOP.webp";
import heroPosterMobile from "@/assets/GALA-CRE-HERO-MOBILE.webp";
import heroVideo from "@/assets/GALA-CRE-HERO-WEB.mp4";
import galaIntroductionPortrait from "@/assets/gala-introduction-gaurang.webp";
import HomeServicePortfolio from "@/components/home/HomeServicePortfolio";
import FeaturedListingsCarousel from "@/components/properties/FeaturedListingsCarousel";
import HomeNews from "@/components/site/HomeNews";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import useSiteCursor from "@/hooks/useSiteCursor";

const Index = () => {
  const isMobile = useIsMobile();
  const heroPoster = isMobile ? heroPosterMobile : heroPosterDesktop;
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introductionRef = useRef<HTMLElement>(null);
  const [canPlayHeroVideo, setCanPlayHeroVideo] = useState(() => (
    typeof window !== "undefined"
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));
  useSiteCursor();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVideoPreference = () => setCanPlayHeroVideo(!reducedMotion.matches);
    updateVideoPreference();
    if ("addEventListener" in reducedMotion) {
      reducedMotion.addEventListener("change", updateVideoPreference);
      return () => reducedMotion.removeEventListener("change", updateVideoPreference);
    }
    reducedMotion.addListener(updateVideoPreference);
    return () => reducedMotion.removeListener(updateVideoPreference);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = heroVideoRef.current;
    if (!hero || !video || !canPlayHeroVideo) {
      video?.pause();
      return;
    }

    let heroIsVisible = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const syncPlayback = () => {
      if (!heroIsVisible || document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };
    const handleVisibilityChange = () => syncPlayback();

    video.addEventListener("loadeddata", syncPlayback);
    video.addEventListener("canplay", syncPlayback);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", syncPlayback);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        heroIsVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.15);
        syncPlayback();
      }, { threshold: [0, 0.15, 0.5] });
      observer.observe(hero);
    } else {
      heroIsVisible = true;
      syncPlayback();
    }

    return () => {
      observer?.disconnect();
      video.removeEventListener("loadeddata", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", syncPlayback);
      video.pause();
    };
  }, [canPlayHeroVideo]);

  useEffect(() => {
    const section = introductionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      section.style.setProperty("--gala-intro-shift", "0px");
      return;
    }

    let animationFrame = 0;
    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
      section.style.setProperty("--gala-intro-shift", `${(progress - 0.5) * 220}px`);
      animationFrame = 0;
    };
    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <PageMeta title="Commercial Real Estate, Simplified" description="Commercial real estate brokerage, sales, development, and capital services for clients across North Carolina." />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/" />
      <main className="gala-home" id="main-content" tabIndex={-1}>
        <section className="hero gala-hero" id="hero" ref={heroRef}>
          <div className="hbg" style={{ backgroundImage: `url(${heroPoster})` }}>
            <video ref={heroVideoRef} className="hbgv" id="hvideo" autoPlay={canPlayHeroVideo} muted loop playsInline preload={canPlayHeroVideo ? "auto" : "none"} poster={heroPoster} aria-hidden="true" disablePictureInPicture>
              {canPlayHeroVideo ? <source src={heroVideo} type="video/mp4" /> : null}
            </video>
          </div>
          <div className="hinner"><div className="glass text-left">
            <div className="ey">Brokerage · Investment Sales · Development · Capital Markets</div>
            <h1>Commercial Real Estate,<br />Simplified</h1>
            <p className="hsp">Gala CRE Group helps clients buy, sell, lease, develop, and source capital for commercial property across North Carolina.</p>
            <div className="hbtns"><Link to="/contact" className="bp">Connect with us</Link><Link to="/properties" className="bg">View Property Listings <ArrowUpRight size={15} /></Link></div>
          </div></div>
          <div className="si"><div className="silbl">Scroll</div><div className="sil"></div></div>
        </section>

        <section className="gala-editorial-intro" ref={introductionRef}>
          <div className="gala-editorial-intro__wordfield" aria-hidden="true">
            <div className="gala-editorial-intro__wordrow gala-editorial-intro__wordrow--one">
              {Array.from({ length: 4 }, (_, index) => <span key={index}>GALA</span>)}
            </div>
            <div className="gala-editorial-intro__wordrow gala-editorial-intro__wordrow--two">
              {Array.from({ length: 4 }, (_, index) => <span key={index}>GALA</span>)}
            </div>
          </div>
          <div className="gala-editorial-intro__body">
            <div className="gala-editorial-intro__copy">
              <div className="gala-kicker gala-kicker--dark">Introduction</div>
              <h2>About Gala CRE Group</h2>
              <div className="gala-editorial-intro__text">
                <p>Built on more than two decades of experience, Gala CRE Group helps property owners, private investors, and businesses navigate commercial real estate with clarity and confidence.</p>
                <p>From brokerage and investment sales to development services and capital markets, our connected approach brings the right people, information, and resources together around each client’s goals. The result is a simpler, more coordinated path from opportunity to outcome.</p>
              </div>
              <Link to="/company" className="gala-text-link">Meet Gala CRE Group <ArrowUpRight size={16} /></Link>
            </div>
            <figure className="gala-editorial-intro__media">
              <img src={galaIntroductionPortrait} alt="Gaurang Gala at a commercial development site" />
              <figcaption>North Carolina Commercial Real Estate</figcaption>
            </figure>
          </div>
        </section>

        <HomeServicePortfolio />

        <FeaturedListingsCarousel />

        <HomeNews />

        <section className="gala-home-cta">
          <div className="gala-shell gala-home-cta__inner">
            <div>
              <div className="gala-kicker">Your Next Move</div>
              <h2>Let’s move your next opportunity forward.</h2>
            </div>
            <div className="gala-home-cta__action">
              <p>Whether you’re evaluating a property, preparing a sale, searching for space, or planning what comes next, start with a focused conversation.</p>
              <Link to="/contact" className="gala-button">Let’s Connect <ArrowUpRight size={16} /></Link>
              <span>105 Kilmayne Dr, Suite C · Cary, NC</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/" />
    </>
  );
};

export default Index;
