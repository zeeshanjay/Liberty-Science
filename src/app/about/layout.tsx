import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vera Shury, MS, LBHC | Liberty Science Coaching",
  description:
    "Meet Vera Shury, MS, LBHC — Principal Life, Business, and Health Advisor. Living proof of Metabolic Neuroplasticity™, alpine skiing at 86, and holding verified Harvard Medical School CME credentials.",
  alternates: {
    canonical: "https://libertysciencecoaching.com/about",
  },
  openGraph: {
    title: "About Vera Shury, MS, LBHC | Liberty Science Coaching",
    description:
      "Empirical longevity and executive capacity. Certified by Harvard Medical School, Harvard Health Publishing, and American Council on Exercise.",
    url: "https://libertysciencecoaching.com/about",
    siteName: "Liberty Science",
    images: [
      {
        url: "/vera_about.jpg",
        width: 1200,
        height: 630,
        alt: "Vera Shury, MS, LBHC — Principal Advisor",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
