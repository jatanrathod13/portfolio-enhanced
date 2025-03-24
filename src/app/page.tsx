import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import type { ReactNode } from "react";
import { FeaturedProject } from "@/components/featured-project";
import { SectionTitle } from "@/components/section-title";
import { SectionHeader } from "@/components/section-header";
import { SkillCategory } from "@/components/skill-category";
import { EnhancedSkillCategory } from "@/components/enhanced-skill-category";
import { IconWrapper } from "@/components/icon-wrapper";
import { ArrowUpCircle } from "lucide-react";

// Define a more specific type that includes clientIcon and clientLogos
type ProjectWithIcon = (typeof DATA.projects[number]) & {
  clientIcon?: ReactNode;
  clientLogo?: string;
  clientLogos?: string[];
};

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const navigationItems = [
    { id: "hero", label: "Home", icon: "home" },
    { id: "about", label: "About", icon: "user" },
    { id: "work", label: "Experience", icon: "briefcase" },
    { id: "education", label: "Education", icon: "notebook" },
    { id: "projects", label: "Projects", icon: "layers" },
    { id: "skills", label: "Skills", icon: "brain" },
    { id: "contact", label: "Contact", icon: "mail" },
  ];

  // Get the first project for the featured section
  const featuredProject = DATA.projects[0];

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 relative">
      <section id="hero" className="pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="gap-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tight sm:text-5xl/tight"
                yOffset={8}
                text="Hi, I'm Jatan Rathod 👋"
              />
              <BlurFadeText
                className="max-w-[800px] text-muted-foreground md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 md:size-40 border">
                <AvatarImage 
                  alt={DATA.name} 
                  src={DATA.avatarUrl} 
                  className="object-cover" 
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      
      <section id="about" className="w-full max-w-3xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl font-bold mb-4">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <section id="work" className="w-full max-w-3xl mx-auto">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionTitle 
            title="Work Experience" 
            badge="Experience"
            subtitle="I've worked with various organizations to deliver impactful data solutions."
            delay={BLUR_FADE_DELAY * 5}
          />
          
          <div className="space-y-6">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <section id="education" className="w-full max-w-3xl mx-auto">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionTitle 
            title="Education" 
            badge="Education"
            delay={BLUR_FADE_DELAY * 7}
            showBadge={false}
          />
          
          <div className="space-y-4">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <section id="projects" className="w-full max-w-3xl mx-auto mb-16">
        <SectionTitle
          title="Featured Projects"
          badge="Projects"
          subtitle="I've developed and delivered impactful, enterprise-grade data and AI systems for diverse organizations, ranging from federal agencies to Fortune 500 companies."
          delay={BLUR_FADE_DELAY * 9}
        />
        
        <div className="w-full mt-6 mb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
            <FeaturedProject
              title={featuredProject.title}
              href={featuredProject.href || undefined}
              description={featuredProject.description}
              tags={featuredProject.technologies}
              client={featuredProject.client}
              clientLogo={(featuredProject as ProjectWithIcon).clientLogo}
              clientLogos={(featuredProject as ProjectWithIcon).clientLogos}
              clientIcon={(featuredProject as ProjectWithIcon).clientIcon}
              delay={0}
            />
          </BlurFade>
        </div>
        
        <SectionTitle 
          title="More Projects" 
          subtitle="Here are some other projects I've worked on."
          delay={BLUR_FADE_DELAY * 10}
          showBadge={false}
        />
        
        <div className="w-full mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DATA.projects.slice(1).map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 11 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  client={project.client}
                  clientLogo={(project as ProjectWithIcon).clientLogo}
                  clientLogos={(project as ProjectWithIcon).clientLogos}
                  clientIcon={(project as ProjectWithIcon).clientIcon}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <section id="skills" className="w-full max-w-3xl mx-auto">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionTitle 
            title="Skills & Expertise" 
            badge="Skills"
            subtitle="My technical skills span across various domains of data engineering and AI."
            delay={BLUR_FADE_DELAY * 12}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DATA.skillCategories.map((category, id) => (
              <EnhancedSkillCategory
                key={category.title}
                title={category.title}
                skills={category.skills as unknown as string[]}
                icon={category.icon}
                delay={BLUR_FADE_DELAY * 13 + id * 0.05}
              />
            ))}
          </div>
        </div>
      </section>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <section id="contact" className="w-full max-w-3xl mx-auto mb-16">
        <SectionTitle 
          title="Get in Touch" 
          badge="Contact"
          subtitle={`Want to chat? Just shoot me a dm with a direct question on twitter and I'll respond whenever I can. I will ignore all soliciting.`}
          delay={BLUR_FADE_DELAY * 14}
        />
        
        <BlurFade delay={BLUR_FADE_DELAY * 15} className="mt-6 flex justify-center">
          <Link
            href={DATA.contact.social.X.url}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-5 py-2"
          >
            <IconWrapper icon="twitter" className="h-5 w-5 mr-2" />
            Message on Twitter
          </Link>
        </BlurFade>
      </section>
      
      <a 
        href="#hero" 
        className="fixed bottom-24 right-8 bg-background/80 border border-border/40 rounded-full p-2 shadow-lg backdrop-blur-md z-50 hover:bg-accent transition-colors"
        aria-label="Back to top"
      >
        <ArrowUpCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
