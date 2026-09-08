import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Careers from "@/pages/Careers";
import PageMeta from "@/components/site/PageMeta";

describe("launch accessibility and metadata", () => {
  it("provides a keyboard skip link with a real main-content target", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/careers"]}>
        <Careers />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
    expect(container.querySelector("main#main-content")).toHaveAttribute("tabindex", "-1");
  });

  it("sets canonical, Open Graph, and Twitter metadata per route", async () => {
    render(
      <MemoryRouter initialEntries={["/investors/1031-exchange?source=footer"]}>
        <PageMeta title="1031 Exchange Replacement Property Sourcing" description="Focused investor sourcing." />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe("1031 Exchange Replacement Property Sourcing | Gala CRE Group");
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://gala-cre.vercel.app/investors/1031-exchange",
      );
      expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
        "content",
        "1031 Exchange Replacement Property Sourcing | Gala CRE Group",
      );
      expect(document.head.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
        "content",
        "Focused investor sourcing.",
      );
      expect(document.head.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        "https://gala-cre.vercel.app/gala-cre-logo.png",
      );
    });
  });
});
