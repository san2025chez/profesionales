/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0F172A",
        card: "#1E293B",
        primary: "#2563EB",
        accent: "#22C55E",
      },
    },
  },
  plugins: [],
}

