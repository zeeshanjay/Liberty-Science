"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Check, Activity } from "lucide-react";
import { useLenis } from "lenis/react";
import { CoherenceCanvas } from "@/components/CoherenceCanvas";
import { Header } from "@/components/Header";
import { MethodologyLoop } from "@/components/MethodologyLoop";
import { CredentialCertificates } from "@/components/CredentialCertificates";
import { InstitutionalTrustMarquee } from "@/components/InstitutionalTrustMarquee";
import { FeaturedMonographSection } from "@/components/FeaturedMonographSection";
import { FaqSection } from "@/components/FaqSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StripeBannerCards } from "@/components/StripeBannerCards";
import { ContactSection } from "@/components/ContactSection";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { PremiumCtaButton } from "@/components/ui/PremiumCtaButton";
import { ReadinessAssessmentModal } from "@/components/ReadinessAssessmentModal";
import { AffirmPromo } from "@/components/AffirmPromo";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const ADVISORY_PILLARS = [
  {
    id: "life-advisory",
    title: "Life Advisory",
    headline: "Neuro-functional wellness without guilt.",
    description:
      "Compassion attention practice and emotional baseline protection. We replace punitive willpower models with physiological self-regulation so you stop leaking vital energy to chronic sympathetic friction.",
    availability: "1:1 Executive & Personal Retainer",
    image: "/WhatsApp Image 2026-10-19 at 7.08.47 PM (6).jpeg",
    imageAlt: "Coherent sunrise movement and reflection practice",
    features: [
      "Compassion attention practice & emotional baseline protection",
      "Deconstruction of guilt-driven wellness habits",
      "HeartMath coherence integration for high-clarity living",
      "Cognitive resilience through life transitions",
    ],
    accentText: "text-[#ea580c]",
    borderHover: "hover:border-[#ea580c]/50",
  },
  {
    id: "business-advisory",
    title: "Business Advisory & Enterprise Scaling",
    headline: "Scaling instead of stalling. Stay able to run what you built.",
    description:
      "Enterprise scaling, decision clarity, and energy capacity under executive pressure. Designed for founders, women in business, and enterprise principals—applying the proven principles behind Vera’s own 4,000% practice scaling without sacrificing biological health.",
    availability: "Available On-Site & Virtually",
    image: "/WhatsApp Image 2026-10-19 at 7.08.47 PM (2).jpeg",
    imageAlt: "Vera Shury in executive consultation with a client",
    features: [
      "Scaling with stamina: 4,000% proven growth model (a trainable system, not an anomaly)",
      "Decision velocity & prefrontal endurance under executive commercial pressure",
      "Empowering women entrepreneurs & founders to expand without burnout",
      "Business succession & leadership balance without identity collapse",
    ],
    featured: true,
    accentText: "text-[#0f6e68]",
    borderHover: "hover:border-[#0f6e68]",
  },
  {
    id: "health-advisory",
    title: "Health Advisory",
    headline: "HeartMath coherence, brain-body loop & metabolic diet plans.",
    description:
      "A structured 3-step clinical sequence: HeartMath® coherence first to silence sympathetic overdrive, neuro-motor stabilization (Strength4Balance, PWR!Moves), and cyclic metabolic switching diet plans that sustain cellular vitality without stagnancy.",
    availability: "Available On-Site in Tucson & Virtually",
    image: "/WhatsApp Image 2026-10-19 at 7.08.47 PM (8).jpeg",
    imageAlt: "Vera Shury active alpine skiing at Taos",
    features: [
      "Step 1: HeartMath® 0.10 Hz autonomic coherence before challenge",
      "Step 2: Brain-body loop (Strength4Balance & PWR!Moves neuro-drills)",
      "Step 3: Cyclic metabolic switching diet plans & meal timing protocols",
      "Targeted anti-inflammatory nutrition & objective supplement audits",
    ],
    accentText: "text-[#1d4ed8]",
    borderHover: "hover:border-[#1d4ed8]/50",
  },
];

interface LivingEvidenceMetric {
  metric: string;
  targetNumber?: number;
  suffix?: string;
  label: string;
  sub: string;
}

const LIVING_EVIDENCE_METRICS: LivingEvidenceMetric[] = [
  {
    metric: "80+",
    targetNumber: 80,
    suffix: "+",
    label: "Years of Age",
    sub: "Active Neuro-Metabolic Baseline",
  },
  {
    metric: "20+",
    targetNumber: 20,
    suffix: "+",
    label: "Years Neuromuscular Practice",
    sub: "Applied Clinical & Field Coaching",
  },
  {
    metric: "Black Diamond",
    label: "Slopes & Kite-Surfing",
    sub: "Dynamic Vestibular & Reflex Output",
  },
  {
    metric: "Zero",
    label: "Stagnancy",
    sub: "Continuous Synaptic Remodeling",
  },
];

const CLIENT_TESTIMONIALS = [
  {
    quote: "You are my resource for my future.",
    author: "Terry S.",
    role: "Business Principal & Succession Client",
    pillar: "Life & Business Advisory",
  },
  {
    quote: "I have lost weight and don’t fall anymore.",
    author: "Pat P.",
    role: "Neuromuscular Conditioning Client",
    pillar: "Health Advisory",
  },
  {
    quote: "I always feel better and am happier after our session.",
    author: "Linda V.",
    role: "Autonomic Coherence Client",
    pillar: "Life Advisory",
  },
  {
    quote: "You helped me see more options.",
    author: "Dave K.",
    role: "Executive Strategy Client",
    pillar: "Business Advisory",
  },
];

function AnimatedMetricValue({ item }: { item: LivingEvidenceMetric }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const [reachedLimit, setReachedLimit] = useState(false);

  useEffect(() => {
    if (!isInView || typeof item.targetNumber !== "number") return;

    setReachedLimit(false);
    const controls = animate(0, item.targetNumber, {
      duration: 1.75,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
      onComplete: () => {
        setCount(item.targetNumber!);
        setReachedLimit(true);
      },
    });

    return () => controls.stop();
  }, [isInView, item.targetNumber]);

  if (typeof item.targetNumber === "number") {
    return (
      <span
        ref={ref}
        className="inline-flex items-baseline text-4xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-5xl"
      >
        <span>{count}</span>
        {item.suffix && (
          <motion.span
            initial={{ opacity: 0, scale: 0.2, y: 6, rotate: -35 }}
            animate={
              reachedLimit
                ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                : { opacity: 0, scale: 0.2, y: 6, rotate: -35 }
            }
            transition={{
              type: "spring",
              stiffness: 440,
              damping: 15,
            }}
            className="ml-0.5 inline-block text-[#0f6e68]"
          >
            {item.suffix}
          </motion.span>
        )}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
    >
      {item.metric}
    </motion.span>
  );
}

const ADVISORY_PROGRAMS = [
  {
    name: "90-Day Quickstart",
    price: "$1,275",
    amountCents: 127500,
    stripeCheckoutUrl: "https://buy.stripe.com/7sY00k0yO6tEfTb0O843S00",
    cadence: "90 Days (~3 Months)",
    summary:
      "Extended Sensitive Motivational Interview and comprehensive research into acute or chronic challenges—integrating breath, posture, targeted nutrition, and durable relapse prevention.",
    deliverables: [
      "Extended Sensitive Motivational Interview baseline",
      "Deep research audit into acute & chronic conditions",
      "Brain-body loop calibration (breath, posture, movement)",
      "Targeted metabolic fueling & hydration hygiene",
      "Behavior change scaffolding & relapse prevention",
    ],
    highlight: false,
  },
  {
    name: "6-Month Quality Goals",
    price: "$2,400",
    amountCents: 240000,
    stripeCheckoutUrl: "https://buy.stripe.com/3cI28s3L04lw8qJgN643S01",
    cadence: "6-Month Advisory",
    summary:
      "Comprehensive guidance for Life, Business, Work, Retirement & Recovery. Combines mind-body assessments with proven techniques for mental balance and lasting habit maintenance.",
    deliverables: [
      "Sensitive Extended Motivational Interview & lifestyle review",
      "Assessments across mind, body, work/retirement & spirit",
      "Techniques for deep mental balance & stress regulation",
      "Active business balance & workday fitness integration",
      "Ongoing habit maintenance & relapse aversion protocols",
    ],
    highlight: true,
    badge: "Recommended Horizon",
  },
  {
    name: "12-Month Beating Resistance",
    price: "$4,800",
    amountCents: 480000,
    stripeCheckoutUrl: "https://buy.stripe.com/9B67sMchw05ggXf9kE43S02",
    cadence: "Annual Advisory Retainer",
    summary:
      "A year-long advisory partnership providing scientific assessments of emotional, physical, and spiritual balance—dissolving deep-seated resistance with new evidence-based modalities.",
    deliverables: [
      "Scientific assessments of emotional, physical & spiritual balance",
      "Long-term habit transformation with ongoing emotional support",
      "Creative, evidence-based modalities tailored to self & relationships",
      "Advanced neuro-motor education & fall immunity re-education",
      "Continuous relapse aversion & sustained lifetime capability",
    ],
    highlight: false,
  },
];

const CURATED_RESOURCES = [
  {
    category: "Product Line 1",
    title: "Essential Books Vetted by Vera",
    description:
      "Personally read and applied by Vera in her clinical coaching and personal health recovery.",
    highlightQuote:
      "“Eat to Beat Disease — I used this book’s advice for my own chronic lymphocytic leukemia and kept my numbers stable.” — Vera Shury",
    products: [
      {
        name: "Eat to Beat Disease (Dr. William Li)",
        link: "https://amzn.to/45gwXPZ",
        note: "Used directly by Vera for leukemia stabilization",
      },
      {
        name: "Grow a New Brain (Dr. Alberto Villoldo)",
        link: "https://amzn.to/45bIAHP",
        note: "Neuroplasticity, targeted nutrition & brain repair",
      },
      {
        name: "Quench (Dana Cohen, MD)",
        link: "https://amzn.to/4xiwB77",
        note: "Hydration hygiene to prevent confusion & falls",
      },
      {
        name: "10-Day Detox Diet (Dr. Mark Hyman)",
        link: "https://amzn.to/3TFdcPn",
        note: "Combats cellular 'inflammaging'",
      },
    ],
  },
  {
    category: "Product Line 2",
    title: "Supplements & Herbs (30-Year Routine)",
    description:
      "Supplements can be as potent as medication. Vera has personally used these staples for nearly three decades.",
    highlightQuote:
      "“Electrolytes keep the body hydrated longer, providing sustained energy. I have used them for nearly 30 years.” — Vera Shury",
    products: [
      {
        name: "BodyHealth Electrolytes",
        link: "https://amzn.to/3RWRypp",
        note: "Cellular hydration & energy for 30 years",
      },
      {
        name: "BodyHealth Creatine",
        link: "https://amzn.to/4wEHlMJ",
        note: "Preserves crucial muscle mass & mobility with age",
      },
      {
        name: "Krill Oil Omega-3",
        link: "https://amzn.to/4g9nWwZ",
        note: "Crosses blood-brain barrier for neuro-inflammation",
      },
      {
        name: "Sports Research Collagen",
        link: "https://amzn.to/4qbBTPx",
        note: "Joint recovery, skin elasticity & tissue support",
      },
    ],
  },
  {
    category: "Product Line 4 & 5",
    title: "Neuromuscular & Longevity Equipment",
    description:
      "Precision tools for fall prevention, joint safety, and active neuromuscular recovery.",
    highlightQuote:
      "“TENS Unit kept me walking with low back and knee injury for years before replacements. Now I ski again at 86.” — Vera Shury",
    products: [
      {
        name: "TENS Neuromuscular Unit",
        link: "https://amzn.to/45nlfD3",
        note: "Pain management that kept Vera active & skiing at 86",
      },
      {
        name: "TRX Suspension Exercise Helper",
        link: "https://amzn.to/45j8l9h",
        note: "Deep knee squats without joint strain; lean without falling",
      },
      {
        name: "Looped Non-Stretch PT Band",
        link: "https://amzn.to/4qcnFhB",
        note: "Zero-bounce strap for safe post-op knee/hip mobility",
      },
      {
        name: "Comfytemp Red Light Therapy",
        link: "https://amzn.to/4xrLHr4",
        note: "20 min/day photobiomodulation for deep recovery",
      },
    ],
  },
];

export default function LibertyScienceLandingPage() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Subtle GSAP-like scroll parallax on the hero portrait
  const portraitY = useTransform(heroScroll, [0, 1], [0, 42]);

  // Clinical Readiness to Change Diagnostic Modal State
  const [isReadinessModalOpen, setIsReadinessModalOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    selector: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(selector, { offset: -88, duration: 1.2 });
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="relative min-h-screen">
      {/* Subtle Antigravity Interactive Coherence Canvas */}
      <CoherenceCanvas />

      {/* Sticky Architectural Blur Header */}
      <Header />

      {/* Main Content Container */}
      <main className="relative z-10 pt-24 sm:pt-28">
        {/* =========================================================
            1. HERO SECTION (ABOVE THE FOLD — NO LABEL ABOVE HEADING)
           ========================================================= */}
        <section
          ref={heroRef}
          className="relative overflow-hidden pt-6 pb-6 sm:pt-10 sm:pb-10"
        >
          {/* Warm Decorative Color Aura Behind Hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#635bff]/12 via-[#ea580c]/10 to-transparent blur-3xl"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Editorial Headline & CTAs (7 Cols) */}
              <div className="lg:col-span-7">
                <motion.h1
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                  className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-[68px] lg:leading-[1.04]"
                >
                  Your Brain Is Still{" "}
                  <span className="bg-gradient-to-r from-[#635bff] via-[#8b5cf6] to-[#ea580c] bg-clip-text font-serif italic font-normal text-transparent">
                    Generating.
                  </span>
                </motion.h1>

                <motion.p
                  custom={0.1}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed"
                >
                  When you feel stuck, frustrated, or like momentum is slipping downhill—that emotional resistance is your biological signal. We pair HeartMath® coherence, brain-body loops, and metabolic switching so owners, caregivers, and active adults stay capable of running what they built.{" "}
                  <span className="font-semibold text-[#ea580c]">
                    No stagnancy. Available on-site in Tucson or virtually worldwide.
                  </span>
                </motion.p>

                <motion.div
                  custom={0.2}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                  className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                >
                  <div className="w-full sm:w-auto">
                    <PremiumCtaButton
                      href={CALENDAR_URL}
                      variant="primary"
                      size="lg"
                    >
                      Book Readiness Consultation
                    </PremiumCtaButton>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsReadinessModalOpen(true)}
                    className="group inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-slate-300/90 bg-white/90 px-5 sm:px-6 text-xs sm:text-[13px] font-semibold text-slate-800 shadow-2xs backdrop-blur-md hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer active:scale-98"
                  >
                    <Activity className="h-4 w-4 text-[#ea580c] transition-colors group-hover:text-white" />
                    <span>Check Your Readiness (45s)</span>
                  </button>
                </motion.div>

                <motion.div
                  custom={0.3}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariant}
                  className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/90 pt-5"
                >
                  <div>
                    <div className="text-base font-semibold text-[#635bff] sm:text-2xl">
                      HeartMath®
                    </div>
                    <div className="mt-0.5 text-[10px] sm:text-xs text-slate-600 leading-snug">
                      Autonomic HRV Coherence
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[#1d4ed8] sm:text-2xl">
                      PWR!Moves®
                    </div>
                    <div className="mt-0.5 text-[10px] sm:text-xs text-slate-600 leading-snug">
                      Neuromuscular Plasticity
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-[#ea580c] sm:text-2xl">
                      Metabolic Diet
                    </div>
                    <div className="mt-0.5 text-[10px] sm:text-xs text-slate-600 leading-snug">
                      Cyclic Switching &amp; Fuel
                    </div>
                  </div>
                </motion.div>

                {/* Direct Link to Dedicated About Page & Verified HarvardX Credential */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c] hover:text-[#c2410c] transition-colors"
                  >
                    <span>Read Vera&apos;s full story &amp; clinical journey</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <a
                    href="https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/90 bg-rose-50/80 px-3 py-1 text-[11px] font-semibold text-rose-950 transition-all hover:bg-rose-100 hover:border-rose-300 shadow-2xs"
                  >
                    <span className="font-serif font-bold text-[#A51C30]">HARVARDx</span>
                    <span className="text-rose-300">|</span>
                    <span>Technology Entrepreneurship</span>
                    <ArrowUpRight className="h-3 w-3 text-[#A51C30]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Scroll-Parallax Studio Portrait Frame (5 Cols) */}
              <motion.div
                custom={0.25}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                style={{ y: portraitY }}
                className="relative lg:col-span-5"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative aspect-[4/4.5] overflow-hidden rounded-[28px] border-2 border-white bg-gradient-to-b from-[#0f6e68]/20 via-stone-200 to-[#ea580c]/20 shadow-[0_24px_60px_-15px_rgba(15,110,104,0.22)]">
                    <Image
                      src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (3).jpeg"
                      alt="Vera Shury, C.H.C. — Founder of Liberty Science Coaching"
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061e1c]/95 via-[#061e1c]/75 to-transparent p-6 pt-16 text-white">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="font-script text-2xl text-[#ff9f68] sm:text-3xl">
                            Vera Shury, C.H.C.
                          </div>
                          <div className="mt-0.5 text-xs font-medium text-emerald-100 sm:text-sm">
                            Principal Neuro-Functional &amp; Executive Advisor
                          </div>
                        </div>
                        <div className="hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 p-2 backdrop-blur-md sm:flex">
                          <div className="relative h-10 w-12 overflow-hidden rounded-lg">
                            <Image
                              src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (2).jpeg"
                              alt="1-on-1 Executive Advisory"
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="pr-1">
                            <div className="text-[11px] font-semibold text-white">
                              1:1 Advisory
                            </div>
                            <div className="text-[10px] text-emerald-200">
                              On-Site &amp; Virtual
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Official Institutional Credential Cards Matrix */}
            <CredentialCertificates />
          </div>
        </section>

        {/* =========================================================
            2. CORE METHODOLOGY: COMPACT STICKY SCROLL STACKING CARDS
           ========================================================= */}
        <MethodologyLoop onOpenAssessment={() => setIsReadinessModalOpen(true)} />

        {/* =========================================================
            3. THE THREE ADVISORY PILLARS (CLEAN PHOTOGRAPHIC BENTO)
           ========================================================= */}
        <section id="pillars" className="relative py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between gap-4 pb-6 lg:flex-row lg:items-end"
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                  Tri-Domain Advisory for{" "}
                  <span className="font-serif italic font-normal text-[#ea580c]">
                    Sovereign Longevity.
                  </span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                Cognitive sharpness in the boardroom cannot be divorced from
                autonomic peace at home or neuromuscular stability on your feet.
                We advise across all three dimensions simultaneously.
              </p>
            </motion.div>

            {/* 3-Column Photographic Bento Grid — No Cheap Icon Boxes */}
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
              {ADVISORY_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  whileHover={{ y: -6 }}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white transition-all duration-300",
                    pillar.featured
                      ? "border-[#0f6e68] shadow-[0_20px_50px_-15px_rgba(15,110,104,0.14)] ring-1 ring-[#0f6e68]/30"
                      : cn(
                          "border-slate-200/90 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:shadow-[0_12px_32px_-10px_rgba(15,23,42,0.1)]",
                          pillar.borderHover
                        )
                  )}
                >
                  <div>
                    {/* Card Image Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={pillar.image}
                        alt={pillar.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6 text-white">
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7">
                      <p
                        className={cn(
                          "font-serif text-xl italic",
                          pillar.accentText
                        )}
                      >
                        &ldquo;{pillar.headline}&rdquo;
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {pillar.description}
                      </p>

                      <div className="mt-6 border-t border-stone-200/80 pt-5">
                        <ul className="space-y-2.5">
                          {pillar.features.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6e68]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {pillar.id === "business-advisory" && (
                          <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/60 p-3.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-serif font-bold text-xs text-[#A51C30]">HARVARDx</span>
                                <span className="text-[10px] font-semibold text-rose-900">Lab to Market</span>
                              </div>
                              <a
                                href="https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A51C30] hover:underline"
                              >
                                <span>Verify Credential</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                              Backed by formal HarvardX certification in Technology Entrepreneurship (Lab to Market), translating complex innovation and behavioral science into scalable, sustainable business performance.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-7 py-4">
                    <span className="text-xs font-medium text-slate-500">
                      {pillar.availability}
                    </span>

                    <PremiumCtaButton
                      href={CALENDAR_URL}
                      variant={pillar.featured ? "primary" : "secondary"}
                      size="sm"
                    >
                      Book Advisory
                    </PremiumCtaButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            4. PROOF & LIVING EVIDENCE ("NO STAGNANCY")
           ========================================================= */}
        <section id="about" className="relative py-10 sm:py-14">
          <div id="evidence" className="sr-only" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[32px] border border-slate-200/90 bg-white text-slate-900 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Narrative, Action Photos & Quote Block (7 Cols) */}
                <div className="flex flex-col justify-between border-b border-slate-100 p-8 sm:p-12 lg:col-span-7 lg:border-b-0 lg:border-r">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                      Biology Responds to the{" "}
                      <span className="font-serif italic font-normal text-[#ea580c]">
                        Demands You Assign It.
                      </span>
                    </h2>

                    <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      At over 80 years of age, Vera Shury does not lecture from
                      the sidelines. Forged through two decades of intensive
                      neuromuscular conditioning, Parkinson’s motor research,
                      black-diamond alpine skiing, snowboarding, and
                      kite-surfing, her nervous system is living verification of
                      Metabolic Neuroplasticity™.
                    </p>

                    {/* Dual Action Photo Showcase: Black Diamond Trail Sign + Snowboarding */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white shadow-md">
                        <Image
                          src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (5).jpeg"
                          alt="Vera Shury at Black Diamond Spur Catwalk and Bowl Side ski sign"
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-3.5">
                          <span className="text-xs font-semibold text-amber-300">
                            Black Diamond Slopes
                          </span>
                          <p className="text-[11px] text-white/95">
                            Spur Catwalk &amp; Bowl Side Alpine Runs
                          </p>
                        </div>
                      </div>

                      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white shadow-md">
                        <Image
                          src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (7).jpeg"
                          alt="Vera Shury snowboarding on the mountain slope"
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-3.5">
                          <span className="text-xs font-semibold text-emerald-300">
                            Dynamic Vestibular Balance
                          </span>
                          <p className="text-[11px] text-white/95">
                            Active Snowboarding &amp; Reflex Agility
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Quote Block with Portrait Avatar */}
                  <blockquote className="mt-8 rounded-2xl border border-stone-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-7">
                    <p className="font-serif text-2xl italic leading-snug text-slate-900 sm:text-3xl">
                      &ldquo;Your brain is still hiring new capacity. We provide
                      the job description.&rdquo;
                    </p>
                    <footer className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200/80 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#ea580c]">
                          <Image
                            src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (4).jpeg"
                            alt="Vera Shury"
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            Vera Shury, C.H.C.
                          </div>
                          <div className="text-xs text-slate-500">
                            Founder, Liberty Science Coaching · Tucson, AZ
                          </div>
                        </div>
                      </div>
                      <PremiumCtaButton
                        href={CALENDAR_URL}
                        variant="primary"
                        size="sm"
                      >
                        Consult Directly with Vera
                      </PremiumCtaButton>
                    </footer>
                  </blockquote>
                </div>

                {/* Right 4 Metric Counters Grid — Animated Count-Up + Plus Sign Reveal */}
                <div className="grid grid-cols-1 divide-y divide-stone-200/80 bg-white/60 sm:grid-cols-2 sm:divide-x sm:divide-y lg:col-span-5 lg:grid-cols-1 lg:divide-x-0">
                  {LIVING_EVIDENCE_METRICS.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col justify-center p-7 transition-colors hover:bg-white/90 sm:p-9"
                    >
                      <span className="text-xs font-medium text-[#0f6e68]">
                        {item.sub}
                      </span>
                      <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
                        <AnimatedMetricValue item={item} />
                        <span className="text-lg font-medium text-[#ea580c]">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            FEATURED CLINICAL MONOGRAPH & SCIENTIFIC WHITE PAPER
           ========================================================= */}
        <FeaturedMonographSection />

        {/* =========================================================
            INSTITUTIONAL TRUST & HEALTHCARE ACCREDITATIONS MARQUEE
           ========================================================= */}
        <InstitutionalTrustMarquee />

        {/* =========================================================
            5. ADVISORY PROGRAMS & RATES (NO E-COMMERCE CARTS)
           ========================================================= */}
        <section id="advisory" className="relative py-10 sm:py-14">
          <div id="programs" className="sr-only" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between gap-4 pb-6 lg:flex-row lg:items-end"
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                  Advisory Programs &amp;{" "}
                  <span className="font-serif italic font-normal bg-gradient-to-r from-[#635bff] to-[#ea580c] bg-clip-text text-transparent">
                    Transparent Rates.
                  </span>
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-sm leading-relaxed text-slate-600">
                  Every engagement begins with mutual readiness alignment. No
                  automated checkouts—select your horizon and schedule a direct
                  Discovery Call on Vera’s calendar.
                </p>
                <button
                  type="button"
                  onClick={() => setIsReadinessModalOpen(true)}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#ea580c] hover:text-[#c2410c] transition-colors cursor-pointer"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Run the 45-Second Readiness Screen ↗</span>
                </button>
              </div>
            </motion.div>

            {/* 3 Executive Advisory Programs — Stripe-Grade Precision Cards */}
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
              {ADVISORY_PROGRAMS.map((program, idx) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl bg-white p-8 lg:p-9 transition-all duration-300",
                    program.highlight
                      ? "border-2 border-[#635bff] shadow-[0_4px_24px_-4px_rgba(99,91,255,0.18),0_20px_48px_-12px_rgba(99,91,255,0.12)] ring-4 ring-[#635bff]/5 md:-translate-y-2"
                      : "border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_32px_-8px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06),0_20px_40px_-10px_rgba(15,23,42,0.1)]"
                  )}
                >
                  {program.badge && (
                    <div className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full bg-[#635bff] px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm tracking-wide">
                      {program.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      {program.name}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-500 min-h-[40px]">
                      {program.summary}
                    </p>

                    <div className="mt-6 border-b border-slate-100 pb-5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-[42px] font-extrabold tracking-tight text-slate-900 font-mono">
                          {program.price}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          / {program.cadence}
                        </span>
                      </div>
                      <div className="mt-3">
                        <AffirmPromo amountCents={program.amountCents} />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3.5">
                        What&apos;s included
                      </div>
                      <ul className="space-y-3">
                        {program.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-700"
                          >
                            <div
                              className={cn(
                                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                                program.highlight
                                  ? "bg-indigo-50 text-[#635bff]"
                                  : "bg-slate-100 text-slate-600"
                              )}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-2 flex flex-col gap-2.5">
                    <a
                      href={program.stripeCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold shadow-xs transition-all",
                        program.highlight
                          ? "bg-[#635bff] text-white hover:bg-[#5349e0]"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      )}
                    >
                      <span>Enroll with Stripe / Affirm</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-full items-center justify-center text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      <span>Or Book Discovery Call First ↗</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stripe-Grade Entry Offering Banner Cards */}
            <StripeBannerCards />
          </div>
        </section>

        {/* =========================================================
            6. TESTIMONIALS (ARCHITECTURAL FRAMER MATRIX)
           ========================================================= */}
        <TestimonialsSection />

        {/* =========================================================
            6. CURATED TOOLS & PROTOCOLS (TESTED IN PRACTICE)
           ========================================================= */}
        <section id="resources" className="relative py-10 sm:py-14">
          <div id="curated" className="sr-only" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65 }}
              className="overflow-hidden rounded-[32px] border border-slate-200/90 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.06)]"
            >
              {/* Top Curated Header + Verified Clinical Protocol Image */}
              <div className="grid grid-cols-1 border-b border-slate-100 lg:grid-cols-12">
                <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:col-span-8 lg:border-r lg:border-slate-100">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                    Curated Tools &amp; Protocols{" "}
                    <span className="font-serif italic font-normal bg-gradient-to-r from-[#635bff] to-[#ea580c] bg-clip-text text-transparent">
                      Tested in Daily Practice
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    Nothing enters this index through sponsorship hype. Every
                    book, biofeedback sensor, and piece of neuromuscular
                    equipment has been personally stress-tested by Vera Shury in
                    daily practice and clinical coaching.
                  </p>

                  <div className="mt-6 flex items-center">
                    <Link
                      href="/curated"
                      className="group/link inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#ea580c] shadow-xs"
                    >
                      <span>Explore Full 67-Item Curated Store</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Verified Clinical Protocol Image from public/ */}
                <div className="flex flex-col items-center justify-center bg-slate-50/60 p-8 lg:col-span-4">
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all hover:scale-[1.02] hover:border-[#635bff]"
                  >
                    <div className="relative h-44 w-44 sm:h-48 sm:w-48">
                      <Image
                        src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (1).jpeg"
                        alt="Clinical Protocol Verification Stamp"
                        fill
                        sizes="192px"
                        className="object-contain"
                      />
                    </div>
                  </a>
                </div>
              </div>

              {/* 3 Resource Columns — Real Products & Verified Quotes from Vera */}
              <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {CURATED_RESOURCES.map((res) => (
                  <div
                    key={res.title}
                    className="flex flex-col justify-between p-8 transition-colors hover:bg-slate-50/50 sm:p-9"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#635bff] font-bold">
                        {res.category}
                      </span>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                        {res.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {res.description}
                      </p>

                      {/* Vera's Real Clinical Experience Note */}
                      <div className="mt-4 rounded-2xl bg-indigo-50/40 border border-indigo-900/10 p-3.5">
                        <p className="text-xs font-serif italic text-slate-800 leading-snug">
                          {res.highlightQuote}
                        </p>
                      </div>

                      {/* Real Verified Products with direct Amazon Links */}
                      <ul className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                        {res.products.map((prod) => (
                          <li key={prod.name} className="flex flex-col gap-0.5">
                            <a
                              href={prod.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/item inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-[#635bff] transition-colors"
                            >
                              <span>{prod.name}</span>
                              <ArrowUpRight className="h-3 w-3 text-stone-400 group-hover/item:text-[#635bff] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                            </a>
                            <span className="text-[11px] text-slate-500 leading-snug">
                              {prod.note}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            7. MINIMAL 2-COLUMN FAQ SECTION
           ========================================================= */}
        <FaqSection />

        {/* =========================================================
            8. CONTACT SECTION (INSTANT SCHEDULING & DIRECT INQUIRY)
           ========================================================= */}
        <ContactSection />
      </main>

      {/* =========================================================
          9. STACKED CIRCULAR FOOTER
         ========================================================= */}
      <StackedCircularFooter />

      {/* Interactive Clinical Readiness to Change Assessment Modal */}
      <ReadinessAssessmentModal
        isOpen={isReadinessModalOpen}
        onClose={() => setIsReadinessModalOpen(false)}
      />
    </div>
  );
}
