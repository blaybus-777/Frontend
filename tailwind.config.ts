import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { theme as projectTheme } from './src/styles/theme';

// Helper to sanitize Figma naming conventions to Tailwind CSS class friendly names
// e.g., "Foundation /Blue/blue-3" -> "foundation-blue-blue-3" -> simplified to "foundation-blue-3" logic if needed,
// but for now, we'll just strict sanitize: lowercase, replace non-alphanumeric with -
const sanitizeKey = (key: string) => {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

const colors = Object.entries(projectTheme.colors).reduce((acc, [key, value]) => {
  acc[sanitizeKey(key)] = value;
  return acc;
}, {} as Record<string, string>);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const typographyUtilities = Object.entries(projectTheme.typography).reduce((acc, [key, value]) => {
        const sanitizedKey = sanitizeKey(key);
        const typography = value as any;
        
        acc[`.text-${sanitizedKey}`] = {
          fontSize: typography.fontSize,
          lineHeight: typography.lineHeight,
          letterSpacing: typography.letterSpacing,
          fontWeight: typography.fontWeight ? String(typography.fontWeight) : undefined,
          fontFamily: typography.fontFamily,
        };
        return acc;
      }, {} as Record<string, any>);

      addUtilities(typographyUtilities);
    })
  ],
} satisfies Config;
