
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="flex justify-center order-2 lg:order-1">
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
              <div className="absolute -bottom-20 sm:-bottom-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 sm:px-4 sm:py-4 rounded-full sm:text-base font-semibold shadow-lg group-hover:shadow-xl transition-all duration-1000 ease-out border-2 border-primary/20 text-xs">
                Professional Trader
              </div>
            </div>
          </div>
          
          <div ref={contentRef} className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-gold pb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {t('about.description')}
            </p>
            
            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-forex-profit rounded-full"></div>
                <span className="text-sm text-foreground font-medium">{t('about.mt4')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-forex-profit rounded-full"></div>
                <span className="text-sm text-foreground font-medium">{t('about.experience')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-forex-profit rounded-full"></div>
                <span className="text-sm text-foreground font-medium">{t('about.accuracy')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-forex-profit rounded-full"></div>
                <span className="text-sm text-foreground font-medium">{t('about.community')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
