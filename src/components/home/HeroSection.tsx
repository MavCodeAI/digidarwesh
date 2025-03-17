
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const calculateMovement = (axis: 'x' | 'y', strength: number) => {
    const value = axis === 'x' ? mousePosition.x : mousePosition.y;
    return (value - 0.5) * strength;
  };
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('services-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 px-4">
      {/* Gradient background elements */}
      <div
        className="absolute inset-0 opacity-30 bg-gradient-radial from-primary/20 to-transparent"
        style={{
          transform: `translate(${calculateMovement('x', 20)}px, ${calculateMovement('y', 20)}px)`,
        }}
      />
      
      <div 
        className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-neon-purple/5 blur-3xl"
        style={{
          transform: `translate(${calculateMovement('x', -30)}px, ${calculateMovement('y', -30)}px)`,
        }}
      />
      
      <div 
        className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-neon-blue/5 blur-3xl"
        style={{
          transform: `translate(${calculateMovement('x', 30)}px, ${calculateMovement('y', 30)}px)`,
        }}
      />
      
      {/* Hero content */}
      <div className="container mx-auto max-w-5xl z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full mb-5">
              NEXT-GENERATION AI-DRIVEN WEB EXPERIENCES
            </span>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
            >
              <span className="text-gradient">Empowering Digital</span><br />
              <span className="text-gradient">Transformation with</span><br />
              <span className="animated-gradient-text">AI & Web Development</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6"
            >
              Creating intelligent, beautiful, and functional digital experiences that adapt to your users and drive exceptional results.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-10 justify-center items-center"
            >
              <Button 
                asChild
                size="lg" 
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 group"
              >
                <Link to="/services">
                  <span>Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg border-gray-600 hover:bg-secondary transition-colors duration-300"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-muted-foreground text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
