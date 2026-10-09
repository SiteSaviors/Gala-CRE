import { Navigate, useParams } from "react-router-dom";
import EditorialCapabilityPage from "@/components/site/EditorialCapabilityPage";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { findCapabilityPageContent } from "@/content/capabilityPages";
import {
  capabilityRouteAliases,
  findCapabilityByRoute,
  getCapabilityHref,
} from "@/content/services";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const CapabilityDetail = () => {
  const { slug, capability: capabilitySlug } = useParams();
  useSiteCursor();

  if (!slug || !capabilitySlug) return <NotFound />;

  const requestedPath = `/services/${slug}/${capabilitySlug}`;
  const canonicalAlias = capabilityRouteAliases[requestedPath];
  if (canonicalAlias) return <Navigate to={canonicalAlias} replace />;

  const match = findCapabilityByRoute(slug, capabilitySlug);
  if (!match) return <NotFound />;

  const { service, capability } = match;
  if (capability.destination === "section") {
    return <Navigate to={getCapabilityHref(service.slug, capability)} replace />;
  }

  const editorialContent = findCapabilityPageContent(service.slug, capabilitySlug);
  if (!editorialContent) return <NotFound />;

  return (
    <>
      <PageMeta
        title={editorialContent.metadata.title}
        description={editorialContent.metadata.description}
        image={editorialContent.metadata.image ?? editorialContent.hero.media.src}
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={requestedPath} />
      <EditorialCapabilityPage content={editorialContent} />
      <SiteFooter currentPath={requestedPath} />
    </>
  );
};

export default CapabilityDetail;
