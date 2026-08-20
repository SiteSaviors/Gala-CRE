import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type PageMetaProps = {
  title: string;
  description: string;
  image?: string;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
};

const PageMeta = ({ title, description, image }: PageMetaProps) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = "https://gala-cre.vercel.app";
    const pageUrl = `${siteUrl}${location.pathname}`;
    const shareImage = image
      ? new URL(image, siteUrl).toString()
      : `${siteUrl}/gala-cre-logo.png`;
    const fullTitle = `${title} | Gala CRE Group`;
    document.title = fullTitle;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: pageUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: shareImage });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, [description, image, location.pathname, title]);

  return null;
};

export default PageMeta;
