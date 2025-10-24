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
    'hero.title': 'Hello! I\'m Aboudy — Professional Forex Trader',
    'hero.subtitle': 'Self-taught trader who turned the market to my advantage',
    'hero.description': 'From losses to success — 3+ years of real trading experience. I help thousands of traders worldwide with proven strategies and honest guidance.',
    'hero.cta1': 'Watch My Trades',
    'hero.cta2': 'Join Telegram',
    
    // About
    'about.title': 'About Me',
    'about.experience': '3+ years of Forex trading experience',
    'about.specialization.title': 'I specialize in',
    'about.specialization.scalping': 'Scalping and swing trading',
    'about.specialization.platforms': 'MT4 and MT5 platforms',
    'about.specialization.risk': 'Advanced risk management',
    'about.community': 'I help 200K+ traders worldwide',
    'about.focus.title': 'My main focus',
    'about.focus.analysis': 'Accurate analysis',
    'about.focus.management': 'Risk management',
    'about.focus.results': 'Sustainable results',
    'about.promise': 'No false promises — just proven methods',
    'about.mt4': 'MT4 & MT5 Expert',
    'about.accuracy': 'Accuracy Rate 87%',
    
    // Journey
    'journey.title': 'Trading Journey',
    'journey.milestone1.title': '2021 - The Difficult Beginning',
    'journey.milestone1.desc': 'Lost all initial capital, zero experience, painful but necessary start',
    'journey.milestone2.title': '2022 - Deep Learning Phase',
    'journey.milestone2.desc': 'Invested in real courses, started understanding the market, first small profits',
    'journey.milestone3.title': '2023 - Strategy Development',
    'journey.milestone3.desc': 'Developed my own scalping strategies, focused on risk management',
    'journey.milestone4.title': '2024 - Professional Phase',
    'journey.milestone4.desc': 'Consistent and stable profits, started sharing knowledge with others',
    'journey.milestone5.title': '2025 - Expert Level',
    'journey.milestone5.desc': 'Managing portfolios worth $1M+, community of 200K traders, guaranteed results',
    
    // Stats
    'stats.experience': 'Years Experience +3',
    'stats.community': '200K+ Community',
    'stats.volume': 'Trading Volume $1.2M',
    'stats.accuracy': 'Accuracy Rate 87%',
    
    // Services
    'services.title': 'Specialized Services & Mentorship',
    'services.subtitle': 'Elevate your trading journey with professional guidance',
    'services.signals.title': 'Guaranteed Trading Signals',
    'services.signals.desc': 'Daily well-researched trading signals with precise entry points, stop-loss, and take-profit levels, 87% success rate',
    'services.signals.badge': 'Most Popular',
    'services.trading.title': 'The Right Path to Profitable and Sustainable Trading',
    'services.trading.desc': 'I guide you to the right path to profitable and sustainable trading, without falling into the traps of marketers or fake courses. Learn from my real experience',
    'services.trading.badge': 'Personalized',
    'services.account.title': 'Professional Portfolio Management',
    'services.account.desc': 'Professional and specialized management of your trading accounts with real guarantees and complete transparency',
    'services.account.badge': 'Professional',
    'services.analysis.title': 'Advanced Technical Analysis',
    'services.analysis.desc': 'In-depth technical and fundamental market analysis with accurate predictions and profitable trading opportunities',
    'services.analysis.badge': 'Daily Updates',
    
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
    'about.experience.short': 'Years Experience +3',
    'about.community.short': '200K+ Community',
    
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
'hero.title': 'مرحبا! أنا عبودي — متداول فوركس محترف',
'hero.subtitle': 'متداول علمت نفسي خطوة بخطوة حتى صرت أحوّل السوق لصالحي',
'hero.description': 'من الخسارة إلى النجاح — أكثر من 3 سنوات من الخبرة. أساعد آلاف المتداولين حول العالم باستراتيجيات مثبتة وإرشاد صادق.',
'hero.cta1': 'شاهد صفقاتي',
    'hero.cta2': 'انضم للتيليجرام',
    
    // About
    'about.title': 'عني',
    'about.experience': 'أكثر من 3 سنوات من الخبرة في تداول الفوركس',
    'about.specialization.title': 'أتخصص في',
    'about.specialization.scalping': 'السكالبينج والتداول المتأرجح',
    'about.specialization.platforms': 'منصات MT4 و MT5',
    'about.specialization.risk': 'إدارة المخاطر المتقدمة',
    'about.community': 'أساعد 200 ألف+ متداول حول العالم',
    'about.focus.title': 'تركيزي الأساسي',
    'about.focus.analysis': 'التحليل الدقيق',
    'about.focus.management': 'إدارة المخاطر',
    'about.focus.results': 'النتائج المستدامة',
    'about.promise': 'لا وعود كاذبة — فقط طرق مثبتة',
    
    // Journey
    'journey.title': 'رحلة التداول',
    'journey.milestone1.title': '2021 - البداية الصعبة',
    'journey.milestone1.desc': 'خسرت كل رأس المال الأولي، صفر خبرة، بداية مؤلمة لكنها ضرورية',
    'journey.milestone2.title': '2022 - مرحلة التعلم العميق',
    'journey.milestone2.desc': 'استثمرت في الدورات الحقيقية، بدأت أفهم السوق، أول أرباح صغيرة',
    'journey.milestone3.title': '2023 - تطوير الاستراتيجيات',
    'journey.milestone3.desc': 'طورت استراتيجيات السكالبينج الخاصة بي، ركزت على إدارة المخاطر',
    'journey.milestone4.title': '2024 - مرحلة الاحتراف',
    'journey.milestone4.desc': 'أرباح ثابتة ومستقرة، بدأت أشارك معرفتي مع الآخرين',
    'journey.milestone5.title': '2025 - مستوى الخبير',
    'journey.milestone5.desc': 'إدارة محافظ بقيمة مليون+ دولار، مجتمع 200 ألف متداول، نتائج مضمونة',
    
    // Stats
    'stats.experience': 'سنوات الخبرة +3',
    'stats.community': 'متابعون +200 ألف',
    'stats.volume': 'حجم التداول 1.2 مليون دولار',
    'stats.accuracy': 'معدل الدقة 87%',
    
    // Services
    'services.title': 'الخدمات',
    'services.subtitle': 'ارتق برحلة التداول الخاصة بك مع الإرشاد المهني',
    'services.signals.title': 'إشارات التداول المضمونة',
    'services.signals.desc': 'إشارات تداول يومية مدروسة مع نقاط الدخول الدقيقة ووقف الخسارة وجني الأرباح، معدل نجاح 87%',
    'services.signals.badge': 'الأكثر شعبية',
    'services.trading.title': 'الاستثمار أو التداول لك',
    'services.trading.desc': 'أعلمك الطريق الصحيح للتداول المربح والمستدام، بدون الوقوع في فخ المسوقين أو الدورات الوهمية. تعلم من تجربتي الحقيقية',
    'services.trading.badge': 'شخصي',
    'services.account.title': 'إدارة المحافظ الاحترافية',
    'services.account.desc': 'إدارة احترافية ومتخصصة لحسابات التداول الخاصة بك مع ضمانات حقيقية وشفافية كاملة',
    'services.account.badge': 'احترافي',
    'services.analysis.title': 'التحليل الفني المتقدم',
    'services.analysis.desc': 'تحليل فني وأساسي متعمق للسوق مع توقعات دقيقة وفرص تداول مربحة',
    'services.analysis.badge': 'تحديثات يومية',
    
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
    'about.experience.short': 'سنوات الخبرة +3',
    'about.accuracy': 'معدل الدقة 87%',
    'about.community.short': 'متابعون +200 ألف',
    
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
    
    // Update URL without reload
    window.history.pushState(null, '', `/${newLanguage}`);
    // Reload to apply new route
   // window.location.reload();
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
