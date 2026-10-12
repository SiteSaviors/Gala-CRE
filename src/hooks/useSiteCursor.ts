import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_HOVER_SELECTOR = "a,button,input,select,textarea,.gala-property-card,.gala-capability-card,.gala-listing-card,.gala-service-card";

const useSiteCursor = (hoverSelector: string = DEFAULT_HOVER_SELECTOR) => {
  const location = useLocation();

  useEffect(() => {
    const supportsFinePointer = typeof window.matchMedia === "function"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : true;
    if (!supportsFinePointer) return;

    const cursor = document.getElementById("cur");
    const dot = document.getElementById("cdot");
    if (!cursor || !dot) return;

    let mouseX = -200;
    let mouseY = -200;
    let cursorX = -200;
    let cursorY = -200;
    let animationFrame = 0;
    let hasPointerPosition = false;

    const root = document.documentElement;

    const startAnimation = () => {
      if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(animate);
    };

    const setHoverState = (target: Element | null) => {
      cursor.classList.toggle("x", Boolean(target?.closest(hoverSelector)));
    };

    const activate = (clientX: number, clientY: number) => {
      mouseX = clientX;
      mouseY = clientY;
      if (!hasPointerPosition) {
        cursorX = clientX;
        cursorY = clientY;
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
        hasPointerPosition = true;
      }
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      root.classList.add("gala-custom-cursor-ready");
      startAnimation();
    };

    const move = (event: MouseEvent) => {
      activate(event.clientX, event.clientY);
      setHoverState(event.target instanceof Element ? event.target : null);
    };
    const down = (event: MouseEvent) => {
      activate(event.clientX, event.clientY);
      setHoverState(event.target instanceof Element ? event.target : null);
    };

    function animate() {
      cursorX += (mouseX - cursorX) * 0.11;
      cursorY += (mouseY - cursorY) * 0.11;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      animationFrame = requestAnimationFrame(animate);
    }

    const over = (event: MouseEvent) => {
      setHoverState(event.target instanceof Element ? event.target : null);
    };
    const out = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(hoverSelector)) return;
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest(hoverSelector)) return;
      cursor.classList.remove("x");
    };
    const leave = () => {
      root.classList.remove("gala-custom-cursor-ready");
      cursor.classList.remove("x");
    };
    const restore = () => {
      if (!hasPointerPosition || document.hidden) return;
      root.classList.add("gala-custom-cursor-ready");
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      setHoverState(document.elementFromPoint(mouseX, mouseY));
      startAnimation();
    };
    const visibility = () => {
      if (document.hidden) {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        root.classList.remove("gala-custom-cursor-ready");
      } else {
        restore();
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("visibilitychange", visibility);
    root.addEventListener("mouseleave", leave);
    root.addEventListener("mouseenter", restore);
    window.addEventListener("focus", restore);
    window.addEventListener("pageshow", restore);
    window.addEventListener("scroll", restore, { passive: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("visibilitychange", visibility);
      root.removeEventListener("mouseleave", leave);
      root.removeEventListener("mouseenter", restore);
      window.removeEventListener("focus", restore);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("scroll", restore);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      root.classList.remove("gala-custom-cursor-ready");
      cursor.classList.remove("x");
    };
  }, [hoverSelector, location.key, location.pathname]);
};

export default useSiteCursor;
