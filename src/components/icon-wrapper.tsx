"use client";

import React from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Brain, 
  Layers, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin,
  Database,
  Code,
  LineChart,
  Laptop,
  Network,
  BookOpen,
  LucideIcon
} from 'lucide-react';

export interface IconProps {
  className?: string;
}

export interface IconWrapperProps {
  icon: React.ComponentType<IconProps> | React.ReactNode | string;
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
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  database: Database,
  code: Code,
  lineChart: LineChart,
  notebook: BookOpen,
  laptop: Laptop,
  network: Network
};

export function IconWrapper({ icon, className }: IconWrapperProps) {
  // Handle string identifiers first
  if (typeof icon === 'string' && iconMap[icon]) {
    return React.createElement(iconMap[icon], { className });
  }
  
  // Handle function components
  if (typeof icon === 'function') {
    return React.createElement(icon as React.ComponentType<IconProps>, { className });
  }
  
  // Fall back to rendering as-is
  return <>{icon}</>;
} 