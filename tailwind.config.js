module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 12%, 18%)",
        input: "hsl(210, 12%, 18%)",
        ring: "hsl(183, 85%, 56%)",
        background: "hsl(210, 10%, 12%)",
        foreground: "hsl(0, 0%, 100%)",
        primary: {
          DEFAULT: "hsl(183, 85%, 56%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(183, 55%, 46%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        tertiary: {
          DEFAULT: "hsl(313, 85%, 62%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        neutral: {
          DEFAULT: "hsl(210, 10%, 12%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        success: {
          DEFAULT: "hsl(152, 60%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(35, 90%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        gray: {
          50: "hsl(210, 15%, 98%)",
          100: "hsl(210, 15%, 90%)",
          200: "hsl(210, 13%, 80%)",
          300: "hsl(210, 12%, 65%)",
          400: "hsl(210, 10%, 50%)",
          500: "hsl(210, 10%, 35%)",
          600: "hsl(210, 10%, 25%)",
          700: "hsl(210, 12%, 18%)",
          800: "hsl(210, 12%, 14%)",
          900: "hsl(210, 15%, 10%)",
        },
        muted: {
          DEFAULT: "hsl(210, 12%, 18%)",
          foreground: "hsl(210, 13%, 80%)",
        },
        accent: {
          DEFAULT: "hsl(313, 85%, 62%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        card: {
          DEFAULT: "hsl(210, 12%, 14%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        popover: {
          DEFAULT: "hsl(210, 12%, 14%)",
          foreground: "hsl(0, 0%, 100%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        headline: ['"Space Grotesk"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(183, 85%, 56%), hsl(313, 85%, 62%))',
        'gradient-2': 'linear-gradient(180deg, hsl(210, 15%, 10%), hsl(210, 10%, 15%))',
        'button-border-gradient': 'linear-gradient(45deg, hsl(183, 85%, 56%), hsl(313, 85%, 62%))',
      },
      keyframes: {
        "bounce-arrow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        "pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 0, 255, 0.8)" },
        },
      },
      animation: {
        "bounce-arrow": "bounce-arrow 2s ease-in-out infinite",
        "pulse": "pulse 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "bounce-slow": "bounce-arrow 3s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}
