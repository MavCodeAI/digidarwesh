
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Star, Code, Lightbulb } from 'lucide-react';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'AI-First Approach',
      description: 'We integrate artificial intelligence in all our solutions to provide smarter, more intuitive experiences.'
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: 'Excellence',
      description: 'We strive for excellence in every project, focusing on quality, performance, and user experience.'
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to stay at the cutting edge of digital solutions.'
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: 'Creative Problem Solving',
      description: 'We approach challenges with creativity and ingenuity, finding unique solutions for complex problems.'
    }
  ];

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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">About Digi Darwesh</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Empowering digital transformation with cutting-edge AI and web development solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div {...fadeIn('right', 0.3)}>
          <img 
            src="/placeholder.svg" 
            alt="About Digi Darwesh" 
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
        <motion.div {...fadeIn('left', 0.3)}>
          <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
          <p className="text-gray-300 mb-4">
            Digi Darwesh was founded with a vision to revolutionize the digital landscape by combining artificial intelligence with cutting-edge web development technologies.
          </p>
          <p className="text-gray-300 mb-4">
            Our journey began with a passion for creating intelligent, responsive, and user-centric digital experiences that not only meet but exceed client expectations.
          </p>
          <p className="text-gray-300">
            Today, we pride ourselves on being at the forefront of technological innovation, constantly pushing boundaries and exploring new horizons in the digital realm.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="text-center mb-12"
        {...fadeIn('up', 0.4)}
      >
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Core Values</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {coreValues.map((value, index) => (
          <motion.div 
            key={index}
            {...fadeIn('up', 0.5 + (index * 0.1))}
          >
            <Card className="h-full bg-card hover:shadow-lg transition-all hover:bg-card/80">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
