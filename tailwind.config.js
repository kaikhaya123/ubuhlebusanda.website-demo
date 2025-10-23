/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#ffffff',
				secondary: '#f9f9f9',
				accent: '#ffd700',
				accent2: '#007bff',
			},
		},
	},
	plugins: [],
}
