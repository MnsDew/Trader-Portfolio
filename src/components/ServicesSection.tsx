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
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: GraduationCap, 
      titleKey: 'services.trading.title', 
      descKey: 'services.trading.desc', 
      badgeKey: 'services.trading.badge',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Briefcase, 
      titleKey: 'services.account.title', 
      descKey: 'services.account.desc', 
      badgeKey: 'services.account.badge',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      icon: BarChart3, 
      titleKey: 'services.analysis.title', 
      descKey: 'services.analysis.desc', 
      badgeKey: 'services.analysis.badge',
      gradient: 'from-green-500 to-emerald-500'
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent pb-2">
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
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300">
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
          <div className="overflow-hidden">
            <div className="flex animate-scroll-horizontal" style={{ width: '400%' }}>
              {/* Video content that scrolls horizontally */}
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Live Trading Sessions</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Watch real-time trading analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Market Analysis</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Daily technical analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Trading Signals</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">87% accuracy rate</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">Risk Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Position sizing strategies</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">Portfolio Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Professional services</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-pink-500/10 via-pink-500/20 to-pink-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-2">Forex Expert</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Expert guidance</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-2">MT4/MT5</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Platform mastery</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-indigo-500/10 via-indigo-500/20 to-indigo-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-600 mb-2">Scalping</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Quick profits</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">Swing Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Long-term gains</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-2">News Trading</h3>
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
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-blue-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Market Analysis</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Daily technical analysis</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Trading Signals</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">87% accuracy rate</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">Risk Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Position sizing strategies</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">Portfolio Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Professional services</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-pink-500/10 via-pink-500/20 to-pink-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-2">Forex Expert</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Expert guidance</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-2">MT4/MT5</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Platform mastery</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-indigo-500/10 via-indigo-500/20 to-indigo-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-600 mb-2">Scalping</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Quick profits</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">Swing Trading</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Long-term gains</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-80 h-32 md:h-40 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-2xl mx-4 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-2">News Trading</h3>
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
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-progress {
          animation: progress 0s linear;
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }
        .animate-scroll-horizontal {
            animation: scroll-horizontal 30s linear infinite;
        }
      `}</style>
    </section>
  );
}