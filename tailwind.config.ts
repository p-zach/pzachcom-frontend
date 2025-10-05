import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        noto_sans: ['var(--font-noto-sans)', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#6B7A8F',
        'brand-secondary': '#F7C59F',
        'brand-accent': '#DCC7BE',
        'brand-dark': '#1D2D44',
      },
    },
  },
  plugins: [],
}
export default config