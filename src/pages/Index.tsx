import { Helmet } from 'react-helmet-async';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { TradingExpertiseSection } from '@/components/TradingExpertiseSection';
import { JourneySection } from '@/components/JourneySection';
import { StatsSection } from '@/components/StatsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { LiveChartsSection } from '@/components/LiveChartsSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SocialWidget } from '@/components/SocialWidget';

// Component for dynamic theme meta tags
const ThemeMetaTags = () => {
  const { theme } = useTheme();
  
  // Dark mode: black bg with light text → use light theme color
  // Light mode: light bg with dark text → use dark theme color
  const themeColor = theme === 'dark' ? '#ffffff' : '#fbfafa';
  
  return (
    <Helmet>
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
    </Helmet>
  );
};

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aboudy",
    "jobTitle": "Professional Forex Trader",
    "description": "Professional Forex Trader with 3+ years experience in MT4 & MT5 platforms, specializing in scalping and swing trading strategies",
    "url": "https://aboudy-trader.com",
    "sameAs": [
      "https://t.me/aboudy_trader",
      "https://instagram.com/aboudy_trader"
    ],
    "knowsAbout": [
      "Forex Trading",
      "Technical Analysis",
      "Scalping",
      "Swing Trading",
      "MT4",
      "MT5"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Forex Trader",
      "occupationLocation": {
        "@type": "Country",
        "name": "Global"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Aboudy - Professional Forex Trader | MT4 & MT5 Expert</title>
        <meta name="description" content="Professional Forex Trader with 5+ years experience. Learn scalping, swing trading, and market strategies with expert guidance. Join 200K+ trading community." />
        <meta name="keywords" content="forex trader, forex signals, MT4, MT5, scalping, swing trading, forex analysis, trading mentorship" />
        <meta name="author" content="Aboudy" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aboudy-trader.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aboudy-trader.com" />
        <meta property="og:title" content="Aboudy - Professional Forex Trader | Expert Trading Signals" />
        <meta property="og:description" content="Professional Forex Trader with 5+ years experience. Learn scalping, swing trading, and market strategies with expert guidance." />
        <meta property="og:image" content="https://aboudy-trader.com/og-image.jpg" />
        <meta property="og:site_name" content="Aboudy Trader" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_SA" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aboudy-trader.com" />
        <meta property="twitter:title" content="Aboudy - Professional Forex Trader | Expert Trading Signals" />
        <meta property="twitter:description" content="Professional Forex Trader with 3+ years experience. Learn scalping, swing trading, and market strategies with expert guidance." />
        <meta property="twitter:image" content="https://aboudy-trader.com/twitter-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <ThemeProvider>
        <LanguageProvider>
          <ThemeMetaTags />
          <Loader />
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <HeroSection />
              <AboutSection />
              <TradingExpertiseSection />
              <JourneySection />
              <StatsSection />
              <ServicesSection />
              <LiveChartsSection />
              <GallerySection />
              <ContactSection />
            </main>
            <Footer />
            <SocialWidget />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
};

export default Index;
