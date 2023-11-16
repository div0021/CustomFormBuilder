import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode:"class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation:{
        "mySpin": "mySpin 2s linear infinite"
      },
      keyframes:{
        "mySpin":{
          "from":{
            transform:"translate(-50%,-50%) rotate(0deg)",
          },
          "to":{
            transform:"translate(-50%,-50%) rotate(360deg)"
          }
        }
      }
    },
  },
  plugins: [],
}
export default config
