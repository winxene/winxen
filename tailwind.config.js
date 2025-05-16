/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ddd7b7",
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
        suggestion: "#727168",
        bg: "#1f1f29",
      },
      fontFamily: {
        sans: ["MesloLGS NF", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
