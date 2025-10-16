import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Signal, GraduationCap, Briefcase, BarChart3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const services = [
    { icon: Signal, titleKey: 'services.signals.title', descKey: 'services.signals.desc', color: 'bg-primary' },
    { icon: GraduationCap, titleKey: 'services.mentorship.title', descKey: 'services.mentorship.desc', color: 'bg-primary/80' },
    { icon: Briefcase, titleKey: 'services.account.title', descKey: 'services.account.desc', color: 'bg-primary/90' },
    { icon: BarChart3, titleKey: 'services.analysis.title', descKey: 'services.analysis.desc', color: 'bg-primary/70' },
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
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold pb-4">
          {t('services.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="premium-card p-6 rounded-lg group cursor-pointer"
              >
                <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t(service.titleKey)}</h3>
                <p className="text-muted-foreground">{t(service.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
