"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Download,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/Header";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { PremiumCtaButton } from "@/components/ui/PremiumCtaButton";
import { InstitutionalTrustMarquee } from "@/components/InstitutionalTrustMarquee";
import { NeuralModel3D } from "@/components/NeuralModel3D";
import { AffirmPromo } from "@/components/AffirmPromo";
import { SpecialtyProgramsGrid } from "@/components/SpecialtyProgramsGrid";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

const HARVARD_CREDENTIALS = [
  {
    id: "hms-stemcell",
    title: "Stem Cell Medicine: Parkinson's Disease",
    institution: "Harvard Medical School",
    code: "2.00 AMA PRA Category 1 Credit(s)™",
    accreditation: "Joint ACCME / ACPE / ANCC Accredited",
    issuedTo: "Vera Shury",
    signee: "David H. Roberts, MD — Dean for External Education, Harvard Medical School",
    date: "October 30, 2026 (Active 2026–2027)",
    logoSrc: "/logos/harvard-medical-school.svg",
    pdfUrl: "/documents/certificates/Harvard_Medical_School_Stem_Cell_Medicine_Parkinsons_Vera_Shury.pdf",
    previewImg: "/documents/certificates/hms_stem_cell_parkinsons_thumb.jpg",
    desc: "Rigorous clinical medical education on stem cell biology, dopaminergic pathway mechanisms, and neuro-motor re-education for Parkinson's disease.",
    supports: "Health Advisory & Parkinson'strength™ Practice",
    badge: "Harvard Medical School CME",
  },
  {
    id: "hms-cognitive",
    title: "Cognitive Fitness",
    institution: "Harvard Health Publishing · Harvard Medical School",
    code: "Credential ID: 0253a695-5736-43ba-94c3-0b23acb91f51",
    accreditation: "Harvard Medical School Health Publishing Curriculum",
    issuedTo: "Vera Shury",
    date: "November 1, 2026",
    logoSrc: "/logos/harvard-health.svg",
    pdfUrl: "/documents/certificates/Harvard_Health_Cognitive_Fitness_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_cognitive_fitness_thumb.jpg",
    desc: "Evidence-based protocols for adult hippocampal neurogenesis, synaptic density, executive mental stamina, and safeguarding cognitive bandwidth against burnout.",
    supports: "Life Advisory & Executive Cognitive Stamina",
    badge: "Harvard Health Publishing",
  },
  {
    id: "hms-food",
    title: "Food Is Medicine",
    institution: "Harvard Health Publishing · Harvard Medical School",
    code: "Credential ID: 6a037053-6f5a-4828-8651-cec1b6dbe965",
    accreditation: "Harvard Medical School Health Publishing Curriculum",
    issuedTo: "Vera Shury",
    date: "November 1, 2026",
    logoSrc: "/logos/harvard-health.svg",
    pdfUrl: "/documents/certificates/Harvard_Health_Food_Is_Medicine_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_food_is_medicine_thumb.jpg",
    desc: "Nutritional biochemistry, mitochondrial fuel switching, cyclic fasting, and epigenetic cellular signaling to suppress neuro-inflammation and support synaptogenesis.",
    supports: "Metabolic Neuroplasticity™ Fueling Protocols",
    badge: "Harvard Health Publishing",
  },
  {
    id: "harvardx-entrepreneurship",
    title: "Technology Entrepreneurship: Lab to Market",
    institution: "HarvardX (Harvard University)",
    code: "edX Verified #954e0f86",
    accreditation: "Harvard Business School & UC San Diego Faculty",
    issuedTo: "Vera Shury",
    date: "Verified edX Credential",
    logoSrc: "/logos/harvardx.svg",
    link: "https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07",
    linkText: "Verify at HarvardX / edX ↗",
    desc: "Translating technological and clinical breakthroughs into scalable, sustainable business models and leadership succession without physical burnout.",
    supports: "Business Advisory & 4,000% Practice Scaling Model",
    badge: "Harvard Business School",
  },
];

const CREDENTIAL_STACK = [
  {
    title: "Stem Cell Medicine: Parkinson's Disease",
    code: "Harvard Medical School (HMS)",
    desc: "Formal clinical continuing medical education in stem cell biology, dopaminergic mechanisms, and neuromuscular therapies for Parkinson's disease.",
    detail: "2.00 AMA PRA Category 1 Credit(s)™ · Joint ACCME / ACPE / ANCC Accredited.",
    pdfUrl: "/documents/certificates/Harvard_Medical_School_Stem_Cell_Medicine_Parkinsons_Vera_Shury.pdf",
    previewImg: "/documents/certificates/hms_stem_cell_parkinsons_thumb.jpg",
    linkText: "View Certificate PDF ↗",
  },
  {
    title: "Cognitive Fitness",
    code: "Harvard Health Publishing · HMS",
    desc: "Evidence-based clinical curriculum on adult neuroplasticity, memory resilience, and executive cognitive endurance under high commercial pressure.",
    detail: "Credential ID: 0253a695-5736-43ba-94c3-0b23acb91f51 (Issued Nov 1, 2026).",
    pdfUrl: "/documents/certificates/Harvard_Health_Cognitive_Fitness_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_cognitive_fitness_thumb.jpg",
    linkText: "View Certificate PDF ↗",
  },
  {
    title: "Food Is Medicine",
    code: "Harvard Health Publishing · HMS",
    desc: "Nutritional biochemistry, cellular signaling, cyclic fasting, and epigenetic fuel adaptation to resolve chronic neuro-inflammation and power neuroplasticity.",
    detail: "Credential ID: 6a037053-6f5a-4828-8651-cec1b6dbe965 (Issued Nov 1, 2026).",
    pdfUrl: "/documents/certificates/Harvard_Health_Food_Is_Medicine_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_food_is_medicine_thumb.jpg",
    linkText: "View Certificate PDF ↗",
  },
  {
    title: "Technology Entrepreneurship: Lab to Market",
    code: "HarvardX Verified #954e0f86",
    desc: "Executive credential in Technology Entrepreneurship from HarvardX (Harvard University), taught by Prof. Karim Lakhani (Harvard Business School) & Prof. Viswanathan Krishnan (UC San Diego).",
    detail: "Translating innovation into scalable, sustainable business performance without biological compromise.",
    link: "https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07",
    linkText: "Verify edX Credential ↗",
  },
  {
    title: "Licensed Board Certified Health Coach (LBHC)",
    code: "National Board / ACE Coach #W54776",
    desc: "National clinical accreditation for behavioral lifestyle change, risk mitigation, and executive longevity.",
    detail: "Medical Taxonomy Code: 71400000X (eligible for medical tax deduction / HSA / FSA).",
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
    desc: "Caregivers, business owners, and active adults frequently treat self-care as an indulgence or a reward earned only after exhaustion. Supported by Vera's Harvard Health Cognitive Fitness certification and neurogenesis research, she trains focused compassion attention, readiness screens, and sustainable daily micro-practices that protect your physical capacity for both family and self.",
    bullets: [
      "Harvard Health Cognitive Fitness framework for durable executive brain stamina",
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
    desc: "Scaling an enterprise requires cognitive bandwidth and biological stamina—not burnout. Drawing from Vera's own 4,000% practice scaling and formal HarvardX certification in Technology Entrepreneurship (Lab to Market), she works with founders, women in business, and executives to unlock sustainable expansion, sharp decision velocity, and leadership succession without sacrificing physical vitality or life balance.",
    bullets: [
      "HarvardX Technology Entrepreneurship (Lab to Market) framework translation",
      "Scaling without biological compromise (proven 4,000% practice growth model)",
      "Prefrontal executive stamina & high-velocity decision clarity under commercial pressure",
      "Spiritual Tao in Business framing: sustainable enterprise & life equilibrium",
      "Succession, leadership transitions, and operational endurance",
    ],
  },
  {
    id: "health",
    title: "Health Advisory",
    subtitle: "Metabolic Neuroplasticity™ & Parkinson'strength™",
    icon: Activity,
    color: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200",
    badge: "text-blue-800 bg-blue-50",
    desc: "Built around Vera's strict clinical sequence and backed by Harvard Medical School training in Stem Cell Medicine (Parkinson's Disease) and Harvard Health Food Is Medicine: HeartMath® coherence first to silence sympathetic overdrive, followed by high-amplitude neuro-motor recruitment (PWR!Moves, Parkinson'strength™), and supported by cyclic metabolic switching diet plans that keep the brain-body loop hiring.",
    bullets: [
      "Harvard Medical School CME in Stem Cell Medicine: Parkinson's Disease (2.00 AMA PRA Credits™)",
      "Harvard Health Food Is Medicine: cellular nutrient signaling & cyclic metabolic switching",
      "HeartMath® 0.10 Hz coherence: autonomic reset before motor challenge",
      "PWR!Moves® & Parkinson'strength™: high-amplitude neuro-motor agility",
      "Strength4Balance: fall prevention, vestibular tuning, and joint posture",
    ],
  },
];

const PROGRAM_SPECTRUM = [
  {
    tier: "Discovery Call",
    duration: "15 Minutes",
    investment: "Complimentary ($0)",
    focus: "Virtual Motivational Interview",
    desc: "A focused, sensitive 15-minute brainstorm to evaluate your current baseline, identify whether the stall is showing up in life, business, or body, and determine readiness for the Metabolic Neuroplasticity™ loop.",
    highlight: false,
  },
  {
    tier: "Explorer Session",
    duration: "60 Minutes",
    investment: "$75",
    amountCents: 7500,
    checkoutUrl: "https://buy.stripe.com/bJeaEYbds2do5ex7cw43S04",
    focus: "Diagnostic & Lifestyle Assessment",
    desc: "In-depth sensitive motivational interview, clinical risk assessment, rapport building, and co-creating a tailored strategic options roadmap that integrates with your demanding schedule.",
    highlight: false,
  },
  {
    tier: "Specialty 5-Session Sprints",
    duration: "5 Sessions Total",
    investment: "$297",
    amountCents: 29700,
    checkoutUrl: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    focus: "Targeted Entry Horizons (Orig. $350)",
    desc: "1 initial 60-min foundation + 4 follow-ups. Choose from 16 targeted programs across Life Advisory, Business Scaling, and Health Longevity (Bust Your Stress, Scale Up, Women Business Owners, Menopause, Bone Rebuilding, Senior Balance, and PWR! Parkinson's).",
    highlight: false,
  },
  {
    tier: "Quick Start Retainer",
    duration: "90 Days (~3 Months)",
    investment: "$1,275",
    amountCents: 127500,
    checkoutUrl: "https://buy.stripe.com/7sY00k0yO6tEfTb0O843S00",
    focus: "Foundational Neuro-Habit Loop",
    desc: "Comprehensive research and protocol design to improve acute or chronic conditions. Covers breath mechanics, posture, nutrition, HeartMath HRV coherence, and structured relapse prevention.",
    highlight: false,
  },
  {
    tier: "Quality Goals Retainer",
    duration: "6 Months",
    investment: "$2,400",
    amountCents: 240000,
    checkoutUrl: "https://buy.stripe.com/3cI28s3L04lw8qJgN643S01",
    focus: "Signature Advisory Retainer",
    desc: "Deep integration across Life, Business, Work, and Recovery. Sensitive extended assessments of mind, body, and enterprise; neuroplastic habit maintenance, and permanent relapse aversion.",
    highlight: true,
  },
  {
    tier: "Beating Resistance",
    duration: "12 Months",
    investment: "$4,800",
    amountCents: 480000,
    checkoutUrl: "https://buy.stripe.com/9B67sMchw05ggXf9kE43S02",
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
  const [activeCertModal, setActiveCertModal] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeCertModal) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveCertModal(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeCertModal]);

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
                <strong className="text-slate-900 font-semibold"> Metabolic Neuroplasticity™</strong>.
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
                      Vera Shury, MS, LBHC
                    </span>
                    <span className="text-xs font-mono text-emerald-300 mt-0.5 block tracking-wide">
                      Licensed Board Certified Health Coach · Life · Business · Health Advisory
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
                        Vera Shury, MS, LBHC
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Licensed Board Certified Health Coach (LBHC) · Founder
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
            FOUNDATIONAL METHODOLOGY: METABOLIC NEUROPLASTICITY™ QUOTE
           ========================================================= */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-amber-50/40 to-white border-y border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl border border-amber-200/90 bg-white p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(234,88,12,0.1)] overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-100/60 to-orange-100/30 rounded-bl-full pointer-events-none -z-10" />

                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
                    The Definition of Metabolic Neuroplasticity™:{" "}
                    <span className="font-serif italic font-normal text-[#ea580c] block mt-1">
                      Fuel, Movement &amp; Attention.
                    </span>
                  </h2>

                  <div className="relative border-l-4 border-[#ea580c] pl-5 sm:pl-7 py-3 my-4 bg-amber-50/50 rounded-r-2xl">
                    <blockquote className="font-serif text-lg sm:text-2xl italic leading-relaxed text-slate-900">
                      &ldquo;Metabolic Neuroplasticity™ is the intentional orchestration of fuel, movement, and attention—rooted in the Hebbian principle that neurons that fire together, wire together. Fuel sets the cellular conditions; movement and attention write the durable pattern. By aligning these three biological vectors, we help people sustain their energy, physical agency, and lifelong mental capacity.&rdquo;
                    </blockquote>
                    <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-sm font-bold text-slate-900">Vera Shury, MS, LBHC</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-600 font-mono">Licensed Board Certified Health Coach · Founder</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-[#ea580c] font-semibold">Tucson, Arizona</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    The brain rewires more reliably when cellular energy, inflammation, sleep, and protein status are supported—and when practice is short, specific, and repeated. When programs isolate these components (exercise without cellular fuel, or nutrition without targeted cognitive firing), neuroplasticity stalls. Vera runs all three on the same client as a single, coherent operating system:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                        <Flame className="w-4 h-4 text-[#ea580c]" />
                        <span>01 · Fuel</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        Epigenetic Cellular Energy
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Cyclic metabolic switching (12–14 hr fasting) and clinical nutrition (backed by Harvard Health <em>Food Is Medicine</em>) generate the ketone bodies and BDNF needed for synaptogenesis.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span>02 · Movement</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        High-Amplitude Motor Firing
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        PWR!Moves® drills and Parkinson&apos;strength™ protocols (reinforced by Harvard Medical School <em>Stem Cell Medicine</em>) recruit dormant motor cortex pathways and re-establish neuromuscular amplitude.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80">
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider mb-2">
                        <Heart className="w-4 h-4 text-purple-600" />
                        <span>03 · Attention</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        Hebbian Synaptic Consolidation
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        HeartMath® 0.10 Hz coherence and Harvard Health <em>Cognitive Fitness</em> protocols focus mindful attention, turning repetitive firing into permanent synaptic connections that sustain mental capacity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    Metabolic Neuroplasticity™.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Adult hippocampal neurogenesis is not a luxury reserved for the young. Your nervous system continually produces new neurons and consolidates synaptogenesis—driven by two biological mechanisms: <strong>epigenetics</strong> (cellular fuel altering gene expression) and <strong>Hebbian neuroplasticity</strong> (&ldquo;neurons that fire together wire together&rdquo; in 6-day micro-loops).
                </p>

                {/* The Tripartite Clinical Sequence */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-amber-300 mb-1">
                      <Flame className="w-4 h-4 text-[#ea580c]" />
                      <span>01 · Epigenetics &amp; Fuel: Cyclic Metabolic Switching</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      A structured 12–14 hour daily fasting window triggers hepatic ketone bodies that directly alter gene expression, upregulating Brain-Derived Neurotrophic Factor (BDNF) and activating mitochondrial autophagy.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-indigo-300 mb-1">
                      <Heart className="w-4 h-4 text-[#635bff]" />
                      <span>02 · Autonomic Steer: 0.10 Hz HeartMath® Coherence</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Real-time HRV biofeedback downregulates chronic sympathetic overdrive and calms amygdala cortisol, establishing the receptive baseline necessary for synaptogenesis.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-300 mb-1">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>03 · Hebbian Neuroplasticity: 6-Day Micro-Loops</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      &ldquo;What fires together wires together.&rdquo; High-amplitude PWR!Moves® drills executed during the primed ketone window consolidate motor maps into durable 6-day habit loops.
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
              Clear, transparent clinical agreements under Healthcare Taxonomy Code <strong>71400000X</strong> (Specialized Clinical Exercise &amp; Health Coaching), qualifying programs for medical tax deductibility and flexible monthly installments with <strong>Affirm</strong>.
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

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-sans">
                    <span className="text-xl font-bold text-slate-900">{prog.investment}</span>
                    {prog.amountCents && prog.amountCents >= 29700 && (
                      <AffirmPromo
                        amountCents={prog.amountCents}
                        programName={prog.tier}
                        stripeUrl={prog.checkoutUrl}
                        compact={true}
                      />
                    )}
                  </div>

                  <div className="text-xs font-semibold text-[#ea580c] mt-1">
                    {prog.focus}
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={CALENDAR_URL}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#ea580c] transition-colors"
                  >
                    <span>Book Call</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  {prog.checkoutUrl ? (
                    <a
                      href={prog.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#635bff] hover:text-[#4f46e5] transition-colors"
                    >
                      <span>Pay via Stripe ↗</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400">
                      Taxonomy: 71400000X
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Interactive Specialty Programs Grid (16 Sprints + Search + Tabs) */}
          <SpecialtyProgramsGrid />

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
              <a href="mailto:vera@libertysciencecoaching.com" className="hover:text-slate-950 font-semibold">
                vera@libertysciencecoaching.com
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            6B. HARVARD MEDICAL SCHOOL & HARVARD HEALTH CREDENTIALS SHOWCASE
           ========================================================= */}
        <section className="border-t border-slate-100 bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Harvard Medical School &amp; Harvard Health{" "}
                <span className="font-serif italic font-normal text-[#A51C30]">
                  Credentials.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Vera Shury&apos;s Life, Business, and Health advisory services are anchored by verified continuing medical education and curriculum credentials issued by <strong>Harvard Medical School</strong> and <strong>Harvard Health Publishing</strong>. Click any certificate to inspect the authentic document or download the official verification PDF.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {HARVARD_CREDENTIALS.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-[#A51C30]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#A51C30] via-rose-700 to-amber-700" />

                  <div>
                    {/* Official Trademark Logo */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="relative h-11 w-28 shrink-0">
                        <Image
                          src={cert.logoSrc}
                          alt={cert.institution}
                          fill
                          sizes="112px"
                          className="object-contain object-left"
                        />
                      </div>
                      <span className="rounded-full bg-red-50 border border-red-200/70 px-2 py-0.5 text-[9px] font-bold text-[#A51C30] uppercase tracking-wider">
                        {cert.badge}
                      </span>
                    </div>

                    <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {cert.institution}
                    </div>

                    {/* Certificate Thumbnail Preview */}
                    {cert.previewImg && (
                      <div
                        onClick={() => setActiveCertModal(cert)}
                        className="my-3 relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 cursor-pointer group-hover:border-slate-300 transition-colors"
                        title="Click to view full certificate"
                      >
                        <Image
                          src={cert.previewImg}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-md">
                            Inspect Certificate
                          </span>
                        </div>
                      </div>
                    )}

                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-[#A51C30] transition-colors mt-2">
                      {cert.title}
                    </h3>

                    <div className="mt-1 text-[11px] font-mono text-[#ea580c] font-semibold">
                      {cert.code}
                    </div>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {cert.desc}
                    </p>

                    <div className="mt-3 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-[10px] text-slate-500">
                      <strong className="text-slate-700 block mb-0.5">Clinical Purpose:</strong>
                      {cert.supports}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {cert.pdfUrl ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveCertModal(cert)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#A51C30] transition-colors cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5 text-[#A51C30]" />
                          <span>View Doc</span>
                        </button>
                        <a
                          href={cert.pdfUrl}
                          download
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#A51C30] hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>PDF</span>
                        </a>
                      </>
                    ) : cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#A51C30] hover:underline"
                      >
                        <span>{cert.linkText || "Verify"}</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
                  <div className="mt-5 border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {cred.detail}
                    </span>
                    {cred.pdfUrl ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCertModal({
                            title: cred.title,
                            institution: cred.code,
                            code: cred.detail,
                            pdfUrl: cred.pdfUrl,
                            previewImg: cred.previewImg,
                          })
                        }
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A51C30] hover:underline cursor-pointer"
                      >
                        <FileText className="h-3 w-3" />
                        <span>{cred.linkText || "View PDF"}</span>
                      </button>
                    ) : cred.link ? (
                      <a
                        href={cred.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A51C30] hover:underline"
                      >
                        <span>{cred.linkText || "Verify"}</span>
                      </a>
                    ) : null}
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
                      <div className="text-xs font-bold">Vera Shury, MS, LBHC</div>
                      <div className="text-[11px] text-slate-300 font-mono">
                        Confidential 15-Minute Motivational Intake
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

      {/* Official Certificate Verification Modal (Mounted at Root via Portal to Escape Stacking Context & Navbar) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCertModal && (
              <div
                role="dialog"
                aria-modal="true"
                onClick={() => setActiveCertModal(null)}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] border border-slate-200 my-auto"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#A51C30] border border-red-100 shrink-0">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                          {activeCertModal.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                          {activeCertModal.institution} · Recipient: Vera Shury
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCertModal(null)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                      title="Close viewer"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative max-h-[60vh] sm:max-h-[65vh] overflow-y-auto bg-slate-950/5 p-4 sm:p-6 flex items-center justify-center">
                    {activeCertModal.previewImg ? (
                      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                        <Image
                          src={activeCertModal.previewImg}
                          alt={activeCertModal.title}
                          width={1200}
                          height={900}
                          className="h-auto max-h-[52vh] sm:max-h-[58vh] w-auto object-contain"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="p-8 text-center text-sm text-slate-500">
                        Official credential document available for direct verification.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-6 py-4">
                    <span className="text-xs text-slate-500 font-mono">
                      {activeCertModal.code}
                    </span>

                    <div className="flex items-center gap-2">
                      {activeCertModal.pdfUrl && (
                        <>
                          <a
                            href={activeCertModal.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Open Full PDF</span>
                          </a>
                          <a
                            href={activeCertModal.pdfUrl}
                            download
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#A51C30] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#821424] transition-colors shadow-sm cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download Certificate</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Global Footer */}
      <StackedCircularFooter />
    </div>
  );
}
