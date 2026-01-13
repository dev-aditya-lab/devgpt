/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Dark Developer Theme
                background: '#0D1117',
                surface: '#161B22',
                'surface-light': '#21262D',
                border: '#30363D',
                primary: '#58A6FF',
                'primary-dark': '#388BFD',
                secondary: '#8B949E',
                accent: '#7EE787',
                'accent-orange': '#F0883E',
                'accent-purple': '#A371F7',
                text: '#E6EDF3',
                'text-secondary': '#8B949E',
                'text-muted': '#6E7681',
                'code-bg': '#1F2428',
                error: '#F85149',
                warning: '#D29922',
                success: '#3FB950',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
        },
    },
    plugins: [],
}
