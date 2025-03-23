"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion } from "framer-motion";

interface FeaturedProjectProps {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  client?: string;
  clientLogo?: string;
  clientLogos?: string[];
  clientIcon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FeaturedProject({
  title,
  href,
  description,
  tags,
  image,
  video,
  client,
  clientLogo,
  clientLogos,
  clientIcon,
  className,
  delay = 0,
}: FeaturedProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("overflow-hidden rounded-xl", className)}
    >
      <Card className="flex flex-col overflow-hidden border border-border/40 rounded-lg transition-all duration-300 hover:border-border/80 bg-card/50 backdrop-blur-sm h-full">
        {(video || image) && (
          <div className="relative w-full h-56 overflow-hidden">
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none h-full w-full object-cover"
              />
            )}
            {image && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
        
        <div className="p-6 flex flex-col h-full">
          <CardHeader className="px-0 pt-0 pb-2">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
              
              {client && (
                <div className="flex items-center gap-3 my-1">
                  {clientLogo && (
                    <div className="flex-shrink-0 bg-white p-1 rounded-md shadow-sm">
                      <Image
                        src={clientLogo}
                        alt={client}
                        width={36}
                        height={36}
                        className="h-8 w-auto object-contain"
                        style={{ objectFit: 'contain', maxWidth: '120px' }}
                        unoptimized={clientLogo.endsWith('.svg')}
                        quality={100}
                        loading="eager"
                      />
                    </div>
                  )}
                  {clientLogos && clientLogos.length > 0 && (
                    <div className="flex gap-3">
                      {clientLogos.map((logo) => (
                        <div key={logo} className="flex-shrink-0 bg-white p-1 rounded-md shadow-sm">
                          <Image
                            src={logo}
                            alt={`${client} Logo`}
                            width={36}
                            height={36}
                            className="h-8 w-auto object-contain"
                            style={{ objectFit: 'contain', maxWidth: '120px' }}
                            unoptimized={logo.endsWith('.svg')}
                            quality={100}
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {clientIcon && (
                    <div className="flex-shrink-0 text-foreground">
                      {React.isValidElement(clientIcon) 
                        ? React.cloneElement(clientIcon as React.ReactElement, { 
                            className: "h-8 w-auto",
                          })
                        : clientIcon}
                    </div>
                  )}
                  <div className="text-sm font-medium text-primary/80 flex items-center">
                    <div className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                    <span>{client}</span>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="px-0 py-2 flex-grow">
            <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert leading-relaxed prose-p:mt-2 prose-p:mb-2">
              {description}
            </Markdown>
          </CardContent>
          
          <CardFooter className="flex flex-col items-start mt-auto px-0 pt-2 pb-0">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags?.map((tag) => (
                  <Badge
                    className="px-2 py-0.5 text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors font-medium"
                    variant="secondary"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {href && (
              <Link 
                href={href} 
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline group"
              >
                View Project 
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
} 