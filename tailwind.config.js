/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: `768px`,
      lg: `1024px`,
      xl: `1280px`,
      "2xl": `1536px`,
      xLarge: "1920px",
    },
    extend: {
      colors: {
        gold: "#FAC16A",
        premium: "#1E3432",
        greyish: "#afafaf",
        green: "#1E3432",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "angled-gradient": "linear-gradient(120deg, white, #1E3432, #999)",
      },
      animation: {
        slideRight: "slideRight 0.5s ease-in-out",
        slideLeft: "slideLeft 0.5s ease-in-out",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
