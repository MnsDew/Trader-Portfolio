import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import gsap from 'gsap';

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 5, suffix: '+', label: 'stats.experience' },
    { value: 200, suffix: 'K+', label: 'stats.community' },
    { value: 1.2, suffix: 'M', label: 'stats.volume', prefix: '$' },
    { value: 87, suffix: '%', label: 'stats.accuracy' },
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
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card premium-card p-8 rounded-lg text-center"
              style={{ opacity: inView ? 1 : 0.8 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                {stat.prefix}
                {inView && <CountUp end={stat.value} duration={2.5} decimals={stat.value % 1 !== 0 ? 1 : 0} />}
                {!inView && stat.value}
                {stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{t(stat.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
