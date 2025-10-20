import { useEffect, useRef } from 'react';
import { Shield, Brain, BarChart3, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TradingExpertiseSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const expertiseCards = [
    {
      icon: Shield,
      titleKey: 'expertise.risk.title',
      descKey: 'expertise.risk.desc',
      borderColor: 'border-primary'
    },
    {
      icon: Brain,
      titleKey: 'expertise.psychology.title',
      descKey: 'expertise.psychology.desc',
      borderColor: 'border-primary'
    },
    {
      icon: BarChart3,
      titleKey: 'expertise.mt4.title',
      descKey: 'expertise.mt4.desc',
      borderColor: 'border-primary'
    },
    {
      icon: TrendingUp,
      titleKey: 'expertise.technical.title',
      descKey: 'expertise.technical.desc',
      borderColor: 'border-primary'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      
      // Ensure all cards start visible
      gsap.set(cards, { opacity: 1, y: 0 });
      
      // Animate them in
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`premium-card p-6 rounded-lg group cursor-pointer border-2 ${card.borderColor} hover:scale-105 transition-all duration-300 hover:shadow-premium`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-muted/30 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-forex-profit" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground text-center">
                  {t(card.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-center">
                  {t(card.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
