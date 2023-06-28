/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'poppins',
        poppinsMedium: 'poppins-medium',
      },
      colors: {
        lightGreen: '#87BE57',
        darkGreen: '#458549',
        paleGreen: '#C0D493',
        mintGreen: '#D6E5BE',
        seaGreen: '#5DC597',
        teal: '#62BB96',
        coral: '#EA8C60',
        lightGray: '#D3D3D3',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
