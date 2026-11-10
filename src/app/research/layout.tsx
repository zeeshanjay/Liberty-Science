import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Research & Monographs | Metabolic Neuroplasticity™",
  description:
    "Peer-reviewed clinical framework on Metabolic Neuroplasticity™: pairing Hebbian micro-loops, HeartMath® 0.10 Hz coherence, and cyclic metabolic switching to defeat the 70% relapse bottleneck.",
  alternates: {
    canonical: "https://libertysciencecoaching.com/research",
  },
  openGraph: {
    title: "Clinical Research & Monographs | Metabolic Neuroplasticity™",
    description:
      "Why lasting neural rewiring begins with cellular fuel, not just practice. Authored by Vera Shury, MS, LBHC.",
    url: "https://libertysciencecoaching.com/research",
    siteName: "Liberty Science",
    images: [
      {
        url: "/research/metabolic-neuroplasticity-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Metabolic Neuroplasticity™ Clinical Cover",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
