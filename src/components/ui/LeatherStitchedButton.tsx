"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeatherStitchedButtonProps
  extends Omit<HTMLMotionProps<"a">, "ref"> {
  href: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export function LeatherStitchedButton({
  href,
  size = "md",
  children,
  showArrow = true,
  className,
  ...props
}: LeatherStitchedButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-[12px] rounded-[14px]",
    md: "h-11 px-5 text-[13px] rounded-[16px]",
    lg: "h-13 sm:h-14 px-7 sm:px-8 text-sm sm:text-base rounded-[18px]",
  }[size];

  const stitchRadius = {
    sm: "rounded-[10px] inset-[4px]",
    md: "rounded-[12px] inset-[5px]",
    lg: "rounded-[14px] inset-[6px]",
  }[size];

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.975, y: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center justify-center font-bold tracking-wide select-none cursor-pointer overflow-hidden",
        "border border-[#5c2707]/90",
        "shadow-[0_4px_14px_rgba(90,38,6,0.35),0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1.5px_rgba(255,235,195,0.45),inset_0_-2px_4px_rgba(40,15,3,0.55)]",
        "transition-all duration-200 hover:brightness-105 hover:shadow-[0_8px_24px_rgba(115,50,9,0.5),inset_0_1px_2px_rgba(255,245,215,0.6)]",
        sizeClasses,
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, #d88133 0%, #c47127 25%, #a75417 65%, #883e0c 100%)",
      }}
      {...props}
    >
      {/* Micro-texture grid perforation overlay matching the image */}
      <span
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 0.75px, transparent 0.75px), radial-gradient(circle at 4px 4px, #000 0.75px, transparent 0.75px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Signature Inset Dashed Stitching Line (Leathercraft Stitch) */}
      <span
        className={cn(
          "pointer-events-none absolute border-[1.5px] border-dashed border-[#3e1b05]/65 shadow-[0_1px_0_rgba(255,230,185,0.3)]",
          stitchRadius
        )}
      />

      {/* Top Specular Rim Glare */}
      <span className="pointer-events-none absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#ffe8bf]/60 to-transparent" />

      {/* Embossed Text with Deep Drop Shadow */}
      <span className="relative z-10 flex items-center gap-2 text-[#FFF5DE] [text-shadow:_0_1px_0_rgba(255,255,255,0.35),_0_2px_3px_rgba(45,17,3,0.85)] font-bold">
        <span>{children}</span>
        {showArrow && (
          <span className="flex h-4 w-4 items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-[#FFF2D6] stroke-[2.5]" />
          </span>
        )}
      </span>
    </motion.a>
  );
}
