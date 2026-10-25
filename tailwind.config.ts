import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        background: "var(--background, #FAF8F5)",
        foreground: "var(--foreground, #0F172A)",
        primary: {
          DEFAULT: "var(--primary, #0F2E2B)",
          foreground: "var(--primary-foreground, #FFFFFF)",
        },
        secondary: {
          DEFAULT: "var(--secondary, #F4F1EA)",
          foreground: "var(--secondary-foreground, #0F172A)",
        },
        muted: {
          DEFAULT: "var(--muted, #F4F1EA)",
          foreground: "var(--muted-foreground, #64748B)",
        },
        accent: {
          DEFAULT: "var(--accent, #E8F3F1)",
          foreground: "var(--accent-foreground, #0F2E2B)",
        },
        destructive: {
          DEFAULT: "var(--destructive, #DC2626)",
          foreground: "var(--destructive-foreground, #FFFFFF)",
        },
        border: "var(--border, #E2DCCE)",
        input: "var(--input, #D6CFC2)",
        ring: "var(--ring, #0F6E68)",
        backdrop: "#FAF8F5",
        carbon: "#0f172a",
        liberty: {
          teal: "#0F6E68",
          deep: "#083D3A",
          flame: "#EA580C",
          gold: "#D97706",
          cobalt: "#1D4ED8",
        },
      },
      backgroundImage: {
        "micro-grid":
          "linear-gradient(to right, rgba(15, 110, 104, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 110, 104, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
