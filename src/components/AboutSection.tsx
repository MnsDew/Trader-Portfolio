
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Zap, Target, Globe, BarChart3, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Dynamic text alignment based on language
  const getTextAlignment = () => {
    return language === 'ar' ? 'text-right' : 'text-left';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 2.5,
        ease: 'power2.out',
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.out',
        delay: 0.8,
      });

      // Cards are now visible by default - no initial hiding animation
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="flex justify-center order-2 lg:order-1 mt-8 lg:mt-12">
            <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] group">
              {/* Outer glow ring */}
              <div className="absolute inset-6 bg-gradient-gold rounded-full animate-glow group-hover:scale-105 transition-all duration-1000 ease-out opacity-80"></div>
              
              {/* Inner glow ring for depth */}
              <div className="absolute inset-2 bg-gradient-gold rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
              
              {/* Image container with more padding for comfort */}
              <div className="absolute inset-6 bg-card rounded-full overflow-hidden shadow-premium group-hover:shadow-gold transition-all duration-1000 ease-out">
                {!imageError ? (
                  <img 
                    src="/higherPIC.png" 
                    alt="Aboudy - Professional Forex Trader" 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-1000 ease-out"
                    loading="lazy"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-muted/50">
                    <User className="w-32 h-32 text-primary" />
                  </div>
                )}
              </div>
              
              {/* Professional badge - better mobile positioning */}
              <div className="absolute -bottom-20 sm:-bottom-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 sm:px-4 sm:py-4 rounded-full sm:text-base font-semibold shadow-lg group-hover:shadow-xl transition-all duration-1000 ease-out border-2 border-primary/20 text-xs whitespace-nowrap">
                Professional Trader
              </div>
            </div>
          </div>
          
          <div ref={contentRef} className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-gold pb-4 text-center">
              {t('about.title')}
            </h2>
            <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {/* Experience Card */}
              <div className="card-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 ${getTextAlignment()}`}>
                        {t('about.experience')}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialization Card */}
              <div className="card-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 ${getTextAlignment()}`}>
                        {t('about.specialization.title')}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 ml-22">
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.specialization.scalping')}</span>
                    </div>
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.specialization.platforms')}</span>
                    </div>
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.specialization.risk')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Card */}
              <div className="card-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Globe className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 ${getTextAlignment()}`}>
                        {t('about.community')}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus Card */}
              <div className="card-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 ${getTextAlignment()}`}>
                        {t('about.focus.title')}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 ml-22">
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.focus.analysis')}</span>
                    </div>
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.focus.management')}</span>
                    </div>
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <span className={`text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ${getTextAlignment()}`}>{t('about.focus.results')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promise Card - Special Highlight */}
              <div className="card-item group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border-2 border-primary/30 hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-500 ${getTextAlignment()}`}>
                        {t('about.promise')}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key highlights - Luxury Mini Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                  <span className={`text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ${getTextAlignment()}`}>{t('about.mt4')}</span>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                  <span className={`text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ${getTextAlignment()}`}>{t('about.accuracy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
