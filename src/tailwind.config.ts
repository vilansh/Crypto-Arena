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
				// Toned down rebellious crypto colors
				chaos: {
					black: '#000000',
					green: '#22c55e',
					pink: '#ec4899',
					yellow: '#eab308',
					orange: '#f97316',
					purple: '#8b5cf6',
					cyan: '#06b6d4',
				},
				greed: {
					dark: '#0f172a',
					darker: '#020617',
					glow: 'rgba(34, 197, 94, 0.2)',
					shadow: 'rgba(236, 72, 153, 0.15)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
				chaos: ['monospace', 'Courier New']
			},
			backgroundImage: {
				'chaos-gradient': 'linear-gradient(135deg, #000000 0%, #0f172a 50%, #020617 100%)',
				'neon-burst': 'radial-gradient(circle at center, #22c55e 0%, transparent 70%)',
				'glitch-pink': 'linear-gradient(45deg, #ec4899, #8b5cf6)',
				'cyber-yellow': 'linear-gradient(90deg, #eab308, #f97316)',
				'matrix-grid': `
					linear-gradient(rgba(34,197,94,0.02) 1px, transparent 1px),
					linear-gradient(90deg, rgba(34,197,94,0.02) 1px, transparent 1px)
				`
			},
			boxShadow: {
				'chaos-green': '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)',
				'chaos-pink': '0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1)',
				'chaos-yellow': '0 0 20px rgba(234, 179, 8, 0.3), 0 0 40px rgba(234, 179, 8, 0.1)',
				'chaos-orange': '0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(249, 115, 22, 0.1)',
				'brutal': '6px 6px 0px #22c55e, 12px 12px 0px rgba(34, 197, 94, 0.2)',
				'glitch': '2px 2px 0px #ec4899, -2px -2px 0px #06b6d4'
			},
			keyframes: {
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' }
				},
				'neon-pulse': {
					'0%, 100%': {
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
					},
					'50%': {
						textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor'
					}
				},
				'chaos-spin': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'25%': { transform: 'rotate(90deg) scale(1.1)' },
					'50%': { transform: 'rotate(180deg) scale(1)' },
					'75%': { transform: 'rotate(270deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'matrix-fall': {
					'0%': { transform: 'translateY(-100vh)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' }
				},
				'brutal-bounce': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-10px) rotate(2deg)' },
					'75%': { transform: 'translateY(-5px) rotate(-2deg)' }
				},
				'profit-explosion': {
					'0%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 255, 65, 0)' },
					'50%': { transform: 'scale(1.2)', boxShadow: '0 0 20px rgba(0, 255, 65, 0.8)' },
					'100%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 255, 65, 0)' }
				},
				'loss-shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-5px)' },
					'75%': { transform: 'translateX(5px)' }
				}
			},
			animation: {
				'glitch': 'glitch 0.3s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'chaos-spin': 'chaos-spin 3s ease-in-out infinite',
				'matrix-fall': 'matrix-fall 4s linear infinite',
				'brutal-bounce': 'brutal-bounce 2s ease-in-out infinite',
				'profit-explosion': 'profit-explosion 0.6s ease-out',
				'loss-shake': 'loss-shake 0.5s ease-in-out'
			},
			backgroundSize: {
				'matrix': '20px 20px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
