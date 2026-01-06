import type { Config } from 'tailwindcss';

export default {
  // Tailwind v4 still uses content globs to detect class usage.
  // Include all Angular MFEs (shell + remotes) so classes don't get purged.
  content: ['./projects/**/src/**/*.{html,ts,css}'],

  // Default is 'media'. Keeping it minimal: dark styles activate when OS is dark.
  // If you prefer manual toggling via a `.dark` class, change this to 'class'.
  darkMode: 'media',

  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
