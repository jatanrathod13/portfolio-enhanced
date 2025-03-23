import React from 'react';
import { cn } from '@/lib/utils';
import BlurFade from '@/components/magicui/blur-fade';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  contentClassName?: string;
  badgeClassName?: string;
  delay?: number;
  showBadge?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  badge,
  className,
  contentClassName,
  badgeClassName,
  delay = 0,
  showBadge = true,
}: SectionTitleProps) {
  return (
    <BlurFade delay={delay} className={cn("space-y-3", className)}>
      <div className={cn("space-y-3", contentClassName)}>
        {showBadge && (
          <div className={cn("inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm", badgeClassName)}>
            {badge || title}
          </div>
        )}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </BlurFade>
  );
} 