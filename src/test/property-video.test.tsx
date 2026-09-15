import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PropertyVideo from "@/components/properties/PropertyVideo";

describe("property video", () => {
  const originalIntersectionObserver = window.IntersectionObserver;

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
  });

  it("defers its source until near the viewport and never autoplays", () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    const disconnect = vi.fn();

    window.IntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
      intersectionCallback = callback;
      return {
        disconnect,
        observe: vi.fn(),
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
        root: null,
        rootMargin: "320px 0px",
        thresholds: [0],
      } as IntersectionObserver;
    }) as unknown as typeof IntersectionObserver;

    render(
      <PropertyVideo
        sourceUrl="/property-tour.mp4"
        posterImage="/property-poster.webp"
        ariaLabel="Play the property tour"
      />,
    );

    const video = screen.getByLabelText("Play the property tour");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("poster", "/property-poster.webp");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("src");

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(video).toHaveAttribute("src", "/property-tour.mp4");
    expect(disconnect).toHaveBeenCalled();
  });
});
