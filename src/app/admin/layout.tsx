import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinician Portal | Liberty Science",
  description: "Private administrative and clinical telemetry portal for Liberty Science Coaching.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
