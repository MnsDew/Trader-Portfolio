import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouteLanguage } from '@/components/LanguageRoute';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero
    'hero.title': ' Hello! I\'m Aboudi, a Professional Forex Trader',
    'hero.subtitle': 'I\'ll guide you step by step to trade in a practical, real-world way',
    'hero.description': 'Want to learn scalping, account management, and market strategies? Here you\'ll gain the skills to trade with confidence and professionalism',
    'hero.cta1': 'Watch My Trades',
    'hero.cta2': 'Join Telegram',
    
    // About
    'about.title': 'About Me',
    'about.description': 'With over 3 years of experience in Forex trading, I specialize in scalping and swing trading strategies on MT4 and MT5 platforms. My journey started with a passion for financial markets, and today I help thousands of traders worldwide achieve their financial goals.\n\nMy goal is to show you how to learn and profit without falling into the traps of marketers, because this field has a lot of scams.\n\nI focus on accurate analysis, discipline, and achieving tangible results.',
    
    // Journey
    'journey.title': 'Trading Journey',
    'journey.milestone1.title': '2021 - The Beginning',
    'journey.milestone1.desc': 'Started with all losses, zero experience',
    'journey.milestone2.title': '2022 - Learning Phase',
    'journey.milestone2.desc': 'Started learning and began earning',
    'journey.milestone3.title': '2023 - Strategy Focus',
    'journey.milestone3.desc': 'Focused on developing trading strategies',
    'journey.milestone4.title': '2024 - Profit Phase',
    'journey.milestone4.desc': 'Started gaining consistent profits',
    'journey.milestone5.title': '2025 - Expert Level',
    'journey.milestone5.desc': 'Understanding people and becoming an expert',
    
    // Stats
    'stats.experience': 'Years Experience +3',
    'stats.community': '200K+ Community',
    'stats.volume': 'Trading Volume $1.2M',
    'stats.accuracy': 'Accuracy Rate 87%',
    
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
    'footer.rights': 'All rights reserved',
    'footer.owner': 'Aboudy',
    'footer.created': 'Created & Designed & Developed by',
    'footer.developer': 'MANSOOR GABALI',
    'footer.contact': 'Contact Me',
    
    // Trading Expertise
    'expertise.risk.title': 'Risk Management',
    'expertise.risk.desc': 'Strategic position sizing and stop-loss placement to protect capital and maximize returns',
    'expertise.psychology.title': 'Trading Psychology',
    'expertise.psychology.desc': 'Disciplined approach to risk management and emotional control for consistent profitability',
    'expertise.mt4.title': 'MT4 & MT5 Mastery',
    'expertise.mt4.desc': 'Professional trading using MetaTrader platforms with custom indicators and automated strategies',
    'expertise.technical.title': 'Technical Analysis',
    'expertise.technical.desc': 'Expert in chart patterns, indicators, and price action strategies for optimal entry and exit points',
    
    // Live Charts
    'charts.title': 'Live Forex Charts',
    'charts.description': 'Real-time market data and professional TradingView charts to help you make informed trading decisions. All charts display live market prices and movements.',
    'charts.live_indicator': 'Live Market Data',
    'charts.chart_title': 'Live TradingView Chart',
    'charts.live_data': 'Live Data',
    'charts.disclaimer_label': 'Disclaimer:',
    'charts.disclaimer': 'Trading involves high risk and may result in loss of capital. Past performance does not guarantee future results. Always conduct your own research and consider your risk tolerance before making any investment decisions. Consult a financial advisor if necessary.',
    
    // About Highlights
    'about.mt4': 'MT4 & MT5 Expert',
    'about.experience': 'Years Experience +3',
    'about.accuracy': 'Accuracy Rate 87%',
    'about.community': '200K+ Community',
    
    // Navigation
    'nav.about': 'About',
    'nav.journey': 'Journey',
    'nav.services': 'Services',
    'nav.charts': 'Charts',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
  },
  ar: {
    // Hero
'hero.title': 'مرحبا! أنا عبودي — متداول محترف بخبرة عملية حقيقية',
'hero.subtitle': 'متداول علمت نفسي خطوة بخطوة حتى صرت أحوّل السوق لصالحي',
'hero.description': `
رحلتي بدأت بالخسارة، لكني ما استسلمت.
استثمرت وقتي وجهدي في التعلم والتجربة حتى وصلت للاحتراف في مجال التداول، وخاصة السكالبينج.

من الخسارة إلى النجاح — قصة حقيقية عن الجهد، المثابرة، والتطور المستمر.
تابعني لتتعلم كيف تربح بذكاء، وتتعامل مع السوق بثقة.
`,
'hero.cta1': 'شاهد صفقاتي',
    'hero.cta2': 'انضم للتيليجرام',
    
    // About
    'about.title': 'عني',
    'about.description': 'مع أكثر من 3 سنوات من الخبرة في تداول الفوركس، أتخصص في استراتيجيات السكالبينج والتداول المتأرجح على منصات MT4 و MT5. بدأت رحلتي بشغف للأسواق المالية، واليوم أساعد الآلاف من المتداولين حول العالم على تحقيق أهدافهم المالية.\n\nهدفي أفرجيك كيف تتعلم مع ربح بدون ما توقع بفخ المسوقين لان مجال في كتيير نصب.\n\nتركيزنا رح يكون على التحليل الدقيق، الانضباط، وتحقيق نتائج ملموسة.',
    
    // Journey
    'journey.title': 'رحلة التداول',
    'journey.milestone1.title': '2021 - البداية',
    'journey.milestone1.desc': 'بدأت بكل الخسائر، صفر خبرة',
    'journey.milestone2.title': '2022 - مرحلة التعلم',
    'journey.milestone2.desc': 'بدأت التعلم وبدأت أربح',
    'journey.milestone3.title': '2023 - التركيز على الاستراتيجيات',
    'journey.milestone3.desc': 'ركزت على تطوير استراتيجيات التداول',
    'journey.milestone4.title': '2024 - مرحلة الربح',
    'journey.milestone4.desc': 'بدأت أحقق أرباح ثابتة',
    'journey.milestone5.title': '2025 - مستوى الخبير',
    'journey.milestone5.desc': 'فهم الناس وأصبحت خبير',
    
    // Stats
    'stats.experience': 'سنوات الخبرة +3',
    'stats.community': 'متابعون +200 ألف',
    'stats.volume': 'حجم التداول 1.2 مليون دولار',
    'stats.accuracy': 'معدل الدقة 87%',
    
    // Services
    'services.title': 'الخدمات والإرشاد',
    'services.signals.title': 'إشارات التداول',
    'services.signals.desc': 'إشارات تداول يومية مع نقاط الدخول ووقف الخسارة وجني الأرباح',
    'services.mentorship.title': 'إرشادات التداول',
    'services.mentorship.desc': 'أعلّمك الطريق الصحيح للتداول المربح، بدون ما تقع في فخ المسوّقين أو الدورات الوهمية',
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
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.owner': 'عبودي',
    'footer.created': 'تم الإنشاء والتصميم والتطوير بواسطة',
    'footer.developer': 'مُ . منصور جبلي',
    'footer.contact': 'تواصل معي',
    
    // Trading Expertise
    'expertise.risk.title': 'إدارة المخاطر',
    'expertise.risk.desc': 'حجم المراكز الاستراتيجي ووضع وقف الخسارة لحماية رأس المال وتعظيم العوائد',
    'expertise.psychology.title': 'الانضباط في التداول',
    'expertise.psychology.desc': 'نهج منضبط لإدارة المخاطر والتحكم العاطفي لتحقيق ربحية ثابتة',
    'expertise.mt4.title': 'إتقان MT4 و MT5',
    'expertise.mt4.desc': 'التداول الاحترافي باستخدام منصات MetaTrader مع المؤشرات المخصصة والاستراتيجيات الآلية',
    'expertise.technical.title': 'التحليل الفني',
    'expertise.technical.desc': 'خبير في أنماط الرسوم البيانية والمؤشرات واستراتيجيات حركة الأسعار للنقاط المثلى للدخول والخروج',
    
    // Live Charts
    'charts.title': 'رسوم بيانية مباشرة للفوركس',
    'charts.description': 'بيانات السوق في الوقت الفعلي والرسوم البيانية الاحترافية من TradingView لمساعدتك في اتخاذ قرارات تداول مدروسة. جميع الرسوم تعرض أسعار السوق المباشرة والحركات.',
    'charts.live_indicator': 'بيانات السوق المباشرة',
    'charts.chart_title': 'رسم بياني مباشر من TradingView',
    'charts.live_data': 'بيانات مباشرة',
    'charts.disclaimer_label': 'إخلاء المسؤولية:',
    'charts.disclaimer': 'التداول ينطوي على مخاطر عالية وقد يؤدي إلى خسارة رأس المال. الأداء السابق لا يضمن النتائج المستقبلية. قم دائماً بأبحاثك الخاصة واعتبر تحملك للمخاطر قبل اتخاذ أي قرارات استثمارية. استشر مستشاراً مالياً إذا لزم الأمر.',
    
    // About Highlights
    'about.mt4': 'خبير MT4 و MT5',
    'about.experience': 'سنوات الخبرة +3',
    'about.accuracy': 'معدل الدقة 87%',
    'about.community': 'متابعون +200 ألف',
    
    // Navigation
    'nav.about': 'عني',
    'nav.journey': 'الرحلة',
    'nav.services': 'الخدمات',
    'nav.charts': 'الرسوم البيانية',
    'nav.gallery': 'المعرض',
    'nav.contact': 'تواصل',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const routeLanguage = useRouteLanguage();
  const [language, setLanguage] = useState<Language>(routeLanguage);

  useEffect(() => {
    setLanguage(routeLanguage);
  }, [routeLanguage]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    
    // Update URL
    window.history.pushState(null, '', `/${newLanguage}`);
    // Reload to apply new route
    window.location.reload();
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
