/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3071E7",
				red: "#B11B1B",
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};
