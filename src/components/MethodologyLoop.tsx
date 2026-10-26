"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

interface MethodologyCardData {
  id: string;
  title: string;
  summary: string;
  ctaLabel: string;
  visualType: "coherence" | "loop" | "nutrition";
  accentHex: string;
}

const METHODOLOGY_CARDS: MethodologyCardData[] = [
  {
    id: "coherence-first",
    title: "HeartMath Coherence First",
    summary:
      "Reducing systemic nervous stress and elevating Heart Rate Variability (HRV) so neuroplastic wiring is biologically unlocked.",
    ctaLabel: "Book Consultation",
    visualType: "coherence",
    accentHex: "#635bff",
  },
  {
    id: "brain-body-loop",
    title: "The Brain-Body Loop",
    summary:
      "Fuel, movement, and deliberate cortical attention paired in real time for neuromuscular re-education, balance, and cognitive stamina.",
    ctaLabel: "Explore Protocol",
    visualType: "loop",
    accentHex: "#1d4ed8",
  },
  {
    id: "cellular-fuel",
    title: "Nutrition & Cellular Fuel",
    summary:
      "Anti-inflammatory metabolic protocols and circadian cellular timing engineered to sustain clean energy and daily neurogenesis.",
    ctaLabel: "Start Assessment",
    visualType: "nutrition",
    accentHex: "#ea580c",
  },
];

function FramelessMotionGraphic({
  type,
}: {
  type: MethodologyCardData["visualType"];
}) {
  if (type === "coherence") {
    return (
      <div className="relative flex h-44 sm:h-64 lg:h-72 w-full flex-col justify-center px-1 sm:px-2">
        <div className="mb-2 sm:mb-4 flex items-baseline justify-between">
          <span className="text-xs font-medium tracking-wide text-slate-400">
            Autonomic Resonance
          </span>
          <span className="font-serif text-3xl italic text-[#0f6e68]">
            0.10 Hz
          </span>
        </div>

        {/* Pure Frameless Animated Sine Wave — No Background Box */}
        <svg
          viewBox="0 0 440 130"
          className="h-36 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pureWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f6e68" />
              <stop offset="55%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          <line
            x1="0"
            y1="65"
            x2="440"
            y2="65"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeDasharray="4 6"
          />

          {/* Secondary subtle harmonic wave */}
          <motion.path
            d="M 0 65 C 36 115, 73 115, 110 65 C 146 15, 183 15, 220 65 C 256 115, 293 115, 330 65 C 366 15, 403 15, 440 65"
            fill="none"
            stroke="rgba(15, 110, 104, 0.16)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Primary Coherent Wave */}
          <motion.path
            d="M 0 65 C 36 8, 73 8, 110 65 C 146 122, 183 122, 220 65 C 256 8, 293 8, 330 65 C 366 122, 403 122, 440 65"
            fill="none"
            stroke="url(#pureWaveGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Heart Rate Variability</span>
          <span className="font-medium text-slate-700">
            Prefrontal Sync Unlocked
          </span>
        </div>
      </div>
    );
  }

  if (type === "loop") {
    return (
      <div className="relative flex h-44 sm:h-64 lg:h-72 w-full items-center justify-center">
        {/* Frameless Orbital Brain-Body Loop SVG */}
        <svg viewBox="0 0 360 220" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="loopOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f6e68" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Outer Subtle Ring */}
          <ellipse
            cx="180"
            cy="110"
            rx="135"
            ry="72"
            fill="none"
            stroke="rgba(15, 23, 42, 0.07)"
            strokeWidth="1.5"
          />

          {/* Animated Closed-Loop Path */}
          <motion.ellipse
            cx="180"
            cy="110"
            rx="135"
            ry="72"
            fill="none"
            stroke="url(#loopOrbit)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: -8 }}
            whileInView={{ pathLength: 1, rotate: -8 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Node 1: Fuel */}
          <g transform="translate(55, 85)">
            <circle cx="0" cy="0" r="6" fill="#0f6e68" />
            <text
              x="0"
              y="-16"
              textAnchor="middle"
              className="fill-slate-800 text-[12px] font-semibold"
            >
              Fuel
            </text>
          </g>

          {/* Node 2: Movement */}
          <g transform="translate(180, 38)">
            <circle cx="0" cy="0" r="7" fill="#1d4ed8" />
            <text
              x="0"
              y="-16"
              textAnchor="middle"
              className="fill-slate-800 text-[12px] font-semibold"
            >
              Movement
            </text>
          </g>

          {/* Node 3: Attention */}
          <g transform="translate(305, 130)">
            <circle cx="0" cy="0" r="6" fill="#ea580c" />
            <text
              x="0"
              y="24"
              textAnchor="middle"
              className="fill-slate-800 text-[12px] font-semibold"
            >
              Attention
            </text>
          </g>

          {/* Center Formula Typography */}
          <text
            x="180"
            y="115"
            textAnchor="middle"
            className="fill-slate-900 font-serif text-[22px] italic"
          >
            Neuroplasticity
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex h-44 sm:h-64 lg:h-72 w-full flex-col justify-center px-1 sm:px-2">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="text-xs font-medium tracking-wide text-slate-400">
          Cellular Timing
        </span>
        <span className="font-serif text-3xl italic text-[#ea580c]">
          Myelin &amp; ATP
        </span>
      </div>

      {/* Frameless Minimal Progress Bars — No Background Box */}
      <div className="space-y-5">
        {[
          {
            label: "Morning Cortical Ignition",
            pct: "94%",
            color: "from-[#0f6e68] to-[#14b8a6]",
          },
          {
            label: "Midday Glycemic Stability",
            pct: "98%",
            color: "from-[#1d4ed8] to-[#3b82f6]",
          },
          {
            label: "Evening Synaptic & Myelin Repair",
            pct: "96%",
            color: "from-[#ea580c] to-[#f59e0b]",
          },
        ].map((row, idx) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">{row.label}</span>
              <span className="font-semibold text-slate-900">{row.pct}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200/70">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: row.pct }}
                transition={{
                  duration: 1.1,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StickyMethodologyCardProps {
  card: MethodologyCardData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onOpenAssessment?: () => void;
}

function StickyMethodologyCard({
  card,
  index,
  total,
  scrollYProgress,
  onOpenAssessment,
}: StickyMethodologyCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const rangeStart = index * (1 / total);
  const scale = useTransform(scrollYProgress, [rangeStart, 1], [1, targetScale]);
  const yOffset = useTransform(scrollYProgress, [rangeStart, 1], [0, -12 * index]);

  return (
    <div
      className="sticky mx-auto w-full max-w-5xl"
      style={{
        top: `clamp(72px, 12vh, 112px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale, y: yOffset }}
        className="origin-top overflow-hidden rounded-[22px] sm:rounded-[28px] border border-slate-200/90 bg-white/95 px-4 py-6 sm:px-10 sm:py-10 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_50px_-20px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Frameless Animated Graphic (No Background Container) */}
          <div className="lg:col-span-6">
            <FramelessMotionGraphic type={card.visualType} />
          </div>

          {/* Right Column: Minimal Words — Just Heading, Concise 2-Line Summary & CTA */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pl-4">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-[38px] lg:leading-[1.12]">
              {card.title}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              {card.summary}
            </p>

            <div className="mt-7">
              {card.id === "cellular-fuel" ? (
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  style={{ backgroundColor: card.accentHex }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:brightness-110 cursor-pointer"
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>Start Assessment (45 Sec)</span>
                </button>
              ) : (
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: card.accentHex }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface MethodologyLoopProps {
  onOpenAssessment?: () => void;
}

export function MethodologyLoop({ onOpenAssessment }: MethodologyLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="methodology" className="relative pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
        >
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            The Closed-Loop Architecture of{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#635bff] to-[#ea580c] bg-clip-text text-transparent">
              Continuous Capacity.
            </span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            Three interconnected systems locking together on scroll—autonomic
            coherence, attention-paired movement, and cellular fuel.
          </p>
        </motion.div>

        {/* Compact Sticky Scroll-Stacking Cards */}
        <div ref={containerRef} className="relative space-y-8 sm:space-y-10">
          {METHODOLOGY_CARDS.map((card, index) => (
            <StickyMethodologyCard
              key={card.id}
              card={card}
              index={index}
              total={METHODOLOGY_CARDS.length}
              scrollYProgress={scrollYProgress}
              onOpenAssessment={onOpenAssessment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
