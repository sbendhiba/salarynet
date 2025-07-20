/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Chart colors and dynamic classes
    'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500',
    'text-red-600', 'text-orange-700', 'text-yellow-700', 'text-green-700', 'text-blue-600',
    'text-teal-700', 'text-teal-800', 'text-purple-600', 'text-pink-600',
    'bg-blue-50', 'bg-orange-50', 'bg-yellow-50', 'bg-green-50', 'bg-teal-50',
    'hover:bg-blue-700', 'focus:ring-blue-500', 'focus:border-blue-500',
    'md:hidden', 'md:block', 'lg:hidden', 'lg:block',
  ],
  theme: {
    extend: {
      // Only extend what you actually need
      colors: {
        // Add any custom colors if needed
      },
      spacing: {
        // Add any custom spacing if needed
      },
    },
  },
  plugins: [],
}
