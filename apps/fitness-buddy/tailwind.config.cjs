module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				title: `'Shadows Into Light Two', cursive`,
				heading: `'Rubik', sans-serif`,
				sans: `'Roboto', sans-serif`
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('daisyui')]
};
