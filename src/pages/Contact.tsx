
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      details: 'info@digidarwesh.com',
      action: 'mailto:info@digidarwesh.com'
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Phone',
      details: '+1 (123) 456-7890',
      action: 'tel:+11234567890'
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Address',
      details: '123 Tech Avenue, Digital City',
      action: '#'
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Get in Touch</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to learn more about our services? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            {...fadeIn('up', 0.3 + (index * 0.1))}
          >
            <a href={item.action} className="block">
              <Card className="h-full bg-card hover:shadow-lg transition-all hover:bg-card/80">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.details}</p>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div 
        {...fadeIn('up', 0.6)}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-card shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="Message subject" 
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  className="w-full min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
