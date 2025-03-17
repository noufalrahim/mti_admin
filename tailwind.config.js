/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				jiggle: {
					"0%": { transform: "translateX(0px)" },
					"100%": { transform: "translateX(3px)" }, // Slightly increased effect
				},
			},
			animation: {
				jiggle: "jiggle 0.2s infinite alternate ease-in-out",
			},
			colors: {
				primary: {
					DEFAULT: '#25388C',
					main: '#25388C',
					light: '#E2FFF5',
					100: '#DBFEB8',
				},
				secondary: {
					DEFAULT: '#F9FAF3',
					main: '#F9FAF3'
				},
				status: {
					success: '#1FBB82',
					pending: {
						yellow: '',
						red: '#FF5A5A'
					},
				},
				light: {
					'100': '#F8F8FF',
					'200': '#676767'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			},
			keyframes: {
				pulseRing: {
				  "0%": { transform: "scale(0.5)", opacity: "1" },
				  "80%, 100%": { opacity: "0" },
				},
				pulseDot: {
				  "0%, 100%": { transform: "scale(1)" },
				  "50%": { transform: "scale(1.1)" },
				},
			  },
			  animation: {
				pulseRing: "pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
				pulseDot: "pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
			  },
		}
	},
	plugins: [require("tailwindcss-animate"),
		function ({ addComponents }) {
			addComponents({
				".btn": {
					"@apply px-4 py-2 font-medium transition-all rounded": {},
				},
				".btn-primary": {
					"@apply bg-primary text-white hover:bg-primary/90 active:bg-primary/80": {},
				},
				".btn-secondary": {
					"@apply bg-secondary text-black hover:bg-secondary/90 active:bg-secondary/80": {},
				},
				".btn-outline": {
					"@apply border border-primary text-primary hover:bg-primary hover:text-white": {},
				},
				".btn-danger": {
					"@apply bg-red-500 text-white hover:bg-red-600 active:bg-red-700": {},
				},
			});
		},
	],
}