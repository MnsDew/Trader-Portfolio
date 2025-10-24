import { useEffect, useRef, useState } from 'react';
import { Signal, GraduationCap, Briefcase, BarChart3, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    { 
      icon: Signal, 
      titleKey: 'services.signals.title', 
      descKey: 'services.signals.desc', 
      badgeKey: 'services.signals.badge',
      gradient: 'from-[#c88635] to-[#b8752a]' // Brand color gradient
    },
    { 
      icon: GraduationCap, 
      titleKey: 'services.trading.title', 
      descKey: 'services.trading.desc', 
      badgeKey: 'services.trading.badge',
      gradient: 'from-[#c88635] to-[#d49740]' // Brand color gradient - lighter
    },
    { 
      icon: Briefcase, 
      titleKey: 'services.account.title', 
      descKey: 'services.account.desc', 
      badgeKey: 'services.account.badge',
      gradient: 'from-[#c88635] to-[#a66b28]' // Brand color gradient - darker
    },
    { 
      icon: BarChart3, 
      titleKey: 'services.analysis.title', 
      descKey: 'services.analysis.desc', 
      badgeKey: 'services.analysis.badge',
      gradient: 'from-[#c88635] to-[#e5a84a]' // Brand color gradient - lighter
    },
  ];


  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 pb-7 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-10 text-sm font-medium text-primary">
            {/* <Sparkles className="w-4 h-4" /> */}
            {/* <span>What We Offer</span> */}
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#c88635] via-[#d49740] to-[#e5a84a] bg-clip-text text-transparent pb-2 font-['Advent_Pro']">
            {t('services.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        {/* Services Grid */}
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <div
                  key={index}
                  className="group"
                >
                  <div className="relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-primary/10 hover:border-primary/40 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 h-full">
                    
                    {/* Icon with animated gradient background */}
                    <div className="relative mb-6 flex justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>

                     {/* Badge separated from icon */}
                     <div className="flex justify-center mb-4">
                       <div className="px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full text-xs font-bold text-primary border border-primary/20 backdrop-blur-sm">
                         {t(service.badgeKey)}
                       </div>
                     </div>

                    {/* Content */}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300 font-['Advent_Pro']">
                        {t(service.titleKey)}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t(service.descKey)}
                      </p>
                    </div>

                    {/* Service number */}
                    <div className="mt-6 flex items-center justify-center">
                      <span className={`w-8 h-8 bg-gradient-to-br ${service.gradient} text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm`}>
                        {index + 1}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scrolling Video Loop */}
        <div className="mt-20 relative">
          <div className="overflow-hidden relative group">
            {/* Gradient fade effects for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
            
            {/* Subtle shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
            
            <div className="flex animate-scroll-horizontal-smooth" style={{ width: '400%' }}>
              {/* Video content that scrolls horizontally */}
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#c88635]/10 via-[#c88635]/20 to-[#c88635]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#c88635] mb-2 font-['Advent_Pro']">Live Trading Sessions</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Watch real-time trading analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#b8752a]/10 via-[#b8752a]/20 to-[#b8752a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#b8752a] mb-2 font-['Advent_Pro']">Market Analysis</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Daily technical analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#d49740]/10 via-[#d49740]/20 to-[#d49740]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#d49740] mb-2 font-['Advent_Pro']">Trading Signals</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">87% accuracy rate</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#a66b28]/10 via-[#a66b28]/20 to-[#a66b28]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#a66b28] mb-2 font-['Advent_Pro']">Risk Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Position sizing strategies</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#e5a84a]/10 via-[#e5a84a]/20 to-[#e5a84a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#e5a84a] mb-2 font-['Advent_Pro']">Portfolio Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Professional services</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#c88635]/10 via-[#c88635]/20 to-[#c88635]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#c88635] mb-2 font-['Advent_Pro']">Forex Expert</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Expert guidance</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#b8752a]/10 via-[#b8752a]/20 to-[#b8752a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#b8752a] mb-2 font-['Advent_Pro']">MT4/MT5</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Platform mastery</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#d49740]/10 via-[#d49740]/20 to-[#d49740]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#d49740] mb-2 font-['Advent_Pro']">Scalping</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Quick profits</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#a66b28]/10 via-[#a66b28]/20 to-[#a66b28]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#a66b28] mb-2 font-['Advent_Pro']">Swing Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Long-term gains</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#e5a84a]/10 via-[#e5a84a]/20 to-[#e5a84a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#e5a84a] mb-2 font-['Advent_Pro']">News Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Market events</p>
                </div>
              </div>
              {/* Duplicate for seamless continuous flow */}
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Live Trading Sessions</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Watch real-time trading analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#b8752a]/10 via-[#b8752a]/20 to-[#b8752a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#b8752a] mb-2 font-['Advent_Pro']">Market Analysis</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Daily technical analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#d49740]/10 via-[#d49740]/20 to-[#d49740]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#d49740] mb-2 font-['Advent_Pro']">Trading Signals</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">87% accuracy rate</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#a66b28]/10 via-[#a66b28]/20 to-[#a66b28]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#a66b28] mb-2 font-['Advent_Pro']">Risk Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Position sizing strategies</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#e5a84a]/10 via-[#e5a84a]/20 to-[#e5a84a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#e5a84a] mb-2 font-['Advent_Pro']">Portfolio Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Professional services</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#c88635]/10 via-[#c88635]/20 to-[#c88635]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#c88635] mb-2 font-['Advent_Pro']">Forex Expert</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Expert guidance</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#b8752a]/10 via-[#b8752a]/20 to-[#b8752a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#b8752a] mb-2 font-['Advent_Pro']">MT4/MT5</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Platform mastery</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#d49740]/10 via-[#d49740]/20 to-[#d49740]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#d49740] mb-2 font-['Advent_Pro']">Scalping</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Quick profits</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#a66b28]/10 via-[#a66b28]/20 to-[#a66b28]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#a66b28] mb-2 font-['Advent_Pro']">Swing Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Long-term gains</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-[#e5a84a]/10 via-[#e5a84a]/20 to-[#e5a84a]/10 rounded-2xl mx-4 flex items-center justify-center scroll-card">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#e5a84a] mb-2 font-['Advent_Pro']">News Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Market events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes scroll-horizontal-smooth {
          0% { 
            transform: translateX(0);
            opacity: 1;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% { 
            transform: translateX(-100%);
            opacity: 1;
          }
        }
        
        @keyframes card-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-4px) scale(1.01);
          }
        }
        
        .animate-progress {
          animation: progress 0s linear;
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }
        .animate-scroll-horizontal-smooth {
          animation: scroll-horizontal-smooth 60s linear infinite;
        }
        
        .group:hover .animate-scroll-horizontal-smooth {
          animation-play-state: paused;
        }
        
        .scroll-card {
          animation: card-float 8s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-card:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 20px 40px rgba(200, 134, 53, 0.3);
        }
        
        .scroll-card:nth-child(odd) {
          animation-delay: -1s;
        }
        
        .scroll-card:nth-child(even) {
          animation-delay: -2s;
        }
      `}</style>
    </section>
  );
}