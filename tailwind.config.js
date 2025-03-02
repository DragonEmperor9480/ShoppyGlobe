/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a78bfa",
        secondary: "#8b5cf6",
        accent: "#7c3aed",
        dark: "#2e1065",
        light: "#ffffff",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a78bfa",
          "secondary": "#8b5cf6",
          "accent": "#7c3aed",
          "neutral": "#2e1065",
          "base-100": "rgba(88, 28, 135, 0.4)",
          "base-200": "rgba(76, 29, 149, 0.4)",
          "base-300": "rgba(109, 40, 217, 0.4)",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}

