"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  index: string;
  quote: string;
  author: string;
  role: string;
}

const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    index: "01",
    quote: "You are my resource for my future.",
    author: "Terry S.",
    role: "Business Principal & Succession Advisory",
  },
  {
    index: "02",
    quote: "I have lost weight and don’t fall anymore.",
    author: "Pat P.",
    role: "Neuromuscular Stability & Balance",
  },
  {
    index: "03",
    quote: "I always feel better and am happier after our session.",
    author: "Linda V.",
    role: "Autonomic Coherence & Vitality",
  },
  {
    index: "04",
    quote: "You helped me see more options.",
    author: "Dave K.",
    role: "Executive Strategy & Decision Clarity",
  },
];

function TestimonialChamber({
  item,
  idx,
  hoveredIndex,
  setHoveredIndex,
}: {
  item: TestimonialItem;
  idx: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isHovered = hoveredIndex === idx;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: idx * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "group relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 transition-opacity duration-500",
        idx === 0 && "border-b border-slate-100 md:border-r",
        idx === 1 && "border-b border-slate-100",
        idx === 2 && "border-b border-slate-100 md:border-b-0 md:border-r",
        isDimmed ? "opacity-45" : "opacity-100"
      )}
    >
      {/* Subtle Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(15, 110, 104, 0.045), transparent 75%)`,
        }}
      />

      {/* Top Index & Editorial Quote Mark */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.2em] text-stone-400 transition-colors duration-300 group-hover:text-slate-900">
          {item.index}
        </span>
        <span className="font-serif text-3xl leading-none text-stone-300 select-none transition-colors duration-300 group-hover:text-[#635bff]">
          &ldquo;
        </span>
      </div>

      {/* Main Editorial Serif Quote */}
      <motion.blockquote
        animate={{ y: isHovered ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative z-10 my-8 sm:my-10 font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal italic leading-[1.2] tracking-tight text-slate-900"
      >
        &ldquo;{item.quote}&rdquo;
      </motion.blockquote>

      {/* Bottom Attribution with Kinetic Hairline */}
      <div className="relative z-10">
        <div className="relative h-[1px] w-full overflow-hidden bg-stone-200/80">
          <motion.div
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full origin-left bg-slate-900"
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            {item.author}
          </span>
          <span className="text-xs text-stone-400 transition-colors duration-300 group-hover:text-stone-600">
            {item.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section
      id="testimonials"
      className="relative py-10 sm:py-14 border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Split Header — Zero Badges or Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Direct Words from{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#635bff] to-[#ea580c] bg-clip-text text-transparent">
              Active Clients.
            </span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            Unscripted reflections across executive succession, nervous system
            calibration, and physical stability.
          </p>
        </motion.div>

        {/* Architectural 2x2 Hairline Matrix */}
        <div className="mt-8 sm:mt-10 overflow-hidden rounded-[32px] border border-slate-200/90 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {CLIENT_TESTIMONIALS.map((item, idx) => (
              <TestimonialChamber
                key={item.author}
                item={item}
                idx={idx}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
