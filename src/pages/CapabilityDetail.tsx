import { Navigate, useParams } from "react-router-dom";
import { findCapabilityByRoute, getCapabilityHref } from "@/content/services";
import NotFound from "./NotFound";

const CapabilityDetail = () => {
  const { slug, capability: capabilitySlug } = useParams();
  const match = slug && capabilitySlug ? findCapabilityByRoute(slug, capabilitySlug) : undefined;
  if (!match) return <NotFound />;

  const { service, capability } = match;
  return <Navigate to={getCapabilityHref(service.slug, capability.label)} replace />;
};

export default CapabilityDetail;
