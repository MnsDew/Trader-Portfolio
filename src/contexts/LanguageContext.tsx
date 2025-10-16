import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero
    'hero.title': 'Hello, I am Aboudy',
    'hero.subtitle': 'Professional Forex Trader | MT4 & MT5 Expert | +5 Years Experience',
    'hero.description': 'Helping traders achieve consistent profits through proven strategies and expert guidance',
    'hero.cta1': 'Watch My Trades',
    'hero.cta2': 'Join Telegram',
    
    // About
    'about.title': 'About Me',
    'about.description': 'With over 5 years of experience in Forex trading, I specialize in scalping and swing trading strategies on MT4 and MT5 platforms. My journey started with a passion for financial markets, and today I help thousands of traders worldwide achieve their financial goals.',
    
    // Journey
    'journey.title': 'Trading Journey',
    'journey.milestone1.title': 'Started Trading',
    'journey.milestone1.desc': 'Began my journey in Forex markets',
    'journey.milestone2.title': 'First Profitable Year',
    'journey.milestone2.desc': 'Achieved consistent profitability',
    'journey.milestone3.title': 'Launched Signals',
    'journey.milestone3.desc': 'Started sharing trading signals',
    'journey.milestone4.title': 'Community Growth',
    'journey.milestone4.desc': 'Built a community of 200K+ traders',
    
    // Stats
    'stats.experience': 'Years Experience',
    'stats.community': 'Community Members',
    'stats.volume': 'Trading Volume',
    'stats.accuracy': 'Signal Accuracy',
    
    // Services
    'services.title': 'Services & Mentorship',
    'services.signals.title': 'Trading Signals',
    'services.signals.desc': 'Daily trading signals with entry, stop-loss, and take-profit levels',
    'services.mentorship.title': '1-on-1 Mentorship',
    'services.mentorship.desc': 'Personalized coaching to improve your trading skills',
    'services.account.title': 'Account Management',
    'services.account.desc': 'Professional management of your trading accounts',
    'services.analysis.title': 'Market Analysis',
    'services.analysis.desc': 'In-depth technical and fundamental market analysis',
    
    // Gallery
    'gallery.title': 'Reels & Content',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully!',
    
    // Footer
    'footer.follow': 'Follow Me',
    'footer.rights': '© 2025 Created by MANSOOR | MnsDew. All rights reserved.',
    
    // Navigation
    'nav.about': 'About',
    'nav.journey': 'Journey',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
  },
  ar: {
    // Hero
    'hero.title': ' مرحبا ! انا عبودي',
    'hero.subtitle': 'محترف تداول فوركس | خبير MT4 و MT5 | +5 سنوات خبرة',
    'hero.description': 'مساعدة المتداولين على تحقيق أرباح ثابتة من خلال استراتيجيات مثبتة وتوجيه خبير',
    'hero.cta1': 'شاهد صفقاتي',
    'hero.cta2': 'انضم للتيليجرام',
    
    // About
    'about.title': 'عني',
    'about.description': 'مع أكثر من 5 سنوات من الخبرة في تداول الفوركس، أتخصص في استراتيجيات السكالبينج والتداول المتأرجح على منصات MT4 و MT5. بدأت رحلتي بشغف للأسواق المالية، واليوم أساعد الآلاف من المتداولين حول العالم على تحقيق أهدافهم المالية.',
    
    // Journey
    'journey.title': 'رحلة التداول',
    'journey.milestone1.title': 'بدأت التداول',
    'journey.milestone1.desc': 'بدأت رحلتي في أسواق الفوركس',
    'journey.milestone2.title': 'أول عام مربح',
    'journey.milestone2.desc': 'حققت ربحية ثابتة',
    'journey.milestone3.title': 'إطلاق الإشارات',
    'journey.milestone3.desc': 'بدأت مشاركة إشارات التداول',
    'journey.milestone4.title': 'نمو المجتمع',
    'journey.milestone4.desc': 'بناء مجتمع من +200 ألف متداول',
    
    // Stats
    'stats.experience': 'سنوات الخبرة',
    'stats.community': 'أعضاء المجتمع',
    'stats.volume': 'حجم التداول',
    'stats.accuracy': 'دقة الإشارات',
    
    // Services
    'services.title': 'الخدمات والإرشاد',
    'services.signals.title': 'إشارات التداول',
    'services.signals.desc': 'إشارات تداول يومية مع نقاط الدخول ووقف الخسارة وجني الأرباح',
    'services.mentorship.title': 'إرشاد فردي',
    'services.mentorship.desc': 'تدريب شخصي لتحسين مهاراتك في التداول',
    'services.account.title': 'إدارة الحسابات',
    'services.account.desc': 'إدارة احترافية لحسابات التداول الخاصة بك',
    'services.analysis.title': 'تحليل السوق',
    'services.analysis.desc': 'تحليل فني وأساسي متعمق للسوق',
    
    // Gallery
    'gallery.title': 'الفيديوهات والمحتوى',
    
    // Contact
    'contact.title': 'تواصل معي',
    'contact.name': 'اسمك',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'رسالتك',
    'contact.submit': 'إرسال الرسالة',
    'contact.success': 'تم إرسال الرسالة بنجاح!',
    
    // Footer
    'footer.follow': 'تابعني',
    'footer.rights': '© 2025 تم الإنشاء بواسطة منصور | MnsDew. جميع الحقوق محفوظة.',
    
    // Navigation
    'nav.about': 'عني',
    'nav.journey': 'الرحلة',
    'nav.services': 'الخدمات',
    'nav.gallery': 'المعرض',
    'nav.contact': 'تواصل',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'en' ? 'ar' : 'en';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
