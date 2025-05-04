module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3b82f6',
          secondary: '#10b981',
          dark: '#1e293b',
          light: '#f8fafc',
          blue: {
            600: '#2563eb'
          },
          green: {
            500: '#22c55e'
          }
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }