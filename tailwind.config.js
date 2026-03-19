/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#10401c',
        'deep-pine': '#1e4c2a',
        'charcoal-ink': '#212121',
        'warm-alabaster': '#fdfdfd',
        'river-stone': '#7c9a85',
        'cabin-timber': '#595147',
        'alpine-slate': '#59687b',
        'canvas-sand': '#f1f5f0',
      },
      fontFamily: {
        heading: ['Tenor Sans', 'Playfair Display', 'Georgia', 'serif'],
        body: ['Montserrat', 'Lato', 'system-ui', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: 'clamp(2.5rem, 5vw, 4.375rem)',
        h1: 'clamp(2rem, 4vw, 3rem)',
        h2: 'clamp(1.75rem, 3.5vw, 2.688rem)',
        h3: 'clamp(1.25rem, 2vw, 1.875rem)',
        h4: 'clamp(1rem, 1.5vw, 1.313rem)',
      },
      letterSpacing: {
        'brand-wide': '0.06em',
        'brand-wider': '0.1em',
        'brand-widest': '0.2em',
      },
      maxWidth: {
        container: '1280px',
        narrow: '960px',
      },
      boxShadow: {
        'brand-sm': '0 1px 3px rgba(0,0,0,0.08)',
        'brand-md': '0 4px 12px rgba(0,0,0,0.10)',
        'brand-lg': '0 8px 30px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
