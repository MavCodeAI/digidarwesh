import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Card } from '@/components/ui/card';
import { Cpu, Code, Bot, BarChart, Zap, Database } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay * 0.1 }}
      className="h-full"
    >
      <Card className="h-full glass-morphism border-gray-800 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
        <div className="p-8 flex flex-col h-full">
          <div className="bg-primary/10 text-primary w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            {icon}
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          
          <p className="text-muted-foreground mb-6">
            {description}
          </p>
          
          <div className="mt-auto">
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const services = [
    {
      icon: <Cpu size={32} />,
      title: "AI-Driven Web Development",
      description: "Create intelligent websites that learn from user behavior and provide personalized experiences to each visitor.",
      features: [
        "Personalized content recommendations",
        "User behavior analysis and adaptation",
        "Dynamic content generation",
        "A/B testing with AI optimization",
        "Predictive user journey mapping"
      ]
    },
    {
      icon: <Bot size={32} />,
      title: "Custom Chatbot Solutions",
      description: "Build sophisticated AI assistants that engage your customers 24/7 and streamline business operations.",
      features: [
        "Natural language processing",
        "Multi-language support",
        "Context-aware conversations",
        "Integration with existing systems",
        "Voice capability options"
      ]
    },
    {
      icon: <Zap size={32} />,
      title: "Digital Transformation",
      description: "Transform your business with cutting-edge AI technologies that automate processes and enhance decision making.",
      features: [
        "Business process automation",
        "Legacy system modernization",
        "Data-driven decision systems",
        "Cloud migration strategies",
        "Digital workflow optimization"
      ]
    },
    {
      icon: <BarChart size={32} />,
      title: "SEO & Analytics",
      description: "Optimize your digital presence with AI-powered SEO strategies and real-time analytics insights.",
      features: [
        "AI content optimization",
        "Predictive SEO analysis",
        "Competitor intelligence",
        "Automated reporting",
        "Conversion rate optimization"
      ]
    },
    {
      icon: <Code size={32} />,
      title: "Full-Stack Development",
      description: "Expert development services covering everything from responsive front-end designs to robust backend systems.",
      features: [
        "Modern JavaScript frameworks",
        "Responsive design implementation",
        "API development and integration",
        "Server optimization",
        "Performance tuning"
      ]
    },
    {
      icon: <Database size={32} />,
      title: "AI Data Solutions",
      description: "Harness the power of your data with advanced AI systems that extract insights and drive business intelligence.",
      features: [
        "Data visualization dashboards",
        "Predictive analytics models",
        "Big data processing",
        "Machine learning implementation",
        "Custom reporting solutions"
      ]
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedBackground />
      
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full mb-5">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-gradient">AI-Powered Solutions</span><br />
              <span className="animated-gradient-text">For Digital Excellence</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              We deliver cutting-edge digital solutions that combine the latest in artificial intelligence with exceptional design and development expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
