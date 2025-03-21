
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
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
  const lastTimeRef = useRef<number>(0);
  const { scrollY } = useScroll();
  
  const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#06b6d4'];
  
  // Add more "AI-like" shapes
  const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
    const shapeType = Math.floor((x * y) % 4); // Deterministic based on position
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    switch (shapeType) {
      case 0: // Neural node
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 1: // Data point
        ctx.beginPath();
        ctx.rect(-size/2, -size/2, size, size);
        ctx.fill();
        break;
      case 2: // Connection line
        ctx.beginPath();
        ctx.moveTo(-size, -size);
        ctx.lineTo(size, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size, -size);
        ctx.lineTo(-size, size);
        ctx.stroke();
        break;
      case 3: // Small cluster
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(
            Math.cos(Math.PI * 2 * i / 3) * size * 0.7,
            Math.sin(Math.PI * 2 * i / 3) * size * 0.7,
            size * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        break;
    }
    
    ctx.restore();
  };
  
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
  
  // Track mouse position with smooth following
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
  
  // Spring-animated scroll value for smoother effects
  const springScrollY = useSpring(
    useTransform(scrollY, value => value * 0.5),
    { stiffness: 50, damping: 15 }
  );
  
  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const particles: Particle[] = [];
      const particleCount = Math.min(Math.floor(dimensions.width * dimensions.height / 10000), 150);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.7,
          speedY: (Math.random() - 0.5) * 0.7,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01
        });
      }
      
      particlesRef.current = particles;
    }
  }, [dimensions]);
  
  // Animation loop with delta time
  useEffect(() => {
    const draw = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Clear canvas with slight trail effect
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, dimensions.width, dimensions.height);
          
          // Get current scroll influence
          const scrollInfluence = springScrollY.get();
          
          // Update and draw particles
          particlesRef.current.forEach((particle, index) => {
            // Calculate distance to mouse
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Update position based on speed and deltaTime
            particle.x += particle.speedX * (deltaTime / 16);
            particle.y += particle.speedY * (deltaTime / 16);
            
            // Add scroll influence
            particle.y -= scrollInfluence * particle.speedY * 0.5;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed * (deltaTime / 16);
            
            // Add mouse influence (attraction/repulsion)
            if (distance < 150) {
              const forceFactor = 0.1;
              particle.x -= (dx / distance) * forceFactor * (deltaTime / 16);
              particle.y -= (dy / distance) * forceFactor * (deltaTime / 16);
            }
            
            // Boundary check with wrap-around
            if (particle.x < -50) particle.x = dimensions.width + 50;
            if (particle.x > dimensions.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = dimensions.height + 50;
            if (particle.y > dimensions.height + 50) particle.y = -50;
            
            // Draw AI-like shape
            ctx.fillStyle = particle.color;
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.lineWidth = 0.5;
            
            drawShape(ctx, particle.x, particle.y, particle.size, particle.rotation);
            
            // Draw connections between close particles (neural network effect)
            for (let j = index + 1; j < particlesRef.current.length; j++) {
              const otherParticle = particlesRef.current[j];
              const dx2 = particle.x - otherParticle.x;
              const dy2 = particle.y - otherParticle.y;
              const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (distance2 < 120) {
                // More connections near mouse
                const mouseInfluenceRadius = 200;
                const mouseDistance = Math.min(
                  Math.sqrt(
                    Math.pow(mousePosition.x - particle.x, 2) + 
                    Math.pow(mousePosition.y - particle.y, 2)
                  ),
                  mouseInfluenceRadius
                );
                
                const normalizedMouseInfluence = 1 - (mouseDistance / mouseInfluenceRadius);
                const connectionThreshold = 120 + (normalizedMouseInfluence * 80);
                
                if (distance2 < connectionThreshold) {
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.strokeStyle = particle.color;
                  ctx.globalAlpha = 0.2 * (1 - distance2 / connectionThreshold) + (normalizedMouseInfluence * 0.2);
                  ctx.stroke();
                }
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
  }, [dimensions, mousePosition, springScrollY]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
