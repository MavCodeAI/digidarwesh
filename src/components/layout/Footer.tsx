
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TwitterIcon, 
  LinkedinIcon, 
  GithubIcon, 
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Top curved border */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute -top-1">
          <path 
            fill="rgba(14, 165, 233, 0.1)" 
            fillOpacity="1" 
            d="M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,122.7C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative">
          {/* Logo and about */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block text-3xl font-display font-bold mb-4">
              <span className="text-gradient">Digi</span>
              <span className="animated-gradient-text">Darwesh</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering digital transformation with AI and web development. Creating intelligent, beautiful, and functional digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  AI Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Chatbot Creation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Custom AI Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MailIcon size={20} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">contact@digidarwesh.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon size={20} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon size={20} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  123 Innovation Way, Tech Valley,<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Digi Darwesh. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={scrollToTop}
            >
              <ArrowUpIcon size={16} />
              <span className="sr-only">Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
