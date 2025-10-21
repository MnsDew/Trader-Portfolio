import { Moon, Sun, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'journey', label: t('nav.journey') },
    { id: 'services', label: t('nav.services') },
    { id: 'charts', label: t('nav.charts') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-background/95 border-b border-primary/20 shadow-lg' 
        : 'backdrop-blur-lg bg-background/80 border-b border-border'
    }`}>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <img 
            src="/no-bg-gold.png" 
            alt="Aboudy - Professional Forex Trader" 
            className="h-12 w-10 object-contain"
          />
          <span className="text-lg font-bold text-gradient-gold">Aboudy</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="bg-card hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-primary group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="h-5 w-5 text-primary group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </Button>
          
          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleLanguage}
            className="bg-card hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 group px-3 py-2"
          >
            <Globe className="h-4 w-4 mr-2 text-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xs font-medium text-primary">{language.toUpperCase()}</span>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-primary/10 transition-all duration-300 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </Button>
        </div>
      </nav>
      
      {/* Enhanced Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-background/98 backdrop-blur-xl border-b border-primary/20 shadow-xl">
          <div className="container mx-auto px-4 py-6 space-y-1">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
