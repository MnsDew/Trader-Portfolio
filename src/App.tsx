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
    
    // Handle initial language from server-side rendering
    const initialLanguage = (window as any).__INITIAL_LANGUAGE__;
    if (initialLanguage && initialLanguage !== window.location.pathname.substring(1)) {
      // Redirect to the correct language route
      window.location.replace(`/${initialLanguage}`);
    }
  }, []);

  // Function to detect user's preferred language
  const detectUserLanguage = () => {
    // Check if there's a server-side language preference
    const initialLanguage = (window as any).__INITIAL_LANGUAGE__;
    if (initialLanguage) {
      return initialLanguage;
    }

    // Get browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Check if Arabic is preferred
    if (browserLang.startsWith('ar')) {
      return 'ar';
    }
    
    // Default to English for all other languages
    return 'en';
  };

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to user's preferred language */}
            <Route path="/" element={<Navigate to={`/${detectUserLanguage()}`} replace />} />
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
