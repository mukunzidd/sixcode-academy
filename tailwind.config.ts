import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#182027',
        paper: '#f4f0e7',
        line: '#c9c4b8',
        coral: '#ee6a4c',
        blue: '#4268d6',
        panel: '#fbf8f0',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      boxShadow: {
        offset: '8px 8px 0 #182027',
      },
    },
  },
  plugins: [],
};

export default config;
