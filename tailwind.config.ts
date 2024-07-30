import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "imageBg":"url('../public/Rectangle 2.png')",
        "smallImage":"url('../public/smallBg.svg')"
      },
      gridTemplateColumns: {
        'auto-fit-minmax': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      colors:{
        custom_grey:'#F2F0F1',
      },
      screens:{
        'xsm':'516px',
        'xxsm':'375px'
      }
    },
  },
  plugins: [],
};
export default config;
