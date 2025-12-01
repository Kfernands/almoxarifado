/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Poppins", "sans-serif"] },
      container: { center: true, padding: "1rem" },
      colors: {
        brand: { DEFAULT: "#2563eb", 50: "#eff6ff", 100: "#dbeafe", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8" },
        accent: { 500: "#14b8a6", 600: "#0d9488" }
      },
      boxShadow: { card: "0 10px 25px -5px rgba(0,0,0,.08), 0 8px 10px -6px rgba(0,0,0,.06)" },
      borderRadius: { "2xl": "1rem" }
    },
  },
  plugins: [],
};
