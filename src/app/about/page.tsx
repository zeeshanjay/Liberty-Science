"use client";

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
} from "lucide-react";
import { Header } from "@/components/Header";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { PremiumCtaButton } from "@/components/ui/PremiumCtaButton";
import { InstitutionalTrustMarquee } from "@/components/InstitutionalTrustMarquee";

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

export default function AboutPage() {
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
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                FOUNDER &amp; PRINCIPAL ADVISOR · TUCSON, ARIZONA
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 mt-3 leading-[1.08]">
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
                      &ldquo;Your brain is still hiring new capacity. Here is the job description: pair fuel, movement, and attention so the loop never stalls.&rdquo;
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
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                  THE CRUCIBLE MOMENT
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
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
                <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xs relative overflow-hidden">
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
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ea580c] font-bold block mb-2">
                      Vera&apos;s Personal Operating Credo
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-orange-50/60 p-4 rounded-xl border border-orange-100">
                      &ldquo;No matter what is, I am going to make it work for me. If someone does something bad to me, I will do 5 good things for other businesses or people, and 5 good things for myself.&rdquo;
                    </p>
                  </div>

                  {/* Reproducible Reality, Not An Anomaly */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#635bff] font-bold block mb-1">
                      A Trainable System — Not An Anomaly
                    </span>
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
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#635bff] font-bold">
              CORE PRACTICE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mt-2">
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
                  className={`rounded-3xl border ${pillar.border} bg-white p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden`}
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
            4. THE METABOLIC NEUROPLASTICITY JOB DESCRIPTION
           ========================================================= */}
        <section className="border-t border-slate-100 bg-slate-900 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                  THE PRINCIPLE OF NO STAGNANCY
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Your Brain Is Still Hiring.{" "}
                  <span className="font-serif italic font-normal text-amber-300 block">
                    Here Is the Job Description.
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Adult hippocampal neurogenesis is not a luxury reserved for the young. Your nervous system continually produces new neurons—provided you give it the specific biological rationale to hire them.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>The Three-Signal Rule:</span>
                  </div>
                  <p className="leading-relaxed">
                    1. Movement drives the neurogenic signal.<br />
                    2. Attention (HeartMath coherence) directs the synaptic wiring.<br />
                    3. Fuel (cyclic metabolic switching) provides the cellular building blocks.
                  </p>
                </div>
              </div>

              {/* The Job Description Dossier Card */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                        POSITION REQUISITION #MN-2026
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Senior Synaptic Builder &amp; Motor Navigator
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
                      Full-Time / Lifelong
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono text-[10px] uppercase">Employer:</span>
                      <div className="text-white font-semibold">Your Human Nervous System</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono text-[10px] uppercase">Department:</span>
                      <div className="text-white font-semibold">Hippocampus &amp; Motor Cortex</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block">
                      Core Duties &amp; Responsibilities:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Autonomic Calibration:</strong> Shift out of fight-or-flight into 0.10 Hz HeartMath coherence before any physical or business challenge.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Neuro-Motor Recruitment:</strong> Perform high-amplitude PWR!Moves, dual-task coordination, and vestibular balance drills to protect cortical motor maps.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Mitochondrial Fueling:</strong> Practice 12–14 hour cyclic metabolic switching to trigger ketone generation, BDNF, and autophagy.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Zero Stagnancy Mandate:</strong> Eliminate guilt surrounding biological self-care so you remain capable of running the practice and family you built.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                    <div className="text-slate-300">
                      <strong>Compensation:</strong> 10–25 year younger functional neurocognitive stamina.
                    </div>
                    <Link
                      href={CALENDAR_URL}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm shrink-0"
                    >
                      Apply Now (Book Call)
                    </Link>
                  </div>
                </div>
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
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                  EMPIRICAL VITALITY
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
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
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                      HIGH-ALTITUDE ALPINE ENDURANCE
                    </span>
                    <p className="text-sm font-medium text-white/95 mt-1">
                      Vera Shury on the alpine summit: Living evidence that the
                      neuromuscular loop never expires.
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
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
              CLINICAL ADVISORY TIERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
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
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                VERIFIED ACCREDITATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
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
            8. DIRECT CALL TO ACTION
           ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#635bff]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                INITIATE THE LOOP
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight">
                Tell me where the stall is showing up—
                <span className="font-serif italic font-normal text-slate-300 block">
                  life, business, or body?
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                A 30-minute confidential consultation to review your current
                baseline, identify cognitive or physical leakage points, and
                determine your readiness for the Metabolic Neuroplasticity loop.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
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

              <div className="mt-8 flex items-center gap-6 text-xs font-mono text-slate-400">
                <span>Direct Advisory Retainer</span>
                <span className="text-slate-600">•</span>
                <span>Tucson On-Site &amp; Worldwide Virtual</span>
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
