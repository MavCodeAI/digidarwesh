
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Brain, Bot, FileCode, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Content Generator",
    category: "Artificial Intelligence",
    description: "Generate high-quality content using advanced AI models with natural language processing capabilities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio",
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Neural Health Assistant",
    category: "Healthcare AI",
    description: "AI-powered application that helps monitor patient health and provides personalized recommendations.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio",
    icon: <Bot className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Code Intelligence",
    category: "Developer Tools",
    description: "AI-powered code analysis and generation tool that helps developers write better code faster.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio",
    icon: <FileCode className="w-5 h-5" />
  }
];

const ProjectCard: React.FC<{ project: Project; index: number; mouseX: number; mouseY: number }> = ({ project, index, mouseX, mouseY }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Card tilt effect based on mouse position
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Smoothed spring animation for tilting
  const springConfig = { stiffness: 150, damping: 15 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // Glow effect that follows mouse
  const cardRect = useRef<DOMRect | null>(null);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const glowOpacity = useMotionValue(0);
  const smoothGlowX = useSpring(glowX, springConfig);
  const smoothGlowY = useSpring(glowY, springConfig);
  const smoothGlowOpacity = useSpring(glowOpacity.get(), springConfig);

  useEffect(() => {
    const calculateTilt = () => {
      if (!ref.current) return;
      
      cardRect.current = ref.current.getBoundingClientRect();
      const card = cardRect.current;
      
      const cardCenterX = card.left + card.width / 2;
      const cardCenterY = card.top + card.height / 2;
      
      // Calculate distance from mouse to card center
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      
      // Only apply effect when mouse is near the card
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(card.width, card.height) * 1.5;
      
      if (distance < maxDistance) {
        // Calculate rotation based on mouse position
        const rotationX = deltaY * 10 / card.height;
        const rotationY = -deltaX * 10 / card.width;
        
        setRotateX(rotationX);
        setRotateY(rotationY);
        
        // Glow effect follows mouse within card
        const relativeX = (mouseX - card.left) / card.width;
        const relativeY = (mouseY - card.top) / card.height;
        
        if (relativeX >= 0 && relativeX <= 1 && relativeY >= 0 && relativeY <= 1) {
          setGlowX(relativeX * 100);
          setGlowY(relativeY * 100);
          glowOpacity.set(0.15);
        } else {
          glowOpacity.set(0);
        }
      } else {
        // Reset when mouse is far from card
        setRotateX(0);
        setRotateY(0);
        glowOpacity.set(0);
      }
    };
    
    calculateTilt();
    
    // Cleanup function
    return () => {
      setRotateX(0);
      setRotateY(0);
      glowOpacity.set(0);
    };
  }, [mouseX, mouseY, glowOpacity]);
  
  return (
    <motion.div
      ref={ref}
      className="h-full perspective-[1000px]"
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      style={{
        transform: `perspective(1000px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <Card className="group h-full overflow-hidden border-gray-800 hover:border-primary/20 transition-all duration-300 relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-radial from-primary/20 to-transparent rounded-lg opacity-0"
          style={{
            opacity: smoothGlowOpacity,
            background: `radial-gradient(circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(14, 165, 233, 0.3), transparent 70%)`,
          }}
        />
        
        <div className="relative overflow-hidden aspect-video">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-flex items-center gap-1 py-1 px-2 text-xs font-medium bg-primary/80 text-white rounded-full">
              {project.icon}
              <span>{project.category}</span>
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
          <Button 
            asChild
            variant="link" 
            className="p-0 h-auto text-primary flex items-center group/link"
          >
            <Link to={project.link}>
              <span>View Project</span>
              <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const PortfolioPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Track mouse position globally
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track scroll position for parallax effects
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Particles for background effect
  const particleCount = 15;
  const generateParticles = () => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 0.5 + 0.2
    }));
  };
  
  const [particles] = useState(generateParticles());
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)',
            x: useTransform(
              useMotionValue(scrollY),
              [0, 1000],
              [0, particle.speed * -200]
            ),
            y: useTransform(
              useMotionValue(scrollY),
              [0, 1000],
              [0, particle.speed * -100]
            ),
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + particle.speed * 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block py-1 px-3 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full mb-5">
            OUR PORTFOLIO
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            <span className="animated-gradient-text">AI-Powered Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our innovative AI solutions that have helped businesses transform their digital presence and achieve extraordinary results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          style={{
            y: useTransform(
              useMotionValue(scrollY),
              [0, 500],
              [0, -50]
            ),
          }}
        >
          <Button 
            asChild
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group relative overflow-hidden"
          >
            <Link to="/portfolio">
              <motion.span 
                className="absolute inset-0 bg-white/10 pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "linear",
                  repeatDelay: 0.5
                }}
              />
              <motion.div 
                className="flex items-center"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Zap className="mr-2 h-4 w-4" />
                <span>View Full Portfolio</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
