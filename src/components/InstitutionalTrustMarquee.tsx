"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  href?: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  {
    name: "RenewActive by UnitedHealthcare",
    src: "/logos/renewactive.png",
    width: 175,
    height: 65,
  },
  {
    name: "Brookdale Senior Living",
    src: "/logos/brookdale.png",
    width: 185,
    height: 50,
  },
  {
    name: "SaddleBrooke One",
    src: "/logos/saddlebrooke.png",
    width: 160,
    height: 60,
  },
  {
    name: "Town of Oro Valley, Arizona",
    src: "/logos/orovalley.png",
    width: 55,
    height: 58,
  },
  {
    name: "ACE Certified - American Council on Exercise",
    src: "/logos/ace.png",
    width: 110,
    height: 60,
  },
  {
    name: "HeartMath Institute",
    src: "/logos/heartmath.png",
    width: 85,
    height: 70,
  },
  {
    name: "PWR!Moves Parkinson Wellness Recovery",
    src: "/logos/pwr.png",
    width: 50,
    height: 65,
  },
  {
    name: "SilverSneakers Fitness",
    src: "/logos/silversneakers.png",
    width: 130,
    height: 75,
  },
  {
    name: "Silver&Fit Clinical Fitness",
    src: "/logos/silverfit.png",
    width: 125,
    height: 60,
  },
  {
    name: "Oro Valley United Church of Christ",
    src: "/logos/ucc.png",
    width: 80,
    height: 70,
  },
  {
    name: "FLEX Outside The Gym",
    src: "/logos/flex.png",
    width: 85,
    height: 70,
  },
  {
    name: "Peak Waves Studio",
    src: "/logos/peakwaves.png",
    width: 45,
    height: 55,
    href: "https://peakwavesstudio.com/",
  },
];

export function InstitutionalTrustMarquee() {
  // Seamless loop by duplicating the array
  const duplicatedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="relative w-full border-y border-slate-100 bg-white py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-9 text-center">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Trusted Across Healthcare Networks, Senior Communities &amp; Regional Facilities
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
          Delivering evidence-based Parkinson&apos;s recovery, HeartMath® coherence, and neuromuscular fall prevention across southern Arizona and worldwide.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Track with Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center gap-12 sm:gap-16 py-4 animate-marquee hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, index) => {
            const Content = (
              <div
                className="group relative flex h-16 items-center justify-center px-4 transition-transform duration-300 hover:scale-105"
                title={logo.name}
              >
                <div className="relative h-12 w-28 sm:w-36 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="max-h-12 w-auto object-contain filter-none drop-shadow-xs"
                  />
                </div>
              </div>
            );

            return logo.href ? (
              <a
                key={`${logo.name}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                {Content}
              </a>
            ) : (
              <div key={`${logo.name}-${index}`}>
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
