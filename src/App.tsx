import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollManager from "@/components/site/ScrollManager";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const CapabilityDetail = lazy(() => import("./pages/CapabilityDetail.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const Company = lazy(() => import("./pages/Company.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const ExchangeSourcing = lazy(() => import("./pages/ExchangeSourcing.tsx"));
const LegacyProjectRedirect = lazy(() => import("./pages/LegacyProjectRedirect.tsx"));
const News = lazy(() => import("./pages/News.tsx"));
const Properties = lazy(() => import("./pages/Properties.tsx"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail.tsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.tsx"));
const Team = lazy(() => import("./pages/Team.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="gala-route-fallback" role="status" aria-live="polite">
    <span aria-hidden="true"></span>
    <span className="sr-only">Loading page</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/what-we-do" element={<Navigate to="/#services" replace />} />
            <Route path="/projects" element={<Navigate to="/properties" replace />} />
            <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
