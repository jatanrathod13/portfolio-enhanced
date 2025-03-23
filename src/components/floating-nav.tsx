"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Brain, 
  Layers, 
  Mail, 
  Twitter, 
  LucideIcon 
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface FloatingNavProps {
  items: NavItem[];
  navBg?: string; // Optional background color
  className?: string;
}

// Map string identifiers to actual icon components
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  user: User,
  briefcase: Briefcase,
  brain: Brain,
  layers: Layers,
  mail: Mail,
  twitter: Twitter
};

export function FloatingNav({ items, className }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Find the active section
      const sections = items.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY + 200; // Offset for better accuracy
      
      const current = sections.findIndex(section => {
        if (!section) return false;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        return scrollY >= sectionTop && scrollY < sectionTop + sectionHeight;
      });
      
      if (current !== -1) {
        setActiveSection(items[current].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust offset as needed
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md bg-background/80 border border-border/40 rounded-full px-4 py-2 shadow-lg",
            className
          )}
        >
          <nav className="flex items-center space-x-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center justify-center px-3 py-1.5 rounded-full text-sm transition-colors duration-200",
                  activeSection === item.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.icon && iconMap[item.icon] && React.createElement(iconMap[item.icon], { className: 'h-4 w-4' })}
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 