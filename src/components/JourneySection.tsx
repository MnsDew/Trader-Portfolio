import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Target, Radio, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const JourneySection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<HTMLDivElement[]>([]);

  const milestones = [
    { icon: TrendingUp, year: '2019', titleKey: 'journey.milestone1.title', descKey: 'journey.milestone1.desc' },
    { icon: Target, year: '2020', titleKey: 'journey.milestone2.title', descKey: 'journey.milestone2.desc' },
    { icon: Radio, year: '2022', titleKey: 'journey.milestone3.title', descKey: 'journey.milestone3.desc' },
    { icon: Users, year: '2024', titleKey: 'journey.milestone4.title', descKey: 'journey.milestone4.desc' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelinesRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold pb-4">
          {t('journey.title')}
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-gold -translate-x-1/2 hidden md:block"></div>
          
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) timelinesRef.current[index] = el;
                }}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                  <div className="premium-card p-6 rounded-lg">
                    <div className="text-primary text-2xl font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t(milestone.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(milestone.descKey)}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="hidden md:block w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
