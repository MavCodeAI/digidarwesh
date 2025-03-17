
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Smart City Dashboard",
    category: "AI Analytics Platform",
    description: "An intelligent dashboard for monitoring and optimizing city resources in real-time.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/projects/smart-city"
  },
  {
    id: 2,
    title: "Neural Health Assistant",
    category: "Healthcare AI",
    description: "AI-powered application that helps monitor patient health and provides personalized recommendations.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    id: 3,
    title: "EcoSense",
    category: "Environmental Technology",
    description: "Smart environmental monitoring system that uses AI to predict and prevent ecological issues.",
    image: "https://images.unsplash.com/photo-1623241899289-e9a64d6eb218?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden border-gray-800 hover:border-primary/20 transition-all duration-300">
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
            <span className="inline-block py-1 px-2 text-xs font-medium bg-primary/80 text-white rounded-full">
              {project.category}
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
  
  return (
    <section className="py-20 relative">
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our innovative solutions that have helped businesses transform their digital presence and achieve extraordinary results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            size="lg" 
            className="px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
          >
            <Link to="/portfolio">
              <span>View Full Portfolio</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
