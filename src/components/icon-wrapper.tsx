"use client";

import React from 'react';

export interface IconProps {
  className?: string;
}

export interface IconWrapperProps {
  icon: React.ComponentType<IconProps> | React.ReactNode;
  className?: string;
}

export function IconWrapper({ icon, className }: IconWrapperProps) {
  if (typeof icon === 'function') {
    return React.createElement(icon as React.ComponentType<IconProps>, { className });
  }
  
  return <>{icon}</>;
} 