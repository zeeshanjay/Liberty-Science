import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PagePreloader } from "@/components/PagePreloader";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { AffirmScript } from "@/components/AffirmScript";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://libertysciencecoaching.com"),
  title: {
    default: "Liberty Science | Life, Business, Health Advisory",
    template: "%s | Liberty Science",
  },
  description:
    "Life, Business, Health Advisory by Vera Shury, MS. Pairing the Metabolic Neuroplasticity™ System, HeartMath® coherence, and neuromuscular training so business owners, caregivers, and active adults stay capable of running what they built. No stagnancy.",
  applicationName: "Liberty Science",
  authors: [{ name: "Vera Shury, MS", url: "https://libertysciencecoaching.com/about" }],
  generator: "Next.js",
  keywords: [
    "Metabolic Neuroplasticity™ System coaching Tucson",
    "Life business health advisory for owners",
    "No stagnancy mobility and decision coaching",
    "Your brain is still hiring neuroplasticity",
    "Your brain is still generating",
    "Parkinson’strength™",
    "PWR!Moves Tucson",
    "HeartMath + strength training for active adults",
    "Readiness to change health coaching",
    "neuro-functional wellness southern Arizona",
    "strength4balance for caregivers and entrepreneurs",
    "compassion attention + movement for brain health",
    "stay able to run what you built",
    "HeartMath coherence coaching Tucson",
    "heart rate variability for focus and recovery",
    "adult neurogenesis Tucson",
    "Vera Shury health coach",
    "Healthcare taxonomy 71400000X",
  ],
  creator: "Vera Shury, MS",
  publisher: "Liberty Science LLC",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://libertysciencecoaching.com",
  },
  openGraph: {
    title: "Liberty Science | Life, Business, Health Advisory",
    description:
      "Your brain is still generating. Life, Business, Health Advisory pairing HeartMath® coherence, the brain-body loop, and the Metabolic Neuroplasticity™ System so you stay able to run what you built.",
    url: "https://libertysciencecoaching.com",
    siteName: "Liberty Science",
    images: [
      {
        url: "/curated-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Vera Shury, MS — Liberty Science | Life, Business, Health Advisory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liberty Science | Life, Business, Health Advisory",
    description:
      "Your brain is still generating. Life, Business, Health Advisory so business owners and active adults stay able to run what they built. No stagnancy.",
    images: ["/curated-hero.jpg"],
    creator: "@LibertyScience",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "US-AZ",
    "geo.placename": "Tucson",
    "geo.position": "32.4173;-110.9634",
    "ICBM": "32.4173, -110.9634",
    "tax-code": "71400000X",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${dancingScript.variable}`}
    >
      <head>
        <SchemaJsonLd />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-[#635bff] selection:text-white">
        <PagePreloader />
        <AffirmScript />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
