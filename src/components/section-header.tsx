"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export const SectionHeader = ({
  title,
  subtitle,
  className,
  containerClassName,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize particles
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      directionX: number;
      directionY: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const particleCount = 30; // Increased particle count
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 1; // Varied radius
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 0.4 + 0.1; // Slower for elegance
        const directionX = Math.random() * 2 - 1;
        const directionY = Math.random() * 2 - 1;
        const opacity = Math.random() * 0.6 + 0.2; // Higher baseline opacity

        // Generate colors in your theme's primary color range with more refined palette
        const colors = [
          "rgba(147, 51, 234, 0.5)", // purple-600
          "rgba(192, 132, 252, 0.4)", // purple-400
          "rgba(216, 180, 254, 0.3)", // purple-300
          "rgba(168, 85, 247, 0.5)", // purple-500
          "rgba(139, 92, 246, 0.45)", // violet-500
          "rgba(124, 58, 237, 0.4)", // violet-600
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x,
          y,
          radius,
          color,
          speed,
          directionX,
          directionY,
          opacity,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;

        // Boundary checks
        if (
          particle.x + particle.radius > canvas.width ||
          particle.x - particle.radius < 0
        ) {
          particle.directionX = -particle.directionX;
        }

        if (
          particle.y + particle.radius > canvas.height ||
          particle.y - particle.radius < 0
        ) {
          particle.directionY = -particle.directionY;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      }

      requestAnimationFrame(animateParticles);
    };

    // Initialize
    setCanvasDimensions();
    createParticles();
    animateParticles();

    // Handle resize
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-72 flex items-center bg-gradient-to-b from-background to-background/80 justify-center w-full group overflow-hidden rounded-xl border border-foreground/5",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Animated canvas for particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
            maskImage: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300/40 via-violet-400/40 to-indigo-500/40 opacity-60" />
        </motion.div>
      </div>

      {/* Spotlight effect */}
      <svg
        className="animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
        aria-hidden="true"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill="white"
            fillOpacity="0.21"
          />
        </g>
        <defs>
          <filter
            id="filter"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_1065_8"
            />
          </filter>
        </defs>
      </svg>

      {/* Title with gradient and animation */}
      <div className={cn("relative z-20 text-center px-6 max-w-3xl mx-auto", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Featured Work</span>
          </div>
          <motion.h1
            initial={{
              backgroundSize: "100% 0%",
            }}
            animate={{
              backgroundSize: "100% 100%",
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-600 to-indigo-500 [--bg-size:300%] animate-gradient tracking-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-8 max-w-[800px] text-muted-foreground text-base md:text-lg mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          <div
            className="absolute inset-0 block h-full w-full animate-pulse bg-gradient-to-r from-purple-400/20 via-violet-500/20 to-indigo-500/10 opacity-15 blur-3xl"
          />
        </motion.div>
      </div>
    </div>
  );
}; 