import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { JourneySection } from '@/components/JourneySection';
import { StatsSection } from '@/components/StatsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SocialWidget } from '@/components/SocialWidget';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Loader />
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <JourneySection />
            <StatsSection />
            <ServicesSection />
            <GallerySection />
            <ContactSection />
          </main>
          <Footer />
          <SocialWidget />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
