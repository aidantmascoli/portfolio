const {heroui} = require("@heroui/react");

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
  plugins: [heroui({
    prefix: "nextui",
    addCommonColors: false,
    defaultTheme: "light",
    defaultExtendTheme: "light",
    layout: {
      radius: {
        small: 0,
        medium: 0,
        large: 0.
      }
    },
    themes: {
      light: {
        colors: {
          foreground: "#4D4A44",
          background: "#FFFCF0",
          default: {
            50: "#FFFCF0",
            100: "#FCF6E6",
            200: "#E3DECE",
            300: "#CBC5B7",
            400: "#B2ADA0",
            500: "#999489",
            600: "#807C72",
            700: "#66635B",
            800: "#4D4A44",
            900: "#33322D",
            950: "#1A1917",
          },
          red: {
            50: "#FBCFC8",
            100: "#FAC3BA",
            200: "#FAB3A7",
            300: "#FA9C8C",
            400: "#FA7B65",
            500: "#FA583D",
            600: "#F74123",
            700: "#E03416",
            800: "#BB270E",
            900: "#8A1B09",
            950: "#511004"
          },
          orange: {
            50: "#FFE1C0",
            100: "#FFDAB3",
            200: "#FFD1A1",
            300: "#FFC587",
            400: "#FFB05C",
            500: "#FFA03B",
            600: "#FC9526",
            700: "#EA8519",
            800: "#C26C10",
            900: "#904F0A",
            950: "#4F2B05"
          },
          yellow: {
            50: "#FEF4CC",
            100: "#FBEEBB",
            200: "#FAEAA8",
            300: "#FAE590",
            400: "#FADD66",
            500: "#FAD642",
            600: "#F7CF29",
            700: "#E7BE16",
            800: "#C49F0A",
            900: "#907404",
            950: "#453701"
          },
          green: {
            50: "#EFF5E2",
            100: "#E9F2D1",
            200: "#E2F1BB",
            300: "#D7F099",
            400: "#C9F069",
            500: "#BDEF40",
            600: "#B1EA25",
            700: "#9ED517",
            800: "#83B20E",
            900: "#5F8208",
            950: "#2F4103"
          },
          blue: {
            50: "#DBF2F6",
            100: "#CCECF2",
            200: "#B5E6F1",
            300: "#99E1F0",
            400: "#6FDAF0",
            500: "#45D1EE",
            600: "#26C8EA",
            700: "#14B4D5",
            800: "#0B90AC",
            900: "#066478",
            950: "#022931"
          },
          indigo: {
            50: "#F1F1FE",
            100: "#E0E1FB",
            200: "#C9CAFA",
            300: "#A8A9FA",
            400: "#8384FA",
            500: "#5F61EF",
            600: "#3D3FD8",
            700: "#2123AE",
            800: "#0F107B",
            900: "#060755",
            950: "#03043B"
          },
          violet: {
            50: "#F2E1F7",
            100: "#ECD1F3",
            200: "#E6BBF2",
            300: "#DE9AF1",
            400: "#D472F0",
            500: "#C851EA",
            600: "#B636DA",
            700: "#9C23BE",
            800: "#7C1598",
            900: "#560C6B",
            950: "#31063D"
          },
          pink: {
            50: "#FDEEF4",
            100: "#FDDBE8",
            200: "#FDBED6",
            300: "#FD9ABF",
            400: "#FD71A5",
            500: "#FD488C",
            600: "#FA2373",
            700: "#F00D62",
            800: "#CC034E",
            900: "#990039",
            950: "#570021"
          }
        },
      },
    },
  })],
};
