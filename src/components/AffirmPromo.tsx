"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles, X } from "lucide-react";

interface AffirmPromoProps {
  amountCents: number;
  className?: string;
  compact?: boolean;
}

export function AffirmPromo({
  amountCents,
  className = "",
  compact = false,
}: AffirmPromoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const monthlyEst = Math.round(amountCents / 1200);

  useEffect(() => {
    // When mounted, if Affirm SDK is ready, refresh promotional elements
    if (typeof window !== "undefined" && (window as any).affirm?.ui?.ready) {
      (window as any).affirm.ui.ready(() => {
        try {
          (window as any).affirm.ui.refresh();
        } catch {
          // Silent fallback if Affirm script not initialized
        }
      });
    }
  }, [amountCents]);

  const handleTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger Affirm's native educational modal if Affirm SDK loaded
    if (typeof window !== "undefined" && (window as any).affirm?.show) {
      try {
        (window as any).affirm.show({
          page_type: "product",
          amount: amountCents,
        });
        return;
      } catch {
        // Fallback to internal modal
      }
    }

    setIsModalOpen(true);
  };

  if (compact) {
    return (
      <>
        <button
          type="button"
          onClick={handleTrigger}
          className={`group/affirm inline-flex items-center gap-1.5 rounded-md border border-sky-200/90 bg-sky-50/70 px-2.5 py-1 text-[11px] font-medium text-sky-950 transition-all hover:bg-sky-100 hover:border-sky-300 ${className}`}
        >
          <span className="font-extrabold text-[#004f98] tracking-tight">affirm</span>
          <span className="text-sky-300">|</span>
          <span>As low as <strong className="font-semibold text-slate-900">${monthlyEst}/mo</strong></span>
          <ArrowUpRight className="h-3 w-3 text-[#004f98] transition-transform group-hover/affirm:translate-x-0.5 group-hover/affirm:-translate-y-0.5" />
        </button>

        {isModalOpen && (
          <AffirmEducationalModal
            amountCents={amountCents}
            monthlyEst={monthlyEst}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        onClick={handleTrigger}
        className={`group/affirm cursor-pointer rounded-xl border border-sky-100 bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/50 p-3 transition-all hover:border-sky-300 hover:shadow-xs ${className}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#004f98] px-2 py-0.5 font-bold text-[11px] text-white tracking-wide">
              affirm
            </span>
            <span className="text-xs text-slate-700">
              Pay over time with monthly plans
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004f98] group-hover/affirm:underline">
            <span>Pre-qualify</span>
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between text-xs text-slate-600">
          <span
            className="affirm-as-low-as font-semibold text-slate-900"
            data-page-type="product"
            data-amount={amountCents}
            data-affirm-type="text"
          >
            Starting at ~${monthlyEst}/mo (3–12 months)
          </span>
          <span className="text-[10px] text-slate-600 font-mono">0–36% APR</span>
        </div>
      </div>

      {isModalOpen && (
        <AffirmEducationalModal
          amountCents={amountCents}
          monthlyEst={monthlyEst}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function AffirmEducationalModal({
  amountCents,
  monthlyEst,
  onClose,
}: {
  amountCents: number;
  monthlyEst: number;
  onClose: () => void;
}) {
  const totalDollars = (amountCents / 100).toLocaleString();
  const threeMo = Math.round(amountCents / 300);
  const sixMo = Math.round(amountCents / 600);
  const twelveMo = monthlyEst;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-[#004f98] px-2.5 py-1 font-bold text-xs text-white tracking-wide">
            affirm
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Installment Financing
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          Split ${totalDollars} into monthly payments.
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Make transparent monthly payments with no hidden fees, no compounding interest, and no penalties.
        </p>

        {/* Sample Payment Horizons */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                3-Month Plan
              </div>
              <div className="text-lg font-bold text-slate-900">
                ~${threeMo} <span className="text-xs font-normal text-slate-500">/mo</span>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              0% APR Available
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                6-Month Plan
              </div>
              <div className="text-lg font-bold text-slate-900">
                ~${sixMo} <span className="text-xs font-normal text-slate-500">/mo</span>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-600">Standard Horizon</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-sky-300 bg-sky-50/50 p-4">
            <div>
              <div className="text-xs font-semibold text-[#004f98] uppercase tracking-wider">
                12-Month Plan (Lowest Monthly)
              </div>
              <div className="text-lg font-bold text-slate-900">
                ~${twelveMo} <span className="text-xs font-normal text-slate-500">/mo</span>
              </div>
            </div>
            <span className="rounded-full bg-[#004f98] px-2.5 py-1 text-[11px] font-bold text-white">
              Most Flexible
            </span>
          </div>
        </div>

        {/* Value Props */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No effect on credit score to check</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#004f98] shrink-0" />
            <span>Transparent, simple interest</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <a
            href="https://calendar.app.google/8Gt1wf6dzY3ki8xy7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#004f98] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#003d75] transition-all"
          >
            <span>Confirm Advisory &amp; Pay with Affirm</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-2 text-center text-[11px] text-slate-600">
            Payment options through Affirm are subject to eligibility and provided by LendingClub Bank, Member FDIC.
          </p>
        </div>
      </div>
    </div>
  );
}
