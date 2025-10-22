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

  // Real trading videos - 3 reels only
  const videos = [
    {
      "id": 1,
      "title": "Live Forex Scalping EUR/USD Using MT5",
      "description": "Real scalping session on EUR/USD showing trade entries and exits with technical setups.",
      "thumbnail": "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=1200&q=80",
      "url": "https://youtu.be/fPERzHyuQGo?si=-JCBBg48VXXT7Xv_"
    },
    {
      "id": 2,
      "title": "Forex Risk Management Strategy Explained",
      "description": "Learn how to manage position sizes, stop losses, and risk-to-reward ratios effectively.",
      "thumbnail": "https://images.pexels.com/photos/6120182/pexels-photo-6120182.jpeg",
      "url": "https://youtu.be/jo4z26THnpo?si=XUwqSTh5xzLwRYSh"
    },
    {
      "id": 3,
      "title": "Daily Market Analysis – Gold, EUR/USD, GBP/USD",
      "description": "A daily breakdown of Forex market movements and technical patterns for key pairs.",
      "thumbnail": "https://images.pexels.com/photos/30572289/pexels-photo-30572289.jpeg",
      "url": "https://youtu.be/gS0kIOsDw7k?si=22gGSuVanzKrnpdx"
    },
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => {
                if (el) galleryRef.current[index] = el;
              }}
              className="aspect-[9/16] premium-card rounded-lg overflow-hidden relative group cursor-pointer transform-gpu"
              onClick={() => window.open(video.url, '_blank')}
            >
              {/* Video Thumbnail */}
              <div className="absolute inset-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/10 group-hover:to-black/30 transition-all duration-500" />
              </div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30 group-hover:shadow-xl">
                  <Play className="w-8 h-8 text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              
              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-sm font-semibold mb-1">{video.title}</h3>
                <p className="text-white/80 text-xs">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
