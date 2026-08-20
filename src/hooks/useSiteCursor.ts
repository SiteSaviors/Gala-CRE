import { useEffect } from "react";

const DEFAULT_HOVER_SELECTOR = "a,button,input,select,textarea,.gala-property-card,.gala-path-card,.gala-service-card";

const useSiteCursor = (hoverSelector: string = DEFAULT_HOVER_SELECTOR) => {
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

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.11;
      cursorY += (mouseY - cursorY) * 0.11;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      animationFrame = requestAnimationFrame(animate);
    };
    const over = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(hoverSelector)) cursor.classList.add("x");
    };
    const out = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(hoverSelector)) return;
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest(hoverSelector)) return;
      cursor.classList.remove("x");
    };
    const visibility = () => {
      if (document.hidden && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("visibilitychange", visibility);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("visibilitychange", visibility);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      cursor.classList.remove("x");
    };
  }, [hoverSelector]);
};

export default useSiteCursor;
