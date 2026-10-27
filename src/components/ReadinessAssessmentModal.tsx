"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  ShieldCheck,
  Download,
  Sparkles,
} from "lucide-react";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

interface QuestionOption {
  key: string;
  label: string;
  detail: string;
  tag: string;
}

interface Question {
  id: string;
  domain: string;
  question: string;
  context: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: "domain",
    domain: "Emotional Signal & Focus",
    question: "Where is the emotional signal or stall showing up most strongly?",
    context:
      "Before any physical stall or business friction, your emotional state is the early signal. Where do you feel stuck, frustrated, or like momentum is going downhill?",
    options: [
      {
        key: "A",
        label: "Frustrated by Physical Shifts or Feeling Downhill",
        detail:
          "Balance slips, tremor, motor hesitation, stiffness, or anxious that physical independence is declining.",
        tag: "Health & Motor Domain",
      },
      {
        key: "B",
        label: "Mentally Drained & Stuck in Business Leadership",
        detail:
          "Decision fatigue, executive pressure, or feeling stuck in operational burnout without mental recovery.",
        tag: "Business Domain",
      },
      {
        key: "C",
        label: "Emotional Overload & Self-Care Guilt",
        detail:
          "Sadness, chronic friction, or pouring energy into family while feeling guilty prioritizing your own biology.",
        tag: "Life Domain",
      },
      {
        key: "D",
        label: "Cross-Domain Friction (Stuck in Body & Mind)",
        detail:
          "Physical exhaustion leaking into business decisions and draining emotional patience every single day.",
        tag: "Integrated Loop",
      },
    ],
  },
  {
    id: "priority",
    domain: "Timeline & Priority",
    question: "How critical is resolving this capacity leak for you?",
    context:
      "Behavioral change succeeds when readiness aligns with real urgency. How soon must this shift?",
    options: [
      {
        key: "A",
        label: "Critical: Must shift within 30 to 90 days",
        detail:
          "It is actively costing mobility, personal independence, or business execution.",
        tag: "Action Stage",
      },
      {
        key: "B",
        label: "Persistent: Ongoing friction I have delayed resolving",
        detail:
          "Tolerated for months, but recognizing that passive waiting only deepens stagnancy.",
        tag: "Preparation Stage",
      },
      {
        key: "C",
        label: "Proactive: Seeking preventative neuro-longevity",
        detail:
          "Functionally capable today, but aiming to lock in lifelong motor and cognitive reserve.",
        tag: "Maintenance Stage",
      },
    ],
  },
  {
    id: "gap",
    domain: "Readiness Gap",
    question: "What has disrupted your follow-through in the past?",
    context:
      "Failed past attempts usually stem from fragmented advice rather than personal willpower.",
    options: [
      {
        key: "A",
        label: "Fragmented or isolated solutions",
        detail:
          "Separate exercise, meditation apps, or prescriptions that never formed one coherent loop.",
        tag: "Integration Gap",
      },
      {
        key: "B",
        label: "Self-care guilt and divided attention",
        detail:
          "Pouring energy into family or business while treating personal health as an expendable afterthought.",
        tag: "Baseline Protection Gap",
      },
      {
        key: "C",
        label: "Loss of confidence from a physical setback",
        detail:
          "Surgery, joint replacement, or diagnosis made movement feel risky without clinical oversight.",
        tag: "Proprioceptive Gap",
      },
      {
        key: "D",
        label: "High cognitive pressure draining physical reserves",
        detail:
          "Constant sympathetic fight-or-flight leaves zero bandwidth for cellular cellular recovery.",
        tag: "Autonomic Gap",
      },
    ],
  },
  {
    id: "outcome",
    domain: "Target Outcome",
    question: "What does restored capability look like for you?",
    context:
      "We design the neuroplastic protocol backward from the real-world function you refuse to surrender.",
    options: [
      {
        key: "A",
        label: "Stay able to run what I built",
        detail:
          "Sharp executive decision clarity, leadership endurance, and vitality without burnout.",
        tag: "Executive Independence",
      },
      {
        key: "B",
        label: "Dynamic balance & lifelong motor autonomy",
        detail:
          "Walking with stable posture, reactive fall immunity, and active outdoor capability at any age.",
        tag: "Functional Mobility",
      },
      {
        key: "C",
        label: "Calm the sympathetic system with HeartMath®",
        detail:
          "Measurable heart-rate variability (HRV) improvement, deep sleep, and emotional grounding.",
        tag: "Autonomic Coherence",
      },
      {
        key: "D",
        label: "The Full Triad: Fuel + Movement + Attention",
        detail:
          "A structured protocol combining anti-inflammatory nutrition, neuro-motor drills, and focus.",
        tag: "Metabolic Neuroplasticity™",
      },
    ],
  },
];

interface ReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReadinessAssessmentModal({
  isOpen,
  onClose,
}: ReadinessModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lead Dossier Handoff Form States
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateNote, setCandidateNote] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setIsAnalyzing(false);
      setCopied(false);
      setShowLeadForm(false);
      setCandidateName("");
      setCandidateEmail("");
      setCandidateNote("");
      setIsSubmittingLead(false);
      setLeadSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation (1-4 and Esc)
  useEffect(() => {
    if (!isOpen || isAnalyzing || showLeadForm) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (currentStep < QUESTIONS.length) {
        const q = QUESTIONS[currentStep];
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= q.options.length) {
          handleSelectOption(q.options[num - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, isAnalyzing, showLeadForm]);

  const handleSelectOption = (option: QuestionOption) => {
    const q = QUESTIONS[currentStep];
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Trigger Stripe / Canva-style calculated diagnostic loading skeleton
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(QUESTIONS.length);
      }, 1100);
    }
  };

  const handleBack = () => {
    if (showLeadForm) {
      setShowLeadForm(false);
      return;
    }
    if (currentStep > 0 && !isAnalyzing) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Diagnostic profile derivation
  const domainTag = answers.domain?.tag || "Integrated";
  const priorityTag = answers.priority?.tag || "Action Stage";
  const gapTag = answers.gap?.tag || "Integration Gap";
  const outcomeTag = answers.outcome?.tag || "Lifelong Capability";

  // Sophisticated 4-Dimension Dynamic Scoring Algorithm
  const getRecommendedProgram = () => {
    const domainKey = answers.domain?.key; // A: Body, B: Business, C: Life, D: Tri-Domain
    const priorityKey = answers.priority?.key; // A: Critical, B: Persistent, C: Proactive
    const gapKey = answers.gap?.key; // A: Fragmented, B: Self-care guilt, C: Physical setback, D: Autonomic high pressure
    const outcomeKey = answers.outcome?.key; // A: Executive, B: Mobility, C: HeartMath, D: Full Triad

    let scoreQuickStart = 0;
    let scoreQualityGoals = 0;
    let scoreResistance = 0;

    // 1. Domain
    if (domainKey === "A") scoreQuickStart += 3;
    if (domainKey === "B") scoreQualityGoals += 3;
    if (domainKey === "C") scoreQualityGoals += 2;
    if (domainKey === "D") scoreResistance += 3;

    // 2. Timeline & Priority
    if (priorityKey === "A") {
      scoreQuickStart += 2;
      scoreQualityGoals += 2;
    }
    if (priorityKey === "B") {
      scoreQualityGoals += 2;
      scoreResistance += 1;
    }
    if (priorityKey === "C") {
      scoreResistance += 2;
    }

    // 3. Gap
    if (gapKey === "C") scoreQuickStart += 3; // Physical setback / joint / Parkinson's
    if (gapKey === "D") {
      scoreQualityGoals += 2;
      scoreResistance += 2;
    }
    if (gapKey === "A") scoreQualityGoals += 2;
    if (gapKey === "B") scoreResistance += 2;

    // 4. Outcome
    if (outcomeKey === "B") scoreQuickStart += 3; // Mobility & balance
    if (outcomeKey === "A") scoreQualityGoals += 3; // Executive run what I built
    if (outcomeKey === "C") scoreQualityGoals += 2; // Autonomic coherence
    if (outcomeKey === "D") scoreResistance += 3; // Full Triad

    if (scoreQuickStart >= scoreQualityGoals && scoreQuickStart >= scoreResistance) {
      return {
        name: "90-Day Quick Start Protocol",
        investment: "$1,275",
        cadence: "90-Day Intensive Baseline Stabilization",
        desc: "High-intensity neuromuscular baseline stabilization pairing PWR!Moves/Strength4Balance drills with anti-inflammatory metabolic fuel.",
      };
    } else if (scoreResistance > scoreQualityGoals) {
      return {
        name: "12-Month Beating Resistance Retainer",
        investment: "$4,800",
        cadence: "Annual Advisory Partnership",
        desc: "Full-spectrum Metabolic Neuroplasticity™ protocol integrating physical, emotional, and operational balance with permanent relapse prevention.",
      };
    } else {
      return {
        name: "6-Month Quality Goals Advisory",
        investment: "$2,400",
        cadence: "6-Month Strategic Advisory Horizon",
        desc: "Comprehensive executive partnership addressing decision stamina, HeartMath® HRV vagal regulation, and leadership continuity without burnout.",
      };
    }
  };

  const recommendedProgram = getRecommendedProgram();

  const handleCopySummary = () => {
    const summary = `Liberty Science Coaching — Candidate Readiness Dossier
Candidate: ${candidateName || "Prospective Client"} (${candidateEmail || "Pending"})
Clinical Stage: ${priorityTag} · ${domainTag}
Identified Gap: ${gapTag} (${answers.gap?.label || "N/A"})
Target Outcome: ${outcomeTag} (${answers.outcome?.label || "N/A"})
Recommended Retainer: ${recommendedProgram.name} (${recommendedProgram.investment})
30-Min Intake Status: Complimentary Readiness Consultation with Vera Shury, C.H.C.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDossierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail) return;

    setIsSubmittingLead(true);

    try {
      // 1. Dispatch clinical dossier to Next.js API route
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: candidateName,
          email: candidateEmail,
          note: candidateNote,
          answers,
          recommendedProgram,
        }),
      });
    } catch (err) {
      console.error("Dossier dispatch error:", err);
    }

    // 2. Automatically copy complete candidate dossier to clipboard
    handleCopySummary();

    // 3. Open Google Calendar in new tab
    if (typeof window !== "undefined") {
      window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
    }

    setIsSubmittingLead(false);
    setLeadSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Compact Solid Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 360 }}
            className="relative w-full max-w-[540px] max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xl z-10 flex flex-col justify-between"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {isAnalyzing ? (
              // ==========================================
              // STRIPE / CANVA STYLE SKELETON LOADING STATE
              // ==========================================
              <div className="py-4 sm:py-6">
                <div className="flex items-center gap-2 mb-4">
                  <Loader2 className="h-4 w-4 text-slate-900 animate-spin" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                    Synthesizing Clinical Profile...
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Skeleton Card 1 */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 animate-pulse">
                    <div className="h-4 w-2/5 rounded bg-slate-200 mb-2.5" />
                    <div className="h-3 w-4/5 rounded bg-slate-200/70 mb-1.5" />
                    <div className="h-3 w-3/5 rounded bg-slate-200/60" />
                  </div>

                  {/* Skeleton Card 2 */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 animate-pulse">
                    <div className="h-4 w-1/3 rounded bg-slate-200 mb-2.5" />
                    <div className="h-3 w-full rounded bg-slate-200/70 mb-1.5" />
                    <div className="h-3 w-2/3 rounded bg-slate-200/60" />
                  </div>

                  {/* Skeleton Card 3 */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 animate-pulse">
                    <div className="h-4 w-1/2 rounded bg-slate-200 mb-2.5" />
                    <div className="h-3 w-3/4 rounded bg-slate-200/70" />
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Calculating autonomic, neuromuscular &amp; executive indicators...
                </p>
              </div>
            ) : currentStep < QUESTIONS.length ? (
              // ==========================================
              // STEP QUESTIONS FLOW (SOLID STRIPE CARDS)
              // ==========================================
              <div>
                {/* Step Metadata & Progress Track */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-mono">
                    STEP 0{currentStep + 1} OF 0{QUESTIONS.length}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-amber-900 uppercase">
                    On-Site in Tucson · Or Virtual Worldwide
                  </span>
                </div>

                {/* Compact Progress Bar */}
                <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-slate-900"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.25 }}
                  />
                </div>

                {/* Question Heading */}
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                  {QUESTIONS[currentStep].question}
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {QUESTIONS[currentStep].context}
                </p>

                {/* Solid Stripe-style Options Grid */}
                <div className="mt-4 space-y-2.5">
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className="group w-full rounded-xl border border-slate-200 bg-white p-3 sm:p-3.5 text-left transition-all duration-150 hover:border-slate-900 hover:shadow-xs flex items-start gap-3 cursor-pointer"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 font-mono text-[10px] font-bold text-slate-500 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug">
                          {opt.label}
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-snug line-clamp-2">
                          {opt.detail}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Compact Footer Controls */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-xs"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <span className="text-[11px]">
                      Select an option to proceed
                    </span>
                  )}
                  <span className="text-[11px]">
                    45-Sec Screen
                  </span>
                </div>
              </div>
            ) : leadSubmitted ? (
              // ==========================================
              // STEP 3: CONFIRMATION & HANDOFF COMPLETE
              // ==========================================
              <div className="text-center py-2 sm:py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
                  Dossier Forwarded Successfully
                </span>

                <h3 className="text-xl font-bold tracking-tight text-slate-950">
                  You’re Ready for Vera Shury
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Your diagnostic markers have been registered and dispatched to Vera. She will review your profile prior to your 30-minute intake session.
                </p>

                {/* Dossier Summary Box */}
                <div className="my-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-left text-xs space-y-1.5">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                    <span className="text-slate-400">Candidate:</span>
                    <span className="font-semibold text-slate-900">{candidateName} ({candidateEmail})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                    <span className="text-slate-400">Recommended Program:</span>
                    <span className="font-semibold text-slate-900">{recommendedProgram.name} ({recommendedProgram.investment})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                    <span className="text-slate-400">Consultation Format:</span>
                    <span className="font-semibold text-slate-900">On-Site in Tucson or Virtual Worldwide</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">20-Min Intake Fee:</span>
                    <span className="font-bold text-emerald-700">Complimentary ($250 Value)</span>
                  </div>
                </div>

                {/* Free Instant Reward: 6-Day Habit Building Plan Download */}
                <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-50/70 p-3 text-left flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold text-amber-950 uppercase tracking-wider font-mono">
                      Bonus Clinical Tool
                    </div>
                    <div className="text-xs font-semibold text-slate-900">
                      Vera&apos;s 6-Day Habit Building Plan
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Day 0 Readiness Check + Daily Loop (Fuel, Move, Attention)
                    </div>
                  </div>
                  <a
                    href="/documents/Liberty_Science_6Day_Habit_Plan.pdf"
                    download="Liberty_Science_6Day_Habit_Plan.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="space-y-2 pt-1">
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-full bg-slate-900 font-semibold text-xs text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book 20-Min Call on Vera&apos;s Calendar ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-9 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-colors cursor-pointer"
                  >
                    Return to Website
                  </button>
                </div>
              </div>
            ) : showLeadForm ? (
              // ==========================================
              // STEP 2: 2-FIELD LEAD DOSSIER HANDOFF FORM
              // ==========================================
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Clinical Dossier Handoff
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Complimentary Intake Call
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950">
                  Forward Your Markers to Vera Shury
                </h3>

                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Vera personally reviews your responses before your 30-minute session so she enters your conversation informed of your exact challenges.
                </p>

                {/* Form Fields */}
                <form onSubmit={handleDossierSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full h-11 sm:h-9 rounded-xl sm:rounded-lg border border-slate-200 px-3.5 text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Executive / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. eleanor@vanceholdings.com"
                      className="w-full h-11 sm:h-9 rounded-xl sm:rounded-lg border border-slate-200 px-3.5 text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Chief Movement or Stamina Priority (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={candidateNote}
                      onChange={(e) => setCandidateNote(e.target.value)}
                      placeholder="e.g. Preserving skiing balance, post-surgical stiffness, or executive burnout..."
                      className="w-full rounded-xl sm:rounded-lg border border-slate-200 p-3 text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:border-slate-900 resize-none shadow-2xs transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full h-11 rounded-full bg-slate-900 font-semibold text-xs text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Dispatching Dossier...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Dossier &amp; Open Calendar ↗</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-slate-500 hover:text-slate-900 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        <span>Back to Assessment</span>
                      </button>

                      <a
                        href={CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-slate-400 hover:text-slate-700 underline"
                      >
                        Skip directly to Calendar →
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              // ==========================================
              // STEP 1: FINAL DIAGNOSTIC RESULTS READOUT
              // ==========================================
              <div className="text-slate-900">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Clinical Evaluation Complete
                </span>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                  Your Functional Readiness Profile
                </h3>

                {/* Compact Profile Card */}
                <div className="mt-3.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                        CLINICAL STAGE
                      </span>
                      <div className="font-bold text-slate-900">
                        {priorityTag} · {domainTag}
                      </div>
                    </div>
                    <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5">
                      Ready for Advisory
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold block">
                        PRIMARY GAP
                      </span>
                      <span className="font-semibold text-slate-800 text-[11px]">
                        {gapTag}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold block">
                        DESIRED OUTCOME
                      </span>
                      <span className="font-semibold text-slate-800 text-[11px]">
                        {outcomeTag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommended Retainer Card With Crystal-Clear Pricing & Value */}
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      RECOMMENDED CLINICAL ADVISORY
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {recommendedProgram.investment}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {recommendedProgram.name}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {recommendedProgram.desc}
                  </p>

                  {/* Pricing Clarity: Intake vs Retainer */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>30-Min Intake: Complimentary ($250 Value)</span>
                    </div>
                    <span className="text-slate-400">
                      Retainer applies only if admitted
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(true)}
                    className="w-full h-11 rounded-full bg-slate-900 font-semibold text-xs text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Forward Dossier &amp; Book Free 30-Min Call</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="flex-1 h-9 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Copied Summary</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-400" />
                          <span>Copy Profile</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(0);
                        setAnswers({});
                        setShowLeadForm(false);
                      }}
                      className="h-9 px-4 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-colors cursor-pointer"
                    >
                      Retake
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
