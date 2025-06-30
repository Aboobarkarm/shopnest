/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      maxWidth: {
        '8xl': '96rem', // 1536px
      },
    },
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./public/index.html",
  ],
  plugins: [],
};
