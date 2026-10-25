"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const LEFT_FAQS: FaqItem[] = [
  {
    id: "different-from-fitness",
    question: "How is Liberty Science different from standard coaching or fitness?",
    answer:
      "Liberty Science unites three clinical disciplines into one closed loop: HeartMath® autonomic HRV coherence, neuromuscular re-education (PWR!Moves® & Strength4Balance), and anti-inflammatory cellular fuel. Your brain and body remodel together rather than in isolation.",
  },
  {
    id: "adapt-to-schedule",
    question: "Will the advisory protocol adapt to an executive schedule?",
    answer:
      "Every protocol is engineered around your real decision load and daily rhythm. Coherence practices and neuromuscular drills integrate seamlessly into high-stakes business days, available both on-site in Tucson and virtually worldwide.",
  },
  {
    id: "results-timeline",
    question: "How quickly do clients notice shifts in clarity and balance?",
    answer:
      "Autonomic HRV stabilization and improved sleep/decision clarity typically register within the first 14 to 21 days, while structural neuromuscular balance and metabolic stamina compound across the 90-day and 6-month horizons.",
  },
];

const RIGHT_FAQS: FaqItem[] = [
  {
    id: "who-is-it-for",
    question: "What kind of clients does Vera Shury advise?",
    answer:
      "We advise business owners, founders, senior executives, and active adults (including those navigating Parkinson’s or balance transitions) who refuse stagnancy and want to stay capable of running what they built.",
  },
  {
    id: "how-to-apply",
    question: "How do I apply for an advisory program?",
    answer:
      "All engagements begin with an initial Discovery Call scheduled directly on Vera’s Google Calendar. During this call, we audit your baseline, map your primary objectives, and determine the optimal advisory horizon (90-Day, 6-Month, or 12-Month retainer).",
  },
  {
    id: "privacy-confidentiality",
    question: "Are executive and health advisory engagements confidential?",
    answer:
      "100% private. All health assessments, succession discussions, and autonomic telemetry remain strictly confidential between you and Vera Shury, C.H.C.",
  },
];

function FaqAccordionCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        isOpen
          ? "border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5"
          : "border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_20px_-8px_rgba(15,23,42,0.05)] hover:border-slate-300"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6 text-left focus:outline-none"
      >
        <span className="text-base font-semibold tracking-tight text-slate-900 sm:text-[17px]">
          {item.question}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "border-slate-900 bg-slate-900 text-white rotate-45 shadow-xs"
              : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900"
          )}
        >
          <Plus className="h-4 w-4 transition-transform duration-300" strokeWidth={2.2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="border-t border-slate-100 px-6 pt-4 pb-6 sm:px-7 sm:pt-4 sm:pb-6 text-sm sm:text-[15px] leading-relaxed text-slate-600">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("different-from-fitness");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Refined Minimal Two-Line Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            <span>You have questions. </span>
            <span className="font-serif italic font-normal text-slate-400">
              We have answers.
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            Key considerations on clinical neuroplasticity, executive scheduling, and mutual advisory readiness.
          </p>
        </motion.div>

        {/* 2-Column Independent Accordion Grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Left Column */}
          <div className="space-y-4">
            {LEFT_FAQS.map((item) => (
              <FaqAccordionCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {RIGHT_FAQS.map((item) => (
              <FaqAccordionCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
