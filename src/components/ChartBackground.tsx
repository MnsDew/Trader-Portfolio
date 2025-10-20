import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';

export const ChartBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Forex-style candlestick data
    const candles: { x: number; open: number; close: number; high: number; low: number; opacity: number }[] = [];
    const numCandles = 80;
    const candleWidth = 3;
    const volatility = { value: 0.6 };
    
    // Price line data with forex-style movement
    const pricePoints: { x: number; y: number; velocity: number }[] = [];
    const numPoints = 150;
    let time = 0;
    let marketSentiment = { value: 0 }; // -1 to 1, bearish to bullish
    
    // Initialize price points
    const basePrice = canvas.height * 0.88; // Move chart down
    for (let i = 0; i < numPoints; i++) {
      pricePoints.push({
        x: (canvas.width / numPoints) * i,
        y: basePrice,
        velocity: 0
      });
    }

     // Generate forex-style candles (positioned higher)
     const candleBaseY = canvas.height * 0.20; // Position candles in middle-lower area
     let lastClose = candleBaseY;
     for (let i = 0; i < numCandles; i++) {
       const x = canvas.width - (numCandles - i) * 15;
       const movement = (Math.random() - 0.48) * 40; // Slight bullish bias
       const open = lastClose;
       const close = open + movement;
       const range = Math.abs(movement) * 1.5;
       const high = Math.max(open, close) + Math.random() * range * 0.4;
       const low = Math.min(open, close) - Math.random() * range * 0.4;
       
       candles.push({ x, open, close, high, low, opacity: 0.4 + (i / numCandles) * 0.4 });
       lastClose = close;
     }

     // GSAP animations for market dynamics (slower)
     gsap.to(volatility, {
       value: 0.3,
       duration: 4, // Slower: was 
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
     });

     gsap.to(marketSentiment, {
       value: 0.7,
       duration: 15, // Slower: was 8
       repeat: -1,
       yoyo: true,
       ease: "power1.inOut"
     });

    // Heartbeat pulse animation
    const heartbeat = { pulse: 1, intensity: 0 };
    const createHeartbeat = () => {
      gsap.to(heartbeat, {
        pulse: 1.15,
        intensity: 1,
        duration: 0.27,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heartbeat, {
            pulse: 1,
            intensity: 0,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      });
    };
    
     // Random heartbeat intervals (slower)
     const scheduleHeartbeat = () => {
       const delay = 4000 + Math.random() * 5000; // Slower: was 2000-5000ms
       setTimeout(() => {
         createHeartbeat();
         scheduleHeartbeat();
       }, delay);
     };
    scheduleHeartbeat();

     // Animation loop (slower)
     const animate = () => {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       time += 0.002; // Slower: was 0.008

       // Draw grid lines (forex chart style)
       ctx.strokeStyle = theme === 'dark' 
         ? 'rgba(120, 120, 120, 0.15)' 
         : 'rgba(194, 154, 77, 0.12)';
       ctx.lineWidth = 0.55;
      
      // Horizontal grid lines
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw candlesticks
      ctx.lineWidth = 1;
      candles.forEach((candle, i) => {
        // Shift candles left slowly
        candle.x -= 0.3;
        
         const bullish = candle.close > candle.open;
         const wickColor = theme === 'dark'
           ? `rgba(180, 180, 180, ${candle.opacity * 0.7})`
           : `rgba(194, 154, 77, ${candle.opacity * 0.7})`;
         const bodyColor = bullish
           ? (theme === 'dark' ? `rgba(100, 200, 100, ${candle.opacity})` : `rgba(34, 153, 84, ${candle.opacity})`)
           : (theme === 'dark' ? `rgba(200, 100, 100, ${candle.opacity})` : `rgba(192, 57, 43, ${candle.opacity})`);

        // Draw wick
        ctx.strokeStyle = wickColor;
        ctx.beginPath();
        ctx.moveTo(candle.x, candle.high);
        ctx.lineTo(candle.x, candle.low);
        ctx.stroke();

        // Draw body
        ctx.fillStyle = bodyColor;
        const bodyHeight = Math.abs(candle.close - candle.open);
        const bodyY = Math.min(candle.open, candle.close);
        ctx.fillRect(candle.x - candleWidth / 2, bodyY, candleWidth, bodyHeight);
      });

       // Generate new candle when needed (slower)
       if (candles.length > 0 && canvas.width - candles[candles.length - 1].x > 25) { // Slower: was 15
         const lastCandle = candles[candles.length - 1];
         const movement = (Math.random() - 0.45 + marketSentiment.value * 0.2) * 50 * volatility.value;
         const open = lastCandle.close;
         const close = open + movement;
         const range = Math.abs(movement) * 1.5;
         const high = Math.max(open, close) + Math.random() * range * 0.5;
         const low = Math.min(open, close) - Math.random() * range * 0.5;
         
         candles.push({ 
           x: canvas.width, 
           open, 
           close, 
           high, 
           low, 
           opacity: 0.8 
         });
       }

      // Remove off-screen candles
      while (candles.length > 0 && candles[0].x < -20) {
        candles.shift();
      }

       // Update price line with realistic forex movement
       for (let i = 0; i < pricePoints.length; i++) {
         const progress = i / numPoints;
         
         // Realistic forex price action with multiple timeframes
         const longTrend = marketSentiment.value * 25; // Longer-term trend
         const mediumTrend = Math.sin(time * 0.5 + progress * 8) * 15 * volatility.value; // Medium-term waves
         const shortNoise = Math.sin(time * 3 + progress * 25) * 8 * volatility.value; // Short-term noise
         const microMovements = Math.sin(time * 12 + progress * 60) * 3; // Micro movements
         const supportResistance = Math.sin(progress * Math.PI * 4) * 5; // Support/resistance levels
         const heartbeatEffect = heartbeat.intensity * Math.sin(progress * Math.PI * 2) * 8 * heartbeat.pulse;
         
         const targetY = basePrice + longTrend + mediumTrend + shortNoise + microMovements + supportResistance + heartbeatEffect;
         
         // Realistic momentum with inertia
         const force = (targetY - pricePoints[i].y) * 0.025;
         pricePoints[i].velocity += force;
         pricePoints[i].velocity *= 0.88; // Realistic friction
         pricePoints[i].y += pricePoints[i].velocity;
         
         pricePoints[i].x = canvas.width * progress;
       }

      // Draw main price line with glow
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

       // Outer glow
       ctx.beginPath();
       ctx.moveTo(pricePoints[0].x, pricePoints[0].y);
       for (let i = 1; i < pricePoints.length; i++) {
         const xc = (pricePoints[i].x + pricePoints[i - 1].x) / 2;
         const yc = (pricePoints[i].y + pricePoints[i - 1].y) / 2;
         ctx.quadraticCurveTo(pricePoints[i - 1].x, pricePoints[i - 1].y, xc, yc);
       }
       ctx.strokeStyle = theme === 'dark'
         ? `rgba(180, 180, 180, ${0.3 * heartbeat.pulse})`
         : `rgba(194, 154, 77, ${0.35 * heartbeat.pulse})`;
       ctx.lineWidth = 6 * heartbeat.pulse;
       ctx.stroke();

       // Middle glow
       ctx.beginPath();
       ctx.moveTo(pricePoints[0].x, pricePoints[0].y);
       for (let i = 1; i < pricePoints.length; i++) {
         const xc = (pricePoints[i].x + pricePoints[i - 1].x) / 2;
         const yc = (pricePoints[i].y + pricePoints[i - 1].y) / 2;
         ctx.quadraticCurveTo(pricePoints[i - 1].x, pricePoints[i - 1].y, xc, yc);
       }
       ctx.strokeStyle = theme === 'dark'
         ? `rgba(200, 200, 200, ${0.5 * heartbeat.pulse})`
         : `rgba(194, 154, 77, ${0.6 * heartbeat.pulse})`;
       ctx.lineWidth = 3.5 * heartbeat.pulse;
       ctx.stroke();

       // Main line
       ctx.beginPath();
       ctx.moveTo(pricePoints[0].x, pricePoints[0].y);
       for (let i = 1; i < pricePoints.length; i++) {
         const xc = (pricePoints[i].x + pricePoints[i - 1].x) / 2;
         const yc = (pricePoints[i].y + pricePoints[i - 1].y) / 2;
         ctx.quadraticCurveTo(pricePoints[i - 1].x, pricePoints[i - 1].y, xc, yc);
       }
       ctx.strokeStyle = theme === 'dark'
         ? 'rgba(220, 220, 220, 0.9)'
         : 'rgba(194, 154, 77, 1)';
       ctx.lineWidth = 2;
       ctx.stroke();

       // Draw gradient fill below line
       const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
       if (theme === 'dark') {
         gradient.addColorStop(0, `rgba(180, 180, 180, ${0.12 * heartbeat.pulse})`);
         gradient.addColorStop(0.5, `rgba(180, 180, 180, ${0.06 * heartbeat.pulse})`);
         gradient.addColorStop(1, 'rgba(180, 180, 180, 0)');
       } else {
         gradient.addColorStop(0, `rgba(194, 154, 77, ${0.25 * heartbeat.pulse})`);
         gradient.addColorStop(0.5, `rgba(194, 154, 77, ${0.12 * heartbeat.pulse})`);
         gradient.addColorStop(1, 'rgba(194, 154, 77, 0)');
       }

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(pricePoints[0].x, pricePoints[0].y);
      for (let i = 1; i < pricePoints.length; i++) {
        const xc = (pricePoints[i].x + pricePoints[i - 1].x) / 2;
        const yc = (pricePoints[i].y + pricePoints[i - 1].y) / 2;
        ctx.quadraticCurveTo(pricePoints[i - 1].x, pricePoints[i - 1].y, xc, yc);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      gsap.killTweensOf([volatility, marketSentiment, heartbeat]);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${
        theme === 'dark' ? 'opacity-25' : 'opacity-35'
      }`}
      style={{ 
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
      }}
    />
  );
};