import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement[]>([]);

  const videos = Array(6).fill(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = galleryRef.current.filter(Boolean);
      
      // Ensure all cards start visible
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
      
      // Animate them in
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold pb-4">
          {t('gallery.title')}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) galleryRef.current[index] = el;
              }}
              className="aspect-[9/16] premium-card rounded-lg overflow-hidden relative group cursor-pointer transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/60 flex items-center justify-center transition-all duration-500 group-hover:from-primary/60 group-hover:to-primary/80">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30 group-hover:shadow-xl">
                  <Play className="w-8 h-8 text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium">Trading Reel #{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
