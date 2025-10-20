import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageRoute } from "./components/LanguageRoute";
import { fixMobileViewport, fixInitialMobileLoad } from "./utils/viewportFix";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Fix mobile viewport issues
    fixInitialMobileLoad();
    fixMobileViewport();
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to Arabic by default */}
            <Route path="/" element={<Navigate to="/ar" replace />} />
            {/* Arabic route */}
            <Route path="/ar" element={
              <LanguageRoute language="ar">
                <Index />
              </LanguageRoute>
            } />
            {/* English route */}
            <Route path="/en" element={
              <LanguageRoute language="en">
                <Index />
              </LanguageRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
