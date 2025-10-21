import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import gsap from 'gsap';

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 3, suffix: '+', labelKey: 'stats.experience', icon: TrendingUp, color: 'text-forex-profit' },
    { value: 200, suffix: 'K+', labelKey: 'stats.community', icon: Users, color: 'text-forex-neutral' },
    { value: 1.2, suffix: 'M', labelKey: 'stats.volume', prefix: '$', icon: DollarSign, color: 'text-gradient-gold' },
    { value: 87, suffix: '%', labelKey: 'stats.accuracy', icon: Target, color: 'text-forex-profit' },
  ];

  useEffect(() => {
    if (inView && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.stat-card');
      
      // Ensure all cards start visible
      gsap.set(cards, { opacity: 1, scale: 1 });
      
      // Animate them in
      gsap.from(cards, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        delay: 0.1,
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="stat-card premium-card p-8 rounded-lg text-center group hover:scale-105 transition-transform duration-300"
                style={{ opacity: inView ? 1 : 0.8 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  {stat.prefix}
                  {inView && <CountUp end={stat.value} duration={2.5} decimals={stat.value % 1 !== 0 ? 1 : 0} />}
                  {!inView && stat.value}
                  {stat.suffix}
                </div>
                <div className="text-foreground text-sm md:text-base font-medium">{t(stat.labelKey)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
