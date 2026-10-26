"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowUpRight,
  Activity,
  Brain,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Calendar,
  Compass,
  Briefcase,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  Flame,
  Zap,
  Layers,
  TrendingUp,
  Stethoscope,
  Target,
} from "lucide-react";
import { Header } from "@/components/Header";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { PremiumCtaButton } from "@/components/ui/PremiumCtaButton";
import { InstitutionalTrustMarquee } from "@/components/InstitutionalTrustMarquee";
import { NeuralModel3D } from "@/components/NeuralModel3D";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

const CREDENTIAL_STACK = [
  {
    title: "Licensed Health Coach",
    code: "ACE Coach #W54776",
    desc: "National clinical accreditation for behavioral lifestyle change, risk mitigation, and executive longevity.",
    detail: "Medical Taxonomy Code: 71400000X (eligible for medical tax deduction).",
  },
  {
    title: "HeartMath® Certified Practitioner",
    code: "Heart-Rate Variability (HRV)",
    desc: "Clinical autonomic nervous system regulation. Calibrating vagal tone to shift out of chronic sympathetic stress.",
    detail: "Direct 0.10 Hz biofeedback for prefrontal executive stamina and emotional baseline coherence.",
  },
  {
    title: "PWR!Moves® Certified Trainer",
    code: "Parkinson Wellness Recovery",
    desc: "Advanced neuro-motor training targeting Parkinson's symptoms, rigidity, bradykinesia, and gait modulation.",
    detail: "Creator of the proprietary Parkinson'strength™ clinical movement protocol.",
  },
  {
    title: "Neuromuscular Re-Education",
    code: "20+ Years Clinical Practice",
    desc: "Targeted vestibular balance, fall prevention, abnormal gait correction, and disuse atrophy reversal.",
    detail: "Bilateral post-surgical recovery, joint mechanics, and cortical motor-map sharpening.",
  },
  {
    title: "Movement & Martial Discipline",
    code: "Shotokan Karate & Senior Movement",
    desc: "Integration of Shotokan discipline, SilverSneakers Yoga, Tai Chi, and proprioceptive agility.",
    detail: "Translating traditional physical wisdom into daily functional independence.",
  },
  {
    title: "Neuro-Anthropology Foundation",
    code: "Behavioral Sciences & Tao in Business",
    desc: "Academic grounding in human neuro-adaptation, habit formation, and sustainable enterprise balance.",
    detail: "Equalizing physical stamina, cognitive bandwidth, and commercial execution.",
  },
];

const THE_THREE_PILLARS = [
  {
    id: "life",
    title: "Life Advisory",
    subtitle: "Neuro-Functional Wellness Without Guilt",
    icon: Compass,
    color: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-200",
    badge: "text-[#ea580c] bg-orange-50",
    desc: "Caregivers, business owners, and active adults frequently treat self-care as an indulgence or a reward earned only after exhaustion. Drawing from the 'Train Your Mind, Change Your Brain' neurogenesis research, Vera trains focused compassion attention, readiness screens, and sustainable daily micro-practices that protect your physical capacity for both family and self.",
    bullets: [
      "Compassion attention practice and emotional baseline protection",
      "Deconstruction of guilt-driven sacrificial wellness models",
      "Dopamine and acetylcholine engagement via purposeful micro-habits",
      "Readiness-to-change assessments tailored for demanding seasons",
    ],
  },
  {
    id: "business",
    title: "Business Advisory & Scaling",
    subtitle: "Scaling Instead of Stalling: Stay Able to Run What You Built",
    icon: Briefcase,
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200",
    badge: "text-emerald-800 bg-emerald-50",
    desc: "Scaling an enterprise requires cognitive bandwidth and biological stamina—not burnout. Drawing from Vera's own 4,000% practice scaling since 2012 and her 'Spiritual Tao in Business' framework, she works with founders, women in business, and executives to unlock sustainable expansion, sharp decision velocity, and leadership succession without sacrificing physical vitality or life balance.",
    bullets: [
      "Scaling without biological compromise (proven 4,000% practice growth model)",
      "Prefrontal executive stamina & high-velocity decision clarity under commercial pressure",
      "Spiritual Tao in Business framing: sustainable enterprise & life equilibrium",
      "Succession, leadership transitions, and operational endurance",
    ],
  },
  {
    id: "health",
    title: "Health Advisory",
    subtitle: "Metabolic Neuroplasticity & Parkinson'strength™",
    icon: Activity,
    color: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200",
    badge: "text-blue-800 bg-blue-50",
    desc: "Built around Vera's strict clinical sequence: HeartMath® coherence first to silence sympathetic overdrive, followed by high-amplitude neuro-motor recruitment (Strength4Balance, PWR!Moves, Parkinson'strength™), and supported by cyclic metabolic switching diet plans that keep the brain-body loop hiring.",
    bullets: [
      "HeartMath® 0.10 Hz coherence: autonomic reset before motor challenge",
      "PWR!Moves & Parkinson'strength™: high-amplitude neuro-motor agility",
      "Strength4Balance: fall prevention, vestibular tuning, and joint posture",
      "Targeted cyclic nutrition: 12–14 hr fasting and ketone fuel adaptation",
    ],
  },
];

const PROGRAM_SPECTRUM = [
  {
    tier: "Discovery Call",
    duration: "30 Minutes",
    investment: "Complimentary ($0)",
    focus: "Virtual Motivational Interview",
    desc: "A focused, sensitive 30-minute brainstorm to evaluate your current baseline, identify whether the stall is showing up in life, business, or body, and determine readiness for the Metabolic Neuroplasticity loop.",
    highlight: false,
  },
  {
    tier: "Explorer Session",
    duration: "60 Minutes",
    investment: "$75",
    focus: "Diagnostic & Lifestyle Assessment",
    desc: "In-depth sensitive motivational interview, clinical risk assessment, rapport building, and co-creating a tailored strategic options roadmap that integrates with your demanding schedule.",
    highlight: false,
  },
  {
    tier: "Basic Mini Programs",
    duration: "5 Sessions Total",
    investment: "$297",
    focus: "Targeted Clinical Modules",
    desc: "1 initial 60-min deep dive + 4 @ 45-min follow-ups. Focus areas include: Cooling Vitality, Reclaim Mobility, Bust Your Stress, Master Self-Regulation, Senior Posture Revival, or PWR! Parkinson's Power Up.",
    highlight: false,
  },
  {
    tier: "Quick Start Retainer",
    duration: "90 Days (~3 Months)",
    investment: "$1,275",
    focus: "Foundational Neuro-Habit Loop",
    desc: "Comprehensive research and protocol design to improve acute or chronic conditions. Covers breath mechanics, posture, nutrition, HeartMath HRV coherence, and structured relapse prevention.",
    highlight: false,
  },
  {
    tier: "Quality Goals Retainer",
    duration: "6 Months",
    investment: "$2,400",
    focus: "Signature Advisory Retainer",
    desc: "Deep integration across Life, Business, Work, and Recovery. Sensitive extended assessments of mind, body, and enterprise; neuroplastic habit maintenance, and permanent relapse aversion.",
    highlight: true,
  },
  {
    tier: "Beating Resistance",
    duration: "12 Months",
    investment: "$4,800",
    focus: "Platinum Master Retainer",
    desc: "Year-long executive partnership addressing deep-seated habit change with continuous scientific assessments, creative evidence-based modalities, relationship support, and total cognitive-motor vitality.",
    highlight: false,
  },
];

const STALL_VECTORS = [
  {
    id: "body",
    title: "Body & Motor Stall",
    indicator: "Tremor onset, loss of balance, rigidity, chronic fatigue",
    desc: "The motor cortex and vestibular pathways require progressive amplitude loading and metabolic fuel, not passive retreat. We restore high-velocity neuromuscular reflexes.",
    action: "Evaluate Motor Recruitment",
  },
  {
    id: "business",
    title: "Business & Leadership Stall",
    indicator: "Founder bottleneck, decision fatigue, scaling friction",
    desc: "Enterprises stall when the leader's cognitive bandwidth collapses. We apply the 4,000% scaling model to preserve stamina and delegate without operational decay.",
    action: "Evaluate Enterprise Capacity",
  },
  {
    id: "life",
    title: "Executive Life & Guilt Stall",
    indicator: "Sacrificial wellness model, treating health as an afterthought",
    desc: "Sacrificing your biology for commercial or family duty is a mathematical failure. Self-care is the non-negotiable prerequisite to running what you built.",
    action: "Evaluate Readiness Baseline",
  },
];

export default function AboutPage() {
  const [selectedStall, setSelectedStall] = useState<string>("body");

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#635bff] selection:text-white">
      {/* Global Header */}
      <Header />

      <main className="pt-24 sm:pt-28 pb-20">
        {/* =========================================================
            1. HERO SECTION: THE LIVING EVIDENCE
           ========================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-16 lg:pb-24">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-900 font-medium">About Vera Shury</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Your Brain Is Still Generating.{" "}
                <span className="font-serif italic font-normal bg-gradient-to-r from-[#635bff] via-[#8b5cf6] to-[#ea580c] bg-clip-text text-transparent">
                  Living Evidence at 86.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
                Most longevity philosophies are theoretical. Vera Shury is empirical.
                At 86 years old, after bilateral knee replacements and spinal surgery,
                Vera carves alpine black diamonds, advises business owners worldwide, and
                coaches Parkinson&apos;s clients to reclaim motor agency through
                <strong className="text-slate-900 font-semibold"> Metabolic Neuroplasticity</strong>.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-500">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-800 font-semibold">
                  ACE Coach #W54776
                </span>
                <span className="text-slate-300">•</span>
                <span>PWR!Moves® Specialist</span>
                <span className="text-slate-300">•</span>
                <span>HeartMath® Practitioner</span>
                <span className="text-slate-300">•</span>
                <span>Healthcare Taxonomy: 71400000X</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PremiumCtaButton href={CALENDAR_URL} variant="primary" size="lg">
                  Book a Readiness Conversation
                </PremiumCtaButton>

                <a
                  href="tel:520-275-8755"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>520-275-8755</span>
                </a>
              </div>

              {/* Proof Metric Grid */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8 max-w-lg">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-slate-950 font-sans">
                    86
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-snug">
                    Years of Active Vitality
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-[#ea580c] font-sans">
                    20+
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-snug">
                    Years Clinical Practice
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-[#635bff] font-sans">
                    71400000X
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-snug">
                    Medical Taxonomy Code
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#635bff]/10 via-[#ea580c]/10 to-transparent blur-2xl -z-10" />

                <div className="relative aspect-[4/4.8] overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)]">
                  <Image
                    src="/vera_about.jpg"
                    alt="Vera Shury, MS — Principal Advisor at Liberty Science Coaching"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 text-white">
                    <span className="font-serif italic text-2xl text-white block">
                      Vera Shury, MS
                    </span>
                    <span className="text-xs font-mono text-emerald-300 mt-0.5 block tracking-wide">
                      Life · Business · Health Advisory
                    </span>
                    <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      &ldquo;Adult neurogenesis is not theoretical. When you give your physiology the proper fuel, autonomic coherence, and motor recruitment, the loop never stalls.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            2. THE TURNING POINT: THE EARLY-THIRTIES CRUCIBLE
           ========================================================= */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  When Sacrificial Endurance{" "}
                  <span className="font-serif italic font-normal text-slate-600">
                    Failed.
                  </span>
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  <p>
                    In her early thirties, Vera experienced the sudden collapse
                    familiar to many high-functioning operators, founders, and
                    caregivers: a severe, bleeding duodenal ulcer that nearly took
                    her life.
                  </p>
                  <p>
                    Like so many leaders, she had treated her own biology as an
                    infinite balance sheet—spending her reserves on family,
                    business, and external obligations while assuming her health
                    would indefinitely absorb the friction.
                  </p>
                  <p>
                    Lying in hospital recovery, the realization arrived with
                    crystalline clarity:{" "}
                    <strong className="text-slate-900 font-semibold">
                      Self-care is non-negotiable.
                    </strong>{" "}
                    It is not an indulgence or a reward earned after exhausting
                    yourself. It is the foundational prerequisite for personal
                    liberty, decisive leadership, and lifelong autonomy.
                  </p>
                  <p>
                    From that moment onward, Vera dedicated four decades to
                    decoding the human neuro-functional loop—studying why some
                    people stagnate under stress while others continuously rebuild
                    cellular and neurological capacity.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl -z-10" />

                  <span className="text-4xl font-serif text-[#ea580c] select-none block leading-none mb-3">
                    &ldquo;
                  </span>
                  <blockquote className="font-serif text-xl sm:text-2xl italic leading-snug text-slate-900">
                    If you don&apos;t intentionally schedule your biological
                    recovery, your physiology will eventually schedule it for
                    you.
                  </blockquote>

                  {/* Vera's Operating Credo */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                      <span>Vera&apos;s Personal Operating Credo (5:5 Adversity Rule)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-orange-50/60 p-4 rounded-xl border border-orange-100">
                      &ldquo;No matter what is, I am going to make it work for me. If someone does something bad to me, I will do 5 good things for other businesses or people, and 5 good things for myself.&rdquo;
                    </p>
                  </div>

                  {/* Reproducible Reality, Not An Anomaly */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#635bff]" />
                      <span>A Trainable System — Not An Anomaly</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Scaling a practice 4,000% since 2012, maintaining leukemic stability, and alpine skiing in Taos at 86 are not genetic anomalies. They are the output of a trainable, reproducible neuro-metabolic protocol anyone can execute.
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Vera Shury, MS
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Founder, Liberty Science Coaching
                      </div>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-orange-50 text-[#ea580c] flex items-center justify-center font-serif italic text-xs font-bold">
                      VS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. THE THREE ADVISORY PILLARS: LIFE · BUSINESS · HEALTH
           ========================================================= */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Three Advisory Pillars.{" "}
              <span className="font-serif italic font-normal text-[#ea580c]">
                One Coherent Loop.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Liberty Science Coaching is a unified life-business-health advisory. We do not separate &ldquo;brain fitness&rdquo; from &ldquo;body fitness&rdquo; from executive leadership. The same loop that protects your motor mobility protects the enterprise you built.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {THE_THREE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`rounded-2xl sm:rounded-3xl border ${pillar.border} bg-white p-5 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} rounded-bl-full pointer-events-none`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${pillar.badge}`}>
                        {pillar.title}
                      </span>
                      <Icon className="w-5 h-5 text-slate-400" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 mb-3">
                      {pillar.subtitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {pillar.desc}
                    </p>

                    <div className="space-y-2.5 border-t border-slate-100 pt-5">
                      {pillar.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Tucson Clinic &amp; Virtual Worldwide
                    </span>
                    <Link
                      href={CALENDAR_URL}
                      target="_blank"
                      className="text-xs font-semibold text-slate-900 hover:text-[#635bff] flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            4. THE NEURO-METABOLIC 3D ARCHITECTURE SECTION
           ========================================================= */}
        <section className="border-t border-slate-800 bg-[#070b14] text-white py-16 lg:py-24 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#635bff]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Scientific Rationale */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  The Biological Architecture of{" "}
                  <span className="font-serif italic font-normal bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent block mt-1">
                    Adult Neuroplasticity.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Adult hippocampal neurogenesis is not a luxury reserved for the young. Your nervous system continually produces new neurons and consolidates synaptogenesis—provided you supply the three biological signals that keep cortical mapping alive.
                </p>

                {/* The Tripartite Clinical Sequence */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-amber-300 mb-1">
                      <Flame className="w-4 h-4 text-[#ea580c]" />
                      <span>01 · Fuel: Cyclic Metabolic Switching</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      A structured 12–14 hour daily fasting window triggers hepatic ketone generation, directly upregulating Brain-Derived Neurotrophic Factor (BDNF) and stimulating cellular autophagy.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-300 mb-1">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>02 · Load: High-Amplitude Neuro-Motor Recruitment</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      PWR!Moves® and vestibular balance drills demand maximal intentional amplitude, actively resisting cortical disuse atrophy and reinforcing motor maps.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-indigo-300 mb-1">
                      <Heart className="w-4 h-4 text-[#635bff]" />
                      <span>03 · Steer: Autonomic Coherence at 0.10 Hz</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      HeartMath® biofeedback downregulates chronic sympathetic overdrive, ensuring newly sprouted synapses consolidate into permanent functional stamina.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <PremiumCtaButton href={CALENDAR_URL} variant="primary" size="md">
                    Discuss Clinical Assessment
                  </PremiumCtaButton>
                  <span className="text-xs text-slate-400 font-mono">
                    Evidence-Based Protocol
                  </span>
                </div>
              </div>

              {/* Right Column: 3D Model Visual / Interactive Canvas */}
              <div className="lg:col-span-7">
                <NeuralModel3D staticImageSrc="/neural-3d-model.jpg" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. LIVING EVIDENCE: ALPINE AGILITY AT 86
           ========================================================= */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Rebuilding What Conventional Medicine{" "}
                  <span className="font-serif italic font-normal text-slate-600">
                    Gave Up On.
                  </span>
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  <p>
                    When Vera faced bilateral knee replacements and severe spinal
                    intervention years ago, conventional guidance pointed toward
                    a quiet retreat into passive caution.
                  </p>
                  <p>
                    Vera rejected that trajectory. Applying the precise
                    neuromuscular re-education and anti-inflammatory fueling she
                    now teaches, she rebuilt her proprioceptive reflex loop from
                    the ground up.
                  </p>
                  <p>
                    Today at 86, she navigates the steep alpine bowls and black
                    diamonds of New Mexico and Colorado, snowboards, and leads
                    clients through high-velocity balance drills without
                    hesitation.
                  </p>
                  <p className="font-medium text-slate-900">
                    &ldquo;We do not train for the gym mirror. We train for the
                    mountain, the boardroom, and the life you refuse to
                    surrender.&rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-6 border-t border-slate-200/80 pt-6">
                  <div>
                    <span className="block font-sans text-2xl font-bold text-slate-900">
                      86
                    </span>
                    <span className="text-xs text-slate-500">
                      Alpine Skiing Age
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div>
                    <span className="block font-sans text-2xl font-bold text-[#ea580c]">
                      0
                    </span>
                    <span className="text-xs text-slate-500">
                      Tolerance for Stagnancy
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div>
                    <span className="block font-sans text-2xl font-bold text-[#635bff]">
                      100%
                    </span>
                    <span className="text-xs text-slate-500">
                      Functional Agency
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white shadow-xl group">
                  <Image
                    src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (9).jpeg"
                    alt="Vera Shury alpine skiing at 86 with client and colleague on mountain peak"
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 inset-x-6 text-white">
                    <p className="text-sm font-medium text-white/95">
                      Vera Shury on the alpine summit: Living evidence that the
                      neuromuscular loop never expires when properly trained.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INSTITUTIONAL TRUST & HEALTHCARE ACCREDITATIONS MARQUEE
           ========================================================= */}
        <InstitutionalTrustMarquee />

        {/* =========================================================
            6. PROGRAM ARCHITECTURE & RETAINER SPECTRUM (RATE 26)
           ========================================================= */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Structured Engagement Spectrum.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear, transparent clinical agreements under Healthcare Taxonomy Code <strong>71400000X</strong> (Specialized Clinical Exercise &amp; Health Coaching), qualifying programs for medical tax deductibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_SPECTRUM.map((prog) => (
              <div
                key={prog.tier}
                className={`rounded-2xl border ${
                  prog.highlight ? "border-[#635bff] ring-2 ring-[#635bff]/20" : "border-slate-200/90"
                } bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-500 uppercase">
                      {prog.duration}
                    </span>
                    {prog.highlight && (
                      <span className="px-2 py-0.5 rounded-full bg-[#635bff]/10 text-[#635bff] font-bold text-[10px] tracking-wider uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 mt-1">
                    {prog.tier}
                  </h3>

                  <div className="text-xl font-bold text-slate-900 mt-2 font-sans">
                    {prog.investment}
                  </div>

                  <div className="text-xs font-semibold text-[#ea580c] mt-1">
                    {prog.focus}
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Taxonomy: 71400000X
                  </span>
                  <Link
                    href={CALENDAR_URL}
                    target="_blank"
                    className="text-xs font-bold text-[#635bff] hover:text-[#4f46e5] flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Location & Contact Details Bar */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
              <span><strong>Headquarters:</strong> 12995 N Oracle Rd #141-135, Tucson, AZ 85737</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:520-275-8755" className="hover:text-slate-950 font-semibold">
                Phone: 520-275-8755
              </a>
              <span>•</span>
              <a href="mailto:vera@libertyscience.com" className="hover:text-slate-950 font-semibold">
                vera@libertyscience.com
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            7. THE CLINICAL CREDENTIAL STACK
           ========================================================= */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                The Clinical Credential Stack.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Four decades of rigorous research, formal board certifications, and direct client application across life, business, and health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CREDENTIAL_STACK.map((cred) => (
                <div
                  key={cred.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-[#ea580c]">
                        {cred.code}
                      </span>
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {cred.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-mono text-slate-400">
                      {cred.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            8. THE STALL ARCHITECTURE: LIFE, BUSINESS, OR BODY?
           ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-[#090d16] border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
            {/* Cinematic background ambiance */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#635bff]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#ea580c]/12 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: The Diagnostic Query */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.12]">
                  Tell me where the stall is showing up—
                  <span className="font-serif italic font-normal text-amber-200 block mt-1">
                    life, business, or body?
                  </span>
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
                  Stalls in your physical stamina, enterprise decision velocity, or personal life are never isolated failures. They are interconnected biological leakage points that respond to a single, coherent protocol.
                </p>

                {/* Interactive Vector Switcher */}
                <div className="space-y-3 pt-2 max-w-xl">
                  {STALL_VECTORS.map((vec) => (
                    <div
                      key={vec.id}
                      onClick={() => setSelectedStall(vec.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedStall === vec.id
                          ? "bg-white/10 border-amber-300/40 shadow-lg"
                          : "bg-white/[0.03] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              selectedStall === vec.id ? "bg-amber-400" : "bg-slate-600"
                            }`}
                          />
                          {vec.title}
                        </span>
                        <span className="text-[11px] font-mono text-amber-300/90">
                          {selectedStall === vec.id ? "Selected Diagnostic" : "Inspect"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        Indicators: {vec.indicator}
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {vec.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <PremiumCtaButton href={CALENDAR_URL} variant="primary" size="lg">
                    Book a Readiness Conversation
                  </PremiumCtaButton>

                  <a
                    href="tel:520-275-8755"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-xs font-semibold text-white backdrop-blur-md hover:bg-white hover:text-slate-900 transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call 520-275-8755</span>
                  </a>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-slate-400 pt-2">
                  <span>Direct Advisory Retainer</span>
                  <span className="text-slate-600">•</span>
                  <span>Tucson On-Site &amp; Worldwide Virtual</span>
                </div>
              </div>

              {/* Right Column: Vera Advisory Context Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (8).jpeg"
                      alt="Vera Shury conducting executive advisory consultation"
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-xs font-bold">Vera Shury, MS</div>
                      <div className="text-[11px] text-slate-300 font-mono">
                        Confidential 30-Minute Motivational Intake
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Zero-obligation assessment of cognitive and physical baseline.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pinpoint whether the primary bottleneck is autonomic, metabolic, or enterprise structure.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Direct actionable roadmap whether you proceed with formal coaching or not.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">Taxonomy: 71400000X</span>
                    <Link
                      href={CALENDAR_URL}
                      target="_blank"
                      className="text-amber-300 font-semibold hover:text-white flex items-center gap-1"
                    >
                      <span>Reserve Calendar Slot</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <StackedCircularFooter />
    </div>
  );
}
