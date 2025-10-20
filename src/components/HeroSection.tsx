import { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChartBackground } from './ChartBackground';
import gsap from 'gsap';

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.3 // Add slight delay for better perceived performance
      });
      
      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
      })
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.4')
      .from(ctaRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16">
      <ChartBackground />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 ref={titleRef} className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-gold pb-4 leading-tight">
          {t('hero.title')}
        </h1>
        <p ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl mb-6 text-foreground leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <p ref={descRef} className="text-base sm:text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group shadow-gold">
            <Play className={`h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {t('hero.cta1')}
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group">
            {t('hero.cta2')}
            <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>
      </div>
      
      {/* Floating elements with smoother, slower animations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" 
           style={{ 
             animation: 'float 8s ease-in-out infinite',
             animationDelay: '0s'
           }}></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
           style={{ 
             animation: 'float 12s ease-in-out infinite',
             animationDelay: '3s'
           }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-2xl"
           style={{ 
             animation: 'float 10s ease-in-out infinite reverse',
             animationDelay: '1.5s'
           }}></div>
    </section>
  );
};
