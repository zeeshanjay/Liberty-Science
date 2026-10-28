"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateData {
  id: string;
  issuer: string;
  title: string;
  subtitle: string;
  holder: string;
  accentGradient: string;
  logoSrc: string;
  href?: string;
}

const CERTIFICATES: CertificateData[] = [
  {
    id: "harvardx",
    issuer: "HarvardX (Harvard University)",
    title: "Technology Entrepreneurship",
    subtitle: "Lab to Market · edX ID: 954e0f86",
    holder: "Vera Shury",
    accentGradient: "from-[#A51C30] via-rose-700 to-amber-700",
    logoSrc: "/logos/harvardx.svg",
    href: "https://courses.edx.org/certificates/954e0f86dfd74c74b05b4438674b7d07",
  },
  {
    id: "ace",
    issuer: "American Council on Exercise",
    title: "ACE Certified Life & Health Coach",
    subtitle: "Behavioral Architecture & Longevity",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-red-600 via-rose-600 to-amber-600",
    logoSrc: "/logos/ace.png",
  },
  {
    id: "heartmath",
    issuer: "HeartMath Institute",
    title: "HeartMath® Certified Practitioner",
    subtitle: "HRV Biofeedback & Autonomic Coherence",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-purple-600 via-pink-600 to-rose-500",
    logoSrc: "/logos/heartmath.png",
  },
  {
    id: "pwr",
    issuer: "Parkinson Wellness Recovery",
    title: "PWR!Moves® Certified Instructor",
    subtitle: "Neuroplastic Amplitude & Motor Control",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-blue-600 via-indigo-600 to-sky-500",
    logoSrc: "/logos/pwr.png",
  },
  {
    id: "silversneakers",
    issuer: "Tivity Health & Healthways",
    title: "SilverSneakers® & Silver&Fit®",
    subtitle: "Functional Neuromuscular Conditioning",
    holder: "Vera Shury, C.H.C.",
    accentGradient: "from-sky-600 via-cyan-600 to-teal-600",
    logoSrc: "/logos/silversneakers.png",
  },
  {
    id: "peakwaves",
    issuer: "Strategic Media Advisory",
    title: "Peak Waves Studio",
    subtitle: "Official Strategic Media Partner",
    holder: "Liberty Science Advisory",
    accentGradient: "from-cyan-600 via-teal-600 to-emerald-600",
    logoSrc: "/logos/peakwaves.png",
    href: "https://peakwavesstudio.com/",
  },
];

export function CredentialCertificates() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
                <div className="relative h-12 w-24 shrink-0">
                  <Image
                    src={cert.logoSrc}
                    alt={cert.title}
                    fill
                    sizes="96px"
                    className="object-contain object-left filter-none transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {cert.href && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                {cert.issuer}
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

            {/* Footer: Clean Signature & Holder Attribution */}
            <div className="flex items-baseline justify-between gap-2 pt-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-medium">
                Principal
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
              delay: 0.25 + idx * 0.06,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.12)] transition-all duration-300"
          >
            {cert.href ? (
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer"
                title={`Visit ${cert.title}`}
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
  );
}
