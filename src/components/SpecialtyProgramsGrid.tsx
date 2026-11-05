"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Briefcase,
  Activity,
  Check,
  Calendar,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";
import { SPECIALTY_PROGRAMS, SpecialtyProgram } from "@/data/specialtyPrograms";
import { AffirmPromo } from "@/components/AffirmPromo";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

type PillarFilter = "all" | "life" | "business" | "health";

export function SpecialtyProgramsGrid() {
  const [activeFilter, setActiveFilter] = useState<PillarFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = SPECIALTY_PROGRAMS.filter((program) => {
    const matchesFilter =
      activeFilter === "all" || program.pillar === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPillarIcon = (pillar: SpecialtyProgram["pillar"]) => {
    switch (pillar) {
      case "life":
        return <Compass className="h-3.5 w-3.5 text-amber-600" />;
      case "business":
        return <Briefcase className="h-3.5 w-3.5 text-emerald-600" />;
      case "health":
        return <Activity className="h-3.5 w-3.5 text-sky-600" />;
    }
  };

  const getPillarBadgeStyle = (pillar: SpecialtyProgram["pillar"]) => {
    switch (pillar) {
      case "life":
        return "bg-amber-50 text-amber-900 border-amber-200/80";
      case "business":
        return "bg-emerald-50 text-emerald-900 border-emerald-200/80";
      case "health":
        return "bg-sky-50 text-sky-900 border-sky-200/80";
    }
  };

  return (
    <section id="specialty-programs" className="mt-14 pt-10 border-t border-slate-200/80">
      {/* Header Row: Heading First (No eyebrow above heading) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Specialty Entry Programs &amp; 5-Session Sprints
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Accessible entry horizons designed by <strong>Vera Shury, MS, LBHC</strong> to address acute priorities, clear pattern stalls, and build momentum before or alongside long-term retainer engagements.
          </p>
        </div>

        <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 shadow-xs self-start lg:self-auto">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>
            Licensed Board Certified Health Coach (<strong className="font-semibold text-slate-900">LBHC</strong>) · Taxonomy <strong className="font-mono text-slate-900">71400000X</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeFilter === "all"
                ? "bg-white text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            )}
          >
            All Programs ({SPECIALTY_PROGRAMS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("life")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
              activeFilter === "life"
                ? "bg-white text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            )}
          >
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            <span>Life Advisory (5)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("business")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
              activeFilter === "business"
                ? "bg-white text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            )}
          >
            <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
            <span>Business Advisory (2)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("health")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
              activeFilter === "health"
                ? "bg-white text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            )}
          >
            <Activity className="h-3.5 w-3.5 text-sky-600" />
            <span>Health Advisory (9)</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs..."
            className="w-full h-9 pl-8 pr-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredPrograms.map((program) => (
            <motion.div
              layout
              key={program.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      getPillarBadgeStyle(program.pillar)
                    )}
                  >
                    {getPillarIcon(program.pillar)}
                    <span>{program.pillarLabel}</span>
                  </span>

                  {program.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-white px-2.5 py-0.5 text-[10px] font-semibold tracking-wide">
                      <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                      <span>{program.badge}</span>
                    </span>
                  )}
                </div>

                {/* Program Title */}
                <h4 className="text-base sm:text-lg font-bold tracking-tight text-slate-950 leading-snug">
                  {program.title}
                </h4>
                <p className="mt-0.5 text-xs font-semibold text-slate-600">
                  {program.subtitle}
                </p>

                {/* Summary */}
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {program.summary}
                </p>

                {/* Bullets */}
                <ul className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-100">
                  {program.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug"
                    >
                      <Check className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & Actions */}
              <div className="mt-5 pt-3.5 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-950 font-mono">
                      {program.specialPrice}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {program.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {program.duration}
                  </span>
                </div>

                {/* Affirm Financing Notice */}
                <div className="mb-3">
                  <AffirmPromo
                    amountCents={program.amountCents}
                    programName={program.title}
                    stripeUrl={program.stripeCheckoutUrl}
                    compact={true}
                  />
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={program.stripeCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Enroll · {program.specialPrice}</span>
                  </a>

                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Book free 15-minute Discovery Call"
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Discovery</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2-Column Horizon Banners: Explorer ($75) + Free Discovery ($0) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Explorer Session ($75) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono">
                1-Hour Diagnostic Intake
              </span>
              <span className="font-mono text-xl font-bold text-slate-900">$75</span>
            </div>
            <h4 className="text-base font-bold text-slate-950">
              Explorer Diagnostic Session
            </h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Virtual motivational interview and clinical risk assessment to evaluate baseline biological and executive friction, answer key questions, and co-design a personalized options roadmap.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
            <a
              href="https://buy.stripe.com/bJeaEYbds2do5ex7cw43S04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Book Explorer · $75</span>
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>Calendar</span>
            </a>
          </div>
        </div>

        {/* Discovery Call (Free 15-Min) */}
        <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Complimentary 15-Min
              </span>
              <span className="font-mono text-xl font-bold text-emerald-800">FREE</span>
            </div>
            <h4 className="text-base font-bold text-slate-950">
              Discovery &amp; Readiness Call
            </h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Virtual motivational interview with <strong>Vera Shury, MS, LBHC</strong> to spark creative solutions, evaluate whether your stall is in life, business, or health, and receive tailored initial resources.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-emerald-200/60 flex items-center gap-2">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule Free Discovery Call ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
