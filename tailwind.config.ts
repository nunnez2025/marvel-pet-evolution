import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// Marvel specific colors
				'deadpool-red': 'hsl(var(--deadpool-red))',
				'deadpool-black': 'hsl(var(--deadpool-black))',
				'wolverine-yellow': 'hsl(var(--wolverine-yellow))',
				'wolverine-blue': 'hsl(var(--wolverine-blue))',
				'marvel-energy': 'hsl(var(--marvel-energy))',
				'singularity-purple': 'hsl(var(--singularity-purple))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'marvel-glow': {
					'0%, 100%': {
						'box-shadow': '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						'box-shadow': '0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--marvel-energy) / 0.4)'
					}
				},
				'hero-bounce': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)'
					},
					'50%': {
						transform: 'translateY(-10px) scale(1.02)'
					}
				},
				'energy-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'scale(1.1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translateY(-20px) rotate(2deg)'
					},
					'66%': {
						transform: 'translateY(-10px) rotate(-1deg)'
					}
				},
				'fall': {
					'0%': {
						transform: 'translateY(-60px) rotate(0deg) scale(0.8)',
						opacity: '1'
					},
					'10%': {
						transform: 'translateY(-30px) rotate(36deg) scale(1)',
						opacity: '1'
					},
					'90%': {
						transform: 'translateY(400px) rotate(324deg) scale(1.1)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateY(500px) rotate(360deg) scale(0.6)',
						opacity: '0'
					}
				},
				'split-left': {
					'0%': {
						transform: 'translateX(0) rotateY(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(-250px) rotateY(-15deg)',
						opacity: '1'
					}
				},
				'split-right': {
					'0%': {
						transform: 'translateX(0) rotateY(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(250px) rotateY(15deg)',
						opacity: '1'
					}
				},
				'fade-in-up': {
					'0%': {
						transform: 'translateY(50px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'marvel-glow': 'marvel-glow 3s ease-in-out infinite',
				'hero-bounce': 'hero-bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
				'energy-pulse': 'energy-pulse 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'fall': 'fall 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'split-left': 'split-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'split-right': 'split-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards'
			},
			boxShadow: {
				'marvel': 'var(--shadow-marvel)',
				'glow': 'var(--shadow-glow)',
				'deadpool': 'var(--shadow-deadpool)',
				'wolverine': 'var(--shadow-wolverine)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
