import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import React from "react";
import { IconWrapper } from "./icon-wrapper";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    title?: string;
    icon?: string | React.ReactNode;
    type?: string;
    href: string;
  }[];
  className?: string;
  client?: string;
  clientLogo?: string | null;
  clientLogos?: string[];
  clientIcon?: React.ReactNode;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  client,
  clientLogo,
  clientLogos,
  clientIcon,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border border-border/40 rounded-lg transition-all duration-300 h-full hover:border-border/80 bg-card/50 backdrop-blur-sm",
        className
      )}
    >
      <Link
        href={href || "#"}
        className={cn("block", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-48 w-full object-cover"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-48 w-full overflow-hidden object-cover"
          />
        )}
      </Link>
      
      <CardHeader className="px-5 pt-5 pb-2">
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold tracking-tight leading-tight">{title}</CardTitle>
          
          {client && (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3 mt-1">
                {clientLogo && (
                  <div className="flex-shrink-0 bg-white p-1 rounded-md shadow-sm">
                    <Image
                      src={clientLogo}
                      alt={client}
                      width={36}
                      height={36}
                      className="h-8 w-auto object-contain"
                      style={{ objectFit: 'contain', maxWidth: '120px' }}
                      unoptimized={clientLogo.endsWith('.svg') || clientLogo.includes('encrypted-tbn0')}
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
                          unoptimized={logo.endsWith('.svg') || logo.includes('encrypted-tbn0')}
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
              </div>
              <div className="text-sm font-medium text-primary/80 flex items-center">
                <div className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                <span>{client}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-5 py-3 flex-grow">
        <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert leading-relaxed prose-p:mt-2 prose-p:mb-2">
          {description}
        </Markdown>
      </CardContent>
      
      <CardFooter className="flex flex-col mt-auto px-5 pt-2 pb-5">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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
        
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1 mt-3">
            {links?.map((link) => (
              <Link 
                href={link?.href} 
                key={`${link.title || link.type || ''}-${link.href}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Badge className="flex gap-2 px-2 py-1 text-xs">
                  {link.icon && typeof link.icon === 'string' ? 
                    <IconWrapper icon={link.icon} className="h-4 w-4" /> : 
                    link.icon}
                  {link.title || link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
