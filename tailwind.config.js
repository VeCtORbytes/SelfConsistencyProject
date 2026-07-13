/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        panel: "#FFFFFF",
        line: "#E2E8F0",
        fog: "#475569",
        paper: "#F8FAFC",
        openai: "#0EA5E9",
        gemini: "#D97706",
        claude: "#84CC16",
      },
      fontFamily: {
        display: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
