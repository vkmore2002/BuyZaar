/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: "#FF8A65",
          light: "#FFEDE0",
          soft: "#FFF6F2",
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "18px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16,24,40,0.04)",
        md: "0 8px 24px rgba(122,46,14,0.06)",
      },
    },
  },
  plugins: [],
};
