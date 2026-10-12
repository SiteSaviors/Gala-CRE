import { Navigate, useParams } from "react-router-dom";
import IndustrialInvestmentSalesPage from "@/components/services/IndustrialInvestmentSalesPage";
import LandInvestmentSalesPage from "@/components/services/LandInvestmentSalesPage";
import MultifamilyInvestmentSalesPage from "@/components/services/MultifamilyInvestmentSalesPage";
import OfficeInvestmentSalesPage from "@/components/services/OfficeInvestmentSalesPage";
import RetailInvestmentSalesPage from "@/components/services/RetailInvestmentSalesPage";
import ServiceChapterPage from "@/components/services/ServiceChapterPage";
import EditorialCapabilityPage from "@/components/site/EditorialCapabilityPage";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { findCapabilityPageContent } from "@/content/capabilityPages";
import { findServiceChapterPage } from "@/content/serviceChapterPages";
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

  const chapterContent = findServiceChapterPage(requestedPath);
  const editorialContent = findCapabilityPageContent(service.slug, capabilitySlug);
  if (!chapterContent && !editorialContent) return <NotFound />;
  const isIndustrialInvestmentSales = requestedPath === "/services/investment-sales/industrial";
  const isMultifamilyInvestmentSales = requestedPath === "/services/investment-sales/multifamily";
  const isRetailInvestmentSales = requestedPath === "/services/investment-sales/retail";
  const isOfficeInvestmentSales = requestedPath === "/services/investment-sales/office";
  const isLandInvestmentSales = requestedPath === "/services/investment-sales/land";

  return (
    <>
      <PageMeta
        title={(chapterContent ?? editorialContent).metadata.title}
        description={(chapterContent ?? editorialContent).metadata.description}
        image={(chapterContent ?? editorialContent).metadata.image ?? (chapterContent ?? editorialContent).hero.media.src}
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={requestedPath} />
      {chapterContent ? (
        <ServiceChapterPage content={chapterContent} />
      ) : isIndustrialInvestmentSales ? (
        <IndustrialInvestmentSalesPage />
      ) : isMultifamilyInvestmentSales ? (
        <MultifamilyInvestmentSalesPage />
      ) : isRetailInvestmentSales ? (
        <RetailInvestmentSalesPage />
      ) : isOfficeInvestmentSales ? (
        <OfficeInvestmentSalesPage />
      ) : isLandInvestmentSales ? (
        <LandInvestmentSalesPage />
      ) : (
        <EditorialCapabilityPage content={editorialContent} />
      )}
      <SiteFooter currentPath={requestedPath} />
    </>
  );
};

export default CapabilityDetail;
