"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, BookOpen } from "lucide-react";

export function FeaturedMonographSection() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#0a0f1d] p-8 sm:p-12 text-white shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Narrative Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 block">
                Clinical Monograph Series · Monograph 01
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-[1.15]">
                The Metabolic Neuroplasticity Protocol™
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-slate-300 leading-snug">
                Why lasting neural rewiring begins with cellular fuel, not just practice: resolving the 70% relapse bottleneck of standard rehabilitation.
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                In this foundational clinical monograph, <strong>Vera Shury, C.H.C.</strong>, synthesizes 20+ years of clinical practice into a three-stage bioenergetic model. By aligning mitochondrial substrate and HeartMath® autonomic coherence before executing high-amplitude PWR!Moves drills, synaptic connections consolidate with permanent retention.
              </p>

              {/* Three Clinical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Pillar I · Fuel
                  </span>
                  <div className="font-bold text-white">Cellular Priming</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Glycemic stability &amp; mitochondrial ATP flux.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Pillar II · Frequency
                  </span>
                  <div className="font-bold text-white">0.1 Hz Coherence</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    HeartMath® vagal calming to quiet amygdala fear.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Pillar III · Signal
                  </span>
                  <div className="font-bold text-white">Neuro-Drills</div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    PWR!Moves reactive motor-map consolidation.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-md hover:bg-slate-100 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Read Clinical Monograph</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                >
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span>Download / Print PDF</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Column (5 Cols) */}
            <div className="lg:col-span-5">
              <Link
                href="/research"
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl transition-all duration-300 hover:border-slate-500"
              >
                <Image
                  src="/research/metabolic-neuroplasticity-cover.jpg"
                  alt="Metabolic Neuroplasticity Clinical Cover Illustration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                    Clinical Taxonomy Code 71400000X
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Vera Shury, C.H.C. · Liberty Science Coaching
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                    Peer-reviewed clinical practice foundation · Tucson, AZ
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}