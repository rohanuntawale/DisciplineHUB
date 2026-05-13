/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "neon-pulse": "neonPulse 5s ease-in-out infinite",
        "glitch": "glitch 0.8s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s cubic-bezier(0.25,0.8,0.25,1) forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        neonPulse: {
          "0%,100%": { opacity: "0.8" },
          "50%": { opacity: "1" }
        },
        glitch: {
          "0%": { transform: "skew(0deg)" },
          "20%": { transform: "skew(-5deg)" },
          "40%": { transform: "skew(5deg)" },
          "60%": { transform: "skew(-5deg)" },
          "80%": { transform: "skew(5deg)" },
          "100%": { transform: "skew(0deg)" }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      boxShadow: {
        "neon": "0 0 5px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.1)",
        "neon-pink": "0 0 5px rgba(236,72,153,0.5), 0 0 20px rgba(236,72,153,0.3), 0 0 40px rgba(236,72,153,0.1)",
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
