"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IconWrapper } from "./icon-wrapper";
import type { IconProps } from "./icon-wrapper";

export interface SkillCategoryProps {
  title: string;
  icon: React.ComponentType<IconProps> | React.ReactNode | string;
  skills: string[];
  className?: string;
  delay?: number;
}

export function SkillCategory({
  title,
  icon,
  skills,
  className,
  delay = 0,
}: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold leading-none tracking-tight">
          <IconWrapper icon={icon} className="h-4 w-4" />
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border bg-muted/50 px-3 py-2 text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 