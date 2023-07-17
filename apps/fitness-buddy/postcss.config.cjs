const configuredConfig = {
	plugins: [
		//Some plugins, like postcss-nested, need to run before Tailwind,
		require('tailwindcss'),
		require('tailwindcss/nesting'),
		//But others, like autoprefixer, need to run after,
		require('autoprefixer')
	]
};

module.exports = configuredConfig;
