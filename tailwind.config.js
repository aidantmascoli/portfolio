/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /!?(bg|text|border)-(default|red|orange|yellow|green|blue|indigo|violet|pink)-(50|[1-9]00|950)/,
      variants: ["hover", "data-[hover=true]"],
    }
  ],
  theme: {
    fontFamily: {
      body: ['var(--font-work)', '"Roboto"', 'sans-serif'],
      heading: ['var(--font-urbanist)', '"Trebuchet MS"', '"Roboto"', 'sans-serif'],
      title: ['var(--font-josefin)', '"Trebuchet MS"', '"Roboto"', 'sans-serif'],
      mono: ['var(--font-jet-brains)', '"Ubuntu Mono"', '"Source Code Pro"', 'monospace'],
    },
    extend: {
      maxWidth: {
        unset: 'unset',
      },
      gridTemplateColumns: {
        video: 'repeat(2, minmax(0, 1fr)) min-content',
      },
      gridTemplateRows: {
        hero: 'minmax(0,1fr) max-content',
      },
      aspectRatio: {
        pdf: '17 / 22',
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
