/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#fffaf0",
          deep: "#f2eadb",
          pure: "#ffffff",
        },
        ink: {
          DEFAULT: "#182027",
          muted: "#52616b",
          light: "#8a9ba8",
        },
        teal: {
          DEFAULT: "#0b6b67",
          dark: "#064946",
          light: "#14958f",
        },
        orange: {
          DEFAULT: "#f29f58",
          dark: "#d87f32",
          light: "#f7b982",
        },
        blue: {
          DEFAULT: "#3b82a0",
          dark: "#2a627a",
          light: "#5ba2bf",
        },
        mint: {
          DEFAULT: "#d8eee6",
          dark: "#b4ded0",
        },
        warning: {
          DEFAULT: "#b86b27",
        },
        danger: {
          DEFAULT: "#a63d40",
        },
        focus: {
          DEFAULT: "#1d62d1",
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
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'page': '0 1rem 2.5rem rgba(24, 32, 39, 0.18)',
        'page-left': '-10px 10px 25px rgba(24, 32, 39, 0.15)',
        'page-right': '10px 10px 25px rgba(24, 32, 39, 0.15)',
        'card': '0 0.5rem 1.5rem rgba(24, 32, 39, 0.1)',
        'spine': 'inset 0 0 30px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '0.35rem',
        'md': '0.75rem',
        'lg': '1.5rem',
      }
    },
  },
  plugins: [],
}
