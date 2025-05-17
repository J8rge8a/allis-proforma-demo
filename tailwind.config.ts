import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    // Para HTML puro (index.html)
    "./index.html",
    // Para assets estáticos en public/
    "./public/**/*.{html,js,ts,jsx,tsx}",
    // Para todos tus componentes y páginas en src/
    "./src/**/*.{js,jsx,ts,tsx}",
    // Si usas Next.js o carpeta pages/app:
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "", // Sin prefijo
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Tus variables actuales
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        // ... demás colores por defecto ...

        // Añadimos tu paleta Allis
        "allis-rosa": "#f8b3c2",
        "allis-celeste": "#b3e5ff",
        "allis-amarillo": "#fff5c4",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    animatePlugin, // tailwindcss-animate
  ],
}

export default config
