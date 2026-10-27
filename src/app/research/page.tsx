"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Printer,
  Calendar,
  CheckCircle2,
  Share2,
  Check,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { ReadinessAssessmentModal } from "@/components/ReadinessAssessmentModal";
import { DownloadPlanModal } from "@/components/DownloadPlanModal";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

export default function ResearchMonographPage() {
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeDownloadDoc, setActiveDownloadDoc] = useState<{
    title: string;
    desc: string;
    url: string;
    fileName: string;
  }>({
    title: "Metabolic Switching Evidence Brief & Diet Protocol",
    desc: "4-page clinical review on cyclic metabolic switching, 12–14 hr fasting windows, and clinical evidence grades.",
    url: "/documents/Liberty_Science_Metabolic_Switching_Diet_Plan.pdf",
    fileName: "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf",
  });
  const [copied, setCopied] = useState(false);

  const openDownload = (title: string, desc: string, url: string, fileName: string) => {
    setActiveDownloadDoc({ title, desc, url, fileName });
    setDownloadModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 selection:bg-slate-900 selection:text-white">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Dignified Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 print:hidden font-sans">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">Clinical Research &amp; Monographs</span>
        </nav>

        {/* Monograph Top Editorial Header */}
        <header className="border-b border-slate-200 pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Clinical Monograph Series · Monograph 01
            </span>

            {/* Quick Actions (PDF Download, Print, Share) */}
            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={() =>
                  openDownload(
                    "Metabolic Switching Evidence Brief & Diet Plan",
                    "4-page publication PDF authored by Vera Shury, MS. What the cycle actually does, graded by human clinical evidence.",
                    "/documents/Liberty_Science_Metabolic_Switching_Diet_Plan.pdf",
                    "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf"
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-xs"
                title="Download publication-grade vector PDF"
              >
                <Download className="h-3.5 w-3.5 text-amber-700" />
                <span>Evidence Brief &amp; Diet Plan (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openDownload(
                    "6-Day Habit Building Plan: Metabolic Neuroplasticity™ Template",
                    "Patient worksheet: Day 0 ACE readiness check, 6-day daily loop (Fuel + Movement + Attention), and reflection framework.",
                    "/documents/Liberty_Science_6Day_Habit_Plan.pdf",
                    "Liberty_Science_6Day_Habit_Plan.pdf"
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Download 6-Day Habit Building Plan PDF"
              >
                <Download className="h-3.5 w-3.5 text-emerald-700" />
                <span>6-Day Habit Plan (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-900 transition-colors cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied Link</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-slate-950 leading-[1.16] max-w-4xl">
            The Metabolic Neuroplasticity™ Protocol
          </h1>

          <p className="mt-4 font-serif italic text-lg sm:text-2xl text-slate-600 leading-snug max-w-3xl">
            Why Lasting Neural Rewiring Begins with Cellular Fuel, Not Just Practice: A Clinical Monograph on Autonomic Coherence, Mitochondrial Signaling, and Durable Neuro-Motor Retention.
          </p>

          {/* Academic Byline Block */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-200/90 text-sm">
            <div>
              <div className="font-semibold text-slate-950">Vera Shury, C.H.C., L.B.H.C.</div>
              <div className="text-xs text-slate-600 mt-0.5">
                ACE Certified Health Coach (#W54776) · HeartMath® Certified Practitioner · PWR!Moves® Certified Instructor
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Liberty Science Coaching · Tucson, Arizona · Clinical Taxonomy Code 71400000X
              </div>
            </div>
            <div className="text-xs text-slate-500 shrink-0 font-medium sm:text-right">
              Clinical Practice Briefing
              <span className="block text-[11px] text-slate-400">Peer-Reviewed Scientific Foundation</span>
            </div>
          </div>
        </header>

        {/* Hero Editorial Scientific Illustration Banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm mb-12 bg-slate-950">
          <Image
            src="/research/metabolic-neuroplasticity-cover.jpg"
            alt="Metabolic Neuroplasticity™: The Biochemical Architecture of Neural Rewiring"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-5 sm:p-7">
            <div className="max-w-xl text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                Figure 1 · Synaptogenesis &amp; Mitochondrial Bioenergetics
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                Long-term potentiation requires cellular energy priming prior to neuro-motor firing. Without ATP substrate and membrane fluidity, synaptic consolidation aborts.
              </p>
            </div>
          </div>
        </div>

        {/* Paper Body Layout (Sidebar Nav + Main Monograph Article) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Monograph Content */}
          <article className="lg:col-span-8 space-y-10 font-sans leading-relaxed text-slate-700">
            {/* Downloadable Evidence Brief & Diet Protocol Feature Callout */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-900 border border-amber-500/20">
                    Clinical Evidence Brief
                  </span>
                  <span className="text-xs text-slate-500 font-mono">4-Page Publication PDF</span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug">
                  Metabolic Switching — The Clinical Benefits &amp; Diet Plan
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-xl">
                  Authored by Vera Shury, MS. What the cycle actually does, graded by human evidence: 12–14 hr metabolic switching, BHB ketones, and clinical safety contraindications.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openDownload(
                    "Metabolic Switching Evidence Brief & Diet Plan",
                    "4-page publication PDF authored by Vera Shury, MS. Graded by human clinical evidence: 12–14 hr metabolic switching, BHB ketones, and clinical safety contraindications.",
                    "/documents/Liberty_Science_Metabolic_Switching_Diet_Plan.pdf",
                    "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf"
                  )
                }
                className="w-full sm:w-auto shrink-0 px-4 py-3 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-amber-900/10 cursor-pointer active:scale-98"
              >
                <Download className="h-4 w-4 text-black" />
                <span>Unlock &amp; Download PDF</span>
              </button>
            </div>

            {/* Executive Abstract Box */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <BookOpen className="h-4 w-4 text-slate-700" />
                <span>Executive Clinical Abstract</span>
              </div>
              <p className="text-sm sm:text-[15px] font-medium text-slate-900 leading-relaxed">
                Conventional neuroplasticity regimens—ranging from standard physical therapy to mindfulness and cognitive training apps—routinely suffer from a 60–70% long-term relapse rate. Practitioners assume repetition alone creates permanent synaptic pathways.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 20+ years of clinical practice, <strong>Vera Shury, C.H.C.</strong>, demonstrated that this approach fails because it stimulates a brain locked in bioenergetic depletion and chronic sympathetic fight-or-flight. <strong>Metabolic Neuroplasticity™</strong> flips the paradigm: <em>cellular fuel and autonomic down-regulation must precede physical motor firing.</em> When precise metabolic substrate and HeartMath® coherence are established first, synaptic pruning accelerates and newly trained neural pathways lock into permanent retention.
              </p>
            </section>

            {/* Section 1: The Bioenergetic Bottleneck */}
            <section id="bioenergetics" className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                1. The Bioenergetic Bottleneck of Standard Neuro-Rehabilitation
              </h2>
              <p>
                The human brain accounts for roughly 2% of body weight yet consumes over 20% of resting metabolic energy. The process of synaptogenesis—sprouting dendritic spines, producing Brain-Derived Neurotrophic Factor (BDNF), and consolidating long-term potentiation (LTP)—is the most bioenergetically demanding function in mammalian biology.
              </p>
              <p>
                When a high-performing executive suffering from decision burnout, or an older adult with Parkinson’s or post-surgical motor hesitation, is asked to &ldquo;push through&rdquo; drills, their cells lack the ATP threshold required to sustain the new pathway. Instead of adaptation, the nervous system experiences micro-exhaustion, reverting to safe, rigid compensatory habits.
              </p>

              {/* Callout Quote */}
              <div className="my-6 border-l-2 border-slate-900 pl-5 italic font-serif text-lg text-slate-900">
                &ldquo;You cannot rewire a starved nervous system. Stimulating neurons without cellular fuel is like flooring the accelerator of an empty engine: lots of noise, zero durable forward propulsion.&rdquo;
                <span className="block mt-2 font-sans text-xs font-normal not-italic text-slate-500">
                  — Vera Shury, C.H.C., L.B.H.C.
                </span>
              </div>
            </section>

            {/* Section 2: The Tri-Domain Architecture */}
            <section id="pillars" className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                2. The Three Interdependent Pillars of Metabolic Neuroplasticity™
              </h2>
              <p>
                The protocol operates through a three-stage biochemical and functional loop. No single stage can function independently:
              </p>

              <div className="space-y-4">
                {/* Pillar 1 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Pillar I · Metabolic Substrate &amp; Cellular Priming
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Targeted Fuel Cycling &amp; Anti-Inflammatory Signaling
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prior to intense motor drills, cellular membranes must achieve peak fluidity. Vera’s protocol pairs clean glycemic stability, ketone availability, and targeted cellular hydration (following Dr. Dana Cohen’s fascial conductivity principles) with potent anti-inflammatory substrate (curcumin, phospholipid-bound krill EPA/DHA, and mitochondrial cofactors). This lowers glial inflammation and establishes the metabolic permissive window.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Pillar II · Autonomic Coherence via HeartMath®
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Vagal Nerve Calibration &amp; Amygdala De-escalation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under chronic stress or movement fear (such as post-fall trauma), the sympathetic branch floods the hippocampus with cortisol, arresting neurogenesis. Utilizing HeartMath® real-time heart-rate variability (HRV) biofeedback at 0.1 Hz coherence, the client de-escalates the fear reflex. In a coherent autonomic state, the motor cortex becomes hyper-plastic and receptive to new signals.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Pillar III · Neuro-Motor Conditioning (PWR!Moves®)
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    High-Amplitude Proprioception &amp; Reactive Drills
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Now that neurons are fueled and the autonomic tone is settled, high-amplitude motor drills are introduced: whole-body reactive agility, postural stabilization, and balance perturbation. Because the drills occur <em>during the primed biochemical window</em>, newly formed synaptic junctions solidify permanently into long-term muscle memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: The Two Core Biological Mechanisms */}
            <section id="mechanisms" className="space-y-6 pt-6 border-t border-slate-200">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                The Two Core Biological Mechanisms of Metabolic Neuroplasticity™
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The clinical durability of the Metabolic Neuroplasticity™ framework rests on two foundational, scientifically validated biological mechanisms operating in concert:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Mechanism 1: Epigenetics */}
                <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-lg bg-amber-500/10 text-[#ea580c] flex items-center justify-center font-bold text-xs font-mono">
                      01
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ea580c]">
                      Molecular Epigenetics
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Cellular Fuel Altering Gene Expression
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Nutritional timing and metabolic switching are not simply caloric interventions—they serve as direct epigenetic signals that alter gene transcription. During structured 12–14 hour fasting intervals, hepatic production of beta-hydroxybutyrate (BHB) initiates a molecular cascade. BHB functions as an endogenous histone deacetylase (HDAC) inhibitor, remodeling chromatin to trigger the transcription of Brain-Derived Neurotrophic Factor (BDNF), PGC-1α (mitochondrial biogenesis), and cellular autophagy cascades. Cellular fuel directly alters gene expression to construct the physical biological substrate for adult neurogenesis.
                  </p>
                </div>

                {/* Mechanism 2: Hebbian Neuroplasticity */}
                <div className="rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/30 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-lg bg-[#635bff]/10 text-[#635bff] flex items-center justify-center font-bold text-xs font-mono">
                      02
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#635bff]">
                      Synaptic Hebbian Loops
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    &ldquo;What Fires Together Wires Together&rdquo; in 6-Day Micro-Loops
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Donald Hebb&apos;s neurobiological law dictates that synaptic connectivity strengthens through synchronized co-activation. Conventional rehabilitation fails because drills are performed under acute sympathetic cortisol stress, which disrupts Long-Term Potentiation (LTP). By synchronizing high-amplitude PWR!Moves® motor recruitments with HeartMath® 0.10 Hz autonomic coherence during the post-fasting ketone window, neural firing circuits achieve permanent synaptic consolidation. Vera anchors this protocol into disciplined <strong>6-Day Micro-Loops</strong>, allowing new motor, behavioral, and cognitive pathways to solidify before relapse can occur.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Observational Clinical Evidence */}
            <section id="evidence" className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                3. Clinical Practice Outcomes &amp; Living Evidence
              </h2>
              <p>
                Vera Shury is not merely an academic theorist—she is living evidence of the protocol’s validity. Diagnosed with Chronic Lymphocytic Leukemia (CLL) over 15 years ago, she utilized targeted anti-inflammatory cellular nutrition and neuro-metabolic discipline to maintain clinical stability without destructive intervention. At over 80 years old, she continues active high-altitude alpine skiing at Taos Ski Valley and practices Shotokan martial disciplines.
              </p>
              <p>
                In clinical client practice across Tucson and virtual global retainers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    Parkinson’s &amp; Rigidity Recovery
                  </span>
                  <div className="font-semibold text-slate-700 text-xs mt-0.5">
                    Preserved Motor Agency
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    Reversal of bradykinesia episodes, elimination of hesitation freezing, and restoration of independent upright walking confidence.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    Founders &amp; Enterprise Operators
                  </span>
                  <div className="font-semibold text-slate-700 text-xs mt-0.5">
                    Executive Decision Clarity
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    Resolution of midday cognitive fog, improved sleep architecture, and sustainable leadership stamina without identity collapse.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Implementation Pathway */}
            <section id="implementation" className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                4. Translation into Clinical Retainer Practice
              </h2>
              <p>
                The Metabolic Neuroplasticity™ Protocol is delivered through structured 1-on-1 advisory retainers tailored to individual physiology:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>
                    <strong>90-Day Quickstart ($1,275):</strong> Intensive baseline stabilization, breath mechanics, and anti-inflammatory cellular fueling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>
                    <strong>6-Month Quality Goals ($2,400):</strong> Comprehensive partnership for executives balancing business succession with neuro-motor longevity.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>
                    <strong>12-Month Beating Resistance ($4,800):</strong> Full-spectrum annual retainer establishing permanent relapse prevention across Life, Business, and Health.
                  </span>
                </li>
              </ul>
            </section>

            {/* References & Scientific Citations */}
            <section id="references" className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-xs text-slate-600 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Primary Clinical References &amp; Scientific Foundations
              </span>
              <p>
                1. <strong>Li, William W., MD.</strong> <em>Eat to Beat Disease: The New Science of How Your Body Can Heal Itself.</em> Grand Central Publishing, 2019.
              </p>
              <p>
                2. <strong>Villoldo, Alberto, PhD.</strong> <em>Grow a New Brain: How Neurogenesis and Mitochondrial Repair Heal the Mind.</em> Hay House, 2019.
              </p>
              <p>
                3. <strong>McCraty, Rollin, PhD.</strong> <em>Science of the Heart: Exploring the Role of the Heart in Human Performance.</em> HeartMath Research Center, Volume 2.
              </p>
              <p>
                4. <strong>Farley, Becky G., PhD, PT.</strong> <em>PWR!Moves: Parkinson Wellness Recovery Neuro-Motor Exercise Protocols.</em> Tucson, AZ.
              </p>
              <p>
                5. <strong>Cohen, Dana, MD &amp; Bria, Gina.</strong> <em>Quench: Beat Fatigue, Drop Weight, and Heal Your Body Through the New Science of Optimum Hydration.</em> Hachette Books, 2018.
              </p>
            </section>
          </article>

          {/* Sticky Side Navigation & Direct Clinical Retainer Card */}
          <aside className="lg:col-span-4 space-y-6 print:hidden">
            {/* Quick Consultation Booking Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sticky top-24">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                Clinical Advisory Intake
              </span>

              <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 mt-2">
                Evaluate Candidate Readiness
              </h3>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Vera Shury works with a strictly limited cohort of private advisory retainers. Begin with our interactive 45-second screen or book directly.
              </p>

              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setAssessmentOpen(true)}
                  className="w-full h-11 rounded-full bg-slate-900 font-semibold text-xs text-white flex items-center justify-center gap-2 hover:bg-slate-850 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Interactive Readiness Screen</span>
                </button>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full border border-slate-200 bg-white font-semibold text-xs text-slate-800 flex items-center justify-center gap-2 hover:border-slate-900 hover:text-slate-950 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>Book 30-Min Consultation</span>
                </a>
              </div>

              {/* Document Quick Jump */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Clinical Monograph
                </span>
                <a href="#bioenergetics" className="block text-slate-600 hover:text-slate-950 transition-colors">
                  1. The Bioenergetic Bottleneck
                </a>
                <a href="#pillars" className="block text-slate-600 hover:text-slate-950 transition-colors">
                  2. Three Interdependent Pillars
                </a>
                <a href="#mechanisms" className="block text-slate-600 hover:text-slate-950 transition-colors">
                  2b. Epigenetics &amp; Hebbian Loops
                </a>
                <a href="#evidence" className="block text-slate-600 hover:text-slate-950 transition-colors">
                  3. Clinical Outcomes &amp; Living Evidence
                </a>
                <a href="#implementation" className="block text-slate-600 hover:text-slate-950 transition-colors">
                  4. Advisory Retainer Translation
                </a>
                <a href="#clinical-briefs" className="block font-semibold text-amber-700 hover:text-amber-900 transition-colors">
                  ↓ Downloadable Clinical Briefs
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* =========================================================
            DEDICATED SECTION: DOWNLOADABLE CLINICAL BRIEFS & WORKSHEETS
           ========================================================= */}
        <section id="clinical-briefs" className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Clinical Library &amp; Downloadable Briefs
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                Official Clinical Documents &amp; Working Protocols
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Healthcare Taxonomy 71400000X · Available for physicians, caregivers, executives, and active patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document 1: Evidence Brief & Diet Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    4-Page Clinical Evidence Brief
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">PDF • 176 KB</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-950 leading-snug">
                  Metabolic Switching — The Clinical Benefits &amp; Diet Plan
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  What the cycle actually does, graded by human evidence. Covers cyclic 12–14 hr metabolic switching, BHB ketone signaling, challenge half vs. recovery half, and vital clinical contraindications.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Authored by Vera Shury, MS · Peer-reviewed citations
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Complimentary Access</span>
                <button
                  type="button"
                  onClick={() =>
                    openDownload(
                      "Metabolic Switching Evidence Brief & Diet Plan",
                      "4-page publication PDF authored by Vera Shury, MS. What the cycle actually does, graded by human clinical evidence.",
                      "/documents/Liberty_Science_Metabolic_Switching_Diet_Plan.pdf",
                      "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf"
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-amber-400" />
                  <span>Get PDF Copy</span>
                </button>
              </div>
            </div>

            {/* Document 2: 6-Day Habit Building Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    2-Page Patient Worksheet
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">PDF • 257 KB</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-950 leading-snug">
                  6-Day Habit Building Plan: Metabolic Neuroplasticity™ Template
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fillable patient worksheet adaptable for ANY purpose (mobility, executive focus, self-care, or vitality). Features Day 0 ACE readiness check, 6-day daily loop cards, and reflection log.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Authored by Vera Shury, MS · On-Site or Virtual Worldwide
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Complimentary Access</span>
                <button
                  type="button"
                  onClick={() =>
                    openDownload(
                      "6-Day Habit Building Plan: Metabolic Neuroplasticity™ Template",
                      "Fillable patient worksheet adaptable for ANY purpose. Features Day 0 ACE readiness check, 6-day daily loop cards, and reflection log.",
                      "/documents/Liberty_Science_6Day_Habit_Plan.pdf",
                      "Liberty_Science_6Day_Habit_Plan.pdf"
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Get PDF Copy</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StackedCircularFooter />

      {/* Interactive Assessment Modal */}
      <ReadinessAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />

      {/* Verified Email-Gated PDF Download Modal */}
      <DownloadPlanModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        documentTitle={activeDownloadDoc.title}
        documentDescription={activeDownloadDoc.desc}
        pdfUrl={activeDownloadDoc.url}
        fileName={activeDownloadDoc.fileName}
      />
    </div>
  );
}