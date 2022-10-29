/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./{pages,app}/**/*.{ts,tsx,mdx}",
    "./node_modules/.pnpm/node_modules/@nature-ui/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
