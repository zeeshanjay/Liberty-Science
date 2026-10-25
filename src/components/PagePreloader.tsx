"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function PagePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // Graceful timer: 1250ms total animation duration (swift, elite, never sluggish)
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1250);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1], // Luxury cubic-bezier curtain reveal
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b12] text-white select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[#ea580c]/10 blur-[120px]" />
          <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-[#635bff]/10 blur-[100px]" />

          {/* Central Luxury Brand Emblem & Monogram */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Logo Mark with Soft Glow & Scale Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-14 w-14 mb-4"
            >
              <Image
                src="/logo.png"
                alt="Liberty Science Torch"
                fill
                sizes="56px"
                className="object-contain filter drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                priority
              />
            </motion.div>

            {/* Brand Title with High-End Letter-Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span className="font-sans text-[13px] font-bold uppercase tracking-[0.28em] text-white">
                LIBERTY SCIENCE
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Life · Business · Health Advisory
              </span>
            </motion.div>

            {/* Razor-Thin Coherence Line Pulse */}
            <div className="mt-7 w-48 sm:w-56 h-[1px] bg-slate-800/80 overflow-hidden relative rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent"
              />
            </div>

            {/* Quiet Autonomic Sub-indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-slate-500"
            >
              <span>Vera Shury, C.H.C.</span>
              <span className="text-slate-700">·</span>
              <span className="text-[#ea580c] font-semibold">0.10 Hz Coherence</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
