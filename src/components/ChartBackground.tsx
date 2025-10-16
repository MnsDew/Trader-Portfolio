import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ChartBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Chart data points
    const points: { x: number; y: number }[] = [];
    const numPoints = 100;
    let frameCount = 0;
    
    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (canvas.width / numPoints) * i,
        y: canvas.height / 2 + Math.random() * 100 - 50,
      });
    }

    // Animation loop - optimized for performance
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points every 12 frames (even slower for better performance)
      frameCount++;
      if (frameCount % 12 === 0) {
        // Smoother transition by moving points gradually
        for (let i = 0; i < points.length - 1; i++) {
          points[i].y += (points[i + 1].y - points[i].y) * 0.1; // Reduced interpolation for performance
        }
        
        // Generate new point with smoother curve
        const newY = canvas.height / 2 + Math.sin(frameCount * 0.015) * 60 + Math.random() * 40 - 20;
        points[points.length - 1].y += (newY - points[points.length - 1].y) * 0.08;
      }

      // Draw gradient fill with softer gold
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(194, 154, 77, 0.08)');
      gradient.addColorStop(1, 'rgba(194, 154, 77, 0)');

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line with softer gold and smoother curves
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      // Use quadratic curves for smoother lines
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const cpx = (prevPoint.x + currentPoint.x) / 2;
        const cpy = (prevPoint.y + currentPoint.y) / 2;
        
        if (i === 1) {
          ctx.lineTo(currentPoint.x, currentPoint.y);
        } else {
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
        }
      }
      
      ctx.strokeStyle = 'rgba(194, 154, 77, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
