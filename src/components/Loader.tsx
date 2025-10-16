import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-float">
          <TrendingUp className="w-16 h-16 text-primary animate-glow" />
        </div>
        <div className="mt-4 text-2xl font-bold text-gradient-gold">Loading...</div>
      </div>
    </div>
  );
};
