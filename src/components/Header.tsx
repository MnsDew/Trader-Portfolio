import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient-gold">FX Trader</div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('about')} className="animate-underline hover:text-primary transition-colors">
            {t('nav.about')}
          </button>
          <button onClick={() => scrollToSection('journey')} className="animate-underline hover:text-primary transition-colors">
            {t('nav.journey')}
          </button>
          <button onClick={() => scrollToSection('services')} className="animate-underline hover:text-primary transition-colors">
            {t('nav.services')}
          </button>
          <button onClick={() => scrollToSection('gallery')} className="animate-underline hover:text-primary transition-colors">
            {t('nav.gallery')}
          </button>
          <button onClick={() => scrollToSection('contact')} className="animate-underline hover:text-primary transition-colors">
            {t('nav.contact')}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <Globe className="h-5 w-5" />
            <span className="ml-1 text-xs">{language.toUpperCase()}</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};
