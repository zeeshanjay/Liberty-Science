"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  BookOpen,
  Pill,
  Utensils,
  Dumbbell,
  ShieldAlert,
  Sparkles,
  Check,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Header } from "@/components/Header";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { CURATED_PRODUCT_LINES, CuratedProductLine, CuratedProduct } from "@/data/curatedProducts";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, any> = {
  books: BookOpen,
  supplements: Pill,
  nutrition: Utensils,
  fitness: Dumbbell,
  adjuncts: ShieldAlert,
  lifestyle: Sparkles,
};

export default function CuratedToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Total product count across all lines
  const totalCount = useMemo(
    () =>
      CURATED_PRODUCT_LINES.reduce(
        (sum, line) => sum + line.products.length,
        0
      ),
    []
  );

  // Filtered products list
  const filteredLines = useMemo(() => {
    return CURATED_PRODUCT_LINES.map((line) => {
      if (selectedCategory !== "all" && line.id !== selectedCategory) {
        return { ...line, products: [] };
      }
      if (!searchQuery.trim()) {
        return line;
      }
      const q = searchQuery.toLowerCase();
      const matchingProducts = line.products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.reason.toLowerCase().includes(q) ||
          line.title.toLowerCase().includes(q)
      );
      return { ...line, products: matchingProducts };
    }).filter((line) => line.products.length > 0);
  }, [selectedCategory, searchQuery]);

  const activeProductsCount = useMemo(
    () => filteredLines.reduce((sum, line) => sum + line.products.length, 0),
    [filteredLines]
  );

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#635bff] selection:text-white">
      {/* Global Header */}
      <Header />

      <main className="pt-24 sm:pt-28 pb-16">
        {/* =========================================================
            1. LUXURY EDITORIAL HERO SECTION (PANORAMIC SHOWCASE)
           ========================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-900 font-medium">Curated Tools &amp; Protocols</span>
          </div>

          {/* Grand Editorial Narrative Header */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Curated Longevity &amp;{" "}
              <span className="font-serif italic font-normal text-slate-700">
                Bio-Functional Index.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-3xl font-normal">
              Zero sponsorship hype. Every book, biofeedback instrument, cellular
              supplement, and neuromuscular tool in this catalog has been
              personally stress-tested by Vera in clinical practice and over 86
              years of living vitality.
            </p>
          </div>

          {/* Architectural Metric Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-slate-200/80 py-5">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                {totalCount}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Verified Clinical Tools
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ea580c] font-mono">
                6
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Product Lines
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f6e68] font-mono">
                86
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Years Empirical Proof
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#635bff] font-mono">
                100%
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Direct Experience
              </div>
            </div>
          </div>

          {/* Panoramic Editorial Showcase Frame */}
          <div className="mt-8 relative aspect-[21/9] sm:aspect-[24/10] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.1)] group">
            <Image
              src="/curated-hero.jpg"
              alt="Curated Longevity &amp; Bio-Functional Arsenal"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-102"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 flex items-end justify-between text-white">
              <div className="max-w-lg">
                <span className="font-serif italic text-lg sm:text-2xl text-white block">
                  Personally Applied Daily Regimens
                </span>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Metabolic Neuroplasticity™ tools selected solely for biological efficacy, cellular recovery, and lifelong autonomy.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                <span>Vera Shury, C.H.C.</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-300">Tucson, AZ</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. INTERACTIVE CATEGORY TABS & SEARCH BAR (STICKY)
           ========================================================= */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-slate-100 py-4 shadow-2xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-5">
              {/* Category Pills (Clean scroll with zero native scrollbar) */}
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1" style={{ WebkitOverflowScrolling: "touch" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none shrink-0",
                      selectedCategory === "all"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    )}
                  >
                    All Items ({totalCount})
                  </button>

                  {CURATED_PRODUCT_LINES.map((line) => {
                    const isSelected = selectedCategory === line.id;
                    const Icon = CATEGORY_ICONS[line.id];
                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => setSelectedCategory(line.id)}
                        className={cn(
                          "h-9 px-3.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none shrink-0",
                          isSelected
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                        )}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        <span>{line.title}</span>
                        <span className="text-[10px] opacity-75">
                          ({line.products.length})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant Search Bar — Perfectly Aligned on the Same Horizontal Axis */}
              <div className="relative w-full md:w-64 lg:w-72 shrink-0 flex items-center">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search 67 products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full rounded-full border border-slate-200 bg-slate-50/80 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. PRODUCT GRID & EXPERT NOTES (ARCHITECTURAL MATRIX)
           ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          {activeProductsCount === 0 ? (
            <div className="py-20 text-center">
              <p className="text-base font-semibold text-slate-900">
                No matching products found
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with different keywords or clear the category
                filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#ea580c] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-14">
              {filteredLines.map((line) => {
                const Icon = CATEGORY_ICONS[line.id];
                return (
                  <div key={line.id} className="scroll-mt-36">
                    {/* Luxury Editorial Category Banner (Option 1) */}
                    {line.bannerImage ? (
                      <div className="group relative mb-8 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/40 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                          {/* Editorial Left Narrative */}
                          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#ea580c] font-bold">
                                {Icon && <Icon className="h-3.5 w-3.5" />}
                                <span>{line.category}</span>
                              </div>
                              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                                {line.title}
                              </h2>
                              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
                                {line.desc}
                              </p>
                            </div>

                            {line.quote && (
                              <div className="mt-6 border-l-2 border-[#ea580c] pl-4 py-1.5 bg-orange-50/40 rounded-r-xl">
                                <p className="text-xs sm:text-sm font-serif italic text-slate-800 leading-relaxed">
                                  &ldquo;{line.quote}&rdquo;
                                </p>
                                <span className="block mt-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">
                                  — Vera Shury, C.H.C.
                                </span>
                              </div>
                            )}

                            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-slate-500 pt-4 border-t border-slate-100">
                              <span className="font-semibold text-slate-900">
                                {line.products.length} {line.products.length === 1 ? "Selection" : "Selections"}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span>Vetted Protocols</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[#635bff] font-semibold">100% Tested</span>
                            </div>
                          </div>

                          {/* Editorial Category Visual */}
                          <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] bg-slate-100 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100">
                            <Image
                              src={line.bannerImage}
                              alt={line.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Fallback Minimal Line Header */
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-100 pb-4 mb-7">
                        <div className="flex items-center gap-2.5">
                          {Icon && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#ea580c]">
                              <Icon className="h-4 w-4" />
                            </div>
                          )}
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                              {line.title}
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {line.desc}
                            </p>
                          </div>
                        </div>

                        <span className="font-mono text-xs font-medium text-slate-400">
                          {line.products.length} {line.products.length === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                    )}

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {line.products.map((product, pIdx) => (
                        <motion.div
                          key={product.name + pIdx}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.4, delay: (pIdx % 6) * 0.05 }}
                          whileHover={{ y: -4 }}
                          className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_20px_-6px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.09)]"
                        >
                          <div>
                            {/* Product Image Presentation (Official Studio Shot) */}
                            {product.image && (
                              <div className="relative mb-5 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50/60 p-4 border border-slate-100/80 group-hover:bg-slate-50 transition-colors">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}

                            {/* Product Title */}
                            <h3 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                              {product.name}
                            </h3>

                            {/* Vera's Experience Note */}
                            {product.reason ? (
                              <div className="mt-3.5 rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                                <p className="text-xs font-serif italic text-slate-700 leading-relaxed">
                                  &ldquo;{product.reason}&rdquo;
                                </p>
                                <span className="mt-1.5 block text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400">
                                  — Vera Shury, C.H.C.
                                </span>
                              </div>
                            ) : (
                              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                                Tested and recommended in daily practice.
                              </p>
                            )}
                          </div>

                          {/* Direct Amazon Affiliate Button */}
                          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-slate-400">
                              Amazon Affiliate
                            </span>

                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#ea580c] shadow-2xs hover:shadow-sm"
                            >
                              <span>View on Amazon</span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================================================
            4. AFFILIATE TRANSPARENCY NOTICE & QR CODE VERIFICATION
           ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Affiliate Transparency Disclosure
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Zero Sponsorship Influence.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Liberty Science Coaching participates in the Amazon Services LLC
                Associates Program. As an Amazon Associate, Vera earns from
                qualifying purchases at no additional cost to you. Every product
                listed here was independently purchased, stress-tested, and
                integrated into her personal daily vitality or client protocols.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
                <Image
                  src="/WhatsApp Image 2026-10-19 at 7.08.47 PM (1).jpeg"
                  alt="Tried by Vera Official Seal"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">
                  Verified by Vera
                </div>
                <div className="text-slate-500 text-[11px]">
                  Living Proof Longevity
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <StackedCircularFooter />
    </div>
  );
}
