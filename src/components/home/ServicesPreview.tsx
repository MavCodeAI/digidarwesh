
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Code, BarChart, Zap, Robot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay * 0.1 }}
    >
      <Card className="h-full glass-morphism transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-gray-800 hover:border-primary/20 overflow-hidden group">
        <div className="p-6 flex flex-col h-full">
          <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          
          <p className="text-muted-foreground text-sm flex-grow mb-4">
            {description}
          </p>
          
          <Button 
            asChild
            variant="link" 
            className="p-0 h-auto text-primary flex items-center justify-start group/link" 
          >
            <Link to="/services">
              <span>Learn more</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const ServicesPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const services = [
    {
      icon: <Cpu size={24} />,
      title: "AI-Driven Web Development",
      description: "Create intelligent websites that learn from user behavior and adapt to provide personalized experiences."
    },
    {
      icon: <Robot size={24} />,
      title: "Custom Chatbot Solutions",
      description: "Build sophisticated AI assistants that engage your customers 24/7 and streamline business operations."
    },
    {
      icon: <Zap size={24} />,
      title: "Digital Transformation",
      description: "Transform your business with cutting-edge AI technologies that automate processes and enhance decision making."
    },
    {
      icon: <BarChart size={24} />,
      title: "SEO & Analytics",
      description: "Optimize your digital presence with AI-powered SEO strategies and real-time analytics insights."
    },
    {
      icon: <Code size={24} />,
      title: "Full-Stack Development",
      description: "Expert development services covering everything from responsive front-end designs to robust backend systems."
    }
  ];
  
  return (
    <section id="services-section" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block py-1 px-3 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full mb-5">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Cutting-Edge Digital Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            We combine advanced technology with creative design to deliver exceptional digital experiences that help businesses thrive in the AI era.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
          >
            <Link to="/services">
              <span>View All Services</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
