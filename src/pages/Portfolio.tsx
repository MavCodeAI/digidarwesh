
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated portfolio data with AI-generated image URLs
const portfolioItems = [
  {
    id: 1,
    title: 'Smart City Dashboard',
    description: 'An intelligent dashboard for monitoring and optimizing city resources in real-time.',
    tags: ['React', 'AI Analytics', 'IoT', 'Data Visualization'],
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/projects/smart-city'
  },
  {
    id: 2,
    title: 'Neural Health Assistant',
    description: 'AI-powered application that helps monitor patient health and provides personalized recommendations.',
    tags: ['Vue.js', 'Python', 'Machine Learning', 'Healthcare'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/portfolio'
  },
  {
    id: 3,
    title: 'EcoSense Platform',
    description: 'Smart environmental monitoring system that uses AI to predict and prevent ecological issues.',
    tags: ['React', 'IoT', 'AI', 'Environmental'],
    image: 'https://images.unsplash.com/photo-1623241899289-e9a64d6eb218?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/portfolio'
  },
  {
    id: 4,
    title: 'Intelligent Supply Chain',
    description: 'AI-driven supply chain optimization platform that reduces waste and improves efficiency.',
    tags: ['React', 'GraphQL', 'AI', 'Logistics'],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/portfolio'
  },
  {
    id: 5,
    title: 'Predictive Maintenance System',
    description: 'Industrial IoT platform that predicts equipment failures before they occur, saving costs and downtime.',
    tags: ['Angular', 'Python', 'IoT', 'Manufacturing'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/portfolio'
  },
  {
    id: 6,
    title: 'AI-Powered Education Platform',
    description: 'Personalized learning system that adapts to individual student needs and learning styles.',
    tags: ['React', 'Node.js', 'AI', 'Education'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/portfolio'
  }
];

const Portfolio = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen container mx-auto py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        className="text-center mb-12 md:mb-16"
        {...fadeIn('up', 0.2)}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">Our Portfolio</h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Explore our innovative projects where we've combined cutting-edge technology with creative solutions.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            {...fadeIn('up', 0.2 + (index * 0.1))}
            className="h-full"
          >
            <Card className="bg-card h-full hover:shadow-lg transition-all group overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="text-lg md:text-xl mb-2">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-2">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary text-xs">{tag}</Badge>
                  ))}
                </div>
                <Button 
                  asChild
                  variant="link" 
                  className="p-0 h-auto text-primary flex items-center group/link"
                >
                  <Link to={item.link} className="flex items-center">
                    <span>View Project</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
