import { Navigate, useParams } from "react-router-dom";
import { propertyBySlug } from "@/content/properties";

export const LegacyProjectRedirect = () => {
  const { slug } = useParams();
  const destination = slug && propertyBySlug[slug] ? `/properties/${slug}` : "/properties";
  return <Navigate to={destination} replace />;
};

export default LegacyProjectRedirect;
