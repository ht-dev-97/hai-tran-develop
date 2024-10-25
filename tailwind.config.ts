import { animations } from './src/configs/tailwind-css/animations'
import { backgroundImages } from './src/configs/tailwind-css/background-images'
import { colorBrand } from './src/configs/tailwind-css/colors'
import { keyframes } from './src/configs/tailwind-css/keyframes'
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        abolition: ['var(--font-abolition)'],
        SNPro: ['var(--font-sn-pro)'],
      },
      fontSize: {
        'fs-32': '32px',
        'fs-140': '140px',
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        colorBrand,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: backgroundImages,
      keyframes,
      animation: animations,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config
export default config
