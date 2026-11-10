import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Protocols & Clinical Tools | Liberty Science",
  description:
    "Personally stress-tested clinical longevity tools, bioenergetic fuels, and autonomic regulation hardware recommended by Vera Shury, MS, LBHC.",
  alternates: {
    canonical: "https://libertysciencecoaching.com/curated",
  },
  openGraph: {
    title: "Curated Protocols & Clinical Tools | Liberty Science",
    description:
      "Vetted clinical tools and neuroplasticity protocols tested in daily practice by Vera Shury, MS, LBHC.",
    url: "https://libertysciencecoaching.com/curated",
    siteName: "Liberty Science",
    images: [
      {
        url: "/curated-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Science Curated Protocols",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CuratedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
