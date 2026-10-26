"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { PremiumCtaButton } from "@/components/ui/PremiumCtaButton";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/8Gt1wf6dzY3ki8xy7";

const NAV_LINKS = [
  { label: "Methodology", href: "/#methodology" },
  { label: "Research", href: "/research" },
  { label: "Advisory", href: "/#advisory" },
  { label: "About", href: "/about" },
  { label: "Curated Tools", href: "/curated" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileOpen(false);
    
    // External or dedicated full routes: let Next.js Link handle routing directly
    if (href.startsWith("/") && !href.includes("#")) {
      return;
    }

    // Anchor hash link on homepage (e.g. "/#methodology", "/#advisory", "/#contact")
    if (href.startsWith("/#")) {
      e.preventDefault();
      const anchorId = href.replace("/#", "#");
      if (pathname === "/") {
        if (lenis) {
          lenis.scrollTo(anchorId, { offset: -96, duration: 1.2 });
        } else {
          const target = document.querySelector(anchorId);
          target?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
      return;
    }

    // Generic route with hash (e.g. "/research#clinical-briefs")
    if (href.includes("#")) {
      return;
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-6xl px-4 pointer-events-none">
      {/* Floating Glassmorphism Pill Wrapper */}
      <div
        className={cn(
          "pointer-events-auto rounded-full border border-zinc-200/80 bg-white/90 px-4 sm:px-5 py-2 shadow-xs backdrop-blur-md transition-all duration-300 flex items-center justify-between",
          scrolled && "border-zinc-300/90 bg-white/95 shadow-md shadow-zinc-950/[0.04]"
        )}
      >
        {/* 1. Logo & Brand Mark (Top-Left) */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              if (lenis) lenis.scrollTo("#top", { offset: 0, duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-3 focus:outline-none shrink-0"
        >
          <div className="relative h-9 w-7 shrink-0">
            <Image
              src="/logo.png"
              alt="Liberty Science Torch"
              fill
              sizes="36px"
              className="object-contain scale-110 transition-transform duration-200 group-hover:scale-125"
              priority
            />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-zinc-900">
              LIBERTY SCIENCE
            </span>
            <span className="mt-0.5 font-mono text-[10px] tracking-wider text-zinc-500">
              Life · Business · Health Advisory
            </span>
          </div>
        </Link>

        {/* Right Section: Streamlined Navigation Links shifted right near Main Button */}
        <div className="flex items-center gap-4 lg:gap-7">
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex md:items-center md:gap-1 relative"
          >
            {NAV_LINKS.map((item) => {
              const isHovered = hoveredNav === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-zinc-600 transition-colors duration-200 hover:text-zinc-950"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Primary CTA Button (Top-Right) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <PremiumCtaButton
                href={CALENDAR_URL}
                variant="nav"
                size="sm"
              >
                Book Consultation
              </PremiumCtaButton>
            </div>
            <div className="sm:hidden">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-full bg-slate-900 px-3.5 text-xs font-semibold text-white shadow-xs active:scale-95 transition-all"
              >
                Consult
              </a>
            </div>

            {/* Mobile Menu Toggle Button (44px touch-target compliant) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:text-slate-950 transition-colors hover:bg-slate-100 active:bg-slate-200 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile iOS Glassmorphism Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto mt-2 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-100/80 hover:text-slate-950 active:bg-slate-100"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-300 text-sm">&rarr;</span>
                </a>
              ))}
            </div>

            {/* Mobile Actions Drawer Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-sm active:scale-98 transition-all"
              >
                Book 30-Min Consultation
              </a>
              <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-500 font-mono">
                <a href="tel:5202758755" className="hover:text-slate-900 font-sans font-medium text-slate-600">
                  Call: (520) 275-8755
                </a>
                <span>Tucson, AZ</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
