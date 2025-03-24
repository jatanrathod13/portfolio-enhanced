"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IconWrapper, type IconProps } from "./icon-wrapper";
import { EnhancedSkillBadge } from "./enhanced-skill-badge";

export interface EnhancedSkillCategoryProps {
  title: string;
  icon: React.ComponentType<IconProps> | ReactNode | string;
  skills: string[];
  className?: string;
  delay?: number;
}

export function EnhancedSkillCategory({
  title,
  icon,
  skills,
  className,
  delay = 0,
}: EnhancedSkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col space-y-1.5 p-4 lg:p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold leading-none tracking-tight">
          <IconWrapper icon={icon} className="h-5 w-5 text-primary" />
          {title}
        </h3>
      </div>
      <div className="p-4 lg:p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {skills.map((skill, index) => (
            <EnhancedSkillBadge
              key={skill}
              skill={skill}
              delay={delay + index * 0.05}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 