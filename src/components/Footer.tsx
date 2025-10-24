import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const message = encodeURIComponent("Hello Mansoor! I browsed your forex website and I want to hire you as a developer. Can you help me build a similar professional trading website?");
  const waLink = `https://wa.me/905354477762?text=${message}`;

  return (
    <footer className="bg-gradient-to-br from-background via-card to-muted/20 border-t border-border py-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/no-bg-gold.png" 
              alt="Aboudy - Professional Forex Trader" 
              className="h-24 w-24 object-contain"
            />
            {/* <span className="text-lg font-bold text-gradient-gold">Aboudy</span> */}
          </div>

          {/* Rights Reserved - Website Owner */}
          <p className="text-muted-foreground text-sm">
            © 2025 {t('footer.owner')}. {t('footer.rights')}
          </p>

          {/* Developer Credit */}
          <p className="text-muted-foreground text-xs">
            {t('footer.created')}{' '}
            <a
              href="https://www.linkedin.com/in/mg-mns-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-medium transition-colors"
            >
              {t('footer.developer')}
            </a>
          </p>

          {/* Subtle WhatsApp Contact Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded hover:bg-muted/50 transition-colors mt-2 gap-1 opacity-60 hover:opacity-100"
          >
            <MessageCircle className="w-2 h-2" />
            {t('footer.contact')}
          </a>
        </div>
      </div>
    </footer>
  );
};
