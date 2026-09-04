import { useEffect, useRef } from "react";
import CapabilityPageHero from "@/components/site/CapabilityPageHero";
import {
  CapabilityPageCta,
  CapabilitySectionRenderer,
  RelatedCapabilityNavigation,
} from "@/components/site/CapabilityPageSections";
import type { CapabilityPageContent } from "@/content/capabilityPages";
import "@/styles/capability-page.css";

type EditorialCapabilityPageProps = {
  content: CapabilityPageContent;
};

const EditorialCapabilityPage = ({ content }: EditorialCapabilityPageProps) => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const items = page.querySelectorAll<HTMLElement>("[data-capability-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -52px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content.path]);

  return (
    <main className="gala-cap-page" ref={pageRef}>
      <CapabilityPageHero hero={content.hero} parent={content.parent} />
      {content.sections.map((section, index) => (
        <CapabilitySectionRenderer
          section={section}
          key={`${section.type}-${section.type === "process" ? section.id ?? index : index}`}
        />
      ))}
      <RelatedCapabilityNavigation content={content.relatedCapabilities} />
      <CapabilityPageCta content={content.cta} />
    </main>
  );
};

export default EditorialCapabilityPage;
