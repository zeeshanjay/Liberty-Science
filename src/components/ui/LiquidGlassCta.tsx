"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LiquidGlassCtaProps extends Omit<HTMLMotionProps<"a">, "ref"> {
  href: string;
  variant?: "dark-glass" | "light-glass" | "nav-glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  showArrow?: boolean;
  showPulse?: boolean;
  className?: string;
}

export function LiquidGlassCta({
  href,
  variant = "dark-glass",
  size = "md",
  children,
  showArrow = true,
  showPulse = false,
  className,
  ...props
}: LiquidGlassCtaProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const buttonRef = React.useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-[12px] gap-2",
    md: "px-5 py-3 text-[13px] gap-2.5",
    lg: "px-7 py-3.5 sm:py-4 text-sm font-semibold gap-3",
  }[size];

  const variantClasses = {
    "dark-glass":
      "bg-[#0f2e2b]/95 text-white backdrop-blur-xl border border-emerald-400/25 shadow-[0_12px_32px_-10px_rgba(15,46,43,0.5),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.4)] hover:border-emerald-300/40 hover:bg-[#133d39]",
    "light-glass":
      "bg-white/80 text-stone-900 backdrop-blur-xl border border-stone-200/90 shadow-[0_8px_24px_-8px_rgba(15,46,43,0.1),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.05)] hover:border-[#0f6e68]/40 hover:bg-white hover:text-[#0f2e2b]",
    "nav-glass":
      "bg-[#0f3b38]/95 text-emerald-50 backdrop-blur-xl border border-emerald-400/25 shadow-[0_6px_20px_-6px_rgba(15,59,56,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-emerald-300/50 hover:bg-[#134e4a]",
  }[variant];

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -1.5 }}
      whileTap={{ scale: 0.98, y: 0.5 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full select-none cursor-pointer tracking-wide transition-all duration-300",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {/* Liquid Glass Dynamic Radial Glare follow mouse */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -inset-px rounded-full opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(110px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.22), transparent 70%)`,
          }}
        />
      )}

      {/* Glass Top Rim Specular Highlight */}
      <span className="pointer-events-none absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Subtle Linear Shimmer sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* Optional Live Pulse Dot */}
      {showPulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Minimal Diagonal Arrow */}
      {showArrow && (
        <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white group-hover:text-[#0f2e2b]">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </motion.a>
  );
}
