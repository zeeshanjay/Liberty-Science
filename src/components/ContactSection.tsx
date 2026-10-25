"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, CalendarDays, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";
const PHONE_NUMBER = "520-275-8755";
const PHONE_TEL = "tel:5202758755";
const PHONE_SMS = "sms:5202758755";

export function ContactSection() {
  const [selectedStall, setSelectedStall] = useState<string>("Life");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          domain: selectedStall,
        }),
      });
    } catch (err) {
      console.error("Contact submission error:", err);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================
              LEFT COLUMN: INSTANT SCHEDULING & DIRECT LINE
             ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                Instant Scheduling
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1.5 leading-[1.12]">
                Book a Readiness Conversation.
              </h2>

              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
                30-minute virtual consultation to assess your baseline and
                discuss the loop. Zero sales pressure—purely mutual alignment.
              </p>
            </div>

            {/* Direct Booking Card */}
            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-200/70 text-[#ea580c] shadow-2xs">
                  <CalendarDays className="h-5 w-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight text-slate-900">
                    Executive Calendar
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Google Calendar · 30-Minute Confidential Session
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#ea580c] hover:shadow-md"
                >
                  <span>Book on Google Calendar</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Direct Phone & SMS Card */}
            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Direct Line · Vera Shury, C.H.C.
              </div>

              <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {PHONE_NUMBER}
              </div>

              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Prefer to connect immediately? Call or text Vera directly.
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:text-slate-900 shadow-2xs"
                >
                  <Phone className="h-3.5 w-3.5 text-[#ea580c]" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>

                <a
                  href={PHONE_SMS}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:text-slate-900 shadow-2xs"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#ea580c]" />
                  <span>Send Text Message</span>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: DIRECT ADVISORY INQUIRY (4 FIELDS)
             ========================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  Direct Advisory Inquiry
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Confidential intake transmitted directly to Vera Shury&apos;s
                  personal advisory desk.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-slate-900">
                    Inquiry Received Confidentially
                  </h4>
                  <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you, {formData.fullName || "friend"}. Vera personally
                    reviews every submission and will reply within 24 business
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Field 1: Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. David Vance"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Field 2 & 3: Email Address & Phone Number (Row) */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. david@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                      >
                        Phone Number{" "}
                        <span className="font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="e.g. (520) 275-8755"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field 4: Primary Stall / Inquiry (Exact Wording from Brief) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 leading-snug">
                      Tell me where the stall is showing up — life, business, or
                      body?
                    </label>

                    {/* 3-Pill Selector */}
                    <div className="mt-2.5 grid grid-cols-3 gap-2">
                      {["Life", "Business", "Body"].map((pill) => {
                        const isSelected = selectedStall === pill;
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => setSelectedStall(pill)}
                            className={cn(
                              "flex items-center justify-center rounded-xl py-2 px-3 text-xs font-semibold transition-all duration-200 cursor-pointer border",
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                            )}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>

                    {/* Context Notes */}
                    <div className="mt-3">
                      <textarea
                        rows={3}
                        placeholder={`Briefly describe what's happening with your ${selectedStall.toLowerCase()} or current priority...`}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#ea580c] hover:shadow-md cursor-pointer"
                    >
                      <span>Send Confidential Inquiry</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <p className="mt-2.5 text-center text-[11px] text-slate-400">
                      100% confidential. No spam, automated marketing, or list
                      sharing.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
