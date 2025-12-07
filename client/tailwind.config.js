/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Keeping 'class' strategy as implied by previous code using "dark:" manually or by system? Let's check implicit usage. 
    // Actually, standard is 'media' or 'class'. Code uses 'dark:bg-slate-900'.
    // I will stick to default (media) or just omit user config for now and let it be straightforward unless I see dark mode toggle logic.
    // The user code seems to trust explicit 'dark:' classes which work with 'media' (system preference) by default in v3.
    theme: {
        extend: {},
    },
    plugins: [],
}
