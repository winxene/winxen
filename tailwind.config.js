/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[#1f1f29]",
    "bg-[#d4323d]",
    "bg-[#6e9565]",
    "bg-[#c6a266]",
    "bg-[#769ddd]",
    "bg-[#958aac]",
    "bg-[#5D9689]",
    "bg-[#cbc08d]",
    "bg-[#727168]",
    "bg-[#fd0007]",
    "bg-[#8fbc61]",
    "bg-[#edc17a]",
    "bg-[#6db6ce]",
    "bg-[#987ebc]",
    "bg-[#6CAA9F]",
    "bg-[#ddd7b7]",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        "blink": "blink 1s step-start infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--text-color)",
        primaryAlt: "#cbc08d",
        title: "#edc17a",
        titleAlt: "#c6a266",
        link: "#6db6ce",
        linkAlt: "#769ddd",
        subtitle: "#8fbc61",
        subtitleAlt: "#6e9565",
        domain: "#987ebc",
        domainAlt: "#958aac",
        error: "#fd0007",
        errorAlt: "#d4323d",
        suggestion: "#727168",
        bg: "var(--bg-color)",
      },
      fontFamily: {
        sans: ["MesloLGS NF", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
