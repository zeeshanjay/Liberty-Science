"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, FileText, X, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CertificateData {
  id: string;
  issuer: string;
  title: string;
  subtitle: string;
  holder: string;
  accentGradient: string;
  logoSrc: string;
  href?: string;
  pdfUrl?: string;
  previewImg?: string;
  badge?: string;
}

export const CERTIFICATES: CertificateData[] = [
  {
    id: "hms-stemcell",
    issuer: "Harvard Medical School",
    title: "Stem Cell Medicine: Parkinson's",
    subtitle: "2.00 AMA PRA Cat 1 Credits™ · Joint ACCME/ACPE/ANCC Accredited",
    holder: "Vera Shury",
    accentGradient: "from-[#A51C30] via-rose-700 to-amber-700",
    logoSrc: "/logos/harvard-medical-school.svg",
    pdfUrl: "/documents/certificates/Harvard_Medical_School_Stem_Cell_Medicine_Parkinsons_Vera_Shury.pdf",
    previewImg: "/documents/certificates/hms_stem_cell_parkinsons_thumb.jpg",
    badge: "Harvard Medical School",
  },
  {
    id: "harvard-cognitive",
    issuer: "Harvard Health Publishing · HMS",
    title: "Cognitive Fitness",
    subtitle: "Neuroplasticity, Brain Resilience & Executive Mental Stamina",
    holder: "Vera Shury",
    accentGradient: "from-[#A51C30] via-indigo-700 to-purple-800",
    logoSrc: "/logos/harvard-health.svg",
    pdfUrl: "/documents/certificates/Harvard_Health_Cognitive_Fitness_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_cognitive_fitness_thumb.jpg",
    badge: "Harvard Health · Nov 2026",
  },
  {
    id: "harvard-food",
    issuer: "Harvard Health Publishing · HMS",
    title: "Food Is Medicine",
    subtitle: "Metabolic Nutrition, Disease Reversal & Cellular Signaling",
    holder: "Vera Shury",
    accentGradient: "from-[#A51C30] via-emerald-700 to-teal-800",
    logoSrc: "/logos/harvard-health.svg",
    pdfUrl: "/documents/certificates/Harvard_Health_Food_Is_Medicine_Vera_Shury.pdf",
    previewImg: "/documents/certificates/harvard_health_food_is_medicine_thumb.jpg",
    badge: "Harvard Health · Nov 2026",
  },
  {
    id: "harvardx",
    issuer: "HarvardX (Harvard University)",
    title: "Technology Entrepreneurship",
    subtitle: "Lab to Market · Prof. Karim Lakhani · edX ID: 954e0f86",
    holder: "Vera Shury",
    accentGradient: "from-[#A51C30] via-rose-700 to-amber-700",
    logoSrc: "/logos/harvardx.svg",
    href: "https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07",
    badge: "Harvard Business School",
  },
  {
    id: "ace",
    issuer: "American Council on Exercise",
    title: "ACE Certified Life & Health Coach",
    subtitle: "Behavioral Architecture & Longevity · Taxonomy: 71400000X",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-red-600 via-rose-600 to-amber-600",
    logoSrc: "/logos/ace.png",
    badge: "Board Certified Coach",
  },
  {
    id: "pwr",
    issuer: "Parkinson Wellness Recovery",
    title: "PWR!Moves® Certified Instructor",
    subtitle: "Neuroplastic Amplitude & High-Intensity Motor Training",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-blue-600 via-indigo-600 to-sky-500",
    logoSrc: "/logos/pwr.png",
    badge: "Clinical Parkinson's",
  },
  {
    id: "heartmath",
    issuer: "HeartMath Institute",
    title: "HeartMath® Certified Practitioner",
    subtitle: "HRV Biofeedback & 0.10 Hz Autonomic Coherence",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-purple-600 via-pink-600 to-rose-500",
    logoSrc: "/logos/heartmath.png",
    badge: "Clinical HRV",
  },
  {
    id: "silversneakers",
    issuer: "Tivity Health & Healthways",
    title: "SilverSneakers® & Silver&Fit®",
    subtitle: "Functional Neuromuscular Conditioning & Fall Prevention",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-sky-600 via-cyan-600 to-teal-600",
    logoSrc: "/logos/silversneakers.png",
    badge: "Senior Mobility",
  },
];

export function CredentialCertificates() {
  const [activeModalCert, setActiveModalCert] = useState<CertificateData | null>(null);

  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CERTIFICATES.map((cert, idx) => {
          const CardContent = (
            <div className="relative flex h-full flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 transition-all">
              {/* Top Institutional Accent Line */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r",
                  cert.accentGradient
                )}
              />

              {/* Header: Official Trademark Logo + Issuing Institution */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="relative h-12 w-28 shrink-0">
                    <Image
                      src={cert.logoSrc}
                      alt={cert.title}
                      fill
                      sizes="112px"
                      className="object-contain object-left filter-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {cert.badge && (
                    <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-600 border border-slate-200/80">
                      {cert.badge}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
                  <span>{cert.issuer}</span>
                  {cert.pdfUrl && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A51C30] hover:underline">
                      <FileText className="h-3 w-3" />
                      PDF
                    </span>
                  )}
                </div>
              </div>

              {/* Body: Official Credential Title & Subtitle */}
              <div className="my-4 border-y border-slate-100 py-3">
                <div className="font-serif text-[17px] font-semibold leading-snug text-slate-900 group-hover:text-[#ea580c] transition-colors">
                  {cert.title}
                </div>
                <div className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  {cert.subtitle}
                </div>
              </div>

              {/* Footer: Clean Signature, Holder & Action */}
              <div className="flex items-baseline justify-between gap-2 pt-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-medium">
                  Credentialed
                </span>
                <span className="font-script text-[15px] font-bold text-[#e85d26]">
                  {cert.holder}
                </span>
              </div>
            </div>
          );

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + idx * 0.05,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.12)] transition-all duration-300"
            >
              {cert.pdfUrl ? (
                <button
                  type="button"
                  onClick={() => setActiveModalCert(cert)}
                  className="block w-full text-left h-full cursor-pointer"
                  title={`View official ${cert.title} certificate`}
                >
                  {CardContent}
                </button>
              ) : cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full cursor-pointer"
                  title={`Verify ${cert.title}`}
                >
                  {CardContent}
                </a>
              ) : (
                CardContent
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Official Certificate Verification Modal */}
      <AnimatePresence>
        {activeModalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#A51C30] border border-red-100">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {activeModalCert.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {activeModalCert.issuer} · Recipient: {activeModalCert.holder}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalCert(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Close viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative max-h-[65vh] overflow-y-auto bg-slate-900/5 p-4 sm:p-6 flex items-center justify-center">
                {activeModalCert.previewImg ? (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                    <Image
                      src={activeModalCert.previewImg}
                      alt={activeModalCert.title}
                      width={1200}
                      height={900}
                      className="h-auto max-h-[58vh] w-auto object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Official certificate document available for direct verification.
                  </div>
                )}
              </div>

              {/* Modal Footer with Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-6 py-4">
                <span className="text-xs text-slate-500 font-mono">
                  Official Harvard-issued medical education document
                </span>

                <div className="flex items-center gap-2">
                  {activeModalCert.pdfUrl && (
                    <>
                      <a
                        href={activeModalCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Open Full PDF</span>
                      </a>
                      <a
                        href={activeModalCert.pdfUrl}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#A51C30] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#821424] transition-colors shadow-sm"
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
      </AnimatePresence>
    </>
  );
}
