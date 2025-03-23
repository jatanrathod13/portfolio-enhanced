"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SkillCategory({
  title,
  skills,
  icon,
  className,
  delay = 0,
}: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "flex flex-col space-y-3 p-4 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm hover:border-border/80 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <div className="text-primary/80">{icon}</div>}
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="px-2 py-0.5 text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
} 