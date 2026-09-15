import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import ScrollManager from "@/components/site/ScrollManager";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CapabilityDetail from "./pages/CapabilityDetail.tsx";
import Careers from "./pages/Careers.tsx";
import Company from "./pages/Company.tsx";
import Contact from "./pages/Contact.tsx";
import ExchangeSourcing from "./pages/ExchangeSourcing.tsx";
import News from "./pages/News.tsx";
import Properties from "./pages/Properties.tsx";
import PropertyDetail from "./pages/PropertyDetail.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Services from "./pages/Services.tsx";
import Team from "./pages/Team.tsx";
import { propertyBySlug } from "./content/properties.ts";

const queryClient = new QueryClient();

export const LegacyProjectRedirect = () => {
  const { slug } = useParams();
  const destination = slug && propertyBySlug[slug] ? `/properties/${slug}` : "/properties";
  return <Navigate to={destination} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/services/:slug/:capability" element={<CapabilityDetail />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/company" element={<Company />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/investors/1031-exchange" element={<ExchangeSourcing />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/what-we-do" element={<Navigate to="/services" replace />} />
          <Route path="/projects" element={<Navigate to="/properties" replace />} />
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
