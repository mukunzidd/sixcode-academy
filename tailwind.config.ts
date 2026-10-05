import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--six-ink) / <alpha-value>)',
        paper: 'rgb(var(--six-paper) / <alpha-value>)',
        line: 'rgb(var(--six-line) / <alpha-value>)',
        coral: 'rgb(var(--six-accent) / <alpha-value>)',
        blue: '#7fc0ac',
        panel: 'rgb(var(--six-panel) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      boxShadow: {
        offset: '8px 8px 0 rgb(var(--six-ink) / 1)',
      },
    },
  },
  plugins: [],
};

export default config;
