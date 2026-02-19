/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo
        primaryHover: "#4F46E5",
        accent: "#22D3EE", // Cyan
        success: "#10B981",
        error: "#EF4444",
        dark: {
          bg: "#0F172A", // Background Dark
          card: "#1E293B", // Card Dark
          border: "#334155", // Subtle borders
        },
        text: {
          main: "#F8FAFC", // Text Primary
          muted: "#94A3B8", // Text Secondary
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
        card: "0 8px 24px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
