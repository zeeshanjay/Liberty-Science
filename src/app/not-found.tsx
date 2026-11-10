import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, BookOpen, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 selection:bg-[#ea580c] selection:text-white">
      <div className="max-w-lg w-full text-center">
        {/* Brand Torch Logo */}
        <div className="mx-auto w-16 h-16 relative mb-6">
          <Image
            src="/logo.png"
            alt="Liberty Science Logo"
            fill
            sizes="64px"
            className="object-contain"
            priority
          />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
          Status 404 · Resource Relocated
        </span>

        <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Page Not Located
        </h1>

        <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
          The requested clinical section or resource may have been updated, relocated, or consolidated into our unified advisory architecture.
        </p>

        {/* Action Gateways */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto h-11 px-5 rounded-full bg-white text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/#advisory"
            className="w-full sm:w-auto h-11 px-5 rounded-full border border-slate-700 bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:border-slate-500 transition-colors"
          >
            <Compass className="h-4 w-4 text-[#ea580c]" />
            <span>Advisory Programs</span>
          </Link>

          <Link
            href="/research"
            className="w-full sm:w-auto h-11 px-5 rounded-full border border-slate-700 bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:border-slate-500 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-sky-400" />
            <span>Research</span>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 text-[11px] font-mono text-slate-500">
          Liberty Science Coaching · Vera Shury, MS, LBHC · Tucson, AZ
        </div>
      </div>
    </main>
  );
}
