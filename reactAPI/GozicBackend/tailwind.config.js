/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/js/**/*.{html,js,jsx,ts,tsx}',
        './resources/views/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                customColor: '#ff6600',
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
