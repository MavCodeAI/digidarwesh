
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Sample portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'AI-Powered E-commerce Platform',
    description: 'A next-generation e-commerce platform with personalized recommendations, chatbot support, and dynamic content generation.',
    tags: ['React', 'Node.js', 'AI', 'E-commerce'],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Virtual Assistant Dashboard',
    description: 'An intelligent dashboard for monitoring and managing AI virtual assistants across multiple platforms.',
    tags: ['Vue.js', 'Python', 'Machine Learning', 'Dashboard'],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Smart Content Management System',
    description: 'A CMS that uses AI to suggest content improvements, optimize SEO, and personalize user experiences.',
    tags: ['React', 'GraphQL', 'AI', 'CMS'],
    image: '/placeholder.svg'
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
      className="min-h-screen container mx-auto py-20 px-4"
    >
      <motion.div 
        className="text-center mb-16"
        {...fadeIn('up', 0.2)}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Our Portfolio</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Explore our innovative projects where we've combined cutting-edge technology with creative solutions.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            {...fadeIn('up', 0.2 + (index * 0.1))}
          >
            <Card className="bg-card h-full hover:shadow-lg transition-all group overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
