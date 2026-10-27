"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

interface DownloadPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle?: string;
  documentDescription?: string;
  pdfUrl?: string;
  fileName?: string;
}

export function DownloadPlanModal({
  isOpen,
  onClose,
  documentTitle = "6-Day Habit Building Plan: Metabolic Neuroplasticity™ Template",
  documentDescription = "Fillable worksheet: Day 0 ACE readiness check, 6-day daily loop (Fuel + Movement + Attention), and reflection framework.",
  pdfUrl = "/documents/Liberty_Science_6Day_Habit_Plan.pdf",
  fileName = "Liberty_Science_6Day_Habit_Plan.pdf",
}: DownloadPlanModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Record subscriber & exact downloaded PDF in Supabase newsletter table
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          fullName: name.trim() || undefined,
          source: "pdf_download",
          downloadedResource: documentTitle || fileName,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not register email.");
      }

      setIsSuccess(true);

      // Trigger automatic clean download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("PDF download registration error:", err);
      // Even if network fails, let candidate download document directly
      setIsSuccess(true);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleReset}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSuccess ? (
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 mb-3">
                  <ShieldCheck className="h-3 w-3 text-amber-700" />
                  <span>Complimentary Clinical Download</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                  {documentTitle}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {documentDescription}
                </p>

                <div className="my-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-[11px] text-slate-500 leading-relaxed font-mono">
                  Enter your email to unlock instant PDF access and receive Vera&apos;s weekly clinical neuroplasticity briefings.
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Full Name <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full h-11 sm:h-10 rounded-xl border border-slate-200 px-3.5 text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@executivehealth.com"
                      className="w-full h-11 sm:h-10 rounded-xl border border-slate-200 px-3.5 text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Unlocking Document...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 text-amber-400" />
                        <span>Unlock &amp; Download PDF</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>No spam · 1-click unsubscribe</span>
                  <span>Tucson, AZ 85737</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Download Initiated
                </span>

                <h3 className="font-serif text-xl font-bold tracking-tight text-slate-950">
                  Your Document Is Ready
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your download has started. If it didn&apos;t trigger automatically, use the button below:
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href={pdfUrl}
                    download={fileName}
                    className="w-full h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 text-amber-400" />
                    <span>Click to Download Again</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full h-9 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-900 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
