"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

interface BannerCardItem {
  title: string;
  description: string;
  ctaText: string;
  href: string;
  variant: "gradient" | "geometric";
}

const BANNER_CARDS: BannerCardItem[] = [
  {
    title: "Targeted Acute Mini-Programs",
    description:
      "5-session sprint interventions engineered for acute priorities—PWR! Parkinson's Power Up, Senior Fall Immunity, Posture Revival, or Jumpstart Weight Loss.",
    ctaText: "Explore mini-programs",
    href: CALENDAR_URL,
    variant: "gradient",
  },
  {
    title: "Explorer Diagnostic Intake",
    description:
      "Comprehensive 60-minute intake pairing Sensitive Motivational Interviewing, clinical risk evaluation, and bespoke neuro-metabolic protocol design.",
    ctaText: "Schedule intake session",
    href: CALENDAR_URL,
    variant: "geometric",
  },
];

export function StripeBannerCards() {
  return (
    <div className="mt-8 sm:mt-10 max-w-6xl mx-auto">
      {/* Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Targeted entry horizons before full retainer commitments.
        </h3>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
          <span>
            Healthcare Taxonomy Code:{" "}
            <strong className="font-mono font-semibold text-slate-900">71400000X</strong>
          </span>
        </div>
      </div>

      {/* 2-Column Clean Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BANNER_CARDS.map((card, idx) => (
          <motion.a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -3 }}
            className={cn(
              "group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border bg-white p-7 sm:p-8 transition-all duration-300",
              "border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-8px_rgba(15,23,42,0.05)]",
              "hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.09)]"
            )}
          >
            {/* Left Content (Clean, elegant inline typography — zero badges) */}
            <div className="relative z-10 max-w-[62%] sm:max-w-[65%]">
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-600">
                <strong className="font-semibold text-slate-900">
                  {card.title}.
                </strong>{" "}
                {card.description}
              </p>
            </div>

            {/* Bottom Action Link (Clean link with arrow) */}
            <div className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#ea580c] group-hover:text-[#c2410c] transition-colors">
              <span>{card.ctaText}</span>
              <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1">
                ›
              </span>
            </div>

            {/* Right-Side Graphic: Subtle Shape Variation of the Premium Aesthetic */}
            {card.variant === "gradient" ? (
              /* Smooth Fluorescent Violet/Indigo Curved Glow */
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-6 -bottom-6 w-[48%] overflow-hidden"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0) 18%, rgba(217, 70, 239, 0.45) 38%, rgba(147, 51, 234, 0.85) 65%, rgba(99, 102, 241, 1) 100%)",
                    clipPath: "polygon(34% 0%, 100% 0%, 100% 100%, 8% 100%)",
                    filter: "blur(16px)",
                  }}
                />
                <div className="absolute -right-6 top-1/3 h-32 w-32 rounded-full bg-violet-400 blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-85" />
              </div>
            ) : (
              /* Clean Geometric Origami Facet in Amber & Orange */
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 top-0 bottom-0 w-[44%] overflow-hidden"
              >
                <svg
                  viewBox="0 0 240 180"
                  preserveAspectRatio="none"
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                >
                  <defs>
                    <linearGradient
                      id="origamiGold"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#facc15" />
                    </linearGradient>
                    <linearGradient
                      id="origamiAmber"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient
                      id="origamiDeep"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="100%" stopColor="#9a3412" />
                    </linearGradient>
                  </defs>

                  {/* Left Facet: Luminous Gold Angled Wedge */}
                  <polygon
                    points="70,180 155,10 195,180"
                    fill="url(#origamiGold)"
                  />
                  {/* Center-Right Facet: Bright Amber-Orange Prism */}
                  <polygon
                    points="155,10 240,0 240,180 195,180"
                    fill="url(#origamiAmber)"
                  />
                  {/* Depth Corner Wedge */}
                  <polygon
                    points="198,45 240,0 240,180"
                    fill="url(#origamiDeep)"
                    opacity="0.85"
                  />
                </svg>
              </div>
            )}
          </motion.a>
        ))}
      </div>

      {/* Discovery Call Prompt Line */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Unsure where your physiology fits?{" "}
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 hover:text-[#ea580c] underline underline-offset-4 transition-colors"
          >
            Schedule a confidential 30-minute Discovery Call (Free) ›
          </a>
        </p>
      </div>
    </div>
  );
}
