"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
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
          <div className="flex items-center gap-2">
            <PremiumCtaButton
              href={CALENDAR_URL}
              variant="nav"
              size="sm"
            >
              Book Consultation
            </PremiumCtaButton>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphism Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto mt-2 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-xl px-4 py-2.5 text-[14px] font-medium tracking-tight text-zinc-700 transition-colors hover:bg-zinc-100/80 hover:text-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
