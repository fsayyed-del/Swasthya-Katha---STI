/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F1E4",
          shadow: "#EAE1CC",
          deep: "#EAE0CD",
          pure: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1B1B18",
          teal: "#123A3C",
          muted: "#4A6367",
          light: "#8A9BA8",
        },
        coral: {
          DEFAULT: "#D97B66",
          dark: "#B85C47",
          light: "#F0A695",
        },
        'mineral-green': {
          DEFAULT: "#4F7A6C",
          dark: "#3B5C51",
          light: "#7AA697",
        },
        'care-blue': {
          DEFAULT: "#7FA8B3",
          dark: "#5E8691",
          light: "#A5C6CF",
        },
        brass: {
          DEFAULT: "#B08D57",
          dark: "#8F6E3B",
          light: "#D4B483",
        },
        teal: {
          DEFAULT: "#123A3C",
          dark: "#0B2628",
          light: "#1C5457",
        },
        mint: {
          DEFAULT: "#D8EEE6",
          dark: "#B4DED0",
        },
        // NACO Kit Colors
        kit: {
          grey: "#718096",
          green: "#2F855A",
          white: "#EDF2F7",
          blue: "#2B6CB0",
          red: "#C53030",
          yellow: "#D69E2E",
          black: "#1A202C",
          brown: "#78350F",
        }
      },
      fontFamily: {
        display: ['"Fraunces"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        body: ['"Mukta"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'page': '0 1rem 2.5rem rgba(18, 58, 60, 0.18)',
        'contact': '0 4px 14px rgba(18, 58, 60, 0.12)',
        'spread': '0 20px 50px rgba(18, 58, 60, 0.22)',
        'gutter': 'inset 0 0 35px rgba(18, 58, 60, 0.25)',
        'brass': '0 2px 8px rgba(176, 141, 87, 0.35)',
      },
      borderRadius: {
        'sm': '0.35rem',
        'md': '0.75rem',
        'lg': '1.5rem',
        'deckle': '1.75rem',
      }
    },
  },
  plugins: [],
}
