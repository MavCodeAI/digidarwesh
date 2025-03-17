
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, X, Bot, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

interface ChatBotProps {
  initialMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({
  initialMessage = "Hello! I'm your AI assistant. How can I help you with Digi Darwesh services today?",
  position = 'bottom-right',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial message with typing effect
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            text: initialMessage,
            isBot: true,
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Focus input when chat is opened
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let response = '';
      
      // Simple response logic based on user input
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello there! How can I help you today?";
      } else if (lowerInput.includes('services') || lowerInput.includes('offer')) {
        response = "Digi Darwesh offers a range of services including AI-powered web development, chatbot creation, digital transformation consulting, and SEO optimization. Would you like to know more about any specific service?";
      } else if (lowerInput.includes('contact') || lowerInput.includes('call') || lowerInput.includes('email')) {
        response = "You can reach out to us through the contact form on our website, or email directly at contact@digidarwesh.com. Would you like me to schedule a call for you?";
      } else if (lowerInput.includes('portfolio') || lowerInput.includes('work') || lowerInput.includes('projects')) {
        response = "Our portfolio includes a variety of successful projects across different industries. You can explore them in detail in our Portfolio section. Is there a specific type of project you're interested in?";
      } else if (lowerInput.includes('chatbot') || lowerInput.includes('ai assistant')) {
        response = "Yes, we develop custom AI chatbots like me! Our chatbots can be integrated into websites, apps, or messaging platforms to provide 24/7 customer support, lead generation, or internal assistance. Would you like to discuss how a chatbot could help your business?";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote')) {
        response = "Our pricing varies based on project requirements. We offer custom quotes after understanding your specific needs. Would you like to schedule a consultation to discuss your project in detail?";
      } else {
        response = "That's an interesting question. I'd be happy to connect you with our team who can provide more detailed information. Would you like to leave your contact details?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("fixed z-50", {
      'bottom-4 right-4': position === 'bottom-right',
      'bottom-4 left-4': position === 'bottom-left'
    }, className)}>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {/* Chat window */}
      <div
        className={cn(
          "absolute bottom-16 glass-morphism rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden transition-all duration-300 transform origin-bottom-right",
          isOpen 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-90 opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ height: isOpen ? '500px' : '0' }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between bg-primary/80 p-4 text-white">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h3 className="font-medium">Digi Darwesh Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleChat}
            className="h-8 w-8 text-white hover:bg-primary-foreground/10"
          >
            <X size={18} />
          </Button>
        </div>
        
        {/* Chat messages */}
        <div className="h-[calc(500px-128px)] p-4 overflow-y-auto bg-black/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("mb-4 max-w-[80%] animate-slide-up", {
                "ml-auto": !message.isBot
              })}
            >
              <div
                className={cn("rounded-2xl p-3 shadow-sm", {
                  "bg-primary/80 text-white": !message.isBot,
                  "bg-secondary text-foreground": message.isBot
                })}
              >
                <div className="flex items-start gap-2">
                  {message.isBot && (
                    <div className="mt-1 flex-shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  {!message.isBot && (
                    <div className="mt-1 flex-shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              </div>
              <div 
                className={cn("text-xs text-muted-foreground mt-1", {
                  "text-right": !message.isBot
                })}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="mb-4 max-w-[80%]">
              <div className="bg-secondary text-foreground rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Bot size={16} />
                  <span className="flex space-x-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse animation-delay-200"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse animation-delay-400"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-border">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="flex-shrink-0 bg-primary hover:bg-primary/90"
              disabled={!input.trim() || isTyping}
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
