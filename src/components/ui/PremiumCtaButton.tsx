"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PremiumCtaButtonProps
  extends Omit<HTMLMotionProps<"a">, "ref"> {
  href: string;
  variant?: "primary" | "secondary" | "nav";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export function PremiumCtaButton({
  href,
  variant = "primary",
  size = "md",
  children,
  showArrow = true,
  className,
  ...props
}: PremiumCtaButtonProps) {
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
    sm: "h-9 px-4 text-[12px] gap-2",
    md: "h-11 px-5 text-[13px] gap-2.5",
    lg: "h-12 sm:h-13 px-6 sm:px-7 text-[13px] sm:text-[14px] gap-3",
  }[size];

  const variantClasses = {
    primary: cn(
      "bg-[#111918] text-stone-50",
      "ring-1 ring-inset ring-white/12",
      "shadow-[0_10px_28px_-8px_rgba(15,23,42,0.35),0_2px_6px_rgba(15,23,42,0.12)]",
      "hover:bg-[#182523] hover:ring-white/20 hover:shadow-[0_14px_34px_-8px_rgba(15,23,42,0.45)]"
    ),
    secondary: cn(
      "bg-white text-zinc-900",
      "ring-1 ring-inset ring-stone-200/90",
      "shadow-[0_2px_10px_-3px_rgba(15,23,42,0.06)]",
      "hover:bg-[#111918] hover:text-stone-50 hover:ring-[#111918] hover:shadow-[0_10px_24px_-6px_rgba(15,23,42,0.25)]"
    ),
    nav: cn(
      "bg-[#111918] text-stone-50",
      "ring-1 ring-inset ring-white/12",
      "shadow-[0_4px_14px_-4px_rgba(15,23,42,0.28)]",
      "hover:bg-[#182523] hover:ring-white/20"
    ),
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
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.985, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full select-none cursor-pointer overflow-hidden tracking-tight font-medium transition-colors duration-300",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {/* Subtle Cursor Spotlight Glare */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -inset-px rounded-full opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(90px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.11), transparent 75%)`,
          }}
        />
      )}

      {/* Top Specular Hairline */}
      <span className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Button Text */}
      <span className="relative z-10">{children}</span>

      {/* Framer-Style Kinetic Dual-Arrow Mask */}
      {showArrow && (
        <span className="relative z-10 inline-flex h-3.5 w-3.5 items-center justify-center overflow-hidden">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3.5 group-hover:-translate-y-3.5" />
          <ArrowUpRight className="absolute h-3.5 w-3.5 -translate-x-3.5 translate-y-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </motion.a>
  );
}
