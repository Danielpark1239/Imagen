import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': '350px',
      'xss': '390px',
      's': '430px',
      'ss': '500px',
      sm: '640px',
      md: '768px',
      ml: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1560px',
    },
    borderWidth: {
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
  },
  plugins: [],
} satisfies Config;
