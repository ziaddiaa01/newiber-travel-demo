/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This scans all your logic files
    "./public/index.html",         // Scans your HTML entry point
  ],
  theme: {
    extend: {
      fontFamily: {
        // For luxury/traditional feel (headings)
        display: ['Playfair Display', 'serif'],
        
        // For modern/clean text (body)
        sans: ['Montserrat', 'Poppins', 'sans-serif'],
        
        // For elegant body text
        body: ['Poppins', 'sans-serif'],
        
        // For luxury branding
        luxury: ['Playfair Display', 'serif'],
        
        // Custom named font family
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}