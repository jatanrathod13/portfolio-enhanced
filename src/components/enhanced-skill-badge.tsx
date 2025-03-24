"use client";

import { type ReactNode } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconWrapper, type IconProps } from "./icon-wrapper";

export interface EnhancedSkillBadgeProps {
  skill: string;
  icon?: React.ComponentType<IconProps> | ReactNode | string;
  className?: string;
  delay?: number;
}

export function EnhancedSkillBadge({
  skill,
  icon,
  className,
  delay = 0,
}: EnhancedSkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm px-3 py-2 flex items-center gap-2 hover:bg-muted/50 transition-all",
        className
      )}
    >
      {icon && <IconWrapper icon={icon} className="h-4 w-4 text-primary" />}
      <span className="text-sm font-medium">{skill}</span>
    </motion.div>
  );
} 