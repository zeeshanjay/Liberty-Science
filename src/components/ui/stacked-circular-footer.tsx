"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

function StackedCircularFooter() {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch (err) {
        console.error("Newsletter subscription error:", err);
      }
    }
  };

  return (
    <footer className="relative z-10 border-t border-stone-200/80 bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* Circular Brand Mark Pill */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-stone-200/80 bg-white p-3 shadow-xs transition-transform duration-300 hover:scale-105">
            <div className="relative h-14 w-14 -translate-x-1">
              <Image
                src="/logo.png"
                alt="Liberty Science Coaching Logo"
                fill
                sizes="56px"
                className="object-contain scale-110"
              />
            </div>
          </div>

          {/* Brand Tagline */}
          <div className="mb-6 text-center">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Liberty Science{" "}
              <span className="italic text-[#e85d26]">Coaching</span>
            </h3>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Vera Shury, C.H.C. · Life · Business · Health Advisory
            </p>
          </div>

          {/* Quick Anchor Navigation */}
          <nav className="mb-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/#methodology" className="transition-colors hover:text-slate-900">
              Methodology
            </Link>
            <Link href="/research" className="transition-colors hover:text-[#ea580c] font-semibold">
              Research &amp; Monographs
            </Link>
            <Link href="/about" className="transition-colors hover:text-slate-900 font-semibold text-slate-900">
              About Vera
            </Link>
            <Link href="/#advisory" className="transition-colors hover:text-slate-900">
              Advisory &amp; Rates
            </Link>
            <Link href="/curated" className="transition-colors hover:text-slate-900">
              Curated Tools
            </Link>
            <Link href="/#faq" className="transition-colors hover:text-slate-900">
              FAQ
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-slate-900">
              Contact
            </Link>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#ea580c] font-semibold transition-colors hover:underline"
            >
              Consultation <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Circular Social Buttons — Curated Platforms */}
          <div className="mb-8 flex items-center justify-center space-x-3 sm:space-x-4">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full border-stone-300/80 bg-white text-stone-700 shadow-xs transition-all duration-200 hover:scale-110 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
            >
              <a
                href="https://www.facebook.com/libertyscience"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full border-stone-300/80 bg-white text-stone-700 shadow-xs transition-all duration-200 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
            >
              <a
                href="https://www.linkedin.com/in/vera-shury-a85956b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full border-stone-300/80 bg-white text-stone-700 shadow-xs transition-all duration-200 hover:scale-110 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white"
            >
              <a
                href="https://www.youtube.com/@LIBERTYSCIENCE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </a>
            </Button>
          </div>

          {/* Newsletter / Executive Briefings Form */}
          <div className="mb-8 w-full max-w-md">
            {subscribed ? (
              <div className="rounded-full bg-emerald-50 px-5 py-3 text-center text-xs font-semibold text-emerald-800 border border-emerald-200/80">
                ✓ Thank you. You are subscribed to executive research updates.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-grow">
                  <Label htmlFor="footer-email" className="sr-only">
                    Executive Email
                  </Label>
                  <Input
                    id="footer-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter executive email..."
                    type="email"
                    required
                    className="h-11 rounded-full border-stone-300 bg-white px-4 text-xs shadow-xs focus-visible:ring-[#0f6e68]"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0.5 }}
                  className="relative h-11 px-6 rounded-full text-xs font-semibold text-white bg-gradient-to-b from-[#144742] via-[#0f2e2b] to-[#092220] border border-emerald-500/25 shadow-[0_4px_16px_-4px_rgba(15,46,43,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.3)] hover:border-emerald-400/40 hover:shadow-[0_6px_20px_-4px_rgba(15,46,43,0.6)] cursor-pointer tracking-wide"
                >
                  <span className="relative z-10">Subscribe</span>
                </motion.button>
              </form>
            )}
          </div>

          {/* Contact Direct Line & Tucson Headquarters */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <a
              href="tel:520-275-8755"
              className="hover:text-primary transition-colors"
            >
              <span className="text-slate-400">Tel:</span> 520-275-8755
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="mailto:vera@libertyscience.com"
              className="hover:text-primary transition-colors"
            >
              <span className="text-slate-400">Email:</span> vera@libertyscience.com
            </a>
            <span className="text-stone-300">•</span>
            <span>
              <span className="text-slate-400">HQ:</span> 12995 N Oracle Rd #141-135, Tucson, AZ
            </span>
          </div>

          {/* Copyright & Discreet Credits */}
          <div className="border-t border-stone-200/80 pt-8 w-full max-w-3xl text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Liberty Science Coaching · Vera Shury, C.H.C. All rights reserved.
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              <a
                href="https://peakwavesstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors underline-offset-2 hover:underline"
              >
                Peak Waves Studio
              </a>{" "}
              ·{" "}
              <a
                href="https://astraventa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors underline-offset-2 hover:underline"
              >
                Astraventa
              </a>{" "}
              · Metabolic Neuroplasticity Architecture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter };
