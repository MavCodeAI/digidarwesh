
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const requestIdRef = useRef<number | null>(null);
  
  const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#06b6d4'];
  
  // Update canvas dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        
        // Set DPI for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        setDimensions({ width, height });
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const particles: Particle[] = [];
      const particleCount = Math.min(Math.floor(dimensions.width * dimensions.height / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      particlesRef.current = particles;
    }
  }, [dimensions]);
  
  // Animation loop
  useEffect(() => {
    const draw = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, dimensions.width, dimensions.height);
          
          // Update and draw particles
          particlesRef.current.forEach((particle, index) => {
            // Calculate distance to mouse
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Update position based on speed
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Add mouse influence (attraction/repulsion)
            if (distance < 100) {
              const forceFactor = 0.05;
              particle.x -= (dx / distance) * forceFactor;
              particle.y -= (dy / distance) * forceFactor;
            }
            
            // Boundary check with wrap-around
            if (particle.x < 0) particle.x = dimensions.width;
            if (particle.x > dimensions.width) particle.x = 0;
            if (particle.y < 0) particle.y = dimensions.height;
            if (particle.y > dimensions.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Draw connections between particles
            for (let j = index + 1; j < particlesRef.current.length; j++) {
              const otherParticle = particlesRef.current[j];
              const dx2 = particle.x - otherParticle.x;
              const dy2 = particle.y - otherParticle.y;
              const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (distance2 < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = particle.color;
                ctx.globalAlpha = 0.2 * (1 - distance2 / 100);
                ctx.stroke();
              }
            }
          });
        }
      }
      
      requestIdRef.current = requestAnimationFrame(draw);
    };
    
    requestIdRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [dimensions, mousePosition]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
