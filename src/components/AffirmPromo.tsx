"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ShieldCheck, Sparkles, X, CreditCard, Calendar, Check } from "lucide-react";

const STRIPE_PLAN_LINKS: Record<
  number,
  { 1: string; 3: string; 6?: string; 12?: string }
> = {
  29700: {
    1: "https://buy.stripe.com/7sYaEYa9o9FQfTb1Sc43S03",
    3: "https://buy.stripe.com/9B64gAa9oaJU0YhfJ243S0e",
  },
  127500: {
    1: "https://buy.stripe.com/7sY00k0yO6tEfTb0O843S00",
    3: "https://buy.stripe.com/cNieVechw5pA5ex9kE43S05",
    6: "https://buy.stripe.com/3cI3cwdlA9FQcGZ54o43S06",
    12: "https://buy.stripe.com/00w3cwepE05g6iB7cw43S07",
  },
  240000: {
    1: "https://buy.stripe.com/3cI28s3L04lw8qJgN643S01",
    3: "https://buy.stripe.com/cNi3cw0yO6tEfTbfJ243S08",
    6: "https://buy.stripe.com/3cI3cw81g8BM4ataoI43S09",
    12: "https://buy.stripe.com/8x228s3L0aJUfTb40k43S0a",
  },
  480000: {
    1: "https://buy.stripe.com/9B67sMchw05ggXf9kE43S02",
    3: "https://buy.stripe.com/eVq5kEbds6tE0YhbsM43S0b",
    6: "https://buy.stripe.com/14A14ogxMdW6dL3dAU43S0c",
    12: "https://buy.stripe.com/4gM5kE3L07xIayR40k43S0d",
  },
};

interface AffirmPromoProps {
  amountCents: number;
  programName?: string;
  stripeUrl?: string;
  className?: string;
  compact?: boolean;
  variant?: "bar" | "compact" | "textLink";
}

export function AffirmPromo({
  amountCents,
  programName = "Executive Advisory Retainer",
  stripeUrl,
  className = "",
  compact = false,
  variant,
}: AffirmPromoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const defaultMonths = amountCents >= 100000 ? 12 : 3;
  const monthlyEst = Math.round(amountCents / (defaultMonths * 100));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const modalNode =
    isModalOpen && mounted
      ? createPortal(
          <AffirmDirectCheckoutModal
            amountCents={amountCents}
            programName={programName}
            stripeUrl={stripeUrl}
            onClose={() => setIsModalOpen(false)}
          />,
          document.body
        )
      : null;

  if (variant === "textLink") {
    return (
      <>
        <button
          type="button"
          onClick={handleTrigger}
          className={`inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#635bff] transition-colors cursor-pointer ${className}`}
        >
          <span>Already consulted? Pay Monthly or Full (Affirm / Stripe)</span>
          <ArrowUpRight className="h-3 w-3" />
        </button>
        {modalNode}
      </>
    );
  }

  if (compact || variant === "compact") {
    return (
      <>
        <button
          type="button"
          onClick={handleTrigger}
          className={`group/affirm inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-all hover:border-[#004f98]/40 hover:bg-sky-50/60 hover:text-slate-900 cursor-pointer ${className}`}
        >
          <span className="font-extrabold text-[#004f98] tracking-tight">affirm</span>
          <span className="text-slate-300">·</span>
          <span>
            <strong className="font-semibold text-slate-900">${monthlyEst}/mo</strong>
          </span>
          <ArrowUpRight className="h-3 w-3 text-[#004f98] transition-transform group-hover/affirm:translate-x-0.5 group-hover/affirm:-translate-y-0.5" />
        </button>
        {modalNode}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleTrigger}
        className={`group/affirm flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 text-left transition-all hover:border-[#004f98]/40 hover:bg-sky-50/50 cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 rounded bg-[#004f98] px-1.5 py-0.5 font-bold text-[10px] text-white tracking-wide leading-none">
            affirm
          </span>
          <span className="truncate text-xs text-slate-600">
            From <strong className="font-semibold text-slate-900">${monthlyEst}/mo</strong> · 3, 6, or 12 mos
          </span>
        </div>

        <span className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#004f98] group-hover/affirm:underline">
          <span>Options</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover/affirm:translate-x-0.5 group-hover/affirm:-translate-y-0.5" />
        </span>
      </button>
      {modalNode}
    </>
  );
}

function AffirmDirectCheckoutModal({
  amountCents,
  programName,
  stripeUrl,
  onClose,
}: {
  amountCents: number;
  programName: string;
  stripeUrl?: string;
  onClose: () => void;
}) {
  const hasLongPlans = amountCents >= 100000;
  const [selectedMonths, setSelectedMonths] = useState<1 | 3 | 6 | 12>(
    hasLongPlans ? 12 : 3
  );
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("AZ");
  const [zip, setZip] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);

  const totalDollars = (amountCents / 100).toLocaleString();
  const threeMo = Math.round(amountCents / 300);
  const sixMo = Math.round(amountCents / 600);
  const twelveMo = Math.round(amountCents / 1200);

  const selectedMonthlyDollars =
    selectedMonths === 1
      ? totalDollars
      : Math.round(amountCents / (selectedMonths * 100)).toLocaleString();

  const planLinks = STRIPE_PLAN_LINKS[amountCents];
  const activeStripeUrl =
    (planLinks && planLinks[selectedMonths]) ||
    (planLinks && planLinks[1]) ||
    stripeUrl ||
    "https://buy.stripe.com/7sY00k0yO6tEfTb0O843S00";

  const handleStartAffirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !street.trim() || !city.trim() || !zip.trim()) {
      setErrorMsg("Please complete all billing details so Affirm can verify your installment plan.");
      return;
    }

    const affirmObj = typeof window !== "undefined" ? (window as any).affirm : null;
    if (!affirmObj || typeof affirmObj.checkout !== "function") {
      setErrorMsg("Affirm SDK is still initializing. Please wait 2 seconds or disable ad-blockers and try again.");
      return;
    }

    setIsLaunching(true);
    const origin = window.location.origin;
    const orderId = `LSC-${Date.now()}`;

    const checkoutPayload = {
      merchant: {
        user_confirmation_url: `${origin}/api/affirm/confirm`,
        user_cancel_url: `${window.location.href}`,
        user_confirmation_url_action: "POST",
        name: "Liberty Science LLC",
      },
      shipping: {
        name: { first: firstName.trim(), last: lastName.trim() },
        address: {
          line1: street.trim(),
          city: city.trim(),
          state: stateCode.trim().toUpperCase() || "AZ",
          zipcode: zip.trim(),
          country: "USA",
        },
        phone_number: phone.trim(),
        email: email.trim(),
      },
      billing: {
        name: { first: firstName.trim(), last: lastName.trim() },
        address: {
          line1: street.trim(),
          city: city.trim(),
          state: stateCode.trim().toUpperCase() || "AZ",
          zipcode: zip.trim(),
          country: "USA",
        },
        phone_number: phone.trim(),
        email: email.trim(),
      },
      items: [
        {
          display_name: programName,
          sku: programName.toUpperCase().replace(/[^A-Z0-9]/g, "-").slice(0, 24),
          unit_price: amountCents,
          qty: 1,
          item_image_url: `${origin}/logo.png`,
          item_url: `${origin}/about`,
        },
      ],
      metadata: {
        mode: "modal",
        program: programName,
      },
      order_id: orderId,
      currency: "USD",
      shipping_amount: 0,
      tax_amount: 0,
      total: amountCents,
    };

    try {
      affirmObj.checkout(checkoutPayload);
      affirmObj.checkout.open({
        onFail: () => {
          setIsLaunching(false);
          setErrorMsg("Affirm checkout could not be completed. Please verify your address and try again.");
        },
        onValidationError: () => {
          setIsLaunching(false);
          setErrorMsg("Please check that your US phone number and 5-digit ZIP code are valid.");
        },
      });
    } catch {
      setIsLaunching(false);
      setErrorMsg("Unable to open Affirm checkout window. Please check your connection.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 p-3 sm:p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded bg-[#004f98] px-2 py-0.5 font-bold text-[11px] text-white tracking-wide">
            affirm
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Select Your Payment Plan
          </span>
        </div>

        <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
          {programName} — ${totalDollars}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Click a payment horizon below to pay monthly via Affirm or Stripe.
        </p>

        {!showCheckoutForm ? (
          <>
            {/* Compact Interactive 2x2 Plan Selector Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {hasLongPlans && (
                <button
                  type="button"
                  onClick={() => setSelectedMonths(12)}
                  className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    selectedMonths === 12
                      ? "border-[#004f98] bg-sky-50/70 ring-1 ring-[#004f98]"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#004f98]">
                      12 Months
                    </span>
                    {selectedMonths === 12 && (
                      <Check className="h-3.5 w-3.5 text-[#004f98]" />
                    )}
                  </div>
                  <div className="mt-1 text-base font-bold text-slate-900">
                    ${twelveMo}
                    <span className="text-[11px] font-normal text-slate-500">/mo</span>
                  </div>
                  <span className="mt-0.5 text-[10px] font-semibold text-emerald-700">
                    Lowest Monthly
                  </span>
                </button>
              )}

              {hasLongPlans && (
                <button
                  type="button"
                  onClick={() => setSelectedMonths(6)}
                  className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    selectedMonths === 6
                      ? "border-[#004f98] bg-sky-50/70 ring-1 ring-[#004f98]"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      6 Months
                    </span>
                    {selectedMonths === 6 && (
                      <Check className="h-3.5 w-3.5 text-[#004f98]" />
                    )}
                  </div>
                  <div className="mt-1 text-base font-bold text-slate-900">
                    ${sixMo}
                    <span className="text-[11px] font-normal text-slate-500">/mo</span>
                  </div>
                  <span className="mt-0.5 text-[10px] text-slate-500">
                    6 Installments
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedMonths(3)}
                className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                  selectedMonths === 3
                    ? "border-[#004f98] bg-sky-50/70 ring-1 ring-[#004f98]"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    3 Months
                  </span>
                  {selectedMonths === 3 && (
                    <Check className="h-3.5 w-3.5 text-[#004f98]" />
                  )}
                </div>
                <div className="mt-1 text-base font-bold text-slate-900">
                  ${threeMo}
                  <span className="text-[11px] font-normal text-slate-500">/mo</span>
                </div>
                <span className="mt-0.5 text-[10px] font-semibold text-emerald-700">
                  0% APR Eligible
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMonths(1)}
                className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                  selectedMonths === 1
                    ? "border-[#004f98] bg-sky-50/70 ring-1 ring-[#004f98]"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    One-Time
                  </span>
                  {selectedMonths === 1 && (
                    <Check className="h-3.5 w-3.5 text-[#004f98]" />
                  )}
                </div>
                <div className="mt-1 text-base font-bold text-slate-900">
                  ${totalDollars}
                </div>
                <span className="mt-0.5 text-[10px] text-slate-500">
                  Pay in Full
                </span>
              </button>
            </div>

            {/* Value Props */}
            <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Soft credit check
              </span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#004f98]" />
                Zero hidden fees
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-3.5 space-y-2">
              <button
                type="button"
                onClick={() => setShowCheckoutForm(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#004f98] py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#003d75] transition-all cursor-pointer"
              >
                <span>
                  Pay with Affirm (
                  {selectedMonths === 1
                    ? `$${twelveMo}/mo`
                    : `$${selectedMonthlyDollars}/mo for ${selectedMonths} mos`}
                  )
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>

              <a
                href={activeStripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all"
              >
                <CreditCard className="h-3.5 w-3.5 text-[#635bff]" />
                <span>
                  {selectedMonths === 1
                    ? `Pay $${totalDollars} in Full via Stripe`
                    : `Pay $${selectedMonthlyDollars}/mo (${selectedMonths} mos) via Stripe`}
                </span>
                <ArrowUpRight className="h-3 w-3" />
              </a>

              <a
                href="https://calendar.app.google/8Gt1wf6dzY3ki8xy7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 pt-0.5 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Calendar className="h-3 w-3 text-[#ea580c]" />
                <span>Book Free 30-Min Discovery Call First ↗</span>
              </a>
            </div>
          </>
        ) : (
          <form onSubmit={handleStartAffirmCheckout} className="mt-3.5 space-y-2">
            <div className="rounded-xl bg-sky-50/80 border border-sky-200/80 p-2 text-[11px] text-sky-950">
              Enter your details to launch <strong>Affirm&apos;s official checkout</strong> for <strong>${totalDollars}</strong>.
            </div>

            {errorMsg && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-2 text-[11px] text-rose-700 font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  Mobile Phone (US) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="520-555-0199"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="123 E Broadway Blvd"
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tucson"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  State *
                </label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  placeholder="AZ"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs uppercase text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                  ZIP *
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="85701"
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 focus:border-[#004f98] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-1.5 flex flex-col gap-1">
              <button
                type="submit"
                disabled={isLaunching}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#004f98] py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#003d75] transition-all cursor-pointer disabled:opacity-60"
              >
                <span>{isLaunching ? "Opening Affirm..." : "Launch Live Affirm Checkout ↗"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCheckoutForm(false)}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-800 py-1 cursor-pointer"
              >
                ← Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
